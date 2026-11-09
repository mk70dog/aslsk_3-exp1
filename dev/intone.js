// sample: 潰走の結果パネル1枚で阻止のMC(指揮官は手で行き先へ)
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:700},deviceScaleFactor:2});const Er=[];p.on('pageerror',x=>Er.push(String(x)));
await p.goto('file://'+__dirname+'/../index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1000);
await p.evaluate(async()=>{S.scen=S.scen||{};S.scen.sel='S24';for(var i=0;i<4;i++){try{Draw();}catch(e){}await new Promise(r=>setTimeout(r,1500));}await btEnsureGraph();});
const hide=()=>p.evaluate(()=>{document.querySelectorAll('.btToast,#btToast,[id^=nmToast]').forEach(x=>x.remove());});
console.log(await p.evaluate(()=>{var N=BTG.nodes,o={};try{if(!nmSdSet())nmSdAssign('SOV','f',true);}catch(e){}var sdF=nmSuSide('SOV'),sdE=sdF==='f'?'e':'f';NM_RTM=null;
 var mk=function(nat,n,sd,brk,ldr){var H=nmHexOfNode(n),slot=nmGeFreeSlot();var u=nmSuOb(nat).filter(x=>x.kind==='mmc'&&!/HS|乗員/.test(x.label))[0];nmGeAddCore(slot,nat,u.kind,u.label);if(ldr){var l=nmSuOb(nat).filter(x=>x.kind==='smc')[0];if(l)nmGeAddCore(slot,nat,'smc',l.label);}nmGeList(slot).items.forEach(x=>{if(brk&&x.kind!=='smc')x.broken=true;});nmGeSync(slot);var e={boardId:H.boardId,col:H.col,row:H.row,st:{},grp:slot};nmSideList(sd).push(e);return e;};
 var best=null;for(var a=0;a<N.length&&!best;a+=3){if(!N[a].og)continue;for(var k=0;k<N.length&&!best;k+=5){var dk=btDist(a,k);if(dk<3||dk>4)continue;var E=[{n:k,go:true,rng:4,eh:null,rtGun:false,rtFac:0}];var P=nmRtPlans(a,E,6);var hit=P.find(q=>q.cover&&nmRtPathInter(q.path,E,a).length);if(hit)best={a:a,k:k};}}
 var R0=mk('SOV',best.a,sdF,true,true);mk('GER',best.k,sdE,false);NM_RT={n:best.a,sd:sdF,slot:R0.grp,done:null};var C=nmRtCalc();var k2=C.plans.findIndex(q=>nmRtPathInter(q.path,C.E,best.a).length);nmRtGo(best.a,k2);
 // 指揮官を手で行き先へ動かした想定
 var D=NM_RT.done,l=nmGeList(R0.grp).items.find(x=>x.kind==='smc');if(l){nmGeAddCore(D.slot,'SOV','smc',l.label);var si=nmGeList(R0.grp).items.indexOf(l);nmGeDelCore(R0.grp,si);nmGeSync(D.slot);nmGeSync(R0.grp);}
 nmRtRe(best.a);return 'ok';}));
await p.waitForTimeout(1200);await hide();await p.screenshot({path:'/tmp/sm/intone-1.png'});
await p.evaluate(()=>{var b=[...document.querySelectorAll('#btRm [onclick]')].find(x=>/NM_RT.done.ldr=\d/.test(x.getAttribute('onclick')||''));if(b)b.click();});await p.waitForTimeout(800);
await p.evaluate(()=>{var D=NM_RT.done;nmRtMc(NM_RT.n,D.pids[0],0,6);});await p.waitForTimeout(1000);await hide();await p.screenshot({path:'/tmp/sm/intone-2.png'});
console.log(await p.evaluate(()=>document.getElementById('btRm').innerText.replace(/\s+/g,' ').slice(0,600)));console.log('err',Er.length,Er.slice(0,2));await b.close();})();
