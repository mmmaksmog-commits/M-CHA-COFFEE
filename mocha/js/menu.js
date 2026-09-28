const CATS={coffee:'COFFEE',non:'NON-COFFEE',cold:'COLD DRINKS',bake:'BAKERY',dess:'DESSERTS'},TONE={coffee:'t1',non:'t2',cold:'t3',bake:'t4',dess:'t5'};
const M=[
['coffee','espresso','Espresso',190,'Двойной эспрессо с плотной крема-шапкой и шоколадным послевкусием.'],
['coffee','americano','Americano',220,'Длинный чёрный кофе: чистый вкус, мягкая кислинка.'],
['coffee','cappuccino','Cappuccino',280,'Эспрессо, бархатное молоко и густая пенка. Классика утра.'],
['coffee','flatwhite','Flat White',320,'Двойной ристретто и шёлковое молоко. Кофе, который слышно.'],
['coffee','latte','Latte',320,'Мягкий, сливочный, с нотами карамели и печенья.'],
['non','matcha','Matcha Latte',340,'Церемониальная матча, овсяное или обычное молоко.'],
['non','cocoa','Cocoa',260,'Густое какао из тёмного шоколада, немного морской соли.'],
['non','chai','Chai Masala',280,'Чёрный чай, кардамон, корица и имбирь на молоке.'],
['cold','icedlatte','Iced Latte',330,'Эспрессо, холодное молоко и много льда.'],
['cold','coldbrew','Cold Brew',300,'Двенадцать часов настаивания. Тёмный шоколад и цитрус.'],
['cold','tonic','Espresso Tonic',310,'Эспрессо на тонике с апельсиновой цедрой.'],
['bake','croissant','Круассан',210,'Слоёный, масляный, хрустит с первого укуса.'],
['bake','cardamom','Булочка с кардамоном',190,'Мягкая булочка, сахарная корочка, много специй.'],
['bake','focaccia','Фокачча с томатами',240,'Оливковое масло, розмарин, морская соль.'],
['dess','cheesecake','Чизкейк баскский',360,'Карамельная корочка и нежная сливочная середина.'],
['dess','brownie','Брауни',230,'Плотный, с тёмным шоколадом и грецким орехом.'],
['dess','tiramisu','Тирамису',340,'Маскарпоне, савоярди и наш эспрессо.']
].map(a=>({cat:a[0],id:a[1],name:a[2],price:a[3],desc:a[4],opts:['coffee','non','cold'].includes(a[0])}));
const BEANS=[['ETHIOPIA','Эфиопия',['Жасмин','Черника','Цитрус'],'LIGHT ROAST','#E2B34D'],['BRAZIL','Бразилия',['Орех','Какао','Карамель'],'MEDIUM ROAST','#C9714A'],['COLOMBIA','Колумбия',['Красное яблоко','Мёд','Шоколад'],'MEDIUM-DARK ROAST','#8FB08A']];
const ph=c=>`<div class="ph ${TONE[c]}"></div>`;
function card(m){return `<article><button class="card" data-o="${m.id}" aria-label="${m.name}, ${m.price} ₽">${ph(m.cat)}<h3>${m.name}</h3><p>${m.desc}</p></button><div class="row"><span class="price">${rub(m.price)}</span><button class="plus" data-a="${m.id}" aria-label="Добавить ${m.name}">+</button></div></article>`}
const f=$('#featured');if(f)f.innerHTML=['espresso','cappuccino','flatwhite','icedlatte'].map(id=>card(M.find(m=>m.id==id))).join('');
const bn=$('#beans');if(bn)bn.innerHTML=BEANS.map(b=>`<article class="pack" style="--pc:${b[4]}"><div><small>${b[1].toUpperCase()}</small><h3>${b[0]}</h3></div><ul>${b[2].map(n=>`<li>${n}</li>`).join('')}</ul><small>${b[3]}</small></article>`).join('');
const L=$('#list');
function show(c){$('#tabs').querySelectorAll('button').forEach(b=>b.setAttribute('aria-selected',b.dataset.c==c));
L.innerHTML=M.filter(m=>m.cat==c).map((m,i)=>`<div class="item" style="animation-delay:${i*.05}s" data-o="${m.id}" role="button" tabindex="0" aria-label="${m.name}, ${m.price} ₽"><div>${ph(m.cat)}</div><div><h3>${m.name}</h3><p>${m.desc}</p></div><span class="price">${rub(m.price)}</span></div>`).join('')}
if(L){$('#tabs').innerHTML=Object.entries(CATS).map(([k,v])=>`<button role="tab" data-c="${k}">${v}</button>`).join('');$('#tabs').onclick=e=>{if(e.target.dataset.c)show(e.target.dataset.c)};show('coffee');
L.addEventListener('keydown',e=>{if((e.key=='Enter'||e.key==' ')&&e.target.dataset.o){e.preventDefault();openM(e.target.dataset.o)}})}
document.body.insertAdjacentHTML('beforeend',`<div class="ov" id="mo"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="mt"><div id="mp"></div><div class="mb"><button class="x" id="mx" aria-label="Закрыть">×</button><h2 id="mt"></h2><p id="md" class="dm"></p><div id="mopt"><h4>РАЗМЕР</h4><div class="chips" id="msz">${Object.keys(SZ).map(s=>`<label><input type="radio" name="sz" value="${s}"${s=='M'?' checked':''}><span>${s}</span></label>`).join('')}</div><h4>ДОБАВКИ</h4><div class="chips" id="mad">${Object.entries(AD).map(([k,v])=>`<label><input type="checkbox" value="${k}"><span>${k} +${v} ₽</span></label>`).join('')}</div></div><button class="btn" id="mb2"></button></div></div></div>`);
let cur=null;
function mp(){const s=$('#msz input:checked').value,a=[...document.querySelectorAll('#mad input:checked')].map(i=>i.value);return{id:cur.id,name:cur.name,base:cur.price,opts:cur.opts,size:cur.opts?s:'M',add:cur.opts?a:[],qty:1}}
function upd(){$('#mb2').textContent='Добавить в заказ — '+rub(Cart.price(mp()))}
function openM(id){cur=M.find(m=>m.id==id);$('#mp').innerHTML=ph(cur.cat);$('#mt').textContent=cur.name;$('#md').textContent=cur.desc;$('#mopt').style.display=cur.opts?'block':'none';
document.querySelectorAll('#mo input').forEach(i=>i.checked=(i.name=='sz'&&i.value=='M'));upd();$('#mo').classList.add('o');$('#mx').focus()}
const closeM=()=>$('#mo').classList.remove('o');
$('#mx').onclick=closeM;$('#mo').onclick=e=>{if(e.target.id=='mo')closeM()};$('#mo').addEventListener('change',upd);
$('#mb2').onclick=()=>{Cart.add(mp());closeM();openDrawer()};
document.addEventListener('click',e=>{const a=e.target.closest('[data-a]');if(a){const m=M.find(x=>x.id==a.dataset.a);Cart.add({id:m.id,name:m.name,base:m.price,opts:m.opts,size:'M',add:[],qty:1});return}
const o=e.target.closest('[data-o]');if(o)openM(o.dataset.o)});
