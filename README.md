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
| 🐻 **Ép tim cho Gấu Béo** | CPR đúng nhịp 100–120/phút | Chạm theo vòng tròn nảy ra — có tiếng "tách" + rung theo nhịp, tính combo |
| 👽 **Người ngoài hành tinh nghẹn trân châu** | Nghiệm pháp Heimlich | Nghiêng điện thoại đẩy bụng (hoặc nhấn-giữ-thả nếu không có cảm biến) |
| 🧑‍🍳 **Cứu đầu bếp bị bỏng** | Xả nước mát chữa bỏng | Rê vòi nước 🚿 đè lên vết bỏng, giữ đủ lâu — rời tay là nóng lại |
| 🧟 **Cầm máu cho Zombie** | Đặt gạc & ép cầm máu | Kéo gạc vào vết thương, rồi nhấn giữ giữ thanh lực trong vùng xanh |
| 🌊 **Đuối nước** · ⚡ **Điện giật** · 🌀 **Co giật** · 🐝 **Sốc phản vệ** · 🦴 **Gãy xương** · 🐍 **Rắn cắn** | Xử lý đúng trình tự | Trả lời nhanh các tình huống sinh tử |

Mỗi màn cho tối đa **3 sao** (lưu trong trình duyệt), kèm một mẹo đời thực sau khi chơi.

## 🔊 Âm thanh & rung

- Tiếng "tách" metronome + rung theo nhịp khi ép tim (Web Audio API, tự tổng hợp — chạy offline)
- Tiếng "ting" khi đúng, "kèn tụt dốc" khi nhân vật đăng xuất, fanfare khi thắng
- Nhạc nền 8-bit bật/tắt được
- Tất cả bật/tắt trong ⚙️ **Cài đặt** (âm thanh / nhạc / rung), lưu lại cho lần sau

## 🏆 Thành tích & chuỗi ngày

- Màn **Thành tích**: tổng sao, số màn 3 sao, lượt cứu sống, combo CPR tốt nhất
- **8 huy hiệu** mở khoá dần (Lính mới, Bậc thầy CPR, Tay nhịp vàng, Cứu tinh, Kiên trì...)
- **Chuỗi ngày** (streak): chơi mỗi ngày để nối chuỗi ôn tập

## ✨ Trải nghiệm

- **Splash screen** khi mở app
- **Hướng dẫn nhanh** hiện lần đầu chơi mỗi kiểu mini-game (chỉ 1 lần, lưu localStorage)
- Nhân vật **lắc lư sống động**, hiệu ứng chuyển màn & nảy thẻ mượt
- **Screenshot** trong manifest → nút "Install" của trình duyệt hiển thị đẹp hơn

## 🆘 Chế độ Hoảng loạn (Panic Mode)

Khi sự cố xảy ra thật:
1. Mở app → **CHẾ ĐỘ HOẢNG LOẠN**
2. Chọn tình huống — **10 loại**: ngừng tim, hóc nghẹn, bỏng, chảy máu, đuối nước, điện giật, co giật, sốc phản vệ, gãy xương, rắn cắn
3. App **đọc to từng bước** ngắn gọn, bình tĩnh — bấm "Bước tiếp" để đi tiếp
4. Riêng CPR có **nhịp metronome 100/phút** kèm rung để ép tim đúng nhịp
5. Nút **📞 GỌI 115** luôn hiện sẵn (nhạc nền tự tắt khi vào chế độ này)

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
├─ index.html   # màn hình: Home, Chọn màn, Game, Panic, Thành tích, Giới thiệu, Cài đặt
├─ style.css    # giao diện tối, cartoon, châm biếm
├─ sound.js     # module âm thanh Web Audio (hiệu ứng + nhạc nền 8-bit) + cài đặt
├─ app.js       # điều hướng + engine mini-game + Panic Mode (TTS) + thành tích + SW
├─ manifest.json# khai báo PWA (tên, icon, shortcut Hoảng loạn)
├─ sw.js        # service worker: precache app shell -> chạy offline
├─ gen_icons.py # script tạo icon PNG (chạy 1 lần, cần Pillow)
├─ gen_screens.py # script tạo ảnh screenshot cho manifest (cần Pillow)
├─ icon.svg
├─ icons/       # icon-192.png, icon-512.png
├─ screenshots/ # home.png, game.png (cho prompt Install)
└─ README.md
```

## 🧠 Nội dung sơ cứu tham khảo

Các bước dựa trên hướng dẫn sơ cứu phổ thông (CPR, Heimlich, xử lý bỏng, cầm máu).
Vẫn nên học một khoá sơ cứu thực hành có người hướng dẫn để thao tác chuẩn.
