const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657},deviceScaleFactor:2});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(2000);
await p.evaluate(async()=>{S.scen=S.scen||{};S.scen.sel='S24';S.nmMode='judge';await btEnsureGraph();try{Draw();}catch(x){}await new Promise(r=>setTimeout(r,800));S.turn=S.turn||{};S.turn.phase='dfph';});
await p.waitForTimeout(6000);const P=process.argv[2];
const hide=()=>p.evaluate(()=>{[...document.querySelectorAll('body *')].filter(x=>x.children.length<3&&/自軍・敵軍を自動で設定/.test(x.textContent)).forEach(x=>{var t=x;while(t.parentElement&&t.parentElement!==document.body)t=t.parentElement;if(!/btRm/.test(t.id))t.style.display='none';});});
await p.evaluate(()=>{nmHqOpen();var x=[...document.querySelectorAll('#nmHq button')].filter(x=>/MC/.test(x.textContent))[0];x.click();});await p.waitForTimeout(700);
await p.evaluate(()=>{try{var C=NM_SC;if(C){var ob=nmSuOb(C.nat).filter(x=>x.kind==='mmc');C.cs[ob[0].kind+'|'+ob[0].id]=1;nmScGo();}}catch(x){console.log(x)}});await p.waitForTimeout(900);
const r0=await p.evaluate(()=>{var b=document.querySelector('#btRm .rmBox');if(!b)return null;var r=b.getBoundingClientRect();var g=b.querySelector('.rmGrip');var gr=g&&g.getBoundingClientRect();return {t:r.top,l:r.left,h:r.height,g:gr?[gr.x+gr.width/2,gr.y+gr.height/2]:null};});
console.log('before',JSON.stringify(r0));console.log('at',await p.evaluate((g)=>{var el=document.elementFromPoint(g[0],g[1]);return el?el.tagName+' grip='+!!el.closest('.rmGrip')+' box='+!!el.closest('.rmBox')+' anim='+getComputedStyle(el.closest('.rmBox')).position+' fm='+el.closest('.rmBox').__fmDrag:'none';},r0.g));await hide();await p.screenshot({path:P+'_1.png'});
if(r0&&r0.g){await p.mouse.move(r0.g[0],r0.g[1]);await p.mouse.down();for(let i=1;i<=10;i++){await p.mouse.move(r0.g[0],r0.g[1]+i*18);await p.waitForTimeout(20);}await p.mouse.up();}
await p.waitForTimeout(400);console.log('after',await p.evaluate(()=>{var b=document.querySelector('#btRm .rmBox');var r=b.getBoundingClientRect();return JSON.stringify({t:r.top,l:r.left,st:b.style.top,cs:b.getAttribute('style').slice(0,300),bd:nmIjFmBounds()});}));
await hide();await p.screenshot({path:P+'_2.png'});
await p.waitForTimeout(400);await p.evaluate(()=>{nmMcpSet(NM_MCP.n,'1MC');});await p.waitForTimeout(400);console.log('after reopen',await p.evaluate(()=>{var b=document.querySelector('#btRm .rmBox');var r=b.getBoundingClientRect();return JSON.stringify({t:r.top});}));
console.log(JSON.stringify(e));await b.close();})();
