#!/usr/bin/env python3
# 利用規約_全文_2026年10月期.md → 利用規約ページ.html
# 直すのは .md のほうです。これを動かすとHTMLが作り直されます。
#   python3 運用/利用規約/build.py
import io, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, '利用規約_全文_2026年10月期.md')
OUT = os.path.join(HERE, '利用規約ページ.html')

KIYAKU_TITLE = 'ファッション起業アカデミア　利用規約'
LINK_TOKUSHO = 'https://utage-system.com/p/I2RWj2I3fX0R'
LINK_PRIVACY = 'https://utage-system.com/p/1zotIwNGGWAf'

HEAD = """<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>利用規約｜ファッション起業アカデミア</title><style>
body{margin:0;background:#fff}
.w{font-family:'Yu Mincho','Hiragino Mincho ProN',serif;color:#332B29;max-width:760px;margin:0 auto;padding:54px 20px 70px}
h1{font-size:26px;line-height:1.7;font-weight:500;color:#6D2E46;margin:0 0 26px}
h2{font-size:18px;line-height:1.7;font-weight:500;color:#6D2E46;margin:38px 0 12px}
h3{font-size:16px;line-height:1.7;font-weight:500;margin:20px 0 8px}
p{font-size:15px;line-height:2.05;margin:0 0 13px}
.sm{font-size:13px;line-height:1.95;color:#6A5A5E}
.dt{font-size:14px;color:#6A5A5E;margin:28px 0 0}
.rl{width:56px;height:1px;background:#A26769;margin:0 0 26px}
.hr{width:100%;height:1px;background:#E0D6D2;margin:40px 0}
a{color:#6D2E46}
@media(max-width:600px){h1{font-size:22px}h2{font-size:17px}p{font-size:14px}}
@media print{
@page{size:A4;margin:20mm 18mm}
.w{max-width:none;padding:0}
h1{font-size:20px;margin:0 0 20px}
h2{font-size:15px;margin:26px 0 8px;page-break-after:avoid;break-after:avoid}
h3{font-size:14px;margin:14px 0 6px;page-break-after:avoid;break-after:avoid}
p{font-size:12.5px;line-height:1.85;margin:0 0 9px;orphans:3;widows:3}
.rl{display:none}
a{color:#332B29;text-decoration:none}
}
</style></head><body><div class="w">
<div class="rl"></div>
<h1>__TITLE__</h1>
""".replace("__TITLE__", KIYAKU_TITLE)

FOOT = """<div class="hr"></div>
<p class="sm">ファッション起業アカデミア　／　Fashion Laboratory　松岡依里子<br>
<a href="__TOKUSHO__">特定商取引法に基づく表記</a>　／　<a href="__PRIVACY__">プライバシーポリシー</a></p>
</div></body></html>
""".replace("__TOKUSHO__", LINK_TOKUSHO).replace("__PRIVACY__", LINK_PRIVACY)


def main():
    src = io.open(SRC, encoding='utf-8').read()

    # 先頭の見出しと申し送り（最初の --- まで）は本文ではないので落とす
    body = src.split('\n---\n', 1)[1].strip()

    out = []
    for block in re.split(r'\n\s*\n', body):
        block = block.strip()
        if not block:
            continue
        if block.startswith('## '):
            out.append('<h2>%s</h2>' % block[3:].strip())
        elif block.startswith('### '):
            out.append('<h3>%s</h3>' % block[4:].strip())
        elif block == '以上':
            out.append('<p style="margin-top:28px">以上</p>')
        elif re.match(r'^\d{4}年\d{1,2}月\d{1,2}日', block):
            out.append('<p class="dt">%s</p>' % block.replace('\n', '<br>'))
        else:
            # 第19条の「プライバシーポリシー」にリンクを張る
            if 'プライバシーポリシー' in block and '当社が別途定める' in block:
                block = block.replace(
                    'プライバシーポリシー',
                    '<a href="%s">プライバシーポリシー</a>' % LINK_PRIVACY, 1)
            out.append('<p>%s</p>' % block.replace('\n', '<br>'))

    html = HEAD + '\n'.join(out) + '\n' + FOOT
    io.open(OUT, 'w', encoding='utf-8').write(html)

    n = len(re.findall(r'<h2>第\d+条', html))
    print('%s を作りました（%d条・%d バイト）' % (OUT, n, len(html.encode('utf-8'))))


if __name__ == '__main__':
    main()
