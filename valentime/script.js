const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (id) => document.getElementById(id);

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
        secret: 'Bạn là món quà tuyệt vời mà cuộc sống đã trao cho những người xung quanh. Cảm ơn vì đã luôn là chính bạn 💖',
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
        secret: 'Con chưa nói đủ nhiều, nhưng con thương mẹ hơn tất cả mọi thứ trên đời. Mẹ ơi, con yêu mẹ! 💐',
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
        secret: 'Bình thường em hay cãi chị vậy thôi, chứ có chị là điều may mắn nhất của em đó. Thương chị! 🎀',
        list: [
            'Chúc chị gái của em luôn xinh đẹp, giỏi giang và gặp toàn chuyện vui. 20/10 vui vẻ nha chị! 🎀',
            'Cảm ơn chị vì đã luôn nhường em, bảo vệ em và lắng nghe em. Chúc chị luôn thật hạnh phúc 💗',
            'Có chị là có thêm một người mẹ thứ hai. Em chúc chị khỏe mạnh, công việc thuận lợi và luôn được yêu thương 🌸',
            'Chúc chị một năm thật rực rỡ, ví lúc nào cũng dày và nụ cười lúc nào cũng tươi 💸✨',
            'Dù hay cãi nhau nhưng em thương chị nhất. Chúc chị một ngày 20/10 thật ngọt ngào 💖',
            'Chúc chị luôn tự tin bước tới những điều chị mong muốn, em luôn ở đây ủng hộ chị 🌷'
        ]
    },
    'nguoi-yeu': {
        to: 'Gửi người anh thương',
        secret: 'Anh yêu em nhiều hơn hôm qua và ít hơn ngày mai. Cảm ơn em vì đã chọn anh 💞',
        list: [
            'Chúc cô gái anh thương nhất luôn xinh đẹp, vui vẻ và mãi là cô bé được anh cưng chiều mỗi ngày 💕',
            'Cảm ơn em đã đến và làm thế giới của anh dịu dàng hơn. 20/10 này, anh chỉ mong em luôn cười thật tươi 😊💖',
            'Hoa rồi sẽ héo, quà rồi sẽ cũ, nhưng anh thương em thì không có hạn sử dụng đâu. Chúc em 20/10 thật hạnh phúc 🌹',
            'Hôm nay em là nữ hoàng, việc của anh là chiều em hết mức. Chúc người yêu của anh 20/10 thật ngọt ngào 👑',
            'Mong em luôn khỏe mạnh, mọi điều em ước đều thành sự thật, và trong những điều ước đó có anh nhé 💞',
            'Giữa hàng tỉ vì sao, anh may mắn nhất vì có em. Happy Women\'s Day, em yêu ✨'
        ]
    }
};

// ---------- State from the link ----------
// personalised link: #r=nguoi-yeu&to=Lan&from=Tung&w=2&m=<custom wish>&s=<secret>
// older link: #me-1
const hash = location.hash.slice(1);
const params = new URLSearchParams(hash.includes('=') ? hash : '');
const legacy = hash.match(/^([a-z-]+?)(?:-(\d+))?$/);

let current = 'phu-nu';
let index = 0;
if (wishes[params.get('r')]) current = params.get('r');
else if (legacy && wishes[legacy[1]]) current = legacy[1];
index = (+(params.get('w') || (legacy && legacy[2])) || 0) % wishes[current].list.length;

const toName = (params.get('to') || '').trim();
const fromName = (params.get('from') || '').trim();
const customWish = (params.get('m') || '').trim();
const customSecret = (params.get('s') || '').trim();
const personal = Boolean(toName || customWish);

const card = $('card');
const toEl = $('to');
const msgEl = $('msg');
const tabs = document.querySelectorAll('.tab');

// recipient view: just the wish, the sender's secret (if any) and the sky to play with
if (personal) {
    card.classList.add('personal');
    $('next').hidden = true;
    $('secret').hidden = !customSecret;
}
$('from').textContent = fromName ? '— ' + fromName + ' —' : '';

function heading() {
    return toName ? 'Gửi ' + toName + ' 💖' : wishes[current].to;
}

function typeText(el, text) {
    clearInterval(el.typeTimer);
    if (reduceMotion) {
        el.textContent = text;
        return;
    }
    const chars = Array.from(text);
    let i = 0;
    el.textContent = '';
    el.classList.add('typing');
    el.typeTimer = setInterval(() => {
        el.textContent += chars[i++];
        if (i >= chars.length) {
            clearInterval(el.typeTimer);
            el.classList.remove('typing');
        }
    }, 38);
}

function render(animate) {
    tabs.forEach((t) => t.setAttribute('aria-selected', t.dataset.to === current));
    const text = customWish || wishes[current].list[index];
    if (!animate) {
        toEl.textContent = heading();
        return typeText(msgEl, text);
    }
    toEl.classList.add('out');
    msgEl.classList.add('out');
    setTimeout(() => {
        toEl.textContent = heading();
        toEl.classList.remove('out');
        msgEl.classList.remove('out');
        typeText(msgEl, text);
    }, 350);
}

tabs.forEach((t) => t.addEventListener('click', () => {
    if (t.dataset.to === current) return;
    current = t.dataset.to;
    index = 0;
    render(true);
}));

$('next').addEventListener('click', () => {
    index = (index + 1) % wishes[current].list.length;
    render(true);
});

toEl.textContent = heading();
tabs.forEach((t) => t.setAttribute('aria-selected', t.dataset.to === current));

// ---------- Music box (Web Audio, no files needed) ----------
let audio = null;
let musicOn = false;
let musicTimer = null;
let nextNoteAt = 0;
let step = 0;
const melody = [
    76, 79, 84, 83, 79, 76, 74, 76,
    79, 81, 79, 76, 72, 74, 76, null,
    76, 79, 84, 83, 86, 84, 83, 79,
    81, 79, 76, 74, 72, null, null, null
];

function note(midi, at, vol = 0.06, dur = 1.4) {
    const freq = 440 * Math.pow(2, (midi - 69) / 12);
    const gain = audio.createGain();
    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.exponentialRampToValueAtTime(vol, at + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    gain.connect(audio.destination);
    [[freq, 'sine', 1], [freq * 2, 'triangle', 0.25]].forEach(([f, type, level]) => {
        const osc = audio.createOscillator();
        const g = audio.createGain();
        osc.type = type;
        osc.frequency.value = f;
        g.gain.value = level;
        osc.connect(g).connect(gain);
        osc.start(at);
        osc.stop(at + dur);
    });
}

function chime(midi) {
    if (audio && musicOn) note(midi, audio.currentTime, 0.12, 0.9);
}

function startMusic() {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    audio = audio || new Ctx();
    audio.resume();
    musicOn = true;
    nextNoteAt = audio.currentTime + 0.1;
    clearInterval(musicTimer);
    musicTimer = setInterval(() => {
        while (nextNoteAt < audio.currentTime + 0.5) {
            const m = melody[step % melody.length];
            if (m) note(m, nextNoteAt);
            step++;
            nextNoteAt += 0.34;
        }
    }, 100);
    $('sound').textContent = '🔊';
}

function stopMusic() {
    musicOn = false;
    clearInterval(musicTimer);
    $('sound').textContent = '🔇';
}

$('sound').addEventListener('click', () => (musicOn ? stopMusic() : startMusic()));

// ---------- Sparkling sky (canvas) ----------
const canvas = $('sky');
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

function firework(x, y) {
    const n = reduceMotion ? 16 : 48;
    const color = palette[Math.floor(Math.random() * palette.length)];
    for (let i = 0; i < n; i++) {
        const a = (Math.PI * 2 * i) / n;
        const v = 2.5 + Math.random() * 2.5;
        particles.push({
            type: 'spark',
            x, y,
            vx: Math.cos(a) * v,
            vy: Math.sin(a) * v,
            size: 3 + Math.random() * 3,
            life: 1,
            decay: 0.012 + Math.random() * 0.008,
            color: Math.random() < 0.3 ? '#ffffff' : color
        });
    }
}

function celebrate(times = 6) {
    for (let i = 0; i < times; i++) {
        setTimeout(() => {
            firework(W * (0.15 + Math.random() * 0.7), H * (0.12 + Math.random() * 0.35));
            chime(84 + (i % 3) * 3);
        }, i * 380);
    }
}

let lastMove = 0;
window.addEventListener('pointermove', (e) => {
    const now = performance.now();
    if (reduceMotion || now - lastMove < 16) return;
    lastMove = now;
    spawnSparkles(e.clientX, e.clientY, 2);
});
window.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.modal, .gift-screen')) return;
    burstHearts(e.clientX, e.clientY);
});
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

    // pointer sparkles, heart bursts and fireworks
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

// ---------- Gift intro ----------
const gift = $('gift');
if (personal) {
    $('giftHello').textContent = (toName || 'Bạn') + ' ơi,';
    $('giftSub').textContent = fromName
        ? fromName + ' gửi cho bạn một món quà nhỏ 🎁'
        : 'có một món quà nhỏ dành cho bạn 🎁';
}

$('giftBox').addEventListener('click', () => {
    if (gift.classList.contains('opened')) return;
    const r = $('giftBox').getBoundingClientRect();
    gift.classList.add('opened');
    startMusic();
    $('sound').hidden = false;
    burstHearts(r.left + r.width / 2, r.top + r.height / 2);
    celebrate();
    setTimeout(() => render(false), 700);
    setTimeout(() => (gift.hidden = true), 1000);
});

// ---------- Modals ----------
function openModal(m) {
    m.hidden = false;
    const focusable = m.querySelector('input, select, [data-close]');
    if (focusable) focusable.focus();
}

function closeModal(m) {
    m.hidden = true;
}

document.querySelectorAll('.modal').forEach((m) => {
    m.addEventListener('click', (e) => {
        if (e.target === m || e.target.closest('[data-close]')) closeModal(m);
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.querySelectorAll('.modal:not([hidden])').forEach(closeModal);
});

// ---------- Secret message: tap the envelope ----------
const envelope = $('envelope');

$('secret').addEventListener('click', () => {
    envelope.classList.remove('open');
    $('envStage').hidden = false;
    $('letterStage').hidden = true;
    openModal($('secretModal'));
    envelope.focus();
});

envelope.addEventListener('click', () => {
    if (envelope.classList.contains('open')) return;
    envelope.classList.add('open');
    chime(84);
    setTimeout(() => chime(88), 150);
    setTimeout(() => {
        $('envStage').hidden = true;
        $('letterStage').hidden = false;
        $('secretFrom').textContent = fromName ? '— ' + fromName + ' —' : '';
        typeText($('secretText'), customSecret || wishes[current].secret);
        celebrate(5);
    }, reduceMotion ? 200 : 1000);
});

// ---------- Card creator ----------
const fRel = $('fRel');
const fWish = $('fWish');
const toast = $('toast');
let shareUrl = '';

function fillWishOptions() {
    fWish.innerHTML = '';
    wishes[fRel.value].list.forEach((w, i) => {
        const o = document.createElement('option');
        o.value = i;
        o.textContent = Array.from(w).length > 70 ? Array.from(w).slice(0, 68).join('') + '…' : w;
        fWish.appendChild(o);
    });
    const own = document.createElement('option');
    own.value = 'custom';
    own.textContent = '✏️ Tự viết lời chúc';
    fWish.appendChild(own);
    $('fCustomWrap').hidden = true;
}

fRel.addEventListener('change', fillWishOptions);
fWish.addEventListener('change', () => {
    $('fCustomWrap').hidden = fWish.value !== 'custom';
    if (fWish.value === 'custom') $('fCustom').focus();
});

// the creator is only for senders: open it with …/valentime/#tao-thiep
if (hash === 'tao-thiep') {
    gift.hidden = true;
    $('secret').hidden = true;
    fRel.value = 'nguoi-yeu';
    fillWishOptions();
    render(false);
    openModal($('createModal'));
}

$('createForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const p = new URLSearchParams();
    p.set('r', fRel.value);
    p.set('to', $('fTo').value.trim());
    if ($('fFrom').value.trim()) p.set('from', $('fFrom').value.trim());
    if (fWish.value === 'custom' && $('fCustom').value.trim()) p.set('m', $('fCustom').value.trim());
    else if (fWish.value !== 'custom') p.set('w', fWish.value);
    if ($('fSecret').value.trim()) p.set('s', $('fSecret').value.trim());

    shareUrl = location.href.split('#')[0] + '#' + p.toString();
    $('link').value = shareUrl;
    $('previewLink').href = shareUrl;
    $('result').hidden = false;
    $('result').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

function showToast(text) {
    toast.textContent = text;
    toast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
}

async function copyLink() {
    try {
        await navigator.clipboard.writeText(shareUrl);
        showToast('Đã sao chép link món quà 💌');
    } catch (err) {
        $('link').select();
        showToast('Bạn nhấn giữ vào link để sao chép nhé');
    }
}

$('copyLink').addEventListener('click', copyLink);

$('shareLink').addEventListener('click', async () => {
    if (!navigator.share) return copyLink();
    try {
        await navigator.share({
            title: '🎁 Có một món quà 20/10 dành cho bạn',
            text: ($('fTo').value.trim() || 'Bạn') + ' ơi, mở quà nhé 💝',
            url: shareUrl
        });
    } catch (err) { /* user closed the share sheet */ }
});
