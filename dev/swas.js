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
var h='<div id="swAs" style="margin-top:10px;border:1px solid #3a4658;border-radius:10px;background:#101722;padding:8px 10px"><div style="font-size:13px;color:#ffd070;font-weight:800;margin-bottom:6px">SWの持ち主を選ぶ <span style="font-weight:400;color:#8fa6bd;font-size:11px">(SWごとに、持つ分隊・指揮官をタップ)</span></div>';
rows.forEach(function(r){h+='<div style="display:flex;align-items:center;gap:8px;margin:5px 0"><b style="min-width:110px;font-size:14px">'+r[0]+'</b>'+sq.map(function(t,j){var on=(j===r[1]);return '<button style="height:38px;padding:0 14px;border-radius:8px;border:1px solid '+(on?'#4fd8ff':'#39414f')+';background:'+(on?'#1b2a3a':'#0d1117')+';color:#e8eef4;font-size:14px;font-weight:700;'+(on?'box-shadow:0 0 0 1px #4fd8ff inset':'')+'">'+t+'</button>';}).join('')+'</div>';});
h+='<div style="font-size:11px;color:#8fa6bd;margin-top:4px">未選択のSWは最後の分隊が持ちます。</div></div>';
var bd=document.querySelector('#nmIj .pkBody');bd.insertAdjacentHTML('afterbegin',h);bd.scrollTop=0;}catch(e){o.push(String(e));}return o;});
console.log(JSON.stringify(r),JSON.stringify(E));await p.waitForTimeout(500);await p.screenshot({path:process.argv[2]+'/sample-swas-1.png'});await b.close();})();
