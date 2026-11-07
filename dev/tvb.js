const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657}});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>{S.nmMode='judge';NAVTAB('los');});await p.waitForTimeout(4000);
const back=()=>p.evaluate(()=>{var x=[...document.querySelectorAll('#nmTv button')].find(b=>/戻る/.test(b.textContent));x.click();return {tv:!!document.getElementById('nmTv'),hq:!!document.getElementById('nmHq')};});
await p.evaluate(()=>{NM_TVHQ=0;nmTvOpen('ref');});console.log('toolbar ref back:',JSON.stringify(await back()));
await p.evaluate(()=>{nmHqClose();nmHqOpen();var x=[...document.querySelectorAll('#nmHq button')].find(b=>/早見表/.test(b.textContent));x.click();});console.log('board ref back:',JSON.stringify(await back()));
console.log(JSON.stringify(e));await b.close();})();
