/**
 * ファッション起業 7つのステップ ― 受講生向け教材スライド 生成スクリプト
 *
 *   node build_slides.js
 *
 * 主対象：パーソナルスタイリスト／イメージコンサルタント（受講生の3/4）
 *         物販の方（1/4）には各所に「▷ 物販の方は」で置き換えを添える
 * 中身  ：7つのステップは器。中身はファッション心理学とコーチング
 * 出力  ：ファッション起業7つのステップ.pptx （全22枚 / 16:9 ワイド）
 */

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5 inch
pres.author = "Fashion Entrepreneurship Academia";
pres.title = "ファッション起業 7つのステップ";

/* ---------- パレット（上品・知的／くすみピンク × グレージュ） ---------- */
const PLUM = "3E2F38";
const PLUM_DK = "2A1F26";
const ROSE = "C08F97";
const ROSE_DK = "A8737C";
const ROSE_LT = "E3C9CD";
const GREIGE = "EAE3DD";
const GREIGE_LT = "F7F3F0";
const INK = "33292E";
const MUTED = "7C6E73";
const WHITE = "FFFFFF";

const HEAD = "Yu Mincho";
const BODY = "Yu Gothic";

const W = 13.333;
const M = 0.75;
const CW = W - M * 2;
const KICKER = "Fashion  ×  Psychology  ×  AI";

/* ---------- ヘルパー ---------- */

const shadow = () => ({ type: "outer", color: "9A8890", blur: 10, offset: 2, angle: 90, opacity: 0.16 });

function kicker(s, dark) {
  s.addText(KICKER, {
    x: W - M - 4.2, y: 0.32, w: 4.2, h: 0.34, align: "right", valign: "middle",
    fontFace: BODY, fontSize: 9.5, color: dark ? ROSE_LT : MUTED, charSpacing: 2, margin: 0,
  });
}

function chipLabel(s, text) {
  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 0.32, w: 1.25, h: 0.34, rectRadius: 0.08, fill: { color: ROSE },
  });
  s.addText(text, {
    x: M, y: 0.32, w: 1.25, h: 0.34, align: "center", valign: "middle",
    fontFace: BODY, fontSize: 11, bold: true, color: WHITE, margin: 0,
  });
}

function titleBlock(s, title, lead, chip) {
  if (chip) chipLabel(s, chip);
  kicker(s, false);
  s.addText(title, {
    x: M, y: 0.78, w: CW, h: 0.72,
    fontFace: HEAD, fontSize: 28, bold: true, color: PLUM, margin: 0, valign: "middle",
  });
  if (lead) {
    s.addText(lead, {
      x: M, y: 1.5, w: CW, h: 0.4,
      fontFace: BODY, fontSize: 13, color: MUTED, margin: 0, valign: "middle",
    });
  }
}

function numCircle(s, x, y, d, n, fill, txt, size) {
  s.addShape(pres.ShapeType.ellipse, { x, y, w: d, h: d, fill: { color: fill } });
  s.addText(String(n), {
    x, y, w: d, h: d, align: "center", valign: "middle",
    fontFace: HEAD, fontSize: size, bold: true, color: txt, margin: 0,
  });
}

function card(s, x, y, w, h, fill) {
  s.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.07, fill: { color: fill || GREIGE_LT }, shadow: shadow(),
  });
}

function band(s, y, h, text, opts) {
  const o = opts || {};
  s.addShape(pres.ShapeType.roundRect, {
    x: M, y, w: CW, h, rectRadius: 0.07, fill: { color: o.fill || PLUM },
  });
  s.addText(text, {
    x: M + 0.45, y, w: CW - 0.9, h,
    fontFace: BODY, fontSize: o.size || 13, color: o.color || GREIGE,
    margin: 0, valign: "middle", lineSpacing: o.lineSpacing || 21,
  });
}

/** 「▶ 心理学の使いどころ」「▷ 物販の方は」の1行 */
function noteLine(s, y, label, text, tone) {
  const rose = tone === "rose";
  s.addShape(pres.ShapeType.roundRect, {
    x: M, y, w: CW, h: 0.58, rectRadius: 0.05, fill: { color: rose ? ROSE_LT : GREIGE },
  });
  s.addText([
    { text: label + "　", options: { bold: true, color: rose ? PLUM : ROSE_DK } },
    { text: text, options: { color: INK } },
  ], {
    x: M + 0.35, y, w: CW - 0.7, h: 0.58,
    fontFace: BODY, fontSize: 11.5, margin: 0, valign: "middle",
  });
}

/* =========================================================
   1. 表紙
   ========================================================= */
{
  const s = pres.addSlide();
  s.background = { color: PLUM };

  s.addShape(pres.ShapeType.ellipse, { x: 8.75, y: 1.7, w: 3.7, h: 3.7, fill: { color: PLUM_DK } });
  s.addShape(pres.ShapeType.ellipse, {
    x: 8.75, y: 1.7, w: 3.7, h: 3.7, fill: { color: PLUM, transparency: 100 },
    line: { color: ROSE, width: 1.25 },
  });
  s.addText("7", {
    x: 8.75, y: 1.7, w: 3.7, h: 3.7, align: "center", valign: "middle",
    fontFace: HEAD, fontSize: 140, bold: true, color: ROSE_LT, margin: 0,
  });

  s.addText(KICKER, {
    x: M, y: 1.85, w: 7.4, h: 0.34,
    fontFace: BODY, fontSize: 11, color: ROSE_LT, charSpacing: 4, margin: 0, valign: "middle",
  });
  s.addText("ファッション起業", {
    x: M, y: 2.28, w: 7.4, h: 0.8,
    fontFace: HEAD, fontSize: 36, color: WHITE, margin: 0, valign: "middle",
  });
  s.addText("7つのステップ", {
    x: M, y: 3.02, w: 7.4, h: 1.05,
    fontFace: HEAD, fontSize: 52, bold: true, color: WHITE, margin: 0, valign: "middle",
  });
  s.addText("感性と専門性を、選ばれる仕組みに変える", {
    x: M, y: 4.22, w: 7.4, h: 0.45,
    fontFace: BODY, fontSize: 17, color: GREIGE, margin: 0, valign: "middle",
  });
  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 4.9, w: 7.4, h: 0.55, rectRadius: 0.1, fill: { color: PLUM_DK },
  });
  s.addText("器は7つのステップ　／　中身は ファッション心理学 と コーチング", {
    x: M + 0.3, y: 4.9, w: 7.0, h: 0.55,
    fontFace: BODY, fontSize: 12.5, bold: true, color: ROSE_LT, margin: 0, valign: "middle",
  });
  s.addText("6ヶ月実践講座　全体像の回　／　講義90分 ＋ ワークショップ60分", {
    x: M, y: 5.62, w: 7.4, h: 0.35,
    fontFace: BODY, fontSize: 11, color: MUTED, charSpacing: 1, margin: 0, valign: "middle",
  });

  s.addNotes(
    "集客テクニックの話ではないと最初に宣言する。\n" +
    "7つは器で、中身はファッション心理学とコーチング。ここが他の起業塾との決定的な違い。"
  );
}

/* =========================================================
   2. この6ヶ月で仕上げる状態
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "この6ヶ月で仕上げる状態", "目指すのは「たくさん学んだ状態」ではなく、形になった状態です");

  const goals = [
    ["資格名ではなく、変化の言葉で言える", "「診断ができます」ではなく、その人が何をできるようになるのか。"],
    ["診断だけで終わらない商品がある", "入口・本命・継続の3層。診断は入口であって、商品そのものではない。"],
    ["個別相談まで、線になっている", "発信を見た人が次にどこへ行き、何を見て決めるのかがつながっている。"],
  ];
  const cw = 3.75, gap = 0.42;
  goals.forEach((g, i) => {
    const x = M + i * (cw + gap);
    card(s, x, 2.05, cw, 2.8, GREIGE_LT);
    numCircle(s, x + 0.4, 2.36, 0.74, i + 1, PLUM, ROSE_LT, 24);
    s.addText(g[0], {
      x: x + 0.4, y: 3.24, w: cw - 0.8, h: 0.78,
      fontFace: HEAD, fontSize: 18, bold: true, color: PLUM, margin: 0, valign: "top", lineSpacing: 25,
    });
    s.addText(g[1], {
      x: x + 0.4, y: 4.02, w: cw - 0.8, h: 0.76,
      fontFace: BODY, fontSize: 11.5, color: INK, margin: 0, valign: "top", lineSpacing: 18,
    });
  });

  band(s, 5.1, 0.95, "そしてこの3つ全部に、心理学とコーチングが入っている状態です。診断ができる人と、観念まで扱える人。その差が、選ばれるかどうかの差になります。");

  noteLine(s, 6.3, "▷ 物販の方は", "「診断」を「商品そのもの」に置き換えて聞いてください。並べるだけの人と、お客様の観念まで分かって見せられる人の差です。");

  s.addNotes("ゴールを「形になった状態」で定義する。物販の方への読み替えを毎回1行だけ添える。");
}

/* =========================================================
   3. 大前提（ダーク）
   ========================================================= */
{
  const s = pres.addSlide();
  s.background = { color: PLUM };
  kicker(s, true);

  s.addText("この6ヶ月の大前提", {
    x: M, y: 1.5, w: 7.0, h: 0.4,
    fontFace: BODY, fontSize: 12.5, color: ROSE_LT, charSpacing: 3, margin: 0, valign: "middle",
  });
  s.addText("「売れる」は結果。\n「選ばれる」が原因。", {
    x: M, y: 2.05, w: 7.0, h: 1.9,
    fontFace: HEAD, fontSize: 40, bold: true, color: WHITE, margin: 0, valign: "middle", lineSpacing: 62,
  });
  s.addText("売上は結果です。結果を直接いじろうとしても動きません。\n動かすのは原因のほう ―― 選ばれているかどうか、です。", {
    x: M, y: 4.15, w: 7.0, h: 1.0,
    fontFace: BODY, fontSize: 14, color: GREIGE, margin: 0, valign: "top", lineSpacing: 24,
  });

  const pair = [
    ["結果を追いかけると", "投稿を増やす／値下げ／キャンペーン\n→ 動かないまま、しんどくなる", PLUM_DK, ROSE_LT, GREIGE],
    ["原因を整えると", "「この人にお願いしたい」をつくる\n→ 売上は、あとからついてくる", GREIGE_LT, ROSE_DK, PLUM],
  ];
  pair.forEach((p, i) => {
    const y = 2.05 + i * 1.75;
    s.addShape(pres.ShapeType.roundRect, {
      x: 8.35, y, w: 4.23, h: 1.5, rectRadius: 0.07, fill: { color: p[2] },
    });
    s.addText(p[0], {
      x: 8.7, y: y + 0.16, w: 3.6, h: 0.35,
      fontFace: BODY, fontSize: 12.5, bold: true, color: p[3], margin: 0, valign: "middle",
    });
    s.addText(p[1], {
      x: 8.7, y: y + 0.55, w: 3.6, h: 0.8,
      fontFace: BODY, fontSize: 12, color: p[4], margin: 0, valign: "top", lineSpacing: 19,
    });
  });

  s.addNotes("6ヶ月の共通言語になる一文。早口にしない。板書できるなら板書する。");
}

/* =========================================================
   4. なぜ埋もれるのか（診断はコモディティ）
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "診断ができることは、もう差別化になりません", "ただし ―― うまくいかない理由は、センスでも努力でもありません");

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 2.0, w: 6.0, h: 1.45, rectRadius: 0.07, fill: { color: GREIGE },
  });
  s.addText("パーソナルカラー　骨格　顔タイプ", {
    x: M + 0.35, y: 2.14, w: 5.3, h: 0.4,
    fontFace: BODY, fontSize: 13, bold: true, color: ROSE_DK, charSpacing: 1, margin: 0, valign: "middle",
  });
  s.addText("同じ資格、同じ診断結果、似た料金。\nこの中に置かれると、お客様から違いが見えません。", {
    x: M + 0.35, y: 2.58, w: 5.3, h: 0.78,
    fontFace: BODY, fontSize: 12.5, color: INK, margin: 0, valign: "top", lineSpacing: 20,
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M + 6.33, y: 2.0, w: 5.5, h: 1.45, rectRadius: 0.07, fill: { color: PLUM },
  });
  s.addText("感性と専門性はあるのに、\nそれが「選ばれる仕組み」になっていない。", {
    x: M + 6.68, y: 2.0, w: 4.8, h: 1.45,
    fontFace: HEAD, fontSize: 16, bold: true, color: WHITE, margin: 0, valign: "middle", lineSpacing: 29,
  });

  const sym = [
    "資格名は言えるが、提供できる変化が言葉になっていない",
    "診断メニューはあるが、その先の商品がない",
    "発信が単発で終わっている",
    "診断結果を渡しても、お客様が実際には変わらない",
  ];
  sym.forEach((t, i) => {
    const y = 3.7 + i * 0.7;
    s.addShape(pres.ShapeType.roundRect, {
      x: M, y, w: CW, h: 0.58, rectRadius: 0.05,
      fill: { color: i === 3 ? ROSE_LT : GREIGE_LT },
    });
    s.addText(t, {
      x: M + 0.35, y, w: CW - 0.7, h: 0.58,
      fontFace: BODY, fontSize: 12.5, bold: i === 3, color: i === 3 ? PLUM : INK, margin: 0, valign: "middle",
    });
  });

  band(s, 6.55, 0.62, "最後のひとつは、マーケティングの問題ではありません。心理の問題です。そこがこの講座の中心です。", { size: 12.5 });

  s.addNotes("厳しい話をしつつ、原因を能力から設計・心理へ移す。最後の1行が講座の中心宣言。");
}

/* =========================================================
   5. 7ステップの全体像と2本の柱
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "7ステップの全体像と、2本の柱", "7つは器です。中に入る中身が、ファッション心理学とコーチングです");

  const steps = [
    ["価値の言語化", "資格名ではなく、変化の言葉に"],
    ["選ばれる理由を決める", "理想のお客様と、深いほうの詰まり"],
    ["商品設計", "診断単発から抜ける3層"],
    ["発信設計", "7つの心理ステップで導く"],
    ["販売導線", "発信から個別相談までを線に"],
    ["セッション設計", "心理学とコーチングを実装する"],
    ["仕組み化・自動化", "UTAGE / L Message / AI"],
  ];
  steps.forEach((st, i) => {
    const col = i < 4 ? 0 : 1;
    const row = i < 4 ? i : i - 4;
    const x = M + col * 6.13;
    const y = 2.0 + row * 0.76;
    s.addShape(pres.ShapeType.roundRect, {
      x, y, w: 5.7, h: 0.64, rectRadius: 0.06, fill: { color: i % 2 === 0 ? GREIGE_LT : GREIGE },
    });
    numCircle(s, x + 0.2, y + 0.12, 0.4, i + 1, PLUM, ROSE_LT, 13);
    s.addText(st[0], {
      x: x + 0.72, y, w: 2.3, h: 0.64,
      fontFace: BODY, fontSize: 12.5, bold: true, color: PLUM, margin: 0, valign: "middle",
    });
    s.addText(st[1], {
      x: x + 3.08, y, w: 2.5, h: 0.64,
      fontFace: BODY, fontSize: 10, color: MUTED, margin: 0, valign: "middle",
    });
  });

  const pillars = [
    ["柱①　ファッション心理学", "観念を洗い出し、書き換える\nDISCOVERY → AWAKENESS → Circulation"],
    ["柱②　コーチング", "本音を引き出す。「似合う」と「なりたい」のズレ\nセルフコーチングも含む"],
  ];
  pillars.forEach((p, i) => {
    const x = M + 6.13;
    const y = 4.35 + i * 1.0;
    s.addShape(pres.ShapeType.roundRect, {
      x, y, w: 5.7, h: 0.88, rectRadius: 0.06, fill: { color: PLUM },
    });
    s.addText(p[0], {
      x: x + 0.32, y: y + 0.06, w: 5.06, h: 0.32,
      fontFace: BODY, fontSize: 11.5, bold: true, color: ROSE_LT, margin: 0, valign: "middle",
    });
    s.addText(p[1], {
      x: x + 0.32, y: y + 0.38, w: 5.06, h: 0.46,
      fontFace: BODY, fontSize: 10, color: GREIGE, margin: 0, valign: "top", lineSpacing: 15,
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 5.25, w: 5.7, h: 0.98, rectRadius: 0.06, fill: { color: ROSE_LT },
  });
  s.addText("発信ネタが出ないのは STEP4 ではなく STEP1・2 の問題。\n詰まったら、必ず一つ上に戻る。", {
    x: M + 0.32, y: 5.25, w: 5.06, h: 0.98,
    fontFace: BODY, fontSize: 11.5, bold: true, color: PLUM, margin: 0, valign: "middle", lineSpacing: 19,
  });

  band(s, 6.45, 0.6, "STEP7の自動化だけは、1〜5が固まる前に手を出さないでください。", { size: 12.5 });

  s.addNotes("毎回の講義冒頭で「今日は何番の話か」を必ず言う。2本の柱を外すと、どこにでもある起業塾の話になる。");
}

/* =========================================================
   6. 柱① ファッション心理学（ダーク）
   ========================================================= */
{
  const s = pres.addSlide();
  s.background = { color: PLUM };
  kicker(s, true);
  chipLabel(s, "柱 ①");

  s.addText("ファッション心理学 ―― 観念を洗い出し、書き換える", {
    x: M, y: 0.78, w: CW, h: 0.7,
    fontFace: HEAD, fontSize: 27, bold: true, color: WHITE, margin: 0, valign: "middle",
  });
  s.addText("扱うのは「似合う色」ではありません。その人がファッションに対して持っている思い込みです。", {
    x: M, y: 1.48, w: CW, h: 0.4,
    fontFace: BODY, fontSize: 12.5, color: ROSE_LT, margin: 0, valign: "middle",
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 1.95, w: CW, h: 1.15, rectRadius: 0.07, fill: { color: PLUM_DK },
  });
  s.addText("「安かったから、つい買っちゃって」　「私なんかがこんな服着ても」\n「素敵な服を着ていないと恥ずかしい」　「診断とかあるけど、結局好きなものを着ちゃうよね」", {
    x: M + 0.45, y: 1.95, w: CW - 0.9, h: 1.15,
    fontFace: BODY, fontSize: 13, color: GREIGE, margin: 0, valign: "middle", lineSpacing: 25,
  });
  s.addText("これ全部、観念です。そして観念は、たいてい過去の体験からできています。", {
    x: M, y: 3.2, w: CW, h: 0.38,
    fontFace: BODY, fontSize: 12.5, color: ROSE_LT, margin: 0, valign: "middle",
  });

  const phases = [
    ["DISCOVERY", "自己を見つめる", "自分インタビュー「あなたにとってファッションとは？」\n観念の洗い出し／過去の体験（辛かったこと・嬉しかったこと）"],
    ["AWAKENESS", "気づき", "その観念がどこから来たのかに気づく\n家族のファッション観念／関係を作った思い出"],
    ["Circulation", "豊かさを受け取る", "思い出の書き換え／執着の手放し／フォーカス先を変える\n今ある豊かさを見つける／願望ワーク"],
  ];
  const cw = 3.75, gap = 0.42;
  phases.forEach((p, i) => {
    const x = M + i * (cw + gap);
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 3.7, w: cw, h: 2.3, rectRadius: 0.07, fill: { color: GREIGE_LT },
    });
    s.addText(p[0], {
      x: x + 0.3, y: 3.88, w: cw - 0.6, h: 0.36,
      fontFace: BODY, fontSize: 12.5, bold: true, color: ROSE_DK, charSpacing: 2, margin: 0, valign: "middle",
    });
    s.addText(p[1], {
      x: x + 0.3, y: 4.26, w: cw - 0.6, h: 0.42,
      fontFace: HEAD, fontSize: 18, bold: true, color: PLUM, margin: 0, valign: "middle",
    });
    s.addText(p[2], {
      x: x + 0.3, y: 4.74, w: cw - 0.6, h: 1.15,
      fontFace: BODY, fontSize: 10.5, color: INK, margin: 0, valign: "top", lineSpacing: 16,
    });
  });

  s.addText("この3つを通ると、同じ診断結果でも、お客様の受け取り方がまったく変わります。", {
    x: M, y: 6.25, w: CW, h: 0.5,
    fontFace: BODY, fontSize: 13.5, bold: true, color: ROSE_LT, margin: 0, valign: "middle",
  });

  s.addNotes("この講座の核。自分の講義で受講生が実際に出した言葉を1つ入れると一気に伝わる。");
}

/* =========================================================
   7. 柱② コーチング
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "コーチング ―― 「似合う」と「なりたい」のズレ", "やることは、相手の本音を引き出して、前に進める状態をつくること", "柱 ②");

  const gap2 = [
    ["診断で出る「似合う」", "淡い色が似合います／この形が似合います", GREIGE_LT],
    ["本人の「なりたい」", "でも、黒でかっこよくいたい／憧れているのは別の形", GREIGE],
  ];
  gap2.forEach((g, i) => {
    const x = M + i * 6.13;
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 2.0, w: 5.7, h: 1.2, rectRadius: 0.07, fill: { color: g[2] },
    });
    s.addText(g[0], {
      x: x + 0.35, y: 2.14, w: 5.0, h: 0.4,
      fontFace: HEAD, fontSize: 18, bold: true, color: PLUM, margin: 0, valign: "middle",
    });
    s.addText(g[1], {
      x: x + 0.35, y: 2.58, w: 5.0, h: 0.48,
      fontFace: BODY, fontSize: 11.5, color: INK, margin: 0, valign: "middle",
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 3.4, w: CW, h: 0.9, rectRadius: 0.07, fill: { color: ROSE_LT },
  });
  s.addText("ここで「でも診断結果はこうなので」と押すと、その方は納得しないまま帰って、結局着ません。", {
    x: M + 0.45, y: 3.4, w: CW - 0.9, h: 0.9,
    fontFace: BODY, fontSize: 13.5, bold: true, color: PLUM, margin: 0, valign: "middle",
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 4.5, w: CW, h: 1.3, rectRadius: 0.07, fill: { color: PLUM },
  });
  s.addText("「なりたい姿は、どこから来ていますか」「その姿になったら、何が変わりますか」", {
    x: M + 0.45, y: 4.65, w: CW - 0.9, h: 0.45,
    fontFace: HEAD, fontSize: 17, bold: true, color: WHITE, margin: 0, valign: "middle",
  });
  s.addText("本音を聞いてから、似合うを乗せる。順番が逆なんです。", {
    x: M + 0.45, y: 5.12, w: CW - 0.9, h: 0.5,
    fontFace: BODY, fontSize: 13, color: GREIGE, margin: 0, valign: "middle",
  });

  noteLine(s, 6.0, "▶ 自分にも使う", "不安になる → 比べて落ち込む → 発信がブレる → 商品が決まらない。自分の状態は、そのまま仕事の結果に出ます。", "rose");

  s.addNotes("コーチングは接客技術ではなく、サービスの中身。セルフコーチングは17枚目で詳しく。");
}

/* =========================================================
   8. STEP1 価値の言語化
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "価値の言語化 ―― 資格名を並べるのをやめる", "7つのうちの1番目。正直に言うと、ここが8割です", "STEP 1");

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 2.0, w: CW, h: 1.0, rectRadius: 0.07, fill: { color: GREIGE },
  });
  s.addText([
    { text: "よくある形　", options: { bold: true, color: ROSE_DK } },
    { text: "「パーソナルカラー診断、骨格診断、顔タイプ診断ができます。○○協会認定講師です。」", options: { color: INK } },
    { text: "\n何ができるかは書いてあるが、自分がどうなるのかが書いていない。", options: { bold: true, color: PLUM } },
  ], {
    x: M + 0.45, y: 2.0, w: CW - 0.9, h: 1.0,
    fontFace: BODY, fontSize: 12.5, margin: 0, valign: "middle", lineSpacing: 22,
  });

  const q = [
    ["専門性", "何を根拠に語れるか。理論、心理学、経験年数。謙遜は、お客様にとっては情報不足です。"],
    ["提供できる変化", "「似合う色が分かる」の先。朝の支度が短くなる、写真に写るのが嫌でなくなる。"],
    ["価値観", "何を大事にし、何をやらないか。「流行は追いません」「たくさん買わせません」。"],
  ];
  const cw = 3.75, gap = 0.42;
  q.forEach((item, i) => {
    const x = M + i * (cw + gap);
    card(s, x, 3.2, cw, 2.1, GREIGE_LT);
    numCircle(s, x + 0.36, 3.42, 0.56, i + 1, ROSE, WHITE, 18);
    s.addText(item[0], {
      x: x + 1.04, y: 3.44, w: cw - 1.4, h: 0.52,
      fontFace: HEAD, fontSize: 18, bold: true, color: PLUM, margin: 0, valign: "middle",
    });
    s.addText(item[1], {
      x: x + 0.36, y: 4.1, w: cw - 0.72, h: 1.1,
      fontFace: BODY, fontSize: 11.5, color: INK, margin: 0, valign: "top", lineSpacing: 18,
    });
  });

  noteLine(s, 5.5, "▶ 心理学の使いどころ", "変化が書けないときは、お客様の観念を思い出す。「安いから買ってしまう」人が、あなたと会って何が変わるのか。", "rose");
  noteLine(s, 6.2, "▷ 物販の方は", "「資格」を「素材やこだわり」に置き換えを。「シルク100%です」で止まるのが同じ失敗です。");

  s.addNotes("7つの中で最も時間を使う。NG例は必ず声に出して読む（受講生の多くが自分のことだと気づく）。");
}

/* =========================================================
   9. STEP1 ミニワーク
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "ミニワーク ―― まず、自分の観念から", "自分の観念に気づいていない人は、お客様の観念も扱えません", "STEP 1");

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 2.05, w: CW, h: 1.45, rectRadius: 0.07, fill: { color: PLUM },
  });
  s.addText("「あなたにとって、ファッションとは何ですか。」", {
    x: M + 0.5, y: 2.05, w: CW - 1.0, h: 1.45,
    fontFace: HEAD, fontSize: 27, bold: true, color: WHITE, margin: 0, valign: "middle",
  });

  s.addText("生活に不可欠　／　自己評価する道具　／　自分を守る鎧　／　自己表現　／　ご褒美　／　面倒なもの　――　ネガティブなものも含めて", {
    x: M, y: 3.6, w: CW, h: 0.42,
    fontFace: BODY, fontSize: 11.5, color: MUTED, margin: 0, valign: "middle",
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 4.15, w: CW, h: 1.5, rectRadius: 0.07, fill: { color: GREIGE },
  });
  s.addText("そのあと、この一文を埋める", {
    x: M + 0.5, y: 4.28, w: CW - 1.0, h: 0.32,
    fontFace: BODY, fontSize: 11.5, bold: true, color: ROSE_DK, charSpacing: 1, margin: 0, valign: "middle",
  });
  s.addText("「（　　　　）な人が、（　　　　）できるようになるお手伝いをしています。\n　それは私が（　　　　）だからです。」", {
    x: M + 0.5, y: 4.62, w: CW - 1.0, h: 0.95,
    fontFace: HEAD, fontSize: 18, bold: true, color: PLUM, margin: 0, valign: "middle", lineSpacing: 34,
  });

  band(s, 5.9, 0.95, "完璧でなくて大丈夫です。書けなかった箇所が、今月のあなたの課題です。「ファッションとは何か」に答えられないこと自体も、今日の収穫です。");

  s.addNotes("3分きっちり測る。オンラインはチャットに1人1行。他の人の言葉を見るのが最大の学びになる。");
}

/* =========================================================
   10. STEP2 選ばれる理由
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "選ばれる理由を決める", "「誰もやっていないこと」は探さない。決めるのは3つだけです", "STEP 2");

  const three = [
    ["理想のお客様", "年齢・性別で止めない。困っている場面まで降ろす。",
      "例：子どもの入学式で、浮かないけれど埋もれない服が分からない40代"],
    ["その人の「詰まり」", "表面は「何を着ればいいか分からない」。その下を見る。",
      "「試着室で自分の姿を見るのが怖い」「クローゼットは一杯なのに、着る服がない」"],
    ["あなたを選ぶ理由", "診断だけならコモディティ。観念のところまで扱えること。",
      "「なぜ似合う服を着ても続かないのか、理由から一緒に見ます」"],
  ];
  three.forEach((t, i) => {
    const y = 2.0 + i * 1.28;
    s.addShape(pres.ShapeType.roundRect, {
      x: M, y, w: CW, h: 1.1, rectRadius: 0.06, fill: { color: i % 2 === 0 ? GREIGE_LT : GREIGE },
    });
    numCircle(s, M + 0.3, y + 0.28, 0.54, i + 1, PLUM, ROSE_LT, 17);
    s.addText(t[0], {
      x: M + 1.0, y: y + 0.1, w: 2.9, h: 0.4,
      fontFace: HEAD, fontSize: 17, bold: true, color: PLUM, margin: 0, valign: "middle",
    });
    s.addText(t[1], {
      x: M + 1.0, y: y + 0.52, w: 4.6, h: 0.5,
      fontFace: BODY, fontSize: 11, color: INK, margin: 0, valign: "top", lineSpacing: 16,
    });
    s.addText(t[2], {
      x: M + 5.8, y: y + 0.16, w: 5.7, h: 0.78,
      fontFace: BODY, fontSize: 11, italic: true, color: ROSE_DK, margin: 0, valign: "middle", lineSpacing: 17,
    });
  });

  noteLine(s, 5.9, "▶ コーチングの使いどころ", "理想客が分からないときは、これまで「話していて楽しかったお客様」を3人思い出す。共通点が理想客です。", "rose");

  band(s, 6.6, 0.55, "絞るのは「発信の入口」だけ。買ってくださる方を制限するわけではありません。", { size: 12.5 });

  s.addNotes("「詰まりの深さ＝専門性の深さ」が肝。絞る不安への補足を必ず言う。");
}

/* =========================================================
   11. STEP3 商品設計
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "商品設計 ―― 診断単発から抜ける", "疲弊する原因は「単価が安い」ことではなく、商品が1層しかないことです", "STEP 3");

  const layers = [
    ["本命商品", "いちばん変化を届ける。利益はここ", "診断＋観念のワーク＋実践までの継続プログラム（3〜6ヶ月の伴走）", PLUM, WHITE, GREIGE, ROSE_LT],
    ["入口商品", "はじめての方が試せる。役割は出会いの数", "単発診断／パーソナルカラー体験／ミニ相談　← 診断メニューはここ", GREIGE, PLUM, INK, MUTED],
    ["継続商品", "一度いらした方が、次に選ぶもの", "季節ごとのクローゼット見直し／同行／月額フォロー／養成講座", GREIGE_LT, PLUM, INK, MUTED],
  ];
  layers.forEach((l, i) => {
    const y = 2.0 + i * 1.12;
    s.addShape(pres.ShapeType.roundRect, {
      x: M, y, w: CW, h: 0.98, rectRadius: 0.06, fill: { color: l[3] },
    });
    s.addText(l[0], {
      x: M + 0.35, y: y + 0.1, w: 2.0, h: 0.4,
      fontFace: HEAD, fontSize: 18, bold: true, color: l[4], margin: 0, valign: "middle",
    });
    s.addText(l[1], {
      x: M + 0.35, y: y + 0.52, w: 3.5, h: 0.34,
      fontFace: BODY, fontSize: 10.5, color: l[6], margin: 0, valign: "middle",
    });
    s.addText(l[2], {
      x: M + 4.1, y, w: 7.4, h: 0.98,
      fontFace: BODY, fontSize: 12, color: l[5], margin: 0, valign: "middle",
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 5.4, w: CW, h: 0.9, rectRadius: 0.07, fill: { color: ROSE_LT },
  });
  s.addText("本命商品から先に決めてください。入口から作ると「診断だけ受けて終わり」になります。", {
    x: M + 0.45, y: 5.4, w: CW - 0.9, h: 0.9,
    fontFace: BODY, fontSize: 13, bold: true, color: PLUM, margin: 0, valign: "middle",
  });

  noteLine(s, 6.45, "▷ 物販の方は", "入口＝小物・定番、本命＝主力アイテム、継続＝色違い・セット・定期便に置き換えてください。");

  s.addNotes("イメコン・スタイリストの単発疲弊は「商品が1層」が原因。診断は入口であって商品そのものではない。");
}

/* =========================================================
   12. なぜ診断結果は実行されないのか（ダーク）
   ========================================================= */
{
  const s = pres.addSlide();
  s.background = { color: PLUM };
  kicker(s, true);
  s.addText("この講座の核心", {
    x: M, y: 0.8, w: CW, h: 0.38,
    fontFace: BODY, fontSize: 12.5, color: ROSE_LT, charSpacing: 3, margin: 0, valign: "middle",
  });
  s.addText("なぜ、診断結果は実行されないのか", {
    x: M, y: 1.2, w: CW, h: 0.72,
    fontFace: HEAD, fontSize: 29, bold: true, color: WHITE, margin: 0, valign: "middle",
  });
  s.addText("お客様は喜んで帰られた。なのに3ヶ月後、前と同じ服を着ている ―― 意志が弱いからではありません。", {
    x: M, y: 1.95, w: CW, h: 0.4,
    fontFace: BODY, fontSize: 12.5, color: GREIGE, margin: 0, valign: "middle",
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 2.45, w: CW, h: 1.1, rectRadius: 0.07, fill: { color: PLUM_DK },
  });
  s.addText("買おうとした瞬間に、その人の中でこう聞こえます。\n「私なんかがこんな明るい色を着ても」「高いな、安いのでいいや」「家族に何か言われそう」", {
    x: M + 0.45, y: 2.45, w: CW - 0.9, h: 1.1,
    fontFace: BODY, fontSize: 12.5, color: GREIGE, margin: 0, valign: "middle", lineSpacing: 24,
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 3.75, w: CW, h: 0.8, rectRadius: 0.07, fill: { color: ROSE_LT },
  });
  s.addText("知識は入っても、観念はそのまま。だから行動が変わりません。", {
    x: M + 0.45, y: 3.75, w: CW - 0.9, h: 0.8,
    fontFace: HEAD, fontSize: 19, bold: true, color: PLUM, margin: 0, valign: "middle",
  });

  s.addText("だから本命商品には、必ずこの3つを入れる", {
    x: M, y: 4.7, w: CW, h: 0.35,
    fontFace: BODY, fontSize: 12, color: ROSE_LT, margin: 0, valign: "middle",
  });

  const must = [
    ["DISCOVERY", "自分インタビューで観念を洗い出す"],
    ["AWAKENESS", "その観念がどこから来たのかに気づく"],
    ["Circulation", "手放し、フォーカス先を変える"],
  ];
  const cw = 3.75, gap = 0.42;
  must.forEach((m, i) => {
    const x = M + i * (cw + gap);
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 5.1, w: cw, h: 1.0, rectRadius: 0.06, fill: { color: GREIGE_LT },
    });
    s.addText(m[0], {
      x: x + 0.3, y: 5.2, w: cw - 0.6, h: 0.34,
      fontFace: BODY, fontSize: 12, bold: true, color: ROSE_DK, charSpacing: 1, margin: 0, valign: "middle",
    });
    s.addText(m[1], {
      x: x + 0.3, y: 5.55, w: cw - 0.6, h: 0.46,
      fontFace: BODY, fontSize: 11, color: PLUM, margin: 0, valign: "middle", lineSpacing: 16,
    });
  });

  s.addText("診断は、この流れの中の一部です。ここまでやれる人はほとんどいない ―― だから選ばれます。", {
    x: M, y: 6.35, w: CW, h: 0.5,
    fontFace: BODY, fontSize: 13, bold: true, color: ROSE_LT, margin: 0, valign: "middle",
  });

  s.addNotes("受講生に最も刺さるパート。本命商品の根拠であり、価格の根拠でもある。");
}

/* =========================================================
   13. STEP4 7つの心理ステップ
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "発信設計 ―― 7つの心理ステップ", "日常を載せるのではなく、見る人を「理想 → 信頼 → 行動」へ導く設計です", "STEP 4");

  const psy = [
    ["理想の未来を共有", "憧れ", "この人みたいになりたい。未来語り・ビフォーアフター"],
    ["権威性", "信頼", "この人は信用できる。お客様の変化、感想、依頼"],
    ["親近感", "共感", "この人も私と同じだ。失敗談、日常、価値観"],
    ["向上心", "応援", "この人、頑張ってるな。挑戦する姿、学び直す姿"],
    ["新たな学び", "気づき", "この人から学べる。常識を壊す視点、心理学の話"],
    ["再現性の担保", "自分ごと化", "私にもできそう。「センスは才能ではなく、仕組み」"],
    ["即行動をうながす", "行動", "やってみよう。行動した人の事例、軽い締切"],
  ];
  psy.forEach((p, i) => {
    const col = i < 4 ? 0 : 1;
    const row = i < 4 ? i : i - 4;
    const x = M + col * 6.13;
    const y = 2.0 + row * 0.8;
    s.addShape(pres.ShapeType.roundRect, {
      x, y, w: 5.7, h: 0.68, rectRadius: 0.06, fill: { color: i % 2 === 0 ? GREIGE_LT : GREIGE },
    });
    numCircle(s, x + 0.18, y + 0.13, 0.42, i + 1, PLUM, ROSE_LT, 14);
    s.addText(p[0], {
      x: x + 0.72, y: y + 0.03, w: 2.0, h: 0.32,
      fontFace: BODY, fontSize: 12, bold: true, color: PLUM, margin: 0, valign: "middle",
    });
    s.addShape(pres.ShapeType.roundRect, {
      x: x + 2.78, y: y + 0.07, w: 0.98, h: 0.26, rectRadius: 0.07, fill: { color: ROSE },
    });
    s.addText(p[1], {
      x: x + 2.78, y: y + 0.07, w: 0.98, h: 0.26, align: "center", valign: "middle",
      fontFace: BODY, fontSize: 9, bold: true, color: WHITE, margin: 0,
    });
    s.addText(p[2], {
      x: x + 0.72, y: y + 0.36, w: 4.8, h: 0.3,
      fontFace: BODY, fontSize: 10, color: INK, margin: 0, valign: "middle",
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M + 6.13, y: 4.4, w: 5.7, h: 1.55, rectRadius: 0.07, fill: { color: PLUM },
  });
  s.addText("1週間で1周させる。\n月＝憧れ、火＝信頼、水＝共感……\n毎週繰り返すと、フォロワーが自然に購買心理をたどります。", {
    x: M + 6.48, y: 4.4, w: 5.0, h: 1.55,
    fontFace: BODY, fontSize: 12, color: GREIGE, margin: 0, valign: "middle", lineSpacing: 21,
  });

  band(s, 6.2, 0.8, "投稿ネタが出ないのは、この7つのどこかが空いているから。ネタを探すのではなく、空いている番号を埋める。",
    { fill: ROSE_LT, color: PLUM, size: 13 });

  s.addNotes("曜日別テンプレートは既存の1週間分の設計をそのまま使う。ここでは「なぜその順番か」に時間を使う。");
}

/* =========================================================
   14. STEP4 型
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "リールと教育動画は「型」で作る", "毎回ゼロから考えるから続きません", "STEP 4");

  const flows = [
    ["リールの型", ["つかみ", "共感", "答え", "次の一歩"],
      ["2秒で「私のことだ」", "そうなりますよね", "今日役に立つことを1つ", "保存・プロフィールへ"]],
    ["教育動画の型", ["誰のための話か", "なぜそうなるのか", "整えるポイント", "自分の場合は？", "次の案内"],
      ["今日の対象をはっきり", "原因は能力ではなく設計", "3つまでに絞る", "整理の必要に気づく", "個別相談・次回へ"]],
  ];
  flows.forEach((f, fi) => {
    const y = 2.0 + fi * 1.85;
    s.addText(f[0], {
      x: M, y, w: 2.5, h: 0.36,
      fontFace: HEAD, fontSize: 17, bold: true, color: PLUM, margin: 0, valign: "middle",
    });
    const n = f[1].length;
    const gp = 0.16;
    const cw = (CW - gp * (n - 1)) / n;
    f[1].forEach((label, i) => {
      const x = M + i * (cw + gp);
      s.addShape(pres.ShapeType.roundRect, {
        x, y: y + 0.44, w: cw, h: 1.08, rectRadius: 0.06,
        fill: { color: fi === 0 ? GREIGE_LT : GREIGE },
      });
      s.addText(`${i + 1}　${label}`, {
        x: x + 0.14, y: y + 0.56, w: cw - 0.28, h: 0.32,
        fontFace: BODY, fontSize: 11.5, bold: true, color: PLUM, margin: 0, valign: "middle",
      });
      s.addText(f[2][i], {
        x: x + 0.14, y: y + 0.9, w: cw - 0.28, h: 0.55,
        fontFace: BODY, fontSize: 10, color: INK, margin: 0, valign: "top", lineSpacing: 14,
      });
    });
  });

  band(s, 5.8, 1.05,
    "教育動画の②が肝心です。うまくいかない理由を、その人の能力のせいにしない。\n「まだ設計ができていないだけ」と伝えると、人は動けます ―― お客様の観念を扱う私たちの姿勢そのものです。");

  s.addNotes("AIに投げるときも指示するのはこの型。型がないままAIに投げると当たり障りのない文章になる。");
}

/* =========================================================
   15. STEP5 販売導線
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "販売導線 ―― 点を線にする", "どれだけ良いサービスでも、ここが抜けると売上につながりません", "STEP 5");

  const chain = ["Instagram", "プロフィール", "LINE登録", "教育の流れ", "個別相談", "本命商品"];
  const n = chain.length;
  const gp = 0.16;
  const cw = (CW - gp * (n - 1)) / n;
  chain.forEach((label, i) => {
    const x = M + i * (cw + gp);
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 2.05, w: cw, h: 0.78, rectRadius: 0.06, fill: { color: i === n - 1 ? PLUM : GREIGE },
    });
    s.addText(label, {
      x: x + 0.06, y: 2.05, w: cw - 0.12, h: 0.78, align: "center", valign: "middle",
      fontFace: BODY, fontSize: 11, color: i === n - 1 ? GREIGE : PLUM, margin: 0,
    });
    if (i < n - 1) {
      s.addShape(pres.ShapeType.triangle, {
        x: x + cw + 0.025, y: 2.37, w: 0.1, h: 0.14, rotate: 90, fill: { color: ROSE },
      });
    }
  });

  s.addText("それぞれの矢印に、理由がありますか？", {
    x: M, y: 3.05, w: CW, h: 0.45,
    fontFace: HEAD, fontSize: 19, bold: true, color: PLUM, margin: 0, valign: "middle",
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 3.6, w: CW, h: 1.2, rectRadius: 0.07, fill: { color: ROSE_LT },
  });
  s.addText([
    { text: "いちばん多いのが、LINE登録の理由がないこと。", options: { bold: true, color: PLUM } },
    { text: "\n「最新情報をお届けします」では登録されません。「クローゼットが一杯なのに着る服がない人のチェックシート」なら登録されます ―― 入口商品と同じ考え方です。", options: { color: INK } },
  ], {
    x: M + 0.45, y: 3.6, w: CW - 0.9, h: 1.2,
    fontFace: BODY, fontSize: 12, margin: 0, valign: "middle", lineSpacing: 20,
  });

  const checks = [
    "プロフィールを見て「何の人か」が分かる",
    "LINEに登録する理由がある",
    "登録後に価値が伝わる流れがある",
    "気になったのに次がない、という行き止まりがない",
  ];
  checks.forEach((c, i) => {
    const x = M + (i % 2) * 6.13;
    const y = 4.95 + Math.floor(i / 2) * 0.56;
    s.addShape(pres.ShapeType.roundRect, {
      x, y, w: 5.7, h: 0.48, rectRadius: 0.05, fill: { color: GREIGE_LT },
    });
    s.addText("□　" + c, {
      x: x + 0.25, y, w: 5.3, h: 0.48,
      fontFace: BODY, fontSize: 11, color: INK, margin: 0, valign: "middle",
    });
  });

  noteLine(s, 6.2, "▷ 物販の方は", "「個別相談」の位置が「商品ページ」になります。世界観に触れ、不安が消えて、購入。骨は同じです。");

  s.addNotes("行き止まりが一番多い取りこぼし。紙に矢印を書かせると自分で気づく。");
}

/* =========================================================
   16. STEP6 セッション設計
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "セッション設計 ―― 2本の柱を、実際に使う", "いきなり診断から入らない。順番を変えるだけで、お客様の行動が変わります", "STEP 6");

  const flow = [
    ["聞く", "DISCOVERY", "「ファッションとは？」から。過去の体験。ここで7〜8割の時間"],
    ["気づいてもらう", "AWAKENESS", "聞いた内容をその人の言葉で返す。「だから今も迷うのかも」"],
    ["診断する", "", "ここでようやく診断。順番が逆だと、結果が入りません"],
    ["書き換える", "Circulation", "「安いから買う」を「これを着る自分が好きか」に"],
    ["実践に落とす", "", "次の1週間で何を着るか、何を買わないかまで決める"],
  ];
  const n = flow.length;
  const gp = 0.16;
  const cw = (CW - gp * (n - 1)) / n;
  flow.forEach((f, i) => {
    const x = M + i * (cw + gp);
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 2.0, w: cw, h: 2.5, rectRadius: 0.07,
      fill: { color: i === 2 ? GREIGE : GREIGE_LT },
    });
    numCircle(s, x + cw / 2 - 0.25, 2.18, 0.5, i + 1, PLUM, ROSE_LT, 16);
    s.addText(f[0], {
      x: x + 0.12, y: 2.78, w: cw - 0.24, h: 0.58,
      fontFace: HEAD, fontSize: 14, bold: true, color: PLUM, align: "center", margin: 0, valign: "top", lineSpacing: 20,
    });
    if (f[1]) {
      s.addShape(pres.ShapeType.roundRect, {
        x: x + 0.2, y: 3.4, w: cw - 0.4, h: 0.26, rectRadius: 0.07, fill: { color: ROSE },
      });
      s.addText(f[1], {
        x: x + 0.2, y: 3.4, w: cw - 0.4, h: 0.26, align: "center", valign: "middle",
        fontFace: BODY, fontSize: 8, bold: true, color: WHITE, margin: 0,
      });
    }
    s.addText(f[2], {
      x: x + 0.14, y: 3.75, w: cw - 0.28, h: 0.65,
      fontFace: BODY, fontSize: 9.5, color: INK, margin: 0, valign: "top", lineSpacing: 13,
    });
  });

  band(s, 4.7, 0.9, "同じ診断でも、お客様の行動が変わります。行動が変わるから、また来てくださいます。");

  noteLine(s, 5.78, "▶ ここが本命商品の中身", "この講座で学ぶファッション心理学とコーチングが、そのままあなたの商品になります。", "rose");
  noteLine(s, 6.48, "▷ 物販の方は", "接客やDMがこの流れです。「これ、似合いますよ」ではなく「どんな場面で着たいですか」から入る。");

  s.addNotes("柱を「知識」から「サービスの中身」へ落とすパート。診断は3番目であることを強調。");
}

/* =========================================================
   17. STEP6 個別相談とセルフコーチング
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "個別相談も、同じ技術です", "新しい技術を覚える必要はありません", "STEP 6");

  const same = [
    ["聞く", "今どういう状態で、何に困っていて、本当はどうなりたいのか"],
    ["整理して返す", "「つまり、○○が一番のネックということですね」"],
    ["正直に伝える", "合わないなら合わないと言う。それが信頼になります"],
  ];
  const cw = 3.75, gap = 0.42;
  same.forEach((t, i) => {
    const x = M + i * (cw + gap);
    card(s, x, 2.0, cw, 1.5, GREIGE_LT);
    numCircle(s, x + 0.34, 2.22, 0.52, i + 1, PLUM, ROSE_LT, 17);
    s.addText(t[0], {
      x: x + 0.98, y: 2.24, w: cw - 1.3, h: 0.48,
      fontFace: HEAD, fontSize: 17, bold: true, color: PLUM, margin: 0, valign: "middle",
    });
    s.addText(t[1], {
      x: x + 0.34, y: 2.84, w: cw - 0.68, h: 0.56,
      fontFace: BODY, fontSize: 11, color: INK, margin: 0, valign: "top", lineSpacing: 16,
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 3.65, w: CW, h: 0.8, rectRadius: 0.07, fill: { color: ROSE_LT },
  });
  s.addText("売るのが怖いのは、商品に自信がないからではありません。相手の役に立つか確信が持てないからです。だから聞くんです。", {
    x: M + 0.45, y: 3.65, w: CW - 0.9, h: 0.8,
    fontFace: BODY, fontSize: 12.5, bold: true, color: PLUM, margin: 0, valign: "middle",
  });

  s.addText("セルフコーチング ―― 迷ったとき、自分に聞く3つ", {
    x: M, y: 4.6, w: CW, h: 0.42,
    fontFace: HEAD, fontSize: 17, bold: true, color: PLUM, margin: 0, valign: "middle",
  });
  const qs = [
    ["今、何が不安？", "漠然とした不安を一つに落とす"],
    ["それは事実？　想像？", "大半は想像です"],
    ["今日できる一番小さい一歩は？", "大きい一歩は考えるだけで止まる"],
  ];
  qs.forEach((q, i) => {
    const x = M + i * (cw + gap);
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 5.1, w: cw, h: 1.02, rectRadius: 0.06, fill: { color: GREIGE },
    });
    s.addText(q[0], {
      x: x + 0.28, y: 5.2, w: cw - 0.56, h: 0.4,
      fontFace: BODY, fontSize: 12.5, bold: true, color: PLUM, margin: 0, valign: "middle",
    });
    s.addText(q[1], {
      x: x + 0.28, y: 5.62, w: cw - 0.56, h: 0.38,
      fontFace: BODY, fontSize: 10, color: MUTED, margin: 0, valign: "middle",
    });
  });

  band(s, 6.35, 0.62, "止まっていること自体は、問題ではありません。止まったまま黙っていることだけが、問題です。", { size: 12.5 });

  s.addNotes("「売るのが怖い」を外す。セッションと個別相談が同じ技術だと分かると、心理的ハードルが下がる。");
}

/* =========================================================
   18. STEP7 仕組み化・自動化
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "仕組み化・自動化", "売れている方は、頑張り続けているのではなく、少しずつ仕組みにしています", "STEP 7");

  const steps = [
    ["繰り返しを見つける", "診断の事前ヒアリング、当日の流れの案内、アフターフォロー。繰り返しているものは、必ず仕組みにできます。"],
    ["一度だけ作る", "予約からセッション当日までの自動案内、LINE登録後の流れ、よくある質問。UTAGE / L Message はここ。"],
    ["AIに渡す", "投稿文のたたき台、リールのシナリオ案、診断レポートの下書き。AIは0を1にするのが得意。判断は人がやる。"],
  ];
  const cw = 3.75, gap = 0.42;
  steps.forEach((t, i) => {
    const x = M + i * (cw + gap);
    card(s, x, 2.0, cw, 2.6, GREIGE_LT);
    numCircle(s, x + 0.36, 2.22, 0.58, i + 1, PLUM, ROSE_LT, 18);
    s.addText(t[0], {
      x: x + 0.36, y: 2.9, w: cw - 0.72, h: 0.46,
      fontFace: HEAD, fontSize: 17, bold: true, color: PLUM, margin: 0, valign: "middle",
    });
    s.addText(t[1], {
      x: x + 0.36, y: 3.4, w: cw - 0.72, h: 1.1,
      fontFace: BODY, fontSize: 11, color: INK, margin: 0, valign: "top", lineSpacing: 17,
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 4.85, w: CW, h: 1.2, rectRadius: 0.07, fill: { color: PLUM },
  });
  s.addText("順番を間違えないでください。", {
    x: M + 0.45, y: 5.0, w: CW - 0.9, h: 0.38,
    fontFace: HEAD, fontSize: 17, bold: true, color: WHITE, margin: 0, valign: "middle",
  });
  s.addText("STEP1〜5 が固まっていない状態で自動化すると、ブレた内容を自動で流し続けることになります。中身が決まってから、それを楽にするために使う。", {
    x: M + 0.45, y: 5.4, w: CW - 0.9, h: 0.55,
    fontFace: BODY, fontSize: 12, color: GREIGE, margin: 0, valign: "middle",
  });

  band(s, 6.25, 0.62, "自動化は最後。これが一番もったいない間違いです。", { fill: ROSE_LT, color: PLUM, size: 12.5 });

  s.addNotes("ツールの話に見せず「頑張り続けない設計」の話にする。順番の注意は強めに。");
}

/* =========================================================
   19. 自己診断
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "自己診断 ―― あなたはどこで詰まっているか", "外れた一番小さい番号が、あなたの現在地です");

  const items = [
    "資格名ではなく、変化の言葉で価値を言える",
    "理想のお客様の「深いほうの詰まり」が言える",
    "診断単発ではなく、入口・本命・継続の3層がある",
    "発信が7つの心理ステップで回っている",
    "発信から個別相談まで、線がつながっている",
    "セッションで、診断より前に聞く時間のほうが長い",
    "繰り返し作業が、仕組みになっている",
  ];
  items.forEach((t, i) => {
    const col = i < 4 ? 0 : 1;
    const row = i < 4 ? i : i - 4;
    const x = M + col * 6.13;
    const y = 2.1 + row * 0.78;
    s.addShape(pres.ShapeType.roundRect, {
      x, y, w: 5.7, h: 0.64, rectRadius: 0.06, fill: { color: i % 2 === 0 ? GREIGE_LT : GREIGE },
    });
    numCircle(s, x + 0.2, y + 0.12, 0.4, i + 1, PLUM, ROSE_LT, 13);
    s.addText("□　" + t, {
      x: x + 0.72, y, w: 4.85, h: 0.64,
      fontFace: BODY, fontSize: 11, color: INK, margin: 0, valign: "middle",
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M + 6.13, y: 4.44, w: 5.7, h: 1.44, rectRadius: 0.07, fill: { color: PLUM },
  });
  s.addText("「5と7ができていない」という方も、\nまず一番小さい番号に戻ってください。\n土台が空いていると、必ず戻ることになります。", {
    x: M + 6.48, y: 4.44, w: 5.0, h: 1.44,
    fontFace: BODY, fontSize: 11.5, color: GREIGE, margin: 0, valign: "middle", lineSpacing: 20,
  });

  band(s, 6.2, 0.72, "今月取り組む番号を、いま1つ決めてください。", { fill: ROSE_LT, color: PLUM, size: 13.5 });

  s.addNotes("ここを曖昧にすると受講生が拡散する。必ず一番小さい番号を優先させる。");
}

/* =========================================================
   20. つまずきと処方箋
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "よくあるつまずきと、処方箋", "症状の場所と、原因の場所は違います");

  const rows = [
    ["「発信ネタが出てこない」", "誰の何を解決するか決まっていない", "STEP 1・2 へ"],
    ["「価格を上げるのが怖い」", "変化が言葉になっていない／中身が診断だけ", "STEP 1・6 へ"],
    ["「診断したのに変わらない」", "観念を扱う工程が抜けている", "STEP 6 へ"],
    ["「学んだのに動けない」", "一度に全部やろうとしている", "1つに絞る"],
  ];
  rows.forEach((r, i) => {
    const y = 2.1 + i * 1.02;
    s.addShape(pres.ShapeType.roundRect, {
      x: M, y, w: CW, h: 0.88, rectRadius: 0.06, fill: { color: i % 2 === 0 ? GREIGE_LT : GREIGE },
    });
    s.addText(r[0], {
      x: M + 0.35, y, w: 4.3, h: 0.88,
      fontFace: HEAD, fontSize: 16, bold: true, color: PLUM, margin: 0, valign: "middle",
    });
    s.addText([
      { text: "本当の原因　", options: { bold: true, color: ROSE_DK } },
      { text: r[1], options: { color: INK } },
    ], {
      x: M + 4.9, y, w: 4.7, h: 0.88,
      fontFace: BODY, fontSize: 11.5, margin: 0, valign: "middle",
    });
    s.addShape(pres.ShapeType.roundRect, {
      x: M + 9.85, y: y + 0.21, w: 1.8, h: 0.46, rectRadius: 0.1, fill: { color: PLUM },
    });
    s.addText(r[2], {
      x: M + 9.85, y: y + 0.21, w: 1.8, h: 0.46, align: "center", valign: "middle",
      fontFace: BODY, fontSize: 10.5, bold: true, color: GREIGE, margin: 0,
    });
  });

  band(s, 6.3, 0.75, "詰まったら、必ず一つ上に戻る。6ヶ月間、いちばん使う考え方です。", { fill: ROSE_LT, color: PLUM, size: 13 });

  s.addNotes("原因を上流に戻す訓練。繰り返し言うと受講生が自走できるようになる。");
}

/* =========================================================
   21. 今月のワーク
   ========================================================= */
{
  const s = pres.addSlide();
  titleBlock(s, "今月のワーク", "やることは1つだけです");

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 2.1, w: CW, h: 1.65, rectRadius: 0.07, fill: { color: PLUM },
  });
  s.addText("自己診断で外れた、一番小さい番号。\nそのワークシートを、最後まで埋める。", {
    x: M + 0.5, y: 2.1, w: CW - 1.0, h: 1.65,
    fontFace: HEAD, fontSize: 23, bold: true, color: WHITE, margin: 0, valign: "middle", lineSpacing: 42,
  });

  const notes = [
    ["提出", "次回のグルコンまで", "埋まらなかった箇所は、埋まらなかったこと自体を持ってきてください。"],
    ["この後", "ワークショップ60分", "自分インタビューと、STEP1の言語化シートを、ここで仕上げます。"],
    ["宣言", "いつやるか決める", "「今月中」ではなく「毎週火曜の夜」のように、曜日と時間帯で。"],
  ];
  const cw = 3.75, gap = 0.42;
  notes.forEach((n, i) => {
    const x = M + i * (cw + gap);
    card(s, x, 4.0, cw, 1.9, GREIGE_LT);
    s.addText(n[0], {
      x: x + 0.36, y: 4.16, w: cw - 0.72, h: 0.3,
      fontFace: BODY, fontSize: 10.5, bold: true, color: ROSE_DK, charSpacing: 2, margin: 0, valign: "middle",
    });
    s.addText(n[1], {
      x: x + 0.36, y: 4.48, w: cw - 0.72, h: 0.4,
      fontFace: HEAD, fontSize: 15, bold: true, color: PLUM, margin: 0, valign: "middle",
    });
    s.addText(n[2], {
      x: x + 0.36, y: 4.92, w: cw - 0.72, h: 0.85,
      fontFace: BODY, fontSize: 11, color: INK, margin: 0, valign: "top", lineSpacing: 17,
    });
  });

  s.addText("「ここが書けませんでした」は、立派な相談です。", {
    x: M, y: 6.15, w: CW, h: 0.5,
    fontFace: BODY, fontSize: 13, italic: true, color: PLUM, margin: 0, valign: "middle",
  });

  s.addNotes("提出のハードルを下げる。書けなかったこと自体を歓迎する姿勢を明示する。");
}

/* =========================================================
   22. まとめ（ダーク）
   ========================================================= */
{
  const s = pres.addSlide();
  s.background = { color: PLUM };
  kicker(s, true);
  s.addText("まとめ", {
    x: M, y: 0.85, w: CW, h: 0.38,
    fontFace: BODY, fontSize: 12.5, color: ROSE_LT, charSpacing: 3, margin: 0, valign: "middle",
  });
  s.addText("「売れる」は結果。「選ばれる」が原因。", {
    x: M, y: 1.25, w: CW, h: 0.8,
    fontFace: HEAD, fontSize: 30, bold: true, color: WHITE, margin: 0, valign: "middle",
  });
  s.addText("選ばれる状態は、診断だけでは作れません。", {
    x: M, y: 2.08, w: CW, h: 0.38,
    fontFace: BODY, fontSize: 13, color: GREIGE, margin: 0, valign: "middle",
  });

  const sum = [
    "資格名ではなく、変化の言葉にする", "深いほうの詰まりを、言葉にする",
    "診断は入口。本命と継続をつくる", "7つの心理ステップで発信する",
    "発信から個別相談までを線にする", "診断より先に、聞く",
    "繰り返しを、仕組みにする",
  ];
  sum.forEach((t, i) => {
    const col = i < 4 ? 0 : 1;
    const row = i < 4 ? i : i - 4;
    const x = M + col * 6.13;
    const y = 2.65 + row * 0.72;
    s.addShape(pres.ShapeType.roundRect, {
      x, y, w: 5.7, h: 0.6, rectRadius: 0.06, fill: { color: PLUM_DK },
    });
    numCircle(s, x + 0.2, y + 0.11, 0.38, i + 1, ROSE, WHITE, 12);
    s.addText(t, {
      x: x + 0.7, y, w: 4.85, h: 0.6,
      fontFace: BODY, fontSize: 11.5, color: GREIGE, margin: 0, valign: "middle",
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M + 6.13, y: 4.81, w: 5.7, h: 1.45, rectRadius: 0.07, fill: { color: GREIGE_LT },
  });
  s.addText("7つの器に、心理学とコーチングという中身が入って、\nはじめて「あなたでなければ」になります。", {
    x: M + 6.48, y: 4.81, w: 5.0, h: 1.45,
    fontFace: HEAD, fontSize: 14, bold: true, color: PLUM, margin: 0, valign: "middle", lineSpacing: 26,
  });

  s.addText("次回は STEP1・STEP2 を、もう一段深く　／　今日書いた一文を持ってきてください", {
    x: M, y: 6.55, w: CW, h: 0.4,
    fontFace: BODY, fontSize: 11.5, color: ROSE_LT, margin: 0, valign: "middle",
  });

  s.addNotes("7つを1行ずつ読み上げて振り返る。最後は「あなたでなければ」で締める。");
}

pres.writeFile({ fileName: "ファッション起業7つのステップ.pptx" }).then((f) => {
  console.log("created:", f);
});
