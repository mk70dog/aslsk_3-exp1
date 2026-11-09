const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657},deviceScaleFactor:2});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S26';S.nmMode='judge';NAVTAB('los');});await p.waitForTimeout(3000);
await p.evaluate(async()=>{await btEnsureGraph();S_LOS.friendHexes=[];S_LOS.enemyHexes=[];S_LOS.pxA=null;Draw();nmHqOpen();});await p.waitForTimeout(800);
await p.evaluate(()=>{var b=[...document.querySelectorAll('[onclick]')].find(x=>/nmLwOpen/.test(x.getAttribute('onclick')||'')&&/軽対戦車/.test(x.textContent));if(b)b.click();});await p.waitForTimeout(1000);
await p.screenshot({path:'/tmp/sm/lwflow-1.png'});
console.log(await p.evaluate(()=>{var ids=['nmNu','nmHqPk','nmCcSc','btRm','nmLwSc','nmPickBn'].filter(i=>document.getElementById(i));var el=document.getElementById(ids[0]);return ids.join(',')+' :: '+(el?el.innerText.replace(/\s+/g,' ').slice(0,500):'');}));
console.log(JSON.stringify(e));await b.close();})();
