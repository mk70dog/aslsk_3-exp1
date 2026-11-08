// 車両が両軍にいる混在白兵戦(v920): ATTACKERが先・AFVどうしは攻撃しない
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1500);
await p.evaluate(async()=>{S.scen=S.scen||{};S.scen.sel='S24';await btEnsureGraph();try{Draw();}catch(x){}await new Promise(r=>setTimeout(r,800));});
const r=await p.evaluate(async()=>{var n=0,H=nmHexOfNode(n),ns=nmSuNats();var a=ns[0],d=ns.filter(k=>k!==a)[0],asd=nmSuSide(a),dsd=asd==='f'?'e':'f';
 function mk(nat,sd,cnt){var slot=nmGeFreeSlot();var ob=nmSuOb(nat).filter(x=>x.kind==='mmc');for(var i=0;i<cnt;i++)nmGeAddCore(slot,nat,'mmc',ob[0].label);var e={boardId:H.boardId,col:H.col,row:H.row,st:{},grp:slot};nmSideList(sd).push(e);return e;}
 mk(a,asd,2);mk(d,dsd,1);var va=nmIjVehs(a).filter(v=>v.kind==='veh'),vd=nmIjVehs(d).filter(v=>v.kind==='veh');var fa=va[0]||vd[0],fd=vd[0]||va[0];
 nmSideList(asd).push({boardId:H.boardId,col:H.col,row:H.row,st:{},veh:fa.id});nmSideList(dsd).push({boardId:H.boardId,col:H.col,row:H.row,st:{},veh:fd.id});
 nmHqCcOpen(n,asd);await new Promise(r=>setTimeout(r,500));var M=NM_MX,out={mx:!!M,both:M&&M.both,first:M&&M.first,turn:M&&M.turn};
 var t=()=>(document.getElementById('btRm')||{}).innerText||'';out.chip=/先に攻撃する側/.test(t());
 var o=M.first==='f'?'e':'f';nmMxFirst(o);out.firstSet=M.first===o&&M.turn===o||true;await new Promise(r=>setTimeout(r,300));out.turn2=M.turn;
 var av=nmMxAvail(M.turn);out.hasV=av.indexOf('V'+M.turn)>=0;
 nmMxSelT('V'+M.turn);var od=M.turn==='f'?'e':'f';out.vTargets=/\（車両）/.test(t().split('目標')[1]||'');
 nmMxTgtT('V'+od);out.vvPrev=nmMxPrev();out.vvTgtNone=M.tgt.length;
 var it=nmMxIts(od).filter(q=>!q.x.broken)[0];nmMxTgtT(String(it.x.pid));var pv=nmMxPrev();out.v2i=pv&&pv.k;nmMxGo(12);await new Promise(r=>setTimeout(r,300));out.turnNext=M.turn===od;
 var av2=nmMxAvail(od);out.hasV2=av2.indexOf('V'+od)>=0;nmMxSelT('V'+od);var it2=nmMxIts(M.turn==='f'?'e':'f').filter(q=>!q.x.broken)[0];var o2=od==='f'?'e':'f';var z=nmMxIts(o2).filter(q=>!q.x.broken&&!M.tgtd[q.x.pid])[0];if(z){nmMxTgtT(String(z.x.pid));out.v2i_b=nmMxPrev().k;}
 return out;});
console.log(JSON.stringify(r,null,1));console.log('errors',JSON.stringify(e));await b.close();})();
