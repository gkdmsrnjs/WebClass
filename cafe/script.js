/* ================= decorative SVG ================= */
(function(){
  const NS='http://www.w3.org/2000/svg';
  const greens=['#3F6B4F','#4B7A5A','#2F5740','#5a8a66'];
  const f1=n=>n.toFixed(1);
  function frond(x0,y0,angDeg,len,arch,droop,leaf,color,w){
    const a=angDeg*Math.PI/180, dx=Math.cos(a), dy=Math.sin(a);
    const P0=[x0,y0], P1=[x0+dx*len, y0+dy*len+droop], C=[x0+dx*len*.55, y0+dy*len*.55-arch];
    let d='M'+f1(P0[0])+' '+f1(P0[1])+' Q'+f1(C[0])+' '+f1(C[1])+' '+f1(P1[0])+' '+f1(P1[1]);
    const stem='<path d="'+d+'" stroke="'+color+'" stroke-width="'+(w||2.6)+'" fill="none" stroke-linecap="round"/>';
    let leaves='';
    for(let t=.12;t<=1;t+=.065){
      const u=1-t;
      const px=u*u*P0[0]+2*u*t*C[0]+t*t*P1[0], py=u*u*P0[1]+2*u*t*C[1]+t*t*P1[1];
      let tx=2*u*(C[0]-P0[0])+2*t*(P1[0]-C[0]), ty=2*u*(C[1]-P0[1])+2*t*(P1[1]-C[1]);
      const m=Math.hypot(tx,ty)||1; tx/=m; ty/=m;
      const nx=-ty, ny=tx, l=leaf*(1-t*.65);
      [-1,1].forEach(s=>{
        const ex=px+(nx*s*.9+tx*.55)*l, ey=py+(ny*s*.9+ty*.55)*l+l*.35;
        leaves+='<path d="M'+f1(px)+' '+f1(py)+' L'+f1(ex)+' '+f1(ey)+'" stroke="'+color+'" stroke-width="2.3" stroke-linecap="round"/>';
      });
    }
    return stem+leaves;
  }
  function g(inner,cls,style){return '<g class="'+(cls||'')+'" style="'+(style||'')+'">'+inner+'</g>'}

  // hanging ferns / vines
  const plants=document.getElementById('plants');
  const vines=[[30,300],[110,190],[200,340],[300,120],[390,210],[610,150],[700,260],[790,190],[880,330],[965,210]];
  let html='';
  vines.forEach((v,i)=>{
    const c=greens[i%greens.length];
    const delay=(-i*0.9).toFixed(1), dur=(6+(i%4)*1.3).toFixed(1);
    html+=g(frond(v[0],-6,90,v[1],0,0,22,c,2.4),'sway','animation-duration:'+dur+'s;animation-delay:'+delay+'s;opacity:.92');
  });
  plants.innerHTML=html;

  // palms
  function palm(el){
    const cx=150, cy=150;
    let s='<path d="M150 420 C 158 330 128 250 140 150" stroke="#2F5740" stroke-width="10" fill="none" stroke-linecap="round"/>';
    const angles=[165,-175,-150,-125,-100,-75,-50,-25,-5,15];
    let fr='';
    angles.forEach((a,i)=>{
      const len=105+((i*37)%30);
      fr+=frond(140,cy,a,len,34,46,26,greens[i%3],3);
    });
    el.innerHTML=s+g(fr,'sway','');
  }
  palm(document.getElementById('palmL'));
  palm(document.getElementById('palmR'));
})();

/* ================= helpers ================= */
const won=n=>n.toLocaleString('ko-KR');
const $=s=>document.querySelector(s);
const dots=n=>'●'.repeat(n)+'○'.repeat(3-n);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ================= render menu ================= */
let active='sig';
const tabWrap=$('#tabWrap'), listEl=$('#menuList');
tabWrap.innerHTML=TAB.map(t=>'<button class="tab'+(t.k===active?' active':'')+'" data-k="'+t.k+'"><span class="en">'+t.en+'</span><span class="ko">'+t.ko+'</span></button>').join('');

function itemHTML(it){
  const hasBoth=it.temp==='HI';
  const badges=[];
  if(it.sig) badges.push('<span class="badge sig">SIGNATURE</span>');
  if(it.temp==='H'||hasBoth) badges.push('<span class="badge">HOT</span>');
  if(it.temp==='I'||hasBoth) badges.push('<span class="badge iced">ICED</span>');
  let bean='';
  if(it.bean) bean='<span class="beaninfo">'+it.bean+(it.acid?' · 산미 '+dots(it.acid):'')+'</span>';
  let seg='';
  if(hasBoth) seg='<span class="seg" data-seg="'+it.id+'"><button class="on" data-t="HOT">HOT</button><button data-t="ICED">ICED</button></span>';
  const meta='<div class="badges">'+badges.join('')+bean+'</div>';
  return '<article class="item"><div class="row"><div class="names"><h4>'+it.ko+'</h4><span class="en">'+it.en+'</span></div><span class="leader"></span><span class="price">'+won(it.price)+'</span></div>'+
    '<p class="desc">'+it.desc+'</p>'+
    '<div class="foot">'+meta+'<div class="actions">'+seg+'<button class="add" data-add="'+it.id+'">담기 · Add</button></div></div></article>';
}
function renderMenu(){
  const items=M.filter(i=>i.cat===active);
  let out='';
  if(active==='coffee'){
    out+='<div class="beans"><div class="bean"><b>Moon Blend · 문 블렌드</b><span class="dots">'+dots(1)+'</span><p>고소함, 산미 낮음 · 브라질, 콜롬비아 / Nutty, low acidity</p></div>'+
         '<div class="bean"><b>Sunrise Single · 선라이즈 싱글</b><span class="dots">'+dots(3)+'</span><p>과일향, 산미 높음 · 에티오피아 / Fruity, bright acidity</p></div></div>';
  }
  let lastSub=null;
  items.forEach(it=>{
    if(Array.isArray(it.sub) && it.sub[0]!==lastSub){
      lastSub=it.sub[0];
      out+='<div class="sub-title">'+it.sub[1]+' <span class="ko">'+it.sub[0]+'</span></div><hr class="double-rule" style="margin:6px 0 4px">';
    }
    out+=itemHTML(it);
  });
  listEl.innerHTML='<div class="menu-list">'+out+'</div>';
}
tabWrap.addEventListener('click',e=>{
  const b=e.target.closest('.tab'); if(!b) return;
  active=b.dataset.k;
  tabWrap.querySelectorAll('.tab').forEach(x=>x.classList.toggle('active',x===b));
  b.scrollIntoView({inline:'center',block:'nearest',behavior:'smooth'});
  renderMenu();
  const top=$('#tabs').getBoundingClientRect().top+window.scrollY-56;
  if(window.scrollY>top) window.scrollTo({top:top+1});
});
renderMenu();

/* allergy list (generated from data) */
(function(){
  const out=Object.keys(A).map(k=>{
    const names=M.filter(i=>i.al.includes(k)).map(i=>i.ko);
    return '<div><dt>'+k+' '+A[k]+'</dt> <dd>: '+names.join(', ')+'</dd></div>';
  });
  $('#allergyList').innerHTML=out.join('');
})();

/* ================= cart ================= */
let cart=[];
try{cart=JSON.parse(localStorage.getItem('moonlight-cart')||'[]').filter(l=>M[l.id])}catch(e){cart=[]}
const save=()=>{try{localStorage.setItem('moonlight-cart',JSON.stringify(cart))}catch(e){}};
const cartbar=$('#cartbar'), overlay=$('#overlay'), sheet=$('#sheet');

function totals(){let n=0,t=0;cart.forEach(l=>{n+=l.qty;t+=l.qty*M[l.id].price});return{n,t}}
function updateBar(bump){
  const {n,t}=totals();
  $('#cartCount').textContent=n; $('#cartTotal').textContent=won(t)+'원';
  cartbar.classList.toggle('show',n>0);
  if(bump){const c=$('#cartCount');c.classList.remove('bump');void c.offsetWidth;c.classList.add('bump')}
  save();
}
function tempLabel(l){return l.temp?l.temp:''}
function addToCart(id,temp){
  const it=M[id]; const t=it.temp==='HI'?temp:(it.temp==='H'?'HOT':(it.temp==='I'?'ICED':''));
  const f=cart.find(l=>l.id===id&&l.temp===t);
  if(f) f.qty++; else cart.push({id,temp:t,qty:1});
  updateBar(true);
}
listEl.addEventListener('click',e=>{
  const sb=e.target.closest('.seg button');
  if(sb){sb.parentElement.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===sb));return}
  const ab=e.target.closest('.add');
  if(ab){
    const id=+ab.dataset.add; const seg=listEl.querySelector('[data-seg="'+id+'"]');
    const temp=seg?seg.querySelector('.on').dataset.t:'';
    addToCart(id,temp);
    ab.textContent='담았어요 ✓'; setTimeout(()=>{ab.textContent='담기 · Add'},900);
  }
});

let tableNo='';
function openSheet(){renderSheet();overlay.classList.add('open');sheet.classList.add('open')}
function closeSheet(){overlay.classList.remove('open');sheet.classList.remove('open')}
cartbar.addEventListener('click',openSheet);
cartbar.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openSheet()}});
overlay.addEventListener('click',closeSheet);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeSheet()});

function renderSheet(){
  const {t}=totals();
  if(!cart.length){
    sheet.innerHTML='<h3>Your Order <small>주문 요약</small><button class="close" data-close aria-label="닫기">×</button></h3><div class="empty">담은 메뉴가 없어요.<br>Your order is empty.</div>';
    return;
  }
  const lines=cart.map((l,i)=>{const it=M[l.id];return '<div class="line"><div class="nm">'+it.ko+(l.temp?' · '+l.temp:'')+'<small>'+it.en+'</small></div><div class="lt">'+won(it.price*l.qty)+'</div><div class="qty"><button data-dec="'+i+'" aria-label="줄이기">−</button><span>'+l.qty+'</span><button data-inc="'+i+'" aria-label="늘리기">+</button></div><button class="rm" data-rm="'+i+'">삭제 · Remove</button></div>'}).join('');
  sheet.innerHTML='<h3>Your Order <small>주문 요약</small><button class="close" data-close aria-label="닫기">×</button></h3>'+lines+
    '<div class="sum"><span>합계 · Total</span><span>'+won(t)+'원</span></div>'+
    '<div class="table-field"><label for="tbl">테이블 번호<br><small style="color:var(--taupe)">Table No.</small></label><input id="tbl" inputmode="numeric" maxlength="3" placeholder="예: 7" value="'+esc(tableNo)+'"></div><div class="hint" id="hint"></div>'+
    '<button class="primary" data-place>주문하기 · Place order</button>'+
    '<p class="demo-note">실제 주문이 아닙니다. 수업 실습용입니다.<br>This is a demo, no real order is placed.</p>';
}
sheet.addEventListener('input',e=>{if(e.target.id==='tbl'){tableNo=e.target.value;const h=$('#hint');if(h)h.textContent=''}});
sheet.addEventListener('click',e=>{
  const t=e.target;
  if(t.closest('[data-close]')) return closeSheet();
  const inc=t.closest('[data-inc]'), dec=t.closest('[data-dec]'), rm=t.closest('[data-rm]');
  if(inc){cart[+inc.dataset.inc].qty++} else if(dec){const i=+dec.dataset.dec;if(--cart[i].qty<=0)cart.splice(i,1)} else if(rm){cart.splice(+rm.dataset.rm,1)}
  if(inc||dec||rm){updateBar();renderSheet();if(!cart.length)setTimeout(closeSheet,500);return}
  if(t.closest('[data-place]')){
    if(!tableNo.trim()){$('#hint').textContent='테이블 번호를 입력해 주세요. / Please enter your table number.';$('#tbl').focus();return}
    showConfirm();
  }
  if(t.closest('[data-new]')){cart=[];tableNo='';updateBar();closeSheet()}
});
function showConfirm(){
  const {t}=totals();
  const lis=cart.map(l=>{const it=M[l.id];return '<li><span>'+it.ko+(l.temp?' · '+l.temp:'')+' × '+l.qty+'<br><small style="color:var(--taupe);font-family:var(--serif-en);font-style:italic">'+it.en+'</small></span><span>'+won(it.price*l.qty)+'</span></li>'}).join('');
  sheet.innerHTML='<div class="confirm"><h3>Order Summary <small>주문 확인</small><button class="close" data-close aria-label="닫기">×</button></h3>'+
    '<div class="tbl">Table '+esc(tableNo.trim())+' · 테이블 '+esc(tableNo.trim())+'</div><ul>'+lis+'</ul>'+
    '<div class="sum"><span>합계 · Total</span><span>'+won(t)+'원</span></div>'+
    '<div class="show-staff">이 화면을 직원에게 보여주세요.<br>Please show this screen to our staff.</div>'+
    '<button class="primary" data-new>새 주문 · New order</button>'+
    '<p class="demo-note">실제 주문이 아닙니다. 수업 실습용입니다.<br>This is a demo, no real order is placed.</p></div>';
}
updateBar();

/* ================= misc ================= */
document.querySelectorAll('[data-go="menu"]').forEach(b=>b.addEventListener('click',()=>{
  const y=$('#menu').getBoundingClientRect().top+window.scrollY-56;
  window.scrollTo({top:y,behavior:'smooth'});
}));
const header=$('#header');
const onScroll=()=>header.classList.toggle('scrolled',window.scrollY>window.innerHeight*.72);
window.addEventListener('scroll',onScroll,{passive:true}); onScroll();
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'))}
