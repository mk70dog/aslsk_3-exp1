const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820},deviceScaleFactor:2});const E=[];p.on('pageerror',x=>E.push(String(x)));
await p.goto('file://'+__dirname+'/../index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1000);
const css=process.argv[2]?require('fs').readFileSync(process.argv[2],'utf8'):'';
const r=await p.evaluate(async(css)=>{const W=ms=>new Promise(r=>setTimeout(r,ms));S.scen=S.scen||{};S.scen.sel='S24';for(var i=0;i<4;i++){try{Draw();}catch(e){}await W(1500);}await btEnsureGraph();var N=BTG.nodes,id=nm=>N.findIndex(n=>n.nm===nm);var o=[];
try{try{nmModeSet('judge');}catch(e){}await W(1500);var A=N[id('tK6')],B=N[id('tN6')];S_LOS.pxA={x:A.x,y:A.y};S_LOS.pxB={x:B.x,y:B.y};LosRunPixel();await W(4000);nmIjOpen();await W(800);nmIjSet('ph','dff');await W(300);nmIjSet('place',0);await W(500);nmIjBTerr();await W(2500);if(css){var s=document.createElement('style');s.id='spdesX';s.textContent=css;document.head.appendChild(s);}o.push('ok');}catch(e){o.push(String(e)+(e.stack||'').slice(0,200));}return o;},css);
await p.waitForTimeout(800);await p.screenshot({path:process.argv[3]||'/tmp/sm/sp_before.png'});
if(!process.argv[2]){await p.evaluate(async()=>{try{nmIjClose&&nmIjClose();}catch(e){}var N=BTG.nodes;try{btRMenu(N.findIndex(n=>n.nm==='tK6'));}catch(e){console.log(String(e).slice(0,150));}});await p.waitForTimeout(1500);await p.screenshot({path:'/tmp/sm/mj_ref.png'});}
console.log(E,r);await b.close();})();
