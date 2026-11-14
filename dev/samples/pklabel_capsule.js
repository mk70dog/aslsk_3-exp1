const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1133,height:744},deviceScaleFactor:2});const e=[];p.on('pageerror',x=>e.push(String(x).slice(0,300)));
await p.goto('file:///home/claude/aslsk_3-exp1/index.html',{timeout:180000});await p.waitForTimeout(4000);
await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S24';NAVTAB('scen');NAVTAB('los');try{LOS_PAGE();}catch(x){}});await p.waitForTimeout(3000);
for(let v=0;v<=0;v++){
await p.evaluate(a=>{window.__fn=a[0];window.__v=a[1];},[process.argv[2],+process.argv[3]]);await p.evaluate(async(v)=>{await btEnsureGraph();var N=BTG.nodes;function nd(h){return N.findIndex(x=>x&&x.nm===h);}
 function mk(h,nat,k){var n=nd(h);var vv=nmIjVehs(nat).filter(o=>o.kind==='veh')[k||0];return {boardId:N[n].b,col:N[n].c,row:N[n].r,veh:vv.id};}
 S_LOS.friendHexes=[mk('vJ1','SOV',0),mk('tT5','SOV',0),mk('vQ9','SOV',0)];S_LOS.enemyHexes=[mk('tP7','GER',1),mk('tN4','GER',0)];
 var o=document.getElementById('nmHqPk');if(o)o.remove();S_LOS.pxA=null;nmHqPickA(window.__fn);await new Promise(r=>setTimeout(r,500));
 document.querySelectorAll('.btToast,#btToast,.toast').forEach(x=>x.remove());[...document.querySelectorAll('div')].filter(x=>/自軍・敵軍を自動で設定/.test(x.textContent)&&x.children.length<3).forEach(x=>x.remove());
 var m=document.getElementById('nmHqPk');var rows=[...m.querySelectorAll('button')].filter(x=>x.querySelector('span[style*="font-size:11px"]'));
 var box=m.firstElementChild;var tag=document.createElement('div');tag.style.cssText='position:absolute;right:70px;top:18px;font:900 14px AppFont,AppJP;color:#000;background:#ffd060;border-radius:6px;padding:2px 8px';tag.textContent='案'+'ABC'[window.__v];box.style.position='relative';box.appendChild(tag);
 rows.forEach(function(r){var sp=r.querySelector('span[style*="font-size:11px"]');var f=/d4a65a/.test(sp.getAttribute('style'));var col=f?'#d4a65a':'#7ec8e3';var V=window.__v;
  sp.style.display='inline-block';sp.style.marginTop='3px';sp.style.borderRadius='999px';sp.style.padding='0 8px';sp.style.lineHeight='17px';sp.style.fontSize='11px';
  if(V===0){sp.style.border='1px solid '+col;sp.style.color=col;sp.style.fontWeight='400';}
  if(V===1){sp.style.background=col;sp.style.color='#0b0e14';sp.style.fontWeight='700';}
  if(V===2){sp.style.background=col+'33';sp.style.border='1px solid '+col+'99';sp.style.color=col;sp.style.fontWeight='400';}
 });},v);
await p.waitForTimeout(300);const el=await p.$('#nmHqPk > div');await el.screenshot({path:'/tmp/sc/er/pkc'+process.argv[3]+'.png'});}
console.log(e);await b.close();})();
