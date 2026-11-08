// 精密な判定中のスクロール保持(v917)
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1500);
await p.evaluate(async()=>{S.scen=S.scen||{};S.scen.sel='S24';await btEnsureGraph();try{Draw();}catch(x){}await new Promise(r=>setTimeout(r,800));
 S_LOS.zoom=2.5;Draw();BtRmShow('view',40);window._o=BT_RMS;var w=document.getElementById('losScrollWrap');w.scrollLeft=w.scrollLeft+120;w.scrollTop=w.scrollTop+90;window._sl=w.scrollLeft;window._st=w.scrollTop;window._td=!!window._o.todo;});
await p.waitForTimeout(500);
const r=await p.evaluate(async()=>{var w=document.getElementById('losScrollWrap'),l=window._sl,t=window._st,td=window._td;await new Promise(r=>setTimeout(r,4500));var w2=document.getElementById('losScrollWrap');return {sw:w.scrollWidth>w.clientWidth,todo0:td,same:Math.abs(w2.scrollLeft-l)<2&&Math.abs(w2.scrollTop-t)<2,l:l,now:w2.scrollLeft};});
console.log(JSON.stringify(r));console.log('errors',JSON.stringify(e));await b.close();})();
