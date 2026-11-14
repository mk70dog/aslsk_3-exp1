const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1133,height:744},deviceScaleFactor:2});const e=[];p.on('pageerror',x=>e.push(String(x).slice(0,300)));
await p.goto('file:///home/claude/aslsk_3-exp1/index.html',{timeout:180000});await p.waitForTimeout(4000);
await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S24';NAVTAB('scen');NAVTAB('los');try{LOS_PAGE();}catch(x){}});await p.waitForTimeout(3000);
for(let v=7;v<=9;v++){
await p.evaluate(async(v)=>{await btEnsureGraph();var N=BTG.nodes;function nd(h){return N.findIndex(x=>x&&x.nm===h);}
 function mk(h,nat,k){var n=nd(h);var vv=nmIjVehs(nat).filter(o=>o.kind==='veh')[k||0];return {boardId:N[n].b,col:N[n].c,row:N[n].r,veh:vv.id};}
 S_LOS.friendHexes=[mk('vJ1','SOV',0),mk('tT5','SOV',0),mk('vQ9','SOV',0)];S_LOS.enemyHexes=[mk('tP7','GER',1),mk('tN4','GER',0)];
 var o=document.getElementById('nmHqPk');if(o)o.remove();S_LOS.pxA=null;nmHqPickA('nmHqAfvOpen');await new Promise(r=>setTimeout(r,500));
 document.querySelectorAll('.btToast,#btToast,.toast').forEach(x=>x.remove());[...document.querySelectorAll('div')].filter(x=>/自軍・敵軍を自動で設定/.test(x.textContent)&&x.children.length<3).forEach(x=>x.remove());
 var m=document.getElementById('nmHqPk');var rows=[...m.querySelectorAll('button')].filter(x=>/自軍|敵軍/.test(x.textContent));
 var box=m.firstElementChild;var tag=document.createElement('div');tag.style.cssText='position:absolute;right:70px;top:18px;font:900 14px AppFont,AppJP;color:#000;background:#ffd060;border-radius:6px;padding:2px 8px';tag.textContent='案'+'ABC'[v-7];box.style.position='relative';box.appendChild(tag);
 rows.forEach(function(r){var c=r.children,f=/自軍/.test(c[0].textContent),L=c[0],ch=c[1],nm=c[2],hx=c[3],col=f?'#d4a65a':'#7ec8e3',nat=f?'ソ連':'独';
  if(v===1){L.textContent=f?'自軍':'敵軍';L.style.cssText='color:'+col+';font-size:11px;font-weight:700;border:1px solid '+col+';border-radius:9px;padding:1px 6px;min-width:0';nm.style.fontSize='14px';nm.style.fontWeight='700';hx.style.fontSize='12px';}
  if(v===2){L.innerHTML='<span style="display:block;font-size:12px;font-weight:900;color:'+col+'">'+(f?'自軍':'敵軍')+'</span><span style="display:block;font-size:11px;font-weight:400;color:#9fb2c8">'+nat+'</span>';L.style.cssText='min-width:40px;line-height:1.2;text-align:center';nm.style.fontSize='15px';nm.style.fontWeight='700';hx.style.fontSize='13px';}
  if(v===3){L.remove();r.style.borderLeft='4px solid '+col;nm.innerHTML='<span style="display:block;font-size:15px;font-weight:800">'+nm.textContent+'</span><span style="display:block;font-size:11px;font-weight:400;color:'+col+'">'+(f?'自軍':'敵軍')+'・'+nat+'</span>';nm.style.lineHeight='1.25';hx.style.fontSize='13px';}
  if(v===4){L.textContent=f?'自':'敵';L.style.cssText='background:'+col+';color:#000;font-size:13px;font-weight:900;border-radius:50%;width:26px;height:26px;display:flex;align-items:center;justify-content:center;min-width:26px';nm.style.fontSize='15px';nm.style.fontWeight='700';hx.style.cssText='margin-left:auto;font-size:12px;color:#cfe;background:#2a3446;border-radius:8px;padding:2px 8px';}
  var nt=f?'ソ連軍':'独軍';
  if(v===7){L.textContent=nt;L.style.cssText='color:'+col+';font-size:12px;font-weight:400;min-width:44px';}
  if(v===8){L.remove();nm.innerHTML='<span style="display:block;font-size:16px;font-weight:900">'+nm.textContent+'</span><span style="display:block;font-size:11px;font-weight:400;color:'+col+'">'+nt+'</span>';nm.style.lineHeight='1.25';}
  if(v===9){L.remove();hx.innerHTML='<span style="display:block;font-size:11px;font-weight:400;color:'+col+'">'+nt+'</span><span style="display:block">'+hx.textContent+'</span>';hx.style.textAlign='right';hx.style.lineHeight='1.3';}
  if(v===5){L.style.fontSize='13px';L.style.fontWeight='500';nm.style.fontSize='17px';nm.style.fontWeight='500';hx.style.fontSize='14px';hx.style.fontWeight='500';}
 });},v);
await p.waitForTimeout(300);const el=await p.$('#nmHqPk > div');await el.screenshot({path:'/tmp/sc/er/pkv'+v+'.png'});}
console.log(e);await b.close();})();
