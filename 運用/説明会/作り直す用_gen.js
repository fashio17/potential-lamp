const pptx = require('pptxgenjs');
const fs = require('fs');
const P = new pptx();
P.layout = 'LAYOUT_WIDE';            // 13.3 x 7.5
const W = 13.3, H = 7.5;

const BERRY='6D2E46', ROSE='A26769', CREAM='ECE2D0', INK='332B29', MUTE='6A5A5E', BG='FCFAF9';
const SERIF='Cambria', SANS='Calibri';
const IMG = f => 'image/jpeg;base64,' + fs.readFileSync('/home/user/potential-lamp/運用/ページ画像/'+f).toString('base64');

const sh = () => ({ type:'outer', color:'6D2E46', blur:14, offset:3, angle:90, opacity:0.10 });

// 丸数字（この資料の目印）
function badge(s, x, y, txt, d=0.62, fs=22, bg=BERRY, fg='FFFFFF'){
  s.addShape(P.ShapeType.ellipse, { x, y, w:d, h:d, fill:{color:bg} });
  s.addText(txt, { x, y, w:d, h:d, align:'center', valign:'middle', fontFace:SERIF,
                   fontSize:fs, bold:true, color:fg, isTextBox:true, margin:0 });
}
function title(s, txt, sub){
  s.addText(txt, { x:0.85, y:0.55, w:9.2, h:0.9, fontFace:SERIF, fontSize:38, bold:true,
                   color:BERRY, isTextBox:true, margin:0 });
  if(sub) s.addText(sub, { x:0.87, y:1.45, w:11.4, h:0.45, fontFace:SANS, fontSize:15,
                   color:MUTE, isTextBox:true, margin:0 });
}
function card(s,x,y,w,h,fill){ s.addShape(P.ShapeType.roundRect,{x,y,w,h,rectRadius:0.06,fill:{color:fill||'FFFFFF'},line:{color:CREAM,width:1},shadow:sh()}); }

/* ---------- 1 表紙 ---------- */
let s = P.addSlide(); s.background = { color: BERRY };
s.addImage({ data: IMG('1_ヘッダー_白背景.jpg'), x:7.6, y:0, w:5.7, h:7.5, sizing:{type:'cover', w:5.7, h:7.5} });
s.addText('ファッション起業アカデミア', { x:0.9, y:1.5, w:6.3, h:0.4, fontFace:SANS, fontSize:15,
  color:CREAM, charSpacing:3, isTextBox:true, margin:0 });
s.addText('2026年10月期\n3つの講座', { x:0.9, y:2.15, w:6.5, h:2.0, fontFace:SERIF, fontSize:46,
  bold:true, color:'FFFFFF', lineSpacing:58, isTextBox:true, margin:0 });
s.addText('好きなファッションを、自分の言葉と、仕事の形に。', { x:0.92, y:4.3, w:6.3, h:0.5,
  fontFace:SANS, fontSize:16, color:CREAM, isTextBox:true, margin:0 });
s.addText('開講　2026年10月15日（木）21:00\nお申し込み締切　10月14日（水）', { x:0.92, y:5.2, w:6.3, h:1.0,
  fontFace:SANS, fontSize:15, color:'FFFFFF', lineSpacing:26, isTextBox:true, margin:0 });
s.addText('松岡依里子　ファッション心理学者／大学教授', { x:0.92, y:6.5, w:6.3, h:0.4,
  fontFace:SANS, fontSize:12, color:ROSE, isTextBox:true, margin:0 });
s.addNotes('自己紹介はここで1分。20代で商社 → 専業主婦 → 大学院で博士号 → 50歳で大学の教壇 → 57歳で教授。いまは大学院でも教えています。');

/* ---------- 2 行き先で選ぶ ---------- */
s = P.addSlide(); s.background = { color: BG };
title(s, '行き先で選んでください', '3つは上下ではありません。着きたい場所が違うだけです。');
const goals = [
  ['一','発信ができるようになる','お仕事にしなくて大丈夫です','3ヶ月／オンラインのみ'],
  ['二','売るものを決めて、形にする','ファッション心理学から商品をつくる','3ヶ月／オンライン＋対面1回'],
  ['三','売れるところまで、作りきる','販売の動線と自動化まで','6ヶ月／オンライン＋対面2回'],
];
goals.forEach((g,i)=>{
  const y = 2.15 + i*1.62;
  card(s, 0.85, y, 11.6, 1.38);
  badge(s, 1.15, y+0.38, g[0]);
  s.addText(g[1], { x:2.05, y:y+0.24, w:6.2, h:0.45, fontFace:SERIF, fontSize:22, bold:true, color:INK, isTextBox:true, margin:0 });
  s.addText(g[2], { x:2.05, y:y+0.74, w:6.2, h:0.4, fontFace:SANS, fontSize:13, color:MUTE, isTextBox:true, margin:0 });
  s.addText(g[3], { x:8.5, y:y+0.45, w:3.7, h:0.5, fontFace:SANS, fontSize:14, color:BERRY, bold:true, align:'right', isTextBox:true, margin:0 });
});
s.addNotes('ここで「どれが良い・悪い」ではないことを必ず伝える。仕事にしたいかどうか、それだけで決まる。');

/* ---------- 3・4・5 各コース ---------- */
const courses = [
  { n:'一', name:'はじめてのAI発信インスタ講座', price:'100,000円', tag:'モニター価格',
    term:'3ヶ月／オンラインのみ',
    rows:[['オンライン講座','計6回（1回90分）'],['対面ワークショップ','なし'],['合計の時間','9時間']],
    body:['好きなファッションを、ご自分の言葉にして、発信の形にする3ヶ月です。',
          'これは起業の講座ではありません。販売の仕組みは扱いません。',
          'お仕事にされなくても大丈夫です。そこまででも、十分に意味があります。'],
    note:'今回がはじめての開講なので、モニター価格です。受講後に感想をお聞かせください。' },
  { n:'二', name:'ファッション心理学AI活用　商品づくり講座', price:'330,000円', tag:null,
    term:'3ヶ月／オンライン＋対面',
    rows:[['オンライン講座','計6回（1回90分）'],['対面ワークショップ','1回（10:00-15:00・東京）'],['合計の時間','14時間']],
    body:['まず、ファッション心理学を学びます。',
          '「似合う」とは何が起きているのか。人はなぜ服を選び、なぜ迷うのか。',
          'そのうえで、それを材料にして、ご自分の商品をつくります。'],
    note:'知識を仕入れて終わりにしません。3ヶ月で、売るものが決まります。' },
  { n:'三', name:'ファッション起業AI活用　マスター講座', price:'550,000円', tag:'定員 5名',
    term:'6ヶ月／オンライン＋対面',
    rows:[['オンライン講座','計12回（1回90分）'],['対面ワークショップ','2回（各10:00-15:00・東京）'],['合計の時間','28時間']],
    body:['前半の3ヶ月　ファッション心理学を学び、商品をつくる',
          '後半の3ヶ月　販売の動線をつくり、自動化する',
          'UTAGE・公式LINEを使った申し込みの仕組み、コーチングセールスまで。'],
    note:'伴走する期間が長いので、5名までにしています。' },
];
courses.forEach(c=>{
  s = P.addSlide(); s.background = { color: BG };
  badge(s, 0.85, 0.6, c.n, 0.8, 30);
  s.addText(c.name, { x:1.85, y:0.6, w:8.0, h:0.85, fontFace:SERIF, fontSize:27, bold:true, color:BERRY, isTextBox:true, margin:0 });
  s.addText(c.term, { x:1.88, y:1.42, w:8.0, h:0.35, fontFace:SANS, fontSize:13, color:MUTE, isTextBox:true, margin:0 });
  // 価格カード
  card(s, 10.15, 0.58, 2.3, 1.25, BERRY);
  s.addText(c.price, { x:10.15, y:0.82, w:2.3, h:0.55, fontFace:SERIF, fontSize:22, bold:true, color:'FFFFFF', align:'center', isTextBox:true, margin:0 });
  if(c.tag) s.addText(c.tag, { x:10.15, y:1.36, w:2.3, h:0.3, fontFace:SANS, fontSize:11, color:CREAM, align:'center', isTextBox:true, margin:0 });
  // 内訳
  card(s, 0.85, 2.05, 5.3, 2.35);
  c.rows.forEach((r,i)=>{
    s.addText(r[0], { x:1.2, y:2.3+i*0.65, w:2.0, h:0.4, fontFace:SANS, fontSize:13, color:MUTE, isTextBox:true, margin:0 });
    s.addText(r[1], { x:3.15, y:2.3+i*0.65, w:2.8, h:0.4, fontFace:SANS, fontSize:13, bold:true, color:INK, align:'right', isTextBox:true, margin:0 });
  });
  // 本文
  s.addText(c.body.map((t,i)=>({ text:t, options:{ breakLine:i<c.body.length-1 } })),
    { x:6.55, y:2.15, w:5.9, h:2.2, fontFace:SANS, fontSize:15, color:INK, lineSpacing:30, isTextBox:true, margin:0 });
  // 共通
  card(s, 0.85, 4.65, 11.6, 1.05, 'F5EFEC');
  s.addText('全コース共通　質問し放題（48時間以内）／動画講座の会員サイト見放題／アーカイブ視聴可／セルフコーチング／動画撮影会1回',
    { x:1.15, y:4.95, w:11.0, h:0.5, fontFace:SANS, fontSize:13, color:BERRY, isTextBox:true, margin:0 });
  s.addText(c.note, { x:0.88, y:5.95, w:11.5, h:0.6, fontFace:SANS, fontSize:15, italic:true, color:MUTE, isTextBox:true, margin:0 });
  s.addNotes(c.name + ' の説明。金額は口頭でも必ず言うこと。');
});

/* ---------- 6 なぜ6ヶ月なのか ---------- */
s = P.addSlide(); s.background = { color: BG };
title(s, 'なぜ、6ヶ月なのか', '2026年9月に、実際にやってみて分かったことです。');
card(s, 0.85, 2.2, 5.5, 2.75);
s.addText('3ヶ月で', { x:1.2, y:2.5, w:4.8, h:0.4, fontFace:SANS, fontSize:15, color:MUTE, isTextBox:true, margin:0 });
s.addText('できた', { x:1.2, y:2.9, w:4.8, h:0.85, fontFace:SERIF, fontSize:40, bold:true, color:BERRY, isTextBox:true, margin:0 });
s.addText('・ご自分の商品\n・AIで作ったリール1本\n・ファッション心理学の一部／コーチング',
  { x:1.2, y:3.72, w:4.8, h:1.1, fontFace:SANS, fontSize:14, color:INK, lineSpacing:22, isTextBox:true, margin:0 });
card(s, 6.95, 2.2, 5.5, 2.75, BERRY);
s.addText('3ヶ月では', { x:7.3, y:2.5, w:4.8, h:0.4, fontFace:SANS, fontSize:15, color:ROSE, isTextBox:true, margin:0 });
s.addText('できない', { x:7.3, y:2.9, w:4.8, h:0.85, fontFace:SERIF, fontSize:40, bold:true, color:'FFFFFF', isTextBox:true, margin:0 });
s.addText('・販売の動線\n・申し込みから決済までの自動化\n・コーチングセールス',
  { x:7.3, y:3.72, w:4.8, h:1.1, fontFace:SANS, fontSize:14, color:CREAM, lineSpacing:22, isTextBox:true, margin:0 });
s.addText('3ヶ月で、売るものは決まります。けれど、売る道は、まだできません。',
  { x:0.85, y:5.35, w:11.6, h:0.6, fontFace:SERIF, fontSize:24, bold:true, color:INK, align:'center', isTextBox:true, margin:0 });
s.addText('推測ではなく、やってみて出た答えです。／「二」の3ヶ月で区切っても構いません。そこまででも、売るものは手元に残ります。',
  { x:0.85, y:6.1, w:11.6, h:0.6, fontFace:SANS, fontSize:14, color:MUTE, align:'center', isTextBox:true, margin:0 });
s.addNotes('ここがこの説明会でいちばん強い場所。数字ではなく実測の話として話す。');

/* ---------- 7 対面と撮影会 ---------- */
s = P.addSlide(); s.background = { color: BG };
title(s, '対面は「ワークショップ」です', '話を聞く日ではありません。手を動かして、作る日です。');
card(s, 0.85, 2.15, 5.6, 2.6);
s.addText('10:00 - 15:00', { x:1.2, y:2.45, w:5.0, h:0.7, fontFace:SERIF, fontSize:32, bold:true, color:BERRY, isTextBox:true, margin:0 });
s.addText('＝ 5時間。オンライン3回分を超えます。', { x:1.2, y:3.2, w:5.0, h:0.4, fontFace:SANS, fontSize:14, color:MUTE, isTextBox:true, margin:0 });
s.addText('ご案内のページ、申し込みのフォーム、決済まで。\nAIとUTAGEを使って、その場で一緒に作ります。\n対面の日は、コースごとに分けません。',
  { x:1.2, y:3.7, w:5.0, h:0.9, fontFace:SANS, fontSize:14, color:INK, lineSpacing:24, isTextBox:true, margin:0 });
card(s, 6.85, 2.15, 5.6, 2.6, 'F5EFEC');
s.addText('特典　動画撮影会', { x:7.2, y:2.45, w:5.0, h:0.5, fontFace:SERIF, fontSize:24, bold:true, color:BERRY, isTextBox:true, margin:0 });
s.addText('丸の内・2時間・どのコースにも1回', { x:7.2, y:3.0, w:5.0, h:0.35, fontFace:SANS, fontSize:13, color:MUTE, isTextBox:true, margin:0 });
s.addText('「発信したいけれど、撮るものがない」\nこれが、いちばん多いお悩みでした。\n撮影は卒業生がお手伝いします。ご参加は任意です。',
  { x:7.2, y:3.5, w:5.0, h:1.0, fontFace:SANS, fontSize:14, color:INK, lineSpacing:24, isTextBox:true, margin:0 });
s.addText('ひとりでやると、たいてい途中で止まります。だから、作りきる日をつくりました。',
  { x:0.85, y:5.2, w:11.6, h:0.6, fontFace:SERIF, fontSize:20, bold:true, color:INK, align:'center', isTextBox:true, margin:0 });
s.addNotes('「1回しかない」ではなく「1日で作りきる」と言うこと。');

/* ---------- 8 持って帰るもの ---------- */
s = P.addSlide(); s.background = { color: BG };
title(s, '持って帰っていただくもの', 'この講座は、成果ではなく成果物をお渡しします。');
const items = [
  ['自分の強みを、1枚にまとめた紙','全コース'],
  ['書き直した、プロフィール文','全コース'],
  ['ご自分で作ったリール 6本','全コース'],
  ['AIで投稿文を書く、プロンプトの型','全コース'],
  ['撮影会で撮った、ご自分の動画','全コース'],
  ['ご自分の商品','二・三'],
  ['実際に動く申し込みの動線','三'],
];
items.forEach((it,i)=>{
  const col = i % 2, row = Math.floor(i/2);
  const x = 0.85 + col*5.9, y = 2.1 + row*1.05;
  card(s, x, y, 5.6, 0.85, it[1]==='全コース' ? 'FFFFFF' : 'F5EFEC');
  s.addText(it[0], { x:x+0.35, y:y+0.22, w:4.0, h:0.42, fontFace:SANS, fontSize:14, color:INK, isTextBox:true, margin:0 });
  s.addText(it[1], { x:x+4.35, y:y+0.25, w:1.0, h:0.35, fontFace:SANS, fontSize:11, bold:true, color:BERRY, align:'right', isTextBox:true, margin:0 });
});
s.addText('ご家族の介護やお仕事があっても、できたか・できていないかだけで見られる形にしています。',
  { x:0.85, y:6.35, w:11.6, h:0.5, fontFace:SANS, fontSize:14, color:MUTE, isTextBox:true, margin:0 });

/* ---------- 9 向いていない方 ---------- */
s = P.addSlide(); s.background = { color: BG };
title(s, '先に、正直にお伝えします', null);
card(s, 0.85, 1.95, 5.6, 2.55);
s.addText('向いていない方', { x:1.2, y:2.25, w:5.0, h:0.45, fontFace:SERIF, fontSize:22, bold:true, color:BERRY, isTextBox:true, margin:0 });
s.addText('今すぐ収入にしたい方\n言われたとおりにやりたい方',
  { x:1.2, y:2.85, w:5.0, h:0.8, fontFace:SANS, fontSize:15, color:INK, lineSpacing:28, isTextBox:true, margin:0 });
s.addText('自分の言葉を探す講座です。当てはまる方は、見送ってください。',
  { x:1.2, y:3.68, w:5.0, h:0.7, fontFace:SANS, fontSize:13, color:MUTE, lineSpacing:20, isTextBox:true, margin:0 });
card(s, 6.85, 1.95, 5.6, 2.55, BERRY);
s.addText('お約束しないこと', { x:7.2, y:2.25, w:5.0, h:0.45, fontFace:SERIF, fontSize:22, bold:true, color:'FFFFFF', isTextBox:true, margin:0 });
s.addText('フォロワーが増えること\n売上が出ること\nお仕事になること',
  { x:7.2, y:2.85, w:5.0, h:1.1, fontFace:SANS, fontSize:15, color:CREAM, lineSpacing:28, isTextBox:true, margin:0 });
s.addText('何をどう進めるかは、おひとりずつ違います。手順と考え方をお伝えし、続けられる形にするところまでを一緒にやります。',
  { x:0.85, y:4.65, w:11.6, h:0.6, fontFace:SANS, fontSize:15, color:INK, isTextBox:true, margin:0 });
card(s, 0.85, 5.5, 11.6, 1.15, 'F5EFEC');
s.addText('出られない回があっても大丈夫です。すべて録画してアーカイブに残します。動画講座の会員サイトも見放題です。',
  { x:1.2, y:5.82, w:11.0, h:0.5, fontFace:SANS, fontSize:14, color:BERRY, isTextBox:true, margin:0 });

/* ---------- 10 受講料と次の一歩 ---------- */
s = P.addSlide(); s.background = { color: BERRY };
s.addImage({ data: IMG('4_プロフィール_丸の内.jpg'), x:9.3, y:0, w:4.0, h:7.5, sizing:{type:'cover', w:4.0, h:7.5} });
s.addText('受講料', { x:0.9, y:0.7, w:7.8, h:0.7, fontFace:SERIF, fontSize:34, bold:true, color:'FFFFFF', isTextBox:true, margin:0 });
const price = [['一　はじめてのAI発信インスタ講座','3ヶ月・9時間','100,000円'],
               ['二　ファッション心理学AI活用　商品づくり講座','3ヶ月・14時間','330,000円'],
               ['三　ファッション起業AI活用　マスター講座','6ヶ月・28時間','550,000円']];
price.forEach((p,i)=>{
  const y = 1.75 + i*1.0;
  s.addText(p[0], { x:0.9, y:y, w:5.3, h:0.4, fontFace:SANS, fontSize:14, bold:true, color:'FFFFFF', isTextBox:true, margin:0 });
  s.addText(p[1], { x:0.9, y:y+0.38, w:5.3, h:0.32, fontFace:SANS, fontSize:11, color:ROSE, isTextBox:true, margin:0 });
  s.addText(p[2], { x:6.3, y:y+0.02, w:2.3, h:0.5, fontFace:SERIF, fontSize:20, bold:true, color:CREAM, align:'right', isTextBox:true, margin:0 });
});
s.addText('お支払いは一括（クレジットカード／銀行振込）。分割のご相談にも応じます。',
  { x:0.9, y:4.95, w:7.8, h:0.4, fontFace:SANS, fontSize:13, color:CREAM, isTextBox:true, margin:0 });
s.addText('今日、決めなくて大丈夫です。', { x:0.9, y:5.65, w:7.8, h:0.55, fontFace:SERIF, fontSize:26, bold:true, color:'FFFFFF', isTextBox:true, margin:0 });
s.addText('合わないと思われたら、見送ってくださってかまいません。\nご質問はいつでも。48時間以内にお返事します。',
  { x:0.9, y:6.25, w:7.8, h:0.8, fontFace:SANS, fontSize:14, color:CREAM, lineSpacing:24, isTextBox:true, margin:0 });
s.addNotes('ここで売り込まない。「今日決めなくていい」と必ず口に出す。締切は10/14。');

P.writeFile({ fileName: '/tmp/deck/説明会_3コース_2026年10月期.pptx' }).then(f=>console.log('書けました:', f));
