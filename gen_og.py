"""Sinh ảnh Open Graph 1200x630 cho link preview (chạy 1 lần). Cần Pillow."""
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG = (15, 16, 32)
BG2 = (26, 28, 58)
ACCENT = (255, 93, 115)
ACCENT2 = (255, 210, 63)
TEXT = (244, 244, 255)
MUTED = (154, 160, 199)


def font(size, bold=True):
    for name in (("arialbd.ttf" if bold else "arial.ttf"), "segoeui.ttf"):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


def center(d, cx, y, txt, f, fill):
    bb = d.textbbox((0, 0), txt, font=f)
    d.text((cx - (bb[2] - bb[0]) / 2, y), txt, font=f, fill=fill)


def cross(d, cx, cy, r, color):
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=color)
    t = r * 0.32
    a = r * 0.62
    d.rectangle([cx - t, cy - a, cx + t, cy + a], fill=(255, 255, 255))
    d.rectangle([cx - a, cy - t, cx + a, cy + t], fill=(255, 255, 255))


def main(path):
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    for i in range(H):
        t = i / H
        d.line([(0, i), (W, i)],
               fill=(int(BG2[0] * (1 - t) + BG[0] * t),
                     int(BG2[1] * (1 - t) + BG[1] * t),
                     int(BG2[2] * (1 - t) + BG[2] * t)))
    cross(d, 230, H // 2, 150, ACCENT)
    d.text((430, 170), "CẤP CỨU 101", font=font(96), fill=TEXT)
    d.text((432, 285), "Đừng để chết nhảm", font=font(54, False), fill=ACCENT)
    d.text((434, 380), "Học sơ cứu kiểu Dumb Ways to Die", font=font(38, False), fill=MUTED)
    d.text((434, 440), "CPR · Hóc dị vật · Bỏng · Cầm máu · Panic Mode", font=font(30, False), fill=ACCENT2)
    img.save(path)
    print("wrote", path)


if __name__ == "__main__":
    import os
    os.makedirs("screenshots", exist_ok=True)
    main("screenshots/og.png")
