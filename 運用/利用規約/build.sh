#!/bin/bash
# 利用規約_全文_2026年10月期.md から、HTML・Word・PDF を作り直します。
#   bash 運用/利用規約/build.sh
# 直すのは .md のほうだけです。
set -e
HERE="$(cd "$(dirname "$0")" && pwd)"
CHROME=/opt/pw-browsers/chromium-1194/chrome-linux/chrome

echo "▼ HTML（UTAGEに貼る用）"
python3 "$HERE/build.py"

echo "▼ Word"
if [ ! -d /tmp/kw/node_modules/docx ]; then mkdir -p /tmp/kw && (cd /tmp/kw && npm install docx >/dev/null 2>&1); fi
node "$HERE/build_docx.js"

echo "▼ PDF（HTMLをChromiumで印刷）"
"$CHROME" --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
  --print-to-pdf="$HERE/利用規約_2026年10月期.pdf" \
  "file://$HERE/利用規約ページ.html" 2>/dev/null
echo "  $HERE/利用規約_2026年10月期.pdf"

echo "できました。"
