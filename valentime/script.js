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

// ---------- Wishes ----------
const wishes = {
    'phu-nu': {
        to: 'Gửi một nửa thế giới',
        list: [
            'Chúc một nửa thế giới luôn xinh đẹp, hạnh phúc và rạng rỡ như những vì sao ✨',
            'Chúc bạn luôn tự tin là chính mình, sống điều mình thích và được yêu thương đúng cách 💗',
            'Mong mỗi ngày của bạn đều có nắng, có hoa, có tiếng cười và những người luôn trân trọng bạn 🌷',
            'Chúc bạn thật khỏe, công việc suôn sẻ và luôn có thời gian để chăm sóc cho chính mình 🌸',
            'Phụ nữ không cần hoàn hảo, chỉ cần hạnh phúc. Chúc bạn một ngày 20/10 thật ngọt ngào 💖',
            'Cảm ơn những người phụ nữ đã làm cho thế giới này dịu dàng và ấm áp hơn mỗi ngày 🌹'
        ]
    },
    'me': {
        to: 'Gửi Mẹ yêu',
        list: [
            'Con chúc mẹ luôn mạnh khỏe, bình an và lúc nào cũng nở nụ cười. Con yêu mẹ nhiều lắm! 💐',
            'Cảm ơn mẹ vì những bữa cơm, những đêm thức khuya và tình thương không bao giờ cạn. Hôm nay mẹ nghỉ ngơi thật nhiều nhé 💗',
            'Mẹ là người phụ nữ tuyệt vời nhất đời con. Chúc mẹ một ngày 20/10 thật vui và thật hạnh phúc 🌷',
            'Dù con có lớn đến đâu, mẹ vẫn là nơi bình yên nhất. Con chúc mẹ sống vui, sống khỏe bên con thật lâu 🏡',
            'Hôm nay mẹ không phải lo gì hết, để con lo! Chúc mẹ 20/10 thật trọn vẹn 💖',
            'Mỗi sợi tóc bạc của mẹ là một lần mẹ hy sinh vì con. Con thương mẹ nhiều hơn những gì con nói được 🌹'
        ]
    },
    'chi': {
        to: 'Gửi chị gái của em',
        list: [
            'Chúc chị gái của em luôn xinh đẹp, giỏi giang và gặp toàn chuyện vui. 20/10 vui vẻ nha chị! 🎀',
            'Cảm ơn chị vì đã luôn nhường em, bảo vệ em và lắng nghe em. Chúc chị luôn thật hạnh phúc 💗',
            'Có chị là có thêm một người mẹ thứ hai. Em chúc chị khỏe mạnh, công việc thuận lợi và luôn được yêu thương 🌸',
            'Chúc chị một năm thật rực rỡ, ví lúc nào cũng dày và nụ cười lúc nào cũng tươi 💸✨',
            'Dù hay cãi nhau nhưng em thương chị nhất. Chúc chị một ngày 20/10 thật ngọt ngào 💖',
            'Chúc chị luôn tự tin bước tới những điều chị mong muốn, em luôn ở đây ủng hộ chị 🌷'
        ]
    }
};

const toEl = document.getElementById('to');
const msgEl = document.getElementById('msg');
const tabs = document.querySelectorAll('.tab');
const toast = document.getElementById('toast');
let current = 'phu-nu';
let index = 0;

// link format: #me-2 opens the 3rd wish for Mẹ
const linked = location.hash.match(/^#([a-z-]+?)(?:-(\d+))?$/);
if (linked && wishes[linked[1]]) {
    current = linked[1];
    index = (+linked[2] || 0) % wishes[current].list.length;
}

function render(animate) {
    const apply = () => {
        toEl.textContent = wishes[current].to;
        msgEl.textContent = wishes[current].list[index];
        toEl.classList.remove('out');
        msgEl.classList.remove('out');
    };
    tabs.forEach((t) => t.setAttribute('aria-selected', t.dataset.to === current));
    if (!animate || reduceMotion) return apply();
    toEl.classList.add('out');
    msgEl.classList.add('out');
    setTimeout(apply, 350);
}

tabs.forEach((t) => t.addEventListener('click', () => {
    if (t.dataset.to === current) return;
    current = t.dataset.to;
    index = 0;
    render(true);
}));

document.getElementById('next').addEventListener('click', () => {
    index = (index + 1) % wishes[current].list.length;
    render(true);
});

function showToast(text) {
    toast.textContent = text;
    toast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
}

document.getElementById('share').addEventListener('click', async () => {
    const url = location.href.split('#')[0] + '#' + current + '-' + index;
    const text = wishes[current].to + ': ' + wishes[current].list[index];
    if (navigator.share) {
        try {
            await navigator.share({ title: "Happy Women's Day 20/10", text, url });
        } catch (err) { /* user closed the share sheet */ }
        return;
    }
    try {
        await navigator.clipboard.writeText(text + '\n' + url);
        showToast('Đã sao chép lời chúc và link 💌');
    } catch (err) {
        showToast('Không sao chép được, bạn copy link trên thanh địa chỉ nhé');
    }
});

render(false);

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
