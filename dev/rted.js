// v950 敵マーカーの設定ポップアップ(種類・射程・砲の向き)
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const E=[];p.on('pageerror',x=>E.push(String(x)));
await p.goto('file://'+__dirname+'/../index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1000);
await p.evaluate(async()=>{try{localStorage.setItem('nmRtmPos',JSON.stringify({x:20,y:700}));localStorage.setItem('nmRtmPenPos',JSON.stringify({x:860,y:20}));}catch(e){}S.scen=S.scen||{};S.scen.sel='S24';for(var i=0;i<4;i++){try{Draw();}catch(e){}await new Promise(r=>setTimeout(r,1500));}await btEnsureGraph();nmRtmStart();});await p.waitForTimeout(800);
const r=await p.evaluate(async()=>{var N=BTG.nodes,id=nm=>N.findIndex(n=>n.nm===nm),nm=i=>N[i].nm;var tap=n=>{window.__H=nmHexOfNode(n);window.losHexAtClient=()=>window.__H;return nmRtmTap(1,1);};var o={};
 tap(id('vN7'));tap(id('vO9'));tap(id('vJ8'));await new Promise(r=>setTimeout(r,300));o.ed=!!document.getElementById('nmRtmEd');o.sel=nm(NM_RTM.sel);
 [...document.querySelectorAll('#nmRtmEd button')].filter(x=>x.textContent==='砲')[0].click();await new Promise(r=>setTimeout(r,300));o.gun=nmRtmSelE().rtGun+' '+nmRtmSelE().rtRng;
 var bs=[...document.querySelectorAll('#nmRtmEd button')].filter(x=>x.textContent==='↑');o.arrows=bs.length;bs[3].click();await new Promise(r=>setTimeout(r,300));o.fac=nmRtmSelE().rtFac;
 [...document.querySelectorAll('#nmRtmEd button')].filter(x=>x.textContent==='12')[0].click();o.rng=nmRtmSelE().rtRng;return o;});
console.log(JSON.stringify(r));await p.waitForTimeout(500);await p.screenshot({path:'/tmp/sm/ed.png'});console.log(E);await b.close();})();
