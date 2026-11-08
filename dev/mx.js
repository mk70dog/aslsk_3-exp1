// 混在ヘクスの白兵戦: 交互に1攻撃ずつ宣言→解決(v918, SK4 3.8)
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1500);
await p.evaluate(async()=>{S.scen=S.scen||{};S.scen.sel='S24';await btEnsureGraph();try{Draw();}catch(x){}await new Promise(r=>setTimeout(r,800));});
const r=await p.evaluate(async()=>{var n=0,H=nmHexOfNode(n),ns=nmSuNats();var a=ns[0],d=ns.filter(k=>k!==a)[0],asd=nmSuSide(a),dsd=asd==='f'?'e':'f';
 function mk(nat,sd,cnt){var slot=nmGeFreeSlot();var ob=nmSuOb(nat).filter(x=>x.kind==='mmc');for(var i=0;i<cnt;i++)nmGeAddCore(slot,nat,'mmc',ob[0].label);var e={boardId:H.boardId,col:H.col,row:H.row,st:{},grp:slot};nmSideList(sd).push(e);return e;}
 mk(a,asd,2);mk(d,dsd,1);var vs=nmIjVehs(d).filter(v=>v.kind==='veh');var vsd=dsd;if(!vs.length){vs=nmIjVehs(a).filter(v=>v.kind==='veh');vsd=asd;}
 nmSideList(vsd).push({boardId:H.boardId,col:H.col,row:H.row,st:{},veh:vs[0].id});
 nmHqCcOpen(n,asd);await new Promise(r=>setTimeout(r,500));var out={mx:!!NM_MX,turn:NM_MX&&NM_MX.turn,isd:NM_MX&&NM_MX.isd,vs:NM_MX&&NM_MX.vs};
 var t=()=>(document.getElementById('btRm')||{}).innerText||'';out.txt1=/1番目の攻撃/.test(t())&&/攻撃するユニット/.test(t())&&/パス/.test(t());
 var M=NM_MX,av=nmMxAvail(M.turn);out.av=av.length;
 // 1: 車両のいない側の歩兵1個が敵歩兵を攻撃(DR12)
 nmMxSelT(av[0]);var tg=nmMxIts(M.vs).filter(q=>!q.x.broken)[0];if(tg){nmMxTgtT(String(tg.x.pid));}
 out.prev1=nmMxPrev()&&nmMxPrev().k;nmMxGo(12);await new Promise(r=>setTimeout(r,300));out.h1=M.hist.length;out.turn2=M.turn;
 // 2: 車両側の番 - 車両が歩兵を攻撃
 var av2=nmMxAvail(M.turn);out.av2=av2.slice();
 if(av2.indexOf('V'+M.vs)>=0){nmMxSelT('V'+M.vs);var it=nmMxIts(M.isd).filter(q=>!q.x.broken)[0];if(it)nmMxTgtT(String(it.x.pid));var pv=nmMxPrev();out.v2i=pv&&(pv.k||pv.err);if(pv&&pv.k)nmMxGo(12);}
 else nmMxPass();
 await new Promise(r=>setTimeout(r,300));out.h2=M.hist.length;out.turn3=M.turn;
 // 3: 残りの歩兵が車両を攻撃
 var av3=nmMxAvail(M.turn);out.av3=av3.length;if(M.turn===M.isd&&av3.length&&nmMxVehOf(M.vs)&&!M.vDead[M.vs]){nmMxSelT(av3[0]);nmMxTgtT('V'+M.vs);var pc=nmMxPrev();out.i2v=pc&&(pc.k||pc.err);if(pc&&pc.k)nmMxGo(2);}
 await new Promise(r=>setTimeout(r,500));out.h3=M.hist.length;out.panel=/✓/.test(t());out.hist=M.hist.map(h=>h.t);
 nmMxPass();nmMxPass();out.ended=M.ended;await new Promise(r=>setTimeout(r,300));out.endTxt=/白兵戦おわり/.test(t());return out;});
console.log(JSON.stringify(r,null,1));console.log('errors',JSON.stringify(e));await b.close();})();
