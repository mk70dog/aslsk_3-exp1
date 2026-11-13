/* v1197候補(ダルマ指示「車両が使用できる煙幕を早見表に専用タブ」): 車両の煙幕 早見表(SK4 1.2.5・6.2・7.5) */
function refSmkP(n){var c=0;for(var a=1;a<=6;a++)for(var b=1;b<=6;b++)if(a+b<=n)c++;return Math.round(c/36*100);}
function refSmkWhen(f){if(!f)return '';var m=String(f).match(/^(\d{4})(?:-(\d{2}))?$/);if(!m)return f;return m[2]?m[1]+'年'+(+m[2])+'月以降':m[1]+'年以降';}
function refSmkNum(o){if(o.depleteByYear){var k=Object.keys(o.depleteByYear);return k.map(function(y){return o.depleteByYear[y]+'<span style="color:#8899aa;font-size:10px">('+y+')</span>';}).join('/');}return o.deplete;}
function REF_SMOKE_CARD(){
  var h='',C='#ffd24a',G='#8899aa',TD='padding:5px 6px;border-bottom:1px solid #2a3240;vertical-align:top;text-align:left;line-height:1.45',TH='padding:5px 6px;color:#4499ee;text-align:left;border-bottom:1px solid #4a5566;white-space:nowrap';
  var tag=function(t,c){return '<span style="display:inline-block;padding:1px 7px;border-radius:9px;background:#1b222c;border:1px solid '+(c||'#4a5566')+';color:'+(c||'#cfe3f5')+';font-weight:700;font-size:12px;white-space:nowrap">'+t+'</span>';};
  // ① 種類の一覧
  h+='<div class="card"><div class="sh">'+T('車両の煙幕 早見表')+' <span style="color:'+G+';font-size:11px;font-weight:400">SK4 1.2.5・6.2・7.5</span></div>';
  h+='<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:12px">';
  h+='<tr><th style="'+TH+'">種類</th><th style="'+TH+'">裏面の表記</th><th style="'+TH+'">使える時</th><th style="'+TH+'">置く場所・射程</th><th style="'+TH+'">置く煙幕</th><th style="'+TH+'">条件・DRM</th></tr>';
  var R=[
    [tag('s','#e8eef4')+'<br>主砲・砲の煙幕弾','s<b>8</b> = 欠乏No.','PFPh開始時・DFPh開始時(ATTで命中が必要)','主砲・砲で撃てるヘクス','PFPh: <b>+3</b> 通常<br>DFPh: <b>+2</b> 分散','原TH DR ≤ 欠乏No.で使える(超えたら弾が無く、撃っていない扱い)。そのフェイズに煙幕以外を撃った後は煙幕を撃てない'],
    [tag('WP','#e8eef4')+'<br>主砲・砲の白燐弾','WP<b>7</b> = 欠乏No.','PFPh開始時・DFPh開始時・防御射撃(ATT)','主砲・砲で撃てるヘクス','PFPh: <b>+2</b> 通常<br>MPh・DFPh: <b>+1</b> 分散','命中したユニットはNMC(DRからTEMを引く)。ほかは煙幕弾と同じ'],
    [tag('sD',C)+'<br>発煙弾発射機','sD<b>7</b> = 使用No.','MPh(下の共通ルール)','自分のヘクス','<b>+2</b> 分散','BU +1'],
    [tag('sM',C)+'<br>発煙迫撃砲','sM<b>8</b> = 使用No.','MPh(下の共通ルール)','1〜3ヘクス・LOS内・TCA内','<b>+2</b> 分散','BU +1、移動中/停止していない +2、TCAを変えたら射撃と同じDRM、間の妨害DRMも加える、建物の中からは不可'],
    [tag('sP',C)+'<br>発煙ポット','sP<b>#</b> = 使用No.','MPh(下の共通ルール)','自分のヘクス','<b>+2</b> 分散','CEの時だけ使える'],
    [tag('sN',C)+'<br>近接防御兵器','sN<b>9</b> = 使用No.','MPh(下の共通ルール)','自分のヘクス','<b>+2</b> 分散','BUの時だけ使える(BU +1 も加わる)。CCPhでは攻撃にも使える(その時は煙幕を置かない)']
  ];
  R.forEach(function(r){h+='<tr>'+r.map(function(c,i){return '<td style="'+TD+(i===0?';white-space:nowrap;text-align:center':'')+'">'+c+'</td>';}).join('')+'</tr>';});
  h+='</table></div></div>';
  // ② 煙幕装置(sD/sM/sP/sN)の共通ルール と ③ 煙幕カウンターの効果
  h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
  h+='<div class="card" style="margin:0"><div class="sh">'+T('煙幕装置の共通ルール')+' <span style="color:'+G+';font-size:11px;font-weight:400">sD・sM・sP・sN(7.5)</span></div><div style="font-size:12px;line-height:1.6;padding:2px 4px">'+
    '・<b>1プレイヤーターンに1回</b>、MPh中だけ<br>'+
    '・乗員が気絶・ショックでなく、そのプレイヤーターンにまだ<b>武器を撃っていない</b>(BFF・DFF含む)<br>'+
    '・自軍のMPh: <b>1MP</b> 使う(失敗したらMPは使わない)<br>'+
    '・相手のMPh: LOS内の敵がMP/MFを使った後に、防御射撃と同じように使える<br>'+
    '・判定: <b>最終DR ≤ 使用No.</b> で成功。失敗しても次のプレイヤーターンにまた試せる<br>'+
    '・使っても武器の使用ではない(使った後も撃てる)。動けない車両でも使える</div></div>';
  h+='<div class="card" style="margin:0"><div class="sh">'+T('煙幕カウンターの効果')+' <span style="color:'+G+';font-size:11px;font-weight:400">1.2.5</span></div><table style="width:100%;border-collapse:collapse;font-size:12px">'+
    [['通常の煙幕(5/8インチ)','+3'],['分散した煙幕・1/2インチ煙幕・通常のWP','+2'],['分散したWP','+1'],['1ヘクスの上限','+3まで'],['煙幕のヘクスから外へ撃つ','さらに +1'],['煙幕のヘクスに入る(MPh/RtPh)','+1 MF/MP(出る時は不要)']].map(function(r){return '<tr><td style="'+TD+'">'+r[0]+'</td><td style="'+TD+';color:'+C+';font-weight:700;white-space:nowrap">'+r[1]+'</td></tr>';}).join('')+
    '<tr><td colspan="2" style="'+TD+';color:'+G+'">置いた側の次のPFPh開始時: 分散は取り除き、通常は分散面にする</td></tr></table></div>';
  h+='</div>';
  // ④ 車両別一覧(AFV_DATA から)
  h+='<div class="card"><div class="sh">'+T('車両別の煙幕')+' <span style="color:'+G+';font-size:11px;font-weight:400">成功率は2D6で使用No.以下(CE/BU)</span></div><div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:12px">';
  h+='<tr><th style="'+TH+'">国</th><th style="'+TH+'">車両</th><th style="'+TH+'">煙幕装置</th><th style="'+TH+'">成功率 CE/BU</th><th style="'+TH+'">主砲 s#</th><th style="'+TH+'">主砲 WP#</th><th style="'+TH+'">注意</th></tr>';
  var NAT={GER:'独',SOV:'ソ',USA:'米','USA/FFR':'米/仏',GBR:'英',ITA:'伊',SLO:'スロ'};
  var OD=['GER','SOV','USA','USA/FFR','GBR','ITA','SLO'];(typeof AFV_DATA!=='undefined'?AFV_DATA:[]).slice().sort(function(a,b){var x=OD.indexOf(a.nat),y=OD.indexOf(b.nat);return (x<0?99:x)-(y<0?99:y);}).forEach(function(v){
    var sm=v.smoke,sa=(v.ma&&v.ma.specialAmmo||[]).filter(function(a){return a.type==='Smoke'||a.type==='WP';});
    if(!sm&&!sa.length)return;
    var ops=sm?(sm.options||[sm]):[],dev='—',pr='—',nt=[];
    if(ops.length){dev=ops.map(function(o){return tag(o.type+refSmkNum(o),C);}).join(' ');
      pr=ops.map(function(o){var n=o.deplete!=null?o.deplete:o.depleteByYear[Object.keys(o.depleteByYear)[0]];var bu=refSmkP(n-1);return o.type==='sP'?refSmkP(n)+'%/—':(o.type==='sN'?'—/'+bu+'%':refSmkP(n)+'%/'+bu+'%');}).join('<br>');
      if(sm.availFrom)nt.push('装置は'+refSmkWhen(sm.availFrom));if(sm.note)nt.push(String(sm.note).replace(/\(.*$/,''));if(sm.options)nt.push('どちらか一方を宣言して使う');}
    var am=function(t){var a=sa.filter(function(x){return x.type===t;})[0];if(!a)return '—';return '<b>'+a.deplete+'</b>'+(a.availFrom?'<span style="color:'+G+';font-size:10px"> '+refSmkWhen(a.availFrom)+'</span>':'');};
    h+='<tr><td style="'+TD+'">'+(NAT[v.nat]||v.nat)+'</td><td style="'+TD+';white-space:nowrap">'+v.lbl+'</td><td style="'+TD+'">'+dev+'</td><td style="'+TD+';white-space:nowrap">'+pr+'</td><td style="'+TD+'">'+am('Smoke')+'</td><td style="'+TD+'">'+am('WP')+'</td><td style="'+TD+';color:'+G+'">'+nt.join('・')+'</td></tr>';
  });
  h+='</table></div></div>';
  // ⑤ 砲別一覧(GUN_DATA から)
  var CAT={AT:'対戦車砲',INF:'歩兵砲',ART:'野砲',AA:'対空砲',MTR:'迫撃砲'};
  var dep=function(a){if(!a)return '—';var d=a.deplete;if(d&&typeof d==='object'){var y=Object.keys(d);return '<b>'+d[y[0]]+'</b><span style="color:'+G+';font-size:10px"> '+y[0]+'年以降</span>';}return '<b>'+d+'</b>';};
  h+='<div class="card"><div class="sh">'+T('砲別の煙幕')+' <span style="color:'+G+';font-size:11px;font-weight:400">s#・WP#=欠乏No.(原TH DR がこれ以下なら使える)。ATTで命中が必要</span></div><div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:12px">';
  h+='<tr><th style="'+TH+'">国</th><th style="'+TH+'">砲</th><th style="'+TH+'">種類</th><th style="'+TH+'">s#</th><th style="'+TH+'">WP#</th><th style="'+TH+'">注意</th></tr>';
  var GOD=['GER','SOV','USA','USA/FFR','USA/GBR/FFR','GBR','ITA/GBR','ITA','SLO','POL'];
  (typeof GUN_DATA!=='undefined'?GUN_DATA:[]).slice().sort(function(a,b){var x=GOD.indexOf(a.nat),y=GOD.indexOf(b.nat);return (x<0?99:x)-(y<0?99:y);}).forEach(function(g){
    var A=g.ammo||[],sm=A.filter(function(a){return /^smoke$/i.test(a.type);})[0],wp=A.filter(function(a){return a.type==='WP';})[0];
    if(!sm&&!wp)return;
    var nt=[];if(g.gunCategory==='MTR')nt.push('迫撃砲はいつもATT');
    h+='<tr><td style="'+TD+'">'+(NAT[g.nat]||g.nat.replace('USA','米').replace('GBR','英').replace('FFR','仏').replace('ITA','伊'))+'</td><td style="'+TD+';white-space:nowrap">'+g.lbl+'</td><td style="'+TD+'">'+(CAT[g.gunCategory]||g.gunCategory||'')+'</td><td style="'+TD+'">'+dep(sm)+'</td><td style="'+TD+'">'+dep(wp)+'</td><td style="'+TD+';color:'+G+'">'+nt.join('・')+'</td></tr>';
  });
  h+='</table></div></div>';
  return h;
}
