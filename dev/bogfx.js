const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const e=[];p.on('pageerror',x=>e.push(String(x).slice(0,300)));
await p.goto('file:///home/claude/aslsk_3-exp1/index.html',{timeout:180000});await p.waitForTimeout(4000);
await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S25';NAVTAB('scen');NAVTAB('los');try{LOS_PAGE();}catch(x){}});await p.waitForTimeout(3000);
const r=await p.evaluate(async()=>{BTG=null;await btEnsureGraph();var d=btNewState();for(var k in d)BT[k]=d[k];BT.on=true;BT.sc=btScId();btInitCtl();
 btSetupSides().forEach(function(sd){btAppSetupGen(sd);});BT.app=null;BtStart();
 // 独軍の移動フェイズへ
 var g=0;while(!(btPhId()==='MPh'&&btSideNow()==='GER')&&g++<20){try{BtNext();}catch(x){return 'np '+x;}}
 var L=[];BT.stacks.forEach(s=>{if(s.side==='GER')btAFVs(s).forEach(u=>L.push([s,u]));});
 var occ={};BT.stacks.forEach(s=>occ[s.n]=1);var gs={n:BTG.nodes.findIndex((nd,i)=>!occ[i]&&i>50)};L.slice(0,2).forEach(x=>{x[1].bog=1;if(x[0].n==null||x[0].n<0){x[0].n=gs.n;}});BT.bogp=null;BT.bogDone=null;Draw();
 return {ph:btPhId(),side:btSideNow(),n:L.length,g:g};});
console.log(JSON.stringify(r));await p.waitForTimeout(1500);
await p.screenshot({path:'/tmp/t/b1.png'});
await p.evaluate(()=>{var x=btBogElig('GER')[0];BtBog(x.s.id,x.u.id);});
await p.waitForTimeout(600);await p.screenshot({path:'/tmp/t/b2.png'});
console.log(await p.evaluate(()=>({anim:!!document.getElementById('diceAnim'),fx:!!document.getElementById('btFx')})));
await p.waitForTimeout(2600);await p.screenshot({path:'/tmp/t/b3.png'});
console.log(await p.evaluate(()=>({anim:!!document.getElementById('diceAnim'),fx:!!document.getElementById('btFx'),fxt:(document.getElementById('btFx')||{}).innerText})));
console.log('ERR',e);await b.close();})();
