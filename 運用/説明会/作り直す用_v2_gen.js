const pptx = require('pptxgenjs');
const fs = require('fs');
const P = new pptx(); P.layout='LAYOUT_WIDE';
const BERRY='6D2E46', ROSE='A26769', INK='332B29', MUTE='6A5A5E', RULE='E0D6D2', FAINT='9A8A8E';
const SERIF='Cambria', SANS='Calibri';
const M = f => 'image/jpeg;base64,' + fs.readFileSync('/tmp/deck/un/ppt/media/'+f).toString('base64');
const MY = f => 'image/jpeg;base64,' + fs.readFileSync('/home/user/potential-lamp/reels/素材/丸の内/'+f).toString('base64');

function T(s, t, sub){
  s.addText(t, { x:0.8, y:0.5, w:11.7, h:0.85, fontFace:SERIF, fontSize:36, bold:true, color:BERRY, isTextBox:true, margin:0 });
  if(sub) s.addText(sub, { x:0.82, y:1.38, w:11.7, h:0.4, fontFace:SANS, fontSize:14, color:MUTE, isTextBox:true, margin:0 });
}
function hr(s, y, x=0.8, w=11.7){ s.addShape(P.ShapeType.line,{x,y,w,h:0,line:{color:RULE,width:1}}); }
function box(s,x,y,w,h){ s.addShape(P.ShapeType.rect,{x,y,w,h,fill:{color:'FFFFFF'},line:{color:RULE,width:1}}); }
function body(s,x,y,w,txt,size=14,color=INK,ls=26){
  s.addText(txt, { x,y,w,h:0.4*txt.split('\n').length+0.6, fontFace:SANS, fontSize:size, color, lineSpacing:ls, valign:'top', isTextBox:true, margin:0 });
}
let s;

/* 1 表紙 */
s=P.addSlide();
s.addImage({ data:MY('01_白背景_スタジオ_白ジャケットピンク.jpg'), x:8.0, y:0.9, w:4.7, h:3.13 });
s.addText('ファッション起業アカデミア', { x:0.9, y:1.3, w:6.6, h:0.4, fontFace:SANS, fontSize:14, color:ROSE, charSpacing:3, isTextBox:true, margin:0 });
s.addText('2026年10月期\n3つの講座', { x:0.9, y:1.9, w:6.8, h:1.9, fontFace:SERIF, fontSize:44, bold:true, color:BERRY, lineSpacing:56, isTextBox:true, margin:0 });
s.addText('好きなファッションを、自分の言葉と、仕事の形に。', { x:0.92, y:3.95, w:6.8, h:0.45, fontFace:SANS, fontSize:16, color:INK, isTextBox:true, margin:0 });
hr(s, 4.75, 0.9, 6.6);
s.addText('開講　2026年10月15日（木）21:00\nお申し込み締切　10月14日（水）', { x:0.92, y:4.95, w:6.8, h:0.9, fontFace:SANS, fontSize:15, color:INK, lineSpacing:26, isTextBox:true, margin:0 });
s.addText('松岡依里子　ファッション心理学者／大学教授', { x:0.92, y:6.3, w:6.8, h:0.4, fontFace:SANS, fontSize:12, color:FAINT, isTextBox:true, margin:0 });
s.addNotes('自己紹介はここで1分。20代で商社 → 専業主婦 → 大学院で博士号 → 50歳で大学の教壇 → 57歳で教授。いまは大学院でも教えています。');

/* 2 自己紹介 */
s=P.addSlide(); T(s,'松岡依里子（まつおか えりこ）','ファッション心理学者／大学教授・64歳');
s.addImage({ data:MY('04_通り_全身_黒セットアップ_白い帽子.jpg'), x:9.3, y:1.95, w:3.2, h:4.8 });
body(s,0.85,2.05,8.0,'大学教授（ファッションビジネス研究室）\nFashion Laboratory 代表／ファッション起業アカデミア 主宰\n\nファッション行動を心理学的に分析する研究をしています。\n着こなしのご提案はしていません。「似合うとは何が起きているのか」を研究する立場です。',15,INK,28);
hr(s, 4.6, 0.85, 8.0);
s.addText('20代　ファッションの商社で仕入れと営業', { x:0.85, y:4.8, w:8.0, h:0.36, fontFace:SANS, fontSize:14, color:INK, valign:'top', isTextBox:true, margin:0 });
s.addText('　　　　結婚して、長く専業主婦', { x:0.85, y:5.2, w:8.0, h:0.36, fontFace:SANS, fontSize:14, color:MUTE, valign:'top', isTextBox:true, margin:0 });
s.addText('　　　　大学院に入り直して、博士号を取得', { x:0.85, y:5.6, w:8.0, h:0.36, fontFace:SANS, fontSize:14, color:MUTE, valign:'top', isTextBox:true, margin:0 });
s.addText('50歳　大学の教壇へ　　57歳　大学教授', { x:0.85, y:6.0, w:8.0, h:0.36, fontFace:SANS, fontSize:14, bold:true, color:BERRY, valign:'top', isTextBox:true, margin:0 });
s.addText('　　　　その後、起業。いまは大学院でも教えています', { x:0.85, y:6.4, w:8.0, h:0.36, fontFace:SANS, fontSize:14, color:MUTE, valign:'top', isTextBox:true, margin:0 });

/* 3 実績 */
s=P.addSlide(); T(s,'これまでにやってきたこと',null);
const nums=[['30年以上','ファッション心理学の研究'],['3000名以上','学生・社会人へのキャリア指導と起業指導'],['3カ国','ソウル・パリ・ニューヨークで自分の足で実地リサーチ']];
nums.forEach((n,i)=>{
  const y=2.1+i*1.6;
  s.addText(n[0], { x:0.85, y:y, w:3.6, h:0.8, fontFace:SERIF, fontSize:40, bold:true, color:BERRY, isTextBox:true, margin:0 });
  s.addText(n[1], { x:4.7, y:y+0.22, w:7.8, h:0.5, fontFace:SANS, fontSize:16, color:INK, isTextBox:true, margin:0 });
  hr(s, y+1.15);
});
body(s,0.85,6.8,11.7,'ファッション心理学・コーチング・SNSマーケティングの3つで、ビジネスを立ち上げるところまでをご一緒します。',14,MUTE);

/* 4 7つの技 */
s=P.addSlide(); T(s,'ファッション起業で収益化する7つの技',null);
const waza=[['一','自身の強み','ファッション心理学を学び、AIも使って商品をつくる'],
            ['二','SNSの発信','インスタグラムを中心に情報を届ける'],
            ['三','動画','リールをはじめとした動画の制作'],
            ['四','集客動線','お客さまが集まる道を設計する。ここでもAI'],
            ['五','LP・バナー','申し込みページとバナーの制作。AIで時間を縮める'],
            ['六','セールス','売る技術'],
            ['七','コーチング','お客さまとご自分に向き合う技術']];
waza.forEach((w,i)=>{
  const col=i<4?0:1, row=i<4?i:i-4;
  const x=0.85+col*6.0, y=2.05+row*1.15;
  s.addText(w[0], { x, y:y+0.05, w:0.5, h:0.5, fontFace:SERIF, fontSize:22, bold:true, color:ROSE, isTextBox:true, margin:0 });
  s.addText(w[1], { x:x+0.6, y:y, w:4.8, h:0.4, fontFace:SANS, fontSize:16, bold:true, color:INK, isTextBox:true, margin:0 });
  s.addText(w[2], { x:x+0.6, y:y+0.42, w:5.0, h:0.4, fontFace:SANS, fontSize:12, color:MUTE, isTextBox:true, margin:0 });
});

/* 5 AI */
s=P.addSlide(); T(s,'AIは、何をしてくれるのか','AIは、ゼロから何かを作る道具ではありません。');
box(s,0.85,2.1,11.7,1.5);
s.addText('自分の中にすでにあるものを、投稿文・画像・教材に展開してくれる共同制作者です。\n素材は、あなたの人生の中にあります。', { x:1.25, y:2.45, w:11.0, h:0.9, fontFace:SERIF, fontSize:19, color:INK, lineSpacing:34, isTextBox:true, margin:0 });
const ai=[['画像生成・アイデア出し','ChatGPT／Claude'],['動画編集・リール作成','Claude Code'],['LP作成・アプリ作成','Claude Code／Codex']];
ai.forEach((a,i)=>{
  const y=4.05+i*0.95;
  s.addText(a[0], { x:0.85, y, w:5.6, h:0.45, fontFace:SANS, fontSize:16, color:INK, isTextBox:true, margin:0 });
  s.addText(a[1], { x:6.6, y, w:5.9, h:0.45, fontFace:SANS, fontSize:16, bold:true, color:BERRY, isTextBox:true, margin:0 });
  hr(s, y+0.6);
});

/* 6 ロードマップ */
s=P.addSlide(); T(s,'6ヶ月のロードマップ','1年かかることを、6ヶ月に凝縮しています。');
box(s,0.85,2.15,5.6,3.6);
s.addText('1 〜 4ヶ月', { x:1.2, y:2.45, w:5.0, h:0.55, fontFace:SERIF, fontSize:26, bold:true, color:BERRY, isTextBox:true, margin:0 });
s.addText('土台をつくる', { x:1.2, y:3.05, w:5.0, h:0.4, fontFace:SANS, fontSize:15, bold:true, color:INK, isTextBox:true, margin:0 });
body(s,1.2,3.55,5.0,'インスタマーケティング\nファッション心理学\nコーチング\n\n売れる商品と、仕組みの土台をつくります。',14,MUTE,24);
box(s,6.95,2.15,5.6,3.6);
s.addText('5 〜 6ヶ月', { x:7.3, y:2.45, w:5.0, h:0.55, fontFace:SERIF, fontSize:26, bold:true, color:BERRY, isTextBox:true, margin:0 });
s.addText('売れる仕組みにする', { x:7.3, y:3.05, w:5.0, h:0.4, fontFace:SANS, fontSize:15, bold:true, color:INK, isTextBox:true, margin:0 });
body(s,7.3,3.55,5.0,'ファーストキャッシュをとる\nプロモーションの強化\n売れる仕組み化\nビジネスの改善と加速',14,MUTE,24);
s.addText('3ヶ月で区切っても構いません。そこまででも、売るものは手元に残ります。', { x:0.85, y:6.1, w:11.7, h:0.5, fontFace:SANS, fontSize:15, color:MUTE, isTextBox:true, margin:0 });

/* 7-10 受講生の声 */
const MO = f => 'image/jpeg;base64,' + fs.readFileSync('/tmp/deck/un_old/ppt/media/'+f).toString('base64');
function voice(s, x, y, w, name, role, before, after, img, imgW, src){
  s.addText(name, { x, y, w, h:0.4, fontFace:SERIF, fontSize:17, bold:true, color:BERRY, isTextBox:true, margin:0 });
  s.addText(role, { x, y:y+0.4, w, h:0.35, fontFace:SANS, fontSize:11, color:FAINT, isTextBox:true, margin:0 });
  s.addText('受講前', { x, y:y+0.85, w:1.0, h:0.28, fontFace:SANS, fontSize:10.5, bold:true, color:ROSE, isTextBox:true, margin:0 });
  s.addText(before, { x, y:y+1.15, w, h:0.85, fontFace:SANS, fontSize:11.5, color:MUTE, lineSpacing:18, isTextBox:true, margin:0 });
  s.addText('その後', { x, y:y+2.08, w:1.0, h:0.28, fontFace:SANS, fontSize:10.5, bold:true, color:ROSE, isTextBox:true, margin:0 });
  s.addText(after, { x, y:y+2.38, w, h:1.7, fontFace:SANS, fontSize:12, color:INK, lineSpacing:19, isTextBox:true, margin:0 });
  if(img) s.addImage({ data:(src==='old'?MO(img):M(img)), x:x+w+0.25, y:y+0.15, w:imgW, h:imgW*1.33 });
}

s=P.addSlide(); T(s,'受講生の声　一','お名前と数字は、ご本人の許可をいただいて載せています。');
voice(s,0.85,2.0,3.3,'船渡恭子 様（50代）','帽子コーディネーター／デザイナー',
 '帽子でビジネスができるのか、不安がいっぱいでした。',
 '帽子ブランドを立ち上げ、オンラインストアを運営。\n初のポップアップショップで7桁を達成。\nフォロワーは5,000から19,000へ。\nライブをすれば必ず売れる状況が続いています。','image17.jpeg',1.75,'new');
voice(s,6.3,2.0,3.3,'冨永彩心 さん（50代）','ブランディングスタイリスト',
 '集客は得意でしたが、3,000円の商品は売れても高額が難しく、コーチングを学びました。',
 '30万円程度から7桁に。\nインスタ 7.2万人。\n2024年3月に書籍も出版されました。','image18.jpeg',1.75,'new');

s=P.addSlide(); T(s,'受講生の声　二',null);
voice(s,0.85,2.0,4.6,'元地陽子 様（40代）','神戸・ファッションスタイリスト／セレクトショップ経営',
 'はじめは、何をすれば良いのか分かりませんでした。ファッション心理学とコーチングが必要だと思い、入りました。',
 'アクセサリーブランドを立ち上げ、初月から20万円以上。\nYouTube 4万人以上／インスタ 2.1万人。\nいまはアパレルも作り、ライブで完売しています。\n\n「行動するということが、本当に重要です」',null,0,'new');
voice(s,7.2,2.0,4.0,'岩高要子 さん','神戸・セレクトショップ3店舗経営／専務取締役',
 'コロナで来店が減り、独自にインスタをやっていましたが、成果が出ませんでした。',
 'スタッフ全員でインスタ運用を受講。\nインスタ経由の問い合わせと購入が急増し、\n海外からのご注文も。\n売上はコロナ前以上になりました。','image20.jpeg',1.6,'new');

s=P.addSlide(); T(s,'受講生の声　三','「資格はあるのに、仕事にならない」ところから始まった方です。');
voice(s,0.85,2.0,5.0,'鈴木 様（50代）','魅力開花セールスコーチ／元・会社員',
 'イメージコンサルタントで起業する人が増え、どう差別化するか、プロとしてやっていく自信がないことが悩みでした。（スタイリストやアパレルの経験がなかったので）',
 '自分の経歴と強みを洗い出すうちに、会社員時代の経験を活かした商品が作れると分かりました。\nファッションにこだわらない、新しい商品ができました。\n\n「起業家として出発する土台づくりができました」',null,0,'new');
voice(s,7.0,2.0,5.4,'石田 様（50代）','ウェルビーイングファッション®︎スタイリスト',
 'ウェルビーイングファッションを広めたいと思っていましたが、ビジネスの方法が分かりませんでした。インスタもLINEもLPも知りませんでした。',
 'ファッション心理学で、感じていたことの裏付けが得られました。\n1DAY講座を一緒に開催し、バックエンドも販売できました。\n商標登録も取られています。',null,0,'new');

s=P.addSlide(); T(s,'受講生の声　四','パートから始めて、いまはご自分のお仕事にされています。');
s.addImage({ data:M('image22.jpeg'), x:9.5, y:2.1, w:3.0, h:4.0 });
voice(s,0.85,2.0,7.8,'中島ようこ 様（40代・ママ起業家）','パーソナルスタイリスト（熊本）',
 '起業で何から始めて良いのか分からず、アパレル系の企業でパートとして働いていました。',
 'マスター講座で、コーチング・ファッション心理学・インスタマーケティングを学びました。\n商品を作り、パーソナルスタイリストとしてモニターから始めました。\nフォロワーもLINE登録者も増え、月収は会社員のころを超えました。\nお子さんお二人を育てながら、いまも活動されています。',null,0,'new');

s=P.addSlide(); T(s,'受講生の声　五','短いお声もいただいています。');
const vs=[['Kさん','服飾大学卒業後 ZARA 勤務／現在フリーデザイナー','最新の情報でびっくりすることが多いです。私の強みに合わせたブランディングをしてくださるので、本当にためになりました。'],
          ['Sさん','スタイリスト／イメージコンサルタント','どんなメニューで展開したらよいのか迷っていましたが、方向性がはっきりしました。商品作りが斬新で、学びに役立ちました。'],
          ['Tさん','セレクトショップ オーナー','コーチングでモチベーションが上がりました。ショップの商品をネットで販売する方法を学び、売上も上がりました。'],
          ['Mさん','外資系IT 勤務','副業を考えて受講しました。学んでいるうちに、コンテストのファイナリストになるなど、思わぬ成果が出ています。'],
          ['松田れい 様（20代）','ブランディングプロデューサー','ファッションについて言語化できるようになりました。副業で始めましたが、本職をやめて複業でビジネスを展開し始めました。'],
          ['西尾 様（40代）','ひとり起業家のためのセールスコーチ','LINEステップ、集客、コーチングを教えていただき、50万円の収益に。その後すぐに7桁を超えました。']];
vs.forEach((v,i)=>{
  const col=i%2, row=Math.floor(i/2);
  const x=0.85+col*6.1, y=2.05+row*1.55;
  s.addText(v[0], { x, y, w:5.6, h:0.35, fontFace:SERIF, fontSize:15, bold:true, color:BERRY, isTextBox:true, margin:0 });
  s.addText(v[1], { x, y:y+0.34, w:5.6, h:0.3, fontFace:SANS, fontSize:10.5, color:FAINT, isTextBox:true, margin:0 });
  s.addText(v[2], { x, y:y+0.68, w:5.6, h:0.7, fontFace:SANS, fontSize:11.5, color:INK, lineSpacing:18, isTextBox:true, margin:0 });
  hr(s, y+1.42, x, 5.6);
});

/* 10 行き先 */
s=P.addSlide(); T(s,'行き先で選んでください','3つは上下ではありません。着きたい場所が違うだけです。');
const goals=[['一','発信ができるようになる','お仕事にしなくて大丈夫です','3ヶ月／オンラインのみ'],
             ['二','売るものを決めて、形にする','ファッション心理学から商品をつくる','3ヶ月／オンライン＋対面1回'],
             ['三','売れるところまで、作りきる','販売の動線と自動化まで','6ヶ月／オンライン＋対面2回']];
goals.forEach((g,i)=>{
  const y=2.2+i*1.5;
  s.addText(g[0], { x:0.85, y:y+0.15, w:0.7, h:0.6, fontFace:SERIF, fontSize:30, bold:true, color:ROSE, isTextBox:true, margin:0 });
  s.addText(g[1], { x:1.7, y:y, w:6.2, h:0.5, fontFace:SERIF, fontSize:22, bold:true, color:INK, isTextBox:true, margin:0 });
  s.addText(g[2], { x:1.72, y:y+0.55, w:6.2, h:0.4, fontFace:SANS, fontSize:13, color:MUTE, isTextBox:true, margin:0 });
  s.addText(g[3], { x:8.2, y:y+0.2, w:4.3, h:0.5, fontFace:SANS, fontSize:14, bold:true, color:BERRY, align:'right', isTextBox:true, margin:0 });
  hr(s, y+1.15);
});
s.addNotes('「どれが良い・悪い」ではない。仕事にしたいかどうか、それだけで決まる。');

/* 11-13 各コース */
const courses=[
 {n:'一',name:'はじめてのAI発信インスタ講座',price:'100,000円',tag:'モニター価格',term:'3ヶ月／オンラインのみ',
  rows:[['オンライン講座','計6回（1回90分）'],['対面ワークショップ','なし'],['合計の時間','9時間']],
  body:'好きなファッションを、ご自分の言葉にして、発信の形にする3ヶ月です。\n\nこれは起業の講座ではありません。販売の仕組みは扱いません。\nお仕事にされなくても大丈夫です。そこまででも、十分に意味があります。',
  note:'今回がはじめての開講なので、モニター価格です。受講後に感想をお聞かせください。'},
 {n:'二',name:'ファッション心理学AI活用　商品づくり講座',price:'330,000円',tag:null,term:'3ヶ月／オンライン＋対面',
  rows:[['オンライン講座','計6回（1回90分）'],['対面ワークショップ','1回（10:00-15:00）'],['合計の時間','14時間']],
  body:'まず、ファッション心理学を学びます。\n「似合う」とは何が起きているのか。人はなぜ服を選び、なぜ迷うのか。\n\nそのうえで、それを材料にして、ご自分の商品をつくります。',
  note:'知識を仕入れて終わりにしません。3ヶ月で、売るものが決まります。'},
 {n:'三',name:'ファッション起業AI活用　マスター講座',price:'550,000円',tag:'定員 5名',term:'6ヶ月／オンライン＋対面',
  rows:[['オンライン講座','計12回（1回90分）'],['対面ワークショップ','2回（各10:00-15:00）'],['合計の時間','28時間']],
  body:'前半の3ヶ月　ファッション心理学を学び、商品をつくる\n後半の3ヶ月　販売の動線をつくり、自動化する\n\nUTAGE・公式LINEを使った申し込みの仕組み、コーチングセールスまで。',
  note:'伴走する期間が長いので、5名までにしています。'}];
courses.forEach(c=>{
  s=P.addSlide();
  s.addText(c.n, { x:0.85, y:0.5, w:0.8, h:0.8, fontFace:SERIF, fontSize:36, bold:true, color:ROSE, isTextBox:true, margin:0 });
  s.addText(c.name, { x:1.75, y:0.5, w:7.6, h:0.85, fontFace:SERIF, fontSize:26, bold:true, color:BERRY, isTextBox:true, margin:0 });
  s.addText(c.term, { x:1.78, y:1.35, w:7.6, h:0.35, fontFace:SANS, fontSize:13, color:MUTE, isTextBox:true, margin:0 });
  s.addText(c.price, { x:9.6, y:0.55, w:2.9, h:0.7, fontFace:SERIF, fontSize:30, bold:true, color:BERRY, align:'right', isTextBox:true, margin:0 });
  if(c.tag) s.addText(c.tag, { x:9.6, y:1.3, w:2.9, h:0.35, fontFace:SANS, fontSize:12, color:ROSE, align:'right', isTextBox:true, margin:0 });
  hr(s, 1.95);
  c.rows.forEach((r,i)=>{
    const y=2.3+i*0.72;
    s.addText(r[0], { x:0.85, y, w:2.6, h:0.4, fontFace:SANS, fontSize:13, color:MUTE, isTextBox:true, margin:0 });
    s.addText(r[1], { x:3.0, y, w:3.4, h:0.4, fontFace:SANS, fontSize:13, bold:true, color:INK, align:'right', isTextBox:true, margin:0 });
  });
  s.addShape(P.ShapeType.line,{x:6.5,y:2.25,w:0,h:2.0,line:{color:RULE,width:1}});
  body(s,7.0,2.2,5.5,c.body,14,INK,25);
  hr(s, 4.85);
  s.addText('全コース共通　質問し放題（48時間以内）／動画講座の会員サイト見放題／アーカイブ視聴可／セルフコーチング／勉強会へご招待／動画撮影会1回',
    { x:0.85, y:5.05, w:11.7, h:0.5, fontFace:SANS, fontSize:12, color:BERRY, isTextBox:true, margin:0 });
  s.addText(c.note, { x:0.85, y:5.9, w:11.7, h:0.6, fontFace:SANS, fontSize:15, italic:true, color:MUTE, isTextBox:true, margin:0 });
  s.addNotes(c.name+' の説明。金額は口頭でも必ず言うこと。');
});

/* 14 講座の中身 */
s=P.addSlide(); T(s,'講座の中身','5つに分かれています。「三」はこの全部、「二」は一と二と五の一部です。');
const naka=[['一','商品作成とマーケティング基礎','ポジショニング／マーケティング概論／リサーチと自己分析／商品作成と説明用パワポ／LP作成／コピーライティング／AI'],
            ['二','インスタ企画','アルゴリズム／AI活用・EDITS／インサイト分析／競合リサーチ／動画撮影／動画編集／シナリオの書き方'],
            ['三','動線設計','公式LINEのプレゼント作成（PDF・教育動画）／エルメとの連携／LINEステップ'],
            ['四','商品販売','セミナー・個別相談の企画／教育動画／バックエンド販売／資料作成／セールスの方法'],
            ['五','コーチング × ファッション心理学','コーチング（自己管理・目標設定・セールス）／ファッション理論（素材・デザイン・シルエット・ブランド・色）／ファッション心理学（心理スケール・潜在意識・規範・流行・ライフスタイル・印象管理）']];
naka.forEach((n,i)=>{
  const y=2.0+i*1.0;
  s.addText(n[0], { x:0.85, y:y+0.03, w:0.5, h:0.45, fontFace:SERIF, fontSize:20, bold:true, color:ROSE, isTextBox:true, margin:0 });
  s.addText(n[1], { x:1.45, y, w:3.3, h:0.4, fontFace:SANS, fontSize:15, bold:true, color:INK, isTextBox:true, margin:0 });
  s.addText(n[2], { x:4.9, y, w:7.6, h:0.8, fontFace:SANS, fontSize:11.5, color:MUTE, lineSpacing:17, isTextBox:true, margin:0 });
  hr(s, y+0.88);
});

/* 15 各回① */
s=P.addSlide(); T(s,'各回の内容　AI × SNSマーケティング','全11回。内容と回数は変わることがあります。');
const r1=[['1','ポジショニングとマーケティングの仕組み／競合リサーチ'],['2','ファッション理論とフロント企画の事例'],['3','商品作成'],['4','ChatGPTによる商品作成'],['5','インスタグラムのアルゴリズム'],['6','インスタのアカウント設計とシナリオ作成'],['7','リール・ストーリーズ・ライブ'],['8','公式LINEとエルメの接続／LINEステップ／自動集客'],['9','（調整回）'],['10','コピーライティング'],['11','ChatGPTとCanvaでLP作成']];
r1.forEach((r,i)=>{
  const col=i<6?0:1, row=i<6?i:i-6;
  const x=0.85+col*6.1, y=2.05+row*0.72;
  s.addText(r[0], { x, y, w:0.5, h:0.4, fontFace:SERIF, fontSize:15, bold:true, color:ROSE, align:'right', isTextBox:true, margin:0 });
  s.addText(r[1], { x:x+0.75, y, w:5.0, h:0.5, fontFace:SANS, fontSize:12.5, color:INK, isTextBox:true, margin:0 });
  hr(s, y+0.6, x, 5.6);
});

/* 16 各回② */
s=P.addSlide(); T(s,'各回の内容　ファッション心理学 × コーチング','全7回。内容と回数は変わることがあります。');
const r2=[['1','コーチングの基礎'],['2','目標設定コーチング'],['3','セールスコーチング'],['4','ファッション心理学 一　自分を知る'],['5','ファッション心理学 二　社会との関係'],['6','ファッション心理学 三　他人との関係'],['7','実践者の講演会']];
r2.forEach((r,i)=>{
  const y=2.1+i*0.66;
  s.addText(r[0], { x:0.85, y, w:0.5, h:0.4, fontFace:SERIF, fontSize:16, bold:true, color:ROSE, align:'right', isTextBox:true, margin:0 });
  s.addText(r[1], { x:1.65, y, w:8.0, h:0.45, fontFace:SANS, fontSize:14, color:INK, isTextBox:true, margin:0 });
  hr(s, y+0.55, 0.85, 8.7);
});
s.addText('ご相談し放題\nZOOM／LINEチャット\nお電話', { x:9.8, y:2.6, w:2.7, h:1.0, fontFace:SANS, fontSize:13, bold:true, color:BERRY, lineSpacing:24, isTextBox:true, margin:0 });

/* 17 なぜ6ヶ月 */
s=P.addSlide(); T(s,'なぜ、6ヶ月なのか','2026年9月に、実際にやってみて分かったことです。');
box(s,0.85,2.15,5.6,2.7);
s.addText('3ヶ月で　できた', { x:1.2, y:2.5, w:5.0, h:0.6, fontFace:SERIF, fontSize:26, bold:true, color:BERRY, isTextBox:true, margin:0 });
body(s,1.2,3.3,5.0,'ご自分の商品\nAIで作ったリール 1本\nファッション心理学の一部／コーチング',14,INK,26);
box(s,6.95,2.15,5.6,2.7);
s.addText('3ヶ月では　できない', { x:7.3, y:2.5, w:5.0, h:0.6, fontFace:SERIF, fontSize:26, bold:true, color:ROSE, isTextBox:true, margin:0 });
body(s,7.3,3.3,5.0,'販売の動線\n申し込みから決済までの自動化\nコーチングセールス',14,MUTE,26);
s.addText('3ヶ月で、売るものは決まります。けれど、売る道は、まだできません。', { x:0.85, y:5.25, w:11.7, h:0.6, fontFace:SERIF, fontSize:24, bold:true, color:INK, align:'center', isTextBox:true, margin:0 });
s.addText('推測ではなく、やってみて出た答えです。', { x:0.85, y:6.0, w:11.7, h:0.5, fontFace:SANS, fontSize:14, color:MUTE, align:'center', isTextBox:true, margin:0 });
s.addNotes('ここがこの説明会でいちばん強い場所。実測の話として話す。');

/* 18 対面と特典 */
s=P.addSlide(); T(s,'対面は「ワークショップ」です','話を聞く日ではありません。手を動かして、作る日です。');
s.addText('10:00 - 15:00', { x:0.85, y:2.1, w:5.5, h:0.75, fontFace:SERIF, fontSize:34, bold:true, color:BERRY, isTextBox:true, margin:0 });
s.addText('＝ 5時間。オンライン3回分を超えます。会場は東京です。', { x:0.85, y:2.9, w:5.5, h:0.4, fontFace:SANS, fontSize:14, color:MUTE, isTextBox:true, margin:0 });
body(s,0.85,3.4,5.5,'ご案内のページ、申し込みのフォーム、決済まで。\nAIとUTAGEを使って、その場で一緒に作ります。\n\n対面の日は、コースごとに分けません。\nひとりでやると、たいてい途中で止まります。',14,INK,26);
s.addShape(P.ShapeType.line,{x:6.7,y:2.1,w:0,h:3.6,line:{color:RULE,width:1}});
s.addText('今回ご参加の方への特典', { x:7.2, y:2.1, w:5.3, h:0.5, fontFace:SERIF, fontSize:22, bold:true, color:BERRY, isTextBox:true, margin:0 });
s.addText('一緒にインスタライブ／アカウント共有でご紹介', { x:7.2, y:2.75, w:5.3, h:0.45, fontFace:SANS, fontSize:15, bold:true, color:INK, isTextBox:true, margin:0 });
s.addText('アメブロ 2,600名／インスタ 8,500名程度にお届けします。', { x:7.2, y:3.2, w:5.3, h:0.4, fontFace:SANS, fontSize:12, color:MUTE, isTextBox:true, margin:0 });
hr(s, 3.8, 7.2, 5.3);
s.addText('こちらは、はじめから全コースに入っています', { x:7.2, y:3.95, w:5.3, h:0.4, fontFace:SANS, fontSize:13, bold:true, color:ROSE, isTextBox:true, margin:0 });
body(s,7.2,4.4,5.3,'質問し放題（48時間以内）／動画講座の会員サイト見放題\nアーカイブ視聴可／セルフコーチング\n勉強会へご招待\n動画撮影会 1回（丸の内・2時間。撮影は卒業生がお手伝いします）',11.5,MUTE,20);

s.addText('「1回しかない」ではなく「1日で作りきる」日です。', { x:0.85, y:5.9, w:11.7, h:0.5, fontFace:SANS, fontSize:15, color:MUTE, isTextBox:true, margin:0 });

/* 19 持って帰るもの */
s=P.addSlide(); T(s,'持って帰っていただくもの','この講座は、成果ではなく成果物をお渡しします。');
const it=[['自分の強みを、1枚にまとめた紙','全コース'],['書き直した、プロフィール文','全コース'],['ご自分で作ったリール 6本','全コース'],['AIで投稿文を書く、プロンプトの型','全コース'],['撮影会で撮った、ご自分の動画','全コース'],['ご自分の商品','二・三'],['実際に動く申し込みの動線','三']];
it.forEach((v,i)=>{
  const col=i%2, row=Math.floor(i/2);
  const x=0.85+col*6.1, y=2.15+row*1.0;
  s.addText(v[0], { x, y, w:4.6, h:0.45, fontFace:SANS, fontSize:15, color:INK, isTextBox:true, margin:0 });
  s.addText(v[1], { x:x+4.6, y:y+0.03, w:1.0, h:0.4, fontFace:SANS, fontSize:11, bold:true, color:ROSE, align:'right', isTextBox:true, margin:0 });
  hr(s, y+0.6, x, 5.6);
});
s.addText('ご家族の介護やお仕事があっても、できたか・できていないかだけで見られる形にしています。', { x:0.85, y:6.4, w:11.7, h:0.5, fontFace:SANS, fontSize:14, color:MUTE, isTextBox:true, margin:0 });

/* 20 相場 */
s=P.addSlide(); T(s,'一般的な価格の相場','ご参考までに。同じような講座の、いまの相場です。');
const sou=[['動画のみのインスタマーケティング（4ヶ月）','45万円'],['サポート付きインスタマーケティング（6ヶ月）','66万円'],['サポート付きVIPインスタマーケティング（6ヶ月）','100万円'],['コーチング講座（資格なし）','40万円'],['ファッション心理学講座（サポートなし）','50万円'],['オリジナルデザイン物販講座（導入編）','45万円'],['AI込みの講座','100万円超え']];
sou.forEach((v,i)=>{
  const y=2.1+i*0.66;
  s.addText(v[0], { x:0.85, y, w:8.4, h:0.45, fontFace:SANS, fontSize:14, color:INK, isTextBox:true, margin:0 });
  s.addText(v[1], { x:9.4, y, w:3.1, h:0.45, fontFace:SANS, fontSize:14, bold:true, color:MUTE, align:'right', isTextBox:true, margin:0 });
  hr(s, y+0.55);
});
s.addText('比べていただくためのものです。「だから安い」と申し上げるつもりはありません。', { x:0.85, y:6.8, w:11.7, h:0.45, fontFace:SANS, fontSize:13, color:FAINT, isTextBox:true, margin:0 });

/* 21 受講料 */
s=P.addSlide(); T(s,'受講料',null);
const pr=[['一','はじめてのAI発信インスタ講座','3ヶ月・9時間','100,000円'],
          ['二','ファッション心理学AI活用　商品づくり講座','3ヶ月・14時間','330,000円'],
          ['三','ファッション起業AI活用　マスター講座','6ヶ月・28時間','550,000円']];
pr.forEach((p,i)=>{
  const y=2.0+i*1.25;
  s.addText(p[0], { x:0.85, y:y+0.1, w:0.6, h:0.5, fontFace:SERIF, fontSize:24, bold:true, color:ROSE, isTextBox:true, margin:0 });
  s.addText(p[1], { x:1.6, y:y, w:6.6, h:0.45, fontFace:SANS, fontSize:16, bold:true, color:INK, isTextBox:true, margin:0 });
  s.addText(p[2], { x:1.62, y:y+0.45, w:6.6, h:0.35, fontFace:SANS, fontSize:12, color:MUTE, isTextBox:true, margin:0 });
  s.addText(p[3], { x:8.6, y:y+0.05, w:3.9, h:0.6, fontFace:SERIF, fontSize:26, bold:true, color:BERRY, align:'right', isTextBox:true, margin:0 });
  hr(s, y+0.95);
});
body(s,0.85,6.0,11.7,'お支払いは一括（クレジットカード／銀行振込）。分割のご相談にも応じます。\n銀行振込のお支払い期限は、お申し込みから7日以内です。',14,MUTE,24);

/* 22 向いていない方 */
s=P.addSlide(); T(s,'先に、正直にお伝えします',null);
s.addText('向いていない方', { x:0.85, y:2.0, w:5.5, h:0.5, fontFace:SERIF, fontSize:22, bold:true, color:BERRY, isTextBox:true, margin:0 });
body(s,0.85,2.65,5.5,'今すぐ収入にしたい方\n言われたとおりにやりたい方',15,INK,30);
s.addText('自分の言葉を探す講座です。当てはまる方は、見送ってください。', { x:0.85, y:3.75, w:5.5, h:0.6, fontFace:SANS, fontSize:13, color:MUTE, isTextBox:true, margin:0 });
s.addShape(P.ShapeType.line,{x:6.7,y:2.0,w:0,h:2.4,line:{color:RULE,width:1}});
s.addText('お約束しないこと', { x:7.2, y:2.0, w:5.3, h:0.5, fontFace:SERIF, fontSize:22, bold:true, color:ROSE, isTextBox:true, margin:0 });
body(s,7.2,2.65,5.3,'フォロワーが増えること\n売上が出ること\nお仕事になること',15,INK,30);
hr(s, 4.75);
body(s,0.85,4.95,11.7,'何をどう進めるかは、おひとりずつ違います。手順と考え方をお伝えし、続けられる形にするところまでを一緒にやります。',15,INK);
body(s,0.85,5.75,11.7,'出られない回があっても大丈夫です。すべて録画してアーカイブに残します。動画講座の会員サイトも見放題です。',14,MUTE);

/* 23 締め */
s=P.addSlide();
s.addImage({ data:MY('05_水玉の柱_全身_黒_白い帽子.jpg'), x:8.9, y:0, w:4.4, h:7.5, sizing:{type:'cover',w:4.4,h:7.5} });
s.addText('今日、決めなくて大丈夫です。', { x:0.9, y:2.4, w:7.4, h:0.9, fontFace:SERIF, fontSize:38, bold:true, color:BERRY, isTextBox:true, margin:0 });
hr(s, 3.6, 0.9, 7.4);
body(s,0.9,3.85,7.4,'合わないと思われたら、見送ってくださってかまいません。\nご質問はいつでも。48時間以内にお返事します。\n\nお申し込みの締切は 10月14日（水）です。',16,INK,30);
s.addText('ファッション起業アカデミア　松岡依里子', { x:0.9, y:6.4, w:7.4, h:0.4, fontFace:SANS, fontSize:12, color:FAINT, isTextBox:true, margin:0 });
s.addNotes('ここで売り込まない。「今日決めなくていい」と必ず口に出す。');

P.writeFile({ fileName:'/tmp/deck/説明会_3コース_2026年10月期_v2.pptx' }).then(f=>console.log('書けました:',f));
