# -*- coding: utf-8 -*-
"""ストーリー画像（1080x1920）を作る道具。
   20260911_説明会へ の5枚と同じ体裁です。スクラッチパッドに置くと消えるので、
   リポジトリに入れてあります。使い方は各フォルダの build.py を見てください。"""
from PIL import Image, ImageDraw, ImageFont

W, H = 1080, 1920
CREAM = (247, 243, 241)
INK   = (43, 35, 32)
WINE  = (109, 46, 70)
MUTED = (92, 80, 78)
WHITE = (255, 255, 255)

FB = "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"
FR = "/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc"

def f(bold, size):
    return ImageFont.truetype(FB if bold else FR, size, index=0)

def _w(d, t, font):
    return d.textbbox((0, 0), t, font=font)[2]

def page(path, heading, card, body, cta=None, card_gap=34):
    """heading: [行] 太字46px / card: [(文字, 太字, 色, サイズ)] 白カードの中央ぞろえ
       body: [段落([行])] / cta: 太字1行（リンクスタンプの真上に置く言葉）"""
    im = Image.new("RGB", (W, H), CREAM)
    d = ImageDraw.Draw(im)

    # 左上の短い罫
    d.rounded_rectangle([110, 292, 195, 298], radius=3, fill=WINE)

    y = 385
    fh = f(True, 46)
    for line in heading:
        d.text((110, y), line, font=fh, fill=INK)
        y += 74
    y += card_gap

    if card:
        pad = 42
        sizes = [f(b, s) for (_, b, _, s) in card]
        heights = [int(s.size * 1.55) for s in sizes]
        ch = sum(heights) + pad * 2
        d.rounded_rectangle([92, y, 990, y + ch], radius=28, fill=WHITE)
        cy = y + pad
        for (t, b, col, s), fo, hh in zip(card, sizes, heights):
            d.text(((W - _w(d, t, fo)) / 2, cy + (hh - s * 1.25) / 2), t, font=fo, fill=col)
            cy += hh
        y += ch + 56

    fb_ = f(False, 38)
    for para in body:
        for line in para:
            d.text((110, y), line, font=fb_, fill=MUTED)
            y += 60
        y += 32

    if cta:
        y += 18
        fc = f(True, 42)
        d.text(((W - _w(d, cta, fc)) / 2, y), cta, font=fc, fill=INK)

    im.save(path, "JPEG", quality=92)
    print("written", path)
