// sample: スポット判定 A・Bに置く 実カウンター
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657},deviceScaleFactor:2});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S24';S.nmMode='judge';NAVTAB('los');});await p.waitForTimeout(3000);
await p.evaluate(async()=>{await btEnsureGraph();var N=BTG.nodes;var sc=S.scen.sel;S.savedGroups=S.savedGroups||{};S.savedGroups[sc]=S.savedGroups[sc]||{};var sl=nmGeFreeSlot();nmGeAddCore(sl,'SOV','mmc','6-2-8[E]');nmGeAddCore(sl,'SOV','mmc','4-4-7[1]');nmGeAddCore(sl,'SOV','smc','9-1');nmGeSync(sl);
 S_LOS.pxA={x:N[100].x,y:N[100].y};S_LOS.pxB={x:N[104].x,y:N[104].y};try{LosRunPixel();}catch(x){}nmIjOpen();await new Promise(r=>setTimeout(r,600));NM_IJ.nat='SOV';NM_IJ.ea=1;NM_IJ.eb=1;NM_IJ.bnat='GER';nmIjDraw();});
await p.waitForTimeout(800);await p.screenshot({path:'/tmp/sm/ijctr-1.png'});
await p.evaluate(()=>{var r=document.querySelector('#nmIj .ijL');if(r)r.scrollTop=9999;});await p.waitForTimeout(400);await p.screenshot({path:'/tmp/sm/ijctr-2.png'});
console.log(JSON.stringify(e));await b.close();})();
