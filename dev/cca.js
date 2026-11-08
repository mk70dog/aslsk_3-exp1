// 白兵戦の攻撃を1つずつ指定(v902)のテスト。引数=出力名(png の接頭辞)
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(2000);
await p.evaluate(async()=>{S.scen=S.scen||{};S.scen.sel='S24';await btEnsureGraph();try{Draw();}catch(x){}await new Promise(r=>setTimeout(r,800));S.turn=S.turn||{};S.turn.phase='ccph';nmHqOpen();});
await p.waitForTimeout(600);
await p.evaluate(()=>{var x=[...document.querySelectorAll('#nmHq button')].filter(x=>/^白兵戦/.test(x.textContent.trim()))[0];x.click();});await p.waitForTimeout(600);
const r=await p.evaluate(()=>{var C=NM_CCS;var a=nmSuOb(C.an).filter(x=>x.kind==='mmc'||x.kind==='smc');var d=nmSuOb(C.dn).filter(x=>x.kind==='mmc'||x.kind==='smc');
 a.slice(0,3).forEach(x=>C.acs[x.kind+'|'+x.id]=1);d.slice(0,3).forEach(x=>{C.dcs=C.dcs||{};C.dcs[x.kind+'|'+x.id]=1;});nmCcScDraw();
 S.savedGroups=S.savedGroups||{};S.savedGroups.S24=S.savedGroups.S24||{};GROUP_SLOTS.forEach(function(k){S.savedGroups.S24[k]={pickerNat:C.an,pickerItems:[],sw:[],swOwner:{},latw:[]};}); /* 空き枠に攻撃側の国籍が残った状態(v904) */
 nmCcScGo();
 var Z=nmCcAtkInit();var H0=nmHexOfNode(NM_CC.n),S0=nmCCSides(H0);return {an:C.an,dn:C.dn,sideNat:[nmCcpSideNm(S0.f,'f'),nmCcpSideNm(S0.e,'e')],nf:Z.I.f.length,ne:Z.I.e.length,af:JSON.stringify(Z.A.f),ae:JSON.stringify(Z.A.e),panel:!!document.getElementById('nmCcp')};});
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
const r7=await p.evaluate(()=>{var o={};nmCcaSimple();var Z=nmCcAtkInit(),lab=function(sd,g){return g.map(function(m){return nmCcaLbl(Z.I[sd][m].x);}).join('+');};
 o.g0=nmCcaGroups('f',Z.I.f).map(function(g){return lab('f',g);});
 var si=Z.I.f.findIndex(function(q){return q.x.kind==='smc';});if(si<0){o.nosmc=1;return o;}
 nmCcaPair('f',si);Z=nmCcAtkInit();o.g1=nmCcaGroups('f',Z.I.f).map(function(g){return lab('f',g);});
 nmCcaPair('f',si);Z=nmCcAtkInit();o.g2=nmCcaGroups('f',Z.I.f).map(function(g){return lab('f',g);});
 // 指揮官のチップ(=その組)をタップすると組ごとに外れる/入る
 var gi=nmCcaGroups('e',Z.I.e).filter(function(g){return g.length>1;})[0];if(gi){var A=function(){return JSON.stringify(nmCcAtkInit().A.f[0].t);};o.t0=A();nmCcaTog('f',0,'t',gi[0]);o.t1=A();nmCcaTog('f',0,'t',gi[0]);o.t2=A();}
 return o;});
console.log('groups',JSON.stringify(r7));
console.log('errors',JSON.stringify(e));await b.close();})();
