// 歩兵+車両が混在するヘクスの白兵戦: ①歩兵どうし→②車両戦(v915)
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1500);
await p.evaluate(async()=>{S.scen=S.scen||{};S.scen.sel='S24';await btEnsureGraph();try{Draw();}catch(x){}await new Promise(r=>setTimeout(r,800));});
const r=await p.evaluate(async()=>{var n=0,H=nmHexOfNode(n),ns=nmSuNats();var a=ns[0],d=ns.filter(k=>k!==a)[0],asd=nmSuSide(a),dsd=asd==='f'?'e':'f';
 function mk(nat,sd,cnt){var slot=nmGeFreeSlot();var ob=nmSuOb(nat).filter(x=>x.kind==='mmc');for(var i=0;i<cnt;i++)nmGeAddCore(slot,nat,'mmc',ob[0].label);var e={boardId:H.boardId,col:H.col,row:H.row,st:{},grp:slot};nmSideList(sd).push(e);return e;}
 mk(a,asd,2);mk(d,dsd,1);var vs=nmIjVehs(d).filter(v=>v.kind==='veh');if(!vs.length){vs=nmIjVehs(a).filter(v=>v.kind==='veh');}
 var vsd=nmIjVehs(d).some(v=>v.kind==='veh')?dsd:asd;nmSideList(vsd).push({boardId:H.boardId,col:H.col,row:H.row,st:{},veh:vs[0].id});
 var mv=nmMixVeh(H);nmHqCcOpen(n,asd);await new Promise(r=>setTimeout(r,500));
 var t=document.getElementById('nmCcp')?document.getElementById('nmCcp').innerText:'';
 var out={mixDetected:!!mv,mix:!!NM_MIX,banner:/歩兵＋車両が混在/.test(t)};
 // 攻撃1個目に1ユニットだけ指定
 var Z=nmCcAtkInit();var sdA=NM_MIX.isd;Z.A[sdA][0].a=[0];nmCcpDraw();
 ['f','e'].forEach(function(sd){var k=Z.A[sd][0];if(!k)return;var c=nmCcaCalc(Z,sd,k);if(c)nmCcaDrSet(sd,0,12);});
 nmCcpApply();await new Promise(r=>setTimeout(r,300));
 out.applied=NM_CC&&NM_CC.applied;out.att=Object.keys(NM_MIX.att).length;out.btn=/車両との白兵戦へ/.test(document.getElementById('nmCcp').innerText);
 nmMixGo();await new Promise(r=>setTimeout(r,500));
 out.cv=!!NM_CV;out.done=NM_CV&&Object.keys(NM_CV.done).length;out.ccpGone=!document.getElementById('nmCcp');return out;});
console.log(JSON.stringify(r));console.log('errors',JSON.stringify(e));await b.close();})();
