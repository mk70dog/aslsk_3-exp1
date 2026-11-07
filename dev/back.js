const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(2000);
await p.evaluate(async()=>{S.scen=S.scen||{};S.scen.sel='S3';await btEnsureGraph();try{Draw();}catch(x){}await new Promise(r=>setTimeout(r,800));var A=BTG.nodes[131];S_LOS.pxA={x:A.x,y:A.y};});
const st=()=>p.evaluate(()=>['nmRaq','nmDcp','nmCcp','nmCcSc','nmHq','nmIj','btRm'].filter(id=>{var o=document.getElementById(id);return o&&o.style.visibility!=='hidden'&&getComputedStyle(o).display!=='none';}).join(','));
// DC via scenario
await p.evaluate(()=>{nmScOpen('nmDcOpen');var ob=nmSuOb(NM_SC.nat).filter(x=>x.kind==='mmc');NM_SC.cs[ob[0].kind+'|'+ob[0].id]=1;NM_SC.cs['dc|DC']=1;nmScGo();});await p.waitForTimeout(500);
console.log('DC open:',await st());await p.screenshot({path:'bk_dc.png'});
await p.evaluate(()=>nmPanelBack('dc'));await p.waitForTimeout(500);console.log('DC back ->',await st());
// CC via scenario
await p.evaluate(()=>{var s=document.getElementById('nmCcSc');if(s)s.remove();NM_SC=null;nmCcScOpen();var C=NM_CCS;var a=nmSuOb(C.an).filter(x=>x.kind==='mmc');var d=nmSuOb(C.dn).filter(x=>x.kind==='mmc');C.acs[a[0].kind+'|'+a[0].id]=1;C.dcs[d[0].kind+'|'+d[0].id]=1;nmCcScDraw();nmCcScGo();});await p.waitForTimeout(500);
console.log('CC open:',await st());await p.evaluate(()=>nmPanelBack('cc'));await p.waitForTimeout(500);console.log('CC back ->',await st());
// RA via board tile
await p.evaluate(()=>{var s=document.getElementById('nmCcSc');if(s)s.remove();S.turn=S.turn||{};S.turn.phase='mph';nmHqOpen();var x=[...document.querySelectorAll('#nmHq button')].filter(x=>/残留火力/.test(x.textContent))[0];x.click();});await p.waitForTimeout(500);
console.log('RA open:',await st());await p.evaluate(()=>nmPanelBack('ra'));await p.waitForTimeout(500);console.log('RA back ->',await st());
console.log(JSON.stringify(e));await b.close();})();
