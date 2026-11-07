// 車両との白兵戦 3.7/3.8: PAATC要否・+1・不意打ち・OT・原DR2の3つ目
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657},deviceScaleFactor:2});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S25';S.nmMode='judge';NAVTAB('los');});await p.waitForTimeout(3000);
await p.evaluate(async()=>{await btEnsureGraph();S_LOS.friendHexes=[];S_LOS.enemyHexes=[];Draw();});await p.waitForTimeout(2500);const P=process.argv[2]||'ccr';
const hide=()=>p.evaluate(()=>{[...document.querySelectorAll('body *')].filter(x=>x.children.length<3&&/自軍・敵軍を自動|全体マップ/.test(x.textContent)).forEach(x=>{var t=x;while(t.parentElement&&t.parentElement!==document.body)t=t.parentElement;if(t.id!=='btRm')t.style.display='none';});});
console.log(await p.evaluate(()=>{var n=131,H=nmHexOfNode(n);var nat=nmSuNats().filter(k=>nmSuSide(k)==='f')[0];var u=nmSuOb(nat).filter(x=>x.kind==='mmc')[0];var slot=nmGeFreeSlot();nmGeAddCore(slot,nat,'mmc',u.label);nmGeSync(slot);
  nmSideList('f').push({boardId:H.boardId,col:H.col,row:H.row,grp:slot,st:{}});var vid=nmIjVehs(nmSuNats().filter(k=>nmSuSide(k)==='e')[0]).filter(o=>o.kind!=='gun')[0].id;nmSideList('e').push({boardId:H.boardId,col:H.col,row:H.row,veh:vid,facing:0,st:{}});Draw();NM_RM_HEX=H;BT_RM_XY={x:500,y:200};nmCvOpen(n,'f');return document.getElementById('btRm').innerText.replace(/\s+/g,' ').slice(0,600);}));
await hide();await p.screenshot({path:P+'_1.png'});
console.log(await p.evaluate(()=>{NM_CV.noPa=true;NM_CV.amb='i';nmCvRe(NM_CV.n);var R=nmCvCalc();return 'noPa atk='+R.atk.length+' ccv='+R.ccv+' drm='+R.drm+' '+R.dl.join(',');}));
await p.waitForTimeout(300);await hide();await p.screenshot({path:P+'_2.png'});
console.log(await p.evaluate(()=>{var r=Math.random;Math.random=function(){return 0.1;};try{nmCvAtk(NM_CV.n,2);}finally{Math.random=r;}return JSON.stringify(NM_CV.res);}));
await p.waitForTimeout(3300);await p.evaluate(()=>{document.querySelectorAll('[id^=nmResImg],#nmWrq').forEach(x=>x.remove());});await hide();await p.screenshot({path:P+'_3.png'});
console.log(JSON.stringify(e));await b.close();})();
