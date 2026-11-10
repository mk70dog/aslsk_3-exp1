const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1148,height:798},deviceScaleFactor:1.5});const E=[];p.on('pageerror',x=>E.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1000);
const r=await p.evaluate(async()=>{const W=ms=>new Promise(r=>setTimeout(r,ms));var o=[];S.scen=S.scen||{};S.scen.sel='S24';for(var i=0;i<4;i++){try{Draw();}catch(e){}await W(1500);}await btEnsureGraph();var N=BTG.nodes,id=nm=>N.findIndex(n=>n.nm===nm);try{nmModeSet('judge');}catch(e){}await W(1500);var A=N[id('tT9')],B=N[id('tO10')];S_LOS.pxA={x:A.x,y:A.y};S_LOS.pxB={x:B.x,y:B.y};LosRunPixel();await W(4000);nmIjOpen();await W(1500);
var sg=()=>Object.keys((S.savedGroups||{})[S.scen.sel]||{}).filter(k=>(((S.savedGroups[S.scen.sel][k]||{}).pickerItems)||[]).length),mk=()=>[S_LOS.friendHexes,S_LOS.enemyHexes].reduce((a,L)=>a+(L||[]).filter(x=>x&&x.grp).length,0),tmp=()=>[S_LOS.friendHexes,S_LOS.enemyHexes].reduce((a,L)=>a+(L||[]).filter(x=>x&&x.ijTmp).length,0);
try{o.push('start saved '+sg()+' markers '+mk());
var NT='GER';nmIjSet('nat',NT);NM_IJ.cp=1;nmIjDraw();await W(500);nmIjCnt('mmc|8-3-8[E]',1);nmIjCnt('smc|9-1',1);nmIjPickDone();await W(1500);
o.push('btns '+document.querySelectorAll('#nmIj .ijRg').length);nmIjSet('pick',NM_IJ.pick);nmIjRegOpen('a');await W(300);o.push('popup '+!!document.getElementById('nmIjRegP'));
nmIjReg('a','only');await W(1500);o.push('A only: saved '+sg()+' markers '+mk()+' tmp '+tmp()+' pick '+NM_IJ.pick+' place '+NM_IJ.place);
nmIjClose();await W(1500);o.push('after close: saved '+sg()+' markers '+mk()+' tmp '+tmp());
nmIjOpen();await W(1500);var pl=nmIjPlaceList('GER').filter(x=>x.kind==='grp');o.push('reopen placeList grp '+pl.map(x=>x.id+':'+x.w));
/* B place */
nmIjSet('nat',NT);var bn=nmSuNats().filter(k=>nmFoeNat(NT,k))[0];nmIjSet('bnat',bn);nmIjSet('bcp',1);await W(500);var bm=nmSuOb(bn).filter(x=>x.kind==='mmc')[0];o.push('bn '+bn+' bnat '+NM_IJ.bnat+' bm '+(bm&&bm.id)+' stage '+NM_IJ.stage);nmIjBCnt(bm.kind+'|'+bm.id,1);nmIjPickDone();await W(1500);
var tg=nmIjTgts(),te=tg.filter(x=>x&&x.ijCs)[0];o.push('tg '+tg.length+' te '+!!te+' bcp '+NM_IJ.bcp+' bcs '+JSON.stringify(NM_IJ.bcs));nmIjSet('tgt',tg.indexOf(te));nmIjRegOpen('b');nmIjReg('b','place');await W(1500);o.push('B place: saved '+sg()+' markers '+mk()+' tmp '+tmp());
nmIjClose();await W(1500);o.push('after close: saved '+sg()+' markers '+mk()+' tmp '+tmp());
}catch(e){o.push('EXC '+e+(e.stack||'').slice(0,300));}return o;});
console.log(r.join('\n'),E);await b.close();})();
