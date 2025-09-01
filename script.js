// ====== TYPEWRITER with blinking cursor ======
const words = ["New Innovator", "Web Developer", "Graphic Designer", "Professional Video Editor"];
const el = document.getElementById('typeText');
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const currentWord = words[wordIndex];
  
  if (!isDeleting && charIndex <= currentWord.length) {
    el.textContent = currentWord.slice(0, charIndex);
    charIndex++;
  } else if (isDeleting && charIndex >= 0) {
    el.textContent = currentWord.slice(0, charIndex);
    charIndex--;
  }
  
  if (charIndex === currentWord.length + 1) {
    isDeleting = true;
    setTimeout(typeLoop, 1000);
    return;
  }
  
  if (charIndex === 0 && isDeleting) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }
  
  setTimeout(typeLoop, isDeleting ? 60 : 110);
}

// Start typewriter effect
document.addEventListener('DOMContentLoaded', () => {
  typeLoop();
});

// ====== PROJECT ROUTER for expandable project pages ======
const pages = document.getElementById('pages');
const projectPages = {
  'video-editor': {
    title: 'Professional Video Editor',
    desc: 'Professional video editing services including reels, promos, and competition demos. Specializing in color grading, motion graphics, sound design, and storytelling for tech-focused content.',
    images: [
      'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/4491461/pexels-photo-4491461.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3585047/pexels-photo-3585047.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    features: ['Color Grading & Correction', 'Motion Graphics & Titles', 'Sound Design & Mixing', 'Multi-camera Editing', 'Export Optimization'],
    tech: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Audition', 'Media Encoder']
  },
  'medicine-reminder': {
    title: 'Medicine Reminder System',
    desc: 'IoT-based medicine reminder system using ESP32-CAM for patient verification, automated dispensing, voice prompts, and SMS notifications to caregivers.',
    images: [
      'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    features: ['Face Recognition Verification', 'Automated Medicine Dispensing', 'Voice Prompts & Alerts', 'SMS Notifications', 'Real-time Monitoring'],
    tech: ['ESP32-CAM', 'Arduino Uno', 'OpenCV', 'DFPlayer Mini', 'GSM Module']
  },
  'medicine-reminder-v2': {
    title: 'Medicine Reminder System V2',
    desc: 'Enhanced version with Arduino Mega, L298 motor shield, 4-slot dispensing system, RTC scheduling, web dashboard, and comprehensive logging system.',
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1476321/pexels-photo-1476321.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    features: ['4-Slot Medicine Storage', 'RTC Scheduling System', 'Web Dashboard Interface', 'Data Logging & Analytics', 'Improved Motor Control'],
    tech: ['Arduino Mega', 'L298N Motor Shield', 'RTC Module', 'ESP8266', 'HTML/CSS/JS']
  },
  'medicare-tracker': {
    title: 'Medi Care Tracker',
    desc: 'Web-based patient management system for tracking medication schedules, patient confirmations, and generating reports with mobile-responsive design.',
    images: [
      'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    features: ['Patient Schedule Management', 'Medication Tracking', 'Mobile-Responsive Design', 'Report Generation', 'Notification System'],
    tech: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Bootstrap']
  },
  'slic-2024-silver': {
    title: 'SLIC New Innovation — Silver Medal (2024)',
    desc: 'Award-winning innovation project at the All-Island School Inventors Competition. Comprehensive prototype development, technical presentation, and live demonstration.',
    images: [
      'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    features: ['Innovation Prototype', 'Technical Presentation', 'Live Demonstration', 'Competition Success', 'Silver Medal Achievement'],
    tech: ['Arduino', 'Sensors', '3D Printing', 'Presentation Skills', 'Project Management']
  }
};

function renderPage(key) {
  const project = projectPages[key];
  if (!project) {
    pages.innerHTML = '';
    return;
  }
  
  pages.innerHTML = `
    <div class="page active">
      <div class="projHeader">
        <a class="btn" href="#portfolio">← Back</a>
        <span class="chip">Project</span>
        <h3 style="margin-left:auto">${project.title}</h3>
      </div>
      <p class="subtitle">${project.desc}</p>
      
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin:24px 0">
        <div>
          <h4 style="color:var(--neon);margin-bottom:12px">Key Features</h4>
          <ul style="color:var(--muted);line-height:1.6">
            ${project.features.map(f => `<li style="margin-bottom:6px">• ${f}</li>`).join('')}
          </ul>
        </div>
        <div>
          <h4 style="color:var(--neon);margin-bottom:12px">Technologies Used</h4>
          <div style="display:flex;flex-wrap:wrap;gap:8px">
            ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
        </div>
      </div>
      
      <div class="carousel" id="subCarousel">
        <div class="track">${project.images.map(src => `<div class='slide' style='background-image:url("${src}");background-size:cover;background-position:center'></div>`).join('')}</div>
        <button class="carBtn carPrev"><i class="fas fa-chevron-left"></i></button>
        <button class="carBtn carNext"><i class="fas fa-chevron-right"></i></button>
      </div>
    </div>`;
  
  bindCarousel('#subCarousel');
}

// ====== CAROUSEL (main + sub) + swipe/drag ======
function bindCarousel(selector) {
  const root = document.querySelector(selector);
  if (!root) return;
  
  const track = root.querySelector('.track');
  const slides = [...track.children];
  let currentIndex = 0;
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  
  function updateCarousel() {
    track.style.transform = `translateX(${-currentIndex * 100}%)`;
  }
  
  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  };
  
  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  };
  
  // Button controls
  const nextBtn = root.querySelector('.carNext');
  const prevBtn = root.querySelector('.carPrev');
  if (nextBtn) nextBtn.onclick = nextSlide;
  if (prevBtn) prevBtn.onclick = prevSlide;
  
  // Drag functionality
  const onStart = (e) => {
    isDragging = true;
    startX = e.touches ? e.touches[0].clientX : e.clientX;
    track.style.transition = 'none';
  };
  
  const onMove = (e) => {
    if (!isDragging) return;
    currentX = e.touches ? e.touches[0].clientX : e.clientX;
    const deltaX = currentX - startX;
    track.style.transform = `translateX(${(-currentIndex * 100) + (deltaX / window.innerWidth) * 100}%)`;
  };
  
  const onEnd = () => {
    if (!isDragging) return;
    track.style.transition = 'transform 0.5s ease';
    const deltaX = currentX - startX;
    
    if (Math.abs(deltaX) > 80) {
      deltaX < 0 ? nextSlide() : prevSlide();
    } else {
      updateCarousel();
    }
    
    isDragging = false;
  };
  
  // Mouse events
  root.addEventListener('mousedown', onStart);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onEnd);
  
  // Touch events
  root.addEventListener('touchstart', onStart, { passive: true });
  root.addEventListener('touchmove', onMove, { passive: true });
  root.addEventListener('touchend', onEnd);
  
  // Auto-play
  let autoPlayTimer = setInterval(nextSlide, 4000);
  root.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
  root.addEventListener('mouseleave', () => autoPlayTimer = setInterval(nextSlide, 4000));
  
  updateCarousel();
}

// ====== SKILL TABS ======
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      
      // Remove active class from all tabs and panels
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.skill-panel').forEach(p => p.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding panel
      btn.classList.add('active');
      const panel = document.getElementById(targetTab);
      if (panel) panel.classList.add('active');
    });
  });

  // Handle card clicks -> open project details
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const slug = card.getAttribute('data-goto');
      if (slug) {
        location.hash = `#project/${slug}`;
        renderPage(slug);
        window.scrollTo({
          top: document.getElementById('portfolio').offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });

  // Initialize main carousel
  bindCarousel('#mainCarousel');
});

// Hash router for project pages
window.addEventListener('hashchange', () => {
  const hash = location.hash;
  if (hash.startsWith('#project/')) {
    renderPage(hash.split('/')[1]);
  } else {
    pages.innerHTML = '';
  }
});

// Initialize project page if hash exists
if (location.hash.startsWith('#project/')) {
  renderPage(location.hash.split('/')[1]);
}

// ====== TECH BACKGROUND CANVAS (moving nodes + links) ======
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let canvasWidth, canvasHeight;
const nodes = [];
const nodeCount = 70;
const mouse = { x: -999, y: -999 };

function resizeCanvas() {
  canvasWidth = canvas.width = window.innerWidth;
  canvasHeight = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Initialize nodes
for (let i = 0; i < nodeCount; i++) {
  nodes.push({
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6
  });
}

canvas.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Enhanced particle system
const particles = [];
for (let i = 0; i < 20; i++) {
  particles.push({
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.5 + 0.2
  });
}

function animateCanvas() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
  // Draw main nodes
  for (const node of nodes) {
    node.x += node.vx;
    node.y += node.vy;
    
    if (node.x < 0 || node.x > canvasWidth) node.vx *= -1;
    if (node.y < 0 || node.y > canvasHeight) node.vy *= -1;
    
    ctx.fillStyle = 'rgba(0,229,255,0.8)';
    ctx.fillRect(node.x, node.y, 2, 2);
  }
  
  // Draw floating particles
  for (const particle of particles) {
    particle.x += particle.vx;
    particle.y += particle.vy;
    
    if (particle.x < 0 || particle.x > canvasWidth) particle.vx *= -1;
    if (particle.y < 0 || particle.y > canvasHeight) particle.vy *= -1;
    
    ctx.fillStyle = `rgba(0,229,255,${particle.opacity})`;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Draw connection lines
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      const nodeA = nodes[i];
      const nodeB = nodes[j];
      const dx = nodeA.x - nodeB.x;
      const dy = nodeA.y - nodeB.y;
      const distance = Math.hypot(dx, dy);
      
      if (distance < 120) {
        ctx.strokeStyle = `rgba(0,229,255,${(1 - distance / 120) * 0.6})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(nodeA.x, nodeA.y);
        ctx.lineTo(nodeB.x, nodeB.y);
        ctx.stroke();
      }
    }
  }
  
  requestAnimationFrame(animateCanvas);
}

animateCanvas();

// ====== CUSTOM CURSOR (dot + ring + magnetic hover) ======
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

window.addEventListener('mousemove', e => {
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

// Magnetic hover effects
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.btn, .card, .socials a').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.transform = 'translate(-50%, -50%) scale(1.6)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
});

// ====== PHOTO MOUSE REFLECTION EFFECT ======
document.addEventListener('DOMContentLoaded', () => {
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
      reflectionOverlay.style.background = `radial-gradient(circle at ${gradientX}% ${gradientY}%, rgba(255,255,255,0.5) 0%, rgba(0,229,255,0.4) 25%, rgba(0,229,255,0.1) 50%, transparent 70%)`;
    });
    
    photoFrame.addEventListener('mouseleave', () => {
      photoFrame.style.setProperty('--rotateX', '0deg');
      photoFrame.style.setProperty('--rotateY', '0deg');
      reflectionOverlay.style.background = 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, rgba(0,229,255,0.2) 30%, transparent 60%)';
    });
  }
});

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
document.addEventListener('DOMContentLoaded', () => {
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
});

// ====== DARK/LIGHT MODE TOGGLE ======
document.addEventListener('DOMContentLoaded', () => {
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
});

// ====== PRO MODE TOGGLE ======
document.addEventListener('DOMContentLoaded', () => {
  const proToggle = document.getElementById('proToggle');
  const body = document.body;
  let isProMode = false;
  let dragonCursor = null;
  let dragonTrailInterval = null;

  proToggle.addEventListener('click', () => {
    isProMode = !isProMode;
    
    if (isProMode) {
      // Activate Pro Mode
      body.classList.add('pro-mode');
      proToggle.classList.add('active');
      
      // Hide default cursor
      document.getElementById('cursorDot').style.display = 'none';
      document.getElementById('cursorRing').style.display = 'none';
      
      // Create dragon cursor
      dragonCursor = document.createElement('div');
      dragonCursor.className = 'dragon-cursor';
      dragonCursor.id = 'dragonCursor';
      document.body.appendChild(dragonCursor);
      
      // Dragon trail effect
      dragonTrailInterval = setInterval(() => {
        if (mouseX > 0 && mouseY > 0) {
          const trail = document.createElement('div');
          trail.className = 'dragon-trail';
          trail.style.left = mouseX + 'px';
          trail.style.top = mouseY + 'px';
          document.body.appendChild(trail);
          
          setTimeout(() => {
            if (trail.parentNode) trail.parentNode.removeChild(trail);
          }, 800);
        }
      }, 50);
      
    } else {
      // Deactivate Pro Mode
      body.classList.remove('pro-mode');
      proToggle.classList.remove('active');
      
      // Show default cursor
      document.getElementById('cursorDot').style.display = 'block';
      document.getElementById('cursorRing').style.display = 'block';
      
      // Remove dragon cursor
      if (dragonCursor) {
        dragonCursor.remove();
        dragonCursor = null;
      }
      
      // Clear dragon trail
      if (dragonTrailInterval) {
        clearInterval(dragonTrailInterval);
        dragonTrailInterval = null;
      }
      
      // Remove existing trails
      document.querySelectorAll('.dragon-trail').forEach(trail => trail.remove());
    }
  });

  // Update dragon cursor position
  function updateDragonCursor() {
    if (dragonCursor && isProMode) {
      dragonCursor.style.left = mouseX + 'px';
      dragonCursor.style.top = mouseY + 'px';
    }
    requestAnimationFrame(updateDragonCursor);
  }

  updateDragonCursor();
});

// ====== LIVE CHATBOT ======
document.addEventListener('DOMContentLoaded', () => {
  const chatbot = document.getElementById('chatbot');
  const chatbotToggle = document.getElementById('chatbotToggle');
  const chatbotClose = document.getElementById('chatbotClose');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');
  const chatMessages = document.getElementById('chatbotMessages');

  // Enhanced AI responses with more personality and detail
  const botResponses = {
    'who are you': "I'm Thenura Sathmira! 🚀 A passionate innovator and developer from Sri Lanka. I specialize in creating cutting-edge IoT solutions, stunning web applications, and professional video content. I recently won a Silver Medal at SLIC 2024 for my innovative projects!\n\n💡 Try activating PRO MODE for an enhanced experience!",
    'projects': "🎯 Here are my featured projects:\n\n🏥 **Medicine Reminder Systems** - IoT healthcare solutions with face recognition\n🎬 **Professional Video Editing** - Award-winning content creation\n🏆 **SLIC 2024 Winner** - Silver medal innovation\n💻 **Web Applications** - Modern, responsive solutions\n\nWhich project interests you most?",
    'skills': "💪 **My Technical Arsenal:**\n\n🌐 **Frontend:** React.js, HTML5, CSS3, JavaScript\n🔧 **Hardware:** Arduino, ESP32, Raspberry Pi\n🎨 **Design:** UI/UX, Video Editing, Graphics\n🤖 **AI/ML:** OpenCV, Python, TensorFlow\n🏆 **Innovation:** Award-winning project development\n\n🐉 **PRO TIP:** Enable PRO MODE for dragon cursor effects!",
    'contact': "📞 **Let's Connect!**\n\n📧 Email: thenurasathmira@gmail.com\n📱 Phone: +94 70 400 3956\n💬 WhatsApp: Direct messaging available\n🌍 Location: Padukka, Sri Lanka\n\nI'm always excited to discuss new opportunities and innovative projects!",
    'experience': "🎯 **My Journey:**\n\n🏆 **SLIC 2024 Silver Medalist** - National recognition\n💻 **Full-Stack Developer** - Modern web solutions\n🔧 **IoT Specialist** - Healthcare & automation systems\n🎬 **Video Editor** - Professional content creation\n🎨 **UI/UX Designer** - User-centered design\n\nI bring creativity and technical excellence to every project!",
    'education': "📚 **Continuous Learning:**\n\nI'm passionate about staying at the forefront of technology through:\n• Hands-on project development\n• Competition participation\n• Self-directed learning\n• Industry best practices\n• Innovation challenges\n\nLearning never stops in tech! 🚀",
    'hello': "Hello there! 👋✨ I'm Thenura's AI assistant, powered by advanced conversational AI! I'm here to tell you all about his amazing work, innovative projects, and technical expertise.\n\n🐉 **SECRET:** Try the PRO MODE button for dragon effects!\n\nWhat would you like to explore?",
    'hi': "Hi! 😊🤖 Welcome to Thenura's portfolio! I'm his intelligent assistant, ready to answer any questions about his projects, skills, achievements, or how to get in touch.\n\n✨ **TIP:** Click the dragon button for PRO MODE!\n\nWhat interests you most?",
    'medicine': "🏥 **Medicine Reminder Systems** are my specialty!\n\n**V1 Features:**\n• ESP32-CAM with face recognition\n• Automated dispensing\n• Voice prompts & SMS alerts\n\n**V2 Enhancements:**\n• Arduino Mega with 4-slot system\n• Web dashboard interface\n• Advanced scheduling\n\nThese systems help patients never miss their medication!",
    'video': "🎬 **Professional Video Editing Services:**\n\n• Promotional videos & reels\n• Competition demonstrations\n• Color grading & motion graphics\n• Sound design & mixing\n• Multi-camera editing\n\nI use industry-standard tools like Premiere Pro, After Effects, and DaVinci Resolve to create stunning visual content!",
    'web': "💻 **Web Development Expertise:**\n\n• Modern React.js applications\n• Responsive design principles\n• Full-stack development\n• Database integration\n• Performance optimization\n\nI create fast, beautiful, and user-friendly web experiences!",
    'award': "🏆 **SLIC 2024 Silver Medal Achievement:**\n\nI won recognition at the All-Island School Inventors Competition for my innovative project! This national-level competition showcases the best young inventors in Sri Lanka. The achievement represents:\n\n• Technical innovation\n• Problem-solving skills\n• Presentation excellence\n• Real-world impact\n\nIt's a proud moment in my journey!",
    'pro mode': "🐉 **PRO MODE ACTIVATED!** 🔥\n\nYou've unlocked the ultimate portfolio experience:\n\n• **Dragon Cursor** - Mystical dragon follows your mouse\n• **Enhanced Effects** - Amplified visual effects\n• **Dark Matrix** - Deep space background\n• **Fire Trails** - Dragon leaves glowing trails\n• **Elite Experience** - Premium tech aesthetics\n\nWelcome to the next level! 🚀",
    'dragon': "🐉 **DRAGON MODE!** 🔥\n\nThe dragon cursor represents power, innovation, and mystical technology! In many cultures, dragons symbolize:\n\n• **Wisdom & Knowledge** - Like Thenura's expertise\n• **Power & Strength** - Technical capabilities\n• **Innovation & Magic** - Creative solutions\n• **Protection & Guidance** - Reliable development\n\nClick the dragon button to unleash the power! ⚡",
    'default': "🤔 That's an interesting question! I'm here to help you learn about Thenura's work. Try asking about:\n\n• 'projects' - His amazing innovations\n• 'skills' - Technical expertise\n• 'experience' - Professional journey\n• 'contact' - How to reach him\n• 'awards' - Recognition & achievements\n• 'pro mode' - Unlock dragon effects\n\nWhat would you like to know? 😊"
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
});

// ====== CONTACT FORM ======
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
      from_name: document.getElementById('fromName').value,
      from_email: document.getElementById('fromEmail').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };
    
    // For demo purposes, show success message
    alert('Message sent successfully! 🎉\n\nNote: To enable actual email sending, configure EmailJS with your credentials.');
    contactForm.reset();
  });
});