// v952 敵マーカーの設定(シナリオのユニット選択・射程自動・砲/車両は向きだけ)
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820},deviceScaleFactor:2});const E=[];p.on('pageerror',x=>E.push(String(x)));
await p.goto('file://'+__dirname+'/../index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1000);
await p.evaluate(async()=>{try{localStorage.setItem('nmRtmPos',JSON.stringify({x:20,y:700}));localStorage.setItem('nmRtmPenPos',JSON.stringify({x:860,y:20}));}catch(e){}S.scen=S.scen||{};S.scen.sel='S24';for(var i=0;i<4;i++){try{Draw();}catch(e){}await new Promise(r=>setTimeout(r,1500));}await btEnsureGraph();nmRtmStart();});await p.waitForTimeout(800);
const r=await p.evaluate(async()=>{var N=BTG.nodes,id=nm=>N.findIndex(n=>n.nm===nm),nm=i=>N[i].nm;var tap=n=>{window.__H=nmHexOfNode(n);window.losHexAtClient=()=>window.__H;return nmRtmTap(1,1);};var o={},w=ms=>new Promise(r=>setTimeout(r,ms));
 tap(id('vN7'));tap(id('vO9'));tap(id('vJ8'));await w(300);o.ed=!!document.getElementById('nmRtmEd');o.sel=nm(NM_RTM.sel);var U=nmRtmUnits(nmRtmEnat());
 o.units=Object.keys(U).map(k=>k+':'+U[k].map(x=>x.label+'/'+x.rng+(x.ctr?'':'!')).join(',')).join(' ; ');
 var pick=async(t,l)=>{var i=nmRtmUnits(nmRtmEnat())[t].findIndex(x=>x.label===l);nmRtmEPick(t,i);await w(200);};
 await pick('inf','8-3-8[E]');var e=nmRtmSelE();o.inf=e.rtLbl+' '+e.rtRng+' gun='+e.rtGun;
 await pick('sw','HMG 7-16');o.sw=nmRtmSelE().rtRng;
 await pick('gun','5cm PaK 38');e=nmRtmSelE();o.gun=e.rtRng+' gun='+e.rtGun;nmRtmEd();o.gunRings=document.querySelectorAll('#nmRtmEd button[onclick^="nmRtmEFac"]').length;nmRtmEFac(2);o.fac=nmRtmSelE().rtFac;
 await pick('veh','ティーガーI後期(L)');e=nmRtmSelE();o.veh=e.rtTur+' '+e.rtRng;nmRtmEd();o.vRings=document.querySelectorAll('#nmRtmEd button[onclick^="nmRtmEFac"]').length+'/'+document.querySelectorAll('#nmRtmEd button[onclick^="nmRtmEHull"]').length;nmRtmEHull(0);nmRtmEFac(3);o.vf=nmRtmSelE().rtHull+'/'+nmRtmSelE().rtFac;
 var en=nmRtEnemies('f').concat(nmRtEnemies('e')).filter(x=>x.eh.ijTmp).map(x=>x.rng+(x.rtGun?'g'+x.rtFac:''));o.en=en.join(',');
 return o;});
console.log(JSON.stringify(r));await p.waitForTimeout(500);await p.screenshot({path:'/tmp/sm/ed.png'});console.log(E);await b.close();})();
