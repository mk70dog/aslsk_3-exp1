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
let ok=false;for(const dx of [90,-90,130,-130,0,170,-170]){for(const dy of [110,-110,60,-60,170]){const fr=await p.evaluate(()=>nmClientOfNode(NM_VF.from));await p.mouse.click(fr.x+dx,fr.y+dy);await p.waitForTimeout(2500);ok=await p.evaluate(()=>NM_VF&&NM_VF.pend!=null);if(ok)break;}if(ok)break;}
console.log('pend',ok);
await p.evaluate(()=>{var b=[...document.querySelectorAll('#btRm [onclick]')].find(x=>/nmVfPendSet\(\d+,'afv/.test(x.getAttribute('onclick')||''));if(b)b.click();});await p.waitForTimeout(1000);
console.log(await p.evaluate(()=>'tgt='+NM_VF.tgt+' '+document.getElementById('btRm').innerText.replace(/\s+/g,' ').slice(0,200)));
// サンプル: 砲撃パネルの「方向が未設定」注意書きに「地図で方向を設定」ボタン(スポット判定と同じ見た目・仕様)
await p.evaluate(()=>{var s=document.getElementById('btRm');var els=[...s.querySelectorAll('*')].filter(x=>x.children.length===0&&/未設定のため/.test(x.textContent));els.forEach(function(el){var row=el;if(row.querySelector&&row.querySelector('button'))return;var b=document.createElement('button');b.className='ijX';b.setAttribute('style','width:auto;height:34px;padding:0 16px;font-size:14px;display:inline-flex;align-items:center;gap:6px;margin-top:6px;color:#ffc83c;border:1px solid #e8c060;font-weight:900;background:#151a22;border-radius:8px');b.textContent='地図で方向を設定';el.parentNode.appendChild(b);});});
await p.waitForTimeout(500);await hide();await p.screenshot({path:P+'.png'});
console.log(JSON.stringify(e));await b.close();})();
