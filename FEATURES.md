# Tính năng — Cấp Cứu 101: Đừng Để Chết Nhảm

Web app tĩnh (HTML/CSS/JS thuần), PWA, **không backend, không framework, không thư viện ngoài** → chạy offline 100%. Dữ liệu lưu trong trình duyệt (localStorage). Song ngữ VI/EN.

Quy mô: ~4.200 dòng (app.js ~2.980, style.css ~590, sound.js ~150, index.html ~390, sw.js ~80).

> Triết lý: học sơ cứu kiểu *Dumb Ways to Die* — vui, châm biếm để **ghi nhớ kỹ năng một cách vô thức**; khi gặp chuyện thật thì có công cụ dùng ngay.

---

## 1. Mini-game học sơ cứu (17 màn)
- **Ép tim cho Gấu Béo** 🐻 — CPR người lớn theo nhịp (game `rhythm`: chạm đúng nhịp ~110/phút, có combo, tiếng tách + rung).
- **CPR cho em bé Bông** 👶 — CPR trẻ sơ sinh (hai ngón cái, ~4cm).
- **Người ngoài hành tinh nghẹn trân châu** 👽 — Heimlich (game `thrust`: nghiêng điện thoại hoặc nhấn-giữ-thả).
- **Cứu đầu bếp bị bỏng** 🧑‍🍳 — xả nước chữa bỏng (game `hose`: rê vòi nước, vết bỏng có thể "lan").
- **Cầm máu cho Zombie** 🧟 — đặt gạc + giữ ép (game `press`: kéo gạc đúng chỗ, giữ thanh lực trong vùng xanh di chuyển).
- **13 màn trắc nghiệm tình huống** (game `quiz`): trẻ sơ sinh hóc dị vật, đuối nước, điện giật, co giật, sốc phản vệ, gãy xương, rắn cắn, đột quỵ (FAST), hạ đường huyết, sốc nhiệt, ngộ độc, nhồi máu cơ tim.
- Mỗi màn tối đa **3 sao** (lưu localStorage), kèm **bài học đời thực** sau khi chơi.
- Làm sai → nhân vật **"đăng xuất khỏi cuộc đời"** (hài), hoặc trung tính nếu bật Chế độ nghiêm túc.
- **Hướng dẫn nhanh** hiện lần đầu mỗi kiểu game (lưu lại, không lặp).

## 2. Chế độ Hoảng loạn (Panic Mode)
- 17 tình huống cấp cứu, chọn là **đọc to từng bước** ngắn gọn (Web Speech API).
- Điều hướng Bước tiếp / Lùi / Đọc lại / Đổi tình huống.
- Riêng CPR (người lớn + trẻ sơ sinh) có **metronome 100/phút + rung** dẫn nhịp ép tim.
- Nút **📞 GỌI 115** luôn hiện; nhạc nền tự tắt khi vào chế độ này.
- Mở nhanh qua PWA shortcut `?panic=1`.

## 3. Công cụ khẩn cấp (dùng ngoài đời thật)
- **🥁 Máy đếm nhịp CPR độc lập** — bấm một nút phát ngay nhịp 110/phút (tiếng tách + rung + đếm 1–30).
- **🆘 Gọi khẩn cấp 1 chạm** — 115, 113, 114, 111 (nút `tel:`).
- **🪪 Thẻ y tế cá nhân** — nhóm máu, dị ứng, bệnh nền/thuốc, người liên hệ; hiển thị thẻ to rõ cho người cứu hộ + nút gọi người thân. Lưu offline (localStorage), escape chống XSS.
- Mở nhanh qua PWA shortcut `?tools=1`.

## 4. Cẩm nang tra cứu nhanh
- Danh sách 17 tình huống dạng gập/mở (accordion), bấm để đọc nhanh các bước — không cần chơi, không cần giọng đọc.
- Tái dùng đúng dữ liệu của Panic Mode (một nguồn, không trùng lặp).

## 5. Chế độ Survival
- Trắc nghiệm liên tục rút ngẫu nhiên từ mọi tình huống, mỗi câu có **đồng hồ đếm ngược ~9 giây** (3 giây cuối có tiếng tích tắc).
- Sai hoặc hết giờ là kết thúc; tính điểm + combo, lưu **kỷ lục**, có nút chia sẻ.

## 6. Thành tích & giữ chân
- Màn Thành tích: tổng sao, số màn 3 sao, lượt cứu sống, combo CPR tốt nhất, kỷ lục Survival.
- **9 huy hiệu** mở khoá dần (Lính mới, Bậc thầy CPR, Tay nhịp vàng, Nửa đường, Thử mọi thứ, Cứu tinh, Chăm chỉ, Kiên trì, Cao thủ Survival).
- **Chuỗi ngày (streak)** ôn tập; banner nhắc ở màn chọn màn.
- **Nhắc ôn tập** (Notifications API) khi mở lại app vào ngày mới mà chuỗi đang chờ nối.

## 7. Âm thanh & rung
- Toàn bộ tự tổng hợp bằng **Web Audio API** (không file âm thanh) → chạy offline: tiếng tách metronome, "ting" đúng, "kèn tụt dốc" thua, fanfare thắng, nhạc nền 8-bit.
- Rung (Vibration API) theo nhịp & sự kiện.
- Bật/tắt riêng âm thanh / nhạc / rung trong Cài đặt.

## 8. Chia sẻ & lan toả
- Nút Chia sẻ ở màn thắng, Thành tích, Survival: tự **vẽ thẻ ảnh (canvas)** kèm kết quả rồi dùng **Web Share API**; không hỗ trợ thì chép link.
- Thẻ **Open Graph + Twitter Card** + ảnh `og.png` cho link preview đẹp.

## 9. Đa ngôn ngữ (VI/EN)
- Đổi ngôn ngữ trong Cài đặt; dịch **toàn bộ**: giao diện, tên/mô tả màn, bài học, quiz, tutorial, huy hiệu, Panic Mode, Cẩm nang.
- Giọng đọc tự đổi sang `en-US` ở chế độ English (nói "call emergency services" thay 115).

## 10. Giọng đọc (TTS) có kiểm soát
- Trình chọn giọng trong Cài đặt (liệt kê mọi giọng máy có, ưu tiên tiếng Việt), hoặc **Tắt giọng đọc**.
- **Cảnh báo** khi máy chưa có giọng tiếng Việt + hướng dẫn cài.
- Nút Thử giọng.

## 11. Khả năng tiếp cận & Chế độ nghiêm túc
- **Tương phản cao**, **Chữ lớn**, **Giảm chuyển động** (tự tôn trọng `prefers-reduced-motion`; metronome vẫn giữ vì là chức năng).
- **Chế độ nghiêm túc**: bỏ dark humor, dùng từ trung tính — hợp lớp học/y tế.
- ARIA cho nút icon, vùng `aria-live` đọc bước Panic & hướng dẫn game, `aria-hidden` cho màn ẩn, focus rõ, nút ÉP TIM chơi bằng Space/Enter, quiz là `<button>`.

## 12. PWA & offline
- manifest + service worker precache toàn bộ app shell → **chạy offline 100%** (quan trọng cho Panic Mode khi mất mạng).
- Cài lên màn hình chính; 2 shortcut: Hoảng loạn, Công cụ.
- Splash screen khi mở app; screenshot trong manifest cho prompt Install.

## 13. Độ tin cậy nội dung
- Nội dung đối chiếu hướng dẫn AHA / Mayo Clinic / NHS / WHO / Red Cross / Cleveland Clinic (xem màn Nguồn tham khảo, song ngữ).
- `MEDICAL_REVIEW.md`: checklist cho nhân viên y tế VN rà soát trước khi quảng bá.
- Disclaimer rõ ở nhiều nơi: **không thay thế đào tạo chính quy, việc thật gọi 115**.

---

## Lưu trữ (khóa localStorage)
| Khóa | Nội dung |
|---|---|
| `capcuu101_stars` | Số sao mỗi màn |
| `capcuu101_stats` | wins, totalWins, best (combo/survival), streak, badges |
| `capcuu101_settings` | sound / music / vibrate (quản bởi `sound.js`) |
| `capcuu101_prefs` | contrast / large / reduce / serious |
| `capcuu101_lang` | ngôn ngữ (vi/en) |
| `capcuu101_voice` | giọng đọc đã chọn ("", "off", hoặc voiceURI) |
| `capcuu101_tut` | đã xem hướng dẫn kiểu game nào |
| `capcuu101_reminder` | bật nhắc ôn tập |
| `capcuu101_medcard` | thẻ y tế cá nhân |

## API trình duyệt sử dụng
Web Audio · Web Speech (TTS) · Vibration · Notifications · DeviceOrientation (cảm biến nghiêng) · Web Share · Geolocation (không dùng) · Service Worker / Cache · localStorage. **Không** dùng thư viện ngoài hay dịch vụ mạng nào.
