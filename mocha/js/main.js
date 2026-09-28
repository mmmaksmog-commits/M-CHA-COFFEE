const NAV=[['MENU','menu.html'],['ABOUT','about.html'],['STORY','index.html#story'],['CONTACT','index.html#contact']];
$('#hdr').outerHTML=`<header id="h"><a class="logo" href="index.html" aria-label="MØCHA, на главную">MØCHA</a><nav id="nv" aria-label="Основная">${NAV.map(n=>`<a href="${n[1]}">${n[0]}</a>`).join('')}</nav>
<div class="hr"><a class="fu" href="index.html#contact">📍 Find us</a><button id="th2" aria-label="Переключить тему">◐</button><button id="cb" aria-label="Корзина">🛒<span id="cn"></span></button><button id="bg" aria-label="Меню" aria-expanded="false">☰</button></div></header>`;
$('#ftr').outerHTML=`<footer><div class="cols"><div><b style="font-size:28px">MØCHA</b><p>COFFEE &amp; BAKERY</p></div><div><h4>NAVIGATION</h4>${NAV.map(n=>`<a href="${n[1]}">${n[0][0]+n[0].slice(1).toLowerCase()}</a>`).join('')}</div><div><h4>SOCIAL</h4><a href="https://instagram.com" target="_blank" rel="noopener">Instagram</a><a href="https://t.me" target="_blank" rel="noopener">Telegram</a><a href="https://vk.com" target="_blank" rel="noopener">VK</a></div><div><h4>CONTACT</h4><a href="tel:+70000000000">+7 000 000-00-00</a><a href="mailto:hello@mocha.coffee">hello@mocha.coffee</a></div></div><div class="mega" aria-hidden="true">MØCHA</div><p class="copy">© 2026 MØCHA COFFEE</p></footer>`;
const H=$('#h'),nv=$('#nv'),bg=$('#bg');
const sc=()=>H.classList.toggle('s',scrollY>40);sc();addEventListener('scroll',sc,{passive:true});
bg.onclick=()=>{const o=nv.classList.toggle('o');bg.setAttribute('aria-expanded',o);bg.textContent=o?'✕':'☰'};
nv.onclick=e=>{if(e.target.tagName=='A'){nv.classList.remove('o');bg.textContent='☰'}};
$('#th2').onclick=()=>{const t=document.documentElement.dataset.theme=='dark'?'light':'dark';document.documentElement.dataset.theme=t;try{localStorage.setItem('mocha-theme',t)}catch(e){}};
$('#cb').onclick=openDrawer;
document.body.insertAdjacentHTML('beforeend',`<div class="ov" id="lb" role="dialog" aria-modal="true" aria-label="Галерея"><button class="x" id="lx" style="color:#fff" aria-label="Закрыть">×</button><button class="lbn" id="lp" style="left:3vw" aria-label="Назад">←</button><div class="lbx"><div id="lv"></div><p id="lc"></p></div><button class="lbn" id="ln" style="right:3vw" aria-label="Вперёд">→</button></div>`);
const lb=$('#lb'),G=[['t1','Кофе'],['t2','Интерьер'],['t4','Выпечка'],['t3','Бариста'],['t5','Люди'],['t1','Детали']];let gi=0;
const g=$('#gal');if(g)g.innerHTML=G.map((x,i)=>`<button data-g="${i}" aria-label="Открыть: ${x[1]}"><div class="ph ${x[0]}"></div><span>${x[1]}</span><em>+</em></button>`).join('');
function sg(i){gi=(i+G.length)%G.length;$('#lv').innerHTML=`<div class="ph ${G[gi][0]}"></div>`;$('#lc').textContent=G[gi][1]+' · '+(gi+1)+'/'+G.length}
document.addEventListener('click',e=>{const b=e.target.closest('[data-g]');if(b){sg(+b.dataset.g);lb.classList.add('o');$('#lx').focus()}});
$('#lx').onclick=()=>lb.classList.remove('o');$('#lp').onclick=()=>sg(gi-1);$('#ln').onclick=()=>sg(gi+1);
addEventListener('keydown',e=>{if(e.key=='Escape'){closeDrawer();closeM();$('#done').classList.remove('o');lb.classList.remove('o');nv.classList.remove('o')}
if(lb.classList.contains('o')){if(e.key=='ArrowLeft')sg(gi-1);if(e.key=='ArrowRight')sg(gi+1)}});
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.3});
document.querySelectorAll('.rv').forEach(e=>io.observe(e));
const par=$('[data-par]');if(par&&!matchMedia('(prefers-reduced-motion:reduce)').matches){const s=par.parentNode;addEventListener('scroll',()=>{const r=s.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight)par.style.transform=`translateY(${-r.top*.18}px)`},{passive:true})}
