const SZ={S:-30,M:0,L:70},AD={'Extra shot':60,'Овсяное молоко':50,'Ваниль':40,'Карамель':40};
const rub=n=>n.toLocaleString('ru-RU')+' ₽';
const $=(s,r=document)=>r.querySelector(s);
const Cart={items:(()=>{try{return JSON.parse(localStorage.getItem('mocha-cart'))||[]}catch(e){return[]}})(),
price:i=>i.base+(i.opts?SZ[i.size]+i.add.reduce((s,a)=>s+AD[a],0):0),
total(){return this.items.reduce((s,i)=>s+this.price(i)*i.qty,0)},
key:i=>i.id+i.size+i.add.join(),
save(){try{localStorage.setItem('mocha-cart',JSON.stringify(this.items))}catch(e){}this.render()},
add(it){it.k=this.key(it);const f=this.items.find(i=>i.k===it.k);f?f.qty+=it.qty:this.items.push(it);this.save();const b=$('#cb');b.classList.remove('bump');void b.offsetWidth;b.classList.add('bump')},
qty(k,d){const i=this.items.find(x=>x.k===k);i.qty+=d;if(i.qty<1)this.items=this.items.filter(x=>x!==i);this.save()},
del(k){this.items=this.items.filter(x=>x.k!==k);this.save()},
size(k,s){const i=this.items.find(x=>x.k===k);i.size=s;i.k=this.key(i);const d=this.items.find(x=>x!==i&&x.k===i.k);if(d){d.qty+=i.qty;this.items=this.items.filter(x=>x!==i)}this.save()},
render(){const n=this.items.reduce((s,i)=>s+i.qty,0);$('#cn').textContent=n||'';
$('#cl').innerHTML=this.items.length?this.items.map(i=>`<li><div><b>${i.name}</b>${i.opts?`<div class="dm"><select aria-label="Размер ${i.name}" data-k="${i.k}">${Object.keys(SZ).map(s=>`<option${s==i.size?' selected':''}>${s}</option>`).join('')}</select>${i.add.length?' · '+i.add.join(', '):''}</div>`:''}<button class="rm" data-d="${i.k}">Удалить</button></div><div class="price">${rub(this.price(i))}</div><div class="qty"><button data-q="-1" data-k="${i.k}" aria-label="Меньше">−</button><output>${i.qty}</output><button data-q="1" data-k="${i.k}" aria-label="Больше">+</button></div></li>`).join(''):'<li style="display:block;border:0;color:var(--cof)">Пока пусто. Выберите напиток в <a href="menu.html"><u>меню</u></a>.</li>';
$('#tt').textContent=rub(this.total());$('#go').disabled=!this.items.length;$('#go').style.opacity=this.items.length?1:.4}};
function openDrawer(){$('#drawer').classList.add('o');$('#drawer').removeAttribute('inert');$('#ol').classList.add('o');$('#cart-view').style.display='flex';$('#co').style.display='none';$('#dc').focus()}
function closeDrawer(){$('#drawer').classList.remove('o');$('#drawer').setAttribute('inert','');$('#ol').classList.remove('o')}
document.body.insertAdjacentHTML('beforeend',`<div class="ov" id="ol" style="z-index:85"></div>
<aside id="drawer" inert aria-label="Корзина"><header><span class="dh">MØCHA ORDER</span><button class="x" style="position:static" id="dc" aria-label="Закрыть корзину">×</button></header>
<div id="cart-view" style="display:flex;flex-direction:column;flex:1;min-height:0"><ul id="cl"></ul><div class="df"><div class="tot"><span>Итого:</span><b id="tt"></b></div><button class="btn" id="go">Оформить заказ</button></div></div>
<form id="co"><button type="button" class="back" id="bk">← В корзину</button><label for="nm">Имя</label><input id="nm" type="text" required autocomplete="name"><label for="ph">Телефон</label><input id="ph" type="tel" required pattern="[0-9+()\\s\\-]{7,}" placeholder="+7 900 000-00-00">
<label>Способ получения</label><div class="chips"><label><input type="radio" name="m" value="p" checked><span>Забрать в кофейне</span></label><label><input type="radio" name="m" value="d"><span>Доставка</span></label></div>
<div id="dl" class="hid"><label for="ad">Адрес</label><input id="ad" type="text"><label for="pd">Подъезд</label><input id="pd" type="text"><label for="ap">Квартира</label><input id="ap" type="text"></div>
<label>Время</label><div class="chips"><label><input type="radio" name="t" value="a" checked><span>Как можно скорее</span></label><label><input type="radio" name="t" value="t"><span>Выбрать время</span></label></div><input id="tm" type="time" class="hid" aria-label="Время получения">
<button class="btn" type="submit">Отправить заказ</button></form></aside>
<div class="ov" id="done" role="dialog" aria-modal="true" aria-label="Заказ принят"><div class="modal"><h2>ORDER RECEIVED</h2><p class="serif" id="th"></p><p>Ваш заказ принят.</p><p class="no" id="on"></p><a class="btn" href="menu.html" id="dn">Готово</a></div></div>`);
const D=$('#drawer');
$('#dc').onclick=$('#ol').onclick=closeDrawer;
D.addEventListener('click',e=>{const t=e.target;if(t.dataset.q)Cart.qty(t.dataset.k,+t.dataset.q);if(t.dataset.d)Cart.del(t.dataset.d)});
D.addEventListener('change',e=>{const t=e.target;if(t.tagName=='SELECT')Cart.size(t.dataset.k,t.value);if(t.name=='m')$('#dl').classList.toggle('hid',t.value!='d');if(t.name=='t')$('#tm').classList.toggle('hid',t.value!='t')});
$('#go').onclick=()=>{$('#cart-view').style.display='none';$('#co').style.display='block'};
$('#bk').onclick=()=>{$('#co').style.display='none';$('#cart-view').style.display='flex'};
$('#co').onsubmit=e=>{e.preventDefault();const d=$('#co input[name=m]:checked').value=='d';if(d&&!$('#ad').value.trim()){$('#ad').focus();return}
$('#th').textContent='Спасибо, '+$('#nm').value.trim()+'!';$('#on').textContent='№ M-'+Math.floor(1000+Math.random()*9000);
Cart.items=[];Cart.save();e.target.reset();$('#dl').classList.add('hid');$('#tm').classList.add('hid');closeDrawer();$('#done').classList.add('o');$('#dn').focus()};
$('#dn').onclick=e=>{e.preventDefault();$('#done').classList.remove('o')};
Cart.render();
