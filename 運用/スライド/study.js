const SP='/tmp/claude-0/-home-user-potential-lamp/1a5c0839-14a8-5840-9db3-563ce87c0be0/scratchpad';
const IMG=SP+'/img/';
const pptxgen=require(SP+'/node_modules/pptxgenjs');
const p=new pptxgen(); p.layout='LAYOUT_16x9';
const BERRY='6D2E46', ROSE='A26769', CREAM='ECE2D0', INK='2B2B2B', W='FFFFFF', MUTED='7A6A6E', SOFT='F7F3F1';
const F='Yu Gothic';
const M=0.62, CW=10-M*2;

const bg=(s,c)=>{s.background={color:c};};
const card=(s,x,y,w,h,c)=>s.addShape(p.ShapeType.roundRect,{x,y,w,h,rectRadius:0.08,fill:{color:c||SOFT}});
const T=(s,t,o)=>s.addText(t,Object.assign({fontFace:F,isTextBox:true,margin:0},o));
function title(s,t,col,w){ T(s,t,{x:M,y:0.42,w:w||CW,h:0.75,fontSize:29,bold:true,color:col||BERRY,valign:'middle'}); }
function dot(s,x,y,n,c){ s.addShape(p.ShapeType.ellipse,{x,y,w:0.46,h:0.46,fill:{color:c||BERRY}});
  T(s,String(n),{x,y,w:0.46,h:0.46,fontSize:16,bold:true,color:W,align:'center',valign:'middle'}); }
function photoRight(s,file){ s.addImage({path:IMG+file,x:5.45,y:0,w:4.55,h:5.625,sizing:{type:'cover',w:4.55,h:5.625}}); }
function section(n,t,sub,img){
  const s=p.addSlide(); bg(s,BERRY);
  if(img) photoRight(s,img);
  T(s,n,{x:M,y:1.55,w:1.2,h:0.5,fontSize:15,bold:true,color:ROSE});
  T(s,t,{x:M,y:2.05,w:4.4,h:1.4,fontSize:33,bold:true,color:W,lineSpacing:44});
  if(sub) T(s,sub,{x:M,y:3.6,w:4.4,h:0.8,fontSize:14,color:CREAM,lineSpacing:22});
  return s;
}

/* 1 表紙 */
let s=p.addSlide(); bg(s,BERRY); photoRight(s,'sec_seoul.jpg');
T(s,'海外リサーチ × AIリール',{x:M,y:1.5,w:4.5,h:0.4,fontSize:14,color:ROSE,bold:true});
T(s,'3カ国で見てきたことを、\nAIで発信に変える90分',{x:M,y:1.95,w:4.6,h:1.7,fontSize:29,bold:true,color:W,lineSpacing:42});
T(s,'松岡依里子',{x:M,y:3.8,w:4.5,h:0.4,fontSize:13,color:CREAM});
s.addNotes('カメラはオフのままで結構です、途中退出も可、と最初に伝える。');

/* 2 今日の90分 */
s=p.addSlide(); bg(s,W); title(s,'今日の90分');
[['1','3カ国で見てきたこと','自分の足で見て、何が分かったのか'],
 ['2','それを、どうリールにしたか','AIに渡した3つを、画面でそのまま'],
 ['3','17本の再生数を、全部','伸びなかった本も、数字ごと'],
 ['4','あなたの「3つ」を書き出す','手を動かしていただきます']]
.forEach((r,i)=>{ const y=1.35+i*0.82; card(s,M,y,CW,0.68); dot(s,M+0.16,y+0.11,r[0]);
  T(s,r[1],{x:M+0.78,y,w:4.2,h:0.68,fontSize:15,bold:true,color:BERRY,valign:'middle'});
  T(s,r[2],{x:M+5.0,y,w:3.6,h:0.68,fontSize:12,color:INK,valign:'middle'});});
card(s,M,4.7,CW,0.72,CREAM);
T(s,'最後の5分だけ、10月から始める講座のご案内をします。',{x:M+0.3,y:4.7,w:CW-0.6,h:0.72,fontSize:14,color:BERRY,bold:true,valign:'middle'});

/* 3 自己紹介 */
s=p.addSlide(); bg(s,W);
s.addImage({path:IMG+'me_stand.jpg',x:6.35,y:0.75,w:3.05,h:4.1,sizing:{type:'cover',w:3.05,h:4.1}});
title(s,'松岡依里子',BERRY,5.4);
['ファッション心理学の研究者／大学教授','ファッション起業アカデミア 主宰','長く専業主婦。50歳を過ぎてから\n猛勉強して大学教授に','研究テーマは「服が自信に変わる仕組み」']
.forEach((t,i)=>{ const y=[1.5,2.25,3.0,3.95][i]; dot(s,M,y,i+1); T(s,t,{x:M+0.72,y:y+0.02,w:4.6,h:0.6,fontSize:14,color:INK,lineSpacing:21});});
card(s,M,4.7,5.35,0.6,CREAM);
T(s,'あきらめなければ、いくつからだって夢は叶う',{x:M+0.25,y:4.7,w:4.9,h:0.6,fontSize:14,bold:true,color:BERRY,valign:'middle'});

/* 4 SEC01 */
section('01','3カ国で\n見てきたこと','ソウル・パリ・ニューヨーク\n2026年・実地','sec_shop.jpg');

/* 5 結論 */
s=p.addSlide(); bg(s,W);
s.addImage({path:IMG+'c_ver.jpg',x:6.05,y:1.45,w:3.33,h:1.6,sizing:{type:'cover',w:3.33,h:1.6}});
title(s,'先に結論です',BERRY,5.2);
T(s,'3カ国とも、\n日常のベースは\nむしろ普通でした',{x:M,y:1.45,w:5.3,h:2.3,fontSize:31,bold:true,color:BERRY,lineSpacing:48});
T(s,'ソウル　パリ　ニューヨーク',{x:M,y:4.0,w:5.3,h:0.4,fontSize:13,color:MUTED});
card(s,6.05,3.25,3.33,1.6);
T(s,'毎日フル装備の方は、\n見かけませんでした。\n\n思っていたのとは、\n違いました。',{x:6.3,y:3.4,w:2.9,h:1.35,fontSize:13,color:INK,lineSpacing:21});

/* 6 三者三様 */
s=p.addSlide(); bg(s,W); title(s,'やり方は、三者三様でした');
[['ソウル','試行回数','安く、たくさん試して、違ったら次へ。流行を追うのではなく、つくっていました。','c_seoul.jpg'],
 ['パリ','一点突破','服そのものはオーソドックス。小物で、一点だけ効かせていました。','c_paris.jpg'],
 ['ニューヨーク','スイッチ','昼はスニーカー、夜はドレス。時間帯で切り替えていました。','c_ny.jpg']]
.forEach((c,i)=>{ const x=M+i*3.02; card(s,x,1.35,2.82,3.15);
  s.addImage({path:IMG+c[3],x:x,y:1.35,w:2.82,h:1.25,sizing:{type:'cover',w:2.82,h:1.25}});
  T(s,c[0],{x:x+0.22,y:2.7,w:2.4,h:0.32,fontSize:17,bold:true,color:BERRY});
  T(s,c[1],{x:x+0.22,y:3.05,w:2.4,h:0.3,fontSize:13,bold:true,color:ROSE});
  T(s,c[2],{x:x+0.22,y:3.42,w:2.42,h:1.0,fontSize:12,color:INK,lineSpacing:18});});
T(s,'けれど「自分で決めている」という一点だけは、どこも同じでした。',
 {x:M,y:4.75,w:CW,h:0.4,fontSize:15,bold:true,color:BERRY});

/* 7 売り場の言葉 */
s=p.addSlide(); bg(s,W); title(s,'売り場の言葉が、違いました');
s.addImage({path:IMG+'c_seoul.jpg',x:M,y:1.35,w:4.28,h:1.5,sizing:{type:'cover',w:4.28,h:1.5}});
T(s,'ソウルで見た売り場',{x:M,y:2.92,w:4.28,h:0.3,fontSize:11,color:MUTED});
card(s,M,3.25,4.28,1.5,SOFT);
T(s,'ソウルの売り場',{x:M+0.25,y:3.4,w:3.7,h:0.3,fontSize:14,bold:true,color:BERRY});
T(s,'「あなたであれ、自信を持って」\n「他人の目から自由に、着たい服を」',{x:M+0.25,y:3.78,w:3.85,h:0.9,fontSize:13,color:INK,lineSpacing:21});
card(s,5.1,1.35,4.28,3.4,CREAM);
T(s,'日本の売り場',{x:5.35,y:1.65,w:3.7,h:0.3,fontSize:14,bold:true,color:BERRY});
T(s,'「失敗しない選び方」',{x:5.35,y:2.15,w:3.85,h:0.5,fontSize:20,bold:true,color:BERRY});
T(s,'同じ言葉を見た覚えがありません。\n\nその社会が何を怖がっているかが、\n売り場の言葉に出ます。',{x:5.35,y:2.85,w:3.85,h:1.6,fontSize:13,color:INK,lineSpacing:22});
T(s,'どちらが正しいかではありません。',{x:M,y:4.95,w:CW,h:0.35,fontSize:13,color:MUTED});

/* 8 着地 */
s=p.addSlide(); bg(s,BERRY);
T(s,'「似合う」が分からなくなるのは',{x:M,y:1.35,w:CW,h:0.5,fontSize:17,color:CREAM});
T(s,'決める基準を、\n自分の外側に置いたときです',{x:M,y:1.9,w:CW,h:1.3,fontSize:27,bold:true,color:W,lineSpacing:42});
T(s,'私が、わたしのスタイリストになる',{x:M,y:3.5,w:CW,h:0.7,fontSize:29,bold:true,color:ROSE});
s.addNotes('可能自己（Markus & Nurius, 1986）。試着は「なりうる自分」の試着。');

/* 9 SEC02 */
section('02','それを、\nどうリールにしたか','画面をお見せしながら、\n全部公開します','sec_seoul.jpg');

/* 10 図解：AIに渡した3つ */
s=p.addSlide(); bg(s,W); title(s,'私がAIに渡したのは、3つだけです');
['使えそうな写真か動画','誰に来てほしいか','何を届けているか'].forEach((t,i)=>{
  const y=1.45+i*0.82; card(s,M,y,3.9,0.68); dot(s,M+0.16,y+0.11,i+1);
  T(s,t,{x:M+0.78,y,w:3.0,h:0.68,fontSize:14,color:INK,valign:'middle'});});
s.addShape(p.ShapeType.rightArrow,{x:4.75,y:2.25,w:0.75,h:0.5,fill:{color:ROSE}});
card(s,5.75,1.45,3.63,2.05,CREAM);
T(s,'リール1本',{x:5.95,y:1.7,w:3.2,h:0.5,fontSize:22,bold:true,color:BERRY});
T(s,'シナリオ・テロップ・キャプション\nまで、AIと一緒に組み立てます',{x:5.95,y:2.3,w:3.2,h:1.0,fontSize:13,color:INK,lineSpacing:20});
card(s,M,4.05,CW,0.95,SOFT);
T(s,'プロンプトのテクニックは、ひとつも使っていません。',{x:M+0.3,y:4.05,w:CW-0.6,h:0.95,fontSize:16,bold:true,color:BERRY,valign:'middle'});

/* 11 数字 */
s=p.addSlide(); bg(s,W); title(s,'17本の結果を、全部お見せします');
[['17本','7/22 - 8/29'],['66万回','合計再生数'],['3本','10万回超え']].forEach((r,i)=>{
  const x=M+i*3.02; card(s,x,1.45,2.82,1.45);
  T(s,r[0],{x:x+0.2,y:1.6,w:2.4,h:0.72,fontSize:36,bold:true,color:BERRY});
  T(s,r[1],{x:x+0.22,y:2.38,w:2.4,h:0.32,fontSize:12,color:MUTED});});
card(s,M,3.15,CW,1.75,SOFT);
T(s,'いちばん伸びた1本　172,000回　「旅行にパンツを持っていくの、やめました」\nいちばん伸びなかった1本　2,122回　「6月に、ソウルを訪ねました」',
 {x:M+0.3,y:3.45,w:CW-0.6,h:1.1,fontSize:14,color:INK,lineSpacing:30});

/* 12 差 */
s=p.addSlide(); bg(s,W); title(s,'差は、表紙の一行にありました');
card(s,M,1.4,4.28,2.9,SOFT);
T(s,'伸びない',{x:M+0.28,y:1.6,w:3.7,h:0.32,fontSize:14,bold:true,color:MUTED});
T(s,'報告型\n\n「6月に、ソウルを訪ねました」\n「一宮の、尾州に行きました」',{x:M+0.28,y:2.05,w:3.85,h:1.9,fontSize:13,color:INK,lineSpacing:22});
card(s,5.1,1.4,4.28,2.9,CREAM);
T(s,'伸びる',{x:5.34,y:1.6,w:3.7,h:0.32,fontSize:14,bold:true,color:BERRY});
T(s,'読み手の予想を打ち消す\n\n「旅行にパンツを持っていくの、やめました」\n「この暑いのに、なぜ黒を着るのですか」',{x:5.34,y:2.05,w:3.9,h:1.9,fontSize:13,color:INK,lineSpacing:22});
T(s,'素材は、みなさんの人生の中にあります。AIは、それを形にしているだけです。',
 {x:M,y:4.55,w:CW,h:0.4,fontSize:15,bold:true,color:BERRY});

/* 13 ワーク */
s=p.addSlide(); bg(s,CREAM); title(s,'書き出してみてください');
['使えそうな写真か動画','誰に来てほしいか','何を届けているか'].forEach((t,i)=>{
  const y=1.5+i*0.78; dot(s,M,y,i+1); T(s,t,{x:M+0.75,y:y+0.05,w:CW-0.9,h:0.4,fontSize:17,color:INK});});
card(s,M,4.0,CW,1.05,W);
T(s,'1つ目はすぐ書けます。止まるのは、2つ目と3つ目です。\nそこが、6ヶ月かけて言葉にしていくところです。',
 {x:M+0.3,y:4.2,w:CW-0.6,h:0.75,fontSize:14,color:BERRY,bold:true,lineSpacing:22});

/* ワークの受け */
s=p.addSlide(); bg(s,W); title(s,'手が止まったところが、入口です');
card(s,M,1.5,CW,1.5,SOFT);
T(s,'1つ目の写真は、すぐ選べます。\n止まるのは、2つ目と3つ目です。',{x:M+0.35,y:1.5,w:CW-0.7,h:1.5,fontSize:17,bold:true,color:BERRY,valign:'middle',lineSpacing:30});
T(s,'「誰に来てほしいか」と「何を届けているか」。\nこの2つは、ひとりで考えても、なかなか言葉になりません。\n\nここを言葉にできると、投稿は変わります。AIはそのあとの話です。',
 {x:M,y:3.25,w:CW,h:1.6,fontSize:15,color:INK,lineSpacing:28});

/* 最後の5分 */
s=p.addSlide(); bg(s,BERRY);
T(s,'最後に、5分だけ',{x:M,y:1.2,w:CW,h:0.5,fontSize:16,color:ROSE,bold:true});
T(s,'10月から、6ヶ月の講座を始めます',{x:M,y:1.7,w:CW,h:0.8,fontSize:28,bold:true,color:W});
T(s,'ファッション心理学／AIを使った発信の動線設計／コーチングの基礎。\n今日お話しした手順を、6ヶ月かけて自分のものにする場です。',
 {x:M,y:2.6,w:CW,h:1.0,fontSize:15,color:CREAM,lineSpacing:26});
card(s,M,3.75,4.28,1.25,'FFFFFF');
T(s,'講座説明会',{x:M+0.28,y:3.9,w:3.7,h:0.3,fontSize:13,bold:true,color:ROSE});
T(s,'9月16日（水）21:00\n受講料もその場で全部お伝えします',{x:M+0.28,y:4.22,w:3.8,h:0.7,fontSize:13,color:INK,lineSpacing:20});
card(s,5.1,3.75,4.28,1.25,'FFFFFF');
T(s,'個別相談',{x:5.38,y:3.9,w:3.7,h:0.3,fontSize:13,bold:true,color:ROSE});
T(s,'1対1・無料\n合うかどうかを一緒に見る時間です',{x:5.38,y:4.22,w:3.8,h:0.7,fontSize:13,color:INK,lineSpacing:20});
s.addNotes('チャットに貼るのは【説明会】と【個別相談】のURLだけ。講座の申込ページ（受講料が出る）は貼らないこと。この会では金額に触れない。その場で申し込みを迫らない。「合わなければ見送ってくださって結構です」を必ず口に出す。');

/* 締め */
s=p.addSlide(); bg(s,W);
T(s,'今日の服は、誰が決めましたか。',{x:M,y:2.1,w:CW,h:0.9,fontSize:31,bold:true,color:BERRY});
T(s,'ご参加ありがとうございました。',{x:M,y:3.15,w:CW,h:0.4,fontSize:14,color:MUTED});

p.writeFile({fileName:SP+'/勉強会_202609.pptx'}).then(f=>console.log('written',f));
