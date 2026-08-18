/**
 * 勉強会スライド 生成スクリプト
 *
 *   npm install pptxgenjs
 *   node build_slides.js
 *
 * 出力
 *   勉強会スライド.pptx … 全29枚
 *
 * 台本：勉強会台本.md（70分）
 * 方針：1枚1メッセージ。本文は最小16pt。写真とAI実演は差し込み枠を用意。
 */

const pptxgen = require("pptxgenjs");

/* ---------- パレット（既存教材と共通） ---------- */
const PLUM = "3E2F38";
const PLUM_DK = "2A1F26";
const ROSE = "C08F97";
const ROSE_LT = "E3C9CD";
const GREIGE = "EAE3DD";
const GREIGE_LT = "F7F3F0";
const INK = "33292E";
const MUTED = "7C6E73";
const WHITE = "FFFFFF";

const HEAD = "Yu Mincho";
const BODY = "Yu Gothic";

const W = 13.333;
const M = 0.9;
const CW = W - M * 2; // 11.533

/* =========================================================
   ヘルパー
   ========================================================= */

function chapter(s, label, dark) {
  if (!label) return;
  s.addText(label, {
    x: W - M - 3.0, y: 0.34, w: 3.0, h: 0.32, align: "right", valign: "middle",
    fontFace: BODY, fontSize: 11, color: dark ? ROSE_LT : MUTED, charSpacing: 2, margin: 0,
  });
}

function numCircle(p, s, x, y, d, n, fill, txt, size) {
  s.addShape(p.ShapeType.ellipse, { x, y, w: d, h: d, fill: { color: fill } });
  s.addText(String(n), {
    x, y, w: d, h: d, align: "center", valign: "middle",
    fontFace: HEAD, fontSize: size, bold: true, color: txt, margin: 0,
  });
}

function contentSlide(p, label, title, lead) {
  const s = p.addSlide();
  chapter(s, label, false);
  s.addText(title, {
    x: M, y: 0.72, w: CW, h: 0.9,
    fontFace: HEAD, fontSize: 32, bold: true, color: PLUM, margin: 0, valign: "middle",
  });
  if (lead) {
    s.addText(lead, {
      x: M, y: 1.6, w: CW, h: 0.45,
      fontFace: BODY, fontSize: 16, color: MUTED, margin: 0, valign: "middle",
    });
  }
  return s;
}

function statementSlide(p, label, big, sub, notes) {
  const s = p.addSlide();
  s.background = { color: PLUM };
  chapter(s, label, true);
  s.addText(big, {
    x: M, y: 1.9, w: CW, h: 2.4,
    fontFace: HEAD, fontSize: 38, bold: true, color: WHITE, margin: 0, valign: "middle", lineSpacing: 60,
  });
  if (sub) {
    s.addText(sub, {
      x: M, y: 4.6, w: CW, h: 1.5,
      fontFace: BODY, fontSize: 17, color: GREIGE, margin: 0, valign: "top", lineSpacing: 30,
    });
  }
  s.addNotes(notes);
  return s;
}

/** 章扉 */
function partSlide(p, n, title, sub, mins, notes) {
  const s = p.addSlide();
  s.background = { color: PLUM };
  s.addShape(p.ShapeType.roundRect, {
    x: M, y: 2.05, w: 1.9, h: 0.44, rectRadius: 0.1, fill: { color: ROSE },
  });
  s.addText(`PART ${n}`, {
    x: M, y: 2.05, w: 1.9, h: 0.44, align: "center", valign: "middle",
    fontFace: BODY, fontSize: 13, bold: true, color: WHITE, charSpacing: 1, margin: 0,
  });
  s.addText(title, {
    x: M, y: 2.75, w: CW, h: 1.6,
    fontFace: HEAD, fontSize: 42, bold: true, color: WHITE, margin: 0, valign: "middle", lineSpacing: 62,
  });
  s.addText(sub, {
    x: M, y: 4.5, w: CW, h: 0.5,
    fontFace: BODY, fontSize: 17, color: GREIGE, margin: 0, valign: "middle",
  });
  s.addText(mins, {
    x: M, y: 5.3, w: CW, h: 0.4,
    fontFace: BODY, fontSize: 13, color: MUTED, charSpacing: 1, margin: 0, valign: "middle",
  });
  s.addNotes(notes);
  return s;
}

/** 写真の差し込み枠 */
function photoSlot(p, s, x, y, w, h, caption) {
  s.addShape(p.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.07, fill: { color: GREIGE },
    line: { color: ROSE, width: 1, dashType: "dash" },
  });
  s.addText(caption, {
    x: x + 0.2, y, w: w - 0.4, h, align: "center", valign: "middle",
    fontFace: BODY, fontSize: 13, color: MUTED, margin: 0, lineSpacing: 22,
  });
}

/** 注意書き1行 */
function noteLine(s, y, text, tone) {
  s.addText(text, {
    x: M, y, w: CW, h: 0.42,
    fontFace: BODY, fontSize: 14, color: tone === "rose" ? ROSE : MUTED, margin: 0, valign: "middle",
  });
}

/* =========================================================
   スライド
   ========================================================= */

const p = new pptxgen();
p.layout = "LAYOUT_WIDE";
p.author = "えりりん";
p.title = "勉強会｜海外の視点とAIで、あなたにしか作れないリールをつくる";

/* ---- 1. 表紙 ---- */
{
  const s = p.addSlide();
  s.background = { color: PLUM };

  s.addShape(p.ShapeType.ellipse, { x: 9.35, y: 1.85, w: 3.0, h: 3.0, fill: { color: PLUM_DK } });
  s.addShape(p.ShapeType.ellipse, {
    x: 9.35, y: 1.85, w: 3.0, h: 3.0, fill: { color: PLUM, transparency: 100 },
    line: { color: ROSE, width: 1.25 },
  });
  s.addText("勉強会", {
    x: 9.35, y: 1.85, w: 3.0, h: 3.0, align: "center", valign: "middle",
    fontFace: HEAD, fontSize: 34, bold: true, color: ROSE_LT, margin: 0,
  });

  s.addText("パーソナルスタイリスト／イメージコンサルタントの方へ", {
    x: M, y: 1.85, w: 8.1, h: 0.42,
    fontFace: BODY, fontSize: 15, color: ROSE_LT, margin: 0, valign: "middle",
  });
  s.addText("「海外の視点」と「AI」で、\nあなたにしか作れない\nリールをつくる", {
    x: M, y: 2.35, w: 8.1, h: 2.3,
    fontFace: HEAD, fontSize: 36, bold: true, color: WHITE, margin: 0, valign: "middle", lineSpacing: 56,
  });
  s.addShape(p.ShapeType.roundRect, {
    x: M, y: 4.85, w: 7.0, h: 0.6, rectRadius: 0.1, fill: { color: PLUM_DK },
  });
  s.addText("最後の10分で、1本つくって持ち帰ります", {
    x: M + 0.35, y: 4.85, w: 6.6, h: 0.6,
    fontFace: BODY, fontSize: 15, bold: true, color: ROSE_LT, charSpacing: 1, margin: 0, valign: "middle",
  });
  s.addText("えりりん　／　ファッション心理学者・大学教授　　|　　70分", {
    x: M, y: 5.7, w: 8.1, h: 0.4,
    fontFace: BODY, fontSize: 12.5, color: MUTED, charSpacing: 1, margin: 0, valign: "middle",
  });
  s.addNotes("名乗りは短く。すぐ「今日のゴール」へ。自動ウェビナーでも「今日」「今夜」は普通に使ってよい。");
}

/* ---- 2. 今日の約束 ---- */
statementSlide(p, "",
  "今日は、\n聞いて終わりにしません。",
  "最後の10分、手を止めていただきます。\nそこでリールの構成を1本、実際に作って持ち帰っていただきます。\nメモできるものを、開いておいてください。",
  "ここを最初に言い切る。集めるだけの人はここで離れる。それでいい。");

/* ---- 3. 今日の流れ ---- */
{
  const s = contentSlide(p, "", "今日お話しするのは、2つです", "でも、1つの話をします");
  const items = [
    ["海外ファッションリサーチ", "戻ってきたばかりなので、実際に見てきたものをお見せします"],
    ["AIでリールをつくる", "実演します。そのあと、ご自身で1本作ります"],
  ];
  items.forEach((t, i) => {
    const y = 2.5 + i * 1.35;
    s.addShape(p.ShapeType.roundRect, {
      x: M, y, w: CW, h: 1.1, rectRadius: 0.07, fill: { color: i % 2 === 0 ? GREIGE_LT : GREIGE },
    });
    numCircle(p, s, M + 0.35, y + 0.22, 0.66, i + 1, PLUM, ROSE_LT, 22);
    s.addText(t[0], {
      x: M + 1.3, y: y + 0.14, w: CW - 1.7, h: 0.5,
      fontFace: HEAD, fontSize: 24, bold: true, color: PLUM, margin: 0, valign: "middle",
    });
    s.addText(t[1], {
      x: M + 1.3, y: y + 0.62, w: CW - 1.7, h: 0.38,
      fontFace: BODY, fontSize: 14, color: MUTED, margin: 0, valign: "middle",
    });
  });
  s.addShape(p.ShapeType.roundRect, {
    x: M, y: 5.45, w: CW, h: 1.0, rectRadius: 0.07, fill: { color: PLUM },
  });
  s.addText("バラバラの話に聞こえますが、今日は1本につながります", {
    x: M, y: 5.45, w: CW, h: 1.0, align: "center", valign: "middle",
    fontFace: BODY, fontSize: 18, bold: true, color: ROSE_LT, margin: 0,
  });
  s.addNotes("「2つ」と言ってから「でも1つの話」と言う。ここで興味を持たせる。");
}

/* ---- 4. みんな似ている ---- */
{
  const s = contentSlide(p, "", "Instagramを開くと、みんな似ている", "そして、自分の投稿もその中に混ざっている");
  const items = [
    "似たような投稿",
    "似たような言い回し",
    "似たような色づかい",
  ];
  items.forEach((t, i) => {
    const x = M + i * (CW / 3);
    s.addShape(p.ShapeType.roundRect, {
      x: x + 0.08, y: 2.5, w: CW / 3 - 0.16, h: 1.5, rectRadius: 0.07, fill: { color: GREIGE_LT },
    });
    s.addText(t, {
      x: x + 0.08, y: 2.5, w: CW / 3 - 0.16, h: 1.5, align: "center", valign: "middle",
      fontFace: BODY, fontSize: 19, color: INK, margin: 0,
    });
  });
  s.addShape(p.ShapeType.roundRect, {
    x: M, y: 4.35, w: CW, h: 1.3, rectRadius: 0.07, fill: { color: ROSE_LT },
  });
  s.addText("そして、自分の投稿も、その中に混ざっている。", {
    x: M, y: 4.35, w: CW, h: 1.3, align: "center", valign: "middle",
    fontFace: HEAD, fontSize: 26, bold: true, color: PLUM, margin: 0,
  });
  noteLine(s, 5.9, "ここで責めない。次のスライドで原因を構造に置きます", "rose");
  s.addNotes("間を取る。ここは共感のパート。畳みかけない。");
}

/* ---- 5. 情報源が同じ ---- */
statementSlide(p, "",
  "センスの問題では\nありません。",
  "見ているものが、みんな同じだからです。\n日本の雑誌、日本のインフルエンサー、そして他のイメコンさんの投稿。",
  "「勉強不足」と言わない。「材料が同じ」と言う。ここが講座全体の姿勢。");

/* ---- 6. 材料を変える ---- */
{
  const s = contentSlide(p, "", "同じ材料からは、同じものしか出てきません", "だから、やることは1つです");
  s.addShape(p.ShapeType.roundRect, {
    x: M, y: 2.55, w: CW, h: 1.7, rectRadius: 0.09, fill: { color: PLUM },
  });
  s.addText("材料を、変える。", {
    x: M, y: 2.55, w: CW, h: 1.7, align: "center", valign: "middle",
    fontFace: HEAD, fontSize: 46, bold: true, color: WHITE, margin: 0,
  });
  s.addText("そのために、私は海外に行っています。\n旅行ではありません。仕入れです。", {
    x: M, y: 4.6, w: CW, h: 1.1,
    fontFace: BODY, fontSize: 20, color: INK, margin: 0, valign: "middle", lineSpacing: 36,
  });
  s.addNotes("「仕入れ」という言葉を強調。ここでPART1に入る。");
}

/* ---- 7. PART1 ---- */
partSlide(p, 1, "海外ファッションリサーチ", "流行ではなく、観念を持ち帰る", "15分", "章扉。テンポを変える。");

/* ---- 8. やってはいけない使い方 ---- */
{
  const s = contentSlide(p, "PART 1", "先に、やってはいけない使い方から", "");
  s.addShape(p.ShapeType.roundRect, {
    x: M, y: 2.2, w: CW, h: 1.25, rectRadius: 0.07, fill: { color: GREIGE },
  });
  s.addText("「パリではいま、こういうのが流行っています」", {
    x: M, y: 2.2, w: CW, h: 1.25, align: "center", valign: "middle",
    fontFace: HEAD, fontSize: 27, color: MUTED, margin: 0,
  });
  s.addText("これは、やらないでください。", {
    x: M, y: 3.65, w: CW, h: 0.6,
    fontFace: HEAD, fontSize: 26, bold: true, color: PLUM, margin: 0, valign: "middle",
  });
  const reasons = [
    "それは、雑誌でもできます",
    "日本のお客様は、パリの流行を知りたいわけではありません",
  ];
  reasons.forEach((t, i) => {
    const y = 4.45 + i * 0.85;
    s.addShape(p.ShapeType.roundRect, {
      x: M, y, w: CW, h: 0.72, rectRadius: 0.06, fill: { color: GREIGE_LT },
    });
    s.addText(t, {
      x: M + 0.4, y, w: CW - 0.8, h: 0.72,
      fontFace: BODY, fontSize: 17, color: INK, margin: 0, valign: "middle",
    });
  });
  s.addNotes("ここで差別化が生まれる。多くの人が「流行の紹介」で止まっている。");
}

/* ---- 9. 見るのは観念 ---- */
statementSlide(p, "PART 1",
  "見ているのは、流行ではなく\nその国の人の「観念」です。",
  "観念 ＝ ファッションに対して持っている思い込み、その人の中にあるルール。\nそして観念は、国によって違います。ここが面白いところです。",
  "「観念」という言葉をここで定義する。講座の中心用語。");

/* ---- 10. 3つの見方 ---- */
{
  const s = contentSlide(p, "PART 1", "私が見ているのは、3つです", "");
  const items = [
    ["人", "街を歩く普通の人。\nモデルではなく、\nお客様と同じ年代の人"],
    ["店", "何が売れているかではなく、\n何が入口の一番前に\n置かれているか"],
    ["言葉", "広告コピー、商品タグ、\n店員さんの褒め言葉"],
  ];
  items.forEach((t, i) => {
    const x = M + i * (CW / 3);
    s.addShape(p.ShapeType.roundRect, {
      x: x + 0.1, y: 2.35, w: CW / 3 - 0.2, h: 3.6, rectRadius: 0.08, fill: { color: GREIGE_LT },
    });
    numCircle(p, s, x + CW / 6 - 0.35, 2.65, 0.7, i + 1, PLUM, ROSE_LT, 23);
    s.addText(t[0], {
      x: x + 0.1, y: 3.5, w: CW / 3 - 0.2, h: 0.6, align: "center", valign: "middle",
      fontFace: HEAD, fontSize: 30, bold: true, color: PLUM, margin: 0,
    });
    s.addText(t[1], {
      x: x + 0.35, y: 4.15, w: CW / 3 - 0.7, h: 1.6, align: "center", valign: "top",
      fontFace: BODY, fontSize: 14.5, color: INK, margin: 0, lineSpacing: 24,
    });
  });
  s.addNotes("3つを言ってから、1つずつ写真で見せる。");
}

/* ---- 11. ①人を見る ---- */
{
  const s = contentSlide(p, "PART 1", "① 人を見る", "モデルではなく、お客様と同じ年代の普通の人");
  photoSlot(p, s, M, 2.3, 5.3, 3.6, "［写真①］\n現地の同年代の女性\n\n※ ご自身が撮ってきたものに差し替え");
  s.addShape(p.ShapeType.roundRect, {
    x: M + 5.7, y: 2.3, w: CW - 5.7, h: 1.65, rectRadius: 0.07, fill: { color: PLUM },
  });
  s.addText("見るのは、\nその人が「何を隠していないか」", {
    x: M + 6.05, y: 2.3, w: CW - 6.4, h: 1.65,
    fontFace: HEAD, fontSize: 22, bold: true, color: WHITE, margin: 0, valign: "middle", lineSpacing: 36,
  });
  s.addText("日本では「隠す」ための工夫が多い。\n二の腕を隠す、体型を隠す、白髪を隠す。\n\n［現地］では、［　　　　　　　］。\n\n▶ ここに観念の違いが出ます。", {
    x: M + 5.9, y: 4.15, w: CW - 5.9, h: 1.9,
    fontFace: BODY, fontSize: 15, color: INK, margin: 0, valign: "top", lineSpacing: 26,
  });
  s.addNotes("［　］は必ず実際に見たことに差し替える。ここが借り物だと全部が薄くなる。");
}

/* ---- 12. ②店を見る ---- */
{
  const s = contentSlide(p, "PART 1", "② 店を見る", "何が、入口の一番前に置かれているか");
  photoSlot(p, s, M, 2.3, 5.3, 3.6, "［写真②］\n店頭・入口の陳列\n\n※ ご自身が撮ってきたものに差し替え");
  s.addShape(p.ShapeType.roundRect, {
    x: M + 5.7, y: 2.3, w: CW - 5.7, h: 1.65, rectRadius: 0.07, fill: { color: PLUM },
  });
  s.addText("店が一番前に置くものは、\nその国の人が一番欲しいもの", {
    x: M + 6.05, y: 2.3, w: CW - 6.4, h: 1.65,
    fontFace: HEAD, fontSize: 22, bold: true, color: WHITE, margin: 0, valign: "middle", lineSpacing: 36,
  });
  s.addText("［　　　　　］が前に出ていました。\n\nこれは、［　　　　　　　　　　］\nということです。\n\n▶ 陳列は、その国の欲望の順番です。", {
    x: M + 5.9, y: 4.15, w: CW - 5.9, h: 1.9,
    fontFace: BODY, fontSize: 15, color: INK, margin: 0, valign: "top", lineSpacing: 26,
  });
  s.addNotes("売上ランキングではなく「店が推したいもの」を見る、と言い切る。");
}

/* ---- 13. ③言葉を見る ---- */
{
  const s = contentSlide(p, "PART 1", "③ 言葉を見る ―― ここが一番効きます", "同じ服を売るのに、褒める場所が違います");

  const cols = [
    ["日　本", "「お似合いですよ」", GREIGE, PLUM],
    ["［現地］", "「［　　　　　］」", PLUM, ROSE_LT],
  ];
  cols.forEach((c, i) => {
    const x = M + i * (CW / 2 + 0.1);
    const w = CW / 2 - 0.1;
    s.addText(c[0], {
      x, y: 2.25, w, h: 0.45, align: "center", valign: "middle",
      fontFace: BODY, fontSize: 15, bold: true, color: MUTED, charSpacing: 3, margin: 0,
    });
    s.addShape(p.ShapeType.roundRect, {
      x, y: 2.78, w, h: 1.4, rectRadius: 0.07, fill: { color: c[2] },
    });
    s.addText(c[1], {
      x: x + 0.2, y: 2.78, w: w - 0.4, h: 1.4, align: "center", valign: "middle",
      fontFace: HEAD, fontSize: 25, bold: true, color: c[3], margin: 0,
    });
  });

  s.addShape(p.ShapeType.roundRect, {
    x: M, y: 4.45, w: CW, h: 1.85, rectRadius: 0.08, fill: { color: ROSE_LT },
  });
  s.addText("日本のお客様は「似合っているかどうか」で自分を評価する習慣がある。\nだから診断が売れます。そして、診断だけでは満たされない理由も、ここにあります。", {
    x: M + 0.5, y: 4.45, w: CW - 1.0, h: 1.85,
    fontFace: BODY, fontSize: 18, bold: true, color: PLUM, margin: 0, valign: "middle", lineSpacing: 34,
  });
  s.addNotes("ここが山。実際に言われた言葉を思い出して入れる。診断ビジネスの構造まで一気に届く。");
}

/* ---- 14. 1行にする ---- */
{
  const s = contentSlide(p, "PART 1", "写真で終わらせない。1行にします", "これをやらないと、旅行の思い出で終わります");
  s.addShape(p.ShapeType.roundRect, {
    x: M, y: 2.4, w: CW, h: 1.6, rectRadius: 0.09, fill: { color: PLUM },
  });
  s.addText("［見たこと］。\nこれは［　　　］という観念を表している。", {
    x: M + 0.5, y: 2.4, w: CW - 1.0, h: 1.6,
    fontFace: HEAD, fontSize: 26, bold: true, color: WHITE, margin: 0, valign: "middle", lineSpacing: 44,
  });
  s.addText("型は、これだけです。", {
    x: M, y: 4.2, w: CW, h: 0.5,
    fontFace: BODY, fontSize: 17, color: MUTED, margin: 0, valign: "middle",
  });
  s.addShape(p.ShapeType.roundRect, {
    x: M, y: 4.85, w: CW, h: 1.5, rectRadius: 0.07, fill: { color: ROSE_LT },
  });
  s.addText("この1行が、そのままリールのネタになります。\nしかも、他の誰も持っていないネタです。自分の目で見たものだからです。", {
    x: M + 0.5, y: 4.85, w: CW - 1.0, h: 1.5,
    fontFace: BODY, fontSize: 18, bold: true, color: PLUM, margin: 0, valign: "middle", lineSpacing: 32,
  });
  s.addNotes("ここが今日いちばん持ち帰ってほしいところ。ゆっくり。");
}

/* ---- 15. 1行の例 ---- */
{
  const s = contentSlide(p, "PART 1", "たとえば、こうなります", "");
  s.addShape(p.ShapeType.roundRect, {
    x: M, y: 2.35, w: CW, h: 2.5, rectRadius: 0.09, fill: { color: GREIGE_LT },
    line: { color: ROSE, width: 1.5 },
  });
  s.addText("［現地］の店員は、「似合う」ではなく\n［　　　　　］と褒めた。\n\nこれは、装いを「他人に評価されるもの」ではなく\n「自分で決めるもの」と捉えている観念を表している。", {
    x: M + 0.6, y: 2.35, w: CW - 1.2, h: 2.5,
    fontFace: BODY, fontSize: 19, color: INK, margin: 0, valign: "middle", lineSpacing: 34,
  });
  s.addText("これで、1行です。", {
    x: M, y: 5.2, w: CW, h: 0.6,
    fontFace: HEAD, fontSize: 26, bold: true, color: PLUM, margin: 0, valign: "middle",
  });
  s.addNotes("実際に見たことに差し替える。ここは自分の言葉で。");
}

/* ---- 16. 海外に行けなくても ---- */
{
  const s = contentSlide(p, "PART 1", "海外に行けなくても、できます", "大事なのは、飛行機に乗ることではありません");
  s.addShape(p.ShapeType.roundRect, {
    x: M, y: 2.4, w: CW, h: 1.15, rectRadius: 0.08, fill: { color: PLUM },
  });
  s.addText("「日本語になっていないもの」を見る", {
    x: M, y: 2.4, w: CW, h: 1.15, align: "center", valign: "middle",
    fontFace: HEAD, fontSize: 30, bold: true, color: WHITE, margin: 0,
  });
  const items = [
    "海外の通販サイトのレビュー欄",
    "現地の方のSNS",
    "輸入品のタグ・説明文",
  ];
  items.forEach((t, i) => {
    const y = 3.85 + i * 0.82;
    s.addShape(p.ShapeType.roundRect, {
      x: M, y, w: CW, h: 0.7, rectRadius: 0.06, fill: { color: i % 2 === 0 ? GREIGE_LT : GREIGE },
    });
    s.addText(t, {
      x: M + 0.4, y, w: CW - 0.8, h: 0.7,
      fontFace: BODY, fontSize: 17, color: INK, margin: 0, valign: "middle",
    });
  });
  noteLine(s, 6.4, "見る場所を変えるだけです。", "rose");
  s.addNotes("必ず入れる。ここで「行けないから無理」の離脱を防ぐ。");
}

/* ---- 17. つなぎ ---- */
statementSlide(p, "",
  "AIが弱いのでは\nありません。\n渡す中身がないだけです。",
  "海外リサーチは、その中身を仕入れに行く作業です。\nいま作った1行を、これからAIに渡します。",
  "この勉強会の背骨。早口にしない。ここで2つのテーマが1本になる。");

/* ---- 18. PART2 ---- */
partSlide(p, 2, "AIでリールをつくる", "同じお願いを、2回します", "18分", "実演パート。画面共有の準備。");

/* ---- 19. ①ふつうに頼むと ---- */
{
  const s = contentSlide(p, "PART 2", "① ふつうに、AIに頼むと", "いちばんよくある頼み方から");
  s.addShape(p.ShapeType.roundRect, {
    x: M, y: 2.25, w: CW, h: 1.0, rectRadius: 0.07, fill: { color: GREIGE },
  });
  s.addText("「パーソナルスタイリスト向けの、Instagramリールの構成を作ってください」", {
    x: M + 0.4, y: 2.25, w: CW - 0.8, h: 1.0,
    fontFace: BODY, fontSize: 18, color: INK, margin: 0, valign: "middle",
  });
  photoSlot(p, s, M, 3.45, CW, 2.0, "［AI出力①］　※ 撮影前に、必ずご自身で実際に生成したものを貼ってください");
  s.addShape(p.ShapeType.roundRect, {
    x: M, y: 5.65, w: CW, h: 1.0, rectRadius: 0.07, fill: { color: PLUM },
  });
  s.addText("間違ってはいません。でも、これ、誰が投稿しても成立します。", {
    x: M, y: 5.65, w: CW, h: 1.0, align: "center", valign: "middle",
    fontFace: BODY, fontSize: 18, bold: true, color: ROSE_LT, margin: 0,
  });
  s.addNotes("⚠ 本物を映すこと。台本の例を読み上げると実演にならない。");
}

/* ---- 20. ②中身を渡すと ---- */
{
  const s = contentSlide(p, "PART 2", "② さっきの1行を、渡すと", "同じAIです。変わったのは、渡した中身だけ");
  s.addShape(p.ShapeType.roundRect, {
    x: M, y: 2.2, w: CW, h: 1.55, rectRadius: 0.07, fill: { color: GREIGE_LT },
    line: { color: ROSE, width: 1.2 },
  });
  s.addText("【観察したこと】［現地］の店員は「似合う」ではなく［　］と言った\n【これが表している観念】装いを「他人に評価されるもの」ではなく「自分で決めるもの」と捉えている", {
    x: M + 0.4, y: 2.2, w: CW - 0.8, h: 1.55,
    fontFace: BODY, fontSize: 15, color: INK, margin: 0, valign: "middle", lineSpacing: 28,
  });
  photoSlot(p, s, M, 3.95, CW, 1.95, "［AI出力②］　※ ①と並べて見せる。ここが今日いちばんの山です");
  s.addShape(p.ShapeType.roundRect, {
    x: M, y: 6.1, w: CW, h: 0.85, rectRadius: 0.07, fill: { color: PLUM },
  });
  s.addText("……違いが、分かりますか。", {
    x: M, y: 6.1, w: CW, h: 0.85, align: "center", valign: "middle",
    fontFace: HEAD, fontSize: 24, bold: true, color: WHITE, margin: 0,
  });
  s.addNotes("①と②を必ず並べる。並べないと差が伝わらない。");
}

/* ---- 21. 5つの箱 ---- */
{
  const s = contentSlide(p, "PART 2", "プロンプトは、5つの箱でできています", "この5つが埋まれば、AIは毎回あなたの言葉で書きます");
  const items = [
    ["観察したこと", "自分の目で見たこと"],
    ["これが表している観念", "さっき作った1行の後半"],
    ["伝えたい相手", "年齢で止めず、詰まっている場面まで"],
    ["起きてほしい変化", "ここが一番大事。ここが空く人が一番多い"],
    ["作ってほしいもの ＋ 条件", "リールの4構成と、品を守るルール"],
  ];
  items.forEach((t, i) => {
    const y = 2.35 + i * 0.83;
    const hot = i === 3;
    s.addShape(p.ShapeType.roundRect, {
      x: M, y, w: CW, h: 0.72, rectRadius: 0.06, fill: { color: hot ? ROSE_LT : GREIGE_LT },
    });
    numCircle(p, s, M + 0.25, y + 0.11, 0.5, i + 1, hot ? PLUM : ROSE, WHITE, 16);
    s.addText(t[0], {
      x: M + 0.95, y, w: 4.0, h: 0.72,
      fontFace: HEAD, fontSize: 19, bold: true, color: PLUM, margin: 0, valign: "middle",
    });
    s.addText(t[1], {
      x: M + 5.0, y, w: CW - 5.3, h: 0.72,
      fontFace: BODY, fontSize: 14.5, color: hot ? PLUM : MUTED, bold: hot, margin: 0, valign: "middle",
    });
  });
  s.addNotes("4番を指差す。ここが今日の着地点につながる。");
}

/* ---- 22. リールの4構成 ---- */
{
  const s = contentSlide(p, "PART 2", "AIに指示する「リールの4構成」", "毎回ゼロから考えないための型です");
  const items = [
    ["つかみ", "2秒で\n「私のことだ」"],
    ["共感", "そうなりますよね、\nと受け止める"],
    ["答え", "今日役に立つことを\n1つだけ"],
    ["次の一歩", "保存、\nプロフィールへ"],
  ];
  items.forEach((t, i) => {
    const x = M + i * (CW / 4);
    s.addShape(p.ShapeType.roundRect, {
      x: x + 0.09, y: 2.4, w: CW / 4 - 0.18, h: 2.8, rectRadius: 0.08,
      fill: { color: i % 2 === 0 ? GREIGE_LT : GREIGE },
    });
    numCircle(p, s, x + CW / 8 - 0.3, 2.7, 0.6, i + 1, PLUM, ROSE_LT, 20);
    s.addText(t[0], {
      x: x + 0.09, y: 3.45, w: CW / 4 - 0.18, h: 0.55, align: "center", valign: "middle",
      fontFace: HEAD, fontSize: 23, bold: true, color: PLUM, margin: 0,
    });
    s.addText(t[1], {
      x: x + 0.25, y: 4.05, w: CW / 4 - 0.5, h: 1.0, align: "center", valign: "top",
      fontFace: BODY, fontSize: 14, color: INK, margin: 0, lineSpacing: 24,
    });
  });
  s.addShape(p.ShapeType.roundRect, {
    x: M, y: 5.5, w: CW, h: 0.95, rectRadius: 0.07, fill: { color: PLUM },
  });
  s.addText("条件：うまくいかない理由を、見る人の能力のせいにしない／煽らない", {
    x: M, y: 5.5, w: CW, h: 0.95, align: "center", valign: "middle",
    fontFace: BODY, fontSize: 17, bold: true, color: ROSE_LT, margin: 0,
  });
  s.addNotes("この条件2つは必ず言う。ここが品を守る部分。");
}

/* ---- 23. 埋まらない箱 ---- */
statementSlide(p, "PART 2",
  "埋まらない箱があったら、\nそれが今の課題です。",
  "AIの使い方の問題ではありません。いちばんよく空くのは4番「起きてほしい変化」です。\n「似合う色が分かります」で止まってしまい、その先が書けない。",
  "ここで責めない。「そこは講座で6ヶ月かけて作るところ」と言って、ワークへ。");

/* ---- 24. ワーク ---- */
{
  const s = p.addSlide();
  s.background = { color: PLUM };
  s.addText("W O R K", {
    x: M, y: 1.6, w: CW, h: 0.5, align: "center", valign: "middle",
    fontFace: BODY, fontSize: 16, color: ROSE_LT, charSpacing: 8, margin: 0,
  });
  s.addShape(p.ShapeType.ellipse, { x: 5.17, y: 2.35, w: 3.0, h: 3.0, fill: { color: PLUM_DK } });
  s.addShape(p.ShapeType.ellipse, {
    x: 5.17, y: 2.35, w: 3.0, h: 3.0, fill: { color: PLUM, transparency: 100 },
    line: { color: ROSE, width: 1.5 },
  });
  s.addText("10分", {
    x: 5.17, y: 2.35, w: 3.0, h: 3.0, align: "center", valign: "middle",
    fontFace: HEAD, fontSize: 62, bold: true, color: WHITE, margin: 0,
  });
  s.addText("ここで、手を止めます。", {
    x: M, y: 5.6, w: CW, h: 0.7, align: "center", valign: "middle",
    fontFace: HEAD, fontSize: 30, bold: true, color: WHITE, margin: 0,
  });
  s.addNotes("⚠ 録画では、ここに10分のタイマー画面を入れるか「一時停止してください」と明示する。ここを流すと『聞く会』に戻る。いちばん大事な10分。");
}

/* ---- 25. ワークの手順 ---- */
{
  const s = contentSlide(p, "WORK", "やっていただくのは、2つです", "10分。いま開いているAIでできます");
  const items = [
    ["あなたの1行を作る", "［見たこと］。これは［　］という観念を表している。\n海外でなくて構いません。最近お客様が言った言葉でも大丈夫です。"],
    ["5つの箱を埋めて、AIに投げる", "ChatGPTでも、Geminiでも、何でも構いません。"],
  ];
  items.forEach((t, i) => {
    const y = 2.4 + i * 1.65;
    s.addShape(p.ShapeType.roundRect, {
      x: M, y, w: CW, h: 1.4, rectRadius: 0.07, fill: { color: i % 2 === 0 ? GREIGE_LT : GREIGE },
    });
    numCircle(p, s, M + 0.35, y + 0.38, 0.66, i + 1, PLUM, ROSE_LT, 22);
    s.addText(t[0], {
      x: M + 1.3, y: y + 0.14, w: CW - 1.7, h: 0.5,
      fontFace: HEAD, fontSize: 23, bold: true, color: PLUM, margin: 0, valign: "middle",
    });
    s.addText(t[1], {
      x: M + 1.3, y: y + 0.62, w: CW - 1.7, h: 0.7,
      fontFace: BODY, fontSize: 14.5, color: INK, margin: 0, valign: "top", lineSpacing: 24,
    });
  });
  s.addShape(p.ShapeType.roundRect, {
    x: M, y: 5.85, w: CW, h: 0.95, rectRadius: 0.07, fill: { color: ROSE_LT },
  });
  s.addText("「私なんかがこんな色を」「安かったからつい」――これ全部、観念です", {
    x: M, y: 5.85, w: CW, h: 0.95, align: "center", valign: "middle",
    fontFace: BODY, fontSize: 17, bold: true, color: PLUM, margin: 0,
  });
  s.addNotes("この画面を出したまま止める。テンプレートが見えている状態にしておく。");
}

/* ---- 26. 提出 ---- */
{
  const s = contentSlide(p, "", "作ったものを、送ってください", "完成していなくて構いません");
  s.addShape(p.ShapeType.roundRect, {
    x: M, y: 2.3, w: CW, h: 1.5, rectRadius: 0.08, fill: { color: PLUM },
  });
  s.addText("公式LINEに、そのまま貼り付けてください", {
    x: M, y: 2.3, w: CW, h: 1.5, align: "center", valign: "middle",
    fontFace: HEAD, fontSize: 28, bold: true, color: WHITE, margin: 0,
  });
  const items = [
    "5つの箱のうち、埋まったところまでで大丈夫です",
    "途中で止まった方は「4番で止まりました」だけでも大丈夫です",
    "送ってくださった方に、プロンプトの型とプロンプト集をお送りします",
    "ひとりずつ、私からお返事します（自動返信ではありません）",
  ];
  items.forEach((t, i) => {
    const y = 4.0 + i * 0.72;
    s.addShape(p.ShapeType.roundRect, {
      x: M, y, w: CW, h: 0.62, rectRadius: 0.05,
      fill: { color: i === 3 ? ROSE_LT : GREIGE_LT },
    });
    s.addText(t, {
      x: M + 0.4, y, w: CW - 0.8, h: 0.62,
      fontFace: BODY, fontSize: 16, bold: i === 3, color: i === 3 ? PLUM : INK, margin: 0, valign: "middle",
    });
  });
  s.addNotes("「必ずお返しします」は守ること。ここで会話が一往復すると、以降の配信の届き方が変わる。");
}

/* ---- 27. まとめ ---- */
{
  const s = contentSlide(p, "", "今日のまとめ", "");
  const items = [
    ["「また同じ」は、センスではなく材料の問題", "見る場所を変えれば、変わります"],
    ["見たものは、1行にして初めて材料になる", "［見たこと］＋［どんな観念か］"],
    ["AIは、中身を持っている人が使うと強い", "5つの箱。空いた箱が、あなたの課題です"],
  ];
  items.forEach((t, i) => {
    const y = 2.3 + i * 1.35;
    s.addShape(p.ShapeType.roundRect, {
      x: M, y, w: CW, h: 1.15, rectRadius: 0.07, fill: { color: i % 2 === 0 ? GREIGE_LT : GREIGE },
    });
    numCircle(p, s, M + 0.35, y + 0.25, 0.66, i + 1, PLUM, ROSE_LT, 22);
    s.addText(t[0], {
      x: M + 1.3, y: y + 0.16, w: CW - 1.7, h: 0.5,
      fontFace: HEAD, fontSize: 22, bold: true, color: PLUM, margin: 0, valign: "middle",
    });
    s.addText(t[1], {
      x: M + 1.3, y: y + 0.64, w: CW - 1.7, h: 0.4,
      fontFace: BODY, fontSize: 14.5, color: MUTED, margin: 0, valign: "middle",
    });
  });
  s.addNotes("3つを1つずつ。ここから個別相談へ自然に降りる。");
}

/* ---- 28. 個別相談 ---- */
{
  const s = contentSlide(p, "", "4番で手が止まった方へ", "自分の価値は、自分では当たり前すぎて見えません");
  s.addShape(p.ShapeType.roundRect, {
    x: M, y: 2.2, w: CW, h: 1.15, rectRadius: 0.08, fill: { color: ROSE_LT },
  });
  s.addText("「こんなの誰でもできる」と思っていたことが、実は一番の強みだった。", {
    x: M + 0.4, y: 2.2, w: CW - 0.8, h: 1.15, align: "center", valign: "middle",
    fontFace: HEAD, fontSize: 21, bold: true, color: PLUM, margin: 0,
  });
  s.addText("ここは、一人では決まりません。人に聞かれて、答えているうちに出てくるところです。", {
    x: M, y: 3.5, w: CW, h: 0.45,
    fontFace: BODY, fontSize: 16, color: INK, margin: 0, valign: "middle",
  });
  const items = [
    "いま、どこで詰まっているのか",
    "あなたの強みを、どう言葉にするか",
    "その先に、どんな商品があるといいか",
  ];
  items.forEach((t, i) => {
    const y = 4.08 + i * 0.62;
    s.addShape(p.ShapeType.roundRect, {
      x: M, y, w: CW, h: 0.53, rectRadius: 0.05, fill: { color: GREIGE_LT },
    });
    s.addText(t, {
      x: M + 0.4, y, w: CW - 0.8, h: 0.53,
      fontFace: BODY, fontSize: 16, color: INK, margin: 0, valign: "middle",
    });
  });
  s.addText("売り込みの時間ではありません。私のほうが、聞いている時間が長い時間です。", {
    x: M, y: 5.98, w: CW, h: 0.42, align: "center", valign: "middle",
    fontFace: BODY, fontSize: 15, color: MUTED, margin: 0,
  });
  s.addShape(p.ShapeType.roundRect, {
    x: M, y: 6.48, w: CW, h: 0.72, rectRadius: 0.08, fill: { color: PLUM },
  });
  s.addText("個別相談のお申込み　utage-system.com/event/XZDWcN4ju08q/register", {
    x: M, y: 6.48, w: CW, h: 0.72, align: "center", valign: "middle",
    fontFace: BODY, fontSize: 16, bold: true, color: ROSE_LT, charSpacing: 1, margin: 0,
  });
  s.addNotes("押さない。「お役に立てないと思ったら正直にそう言う」を必ず添える。");
}

/* ---- 29. クロージング ---- */
{
  const s = p.addSlide();
  s.background = { color: PLUM };
  s.addText("「売れる」は結果です。\n「選ばれる」が原因です。", {
    x: M, y: 2.1, w: CW, h: 1.9, align: "center", valign: "middle",
    fontFace: HEAD, fontSize: 38, bold: true, color: WHITE, margin: 0, lineSpacing: 62,
  });
  s.addText("そしてそれは、センスではなく順番で作れます。\n今日は、その最初の1つをやりました。", {
    x: M, y: 4.2, w: CW, h: 1.0, align: "center", valign: "middle",
    fontFace: BODY, fontSize: 18, color: GREIGE, margin: 0, lineSpacing: 32,
  });
  s.addText("えりりん　／　ファッション心理学者・大学教授", {
    x: M, y: 5.75, w: CW, h: 0.4, align: "center", valign: "middle",
    fontFace: BODY, fontSize: 12.5, color: MUTED, charSpacing: 1, margin: 0,
  });
  s.addNotes("ありがとうございました、で締める。個別相談のリンクは前のスライドで出しきる。");
}

p.writeFile({ fileName: "勉強会スライド.pptx" }).then((f) => {
  console.log("生成しました:", f);
});
