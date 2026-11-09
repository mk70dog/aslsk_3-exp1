const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820},deviceScaleFactor:1});const E=[];p.on('pageerror',x=>E.push(String(x)));
p.on('console',()=>{});await p.goto('file://'+__dirname+'/../index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1000);
const rp=p.evaluate(async()=>{const W=ms=>new Promise(r=>setTimeout(r,ms));S.scen=S.scen||{};S.scen.sel='S24';for(var i=0;i<4;i++){try{Draw();}catch(e){}await W(1500);}await btEnsureGraph();var N=BTG.nodes,id=nm=>N.findIndex(n=>n.nm===nm);var o=[];
var a=id('tM9'),HA=nmHexOfNode(a);var av=[].concat.apply([],nmSuNats().map(k=>nmIjVehs(k))).filter(x=>x.kind==='veh'&&/シャーマン/.test(x.nm))[0];nmSideList('f').push({boardId:HA.boardId,col:HA.col,row:HA.row,st:{},veh:av.id});Draw();await W(500);
nmVfOpen(a,'f');await W(1200);var t0=performance.now();nmVfPick(a,null);await W(600);await new Promise(r=>{window.__shot=r;});o.push('open ms '+Math.round(performance.now()-t0)+' lazy '+NM_PICK.lazy);
var toasts=[];var ot=btToast;btToast=function(m){toasts.push(m);return ot.apply(this,arguments);};
var tap=function(nm){var t=id(nm);window.__H=nmHexOfNode(t);var ol=losHexAtClient;losHexAtClient=function(){return window.__H;};try{nmPickTap(1,1);}finally{losHexAtClient=ol;}};
tap('tM9');tap('tL7');await W(300);o.push('toasts '+toasts.join(' / ')+' pick '+!!NM_PICK+' tgt '+(NM_VF&&NM_VF.tgt));return o;});
await p.waitForFunction(()=>window.__shot,{timeout:120000});await p.screenshot({path:process.argv[2]});await p.evaluate(()=>window.__shot());const r=await rp;console.log(E,r);await b.close();})();
