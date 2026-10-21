// ====== EDIT YOUR INFO HERE ======
const ME = {
  name: "Angel Rose Gabison",
  bio: "BS Information Technology student at the University of Cebu. I like making things that feel good to use.",
  roles: ["I build websites.", "I play Valorant with my friends.", "I notice bad buttons everywhere."],
  facts: ["📍 Cebu City", "🎓 University of Cebu", "🎧 Lo-fi while coding", "🍜 Ramen forever"],
  bubbles: ["Hi! 👋", "Valorant later?", "Try the aim trainer!", "Drag the stickers!", "Psst, scroll down!", "Press Q, E, C or X at Abilities."],
  hobbies: [
    { icon: "🎮", title: "Gaming", color: "#ff4655", back: "I play Valorant with my friends. I've been enjoying it for quite a while now." },
    { icon: "🎵", title: "Music", color: "#00e5c3", back: "My favorite artist is Ariana Grande." },
    { icon: "📸", title: "Photography", color: "#ffd166", back: "Nature is beautiful to look at, so that's what I love to shoot." },
    { icon: "🍳", title: "Cooking", color: "#8da2ff", back: "I love cooking Filipino dishes like adobo." }
  ],
  skills: [
    { icon: "🎨", name: "HTML & CSS", level: 80, desc: "I build layouts that look good on any screen size.", tools: ["Flexbox", "Grid", "Responsive design"] },
    { icon: "⚡", name: "JavaScript", level: 60, desc: "I make pages react when you click, type or scroll. The games on this site are my practice.", tools: ["DOM", "Events", "Animations"] },
    { icon: "💡", name: "Design thinking", level: 70, desc: "I ask who will use something and what they need before I design it.", tools: ["User feedback", "Wireframes", "Accessibility"] },
    { icon: "🤝", name: "Teamwork", level: 90, desc: "I like sharing the work and keeping everyone on the same page.", tools: ["Communication", "Planning", "Listening"] }
  ],
  game: [
    { text: "I have never been outside the Philippines.", lie: false, why: "True! Still on my bucket list." },
    { text: "I can solve a Rubik's cube in under a minute.", lie: true, why: "Lie! I peeled the stickers once." },
    { text: "I have eaten ramen three days in a row.", lie: false, why: "True, and I would do it again." }
  ],
  quiz: [
    { q: "Which game do I play with my friends?", options: ["Minecraft", "Valorant", "Roblox", "Chess"], answer: 1 },
    { q: "Who is my favorite artist?", options: ["Ariana Grande", "Taylor Swift", "Olivia Rodrigo", "Billie Eilish"], answer: 0 },
    { q: "Which dish do I love cooking?", options: ["Sinigang", "Spaghetti", "Adobo", "Pancit"], answer: 2 },
    { q: "Where do I study?", options: ["USC", "University of Cebu", "CIT-U", "UP Cebu"], answer: 1 }
  ],
  random: {
    fun: [
      "Honey never spoils. Archaeologists found edible honey in ancient tombs.",
      "Cebu City, founded in 1565, is the oldest city in the Philippines.",
      "The first computer bug was an actual moth, found in 1947.",
      "Octopuses have three hearts.",
      "Bananas are berries, but strawberries are not.",
      "A day on Venus is longer than its year.",
      "The first computer mouse was made of wood.",
      "Sharks existed before trees did.",
      "Wombat poop is cube-shaped.",
      "The first website went live in 1991."
    ],
    wyr: [
      { a: "Code with zero bugs", b: "Design with zero limits", pick: 1, why: "Bugs teach me stuff, but limitless design sounds like a dream." },
      { a: "Adobo every day", b: "Ramen every day", pick: 0, why: "Adobo never gets old." },
      { a: "Lose Wi-Fi for a week", b: "Lose your phone for a week", pick: 1, why: "I can survive without my phone, but not without Wi-Fi!" },
      { a: "Be great at gaming", b: "Be great at singing", pick: 0, why: "Valorant ranks over karaoke, sorry." },
      { a: "Live by the beach", b: "Live in the mountains", pick: 0, why: "Beach sunsets win every time." },
      { a: "Unlimited snacks", b: "Unlimited sleep", pick: 1, why: "Sleep is the best power-up." }
    ],
    me: [
      "I play Valorant with my friends.",
      "My favorite artist is Ariana Grande.",
      "I study BS Information Technology at the University of Cebu.",
      "Adobo is my go-to dish to cook.",
      "I love taking photos of nature."
    ]
  }
};
// =================================

const $ = s => document.querySelector(s), $$ = s => document.querySelectorAll(s);
const shuffle = a => [...a].sort(() => Math.random() - .5);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const initials = ME.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

// ==========================================
// SOUND EFFECTS (Web Audio API)
// ==========================================
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;

function playSound(type) {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  const now = audioCtx.currentTime;

  if (type === 'click') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1500, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.03);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
    osc.start(now);
    osc.stop(now + 0.03);
  } else if (type === 'hit') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.1);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    osc.start(now);
    osc.stop(now + 0.1);
  } else if (type === 'correct') {
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.setValueAtTime(800, now + 0.1);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc.start(now);
    osc.stop(now + 0.2);
  } else if (type === 'wrong') {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.2);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc.start(now);
    osc.stop(now + 0.2);
  }
}

document.addEventListener('click', (e) => {
  if (e.target.closest('button, .btn, .tab, .stmt, .opt, .card, .sk, .mc, .sw')) {
    playSound('click');
  }
});

// ==========================================
// NEW: CUSTOM CURSOR
// ==========================================
const cursor = $("#cursor");
if (cursor && !reduce) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
} else if (cursor) {
  cursor.style.display = "none";
}

// ==========================================
// YOUR ORIGINAL LOGIC BELOW
// ==========================================

// Name: each letter bounces on hover
$("#name").setAttribute("aria-label", ME.name);
$("#name").setAttribute("data-text", ME.name);
$("#name").innerHTML = ME.name.split(" ").map(w =>
  `<span class="w" aria-hidden="true">${[...w].map(c => `<span class="l">${c}</span>`).join("")}</span>`).join(" ");
$("#footName").textContent = ME.name;
$("#bio").textContent = ME.bio;
$("#logo").textContent = initials;
document.title = ME.name + " | Personal Website";
$("#facts").innerHTML = ME.facts.map(f => `<li>${f}</li>`).join("");

// REMOVED PHOTO FALLBACK HERE

// Typewriter
(function type(i = 0, j = 0, del = false) {
  const el = $("#typed"), t = ME.roles[i];
  if (reduce) { el.textContent = t; return; }
  el.textContent = t.slice(0, j);
  let wait = del ? 30 : 70;
  if (!del && j === t.length) { wait = 1500; del = true; }
  else if (del && j === 0) { del = false; i = (i + 1) % ME.roles.length; wait = 300; }
  setTimeout(() => type(i, j + (del ? -1 : 1), del), wait);
})();

// Toast + confetti
function toast(msg) {
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2500);
}
function confetti() {
  if (reduce) return;
  const colors = ["#ff4655", "#ece8e1", "#00e5c3", "#8da2ff"];
  for (let i = 0; i < 60; i++) {
    const c = document.createElement("span");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = colors[i % 4];
    document.body.append(c);
    c.animate([{ transform: "translateY(0) rotate(0)" },
      { transform: `translate(${Math.random() * 200 - 100}px,105vh) rotate(${Math.random() * 720}deg)` }],
      { duration: 1800 + Math.random() * 1400, easing: "ease-in" }).onfinish = () => c.remove();
  }
}

// ==========================================
// NEW: 3D PHOTO TILT + GLARE
// ==========================================
const pw = $("#photoWrap"), spot = $("#spot"), glare = $(".glare");
let tx = innerWidth * .6, ty = innerHeight * .4, cx = tx, cy = ty;

if (!reduce) {
  addEventListener("pointermove", e => {
    tx = e.clientX; ty = e.clientY; spot.classList.add("on");
    const b = pw.getBoundingClientRect();
    
    if (b.bottom > 0 && b.top < innerHeight) {
      const k = v => Math.max(-1, Math.min(1, v));
      const dx = k((e.clientX - (b.left + b.width / 2)) / b.width);
      const dy = k((e.clientY - (b.top + b.height / 2)) / b.height);
      
      // Tilt effect
      pw.style.transform = `rotateY(${dx * 14}deg) rotateX(${-dy * 14}deg) scale(1.02)`;
      
      // Glare effect follows mouse
      if (glare) {
        glare.style.opacity = 1;
        glare.style.transform = `translateX(${dx * 100}%) translateY(${dy * 100}%)`;
      }
    }
  });

  document.documentElement.addEventListener("mouseleave", () => { 
    spot.classList.remove("on"); 
    pw.style.transform = ""; 
    if (glare) glare.style.opacity = 0;
  });

  (function glide() {
    cx += (tx - cx) * .12; cy += (ty - cy) * .12;
    spot.style.setProperty("--sx", cx + "px"); spot.style.setProperty("--sy", cy + "px");
    requestAnimationFrame(glide);
  })();
}

// Click the photo: wiggle + speech bubble
let bi = 0, bt;
function sayHi() {
  const col = $(".photo-col"), b = $("#bubble");
  b.textContent = ME.bubbles[bi++ % ME.bubbles.length];
  b.classList.add("show");
  col.classList.remove("wiggle"); void col.offsetWidth; col.classList.add("wiggle");
  clearTimeout(bt); bt = setTimeout(() => b.classList.remove("show"), 2500);
}
pw.onclick = sayHi;
pw.onkeydown = e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); sayHi(); } };

// Draggable stickers
$$(".sticker").forEach(s => {
  let sx, sy, ox = 0, oy = 0, drag = false;
  s.onpointerdown = e => { drag = true; sx = e.clientX - ox; sy = e.clientY - oy; s.setPointerCapture(e.pointerId); s.style.animationPlayState = "paused"; s.style.cursor = "grabbing"; };
  s.onpointermove = e => { if (!drag) return; ox = e.clientX - sx; oy = e.clientY - sy; s.style.translate = `${ox}px ${oy}px`; };
  s.onpointerup = () => { drag = false; s.style.animationPlayState = "running"; s.style.cursor = "grab"; };
});

// Hobby flip cards
$("#cards").innerHTML = ME.hobbies.map(h => `
  <button class="card" style="--c:${h.color}" aria-pressed="false">
    <span class="inner">
      <span class="face"><span class="emoji">${h.icon}</span><span class="t">${h.title}</span><span class="tap">Tap to flip</span></span>
      <span class="face back">${h.back}</span>
    </span>
  </button>`).join("");
$$(".card").forEach(c => c.onclick = () => c.setAttribute("aria-pressed", c.classList.toggle("flipped")));

// Abilities: rings, detail panel, level up, Q/E/C/X keys
const KEYS = ["Q", "E", "C", "X"];
$("#skillGrid").innerHTML = ME.skills.map((s, i) => `
  <button class="sk" aria-pressed="false" data-i="${i}">
    <span class="key" aria-hidden="true">${KEYS[i] || ""}</span>
    <span class="pie"><svg viewBox="0 0 100 100"><circle class="bg" cx="50" cy="50" r="44" pathLength="100"/><circle class="fg" cx="50" cy="50" r="44" pathLength="100"/></svg>${s.icon}</span>
    <b>${s.name}</b><span class="pct">0%</span>
  </button>`).join("");
const setLevel = i => {
  const b = $$(".sk")[i];
  b.querySelector(".fg").style.strokeDasharray = `${ME.skills[i].level} 100`;
  b.querySelector(".pct").textContent = ME.skills[i].level + "%";
};
function showSkill(i) {
  const s = ME.skills[i], d = $("#skillDetail");
  $$(".sk").forEach((b, j) => b.setAttribute("aria-pressed", j === i));
  d.innerHTML = `<h3>${s.icon} ${s.name}</h3><p>${s.desc}</p>
    <div class="tools">${s.tools.map(t => `<span>${t}</span>`).join("")}</div>
    <button class="btn" id="lvl" ${s.level >= 100 ? "disabled" : ""}>${s.level >= 100 ? "Ultimate ready!" : "Level up +5"}</button>`;
  d.classList.remove("pop"); void d.offsetWidth; d.classList.add("pop");
  $("#lvl").onclick = e => {
    s.level = Math.min(100, s.level + 5); setLevel(i);
    if (s.level >= 100) { e.target.textContent = "Ultimate ready!"; e.target.disabled = true; confetti(); toast(s.name + ": ultimate ready!"); }
  };
}
$$(".sk").forEach(b => b.onclick = () => showSkill(+b.dataset.i));
showSkill(0);
new IntersectionObserver((es, ob) => {
  if (es[0].isIntersecting) { ME.skills.forEach((_, i) => setLevel(i)); ob.disconnect(); }
}, { threshold: .3 }).observe($("#skillGrid"));
addEventListener("keydown", e => {
  if (e.ctrlKey || e.metaKey || e.altKey || /INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
  const i = KEYS.indexOf(e.key.toUpperCase());
  const r = $("#skills").getBoundingClientRect();
  if (i > -1 && i < ME.skills.length && r.top < innerHeight && r.bottom > 0) showSkill(i);
});

// Design lab
const cols = ["#ff4655", "#ece8e1", "#00e5c3", "#8da2ff", "#ffd166"];
const darkText = ["#ece8e1", "#00e5c3", "#ffd166"];
let labColor = cols[0];
$("#swatches").innerHTML = cols.map((c, i) => `<button class="sw" style="background:${c}" aria-label="Color ${c}" aria-pressed="${i === 0}" data-c="${c}"></button>`).join("");
function labUpdate() {
  const b = $("#labBtn"), r = $("#labRad").value, f = $("#labSize").value;
  b.textContent = $("#labText").value || "Click me";
  b.style.borderRadius = r + "px"; b.style.fontSize = f + "px";
  b.style.background = labColor;
  b.style.color = darkText.includes(labColor) ? "#0f1923" : "#fff";
  $("#labCss").textContent = `.button {\n  background: ${labColor};\n  border-radius: ${r}px;\n  font-size: ${f}px;\n}`;
}
$$(".sw").forEach(s => s.onclick = () => {
  labColor = s.dataset.c; $$(".sw").forEach(x => x.setAttribute("aria-pressed", x === s)); labUpdate();
});
["#labText", "#labRad", "#labSize"].forEach(id => $(id).oninput = labUpdate);
$("#labBtn").addEventListener("click", () => { toast("Nice button! 🎨"); });
labUpdate();

// Game tabs
$$(".tab").forEach(t => t.onclick = () => {
  $$(".tab").forEach(x => x.setAttribute("aria-selected", x === t));
  $$("[data-panel]").forEach(p => p.hidden = p.dataset.panel !== t.dataset.tab);
});

// Game 1: Two truths and a lie
function play() {
  const box = $("#stmts");
  $("#result").textContent = ""; $("#again").hidden = true;
  box.innerHTML = shuffle(ME.game).map(g => `<button class="stmt" data-i="${ME.game.indexOf(g)}">${g.text}</button>`).join("");
  box.querySelectorAll(".stmt").forEach(b => b.onclick = () => {
    const g = ME.game[b.dataset.i];
    if (g.lie) {
      box.querySelectorAll(".stmt").forEach(x => x.disabled = true);
      b.classList.add("correct");
      playSound('correct');
      $("#result").textContent = "You got it! " + g.why;
      $("#again").hidden = false; confetti();
    } else {
      b.classList.add("wrong"); b.disabled = true;
      playSound('wrong');
      $("#result").textContent = "Nope. " + g.why + " Try another.";
    }
  });
}
$("#again").onclick = play; play();

// Game 2: Memory match
function memory() {
  const box = $("#mem"), icons = ["🎮", "🎵", "📸", "🍳", "🍜", "🎧"];
  let open = [], moves = 0, found = 0;
  $("#memInfo").textContent = "Moves: 0";
  box.innerHTML = shuffle([...icons, ...icons]).map(e => `<button class="mc" data-e="${e}" aria-label="Hidden card">?</button>`).join("");
  box.querySelectorAll(".mc").forEach(c => c.onclick = () => {
    if (open.length === 2 || c.classList.contains("open")) return;
    c.classList.add("open"); c.textContent = c.dataset.e; open.push(c);
    if (open.length < 2) return;
    $("#memInfo").textContent = "Moves: " + (++moves);
    const [a, b] = open;
    if (a.dataset.e === b.dataset.e) {
      a.classList.add("done"); b.classList.add("done"); open = [];
      playSound('correct');
      if (++found === icons.length) { confetti(); toast("All matched in " + moves + " moves!"); }
    } else setTimeout(() => { open.forEach(x => { x.classList.remove("open"); x.textContent = "?"; }); open = []; }, 800);
  });
}
$("#memReset").onclick = memory; memory();

// Game 3: Quiz
let qi = 0, qs = 0;
function quiz() {
  const box = $("#quiz");
  if (qi >= ME.quiz.length) {
    const perfect = qs === ME.quiz.length;
    box.innerHTML = `<p class="result">You scored ${qs}/${ME.quiz.length}. ${perfect ? "You know me so well!" : "Not bad. Try again!"}</p><button class="btn ghost" id="qAgain">Try again</button>`;
    if (perfect) confetti();
    $("#qAgain").onclick = () => { qi = qs = 0; quiz(); };
    return;
  }
  const q = ME.quiz[qi];
  box.innerHTML = `<p class="sub">Question ${qi + 1} of ${ME.quiz.length}</p><h3 class="qh">${q.q}</h3>` +
    q.options.map((o, i) => `<button class="stmt" data-i="${i}">${o}</button>`).join("");
  const btns = box.querySelectorAll(".stmt");
  btns.forEach(b => b.onclick = () => {
    const ok = +b.dataset.i === q.answer; if (ok) qs++;
    btns.forEach(x => x.disabled = true);
    b.classList.add(ok ? "correct" : "wrong");
    playSound(ok ? 'correct' : 'wrong');
    btns[q.answer].classList.add("correct");
    setTimeout(() => { qi++; quiz(); }, 1000);
  });
}
quiz();

// Game 4: Aim trainer (10 seconds, ends with a rank)
const RANKS = ["Iron", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Ascendant", "Immortal", "Radiant"];
const rankOf = n => RANKS[Math.min(RANKS.length - 1, Math.floor(n / 3))];
let best = 0, timer;
$("#tapStart").onclick = () => {
  clearInterval(timer);
  $("#tapStart").textContent = "Retry";
  let t = 10, score = 0; const arena = $("#arena");
  const info = () => $("#tapInfo").textContent = `Time: ${t}s | Hits: ${score} | Best: ${best}`;
  const move = () => {
    arena.innerHTML = `<button class="target" style="left:${10 + Math.random() * 80}%;top:${12 + Math.random() * 76}%" aria-label="Hit the target">🎯</button>`;
    arena.firstChild.onclick = e => { e.stopPropagation(); score++; playSound('hit'); info(); move(); };
  };
  move(); info();
  timer = setInterval(() => {
    t--; info();
    if (t <= 0) {
      clearInterval(timer); best = Math.max(best, score); info();
      arena.innerHTML = `<p class="result">Time's up! ${score} hits. Rank: ${rankOf(score)}</p>`;
      if (score >= 15) confetti();
    }
  }, 1000);
};

// Random buttons (no repeats until the list runs out)
const bags = {};
function nextRandom(k) {
  if (!bags[k] || !bags[k].length) bags[k] = shuffle(ME.random[k]);
  const item = bags[k].pop(), f = $("#fact");
  if (k === "wyr") {
    f.innerHTML = `<div class="wyr">
      <button class="opt" data-p="0">${item.a}</button><span class="vs">or</span>
      <button class="opt" data-p="1">${item.b}</button></div>
      <p class="wyr-why" id="wyrWhy">Pick one!</p>`;
    const opts = f.querySelectorAll(".opt");
    opts.forEach(o => o.onclick = () => {
      opts.forEach(x => x.disabled = true);
      const you = +o.dataset.p;
      o.classList.add("you");
      opts[item.pick].classList.add("mine");
      opts[item.pick].insertAdjacentHTML("beforeend", `<span class="tag">✓ My pick</span>`);
      $("#wyrWhy").textContent = (you === item.pick ? "Same pick! 🎉 " : "We picked differently! ") + item.why;
      $("#wyrWhy").insertAdjacentHTML("afterend", `<button class="btn ghost" id="nextWyr">Next one</button>`);
      $("#nextWyr").onclick = () => nextRandom("wyr");
    });
  } else f.textContent = item;
  f.classList.remove("pop"); void f.offsetWidth; f.classList.add("pop");
}
$$("[data-kind]").forEach(b => b.onclick = () => {
  $$("[data-kind]").forEach(x => {
    x.classList.toggle("on", x === b); x.classList.toggle("ghost", x !== b);
    x.setAttribute("aria-pressed", x === b);
  });
  nextRandom(b.dataset.kind);
});

// Theme toggle (dark Valorant theme is the default, cream is the light mode)
$("#themeBtn").onclick = e => {
  const light = document.documentElement.dataset.theme !== "light";
  document.documentElement.dataset.theme = light ? "light" : "dark";
  e.currentTarget.textContent = light ? "🌙" : "☀️";
  e.currentTarget.setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode");
};

// Click hit markers
addEventListener("click", e => {
  if (reduce) return;
  const s = document.createElement("span");
  s.className = "burst";
  s.textContent = ["✕", "◆", "✦"][Math.random() * 3 | 0];
  s.style.color = ["#ff4655", "#ece8e1", "#00e5c3"][Math.random() * 3 | 0];
  s.style.left = e.clientX + "px"; s.style.top = e.clientY + "px";
  document.body.append(s);
  s.animate([{ transform: "translate(-50%,-50%) scale(.6)", opacity: 1 },
    { transform: `translate(-50%,-${50 + Math.random() * 40}px) scale(1.4)`, opacity: 0 }],
    { duration: 700 }).onfinish = () => s.remove();
});

// Scroll progress bar
addEventListener("scroll", () => {
  const h = document.documentElement;
  $("#progress").style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + "%";
});

// Round timer (celebrates at 45 seconds)
let sec = 0;
setInterval(() => {
  sec++;
  $("#timer").textContent = `Round ${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
  if (sec === 45) { confetti(); toast("ACE! You stayed 45 seconds"); }
}, 1000);

// Easter egg: click the logo 5 times
let taps = 0;
$("#logo").onclick = () => {
  scrollTo({ top: 0 });
  if (++taps === 5) { taps = 0; confetti(); toast("You found the secret! 🎉"); }
};