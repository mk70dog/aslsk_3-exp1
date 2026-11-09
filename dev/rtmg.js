// 阻止の射程にMGの通常射程を含める(v959)
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const Er=[];p.on('pageerror',x=>Er.push(String(x)));
await p.goto('file://'+__dirname+'/../index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S25';NAVTAB('los');});await p.waitForTimeout(3000);
console.log(JSON.stringify(await p.evaluate(async()=>{await btEnsureGraph();var slot=nmGeFreeSlot();nmGeAddCore(slot,'GER','mmc',nmSuOb('GER').find(x=>x.kind==='mmc').label);nmGeAddCore(slot,'GER','sw','MMG 5-12');var N=BTG.nodes,H=nmHexOfNode(100);var e={boardId:H.boardId,col:H.col,row:H.row,grp:slot,veh:null,gun:null};S_LOS.enemyHexes=S_LOS.enemyHexes||[];nmSideList('e').push(e);
 var NR=NM_RTM;NM_RTM=null;var E=nmRtEnemies('f').filter(q=>q.eh===e);var o={items:nmGeList(slot).items.map(x=>x.kind+':'+x.label),rng:E[0]&&E[0].rng};
 nmGeList(slot).items.forEach(x=>{if(x.kind==='mmc')x.broken=true;});o.rngBroken=nmRtEnemies('f').filter(q=>q.eh===e)[0].rng;NM_RTM=NR;return o;})));console.log('err',Er.length);await b.close();})();
