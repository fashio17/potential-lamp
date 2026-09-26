#!/bin/bash
set -e
# R18「よそゆきを、持っていきませんでした」 2026/9/19
# 主題：旅先でも一日はふつうだった。よそゆきを持っていくと、服が予定を決めてしまう。
# 【素材について】**在庫の最後です。** これで未使用の使える素材はほぼ尽きます。
#   服の話ができる画は「地下鉄の車内」1枚しか残っていないので、そこを軸にしています。
P="/home/user/potential-lamp/reels/素材/パリ"
N="/home/user/potential-lamp/reels/素材/ニューヨーク"
NB="/home/user/potential-lamp/reels/素材/ニューヨーク・ボストン"
SP=/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad
mkdir -p $SP/segR18 $SP/imgR18

CHIKA="$P/地下鉄の車内_本人_花柄ワンピ.jpg"          # 4284x5712。本人・花柄の羽織り＋黒＋パール＋白いバッグ
HATA="$P/百貨店の入口_店名大きい_条件つき.jpg"        # 5712x4284。店名を外して赤い旗だけ使う
PAN="$P/IMG_0902_クロワッサン.mov"                   # 2.4秒・3840x2160（回転-90で縦）
MACHI="$NB/チャイナタウンの街並み_赤いスカート.jpg"   # 1285x2320。通行人が主役にならないよう引きで使う
SHOKU="$NB/IMG_2037_食卓_前半のみ使用可.mov"         # t<4 のみ。網の上の料理。人なし
SORA="$N/IMG_1222_ルーフトップの食卓とマンハッタンの遠景.mov"  # 手前の箱に商品名。上部のスカイラインだけ使う

cutc () { R=$(python3 -c "print(2.07/$3)")
  ffmpeg -y -v error -i "$1" -an \
   -vf "trim=start=$2:duration=$3,setpts=PTS-STARTPTS,crop=$4,scale=1080:1920,setpts=$R*PTS,fps=30,setsar=1" \
   -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$5"; }

pk () { NN=$(python3 -c "print(int(2.07*30))")
  ffmpeg -y -v error -loop 1 -t 2.07 -i "$1" \
   -vf "crop=$2,scale=1620:2880,fps=30,zoompan=z='1.00+0.05*on/$NN':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30,setsar=1" \
   -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p "$3"; }

# 1 表紙：地下鉄の車内。引きで切って、車内の広さを出す。
#   寄りの表紙は避ける決めごとだが、座っている写真なので全身は取れない。
#   引きにすることで「遠目で装いが分かる」形に寄せている。
pk "$CHIKA" "3213:5712:1071:0"       $SP/segR18/k1.mp4
# 2 百貨店の赤い旗。店名（AU BON MARCHÉ）は外し、旗だけを切る
pk "$HATA"  "900:1600:3384:1530"     $SP/segR18/k2.mp4
# 3 クロワッサン。朝
cutc "$PAN" 0.90 1.28 "2160:3840:0:0"  $SP/segR18/k3.mp4
# 4 地下鉄・中景
pk "$CHIKA" "2600:4622:1684:0"       $SP/segR18/k4.mp4
# 5 街。**上の1200pxだけを切る。**こうすると通行人が一人も入らない。
#   （はじめ引きで切ったが、赤いスカートの方が主役になってしまった。9/19に実測して修正）
pk "$MACHI" "675:1200:200:0"         $SP/segR18/k5.mp4
# 6 食卓。網の上の料理。t<4 のみ
cutc "$SHOKU" 1.60 1.28 "1080:1920:420:0" $SP/segR18/k6.mp4
# 7 マンハッタンの遠景。**上の1600pxだけを切る。**手前の箱（商品名が読める）が外れる。
#   （y=260から2160では箱が残っていた。9/19に実測して修正）
cutc "$SORA" 5.00 1.28 "900:1600:600:0"    $SP/segR18/k7.mp4
# 8 締め。地下鉄・寄り。顔がテロップ帯より上に来るよう y=600 から
pk "$CHIKA" "2000:3556:2284:600"     $SP/segR18/k8.mp4

cd $SP/segR18
: > list.txt; for i in $(seq 1 8); do echo "file 'k$i.mp4'" >> list.txt; done
ffmpeg -y -v error -f concat -safe 0 -i list.txt -c copy $SP/baseR18.mp4
echo -n "base の長さ "; ffprobe -v error -show_entries format=duration -of csv=p=0 $SP/baseR18.mp4
