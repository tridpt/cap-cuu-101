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
    screens[current].classList.remove("active");
    screens[id].classList.add("active");
    current = id;
    if (id === "screen-levels") renderLevels();
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
      desc: "Xử lý bỏng đúng cách (chọn nhanh!)",
      type: "quiz",
      char: "🧑‍🍳",
      lesson: "Bỏng: xả nước mát (KHÔNG dùng đá) 20 phút. Không bôi kem đánh răng, bơ, nước mắm gì cả!"
    },
    {
      id: "bleed",
      emoji: "🩸",
      title: "Cầm máu cho Zombie hậu đậu",
      desc: "Băng bó & ép cầm máu",
      type: "quiz",
      char: "🧟",
      lesson: "Chảy máu: ép trực tiếp lên vết thương bằng gạc sạch, nâng cao chi, giữ ép liên tục."
    }
  ];

  /* ---------- RENDER LEVELS ---------- */
  function renderLevels() {
    document.getElementById("total-stars").textContent = totalStars();
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

  /* ============================================================
     GAME ENGINE
     ============================================================ */
  const stage = document.getElementById("game-stage");
  const instr = document.getElementById("game-instruction");
  const controls = document.getElementById("game-controls");
  let gameState = null;

  function startGame(lv) {
    go("screen-game");
    document.getElementById("game-title").textContent = lv.title;
    document.getElementById("game-hp").textContent = 100;
    stage.innerHTML = "";
    controls.innerHTML = "";
    instr.textContent = "";
    if (lv.type === "rhythm") initRhythm(lv);
    else if (lv.type === "thrust") initThrust(lv);
    else if (lv.type === "quiz") initQuiz(lv);
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
    if (success) saveStars(lv.id, stars);
    const starStr = success ? "★".repeat(stars) + "☆".repeat(3 - stars) : "";
    ov.innerHTML = `
      <div class="r-emoji">${success ? "🎉" : "💀"}</div>
      <h2>${success ? "CỨU SỐNG RỒI!" : "ĐĂNG XUẤT KHỎI CUỘC ĐỜI 😵"}</h2>
      ${success ? `<div class="result-stars">${starStr}</div>` : ""}
      <p>${extra || ""}</p>
      <div class="lesson-box">💡 <b>Đời thực:</b> ${lv.lesson}</div>
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
      <div class="character" id="char">${lv.char}</div>`;
    instr.innerHTML = "Chạm <b>TIM</b> đúng theo vòng tròn nảy ra. Đừng nhanh quá, đừng chậm quá!";
    controls.innerHTML = `<div class="tap-zone" id="tap">❤️ ÉP TIM</div>`;

    const ring = document.getElementById("ring");
    const charEl = document.getElementById("char");
    const pf = document.getElementById("pf");
    const tap = document.getElementById("tap");

    ring.style.animationDuration = interval + "ms";

    let last = performance.now();
    let hits = 0, good = 0, alive = true;

    function tick() { last = performance.now(); }
    const beatTimer = setInterval(tick, interval);
    last = performance.now();

    function onTap() {
      if (!alive) return;
      const now = performance.now();
      const phase = (now - last);
      const diff = Math.min(phase, interval - phase);
      hits++;
      charEl.classList.remove("pulse"); void charEl.offsetWidth; charEl.classList.add("pulse");

      if (diff <= tolerance) {
        good++;
        floatText("PERFECT!", "#3ddc97");
      } else if (phase < interval / 2) {
        floatText("Nhanh quá!", "#ffd23f");
      } else {
        floatText("Chậm quá!", "#ff5d73");
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
        setTimeout(() => showResult(lv, true, stars,
          `Độ chính xác nhịp: ${Math.round(acc * 100)}%`), 700);
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
        floatText("ĐẨY! 🟣", "#3ddc97");
        pf.style.width = (thrusts / NEED) * 100 + "%";
        document.getElementById("game-hp").textContent = Math.min(100, 50 + thrusts * 8);
        if (thrusts >= NEED) win();
      } else {
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

  /* ---------- MINI-GAME 3 & 4: QUIZ (burns / bleeding) ---------- */
  const QUIZZES = {
    burn: [
      {
        q: "🔥 Anh đầu bếp vừa bị bỏng tay vì chảo nóng. Làm gì ĐẦU TIÊN?",
        options: [
          { t: "Xả nước mát 15–20 phút", ok: true },
          { t: "Bôi kem đánh răng", ok: false },
          { t: "Chườm đá lạnh trực tiếp", ok: false },
          { t: "Bôi nước mắm cho mát", ok: false }
        ],
        wrongMsg: "Sai bét! Kem đánh răng / đá / nước mắm chỉ làm tổn thương nặng hơn."
      },
      {
        q: "Vết bỏng phồng rộp to. Nên làm gì với cái bọng nước?",
        options: [
          { t: "Để nguyên, không chọc vỡ", ok: true },
          { t: "Chọc cho nước ra", ok: false },
          { t: "Lột da bỏng đi", ok: false },
          { t: "Chà xát cho xẹp", ok: false }
        ],
        wrongMsg: "Chọc vỡ bọng nước = mở cửa cho nhiễm trùng. Để yên nhé!"
      },
      {
        q: "Sau khi xả nước, che vết bỏng bằng gì?",
        options: [
          { t: "Gạc/vải sạch, không dính", ok: true },
          { t: "Bông gòn", ok: false },
          { t: "Băng keo dán thẳng lên", ok: false },
          { t: "Lá cây hái ngoài vườn", ok: false }
        ],
        wrongMsg: "Bông gòn dính vào vết thương. Dùng gạc sạch không dính."
      }
    ],
    bleed: [
      {
        q: "🩸 Zombie bị rách tay chảy máu nhiều. Việc QUAN TRỌNG nhất?",
        options: [
          { t: "Ép trực tiếp lên vết thương", ok: true },
          { t: "Rửa bằng nước oxy già thật mạnh", ok: false },
          { t: "Thổi vào cho mát", ok: false },
          { t: "Đắp lá thuốc lào", ok: false }
        ],
        wrongMsg: "Ưu tiên số 1 là ÉP CẦM MÁU. Chần chừ là mất máu."
      },
      {
        q: "Máu thấm ướt miếng gạc đầu tiên. Làm gì?",
        options: [
          { t: "Đắp thêm gạc & tiếp tục ép", ok: true },
          { t: "Gỡ gạc cũ ra xem", ok: false },
          { t: "Bỏ ép, đợi tự đông", ok: false },
          { t: "Lau sạch rồi để hở", ok: false }
        ],
        wrongMsg: "Gỡ gạc cũ sẽ làm bong cục máu đông. Đắp chồng lên và ép tiếp."
      },
      {
        q: "Tư thế tay bị thương nên như thế nào?",
        options: [
          { t: "Nâng cao hơn tim", ok: true },
          { t: "Thả thõng xuống đất", ok: false },
          { t: "Vẩy mạnh cho hết máu", ok: false },
          { t: "Buộc garô thật chặt ngay", ok: false }
        ],
        wrongMsg: "Nâng cao chi giúp giảm áp lực máu. Garô là biện pháp cuối cùng, dễ hại nếu sai."
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
        floatText("ĐÚNG! ✅", "#3ddc97");
        charEl.classList.remove("pulse"); void charEl.offsetWidth; charEl.classList.add("pulse");
        idx++;
        setTimeout(render, 750);
      } else {
        btn.classList.add("wrong");
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

  /* ---------- INIT ---------- */
  go("screen-home");
})();
