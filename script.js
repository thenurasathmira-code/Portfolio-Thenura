// Initialize EmailJS
(function() {
    emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS user ID
})();

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

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

// Pro Mode Toggle
const proToggle = document.getElementById('proToggle');
let isProMode = false;

proToggle.addEventListener('click', () => {
    isProMode = !isProMode;
    body.classList.toggle('pro-mode', isProMode);
    proToggle.classList.toggle('active', isProMode);
    
    if (isProMode) {
        // Enable dragon cursor
        enableDragonCursor();
        // Show background effects
        document.querySelector('.matrix-code').style.display = 'block';
        document.querySelector('.floating-particles').style.display = 'block';
        document.querySelector('.floating-3d-elements').style.display = 'block';
        document.querySelector('.scanlines').style.display = 'block';
    } else {
        // Disable dragon cursor
        disableDragonCursor();
        // Hide background effects
        document.querySelector('.matrix-code').style.display = 'none';
        document.querySelector('.floating-particles').style.display = 'none';
        document.querySelector('.floating-3d-elements').style.display = 'none';
        document.querySelector('.scanlines').style.display = 'none';
    }
});

// Dragon Cursor System
let dragonCursor = null;
let dragonTrails = [];

function enableDragonCursor() {
    // Hide normal cursor
    document.getElementById('cursorDot').style.display = 'none';
    document.getElementById('cursorRing').style.display = 'none';
    
    // Create dragon cursor
    dragonCursor = document.createElement('div');
    dragonCursor.className = 'dragon-cursor';
    document.body.appendChild(dragonCursor);
    
    // Update dragon position on mouse move
    document.addEventListener('mousemove', updateDragonCursor);
}

function disableDragonCursor() {
    // Show normal cursor
    document.getElementById('cursorDot').style.display = 'block';
    document.getElementById('cursorRing').style.display = 'block';
    
    // Remove dragon cursor
    if (dragonCursor) {
        dragonCursor.remove();
        dragonCursor = null;
    }
    
    // Clear trails
    dragonTrails.forEach(trail => trail.remove());
    dragonTrails = [];
    
    document.removeEventListener('mousemove', updateDragonCursor);
}

function updateDragonCursor(e) {
    if (!dragonCursor) return;
    
    dragonCursor.style.left = e.clientX + 'px';
    dragonCursor.style.top = e.clientY + 'px';
    
    // Create fire trail
    createDragonTrail(e.clientX, e.clientY);
}

function createDragonTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'dragon-trail';
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';
    document.body.appendChild(trail);
    
    dragonTrails.push(trail);
    
    // Remove trail after animation
    setTimeout(() => {
        trail.remove();
        const index = dragonTrails.indexOf(trail);
        if (index > -1) dragonTrails.splice(index, 1);
    }, 800);
}

// Custom Cursor (Normal Mode)
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

document.addEventListener('mousemove', (e) => {
    if (isProMode) return; // Skip if in pro mode
    
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
    
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top = e.clientY + 'px';
    
    // Create particle trail
    createParticle(e.clientX, e.clientY);
});

function createParticle(x, y) {
    if (isProMode) return; // Skip if in pro mode
    
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    document.getElementById('particleTrail').appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// Typewriter Effect
const typeText = document.getElementById('typeText');
const words = ['New Innovator', 'Web Developer', 'Graphic Designer', 'Professional Video Editor'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typeText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Start typewriter effect
typeWriter();

// Photo Mouse Reflection Effect
const photoFrame = document.querySelector('.photoFrame');
const reflectionOverlay = document.querySelector('.reflectionOverlay');

if (photoFrame && reflectionOverlay) {
    photoFrame.addEventListener('mousemove', (e) => {
        const rect = photoFrame.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        // Apply 3D tilt
        photoFrame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        // Update reflection
        const gradientX = (x / rect.width) * 100;
        const gradientY = (y / rect.height) * 100;
        
        reflectionOverlay.style.background = `radial-gradient(circle at ${gradientX}% ${gradientY}%, rgba(255,255,255,0.15) 0%, rgba(0,229,255,0.08) 30%, transparent 60%)`;
    });
    
    photoFrame.addEventListener('mouseleave', () => {
        photoFrame.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        reflectionOverlay.style.background = 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(0,229,255,0.05) 20%, transparent 40%)';
    });
}

// Skills Tab System
const tabBtns = document.querySelectorAll('.tab-btn');
const skillPanels = document.querySelectorAll('.skill-panel');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        
        // Remove active class from all tabs and panels
        tabBtns.forEach(tab => tab.classList.remove('active'));
        skillPanels.forEach(panel => panel.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding panel
        btn.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Main Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function updateCarousel() {
    const track = document.querySelector('.track');
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

// Carousel controls
document.querySelector('.carNext').addEventListener('click', nextSlide);
document.querySelector('.carPrev').addEventListener('click', prevSlide);

// Auto-play carousel
setInterval(nextSlide, 5000);

// Project Card Navigation
const projectCards = document.querySelectorAll('.project-card');
const pagesContainer = document.getElementById('pages');

// Project data
const projectData = {
    'video-editor': {
        title: 'Professional Video Editor',
        category: 'Creative Services',
        description: 'Professional video editing services including reels, promotional videos, and competition demonstrations with advanced visual effects and motion graphics.',
        images: [
            'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=1200'
        ],
        features: [
            'Professional video editing with advanced effects',
            'Motion graphics and visual effects',
            'Color grading and audio enhancement',
            'Multi-format export and optimization',
            'Fast turnaround time',
            'Competitive pricing'
        ],
        technologies: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Photoshop', 'Audition']
    },
    'medicine-reminder': {
        title: 'Medicine Reminder System',
        category: 'IoT Healthcare',
        description: 'An innovative IoT-based medicine reminder system using ESP32-CAM with face recognition technology for automated medicine dispensing.',
        images: [
            'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=1200'
        ],
        features: [
            'Face recognition for user identification',
            'Automated medicine dispensing',
            'Real-time notifications and alerts',
            'Mobile app integration',
            'Emergency contact system',
            'Medication tracking and reporting'
        ],
        technologies: ['ESP32-CAM', 'Arduino IDE', 'OpenCV', 'Python', 'Firebase', 'Flutter']
    },
    'medicine-reminder-v2': {
        title: 'Medicine Reminder V2',
        category: 'IoT Healthcare',
        description: 'Enhanced version with Arduino Mega, 4-slot dispensing system, and comprehensive web dashboard for healthcare management.',
        images: [
            'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=1200'
        ],
        features: [
            '4-slot medicine dispensing system',
            'Arduino Mega with L298N motor driver',
            'Web-based dashboard interface',
            'Real-time monitoring and alerts',
            'Patient management system',
            'Dosage tracking and analytics'
        ],
        technologies: ['Arduino Mega', 'L298N Driver', 'React.js', 'Node.js', 'MongoDB', 'Socket.io']
    },
    'medicare-tracker': {
        title: 'Medi Care Tracker',
        category: 'Web Application',
        description: 'Comprehensive web-based patient management system with medication tracking, appointment scheduling, and detailed reporting capabilities.',
        images: [
            'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1200'
        ],
        features: [
            'Patient registration and management',
            'Medication tracking and reminders',
            'Appointment scheduling system',
            'Medical history management',
            'Prescription management',
            'Analytics and reporting dashboard'
        ],
        technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth', 'Chart.js']
    },
    'slic-2024-silver': {
        title: 'SLIC 2024 Silver Medal',
        category: 'Innovation Award',
        description: 'Award-winning innovation project that secured Silver Medal at the All-Island School Inventors Competition 2024, showcasing cutting-edge technology solutions.',
        images: [
            'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=1200'
        ],
        features: [
            'National level competition recognition',
            'Innovative IoT healthcare solution',
            'Advanced prototype development',
            'Comprehensive project presentation',
            'Technical documentation',
            'Live demonstration and testing'
        ],
        technologies: ['Innovation', 'Prototyping', 'Presentation', 'Research', 'Development', 'Testing']
    }
};

// Handle project card clicks
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-goto');
        showProjectPage(projectId);
    });
});

function showProjectPage(projectId) {
    const project = projectData[projectId];
    if (!project) return;
    
    // Clear existing pages
    pagesContainer.innerHTML = '';
    
    // Create project page
    const page = document.createElement('div');
    page.className = 'page';
    page.innerHTML = `
        <div class="projHeader">
            <h2>${project.title}</h2>
            <div class="chip">${project.category}</div>
        </div>
        <p style="color:var(--muted);margin-bottom:24px;line-height:1.6">${project.description}</p>
        
        <!-- Project Image Carousel -->
        <div class="project-carousel" style="margin:24px 0">
            <div class="project-track" id="projectTrack-${projectId}">
                ${project.images.map(img => `
                    <div class="project-slide" style="background-image: url('${img}')"></div>
                `).join('')}
            </div>
            <button class="carBtn carPrev" onclick="prevProjectSlide('${projectId}')">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="carBtn carNext" onclick="nextProjectSlide('${projectId}')">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
        
        <div class="project-details">
            <div class="project-features">
                <h4>Key Features</h4>
                <ul>
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            <div class="project-tech">
                <h4>Technologies Used</h4>
                <div class="project-tech-grid">
                    ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                </div>
            </div>
        </div>
        
        <button onclick="closeProjectPage()" style="margin-top:24px;padding:12px 24px;background:var(--neon);color:#000;border:none;border-radius:10px;font-weight:600;cursor:pointer">
            ← Back to Projects
        </button>
    `;
    
    pagesContainer.appendChild(page);
    
    // Show page with animation
    setTimeout(() => {
        page.classList.add('active');
    }, 100);
    
    // Update URL
    window.location.hash = projectId;
    
    // Initialize project carousel
    initProjectCarousel(projectId);
}

// Project carousel functionality
let projectSlideIndex = {};

function initProjectCarousel(projectId) {
    projectSlideIndex[projectId] = 0;
}

function nextProjectSlide(projectId) {
    const track = document.getElementById(`projectTrack-${projectId}`);
    const slides = track.querySelectorAll('.project-slide');
    projectSlideIndex[projectId] = (projectSlideIndex[projectId] + 1) % slides.length;
    updateProjectCarousel(projectId);
}

function prevProjectSlide(projectId) {
    const track = document.getElementById(`projectTrack-${projectId}`);
    const slides = track.querySelectorAll('.project-slide');
    projectSlideIndex[projectId] = (projectSlideIndex[projectId] - 1 + slides.length) % slides.length;
    updateProjectCarousel(projectId);
}

function updateProjectCarousel(projectId) {
    const track = document.getElementById(`projectTrack-${projectId}`);
    track.style.transform = `translateX(-${projectSlideIndex[projectId] * 100}%)`;
}

function closeProjectPage() {
    const activePage = document.querySelector('.page.active');
    if (activePage) {
        activePage.classList.remove('active');
        setTimeout(() => {
            activePage.remove();
        }, 500);
    }
    window.location.hash = 'portfolio';
}

// Handle browser back button
window.addEventListener('hashchange', () => {
    if (!window.location.hash || window.location.hash === '#portfolio') {
        closeProjectPage();
    }
});

// Matrix Rain Effect
function createMatrixRain() {
    const matrixCode = document.getElementById('matrixCode');
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    function createChar() {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = chars[Math.floor(Math.random() * chars.length)];
        char.style.left = Math.random() * 100 + 'vw';
        char.style.animationDuration = (Math.random() * 3 + 2) + 's';
        char.style.opacity = Math.random() * 0.8 + 0.2;
        
        matrixCode.appendChild(char);
        
        setTimeout(() => {
            char.remove();
        }, 5000);
    }
    
    setInterval(createChar, 100);
}

// Canvas Network Background
function initCanvasNetwork() {
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const nodes = [];
    const nodeCount = 50;
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw nodes
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 229, 255, 0.6)';
            ctx.fill();
        });
        
        // Draw connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(0, 229, 255, ${0.3 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Chatbot System
const chatbot = document.getElementById('chatbot');
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotClose = document.getElementById('chatbotClose');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatMessages = document.getElementById('chatbotMessages');

chatbotToggle.addEventListener('click', () => {
    chatbot.classList.add('active');
});

chatbotClose.addEventListener('click', () => {
    chatbot.classList.remove('active');
});

chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    chatInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Generate bot response
    setTimeout(() => {
        hideTypingIndicator();
        const response = generateBotResponse(message);
        addMessage(response, 'bot');
    }, 1500);
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `${sender}-message`;
    
    if (sender === 'bot') {
        messageDiv.innerHTML = `<i class="fas fa-robot"></i><span>${text}</span>`;
    } else {
        messageDiv.innerHTML = `<i class="fas fa-user"></i><span>${text}</span>`;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.id = 'typingIndicator';
    indicator.innerHTML = `
        <i class="fas fa-robot"></i>
        <span>Typing</span>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
    `;
    chatMessages.appendChild(indicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

function generateBotResponse(message) {
    const msg = message.toLowerCase();
    
    if (msg.includes('pro') || msg.includes('dragon')) {
        return "🐉 Pro Mode activates the dragon cursor and enhanced visual effects! Click the orange dragon button next to the theme toggle to experience the ultimate portfolio mode with fire trails and amplified animations!";
    }
    
    if (msg.includes('project') || msg.includes('work')) {
        return "Thenura has amazing projects including an award-winning Medicine Reminder System that won Silver at SLIC 2024, professional video editing services, and innovative IoT healthcare solutions. Click any project card to see detailed information!";
    }
    
    if (msg.includes('skill') || msg.includes('technology')) {
        return "Thenura excels in web development (React, Node.js), IoT systems (Arduino, ESP32), video editing (Premiere Pro, After Effects), and has won national recognition for innovation. Check out the Skills section to see all expertise areas!";
    }
    
    if (msg.includes('contact') || msg.includes('hire') || msg.includes('email')) {
        return "You can reach Thenura at thenurasathmira@gmail.com or +94 70 400 3956. He's available for freelance projects, collaborations, and innovative solutions. Use the contact form below or WhatsApp for quick responses!";
    }
    
    if (msg.includes('award') || msg.includes('medal') || msg.includes('slic')) {
        return "🏆 Thenura won the Silver Medal at SLIC 2024 (All-Island School Inventors Competition) for his innovative Medicine Reminder System with face recognition technology. This national recognition showcases his exceptional innovation skills!";
    }
    
    if (msg.includes('video') || msg.includes('editing')) {
        return "Thenura offers professional video editing services including reels, promotional videos, and competition demos. He uses industry-standard tools like Premiere Pro, After Effects, and DaVinci Resolve to create stunning visual content!";
    }
    
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
        return "Hello! I'm Thenura's AI assistant. I can tell you about his projects, skills, achievements, and how to contact him. What would you like to know?";
    }
    
    return "That's interesting! I can help you learn about Thenura's projects, skills, awards, or contact information. Try asking about his Medicine Reminder System, video editing services, or his SLIC 2024 Silver Medal achievement!";
}

// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        from_name: document.getElementById('fromName').value,
        from_email: document.getElementById('fromEmail').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate email sending (replace with actual EmailJS implementation)
    setTimeout(() => {
        alert('Message sent successfully! Thenura will get back to you soon.');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize background effects when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Start matrix rain
    createMatrixRain();
    
    // Initialize canvas network
    initCanvasNetwork();
    
    // Add pulse animation to chatbot toggle
    setTimeout(() => {
        chatbotToggle.classList.add('pulse');
    }, 3000);
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe skill cards for animation
document.querySelectorAll('.skill').forEach(skill => {
    skill.style.opacity = '0';
    skill.style.transform = 'translateY(20px)';
    skill.style.transition = 'all 0.6s ease';
    observer.observe(skill);
});

// Observe project cards for animation
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});