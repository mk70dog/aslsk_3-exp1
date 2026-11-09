// sample: 撃てるヘクスの見せ方 4案
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657},deviceScaleFactor:2});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S26';S.nmMode='judge';NAVTAB('los');});await p.waitForTimeout(3000);
await p.evaluate(async()=>{await btEnsureGraph();S_LOS.friendHexes=[];S_LOS.enemyHexes=[];S_LOS.pxA=null;S_LOS.pxB=null;Draw();});await p.waitForTimeout(2000);
await p.evaluate(()=>{nmHqAtA('nmHqAfvOpen');NM_NU.sel=0;nmNuGo(0);});
const q=await p.evaluate(()=>{var c=-1,bd=1e9;BTG.nodes.forEach(function(N,i){if(!N)return;var q=nmClientOfNode(i);if(!q)return;var d=Math.hypot(q.x-480,q.y-330);if(d<bd){bd=d;c=i;}});return nmClientOfNode(c);});
await p.mouse.click(q.x,q.y);await p.waitForTimeout(1500);
await p.evaluate(()=>{var b=[...document.querySelectorAll('#btRm [onclick]')].find(x=>/nmVfOpen/.test(x.getAttribute('onclick')||''));if(b)b.click();});await p.waitForTimeout(800);
await p.evaluate(()=>{nmVfPick(NM_VF.from,null);});await p.waitForFunction(()=>NM_PICK&&!NM_PICK.busy,null,{timeout:180000});
for(const st of [0,1,2,3,4]){await p.evaluate(st=>{window.__pkSty=st;Draw();document.querySelectorAll('.btToast,#btToast,[id^=nmToast]').forEach(x=>x.remove());},st);await p.waitForTimeout(700);await p.screenshot({path:'/tmp/sm/pk-'+st+'.png'});}
console.log('n',await p.evaluate(()=>NM_PICK.list.length+' no '+(NM_PICK.no||[]).length));console.log(JSON.stringify(e));await b.close();})();
