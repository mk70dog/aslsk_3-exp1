// sample: 回復・修理パネルを実カウンター
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657},deviceScaleFactor:2});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S24';S.nmMode='judge';NAVTAB('los');});await p.waitForTimeout(3000);
await p.evaluate(async()=>{await btEnsureGraph();S_LOS.friendHexes=[];S_LOS.enemyHexes=[];Draw();nmRrOpen('rally');});await p.waitForTimeout(800);
await p.evaluate(()=>{var b=[...document.querySelectorAll('#btRm [onclick]')].find(x=>/nmRrPick\('mmc'/.test(x.getAttribute('onclick')||''));if(b)b.click();});await p.waitForTimeout(800);
await p.screenshot({path:'/tmp/sm/rrctr-1.png'});
await p.evaluate(()=>{BtRmClose();nmRrOpen('repair');});await p.waitForTimeout(800);
await p.evaluate(()=>{var b=[...document.querySelectorAll('#btRm [onclick]')].find(x=>/nmRrPick/.test(x.getAttribute('onclick')||''));if(b)b.click();});await p.waitForTimeout(1200);
await p.screenshot({path:'/tmp/sm/rrctr-2.png'});console.log(await p.evaluate(()=>(document.getElementById('btRm')||{innerText:''}).innerText.replace(/\s+/g,' ').slice(0,200)));
console.log(JSON.stringify(e));await b.close();})();
