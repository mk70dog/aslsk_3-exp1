// sample: ライト版の「どの砲？」から 地図に置く・配置画面を外す
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657},deviceScaleFactor:2});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S25';S.nmMode='judge';NAVTAB('los');});await p.waitForTimeout(3000);
console.log('lite',await p.evaluate(()=>nmHqLite()));
await p.evaluate(()=>{nmNuOpen('nmHqGunOpen');NM_NU.sel=0;nmNuDraw();});await p.waitForTimeout(600);await p.screenshot({path:'/tmp/sm/nulite-a.png'});
await p.evaluate(()=>{nmNuClose();nmNuOpen('nmHqGunOpen');var b=[...document.querySelectorAll('#nmNu button')].find(x=>/NM_NU.sel=0/.test(x.getAttribute('onclick')||''));b.click();});await p.waitForTimeout(600);await p.screenshot({path:'/tmp/sm/nulite-b.png'});
console.log(JSON.stringify(e));await b.close();})();
