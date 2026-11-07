const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const e=[];p.on('pageerror',x=>e.push(String(x)));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'),{timeout:180000});await p.waitForTimeout(4000);
console.log(await p.evaluate(()=>{var out=[];var orig=losSWPPFromUid;
 [0,2,3,4,5].forEach(pp=>{[false,true].forEach(dt=>{S.move=S.move||{};S.move.mfCalc={doubleTime:dt};window.losSWPPFromUid=function(){return pp;};
  var g={pickerItems:[{pid:1,kind:'mmc',nat:'GER',label:'4-6-7[1]'},{pid:2,kind:'smc',nat:'GER',label:'9-1'}],sw:pp?['x']:[],swOwner:{x:1},latw:[]};
  var r=losUnitMFPerUnit(g,'A');out.push('PP'+pp+(dt?' 急速歩':' 通常')+' → MF '+r.mf);});});window.losSWPPFromUid=orig;return out.join('\n');}));
console.log(JSON.stringify(e));await b.close();})();
