"""Sinh icon PWA cho Cap Cuu 101 (chạy 1 lần). Cần Pillow.
Theme Terminal/8-bit: nền CRT xanh-đen, chữ thập pixel xanh phosphor."""
from PIL import Image, ImageDraw

BG = (4, 18, 10, 255)        # #04120a nền CRT
LINE = (28, 90, 52, 255)     # #1c5a34 viền
GOOD = (70, 240, 138, 255)   # #46f08a xanh phosphor
AMBER = (255, 225, 77, 255)  # #ffe14d hổ phách


def make_icon(size: int, path: str) -> None:
    img = Image.new("RGBA", (size, size), BG)
    d = ImageDraw.Draw(img)

    # viền pixel (trong vùng maskable an toàn)
    b = size * 0.06
    d.rectangle([b, b, size - b, size - b], outline=LINE, width=max(2, int(size * 0.02)))

    # chữ thập pixel vuông (thay cho vòng tròn bo mềm)
    cx = cy = size / 2
    arm = size * 0.28   # nửa chiều dài thanh
    thick = size * 0.10  # nửa độ dày
    d.rectangle([cx - thick, cy - arm, cx + thick, cy + arm], fill=GOOD)
    d.rectangle([cx - arm, cy - thick, cx + arm, cy + thick], fill=GOOD)

    # gạch hổ phách kiểu "baseline terminal"
    d.rectangle([cx - arm, size * 0.82, cx + arm, size * 0.82 + size * 0.045], fill=AMBER)

    img.save(path, "PNG")
    print("wrote", path)


if __name__ == "__main__":
    import os
    os.makedirs("icons", exist_ok=True)
    make_icon(192, "icons/icon-192.png")
    make_icon(512, "icons/icon-512.png")
