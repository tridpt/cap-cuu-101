/* ============================================================
   Sfx — âm thanh & rung cho Cấp Cứu 101 (Web Audio API)
   Tự tổng hợp, không cần file âm thanh -> chạy offline.
   Lộ ra window.Sfx
   ============================================================ */
(() => {
  "use strict";

  const SETTINGS_KEY = "capcuu101_settings";
  const settings = loadSettings();

  function loadSettings() {
    try {
      return Object.assign(
        { sound: true, music: false, vibrate: true },
        JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {}
      );
    } catch {
      return { sound: true, music: false, vibrate: true };
    }
  }
  function saveSettings() {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }

  let ctx = null;
  let master = null;

  function ensure() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.9;
      master.connect(ctx.destination);
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  // một nốt đơn
  function tone(freq, start, dur, type = "square", vol = 0.2) {
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);
    g.gain.setValueAtTime(0, start);
    g.gain.linearRampToValueAtTime(vol, start + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    osc.connect(g);
    g.connect(master);
    osc.start(start);
    osc.stop(start + dur + 0.02);
  }

  function play(seq) {
    if (!settings.sound || !ensure()) return;
    const t0 = ctx.currentTime;
    seq.forEach(n =>
      tone(n.f, t0 + (n.t || 0), n.d || 0.12, n.type || "square", n.v || 0.2)
    );
  }

  /* ---------- HIỆU ỨNG ---------- */
  const Sfx = {
    settings,
    saveSettings,

    // gọi trong sự kiện chạm đầu tiên để "mở khoá" audio
    unlock() { ensure(); },

    tick() { play([{ f: 1000, d: 0.05, type: "square", v: 0.15 }]); },

    correct() {
      play([
        { f: 660, t: 0, d: 0.1, type: "triangle", v: 0.25 },
        { f: 990, t: 0.08, d: 0.14, type: "triangle", v: 0.25 }
      ]);
    },

    wrong() {
      play([
        { f: 200, t: 0, d: 0.18, type: "sawtooth", v: 0.25 },
        { f: 150, t: 0.12, d: 0.22, type: "sawtooth", v: 0.25 }
      ]);
    },

    // "đăng xuất khỏi cuộc đời" — kèn buồn tụt dốc
    logout() {
      play([
        { f: 400, t: 0, d: 0.2, type: "sawtooth", v: 0.25 },
        { f: 330, t: 0.18, d: 0.2, type: "sawtooth", v: 0.25 },
        { f: 262, t: 0.36, d: 0.22, type: "sawtooth", v: 0.25 },
        { f: 196, t: 0.54, d: 0.5, type: "sawtooth", v: 0.28 }
      ]);
    },

    // fanfare thắng
    win() {
      play([
        { f: 523, t: 0, d: 0.12, v: 0.22 },
        { f: 659, t: 0.12, d: 0.12, v: 0.22 },
        { f: 784, t: 0.24, d: 0.12, v: 0.22 },
        { f: 1047, t: 0.36, d: 0.3, v: 0.25 }
      ]);
    },

    blip() { play([{ f: 520, d: 0.06, type: "square", v: 0.15 }]); },

    vibrate(pattern) {
      if (settings.vibrate && navigator.vibrate) navigator.vibrate(pattern);
    },

    /* ---------- NHẠC NỀN 8-BIT ---------- */
    _bgmTimer: null,
    _bgmStep: 0,
    startMusic() {
      if (!settings.music || !ensure() || this._bgmTimer) return;
      // giai điệu vòng lặp vui nhộn (C major-ish), mỗi bước 1 nốt
      const melody = [523, 659, 784, 659, 587, 698, 880, 698,
                      523, 659, 784, 1047, 988, 784, 659, 523];
      const bass =   [131, 0, 196, 0, 147, 0, 175, 0,
                      131, 0, 196, 0, 165, 0, 196, 0];
      const stepMs = 230;
      this._bgmStep = 0;
      const tickFn = () => {
        if (!ctx) return;
        const t = ctx.currentTime;
        const i = this._bgmStep % melody.length;
        if (melody[i]) tone(melody[i], t, stepMs / 1000 * 0.9, "square", 0.07);
        if (bass[i]) tone(bass[i], t, stepMs / 1000 * 0.9, "triangle", 0.09);
        this._bgmStep++;
      };
      tickFn();
      this._bgmTimer = setInterval(tickFn, stepMs);
    },
    stopMusic() {
      if (this._bgmTimer) { clearInterval(this._bgmTimer); this._bgmTimer = null; }
    },

    setSound(on) { settings.sound = on; saveSettings(); },
    setMusic(on) {
      settings.music = on; saveSettings();
      if (on) { ensure(); this.startMusic(); } else this.stopMusic();
    },
    setVibrate(on) { settings.vibrate = on; saveSettings(); }
  };

  window.Sfx = Sfx;
})();
