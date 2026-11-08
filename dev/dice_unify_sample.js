const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:1500},deviceScaleFactor:1.5});const E=[];p.on('pageerror',x=>E.push(String(x)));
await p.goto('file:///home/claude/aslsk_3-exp1/index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(2000);
const PF=['','#btRm.rmFull ','#nmIj ','#nmCcp ','#nmCcSc ','#nmDcp ','#nmRaq '];
const CSS=PF.map(f=>`html:root ${f}.dsRow{display:flex!important;flex-wrap:wrap!important;gap:6px!important;align-items:center;justify-content:flex-start;max-width:276px!important;background:none!important;border:0!important;box-shadow:none!important;padding:0!important}
html:root ${f}.dsRow>button.dsb.dsb:not(.zz){flex:0 0 40px!important;width:40px!important;min-width:40px!important;max-width:40px!important;height:40px!important;min-height:40px!important;padding:0!important;font-size:17px!important;font-weight:800!important;text-align:center!important;display:flex!important;align-items:center!important;justify-content:center!important;line-height:1!important;background:radial-gradient(circle,#000000aa .9px,transparent 1.25px) 0 0/4px 4px,linear-gradient(#131313,#080808)!important;border:0!important;border-radius:6px!important;box-shadow:0 3px 0 #0e0e0c,inset 0 1px 0 #ffffff1f!important;color:#ccddee!important}
html:root ${f}.dsRow>button.dsb::before,html:root ${f}.dsRow>button.dsb::after{content:none!important;background-image:none!important}`).join('\n');
const mark=`window.__ds=function(root){root.querySelectorAll('div,span').forEach(function(c){var bs=[].slice.call(c.children).filter(function(x){return x.tagName==='BUTTON'});var nb=bs.filter(function(x){return /^\\d{1,2}$/.test(x.textContent.trim())});if(nb.length>=5&&nb.length===bs.length)c.classList.add('dsRow');bs.forEach(function(x){x.classList.add('dsb');});});};`;
await p.evaluate(mark);
const shot=async(sel,name,after)=>{var box=await p.evaluate((sel)=>{var o=document.querySelector(sel);var r=o.getBoundingClientRect();return {x:Math.max(0,r.x),y:Math.max(0,r.y),width:Math.min(1180-Math.max(0,r.x),r.width),height:Math.min(1500-Math.max(0,r.y),r.height)};},sel);await p.screenshot({path:'/tmp/sm/dice_'+name+(after?'_a':'_b')+'.png',clip:box});};
// 1: nmCcp
await p.evaluate(async()=>{S.scen=S.scen||{};S.scen.sel='S24';await btEnsureGraph();try{Draw();}catch(x){}await new Promise(r=>setTimeout(r,800));S.turn=S.turn||{};S.turn.phase='ccph';nmHqOpen();});
await p.waitForTimeout(600);
await p.evaluate(()=>{[...document.querySelectorAll('#nmHq button')].filter(x=>/^白兵戦/.test(x.textContent.trim()))[0].click();});await p.waitForTimeout(600);
await p.evaluate(()=>{var C=NM_CCS;var a=nmSuOb(C.an).filter(x=>x.kind==='mmc'||x.kind==='smc');var d=nmSuOb(C.dn).filter(x=>x.kind==='mmc'||x.kind==='smc');a.slice(0,3).forEach(x=>C.acs[x.kind+'|'+x.id]=1);d.slice(0,3).forEach(x=>{C.dcs=C.dcs||{};C.dcs[x.kind+'|'+x.id]=1;});nmCcScDraw();S.savedGroups=S.savedGroups||{};S.savedGroups.S24=S.savedGroups.S24||{};GROUP_SLOTS.forEach(function(k){S.savedGroups.S24[k]={pickerNat:C.an,pickerItems:[],sw:[],swOwner:{},latw:[]};});nmCcScGo();});
await p.waitForTimeout(600);
await p.evaluate(()=>{var b=[...document.querySelectorAll('#nmCcp button')].filter(x=>/攻撃の指定とDR/.test(x.textContent))[0];if(b)b.click();});await p.waitForTimeout(500);
const ccClip=async()=>p.evaluate(()=>{var bs=[...document.querySelectorAll('#nmCcp button')].filter(x=>x.textContent.trim()==='2'&&x.parentElement.children.length>=10);var r=bs[0].parentElement.getBoundingClientRect(),q=document.querySelector('#nmCcp .ccpBox').getBoundingClientRect();return {x:q.x,y:Math.max(0,r.top-90),width:620,height:360};});
await p.screenshot({path:'/tmp/sm/dice_cc_b.png',clip:await ccClip()});
await p.evaluate((css)=>{var s=document.createElement('style');s.id='dsd';s.textContent=css;document.head.appendChild(s);__ds(document.getElementById('nmCcp'));},CSS);await p.waitForTimeout(300);await p.evaluate(()=>{});await p.waitForTimeout(200);await p.screenshot({path:'/tmp/sm/dice_cc_a.png',clip:await ccClip()});

// 2: nmIj
await p.evaluate(()=>{try{nmCcpClose();}catch(e){}try{nmCcScClose&&nmCcScClose();}catch(e){}var o=document.getElementById('nmCcp');if(o)o.remove();var q=document.getElementById('nmCcSc');if(q)q.remove();try{nmHqClose();}catch(e){}});
await p.evaluate(async()=>{S.turn.phase='pfph';var A=BTG.nodes[131],B=BTG.nodes[134];S_LOS.friendHexes.length=0;S_LOS.enemyHexes.length=0;S_LOS.pxA={x:A.x,y:A.y};S_LOS.pxB={x:B.x,y:B.y};try{LosRunPixel();}catch(x){}nmIjOpen();nmIjSet('nat','GER');nmIjSet('cp',1);var ob=nmSuOb('GER');nmIjCnt('mmc|'+ob.filter(x=>x.kind==='mmc')[0].id,2);nmIjPlaceNow();var J=NM_IJ;J.eb=1;try{nmIjSet('bnat','SOV');}catch(x){}});
await p.waitForTimeout(1500);await p.evaluate(()=>{try{nmIjGo(true);}catch(e){}});await p.waitForTimeout(1500);
await shot('#nmIj .ijBox','ij',false);
await p.evaluate(()=>{__ds(document.getElementById('nmIj'));});await p.waitForTimeout(300);await shot('#nmIj .ijBox','ij',true);
// 3: rally (autodice off)
await p.evaluate(()=>{var o=document.getElementById('nmIj');if(o)o.remove();try{nmIjClose();}catch(e){}S.nmAutoOff=true;S.turn.phase='rph';nmHqOpen();});
await p.waitForTimeout(600);
await p.evaluate(()=>{[...document.querySelectorAll('#nmHq button')].filter(x=>/^回復/.test(x.textContent.trim()))[0].click();});await p.waitForTimeout(900);
await p.evaluate(()=>{[...document.querySelectorAll('#btRm button')].filter(x=>/6-2-8/.test(x.textContent))[0].click();});await p.waitForTimeout(700);
await p.evaluate(()=>{document.getElementById('dsd').disabled=true;});await p.waitForTimeout(200);
await shot('#btRm .rmBox','rl',false);
await p.evaluate(()=>{document.getElementById('dsd').disabled=false;__ds(document.getElementById('btRm'));});await p.waitForTimeout(300);await shot('#btRm .rmBox','rl',true);
console.log(E);await b.close();})();
