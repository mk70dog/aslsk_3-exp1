// 白兵戦の攻撃を1つずつ指定(v902)のテスト。引数=出力名(png の接頭辞)
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(2000);
await p.evaluate(async()=>{S.scen=S.scen||{};S.scen.sel='S24';await btEnsureGraph();try{Draw();}catch(x){}await new Promise(r=>setTimeout(r,800));S.turn=S.turn||{};S.turn.phase='ccph';nmHqOpen();});
await p.waitForTimeout(600);
await p.evaluate(()=>{var x=[...document.querySelectorAll('#nmHq button')].filter(x=>/^白兵戦/.test(x.textContent.trim()))[0];x.click();});await p.waitForTimeout(600);
const r=await p.evaluate(()=>{var C=NM_CCS;var a=nmSuOb(C.an).filter(x=>x.kind==='mmc'||x.kind==='smc');var d=nmSuOb(C.dn).filter(x=>x.kind==='mmc'||x.kind==='smc');
 a.slice(0,3).forEach(x=>C.acs[x.kind+'|'+x.id]=1);d.slice(0,3).forEach(x=>{C.dcs=C.dcs||{};C.dcs[x.kind+'|'+x.id]=1;});nmCcScDraw();nmCcScGo();
 var Z=nmCcAtkInit();return {nf:Z.I.f.length,ne:Z.I.e.length,af:JSON.stringify(Z.A.f),ae:JSON.stringify(Z.A.e),panel:!!document.getElementById('nmCcp')};});
console.log('open',JSON.stringify(r));
await p.waitForTimeout(500);await p.screenshot({path:process.argv[2]+'_1default.png'});
const r2=await p.evaluate(()=>{var o={};var Z=nmCcAtkInit();
 // 攻撃を分ける: 攻撃1=自軍0→敵0、攻撃2=自軍1→敵1
 nmCcaTog('f',0,'a',1);nmCcaAdd('f');nmCcaTog('f',1,'a',1);nmCcaTog('f',0,'t',1);nmCcaTog('f',1,'t',1);
 o.split=JSON.stringify(nmCcAtkInit().A.f);
 nmCcaTog('f',1,'a',0);o.dupAtk=JSON.stringify(nmCcAtkInit().A.f[1].a); // 無視される(攻撃1で使用中)
 nmCcaTog('f',1,'t',0);o.dupTgt=JSON.stringify(nmCcAtkInit().A.f[1].t);
 return o;});
console.log('split',JSON.stringify(r2));
await p.waitForTimeout(300);await p.screenshot({path:process.argv[2]+'_2split.png'});
const r3=await p.evaluate(()=>{var o={};nmCcaDrSet('f',0,2);nmCcaDrSet('f',1,12);nmCcaDrSet('e',0,3);
 o.ready=!!document.querySelector('#nmCcp button[onclick="nmCcpApply()"]:not([disabled])');return o;});
console.log('dr',JSON.stringify(r3));
await p.waitForTimeout(300);await p.evaluate(()=>{var o=document.querySelector('#nmCcp .ccpBox');o.scrollTop=560;});await p.waitForTimeout(300);await p.screenshot({path:process.argv[2]+'_3dr.png',fullPage:false});
const r4=await p.evaluate(()=>{var C=NM_CC,H=nmHexOfNode(C.n);var before=nmCCSides(H);var nb={f:nmCCIts(before.f).length,e:nmCCIts(before.e).length};
 nmCcpApply();var after=nmCCSides(H);return {nb:nb,applied:C.applied,log:C.log,promo:Object.keys(C.promo||{}),na:{f:after.f?nmCCIts(after.f).length:0,e:after.e?nmCCIts(after.e).length:0}};});
console.log('apply',JSON.stringify(r4));
await p.waitForTimeout(300);await p.screenshot({path:process.argv[2]+'_4applied.png'});
const r5=await p.evaluate(()=>{nmCcpUndo();return {applied:NM_CC.applied,atk:JSON.stringify(NM_CC.atk.f.length)};});
console.log('undo',JSON.stringify(r5));
const r6=await p.evaluate(()=>{nmCcaSimple();var Z=nmCcAtkInit();return {f:Z.A.f.length,e:Z.A.e.length,a:Z.A.f[0]&&Z.A.f[0].a.length};});
console.log('simple',JSON.stringify(r6));
console.log('errors',JSON.stringify(e));await b.close();})();
