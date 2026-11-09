// v954 パネルをドラッグで移動(敵設定の小窓)・重ならない初期位置
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820},deviceScaleFactor:2,hasTouch:false});const E=[];p.on('pageerror',x=>E.push(String(x)));
await p.goto('file://'+__dirname+'/../index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1000);
await p.evaluate(async()=>{try{localStorage.removeItem('nmRtmEdPos');localStorage.setItem('nmRtmPos',JSON.stringify({x:120,y:700}));localStorage.setItem('nmRtmPenPos',JSON.stringify({x:700,y:420}));}catch(e){}S.scen=S.scen||{};S.scen.sel='S24';for(var i=0;i<4;i++){try{Draw();}catch(e){}await new Promise(r=>setTimeout(r,1500));}await btEnsureGraph();nmRtmStart();});await p.waitForTimeout(800);
const r=await p.evaluate(async()=>{var N=BTG.nodes,id=nm=>N.findIndex(n=>n.nm===nm),w=ms=>new Promise(r=>setTimeout(r,ms));var tap=n=>{window.__H=nmHexOfNode(n);window.losHexAtClient=()=>window.__H;return nmRtmTap(1,1);};var o={};
 tap(id('vN7'));tap(id('vP9'));await w(400);var ed=document.getElementById('nmRtmEd');var rc=x=>{var r=x.getBoundingClientRect();return [Math.round(r.left),Math.round(r.top),Math.round(r.right),Math.round(r.bottom)];};
 o.ed=ed&&rc(ed);o.bn=rc(document.getElementById('nmRtmBn'));var pen=document.getElementById('nmRtmPen');o.pen=pen&&rc(pen);
 var ov=(a,b)=>Math.min(a[2],b[2])-Math.max(a[0],b[0])>0&&Math.min(a[3],b[3])-Math.max(a[1],b[1])>0;o.overlapBn=ov(o.ed,o.bn);o.overlapPen=pen?ov(o.ed,o.pen):null;return o;});
console.log(JSON.stringify(r));
// ドラッグ
const bx=await p.evaluate(()=>{var e=document.getElementById('nmRtmEd').getBoundingClientRect();return {x:e.left+30,y:e.top+14};});
await p.mouse.move(bx.x,bx.y);await p.mouse.down();await p.mouse.move(bx.x+120,bx.y+60,{steps:5});await p.mouse.up();await p.waitForTimeout(300);
console.log('after drag',await p.evaluate(()=>{var e=document.getElementById('nmRtmEd').getBoundingClientRect();return [Math.round(e.left),Math.round(e.top)]+' saved='+localStorage.getItem('nmRtmEdPos');}));
await p.evaluate(()=>{nmRtmEd();});await p.waitForTimeout(200);console.log('rerender keeps',await p.evaluate(()=>{var e=document.getElementById('nmRtmEd').getBoundingClientRect();return [Math.round(e.left),Math.round(e.top)]+'';}));
console.log(E);await b.close();})();
