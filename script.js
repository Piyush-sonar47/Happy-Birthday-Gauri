/* =============================================================
   BIRTHDAY WEBSITE — SCRIPT.JS
   ============================================================= */

/* ── ✏️ PERSONALISATION CONSTANTS ──────────────────────────────
   Change these values to customise the website.
   ============================================================= */

// Target date for countdown (YYYY, Month-1, Day, Hour, Minute, Second)
// Example: Next birthday — change to the correct year/date
const TARGET_DATE = new Date(2026, 5, 15, 0, 0, 0); // June 15, 2026

// The date your relationship started (for "days together" counter)
const RELATIONSHIP_START = new Date(2021, 2, 14); // March 14, 2021

// Love letter text (displayed with typewriter effect)
// Use \n for new paragraphs
const LOVE_LETTER = `🎂 Happy Birthday Bayko jiii.. ❤️

Gauri,

Aaj tuza birthday aahe, ani mala kharach tula sangaycha aahe ki bala tu mazhya life madhli saglyat special person aahes. 💖

Tujhya sobat ghalavlela pratyek moment mazhya sathi khup precious aahe. Tujha cute cute smile, tujha caring nature ani tuzhi bolnyachi style maza divas sundar banavate. 😊🌸

Kadhi kadhi mala vatta ki devane mala saglyat sundar gift dilay, ani te gift mhanje **tu pilluu**. ❤️

Tujhya sobat astana saglya tensions visrun jato. Tujha ek message suddha maza mood changla karayla purto. Tu mazhya ayushyat aalyapasun saglach khup sundar ani special vatayla lagla aahe. ✨

Ya special divshi mi devakade evdhich prarthana karto ki tu nehmi happy raha, healthy raha ani tuzhi sagli swapna purn hou de. 🌹

Thank you mazhya life madhe aalyabaddal, mala samjun ghetlyabaddal ani nehmich maza sobat rahilyabaddal. 💕

**Gauri, I Love You More Than Words Can Express.** ❤️

Aajcha divas mast enjoy kar bala, khup hasa madam, khup photos kadha ani khup cake kha aani motuu motuu ho..! 🎂🎉

**Once Again, Happy Birthday My Love! ❤️🎂**
**and i love you so much bayko ji... ❤️**

**Tujhach,**
**Piyush ❤️**

*“Tujha smile baghitla ki maza divas perfect hoto, ani tu mazhya sobat asli ki jag jinklyasarkha vatata.”* 🌹✨💕
`;

/* =================================================================
   WELCOME SCREEN
   ================================================================= */

// Generate decorative hearts on the welcome screen
(function spawnWelcomeHearts() {
  const container = document.getElementById('welcomeHearts');
  if (!container) return;

  const HEARTS = ['❤️','💕','💖','💗','💓','🌸','✨'];
  const COUNT  = 25;

  for (let i = 0; i < COUNT; i++) {
    const heart = document.createElement('span');
    heart.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
    heart.className   = 'floating-heart';
    const size  = Math.random() * 20 + 12;
    const left  = Math.random() * 100;
    const delay = Math.random() * 8;
    const dur   = Math.random() * 8 + 6;
    Object.assign(heart.style, {
      fontSize: size + 'px',
      left:     left + '%',
      bottom:   '-40px',
      animationDuration:  dur + 's',
      animationDelay:     delay + 's',
    });
    container.appendChild(heart);
  }
})();

// Enter button → reveal main site
document.getElementById('enterBtn').addEventListener('click', () => {
  const welcome = document.getElementById('welcome-screen');
  const main    = document.getElementById('main-site');

  welcome.classList.add('exit');
  setTimeout(() => {
    welcome.style.display = 'none';
    main.classList.remove('hidden');
    // Start floating hearts in hero
    startHeroHearts();
    // Start finale stars
    startFinaleStars();
  }, 900);
});

/* =================================================================
   MUSIC PLAYER
   ================================================================= */
const musicBtn   = document.getElementById('musicBtn');
const bgMusic    = document.getElementById('bgMusic');
const iconPlay   = document.getElementById('iconPlay');
const iconPause  = document.getElementById('iconPause');

let musicPlaying = false;

musicBtn.addEventListener('click', () => {
  if (!bgMusic.src || bgMusic.src === window.location.href) {
    // No music file set — show gentle alert
    showToast('🎵 Add your music file to the <audio> tag in index.html!');
    return;
  }
  if (musicPlaying) {
    bgMusic.pause();
    iconPlay.classList.remove('hidden');
    iconPause.classList.add('hidden');
    musicPlaying = false;
  } else {
    bgMusic.play().catch(() => {
      showToast('Autoplay blocked — tap the ♪ button to play music!');
    });
    iconPlay.classList.add('hidden');
    iconPause.classList.remove('hidden');
    musicPlaying = true;
  }
});

/* =================================================================
   TOAST NOTIFICATION
   ================================================================= */
function showToast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  Object.assign(t.style, {
    position: 'fixed', bottom: '80px', left: '24px',
    background: 'rgba(60,20,80,0.9)',
    color: 'white', padding: '10px 18px', borderRadius: '40px',
    fontSize: '0.8rem', zIndex: '9999',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    animation: 'fadeInUp 0.3s ease both',
    transition: 'opacity 0.5s',
  });
  document.body.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 500); }, 3000);
}

/* =================================================================
   SCROLL REVEAL
   ================================================================= */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger cards in the same parent grid
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = (idx * 60) + 'ms';
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* =================================================================
   ACTIVE NAV DOT (scroll spy)
   ================================================================= */
const sections    = document.querySelectorAll('.section');
const navDots     = document.querySelectorAll('.nav-dot');
const sectionIds  = ['hero','story','reasons','gallery','letter','countdown','wishes','finale'];

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id  = entry.target.id;
      const idx = sectionIds.indexOf(id);
      navDots.forEach((d, i) => d.classList.toggle('active', i === idx));
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

/* =================================================================
   HERO — FLOATING HEARTS BELT
   ================================================================= */
function startHeroHearts() {
  const row = document.getElementById('heroHeartsRow');
  if (!row) return;
  const EMOJIS = ['❤️','💕','💖','💗','💓','🌸','💝','✨','🌹'];
  EMOJIS.forEach((e, i) => {
    const span = document.createElement('span');
    span.textContent = e;
    span.style.animation = `heartPulse ${1.2 + i * 0.15}s ease-in-out ${i * 0.1}s infinite`;
    span.style.display = 'inline-block';
    row.appendChild(span);
  });

  // Periodically spawn floating hearts from bottom of hero
  const hero = document.getElementById('hero');
  if (!hero) return;
  setInterval(() => {
    if (!document.getElementById('main-site').classList.contains('hidden')) {
      spawnHeart(hero);
    }
  }, 900);
}

function spawnHeart(container) {
  const HEARTS = ['❤️','💕','💖','🌸','✨','💗'];
  const heart  = document.createElement('span');
  heart.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
  heart.className   = 'floating-heart';
  const size  = Math.random() * 18 + 10;
  const left  = Math.random() * 90 + 5;
  const dur   = Math.random() * 6 + 5;
  Object.assign(heart.style, {
    fontSize: size + 'px',
    left:     left + '%',
    bottom:   '0',
    animationDuration: dur + 's',
    position: 'absolute',
  });
  container.appendChild(heart);
  setTimeout(() => heart.remove(), dur * 1000);
}

/* =================================================================
   REASON CARDS — FLIP ON CLICK
   ================================================================= */
document.querySelectorAll('.reason-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});

/* =================================================================
   GALLERY — LIGHTBOX
   ================================================================= */
const galleryItems   = [...document.querySelectorAll('.gallery-item')];
const lightbox       = document.getElementById('lightbox');
const lightboxImg    = document.getElementById('lightboxImg');
const lightboxCap    = document.getElementById('lightboxCaption');
const lightboxClose  = document.getElementById('lightboxClose');
const lightboxPrev   = document.getElementById('lightboxPrev');
const lightboxNext   = document.getElementById('lightboxNext');
let currentGalleryIdx = 0;

function openLightbox(idx) {
  const item = galleryItems[idx];
  if (!item) return;
  currentGalleryIdx = idx;
  lightboxImg.src = item.dataset.src || '';
  lightboxCap.textContent = item.dataset.caption || '';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  lightboxImg.src = '';
}

galleryItems.forEach((item, i) => {
  item.addEventListener('click', () => openLightbox(i));
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => {
  openLightbox((currentGalleryIdx - 1 + galleryItems.length) % galleryItems.length);
});
lightboxNext.addEventListener('click', () => {
  openLightbox((currentGalleryIdx + 1) % galleryItems.length);
});
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'ArrowLeft')  lightboxPrev.click();
  if (e.key === 'ArrowRight') lightboxNext.click();
  if (e.key === 'Escape')     closeLightbox();
});

/* =================================================================
   LOVE LETTER — ENVELOPE + TYPEWRITER
   ================================================================= */
const envelope      = document.getElementById('envelope');
const openLetterBtn = document.getElementById('openLetterBtn');
const typewriterEl  = document.getElementById('typewriterText');
let letterOpened    = false;

function typewrite(el, text, speed = 28) {
  let i = 0;
  el.textContent = '';
  el.classList.remove('done');

  function tick() {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(tick, speed);
    } else {
      el.classList.add('done');
    }
  }
  setTimeout(tick, 500); // slight delay after envelope opens
}

openLetterBtn.addEventListener('click', () => {
  if (letterOpened) return;
  letterOpened = true;
  envelope.classList.add('open');
  openLetterBtn.classList.add('hidden');
  typewrite(typewriterEl, LOVE_LETTER, 22);
});

/* =================================================================
   COUNTDOWN TIMER
   ================================================================= */
function updateCountdown() {
  const now  = new Date();
  let diff   = TARGET_DATE - now;

  if (diff < 0) {
    // If date has passed, count to the same date next year
    const next = new Date(TARGET_DATE);
    next.setFullYear(next.getFullYear() + 1);
    diff = next - now;
  }

  const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs  = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('countDays').textContent  = String(days).padStart(2, '0');
  document.getElementById('countHours').textContent = String(hours).padStart(2, '0');
  document.getElementById('countMins').textContent  = String(mins).padStart(2, '0');
  document.getElementById('countSecs').textContent  = String(secs).padStart(2, '0');
}

function updateDaysTogether() {
  const now        = new Date();
  const diffMs     = now - RELATIONSHIP_START;
  const days       = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const el         = document.getElementById('daysTogether');
  if (el) el.textContent = days.toLocaleString();
}

updateCountdown();
updateDaysTogether();
setInterval(updateCountdown, 1000);

/* =================================================================
   SURPRISE BUTTON — CONFETTI + POPUP
   ================================================================= */
const surpriseBtn   = document.getElementById('surpriseBtn');
const surprisePopup = document.getElementById('surprisePopup');
const popupClose    = document.getElementById('popupClose');
const confettiCvs   = document.getElementById('confettiCanvas');
const confettiCtx   = confettiCvs ? confettiCvs.getContext('2d') : null;

let confettiActive  = false;
let confettiPieces  = [];
let confettiRaf;

// Confetti piece factory
function createConfettiPiece() {
  const COLORS = ['#f2a7c0','#c8b4e8','#f0c5a8','#ffffff','#e07b9a','#a78bfa','#fcd34d'];
  return {
    x:    Math.random() * confettiCvs.width,
    y:    -10,
    r:    Math.random() * 7 + 3,
    d:    Math.random() * 80 + 20,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    tilt: Math.random() * 10 - 5,
    tiltAng: 0,
    tiltIncr: Math.random() * 0.07 + 0.05,
    vx: Math.random() * 3 - 1.5,
    vy: Math.random() * 2 + 1.5,
    shape: Math.random() > 0.5 ? 'rect' : 'circle',
  };
}

function resizeConfettiCanvas() {
  if (!confettiCvs) return;
  confettiCvs.width  = window.innerWidth;
  confettiCvs.height = window.innerHeight;
}
resizeConfettiCanvas();
window.addEventListener('resize', resizeConfettiCanvas);

function drawConfetti() {
  if (!confettiCtx) return;
  confettiCtx.clearRect(0, 0, confettiCvs.width, confettiCvs.height);

  confettiPieces.forEach(p => {
    confettiCtx.save();
    confettiCtx.fillStyle = p.color;
    confettiCtx.beginPath();
    if (p.shape === 'circle') {
      confettiCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    } else {
      confettiCtx.translate(p.x, p.y);
      confettiCtx.rotate(p.tilt);
      confettiCtx.fillRect(-p.r, -p.r * 0.5, p.r * 2, p.r);
    }
    confettiCtx.fill();
    confettiCtx.restore();

    p.tiltAng += p.tiltIncr;
    p.tilt = Math.sin(p.tiltAng) * 12;
    p.x += p.vx;
    p.y += p.vy;

    // Recycle
    if (p.y > confettiCvs.height + 20) {
      p.x = Math.random() * confettiCvs.width;
      p.y = -10;
    }
  });

  if (confettiActive) confettiRaf = requestAnimationFrame(drawConfetti);
  else {
    confettiCtx.clearRect(0, 0, confettiCvs.width, confettiCvs.height);
    confettiCvs.classList.remove('active');
  }
}

function startConfetti(duration = 5000) {
  if (!confettiCtx) return;
  confettiPieces = Array.from({ length: 180 }, createConfettiPiece);
  confettiCvs.classList.add('active');
  confettiActive = true;
  drawConfetti();
  setTimeout(() => {
    confettiActive = false;
  }, duration);
}

surpriseBtn.addEventListener('click', () => {
  startConfetti(6000);
  surprisePopup.classList.add('open');
  // Spawn mini hearts inside popup
  const container = document.getElementById('popupHearts');
  for (let i = 0; i < 12; i++) {
    const h = document.createElement('span');
    h.textContent = ['❤️','💕','💖','✨','🌸'][Math.floor(Math.random() * 5)];
    h.className   = 'floating-heart';
    const size = Math.random() * 16 + 10;
    Object.assign(h.style, {
      fontSize: size + 'px',
      left: Math.random() * 90 + '%',
      bottom: '0',
      animationDuration: (Math.random() * 3 + 2) + 's',
      animationDelay:    (Math.random() * 2) + 's',
    });
    container.appendChild(h);
  }
});

popupClose.addEventListener('click', () => {
  surprisePopup.classList.remove('open');
});
surprisePopup.addEventListener('click', (e) => {
  if (e.target === surprisePopup) surprisePopup.classList.remove('open');
});

/* =================================================================
   FINALE — TWINKLING STARS
   ================================================================= */
function startFinaleStars() {
  const container = document.getElementById('finaleStars');
  if (!container) return;
  const COUNT = 80;

  for (let i = 0; i < COUNT; i++) {
    const star = document.createElement('div');
    star.className = 'finale-star';
    const size  = Math.random() * 3 + 1;
    const left  = Math.random() * 100;
    const top   = Math.random() * 100;
    const delay = Math.random() * 5;
    const dur   = Math.random() * 4 + 2;
    Object.assign(star.style, {
      width:  size + 'px',
      height: size + 'px',
      left:   left + '%',
      top:    top + '%',
      animationDuration: dur + 's',
      animationDelay:    delay + 's',
    });
    container.appendChild(star);
  }

  // Finale sparks (hearts)
  const sparks = document.getElementById('finaleSparks');
  if (!sparks) return;
  setInterval(() => {
    const s = document.createElement('span');
    s.textContent = ['❤️','💕','✨','🌟','💖'][Math.floor(Math.random() * 5)];
    s.className   = 'floating-heart';
    const size = Math.random() * 20 + 12;
    Object.assign(s.style, {
      fontSize: size + 'px',
      left: Math.random() * 100 + '%',
      bottom: '0',
      animationDuration: (Math.random() * 7 + 5) + 's',
      position: 'absolute',
    });
    sparks.appendChild(s);
    setTimeout(() => s.remove(), 12000);
  }, 700);
}

/* =================================================================
   HERO BACKGROUND PARTICLES
   ================================================================= */
(function initHeroParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  const SYMBOLS = ['✦','✧','·','⋆','˚'];
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('span');
    p.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    const size  = Math.random() * 14 + 6;
    const left  = Math.random() * 100;
    const top   = Math.random() * 100;
    const dur   = Math.random() * 5 + 3;
    const delay = Math.random() * 5;
    Object.assign(p.style, {
      position: 'absolute',
      fontSize: size + 'px',
      left: left + '%', top: top + '%',
      color: `rgba(${Math.random()>0.5?'220,130,170':'180,140,230'},${Math.random()*0.5+0.2})`,
      animation: `twinkle ${dur}s ${delay}s ease-in-out infinite`,
      pointerEvents: 'none',
    });
    container.appendChild(p);
  }
})();

/* =================================================================
   SMOOTH SCROLL for any anchor link
   ================================================================= */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* =================================================================
   TOUCH SWIPE support for lightbox
   ================================================================= */
let touchStartX = 0;
lightbox.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
lightbox.addEventListener('touchend',   (e) => {
  const dx = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(dx) > 50) {
    dx < 0 ? lightboxNext.click() : lightboxPrev.click();
  }
});

/* =================================================================
   KEYBOARD SHORTCUTS (global)
   ================================================================= */
document.addEventListener('keydown', (e) => {
  if (e.key === 'm' || e.key === 'M') musicBtn.click(); // M = toggle music
});

/* =================================================================
   Console easter egg 🥚
   ================================================================= */
console.log('%c💕 Made with love 💕', 'font-size:18px;color:#e07b9a;font-weight:bold;');
console.log('%cCustomise the PERSONALISATION CONSTANTS at the top of script.js!', 'font-size:12px;color:#8a6a9a;');
