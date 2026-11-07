// v890: DCのエリート自動・出目を選んでも爆発しない
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657},deviceScaleFactor:2});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S24';S.nmMode='judge';NAVTAB('los');});await p.waitForTimeout(3000);
await p.evaluate(async()=>{await btEnsureGraph();Draw();});await p.waitForTimeout(2500);const P=process.argv[2]||'dce';
for(const [lb,n0] of [['8-3-8[E]',131],['4-4-7[2]',134]]){
console.log(lb,await p.evaluate(([lb,n])=>{var H=nmHexOfNode(n);var slot=nmGeFreeSlot();nmGeAddCore(slot,'GER','mmc',lb);nmGeSync(slot);nmSuDcAdd(slot,nmGeList(slot).items[0].pid);nmSideList('e').push({boardId:H.boardId,col:H.col,row:H.row,grp:slot,st:{}});Draw();nmDcOpen(n,'e');return 'elite='+NM_DC.elite+' '+(document.getElementById('nmDcp').innerText.match(/自動[^\n]*/)||[''])[0];},[lb,n0]));}
await p.screenshot({path:P+'_1.png'});
console.log(await p.evaluate(()=>{var D=NM_DC;nmDcpSet('tem',2);nmDcpPlace();var h=document.getElementById('nmDcp').innerText.replace(/\s+/g,' ');return h.slice(0,200);}));
console.log(await p.evaluate(()=>{var b=[...document.querySelectorAll('#nmDcp button')].find(x=>/^7/.test(x.textContent.trim())&&/nmDsHPick/.test(x.getAttribute('onclick')||''));if(!b)return 'no dice btn';b.click();return 'res after pick='+JSON.stringify(NM_DC.res)+' btn='+document.querySelector('#nmDcp [data-dsk="dcp"]').textContent;}));
await p.screenshot({path:P+'_2.png'});
console.log(JSON.stringify(e));await b.close();})();
