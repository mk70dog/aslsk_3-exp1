// v888: 出目を選んでも判定しない → 「判定する」で判定
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657},deviceScaleFactor:2});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S24';S.nmMode='judge';NAVTAB('los');});await p.waitForTimeout(3000);
await p.evaluate(async()=>{await btEnsureGraph();Draw();});await p.waitForTimeout(3000);const P=process.argv[2]||'dsf';
// 1 残留火力
console.log('raq:',await p.evaluate(()=>{var n=131,H=nmHexOfNode(n);S_LOS.resid=S_LOS.resid||{};S_LOS.resid[nmResKey(H)]=6;var A=BTG.nodes[n];S_LOS.pxB={x:A.x,y:A.y};nmRaqOpen();var R=NM_RAQ;if(!R.fp)R.fp=6;nmRaqDraw();var b=[...document.querySelectorAll('#nmRaq button')].find(x=>x.textContent.trim()==='7');b.click();var r1=NM_RAQ.r||null;var on=b.classList.contains('dsOn');var g=document.querySelector('#nmRaq [data-dsk="raq"]');var lbl=g.textContent;g.click();return JSON.stringify({afterPick:r1,on:on,lbl:lbl,raw:NM_RAQ.raw,r:NM_RAQ.r});}));
await p.screenshot({path:P+'_raq.png'});
await p.evaluate(()=>{var o=document.getElementById('nmRaq');if(o)o.remove();NM_RAQ=null;});
// 2 修理 dr の行
console.log('rep:',await p.evaluate(()=>{var n=131,H=nmHexOfNode(n);var vid=Object.keys(scenarioAfvIdsByVehId())[0];nmSideList('f').push({boardId:H.boardId,col:H.col,row:H.row,veh:vid,st:{mal:true}});Draw();nmRvOpen(n,'f');
  var bs=[...document.querySelectorAll('#btRm button')];var b=bs.find(x=>x.textContent.trim()==='1'&&/nmDsHPick/.test(x.getAttribute('onclick')||''));if(!b)return 'no pick btn: '+bs.map(x=>x.textContent.trim()).join(',').slice(0,300);b.click();var eh=nmUnitAt(H,'f');var st1=JSON.stringify(eh.st);var k=(b.getAttribute('onclick').match(/'(ds\d+)'/)||[])[1];var g=[...document.querySelectorAll('#btRm button')].find(x=>(x.getAttribute('onclick')||'').indexOf("nmDsGo('"+k+"')")>=0);var lbl=g&&g.textContent;return JSON.stringify({afterPick:st1,lbl:lbl,tpl:NM_DST[k]});}));
await p.screenshot({path:P+'_rep.png'});
console.log('rep go:',await p.evaluate(()=>{var g=[...document.querySelectorAll('#btRm button')].find(x=>/nmDsGo/.test(x.getAttribute('onclick')||'')&&/出目/.test(x.textContent));if(!g)return 'no go';g.click();var eh=nmUnitAt(nmHexOfNode(131),'f');return (NM_LTREP?NM_LTREP.html.replace(/<[^>]*>/g,' '):'none');}));
await p.waitForTimeout(400);await p.screenshot({path:P+'_rep2.png'});console.log(JSON.stringify(e));await b.close();})();
