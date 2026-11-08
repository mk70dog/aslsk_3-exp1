// PAATC(歩兵が車両へ)タイル・車両が敵AFVへ突入タイル(v916)
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1500);
await p.evaluate(async()=>{S.scen=S.scen||{};S.scen.sel='S24';await btEnsureGraph();try{Draw();}catch(x){}await new Promise(r=>setTimeout(r,800));S.turn=S.turn||{};S.turn.phase='aph';nmHqOpen();});
await p.waitForTimeout(500);
console.log('tiles',JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll('#nmHq button')].map(x=>x.textContent.trim()).filter(t=>/PAATC|突入|停止|車両が敵/.test(t)))));
await p.evaluate(()=>{[...document.querySelectorAll('#nmHq button')].filter(x=>/PAATC/.test(x.textContent))[0].click();});await p.waitForTimeout(800);
let t=await p.evaluate(()=>(document.getElementById('btRm')||{}).innerText||'');
console.log('pa panel',/突入するMMC/.test(t),/指揮官/.test(t),/上でMMCを選ぶと/.test(t));
const r1=await p.evaluate(async()=>{nmPaAdd(0);nmPaAdd(0);await new Promise(r=>setTimeout(r,300));var t1=(document.getElementById('btRm')||{}).innerText||'';nmPaDo(0,'ok');await new Promise(r=>setTimeout(r,200));nmPaDo(1,12);await new Promise(r=>setTimeout(r,200));var L=nmPaLdrs();if(L.length)nmPaLdr(0);await new Promise(r=>setTimeout(r,200));
 var t2=(document.getElementById('btRm')||{}).innerText||'';return {n:NM_PA.list.length,rows:/PAATCを判定/.test(t1),ldrs:L.length,res:NM_PA.list.map(x=>x.res&&x.res.ok),t2:/合格|失敗/.test(t2)};});
console.log('pa',JSON.stringify(r1));
await p.evaluate(()=>{BtRmClose();NM_PA=null;nmHqOpen();});await p.waitForTimeout(400);
await p.evaluate(()=>{[...document.querySelectorAll('#nmHq button')].filter(x=>/車両が敵/.test(x.textContent))[0].click();});await p.waitForTimeout(800);
t=await p.evaluate(()=>(document.getElementById('btRm')||{}).innerText||'');console.log('ve panel',/入る車両/.test(t),/敵のAFV/.test(t),/結果が出ます/.test(t));
const r2=await p.evaluate(async()=>{var V=NM_VE,res=[];var all=[];nmSuNats().forEach(k=>nmIjVehs(k).filter(v=>v.kind==='veh').forEach(v=>all.push({k:k,id:v.id})));
 for(var a of all.slice(0,6))for(var tg of all.slice(0,6)){if(a.k===tg.k)continue;V.vnat=a.k;V.tnat=tg.k;V.v=a.id;V.t=tg.id;for(var f of ['front','side','rear']){V.face=f;var R=nmVeCalc();res.push([a.id,tg.id,f,R&&R.ok,R&&R.rows.length]);}}
 if(res.length){var last=res[res.length-1];V.v=last[0];}
 nmVeRe();await new Promise(r=>setTimeout(r,300));var t=(document.getElementById('btRm')||{}).innerText||'';return {n:res.length,sample:res.slice(0,6),txt:/停止できる|停止できない/.test(t),rowsTxt:/TK#/.test(t)};});
console.log('ve',JSON.stringify(r2));
console.log('errors',JSON.stringify(e));await b.close();})();
