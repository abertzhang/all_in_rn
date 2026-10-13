"""纯标准库生成两张演示用 PNG（无第三方依赖）。

- img_circle.png：200x200 浅灰底 + 蓝色实心圆（用于 resizeMode / 圆形头像 / ImageBackground 叠加）
- img_wide.png  ：320x160 浅灰底 + 红色实心圆（宽图，凸显 cover/contain/stretch 差异）
"""
import zlib
import struct

ASSETS = "/Users/zhangchunhua/project_classic/all_in/all_in_rn/src/assets"


def write_png(path, w, h, pixels):
    raw = bytearray()
    for row in pixels:
        raw.append(0)  # filter type 0 (None)
        for (r, g, b) in row:
            raw += bytes((r, g, b))
    compressed = zlib.compress(bytes(raw), 9)

    def chunk(typ, data):
        return (
            struct.pack(">I", len(data))
            + typ
            + data
            + struct.pack(">I", zlib.crc32(typ + data) & 0xFFFFFFFF)
        )

    sig = b"\x89PNG\r\n\x1a\n"
    ihdr = struct.pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0)  # 8bit, RGB
    with open(path, "wb") as f:
        f.write(sig)
        f.write(chunk(b"IHDR", ihdr))
        f.write(chunk(b"IDAT", compressed))
        f.write(chunk(b"IEND", b""))


def make_circle(w, h, bg, fg, cx, cy, rad):
    out = []
    for y in range(h):
        row = []
        for x in range(w):
            dx, dy = x - cx, y - cy
            row.append(fg if dx * dx + dy * dy <= rad * rad else bg)
        out.append(row)
    return out


write_png(
    f"{ASSETS}/img_circle.png",
    200,
    200,
    make_circle(200, 200, (230, 230, 230), (21, 101, 192), 100, 100, 70),
)
write_png(
    f"{ASSETS}/img_wide.png",
    320,
    160,
    make_circle(320, 160, (240, 240, 240), (229, 57, 53), 160, 80, 50),
)
print("OK: generated img_circle.png + img_wide.png")
