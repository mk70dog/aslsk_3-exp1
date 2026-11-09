// sample: 経路を手で引く時、ルール上いけないヘクスを暗く・行き先の林建物から外へ出られない
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:700},deviceScaleFactor:2});const Er=[];p.on('pageerror',x=>Er.push(String(x)));
await p.goto('file://'+__dirname+'/../index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1000);
await p.evaluate(async()=>{try{localStorage.setItem('nmRtmPos',JSON.stringify({x:120,y:8}));localStorage.setItem('nmRtmPenPos',JSON.stringify({x:640,y:500}));}catch(e){}S.scen=S.scen||{};S.scen.sel='S24';for(var i=0;i<4;i++){try{Draw();}catch(e){}await new Promise(r=>setTimeout(r,1500));}await btEnsureGraph();nmRtmStart();});await p.waitForTimeout(800);
console.log(await p.evaluate(async()=>{var N=BTG.nodes,id=nm=>N.findIndex(n=>n.nm===nm),w=ms=>new Promise(r=>setTimeout(r,ms));var tap=n=>{window.__H=nmHexOfNode(n);window.losHexAtClient=()=>window.__H;return nmRtmTap(1,1);};
 tap(id('vN7'));tap(id('vP9'));await w(200);nmRtmDecide();await w(800);nmRtmMode('r');var C=nmRtCalc(),LG=nmRtmLegal();
 var o={plans:C.plans.map(q=>N[q.to].nm).join(','),all:(C.plans.all||[]).map(q=>N[q].nm).join(','),ok:Object.keys(LG.ok).length,reach:Object.keys(nmRtSearch(NM_RT.n,C.E,C.mf).dist).length};
 // 行き先へ行ってからさらに外へ
 var d=C.plans[0];var msgs=[];var oT=btToast;btToast=function(m){msgs.push(m);};d.path.forEach(h=>nmRtmManTap(h));var last=d.path[d.path.length-1];var out=N[last].nb.find(q=>!LG.dest[q]&&btInfCost(last,q));if(out!=null)nmRtmManTap(out);
 var bad=N.findIndex((z,zi)=>!LG.ok[zi]&&btDist(zi,NM_RT.n)===1&&btInfCost(NM_RT.n,zi));btToast=oT;o.msgs=msgs.join(' / ');o.okHex=Object.keys(LG.ok).map(k=>N[k].nm).join(',');o.base=(C.plans.base||[]).map(q=>N[q].nm).join(',');o.pick=NM_RTM.pick&&NM_RTM.pick.path.map(h=>N[h].nm).join('>');try{Draw();}catch(e){}nmRtmBanner();return JSON.stringify(o);}));
await p.waitForTimeout(800);await p.screenshot({path:'/tmp/sm/rtlegal.png'});console.log('err',Er.length,Er.slice(0,2));await b.close();})();
