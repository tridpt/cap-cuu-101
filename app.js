/* ============================================================
   CẤP CỨU 101: Đừng Để Chết Nhảm
   Vanilla JS — no build step. Mở index.html là chạy.
   ============================================================ */

(() => {
  "use strict";

  /* ---------- NAVIGATION ---------- */
  const screens = {};
  document.querySelectorAll(".screen").forEach(s => (screens[s.id] = s));
  let current = "screen-home";

  function go(id) {
    if (!screens[id]) return;
    if (current === "screen-game") stopGame();
    if (current === "screen-panic") stopPanic();
    if (id === "screen-panic" && window.Sfx) Sfx.stopMusic();
    screens[current].classList.remove("active");
    screens[id].classList.add("active");
    current = id;
    if (id === "screen-levels") renderLevels();
    if (id === "screen-achievements") renderAchievements();
  }
  document.querySelectorAll("[data-goto]").forEach(btn =>
    btn.addEventListener("click", () => go(btn.dataset.goto))
  );

  /* ---------- SAVE STARS ---------- */
  const SAVE_KEY = "capcuu101_stars";
  function loadStars() {
    try { return JSON.parse(localStorage.getItem(SAVE_KEY)) || {}; }
    catch { return {}; }
  }
  function saveStars(id, stars) {
    const all = loadStars();
    if (!all[id] || all[id] < stars) all[id] = stars;
    localStorage.setItem(SAVE_KEY, JSON.stringify(all));
  }
  function totalStars() {
    return Object.values(loadStars()).reduce((a, b) => a + b, 0);
  }

  /* ---------- STATS, STREAK & BADGES ---------- */
  const STATS_KEY = "capcuu101_stats";
  function loadStats() {
    try {
      return Object.assign(
        { wins: {}, totalWins: 0, best: {}, streak: { count: 0, last: "" }, badges: [] },
        JSON.parse(localStorage.getItem(STATS_KEY)) || {}
      );
    } catch {
      return { wins: {}, totalWins: 0, best: {}, streak: { count: 0, last: "" }, badges: [] };
    }
  }
  function saveStats(s) { localStorage.setItem(STATS_KEY, JSON.stringify(s)); }

  function todayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }
  function daysBetween(a, b) {
    const pa = a.split("-").map(Number), pb = b.split("-").map(Number);
    const da = new Date(pa[0], pa[1] - 1, pa[2]);
    const db = new Date(pb[0], pb[1] - 1, pb[2]);
    return Math.round((db - da) / 86400000);
  }

  function recordWin(id) {
    const s = loadStats();
    s.wins[id] = (s.wins[id] || 0) + 1;
    s.totalWins++;
    // streak
    const t = todayStr();
    if (s.streak.last !== t) {
      const gap = s.streak.last ? daysBetween(s.streak.last, t) : 999;
      s.streak.count = gap === 1 ? s.streak.count + 1 : 1;
      s.streak.last = t;
    }
    saveStats(s);
  }

  function saveBest(id, val) {
    const s = loadStats();
    if (!s.best[id] || val > s.best[id]) { s.best[id] = val; saveStats(s); }
  }

  const BADGES = [
    { id: "rookie", emoji: "🐣", name: "Lính mới", desc: "Cứu sống lần đầu tiên",
      test: (s, st) => s.totalWins >= 1 },
    { id: "cpr_master", emoji: "❤️‍🔥", name: "Bậc thầy CPR", desc: "Đạt 3 sao màn ép tim",
      test: (s, st) => (st.cpr || 0) >= 3 },
    { id: "combo", emoji: "🎯", name: "Tay nhịp vàng", desc: "Combo x10 ở màn CPR",
      test: (s) => (s.best.cpr || 0) >= 10 },
    { id: "five", emoji: "🖐️", name: "Nửa đường", desc: "3 sao ít nhất 5 màn",
      test: (s, st) => Object.values(st).filter(v => v >= 3).length >= 5 },
    { id: "explorer", emoji: "🧭", name: "Thử mọi thứ", desc: "Thắng đủ cả 10 màn",
      test: (s) => Object.keys(s.wins).length >= 10 },
    { id: "all_stars", emoji: "👑", name: "Cứu tinh", desc: "3 sao tất cả các màn",
      test: (s, st) => LEVELS.every(l => (st[l.id] || 0) >= 3) },
    { id: "streak3", emoji: "🔥", name: "Chăm chỉ", desc: "Chuỗi 3 ngày liên tiếp",
      test: (s) => s.streak.count >= 3 },
    { id: "streak7", emoji: "🏅", name: "Kiên trì", desc: "Chuỗi 7 ngày liên tiếp",
      test: (s) => s.streak.count >= 7 }
  ];

  // trả về tên các huy hiệu MỚI mở khoá
  function checkBadges() {
    const s = loadStats();
    const st = loadStars();
    const newly = [];
    BADGES.forEach(b => {
      if (!s.badges.includes(b.id) && b.test(s, st)) {
        s.badges.push(b.id);
        newly.push(b.name);
      }
    });
    if (newly.length) saveStats(s);
    return newly;
  }

  /* ---------- LEVEL DATA ---------- */
  const LEVELS = [
    {
      id: "cpr",
      emoji: "🐻",
      title: "Ép tim cho Gấu Béo",
      desc: "CPR — vỗ tim đúng nhịp 100–120 lần/phút",
      type: "rhythm",
      char: "🐻",
      lesson: "CPR thật: ép giữa ngực, sâu 5–6cm, nhịp 100–120/phút. Nhớ bài hát 'Stayin' Alive' — đúng nhịp đấy!"
    },
    {
      id: "choke",
      emoji: "👽",
      title: "Người ngoài hành tinh nghẹn trân châu",
      desc: "Heimlich — đẩy bụng tống dị vật ra",
      type: "thrust",
      char: "👽",
      lesson: "Hóc dị vật: đứng sau, ôm bụng trên rốn, đẩy mạnh vào trong & lên trên cho đến khi bật ra."
    },
    {
      id: "burn",
      emoji: "🔥",
      title: "Cứu anh đầu bếp bị bỏng",
      desc: "Xả nước mát lên vết bỏng cho đủ lâu",
      type: "hose",
      char: "🧑‍🍳",
      lesson: "Bỏng: xả nước mát (KHÔNG dùng đá) 20 phút. Không bôi kem đánh răng, bơ, nước mắm gì cả!"
    },
    {
      id: "bleed",
      emoji: "🩸",
      title: "Cầm máu cho Zombie hậu đậu",
      desc: "Đặt gạc đúng chỗ & giữ ép cầm máu",
      type: "press",
      char: "🧟",
      lesson: "Chảy máu: ép trực tiếp lên vết thương bằng gạc sạch, nâng cao chi, giữ ép liên tục."
    },
    {
      id: "drown",
      emoji: "🌊",
      title: "Vớt chú cá vàng đuối nước",
      desc: "Xử lý đuối nước đúng trình tự",
      type: "quiz",
      char: "🐠",
      lesson: "Đuối nước: đảm bảo an toàn cho mình trước, đưa nạn nhân lên cạn, gọi 115, kiểm tra thở & CPR nếu cần."
    },
    {
      id: "electric",
      emoji: "⚡",
      title: "Robot bị điện giật",
      desc: "Ngắt nguồn trước khi cứu!",
      type: "quiz",
      char: "🤖",
      lesson: "Điện giật: NGẮT nguồn điện trước. Tuyệt đối không chạm vào nạn nhân khi còn dòng điện."
    },
    {
      id: "seizure",
      emoji: "🌀",
      title: "Bạch tuộc lên cơn co giật",
      desc: "Bảo vệ, đừng giữ chặt",
      type: "quiz",
      char: "🐙",
      lesson: "Co giật: dọn vật nguy hiểm, lót đầu mềm, KHÔNG giữ chặt, KHÔNG nhét gì vào miệng, canh giờ cơn giật."
    },
    {
      id: "anaphylaxis",
      emoji: "🐝",
      title: "Ong vò vẽ bị... dị ứng ong",
      desc: "Sốc phản vệ — tiêm adrenaline & gọi 115",
      type: "quiz",
      char: "🐝",
      lesson: "Sốc phản vệ: dùng bút tiêm adrenaline (EpiPen) vào đùi ngoài ngay, gọi 115, cho nằm kê chân cao."
    },
    {
      id: "fracture",
      emoji: "🦴",
      title: "Khủng long gãy chân",
      desc: "Cố định, đừng nắn xương",
      type: "quiz",
      char: "🦖",
      lesson: "Gãy xương: cố định nguyên tư thế, KHÔNG nắn, chườm lạnh giảm sưng, đưa đi viện."
    },
    {
      id: "snakebite",
      emoji: "🐍",
      title: "Rắn cắn nhầm... cao bồi",
      desc: "Bất động & tới viện, đừng hút nọc",
      type: "quiz",
      char: "🤠",
      lesson: "Rắn cắn: giữ nạn nhân bất động, để vết cắn thấp hơn tim, KHÔNG rạch, hút nọc hay garô chặt. Đến viện gấp."
    }
  ];

  /* ---------- RENDER LEVELS ---------- */
  function renderLevels() {
    document.getElementById("total-stars").textContent = totalStars();
    renderStreakBanner();
    const saved = loadStars();
    const list = document.getElementById("level-list");
    list.innerHTML = "";
    LEVELS.forEach(lv => {
      const got = saved[lv.id] || 0;
      const stars = "★".repeat(got) + "☆".repeat(3 - got);
      const card = document.createElement("div");
      card.className = "level-card";
      card.innerHTML = `
        <div class="lv-emoji">${lv.emoji}</div>
        <div class="lv-info"><h3>${lv.title}</h3><p>${lv.desc}</p></div>
        <div class="lv-stars">${stars}</div>`;
      card.addEventListener("click", () => startGame(lv));
      list.appendChild(card);
    });
  }

  function renderStreakBanner() {
    const el = document.getElementById("streak-banner");
    if (!el) return;
    const s = loadStats();
    const t = todayStr();
    const active = s.streak.last && daysBetween(s.streak.last, t) <= 1 && s.streak.count > 0;
    if (active) {
      const playedToday = s.streak.last === t;
      el.className = "streak-banner";
      el.innerHTML = `🔥 Chuỗi <b>${s.streak.count} ngày</b>` +
        (playedToday ? " — giữ phong độ nhé!" : " — chơi 1 màn hôm nay để nối chuỗi!");
    } else {
      el.className = "streak-banner";
      el.innerHTML = "🔥 Chơi mỗi ngày để xây chuỗi ôn tập. Bắt đầu hôm nay!";
    }
  }

  /* ---------- RENDER ACHIEVEMENTS ---------- */
  function renderAchievements() {
    const s = loadStats();
    const st = loadStars();
    const threeStar = LEVELS.filter(l => (st[l.id] || 0) >= 3).length;
    const body = document.getElementById("ach-body");
    const badgeCards = BADGES.map(b => {
      const on = s.badges.includes(b.id);
      return `<div class="badge ${on ? "unlocked" : ""}">
        <div class="b-emoji">${on ? b.emoji : "🔒"}</div>
        <div class="b-name">${b.name}</div>
        <div class="b-desc">${b.desc}</div>
      </div>`;
    }).join("");
    body.innerHTML = `
      <div class="ach-stats">
        <div class="ach-stat"><div class="num">${totalStars()}</div><div class="lbl">⭐ Tổng sao</div></div>
        <div class="ach-stat"><div class="num">${threeStar}/${LEVELS.length}</div><div class="lbl">🏆 Màn 3 sao</div></div>
        <div class="ach-stat"><div class="num">${s.streak.count}</div><div class="lbl">🔥 Chuỗi ngày</div></div>
      </div>
      <div class="ach-stats">
        <div class="ach-stat"><div class="num">${s.totalWins}</div><div class="lbl">💪 Lượt cứu sống</div></div>
        <div class="ach-stat"><div class="num">x${s.best.cpr || 0}</div><div class="lbl">🎯 Combo CPR tốt nhất</div></div>
        <div class="ach-stat"><div class="num">${s.badges.length}/${BADGES.length}</div><div class="lbl">🏅 Huy hiệu</div></div>
      </div>
      <div class="ach-section-title">🏅 Huy hiệu</div>
      <div class="badge-grid">${badgeCards}</div>`;
  }

  /* ============================================================
     GAME ENGINE
     ============================================================ */
  const stage = document.getElementById("game-stage");
  const instr = document.getElementById("game-instruction");
  const controls = document.getElementById("game-controls");
  let gameState = null;

  function startGame(lv) {
    if (window.Sfx) { Sfx.unlock(); Sfx.startMusic(); }
    go("screen-game");
    document.getElementById("game-title").textContent = lv.title;
    document.getElementById("game-hp").textContent = 100;
    stage.innerHTML = "";
    controls.innerHTML = "";
    instr.textContent = "";
    if (tutorialSeen(lv.type)) runGame(lv);
    else showTutorial(lv, () => runGame(lv));
  }

  function runGame(lv) {
    if (lv.type === "rhythm") initRhythm(lv);
    else if (lv.type === "thrust") initThrust(lv);
    else if (lv.type === "hose") initHose(lv);
    else if (lv.type === "press") initPress(lv);
    else if (lv.type === "quiz") initQuiz(lv);
  }

  /* ---------- TUTORIAL (hướng dẫn nhanh lần đầu) ---------- */
  const TUT_KEY = "capcuu101_tut";
  const TUTORIALS = {
    rhythm: {
      emoji: "❤️", title: "Ép tim đúng nhịp",
      text: "Chạm nút <b>ÉP TIM</b> khớp với vòng tròn vàng nảy ra (nhịp ~110/phút). Đúng nhịp sẽ cộng <b>combo</b>, sai thì mất combo. Có tiếng tách & rung dẫn nhịp cho bạn."
    },
    thrust: {
      emoji: "🤜", title: "Đẩy bụng Heimlich",
      text: "<b>Nghiêng điện thoại về trước</b> dứt khoát để đẩy bụng (máy không có cảm biến thì <b>nhấn giữ rồi thả mạnh</b>). Đẩy đủ số lần là dị vật bật ra!"
    },
    hose: {
      emoji: "🚿", title: "Xả nước chữa bỏng",
      text: "Đặt ngón tay & <b>rê vòi nước</b> đè lên nhân vật, <b>giữ yên đủ lâu</b> cho mát. Nhấc tay ra là vết bỏng <b>nóng lại</b> ngay đấy!"
    },
    press: {
      emoji: "🩹", title: "Đặt gạc & ép cầm máu",
      text: "<b>Bước 1:</b> kéo miếng gạc 🩹 vào đúng vòng tròn vết thương. <b>Bước 2:</b> nhấn giữ để ép, giữ thanh lực trong <b>vùng xanh</b> đủ lâu."
    },
    quiz: {
      emoji: "🧠", title: "Chọn đáp án đúng",
      text: "Đọc tình huống rồi <b>chọn cách xử lý đúng</b>. Trả lời sai sẽ mất nhiều HP — hết HP là nhân vật <b>đăng xuất khỏi cuộc đời</b>!"
    }
  };
  function tutorialSeen(type) {
    try { return !!(JSON.parse(localStorage.getItem(TUT_KEY)) || {})[type]; }
    catch { return false; }
  }
  function markTutorial(type) {
    let o = {};
    try { o = JSON.parse(localStorage.getItem(TUT_KEY)) || {}; } catch { o = {}; }
    o[type] = true;
    localStorage.setItem(TUT_KEY, JSON.stringify(o));
  }
  function showTutorial(lv, onStart) {
    const t = TUTORIALS[lv.type];
    if (!t) { onStart(); return; }
    const modal = document.getElementById("tutorial");
    document.getElementById("tut-emoji").textContent = t.emoji;
    document.getElementById("tut-title").textContent = t.title;
    document.getElementById("tut-text").innerHTML = t.text;
    modal.classList.remove("hidden");
    const btn = document.getElementById("tut-start");
    const handler = () => {
      btn.removeEventListener("click", handler);
      modal.classList.add("hidden");
      markTutorial(lv.type);
      if (window.Sfx) Sfx.blip();
      onStart();
    };
    btn.addEventListener("click", handler);
  }

  function stopGame() {
    if (gameState && gameState.cleanup) gameState.cleanup();
    gameState = null;
  }

  function floatText(txt, color) {
    const el = document.createElement("div");
    el.className = "float-text";
    el.textContent = txt;
    el.style.color = color;
    el.style.left = (30 + Math.random() * 40) + "%";
    el.style.top = "40%";
    stage.appendChild(el);
    setTimeout(() => el.remove(), 800);
  }

  function showResult(lv, success, stars, extra) {
    const ov = document.createElement("div");
    ov.className = "result-overlay";
    if (success) { saveStars(lv.id, stars); recordWin(lv.id); }
    if (window.Sfx) success ? Sfx.win() : Sfx.logout();
    if (window.Sfx) Sfx.vibrate(success ? [40, 60, 40] : [200]);
    const newBadges = success ? checkBadges() : [];
    const starStr = success ? "★".repeat(stars) + "☆".repeat(3 - stars) : "";
    const badgeNote = newBadges.length
      ? `<div class="lesson-box" style="border-left-color:var(--accent2)">🏅 Mở khoá huy hiệu: <b>${newBadges.join(", ")}</b></div>`
      : "";
    ov.innerHTML = `
      <div class="r-emoji">${success ? "🎉" : "💀"}</div>
      <h2>${success ? "CỨU SỐNG RỒI!" : "ĐĂNG XUẤT KHỎI CUỘC ĐỜI 😵"}</h2>
      ${success ? `<div class="result-stars">${starStr}</div>` : ""}
      <p>${extra || ""}</p>
      <div class="lesson-box">💡 <b>Đời thực:</b> ${lv.lesson}</div>
      ${badgeNote}
      <button class="btn btn-play" id="r-retry">🔁 Chơi lại</button>
      <button class="btn btn-ghost" id="r-back">← Danh sách</button>`;
    stage.appendChild(ov);
    ov.querySelector("#r-retry").addEventListener("click", () => startGame(lv));
    ov.querySelector("#r-back").addEventListener("click", () => go("screen-levels"));
  }

  /* ---------- MINI-GAME 1: CPR RHYTHM ---------- */
  function initRhythm(lv) {
    const TARGET = 20;          // số nhịp cần đạt
    const BPM = 110;            // nhịp mục tiêu
    const interval = 60000 / BPM;
    const tolerance = 230;      // ms sai số cho phép

    stage.innerHTML = `
      <div class="progress-bar"><div class="progress-fill" id="pf"></div></div>
      <div class="beat-ring go" id="ring"></div>
      <div class="combo-tag" id="combo"></div>
      <div class="character" id="char">${lv.char}</div>`;
    instr.innerHTML = "Chạm <b>TIM</b> đúng theo vòng tròn nảy ra. Đừng nhanh quá, đừng chậm quá!";
    controls.innerHTML = `<div class="tap-zone" id="tap">❤️ ÉP TIM</div>`;

    const ring = document.getElementById("ring");
    const charEl = document.getElementById("char");
    const pf = document.getElementById("pf");
    const tap = document.getElementById("tap");
    const comboEl = document.getElementById("combo");

    ring.style.animationDuration = interval + "ms";

    let last = performance.now();
    let hits = 0, good = 0, alive = true, combo = 0, bestCombo = 0;

    function tick() {
      last = performance.now();
      if (window.Sfx) { Sfx.tick(); Sfx.vibrate(35); }
      ring.classList.remove("go"); void ring.offsetWidth; ring.classList.add("go");
    }
    const beatTimer = setInterval(tick, interval);
    last = performance.now();

    function bumpCombo() {
      comboEl.classList.remove("bump"); void comboEl.offsetWidth; comboEl.classList.add("bump");
    }

    function onTap() {
      if (!alive) return;
      const now = performance.now();
      const phase = (now - last);
      const diff = Math.min(phase, interval - phase);
      hits++;
      charEl.classList.remove("pulse"); void charEl.offsetWidth; charEl.classList.add("pulse");

      if (diff <= tolerance) {
        good++; combo++;
        bestCombo = Math.max(bestCombo, combo);
        comboEl.textContent = combo >= 3 ? "x" + combo : "";
        bumpCombo();
        if (window.Sfx) Sfx.correct();
        floatText(combo >= 5 ? "PERFECT! 🔥" : "PERFECT!", "#3ddc97");
      } else {
        combo = 0; comboEl.textContent = "";
        if (window.Sfx) Sfx.blip();
        if (phase < interval / 2) floatText("Nhanh quá!", "#ffd23f");
        else floatText("Chậm quá!", "#ff5d73");
      }

      const pct = Math.min(100, (good / TARGET) * 100);
      pf.style.width = pct + "%";
      document.getElementById("game-hp").textContent = Math.min(100, 40 + good * 3);

      if (good >= TARGET) {
        alive = false;
        cleanup();
        charEl.classList.add("win");
        const acc = good / hits;
        const stars = acc > 0.9 ? 3 : acc > 0.7 ? 2 : 1;
        saveBest("cpr", bestCombo);
        setTimeout(() => showResult(lv, true, stars,
          `Độ chính xác nhịp: ${Math.round(acc * 100)}% · Combo cao nhất: x${bestCombo}`), 700);
      }
    }
    tap.addEventListener("pointerdown", onTap);

    function cleanup() { clearInterval(beatTimer); ring.classList.remove("go"); }
    gameState = { cleanup };
  }

  /* ---------- MINI-GAME 2: HEIMLICH THRUST ---------- */
  /* Dùng cảm biến nghiêng nếu có, fallback sang giữ-và-thả tap */
  function initThrust(lv) {
    const NEED = 6;
    stage.innerHTML = `
      <div class="progress-bar"><div class="progress-fill" id="pf"></div></div>
      <div class="character" id="char">${lv.char}</div>
      <div class="tilt-meter hidden" id="meter">
        <div class="tilt-zone" id="zone"></div>
        <div class="tilt-knob" id="knob"></div>
      </div>`;
    const charEl = document.getElementById("char");
    const pf = document.getElementById("pf");
    let thrusts = 0, alive = true;
    let listener = null;

    function doThrust(strong) {
      if (!alive) return;
      charEl.classList.remove("pulse"); void charEl.offsetWidth; charEl.classList.add("pulse");
      if (strong) {
        thrusts++;
        if (window.Sfx) { Sfx.correct(); Sfx.vibrate(60); }
        floatText("ĐẨY! 🟣", "#3ddc97");
        pf.style.width = (thrusts / NEED) * 100 + "%";
        document.getElementById("game-hp").textContent = Math.min(100, 50 + thrusts * 8);
        if (thrusts >= NEED) win();
      } else {
        if (window.Sfx) Sfx.blip();
        floatText("Nhẹ quá!", "#ffd23f");
      }
    }
    function win() {
      alive = false; cleanup();
      charEl.textContent = "🧋"; floatText("BẬT RA RỒI!", "#3ddc97");
      setTimeout(() => { charEl.textContent = lv.char; charEl.classList.add("win"); }, 400);
      setTimeout(() => showResult(lv, true, 3, "Trân châu bay ra ngoài quỹ đạo 🚀"), 900);
    }

    function useTiltMode() {
      document.getElementById("meter").classList.remove("hidden");
      const zone = document.getElementById("zone");
      const knob = document.getElementById("knob");
      zone.style.left = "65%"; zone.style.right = "0";
      instr.innerHTML = "<b>Nghiêng điện thoại về phía trước</b> để đẩy bụng. Đưa chấm vàng vào vùng xanh!";
      let armed = true;
      listener = (e) => {
        const beta = e.beta || 0;            // -180..180, ngửa/cúi
        const norm = Math.max(0, Math.min(100, (beta + 30) / 90 * 100));
        knob.style.left = norm + "%";
        if (norm > 65 && armed) { armed = false; doThrust(true); }
        if (norm < 40) armed = true;
      };
      window.addEventListener("deviceorientation", listener);
    }

    function useTapMode() {
      instr.innerHTML = "Thiết bị không có cảm biến nghiêng — <b>nhấn giữ rồi thả mạnh</b> để đẩy bụng!";
      const btn = document.createElement("div");
      btn.className = "tap-zone";
      btn.id = "tap";
      btn.textContent = "🤜 NHẤN GIỮ → THẢ";
      controls.appendChild(btn);
      let downAt = 0;
      btn.addEventListener("pointerdown", () => { downAt = performance.now(); btn.textContent = "💪 ...GIỮ..."; });
      const up = () => {
        if (!downAt) return;
        const held = performance.now() - downAt;
        downAt = 0; btn.textContent = "🤜 NHẤN GIỮ → THẢ";
        doThrust(held > 250);
      };
      btn.addEventListener("pointerup", up);
      btn.addEventListener("pointerleave", up);
    }

    // iOS 13+ cần xin quyền; nếu không có API thì dùng tap
    const DOE = window.DeviceOrientationEvent;
    if (DOE && typeof DOE.requestPermission === "function") {
      instr.innerHTML = "";
      const ask = document.createElement("button");
      ask.className = "btn btn-play";
      ask.textContent = "📱 Bật cảm biến nghiêng";
      controls.appendChild(ask);
      ask.addEventListener("click", async () => {
        try {
          const res = await DOE.requestPermission();
          controls.innerHTML = "";
          if (res === "granted") useTiltMode(); else useTapMode();
        } catch { controls.innerHTML = ""; useTapMode(); }
      });
      const skip = document.createElement("button");
      skip.className = "btn btn-ghost";
      skip.textContent = "Không có cảm biến? Chơi kiểu chạm";
      controls.appendChild(skip);
      skip.addEventListener("click", () => { controls.innerHTML = ""; useTapMode(); });
    } else if (DOE) {
      useTiltMode();
      // Nếu sau 2.5s không có dữ liệu cảm biến → fallback tap
      let received = false;
      const probe = (e) => { if (e.beta != null) received = true; };
      window.addEventListener("deviceorientation", probe, { once: false });
      setTimeout(() => {
        window.removeEventListener("deviceorientation", probe);
        if (!received && alive && thrusts === 0) {
          if (listener) window.removeEventListener("deviceorientation", listener);
          document.getElementById("meter").classList.add("hidden");
          useTapMode();
        }
      }, 2500);
    } else {
      useTapMode();
    }

    function cleanup() { if (listener) window.removeEventListener("deviceorientation", listener); }
    gameState = { cleanup };
  }

  /* ---------- MINI-GAME 3: HOSE (xả nước chữa bỏng) ---------- */
  function initHose(lv) {
    const NEED = 6000;          // ms "nước mát" cần tích đủ
    stage.innerHTML = `
      <div class="progress-bar"><div class="progress-fill" id="pf"></div></div>
      <div class="wound" id="wound">${lv.char}</div>
      <div class="water-stream" id="stream">🚿</div>
      <div class="cool-label" id="cool">Kéo vòi nước lên vết bỏng</div>`;
    instr.innerHTML = "<b>Đặt ngón tay & rê vòi nước</b> đè lên nhân vật, giữ cho mát đủ lâu. Nhấc tay ra là nóng lại!";

    const wound = document.getElementById("wound");
    const stream = document.getElementById("stream");
    const pf = document.getElementById("pf");
    const cool = document.getElementById("cool");

    // đặt vết thương ở vị trí ngẫu nhiên trong stage
    function place() {
      const r = stage.getBoundingClientRect();
      const x = 0.3 + Math.random() * 0.4, y = 0.35 + Math.random() * 0.3;
      wound.style.left = x * r.width - 45 + "px";
      wound.style.top = y * r.height - 45 + "px";
    }
    place();

    let cooled = 0, alive = true, onWound = false, lastT = 0;
    let pointerInside = false;

    function woundRect() { return wound.getBoundingClientRect(); }

    function moveStream(clientX, clientY) {
      const r = stage.getBoundingClientRect();
      stream.style.left = (clientX - r.left) + "px";
      stream.style.top = (clientY - r.top) + "px";
      const wr = woundRect();
      pointerInside =
        clientX > wr.left - 20 && clientX < wr.right + 20 &&
        clientY > wr.top - 20 && clientY < wr.bottom + 20;
    }

    function onDown(e) {
      if (!alive) return;
      stream.classList.add("on");
      if (window.Sfx) { Sfx.unlock(); }
      lastT = performance.now();
      moveStream(e.clientX, e.clientY);
    }
    function onMove(e) {
      if (!alive || !stream.classList.contains("on")) return;
      moveStream(e.clientX, e.clientY);
    }
    function onUp() { stream.classList.remove("on"); pointerInside = false; }

    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerup", onUp);
    stage.addEventListener("pointerleave", onUp);

    let hotPlays = 0;
    const loop = setInterval(() => {
      if (!alive) return;
      const now = performance.now();
      const dt = now - lastT; lastT = now;
      if (stream.classList.contains("on") && pointerInside) {
        cooled += dt;
        wound.style.filter = "saturate(.6) brightness(1)";
        cool.textContent = `Đang làm mát… ${Math.round(cooled / NEED * 100)}%`;
        cool.style.color = "#3ddc97";
        if (Math.random() < 0.04 && window.Sfx) Sfx.blip();
      } else {
        cooled = Math.max(0, cooled - dt * 0.5);  // nóng lại nếu rời vòi
        wound.style.filter = "saturate(1.6) brightness(1.2)";
        cool.textContent = "🔥 Đang nóng lại! Đưa vòi nước về!";
        cool.style.color = "#ff5d73";
      }
      pf.style.width = Math.min(100, cooled / NEED * 100) + "%";
      document.getElementById("game-hp").textContent =
        Math.min(100, 40 + Math.round(cooled / NEED * 60));

      if (cooled >= NEED) {
        alive = false; clearInterval(loop); onUp();
        wound.style.filter = "none";
        wound.classList.add("character", "win");
        floatText("MÁT RỒI! 💧", "#3ddc97");
        setTimeout(() => showResult(lv, true, 3, "Hạ nhiệt vết bỏng đúng cách 👏"), 700);
      }
    }, 60);

    gameState = {
      cleanup() {
        clearInterval(loop);
        stage.removeEventListener("pointerdown", onDown);
        stage.removeEventListener("pointermove", onMove);
        stage.removeEventListener("pointerup", onUp);
        stage.removeEventListener("pointerleave", onUp);
      }
    };
  }

  /* ---------- MINI-GAME 4: PRESS (đặt gạc & giữ ép cầm máu) ---------- */
  function initPress(lv) {
    stage.innerHTML = `
      <div class="character" id="char">${lv.char}</div>
      <div class="drop-target" id="target"></div>
      <div class="gauze" id="gauze">🩹</div>`;
    instr.innerHTML = "<b>Bước 1:</b> Kéo miếng gạc 🩹 vào vòng tròn vết thương.";

    const charEl = document.getElementById("char");
    const target = document.getElementById("target");
    const gauze = document.getElementById("gauze");
    let alive = true, placed = false;

    const r = stage.getBoundingClientRect();
    // vị trí vết thương
    const tx = 0.5, ty = 0.4;
    target.style.left = tx * r.width + "px";
    target.style.top = ty * r.height + "px";
    // vị trí gạc ban đầu (góc dưới)
    gauze.style.left = 0.2 * r.width - 28 + "px";
    gauze.style.top = 0.75 * r.height - 28 + "px";

    let dragging = false;
    function gz(e) {
      if (placed) return;
      dragging = true;
      if (window.Sfx) Sfx.unlock();
    }
    function gmove(e) {
      if (!dragging || placed) return;
      const rr = stage.getBoundingClientRect();
      gauze.style.left = (e.clientX - rr.left - 28) + "px";
      gauze.style.top = (e.clientY - rr.top - 28) + "px";
    }
    function gup() {
      if (!dragging || placed) return;
      dragging = false;
      const gr = gauze.getBoundingClientRect();
      const tr = target.getBoundingClientRect();
      const gcx = gr.left + gr.width / 2, gcy = gr.top + gr.height / 2;
      const tcx = tr.left + tr.width / 2, tcy = tr.top + tr.height / 2;
      const dist = Math.hypot(gcx - tcx, gcy - tcy);
      if (dist < 55) {
        placed = true;
        const rr = stage.getBoundingClientRect();
        gauze.style.left = tcx - rr.left - 28 + "px";
        gauze.style.top = tcy - rr.top - 28 + "px";
        target.style.opacity = "0";
        if (window.Sfx) Sfx.correct();
        floatText("ĐẶT CHUẨN!", "#3ddc97");
        startHold();
      } else {
        if (window.Sfx) Sfx.blip();
        floatText("Trượt rồi!", "#ffd23f");
      }
    }
    gauze.addEventListener("pointerdown", gz);
    stage.addEventListener("pointermove", gmove);
    stage.addEventListener("pointerup", gup);

    let holdLoop = null;
    function startHold() {
      instr.innerHTML = "<b>Bước 2:</b> Nhấn giữ nút bên dưới để <b>ép cầm máu</b>. Giữ thanh lực trong vùng xanh đủ lâu!";
      controls.innerHTML = `
        <div class="force-wrap">
          <div class="force-track">
            <div class="force-good-zone"></div>
            <div class="force-fill" id="ffill"></div>
          </div>
          <div class="force-hint" id="fhint">Nhấn & GIỮ để tăng lực ép</div>
        </div>
        <div class="tap-zone" id="presszone">✋ NHẤN GIỮ ÉP</div>`;
      const fill = document.getElementById("ffill");
      const hint = document.getElementById("fhint");
      const zone = document.getElementById("presszone");

      let force = 0, holding = false, inZone = 0;
      const NEED_ZONE = 3000;     // ms phải giữ trong vùng xanh
      zone.addEventListener("pointerdown", () => { holding = true; if (window.Sfx) Sfx.unlock(); });
      zone.addEventListener("pointerup", () => holding = false);
      zone.addEventListener("pointerleave", () => holding = false);

      let last = performance.now();
      holdLoop = setInterval(() => {
        if (!alive) return;
        const now = performance.now(); const dt = now - last; last = now;
        force += (holding ? 0.18 : -0.22) * (dt / 16);
        force = Math.max(0, Math.min(100, force));
        fill.style.width = force + "%";
        charEl.classList.toggle("pulse", holding);
        // vùng xanh ~ 55%..92%
        if (force >= 55 && force <= 92) {
          inZone += dt;
          hint.textContent = `Giữ ổn định… ${Math.round(inZone / NEED_ZONE * 100)}%`;
          hint.style.color = "#3ddc97";
        } else {
          hint.textContent = force > 92 ? "Mạnh quá, nới một chút!" : "Ép mạnh hơn!";
          hint.style.color = "#ffd23f";
        }
        document.getElementById("game-hp").textContent =
          Math.min(100, 40 + Math.round(inZone / NEED_ZONE * 60));

        if (inZone >= NEED_ZONE) {
          alive = false; clearInterval(holdLoop);
          charEl.classList.add("win");
          if (window.Sfx) Sfx.win();
          floatText("CẦM MÁU OK! 🩸✋", "#3ddc97");
          setTimeout(() => showResult(lv, true, 3, "Ép đúng lực, đúng chỗ. Giỏi!"), 700);
        }
      }, 60);
    }

    gameState = {
      cleanup() {
        if (holdLoop) clearInterval(holdLoop);
        stage.removeEventListener("pointermove", gmove);
        stage.removeEventListener("pointerup", gup);
      }
    };
  }

  /* ---------- MINI-GAME 5+: QUIZ ---------- */
  const QUIZZES = {
    drown: [
      {
        q: "🌊 Thấy người đang chới với dưới nước. Việc ĐẦU TIÊN?",
        options: [
          { t: "Hô hoán, ném phao/dây cho họ bám", ok: true },
          { t: "Nhảy ùm xuống cứu ngay", ok: false },
          { t: "Quay video báo người thân", ok: false },
          { t: "Đứng nhìn xem họ tự bơi được không", ok: false }
        ],
        wrongMsg: "Lao xuống khi không có kỹ năng = thêm một nạn nhân. Ưu tiên cứu gián tiếp & gọi cứu hộ."
      },
      {
        q: "Đưa được nạn nhân lên bờ, họ bất tỉnh không thở. Làm gì?",
        options: [
          { t: "Gọi 115 & bắt đầu CPR", ok: true },
          { t: "Dốc ngược cho ra nước", ok: false },
          { t: "Lăn qua lăn lại cho tỉnh", ok: false },
          { t: "Cho uống nước gừng", ok: false }
        ],
        wrongMsg: "Dốc nước là quan niệm sai & làm chậm cấp cứu. Không thở thì CPR ngay + gọi 115."
      },
      {
        q: "Nạn nhân còn thở nhưng lơ mơ. Tư thế nào tốt?",
        options: [
          { t: "Nằm nghiêng an toàn, giữ ấm", ok: true },
          { t: "Ngồi dậy cho ăn uống", ok: false },
          { t: "Nằm sấp úp mặt", ok: false },
          { t: "Để mặc cho ngủ", ok: false }
        ],
        wrongMsg: "Tư thế nằm nghiêng an toàn giúp tránh sặc nếu nôn. Luôn theo dõi & giữ ấm."
      }
    ],
    electric: [
      {
        q: "⚡ Ai đó bị điện giật còn dính vào dây điện. Làm gì TRƯỚC?",
        options: [
          { t: "Ngắt cầu dao / nguồn điện", ok: true },
          { t: "Kéo tay họ ra ngay", ok: false },
          { t: "Tạt nước cho rời ra", ok: false },
          { t: "Hét lên gọi tên họ", ok: false }
        ],
        wrongMsg: "Chạm/tạt nước khi còn điện = bạn bị giật theo. NGẮT NGUỒN trước tiên!"
      },
      {
        q: "Không tắt được nguồn ngay. Tách nạn nhân thế nào?",
        options: [
          { t: "Dùng vật khô cách điện (gậy gỗ, nhựa) gạt dây ra", ok: true },
          { t: "Dùng tay không kéo", ok: false },
          { t: "Dùng thanh kim loại gạt", ok: false },
          { t: "Đứng trên vũng nước kéo", ok: false }
        ],
        wrongMsg: "Chỉ dùng vật KHÔ, cách điện. Kim loại/nước đều dẫn điện rất nguy hiểm."
      },
      {
        q: "Đã an toàn, nạn nhân bất tỉnh ngừng thở. Làm gì?",
        options: [
          { t: "Gọi 115 & CPR ngay", ok: true },
          { t: "Bôi dầu vào vết bỏng điện", ok: false },
          { t: "Cho uống nước", ok: false },
          { t: "Chờ họ tự tỉnh", ok: false }
        ],
        wrongMsg: "Điện giật có thể gây ngừng tim. Ngừng thở thì CPR ngay + gọi 115."
      }
    ],
    seizure: [
      {
        q: "🌀 Người bên cạnh đột ngột co giật, ngã xuống. Làm gì?",
        options: [
          { t: "Dọn vật cứng/nguy hiểm quanh họ", ok: true },
          { t: "Giữ chặt tay chân cho hết giật", ok: false },
          { t: "Nhét khăn/muỗng vào miệng", ok: false },
          { t: "Tát cho tỉnh", ok: false }
        ],
        wrongMsg: "KHÔNG giữ chặt, KHÔNG nhét gì vào miệng (gãy răng, ngạt). Chỉ bảo vệ khỏi va đập."
      },
      {
        q: "Trong lúc co giật, nên làm gì với đầu họ?",
        options: [
          { t: "Lót vật mềm dưới đầu", ok: true },
          { t: "Nâng đầu thật cao", ok: false },
          { t: "Đè đầu xuống đất", ok: false },
          { t: "Lắc đầu cho tỉnh", ok: false }
        ],
        wrongMsg: "Lót mềm dưới đầu để tránh chấn thương. Không đè, không lắc."
      },
      {
        q: "Khi nào CẦN gọi 115 cho cơn co giật?",
        options: [
          { t: "Giật quá 5 phút hoặc giật liên tiếp", ok: true },
          { t: "Chỉ khi họ yêu cầu", ok: false },
          { t: "Không bao giờ cần", ok: false },
          { t: "Sau khi quay đủ clip", ok: false }
        ],
        wrongMsg: "Cơn kéo dài >5 phút, lặp lại, hoặc lần đầu/chấn thương -> gọi 115. Canh giờ cơn giật!"
      }
    ],
    anaphylaxis: [
      {
        q: "🐝 Bị ong đốt, mặt sưng to, khó thở nhanh chóng. Đây là?",
        options: [
          { t: "Sốc phản vệ — cấp cứu khẩn", ok: true },
          { t: "Cảm cúm thường", ok: false },
          { t: "Chỉ là ngứa, bôi dầu là xong", ok: false },
          { t: "Đói bụng", ok: false }
        ],
        wrongMsg: "Sưng mặt + khó thở sau dị nguyên = sốc phản vệ, có thể tử vong nhanh."
      },
      {
        q: "Có sẵn bút tiêm adrenaline (EpiPen). Làm gì?",
        options: [
          { t: "Tiêm vào mặt ngoài đùi & gọi 115", ok: true },
          { t: "Chờ xem có đỡ không", ok: false },
          { t: "Cho uống nước đường", ok: false },
          { t: "Tiêm vào mông", ok: false }
        ],
        wrongMsg: "Adrenaline tiêm bắp mặt ngoài đùi là cứu cánh. Tiêm ngay rồi gọi 115."
      },
      {
        q: "Trong khi chờ xe cấp cứu, cho nạn nhân nằm thế nào?",
        options: [
          { t: "Nằm ngửa, kê chân cao (nếu khó thở thì cho ngồi)", ok: true },
          { t: "Đứng dậy đi lại cho khỏe", ok: false },
          { t: "Nằm sấp", ok: false },
          { t: "Ngồi xổm", ok: false }
        ],
        wrongMsg: "Nằm kê chân cao hỗ trợ tuần hoàn; khó thở thì cho ngồi. Không để đứng/đi lại đột ngột."
      }
    ],
    fracture: [
      {
        q: "🦴 Bạn ngã, cẳng chân biến dạng, đau dữ dội. Nên?",
        options: [
          { t: "Cố định nguyên tư thế, không di chuyển thừa", ok: true },
          { t: "Nắn cho thẳng lại", ok: false },
          { t: "Đứng dậy đi thử", ok: false },
          { t: "Xoa bóp cho đỡ đau", ok: false }
        ],
        wrongMsg: "Tuyệt đối KHÔNG nắn xương — dễ tổn thương mạch máu, thần kinh. Cố định nguyên trạng."
      },
      {
        q: "Cố định xương gãy bằng nẹp thì nẹp tới đâu?",
        options: [
          { t: "Qua khớp trên & dưới chỗ gãy", ok: true },
          { t: "Chỉ ngay tại điểm gãy", ok: false },
          { t: "Buộc thật chặt cho cứng", ok: false },
          { t: "Không cần cố định", ok: false }
        ],
        wrongMsg: "Nẹp phải bất động được khớp trên và dưới ổ gãy, buộc vừa đủ (không quá chặt)."
      },
      {
        q: "Có vết thương hở lòi xương ra. Làm gì?",
        options: [
          { t: "Che bằng gạc sạch, không ấn xương vào", ok: true },
          { t: "Nhét xương trở lại", ok: false },
          { t: "Rửa bằng cồn xát mạnh", ok: false },
          { t: "Để hở cho thoáng", ok: false }
        ],
        wrongMsg: "Không nhét xương vào trong. Che gạc sạch, cầm máu nhẹ, đến viện gấp."
      }
    ],
    snakebite: [
      {
        q: "🐍 Bị rắn cắn ở chân. Việc nên làm là?",
        options: [
          { t: "Giữ bất động, để chân thấp hơn tim, đi viện", ok: true },
          { t: "Rạch vết cắn nặn nọc ra", ok: false },
          { t: "Hút nọc bằng miệng", ok: false },
          { t: "Garô thật chặt phía trên", ok: false }
        ],
        wrongMsg: "Rạch/hút/garô chặt đều gây hại. Giữ yên, hạn chế cử động để nọc lan chậm, tới viện ngay."
      },
      {
        q: "Vì sao phải giữ nạn nhân BẤT ĐỘNG?",
        options: [
          { t: "Cử động làm nọc lan nhanh hơn", ok: true },
          { t: "Để tiết kiệm sức", ok: false },
          { t: "Cho đỡ buồn chân", ok: false },
          { t: "Không có lý do", ok: false }
        ],
        wrongMsg: "Vận động bơm nọc lan theo mạch bạch huyết/máu nhanh hơn. Giữ yên & cố định chi."
      },
      {
        q: "Thông tin nào HỮU ÍCH cho bác sĩ?",
        options: [
          { t: "Đặc điểm/màu con rắn (nếu thấy an toàn)", ok: true },
          { t: "Bắt con rắn mang theo bằng tay", ok: false },
          { t: "Đuổi theo trả thù con rắn", ok: false },
          { t: "Không cần gì cả", ok: false }
        ],
        wrongMsg: "Nhớ đặc điểm con rắn giúp chọn huyết thanh, nhưng ĐỪNG mạo hiểm bắt nó."
      }
    ]
  };

  function initQuiz(lv) {
    const qs = QUIZZES[lv.id];
    let idx = 0, hp = 100, alive = true;
    stage.innerHTML = `<div class="character" id="char">${lv.char}</div>`;
    const charEl = document.getElementById("char");

    function render() {
      if (idx >= qs.length) {
        alive = false;
        charEl.classList.add("win");
        const stars = hp >= 100 ? 3 : hp >= 60 ? 2 : 1;
        setTimeout(() => showResult(lv, true, stars, `Còn ${hp} HP. Xử lý chuẩn bài!`), 500);
        return;
      }
      const item = qs[idx];
      instr.textContent = `Câu ${idx + 1}/${qs.length}`;
      controls.innerHTML = `<div style="text-align:center;font-weight:700;font-size:16px;margin-bottom:6px">${item.q}</div>`;
      const grid = document.createElement("div");
      grid.className = "choice-grid";
      // xáo trộn đáp án
      const opts = item.options.map((o, i) => ({ ...o, i })).sort(() => Math.random() - 0.5);
      opts.forEach(o => {
        const b = document.createElement("button");
        b.className = "choice";
        b.textContent = o.t;
        b.addEventListener("click", () => pick(b, o, item), { once: true });
        grid.appendChild(b);
      });
      controls.appendChild(grid);
    }

    function pick(btn, opt, item) {
      if (!alive) return;
      const all = controls.querySelectorAll(".choice");
      all.forEach(b => (b.style.pointerEvents = "none"));
      if (opt.ok) {
        btn.classList.add("correct");
        if (window.Sfx) { Sfx.correct(); Sfx.vibrate(40); }
        floatText("ĐÚNG! ✅", "#3ddc97");
        charEl.classList.remove("pulse"); void charEl.offsetWidth; charEl.classList.add("pulse");
        idx++;
        setTimeout(render, 750);
      } else {
        btn.classList.add("wrong");
        if (window.Sfx) { Sfx.wrong(); Sfx.vibrate(120); }
        all.forEach(b => { if (b.textContent === item.options.find(o => o.ok).t) b.classList.add("correct"); });
        hp -= 40;
        document.getElementById("game-hp").textContent = Math.max(0, hp);
        floatText("-40 ❤️", "#ff5d73");
        if (hp <= 0) {
          alive = false;
          charEl.classList.add("dead");
          setTimeout(() => showResult(lv, false, 0, item.wrongMsg), 1100);
        } else {
          idx++;
          setTimeout(render, 1400);
        }
      }
    }

    render();
    gameState = { cleanup() {} };
  }

  /* ============================================================
     PANIC MODE — đọc to từng bước
     ============================================================ */
  const PANIC = {
    cpr: {
      title: "💔 Ngừng tim / Bất tỉnh",
      metronome: true,
      steps: [
        "Kiểm tra an toàn. Gọi to: bạn có nghe tôi không?",
        "Không phản ứng. Hãy nhờ người gọi một một năm ngay.",
        "Đặt nạn nhân nằm ngửa trên mặt phẳng cứng.",
        "Đặt gót bàn tay vào giữa ngực, tay kia chồng lên trên.",
        "Ép thẳng tay, sâu năm centimet, theo nhịp đang đếm.",
        "Ép liên tục ba mươi cái. Đừng dừng lại.",
        "Nếu biết, thổi ngạt hai hơi. Không biết thì ép tim liên tục.",
        "Tiếp tục cho đến khi xe cấp cứu tới hoặc nạn nhân thở lại."
      ]
    },
    choke: {
      title: "🫁 Hóc nghẹn dị vật",
      steps: [
        "Hỏi: bạn có nghẹn không? Nếu họ ho được, khuyến khích ho mạnh.",
        "Nếu không ho, không nói được: đứng phía sau họ.",
        "Vòng hai tay ôm quanh bụng, trên rốn.",
        "Một tay nắm đấm, tay kia nắm lấy, đẩy mạnh vào trong và lên trên.",
        "Lặp lại động tác đẩy bụng dứt khoát.",
        "Làm đến khi dị vật bật ra hoặc họ ho được.",
        "Nếu họ bất tỉnh, đặt nằm xuống và bắt đầu ép tim. Gọi một một năm."
      ]
    },
    burn: {
      title: "🔥 Bỏng",
      steps: [
        "Đưa nạn nhân tránh xa nguồn gây bỏng.",
        "Xả vết bỏng dưới nước mát trong ít nhất hai mươi phút.",
        "Không dùng đá, kem đánh quận răng, bơ hay nước mắm.",
        "Tháo nhẫn, đồng hồ, quần áo quanh vùng bỏng trước khi sưng.",
        "Không chọc vỡ bọng nước.",
        "Che vết bỏng bằng gạc sạch, không dính.",
        "Bỏng nặng, rộng, hoặc ở mặt: gọi một một năm ngay."
      ]
    },
    bleed: {
      title: "🩸 Chảy máu nhiều",
      steps: [
        "Đeo găng nếu có. Cho nạn nhân ngồi hoặc nằm.",
        "Dùng gạc hoặc vải sạch ép thẳng lên vết thương.",
        "Ép mạnh và liên tục, đừng nhấc ra xem.",
        "Nâng vùng bị thương cao hơn tim nếu được.",
        "Máu thấm qua thì đắp thêm gạc, đừng gỡ lớp cũ.",
        "Giữ ấm cho nạn nhân, trấn an họ.",
        "Chảy máu không cầm được: gọi một một năm ngay."
      ]
    },
    drown: {
      title: "🌊 Đuối nước",
      steps: [
        "Đảm bảo an toàn cho chính bạn trước.",
        "Đưa phao, dây, sào cho nạn nhân bám. Đừng liều nhảy xuống nếu không biết bơi cứu hộ.",
        "Đưa được lên cạn thì gọi một một năm ngay.",
        "Kiểm tra nạn nhân có thở không.",
        "Không thở: bắt đầu ép tim, thổi ngạt nếu biết.",
        "Đừng dốc ngược tìm nước trong bụng.",
        "Còn thở nhưng lơ mơ: đặt nằm nghiêng an toàn, giữ ấm."
      ]
    },
    electric: {
      title: "⚡ Điện giật",
      steps: [
        "Không chạm vào nạn nhân khi còn dòng điện.",
        "Ngắt cầu dao hoặc rút nguồn điện ngay.",
        "Không tắt được thì dùng vật khô cách điện gạt dây ra.",
        "An toàn rồi mới lại gần. Gọi một một năm.",
        "Kiểm tra thở. Ngừng thở thì ép tim ngay.",
        "Để ý cả vết bỏng ở chỗ điện vào và ra.",
        "Theo dõi liên tục đến khi cấp cứu tới."
      ]
    },
    seizure: {
      title: "🌀 Co giật / động kinh",
      steps: [
        "Giữ bình tĩnh. Canh đồng hồ thời gian cơn giật.",
        "Dọn vật cứng, sắc nhọn quanh nạn nhân.",
        "Lót vật mềm dưới đầu họ.",
        "Không giữ chặt tay chân.",
        "Không nhét bất cứ thứ gì vào miệng.",
        "Hết giật thì đặt nằm nghiêng an toàn.",
        "Cơn quá năm phút hoặc giật lặp lại: gọi một một năm."
      ]
    },
    anaphylaxis: {
      title: "🐝 Sốc phản vệ",
      steps: [
        "Nghi sốc phản vệ: sưng mặt môi, khó thở, nổi mề đay sau khi tiếp xúc dị nguyên.",
        "Có bút adrenaline thì tiêm ngay vào mặt ngoài đùi.",
        "Gọi một một năm ngay lập tức.",
        "Cho nằm ngửa, kê chân cao. Khó thở thì cho ngồi.",
        "Nôn thì cho nằm nghiêng.",
        "Sau năm tới mười phút còn nặng, có thể tiêm mũi thứ hai.",
        "Theo dõi sát đến khi cấp cứu tới."
      ]
    },
    fracture: {
      title: "🦴 Gãy xương",
      steps: [
        "Giữ nạn nhân yên, trấn an họ.",
        "Không cố nắn xương về vị trí cũ.",
        "Cố định bằng nẹp, bất động khớp trên và dưới chỗ gãy.",
        "Có vết thương hở: che bằng gạc sạch, đừng ấn xương vào.",
        "Chườm lạnh quanh chỗ sưng để giảm đau.",
        "Không cho ăn uống phòng khi cần mổ.",
        "Đưa đến cơ sở y tế. Gãy lớn hoặc nghi cột sống thì gọi một một năm."
      ]
    },
    snakebite: {
      title: "🐍 Rắn cắn",
      steps: [
        "Đưa nạn nhân tránh xa con rắn, giữ bình tĩnh.",
        "Cho nằm yên, hạn chế cử động vùng bị cắn.",
        "Để vết cắn thấp hơn tim.",
        "Tháo nhẫn, vòng, đồ chật quanh chỗ cắn trước khi sưng.",
        "Không rạch, không hút nọc, không garô chặt, không chườm đá.",
        "Nhớ đặc điểm con rắn nếu an toàn, nhưng đừng bắt nó.",
        "Đưa đến viện càng nhanh càng tốt. Gọi một một năm."
      ]
    }
  };

  let panicCtx = null;

  document.querySelectorAll(".panic-card").forEach(c =>
    c.addEventListener("click", () => openPanic(c.dataset.emergency))
  );
  document.getElementById("panic-next").addEventListener("click", () => panicStep(1));
  document.getElementById("panic-prev").addEventListener("click", () => panicStep(-1));
  document.getElementById("panic-replay").addEventListener("click", () => speakStep());
  document.getElementById("stop-voice").addEventListener("click", () => speechSynthesis.cancel());
  document.getElementById("panic-back-pick").addEventListener("click", () => {
    stopPanic();
    document.getElementById("panic-steps").classList.add("hidden");
    document.getElementById("panic-pick").classList.remove("hidden");
  });

  function openPanic(key) {
    const data = PANIC[key];
    if (!data) return;
    panicCtx = { data, step: 0 };
    document.getElementById("panic-pick").classList.add("hidden");
    document.getElementById("panic-steps").classList.remove("hidden");
    const ring = document.getElementById("metronome-ring");
    if (data.metronome) { ring.classList.remove("hidden"); startMetronome(); }
    else { ring.classList.add("hidden"); }
    renderPanicStep();
  }

  function renderPanicStep() {
    if (!panicCtx) return;
    const { data, step } = panicCtx;
    document.getElementById("panic-step-text").textContent =
      `${step + 1}. ` + data.steps[step].replace("một một năm", "115")
                                          .replace("năm centimet", "5cm")
                                          .replace("đánh quận răng", "đánh răng");
    document.getElementById("panic-prev").disabled = step === 0;
    const next = document.getElementById("panic-next");
    next.textContent = step === data.steps.length - 1 ? "✓ Xong" : "Bước tiếp ▶";
    speakStep();
  }

  function panicStep(dir) {
    if (!panicCtx) return;
    const n = panicCtx.step + dir;
    if (n < 0) return;
    if (n >= panicCtx.data.steps.length) {
      go("screen-home");
      return;
    }
    panicCtx.step = n;
    renderPanicStep();
  }

  /* ---- Text-to-speech (đọc tiếng Việt) ---- */
  let viVoice = null;
  function pickVoice() {
    const voices = speechSynthesis.getVoices();
    viVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith("vi")) || null;
  }
  if ("speechSynthesis" in window) {
    pickVoice();
    speechSynthesis.onvoiceschanged = pickVoice;
  }
  function speakStep() {
    if (!panicCtx || !("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const raw = panicCtx.data.steps[panicCtx.step];
    const u = new SpeechSynthesisUtterance(raw);
    u.lang = "vi-VN";
    if (viVoice) u.voice = viVoice;
    u.rate = 0.95;
    u.pitch = 1;
    speechSynthesis.speak(u);
  }

  /* ---- Metronome cho CPR (100 BPM) + rung ---- */
  let metroTimer = null;
  function startMetronome() {
    stopMetronome();
    const ring = document.getElementById("metronome-ring");
    const cnt = document.getElementById("metronome-count");
    let beat = 0;
    metroTimer = setInterval(() => {
      beat = (beat % 30) + 1;
      cnt.textContent = beat;
      ring.classList.add("beat");
      if (navigator.vibrate) navigator.vibrate(40);
      setTimeout(() => ring.classList.remove("beat"), 120);
    }, 600); // 100 nhịp/phút
  }
  function stopMetronome() { if (metroTimer) clearInterval(metroTimer); metroTimer = null; }

  function stopPanic() {
    stopMetronome();
    if ("speechSynthesis" in window) speechSynthesis.cancel();
  }

  /* ---------- SETTINGS MODAL ---------- */
  (function initSettings() {
    if (!window.Sfx) return;
    const modal = document.getElementById("settings-modal");
    const open = document.getElementById("open-settings");
    const close = document.getElementById("close-settings");
    const cbSound = document.getElementById("set-sound");
    const cbMusic = document.getElementById("set-music");
    const cbVibe = document.getElementById("set-vibrate");

    function sync() {
      cbSound.checked = Sfx.settings.sound;
      cbMusic.checked = Sfx.settings.music;
      cbVibe.checked = Sfx.settings.vibrate;
    }
    open.addEventListener("click", () => { Sfx.unlock(); sync(); modal.classList.remove("hidden"); });
    close.addEventListener("click", () => modal.classList.add("hidden"));
    modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.add("hidden"); });
    cbSound.addEventListener("change", () => { Sfx.setSound(cbSound.checked); if (cbSound.checked) Sfx.correct(); });
    cbMusic.addEventListener("change", () => Sfx.setMusic(cbMusic.checked));
    cbVibe.addEventListener("change", () => { Sfx.setVibrate(cbVibe.checked); if (cbVibe.checked) Sfx.vibrate(60); });
    sync();
  })();

  /* ---------- INIT ---------- */
  // Ẩn splash sau khi tải xong (tối thiểu ~1.4s cho đẹp)
  (function hideSplash() {
    const splash = document.getElementById("splash");
    if (!splash) return;
    const start = performance.now();
    const finish = () => {
      const wait = Math.max(0, 1400 - (performance.now() - start));
      setTimeout(() => {
        splash.classList.add("gone");
        setTimeout(() => splash.remove(), 600);
      }, wait);
    };
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish);
  })();
  // Mở thẳng Chế độ Hoảng loạn khi vào từ shortcut ?panic=1
  const params = new URLSearchParams(location.search);
  if (params.get("panic") === "1") {
    go("screen-panic");
  } else {
    go("screen-home");
  }

  /* ---------- SERVICE WORKER (offline) ---------- */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch((err) =>
        console.warn("SW chưa đăng ký được:", err)
      );
    });
  }
})();
