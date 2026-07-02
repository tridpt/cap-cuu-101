"""Sinh ảnh screenshot cho manifest PWA (chạy 1 lần). Cần Pillow.
Vẽ mock UI bằng hình khối + chữ (không phụ thuộc font emoji)."""
from PIL import Image, ImageDraw, ImageFont

W, H = 540, 1080
# Theme Terminal/8-bit
BG = (4, 18, 10)         # #04120a
BG2 = (8, 33, 15)        # #08210f
CARD = (10, 36, 20)      # #0a2414
ACCENT = (255, 93, 93)   # #ff5d5d
ACCENT2 = (255, 225, 77) # #ffe14d
GOOD = (70, 240, 138)    # #46f08a
TEXT = (125, 255, 176)   # #7dffb0
MUTED = (63, 157, 110)   # #3f9d6e


def font(size, bold=True):
    for name in (("arialbd.ttf" if bold else "arial.ttf"), "segoeui.ttf"):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


def center_text(d, cx, y, txt, f, fill):
    bb = d.textbbox((0, 0), txt, font=f)
    d.text((cx - (bb[2] - bb[0]) / 2, y), txt, font=f, fill=fill)


def rrect(d, box, r, fill):
    # Góc vuông pixel + viền phosphor
    d.rectangle(box, fill=fill, outline=GOOD, width=3)


def cross(d, cx, cy, r, color):
    """Chữ thập vuông pixel thay vòng tròn."""
    d.rectangle([cx - r, cy - r, cx + r, cy + r], fill=color, outline=GOOD, width=4)
    t = r * 0.24
    a = r * 0.6
    d.rectangle([cx - t, cy - a, cx + t, cy + a], fill=(255, 255, 255))
    d.rectangle([cx - a, cy - t, cx + a, cy + t], fill=(255, 255, 255))


def scanlines(d):
    for y in range(0, H, 3):
        d.line([(0, y), (W, y)], fill=(0, 0, 0))


def base():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    for i in range(H):
        t = i / H
        d.line([(0, i), (W, i)],
               fill=(int(BG2[0] * (1 - t) + BG[0] * t),
                     int(BG2[1] * (1 - t) + BG[1] * t),
                     int(BG2[2] * (1 - t) + BG[2] * t)))
    scanlines(d)
    return img, d


def shot_home(path):
    img, d = base()
    cross(d, W // 2, 230, 90, ACCENT)
    center_text(d, W // 2, 350, "CẤP CỨU 101", font(54), TEXT)
    center_text(d, W // 2, 420, "Đừng để chết nhảm", font(28, False), ACCENT)
    # buttons
    rrect(d, [60, 560, W - 60, 650], 22, ACCENT2)
    center_text(d, W // 2, 585, "CHƠI & HỌC", font(34), (22, 23, 43))
    rrect(d, [60, 680, W - 60, 770], 22, ACCENT)
    center_text(d, W // 2, 705, "CHẾ ĐỘ HOẢNG LOẠN", font(30), (255, 255, 255))
    rrect(d, [60, 800, 255, 880], 18, CARD)
    center_text(d, 157, 828, "Thành tích", font(24, False), MUTED)
    rrect(d, [285, 800, W - 60, 880], 18, CARD)
    center_text(d, 392, 828, "Giới thiệu", font(24, False), MUTED)
    center_text(d, W // 2, 1010, "Việc thật hãy gọi 115", font(22, False), MUTED)
    img.save(path)
    print("wrote", path)


def shot_game(path):
    img, d = base()
    center_text(d, W // 2, 60, "Ép tim cho Gấu Béo", font(34), TEXT)
    # stage
    rrect(d, [40, 130, W - 40, 720], 22, CARD)
    # progress
    rrect(d, [60, 160, W - 60, 184], 12, BG2)
    rrect(d, [60, 160, 360, 184], 12, GOOD)
    # beat ring + heart
    d.ellipse([W // 2 - 110, 360, W // 2 + 110, 580], outline=ACCENT2, width=6)
    cross(d, W // 2, 470, 70, ACCENT)
    center_text(d, W - 110, 250, "x7", font(40), ACCENT2)
    # tap button
    rrect(d, [40, 760, W - 40, 880], 22, ACCENT)
    center_text(d, W // 2, 795, "ÉP TIM", font(40), (255, 255, 255))
    center_text(d, W // 2, 940, "PERFECT!  combo x7", font(28), GOOD)
    img.save(path)
    print("wrote", path)


if __name__ == "__main__":
    import os
    os.makedirs("screenshots", exist_ok=True)
    shot_home("screenshots/home.png")
    shot_game("screenshots/game.png")
