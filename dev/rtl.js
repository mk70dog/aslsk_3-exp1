// 潰走: 一緒に潰走する指揮官(修正・失敗で除去)、阻止NMCの出目 2〜12
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657},deviceScaleFactor:2});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S24';S.nmMode='judge';NAVTAB('los');});await p.waitForTimeout(3000);const P=process.argv[2]||'rtl';
console.log(await p.evaluate(async()=>{await btEnsureGraph();S_LOS.friendHexes=[];S_LOS.enemyHexes=[];var n=131,H=nmHexOfNode(n);var slot=nmGeFreeSlot();nmGeAddCore(slot,'GER','mmc','4-4-7[2]');nmGeAddCore(slot,'GER','smc','8-0');nmGeSync(slot);var its=nmGeList(slot).items;its[0].broken=true;nmSideList('f').push({boardId:H.boardId,col:H.col,row:H.row,grp:slot,st:{}});Draw();
 NM_RM_HEX=H;BT_RM_XY={x:500,y:200};var nb=BTG.nodes[n].nb.filter(x=>x!=null)[0];NM_RT={n:n,sd:'f',slot:slot,done:{slot:slot,to:nb,path:[n,nb],inter:[{n:nb,who:'敵'}],pids:[its[0].pid],mc:{}}};NM_RM_SUB='rout';btRmReopen(n);
 return [...document.querySelectorAll('#btRm button')].map(x=>x.textContent.trim()).join(',');}));
await p.evaluate(()=>{[...document.querySelectorAll('body *')].filter(x=>x.children.length<3&&/自軍・敵軍を自動|全体マップ/.test(x.textContent)).forEach(x=>{var t=x;while(t.parentElement&&t.parentElement!==document.body)t=t.parentElement;if(t.id!=='btRm')t.style.display='none';});});
await p.screenshot({path:P+'_1.png'});
console.log(await p.evaluate(()=>{var its=nmGeList(NM_RT.slot).items,L=its.find(q=>q.kind==='smc');NM_RT.done.ldr=L.pid;nmRtMc(NM_RT.n,its[0].pid,0,9);var r=NM_RT.done.mc[its[0].pid+':0'];return r.t+' left='+nmGeList(NM_RT.slot).items.map(q=>q.label).join(',');}));
await p.waitForTimeout(300);await p.evaluate(()=>{[...document.querySelectorAll('body *')].filter(x=>x.children.length<3&&/自軍・敵軍を自動|全体マップ/.test(x.textContent)).forEach(x=>{var t=x;while(t.parentElement&&t.parentElement!==document.body)t=t.parentElement;if(t.id!=='btRm')t.style.display='none';});});await p.screenshot({path:P+'_2.png'});
console.log(JSON.stringify(e));await b.close();})();
