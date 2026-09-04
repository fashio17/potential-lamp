#!/bin/bash
set -e
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
FT=/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc
D=$SP/txR2; rm -rf $D; mkdir -p $D $SP/out
OUT=$SP/out/R2_服を選ぶのが怖い.mp4

# 9枚・106字（17.8万形式）。日本の売り場の映像を持っていないので、
# 「日本の」とは書かない。持っていない絵を言葉で埋めないこと。
printf '服を選ぶのが、こわい'          > $D/1.txt
printf 'よく見る言葉があります'        > $D/2.txt
printf '「失敗しない選び方」'          > $D/3.txt
printf 'パリでも、ニューヨークでも'      > $D/4.txt
printf '見かけませんでした'            > $D/5.txt
printf 'ソウルの売り場にあったのは'      > $D/6.txt
printf '「あなたであれ」\n「自信を持って」' > $D/7.txt
printf '売り場の言葉は、社会を映す'      > $D/8.txt
printf 'あなたは、何がこわいですか'      > $D/9.txt

ST="fontfile=$FT:fontcolor=white:box=1:boxcolor=black@0.58:boxborderw=26:shadowcolor=black@0.5:shadowx=2:shadowy=2:line_spacing=18:x=(w-tw)/2"
d () { echo "drawtext=${ST}:textfile=$D/$1.txt:fontsize=68:y=(h-th)/2:enable='between(t,$2,$3)'"; }

CH="$(d 1  0.10  1.97),$(d 2  2.17  4.04),$(d 3  4.24  6.11),\
$(d 4  6.31  8.18),$(d 5  8.38 10.25),$(d 6 10.45 12.32),\
$(d 7 12.52 14.39),$(d 8 14.59 16.46),$(d 9 16.66 18.53)"

ffmpeg -y -v error -i $SP/baseR2.mp4 -f lavfi -i anullsrc=r=44100:cl=stereo \
 -filter_complex "[0:v]eq=contrast=1.06:saturation=1.08:brightness=0.006,unsharp=5:5:0.4,${CH}[v]" \
 -map "[v]" -map 1:a -shortest -c:v libx264 -preset slow -crf 23 -maxrate 8M -bufsize 16M \
 -pix_fmt yuv420p -profile:v high -level 4.1 -c:a aac -b:a 128k -movflags +faststart "$OUT"
echo "=== 完成 ==="; ls -la "$OUT"
cat $D/*.txt | tr -d '\n' | LC_ALL=C.UTF-8 wc -m
