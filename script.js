// ====== TYPEWRITER with blinking cursor ======
const words=["New Innovator","Web Developer","Designer"]; // edit here
const el=document.getElementById('typeText');
let wi=0, ci=0, del=false;
function typeLoop(){
  const w=words[wi];
  el.textContent=w.slice(0,ci);
  if(!del && ci<=w.length){ ci++; }
  else if(del && ci>=0){ ci--; }
  if(ci===w.length+1){ del=true; setTimeout(typeLoop,1000); return; }
  if(ci===0 && del){ del=false; wi=(wi+1)%words.length; }
  setTimeout(typeLoop, del?60:110);
}
typeLoop();

// ====== SIMPLE ROUTER for per-project pages ======
const pages=document.getElementById('pages');
const projectPages={
  'video-editor':{
    title:'Professional Video Editor',
    desc:'Editing reels, promos, and demos. Color grading, pacing, SFX, and titling for a clean tech look.',
    images:['video1.jpg','video2.jpg','video3.jpg']
  },
  'medicine-reminder':{
    title:'Medicine Reminder System',
    desc:'ESP32-CAM verifies patient, Arduino dispenses medicine, DFPlayer voice prompts, and SMS notifications.',
    images:['med1.jpg','med2.jpg','med3.jpg']
  },
  'medicine-reminder-v2':{
    title:'Medicine Reminder System V2',
    desc:'Mega + L298 shield, 4 slots, RTC scheduling, improved UI and logs.',
    images:['medv2-1.jpg','medv2-2.jpg','medv2-3.jpg']
  },
  'medicare-tracker':{
    title:'Medi Care Tracker',
    desc:'Simple dashboard to track medication schedules and confirmations.',
    images:['mct1.jpg','mct2.jpg','mct3.jpg']
  },
  'slic-2024-silver':{
    title:'SLIC New Innovation — Silver Medal (2024)',
    desc:'All-Island School Inventors Competition. Prototype, presentation and judging demo.',
    images:['slic1.jpg','slic2.jpg','slic3.jpg']
  }
};

function renderPage(key){
  const p=projectPages[key];
  if(!p){ pages.innerHTML=''; return; }
  pages.innerHTML=`
    <div class="page active">
      <div class="projHeader">
        <a class="btn" href="#portfolio">← Back</a>
        <span class="chip">Project</span>
        <h3 style="margin-left:auto">${p.title}</h3>
      </div>
      <p class="subtitle">${p.desc}</p>
      <div class="carousel" id="subCarousel">
        <div class="track">${p.images.map(src=>`<div class='slide' style='font-size:18px'>Replace ${src}</div>`).join('')}</div>
        <button class="carBtn carPrev"><i class="fas fa-chevron-left"></i></button>
        <button class="carBtn carNext"><i class="fas fa-chevron-right"></i></button>
      </div>
    </div>`;
  bindCarousel('#subCarousel');
}

// Handle card clicks -> open page
document.querySelectorAll('.card').forEach(c=>c.addEventListener('click',()=>{
  const slug=c.getAttribute('data-goto');
  location.hash=`#project/${slug}`;
  renderPage(slug);
  window.scrollTo({top:document.getElementById('portfolio').offsetTop-70,behavior:'smooth'});
}));

// Hash router
window.addEventListener('hashchange',()=>{
  const h=location.hash;
  if(h.startsWith('#project/')){ renderPage(h.split('/')[1]); }
  else { pages.innerHTML=''; }
});
if(location.hash.startsWith('#project/')){ renderPage(location.hash.split('/')[1]); }

// ====== CAROUSEL (main + sub) + swipe/drag ======
function bindCarousel(sel){
  const root=document.querySelector(sel); if(!root) return;
  const track=root.querySelector('.track');
  const slides=[...track.children];
  let idx=0, startX=0, curX=0, dragging=false;
  function update(){ track.style.transform=`translateX(${-idx*100}%)`; }
  const next=()=>{ idx=(idx+1)%slides.length; update(); }
  const prev=()=>{ idx=(idx-1+slides.length)%slides.length; update(); }
  root.querySelector('.carNext').onclick=next;
  root.querySelector('.carPrev').onclick=prev;
  // Drag
  const onDown=e=>{ dragging=true; startX=(e.touches?e.touches[0].clientX:e.clientX); track.style.transition='none'; };
  const onMove=e=>{ if(!dragging) return; curX=(e.touches?e.touches[0].clientX:e.clientX); const dx=curX-startX; track.style.transform=`translateX(${(-idx*100)+(dx/window.innerWidth)*100}%)`; };
  const onUp=e=>{ if(!dragging) return; track.style.transition='transform .5s ease'; const dx=(curX-startX); if(Math.abs(dx)>80){ dx<0?next():prev(); } else update(); dragging=false; };
  root.addEventListener('mousedown',onDown); window.addEventListener('mousemove',onMove); window.addEventListener('mouseup',onUp);
  root.addEventListener('touchstart',onDown,{passive:true}); root.addEventListener('touchmove',onMove,{passive:true}); root.addEventListener('touchend',onUp);
  // Auto-play
  let timer=setInterval(next,4000); root.addEventListener('mouseenter',()=>clearInterval(timer)); root.addEventListener('mouseleave',()=>timer=setInterval(next,4000));
  update();
}
bindCarousel('#mainCarousel');

// ====== TECH BACKGROUND CANVAS (moving nodes + links) ======
const canvas=document.getElementById('bgCanvas');
const ctx=canvas.getContext('2d');
let W,H; const nodes=[]; const N=70; const mouse={x:-999,y:-999};
function resize(){ W=canvas.width=innerWidth; H=canvas.height=innerHeight; }
addEventListener('resize',resize); resize();
for(let i=0;i<N;i++) nodes.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*0.6,vy:(Math.random()-.5)*0.6});
canvas.addEventListener('mousemove',e=>{mouse.x=e.clientX;mouse.y=e.clientY});
function tick(){
  ctx.clearRect(0,0,W,H);
  for(const p of nodes){
    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0||p.x>W) p.vx*=-1; if(p.y<0||p.y>H) p.vy*=-1;
    ctx.fillStyle='rgba(0,229,255,.8)'; ctx.fillRect(p.x,p.y,2,2);
  }
  // links
  for(let i=0;i<N;i++) for(let j=i+1;j<N;j++){
    const a=nodes[i], b=nodes[j];
    const dx=a.x-b.x, dy=a.y-b.y, d=Math.hypot(dx,dy);
    if(d<120){ ctx.strokeStyle=`rgba(0,229,255,${1-d/120})`; ctx.lineWidth=0.6; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke(); }
  }
  requestAnimationFrame(tick);
}
tick();

// ====== CUSTOM CURSOR (dot + ring + magnetic hover) ======
const dot=document.getElementById('cursorDot');
const ring=document.getElementById('cursorRing');
window.addEventListener('mousemove',e=>{
  dot.style.left=ring.style.left=e.clientX+'px';
  dot.style.top=ring.style.top=e.clientY+'px';
});
document.querySelectorAll('.btn,.card,.socials a').forEach(el=>{
  el.addEventListener('mouseenter',()=>ring.style.transform='translate(-50%,-50%) scale(1.6)');
  el.addEventListener('mouseleave',()=>ring.style.transform='translate(-50%,-50%) scale(1)');
});

// ====== MAIN CAROUSEL BIND ALREADY CALLED ======

// ====== DOWNLOAD CV (replace href) ======
document.getElementById('downloadCV').href = '#'; // replace with your CV file path