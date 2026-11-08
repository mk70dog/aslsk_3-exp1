// 不意打ち成功時は先攻→結果反映→後攻(生き残りだけ)(v906)のテスト。引数=png接頭辞(任意)
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(2000);
await p.evaluate(async()=>{S.scen=S.scen||{};S.scen.sel='S24';await btEnsureGraph();try{Draw();}catch(x){}await new Promise(r=>setTimeout(r,800));S.turn=S.turn||{};S.turn.phase='ccph';nmHqOpen();});
await p.waitForTimeout(600);
await p.evaluate(()=>{var x=[...document.querySelectorAll('#nmHq button')].filter(x=>/^白兵戦/.test(x.textContent.trim()))[0];x.click();});await p.waitForTimeout(600);
async function open(){return p.evaluate(()=>{var C=NM_CCS;var a=nmSuOb(C.an).filter(x=>x.kind==='mmc'||x.kind==='smc');var d=nmSuOb(C.dn).filter(x=>x.kind==='mmc'||x.kind==='smc');C.acs={};C.dcs={};a.slice(0,3).forEach(x=>C.acs[x.kind+'|'+x.id]=1);d.slice(0,3).forEach(x=>C.dcs[x.kind+'|'+x.id]=1);nmCcScDraw();nmCcScGo();nmCcpDraw();var Z=nmCcAtkInit();return {nf:Z.I.f.length,ne:Z.I.e.length};});}
await open();
const r1=await p.evaluate(()=>{var C=NM_CC;nmCcaSimple();var Z=nmCcAtkInit();var c=nmCcaCalc(Z,'f',Z.A.f[0]);nmCcaDrSet('f',0,c.kill+2>12?12:c.kill+2);c=nmCcaCalc(Z,'e',Z.A.e[0]);nmCcaDrSet('e',0,c.kill+2>12?12:c.kill+2);nmCcpApply();
 var k=NM_CCCARRY;return {applied:C.applied,carry:!!k,f:k&&k.f.items.map(x=>x.label+(x.broken?'B':'')),e:k&&k.e.items.map(x=>x.label+(x.broken?'B':'')),melFlag:Object.keys(NM_CCMEL).length};});
console.log('apply',JSON.stringify(r1));
const r2=await p.evaluate(()=>{nmCcpClose();nmCcScOpen();var t=document.getElementById('nmCcSc').innerText;var shown=/前回の白兵戦の続き/.test(t);nmCcCarryGo();var C=NM_CC;var t2=document.getElementById('nmCcp').innerText;var S0=nmCCSides(nmHexOfNode(C.n));return {shown:shown,mel:C.mel,noAmbUI:!/林・建物へ突撃して白兵戦/.test(t2)&&/継続中の混戦/.test(t2),fn:nmCCIts(S0.f).map(q=>q.x.label+(q.x.broken?'B':'')),en:nmCCIts(S0.e).map(q=>q.x.label+(q.x.broken?'B':''))};});
console.log('carry',JSON.stringify(r2));
const r3=await p.evaluate(()=>{nmCcpClose();nmCcScOpen();nmCcCarryClear();var t=document.getElementById('nmCcSc').innerText;return {gone:!/前回の白兵戦の続き/.test(t),carry:!!NM_CCCARRY};});
console.log('clear',JSON.stringify(r3));
console.log('errors',JSON.stringify(e));await b.close();})();
