const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820},deviceScaleFactor:2});const E=[];p.on('pageerror',x=>E.push(String(x)));
await p.goto('file://'+__dirname+'/../index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1000);
const r=await p.evaluate(async()=>{const W=ms=>new Promise(r=>setTimeout(r,ms));S.scen=S.scen||{};S.scen.sel='S24';for(var i=0;i<4;i++){try{Draw();}catch(e){}await W(1500);}await btEnsureGraph();var N=BTG.nodes,id=nm=>N.findIndex(n=>n.nm===nm);var o=[];
try{try{nmModeSet('judge');}catch(e){}await W(1500);var A=N[id('tK6')],B=N[id('tN6')];S_LOS.pxA={x:A.x,y:A.y};S_LOS.pxB={x:B.x,y:B.y};LosRunPixel();await W(4000);nmIjOpen();await W(800);nmIjSet('ph','dff');await W(300);nmIjSet('place',0);await W(500);nmIjBTerr();await W(2500);
var h=document.getElementById('ijRes');if(!h)return ['nohost'];
var sg=function(a,on){return '<div class="ijSg sm">'+a.map(function(t,i){return '<button class="ijB'+(i===on?' on':'')+'"><b>'+t+'</b></button>';}).join('')+'</div>';};
var row=function(l,c){return '<div class="ijRow" style="margin-top:6px;align-items:center"><span class="ijFl" style="color:#9fb2c8;min-width:64px;margin:0 6px 0 0">'+l+'</span>'+c+'</div>';};
h.innerHTML='<div class="ijS">⑤ 修正 <span>自動のままでOK</span></div>'
+row('地形のTEM',sg(['自動(0)','-1','0','+1','+2','+3'],0))+row('妨害',sg(['自動(+2)','0','+1','+2','+3','+4','+5'],0))
+'<div class="ijNote">方向が未設定のため、目標の方を向いているとして計算</div>'
+'<div class="ijS">結果の見込み</div><div class="ijRow"><div class="ijB on ijSum" style="flex:1"><b>FP 0 → 1列 ・ DRM +2</b><small>内訳: 妨害+2</small></div></div>'
+'<div class="ijS">⑥ ダイス <span>入力しなければ自動で振る</span></div>'
+row('<b style="color:#ff6b6b">赤</b>',sg(['1','2','3','4','5','6'],-1))+row('<b>白</b>',sg(['1','2','3','4','5','6'],-1));
var e=h;while(e&&!e.classList.contains('ijCols')){e.style.setProperty('background','transparent','important');e.style.setProperty('border-color','transparent','important');e.style.setProperty('box-shadow','none','important');e=e.parentElement;}h.style.setProperty('padding','0','important');[].forEach.call(h.querySelectorAll('.ijFl'),function(x){x.style.color='#9fb2c8';});o.push('ok');}catch(e){o.push(String(e));}return o;});
await p.waitForTimeout(500);await p.screenshot({path:process.argv[2]});console.log(E,r);await b.close();})();
