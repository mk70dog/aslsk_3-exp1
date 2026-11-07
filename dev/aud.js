const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(2000);
await p.evaluate(async()=>{S.scen=S.scen||{};S.scen.sel='S24';await btEnsureGraph();try{Draw();}catch(x){}await new Promise(r=>setTimeout(r,800));var A=BTG.nodes[131];S_LOS.pxA={x:A.x,y:A.y};});
const chk=async(lbl)=>{await p.waitForTimeout(700);const r=await p.evaluate(()=>{var vis=[...document.body.children].filter(x=>x.id&&!/nmFtBot|nmFtAct|nmToast|toast/i.test(x.id)&&getComputedStyle(x).position==='fixed'&&x.offsetWidth>200&&x.style.visibility!=='hidden'&&getComputedStyle(x).display!=='none');var top=vis[vis.length-1];if(!top)return 'none';var t=top.innerText;return top.id+' back='+(/戻る|◀/.test(t))+' | '+t.replace(/\s+/g,' ').slice(0,70);});console.log(lbl.padEnd(10),r);await p.evaluate(()=>{['nmRaq','nmDcp','nmCcp','nmCcSc','nmHqPk','nmHq'].forEach(id=>{var o=document.getElementById(id);if(o)o.remove();});try{BtRmClose();}catch(x){}NM_HQFROM=0;});};
for(const fn of ['nmRlOpen','nmHqMvOpen','nmDcOpen','nmRtOpen','nmMcpOpen']){await p.evaluate(fn=>{nmScOpen(fn);var ob=nmSuOb(NM_SC.nat).filter(x=>x.kind==='mmc');NM_SC.cs[ob[0].kind+'|'+ob[0].id]=1;if(fn==='nmDcOpen')NM_SC.cs['dc|DC']=1;nmScGo();},fn);await chk(fn);}
await p.evaluate(()=>{nmCcScOpen();var C=NM_CCS;var a=nmSuOb(C.an).filter(x=>x.kind==='mmc');var d=nmSuOb(C.dn).filter(x=>x.kind==='mmc');C.acs[a[0].kind+'|'+a[0].id]=1;C.dcs[d[0].kind+'|'+d[0].id]=1;nmCcScDraw();nmCcScGo();});await chk('CC');
await p.evaluate(()=>{var v=AFV_DATA.filter(v=>/ger/i.test(v.nat||'')&&v.ma)[0]||AFV_DATA[0];NM_RM_HEX=nmHexOfN(131);nmRmSetVeh(131,v.id,'f');BtRmClose();});
for(const fn of ['nmHqAfvOpen','nmHqGunOpen','nmLwOpen']){await p.evaluate(fn=>{nmHqAtA(fn);},fn);await chk(fn);}
await p.evaluate(()=>{nmHqOpen('qk');});await chk('qk');
console.log(JSON.stringify(e));await b.close();})();
