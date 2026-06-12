# Đóng góp cho Cấp Cứu 101

Cảm ơn bạn quan tâm! Đây là web app tĩnh (vanilla JS, **không framework, không bundler, không thư viện ngoài**). Đọc `DOCUMENTATION.md` để hiểu kiến trúc trước khi sửa.

> ⚠️ Đây là app sơ cứu. **Độ chính xác nội dung quan trọng hơn tính năng.** Mọi thay đổi nội dung y tế cần đối chiếu nguồn uy tín (AHA/Mayo/NHS/WHO/Red Cross) và lý tưởng là được nhân viên y tế rà soát (`MEDICAL_REVIEW.md`).

## Quy trình
1. Tạo nhánh mới từ `main` (đừng commit thẳng `main` nếu gửi PR).
2. Sửa code; chạy kiểm tra cục bộ (xem dưới).
3. Mở Pull Request, mô tả thay đổi + cách đã test (kể cả test thủ công trên điện thoại nếu liên quan).

## Chạy & kiểm tra cục bộ
```powershell
# Chạy (service worker cần http://, không dùng file://)
python -m http.server 8123        # rồi mở http://localhost:8123

# Kiểm tra cú pháp trước khi commit
node --check app.js
node --check sound.js
node --check sw.js
python -m json.tool manifest.json
```
Chưa có test tự động — vui lòng **test thủ công** màn bị ảnh hưởng (tốt nhất trên cả desktop lẫn điện thoại thật).

## Quy ước khi sửa
- **Đổi asset (app.js / sound.js / style.css / index.html / sw.js / manifest / icon...):** bắt buộc **bump `CACHE_VERSION`** trong `sw.js` để client nhận bản mới.
- **Song ngữ — không hardcode một thứ tiếng:**
  - Chuỗi giao diện: thêm key vào `UI` (cả `vi` và `en`); HTML dùng `data-i18n`, JS dùng `t(UI.key)`.
  - Nội dung màn: `LEVELS/TUTORIALS/BADGES` dùng object `{vi,en}`; `QUIZZES/PANIC` phải thêm song song vào bản `_EN`.
  - Văn xuôi dài trong HTML: cặp khối `.only-vi` / `.only-en`.
- **Thêm tình huống mới:** làm đủ bộ — `LEVELS` + `QUIZZES(_EN)` hoặc `PANIC(_EN)` + `panic-card` trong HTML + `HANDBOOK_ORDER` + (tuỳ) mục Nguồn + dòng trong `MEDICAL_REVIEW.md`. Xem "recipes" trong `DOCUMENTATION.md`.
- **Quiz:** mỗi câu phải có **đúng một** đáp án `ok: true`. Đáp án sai (`wrongMsg`) nên giải thích vì sao, ngắn gọn.
- **An toàn:** escape mọi input người dùng khi render (thẻ y tế dùng `textContent`). Không thêm dịch vụ mạng / thư viện ngoài nếu không có lý do rõ ràng (giữ offline 100%).
- **Âm thanh:** chỉ tổng hợp bằng Web Audio trong `sound.js` (không thêm file media, để giữ offline & nhẹ).
- **Tài liệu:** cập nhật `README.md` / `FEATURES.md` khi thêm tính năng người dùng thấy được.
- **Commit:** mô tả ngắn gọn theo từng thay đổi (vd: "Add heart attack scenario", "Fix overlapping handbook cards").

## Sinh lại ảnh (icon / screenshot / OG)
Cần Python + Pillow:
```powershell
python gen_icons.py     # icons/icon-192.png, icon-512.png
python gen_screens.py   # screenshots/home.png, game.png
python gen_og.py        # screenshots/og.png (link preview 1200×630)
```

## Phong cách code
- Vanilla JS trong một IIFE `"use strict"`; hàm gọn, đặt tên rõ.
- Mỗi engine game đặt `gameState.cleanup` để dọn timer/listener khi rời màn.
- Danh sách nhiều thẻ trong flex column: nhớ `flex: none` cho thẻ + `flex:1; min-height:0; overflow-y:auto` cho vùng cuộn (tránh thẻ bị bóp/chồng).
- Giữ giao diện tối + đơn giản; ưu tiên rõ ràng hơn hoa mỹ.

## Không nên làm
- Đừng biến nó thành "sách giáo khoa" — concept là học qua chơi + tra cứu nhanh, không phải bài giảng lý thuyết dài.
- Đừng thêm nội dung y tế chưa kiểm chứng nguồn.
- Đừng làm Panic Mode / Công cụ khẩn cấp phụ thuộc mạng (phải dùng được offline).
