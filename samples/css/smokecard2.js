/* sample-smoketab2: 車両・砲の煙幕 早見表(見やすく) SK4 1.2.5・6.2・7.5 */
function refSmkP(n){var c=0;for(var a=1;a<=6;a++)for(var b=1;b<=6;b++)if(a+b<=n)c++;return Math.round(c/36*100);}
function refSmkWhen(f){if(!f)return '';var m=String(f).match(/^(\d{4})(?:-(\d{2}))?$/);if(!m)return f;return m[2]?m[1]+'年'+(+m[2])+'月〜':m[1]+'年〜';}
function REF_SMOKE_CARD(){
  var h='',C='#ffd24a',G='#8899aa',W='#e8eef4';
  var css='<style>.rsk .tg{display:inline-block;padding:2px 9px;border-radius:10px;background:#1b222c;border:1px solid #4a5566;font-weight:800;font-size:13px;white-space:nowrap}'+
   '.rsk .tg.d{color:#ffd24a;border-color:#ffd24a}.rsk .tg.a{color:#9fd8ff;border-color:#5a8fb8}.rsk .tg.w{color:#ffb38a;border-color:#b8705a}'+
   '.rsk .kc{background:#14171d;border-radius:9px;box-shadow:0 3px 0 #0e0e0c,0 4px 2px rgba(0,0,0,.45);padding:9px 10px}'+
   '.rsk .kh{display:flex;align-items:center;gap:8px;margin-bottom:6px}.rsk .kn{font-size:13px;font-weight:700;color:#e8eef4}'+
   '.rsk .kv{display:grid;grid-template-columns:62px 1fr;gap:3px 6px;font-size:12px;line-height:1.45}.rsk .kv>span:nth-child(odd){color:#8899aa}'+
   '.rsk .big{font-size:18px;font-weight:900;color:#ffd24a}'+
   '.rsk table{width:100%;border-collapse:collapse;font-size:13px}.rsk th{color:#4499ee;text-align:left;padding:6px 8px;border-bottom:1px solid #4a5566;font-size:12px;white-space:nowrap}'+
   '.rsk td{padding:6px 8px;vertical-align:middle}.rsk tr.z td{background:rgba(255,255,255,.035)}'+
   '.rsk tr.nat td{background:#1b222c;color:#ffd24a;font-weight:800;font-size:12px;padding:4px 8px;border-top:1px solid #4a5566}'+
   '.rsk .bar{display:inline-block;width:70px;height:8px;border-radius:4px;background:#0b0d11;vertical-align:middle;margin-right:6px;overflow:hidden}.rsk .bar i{display:block;height:100%;border-radius:4px}'+
   '.rsk .pc{display:flex;align-items:center;font-size:12px;white-space:nowrap}.rsk .pc b{width:34px;text-align:right;margin-right:4px}.rsk .pc small{color:#8899aa;width:22px}'+
   '.rsk .num{font-size:15px;font-weight:900}.rsk .wh{color:#8899aa;font-size:11px;margin-left:4px}.rsk .nt{color:#8899aa;font-size:11px}</style>';
  h+=css+'<div class="rsk">';
  // ① 種類カード
  var K=[
    ['s','a','主砲・砲の煙幕弾','PFPh・DFPhの開始時','撃てるヘクス(ATTで命中)','PFPh <span class="big">+3</span> / DFPh <span class="big">+2</span>分散','原TH DR ≤ s# なら弾がある。煙幕以外を撃った後は不可'],
    ['WP','w','主砲・砲の白燐弾','PFPh・DFPhの開始時、防御射撃','撃てるヘクス(ATTで命中)','PFPh <span class="big">+2</span> / MPh・DFPh <span class="big">+1</span>分散','命中したユニットはNMC(DRからTEMを引く)'],
    ['sD','d','発煙弾発射機','MPh','自分のヘクス','<span class="big">+2</span>分散','BU +1'],
    ['sM','d','発煙迫撃砲','MPh','1〜3ヘクス(LOS・TCA内)','<span class="big">+2</span>分散','BU +1・止まっていない +2・TCA変更は射撃と同じDRM・妨害DRM・建物内は不可'],
    ['sP','d','発煙ポット','MPh','自分のヘクス','<span class="big">+2</span>分散','CEの時だけ'],
    ['sN','d','近接防御兵器','MPh','自分のヘクス','<span class="big">+2</span>分散','BUの時だけ(BU +1 込み)。CCPhは攻撃にも使える']
  ];
  h+='<div class="card"><div class="sh">'+T('煙幕の種類')+' <span style="color:'+G+';font-size:11px;font-weight:400">SK4 1.2.5・6.2・7.5</span></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">';
  K.forEach(function(k){h+='<div class="kc"><div class="kh"><span class="tg '+k[1]+'">'+k[0]+'</span><span class="kn">'+k[2]+'</span></div><div class="kv"><span>使える時</span><span>'+k[3]+'</span><span>置く場所</span><span>'+k[4]+'</span><span>置く煙幕</span><span>'+k[5]+'</span><span>条件</span><span>'+k[6]+'</span></div></div>';});
  h+='</div><div style="margin-top:8px;font-size:12px;color:'+G+'"><span class="tg a" style="font-size:11px">s</span> <span class="tg w" style="font-size:11px">WP</span> の数字=欠乏No.(原TH DR がこれ以下なら使える)　<span class="tg d" style="font-size:11px">sD sM sP sN</span> の数字=使用No.(最終DR がこれ以下で成功)</div></div>';
  // ② 共通ルール/効果
  h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
  h+='<div class="card" style="margin:0"><div class="sh">'+T('煙幕装置の共通ルール')+' <span style="color:'+G+';font-size:11px;font-weight:400">sD・sM・sP・sN</span></div><div style="font-size:12.5px;line-height:1.7;padding:2px 4px">'+
    ['<b>1プレイヤーターンに1回</b>、MPh中だけ','乗員が気絶・ショックでなく、まだ<b>武器を撃っていない</b>(BFF・DFF含む)','自軍のMPh: 成功で <b>1MP</b>(失敗はMP不要)','相手のMPh: LOS内の敵がMP/MFを使った後に使える','失敗しても次のプレイヤーターンにまた試せる','使った後も撃てる。動けない車両でも使える'].map(function(x){return '<div>・'+x+'</div>';}).join('')+'</div></div>';
  h+='<div class="card" style="margin:0"><div class="sh">'+T('煙幕カウンターの効果')+'</div><table>'+
    [['通常の煙幕','+3'],['分散した煙幕・1/2インチ煙幕・通常のWP','+2'],['分散したWP','+1'],['1ヘクスの上限','+3'],['煙幕のヘクスから外へ撃つ','さらに+1'],['煙幕のヘクスに入る','+1 MF/MP']].map(function(r,i){return '<tr'+(i%2?' class="z"':'')+'><td>'+r[0]+'</td><td class="num" style="color:'+C+';text-align:right">'+r[1]+'</td></tr>';}).join('')+
    '</table><div class="nt" style="padding:4px 8px">置いた側の次のPFPh開始時: 分散は取り除き、通常は分散面にする</div></div>';
  h+='</div>';
  var NAT={GER:'ドイツ',SOV:'ソ連',USA:'アメリカ','USA/FFR':'アメリカ/自由フランス','USA/GBR/FFR':'アメリカ/イギリス/自由フランス',GBR:'イギリス','ITA/GBR':'イタリア/イギリス',ITA:'イタリア',SLO:'スロバキア',POL:'ポーランド'};
  var OD=['GER','SOV','USA','USA/FFR','USA/GBR/FFR','GBR','ITA/GBR','ITA','SLO','POL'];
  var srt=function(L){return L.slice().sort(function(a,b){var x=OD.indexOf(a.nat),y=OD.indexOf(b.nat);return (x<0?99:x)-(y<0?99:y);});};
  var bar=function(p,lbl){if(p==null)return '<div class="pc"><small>'+lbl+'</small><b style="color:#4a5566">—</b></div>';var c=p>=58?'#4cc38a':(p>=28?'#ffd24a':'#ff8a6a');return '<div class="pc"><small>'+lbl+'</small><b style="color:'+c+'">'+p+'%</b><span class="bar"><i style="width:'+p+'%;background:'+c+'"></i></span></div>';};
  var am=function(a,cls){if(!a)return '<span style="color:#4a5566">—</span>';var d=a.deplete,y=null;if(d&&typeof d==='object'){y=Object.keys(d)[0];d=d[y];}return '<span class="tg '+cls+'">'+(cls==='w'?'WP':'s')+d+'</span>'+(a.availFrom?'<span class="wh">'+refSmkWhen(a.availFrom)+'</span>':(y?'<span class="wh">'+y+'年〜</span>':''));};
  // ③ 車両
  h+='<div class="card"><div class="sh">'+T('車両別の煙幕')+' <span style="color:'+G+';font-size:11px;font-weight:400">成功率=2D6で使用No.以下(BUは+1)</span></div><div style="overflow-x:auto"><table>';
  h+='<tr><th>車両</th><th>煙幕装置</th><th>成功率</th><th>主砲の煙幕弾</th><th>主砲の白燐弾</th><th>注意</th></tr>';
  var pn=null,z=0;
  srt(typeof AFV_DATA!=='undefined'?AFV_DATA:[]).forEach(function(v){
    var sm=v.smoke,sa=(v.ma&&v.ma.specialAmmo||[]);
    var s1=sa.filter(function(a){return a.type==='Smoke';})[0],w1=sa.filter(function(a){return a.type==='WP';})[0];
    if(!sm&&!s1&&!w1)return;
    if(v.nat!==pn){pn=v.nat;z=0;h+='<tr class="nat"><td colspan="6">'+(NAT[v.nat]||v.nat)+'</td></tr>';}
    var ops=sm?(sm.options||[sm]):[],dev='<span style="color:#4a5566">—</span>',pr='',nt=[];
    if(ops.length){dev=ops.map(function(o){var n=o.deplete!=null?o.deplete:null;var t=n!=null?n:Object.keys(o.depleteByYear).map(function(y){return o.depleteByYear[y]+'<span class="wh" style="margin:0">('+y+')</span>';}).join('/');return '<span class="tg d">'+o.type+t+'</span>';}).join(' ');
      pr=ops.map(function(o){var n=o.deplete!=null?o.deplete:o.depleteByYear[Object.keys(o.depleteByYear)[0]];var ce=o.type==='sN'?null:refSmkP(n),bu=o.type==='sP'?null:refSmkP(n-1);return bar(ce,'CE')+bar(bu,'BU');}).join('');
      if(sm.availFrom)nt.push('装置は'+refSmkWhen(sm.availFrom));if(sm.note)nt.push(String(sm.note).replace(/\(.*$/,''));if(sm.options)nt.push('どちらか一方を宣言');
      if(ops.some(function(o){return o.depleteByYear;}))nt.push('成功率は最初の年');}
    h+='<tr'+((z++)%2?' class="z"':'')+'><td style="white-space:nowrap;font-weight:700">'+v.lbl+'</td><td>'+dev+'</td><td>'+pr+'</td><td>'+am(s1,'a')+'</td><td>'+am(w1,'w')+'</td><td class="nt">'+nt.join('・')+'</td></tr>';
  });
  h+='</table></div></div>';
  // ④ 砲
  var CAT={AT:'対戦車砲',INF:'歩兵砲',ART:'野砲',AA:'対空砲',MTR:'迫撃砲'};
  h+='<div class="card"><div class="sh">'+T('砲別の煙幕')+' <span style="color:'+G+';font-size:11px;font-weight:400">ATTで命中が必要(迫撃砲はいつもATT)</span></div><div style="overflow-x:auto"><table>';
  h+='<tr><th>砲</th><th>種類</th><th>煙幕弾</th><th>白燐弾</th></tr>';pn=null;
  srt(typeof GUN_DATA!=='undefined'?GUN_DATA:[]).forEach(function(g){
    var A=g.ammo||[],sm=A.filter(function(a){return /^smoke$/i.test(a.type);})[0],wp=A.filter(function(a){return a.type==='WP';})[0];
    if(!sm&&!wp)return;
    if(g.nat!==pn){pn=g.nat;z=0;h+='<tr class="nat"><td colspan="4">'+(NAT[g.nat]||g.nat)+'</td></tr>';}
    h+='<tr'+((z++)%2?' class="z"':'')+'><td style="white-space:nowrap;font-weight:700">'+g.lbl+'</td><td class="nt" style="font-size:12px">'+(CAT[g.gunCategory]||'')+'</td><td>'+am(sm,'a')+'</td><td>'+am(wp,'w')+'</td></tr>';
  });
  h+='</table></div></div></div>';
  return h;
}
