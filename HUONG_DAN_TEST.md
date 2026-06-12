# Hướng dẫn test thủ công — Cấp Cứu 101

Dự án chưa có test tự động, nên đây là quy trình test thủ công từng bước trước khi phát hành.
Đánh ✅ Đạt / ❌ Lỗi cho mỗi mục; lỗi thì chụp màn hình + ghi thiết bị/trình duyệt.

**Thiết bị test:** ............................  **Trình duyệt:** ............................  **Ngày:** ..............

## 0. Chuẩn bị
```powershell
cd D:\AI_App\cap-cuu-101
python -m http.server 8123
```
- Desktop: mở `http://localhost:8123`.
- Điện thoại (cùng Wi-Fi): mở `http://<IP-máy-tính>:8123` (xem IP bằng `ipconfig`).
- Sau mỗi lần đổi code: **Ctrl+F5** hoặc DevTools → Application → Service Workers → *Unregister* rồi reload (vì service worker cache).

> Lưu ý: nhiều tính năng (giọng đọc, cảm biến nghiêng, rung, nút gọi) hoạt động tốt/đủ **chỉ trên điện thoại thật**. Hãy test ít nhất một lượt trên điện thoại.

---

## 1. Khởi động & điều hướng
- [ ] Mở app → hiện **splash** (🚑 + thanh loading) rồi vào Home.
- [ ] 5 nút Home hoạt động: Chơi & Học, Hoảng loạn, Công cụ khẩn cấp, Thành tích, Giới thiệu.
- [ ] Nút ⚙️ (góc trên phải) mở Cài đặt.
- [ ] Nút ← ở mỗi màn quay lại đúng.

## 2. Mini-game
- [ ] **Ép tim cho Gấu Béo** (CPR): lần đầu hiện hướng dẫn → chạm "ÉP TIM" theo vòng tròn; có tiếng tách + combo; đủ nhịp thì thắng, hiện sao + bài học.
- [ ] **CPR em bé Bông**: chơi được, nội dung nhấn mạnh trẻ sơ sinh.
- [ ] **Người ngoài hành tinh** (Heimlich): trên điện thoại xin quyền/nghiêng để đẩy; trên desktop hiện chế độ nhấn-giữ-thả.
- [ ] **Cứu đầu bếp bị bỏng**: rê "vòi nước" 🚿 đè lên nhân vật, giữ đủ lâu thắng; rời tay thì nóng lại; vết bỏng thỉnh thoảng "lan".
- [ ] **Cầm máu cho Zombie**: kéo gạc 🩹 vào vòng tròn → bước 2 giữ nút, **thanh lực + nút không chồng nhau**, giữ trong vùng xanh đủ lâu thắng.
- [ ] Một màn **quiz** bất kỳ: chọn sai trừ HP, hết HP thì "đăng xuất"; trả lời đủ thì thắng.
- [ ] Overlay kết quả **không bị che**, cuộn được, đủ nút Chia sẻ/Chơi lại/Danh sách.
- [ ] Sao được lưu (thoát ra vào lại màn chọn vẫn còn).

## 3. Chế độ Survival 🏁
- [ ] Thẻ Survival ở đầu màn Chơi & Học; bấm vào chơi được.
- [ ] Mỗi câu có đồng hồ đếm ngược; 3 giây cuối có tiếng tích tắc.
- [ ] Hết giờ hoặc trả lời sai → kết thúc, hiện điểm + kỷ lục.
- [ ] Chơi lại phá kỷ lục → hiện "Kỷ lục mới".

## 4. Chế độ Hoảng loạn 🆘
- [ ] Danh sách 17 tình huống hiện đủ, **không chồng nhau**.
- [ ] Chọn CPR → có metronome (vòng nảy + đếm) + đọc to bước (nếu có giọng).
- [ ] Bước tiếp / Lùi / Đọc lại / Đổi tình huống hoạt động.
- [ ] Nút 📞 GỌI 115 hiện rõ (trên điện thoại bấm mở trình gọi).
- [ ] Vào Panic thì nhạc nền tự tắt.

## 5. Công cụ khẩn cấp 🧰
- [ ] **Máy đếm nhịp CPR**: bấm "Bắt đầu ép tim" → tiếng tách + rung (điện thoại) + đếm 1–30; bấm lại để dừng; rời màn thì tự dừng.
- [ ] **Số khẩn cấp**: 4 nút; trên điện thoại bấm mở trình gọi đúng số.
- [ ] **Thẻ y tế**: bấm Chỉnh sửa → nhập → Lưu → quay lại thấy thẻ; có nút gọi người thân nếu nhập số; thoát app mở lại vẫn còn.

## 6. Cẩm nang 📖
- [ ] 17 mục hiện đủ, **không chồng/cắt chữ**.
- [ ] Bấm một mục → mở ra danh sách bước; bấm lại đóng; "115"/"5cm" hiển thị đúng.

## 7. Thành tích 🏆
- [ ] Hiện đúng tổng sao, số màn 3 sao, lượt cứu sống, combo CPR, huy hiệu.
- [ ] Huy hiệu mở khoá khi đạt điều kiện (vd thắng lần đầu → "Lính mới").
- [ ] Nút "Khoe thành tích" → chia sẻ hoặc chép link.

## 8. Cài đặt ⚙️
- [ ] Bật/tắt **Âm thanh / Nhạc / Rung** có hiệu lực ngay, lưu lại.
- [ ] **Nhắc ôn tập**: bật → xin quyền thông báo; cấp quyền → có thông báo xác nhận.
- [ ] **Tương phản cao / Chữ lớn / Giảm chuyển động** đổi giao diện ngay.
- [ ] **Chế độ nghiêm túc**: thua hiện "Chưa đạt — thử lại" thay vì "đăng xuất".
- [ ] **Ngôn ngữ VI/EN**: đổi → toàn bộ giao diện + nội dung + Panic + Cẩm nang đổi theo.
- [ ] **Giọng đọc**: dropdown liệt kê giọng; chọn/tắt; nút Thử giọng; cảnh báo hiện khi máy không có giọng tiếng Việt.

## 9. Đa ngôn ngữ (EN)
- [ ] Bật EN → kiểm tra vài màn: tên màn, quiz, bước Panic, Cẩm nang, Giới thiệu, Nguồn đều tiếng Anh.
- [ ] Giọng đọc Panic ở EN dùng giọng tiếng Anh, nói "call emergency services".

## 10. PWA & offline
- [ ] Cài app: Android Chrome (menu ⋮ → Cài đặt ứng dụng) / iOS Safari (Chia sẻ → Thêm vào MH chính) / desktop (icon thanh địa chỉ).
- [ ] Giữ icon app → thấy 2 shortcut: Hoảng loạn, Công cụ; bấm mở đúng màn.
- [ ] Bật chế độ máy bay → mở app từ màn hình chính → vẫn chạy; Panic Mode + Cẩm nang + công cụ vẫn dùng được.

## 11. Accessibility (cơ bản)
- [ ] Tab bằng bàn phím thấy viền focus rõ; Enter/Space kích hoạt nút.
- [ ] Nút ÉP TIM chơi được bằng Space/Enter.
- [ ] (Nếu có) bật screen reader thử: bước Panic được đọc khi chuyển bước.

## 12. Nội dung & độ chính xác
- [ ] Rà nhanh các bài học / bước Panic không có lỗi chính tả, số 115 đúng.
- [ ] Dùng `MEDICAL_REVIEW.md` để nhân viên y tế rà soát trước khi quảng bá rộng.

---

## Kiểm tra cú pháp (trước khi commit)
```powershell
node --check app.js
node --check sound.js
node --check sw.js
python -m json.tool manifest.json
```

## Lỗi giao diện hay gặp (đã từng vấp)
- Thẻ trong danh sách bị bóp/chồng → cần `flex:none` cho thẻ + vùng cuộn `flex:1; min-height:0`.
- Overlay/phần tử `position:absolute` đè lên nội dung khác → kiểm tra containing block.
- Sau khi sửa mà vẫn thấy bản cũ → service worker cache, nhớ Ctrl+F5 / Unregister + bump `CACHE_VERSION`.
