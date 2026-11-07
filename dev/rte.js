const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657},deviceScaleFactor:2});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(2000);
await p.evaluate(async()=>{S.scen=S.scen||{};S.nmMode='judge';try{Draw();}catch(x){}});
await p.waitForTimeout(5000);
const info=await p.evaluate(()=>{var bid=S_LOS.boards[0].id;var cr=[[14,8],[14,7],[13,6],[13,5]];
  window.__mk=function(cxm){var hs=cr.map(function(c,i){var m=(cxm&&i===cr.length-1)?5:i;return {boardId:bid,col:c[0],row:c[1],cost:i?1:0,moveCum:m,cum:m,roadOk:false};});S_LOS.route={hexes:hs,totalCost:hs[hs.length-1].cum};};window.__mk(false);var hs=S_LOS.route.hexes;
  S_LOS.routeMode=true;S_LOS.mfEntityType='infantry';try{LosRunPixel();}catch(x){}try{Draw();}catch(x){}
  var g=losColRowToGlobalCanon(bid,5,4);return {bid:bid,g:g};});
console.log(JSON.stringify(info));
const shoot=async(sty,nm)=>{await p.evaluate((sty)=>{S_LOS.nmRtEndSty=sty;try{LosRunPixel();}catch(x){}try{Draw();}catch(x){}},sty);await p.waitForTimeout(700);
  await p.screenshot({path:nm});};
for(const cxm of [false,true]){await p.evaluate((c)=>{window.__mk(c);},cxm);for(const [sty,nm] of [[null,'0'],['pict','1'],['pin','2'],['nato','3'],['hex','4'],['foot','5']])await shoot(sty,process.argv[2]+'/rte_'+nm+(cxm?'c':'')+'.png');}
console.log(JSON.stringify(e));await b.close();})();
