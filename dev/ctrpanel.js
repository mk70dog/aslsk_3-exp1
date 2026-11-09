// sample: パネルの選択ボタンを実カウンターに
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657},deviceScaleFactor:2});const E=[];p.on('pageerror',x=>E.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);
await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S25';S.nmMode='judge';NAVTAB('los');});await p.waitForTimeout(3000);
const shot=async n=>{await p.waitForTimeout(600);await p.screenshot({path:'/tmp/sm/ctrpanel-'+n+'.png'});};
await p.evaluate(()=>{nmNuOpen('nmHqGunOpen');});await shot('gun');
await p.evaluate(()=>{nmNuClose();nmNuOpen('nmHqCcOpen');});await shot('inf');
await p.evaluate(()=>{nmNuClose();nmNuOpen('nmHqAfvOpen');});await shot('afv');
await p.evaluate(()=>{nmNuClose();nmMh2Open();var M=NM_MH2;M.nat='SOV';nmMh2Draw();});await shot('mh2');
console.log('err',E.length,E.slice(0,3));await b.close();})();
