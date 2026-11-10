// v1038検証: A・Bのカウンター選択(SW割り当て・鹵獲・質の低下・警告・編集で置換)
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1148,height:798},deviceScaleFactor:1.5});const E=[];p.on('pageerror',x=>E.push(String(x)));p.on('console',m=>{if(m.type()==='error')E.push('CON '+m.text().slice(0,160));});
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1000);
const r=await p.evaluate(async()=>{const W=ms=>new Promise(r=>setTimeout(r,ms));S.scen=S.scen||{};S.scen.sel='S24';for(var i=0;i<4;i++){try{Draw();}catch(e){}await W(1500);}await btEnsureGraph();var N=BTG.nodes,id=nm=>N.findIndex(n=>n.nm===nm);var o=[];
try{try{nmModeSet('judge');}catch(e){}await W(1500);var A=N[id('tT9')],B=N[id('tO10')];S_LOS.pxA={x:A.x,y:A.y};S_LOS.pxB={x:B.x,y:B.y};LosRunPixel();await W(4000);nmIjOpen();await W(1500);
var NT=nmSuNats().filter(function(k){return k==='GER';})[0]||nmSuNats()[0];nmIjSet('nat',NT);NM_IJ.cp=1;nmIjDraw();await W(800);
var ob=nmSuOb(NT).filter(function(x){return x.kind!=='afv'&&x.kind!=='gun'&&x.kind!=='veh';});var m=ob.filter(x=>x.kind==='mmc'),sw=ob.filter(x=>x.kind!=='mmc'&&x.kind!=='smc');
nmIjCnt(m[0].kind+'|'+m[0].id,1);nmIjCnt(m[1].kind+'|'+m[1].id,1);nmIjCnt(sw[0].kind+'|'+sw[0].id,1);nmIjCnt(sw[1].kind+'|'+sw[1].id,1);nmIjCnt(sw[2].kind+'|'+sw[2].id,1);await W(400);
o.push('swAs '+!!document.getElementById('swAs')+' warn '+(document.getElementById('swWarn')||{}).textContent);
var k0=nmIjSwList(NT,NM_IJ.cs)[0].key;nmIjAsg(k0,0);await W(300);o.push('asg '+JSON.stringify(NM_IJ.asg));
var red=nmIjRedList(NT)[0];if(red){nmIjCnt(red.key,1);}
nmIjPickDone();await W(1500);var eds=document.querySelectorAll('#nmIj .ijEd');o.push('A edit btns '+eds.length);
var sh=nmIjShooters(NM_IJ.a),eh=sh[NM_IJ.pick].eh;var g0=eh.grp,d0=nmGeList(g0);o.push('A items '+d0.items.length+' sw '+(d0.sw||[]).length+' own '+JSON.stringify(d0.own));
/* 編集→数を変えて決定→置き換え(編成が増えない) */
var nGrp0=[S_LOS.friendHexes,S_LOS.enemyHexes].reduce((a,L)=>a+(L||[]).filter(x=>x&&x.ijTmp&&x.grp).length,0);
nmIjCsEdit();await W(500);o.push('edit cs '+JSON.stringify(NM_IJ.cs)+' asg '+JSON.stringify(NM_IJ.asg));nmIjCnt(m[0].kind+'|'+m[0].id,1);nmIjPickDone();await W(1500);
var nGrp1=[S_LOS.friendHexes,S_LOS.enemyHexes].reduce((a,L)=>a+(L||[]).filter(x=>x&&x.ijTmp&&x.grp).length,0);o.push('tmp grp before/after edit '+nGrp0+'/'+nGrp1);
/* B側 */
var bn=nmSuNats().filter(k=>nmFoeNat(NT,k))[0];nmIjSet('bnat',bn);nmIjSet('bcp',1);await W(600);
var bob=nmSuOb(bn).filter(function(x){return x.kind!=='afv'&&x.kind!=='gun'&&x.kind!=='veh';}),bm=bob.filter(x=>x.kind==='mmc'),bs=bob.filter(x=>x.kind!=='mmc'&&x.kind!=='smc');
nmIjBCnt(bm[0].kind+'|'+bm[0].id,1);nmIjBCnt(bm[1].kind+'|'+bm[1].id,1);bs.slice(0,4).forEach(x=>nmIjBCnt(x.kind+'|'+x.id,1));var cap=nmIjCapList(bn)[0];if(cap)nmIjBCnt(cap.key,1);var rb=nmIjRedList(bn)[0];if(rb)nmIjBCnt(rb.key,1);await W(400);
o.push('B swAs '+!!document.getElementById('swAs')+' warn '+((document.getElementById('swWarn')||{}).textContent||'none'));
nmIjPickDone();await W(1500);var tg=nmIjTgts(),te=tg.filter(x=>x&&x.ijCs)[0];o.push('B tgts '+tg.length+' ijCs '+!!te+' B edit btns '+document.querySelectorAll('#nmIj .ijEd').length);
if(te){var d=nmGeList(te.grp);o.push('B items '+d.items.length+' sw '+(d.sw||[]).length);}
nmIjSet('tgt',tg.indexOf(te));nmIjBCsEdit();await W(500);o.push('B edit cs '+JSON.stringify(NM_IJ.bcs).slice(0,120));nmIjBCnt(bm[0].kind+'|'+bm[0].id,1);nmIjPickDone();await W(1500);
var nB=[S_LOS.friendHexes,S_LOS.enemyHexes].reduce((a,L)=>a+(L||[]).filter(x=>x&&x.ijB).length,0);o.push('ijB markers after B edit '+nB);
}catch(e){o.push('EXC '+String(e)+(e.stack||'').slice(0,300));}return o;});
console.log(JSON.stringify(r,null,1),JSON.stringify(E));await p.waitForTimeout(500);await p.screenshot({path:process.argv[2]+'/v1038-set.png'});await b.close();})();
