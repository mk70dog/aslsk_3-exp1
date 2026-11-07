const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:657}});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>{S.scen=S.scen||{};S.scen.sel='S24';S.nmMode='judge';NAVTAB('los');});await p.waitForTimeout(3000);
await p.evaluate(async()=>{await btEnsureGraph();});await p.waitForTimeout(3000);
const setAB=()=>p.evaluate(()=>{var A=BTG.nodes[131],B=BTG.nodes[134];S_LOS.pxA={x:A.x,y:A.y};S_LOS.pxB={x:B.x,y:B.y};Draw();});
const st=()=>p.evaluate(()=>JSON.stringify({A:!!S_LOS.pxA,B:!!S_LOS.pxB,arm:!!NM_AB_ARM}));
const close=()=>p.evaluate(()=>{try{nmHqClose();}catch(x){}try{nmTvClose();}catch(x){}try{nmSuClose();}catch(x){}var v=document.getElementById('nmScV');if(v)v.remove();NM_TOOL=null;});
for(const [nm,fn] of [['board','nmHqOpen()'],['ref',"nmTvOpen('ref')"],['card','nmScenView()'],['setup','nmSuOpen()'],['tool',"nmToolArm('view')"]]){
 await close();await setAB();const b0=await st();await p.evaluate((fn)=>{eval(fn);},fn);await p.waitForTimeout(300);console.log(nm,'placed',b0,'->',await st());
 await close();await p.evaluate(()=>{S_LOS.pxA=null;S_LOS.pxB=null;NM_AB_ARM=true;});await p.evaluate((fn)=>{eval(fn);},fn);await p.waitForTimeout(300);console.log(nm,'armed ->',await st());}
await close();await setAB();await p.evaluate(()=>{nmIjOpen();});await p.waitForTimeout(800);await p.evaluate(()=>{nmHqOpen();});console.log('with spot judge open ->',await st());
console.log(JSON.stringify(e));await b.close();})();
