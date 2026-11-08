// 不意打ち成功時は先攻→結果反映→後攻(生き残りだけ)(v906)のテスト。引数=png接頭辞(任意)
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(2000);
await p.evaluate(async()=>{S.scen=S.scen||{};S.scen.sel='S24';await btEnsureGraph();try{Draw();}catch(x){}await new Promise(r=>setTimeout(r,800));S.turn=S.turn||{};S.turn.phase='ccph';nmHqOpen();});
await p.waitForTimeout(600);
await p.evaluate(()=>{var x=[...document.querySelectorAll('#nmHq button')].filter(x=>/^白兵戦/.test(x.textContent.trim()))[0];x.click();});await p.waitForTimeout(600);
async function open(){return p.evaluate(()=>{var C=NM_CCS;var a=nmSuOb(C.an).filter(x=>x.kind==='mmc'||x.kind==='smc');var d=nmSuOb(C.dn).filter(x=>x.kind==='mmc'||x.kind==='smc');C.acs={};C.dcs={};a.slice(0,3).forEach(x=>C.acs[x.kind+'|'+x.id]=1);d.slice(0,3).forEach(x=>C.dcs[x.kind+'|'+x.id]=1);nmCcScDraw();nmCcScGo();nmCcpDraw();var Z=nmCcAtkInit();return {nf:Z.I.f.length,ne:Z.I.e.length};});}
await open();
const r1=await p.evaluate(()=>{var C=NM_CC;var t0=document.getElementById('nmCcp').innerText;var had=/林・建物へ突撃して白兵戦/.test(t0);console.log('T0',t0.slice(0,300).replace(/\n/g,'/'));nmCcaSimple();var Z=nmCcAtkInit();['f','e'].forEach(function(sd){var c=nmCcaCalc(Z,sd,Z.A[sd][0]);nmCcaDrSet(sd,0,c.kill+6>12?12:c.kill+6);});nmCcpApply();var n=C.n,ok=nmCCSides(nmHexOfNode(n)).ok;var mel=!!NM_CCMEL[n];nmCCOpen(n);var t=document.getElementById('nmCcp').innerText;return {t0:t0.slice(0,260),had:had,bothAlive:ok,melFlag:mel,newMel:!!NM_CC.mel,noRow:!/林・建物へ突撃して白兵戦/.test(t),note:/継続中の混戦/.test(t)};});
console.log('continue',JSON.stringify(r1));
const r2=await p.evaluate(()=>{var n=NM_CC.n;nmCcpClose();delete NM_CCMEL[n];nmCCOpen(n);var C=NM_CC;nmCcpAmb('f');nmCcpClose();nmCCOpen(n);var t=document.getElementById('nmCcp').innerText;return {resumed:!!NM_CC.resumed,rowHidden:!/林・建物へ突撃して白兵戦/.test(t)};});
console.log('resume-after-amb',JSON.stringify(r2));
console.log('errors',JSON.stringify(e));await b.close();})();
