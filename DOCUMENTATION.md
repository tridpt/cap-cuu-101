# Tài liệu kỹ thuật — Cấp Cứu 101

Mô tả kiến trúc, cấu trúc mã, mô hình dữ liệu, các luồng xử lý và cách mở rộng. Dành cho người phát triển/bảo trì.

> Tài liệu liên quan: `README.md` (tổng quan + chạy nhanh), `FEATURES.md` (danh sách tính năng), `CONTRIBUTING.md` (quy ước đóng góp), `MEDICAL_REVIEW.md` (checklist rà soát y tế).

---

## 1. Tổng quan

**Cấp Cứu 101** là web app tĩnh dạy sơ cứu qua mini-game + cung cấp công cụ khẩn cấp dùng thật.

- **Không backend, không framework, không thư viện ngoài, không build step.** Mở `index.html` là chạy.
- **Offline 100%** qua service worker (mọi asset là cục bộ).
- **PWA**: cài được, có shortcut.
- **Song ngữ** VI/EN bằng cơ chế i18n nội bộ.
- Âm thanh tự tổng hợp bằng Web Audio (không file media).

**Quy mô:** ~4.200 dòng — `app.js` ~2.980, `style.css` ~590, `sound.js` ~150, `index.html` ~390, `sw.js` ~80.

### Sơ đồ kiến trúc (mức cao)
```
                ┌──────────────────────── Trình duyệt ────────────────────────┐
  index.html ──▶│  DOM tĩnh (10 <section>.screen) + data-i18n                  │
  sound.js  ───▶│  window.Sfx  (Web Audio: tick/correct/wrong/win/bgm + rung) │
  app.js    ───▶│  IIFE: UI dict + data + go()/render + engine game + Panic   │
  style.css ───▶│  theme tối, .screen chuyển màn, a11y, responsive            │
                │            │              │               │                  │
                │            ▼              ▼               ▼                  │
                │      localStorage   Web Speech (TTS)   Web APIs              │
                │      (sao, stats,   + voice picker     (Vibration,           │
                │       prefs, thẻ)                       Notifications,       │
                │                                         DeviceOrientation,   │
                │                                         Web Share, Canvas)   │
                └───────────────┬──────────────────────────────────────────────┘
                                ▼
                          sw.js (precache app shell → offline)
```
**Không có yêu cầu mạng ra ngoài.** (Các link Nguồn tham khảo chỉ mở tab mới khi user bấm.)

---

## 2. Cấu trúc thư mục
```
cap-cuu-101/
├── index.html        # Khung HTML + 10 màn (section.screen) + overlay splash/tutorial/settings
├── sound.js          # window.Sfx — Web Audio synth + cài đặt âm thanh (nạp TRƯỚC app.js)
├── app.js            # Toàn bộ logic: i18n, điều hướng, dữ liệu nội dung, engine game, Panic, công cụ
├── style.css         # Toàn bộ CSS (biến theme, animation, a11y, responsive)
├── sw.js             # Service worker (precache app shell, offline)
├── manifest.json     # PWA manifest (icon, shortcuts panic/tools, screenshots)
├── icon.svg, icons/  # Icon ứng dụng (192/512 PNG + SVG)
├── screenshots/      # home.png, game.png (manifest) + og.png (link preview)
├── gen_icons.py      # (dev, Pillow) sinh icon PNG
├── gen_screens.py    # (dev, Pillow) sinh screenshot manifest
├── gen_og.py         # (dev, Pillow) sinh ảnh Open Graph 1200×630
├── MEDICAL_REVIEW.md # checklist rà soát nội dung y tế
├── LICENSE           # MIT + disclaimer y tế
└── *.md              # README, FEATURES, DOCUMENTATION, CONTRIBUTING
```
`index.html` nạp `sound.js` rồi `app.js`. `app.js` bọc toàn bộ trong một IIFE `(() => { "use strict"; ... })()`. `sound.js` lộ ra `window.Sfx`.

---

## 3. Khởi động (init flow, cuối app.js)
1. Định nghĩa `UI` (từ điển i18n) + `t()` (hàm dịch).
2. Thu thập `screens` từ `.screen`, gắn sự kiện cho mọi `[data-goto]`.
3. Định nghĩa dữ liệu & hàm: stats/badges, `LEVELS`, render, engine game, `QUIZZES(_EN)`, `PANIC(_EN)`, TTS, metronome, công cụ khẩn cấp, handbook, settings, applyLang/applyPrefs.
4. `applyLang()` + `applyPrefs()` — áp ngôn ngữ & tùy chọn lên `<body>`.
5. Đặt `aria-hidden` cho mọi màn trừ màn hiện tại.
6. Đọc query: `?panic=1` → mở Panic, `?tools=1` → mở Công cụ, mặc định → Home.
7. `maybeRemind()` (sau 1.8s) — nhắc ôn tập nếu chuỗi đang chờ.
8. Đăng ký service worker (khi `load`).
9. IIFE `hideSplash()` — ẩn splash sau ~1.4s.

---

## 4. Điều hướng (router đơn giản)
- `go(id)` đổi màn: dừng game/panic/metronome của màn cũ, đổi class `.active`, cập nhật `aria-hidden`, rồi gọi render tương ứng (`renderLevels`, `renderAchievements`, `renderHandbook`, `emergRender`).
- 10 màn: `screen-home`, `screen-levels`, `screen-game`, `screen-panic`, `screen-about`, `screen-sources`, `screen-achievements`, `screen-emergency`, `screen-medcard`, `screen-handbook`. Cộng overlay: `#splash`, `#tutorial`, `#settings-modal`.
- Một số tham chiếu được gán động (để `go` gọi ngược vào module con): `emergStop`, `emergRender`.

---

## 5. i18n (đa ngôn ngữ)
- `LANG` đọc từ `localStorage.capcuu101_lang` (mặc định `vi`).
- `t(v)`: nếu `v` là object `{vi, en}` → trả theo `LANG` (fallback `vi`); nếu là chuỗi → trả nguyên.
- **UI tĩnh:** object `UI` (key → `{vi, en}`); phần tử HTML gắn `data-i18n="key"`; `applyLang()` quét và đặt `textContent`.
- **Nội dung động:** dữ liệu bilingual ngay trong cấu trúc — `LEVELS[].title/desc/lesson`, `TUTORIALS`, `BADGES.name/desc` là object `{vi,en}`; còn `QUIZZES`/`PANIC` (tiếng Việt) có bản song song `QUIZZES_EN`/`PANIC_EN`, chọn theo `LANG`.
- **Khối song ngữ trong HTML:** class `.only-vi` / `.only-en` ẩn/hiện theo `body.lang-en` (dùng cho phần văn xuôi dài: Giới thiệu, Nguồn).
- Đổi ngôn ngữ: `setLang()` lưu localStorage, gọi `applyLang()` + render lại màn đang mở.
- **Thêm chuỗi mới:** thêm cùng key vào CẢ `vi` và `en`.

---

## 6. Dữ liệu nội dung (trong app.js)
- **`LEVELS`** — mảng 17 màn: `{ id, emoji, type, char, title{}, desc{}, lesson{} }`. `type` ∈ `rhythm | thrust | hose | press | quiz`.
- **`QUIZZES` / `QUIZZES_EN`** — `{ [id]: [ { q, options:[{t,ok}], wrongMsg } ] }`. Mỗi câu **đúng 1 đáp án** `ok:true`. Đáp án được xáo trộn khi render.
- **`PANIC` / `PANIC_EN`** — `{ [id]: { title, metronome?, steps:[...] } }`. 17 tình huống (gồm cả `infant_cpr`, `heartattack`...). CPR có `metronome:true`.
- **`TUTORIALS`** — `{ [gameType]: { emoji, title{}, text{} } }` cho overlay hướng dẫn lần đầu.
- **`BADGES`** — mảng huy hiệu: `{ id, emoji, name{}, desc{}, test(stats, stars) }`.
- **`HANDBOOK_ORDER`** — thứ tự hiển thị tình huống trong Cẩm nang.

> Số khẩn cấp trong bước Panic được viết "một một năm" trong nguồn để TTS đọc đúng "115"; khi hiển thị, `formatStepText()`/`renderPanicStep()` thay lại thành "115" (và "năm centimet"→"5cm", "bốn centimet"→"4cm").

---

## 7. Engine mini-game
Tất cả dùng chung 3 phần tử: `#game-stage`, `#game-instruction`, `#game-controls`, và biến `gameState = { cleanup() }` (được `stopGame()` gọi khi rời màn).

| `type` | Hàm | Cơ chế |
|---|---|---|
| `rhythm` | `initRhythm` | Chạm đúng nhịp `interval = 60000/BPM`; tính combo & độ chính xác; tiếng tách + rung mỗi nhịp; chơi được bằng Space/Enter. |
| `thrust` | `initThrust` | DeviceOrientation (nghiêng) đẩy bụng; fallback nhấn-giữ-thả nếu không có cảm biến / iOS cần xin quyền. |
| `hose` | `initHose` | Pointer rê "vòi nước" đè lên vết thương, tích đủ thời gian làm mát; vết bỏng định kỳ "lan" (đổi vị trí). |
| `press` | `initPress` | Bước 1 kéo gạc vào vòng tròn; bước 2 giữ nút để thanh lforce nằm trong vùng xanh **dao động** đủ lâu. |
| `quiz` | `initQuiz` | Trắc nghiệm, sai trừ 40 HP, hết HP thì thua. |

- `startGame(lv)` → hiện tutorial lần đầu (nếu chưa xem) rồi `runGame(lv)` điều phối theo `type`.
- `showResult(lv, success, stars, extra)` — overlay kết quả: chấm sao, bài học, huy hiệu mới, nút Chia sẻ/Chơi lại/Danh sách. Overlay gắn vào **`#screen-game`** (không gắn vào stage) để phủ toàn màn và cuộn được.
- **Survival** (`startSurvival`/`initSurvival`): gom mọi câu hỏi, hỏi liên tục có đồng hồ đếm ngược (`requestAnimationFrame`), 1 sai là hết; lưu `best.survival`.

---

## 8. Panic Mode & TTS
- `openPanic(key)` → chọn dataset theo `LANG`, hiện bước; `renderPanicStep()` cập nhật text + nút + gọi `speakStep()`.
- **TTS:** `refreshVoices()` nạp `speechSynthesis.getVoices()` (async, lắng `onvoiceschanged`). `pickSpeakVoice()` ưu tiên giọng đã chọn (`capcuu101_voice`), rồi giọng theo `LANG`, hoặc `"off"`. `hasViVoice()` để cảnh báo khi thiếu giọng tiếng Việt.
- **Metronome Panic** (CPR): `setInterval` 600ms, vòng ring nảy + rung + đếm 1–30.

## 9. Công cụ khẩn cấp & Cẩm nang
- `initEmergency()` (IIFE): máy đếm nhịp CPR độc lập (110 BPM, `Sfx.tick` + rung), thẻ y tế (`capcuu101_medcard`, escape HTML chống XSS, nút `tel:`), gán `emergStop`/`emergRender`.
- `renderHandbook()`: dựng accordion từ `PANIC(_EN)` theo `HANDBOOK_ORDER`.

## 10. Âm thanh (sound.js)
- `window.Sfx`: `ensure()` tạo `AudioContext` (mở khoá ở user gesture đầu tiên qua `unlock()`); `tone()` tổng hợp nốt; các hiệu ứng `tick/correct/wrong/logout/win/blip`; nhạc nền `startMusic/stopMusic`; `vibrate()`.
- Cài đặt lưu ở `capcuu101_settings` (sound/music/vibrate); `setSound/setMusic/setVibrate`.

## 11. Thành tích, streak, prefs
- `loadStats()/saveStats()` — `capcuu101_stats`. `recordWin(id)` tăng wins + cập nhật streak theo ngày (`todayStr`, `daysBetween`). `saveBest(id, val)` cho combo/survival.
- `checkBadges()` trả về huy hiệu mới mở khoá (gọi trong `showResult`/survival).
- `PREFS` (`capcuu101_prefs`): contrast/large/reduce/serious → `applyPrefs()` bật class trên `<body>`.

## 12. Service worker (sw.js)
- `CACHE_VERSION` (vd `capcuu101-v17`) — **bump mỗi lần đổi asset** để client nhận bản mới.
- `APP_SHELL` precache mọi file cục bộ (html/css/js/manifest/icon/screenshots) → offline hoàn toàn.
- Chiến lược: điều hướng trang → network-first (fallback cache); còn lại → stale-while-revalidate.
- Dev: do stale-while-revalidate, sau khi sửa nên **Ctrl+F5** hoặc Unregister SW trong DevTools.

---

## 13. Chạy & kiểm tra
**Chạy local** (service worker & một số API cần `http(s)://`, không chạy với `file://`):
```powershell
cd D:\AI_App\cap-cuu-101
python -m http.server 8123     # rồi mở http://localhost:8123
```
**Kiểm tra cú pháp:**
```powershell
node --check app.js
node --check sound.js
node --check sw.js
python -m json.tool manifest.json   # validate JSON
```
**Sinh lại asset ảnh (cần Pillow):** `python gen_icons.py`, `python gen_screens.py`, `python gen_og.py`.

> Dự án **chưa có test tự động** (khác với một số dự án anh em). Kiểm thử hiện là thủ công + `node --check`. Xem mục Giới hạn.

## 14. Deploy
- GitHub Pages: Settings → Pages → branch `main`. Link: `https://tridpt.github.io/cap-cuu-101/`.
- Là web tĩnh nên deploy = đẩy file. Sau khi đổi asset nhớ bump `CACHE_VERSION`.

## 15. Bảo mật & riêng tư
- Mọi dữ liệu (sao, thống kê, thẻ y tế...) chỉ ở localStorage trên máy người dùng, **không gửi đi đâu**.
- Thẻ y tế: input người dùng được escape (`textContent`) trước khi render; số điện thoại lọc còn `[\d+]` khi tạo `tel:`.
- Không nhúng thư viện ngoài/CDN → không có bề mặt tấn công chuỗi cung ứng phía client.

## 16. Hướng dẫn mở rộng (recipes)
**Thêm một tình huống mới (vd quiz):**
1. Thêm phần tử vào `LEVELS` (`type:"quiz"`, `title/desc/lesson` song ngữ).
2. Thêm key tương ứng vào `QUIZZES` **và** `QUIZZES_EN` (mỗi câu đúng 1 đáp án).
3. Thêm vào `PANIC` **và** `PANIC_EN` (các bước), và thêm `<button class="panic-card" data-emergency="<id>">` vào `index.html`.
4. Thêm `<id>` vào `HANDBOOK_ORDER`.
5. (Tuỳ) thêm mục Nguồn tham khảo trong `index.html`, một dòng trong `MEDICAL_REVIEW.md`.
6. Bump `CACHE_VERSION` trong `sw.js`.

**Thêm chuỗi giao diện:** thêm key vào `UI` (cả `vi`+`en`); HTML dùng `data-i18n`, JS dùng `t(UI.key)`.

**Thêm kiểu game mới:** thêm `type`, viết `initXxx(lv)` (đặt `gameState.cleanup`), nối trong `runGame()`, thêm tutorial trong `TUTORIALS`.

**Đổi bất kỳ asset nào:** nhớ **bump `CACHE_VERSION`** trong `sw.js`.

## 17. Giới hạn đã biết
- **Chưa có test tự động** — nên cẩn thận khi sửa dữ liệu (lỗi nội dung là nguy hiểm nhất với app y tế). Cân nhắc thêm kiểm tra toàn vẹn (mỗi câu đúng 1 đáp án; mọi quiz có cả VI+EN; mọi panic-card có dữ liệu).
- **Giọng đọc** phụ thuộc giọng hệ thống — máy không có giọng `vi-VN` sẽ đọc sai (đã có trình chọn giọng + cảnh báo + tùy chọn tắt).
- **Cảm biến nghiêng / rung / `tel:`** chủ yếu hoạt động trên điện thoại.
- **Thẻ y tế** nằm trong app — nếu khoá màn hình, người cứu hộ không mở được; nên dùng thêm Medical ID của hệ điều hành.
- **Nội dung y tế** đối chiếu hướng dẫn quốc tế; cần nhân viên y tế VN rà soát (`MEDICAL_REVIEW.md`) trước khi quảng bá rộng. Bản dịch EN chưa qua người bản ngữ.
- WCAG: đã xử lý ARIA/focus/contrast cơ bản; đánh giá đầy đủ cần test với screen reader thật.
- `app.js` là file lớn (~2.980 dòng); nếu mở rộng nhiều nên cân nhắc tách module.

## 18. Ghi chú
- Repo: `https://github.com/tridpt/cap-cuu-101`.
- Giấy phép: MIT (xem `LICENSE`), kèm disclaimer y tế.
- Quy ước: mỗi thay đổi asset đi kèm bump `CACHE_VERSION`; nội dung song ngữ luôn cập nhật cả hai.
