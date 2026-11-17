// 自己対戦: node sp.js S6 [maxMin] [seed]
const {chromium}=require('playwright');
const sc=process.argv[2]||'S6',maxMin=+(process.argv[3]||8),shot=process.argv[4]||'';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const e=[];p.on('pageerror',x=>e.push(String(x.stack||x).slice(0,600)));
p.on('console',m=>{const t=m.text();if(/Error|error|undefined/.test(t)&&!/favicon/.test(t))e.push('console:'+t.slice(0,200));});
await p.goto('file://'+(process.env.APP||'/tmp/w/idx_sp.html'),{timeout:180000});await p.waitForTimeout(4000);
await p.evaluate((sc)=>{S.scen=S.scen||{};S.scen.sel=sc;NAVTAB('scen');NAVTAB('los');try{LOS_PAGE();}catch(x){}},sc);await p.waitForTimeout(3000);
await p.evaluate((w)=>{if(w){var c=BT_SCFG[btScId()];c.aiw=Object.assign({},c.aiw||{},JSON.parse(w));}},process.env.AIW||'');
if(process.env.DBG)await p.evaluate(()=>{window.BT_DBG=[];});
// 監査(AUD=1): どちらの軍がどの行動を何回したかを数える(アプリのロジックは変えず、関数を包んで数えるだけ)
if(process.env.AUD)await p.evaluate(()=>{var A=window.BT_AUD={};function inc(k,side,n){var key=(side||'?')+'|'+k;A[key]=(A[key]||0)+(n==null?1:n);}
 function sid2side(id){var s=btStackById(id);return s&&s.side;}function mvSide(){return BT.mv&&BT.mv.side;}
 function wrap(nm,f){var o=window[nm];if(typeof o!=='function'){inc('関数なし:'+nm,'-');return;}window[nm]=function(){var a=arguments;var pre=f.pre?f.pre.apply(null,a):null;var r=o.apply(this,a);try{f.post(a,r,pre);}catch(e){}return r;};}
 wrap('btMoveStart',{post:function(a,r){if(r)return;var sd=sid2side(BT.mv&&BT.mv.sid);var op=a[2]||{};inc('歩兵の移動',sd);if(op.dt)inc('駆け足',sd);if(op.assault)inc('警戒移動',sd);}});
 wrap('btVMoveStart',{post:function(a,r){if(r)return;inc('車両の移動',sid2side(a[0]));}});
 wrap('btSmokeGrenade',{pre:mvSide,post:function(a,r,sd){if(typeof r!=='string')inc('発煙手榴弾',sd);else inc('発煙手榴弾(不可)',sd);}});
 wrap('btVehSmoke',{pre:mvSide,post:function(a,r,sd){inc('車両の発煙',sd);}});
 wrap('btDCPlace',{pre:mvSide,post:function(a,r,sd){if(typeof r!=='string')inc('DC設置'+(a[1]?'(車両へ)':''),sd);}});
 wrap('btAdvance',{pre:function(id){return sid2side(id);},post:function(a,r,sd){if(!r)inc('突撃(前進)',sd);}});
 wrap('btVExit',{pre:mvSide,post:function(a,r,sd){if(!r)inc('車両の退出',sd);}});
 wrap('btIExit',{pre:mvSide,post:function(a,r,sd){if(!r)inc('歩兵の盤外退出',sd);}});
 wrap('btUnbog',{post:function(a){inc('ボグ解消の試み',a[0]&&a[0].side);}});
 wrap('btLeaderCreate',{post:function(a,r){if(r)inc('指揮官の誕生',a[0]);}});
 wrap('btAIReactDFF',{post:function(a,r){inc('臨機射撃の検討',a[0]);if(r&&r.length)inc('臨機射撃',a[0],r.length);}});
 wrap('btRallySide',{pre:function(side,isAtt,log){return log.length;},post:function(a,r,n0){var L=a[2].slice(n0),sd=a[0];L.forEach(function(t){t=String(t);if(/自己回復/.test(t))inc('自己回復',sd);if(/を回復/.test(t))inc('指揮官による回復',sd);if(/修理/.test(t))inc('修理',sd);if(/回収/.test(t))inc('SW回収',sd);});inc('回復フェイズの処理',sd);}});
 wrap('btRoutSide',{pre:function(side,log){return log.length;},post:function(a,r,n0){var L=a[1].slice(n0);inc('潰走フェイズの処理',a[0]);L.forEach(function(t){t=String(t);if(/潰走/.test(t))inc('潰走',a[0]);if(/阻止/.test(t))inc('阻止',a[0]);if(/除去/.test(t))inc('潰走で除去',a[0]);});}});
 wrap('btShockRecover',{post:function(a){inc('ショック回復判定',a[0]||'両軍');}});
 wrap('btCCHex',{post:function(a){inc('白兵戦のヘクス',btSideNow());}});
});
const r0=await p.evaluate(async()=>{BTG=null;await btEnsureGraph();
  window.BT_SELFPLAY=true;var d=btNewState();for(var k in d)BT[k]=d[k];BT.on=true;BT.sc=btScId();BT.fastApp=true;BT.cam=false;btInitCtl();
  if(btScId()==='S26'){btAppSetupSOV();BT.gerPlan={t1:'g2',t2:'g1'};}else btSetupSides().forEach(function(sd){btAppSetupGen(sd);});
  window.btHumanCanReact=function(){return false;};
  var orig=window.btAppTick;window.__ticks=0;
  window.btAppTick=function(){window.__ticks++;try{if(BT.started&&!BT.finished){var att=btSideNow(),ph=btPhId();BT.app=(ph==='DFPh')?btOpp(att):att;if(ph==='RPh'&&BT.rph&&BT.rph.on){try{BT.rph.ask=null;BtRphAuto();BtRphEnd();}catch(x){console.log('rphErr '+(x.stack||x));}}if(BT.pend==='react'){BT.pend=null;}}}catch(x){console.log('wrapErr '+x);}return orig.apply(this,arguments);};
  BT.app=btFirst();BtStart();
  return {bl:btBldgs().map(b=>b.id+':'+b.hexes.join('/')+'='+(BT.ctl[b.id]||'-')),stacks:BT.stacks.length,setup:(BT.setupLog||[]).length,n:BTG.nodes.length};});
console.log(JSON.stringify(r0));
const t0=Date.now();let last='';
while(Date.now()-t0<maxMin*60000){await p.waitForTimeout(3000);
 const st=await p.evaluate(()=>({t:BT.turn,h:BT.half,ph:btPhId(),fin:BT.finished,ticks:window.__ticks,mv:!!BT.mv,pend:BT.pend,n:BT.stacks.length}));
 const k=JSON.stringify(st);if(k!==last){last=k;console.log(k);}
 if(st.fin)break;
 if(!BT_ALIVE_CHECK(st))0;
 await p.evaluate(()=>{if(!BT_TICK)btKick(50);});
}
function BT_ALIVE_CHECK(){return 1;}
const fin=await p.evaluate(()=>{var vc=btVicCount();return {fin:BT.finished,turn:BT.turn,vc:vc,win:BT.finished?btCfgWinner():null,ger:BT.stacks.filter(s=>s.side==='GER').reduce((a,s)=>a+s.u.length,0),sov:BT.stacks.filter(s=>s.side==='SOV').reduce((a,s)=>a+s.u.length,0),log:(BT.log||[]).slice(-12).map(x=>String(x.t||x).slice(0,150))};});
console.log(JSON.stringify(fin,null,1));try{require('fs').appendFileSync('/tmp/w/res_'+(process.env.CFG||'x')+'.txt',JSON.stringify({tag:process.env.TAG||'',win:fin.win,turn:fin.turn,vc:fin.vc,ger:fin.ger,sov:fin.sov,err:e.length,bl:await p.evaluate(()=>btBldgs().map(b=>b.id+':'+b.hexes.join('/')+'='+(BT.ctl[b.id]||'-'))),afv:await p.evaluate(()=>BT.stacks.filter(s=>s.side==='GER'&&s.afv&&s.n!=null&&s.n>=0).map(s=>s.u.filter(u=>btI(u,'GER').kind==='afv').map(u=>u.nm+(u.imm?'(imm)':'')).join('+')))})+'\n');}catch(x){}require('fs').writeFileSync('/tmp/w/log_'+sc+'_'+(process.env.TAG||'x')+'.txt',(await p.evaluate(()=>(BT.log||[]).map(x=>String(x.t||x)).join('\n'))));
if(shot){await p.evaluate(()=>{BT.app=null;Draw();});await p.waitForTimeout(1500);await p.screenshot({path:shot});}
if(process.env.AUD)require('fs').writeFileSync('/tmp/w/aud_'+(process.env.TAG||'x')+'.json',JSON.stringify(await p.evaluate(()=>window.BT_AUD||{})));
if(process.env.DBG)require('fs').writeFileSync('/tmp/w/dbg_'+(process.env.TAG||'x')+'.json',JSON.stringify(await p.evaluate(()=>window.BT_DBG||[])));
console.log('ERRORS',e.length,JSON.stringify(e.slice(0,15)));await b.close();})();
