# Changelog — Cấp Cứu 101

Tất cả thay đổi đáng kể của dự án. Phiên bản gắn theo `CACHE_VERSION` trong `sw.js`.
Định dạng dựa trên [Keep a Changelog](https://keepachangelog.com/); ngày theo YYYY-MM.

## [v17] — 2026-06
### Sửa lỗi
- Các thẻ trong Cẩm nang / Chọn màn / Panic / Công cụ bị flexbox bóp nhỏ và chồng lên nhau khi nhiều mục → cho thẻ `flex: none`, danh sách thành vùng cuộn (`flex:1; min-height:0`).

## [v16] — 2026-06
### Thêm
- **Cẩm nang sơ cứu** 📖 — màn tra cứu nhanh dạng accordion cho cả 17 tình huống, tái dùng dữ liệu Panic Mode, song ngữ.

## [v15] — 2026-06
### Thêm
- Tình huống **Nhồi máu cơ tim** ❤️‍🩹 (quiz + Panic Mode, VI/EN) kèm nguồn AHA → tổng 17 tình huống.

## [v14] — 2026-06
### Sửa lỗi
- Thanh lực game cầm máu (`position:absolute`) đè lên nút "Nhấn giữ ép" → đưa về bố cục dòng chảy.

## [v13] — 2026-06
### Thêm
- **Công cụ khẩn cấp** 🧰: máy đếm nhịp CPR độc lập (110/phút), số khẩn cấp gọi 1 chạm (115/113/114/111), thẻ y tế cá nhân; thêm PWA shortcut `?tools=1`.

## [v12] — 2026-06
### Thêm
- Trình chọn giọng đọc + tùy chọn tắt giọng; cảnh báo khi máy thiếu giọng tiếng Việt; nút thử giọng.

## [v11] — 2026-06
### Sửa lỗi
- Overlay kết quả tràn khỏi khung stage và bị che → phủ toàn màn game + cuộn được.

## [v10] — 2026-06
### Thêm / Sửa
- QA pass: sửa cách đọc "kem đánh răng" của TTS; đặt `aria-hidden` cho màn ẩn từ đầu; thêm tiếng tích tắc 3 giây cuối ở Survival.
- Thêm `LICENSE` (MIT + disclaimer y tế) và link demo trong README.

## [v9] — 2026-06
### Thêm
- **Chế độ Survival** 🏁 — trắc nghiệm liên tục tính giờ, 1 sai là hết, lưu kỷ lục, huy hiệu Cao thủ Survival.
- Dịch song ngữ đầy đủ màn Nguồn tham khảo; thêm `MEDICAL_REVIEW.md` (checklist rà soát y tế).

## [v8] — 2026-06
### Thêm
- **Khả năng tiếp cận**: tương phản cao, chữ lớn, giảm chuyển động, ARIA, focus bàn phím, nút ÉP TIM dùng Space/Enter.
- **Chế độ nghiêm túc** (tắt dark humor) cho lớp học / môi trường y tế.

## [v7] — 2026-06
### Thêm
- 4 tình huống: **Đột quỵ (FAST), Hạ đường huyết, Sốc nhiệt, Ngộ độc** (quiz + Panic, VI/EN) kèm nguồn.

## [v6] — 2026-06
### Thêm
- **Chia sẻ** kết quả/thành tích (Web Share API + thẻ ảnh canvas) + thẻ Open Graph cho link preview.
- **Nhắc ôn tập** (Notifications API) khi mở app vào ngày mới mà chuỗi đang chờ.

## [v5] — 2026-06
### Thêm
- **Sơ cứu trẻ sơ sinh**: CPR trẻ sơ sinh (hai ngón cái, ~4cm) + hóc dị vật trẻ sơ sinh (vỗ lưng + ấn ngực, KHÔNG đẩy bụng) — theo cập nhật AHA 2025.
- **Đa ngôn ngữ VI/EN** toàn diện (giao diện + nội dung + Panic Mode + giọng đọc).
- Nâng cấp game bỏng (vết bỏng "lan") và cầm máu (vùng xanh dao động).

## [v4] — 2026-06
### Sửa nội dung (độ chính xác)
- Hóc dị vật: bổ sung **5 vỗ lưng xen kẽ 5 đẩy bụng** (trước chỉ có đẩy bụng); chỉnh lại tư thế chi trong rắn cắn.
- Thêm màn **Nguồn tham khảo** trong app + bảng nguồn trong README.

## [v3] — 2026-06
### Thêm
- Splash screen, hướng dẫn nhanh lần đầu mỗi kiểu game, nhân vật sống động, ảnh screenshot trong manifest.

## [v2] — 2026-06
### Thêm
- **Âm thanh & rung** (Web Audio tự tổng hợp + nhạc nền 8-bit).
- 2 game thao tác mới: xả nước chữa bỏng, đặt gạc & ép cầm máu.
- 6 tình huống mới, hệ thống **thành tích + huy hiệu + chuỗi ngày**.

## [v1] — 2026-06
### Thêm
- **PWA**: manifest + service worker (chạy offline), icon, shortcut Hoảng loạn.

## [v0] — 2026-06 (bản đầu)
### Thêm
- Khung app + 4 mini-game đầu tiên (CPR, hóc dị vật, bỏng, cầm máu) và **Chế độ Hoảng loạn** đọc to từng bước.
