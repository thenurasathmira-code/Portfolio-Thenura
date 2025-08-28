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
      'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/4491461/pexels-photo-4491461.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3585047/pexels-photo-3585047.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    features:['Color Grading & Correction','Motion Graphics & Titles','Sound Design & Mixing','Multi-camera Editing','Export Optimization'],
    tech:['Adobe Premiere Pro','After Effects','DaVinci Resolve','Audition','Media Encoder']
  },
  'medicine-reminder':{
    title:'Medicine Reminder System',
    desc:'IoT-based medicine reminder system using ESP32-CAM for patient verification, automated dispensing, voice prompts, and SMS notifications to caregivers.',
    images:[
      'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    features:['Face Recognition Verification','Automated Medicine Dispensing','Voice Prompts & Alerts','SMS Notifications','Real-time Monitoring'],
    tech:['ESP32-CAM','Arduino Uno','OpenCV','DFPlayer Mini','GSM Module']
  },
  'medicine-reminder-v2':{
    title:'Medicine Reminder System V2',
    desc:'Enhanced version with Arduino Mega, L298 motor shield, 4-slot dispensing system, RTC scheduling, web dashboard, and comprehensive logging system.',
    images:[
      'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1476321/pexels-photo-1476321.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    features:['4-Slot Medicine Storage','RTC Scheduling System','Web Dashboard Interface','Data Logging & Analytics','Improved Motor Control'],
    tech:['Arduino Mega','L298N Motor Shield','RTC Module','ESP8266','HTML/CSS/JS']
  },
  'medicare-tracker':{
    title:'Medi Care Tracker',
    desc:'Web-based patient management system for tracking medication schedules, patient confirmations, and generating reports with mobile-responsive design.',
    images:[
      'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    features:['Patient Schedule Management','Medication Tracking','Mobile-Responsive Design','Report Generation','Notification System'],
    tech:['React.js','Node.js','MongoDB','Express.js','Bootstrap']
  },
  'slic-2024-silver':{
    title:'SLIC New Innovation — Silver Medal (2024)',
    desc:'Award-winning innovation project at the All-Island School Inventors Competition. Comprehensive prototype development, technical presentation, and live demonstration.',
    images:[
      'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200'
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

// ====== MATRIX CODE BACKGROUND ======
function createMatrixRain() {
  const matrix = document.getElementById('matrixCode');
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
  
  function createChar() {
    const char = document.createElement('div');
    char.className = 'matrix-char';
    char.textContent = chars[Math.floor(Math.random() * chars.length)];
    char.style.left = Math.random() * 100 + 'vw';
    char.style.animationDuration = (Math.random() * 3 + 2) + 's';
    char.style.fontSize = (Math.random() * 10 + 10) + 'px';
    matrix.appendChild(char);
    
    setTimeout(() => {
      if (char.parentNode) char.parentNode.removeChild(char);
    }, 5000);
  }
  
  setInterval(createChar, 100);
}
createMatrixRain();

// ====== PARTICLE TRAIL CURSOR ======
const particleTrail = document.getElementById('particleTrail');
let trailParticles = [];

function createParticle(x, y) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = x + 'px';
  particle.style.top = y + 'px';
  particleTrail.appendChild(particle);
  
  setTimeout(() => {
    if (particle.parentNode) particle.parentNode.removeChild(particle);
  }, 1000);
}

let lastParticleTime = 0;
window.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastParticleTime > 50) { // Throttle particle creation
    createParticle(e.clientX, e.clientY);
    lastParticleTime = now;
  }
});

// ====== 3D TILT EFFECT ======
document.querySelectorAll('.tilt-card, .photoFrame').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.setProperty('--rotateX', rotateX + 'deg');
    card.style.setProperty('--rotateY', rotateY + 'deg');
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--rotateX', '0deg');
    card.style.setProperty('--rotateY', '0deg');
  });
});

// ====== DARK/LIGHT MODE TOGGLE ======
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Check for saved theme or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ====== LIVE CHATBOT ======
const chatbot = document.getElementById('chatbot');
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotClose = document.getElementById('chatbotClose');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatMessages = document.getElementById('chatbotMessages');

// Enhanced AI responses with more personality and detail
const botResponses = {
  'who are you': "I'm Thenura Sathmira! 🚀 A passionate innovator and developer from Sri Lanka. I specialize in creating cutting-edge IoT solutions, stunning web applications, and professional video content. I recently won a Silver Medal at SLIC 2024 for my innovative projects!",
  'projects': "🎯 Here are my featured projects:\n\n🏥 **Medicine Reminder Systems** - IoT healthcare solutions with face recognition\n🎬 **Professional Video Editing** - Award-winning content creation\n🏆 **SLIC 2024 Winner** - Silver medal innovation\n💻 **Web Applications** - Modern, responsive solutions\n\nWhich project interests you most?",
  'skills': "💪 **My Technical Arsenal:**\n\n🌐 **Frontend:** React.js, HTML5, CSS3, JavaScript\n🔧 **Hardware:** Arduino, ESP32, Raspberry Pi\n🎨 **Design:** UI/UX, Video Editing, Graphics\n🤖 **AI/ML:** OpenCV, Python, TensorFlow\n🏆 **Innovation:** Award-winning project development\n\nI love combining creativity with technology!",
  'contact': "📞 **Let's Connect!**\n\n📧 Email: thenurasathmira@gmail.com\n📱 Phone: +94 70 400 3956\n💬 WhatsApp: Direct messaging available\n🌍 Location: Padukka, Sri Lanka\n\nI'm always excited to discuss new opportunities and innovative projects!",
  'experience': "🎯 **My Journey:**\n\n🏆 **SLIC 2024 Silver Medalist** - National recognition\n💻 **Full-Stack Developer** - Modern web solutions\n🔧 **IoT Specialist** - Healthcare & automation systems\n🎬 **Video Editor** - Professional content creation\n🎨 **UI/UX Designer** - User-centered design\n\nI bring creativity and technical excellence to every project!",
  'education': "📚 **Continuous Learning:**\n\nI'm passionate about staying at the forefront of technology through:\n• Hands-on project development\n• Competition participation\n• Self-directed learning\n• Industry best practices\n• Innovation challenges\n\nLearning never stops in tech! 🚀",
  'hello': "Hello there! 👋✨ I'm Thenura's AI assistant, powered by advanced conversational AI! I'm here to tell you all about his amazing work, innovative projects, and technical expertise. What would you like to explore?",
  'hi': "Hi! 😊🤖 Welcome to Thenura's portfolio! I'm his intelligent assistant, ready to answer any questions about his projects, skills, achievements, or how to get in touch. What interests you most?",
  'medicine': "🏥 **Medicine Reminder Systems** are my specialty!\n\n**V1 Features:**\n• ESP32-CAM with face recognition\n• Automated dispensing\n• Voice prompts & SMS alerts\n\n**V2 Enhancements:**\n• Arduino Mega with 4-slot system\n• Web dashboard interface\n• Advanced scheduling\n\nThese systems help patients never miss their medication!",
  'video': "🎬 **Professional Video Editing Services:**\n\n• Promotional videos & reels\n• Competition demonstrations\n• Color grading & motion graphics\n• Sound design & mixing\n• Multi-camera editing\n\nI use industry-standard tools like Premiere Pro, After Effects, and DaVinci Resolve to create stunning visual content!",
  'web': "💻 **Web Development Expertise:**\n\n• Modern React.js applications\n• Responsive design principles\n• Full-stack development\n• Database integration\n• Performance optimization\n\nI create fast, beautiful, and user-friendly web experiences!",
  'award': "🏆 **SLIC 2024 Silver Medal Achievement:**\n\nI won recognition at the All-Island School Inventors Competition for my innovative project! This national-level competition showcases the best young inventors in Sri Lanka. The achievement represents:\n\n• Technical innovation\n• Problem-solving skills\n• Presentation excellence\n• Real-world impact\n\nIt's a proud moment in my journey!",
  'default': "🤔 That's an interesting question! I'm here to help you learn about Thenura's work. Try asking about:\n\n• 'projects' - His amazing innovations\n• 'skills' - Technical expertise\n• 'experience' - Professional journey\n• 'contact' - How to reach him\n• 'awards' - Recognition & achievements\n\nWhat would you like to know? 😊"
};

let isTyping = false;

chatbotToggle.addEventListener('click', () => {
  chatbot.classList.add('active');
  chatbotToggle.classList.remove('pulse');
});

chatbotClose.addEventListener('click', () => {
  chatbot.classList.remove('active');
});

function addMessage(message, isUser = false) {
  const messageDiv = document.createElement('div');
  messageDiv.className = isUser ? 'user-message' : 'bot-message';
  messageDiv.innerHTML = `
    <i class="fas fa-${isUser ? 'user' : 'robot'}"></i>
    <span>${message.replace(/\n/g, '<br>')}</span>
  `;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
  const typingDiv = document.createElement('div');
  typingDiv.className = 'typing-indicator';
  typingDiv.id = 'typingIndicator';
  typingDiv.innerHTML = `
    <i class="fas fa-robot"></i>
    <span>Thenura's AI is thinking</span>
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
  `;
  chatMessages.appendChild(typingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
  const typingIndicator = document.getElementById('typingIndicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

function getBotResponse(userMessage) {
  const message = userMessage.toLowerCase();
  for (const key in botResponses) {
    if (message.includes(key)) {
      return botResponses[key];
    }
  }
  return botResponses.default;
}

function sendMessage() {
  const message = chatInput.value.trim();
  if (message && !isTyping) {
    isTyping = true;
    addMessage(message, true);
    chatInput.value = '';
    
    showTypingIndicator();
    
    setTimeout(() => {
      removeTypingIndicator();
      const response = getBotResponse(message);
      addMessage(response);
      isTyping = false;
    }, 1000 + Math.random() * 1000); // Random delay for more natural feel
  }
}

chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !isTyping) sendMessage();
});

// Add pulse effect to chatbot toggle periodically
setInterval(() => {
  if (!chatbot.classList.contains('active')) {
    chatbotToggle.classList.add('pulse');
    setTimeout(() => chatbotToggle.classList.remove('pulse'), 2000);
  }
}, 15000);
// ====== CONTACT FORM WITH EMAILJS ======
// Initialize EmailJS (you'll need to replace with your actual keys)
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key

const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = {
    from_name: document.getElementById('fromName').value,
    from_email: document.getElementById('fromEmail').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value
  };
  
  // Replace with your EmailJS service ID and template ID
  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
    .then(() => {
      alert('Message sent successfully! 🎉');
      contactForm.reset();
    })
    .catch(() => {
      alert('Failed to send message. Please try again or contact directly via email/WhatsApp.');
    });
});

// ====== PDF DOWNLOAD ======
document.getElementById('downloadPDF').addEventListener('click', (e) => {
  e.preventDefault();
  
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  // Add content to PDF
  doc.setFontSize(20);
  doc.text('Thenura Sathmira', 20, 30);
  doc.setFontSize(12);
  doc.text('Web Developer | IoT Specialist | Video Editor', 20, 40);
  doc.text('Email: thenurasathmira@gmail.com', 20, 55);
  doc.text('Phone: +94 70 400 3956', 20, 65);
  doc.text('Location: Padukka', 20, 75);
  
  doc.setFontSize(16);
  doc.text('Skills:', 20, 95);
  doc.setFontSize(12);
  doc.text('• Frontend Development (HTML, CSS, JavaScript, React)', 25, 105);
  doc.text('• Arduino/ESP32 Programming', 25, 115);
  doc.text('• Video Editing (Premiere Pro, After Effects)', 25, 125);
  doc.text('• UI/UX Design', 25, 135);
  doc.text('• IoT Systems Development', 25, 145);
  
  doc.setFontSize(16);
  doc.text('Featured Projects:', 20, 165);
  doc.setFontSize(12);
  doc.text('• Medicine Reminder System (IoT)', 25, 175);
  doc.text('• Professional Video Editing Services', 25, 185);
  doc.text('• SLIC 2024 Silver Medal Winner', 25, 195);
  doc.text('• Web-based Patient Management System', 25, 205);
  
  doc.save('Thenura_Sathmira_Portfolio.pdf');
});

// ====== SUN & MOON DYNAMIC BACKGROUND ======
function initDynamicSky() {
  const sky = document.getElementById('dynamicSky');
  const skyGradient = document.getElementById('skyGradient');
  const sun = document.getElementById('sun');
  const moon = document.getElementById('moon');
  const stars = document.getElementById('stars');
  const clouds = document.getElementById('clouds');
  
  // Create stars
  for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    stars.appendChild(star);
  }
  
  function updateSky() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const timeInMinutes = hours * 60 + minutes;
    
    // Calculate sun and moon positions (0-100% across screen)
    const sunProgress = Math.max(0, Math.min(100, ((timeInMinutes - 360) / 720) * 100)); // 6AM to 6PM
    const moonProgress = timeInMinutes < 360 ? 
      ((timeInMinutes + 720) / 720) * 100 : // Night time (before 6AM)
      ((timeInMinutes - 1080) / 720) * 100; // Night time (after 6PM)
    
    // Position celestial bodies
    const sunY = 20 + Math.sin((sunProgress / 100) * Math.PI) * -10; // Arc motion
    const moonY = 15 + Math.sin((moonProgress / 100) * Math.PI) * -10;
    
    sun.style.left = sunProgress + '%';
    sun.style.top = sunY + '%';
    moon.style.left = moonProgress + '%';
    moon.style.top = moonY + '%';
    
    // Sky themes based on time
    let skyClass = '';
    let sunOpacity = 0;
    let moonOpacity = 0;
    let starsOpacity = 0;
    let cloudsOpacity = 0;
    
    if (hours >= 5 && hours < 7) { // Dawn
      skyClass = 'sky-dawn';
      sunOpacity = 0.8;
      cloudsOpacity = 0.3;
    } else if (hours >= 7 && hours < 10) { // Morning
      skyClass = 'sky-morning';
      sunOpacity = 1;
      cloudsOpacity = 0.5;
    } else if (hours >= 10 && hours < 15) { // Noon
      skyClass = 'sky-noon';
      sunOpacity = 1;
      cloudsOpacity = 0.7;
    } else if (hours >= 15 && hours < 18) { // Afternoon
      skyClass = 'sky-afternoon';
      sunOpacity = 0.9;
      cloudsOpacity = 0.4;
    } else if (hours >= 18 && hours < 20) { // Evening
      skyClass = 'sky-evening';
      sunOpacity = 0.5;
      moonOpacity = 0.3;
      starsOpacity = 0.3;
    } else { // Night
      skyClass = 'sky-night';
      moonOpacity = 1;
      starsOpacity = 1;
    }
    
    // Apply styles
    skyGradient.className = `sky-gradient ${skyClass}`;
    sun.style.opacity = sunOpacity;
    moon.style.opacity = moonOpacity;
    stars.style.opacity = starsOpacity;
    clouds.style.opacity = cloudsOpacity;
  }
  
  // Update immediately and then every minute
  updateSky();
  setInterval(updateSky, 60000);
}

// Initialize dynamic sky
initDynamicSky();

// ====== CUSTOM CURSOR (dot + ring + magnetic hover) ======
const dot=document.getElementById('cursorDot');
const ring=document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

window.addEventListener('mousemove',e=>{
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Smooth cursor animation
function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.1;
  cursorY += (mouseY - cursorY) * 0.1;
  
  dot.style.left = cursorX + 'px';
  dot.style.top = cursorY + 'px';
  ring.style.left = cursorX + 'px';
  ring.style.top = cursorY + 'px';
  
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('.btn,.card,.socials a').forEach(el=>{
  el.addEventListener('mouseenter',()=>ring.style.transform='translate(-50%,-50%) scale(1.6)');
  el.addEventListener('mouseleave',()=>ring.style.transform='translate(-50%,-50%) scale(1)');
});

// ====== PHOTO MOUSE REFLECTION EFFECT ======
const photoFrame = document.querySelector('.photoFrame');
const reflectionOverlay = document.querySelector('.reflectionOverlay');

if (photoFrame && reflectionOverlay) {
  photoFrame.addEventListener('mousemove', (e) => {
    const rect = photoFrame.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 8;
    const rotateY = (centerX - x) / 8;
    
    photoFrame.style.setProperty('--rotateX', rotateX + 'deg');
    photoFrame.style.setProperty('--rotateY', rotateY + 'deg');
    
    const gradientX = (x / rect.width) * 100;
    const gradientY = (y / rect.height) * 100;
    reflectionOverlay.style.background = `radial-gradient(circle at ${gradientX}% ${gradientY}%, rgba(255,255,255,0.6) 0%, rgba(0,229,255,0.3) 30%, transparent 60%)`;
    reflectionOverlay.style.transform = `translateZ(10px)`;
  });
  
  photoFrame.addEventListener('mouseleave', () => {
    photoFrame.style.setProperty('--rotateX', '0deg');
    photoFrame.style.setProperty('--rotateY', '0deg');
    reflectionOverlay.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 30%, transparent 70%, rgba(0,229,255,0.1) 100%)';
    reflectionOverlay.style.transform = 'translateZ(0px)';
  });
}