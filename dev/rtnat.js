// v956 潰走の国籍切り替え(案B)
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820},deviceScaleFactor:2});const E=[];p.on('pageerror',x=>E.push(String(x)));
await p.goto('file://'+__dirname+'/../index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1000);
await p.evaluate(async()=>{try{localStorage.setItem('nmRtmPos',JSON.stringify({x:140,y:690}));localStorage.setItem('nmRtmPenPos',JSON.stringify({x:700,y:330}));}catch(e){}S.scen=S.scen||{};S.scen.sel='S24';for(var i=0;i<4;i++){try{Draw();}catch(e){}await new Promise(r=>setTimeout(r,1500));}await btEnsureGraph();nmRtmStart();});await p.waitForTimeout(800);
const r=await p.evaluate(async()=>{var N=BTG.nodes,id=nm=>N.findIndex(n=>n.nm===nm),w=ms=>new Promise(r=>setTimeout(r,ms)),o={};var tap=n=>{window.__H=nmHexOfNode(n);window.losHexAtClient=()=>window.__H;return nmRtmTap(1,1);};
 o.nat0=NM_RTM.nat;o.btn1=!!document.querySelector('#nmRtmBn button[onclick="nmRtmNatCycle()"]');nmRtmNatCycle();o.nat1=NM_RTM.nat+' '+NM_RTM.sd;nmRtmNatCycle();
 tap(id('vN7'));tap(id('vP9'));tap(id('vO8'));NM_RTM.sel=null;nmRtmMode('k');tap(id('vO9'));nmRtmMode('e');await w(300);
 o.before=NM_RTM.nat+' E='+NM_RTM.E.length+' mk='+Object.keys(NM_RTM.mk).length+' n='+N[NM_RTM.n].nm+' step='+NM_RTM.step;
 nmRtmNatCycle();await w(500);
 o.after=NM_RTM.nat+' E='+NM_RTM.E.length+' mk='+Object.keys(NM_RTM.mk).length+' n='+N[NM_RTM.n].nm+' step='+NM_RTM.step+' sd='+NM_RTM.sd+' enemyNat='+nmRtmEnat();
 o.units=NM_RTM.E.map(q=>nm=>N[q.n].nm).length;o.btnTxt=(document.querySelector('#nmRtmBn button[onclick="nmRtmNatCycle()"]')||{}).textContent;
 o.leftover=nmSideList('f').filter(e=>e.ccTmp).length+'/'+nmSideList('e').filter(e=>e.ccTmp).length;
 nmRtmNatCycle();await w(300);o.back=NM_RTM.nat+' E='+NM_RTM.E.length;nmRtmCancel();o.end=nmSideList('f').filter(e=>e.ccTmp).length+'/'+nmSideList('e').filter(e=>e.ccTmp).length;return o;});
console.log(JSON.stringify(r));
await p.evaluate(async()=>{nmRtmStart();var N=BTG.nodes,id=nm=>N.findIndex(n=>n.nm===nm);var tap=n=>{window.__H=nmHexOfNode(n);window.losHexAtClient=()=>window.__H;return nmRtmTap(1,1);};tap(id('vN7'));tap(id('vP9'));NM_RTM.sel=null;Draw();await new Promise(r=>setTimeout(r,600));});
await p.screenshot({path:'/tmp/sm/natB.png',clip:{x:100,y:640,width:620,height:120}});console.log(E);await b.close();})();
