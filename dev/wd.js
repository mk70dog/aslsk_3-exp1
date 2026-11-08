// 指揮官の負傷dr: オートOFFなら手入力(v912)
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1500);
await p.evaluate(async()=>{S.scen=S.scen||{};S.scen.sel='S24';await btEnsureGraph();});
const r=await p.evaluate(async()=>{S.nmAutoOff=true;var slot=nmGeFreeSlot();var nat=nmSuNats()[0];nmGeAddCore(slot,nat,'smc',nmSuOb(nat).filter(x=>x.kind==='smc')[0].label);var x=nmGeList(slot).items[0],lg=[];var r0=nmCasRed(slot,x,lg);await new Promise(r=>setTimeout(r,100));
 var shown=!!document.getElementById('nmWd'),pend=NM_WPEND.length,noRoll=!x.wounded&&nmGeList(slot).items.length===1;NM_CC={n:0,log:lg.slice(),applied:false};
 nmWdDo(3);var after={wounded:!!nmGeList(slot).items[0].wounded,closed:!document.getElementById('nmWd'),repl:NM_CC.log.join('')};
 // 5 → eliminated
 var lg2=[];var y=nmGeList(slot).items[0];nmCasRed(slot,y,lg2);await new Promise(r=>setTimeout(r,100));nmWdDo(4);var gone=nmGeList(slot).items.length===0;
 S.nmAutoOff=false;var slot2=nmGeFreeSlot();nmGeAddCore(slot2,nat,'smc',nmSuOb(nat).filter(x=>x.kind==='smc')[0].label);var z=nmGeList(slot2).items[0],lg3=[];nmCasRed(slot2,z,lg3);var autoNoPend=NM_WPEND.length===0&&/負傷|除去/.test(lg3.join(''));
 return {r0:r0,shown:shown,pend:pend,noRoll:noRoll,after:after,gone:gone,autoNoPend:autoNoPend};});
console.log(JSON.stringify(r));console.log('errors',JSON.stringify(e));await b.close();})();
