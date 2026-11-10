// サンプル: SW割り当て欄(カウンター選択)と、編成タイルの「編集」ボタン
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1148,height:798},deviceScaleFactor:1.5});const E=[];p.on('pageerror',x=>E.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1000);
const r=await p.evaluate(async()=>{const W=ms=>new Promise(r=>setTimeout(r,ms));S.scen=S.scen||{};S.scen.sel='S24';for(var i=0;i<4;i++){try{Draw();}catch(e){}await W(1500);}await btEnsureGraph();var N=BTG.nodes,id=nm=>N.findIndex(n=>n.nm===nm);var o=[];
try{try{nmModeSet('judge');}catch(e){}await W(1500);var A=N[id('tT9')],B=N[id('tO10')];S_LOS.pxA={x:A.x,y:A.y};S_LOS.pxB={x:B.x,y:B.y};LosRunPixel();await W(4000);nmIjOpen();await W(1500);
var NT=nmSuNats().filter(function(k){return k==='GER';})[0]||nmSuNats()[0];nmIjSet('nat',NT);NM_IJ.cp=1;nmIjDraw();await W(800);
var ob=nmSuOb(NT).filter(function(x){return x.kind!=='afv'&&x.kind!=='gun'&&x.kind!=='veh';});var m=ob.filter(x=>x.kind==='mmc'),sw=ob.filter(x=>x.kind!=='mmc'&&x.kind!=='smc');o.push('mmc '+m.length+' sw '+sw.length);
var l38=sw.filter(x=>/3-8/.test(x.label))[0]||sw[1];nmIjCnt(m[0].kind+'|'+m[0].id,1);nmIjCnt(m[1].kind+'|'+m[1].id,1);nmIjCnt(sw[0].kind+'|'+sw[0].id,1);if(l38)nmIjCnt(l38.kind+'|'+l38.id,1);await W(500);
var sq=[m[0].label.replace(/\[.*$/,'')+' ①',m[1].label.replace(/\[.*$/,'')+' ①'];var rows=[[sw[0].label,0],[l38?l38.label:'LMG',1]];
nmIjPickDone();await W(1500);var tiles=[].slice.call(document.querySelectorAll('#nmIj .ijTiles .ijB.on'));o.push('on tiles '+tiles.length);
tiles.forEach(function(tl){var e=document.createElement('span');e.textContent='✎ 編集';e.style.cssText='display:inline-block!important;margin-top:6px!important;background:#0d1117!important;color:#ffd070!important;border:1px solid #c8a032!important;border-radius:8px!important;padding:4px 14px!important;font-size:14px!important;font-weight:800!important;opacity:1!important;filter:none!important';e.className='';tl.appendChild(e);});}catch(e){o.push(String(e));}return o;});
console.log(JSON.stringify(r),JSON.stringify(E));await p.waitForTimeout(4500);await p.screenshot({path:process.argv[2]+'/sample-swas-2.png'});await b.close();})();
