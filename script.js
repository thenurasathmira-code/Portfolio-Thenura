// ====== TYPEWRITER with blinking cursor ======
const words=["New Innovator","Web Developer","Graphic Designer","Professional Video Editor"]; // edit here
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
    desc:'Professional video editing services including reels, promos, and competition demos. Specializing in color grading, motion graphics, sound design, and storytelling for tech-focused content.',
    images:[
      'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features:['Color Grading & Correction','Motion Graphics & Titles','Sound Design & Mixing','Multi-camera Editing','Export Optimization'],
    tech:['Adobe Premiere Pro','After Effects','DaVinci Resolve','Audition','Media Encoder']
  },
  'medicine-reminder':{
    title:'Medicine Reminder System',
    desc:'IoT-based medicine reminder system using ESP32-CAM for patient verification, automated dispensing, voice prompts, and SMS notifications to caregivers.',
    images:[
      'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features:['Face Recognition Verification','Automated Medicine Dispensing','Voice Prompts & Alerts','SMS Notifications','Real-time Monitoring'],
    tech:['ESP32-CAM','Arduino Uno','OpenCV','DFPlayer Mini','GSM Module']
  },
  'medicine-reminder-v2':{
    title:'Medicine Reminder System V2',
    desc:'Enhanced version with Arduino Mega, L298 motor shield, 4-slot dispensing system, RTC scheduling, web dashboard, and comprehensive logging system.',
    images:[
      'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features:['4-Slot Medicine Storage','RTC Scheduling System','Web Dashboard Interface','Data Logging & Analytics','Improved Motor Control'],
    tech:['Arduino Mega','L298N Motor Shield','RTC Module','ESP8266','HTML/CSS/JS']
  },
  'medicare-tracker':{
    title:'Medi Care Tracker',
    desc:'Web-based patient management system for tracking medication schedules, patient confirmations, and generating reports with mobile-responsive design.',
    images:[
      'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features:['Patient Schedule Management','Medication Tracking','Mobile-Responsive Design','Report Generation','Notification System'],
    tech:['React.js','Node.js','MongoDB','Express.js','Bootstrap']
  },
  'slic-2024-silver':{
    title:'SLIC New Innovation — Silver Medal (2024)',
    desc:'Award-winning innovation project at the All-Island School Inventors Competition. Comprehensive prototype development, technical presentation, and live demonstration.',
    images:[
      'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features:['Innovation Prototype','Technical Presentation','Live Demonstration','Competition Success','Silver Medal Achievement'],
    tech:['Arduino','Sensors','3D Printing','Presentation Skills','Project Management']
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
      
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin:24px 0">
        <div>
          <h4 style="color:var(--neon);margin-bottom:12px">Key Features</h4>
          <ul style="color:var(--muted);line-height:1.6">
            ${p.features.map(f=>`<li style="margin-bottom:6px">• ${f}</li>`).join('')}
          </ul>
        </div>
        <div>
          <h4 style="color:var(--neon);margin-bottom:12px">Technologies Used</h4>
          <div style="display:flex;flex-wrap:wrap;gap:8px">
            ${p.tech.map(t=>`<span class="tech-tag">${t}</span>`).join('')}
          </div>
        </div>
      </div>
      
      <div class="carousel" id="subCarousel">
        <div class="track">${p.images.map(src=>`<div class='slide' style='background-image:url("${src}");background-size:cover;background-position:center'></div>`).join('')}</div>
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

// ====== SKILL TABS ======
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetTab = btn.getAttribute('data-tab');
    
    // Remove active class from all tabs and panels
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.skill-panel').forEach(p => p.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding panel
    btn.classList.add('active');
    document.getElementById(targetTab).classList.add('active');
  });
});

// ====== TECH BACKGROUND CANVAS (moving nodes + links) ======
const canvas=document.getElementById('bgCanvas');
const ctx=canvas.getContext('2d');
let W,H; const nodes=[]; const N=70; const mouse={x:-999,y:-999};
function resize(){ W=canvas.width=innerWidth; H=canvas.height=innerHeight; }
addEventListener('resize',resize); resize();
for(let i=0;i<N;i++) nodes.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*0.6,vy:(Math.random()-.5)*0.6});
canvas.addEventListener('mousemove',e=>{mouse.x=e.clientX;mouse.y=e.clientY});

// Enhanced particle system
const particles = [];
for(let i=0;i<20;i++) {
  particles.push({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.5 + 0.2
  });
}

function tick(){
  ctx.clearRect(0,0,W,H);
  
  // Draw main nodes
  for(const p of nodes){
    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0||p.x>W) p.vx*=-1; if(p.y<0||p.y>H) p.vy*=-1;
    ctx.fillStyle='rgba(0,229,255,.8)'; ctx.fillRect(p.x,p.y,2,2);
  }
  
  // Draw floating particles
  for(const particle of particles) {
    particle.x += particle.vx;
    particle.y += particle.vy;
    if(particle.x < 0 || particle.x > W) particle.vx *= -1;
    if(particle.y < 0 || particle.y > H) particle.vy *= -1;
    
    ctx.fillStyle = `rgba(0,229,255,${particle.opacity})`;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Draw connection lines
  for(let i=0;i<N;i++) for(let j=i+1;j<N;j++){
    const a=nodes[i], b=nodes[j];
    const dx=a.x-b.x, dy=a.y-b.y, d=Math.hypot(dx,dy);
    if(d<120){ 
      ctx.strokeStyle=`rgba(0,229,255,${(1-d/120)*0.6})`; 
      ctx.lineWidth=0.8; 
      ctx.beginPath(); 
      ctx.moveTo(a.x,a.y); 
      ctx.lineTo(b.x,b.y); 
      ctx.stroke(); 
    }
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