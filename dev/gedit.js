// v1042検証: 編成の準備で作った編成(ijCs なし)の「✎ 編集」→中身を読み込み→決定で同じ枠を作り直す
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1148,height:798},deviceScaleFactor:1.5});const E=[];p.on('pageerror',x=>E.push(String(x)));p.on('console',m=>{if(m.type()==='error')E.push('CON '+m.text().slice(0,160));});
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1000);
const r=await p.evaluate(async()=>{const W=ms=>new Promise(r=>setTimeout(r,ms));S.scen=S.scen||{};S.scen.sel='S24';for(var i=0;i<4;i++){try{Draw();}catch(e){}await W(1500);}await btEnsureGraph();var N=BTG.nodes,id=nm=>N.findIndex(n=>n.nm===nm);var o=[];
try{try{nmModeSet('judge');}catch(e){}await W(1500);var A=N[id('tT9')],B=N[id('tO10')];S_LOS.pxA={x:A.x,y:A.y};S_LOS.pxB={x:B.x,y:B.y};LosRunPixel();await W(4000);nmIjOpen();await W(1500);
var NT=nmSuNats().filter(k=>k==='GER')[0]||nmSuNats()[0];nmIjSet('nat',NT);NM_IJ.cp=1;nmIjDraw();await W(800);
var ob=nmSuOb(NT).filter(x=>x.kind!=='afv'&&x.kind!=='gun'&&x.kind!=='veh');var m=ob.filter(x=>x.kind==='mmc'),sw=ob.filter(x=>x.kind!=='mmc'&&x.kind!=='smc');
nmIjCnt(m[0].kind+'|'+m[0].id,1);nmIjCnt(m[1].kind+'|'+m[1].id,1);nmIjCnt(sw[0].kind+'|'+sw[0].id,1);nmIjCnt(sw[1].kind+'|'+sw[1].id,1);
var k0=nmIjSwList(NT,NM_IJ.cs)[0].key;nmIjAsg(k0,1);
nmIjPickDone();await W(1500);
var eh=nmIjShooters(NM_IJ.a)[NM_IJ.pick].eh,g0=eh.grp;
/* 登録して置く → ijCs なしの「編成の準備」相当 */
nmIjRegOpen('a');await W(300);nmIjReg('a','place');await W(1500);
var sh=nmIjShooters(NM_IJ.a),ix=sh.findIndex(x=>x.eh&&x.eh.grp&&!x.eh.ijCs);o.push('prep tile idx '+ix);
var eds=[].slice.call(document.querySelectorAll('#nmIj .ijEd')).map(e=>e.textContent.trim());o.push('btns '+JSON.stringify(eds));
var eh2=sh[ix].eh,slot=eh2.grp,d0=nmGeList(slot);o.push('slot '+slot+' items '+d0.items.length+' sw '+(d0.sw||[]).length+' own '+JSON.stringify(d0.own));
nmIjSet('pick',ix);nmIjGrpEdit('a');await W(600);o.push('edit cs '+JSON.stringify(NM_IJ.cs)+' asg '+JSON.stringify(NM_IJ.asg)+' cp '+NM_IJ.cp);
nmIjCnt(m[0].kind+'|'+m[0].id,1);
var fb=[].slice.call(document.querySelectorAll('#nmIj button')).map(e=>e.textContent.trim()).filter(t=>/保存|更新/.test(t));o.push('footer '+JSON.stringify(fb));
var slots0=GROUP_SLOTS.filter(k=>(nmGeList(k).items||[]).length).join(',');nmIjGrpSaveAs();await W(800);var slots1=GROUP_SLOTS.filter(k=>(nmGeList(k).items||[]).length).join(',');o.push('saveAs slots '+slots0+' -> '+slots1+' cp '+NM_IJ.cp+' origItems '+nmGeList(slot).items.length);
nmIjSet('pick',nmIjShooters(NM_IJ.a).findIndex(x=>x.eh&&x.eh.grp===slot));nmIjGrpEdit('a');await W(600);nmIjCnt(m[0].kind+'|'+m[0].id,1);nmIjPickDone();await W(1500);
var sh2=nmIjShooters(NM_IJ.a),eh3=(sh2.find(x=>x.eh&&x.eh.grp===slot)||{}).eh,d1=nmGeList(slot);o.push('after: marker kept '+!!eh3+' items '+d1.items.length+' sw '+(d1.sw||[]).length+' own '+JSON.stringify(d1.own)+' cp '+NM_IJ.cp);
/* B側 */
var bn=nmSuNats().filter(k=>nmFoeNat(NT,k))[0];nmIjSet('bnat',bn);nmIjSet('bcp',1);await W(600);
var bob=nmSuOb(bn).filter(x=>x.kind!=='afv'&&x.kind!=='gun'&&x.kind!=='veh'),bm=bob.filter(x=>x.kind==='mmc');
nmIjBCnt(bm[0].kind+'|'+bm[0].id,1);nmIjBCnt(bm[1].kind+'|'+bm[1].id,1);nmIjPickDone();await W(1500);
nmIjRegOpen('b');await W(300);nmIjReg('b','place');await W(1500);
var tg=nmIjTgts(),ti=tg.findIndex(e=>e&&e.grp&&!e.ijCs&&!e.veh&&!e.gun&&e.grp!==slot);o.push('B prep idx '+ti+' btns '+document.querySelectorAll('#nmIj .ijEd').length);
if(ti>=0){var bs=tg[ti].grp;nmIjSet('tgt',ti);nmIjGrpEdit('b');await W(600);o.push('B edit cs '+JSON.stringify(NM_IJ.bcs));nmIjBCnt(bm[0].kind+'|'+bm[0].id,1);nmIjPickDone();await W(1500);var d2=nmGeList(bs);o.push('B after items '+d2.items.length+' bcp '+NM_IJ.bcp+' still tgt '+(nmIjTgts().some(e=>e&&e.grp===bs)));}
}catch(e){o.push('EXC '+String(e)+(e.stack||'').slice(0,300));}return o;});
console.log(JSON.stringify(r,null,1),JSON.stringify(E));await p.waitForTimeout(500);await p.screenshot({path:'/tmp/v1042.png'});await b.close();})();
