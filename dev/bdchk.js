// sample: 獲得・残留の札にチェック欄。チェックするまで閉じる・戻るを止める
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657},deviceScaleFactor:2});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S25';S.nmMode='judge';NAVTAB('los');});await p.waitForTimeout(3000);
await p.evaluate(async()=>{await btEnsureGraph();S_LOS.friendHexes=[];S_LOS.enemyHexes=[];S_LOS.pxA=null;S_LOS.pxB=null;Draw();});await p.waitForTimeout(2000);
await p.evaluate(()=>{nmHqAtA('nmHqAfvOpen');NM_NU.sel=0;nmNuGo(0);});
const q=await p.evaluate(()=>{var c=-1,bd=1e9;BTG.nodes.forEach(function(N,i){if(!N)return;var q=nmClientOfNode(i);if(!q)return;var d=Math.hypot(q.x-450,q.y-450);if(d<bd){bd=d;c=i;}});return nmClientOfNode(c);});
await p.mouse.click(q.x,q.y);await p.waitForTimeout(1500);
await p.evaluate(()=>{var b=[...document.querySelectorAll('#btRm [onclick]')].find(x=>/nmVfOpen/.test(x.getAttribute('onclick')||''));if(b)b.click();});await p.waitForTimeout(800);
await p.evaluate(()=>{nmVfPick(NM_VF.from,null);});await p.waitForFunction(()=>NM_PICK&&!NM_PICK.busy&&NM_PICK.list.length,null,{timeout:120000});
const t=await p.evaluate(()=>{var x=NM_PICK.list.filter(o=>o.d===3)[0];return nmClientOfNode(x.tn);});await p.mouse.click(t.x,t.y);await p.waitForTimeout(800);
await p.evaluate(()=>{var b=[...document.querySelectorAll('#btRm [onclick]')].find(x=>/nmVfPendSet\(\d+,'afv/.test(x.getAttribute('onclick')||''));b.click();});await p.waitForTimeout(800);
await p.evaluate(async()=>{var n=NM_VF.from;nmVfSet(n,'a',3);nmVfSet(n,'b',6);await new Promise(r=>setTimeout(r,300));nmVfTH(n);});await p.waitForTimeout(1500);
const hide=()=>p.evaluate(()=>{document.querySelectorAll('.btToast,#btToast,[id^=nmToast]').forEach(x=>x.remove());});
await p.evaluate(()=>{document.querySelectorAll('[id*=Pop],[id*=pop]').forEach(x=>{if(/撃破|命中|判定/.test(x.textContent)&&x.id!=='btRm')x.remove();});});
console.log('pend',await p.evaluate(()=>nmBdPend()+' sub='+NM_RM_SUB+' rm='+!!document.getElementById('btRm')+' todo='+JSON.stringify((nmBdTodo()||{L:[]}).L.map(x=>x.k))));
// 閉じるを押す → 止まる
console.log('close try',await p.evaluate(async()=>{var b=[...document.querySelectorAll('#btRm .rmIt,#btRm button')].find(x=>x.textContent.trim()==='閉じる'||/^✕?\s*閉じる$/.test(x.textContent.trim()));if(!b)return 'no close';b.click();await new Promise(r=>setTimeout(r,300));return 'btRm still='+!!document.getElementById('btRm')+' NM_VF='+!!NM_VF;}));
await p.waitForTimeout(150);await p.screenshot({path:'/tmp/sm/bdchk-1.png'});
console.log('tk dice ok',await p.evaluate(async()=>{var n=NM_VF.from;nmVfSet(n,'c1',2);await new Promise(r=>setTimeout(r,200));return NM_VF.c1;}));
await p.evaluate(()=>{var o=nmBdTodo();o.L.forEach(x=>{if(!(o.R.bdDone||{})[x.k])nmBdTog(x.k);});});await p.waitForTimeout(600);await hide();await p.screenshot({path:'/tmp/sm/bdchk-2.png'});
console.log('after check',await p.evaluate(async()=>{var pend=nmBdPend();BtRmClose();await new Promise(r=>setTimeout(r,300));return 'pend='+pend+' closed='+!document.getElementById('btRm');}));
console.log(JSON.stringify(e));await b.close();})();
