// ===== SKILLS PAGE ANIMATIONS =====

// Inject SVG gradient for radial gauges
const svgNS = 'http://www.w3.org/2000/svg';
const defs = document.createElementNS(svgNS, 'defs');
const grad = document.createElementNS(svgNS, 'linearGradient');
grad.setAttribute('id', 'gaugeGrad');
grad.setAttribute('x1', '0%'); grad.setAttribute('y1', '0%');
grad.setAttribute('x2', '100%'); grad.setAttribute('y2', '0%');

const stop1 = document.createElementNS(svgNS, 'stop');
stop1.setAttribute('offset', '0%');
stop1.setAttribute('stop-color', '#A0892A');

const stop2 = document.createElementNS(svgNS, 'stop');
stop2.setAttribute('offset', '50%');
stop2.setAttribute('stop-color', '#D4AF37');

const stop3 = document.createElementNS(svgNS, 'stop');
stop3.setAttribute('offset', '100%');
stop3.setAttribute('stop-color', '#FF8C00');

grad.appendChild(stop1);
grad.appendChild(stop2);
grad.appendChild(stop3);
defs.appendChild(grad);

// Append defs to first SVG found
const firstSvg = document.querySelector('.radial-gauge svg');
if (firstSvg) firstSvg.appendChild(defs);

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const circumference = 2 * Math.PI * 40; // r=40

function animateBars(entries) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        // Animate linear bars
        entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
            const pct = parseInt(bar.dataset.pct);
            bar.style.width = pct + '%';
        });

        // Animate radial gauges
        entry.target.querySelectorAll('.gauge-fill').forEach(circle => {
            const pct = parseInt(circle.dataset.pct);
            const offset = circumference - (pct / 100) * circumference;
            circle.style.strokeDasharray = circumference;
            circle.style.strokeDashoffset = offset;
        });
    });
}

const skillObserver = new IntersectionObserver(animateBars, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.skills-category').forEach(cat => {
    skillObserver.observe(cat);
});

// ===== HOVER GLOW EFFECT ON SKILL CARDS =====
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(212,175,55,0.07), rgba(255,255,255,0.03))`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.background = '';
    });
});
