// sample: マルチ判定の潰走マップ → 帯の「阻止」→ 阻止のパネル(潰走マップに戻る)
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:700},deviceScaleFactor:2});const Er=[];p.on('pageerror',x=>Er.push(String(x)));
await p.goto('file://'+__dirname+'/../index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1000);
await p.evaluate(async()=>{try{localStorage.setItem('nmRtmPos',JSON.stringify({x:150,y:8}));localStorage.setItem('nmRtmPenPos',JSON.stringify({x:640,y:470}));}catch(e){}S.scen=S.scen||{};S.scen.sel='S24';for(var i=0;i<4;i++){try{Draw();}catch(e){}await new Promise(r=>setTimeout(r,1500));}await btEnsureGraph();nmRtmStart();});await p.waitForTimeout(800);
const hide=()=>p.evaluate(()=>{document.querySelectorAll('.btToast,#btToast,[id^=nmToast]').forEach(x=>x.remove());});
console.log(await p.evaluate(async()=>{var N=BTG.nodes,w=ms=>new Promise(r=>setTimeout(r,ms));var tap=n=>{window.__H=nmHexOfNode(n);window.losHexAtClient=()=>window.__H;return nmRtmTap(1,1);};
 // 阻止が起きる配置を探す
 var best=null;for(var a=0;a<N.length&&!best;a+=3){if(!N[a].og)continue;for(var k=0;k<N.length&&!best;k+=5){var dk=btDist(a,k);if(dk<3||dk>4)continue;var E=[{n:k,go:true,rng:4,eh:null,rtGun:false,rtFac:0}];var P=nmRtPlans(a,E,6);var hit=P.find(q=>q.cover&&nmRtPathInter(q.path,E,a).length>=2);if(hit)best={a:a,k:k};}}
 tap(best.a);tap(best.k);await w(300);nmRtmDecide();await w(800);var C=nmRtCalc();var i=C.plans.findIndex(q=>nmRtPathInter(q.path,C.E).length>=2);var P=C.plans[i];NM_RTM.pick={no:i+1,to:P.to,path:P.path,low:false,inter:nmRtPathInter(P.path,C.E)};try{Draw();}catch(e){}nmRtmBanner();return 'from '+N[best.a].nm+' pick inter='+(NM_RTM.pick&&NM_RTM.pick.inter.length);}));
await p.waitForTimeout(800);await hide();await p.screenshot({path:'/tmp/sm/rtmint-1.png'});
await p.evaluate(()=>{nmRtmIntOpen();var L=nmSuOb(NM_RTM.nat).filter(q=>q.kind==='smc')[0];if(L)nmRtmIntSet('ldr',L.label);});await p.waitForTimeout(600);await hide();await p.screenshot({path:'/tmp/sm/rtmint-2.png'});
await p.evaluate(()=>{nmRtmIntRoll(0,9);});await p.waitForTimeout(600);await hide();await p.screenshot({path:'/tmp/sm/rtmint-3.png'});
console.log(await p.evaluate(()=>document.getElementById('nmRtmInt').innerText.replace(/\s+/g,' ').slice(0,500)));
await p.evaluate(()=>{var b=[...document.querySelectorAll('#nmRtmInt button')].find(x=>/潰走マップに戻る/.test(x.textContent));b.click();});console.log('closed',await p.evaluate(()=>!document.getElementById('nmRtmInt')));
console.log('err',Er.length,Er.slice(0,2));await b.close();})();
