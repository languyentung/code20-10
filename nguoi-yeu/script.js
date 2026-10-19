const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (id) => document.getElementById(id);

// ---------- Content ----------
const wishes = [
    'Chúc cô gái anh thương nhất luôn xinh đẹp, vui vẻ và mãi là cô bé được anh cưng chiều mỗi ngày 💕',
    'Cảm ơn em đã đến và làm thế giới của anh dịu dàng hơn. 20/10 này, anh chỉ mong em luôn cười thật tươi 😊💖',
    'Hoa rồi sẽ héo, quà rồi sẽ cũ, nhưng anh thương em thì không có hạn sử dụng đâu. Chúc em 20/10 thật hạnh phúc 🌹',
    'Hôm nay em là nữ hoàng, việc của anh là chiều em hết mức. Chúc người yêu của anh 20/10 thật ngọt ngào 👑',
    'Mong em luôn khỏe mạnh, mọi điều em ước đều thành sự thật, và trong những điều ước đó có anh nhé 💞',
    'Giữa hàng tỉ vì sao, anh may mắn nhất vì có em. Happy Women\'s Day, em yêu ✨'
];

const defaultReasons = [
    'Vì nụ cười của em làm anh quên hết mệt mỏi',
    'Vì em nhớ cả những chuyện nhỏ xíu về anh',
    'Vì em giận dỗi cũng đáng yêu',
    'Vì em luôn tin anh, kể cả khi anh chưa tin chính mình',
    'Vì ở cạnh em, anh được là chính mình',
    'Vì ăn gì em cũng chia anh một nửa',
    'Vì giọng em mỗi lần gọi "anh ơi"',
    'Vì em biến những ngày bình thường thành ngày đặc biệt',
    'Vì có chuyện vui, em là người đầu tiên anh muốn kể',
    'Vì em là em, vậy là đủ rồi'
];

const defaultGift = '1 buổi hẹn hò, em chọn chỗ, anh bao hết!';

// ---------- Link params ----------
// #em=Lan&anh=Tung&d=2023-02-14&w=1&m=<custom wish>&g=<gift>&l=<reasons, one per line>
const hash = location.hash.slice(1);
const params = new URLSearchParams(hash.includes('=') ? hash : '');
const em = (params.get('em') || '').trim();
const anh = (params.get('anh') || '').trim();
const startDate = params.get('d') || '';
const wishText = (params.get('m') || '').trim() || wishes[(+params.get('w') || 0) % wishes.length];
const gift = (params.get('g') || '').trim() || defaultGift;
const customReasons = (params.get('l') || '').split('\n').map((s) => s.trim()).filter(Boolean);
const reasons = customReasons.length ? customReasons : defaultReasons;

$('introHello').textContent = (em || 'Em') + ' ơi,';
$('nameEm').textContent = em || 'Em';
$('nameAnh').textContent = anh || 'Anh';
$('signName').textContent = anh || 'Anh';
$('ticketText').textContent = gift;
$('askTitle').textContent = 'Làm người yêu ' + (anh || 'anh') + ' thêm thật nhiều năm nữa nhé?';

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
    }, 40);
}

// ---------- Music: Pachelbel's Canon arpeggios (public domain) ----------
let audio = null;
let musicOn = false;
let musicTimer = null;
let nextNoteAt = 0;
let step = 0;
const chords = [
    [62, 66, 69, 74], [57, 61, 64, 69], [59, 62, 66, 71], [54, 57, 61, 66],
    [55, 59, 62, 67], [50, 54, 57, 62], [55, 59, 62, 67], [57, 61, 64, 69]
];
const canon = chords.flatMap((c) => [c[0], c[1], c[2], c[3], c[2], c[1]]);

function note(midi, at, vol = 0.05, dur = 1.6) {
    const freq = 440 * Math.pow(2, (midi - 69) / 12);
    const gain = audio.createGain();
    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.exponentialRampToValueAtTime(vol, at + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    gain.connect(audio.destination);
    [[freq, 'sine', 1], [freq * 2, 'triangle', 0.18]].forEach(([f, type, level]) => {
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
    if (audio && musicOn) note(midi, audio.currentTime, 0.1, 1);
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
            note(canon[step % canon.length], nextNoteAt);
            step++;
            nextNoteAt += 0.3;
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

// ---------- Sky: rose petals, sparkles, heart bursts ----------
const canvas = $('sky');
const ctx = canvas.getContext('2d');
const roses = ['#ff5c7a', '#ff8fa8', '#e0103f', '#ffc2cf', '#c2183f'];
const glow = ['#ffffff', '#ffc2cf', '#f6d28b', '#ff8fa8'];
let W, H, petals = [], stars = [], particles = [];

function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = reduceMotion ? 8 : Math.min(40, Math.round((W * H) / 26000));
    petals = Array.from({ length: n }, () => newPetal(true));
    stars = Array.from({ length: Math.round((W * H) / 9000) }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.2 + 0.2,
        phase: Math.random() * 6.3,
        speed: 0.5 + Math.random() * 1.5
    }));
}

function newPetal(anywhere) {
    return {
        x: Math.random() * W,
        y: anywhere ? Math.random() * H : -20,
        size: 6 + Math.random() * 8,
        rot: Math.random() * 6.3,
        vr: (Math.random() - 0.5) * 0.04,
        vy: 0.5 + Math.random() * 0.9,
        sway: Math.random() * 6.3,
        color: roses[Math.floor(Math.random() * roses.length)]
    };
}

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

function burst(x, y, n = reduceMotion ? 10 : 30) {
    for (let i = 0; i < n; i++) {
        const a = (Math.PI * 2 * i) / n + Math.random() * 0.3;
        const v = 2 + Math.random() * 4.5;
        particles.push({
            heart: Math.random() < 0.6,
            x, y,
            vx: Math.cos(a) * v,
            vy: Math.sin(a) * v - 1,
            size: 6 + Math.random() * 12,
            life: 1,
            decay: 0.012 + Math.random() * 0.01,
            color: Math.random() < 0.5 ? roses[Math.floor(Math.random() * roses.length)] : glow[Math.floor(Math.random() * glow.length)]
        });
    }
}

function celebrate(times = 6) {
    for (let i = 0; i < times; i++) {
        setTimeout(() => {
            burst(W * (0.15 + Math.random() * 0.7), H * (0.15 + Math.random() * 0.4), reduceMotion ? 8 : 24);
            chime(74 + (i % 4) * 3);
        }, i * 320);
    }
}

let lastMove = 0;
window.addEventListener('pointermove', (e) => {
    const now = performance.now();
    if (reduceMotion || now - lastMove < 20 || e.target.closest('#scratchCanvas')) return;
    lastMove = now;
    particles.push({
        heart: false, x: e.clientX, y: e.clientY,
        vx: (Math.random() - 0.5) * 1.4, vy: (Math.random() - 0.5) * 1.4 - 0.3,
        size: 3 + Math.random() * 3, life: 1, decay: 0.03,
        color: glow[Math.floor(Math.random() * glow.length)]
    });
});
window.addEventListener('pointerdown', (e) => {
    if (e.target.closest('button, a, input, select, textarea, canvas, .modal, .intro')) return;
    burst(e.clientX, e.clientY, reduceMotion ? 8 : 18);
});
window.addEventListener('resize', resize);

function draw(t) {
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = '#ffd9e0';
    for (const s of stars) {
        ctx.globalAlpha = 0.25 + 0.6 * Math.abs(Math.sin(s.phase + (t / 1000) * s.speed));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
    }

    for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.vy;
        p.sway += 0.02;
        p.x += Math.sin(p.sway) * 0.6;
        p.rot += p.vr;
        if (p.y > H + 20) petals[i] = newPetal(false);
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = 0.75;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 0.25;
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.ellipse(-p.size * 0.3, -p.size * 0.15, p.size * 0.4, p.size * 0.18, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    ctx.globalCompositeOperation = 'lighter';
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.vx *= 0.98;
        p.life -= p.decay;
        if (p.life <= 0) {
            particles.splice(i, 1);
            continue;
        }
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        if (p.heart) heart(p.x, p.y, p.size);
        else sparkle(p.x, p.y, p.size * p.life);
    }
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
}

resize();
requestAnimationFrame(draw);

// ---------- Intro: press and hold the heart ----------
const intro = $('intro');
const holdHeart = $('holdHeart');
const heartFill = $('heartFill');
const HOLD_MS = 1600;
let progress = 0;
let holding = false;
let unlocked = false;
let lastTick = 0;

document.body.classList.add('locked');

function setHold(on) {
    if (unlocked) return;
    holding = on;
    holdHeart.classList.toggle('holding', on);
    $('introHint').textContent = on ? 'Giữ thêm chút nữa… 💓' : 'Nhấn và giữ…';
    if (on && !audio) startMusic(); // needs a user gesture on mobile
}

function holdLoop(t) {
    const dt = lastTick ? t - lastTick : 16;
    lastTick = t;
    progress += holding ? dt / HOLD_MS : -dt / 700;
    progress = Math.max(0, Math.min(1, progress));
    heartFill.setAttribute('y', 90 - 90 * progress);
    heartFill.setAttribute('height', 90 * progress);
    $('holdPct').textContent = Math.round(progress * 100) + '%';
    if (holding && navigator.vibrate && Math.random() < 0.08) navigator.vibrate(8);
    if (progress >= 1) return unlock();
    requestAnimationFrame(holdLoop);
}

function unlock() {
    unlocked = true;
    holdHeart.classList.remove('holding');
    const r = holdHeart.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2, reduceMotion ? 12 : 50);
    celebrate(6);
    if (navigator.vibrate) navigator.vibrate([30, 60, 30]);
    intro.classList.add('done');
    document.body.classList.remove('locked');
    $('sound').hidden = false;
    setTimeout(() => {
        intro.hidden = true;
        typeText($('wish'), wishText);
    }, 900);
}

holdHeart.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    try { holdHeart.setPointerCapture(e.pointerId); } catch (err) { /* synthetic pointer */ }
    setHold(true);
});
['pointerup', 'pointercancel', 'lostpointercapture'].forEach((ev) => holdHeart.addEventListener(ev, () => setHold(false)));
holdHeart.addEventListener('contextmenu', (e) => e.preventDefault());
holdHeart.addEventListener('keydown', (e) => {
    if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) {
        e.preventDefault();
        setHold(true);
    }
});
holdHeart.addEventListener('keyup', () => setHold(false));
requestAnimationFrame(holdLoop);

// ---------- Scroll reveal ----------
const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
        if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
        }
    });
}, { threshold: 0.2 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// ---------- Love counter ----------
const start = /^\d{4}-\d{2}-\d{2}$/.test(startDate) ? new Date(startDate + 'T00:00:00') : null;
if (start && !isNaN(start) && start < new Date()) {
    $('counterBlock').hidden = false;
    $('since').textContent = 'kể từ ' + start.toLocaleDateString('vi-VN') + ' 💞';
    const tick = () => {
        let s = Math.floor((Date.now() - start) / 1000);
        $('cDays').textContent = Math.floor(s / 86400).toLocaleString('vi-VN');
        s %= 86400;
        $('cHours').textContent = Math.floor(s / 3600);
        $('cMins').textContent = Math.floor((s % 3600) / 60);
        $('cSecs').textContent = s % 60;
    };
    tick();
    setInterval(tick, 1000);
}

// ---------- Jar of reasons ----------
const order = reasons.map((_, i) => i).sort(() => Math.random() - 0.5);
let drawn = 0;

$('jar').addEventListener('click', () => {
    const jar = $('jar');
    jar.classList.remove('shake');
    void jar.offsetWidth; // restart the shake animation
    jar.classList.add('shake');
    const i = order[drawn % order.length];
    drawn++;
    const slip = $('slip');
    slip.hidden = true;
    void slip.offsetWidth;
    $('slipNo').textContent = 'Lý do thứ ' + (((drawn - 1) % reasons.length) + 1) + ' / ' + reasons.length;
    $('slipText').textContent = reasons[i] + ' 💗';
    slip.hidden = false;
    const r = jar.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + 20, reduceMotion ? 6 : 14);
    chime(79 + (drawn % 5) * 2);
});

// ---------- Scratch card ----------
const sc = $('scratchCanvas');
const sctx = sc.getContext('2d');
let scratching = false;
let scratchDone = false;
let lastPt = null;
let moves = 0;

function paintCover() {
    const r = sc.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    sc.width = r.width * dpr;
    sc.height = r.height * dpr;
    sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const g = sctx.createLinearGradient(0, 0, r.width, r.height);
    g.addColorStop(0, '#d9a3b0');
    g.addColorStop(0.5, '#f3d6dd');
    g.addColorStop(1, '#c98a9b');
    sctx.globalCompositeOperation = 'source-over';
    sctx.fillStyle = g;
    sctx.fillRect(0, 0, r.width, r.height);
    sctx.fillStyle = 'rgba(255,255,255,0.35)';
    for (let i = 0; i < 120; i++) sctx.fillRect(Math.random() * r.width, Math.random() * r.height, 2, 2);
    sctx.fillStyle = '#7a1f38';
    sctx.font = '600 20px "Be Vietnam Pro", sans-serif';
    sctx.textAlign = 'center';
    sctx.textBaseline = 'middle';
    sctx.fillText('✨ Cào ở đây ✨', r.width / 2, r.height / 2);
}

function scratchAt(e) {
    const r = sc.getBoundingClientRect();
    const p = { x: e.clientX - r.left, y: e.clientY - r.top };
    sctx.globalCompositeOperation = 'destination-out';
    sctx.lineWidth = 40;
    sctx.lineCap = 'round';
    sctx.beginPath();
    sctx.moveTo((lastPt || p).x, (lastPt || p).y);
    sctx.lineTo(p.x, p.y);
    sctx.stroke();
    lastPt = p;
    if (++moves % 8 === 0) checkCleared();
}

function checkCleared() {
    const data = sctx.getImageData(0, 0, sc.width, sc.height).data;
    let clear = 0, total = 0;
    for (let i = 3; i < data.length; i += 4 * 16) {
        total++;
        if (data[i] === 0) clear++;
    }
    if (clear / total > 0.45) revealGift();
}

function revealGift() {
    if (scratchDone) return;
    scratchDone = true;
    sc.classList.add('cleared');
    const r = sc.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2, reduceMotion ? 10 : 40);
    celebrate(4);
}

sc.addEventListener('pointerdown', (e) => {
    scratching = true;
    lastPt = null;
    try { sc.setPointerCapture(e.pointerId); } catch (err) { /* synthetic pointer */ }
    scratchAt(e);
});
sc.addEventListener('pointermove', (e) => scratching && scratchAt(e));
['pointerup', 'pointercancel'].forEach((ev) => sc.addEventListener(ev, () => {
    scratching = false;
    if (!scratchDone) checkCleared();
}));

paintCover();
document.fonts && document.fonts.ready.then(() => !scratchDone && moves === 0 && paintCover());
window.addEventListener('resize', () => !scratchDone && moves === 0 && paintCover());

// ---------- Playful question: "No" runs away ----------
const taunts = ['Chắc chưa? 🤨', 'Nghĩ lại đi mà 🥺', 'Bấm nhầm hả? 😏', 'Bắt được đâu mà bắt 😜', 'Thôi mà… 🥹', 'Đừng mà 😭', 'Không có nút này đâu 😝'];
const faces = ['🥺', '🤨', '😢', '😏', '🥹', '😭', '🙈'];
const noBtn = $('no');
const yesBtn = $('yes');
let noCount = 0;

function overlapsYes(x, y, w, h) {
    const r = yesBtn.getBoundingClientRect();
    return x < r.right + 12 && x + w > r.left - 12 && y < r.bottom + 12 && y + h > r.top - 12;
}

function runAway(e) {
    e.preventDefault();
    if (!noBtn.classList.contains('runaway')) {
        const r = noBtn.getBoundingClientRect();
        document.body.appendChild(noBtn); // escape the blurred card so position: fixed uses the viewport
        noBtn.style.left = r.left + 'px';
        noBtn.style.top = r.top + 'px';
        noBtn.classList.add('runaway');
    }
    noCount++;
    noBtn.textContent = taunts[(noCount - 1) % taunts.length];
    $('askEmoji').textContent = faces[noCount % faces.length];
    yesBtn.style.transform = 'scale(' + Math.min(1 + noCount * 0.12, 1.8) + ')';
    chime(72 - (noCount % 5));

    const w = noBtn.offsetWidth;
    const h = noBtn.offsetHeight;
    const px = e.clientX || innerWidth / 2;
    const py = e.clientY || innerHeight / 2;
    let x, y, tries = 0;
    do {
        x = 16 + Math.random() * (innerWidth - w - 32);
        y = 16 + Math.random() * (innerHeight - h - 32);
        tries++;
    } while (tries < 30 && (Math.hypot(x + w / 2 - px, y + h / 2 - py) < 160 || overlapsYes(x, y, w, h)));
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
}

noBtn.addEventListener('pointerenter', (e) => e.pointerType === 'mouse' && runAway(e));
noBtn.addEventListener('pointerdown', runAway);
noBtn.addEventListener('click', runAway);

yesBtn.addEventListener('click', () => {
    const r = yesBtn.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2, reduceMotion ? 12 : 50);
    celebrate(8);
    noBtn.remove();
    $('askZone').hidden = true;
    $('askEmoji').textContent = '🥰';
    $('answer').hidden = false;
    typeText($('answer'), 'Hứa rồi đó nha! Ngoéo tay 🤙 ' + (anh || 'Anh') + ' thương em nhiều lắm 💞');
});

// ---------- Creator (sender only: …/nguoi-yeu/#tao-thiep) ----------
const toast = $('toast');
let shareUrl = '';

function showToast(text) {
    toast.textContent = text;
    toast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
}

if (hash === 'tao-thiep') {
    intro.hidden = true;
    document.body.classList.remove('locked');
    const fWish = $('fWish');
    wishes.forEach((w, i) => {
        const o = document.createElement('option');
        o.value = i;
        o.textContent = Array.from(w).length > 70 ? Array.from(w).slice(0, 68).join('') + '…' : w;
        fWish.appendChild(o);
    });
    const own = document.createElement('option');
    own.value = 'custom';
    own.textContent = '✏️ Tự viết lời chúc';
    fWish.appendChild(own);
    fWish.addEventListener('change', () => {
        $('fCustomWrap').hidden = fWish.value !== 'custom';
        if (fWish.value === 'custom') $('fCustom').focus();
    });
    $('fDate').max = new Date().toISOString().slice(0, 10);
    $('createModal').hidden = false;

    $('createForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const p = new URLSearchParams();
        p.set('em', $('fEm').value.trim());
        p.set('anh', $('fAnh').value.trim());
        if ($('fDate').value) p.set('d', $('fDate').value);
        if (fWish.value === 'custom' && $('fCustom').value.trim()) p.set('m', $('fCustom').value.trim());
        else if (fWish.value !== 'custom') p.set('w', fWish.value);
        if ($('fGift').value.trim()) p.set('g', $('fGift').value.trim());
        if ($('fReasons').value.trim()) p.set('l', $('fReasons').value.trim());

        shareUrl = location.href.split('#')[0] + '#' + p.toString();
        $('link').value = shareUrl;
        $('previewLink').href = shareUrl;
        $('result').hidden = false;
        $('result').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            showToast('Đã sao chép link 💌');
        } catch (err) {
            $('link').select();
            showToast('Nhấn giữ vào link để sao chép nhé');
        }
    };
    $('copyLink').addEventListener('click', copyLink);
    $('shareLink').addEventListener('click', async () => {
        if (!navigator.share) return copyLink();
        try {
            await navigator.share({ title: '💞 Gửi em, nhân ngày 20/10', text: ($('fEm').value.trim() || 'Em') + ' ơi, mở ra xem nhé 💝', url: shareUrl });
        } catch (err) { /* share sheet closed */ }
    });
}
