const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657},deviceScaleFactor:2});const e=[];p.on('pageerror',x=>e.push(String(x)));p.on('console',m=>{if(/lw tgt/.test(m.text()))e.push(m.text());});
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S24';NAVTAB('los');});await p.waitForTimeout(2000);
await p.evaluate(async()=>{S.scen=S.scen||{};S.nmMode='judge';await btEnsureGraph();try{Draw();}catch(x){}await new Promise(r=>setTimeout(r,800));S.turn=S.turn||{};S.turn.phase='dfph';});
await p.waitForTimeout(6000);const P=process.argv[2];
const hide=()=>p.evaluate(()=>{[...document.querySelectorAll('body *')].filter(x=>x.children.length<3&&/自軍・敵軍を自動で設定/.test(x.textContent)).forEach(x=>{var t=x;while(t.parentElement&&t.parentElement!==document.body)t=t.parentElement;if(!/btRm|nmPickBn/.test(t.id))t.style.display='none';});});
const txt=()=>p.evaluate(()=>{var o=document.getElementById('btRm');return o?o.innerText.replace(/\s+/g,' ').slice(0,700):'none'});
const r=await p.evaluate(()=>{var o=['scen='+S.scen.sel+' nats='+nmSuNats().join('/')];var c=BTG.nodes.findIndex(function(N){return N&&N.y>330&&N.y<420&&N.x>560&&N.x<640;});var A=BTG.nodes[c];S_LOS.pxA={x:A.x,y:A.y};for(const nat of nmSuNats()){NM_SC=null;nmScOpen('nmLwOpen');if(!NM_SC)return 'no sc';nmScSet('nat',nat);var ob=nmSuOb(nat).filter(x=>x.kind==='mmc');NM_SC.cs={};NM_SC.cs[ob[0].kind+'|'+ob[0].id]=1;nmScGo();if(NM_LW&&NM_LW.wid){o.push(nat+' ok '+NM_LW.wid);return o.join(',');}o.push(nat+' none');try{BtRmClose();}catch(x){}}return o.join(',');});
console.log(r);await p.waitForTimeout(800);await hide();
console.log(await txt());await p.screenshot({path:P+'_1.png'});
await p.evaluate(()=>{nmLwPick(NM_LW.n,null);});await p.waitForTimeout(800);await hide();await p.screenshot({path:P+'_2.png'});
console.log('pick',await p.evaluate(()=>NM_PICK&&NM_PICK.list.length));
// tap an empty green hex
const pt=await p.evaluate(()=>{var P=NM_PICK;var x=P.list.find(q=>!nmTgtAt(nmSideList(NM_LW.sd==='f'?'e':'f'),q.tn)&&q.d>=3);var c=nmClientOfNode(x.tn);return c?{x:c.x,y:c.y,tn:x.tn}:null;});
console.log('tap',JSON.stringify(pt));
if(pt){await p.evaluate((pt)=>{var r=nmPickTap(pt.x,pt.y);if(NM_PICK)nmLwPickEnd(pt.tn);},pt);}
await p.waitForTimeout(800);await hide();console.log(await txt());await p.screenshot({path:P+'_3.png'});
await p.evaluate(()=>{var od=NM_LW.sd==='f'?'e':'f';var nats=nmLwFoeNats();var v=null;nats.forEach(k=>{var vs=nmIjVehs(k).filter(o=>o.kind==='veh');if(!v&&vs.length)v=vs[0];});if(v)nmLwPendSet(NM_LW.n,v.id);});
await p.waitForTimeout(800);await hide();console.log(await txt());await p.screenshot({path:P+'_4.png'});
console.log(JSON.stringify(e));await b.close();})();
