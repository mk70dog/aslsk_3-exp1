// 爆薬 4.3: 車両に先に宣言・PAATC・置いた面・位置DR・TK
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657},deviceScaleFactor:2});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S25';S.nmMode='judge';NAVTAB('los');});await p.waitForTimeout(3000);
await p.evaluate(async()=>{await btEnsureGraph();S_LOS.friendHexes=[];S_LOS.enemyHexes=[];Draw();});await p.waitForTimeout(2500);const P=process.argv[2]||'dcr';
const hide=()=>p.evaluate(()=>{[...document.querySelectorAll('body *')].filter(x=>x.children.length<3&&/自軍・敵軍を自動|全体マップ/.test(x.textContent)).forEach(x=>{var t=x;while(t.parentElement&&t.parentElement!==document.body)t=t.parentElement;if(t.id!=='nmDcp')t.style.display='none';});});
const shot=async(k,bottom)=>{await hide();await p.evaluate((bt)=>{var b=document.querySelector('#nmDcp .dcBox');if(b)b.scrollTop=bt?9999:0;},bottom);await p.screenshot({path:P+'_'+k+'.png'});};
console.log(await p.evaluate(()=>{var n=131,H=nmHexOfNode(n),nb=BTG.nodes[n].nb||[];var t=nb.filter(x=>x!=null&&x>=0)[0];var T0=nmHexOfNode(t);var nat=nmSuNats().filter(k=>nmSuSide(k)==='f')[0];var u=nmSuOb(nat).filter(x=>x.kind==='mmc')[0];var slot=nmGeFreeSlot();nmGeAddCore(slot,nat,'mmc',u.label);nmGeSync(slot);nmSuDcAdd(slot,nmGeList(slot).items[0].pid);
  nmSideList('f').push({boardId:H.boardId,col:H.col,row:H.row,grp:slot,st:{}});var vid=nmIjVehs(nmSuNats().filter(k=>nmSuSide(k)==='e')[0]).filter(o=>o.kind!=='gun')[0].id;nmSideList('e').push({boardId:T0.boardId,col:T0.col,row:T0.row,veh:vid,facing:0,st:{}});Draw();nmDcOpen(n,'f');nmDcpSet('to',t);nmDcpSet('tgtK','veh');nmDcVSel(0);return 'to='+t+' face='+NM_DC.vface+' auto='+NM_DC.vfAuto+' can='+nmDcCanPlace();}));
await shot('1',true);
console.log(await p.evaluate(()=>{var b=[...document.querySelectorAll('#nmDcp button')].find(x=>x.textContent.trim()==='4'&&/dcpa/.test(x.getAttribute('onclick')||''));b.click();document.querySelector('#nmDcp [data-dsk="dcpa"]').click();return 'pa='+JSON.stringify(NM_DC.pa)+' can='+nmDcCanPlace();}));
await shot('2',true);
console.log(await p.evaluate(()=>{nmDcpPlace();var eh=nmDcEh();return 'placed='+JSON.stringify(eh&&eh.dcPlaced);}));
await shot('3',false);await shot('3b',true);
console.log(await p.evaluate(()=>{NM_DC.vr={a:2,b:5};nmDcpDraw();var drm=0;var bt=[...document.querySelectorAll('#nmDcp button')].find(x=>/位置DRを判定/.test(x.textContent));bt.click();return 'pos='+JSON.stringify(NM_DC.vr&&NM_DC.vr.pos);}));
await shot('4',true);
console.log(await p.evaluate(()=>{var b=[...document.querySelectorAll('#nmDcp button')].find(x=>/^6/.test(x.textContent.trim())&&/'dcv'/.test(x.getAttribute('onclick')||''));if(b){b.click();document.querySelector('#nmDcp [data-dsk="dcv"]').click();}else{var g=[...document.querySelectorAll('#nmDcp button')].find(x=>/結果へ/.test(x.textContent));g&&g.click();}return 'res='+JSON.stringify(NM_DC.res);}));
await p.waitForTimeout(3200);await p.evaluate(()=>{document.querySelectorAll('[id^=nmResImg]').forEach(x=>x.remove());});await shot('5',false);
console.log(JSON.stringify(e));await b.close();})();
