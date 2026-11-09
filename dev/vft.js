const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657},deviceScaleFactor:2});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html')+'',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S25';S.nmMode='judge';NAVTAB('los');});await p.waitForTimeout(3000);
await p.evaluate(async()=>{await btEnsureGraph();S_LOS.friendHexes=[];S_LOS.enemyHexes=[];S_LOS.pxA=null;S_LOS.pxB=null;Draw();});await p.waitForTimeout(3000);
const P=process.argv[2];
const hide=()=>p.evaluate(()=>{document.querySelectorAll('.btToast,#btToast,[id^=nmToast]').forEach(x=>x.remove());[...document.querySelectorAll('body *')].filter(x=>x.children.length<3&&/自軍・敵軍を自動|全体マップが出ます/.test(x.textContent)).forEach(x=>{var t=x;while(t.parentElement&&t.parentElement!==document.body)t=t.parentElement;if(!/btRm|nmIj/.test(t.id))t.style.display='none';});});
await p.evaluate(()=>{nmHqAtA('nmHqAfvOpen');NM_NU.sel=0;nmNuGo(0);});
const q=await p.evaluate(()=>{var c=-1,bd=1e9;BTG.nodes.forEach(function(N,i){if(!N)return;var q=nmClientOfNode(i);if(!q)return;var d=Math.hypot(q.x-450,q.y-450);if(d<bd){bd=d;c=i;}});return nmClientOfNode(c);});
await p.mouse.click(q.x,q.y);await p.waitForTimeout(1500);
// open main gun attack
console.log(await p.evaluate(()=>{var b=[...document.querySelectorAll('#btRm [onclick]')].find(x=>/nmVfOpen/.test(x.getAttribute('onclick')||''));if(b){b.click();return 'vf open';}return 'items: '+document.getElementById('btRm').innerText.replace(/\s+/g,' ').slice(0,200);}));
await p.waitForTimeout(800);await hide();await p.screenshot({path:P+'1.png'});
await p.evaluate(()=>{nmVfPick(NM_VF.from,null);});await p.waitForTimeout(800);await p.waitForFunction(()=>NM_PICK&&!NM_PICK.busy,null,{timeout:120000});await hide();await p.screenshot({path:P+'2.png'});
const t=await p.evaluate(()=>{var x=NM_PICK.list.filter(o=>o.d===3)[0];return nmClientOfNode(x.tn);});await p.mouse.click(t.x,t.y);await p.waitForTimeout(800);await hide();await p.screenshot({path:P+'3.png'});
await p.evaluate(()=>{var b=[...document.querySelectorAll('#btRm [onclick]')].find(x=>/nmVfPendSet\(\d+,'afv/.test(x.getAttribute('onclick')||''));b.click();});await p.waitForTimeout(1000);await hide();await p.screenshot({path:P+'4.png'});
console.log(await p.evaluate(()=>'tgt='+NM_VF.tgt+' '+document.getElementById('btRm').innerText.replace(/\s+/g,' ').slice(0,300)));
// ダイスを押して色が付くか(v960)
const dd=await p.evaluate(async()=>{try{if(S.autoDice!=null)S.autoDice=false;}catch(e){}var bt=[...document.querySelectorAll('#btRm button')].filter(x=>/nmVfSet\(\d+,'a',3\)/.test(x.getAttribute('onclick')||''))[0];if(!bt)return 'no die btn';bt.click();await new Promise(r=>setTimeout(r,500));var b2=[...document.querySelectorAll('#btRm button')].filter(x=>/nmVfSet\(\d+,'a',3\)/.test(x.getAttribute('onclick')||''))[0];var c=b2&&getComputedStyle(b2);return 'V.a='+NM_VF.a+' cls='+(b2&&b2.className)+' bg='+(c&&(c.backgroundImage.slice(0,60)+' '+c.backgroundColor));});console.log('dice',dd);await hide();await p.screenshot({path:P+'5.png'});
await p.evaluate(async()=>{var n=NM_VF.from;nmVfSet(n,'b',6);await new Promise(r=>setTimeout(r,300));nmVfTH(n);});await p.waitForTimeout(1500);await hide();await p.screenshot({path:P+'6.png'});
console.log('acq',await p.evaluate(()=>{var o=nmBdTodo();return o?o.L.map(x=>x.k+':'+/<img/.test(x.ic)).join(','):'none';}));
console.log(JSON.stringify(e));await b.close();})();
