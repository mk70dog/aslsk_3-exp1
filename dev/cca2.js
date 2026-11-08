// 不意打ち成功時は先攻→結果反映→後攻(生き残りだけ)(v906)のテスト。引数=png接頭辞(任意)
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(2000);
await p.evaluate(async()=>{S.scen=S.scen||{};S.scen.sel='S24';await btEnsureGraph();try{Draw();}catch(x){}await new Promise(r=>setTimeout(r,800));S.turn=S.turn||{};S.turn.phase='ccph';nmHqOpen();});
await p.waitForTimeout(600);
await p.evaluate(()=>{var x=[...document.querySelectorAll('#nmHq button')].filter(x=>/^白兵戦/.test(x.textContent.trim()))[0];x.click();});await p.waitForTimeout(600);
async function open(){return p.evaluate(()=>{var C=NM_CCS;var a=nmSuOb(C.an).filter(x=>x.kind==='mmc'||x.kind==='smc');var d=nmSuOb(C.dn).filter(x=>x.kind==='mmc'||x.kind==='smc');C.acs={};C.dcs={};a.slice(0,3).forEach(x=>C.acs[x.kind+'|'+x.id]=1);d.slice(0,3).forEach(x=>C.dcs[x.kind+'|'+x.id]=1);nmCcScDraw();nmCcScGo();NM_CC.amb='f';nmCcpDraw();var Z=nmCcAtkInit();return {nf:Z.I.f.length,ne:Z.I.e.length};});}
console.log('open',JSON.stringify(await open()));
const t=await p.evaluate(()=>document.getElementById('nmCcp').innerText);
console.log('stage1 text ok:',/先攻/.test(t)&&/後攻/.test(t)&&/先攻の結果を反映/.test(t));
if(process.argv[2])await p.screenshot({path:process.argv[2]+'_1first.png'});
// 先攻(自軍)のDR=3(1:2 DRM-1-1 ... 損耗以下)→結果が出る。後攻DRはまだ入れられない
const r1=await p.evaluate(()=>{var Z0=nmCcAtkInit(),c0=nmCcaCalc(Z0,'f',Z0.A.f[0]);nmCcaDrSet('f',0,c0.kill-c0.drm);var C=NM_CC;var nb=nmCCIts(nmCCSides(nmHexOfNode(C.n)).e).length;nmCcpApply();return {nb:nb,a1done:C.a1done,applied:C.applied,log1:C.log1,ne:nmCCIts(nmCCSides(nmHexOfNode(C.n)).e||{list:[]}).length,atkF:C.atk.f.length,atkE:C.atk.e.length,eA:C.atk.e[0]&&C.atk.e[0].a.length,eT:C.atk.e[0]&&C.atk.e[0].t.length};});
console.log('after first',JSON.stringify(r1));
if(process.argv[2])await p.screenshot({path:process.argv[2]+'_2second.png'});
const t2=await p.evaluate(()=>document.getElementById('nmCcp').innerText);
console.log('stage2 text ok:',/解決済/.test(t2)&&/後攻の結果を反映|後攻のDR/.test(t2));
const r2=await p.evaluate(()=>{var C=NM_CC;nmCcaDrSet('e',0,12);nmCcpApply();return {applied:C.applied,log:C.log};});
console.log('after second',JSON.stringify(r2));
const r3=await p.evaluate(()=>{nmCcpUndo();var C=NM_CC;return {a1done:C.a1done,applied:C.applied};});
console.log('undo',JSON.stringify(r3));
// 非不意打ちは従来どおり同時
const r4=await p.evaluate(()=>{var C=NM_CC;C.amb=null;C.a1done=false;nmCcaSimple();nmCcaDrSet('f',0,12);nmCcaDrSet('e',0,12);nmCcpApply();return {applied:C.applied,log:C.log};});
console.log('simultaneous',JSON.stringify(r4));
console.log('errors',JSON.stringify(e));await b.close();})();
