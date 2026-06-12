"""Sinh GIF minh hoạ cho README (game ép tim CPR). Cần Pillow.
Đây là ảnh động MINH HOẠ (không phải bản quay màn hình thật) — phong cách khớp app.
"""
import math
from PIL import Image, ImageDraw, ImageFont

W, H = 380, 760
SS = 2                      # supersample cho mượt
BG = (15, 16, 32)
BG2 = (26, 28, 58)
ACCENT = (255, 93, 115)
ACCENT2 = (255, 210, 63)
GOOD = (61, 220, 151)
TEXT = (244, 244, 255)
MUTED = (154, 160, 199)

FRAMES = 24
BEAT_EVERY = 8             # nhịp mỗi 8 frame


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


def rrect(d, box, r, fill):
    d.rounded_rectangle(box, radius=r, fill=fill)


def heart(d, cx, cy, sc, color):
    pts = []
    for i in range(0, 361, 6):
        t = math.radians(i)
        x = 16 * math.sin(t) ** 3
        y = 13 * math.cos(t) - 5 * math.cos(2 * t) - 2 * math.cos(3 * t) - math.cos(4 * t)
        pts.append((cx + x * sc, cy - y * sc))
    d.polygon(pts, fill=color)


def frame(i):
    w, h = W * SS, H * SS
    img = Image.new("RGB", (w, h), BG)
    d = ImageDraw.Draw(img, "RGBA")
    # nền gradient
    for y in range(h):
        t = y / h
        d.line([(0, y), (w, y)],
               fill=(int(BG2[0] * (1 - t) + BG[0] * t),
                     int(BG2[1] * (1 - t) + BG[1] * t),
                     int(BG2[2] * (1 - t) + BG[2] * t)))

    s = SS
    center(d, w / 2, 34 * s, "Ép tim cho Gấu Béo", font(22 * s), TEXT)

    # thanh tiến độ
    rrect(d, [30 * s, 78 * s, w - 30 * s, 96 * s], 9 * s, (60, 63, 110))
    rrect(d, [30 * s, 78 * s, 30 * s + (w - 60 * s) * 0.72, 96 * s], 9 * s, GOOD)

    phase = i % BEAT_EVERY
    cx, cy = w / 2, h * 0.46

    # vòng beat lan ra
    rp = phase / BEAT_EVERY
    ring_r = (60 + rp * 120) * s
    ring_a = int(220 * (1 - rp))
    d.ellipse([cx - ring_r, cy - ring_r, cx + ring_r, cy + ring_r],
              outline=ACCENT2 + (ring_a,), width=5 * s)

    # tim đập (to khi vừa vào nhịp)
    pulse = 1.0 + 0.28 * max(0, 1 - phase / 2.2)
    heart(d, cx, cy, 4.2 * s * pulse, ACCENT)

    # combo góc phải
    combo = 8 + (i // BEAT_EVERY)
    center(d, w - 52 * s, 120 * s, f"x{combo}", font(26 * s), ACCENT2)

    # chữ PERFECT bay lên ngay sau nhịp
    if phase <= 3:
        rise = phase * 14 * s
        a = int(255 * (1 - phase / 3.2))
        center(d, cx, cy - 150 * s - rise, "PERFECT!", font(24 * s), GOOD + (a,))

    # nút ÉP TIM
    by0 = h - 120 * s
    pressed = phase <= 1
    col = (255, 120, 138) if pressed else ACCENT
    rrect(d, [26 * s, by0, w - 26 * s, by0 + 80 * s], 16 * s, col)
    heart(d, w / 2 - 78 * s, by0 + 40 * s, 1.7 * s, (255, 255, 255))
    center(d, w / 2 + 14 * s, by0 + 22 * s, "ÉP TIM", font(28 * s), (255, 255, 255))

    return img.resize((W, H), Image.LANCZOS).convert("P", palette=Image.ADAPTIVE, colors=128)


if __name__ == "__main__":
    import os
    os.makedirs("screenshots", exist_ok=True)
    frames = [frame(i) for i in range(FRAMES)]
    frames[0].save("screenshots/demo.gif", save_all=True, append_images=frames[1:],
                   duration=70, loop=0, optimize=True, disposal=2)
    print("wrote screenshots/demo.gif")
