const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1148,height:798},deviceScaleFactor:1.5});const E=[];p.on('pageerror',x=>E.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1000);
await p.evaluate(async()=>{const W=ms=>new Promise(r=>setTimeout(r,ms));S.scen=S.scen||{};S.scen.sel='S24';for(var i=0;i<4;i++){try{Draw();}catch(e){}await W(1500);}await btEnsureGraph();var N=BTG.nodes,id=nm=>N.findIndex(n=>n.nm===nm);try{nmModeSet('judge');}catch(e){}await W(1500);var A=N[id('tT9')],B=N[id('tO10')];S_LOS.pxA={x:A.x,y:A.y};S_LOS.pxB={x:B.x,y:B.y};LosRunPixel();await W(4000);nmIjOpen();await W(1500);
var NT='GER';nmIjSet('nat',NT);NM_IJ.cp=1;nmIjDraw();await W(500);var ob=nmSuOb(NT).filter(x=>x.kind!=='afv'&&x.kind!=='gun'&&x.kind!=='veh'),m=ob.filter(x=>x.kind==='mmc'),sw=ob.filter(x=>x.kind!=='mmc'&&x.kind!=='smc');
nmIjCnt(m[0].kind+'|'+m[0].id,1);nmIjCnt(m[1].kind+'|'+m[1].id,1);nmIjCnt(sw[0].kind+'|'+sw[0].id,1);nmIjCnt(sw[1].kind+'|'+sw[1].id,1);nmIjAsg(nmIjSwList(NT,NM_IJ.cs)[0].key,0);await W(500);window.__a=1;});
await p.screenshot({path:process.argv[2]+'/v1038-pick.png'});
await p.evaluate(async()=>{nmIjPickDone();await new Promise(r=>setTimeout(r,1500));});await p.screenshot({path:process.argv[2]+'/v1038-tile.png'});console.log(E);await b.close();})();
