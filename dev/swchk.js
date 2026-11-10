const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1148,height:798}});
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);
const r=await p.evaluate(async()=>{const W=ms=>new Promise(r=>setTimeout(r,ms));var o=[];
for(const id of ['S20','S24','S41','S50']){S.scen=S.scen||{};S.scen.sel=id;for(var i=0;i<2;i++){try{Draw();}catch(e){}await W(800);}
 nmSuNats().forEach(function(n){nmSuOb(n).filter(x=>x.kind!=='mmc'&&x.kind!=='smc'&&x.kind!=='afv'&&x.kind!=='gun'&&x.kind!=='veh').forEach(function(x){var h=nmSuSwImg(x.kind,x.id,48);if(!/<img|<svg|<canvas|background-image/.test(h)||/background:#345|background:#5a3b1e/.test(h))o.push(id+' '+n+' '+x.kind+' '+x.id+' '+x.label);});});}
return o;});console.log(r.join('\n')||'none');await b.close();})();
