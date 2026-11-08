// v896: MCちょうど合格→PIN、PINの指揮官は修正なし、阻止NMC 原DR12→除去
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657}});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S24';S.nmMode='judge';NAVTAB('los');});await p.waitForTimeout(3000);
console.log(await p.evaluate(async()=>{await btEnsureGraph();var out=[];var slot=nmGeFreeSlot();nmGeAddCore(slot,'GER','mmc','4-4-7[2]');nmGeAddCore(slot,'GER','smc','8-0');nmGeSync(slot);
  window.nmTstRe=function(){};NM_MC={r:'MC',res:{}};var it=nmGeList(slot).items;var mi=it.findIndex(x=>x.kind==='mmc');
  nmMcSet(0,slot,mi,7,'nmTstRe');var x=nmGeList(slot).items[mi];out.push('NMC DR7 vs 7: '+NM_MC.res[x.pid].txt+' pinned='+x.pinned);
  x.pinned=false;NM_MC={r:'MC',res:{}};var L=nmGeList(slot).items.find(q=>q.kind==='smc');L.pinned=true;out.push('ldrDrm pinned='+nmMcLdrDrm(nmGeList(slot).items,{}));L.pinned=false;out.push('ldrDrm ok='+nmMcLdrDrm(nmGeList(slot).items,{}));
  var x2=nmGeList(slot).items[mi];x2.broken=true;NM_RT={n:0,sd:'e',slot:slot,done:{slot:slot,mc:{}}};window.nmRtRe=function(){};nmRtMc(0,x2.pid,'a',12);out.push('rout12: '+NM_RT.done.mc[x2.pid+':a'].t+' left='+nmGeList(slot).items.length);
  var it=[{row:1,cmp:1,ic:'fire',t:'DR',btns:[2,3,4,5,6,7].map(function(v){return [v,"nmMcSet(0,'"+slot+"',0,"+v+",'nmTstRe')"];})},{row:1,cmp:1,ic:'',t:'',btns:[8,9,10,11,12].map(function(v){return [v,"nmMcSet(0,'"+slot+"',0,"+v+",'nmTstRe')"];})}];var t2=nmDsTag(it);out.push('dsTag rows='+t2.length+' last='+JSON.stringify(t2[t2.length-1].btns));
  return out.join(' | ');}));
console.log(JSON.stringify(e));await b.close();})();
