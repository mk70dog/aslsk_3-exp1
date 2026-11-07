const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);
const shots=[['afv',0,'f',3],['afv',2,'b',0],['gun',0,'f',1],['gun',0,'b',-1],['inf',0,'f',1],['inf',2,'b',-1],['afv',1,'f',-1],['inf',3,'f',-1]];
await p.evaluate(()=>{S.refSub='afv';S.refAfvSub='counter';S.refGunSub='counter';S.refSmcSub='counter';NM_TVHQ=0;nmTvOpen('ref');});await p.waitForTimeout(500);
for(const [c,ex,fc,sel] of shots){await p.evaluate(([c,ex,fc,sel])=>{S.refSub=c==='inf'?'smc':c;S.refCtr=S.refCtr||{};S.refCtr[c]={ex:ex,face:fc,sel:sel};Draw();},[c,ex,fc,sel]);await p.waitForTimeout(500);
 await p.evaluate(()=>{var o=document.querySelector('#nmTv');var c=[...o.querySelectorAll('.card')].filter(x=>/カウンターの読み方/.test(x.textContent))[0];if(c)c.scrollIntoView();});await p.waitForTimeout(200);
 await p.screenshot({path:'ctr_'+c+ex+fc+'.png'});}
console.log(JSON.stringify(e));await b.close();})();
