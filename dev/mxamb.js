// 混在ヘクス白兵戦の不意打ち(v919): 成功側が先に全攻撃
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1500);
await p.evaluate(async()=>{S.scen=S.scen||{};S.scen.sel='S24';await btEnsureGraph();try{Draw();}catch(x){}await new Promise(r=>setTimeout(r,800));});
const r=await p.evaluate(async()=>{var n=BTG.nodes.findIndex(N=>/Woods|Building/.test(String(N.terr||''))),H=nmHexOfNode(n),ns=nmSuNats();var a=ns[0],d=ns.filter(k=>k!==a)[0],asd=nmSuSide(a),dsd=asd==='f'?'e':'f';
 function mk(nat,sd,cnt){var slot=nmGeFreeSlot();var ob=nmSuOb(nat).filter(x=>x.kind==='mmc');for(var i=0;i<cnt;i++)nmGeAddCore(slot,nat,'mmc',ob[0].label);var e={boardId:H.boardId,col:H.col,row:H.row,st:{},grp:slot};nmSideList(sd).push(e);return e;}
 mk(a,asd,2);mk(d,dsd,1);var vs=nmIjVehs(d).filter(v=>v.kind==='veh');var vsd=dsd;if(!vs.length){vs=nmIjVehs(a).filter(v=>v.kind==='veh');vsd=asd;}
 nmSideList(vsd).push({boardId:H.boardId,col:H.col,row:H.row,st:{},veh:vs[0].id});
 nmHqCcOpen(n,asd);await new Promise(r=>setTimeout(r,500));var out={mx:!!NM_MX,turn:NM_MX&&NM_MX.turn,isd:NM_MX&&NM_MX.isd,vs:NM_MX&&NM_MX.vs};
 var t=()=>(document.getElementById('btRm')||{}).innerText||'';var M=NM_MX;out.n=n;out.terr=BTG.nodes[n].terr;
 nmMxAmbSet(true);nmMxAmbDr('a',1);nmMxAmbDr('d',6);await new Promise(r=>setTimeout(r,300));
 out.ambWho=M.ambS===M.isd;out.txtAmb=/不意打ち成功/.test(t());out.turnAmb=M.turn===M.isd;
 // 突撃側(歩兵)が先に攻撃: 歩兵→歩兵に -1
 var av=nmMxAvail(M.turn);nmMxSelT(av[0]);var tg=nmMxIts(M.vs).filter(q=>!q.x.broken)[0];nmMxTgtT(String(tg.x.pid));var pv=nmMxPrev();out.i2iDrm=pv&&/不意打ち-1/.test(pv.txt);nmMxGo(12);await new Promise(r=>setTimeout(r,300));
 out.stays=M.turn===M.isd;out.left=nmMxAvail(M.isd).length;
 // 残りの歩兵が車両を攻撃(不意打ち-1)
 var a2=nmMxAvail(M.isd);nmMxSelT(a2[0]);nmMxTgtT('V'+M.vs);var pc=nmMxPrev();out.i2vDrm=pc&&/DRM -1/.test(pc.txt||'');
 nmMxPass();await new Promise(r=>setTimeout(r,300));out.ambDone=M.ambDone;out.turnAfter=M.turn===M.vs;
 // 車両側: 車両→歩兵に +1 (不意打ちされた)
 nmMxSelT('V'+M.vs);var t2=nmMxIts(M.isd).filter(q=>!q.x.broken)[0];if(t2)nmMxTgtT(String(t2.x.pid));var pz=nmMxPrev();out.v2iTxt=pz&&(pz.txt||pz.err);
 return out;});
console.log(JSON.stringify(r,null,1));console.log('errors',JSON.stringify(e));await b.close();})();
