const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:+process.argv[3]||1133,height:+process.argv[4]||744},deviceScaleFactor:2});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(3000);
await p.evaluate(()=>{S.refSub='afv';S.refAfvSub='counter';S.refGunSub='counter';S.refSmcSub='counter';NM_TVHQ=0;nmTvOpen('ref');});await p.waitForTimeout(500);
const P=process.argv[2];
for(const [c,ex,sel] of [['afv',2,0],['gun',0,1],['inf',3,1]]){await p.evaluate(([c,ex,sel])=>{S.refSub=c==='inf'?'smc':c;S.refCtr=S.refCtr||{};S.refCtr[c]={ex:ex,face:'f',sel:sel};Draw();},[c,ex,sel]);await p.waitForTimeout(600);
 const info=await p.evaluate(()=>{var o=document.querySelector('#nmTv');var c=[...o.querySelectorAll('.card')].filter(x=>/カウンターの読み方/.test(x.textContent))[0];if(c)c.scrollIntoView();var sc=[c].concat([...c.querySelectorAll('div')]).filter(d=>d.scrollWidth>d.clientWidth+2&&getComputedStyle(d).overflowX!=='visible');var inr=c.querySelector('.refCtrIn');return {hscroll:sc.length,cw:c.clientWidth,z:inr?inr.style.zoom:'-',over:c.scrollWidth>c.clientWidth+2};});
 await p.waitForTimeout(200);await p.screenshot({path:P+'_'+c+'.png'});console.log(c,JSON.stringify(info));}
console.log(JSON.stringify(e));await b.close();})();
