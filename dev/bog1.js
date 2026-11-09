const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820},deviceScaleFactor:2});const E=[];p.on('pageerror',x=>E.push(String(x)));
await p.goto('file://'+__dirname+'/../index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1000);
const mock=process.argv[3]==='mock';
const r=await p.evaluate(async(mock)=>{const W=ms=>new Promise(r=>setTimeout(r,ms));S.scen=S.scen||{};S.scen.sel='S24';for(var i=0;i<4;i++){try{Draw();}catch(e){}await W(1500);}await btEnsureGraph();var o=[];
try{nmScOpen('nmHqBogOpen');await W(800);var v=nmIjVehs(NM_SC.nat).filter(x=>x.kind==='veh')[0];nmScSet('v',{kind:'veh',id:v.id});await W(500);nmScGo();await W(2000);
try{var t=[...document.querySelectorAll('.nmToast,#btToast,[class*=toast]')];t.forEach(x=>x.remove());}catch(e){}
if(mock){var first=document.querySelector('#btRm .rmIt');var nats=nmSuNats();var cur=NM_SC?NM_SC.nat:nats[0];
var natB=nats.map(k=>'<button class="rmB'+(k===nats[1]?' on':'')+'" style="height:34px;padding:0 14px">'+nmNatLbl(k)+'</button>').join('');
var all=[].concat.apply([],nats.map(k=>nmIjVehs(k).filter(x=>x.kind==='veh').map(x=>({k:k,x:x}))));var vs=nmIjVehs(nats[1]).filter(x=>x.kind==='veh');
var vB=vs.map((x,i)=>'<button class="rmB'+(i===0?' on':'')+'" style="height:52px;padding:4px 12px;display:inline-flex;align-items:center;gap:8px">'+nmCtrChip(x.id,40)+'<span>'+x.nm+'</span></button>').join('');
first.outerHTML='<div class="rmIt" style="display:block;padding:6px 16px"><div style="display:flex;align-items:center;gap:10px"><span style="font-size:13px;color:#9fb2c8;width:56px">車両</span><span class="rmBtns">'+natB+'</span></div><div style="display:flex;gap:6px;flex-wrap:wrap;margin:8px 0 0 66px">'+vB+'</div></div>';
var hd=document.querySelector('#btRm .rmBox');var h=document.createElement('div');h.style.cssText='display:flex;align-items:center;gap:10px;padding:2px 16px 6px';h.innerHTML='<b style="font-size:17px;color:#7ec8e3;flex:1">ボグ判定(車両)</b><button class="rmB" style="height:34px">✕ 閉じる</button>';var grip=hd.firstElementChild;hd.insertBefore(h,grip.nextSibling);}
o.push('ok');}catch(e){o.push(String(e));}return o;},mock);
await p.waitForTimeout(500);await p.screenshot({path:process.argv[2]});console.log(E,r);await b.close();})();
