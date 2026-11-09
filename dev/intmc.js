// sample: 阻止のMCをMC・PTCのタイルで(潰走の結果→ボタン→阻止モード)
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:700},deviceScaleFactor:2});const Er=[];p.on('pageerror',x=>Er.push(String(x)));
await p.goto('file://'+__dirname+'/../index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1000);
await p.evaluate(async()=>{S.scen=S.scen||{};S.scen.sel='S24';for(var i=0;i<4;i++){try{Draw();}catch(e){}await new Promise(r=>setTimeout(r,1500));}await btEnsureGraph();});
const hide=()=>p.evaluate(()=>{document.querySelectorAll('.btToast,#btToast,[id^=nmToast]').forEach(x=>x.remove());});
const r=await p.evaluate(()=>{var N=BTG.nodes,id=nm=>N.findIndex(n=>n.nm===nm),o={};try{if(!nmSdSet())nmSdAssign('SOV','f',true);}catch(e){}var sdF=nmSuSide('SOV'),sdE=sdF==='f'?'e':'f';NM_RTM=null;
 // 開豁地を通って林へ潰走し、途中で阻止を受ける配置を探す
 var mk=function(nat,n,sd,brk,ldr){var H=nmHexOfNode(n),slot=nmGeFreeSlot();var u=nmSuOb(nat).filter(x=>x.kind==='mmc'&&!/HS|乗員/.test(x.label))[0];nmGeAddCore(slot,nat,u.kind,u.label);if(ldr){var l=nmSuOb(nat).filter(x=>x.kind==='smc')[0];if(l)nmGeAddCore(slot,nat,'smc',l.label);}nmGeList(slot).items.forEach(x=>{if(brk&&x.kind!=='smc')x.broken=true;});nmGeSync(slot);var e={boardId:H.boardId,col:H.col,row:H.row,st:{},grp:slot};nmSideList(sd).push(e);return e;};
 var best=null;for(var a=0;a<N.length&&!best;a+=3){if(!N[a].og)continue;for(var k=0;k<N.length&&!best;k+=5){var dk=btDist(a,k);if(dk<3||dk>4)continue;var E=[{n:k,go:true,rng:4,eh:null,rtGun:false,rtFac:0}];if(btDist(a,k)<=1)continue;var P=nmRtPlans(a,E,6);var hit=P.find(q=>q.cover&&nmRtPathInter(q.path,E,a).length);if(hit)best={a:a,k:k};}}
 if(!best)return {none:1};var R0=mk('SOV',best.a,sdF,true,true);mk('GER',best.k,sdE,false);
 NM_RT={n:best.a,sd:sdF,slot:R0.grp,done:null};var C=nmRtCalc();var k2=C.plans.findIndex(q=>nmRtPathInter(q.path,C.E,best.a).length);o.from=N[best.a].nm;o.enemy=N[best.k].nm;o.plan=k2;
 nmRtGo(best.a,k2>=0?k2:0);o.done=JSON.stringify({to:N[NM_RT.done.to].nm,inter:NM_RT.done.inter.length});return o;});
console.log(JSON.stringify(r));await p.waitForTimeout(1200);await hide();await p.screenshot({path:'/tmp/sm/intmc-1.png'});
await p.evaluate(()=>{var D=NM_RT.done,src=nmGeList(nmRtEh()?nmRtEh().grp:'');var l=(nmGeList(Object.keys(S.savedGroups[S.scen.sel]).find(k=>(nmGeList(k).items||[]).some(x=>x.kind==='smc'))).items||[]).find(x=>x.kind==='smc');if(l){nmGeAddCore(D.slot,l.nat||'SOV','smc',l.label);nmGeSync(D.slot);}});
console.log(await p.evaluate(()=>{var b=[...document.querySelectorAll('#btRm .rmIt')].find(x=>/阻止のMCをする/.test(x.textContent));if(!b)return 'no btn';b.click();return 'clicked';}));
await p.waitForTimeout(1200);await hide();await p.screenshot({path:'/tmp/sm/intmc-2.png'});
console.log(await p.evaluate(()=>{var b=[...document.querySelectorAll('#btRm [onclick]')].find(x=>/NM_MC.ldr=\d/.test(x.getAttribute('onclick')||''));if(b)b.click();return 'leader '+!!b;}));await p.waitForTimeout(1000);await hide();await p.screenshot({path:'/tmp/sm/intmc-2b.png'});
console.log(await p.evaluate(()=>{var d=[...document.querySelectorAll('#btRm [onclick]')].find(x=>/nmMcIntSet\(.*,9,/.test(x.getAttribute('onclick')||''));if(d)d.click();return 'roll '+!!d;}));
await p.waitForTimeout(1200);await hide();await p.screenshot({path:'/tmp/sm/intmc-3.png'});console.log(await p.evaluate(()=>document.getElementById('btRm').innerText.replace(/\s+/g,' ').slice(0,500)));
console.log('err',Er.length,Er.slice(0,2));await b.close();})();
