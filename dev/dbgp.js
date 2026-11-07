const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1000,height:657}});const p=await ctx.newPage();const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(5000);await p.evaluate(()=>{NAVTAB('los');});await p.waitForTimeout(3000);
await p.mouse.click(500,400);await p.evaluate(()=>{var t=Date.now();while(Date.now()-t<2500){}});await p.waitForTimeout(1500);await p.evaluate(()=>nmDbg('マーカー: 1回目'));await p.waitForTimeout(800);
console.log('1st:',await p.evaluate(()=>NM_DBG.buf.slice(-4).join(' || ')));
await p.reload();await p.waitForTimeout(6000);
const t=await p.evaluate(()=>nmDbgText());console.log('2nd has prev:',/前回/.test(t),/マーカー: 1回目/.test(t),/応答なし/.test(t),/tap 500,400/.test(t));
console.log(t.split('\n').slice(0,3).join(' | '));
console.log(JSON.stringify(e));await b.close();})();
