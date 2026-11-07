const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const E=[];p.on('pageerror',x=>E.push('PAGE '+String(x).slice(0,200)));p.on('console',m=>{if(m.type()==='error')E.push('CON '+m.text().slice(0,200));});
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(2000);
const step=async(nm,fn,arg)=>{const n0=E.length;let r='';try{r=await p.evaluate(fn,arg);}catch(x){r='EXC '+String(x).slice(0,200);}await p.waitForTimeout(500);console.log((E.length>n0?'✗ ':'○ ')+nm+' : '+String(r).slice(0,260)+(E.length>n0?' | '+E.slice(n0).join(' / '):''));};
await step('mode',()=>nmModeNow()+' scen='+(S.scen&&S.scen.sel));
await step('setup',async()=>{S.scen=S.scen||{};S.scen.sel='S3';await btEnsureGraph();Draw();await new Promise(r=>setTimeout(r,600));return 'ok';});
const setAB=async(a,bn)=>p.evaluate(async([a,bn])=>{try{nmIjClose();}catch(x){}S_LOS.friendHexes.length=0;S_LOS.enemyHexes.length=0;var A=BTG.nodes[a],B=BTG.nodes[bn];S_LOS.pxA={x:A.x,y:A.y};S_LOS.pxB={x:B.x,y:B.y};LosRunPixel();await new Promise(r=>setTimeout(r,500));nmIjOpen();return !!NM_IJ;},[a,bn]);
const dice=async()=>p.evaluate(async()=>{nmIjGo();await new Promise(r=>setTimeout(r,800));document.querySelectorAll('[id*=esImg],[class*=esImg]').forEach(x=>x.remove());var t=(document.getElementById('ijRes')||{}).innerText||'';var m=document.getElementById('nmMfMiss');if(m){var s=m.innerText;m.remove();return 'BLOCK '+s.replace(/\s+/g,' ');}return t.replace(/\s+/g,' ').slice(-230);});
// 1 infantry vs infantry
await setAB(131,134);
await step('歩兵→歩兵 編成',()=>{nmIjSet('nat','GER');nmIjSet('cp',1);var ob=nmSuOb('GER');nmIjCnt('mmc|'+ob.filter(x=>x.kind==='mmc')[0].id,2);nmIjPlaceNow();var J=NM_IJ;J.eb=1;J.bnat='USA';nmIjSet('bcp',1);var bo=nmSuOb('USA').filter(x=>x.kind==='mmc');nmIjBCnt(bo[0].kind+'|'+bo[0].id,1);nmIjBPutCs();return 'pick='+NM_IJ.pick+' tgt='+NM_IJ.tgt;});
for(const ph of ['pfph','dff','dfph','afph']){await step('歩兵 '+ph,async(ph)=>{nmIjSet('ph',ph);await new Promise(r=>setTimeout(r,500));return '';},ph);console.log('   → '+await dice());}
await step('MC全員',()=>{var b=[...document.querySelectorAll('#ijRes button,#ijRes .rmIt')].filter(x=>/全員の士気チェックを振る/.test(x.textContent))[0];if(b){b.click();return 'clicked';}return 'no MC';});
// 2 vehicle vs vehicle
await setAB(131,133);
await step('主砲→車両',()=>{var v=AFV_DATA.filter(x=>(x.nat||'').split('/')[0]==='GER'&&x.ma&&nmAfvTurret(x))[0],t=AFV_DATA.filter(x=>(x.nat||'').split('/')[0]==='USA'&&x.ma)[0];NM_RM_HEX=nmHexOfN(NM_IJ.a);nmRmSetVeh(NM_IJ.a,v.id,'f');NM_RM_HEX=nmHexOfN(NM_IJ.b);nmRmSetVeh(NM_IJ.b,t.id,'e');BtRmClose();NM_FACE=null;nmIjOpen();return 'pick='+NM_IJ.pick;});
console.log('   TH → '+await dice());console.log('   TK → '+await dice());
await step('撃破確認',()=>{var q=document.getElementById('nmWrQ');if(q){document.getElementById('nmWrQk').click();return 'dialog→残す';}return 'no dialog';});
// 3 vehicle MG vs infantry
await setAB(131,134);
await step('車載機銃→歩兵',()=>{var v=AFV_DATA.filter(x=>(x.nat||'').split('/')[0]==='GER'&&x.ma&&nmVmKeys(x).length)[0];NM_RM_HEX=nmHexOfN(NM_IJ.a);nmRmSetVeh(NM_IJ.a,v.id,'f');BtRmClose();NM_FACE=null;nmIjOpen();var sh=nmIjShooters(NM_IJ.a);var i=sh.findIndex(o=>o.mode==='vm');nmIjSet('pick',i);var J=NM_IJ;J.eb=1;J.bnat='USA';nmIjSet('bcp',1);var bo=nmSuOb('USA').filter(x=>x.kind==='mmc');nmIjBCnt(bo[0].kind+'|'+bo[0].id,1);nmIjBPutCs();return sh.map(o=>o.mode+':'+o.nm).join(',')+' pick='+i;});
console.log('   → '+await dice());
// 4 gun HE vs infantry
await setAB(131,134);
await step('砲→歩兵',()=>{var g=GUN_DATA.filter(x=>(x.nat||'').split('/')[0]==='GER'&&x.gs)[0];NM_RM_HEX=nmHexOfN(NM_IJ.a);nmRmSetGun(NM_IJ.a,g.id,'f');BtRmClose();NM_FACE=null;nmIjOpen();var J=NM_IJ;J.eb=1;J.bnat='USA';nmIjSet('bcp',1);var bo=nmSuOb('USA').filter(x=>x.kind==='mmc');nmIjBCnt(bo[0].kind+'|'+bo[0].id,1);nmIjBPutCs();return 'pick='+NM_IJ.pick+' gun='+g.id;});
console.log('   → '+await dice());console.log('   → '+await dice());
// 5 LATW: infantry with bazooka vs vehicle
await setAB(131,133);
await step('対戦車兵器→車両',()=>{var t=AFV_DATA.filter(x=>(x.nat||'').split('/')[0]==='GER'&&x.ma)[0];nmIjSet('nat','USA');nmIjSet('cp',1);var ob=nmSuOb('USA');var bz=ob.filter(x=>/BAZ|バズ|LATW|latw/i.test(x.label+x.kind+x.id));nmIjCnt('mmc|'+ob.filter(x=>x.kind==='mmc')[0].id,1);if(bz[0])nmIjCnt(bz[0].kind+'|'+bz[0].id,1);nmIjPlaceNow();NM_RM_HEX=nmHexOfN(NM_IJ.b);nmRmSetVeh(NM_IJ.b,t.id,'e');BtRmClose();NM_FACE=null;nmIjDraw();var sh=nmIjShooters(NM_IJ.a);return 'ob='+ob.map(x=>x.kind+':'+x.label).join(',')+' sh='+sh.map(o=>o.mode+':'+o.nm).join(',');});
await step('LW pick',()=>{var sh=nmIjShooters(NM_IJ.a);var i=sh.findIndex(o=>o.mode==='lw');if(i<0)return 'no lw';nmIjSet('pick',i);return 'pick '+i;});
console.log('   → '+await dice());console.log('   → '+await dice());
// 6 judge board & main menu
await step('判定ボード',()=>{try{nmIjClose();}catch(x){}nmHqOpen();return !!document.getElementById('nmHq');});
await step('メインメニュー',()=>{var hq=document.getElementById('nmHq');if(hq)hq.remove();var b=[...document.querySelectorAll('button')].filter(x=>(x.getAttribute('onclick')||'').indexOf('nmFtMenu(')>=0)[0];if(b)b.click();return !!document.getElementById('nmFtMn');});
// 7 old tabs open
for(const t of ['fire','gun','afv','latw','mc','aphcc','rally']){await step('旧タブ '+t,(t)=>{var m=document.getElementById('nmFtMn');if(m)m.remove();try{NAVTAB(t);}catch(x){return 'EXC '+x;}return S.tab||'';},t);}
await p.evaluate(()=>NAVTAB('los'));
console.log('TOTAL errors: '+E.length);await b.close();})();
