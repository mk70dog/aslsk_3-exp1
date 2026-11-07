// 車両との白兵戦: PAATC と攻撃を出目を選んで判定
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657},deviceScaleFactor:2});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S25';S.nmMode='judge';NAVTAB('los');});await p.waitForTimeout(3000);
await p.evaluate(async()=>{await btEnsureGraph();S_LOS.friendHexes=[];S_LOS.enemyHexes=[];Draw();});await p.waitForTimeout(2500);const P=process.argv[2]||'cvp';
const hide=()=>p.evaluate(()=>{[...document.querySelectorAll('body *')].filter(x=>x.children.length<3&&/自軍・敵軍を自動|全体マップ/.test(x.textContent)).forEach(x=>{var t=x;while(t.parentElement&&t.parentElement!==document.body)t=t.parentElement;if(t.id!=='btRm')t.style.display='none';});});
console.log(await p.evaluate(()=>{var n=131,H=nmHexOfNode(n);var nat=nmSuNats().filter(k=>nmSuSide(k)==='f')[0];var u=nmSuOb(nat).filter(x=>x.kind==='mmc')[0];var slot=nmGeFreeSlot();nmGeAddCore(slot,nat,'mmc',u.label);nmGeSync(slot);
  nmSideList('f').push({boardId:H.boardId,col:H.col,row:H.row,grp:slot,st:{}});var vid=nmIjVehs(nmSuNats().filter(k=>nmSuSide(k)==='e')[0]).filter(o=>o.kind!=='gun')[0].id;nmSideList('e').push({boardId:H.boardId,col:H.col,row:H.row,veh:vid,facing:0,st:{}});Draw();NM_RM_HEX=H;BT_RM_XY={x:500,y:200};nmCvOpen(n,'f');return document.getElementById('btRm').innerText.replace(/\s+/g,' ').slice(0,400);}));
await hide();await p.screenshot({path:P+'_1.png'});
console.log(await p.evaluate(()=>{var b=[...document.querySelectorAll('#btRm button')].find(x=>x.textContent.trim()==='5'&&/cvpa/.test(x.getAttribute('onclick')||''));if(!b)return 'no';b.click();var g=[...document.querySelectorAll('#btRm button')].find(x=>/PAATCを判定/.test(x.textContent));var l=g.textContent;var pa0=JSON.stringify(NM_CV.pa);g.click();return 'before='+pa0+' lbl='+l+' after='+JSON.stringify(NM_CV.pa);}));
await p.waitForTimeout(400);await hide();await p.screenshot({path:P+'_2.png'});
console.log(await p.evaluate(()=>{var b=[...document.querySelectorAll('#btRm button')].find(x=>/^4/.test(x.textContent.trim())&&/cvatk/.test(x.getAttribute('onclick')||''));if(!b)return 'no atk';b.click();var r0=JSON.stringify(NM_CV.res);var g=[...document.querySelectorAll('#btRm button')].find(x=>/攻撃を判定/.test(x.textContent));var l=g.textContent;g.click();return 'before='+r0+' lbl='+l+' res='+JSON.stringify(NM_CV.res).slice(0,200);}));
await p.waitForTimeout(3300);await p.evaluate(()=>{document.querySelectorAll('[id^=nmResImg]').forEach(x=>x.remove());});await hide();await p.screenshot({path:P+'_3.png'});
console.log(JSON.stringify(e));await b.close();})();
