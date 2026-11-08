// 回復/修理を分けて1画面で(v914)
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1500);
await p.evaluate(async()=>{S.scen=S.scen||{};S.scen.sel='S24';await btEnsureGraph();try{Draw();}catch(x){}await new Promise(r=>setTimeout(r,800));S.turn=S.turn||{};S.turn.phase='rph';nmHqOpen();});
await p.waitForTimeout(500);
const tiles=await p.evaluate(()=>[...document.querySelectorAll('#nmHq button')].map(x=>x.textContent.trim()).filter(t=>/^(回復|修理)/.test(t)));
console.log('tiles',JSON.stringify(tiles));
// 回復
await p.evaluate(()=>{[...document.querySelectorAll('#nmHq button')].filter(x=>/^回復/.test(x.textContent.trim()))[0].click();});await p.waitForTimeout(800);
let t=await p.evaluate(()=>(document.getElementById('btRm')||{}).innerText||'');
console.log('rally panel ok',/国籍/.test(t),/回復するユニットを上で選んでください/.test(t),!/ユニットの選択に戻る/.test(t));
const r1=await p.evaluate(async()=>{var Q=NM_RR,us=nmRrUnits(Q.nat);var iM=us.findIndex(u=>u.kind==='mmc'),iS=us.findIndex(u=>u.kind==='smc');
 nmRrCnt(iM,1);nmRrCnt(iM,1);nmRrCnt(iS,1,0);await new Promise(r=>setTimeout(r,300));var its=nmGeList('_T').items;
 var t=(document.getElementById('btRm')||{}).innerText||'';
 var pid=its.filter(x=>x.kind!=='smc')[0].pid;nmRlDo(Q.n,pid,12);await new Promise(r=>setTimeout(r,300));
 return {n:its.length,broken:its.map(x=>!!x.broken),hasRows:its.filter(x=>x.broken).every(x=>t.indexOf(x.label)>=0),res:Object.keys(NM_RL.res).length,hasDm:/DM/.test(t),ldr:/指揮官/.test(t)};});
console.log('rally',JSON.stringify(r1));
const r1b=await p.evaluate(()=>{var Q=NM_RR,k=nmSuNats();var o=k.filter(x=>x!==Q.nat)[0];if(o)nmRrNat(o);return {nat:NM_RR.nat,items:nmGeList('_T').items.length};});console.log('natSwitch',JSON.stringify(r1b));
// 修理
await p.evaluate(()=>{BtRmClose();NM_RR=null;nmHqOpen();});await p.waitForTimeout(400);
await p.evaluate(()=>{[...document.querySelectorAll('#nmHq button')].filter(x=>/^修理/.test(x.textContent.trim()))[0].click();});await p.waitForTimeout(800);
t=await p.evaluate(()=>(document.getElementById('btRm')||{}).innerText||'');console.log('repair panel',/国籍/.test(t),/修理する車両・砲を上で選んでください|車両・砲はこのシナリオにありません/.test(t));
const r2=await p.evaluate(async()=>{var Q=NM_RR,vs=nmIjVehs(Q.nat);if(!vs.length){var o=nmSuNats().filter(k=>nmIjVehs(k).length)[0];if(o){nmRrNat(o);vs=nmIjVehs(o);}}if(!vs.length)return {skip:1};nmRrVeh(0);await new Promise(r=>setTimeout(r,300));var t=(document.getElementById('btRm')||{}).innerText||'';return {sel:!!NM_RR.v,hasRepairRows:/主砲|機関銃|修理/.test(t),tmp:!!(S_LOS.friendHexes.concat(S_LOS.enemyHexes)).some(x=>x.ccTmp)};});
console.log('repair',JSON.stringify(r2));
console.log('errors',JSON.stringify(e));await b.close();})();
