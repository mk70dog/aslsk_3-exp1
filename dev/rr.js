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
console.log('rally panel ok',/国籍/.test(t),/回復するユニットを選んでください/.test(t),/クラス低下|半減/.test(t));
const r1=await p.evaluate(async()=>{var Q=NM_RR,sleep=ms=>new Promise(r=>setTimeout(r,ms)),out={};
 var G=nmRrGroups(Q.nat);out.groups=[G.base.length,G.elr.length,G.cas.length];
 nmRrPick('mmc',G.base[0]);await sleep(300);var t=(document.getElementById('btRm')||{}).innerText||'';out.sel=Q.sel&&Q.sel.label===G.base[0];out.n1=nmGeList('_T').items.length;
 out.rows=/③ 回復のしかた/.test(t)&&/④ 林・建物内/.test(t)&&/DM状態/.test(t)&&/以下で回復/.test(t)&&/⑤ 判定/.test(t);
 var m0=/DR (\d+) 以下/.exec(t);out.thr0=m0&&+m0[1];nmRrTer(1);await sleep(200);t=document.getElementById('btRm').innerText;out.thrTer=+(/DR (\d+) 以下/.exec(t)||[])[1];
 nmRlSet(Q.n,'dm',true);await sleep(200);t=document.getElementById('btRm').innerText;out.thrDm=+(/DR (\d+) 以下/.exec(t)||[])[1];nmRlSet(Q.n,'dm',false);nmRrTer(0);
 nmRrModeSet('self');await sleep(200);out.self=nmGeList('_T').items.length;t=document.getElementById('btRm').innerText;out.thrSelf=+(/DR (\d+) 以下/.exec(t)||[])[1];
 var pid=nmGeList('_T').items[0].pid;nmRlDo(Q.n,pid,2+4);await sleep(300);out.res=Object.keys(NM_RL.res).length;
 nmRrPick('mmc',G.base[0]);await sleep(200);out.single=nmGeList('_T').items.length;
 var sm=nmRrUnits(Q.nat).filter(u=>u.kind==='smc')[0];if(sm){nmRrPick('smc',sm.label);await sleep(200);out.smc=nmGeList('_T').items.length;}
 return out;});
console.log('rally',JSON.stringify(r1));
const r1b=await p.evaluate(()=>{var Q=NM_RR,k=nmSuNats();var o=k.filter(x=>x!==Q.nat)[0];if(o)nmRrNat(o);return {nat:NM_RR.nat,items:nmGeList('_T').items.length};});console.log('natSwitch',JSON.stringify(r1b));
// 修理
await p.evaluate(()=>{BtRmClose();NM_RR=null;nmHqOpen();});await p.waitForTimeout(400);
await p.evaluate(()=>{[...document.querySelectorAll('#nmHq button')].filter(x=>/^修理/.test(x.textContent.trim()))[0].click();});await p.waitForTimeout(800);
t=await p.evaluate(()=>(document.getElementById('btRm')||{}).innerText||'');console.log('repair panel',/国籍/.test(t),/修理する車両・砲を上で選んでください|車両・砲はこのシナリオにありません/.test(t));
const r2=await p.evaluate(async()=>{var Q=NM_RR,vs=nmIjVehs(Q.nat);if(!vs.length){var o=nmSuNats().filter(k=>nmIjVehs(k).length)[0];if(o){nmRrNat(o);vs=nmIjVehs(o);}}if(!vs.length)return {skip:1};nmRrVeh(0);await new Promise(r=>setTimeout(r,300));var t=(document.getElementById('btRm')||{}).innerText||'';return {sel:!!NM_RR.v,hasRepairRows:/主砲|機関銃|修理/.test(t),tmp:!!(S_LOS.friendHexes.concat(S_LOS.enemyHexes)).some(x=>x.ccTmp)};});
console.log('repair',JSON.stringify(r2));
console.log('errors',JSON.stringify(e));await b.close();})();
