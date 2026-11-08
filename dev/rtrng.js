// v945 潰走・阻止: 敵の射程・砲の向き。S24 逃 vN7、敵 vO9・vL8(歩兵)、砲 vJ8
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const E=[];p.on('pageerror',x=>E.push(String(x)));
await p.goto('file://'+__dirname+'/../index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1000);
await p.evaluate(async()=>{try{localStorage.setItem('nmRtmPos',JSON.stringify({x:20,y:690}));localStorage.setItem('nmRtmPenPos',JSON.stringify({x:20,y:20}));}catch(e){}S.scen=S.scen||{};S.scen.sel='S24';for(var i=0;i<4;i++){try{Draw();}catch(e){}await new Promise(r=>setTimeout(r,1500));}await btEnsureGraph();nmRtmStart();});await p.waitForTimeout(800);
const r=await p.evaluate(()=>{var N=BTG.nodes,id=nm=>N.findIndex(n=>n.nm===nm),nm=i=>N[i].nm;var tap=n=>{window.__H=nmHexOfNode(n);window.losHexAtClient=()=>window.__H;return nmRtmTap(1,1);};var o={};
 var cnt=()=>{var C=nmRtCalc(),sr=nmRtSearch(NM_RT.n,C.E,C.mf);return Object.keys(sr.dist).filter(k=>nmRtInter(+k,C.E)).length;};
 tap(id('vN7'));tap(id('vJ8'));o.inf4=cnt();nmRtmESet('rng',-3);o.inf1=cnt();nmRtmESet('rng',3);nmRtmESet('gun',1);var f=[];for(var k=0;k<6;k++){f.push(cnt());nmRtmESet('fac',1);}o.fac=f.join(',');
 for(var k=0;k<f.indexOf(Math.max.apply(null,f));k++)nmRtmESet('fac',1);
 tap(id('vO9'));tap(id('vL8'));o.sel=nm(NM_RTM.sel);tap(id('vO9'));o.sel2=nm(NM_RTM.sel);nmRtmEDel();o.del=NM_RTM.E.length;tap(id('vO9'));tap(id('vJ8'));o.n=NM_RTM.E.length+' sel='+nm(NM_RTM.sel);
 o.bn=document.getElementById('nmRtmBn').textContent;return o;});
console.log(JSON.stringify(r,null,1));
await p.evaluate(()=>{nmRtmPenTab('u');Draw();});await p.waitForTimeout(1200);await p.screenshot({path:'/tmp/sm/rtrng.png'});
console.log(E);await b.close();})();
