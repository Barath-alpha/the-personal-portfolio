// ===== NEURAL NETWORK BACKGROUND =====
const canvas = document.getElementById('neural-canvas');
const ctx = canvas.getContext('2d');

let nodes = [];
let animFrame;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createNodes() {
  nodes = [];
  const count = Math.floor((canvas.width * canvas.height) / 18000);
  for (let i = 0; i < count; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      pulse: Math.random() * Math.PI * 2,
    });
  }
}

function drawNeural() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const maxDist = 160;

  nodes.forEach((node, i) => {
    // Move
    node.x += node.vx;
    node.y += node.vy;
    node.pulse += 0.02;

    // Bounce
    if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
    if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

    // Draw node
    const pulseRadius = node.radius + Math.sin(node.pulse) * 0.8;
    ctx.beginPath();
    ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(212, 175, 55, ${0.4 + Math.sin(node.pulse) * 0.2})`;
    ctx.fill();

    // Draw connections
    for (let j = i + 1; j < nodes.length; j++) {
      const other = nodes[j];
      const dx = node.x - other.x;
      const dy = node.y - other.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxDist) {
        const alpha = (1 - dist / maxDist) * 0.25;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(other.x, other.y);
        ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  });

  animFrame = requestAnimationFrame(drawNeural);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  createNodes();
});

resizeCanvas();
createNodes();
drawNeural();

// ===== FLOATING PARTICLES =====
function createParticles() {
  const container = document.body;
  const count = 20;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 10;
    const gold = Math.random() > 0.5;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      bottom: -10px;
      background: ${gold ? 'rgba(212,175,55,0.6)' : 'rgba(255,140,0,0.5)'};
      box-shadow: 0 0 ${size * 3}px ${gold ? 'rgba(212,175,55,0.8)' : 'rgba(255,140,0,0.7)'};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;
    container.appendChild(p);
  }
}

createParticles();

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// ===== ACTIVE NAV LINK =====
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPath || (currentPath === '/' && href === '/')) {
    link.classList.add('active');
  }
});

// ===== FADE IN ON SCROLL =====
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => observer.observe(el));


