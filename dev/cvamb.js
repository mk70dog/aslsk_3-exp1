// 対車両の白兵戦 不意打ち(v909): 条件・dr・順番のテスト
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657},deviceScaleFactor:1});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S25';S.nmMode='judge';NAVTAB('los');});await p.waitForTimeout(3000);
await p.evaluate(async()=>{await btEnsureGraph();S_LOS.friendHexes=[];S_LOS.enemyHexes=[];Draw();});await p.waitForTimeout(2500);
const r=await p.evaluate(()=>{var o={};var nodes=BTG.nodes,wn=nodes.findIndex(n=>/Woods/.test(n.terr||'')&&n.nb.length>3),on=nodes.findIndex(n=>/Open/.test(n.terr||'')&&n.nb.length>3);
 function setup(n){var H=nmHexOfNode(n);var nat=nmSuNats().filter(k=>nmSuSide(k)==='f')[0];var us=nmSuOb(nat).filter(x=>x.kind==='mmc');var slot=nmGeFreeSlot();nmGeAddCore(slot,nat,'mmc',us[0].label);nmGeAddCore(slot,nat,'mmc',us[1].label);nmGeSync(slot);
  nmSideList('f').push({boardId:H.boardId,col:H.col,row:H.row,grp:slot,st:{}});var vid=nmIjVehs(nmSuNats().filter(k=>nmSuSide(k)==='e')[0]).filter(o=>o.kind!=='gun')[0].id;nmSideList('e').push({boardId:H.boardId,col:H.col,row:H.row,veh:vid,facing:0,st:{}});Draw();NM_RM_HEX=H;BT_RM_XY={x:500,y:200};nmCvOpen(n,'f');}
 setup(on);NM_CV.amb='i';o.openOk=nmCvAmbOk();o.openDrm=nmCvCalc().dl.join(',');var t0=document.getElementById('btRm').innerText;o.openText=/不意打ちなし/.test(t0);BtRmClose();NM_CV=null;
 setup(wn);o.woodsOk=nmCvAmbOk();var t1=document.getElementById('btRm').innerText;o.woodsDr=/不意打ちdrを振る/.test(t1);
 NM_CV.noPa=true;o.noPaOk=nmCvAmbOk();NM_CV.noPa=false;NM_CV.melee=true;o.meleeOk=nmCvAmbOk();NM_CV.melee=false;
 // 歩兵 dr1(修正) / 車両 dr6 → 歩兵成功
 nmCvAmbDr('i',1);nmCvAmbDr('v',6);o.amb1=NM_CV.amb;o.res1=JSON.stringify(NM_CV.ambRes);
 // 歩兵が不意打ち: 反撃は隠れ(歩兵の攻撃が残っている間)
 var tx=document.getElementById('btRm').innerText;o.holdCtr=/攻撃は以上/.test(tx)&&!/反撃のDRを振る/.test(tx);
 NM_CV.ambStop=1;nmCvRe(NM_CV.n);tx=document.getElementById('btRm').innerText;o.ctrShown=/反撃のDRを振る/.test(tx)||/車両の反撃/.test(tx);var K=nmCvCounterCalc();o.kdrm=K&&K.drm;
 // 車両が不意打ち
 NM_CV.ambStop=0;nmCvAmbSet('v');tx=document.getElementById('btRm').innerText;o.vFirst=/先に車両が反撃/.test(tx)&&!/攻撃するユニット/.test(tx);o.vdrm=nmCvCounterCalc().drm;o.infDrm=nmCvCalc().dl.join(',');
 NM_CV.ambSkip=1;nmCvRe(NM_CV.n);tx=document.getElementById('btRm').innerText;o.infAfterSkip=/攻撃するユニット/.test(tx);
 return o;});
console.log(JSON.stringify(r));console.log('errors',JSON.stringify(e));await b.close();})();
