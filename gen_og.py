"""Sinh ảnh Open Graph 1200x630 cho link preview (chạy 1 lần). Cần Pillow."""
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
# Theme Terminal/8-bit
BG = (4, 18, 10)         # #04120a
BG2 = (8, 33, 15)        # #08210f
ACCENT = (255, 93, 93)   # #ff5d5d đỏ báo động
ACCENT2 = (255, 225, 77) # #ffe14d hổ phách
TEXT = (125, 255, 176)   # #7dffb0 xanh terminal
MUTED = (63, 157, 110)   # #3f9d6e
GOOD = (70, 240, 138)    # #46f08a


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
    """Chữ thập vuông pixel (khối, có viền phosphor) thay vòng tròn."""
    box = [cx - r, cy - r, cx + r, cy + r]
    d.rectangle(box, fill=color, outline=GOOD, width=6)
    t = r * 0.24
    a = r * 0.62
    d.rectangle([cx - t, cy - a, cx + t, cy + a], fill=(255, 255, 255))
    d.rectangle([cx - a, cy - t, cx + a, cy + t], fill=(255, 255, 255))


def scanlines(d):
    """Phủ scanline CRT: kẻ ngang tối mỗi 3px."""
    for y in range(0, H, 3):
        d.line([(0, y), (W, y)], fill=(0, 0, 0))


def main(path):
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    for i in range(H):
        t = i / H
        d.line([(0, i), (W, i)],
               fill=(int(BG2[0] * (1 - t) + BG[0] * t),
                     int(BG2[1] * (1 - t) + BG[1] * t),
                     int(BG2[2] * (1 - t) + BG[2] * t)))
    scanlines(d)
    cross(d, 230, H // 2, 140, ACCENT)
    d.text((430, 160), "CẤP CỨU 101", font=font(96), fill=TEXT)
    d.text((432, 285), "Đừng để chết nhảm", font=font(54, False), fill=ACCENT2)
    d.text((434, 380), "Học sơ cứu kiểu Dumb Ways to Die", font=font(38, False), fill=MUTED)
    d.text((434, 440), "CPR · Hóc dị vật · Bỏng · Cầm máu · Panic Mode", font=font(30, False), fill=GOOD)
    img.save(path)
    print("wrote", path)


if __name__ == "__main__":
    import os
    os.makedirs("screenshots", exist_ok=True)
    main("screenshots/og.png")
