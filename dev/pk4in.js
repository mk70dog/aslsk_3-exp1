const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1148,height:798}});
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);
const r=await p.evaluate(async()=>{const W=ms=>new Promise(r=>setTimeout(r,ms));S.scen=S.scen||{};S.scen.sel='S24';for(var i=0;i<3;i++){try{Draw();}catch(e){}await W(1200);}var o=[];['GER','RUS'].filter(n=>UNITS[n]).forEach(function(n){var ob=nmSuOb(n);o.push(n+' '+JSON.stringify(ob.map(x=>[x.kind,x.id,x.label,x.n])));o.push(Object.keys(UNITS).join()+JSON.stringify((UNITS[n].mmc||[]).slice(0,4))+JSON.stringify((UNITS[n].smc||[]).slice(0,3)));o.push(JSON.stringify(nmIjRedList(n).map(x=>x.label)));o.push(JSON.stringify(nmIjCapList(n).map(x=>x.label)));});return o;});
console.log(r.join('\n'));await b.close();})();
