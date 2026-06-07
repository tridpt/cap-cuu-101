# 🚑 Cấp Cứu 101: Đừng Để Chết Nhảm

Học sơ cứu kiểu *Dumb Ways to Die* — vui, châm biếm, nhưng kiến thức thì thật.

Một web app dạy kỹ năng sơ cứu sinh tử (CPR, hóc dị vật, bỏng, cầm máu) thông qua
mini-game hoạt hình hài hước. Làm sai? Nhân vật "đăng xuất khỏi cuộc đời" cực buồn cười.
Gặp chuyện thật? Bật **Chế độ Hoảng loạn** để app đọc to từng bước cho bạn làm theo.

> ⚠️ Đây là sản phẩm giải trí + ghi nhớ. Nó **không** thay thế khoá sơ cứu chính quy
> hay nhân viên y tế. Việc thật: **gọi 115 trước tiên.**

---

## 🎮 Các mini-game

| Màn | Kỹ năng thật | Cách chơi |
|-----|--------------|-----------|
| 🐻 **Ép tim cho Gấu Béo** | CPR đúng nhịp 100–120/phút | Chạm theo vòng tròn nảy ra — không nhanh, không chậm |
| 👽 **Người ngoài hành tinh nghẹn trân châu** | Nghiệm pháp Heimlich | Nghiêng điện thoại đẩy bụng (hoặc nhấn-giữ-thả nếu không có cảm biến) |
| 🧑‍🍳 **Cứu anh đầu bếp bị bỏng** | Xử lý bỏng đúng cách | Trả lời nhanh các tình huống |
| 🧟 **Cầm máu cho Zombie** | Băng bó & ép cầm máu | Trả lời nhanh các tình huống |

Mỗi màn cho tối đa **3 sao** (lưu trong trình duyệt), kèm một mẹo đời thực sau khi chơi.

## 🆘 Chế độ Hoảng loạn (Panic Mode)

Khi sự cố xảy ra thật:
1. Mở app → **CHẾ ĐỘ HOẢNG LOẠN**
2. Chọn tình huống (ngừng tim / hóc nghẹn / bỏng / chảy máu)
3. App **đọc to từng bước** ngắn gọn, bình tĩnh — bấm "Bước tiếp" để đi tiếp
4. Riêng CPR có **nhịp metronome 100/phút** kèm rung để ép tim đúng nhịp
5. Nút **📞 GỌI 115** luôn hiện sẵn

## ▶️ Chạy thử

Không cần cài đặt gì. Chỉ là HTML/CSS/JS thuần.

- **Cách nhanh:** mở thẳng `index.html` bằng trình duyệt.
- **Khuyến nghị** (để giọng nói, cảm biến & PWA hoạt động đúng): chạy qua HTTP.

```bash
# tại thư mục cap-cuu-101
python -m http.server 8000
```
Rồi mở `http://localhost:8000` (hoặc IP máy tính từ điện thoại cùng mạng Wi-Fi).

> Service worker chỉ hoạt động khi truy cập qua `http(s)://` (localhost hoặc GitHub Pages),
> không chạy khi mở bằng `file://`.

## 📲 Cài như app (PWA) & chạy offline

App là một **Progressive Web App**: cài được lên màn hình chính và **chạy offline 100%**.
Điều này quan trọng cho app cấp cứu — **Chế độ Hoảng loạn vẫn dùng được khi mất mạng**.

- **Android (Chrome/Edge):** mở link → menu ⋮ → *Cài đặt ứng dụng / Add to Home screen*.
- **iOS (Safari):** nút Chia sẻ → *Thêm vào MH chính*.
- **Desktop (Chrome/Edge):** biểu tượng cài đặt ở thanh địa chỉ.

Sau khi cài, giữ một lối tắt **"Chế độ Hoảng loạn"** mở thẳng hướng dẫn khẩn cấp
(qua `?panic=1`). Lần đầu vào cần có mạng để service worker lưu cache; sau đó offline vô tư.

> 💡 Giọng nói (TTS) hoạt động offline nếu thiết bị đã cài sẵn giọng tiếng Việt.
> Nếu chưa có giọng `vi-VN` offline, phần đọc to có thể cần mạng tuỳ hệ điều hành.

## 📱 Lưu ý kỹ thuật

- **Giọng nói** dùng Web Speech API. Chất lượng giọng tiếng Việt tuỳ thiết bị/trình duyệt
  (Chrome & Edge trên Windows/Android thường có sẵn; nếu máy không có giọng `vi-VN`
  app vẫn đọc bằng giọng mặc định).
- **Cảm biến nghiêng** (game người ngoài hành tinh) cần thiết bị có gyroscope.
  Trên iOS phải bấm cho phép; máy không có cảm biến tự chuyển sang chế độ chạm.
- **Rung** dùng Vibration API (chủ yếu Android).
- Tiến độ sao lưu bằng `localStorage` — xoá dữ liệu trình duyệt là mất.

## 📂 Cấu trúc

```
cap-cuu-101/
├─ index.html   # 5 màn hình: Home, Chọn màn, Game, Panic, Giới thiệu
├─ style.css    # giao diện tối, cartoon, châm biếm
├─ app.js       # điều hướng + engine mini-game + Panic Mode (TTS) + đăng ký SW
├─ manifest.json# khai báo PWA (tên, icon, shortcut Hoảng loạn)
├─ sw.js        # service worker: precache app shell -> chạy offline
├─ gen_icons.py # script tạo icon PNG (chạy 1 lần, cần Pillow)
├─ icon.svg
├─ icons/       # icon-192.png, icon-512.png
└─ README.md
```

## 🧠 Nội dung sơ cứu tham khảo

Các bước dựa trên hướng dẫn sơ cứu phổ thông (CPR, Heimlich, xử lý bỏng, cầm máu).
Vẫn nên học một khoá sơ cứu thực hành có người hướng dẫn để thao tác chuẩn.
