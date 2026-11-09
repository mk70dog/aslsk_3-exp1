const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820},deviceScaleFactor:2});const E=[];p.on('pageerror',x=>E.push(String(x)));
await p.goto('file://'+__dirname+'/../index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1000);
const which=process.argv[3];
const r=await p.evaluate(async(which)=>{const W=ms=>new Promise(r=>setTimeout(r,ms));S.scen=S.scen||{};S.scen.sel='S24';for(var i=0;i<4;i++){try{Draw();}catch(e){}await W(1500);}await btEnsureGraph();var o=[];
try{if(which==='rr'){nmRrOpen('rally');await W(1500);nmRrNat('GER');await W(500);nmRrPick('mmc',nmRrGroups('GER').base[0]);await W(800);
  var it=document.querySelector('#btRm .rmIt');var c=it.cloneNode(true);var tx=c.querySelector('.rmTx')||c;tx.innerHTML=tx.innerHTML.replace('←','↺').replace('戻る','クリア').replace(/回復(?=<|$)/,'選び直す');var w=document.createElement('div');w.style.cssText='display:flex;width:100%';it.parentNode.insertBefore(w,it);it.style.flex='1';c.style.flex='1';w.appendChild(it);w.appendChild(c);}
 else{nmMh2Open();await W(600);var M=NM_MH2;var ob=nmSuOb(M.nat).filter(x=>x.kind==='mmc');nmMh2Cnt(ob[0].kind+'|'+ob[0].id,1);await W(500);
  var hb=[...document.querySelectorAll('#nmMh2 button')].find(x=>/戻る/.test(x.textContent));var bt=hb.cloneNode(true);bt.innerHTML=bt.innerHTML.replace('←','↺').replace('戻る','クリア');bt.removeAttribute('onclick');hb.after(bt);}
o.push('ok');}catch(e){o.push(String(e));}return o;},which);
await p.waitForTimeout(400);await p.screenshot({path:process.argv[2]});console.log(E,r);await b.close();})();
