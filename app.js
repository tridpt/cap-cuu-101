/* ============================================================
   CẤP CỨU 101: Đừng Để Chết Nhảm
   Vanilla JS — no build step. Mở index.html là chạy.
   ============================================================ */

(() => {
  "use strict";

  /* ============================================================
     I18N — đa ngôn ngữ (Tiếng Việt / English)
     ============================================================ */
  let LANG = localStorage.getItem("capcuu101_lang") || "vi";
  function t(v) {
    if (v && typeof v === "object" && ("vi" in v || "en" in v)) return v[LANG] ?? v.vi;
    return v;
  }
  // từ điển cho phần giao diện tĩnh (đánh dấu bằng data-i18n trong HTML)
  const UI = {
    play: { vi: "🎮 CHƠI & HỌC", en: "🎮 PLAY & LEARN" },
    panic_btn: { vi: "🆘 CHẾ ĐỘ HOẢNG LOẠN", en: "🆘 PANIC MODE" },
    ach_btn: { vi: "🏆 Thành tích", en: "🏆 Achievements" },
    about_btn: { vi: "❓ Giới thiệu", en: "❓ About" },
    disclaimer: { vi: "⚠️ Game giải trí. Việc thật hãy gọi 115.", en: "⚠️ A game for learning. In real life, call emergency services." },
    levels_title: { vi: "Chọn thử thách", en: "Choose a challenge" },
    panic_title: { vi: "🆘 HOẢNG LOẠN", en: "🆘 PANIC" },
    panic_lead: { vi: "Hít một hơi. Chọn tình huống. App sẽ đọc từng bước cho bạn.", en: "Take a breath. Pick the situation. The app reads each step aloud." },
    call_115: { vi: "📞 GỌI 115 NGAY", en: "📞 CALL EMERGENCY NOW" },
    prev: { vi: "◀ Lùi", en: "◀ Back" },
    next: { vi: "Bước tiếp ▶", en: "Next ▶" },
    done: { vi: "✓ Xong", en: "✓ Done" },
    replay: { vi: "🔊 Đọc lại", en: "🔊 Read again" },
    change_sit: { vi: "↺ Đổi tình huống", en: "↺ Change situation" },
    about_title: { vi: "Đây là cái gì?", en: "What is this?" },
    ach_title: { vi: "🏆 Thành tích", en: "🏆 Achievements" },
    sources_title: { vi: "📚 Nguồn tham khảo", en: "📚 References" },
    sources_btn: { vi: "📚 Nguồn tham khảo", en: "📚 References" },
    settings_title: { vi: "⚙️ Cài đặt", en: "⚙️ Settings" },
    set_sound: { vi: "🔊 Âm thanh hiệu ứng", en: "🔊 Sound effects" },
    set_music: { vi: "🎵 Nhạc nền 8-bit", en: "🎵 8-bit music" },
    set_vibrate: { vi: "📳 Rung", en: "📳 Vibration" },
    set_lang: { vi: "🌐 Ngôn ngữ", en: "🌐 Language" },
    set_done: { vi: "Xong", en: "Done" },
    tut_howto: { vi: "Cách chơi", en: "How to play" },
    tut_start: { vi: "Bắt đầu! 🚀", en: "Start! 🚀" },
    retry: { vi: "🔁 Chơi lại", en: "🔁 Retry" },
    back_list: { vi: "← Danh sách", en: "← Level list" },
    win_title: { vi: "CỨU SỐNG RỒI!", en: "YOU SAVED THEM!" },
    lose_title: { vi: "ĐĂNG XUẤT KHỎI CUỘC ĐỜI 😵", en: "LOGGED OUT OF LIFE 😵" },
    real_life: { vi: "💡 Đời thực:", en: "💡 Real life:" },
    unlock_badge: { vi: "🏅 Mở khoá huy hiệu:", en: "🏅 Badge unlocked:" },
    q_label: { vi: "Câu", en: "Question" },
    correct: { vi: "ĐÚNG! ✅", en: "CORRECT! ✅" },
    streak_active_today: { vi: "— giữ phong độ nhé!", en: "— keep it up!" },
    streak_active_due: { vi: "— chơi 1 màn hôm nay để nối chuỗi!", en: "— play one today to keep the streak!" },
    streak_none: { vi: "🔥 Chơi mỗi ngày để xây chuỗi ôn tập. Bắt đầu hôm nay!", en: "🔥 Play daily to build a review streak. Start today!" },
    st_total_stars: { vi: "⭐ Tổng sao", en: "⭐ Total stars" },
    st_three: { vi: "🏆 Màn 3 sao", en: "🏆 3-star levels" },
    st_streak: { vi: "🔥 Chuỗi ngày", en: "🔥 Day streak" },
    st_wins: { vi: "💪 Lượt cứu sống", en: "💪 Lives saved" },
    st_combo: { vi: "🎯 Combo CPR tốt nhất", en: "🎯 Best CPR combo" },
    st_badges: { vi: "🏅 Huy hiệu", en: "🏅 Badges" },
    badges_title: { vi: "🏅 Huy hiệu", en: "🏅 Badges" },
    share: { vi: "📤 Chia sẻ", en: "📤 Share" },
    survival: { vi: "🏁 Thi đấu Survival", en: "🏁 Survival Mode" },
    survival_desc: { vi: "Trả lời liên tục, 1 lần sai là hết. Kỷ lục:", en: "Answer non-stop, one mistake ends it. Best:" },
    survival_score: { vi: "Điểm", en: "Score" },
    survival_over: { vi: "HẾT LƯỢT!", en: "GAME OVER!" },
    survival_clear: { vi: "HOÀN HẢO! Trả lời hết!", en: "PERFECT! All cleared!" },
    survival_best: { vi: "Kỷ lục", en: "Best" },
    survival_new_best: { vi: "🎉 Kỷ lục mới!", en: "🎉 New best!" },
    time_up: { vi: "Hết giờ!", en: "Time's up!" },
    share_ach: { vi: "📤 Khoe thành tích", en: "📤 Share progress" },
    copied: { vi: "Đã chép link!", en: "Link copied!" },
    set_reminder: { vi: "🔔 Nhắc ôn tập", en: "🔔 Practice reminders" },
    set_contrast: { vi: "🔆 Tương phản cao", en: "🔆 High contrast" },
    set_large: { vi: "🔠 Chữ lớn", en: "🔠 Large text" },
    set_reduce: { vi: "🎬 Giảm chuyển động", en: "🎬 Reduce motion" },
    set_serious: { vi: "🎓 Chế độ nghiêm túc", en: "🎓 Serious mode" },
    win_title_serious: { vi: "HOÀN THÀNH ĐÚNG CÁCH", en: "DONE CORRECTLY" },
    lose_title_serious: { vi: "Chưa đạt — thử lại nhé", en: "Not quite — try again" },
    reminder_title: { vi: "Cấp Cứu 101", en: "First Aid 101" },
    reminder_body: { vi: "Ôn sơ cứu 1 phút hôm nay để giữ chuỗi nhé! 🔥", en: "Do 1 minute of first-aid practice today to keep your streak! 🔥" }
  };

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
    screens[current].setAttribute("aria-hidden", "true");
    screens[id].removeAttribute("aria-hidden");
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
    { id: "rookie", emoji: "🐣", name: { vi: "Lính mới", en: "Rookie" }, desc: { vi: "Cứu sống lần đầu tiên", en: "First life saved" },
      test: (s, st) => s.totalWins >= 1 },
    { id: "cpr_master", emoji: "❤️‍🔥", name: { vi: "Bậc thầy CPR", en: "CPR Master" }, desc: { vi: "Đạt 3 sao màn ép tim", en: "3 stars on the CPR level" },
      test: (s, st) => (st.cpr || 0) >= 3 },
    { id: "combo", emoji: "🎯", name: { vi: "Tay nhịp vàng", en: "Golden Rhythm" }, desc: { vi: "Combo x10 ở màn CPR", en: "x10 combo on CPR" },
      test: (s) => (s.best.cpr || 0) >= 10 },
    { id: "five", emoji: "🖐️", name: { vi: "Nửa đường", en: "Halfway" }, desc: { vi: "3 sao ít nhất 5 màn", en: "3 stars on 5+ levels" },
      test: (s, st) => Object.values(st).filter(v => v >= 3).length >= 5 },
    { id: "explorer", emoji: "🧭", name: { vi: "Thử mọi thứ", en: "Explorer" }, desc: { vi: "Thắng đủ mọi màn", en: "Win every level once" },
      test: (s) => Object.keys(s.wins).length >= LEVELS.length },
    { id: "all_stars", emoji: "👑", name: { vi: "Cứu tinh", en: "Lifesaver" }, desc: { vi: "3 sao tất cả các màn", en: "3 stars on all levels" },
      test: (s, st) => LEVELS.every(l => (st[l.id] || 0) >= 3) },
    { id: "streak3", emoji: "🔥", name: { vi: "Chăm chỉ", en: "Diligent" }, desc: { vi: "Chuỗi 3 ngày liên tiếp", en: "3-day streak" },
      test: (s) => s.streak.count >= 3 },
    { id: "streak7", emoji: "🏅", name: { vi: "Kiên trì", en: "Persistent" }, desc: { vi: "Chuỗi 7 ngày liên tiếp", en: "7-day streak" },
      test: (s) => s.streak.count >= 7 },
    { id: "survivor", emoji: "🏁", name: { vi: "Cao thủ Survival", en: "Survivor" }, desc: { vi: "Đạt 10 điểm chế độ Survival", en: "Score 10 in Survival mode" },
      test: (s) => (s.best.survival || 0) >= 10 }
  ];

  // trả về tên các huy hiệu MỚI mở khoá
  function checkBadges() {
    const s = loadStats();
    const st = loadStars();
    const newly = [];
    BADGES.forEach(b => {
      if (!s.badges.includes(b.id) && b.test(s, st)) {
        s.badges.push(b.id);
        newly.push(t(b.name));
      }
    });
    if (newly.length) saveStats(s);
    return newly;
  }

  /* ---------- LEVEL DATA ---------- */
  const LEVELS = [
    {
      id: "cpr", emoji: "🐻", type: "rhythm", char: "🐻",
      title: { vi: "Ép tim cho Gấu Béo", en: "CPR for Chunky Bear" },
      desc: { vi: "CPR — vỗ tim đúng nhịp 100–120 lần/phút", en: "CPR — compress at 100–120 beats/min" },
      lesson: { vi: "CPR người lớn: ép giữa ngực, sâu 5–6cm, nhịp 100–120/phút. Nhớ bài 'Stayin' Alive' — đúng nhịp đấy!",
                en: "Adult CPR: push center of chest, 5–6cm deep, 100–120/min. Hum 'Stayin' Alive' — that's the beat!" }
    },
    {
      id: "choke", emoji: "👽", type: "thrust", char: "👽",
      title: { vi: "Người ngoài hành tinh nghẹn trân châu", en: "Alien choking on boba" },
      desc: { vi: "Heimlich — vỗ lưng & đẩy bụng", en: "Heimlich — back blows & abdominal thrusts" },
      lesson: { vi: "Hóc dị vật (người lớn/trẻ >1 tuổi): xen kẽ 5 lần vỗ lưng giữa hai bả vai và 5 lần đẩy bụng (Heimlich) đến khi bật ra. Còn ho được thì cứ để họ ho mạnh.",
                en: "Choking (adult/child >1y): alternate 5 back blows between shoulder blades and 5 abdominal thrusts (Heimlich) until it pops out. If they can cough, let them cough hard." }
    },
    {
      id: "infant_cpr", emoji: "👶", type: "rhythm", char: "👶",
      title: { vi: "CPR cho em bé Bông", en: "CPR for Baby Cotton" },
      desc: { vi: "Ép tim trẻ sơ sinh — hai ngón cái, nông hơn", en: "Infant CPR — two thumbs, shallower" },
      lesson: { vi: "CPR trẻ sơ sinh (<1 tuổi): ép giữa ngực bằng HAI NGÓN CÁI ôm quanh ngực (hoặc gót một bàn tay), sâu ~4cm (1/3 lồng ngực), nhịp 100–120/phút. KHÔNG ép sâu như người lớn.",
                en: "Infant CPR (<1y): compress center of chest with TWO THUMBS encircling the chest (or heel of one hand), ~4cm deep (1/3 of chest), 100–120/min. Do NOT push as deep as for adults." }
    },
    {
      id: "infant_choke", emoji: "🍼", type: "quiz", char: "👶",
      title: { vi: "Bé Bông hóc dị vật", en: "Baby Cotton is choking" },
      desc: { vi: "Trẻ sơ sinh: vỗ lưng + ấn ngực, KHÔNG đẩy bụng", en: "Infant: back blows + chest thrusts, NO abdominal thrusts" },
      lesson: { vi: "Hóc dị vật ở trẻ sơ sinh (<1 tuổi): úp sấp vỗ lưng 5 lần giữa hai bả vai, rồi lật ngửa ẤN NGỰC 5 lần bằng 2 ngón. TUYỆT ĐỐI KHÔNG đẩy bụng cho trẻ sơ sinh.",
                en: "Infant choking (<1y): face-down 5 back blows between shoulder blades, then face-up 5 CHEST thrusts with 2 fingers. NEVER do abdominal thrusts on an infant." }
    },
    {
      id: "burn", emoji: "🔥", type: "hose", char: "🧑‍🍳",
      title: { vi: "Cứu anh đầu bếp bị bỏng", en: "Save the burnt chef" },
      desc: { vi: "Xả nước mát lên vết bỏng cho đủ lâu", en: "Cool the burn under running water long enough" },
      lesson: { vi: "Bỏng: xả nước mát (KHÔNG dùng đá) 20 phút. Không bôi kem đánh răng, bơ, nước mắm gì cả!",
                en: "Burns: cool under running water (NOT ice) for 20 min. No toothpaste, butter or sauces!" }
    },
    {
      id: "bleed", emoji: "🩸", type: "press", char: "🧟",
      title: { vi: "Cầm máu cho Zombie hậu đậu", en: "Stop the clumsy Zombie's bleeding" },
      desc: { vi: "Đặt gạc đúng chỗ & giữ ép cầm máu", en: "Place gauze on the wound & hold pressure" },
      lesson: { vi: "Chảy máu: ép trực tiếp lên vết thương bằng gạc sạch, nâng cao chi, giữ ép liên tục.",
                en: "Bleeding: press directly on the wound with clean gauze, raise the limb, keep steady pressure." }
    },
    {
      id: "drown", emoji: "🌊", type: "quiz", char: "🐠",
      title: { vi: "Vớt chú cá vàng đuối nước", en: "Rescue the drowning goldfish" },
      desc: { vi: "Xử lý đuối nước đúng trình tự", en: "Handle drowning in the right order" },
      lesson: { vi: "Đuối nước: đảm bảo an toàn cho mình trước, đưa nạn nhân lên cạn, gọi 115, kiểm tra thở & CPR nếu cần.",
                en: "Drowning: keep yourself safe first, get them to land, call emergency, check breathing & do CPR if needed." }
    },
    {
      id: "electric", emoji: "⚡", type: "quiz", char: "🤖",
      title: { vi: "Robot bị điện giật", en: "Robot got electrocuted" },
      desc: { vi: "Ngắt nguồn trước khi cứu!", en: "Cut the power before helping!" },
      lesson: { vi: "Điện giật: NGẮT nguồn điện trước. Tuyệt đối không chạm vào nạn nhân khi còn dòng điện.",
                en: "Electric shock: CUT the power first. Never touch the victim while current is still flowing." }
    },
    {
      id: "seizure", emoji: "🌀", type: "quiz", char: "🐙",
      title: { vi: "Bạch tuộc lên cơn co giật", en: "Octopus having a seizure" },
      desc: { vi: "Bảo vệ, đừng giữ chặt", en: "Protect them, don't restrain" },
      lesson: { vi: "Co giật: dọn vật nguy hiểm, lót đầu mềm, KHÔNG giữ chặt, KHÔNG nhét gì vào miệng, canh giờ cơn giật.",
                en: "Seizure: clear hazards, cushion the head, do NOT restrain, do NOT put anything in the mouth, time the seizure." }
    },
    {
      id: "anaphylaxis", emoji: "🐝", type: "quiz", char: "🐝",
      title: { vi: "Ong vò vẽ bị... dị ứng ong", en: "Wasp... allergic to bees" },
      desc: { vi: "Sốc phản vệ — tiêm adrenaline & gọi 115", en: "Anaphylaxis — adrenaline & call emergency" },
      lesson: { vi: "Sốc phản vệ: dùng bút tiêm adrenaline (EpiPen) vào đùi ngoài ngay, gọi 115, cho nằm kê chân cao.",
                en: "Anaphylaxis: use the adrenaline auto-injector (EpiPen) in the outer thigh now, call emergency, lay them down with legs raised." }
    },
    {
      id: "fracture", emoji: "🦴", type: "quiz", char: "🦖",
      title: { vi: "Khủng long gãy chân", en: "Dinosaur with a broken leg" },
      desc: { vi: "Cố định, đừng nắn xương", en: "Immobilize, don't realign the bone" },
      lesson: { vi: "Gãy xương: cố định nguyên tư thế, KHÔNG nắn, chườm lạnh giảm sưng, đưa đi viện.",
                en: "Fracture: immobilize as-is, do NOT realign, ice to reduce swelling, get to hospital." }
    },
    {
      id: "snakebite", emoji: "🐍", type: "quiz", char: "🤠",
      title: { vi: "Rắn cắn nhầm... cao bồi", en: "Snake bit a... cowboy" },
      desc: { vi: "Bất động & tới viện, đừng hút nọc", en: "Immobilize & get to hospital, don't suck venom" },
      lesson: { vi: "Rắn cắn: giữ nạn nhân bất động, vùng bị cắn để ngang hoặc thấp hơn tim, tháo đồ chật. KHÔNG rạch, hút nọc, garô chặt hay chườm đá. Đến viện gấp.",
                en: "Snakebite: keep the victim still, bite area level with or below the heart, remove tight items. Do NOT cut, suck venom, apply a tight tourniquet or ice. Get to hospital fast." }
    },
    {
      id: "stroke", emoji: "🧠", type: "quiz", char: "👴",
      title: { vi: "Ông cụ nghi đột quỵ", en: "Grandpa might be having a stroke" },
      desc: { vi: "Nhận biết FAST & gọi 115 trong 'giờ vàng'", en: "Spot FAST & call within the golden hour" },
      lesson: { vi: "Đột quỵ — nhớ FAST: F (Face) méo miệng, A (Arm) yếu một tay, S (Speech) nói đớ, T (Time) gọi 115 NGAY. Ghi giờ khởi phát, không cho ăn uống.",
                en: "Stroke — remember FAST: F (Face) droop, A (Arm) one weak arm, S (Speech) slurred, T (Time) call emergency NOW. Note the onset time, no food or drink." }
    },
    {
      id: "hypo", emoji: "🍬", type: "quiz", char: "🧑",
      title: { vi: "Cô bạn tụt đường huyết", en: "Friend with low blood sugar" },
      desc: { vi: "Còn tỉnh thì cho đường nhanh", en: "If conscious, give fast sugar" },
      lesson: { vi: "Hạ đường huyết (run, vã mồ hôi, lú lẫn): còn tỉnh thì cho đường hấp thu nhanh (nước ngọt thường, kẹo, glucose). Bất tỉnh thì KHÔNG cho gì vào miệng, gọi 115.",
                en: "Low blood sugar (shaky, sweating, confused): if conscious, give fast-acting sugar (regular soda, candy, glucose). If unconscious, put NOTHING in the mouth, call emergency." }
    },
    {
      id: "heatstroke", emoji: "🥵", type: "quiz", char: "🥵",
      title: { vi: "Vận động viên sốc nhiệt", en: "Athlete with heat stroke" },
      desc: { vi: "Làm mát tích cực, đây là cấp cứu", en: "Cool aggressively — it's an emergency" },
      lesson: { vi: "Sốc nhiệt (da nóng, lú lẫn, có thể ngất): chuyển vào chỗ mát, cởi bớt đồ, làm mát tích cực (nước mát, quạt, chườm đá ở nách/bẹn/cổ), gọi 115.",
                en: "Heat stroke (hot skin, confusion, may faint): move to a cool place, remove excess clothing, cool aggressively (cool water, fan, ice packs to armpits/groin/neck), call emergency." }
    },
    {
      id: "poison", emoji: "☠️", type: "quiz", char: "🤢",
      title: { vi: "Mèo con nuốt nhầm hoá chất", en: "Kitten swallowed a chemical" },
      desc: { vi: "Đừng tự gây nôn — gọi chống độc", en: "Don't induce vomiting — call poison control" },
      lesson: { vi: "Ngộ độc: gọi 115 / trung tâm chống độc, KHÔNG tự gây nôn (trừ khi được hướng dẫn). Giữ lại bao bì/chất nghi ngộ độc để bác sĩ biết.",
                en: "Poisoning: call emergency / poison control, do NOT induce vomiting (unless instructed). Keep the packaging/substance for the doctor." }
    }
  ];

  /* ---------- RENDER LEVELS ---------- */
  function renderLevels() {
    document.getElementById("total-stars").textContent = totalStars();
    renderStreakBanner();
    const saved = loadStars();
    const list = document.getElementById("level-list");
    list.innerHTML = "";

    // Thẻ Thi đấu Survival
    const best = loadStats().best.survival || 0;
    const sv = document.createElement("div");
    sv.className = "level-card survival-card";
    sv.setAttribute("role", "button");
    sv.setAttribute("tabindex", "0");
    sv.innerHTML = `
      <div class="lv-emoji">🏁</div>
      <div class="lv-info"><h3>${t(UI.survival)}</h3><p>${t(UI.survival_desc)} <b>${best}</b></p></div>
      <div class="lv-stars">▶</div>`;
    const launch = () => startSurvival();
    sv.addEventListener("click", launch);
    sv.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); launch(); } });
    list.appendChild(sv);

    LEVELS.forEach(lv => {
      const got = saved[lv.id] || 0;
      const stars = "★".repeat(got) + "☆".repeat(3 - got);
      const card = document.createElement("div");
      card.className = "level-card";
      card.innerHTML = `
        <div class="lv-emoji">${lv.emoji}</div>
        <div class="lv-info"><h3>${t(lv.title)}</h3><p>${t(lv.desc)}</p></div>
        <div class="lv-stars">${stars}</div>`;
      card.addEventListener("click", () => startGame(lv));
      list.appendChild(card);
    });
  }

  function renderStreakBanner() {
    const el = document.getElementById("streak-banner");
    if (!el) return;
    const s = loadStats();
    const today = todayStr();
    const active = s.streak.last && daysBetween(s.streak.last, today) <= 1 && s.streak.count > 0;
    el.className = "streak-banner";
    if (active) {
      const playedToday = s.streak.last === today;
      const tail = playedToday ? t(UI.streak_active_today) : t(UI.streak_active_due);
      const word = LANG === "en" ? "day streak" : "ngày";
      el.innerHTML = `🔥 ${LANG === "en" ? "" : "Chuỗi "}<b>${s.streak.count} ${word}</b> ${tail}`;
    } else {
      el.innerHTML = t(UI.streak_none);
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
        <div class="b-name">${t(b.name)}</div>
        <div class="b-desc">${t(b.desc)}</div>
      </div>`;
    }).join("");
    body.innerHTML = `
      <div class="ach-stats">
        <div class="ach-stat"><div class="num">${totalStars()}</div><div class="lbl">${t(UI.st_total_stars)}</div></div>
        <div class="ach-stat"><div class="num">${threeStar}/${LEVELS.length}</div><div class="lbl">${t(UI.st_three)}</div></div>
        <div class="ach-stat"><div class="num">${s.streak.count}</div><div class="lbl">${t(UI.st_streak)}</div></div>
      </div>
      <div class="ach-stats">
        <div class="ach-stat"><div class="num">${s.totalWins}</div><div class="lbl">${t(UI.st_wins)}</div></div>
        <div class="ach-stat"><div class="num">x${s.best.cpr || 0}</div><div class="lbl">${t(UI.st_combo)}</div></div>
        <div class="ach-stat"><div class="num">${s.badges.length}/${BADGES.length}</div><div class="lbl">${t(UI.st_badges)}</div></div>
      </div>
      <div class="ach-section-title">${t(UI.badges_title)}</div>
      <div class="badge-grid">${badgeCards}</div>
      <button class="btn btn-replay" id="ach-share" style="width:100%;margin-top:16px">${t(UI.share_ach)}</button>`;
    const shareBtn = document.getElementById("ach-share");
    if (shareBtn) {
      shareBtn.addEventListener("click", () => {
        const big = LANG === "en"
          ? `${totalStars()}★ · ${s.badges.length}/${BADGES.length} badges`
          : `${totalStars()}★ · ${s.badges.length}/${BADGES.length} huy hiệu`;
        const sub = LANG === "en"
          ? `${threeStar}/${LEVELS.length} levels mastered · ${s.streak.count}-day streak\nLearn first aid by playing!`
          : `Thành thạo ${threeStar}/${LEVELS.length} màn · chuỗi ${s.streak.count} ngày\nHọc sơ cứu bằng cách chơi!`;
        shareCard(big, sub);
      });
    }
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
    document.getElementById("game-title").textContent = t(lv.title);
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

  /* ---------- SURVIVAL MODE (gauntlet trắc nghiệm tính giờ) ---------- */
  function startSurvival() {
    if (window.Sfx) { Sfx.unlock(); Sfx.startMusic(); }
    go("screen-game");
    document.getElementById("game-title").textContent = t(UI.survival);
    document.getElementById("game-hp").textContent = "0";
    stage.innerHTML = "";
    controls.innerHTML = "";
    instr.textContent = "";
    initSurvival();
  }

  function initSurvival() {
    // gom toàn bộ câu hỏi từ mọi tình huống (theo ngôn ngữ hiện tại)
    const src = (LANG === "en") ? QUIZZES_EN : QUIZZES;
    const pool = [];
    Object.keys(src).forEach(id => src[id].forEach(q => pool.push(q)));
    pool.sort(() => Math.random() - 0.5);

    const PER = 9000;           // ms cho mỗi câu
    let idx = 0, score = 0, combo = 0, alive = true;
    let rafId = null, qStart = 0, lastBeep = -1;

    stage.innerHTML = `
      <div class="progress-bar"><div class="progress-fill" id="tfill" style="background:var(--accent2)"></div></div>
      <div class="surv-score" id="sscore">0</div>
      <div class="character" id="char">🏁</div>`;
    const tfill = document.getElementById("tfill");
    const sEl = document.getElementById("sscore");
    const charEl = document.getElementById("char");

    function tickTimer() {
      if (!alive) return;
      const left = PER - (performance.now() - qStart);
      const pct = Math.max(0, left / PER * 100);
      tfill.style.width = pct + "%";
      tfill.style.background = pct < 30 ? "var(--accent)" : "var(--accent2)";
      // tiếng tích tắc cảnh báo 3 giây cuối
      if (left < 3000) {
        const sec = Math.ceil(left / 1000);
        if (sec !== lastBeep) { lastBeep = sec; if (window.Sfx) Sfx.tick(); }
      }
      if (left <= 0) { timeout(); return; }
      rafId = requestAnimationFrame(tickTimer);
    }

    function ask() {
      if (!alive) return;
      if (idx >= pool.length) { end(true); return; }
      const item = pool[idx];
      instr.innerHTML = `${t(UI.survival_score)}: <b>${score}</b>${combo >= 3 ? ` · 🔥x${combo}` : ""}`;
      controls.innerHTML = `<div style="text-align:center;font-weight:700;font-size:16px;margin-bottom:6px">${item.q}</div>`;
      const grid = document.createElement("div");
      grid.className = "choice-grid";
      const opts = item.options.map(o => ({ ...o })).sort(() => Math.random() - 0.5);
      opts.forEach(o => {
        const b = document.createElement("button");
        b.className = "choice";
        b.textContent = o.t;
        b.addEventListener("click", () => choose(b, o, item), { once: true });
        grid.appendChild(b);
      });
      controls.appendChild(grid);
      qStart = performance.now();
      lastBeep = -1;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(tickTimer);
    }

    function lockChoices() {
      controls.querySelectorAll(".choice").forEach(b => (b.style.pointerEvents = "none"));
    }

    function choose(btn, opt, item) {
      if (!alive) return;
      cancelAnimationFrame(rafId);
      lockChoices();
      if (opt.ok) {
        btn.classList.add("correct");
        score++; combo++;
        sEl.textContent = score;
        document.getElementById("game-hp").textContent = score;
        if (window.Sfx) { Sfx.correct(); Sfx.vibrate(30); }
        charEl.classList.remove("pulse"); void charEl.offsetWidth; charEl.classList.add("pulse");
        idx++;
        setTimeout(ask, 450);
      } else {
        btn.classList.add("wrong");
        controls.querySelectorAll(".choice").forEach(b => { if (b.textContent === item.options.find(o => o.ok).t) b.classList.add("correct"); });
        if (window.Sfx) { Sfx.wrong(); Sfx.vibrate(150); }
        end(false);
      }
    }

    function timeout() {
      if (!alive) return;
      cancelAnimationFrame(rafId);
      lockChoices();
      const item = pool[idx];
      controls.querySelectorAll(".choice").forEach(b => { if (b.textContent === item.options.find(o => o.ok).t) b.classList.add("correct"); });
      if (window.Sfx) { Sfx.wrong(); Sfx.vibrate(150); }
      floatText(t(UI.time_up), "#ff5d73");
      end(false);
    }

    function end(cleared) {
      alive = false;
      cancelAnimationFrame(rafId);
      const prevBest = loadStats().best.survival || 0;
      saveBest("survival", score);
      const isNew = score > prevBest;
      checkBadges();
      if (window.Sfx) cleared || score > 0 ? Sfx.win() : Sfx.logout();
      charEl.classList.add(cleared ? "win" : "dead");
      const ov = document.createElement("div");
      ov.className = "result-overlay";
      ov.innerHTML = `
        <div class="r-emoji">${cleared ? "🏆" : (PREFS.serious ? "⏱️" : "🏁")}</div>
        <h2>${cleared ? t(UI.survival_clear) : t(UI.survival_over)}</h2>
        <div class="result-stars">${t(UI.survival_score)}: ${score}</div>
        <p>${t(UI.survival_best)}: ${Math.max(prevBest, score)} ${isNew ? "· " + t(UI.survival_new_best) : ""}</p>
        <button class="btn btn-replay" id="s-share">${t(UI.share)}</button>
        <button class="btn btn-play" id="s-retry">${t(UI.retry)}</button>
        <button class="btn btn-ghost" id="s-back">${t(UI.back_list)}</button>`;
      stage.appendChild(ov);
      ov.querySelector("#s-retry").addEventListener("click", () => startSurvival());
      ov.querySelector("#s-back").addEventListener("click", () => go("screen-levels"));
      ov.querySelector("#s-share").addEventListener("click", () => {
        const big = LANG === "en" ? `Survival: ${score} correct in a row` : `Survival: trả lời đúng ${score} câu liên tiếp`;
        const sub = LANG === "en" ? "Can you beat my first-aid streak?" : "Bạn phá được kỷ lục sơ cứu của mình không?";
        shareCard(big, sub);
      });
    }

    gameState = { cleanup() { alive = false; cancelAnimationFrame(rafId); } };
    ask();
  }

  /* ---------- TUTORIAL (hướng dẫn nhanh lần đầu) ---------- */
  const TUT_KEY = "capcuu101_tut";
  const TUTORIALS = {
    rhythm: {
      emoji: "❤️",
      title: { vi: "Ép tim đúng nhịp", en: "Compress on the beat" },
      text: { vi: "Chạm nút <b>ÉP TIM</b> khớp với vòng tròn vàng nảy ra (nhịp ~110/phút). Đúng nhịp sẽ cộng <b>combo</b>, sai thì mất combo. Có tiếng tách & rung dẫn nhịp cho bạn.",
              en: "Tap the <b>COMPRESS</b> button in time with the bouncing yellow ring (~110/min). On-beat builds <b>combo</b>, off-beat resets it. A tick & vibration guide the rhythm." }
    },
    thrust: {
      emoji: "🤜",
      title: { vi: "Đẩy bụng Heimlich", en: "Heimlich thrusts" },
      text: { vi: "<b>Nghiêng điện thoại về trước</b> dứt khoát để đẩy bụng (máy không có cảm biến thì <b>nhấn giữ rồi thả mạnh</b>). Đẩy đủ số lần là dị vật bật ra!",
              en: "<b>Tilt the phone forward</b> firmly to thrust (no sensor? <b>press, hold and release hard</b>). Enough strong thrusts and the object pops out!" }
    },
    hose: {
      emoji: "🚿",
      title: { vi: "Xả nước chữa bỏng", en: "Cool the burn" },
      text: { vi: "Đặt ngón tay & <b>rê vòi nước</b> đè lên nhân vật, <b>giữ yên đủ lâu</b> cho mát. Nhấc tay ra là vết bỏng <b>nóng lại</b> — và có thể lan sang chỗ khác!",
              en: "Hold & <b>drag the water</b> over the character, <b>keep it there</b> to cool. Let go and the burn <b>heats up</b> — and may flare to a new spot!" }
    },
    press: {
      emoji: "🩹",
      title: { vi: "Đặt gạc & ép cầm máu", en: "Place gauze & hold pressure" },
      text: { vi: "<b>Bước 1:</b> kéo miếng gạc 🩹 vào đúng vòng tròn vết thương. <b>Bước 2:</b> nhấn giữ để ép, giữ thanh lực trong <b>vùng xanh đang di chuyển</b>.",
              en: "<b>Step 1:</b> drag the gauze 🩹 onto the wound circle. <b>Step 2:</b> press & hold, keeping the force bar inside the <b>moving green zone</b>." }
    },
    quiz: {
      emoji: "🧠",
      title: { vi: "Chọn đáp án đúng", en: "Pick the right answer" },
      text: { vi: "Đọc tình huống rồi <b>chọn cách xử lý đúng</b>. Trả lời sai sẽ mất nhiều HP — hết HP là nhân vật <b>đăng xuất khỏi cuộc đời</b>!",
              en: "Read the situation, then <b>pick the correct action</b>. Wrong answers cost a lot of HP — at zero HP the character <b>logs out of life</b>!" }
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
    const tut = TUTORIALS[lv.type];
    if (!tut) { onStart(); return; }
    const modal = document.getElementById("tutorial");
    document.getElementById("tut-emoji").textContent = tut.emoji;
    document.getElementById("tut-title").textContent = t(tut.title);
    document.getElementById("tut-text").innerHTML = t(tut.text);
    modal.classList.remove("hidden");
    const btn = document.getElementById("tut-start");
    btn.textContent = t(UI.tut_start);
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

  /* ---------- SHARE ---------- */
  const SHARE_URL = "https://tridpt.github.io/cap-cuu-101/";

  function toast(msg) {
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = msg;
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add("show"));
    setTimeout(() => { el.classList.remove("show"); setTimeout(() => el.remove(), 300); }, 2200);
  }

  function buildShareImage(bigText, subText) {
    const c = document.createElement("canvas");
    c.width = 1080; c.height = 1080;
    const x = c.getContext("2d");
    const g = x.createLinearGradient(0, 0, 0, 1080);
    g.addColorStop(0, "#1a1c3a"); g.addColorStop(1, "#0f1020");
    x.fillStyle = g; x.fillRect(0, 0, 1080, 1080);
    // chữ thập
    x.fillStyle = "#ff5d73"; x.beginPath(); x.arc(540, 300, 150, 0, Math.PI * 2); x.fill();
    x.fillStyle = "#fff"; x.fillRect(540 - 32, 300 - 95, 64, 190); x.fillRect(540 - 95, 300 - 32, 190, 64);
    x.textAlign = "center";
    x.fillStyle = "#f4f4ff"; x.font = "bold 92px Segoe UI, Arial, sans-serif";
    x.fillText("CẤP CỨU 101", 540, 580);
    x.fillStyle = "#ffd23f"; x.font = "bold 62px Segoe UI, Arial, sans-serif";
    x.fillText(bigText, 540, 690);
    x.fillStyle = "#9aa0c7"; x.font = "40px Segoe UI, Arial, sans-serif";
    (subText || "").split("\n").forEach((line, i) => x.fillText(line, 540, 800 + i * 56));
    x.fillStyle = "#3ddc97"; x.font = "34px Segoe UI, Arial, sans-serif";
    x.fillText(SHARE_URL.replace("https://", ""), 540, 1000);
    return new Promise(res => c.toBlob(res, "image/png"));
  }

  async function shareCard(bigText, subText) {
    const text = `${bigText} — ${subText.replace(/\n/g, " ")}`;
    try {
      const blob = await buildShareImage(bigText, subText);
      if (blob && navigator.canShare) {
        const file = new File([blob], "capcuu101.png", { type: "image/png" });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], text, url: SHARE_URL, title: "Cấp Cứu 101" });
          return;
        }
      }
      if (navigator.share) { await navigator.share({ text, url: SHARE_URL, title: "Cấp Cứu 101" }); return; }
    } catch (e) {
      if (e && e.name === "AbortError") return;   // người dùng huỷ
    }
    try { await navigator.clipboard.writeText(text + "\n" + SHARE_URL); toast(t(UI.copied)); }
    catch { toast(SHARE_URL); }
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
      ? `<div class="lesson-box" style="border-left-color:var(--accent2)">${t(UI.unlock_badge)} <b>${newBadges.join(", ")}</b></div>`
      : "";
    ov.innerHTML = `
      <div class="r-emoji">${success ? "🎉" : (PREFS.serious ? "⚠️" : "💀")}</div>
      <h2>${success ? (PREFS.serious ? t(UI.win_title_serious) : t(UI.win_title)) : (PREFS.serious ? t(UI.lose_title_serious) : t(UI.lose_title))}</h2>
      ${success ? `<div class="result-stars">${starStr}</div>` : ""}
      <p>${extra || ""}</p>
      <div class="lesson-box">${t(UI.real_life)} ${t(lv.lesson)}</div>
      ${badgeNote}
      ${success ? `<button class="btn btn-replay" id="r-share">${t(UI.share)}</button>` : ""}
      <button class="btn btn-play" id="r-retry">${t(UI.retry)}</button>
      <button class="btn btn-ghost" id="r-back">${t(UI.back_list)}</button>`;
    stage.appendChild(ov);
    ov.querySelector("#r-retry").addEventListener("click", () => startGame(lv));
    ov.querySelector("#r-back").addEventListener("click", () => go("screen-levels"));
    if (success) {
      const big = LANG === "en" ? `${stars}/3 ★ on "${t(lv.title)}"` : `${stars}/3 ★ màn "${t(lv.title)}"`;
      const sub = LANG === "en"
        ? "I'm learning life-saving first aid by playing.\nTry it too!"
        : "Mình đang học sơ cứu cứu người bằng cách chơi game.\nThử xem!";
      ov.querySelector("#r-share").addEventListener("click", () => shareCard(big, sub));
    }
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
    instr.innerHTML = LANG === "en"
      ? "Tap <b>HEART</b> in time with the bouncing ring. Not too fast, not too slow!"
      : "Chạm <b>TIM</b> đúng theo vòng tròn nảy ra. Đừng nhanh quá, đừng chậm quá!";
    controls.innerHTML = `<div class="tap-zone" id="tap" role="button" tabindex="0" aria-label="${LANG === "en" ? "Compress (Space/Enter)" : "Ép tim (Space/Enter)"}">${LANG === "en" ? "❤️ COMPRESS" : "❤️ ÉP TIM"}</div>`;

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
        if (phase < interval / 2) floatText(LANG === "en" ? "Too fast!" : "Nhanh quá!", "#ffd23f");
        else floatText(LANG === "en" ? "Too slow!" : "Chậm quá!", "#ff5d73");
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
        saveBest(lv.id, bestCombo);
        const msg = LANG === "en"
          ? `Beat accuracy: ${Math.round(acc * 100)}% · Best combo: x${bestCombo}`
          : `Độ chính xác nhịp: ${Math.round(acc * 100)}% · Combo cao nhất: x${bestCombo}`;
        setTimeout(() => showResult(lv, true, stars, msg), 700);
      }
    }
    tap.addEventListener("pointerdown", onTap);
    tap.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); onTap(); }
    });

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
        floatText(LANG === "en" ? "THRUST! 🟣" : "ĐẨY! 🟣", "#3ddc97");
        pf.style.width = (thrusts / NEED) * 100 + "%";
        document.getElementById("game-hp").textContent = Math.min(100, 50 + thrusts * 8);
        if (thrusts >= NEED) win();
      } else {
        if (window.Sfx) Sfx.blip();
        floatText(LANG === "en" ? "Too soft!" : "Nhẹ quá!", "#ffd23f");
      }
    }
    function win() {
      alive = false; cleanup();
      charEl.textContent = "🧋"; floatText(LANG === "en" ? "IT'S OUT!" : "BẬT RA RỒI!", "#3ddc97");
      setTimeout(() => { charEl.textContent = lv.char; charEl.classList.add("win"); }, 400);
      setTimeout(() => showResult(lv, true, 3, LANG === "en" ? "Boba launched into orbit 🚀" : "Trân châu bay ra ngoài quỹ đạo 🚀"), 900);
    }

    function useTiltMode() {
      document.getElementById("meter").classList.remove("hidden");
      const zone = document.getElementById("zone");
      const knob = document.getElementById("knob");
      zone.style.left = "65%"; zone.style.right = "0";
      instr.innerHTML = LANG === "en"
        ? "<b>Tilt the phone forward</b> to thrust the abdomen. Bring the yellow dot into the green zone!"
        : "<b>Nghiêng điện thoại về phía trước</b> để đẩy bụng. Đưa chấm vàng vào vùng xanh!";
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
      instr.innerHTML = LANG === "en"
        ? "No tilt sensor — <b>press and hold, then release hard</b> to thrust the abdomen!"
        : "Thiết bị không có cảm biến nghiêng — <b>nhấn giữ rồi thả mạnh</b> để đẩy bụng!";
      const btn = document.createElement("div");
      btn.className = "tap-zone";
      btn.id = "tap";
      btn.textContent = LANG === "en" ? "🤜 HOLD → RELEASE" : "🤜 NHẤN GIỮ → THẢ";
      controls.appendChild(btn);
      let downAt = 0;
      btn.addEventListener("pointerdown", () => { downAt = performance.now(); btn.textContent = LANG === "en" ? "💪 ...HOLD..." : "💪 ...GIỮ..."; });
      const up = () => {
        if (!downAt) return;
        const held = performance.now() - downAt;
        downAt = 0; btn.textContent = LANG === "en" ? "🤜 HOLD → RELEASE" : "🤜 NHẤN GIỮ → THẢ";
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
      ask.textContent = LANG === "en" ? "📱 Enable tilt sensor" : "📱 Bật cảm biến nghiêng";
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
      skip.textContent = LANG === "en" ? "No sensor? Play by tapping" : "Không có cảm biến? Chơi kiểu chạm";
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
    const NEED = 6500;          // ms "nước mát" cần tích đủ
    stage.innerHTML = `
      <div class="progress-bar"><div class="progress-fill" id="pf"></div></div>
      <div class="wound" id="wound">${lv.char}</div>
      <div class="water-stream" id="stream">🚿</div>
      <div class="cool-label" id="cool">${LANG === "en" ? "Drag the water onto the burn" : "Kéo vòi nước lên vết bỏng"}</div>`;
    instr.innerHTML = LANG === "en"
      ? "<b>Hold & drag the water</b> over the character, keep it cool long enough. Let go and it heats up — and the burn can <b>flare to a new spot!</b>"
      : "<b>Đặt ngón tay & rê vòi nước</b> đè lên nhân vật, giữ cho mát đủ lâu. Nhấc tay ra là nóng lại — vết bỏng còn có thể <b>lan sang chỗ khác!</b>";

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

    let hotPlays = 0, sinceFlare = 0;
    const loop = setInterval(() => {
      if (!alive) return;
      const now = performance.now();
      const dt = now - lastT; lastT = now;
      if (stream.classList.contains("on") && pointerInside) {
        cooled += dt;
        wound.style.filter = "saturate(.6) brightness(1)";
        cool.textContent = (LANG === "en" ? "Cooling… " : "Đang làm mát… ") + Math.round(cooled / NEED * 100) + "%";
        cool.style.color = "#3ddc97";
        if (Math.random() < 0.04 && window.Sfx) Sfx.blip();
        // vết bỏng "lan": thỉnh thoảng nhảy sang vị trí mới khi đang xử lý
        sinceFlare += dt;
        if (sinceFlare > 2000 && cooled < NEED - 800) {
          sinceFlare = 0;
          place();
          pointerInside = false;
          if (window.Sfx) Sfx.wrong();
          floatText(LANG === "en" ? "Flare! 🔥" : "Bỏng lan! 🔥", "#ff5d73");
        }
      } else {
        cooled = Math.max(0, cooled - dt * 0.5);  // nóng lại nếu rời vòi
        wound.style.filter = "saturate(1.6) brightness(1.2)";
        cool.textContent = LANG === "en" ? "🔥 Heating up! Bring the water back!" : "🔥 Đang nóng lại! Đưa vòi nước về!";
        cool.style.color = "#ff5d73";
      }
      pf.style.width = Math.min(100, cooled / NEED * 100) + "%";
      document.getElementById("game-hp").textContent =
        Math.min(100, 40 + Math.round(cooled / NEED * 60));

      if (cooled >= NEED) {
        alive = false; clearInterval(loop); onUp();
        wound.style.filter = "none";
        wound.classList.add("character", "win");
        floatText(LANG === "en" ? "COOLED! 💧" : "MÁT RỒI! 💧", "#3ddc97");
        setTimeout(() => showResult(lv, true, 3, LANG === "en" ? "Burn cooled the right way 👏" : "Hạ nhiệt vết bỏng đúng cách 👏"), 700);
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
    instr.innerHTML = LANG === "en"
      ? "<b>Step 1:</b> Drag the gauze 🩹 onto the wound circle."
      : "<b>Bước 1:</b> Kéo miếng gạc 🩹 vào vòng tròn vết thương.";

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
        floatText(LANG === "en" ? "PERFECT PLACEMENT!" : "ĐẶT CHUẨN!", "#3ddc97");
        startHold();
      } else {
        if (window.Sfx) Sfx.blip();
        floatText(LANG === "en" ? "Missed!" : "Trượt rồi!", "#ffd23f");
      }
    }
    gauze.addEventListener("pointerdown", gz);
    stage.addEventListener("pointermove", gmove);
    stage.addEventListener("pointerup", gup);

    let holdLoop = null;
    function startHold() {
      instr.innerHTML = LANG === "en"
        ? "<b>Step 2:</b> Press & hold below to <b>apply pressure</b>. Keep the force bar inside the moving green zone!"
        : "<b>Bước 2:</b> Nhấn giữ nút bên dưới để <b>ép cầm máu</b>. Giữ thanh lực trong vùng xanh đang di chuyển!";
      controls.innerHTML = `
        <div class="force-wrap">
          <div class="force-track">
            <div class="force-good-zone" id="fzone"></div>
            <div class="force-fill" id="ffill"></div>
          </div>
          <div class="force-hint" id="fhint">${LANG === "en" ? "Press & HOLD to build pressure" : "Nhấn & GIỮ để tăng lực ép"}</div>
        </div>
        <div class="tap-zone" id="presszone">${LANG === "en" ? "✋ PRESS & HOLD" : "✋ NHẤN GIỮ ÉP"}</div>`;
      const fill = document.getElementById("ffill");
      const hint = document.getElementById("fhint");
      const zoneEl = document.getElementById("fzone");
      const zone = document.getElementById("presszone");

      let force = 0, holding = false, inZone = 0;
      const NEED_ZONE = 3500;     // ms phải giữ trong vùng xanh
      let drift = 0, zW = 26;     // vùng xanh trôi để tăng độ khó
      zone.addEventListener("pointerdown", () => { holding = true; if (window.Sfx) Sfx.unlock(); });
      zone.addEventListener("pointerup", () => holding = false);
      zone.addEventListener("pointerleave", () => holding = false);

      let last = performance.now();
      holdLoop = setInterval(() => {
        if (!alive) return;
        const now = performance.now(); const dt = now - last; last = now;
        drift += dt / 1000;
        const zLo = 52 + Math.sin(drift * 0.9) * 16;   // dao động 36%..68%
        const zHi = zLo + zW;
        zoneEl.style.left = zLo + "%";
        zoneEl.style.right = (100 - zHi) + "%";

        force += (holding ? 0.18 : -0.22) * (dt / 16);
        force = Math.max(0, Math.min(100, force));
        fill.style.width = force + "%";
        charEl.classList.toggle("pulse", holding);

        if (force >= zLo && force <= zHi) {
          inZone += dt;
          hint.textContent = (LANG === "en" ? "Hold steady… " : "Giữ ổn định… ") + Math.round(inZone / NEED_ZONE * 100) + "%";
          hint.style.color = "#3ddc97";
        } else {
          hint.textContent = force > zHi
            ? (LANG === "en" ? "Too hard, ease off!" : "Mạnh quá, nới một chút!")
            : (LANG === "en" ? "Press harder!" : "Ép mạnh hơn!");
          hint.style.color = "#ffd23f";
        }
        document.getElementById("game-hp").textContent =
          Math.min(100, 40 + Math.round(inZone / NEED_ZONE * 60));

        if (inZone >= NEED_ZONE) {
          alive = false; clearInterval(holdLoop);
          charEl.classList.add("win");
          if (window.Sfx) Sfx.win();
          floatText(LANG === "en" ? "BLEEDING STOPPED! 🩸✋" : "CẦM MÁU OK! 🩸✋", "#3ddc97");
          setTimeout(() => showResult(lv, true, 3, LANG === "en" ? "Right pressure, right spot. Nice!" : "Ép đúng lực, đúng chỗ. Giỏi!"), 700);
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
    stroke: [
      {
        q: "👴 Ông cụ đột nhiên méo miệng, yếu một tay, nói đớ. Nghĩ ngay đến?",
        options: [
          { t: "Đột quỵ — gọi 115 ngay", ok: true },
          { t: "Trúng gió, cạo gió là khỏi", ok: false },
          { t: "Mệt thường, để nghỉ tí", ok: false },
          { t: "Đói, cho ăn cháo", ok: false }
        ],
        wrongMsg: "Méo miệng + yếu tay + nói đớ = dấu hiệu đột quỵ (FAST). Cạo gió/chờ đợi làm mất 'giờ vàng'."
      },
      {
        q: "Bài kiểm tra nhanh FAST gồm kiểm tra gì?",
        options: [
          { t: "Mặt (méo), Tay (yếu), Lời nói (đớ), Thời gian", ok: true },
          { t: "Mắt, Mũi, Miệng, Tai", ok: false },
          { t: "Mạch, huyết áp, đường huyết", ok: false },
          { t: "Chỉ cần hỏi họ có đau không", ok: false }
        ],
        wrongMsg: "FAST = Face (mặt), Arm (tay), Speech (lời nói), Time (thời gian gọi cấp cứu)."
      },
      {
        q: "Trong khi chờ cấp cứu, nên làm gì?",
        options: [
          { t: "Nằm nghỉ đầu hơi cao, ghi giờ khởi phát, không cho ăn uống", ok: true },
          { t: "Cho uống thuốc hạ huyết áp ngay", ok: false },
          { t: "Cho ăn uống để có sức", ok: false },
          { t: "Bấm huyệt nhân trung, cạo gió", ok: false }
        ],
        wrongMsg: "Không cho ăn/uống (dễ sặc nếu liệt cơ nuốt). Giữ yên, ghi giờ khởi phát, gọi 115."
      }
    ],
    hypo: [
      {
        q: "🍬 Người tiểu đường bỗng run, vã mồ hôi, lú lẫn nhưng còn tỉnh. Làm gì?",
        options: [
          { t: "Cho ăn/uống đường hấp thu nhanh (nước ngọt, kẹo)", ok: true },
          { t: "Cho uống thật nhiều nước lọc", ok: false },
          { t: "Tiêm thêm insulin", ok: false },
          { t: "Để nằm nghỉ, không cần gì", ok: false }
        ],
        wrongMsg: "Còn tỉnh: cho đường nhanh ngay. Tiêm insulin sẽ tụt đường nguy hiểm hơn."
      },
      {
        q: "Thứ nào KHÔNG dùng để nâng đường nhanh?",
        options: [
          { t: "Nước ngọt 'ăn kiêng' không đường", ok: true },
          { t: "Nước ngọt thường", ok: false },
          { t: "Kẹo/viên glucose", ok: false },
          { t: "Nước trái cây", ok: false }
        ],
        wrongMsg: "Đồ 'không đường/ăn kiêng' vô tác dụng. Cần đường thật: nước ngọt thường, kẹo, nước trái cây."
      },
      {
        q: "Người hạ đường huyết bất tỉnh. Làm gì?",
        options: [
          { t: "Không cho gì vào miệng, đặt nằm nghiêng, gọi 115", ok: true },
          { t: "Đổ nước đường vào miệng", ok: false },
          { t: "Nhét kẹo vào má", ok: false },
          { t: "Tát cho tỉnh rồi cho ăn", ok: false }
        ],
        wrongMsg: "Bất tỉnh mà cho ăn/uống dễ sặc, ngạt. Đặt nằm nghiêng an toàn & gọi 115."
      }
    ],
    heatstroke: [
      {
        q: "🥵 Trời nắng gắt, người bạn lả đi, da nóng ran, lú lẫn. Việc đầu tiên?",
        options: [
          { t: "Đưa vào chỗ mát/bóng râm & gọi 115", ok: true },
          { t: "Cho uống cà phê cho tỉnh", ok: false },
          { t: "Để ngồi ngoài nắng nghỉ tí", ok: false },
          { t: "Đắp chăn cho ra mồ hôi", ok: false }
        ],
        wrongMsg: "Sốc nhiệt là cấp cứu. Đưa vào chỗ mát và gọi 115 ngay."
      },
      {
        q: "Cách làm mát đúng là?",
        options: [
          { t: "Cởi bớt đồ, lau/xịt nước mát, quạt, chườm đá ở nách/bẹn/cổ", ok: true },
          { t: "Quấn kín chăn cho toát mồ hôi", ok: false },
          { t: "Cho uống rượu cho ấm người", ok: false },
          { t: "Phơi tiếp ngoài nắng", ok: false }
        ],
        wrongMsg: "Làm mát tích cực: cởi đồ, nước mát + quạt, chườm đá ở nách/bẹn/cổ. Quấn chăn/rượu làm nặng thêm."
      },
      {
        q: "Nạn nhân sốc nhiệt còn tỉnh. Có nên cho uống nước?",
        options: [
          { t: "Tỉnh & nuốt tốt thì cho nhấp nước mát từng ít", ok: true },
          { t: "Đổ thật nhiều nước một lúc", ok: false },
          { t: "Cho uống khi đang lơ mơ/nôn", ok: false },
          { t: "Tuyệt đối không cho uống gì", ok: false }
        ],
        wrongMsg: "Còn tỉnh & nuốt tốt thì nhấp nước mát từng ít. Lơ mơ/nôn thì KHÔNG cho uống (sặc)."
      }
    ],
    poison: [
      {
        q: "☠️ Trẻ nuốt nhầm nước tẩy rửa. Việc nên làm?",
        options: [
          { t: "Gọi 115/trung tâm chống độc ngay, giữ lại vỏ chai", ok: true },
          { t: "Móc họng cho nôn ra hết", ok: false },
          { t: "Cho uống thật nhiều sữa rồi thôi", ok: false },
          { t: "Chờ xem có sao không", ok: false }
        ],
        wrongMsg: "KHÔNG tự gây nôn (hoá chất ăn mòn trào lên gây bỏng thêm). Gọi cấp cứu, mang theo vỏ chai."
      },
      {
        q: "Vì sao thường KHÔNG nên tự gây nôn khi ngộ độc?",
        options: [
          { t: "Chất ăn mòn/dầu trào lên gây hại thêm, dễ sặc vào phổi", ok: true },
          { t: "Vì nôn rất mệt", ok: false },
          { t: "Vì tốn thời gian", ok: false },
          { t: "Không có lý do, cứ gây nôn", ok: false }
        ],
        wrongMsg: "Gây nôn có thể bỏng lại thực quản hoặc sặc vào phổi. Chỉ làm khi nhân viên y tế hướng dẫn."
      },
      {
        q: "Thông tin nào quan trọng cần báo cho cấp cứu?",
        options: [
          { t: "Chất gì, lượng bao nhiêu, lúc nào, tuổi/cân nặng", ok: true },
          { t: "Màu quần áo nạn nhân", ok: false },
          { t: "Không cần gì", ok: false },
          { t: "Chỉ cần nói 'ngộ độc'", ok: false }
        ],
        wrongMsg: "Cho biết chất gì, bao nhiêu, khi nào, tuổi/cân nặng — giúp xử trí đúng. Mang theo vỏ bao bì."
      }
    ],
    infant_choke: [
      {
        q: "🍼 Bé 6 tháng tuổi hóc, mặt tím, không khóc được. Làm gì?",
        options: [
          { t: "Úp sấp trên cẳng tay, vỗ lưng 5 lần giữa hai bả vai", ok: true },
          { t: "Đẩy bụng (Heimlich) như người lớn", ok: false },
          { t: "Móc họng mò dị vật", ok: false },
          { t: "Dốc ngược lắc mạnh", ok: false }
        ],
        wrongMsg: "TUYỆT ĐỐI không đẩy bụng cho trẻ sơ sinh (dễ tổn thương nội tạng). Bắt đầu bằng vỗ lưng."
      },
      {
        q: "Vỗ lưng 5 lần chưa ra. Bước tiếp theo cho bé sơ sinh?",
        options: [
          { t: "Lật ngửa, ấn ngực 5 lần bằng 2 ngón", ok: true },
          { t: "Đẩy bụng 5 lần", ok: false },
          { t: "Cho bú nước cho trôi", ok: false },
          { t: "Vác chạy đi viện ngay, không làm gì", ok: false }
        ],
        wrongMsg: "Trẻ sơ sinh: xen kẽ 5 vỗ lưng và 5 ẤN NGỰC (2 ngón giữa ngực), không đẩy bụng."
      },
      {
        q: "Đang sơ cứu thì bé lịm đi, bất tỉnh. Làm gì?",
        options: [
          { t: "Gọi 115 & bắt đầu CPR cho trẻ sơ sinh", ok: true },
          { t: "Tiếp tục vỗ lưng mãi", ok: false },
          { t: "Lay gọi cho tỉnh rồi chờ", ok: false },
          { t: "Cho uống siro ho", ok: false }
        ],
        wrongMsg: "Bé bất tỉnh: gọi 115 và CPR ngay (ép ngực bằng 2 ngón cái, sâu ~4cm, nhịp 100–120)."
      }
    ],
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

  const QUIZZES_EN = {
    stroke: [
      {
        q: "👴 An elderly man suddenly has a drooping face, one weak arm, slurred speech. Think of?",
        options: [
          { t: "Stroke — call emergency now", ok: true },
          { t: "Just 'caught a chill', scrape the skin", ok: false },
          { t: "Normal tiredness, let him rest", ok: false },
          { t: "Hunger, feed him porridge", ok: false }
        ],
        wrongMsg: "Face droop + weak arm + slurred speech = stroke signs (FAST). Waiting wastes the 'golden hour'."
      },
      {
        q: "The quick FAST check looks at what?",
        options: [
          { t: "Face (droop), Arm (weak), Speech (slurred), Time", ok: true },
          { t: "Eyes, Nose, Mouth, Ears", ok: false },
          { t: "Pulse, blood pressure, blood sugar", ok: false },
          { t: "Just ask if they're in pain", ok: false }
        ],
        wrongMsg: "FAST = Face, Arm, Speech, Time (time to call emergency)."
      },
      {
        q: "While waiting for the ambulance, what should you do?",
        options: [
          { t: "Rest with head slightly raised, note onset time, no food/drink", ok: true },
          { t: "Give blood-pressure pills right away", ok: false },
          { t: "Give food and drink for energy", ok: false },
          { t: "Press pressure points, scrape the skin", ok: false }
        ],
        wrongMsg: "No food/drink (choking risk if swallowing is impaired). Keep still, note onset time, call emergency."
      }
    ],
    hypo: [
      {
        q: "🍬 A diabetic suddenly gets shaky, sweaty, confused but still conscious. Do what?",
        options: [
          { t: "Give fast-acting sugar (regular soda, candy)", ok: true },
          { t: "Make them drink lots of plain water", ok: false },
          { t: "Inject more insulin", ok: false },
          { t: "Just let them rest, do nothing", ok: false }
        ],
        wrongMsg: "Conscious: give fast sugar now. Insulin would drop their sugar even more dangerously."
      },
      {
        q: "Which is NOT used to raise blood sugar fast?",
        options: [
          { t: "Sugar-free 'diet' soda", ok: true },
          { t: "Regular soda", ok: false },
          { t: "Candy / glucose tablets", ok: false },
          { t: "Fruit juice", ok: false }
        ],
        wrongMsg: "'Diet/sugar-free' is useless here. You need real sugar: regular soda, candy, juice."
      },
      {
        q: "A person with low blood sugar is unconscious. Do what?",
        options: [
          { t: "Nothing in the mouth, recovery position, call emergency", ok: true },
          { t: "Pour sugar water into their mouth", ok: false },
          { t: "Tuck candy into their cheek", ok: false },
          { t: "Slap them awake then feed them", ok: false }
        ],
        wrongMsg: "Feeding an unconscious person risks choking. Recovery position & call emergency."
      }
    ],
    heatstroke: [
      {
        q: "🥵 Blazing sun, your friend collapses, skin hot, confused. First thing?",
        options: [
          { t: "Move to a cool/shaded place & call emergency", ok: true },
          { t: "Give coffee to wake them up", ok: false },
          { t: "Let them rest out in the sun", ok: false },
          { t: "Wrap in a blanket to sweat it out", ok: false }
        ],
        wrongMsg: "Heat stroke is an emergency. Move to a cool place and call emergency now."
      },
      {
        q: "The correct way to cool them?",
        options: [
          { t: "Remove clothing, cool water + fan, ice packs to armpits/groin/neck", ok: true },
          { t: "Wrap tightly in a blanket to sweat", ok: false },
          { t: "Give alcohol to warm up", ok: false },
          { t: "Keep them out in the sun", ok: false }
        ],
        wrongMsg: "Cool aggressively: remove clothing, cool water + fan, ice packs to armpits/groin/neck. Blankets/alcohol make it worse."
      },
      {
        q: "The heat-stroke victim is still conscious. Give water?",
        options: [
          { t: "Conscious & swallowing well: small sips of cool water", ok: true },
          { t: "Pour in lots of water at once", ok: false },
          { t: "Give water while drowsy/vomiting", ok: false },
          { t: "Never give any water", ok: false }
        ],
        wrongMsg: "If conscious & swallowing well, small sips of cool water. Drowsy/vomiting = NO drink (choking)."
      }
    ],
    poison: [
      {
        q: "☠️ A child swallowed cleaning fluid. What to do?",
        options: [
          { t: "Call emergency/poison control now, keep the bottle", ok: true },
          { t: "Make them vomit it all out", ok: false },
          { t: "Just give lots of milk and stop there", ok: false },
          { t: "Wait and see if anything happens", ok: false }
        ],
        wrongMsg: "Do NOT induce vomiting (corrosive coming back up burns again). Call emergency, bring the bottle."
      },
      {
        q: "Why usually NOT induce vomiting in poisoning?",
        options: [
          { t: "Corrosives/oils coming up cause more harm, can be inhaled", ok: true },
          { t: "Because vomiting is tiring", ok: false },
          { t: "Because it wastes time", ok: false },
          { t: "No reason, just induce it", ok: false }
        ],
        wrongMsg: "Vomiting can re-burn the throat or be inhaled into the lungs. Only do it if a medical pro tells you to."
      },
      {
        q: "What info matters most for emergency services?",
        options: [
          { t: "What substance, how much, when, age/weight", ok: true },
          { t: "The victim's clothing color", ok: false },
          { t: "Nothing needed", ok: false },
          { t: "Just say 'poisoning'", ok: false }
        ],
        wrongMsg: "Tell them what, how much, when, age/weight — it guides treatment. Bring the packaging."
      }
    ],
    infant_choke: [
      {
        q: "🍼 A 6-month-old is choking, turning blue, can't cry. What do you do?",
        options: [
          { t: "Face-down on your forearm, 5 back blows between the shoulder blades", ok: true },
          { t: "Abdominal thrusts (Heimlich) like an adult", ok: false },
          { t: "Sweep blindly in the mouth for the object", ok: false },
          { t: "Hold upside down and shake hard", ok: false }
        ],
        wrongMsg: "NEVER do abdominal thrusts on an infant (organ injury risk). Start with back blows."
      },
      {
        q: "5 back blows didn't work. Next step for an infant?",
        options: [
          { t: "Turn face-up, 5 chest thrusts with 2 fingers", ok: true },
          { t: "5 abdominal thrusts", ok: false },
          { t: "Feed water to wash it down", ok: false },
          { t: "Just run to hospital, do nothing", ok: false }
        ],
        wrongMsg: "Infant: alternate 5 back blows and 5 CHEST thrusts (2 fingers, center of chest), no abdominal thrusts."
      },
      {
        q: "During first aid the baby goes limp, unconscious. What now?",
        options: [
          { t: "Call emergency & start infant CPR", ok: true },
          { t: "Keep doing back blows forever", ok: false },
          { t: "Shake to wake them, then wait", ok: false },
          { t: "Give cough syrup", ok: false }
        ],
        wrongMsg: "Unconscious infant: call emergency and start CPR (two thumbs, ~4cm deep, 100–120/min)."
      }
    ],
    drown: [
      {
        q: "🌊 You see someone struggling in the water. FIRST thing?",
        options: [
          { t: "Shout for help, throw a float/rope to grab", ok: true },
          { t: "Jump straight in to save them", ok: false },
          { t: "Film a video to alert family", ok: false },
          { t: "Watch to see if they can swim out", ok: false }
        ],
        wrongMsg: "Jumping in untrained = a second victim. Prioritize reach/throw rescue & call lifeguards."
      },
      {
        q: "You get them to shore, unconscious and not breathing. Do what?",
        options: [
          { t: "Call emergency & start CPR", ok: true },
          { t: "Hold them upside down to drain water", ok: false },
          { t: "Roll them back and forth to wake up", ok: false },
          { t: "Give them ginger tea", ok: false }
        ],
        wrongMsg: "Draining water is a myth and delays care. Not breathing = CPR now + call emergency."
      },
      {
        q: "Victim is breathing but drowsy. Best position?",
        options: [
          { t: "Recovery position (on their side), keep warm", ok: true },
          { t: "Sit them up to eat and drink", ok: false },
          { t: "Face-down flat", ok: false },
          { t: "Leave them to sleep", ok: false }
        ],
        wrongMsg: "The recovery position prevents choking if they vomit. Keep monitoring & keep them warm."
      }
    ],
    electric: [
      {
        q: "⚡ Someone is shocked and still touching the wire. FIRST?",
        options: [
          { t: "Switch off the breaker / power source", ok: true },
          { t: "Pull their arm away right now", ok: false },
          { t: "Splash water to free them", ok: false },
          { t: "Shout their name", ok: false }
        ],
        wrongMsg: "Touching/splashing while live = you get shocked too. CUT THE POWER first!"
      },
      {
        q: "Can't cut power immediately. How to separate the victim?",
        options: [
          { t: "Use a dry, non-conductive object (wood, plastic) to push the wire away", ok: true },
          { t: "Pull with bare hands", ok: false },
          { t: "Use a metal rod to push", ok: false },
          { t: "Stand in a puddle and pull", ok: false }
        ],
        wrongMsg: "Only use a DRY, insulating object. Metal/water both conduct electricity — very dangerous."
      },
      {
        q: "It's safe now, victim unconscious and not breathing. Do what?",
        options: [
          { t: "Call emergency & CPR now", ok: true },
          { t: "Rub oil on the electrical burn", ok: false },
          { t: "Give them water", ok: false },
          { t: "Wait for them to wake up", ok: false }
        ],
        wrongMsg: "Electric shock can stop the heart. Not breathing = CPR now + call emergency."
      }
    ],
    seizure: [
      {
        q: "🌀 Someone suddenly convulses and falls. What do you do?",
        options: [
          { t: "Clear hard/dangerous objects around them", ok: true },
          { t: "Hold their limbs down to stop the shaking", ok: false },
          { t: "Put a towel/spoon in their mouth", ok: false },
          { t: "Slap them awake", ok: false }
        ],
        wrongMsg: "Do NOT restrain, do NOT put anything in the mouth (broken teeth, choking). Just protect from impact."
      },
      {
        q: "During the seizure, what about their head?",
        options: [
          { t: "Cushion something soft under the head", ok: true },
          { t: "Lift the head up high", ok: false },
          { t: "Press the head to the floor", ok: false },
          { t: "Shake the head to wake them", ok: false }
        ],
        wrongMsg: "Cushion under the head to avoid injury. Don't press, don't shake."
      },
      {
        q: "When MUST you call emergency for a seizure?",
        options: [
          { t: "Lasts over 5 minutes or repeats back-to-back", ok: true },
          { t: "Only if they ask you to", ok: false },
          { t: "Never needed", ok: false },
          { t: "After filming enough clips", ok: false }
        ],
        wrongMsg: "Over 5 min, repeated, first-ever or with injury -> call emergency. Time the seizure!"
      }
    ],
    anaphylaxis: [
      {
        q: "🐝 Bee sting, face swelling fast, rapid trouble breathing. This is?",
        options: [
          { t: "Anaphylaxis — a medical emergency", ok: true },
          { t: "A common cold", ok: false },
          { t: "Just itching, rub some balm", ok: false },
          { t: "Hunger", ok: false }
        ],
        wrongMsg: "Facial swelling + breathing trouble after an allergen = anaphylaxis, can kill fast."
      },
      {
        q: "An adrenaline auto-injector (EpiPen) is available. Do what?",
        options: [
          { t: "Inject into the outer thigh & call emergency", ok: true },
          { t: "Wait to see if it gets better", ok: false },
          { t: "Give sugar water", ok: false },
          { t: "Inject into the buttock", ok: false }
        ],
        wrongMsg: "Adrenaline IM in the outer thigh is life-saving. Inject now, then call emergency."
      },
      {
        q: "While waiting for the ambulance, how should they lie?",
        options: [
          { t: "On their back, legs raised (sit up if breathing is hard)", ok: true },
          { t: "Stand up and walk it off", ok: false },
          { t: "Face-down", ok: false },
          { t: "Squatting", ok: false }
        ],
        wrongMsg: "Lying with legs raised supports circulation; if breathing is hard, let them sit. Never let them stand/walk suddenly."
      }
    ],
    fracture: [
      {
        q: "🦴 You fall, your shin is deformed and very painful. You should?",
        options: [
          { t: "Immobilize as-is, avoid extra movement", ok: true },
          { t: "Pull it straight again", ok: false },
          { t: "Stand up and test it", ok: false },
          { t: "Massage to ease the pain", ok: false }
        ],
        wrongMsg: "NEVER realign a bone — it can damage vessels and nerves. Immobilize as found."
      },
      {
        q: "Splinting a fracture — how far should the splint reach?",
        options: [
          { t: "Across the joints above & below the break", ok: true },
          { t: "Just at the break point", ok: false },
          { t: "Tie it super tight for rigidity", ok: false },
          { t: "No need to immobilize", ok: false }
        ],
        wrongMsg: "A splint must immobilize the joint above and below the break, tied snugly (not too tight)."
      },
      {
        q: "There's an open wound with bone showing. Do what?",
        options: [
          { t: "Cover with clean gauze, don't push the bone in", ok: true },
          { t: "Push the bone back in", ok: false },
          { t: "Scrub hard with alcohol", ok: false },
          { t: "Leave it open to air", ok: false }
        ],
        wrongMsg: "Don't push the bone back. Cover with clean gauze, gently control bleeding, get to hospital."
      }
    ],
    snakebite: [
      {
        q: "🐍 Bitten by a snake on the leg. The right thing to do is?",
        options: [
          { t: "Keep still, keep the leg level/below heart, go to hospital", ok: true },
          { t: "Cut the bite and squeeze venom out", ok: false },
          { t: "Suck the venom out by mouth", ok: false },
          { t: "Tie a very tight tourniquet above it", ok: false }
        ],
        wrongMsg: "Cutting/sucking/tight tourniquet all cause harm. Stay still to slow venom, get to hospital now."
      },
      {
        q: "Why keep the victim STILL?",
        options: [
          { t: "Movement spreads venom faster", ok: true },
          { t: "To save energy", ok: false },
          { t: "To pass the time", ok: false },
          { t: "No reason", ok: false }
        ],
        wrongMsg: "Movement pumps venom through lymph/blood faster. Keep still & immobilize the limb."
      },
      {
        q: "What info is USEFUL for the doctor?",
        options: [
          { t: "The snake's look/color (if safe to note)", ok: true },
          { t: "Catch the snake by hand to bring along", ok: false },
          { t: "Chase the snake for revenge", ok: false },
          { t: "Nothing needed", ok: false }
        ],
        wrongMsg: "Remembering the snake's appearance helps pick antivenom, but NEVER risk catching it."
      }
    ]
  };

  function initQuiz(lv) {
    const qs = (LANG === "en" && QUIZZES_EN[lv.id]) ? QUIZZES_EN[lv.id] : QUIZZES[lv.id];
    let idx = 0, hp = 100, alive = true;
    stage.innerHTML = `<div class="character" id="char">${lv.char}</div>`;
    const charEl = document.getElementById("char");

    function render() {
      if (idx >= qs.length) {
        alive = false;
        charEl.classList.add("win");
        const stars = hp >= 100 ? 3 : hp >= 60 ? 2 : 1;
        const msg = LANG === "en" ? `${hp} HP left. Textbook handling!` : `Còn ${hp} HP. Xử lý chuẩn bài!`;
        setTimeout(() => showResult(lv, true, stars, msg), 500);
        return;
      }
      const item = qs[idx];
      instr.textContent = `${t(UI.q_label)} ${idx + 1}/${qs.length}`;
      controls.innerHTML = `<div style="text-align:center;font-weight:700;font-size:16px;margin-bottom:6px">${item.q}</div>`;
      const grid = document.createElement("div");
      grid.className = "choice-grid";
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
        floatText(t(UI.correct), "#3ddc97");
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
    stroke: {
      title: "🧠 Đột quỵ",
      steps: [
        "Nhận biết bằng FAST. Mặt: có méo một bên không?",
        "Tay: nhờ giơ hai tay, có tay nào yếu rơi xuống không?",
        "Lời nói: nhờ nói một câu, có bị đớ hay khó hiểu không?",
        "Có bất kỳ dấu hiệu nào: gọi một một năm ngay.",
        "Ghi lại thời điểm bắt đầu có triệu chứng.",
        "Cho nằm nghỉ, đầu và vai hơi nâng cao. Trấn an họ.",
        "Không cho ăn, uống hay dùng thuốc gì.",
        "Theo dõi nhịp thở đến khi cấp cứu tới."
      ]
    },
    hypo: {
      title: "🍬 Hạ đường huyết",
      steps: [
        "Dấu hiệu: run, vã mồ hôi, da tái, lú lẫn, đói cồn cào.",
        "Còn tỉnh và nuốt được: cho uống nước đường hoặc ăn kẹo, bánh ngọt.",
        "Dùng đường thật, không dùng đồ ăn kiêng không đường.",
        "Chờ mười lăm phút. Chưa đỡ thì cho thêm một lần nữa.",
        "Đỡ rồi cho ăn thêm bữa có tinh bột.",
        "Nếu bất tỉnh: không cho gì vào miệng.",
        "Đặt nằm nghiêng an toàn và gọi một một năm."
      ]
    },
    heatstroke: {
      title: "🥵 Sốc nhiệt / say nắng",
      steps: [
        "Đưa nạn nhân vào chỗ mát, bóng râm hoặc phòng có điều hoà.",
        "Gọi một một năm. Sốc nhiệt là cấp cứu.",
        "Cởi bớt quần áo ngoài.",
        "Làm mát nhanh: lau nước mát, quạt, chườm đá ở nách, bẹn, cổ.",
        "Còn tỉnh và nuốt tốt thì cho nhấp nước mát từng ngụm nhỏ.",
        "Lơ mơ, nôn hoặc bất tỉnh thì không cho uống.",
        "Bất tỉnh: đặt nằm nghiêng, theo dõi thở đến khi cấp cứu tới."
      ]
    },
    poison: {
      title: "☠️ Ngộ độc",
      steps: [
        "Đưa nạn nhân tránh xa nguồn độc. Đảm bảo an toàn cho bạn.",
        "Gọi một một năm hoặc trung tâm chống độc ngay.",
        "Không tự gây nôn trừ khi được nhân viên y tế hướng dẫn.",
        "Giữ lại bao bì, chai lọ hoặc mẫu chất nghi ngộ độc.",
        "Nếu dính da hoặc mắt: rửa nhiều nước sạch.",
        "Bất tỉnh nhưng còn thở: đặt nằm nghiêng an toàn.",
        "Ngừng thở: bắt đầu ép tim. Báo cấp cứu chất gì, bao nhiêu, khi nào."
      ]
    },
    infant_cpr: {
      title: "👶 CPR cho trẻ sơ sinh (<1 tuổi)",
      metronome: true,
      steps: [
        "Kiểm tra phản ứng: búng nhẹ vào gan bàn chân bé. Không phản ứng.",
        "Nhờ người gọi một một năm ngay. Đặt bé nằm ngửa trên mặt phẳng cứng.",
        "Đặt hai ngón cái lên giữa ngực, ngay dưới đường nối hai núm vú.",
        "Ép xuống sâu khoảng bốn centimet, theo nhịp đang đếm.",
        "Ép ba mươi cái, rồi thổi nhẹ hai hơi nếu biết.",
        "Thổi nhẹ thôi, vừa đủ thấy ngực bé nhô lên.",
        "Tiếp tục ba mươi ép hai thổi cho đến khi cấp cứu tới."
      ]
    },
    infant_choke: {
      title: "🍼 Trẻ sơ sinh hóc dị vật",
      steps: [
        "Bé không khóc, không ho, tím tái: bắt đầu sơ cứu ngay.",
        "Úp bé sấp dọc theo cẳng tay, đầu thấp hơn thân, đỡ lấy hàm.",
        "Vỗ năm cái vào giữa hai bả vai bằng gót bàn tay.",
        "Chưa ra: lật bé nằm ngửa.",
        "Ấn ngực năm lần bằng hai ngón, giữa ngực, dứt khoát.",
        "Tuyệt đối không đẩy bụng cho trẻ sơ sinh.",
        "Xen kẽ năm vỗ lưng và năm ấn ngực. Bé lịm đi thì gọi một một năm và bắt đầu ép tim."
      ]
    },
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
        "Hỏi: bạn có bị nghẹn không? Nếu còn ho được, khuyến khích họ ho thật mạnh.",
        "Không ho, không nói, không thở được: gọi một một năm ngay.",
        "Đứng sau, cho người hơi cúi về trước. Vỗ năm cái dứt khoát vào giữa hai bả vai bằng gót bàn tay.",
        "Chưa ra: chuyển sang đẩy bụng. Vòng hai tay ôm quanh bụng, trên rốn.",
        "Một tay nắm đấm, tay kia nắm lấy, đẩy mạnh vào trong và lên trên năm lần.",
        "Xen kẽ năm lần vỗ lưng và năm lần đẩy bụng cho đến khi dị vật bật ra.",
        "Nếu họ bất tỉnh, đặt nằm xuống, gọi một một năm và bắt đầu ép tim."
      ]
    },
    burn: {
      title: "🔥 Bỏng",
      steps: [
        "Đưa nạn nhân tránh xa nguồn gây bỏng.",
        "Xả vết bỏng dưới nước mát trong ít nhất hai mươi phút.",
        "Không dùng đá, kem đánh răng, bơ hay nước mắm.",
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
        "Giữ vùng bị cắn bất động, để ngang hoặc thấp hơn tim.",
        "Tháo nhẫn, vòng, đồ chật quanh chỗ cắn trước khi sưng.",
        "Không rạch, không hút nọc, không garô chặt, không chườm đá.",
        "Nhớ đặc điểm con rắn nếu an toàn, nhưng đừng bắt nó.",
        "Đưa đến viện càng nhanh càng tốt. Gọi một một năm."
      ]
    }
  };

  const PANIC_EN = {
    stroke: {
      title: "🧠 Stroke",
      steps: [
        "Use FAST. Face: is one side drooping?",
        "Arms: ask them to raise both arms, does one drift down?",
        "Speech: ask them to say a sentence, is it slurred or confused?",
        "Any of these signs: call emergency services now.",
        "Note the time the symptoms started.",
        "Let them rest with head and shoulders slightly raised. Reassure them.",
        "Do not give any food, drink, or medication.",
        "Watch their breathing until help arrives."
      ]
    },
    hypo: {
      title: "🍬 Low blood sugar",
      steps: [
        "Signs: shaking, sweating, pale skin, confusion, intense hunger.",
        "Conscious and able to swallow: give a sugary drink or candy/sweets.",
        "Use real sugar, not sugar-free 'diet' products.",
        "Wait fifteen minutes. If no better, give another dose.",
        "Once better, give a snack with starch.",
        "If unconscious: put nothing in the mouth.",
        "Place in the recovery position and call emergency services."
      ]
    },
    heatstroke: {
      title: "🥵 Heat stroke",
      steps: [
        "Move the person to a cool, shaded or air-conditioned place.",
        "Call emergency services. Heat stroke is an emergency.",
        "Remove excess outer clothing.",
        "Cool quickly: cool water, fan, ice packs to armpits, groin, neck.",
        "If conscious and swallowing well, give small sips of cool water.",
        "If drowsy, vomiting or unconscious, give no drink.",
        "If unconscious: recovery position, watch breathing until help arrives."
      ]
    },
    poison: {
      title: "☠️ Poisoning",
      steps: [
        "Move the person away from the poison. Keep yourself safe.",
        "Call emergency services or poison control now.",
        "Do not induce vomiting unless a medical professional tells you to.",
        "Keep the packaging, bottle, or a sample of the suspected substance.",
        "If on skin or eyes: rinse with plenty of clean water.",
        "Unconscious but breathing: place in the recovery position.",
        "Not breathing: start CPR. Tell responders what, how much, when."
      ]
    },
    infant_cpr: {
      title: "👶 Infant CPR (under 1 year)",
      metronome: true,
      steps: [
        "Check response: flick the sole of the baby's foot. No response.",
        "Have someone call emergency services now. Place the baby on a firm flat surface.",
        "Place two thumbs on the center of the chest, just below the nipple line.",
        "Press down about four centimeters, in time with the beat.",
        "Give thirty compressions, then two gentle breaths if you can.",
        "Breathe gently, just enough to see the chest rise.",
        "Continue thirty compressions and two breaths until help arrives."
      ]
    },
    infant_choke: {
      title: "🍼 Infant choking",
      steps: [
        "Baby can't cry, cough, or breathe, turning blue: start first aid now.",
        "Lay the baby face-down along your forearm, head lower than body, support the jaw.",
        "Give five back blows between the shoulder blades with the heel of your hand.",
        "Not out yet: turn the baby face-up.",
        "Give five chest thrusts with two fingers, center of the chest, firm.",
        "Never do abdominal thrusts on an infant.",
        "Alternate five back blows and five chest thrusts. If the baby goes limp, call emergency services and start CPR."
      ]
    },
    cpr: {
      title: "💔 Cardiac arrest / Unconscious",
      metronome: true,
      steps: [
        "Check the scene is safe. Shout: can you hear me?",
        "No response. Have someone call emergency services now.",
        "Lay the person on their back on a firm surface.",
        "Place the heel of one hand in the center of the chest, the other hand on top.",
        "Press straight down, about five centimeters, in time with the beat.",
        "Give thirty compressions without stopping.",
        "If trained, give two rescue breaths. If not, keep compressing.",
        "Continue until the ambulance arrives or the person breathes again."
      ]
    },
    choke: {
      title: "🫁 Choking",
      steps: [
        "Ask: are you choking? If they can cough, encourage hard coughing.",
        "If they can't cough, speak, or breathe: call emergency services now.",
        "Stand behind, lean them forward. Give five firm back blows between the shoulder blades.",
        "Not out yet: switch to abdominal thrusts. Wrap your arms around the upper abdomen.",
        "One fist, the other hand over it, thrust inward and upward five times.",
        "Alternate five back blows and five abdominal thrusts until it comes out.",
        "If they become unconscious, lay them down, call emergency services and start CPR."
      ]
    },
    burn: {
      title: "🔥 Burns",
      steps: [
        "Move the person away from the heat source.",
        "Cool the burn under running cool water for at least twenty minutes.",
        "Do not use ice, toothpaste, butter or sauces.",
        "Remove rings, watches, clothing around the burn before swelling.",
        "Do not pop the blisters.",
        "Cover the burn with clean, non-stick gauze.",
        "Severe, large, or facial burns: call emergency services now."
      ]
    },
    bleed: {
      title: "🩸 Severe bleeding",
      steps: [
        "Wear gloves if available. Have the person sit or lie down.",
        "Press clean gauze or cloth directly on the wound.",
        "Press firmly and continuously, don't lift to peek.",
        "Raise the injured part above heart level if possible.",
        "If blood soaks through, add more gauze, don't remove the old layer.",
        "Keep the person warm and reassure them.",
        "If bleeding won't stop: call emergency services now."
      ]
    },
    drown: {
      title: "🌊 Drowning",
      steps: [
        "Make sure you are safe first.",
        "Throw a float, rope, or pole for them to grab. Don't jump in unless you're a trained rescuer.",
        "Once on land, call emergency services now.",
        "Check whether they are breathing.",
        "Not breathing: start compressions, give rescue breaths if you can.",
        "Do not hold them upside down to drain water.",
        "Breathing but drowsy: place in the recovery position, keep warm."
      ]
    },
    electric: {
      title: "⚡ Electric shock",
      steps: [
        "Do not touch the victim while the current is on.",
        "Switch off the breaker or unplug the source now.",
        "Can't cut it: use a dry insulating object to push the wire away.",
        "Only approach once it's safe. Call emergency services.",
        "Check breathing. Not breathing: start CPR now.",
        "Look for burns where the current entered and exited.",
        "Keep monitoring until help arrives."
      ]
    },
    seizure: {
      title: "🌀 Seizure",
      steps: [
        "Stay calm. Time the seizure with a clock.",
        "Clear hard, sharp objects around the person.",
        "Cushion something soft under their head.",
        "Do not restrain their limbs.",
        "Do not put anything in their mouth.",
        "When it stops, place them in the recovery position.",
        "Over five minutes or repeated seizures: call emergency services."
      ]
    },
    anaphylaxis: {
      title: "🐝 Anaphylaxis",
      steps: [
        "Suspect anaphylaxis: swelling of face and lips, trouble breathing, hives after an allergen.",
        "If an adrenaline auto-injector is available, inject it into the outer thigh now.",
        "Call emergency services immediately.",
        "Lay them on their back with legs raised. If breathing is hard, let them sit.",
        "If vomiting, place them on their side.",
        "If still severe after five to ten minutes, a second dose may be given.",
        "Watch closely until help arrives."
      ]
    },
    fracture: {
      title: "🦴 Fracture",
      steps: [
        "Keep the person still and reassure them.",
        "Do not try to realign the bone.",
        "Immobilize with a splint, locking the joints above and below the break.",
        "Open wound: cover with clean gauze, don't push the bone in.",
        "Apply cold around the swelling to ease pain.",
        "No food or drink in case surgery is needed.",
        "Get to medical care. For major breaks or suspected spine injury, call emergency services."
      ]
    },
    snakebite: {
      title: "🐍 Snakebite",
      steps: [
        "Move the person away from the snake, keep them calm.",
        "Have them stay still, limit movement of the bitten area.",
        "Keep the bitten area immobile, level with or below the heart.",
        "Remove rings, bracelets, and tight items near the bite before swelling.",
        "Do not cut, suck venom, apply a tight tourniquet, or use ice.",
        "Note the snake's appearance if safe, but don't catch it.",
        "Get to hospital as fast as possible. Call emergency services."
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
    const data = (LANG === "en" && PANIC_EN[key]) ? PANIC_EN[key] : PANIC[key];
    if (!data) return;
    panicCtx = { data, step: 0, key };
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
                                          .replace("bốn centimet", "4cm")
                                          .replace("đánh quận răng", "đánh răng");
    document.getElementById("panic-prev").disabled = step === 0;
    document.getElementById("panic-prev").textContent = t(UI.prev);
    const next = document.getElementById("panic-next");
    next.textContent = step === data.steps.length - 1 ? t(UI.done) : t(UI.next);
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

  /* ---- Text-to-speech (đọc theo ngôn ngữ) ---- */
  let viVoice = null, enVoice = null;
  function pickVoice() {
    const voices = speechSynthesis.getVoices();
    viVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith("vi")) || null;
    enVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith("en")) || null;
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
    if (LANG === "en") {
      u.lang = "en-US";
      if (enVoice) u.voice = enVoice;
    } else {
      u.lang = "vi-VN";
      if (viVoice) u.voice = viVoice;
    }
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

  /* ---------- REMINDERS (nhắc ôn tập) ---------- */
  const REMIND_KEY = "capcuu101_reminder";
  function reminderOn() { return localStorage.getItem(REMIND_KEY) === "1"; }
  async function setReminder(on) {
    if (on) {
      if (!("Notification" in window)) { toast(LANG === "en" ? "Notifications not supported" : "Thiết bị không hỗ trợ thông báo"); return false; }
      let perm = Notification.permission;
      if (perm === "default") perm = await Notification.requestPermission();
      if (perm !== "granted") { toast(LANG === "en" ? "Permission denied" : "Chưa được cấp quyền thông báo"); return false; }
      localStorage.setItem(REMIND_KEY, "1");
      fireReminder(LANG === "en" ? "Reminders on! We'll nudge you to keep your streak. 🔥" : "Đã bật! App sẽ nhắc bạn giữ chuỗi ôn tập. 🔥");
      return true;
    }
    localStorage.setItem(REMIND_KEY, "0");
    return false;
  }
  function fireReminder(body) {
    try {
      const opts = { body, icon: "icons/icon-192.png", badge: "icons/icon-192.png", lang: LANG };
      if (navigator.serviceWorker && navigator.serviceWorker.ready) {
        navigator.serviceWorker.ready.then(reg => reg.showNotification(t(UI.reminder_title), opts)).catch(() => {
          new Notification(t(UI.reminder_title), opts);
        });
      } else {
        new Notification(t(UI.reminder_title), opts);
      }
    } catch { /* bỏ qua */ }
  }
  // Khi mở app: nếu bật nhắc + có chuỗi nhưng chưa chơi hôm nay -> nhắc
  function maybeRemind() {
    if (!reminderOn() || !("Notification" in window) || Notification.permission !== "granted") return;
    const s = loadStats();
    const today = todayStr();
    if (s.streak.last && s.streak.last !== today && daysBetween(s.streak.last, today) >= 1 && s.streak.count > 0) {
      fireReminder(t(UI.reminder_body));
    }
  }

  /* ---------- PREFERENCES (a11y + chế độ nghiêm túc) ---------- */
  const PREFS_KEY = "capcuu101_prefs";
  function loadPrefs() {
    const def = { contrast: false, large: false, reduce: false, serious: false };
    try { return Object.assign(def, JSON.parse(localStorage.getItem(PREFS_KEY)) || {}); }
    catch { return def; }
  }
  let PREFS = loadPrefs();
  function savePrefs() { localStorage.setItem(PREFS_KEY, JSON.stringify(PREFS)); }
  function applyPrefs() {
    document.body.classList.toggle("a11y-contrast", PREFS.contrast);
    document.body.classList.toggle("a11y-large", PREFS.large);
    document.body.classList.toggle("a11y-reduce", PREFS.reduce);
    document.body.classList.toggle("mode-serious", PREFS.serious);
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
    const cbRemind = document.getElementById("set-reminder");

    function sync() {
      cbSound.checked = Sfx.settings.sound;
      cbMusic.checked = Sfx.settings.music;
      cbVibe.checked = Sfx.settings.vibrate;
      if (cbRemind) cbRemind.checked = reminderOn();
    }
    open.addEventListener("click", () => { Sfx.unlock(); sync(); modal.classList.remove("hidden"); });
    close.addEventListener("click", () => modal.classList.add("hidden"));
    modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.add("hidden"); });
    cbSound.addEventListener("change", () => { Sfx.setSound(cbSound.checked); if (cbSound.checked) Sfx.correct(); });
    cbMusic.addEventListener("change", () => Sfx.setMusic(cbMusic.checked));
    cbVibe.addEventListener("change", () => { Sfx.setVibrate(cbVibe.checked); if (cbVibe.checked) Sfx.vibrate(60); });
    if (cbRemind) cbRemind.addEventListener("change", async () => {
      const ok = await setReminder(cbRemind.checked);
      cbRemind.checked = ok;
    });

    // a11y + chế độ nghiêm túc
    const prefMap = {
      "set-contrast": "contrast",
      "set-large": "large",
      "set-reduce": "reduce",
      "set-serious": "serious"
    };
    Object.entries(prefMap).forEach(([id, key]) => {
      const cb = document.getElementById(id);
      if (!cb) return;
      cb.addEventListener("change", () => {
        PREFS[key] = cb.checked;
        savePrefs();
        applyPrefs();
        if (window.Sfx) Sfx.blip();
      });
    });

    function syncPrefs() {
      Object.entries(prefMap).forEach(([id, key]) => {
        const cb = document.getElementById(id);
        if (cb) cb.checked = !!PREFS[key];
      });
    }

    const origSync = sync;
    sync = function () { origSync(); syncPrefs(); };
    sync();
  })();

  /* ---------- APPLY LANGUAGE ---------- */
  function applyLang() {
    document.body.classList.toggle("lang-en", LANG === "en");
    document.documentElement.lang = LANG;
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const k = el.dataset.i18n;
      if (UI[k]) el.textContent = t(UI[k]);
    });
    // nhãn thẻ tình huống Panic lấy từ tiêu đề dữ liệu
    document.querySelectorAll(".panic-card").forEach(card => {
      const key = card.dataset.emergency;
      const data = (LANG === "en" && PANIC_EN[key]) ? PANIC_EN[key] : PANIC[key];
      if (data) card.textContent = data.title;
    });
    // trạng thái nút chọn ngôn ngữ
    document.querySelectorAll(".lang-opt").forEach(b => {
      const on = b.dataset.lang === LANG;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    // nhãn ARIA cho nút biểu tượng
    const backLbl = LANG === "en" ? "Back" : "Quay lại";
    document.querySelectorAll(".icon-btn[data-goto]").forEach(b => b.setAttribute("aria-label", backLbl));
    const sv = document.getElementById("stop-voice");
    if (sv) sv.setAttribute("aria-label", LANG === "en" ? "Stop voice" : "Dừng đọc");
    const gear = document.getElementById("open-settings");
    if (gear) gear.setAttribute("aria-label", LANG === "en" ? "Settings" : "Cài đặt");
  }

  function setLang(lang) {
    if (lang === LANG) return;
    LANG = lang;
    localStorage.setItem("capcuu101_lang", lang);
    applyLang();
    if (current === "screen-levels") renderLevels();
    if (current === "screen-achievements") renderAchievements();
  }

  document.querySelectorAll(".lang-opt").forEach(b =>
    b.addEventListener("click", () => { setLang(b.dataset.lang); if (window.Sfx) Sfx.blip(); })
  );

  /* ---------- INIT ---------- */
  applyLang();
  applyPrefs();
  // Ẩn các màn không hiển thị khỏi trình đọc màn hình
  Object.keys(screens).forEach(id => {
    if (id !== current) screens[id].setAttribute("aria-hidden", "true");
  });
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

  // Nhắc ôn tập nếu chuỗi đang chờ nối
  setTimeout(maybeRemind, 1800);

  /* ---------- SERVICE WORKER (offline) ---------- */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch((err) =>
        console.warn("SW chưa đăng ký được:", err)
      );
    });
  }
})();
