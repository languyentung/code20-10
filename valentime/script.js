const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- Heart rain from the cloud ----------
const rainBox = document.querySelector('.rain');
const drops = ['💖', '💗', '🩷', '💕', '✨', '💞'];

function rain() {
    const e = document.createElement('span');
    e.classList.add('drop');
    e.innerText = drops[Math.floor(Math.random() * drops.length)];
    e.style.left = Math.random() * 230 + 'px';
    e.style.fontSize = 0.6 + Math.random() * 1.1 + 'em';
    e.style.animationDuration = 1.6 + Math.random() * 1.4 + 's';
    e.style.setProperty('--sway', (Math.random() - 0.5) * 60 + 'px');
    e.style.setProperty('--spin', (Math.random() - 0.5) * 90 + 'deg');
    e.addEventListener('animationend', () => e.remove());
    rainBox.appendChild(e);
}

setInterval(rain, reduceMotion ? 400 : 70);

// ---------- Sparkling sky (canvas) ----------
const canvas = document.getElementById('sky');
const ctx = canvas.getContext('2d');
const palette = ['#ffffff', '#ffd6ef', '#ff9fd6', '#ff4fb3', '#ffe6a8'];
let W, H, stars = [], particles = [], shooting = null;

function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.round((W * H) / (reduceMotion ? 9000 : 4500));
    stars = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.3 + 0.2,
        phase: Math.random() * Math.PI * 2,
        speed: 0.6 + Math.random() * 1.8,
        glint: Math.random() < 0.08,
        color: palette[Math.floor(Math.random() * 3)]
    }));
}

// 4-point sparkle shape
function sparkle(x, y, r) {
    ctx.beginPath();
    ctx.moveTo(x, y - r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.quadraticCurveTo(x, y, x, y + r);
    ctx.quadraticCurveTo(x, y, x - r, y);
    ctx.quadraticCurveTo(x, y, x, y - r);
    ctx.fill();
}

function heart(x, y, s) {
    ctx.beginPath();
    ctx.moveTo(x, y - s * 0.2);
    ctx.bezierCurveTo(x, y - s * 0.5, x - s * 0.5, y - s * 0.5, x - s * 0.5, y - s * 0.2);
    ctx.bezierCurveTo(x - s * 0.5, y + s * 0.1, x, y + s * 0.3, x, y + s * 0.5);
    ctx.bezierCurveTo(x, y + s * 0.3, x + s * 0.5, y + s * 0.1, x + s * 0.5, y - s * 0.2);
    ctx.bezierCurveTo(x + s * 0.5, y - s * 0.5, x, y - s * 0.5, x, y - s * 0.2);
    ctx.fill();
}

function spawnSparkles(x, y, n) {
    for (let i = 0; i < n; i++) {
        particles.push({
            type: 'spark',
            x, y,
            vx: (Math.random() - 0.5) * 1.6,
            vy: (Math.random() - 0.5) * 1.6 - 0.4,
            size: 2 + Math.random() * 4,
            life: 1,
            decay: 0.015 + Math.random() * 0.02,
            color: palette[Math.floor(Math.random() * palette.length)]
        });
    }
}

function burstHearts(x, y) {
    const n = reduceMotion ? 10 : 28;
    for (let i = 0; i < n; i++) {
        const a = (Math.PI * 2 * i) / n + Math.random() * 0.3;
        const v = 2 + Math.random() * 4;
        particles.push({
            type: 'heart',
            x, y,
            vx: Math.cos(a) * v,
            vy: Math.sin(a) * v - 1,
            size: 8 + Math.random() * 12,
            life: 1,
            decay: 0.012 + Math.random() * 0.01,
            color: palette[1 + Math.floor(Math.random() * 3)]
        });
    }
    spawnSparkles(x, y, 20);
}

let lastMove = 0;
window.addEventListener('pointermove', (e) => {
    const now = performance.now();
    if (reduceMotion || now - lastMove < 16) return;
    lastMove = now;
    spawnSparkles(e.clientX, e.clientY, 2);
});
window.addEventListener('pointerdown', (e) => burstHearts(e.clientX, e.clientY));
window.addEventListener('resize', resize);

function draw(t) {
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';

    // twinkling stars
    for (const s of stars) {
        const a = 0.35 + 0.65 * Math.abs(Math.sin(s.phase + (t / 1000) * s.speed));
        ctx.globalAlpha = a;
        ctx.fillStyle = s.color;
        if (s.glint) {
            sparkle(s.x, s.y, s.r * 5 * a);
        } else {
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // occasional shooting star
    if (!reduceMotion && !shooting && Math.random() < 0.004) {
        shooting = { x: Math.random() * W * 0.7, y: Math.random() * H * 0.3, len: 0, life: 1 };
    }
    if (shooting) {
        shooting.x += 9;
        shooting.y += 4;
        shooting.len = Math.min(shooting.len + 12, 160);
        shooting.life -= 0.015;
        const g = ctx.createLinearGradient(shooting.x, shooting.y, shooting.x - shooting.len, shooting.y - shooting.len * 0.45);
        g.addColorStop(0, 'rgba(255,255,255,0.9)');
        g.addColorStop(1, 'rgba(255,120,200,0)');
        ctx.globalAlpha = Math.max(shooting.life, 0);
        ctx.strokeStyle = g;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(shooting.x, shooting.y);
        ctx.lineTo(shooting.x - shooting.len, shooting.y - shooting.len * 0.45);
        ctx.stroke();
        if (shooting.life <= 0 || shooting.x > W + 200) shooting = null;
    }

    // pointer sparkles and heart bursts
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.type === 'heart' ? 0.06 : 0.02;
        p.vx *= 0.98;
        p.life -= p.decay;
        if (p.life <= 0) {
            particles.splice(i, 1);
            continue;
        }
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        if (p.type === 'heart') heart(p.x, p.y, p.size);
        else sparkle(p.x, p.y, p.size * p.life);
    }

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(draw);
}

resize();
requestAnimationFrame(draw);
