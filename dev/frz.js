const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657},hasTouch:true});const e=[];p.on('pageerror',x=>e.push(String(x)));p.on('console',m=>{if(m.type()==='error')e.push('console:'+m.text().slice(0,200));});
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S24';S.nmMode='judge';NAVTAB('los');});await p.waitForTimeout(3000);
await p.evaluate(async()=>{await btEnsureGraph();});await p.waitForTimeout(3000);
const pt=await p.evaluate(()=>{var c=-1,bd=1e9;BTG.nodes.forEach(function(N,i){if(!N)return;var q=nmClientOfNode(i);if(!q)return;var d=Math.hypot(q.x-700,q.y-300);if(d<bd){bd=d;c=i;}});var t=c;for(var k=0;k<3;k++)t=BTG.nodes[t].nb[3]||t;return {a:nmClientOfNode(c),b:nmClientOfNode(t)};});
const overlays=()=>p.evaluate(()=>{var o=[];document.querySelectorAll('body *').forEach(function(el){var cs=getComputedStyle(el);if((cs.position==='fixed'||cs.position==='absolute')&&cs.pointerEvents!=='none'&&cs.display!=='none'&&cs.visibility!=='hidden'){var r=el.getBoundingClientRect();if(r.width>=innerWidth*0.9&&r.height>=innerHeight*0.9&&+cs.zIndex>100)o.push((el.id||el.className||el.tagName)+'@'+cs.zIndex);}});return o.join(',');});
const state=()=>p.evaluate(()=>JSON.stringify({A:!!S_LOS.pxA,B:!!S_LOS.pxB,arm:NM_AB_ARM,tool:NM_TOOL,hq:!!document.getElementById('nmHq'),ij:!!document.getElementById('nmIj'),rm:!!document.getElementById('btRm'),pick:!!NM_PICK}));
// real flow: press A→B button then tap two hexes
const tapBtn=async(sel)=>{const r=await p.evaluate((sel)=>{var b=document.querySelector(sel);if(!b)return null;var q=b.getBoundingClientRect();return {x:q.x+q.width/2,y:q.y+q.height/2};},sel);if(!r){console.log('no btn',sel);return;}await p.mouse.click(r.x,r.y);await p.waitForTimeout(500);};
for(const [nm,sel] of [['board','#nmFtAct button[onclick*="nmHqOpen"]'],['ref','#nmFtAct button[onclick*="nmTvOpen"]'],['view','#nmFtAct button[onclick*="nmToolArm(\'view\')"]'],['fire','#nmFtAct button[onclick*="nmToolArm(\'fire\')"]'],['menu','#nmFtAct button[onclick*="nmFtMenu"]']]){
  await p.evaluate(()=>{try{nmHqClose();nmTvClose();}catch(x){}var m=document.getElementById('nmFtMn');if(m)m.remove();NM_TOOL=null;try{nmFtActFill();}catch(x){}});
  await tapBtn('#nmFtAct button[onclick*="nmAbArm"],#nmFtAct button[onclick*="nmLosOff"]');
  await p.mouse.click(pt.a.x,pt.a.y);await p.waitForTimeout(400);await p.mouse.click(pt.b.x,pt.b.y);await p.waitForTimeout(800);
  console.log(nm,'after AB',await state(),'ov:',await overlays());
  await tapBtn(sel);console.log(nm,'after btn',await state(),'ov:',await overlays());
  await p.mouse.click(300,500);await p.waitForTimeout(500);console.log(nm,'after map tap',await state());}
console.log(JSON.stringify(e));await b.close();})();
