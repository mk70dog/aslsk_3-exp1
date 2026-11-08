// v952サンプル: 潰走地図のヘクス表示を実カウンター画像に(逃/敵/砲)・ボタンの四角ドットなし
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820},deviceScaleFactor:2});const E=[];p.on('pageerror',x=>E.push(String(x)));
await p.goto('file://'+__dirname+'/../index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1000);
await p.evaluate(async()=>{try{localStorage.setItem('nmRtmPos',JSON.stringify({x:20,y:700}));localStorage.setItem('nmRtmPenPos',JSON.stringify({x:860,y:20}));}catch(e){}S.scen=S.scen||{};S.scen.sel='S24';for(var i=0;i<4;i++){try{Draw();}catch(e){}await new Promise(r=>setTimeout(r,1500));}await btEnsureGraph();nmRtmStart();});await p.waitForTimeout(800);
const r=await p.evaluate(async()=>{var N=BTG.nodes,id=nm=>N.findIndex(n=>n.nm===nm);var tap=n=>{window.__H=nmHexOfNode(n);window.losHexAtClient=()=>window.__H;return nmRtmTap(1,1);};var o={};
 tap(id('vN7'));tap(id('vO9'));tap(id('vJ8'));await new Promise(r=>setTimeout(r,300));nmRtmESet('gun',1);nmRtmMode('k');tap(id('vN6'));nmRtmMode('r');
 var bs=[...document.querySelectorAll('#nmRtmEd button')];bs.forEach(x=>{if(x.textContent==='消す'&&0)x.click();});
 try{Draw();}catch(e){}o.img=document.querySelectorAll('svg image').length;o.bn=getComputedStyle(document.querySelector('#nmRtmBn button'),'::before').content;return o;});
console.log(JSON.stringify(r));await p.waitForTimeout(800);await p.screenshot({path:'/tmp/sm/rtctr.png'});console.log(E);await b.close();})();
