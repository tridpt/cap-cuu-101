"""Sinh icon PWA cho Cap Cuu 101 (chạy 1 lần). Cần Pillow."""
from PIL import Image, ImageDraw


def make_icon(size: int, path: str) -> None:
    img = Image.new("RGBA", (size, size), (15, 16, 32, 255))  # nền #0f1020
    d = ImageDraw.Draw(img)

    # vòng tròn đỏ (an toàn trong vùng maskable ~80%)
    pad = size * 0.16
    d.ellipse([pad, pad, size - pad, size - pad], fill=(255, 93, 115, 255))  # #ff5d73

    # chữ thập trắng
    cx = cy = size / 2
    arm = size * 0.26   # nửa chiều dài thanh
    thick = size * 0.085  # nửa độ dày
    d.rectangle([cx - thick, cy - arm, cx + thick, cy + arm], fill=(255, 255, 255, 255))
    d.rectangle([cx - arm, cy - thick, cx + arm, cy + thick], fill=(255, 255, 255, 255))

    img.save(path, "PNG")
    print("wrote", path)


if __name__ == "__main__":
    import os
    os.makedirs("icons", exist_ok=True)
    make_icon(192, "icons/icon-192.png")
    make_icon(512, "icons/icon-512.png")
