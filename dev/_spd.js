// 自己対戦: node sp.js S6 [maxMin] [seed]
const {chromium}=require('playwright');
const sc=process.argv[2]||'S6',maxMin=+(process.argv[3]||8),shot=process.argv[4]||'';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const e=[];p.on('pageerror',x=>e.push(String(x.stack||x).slice(0,600)));
p.on('console',m=>{const t=m.text();if(/Error|error|undefined/.test(t)&&!/favicon/.test(t))e.push('console:'+t.slice(0,200));});
await p.goto('file:///home/claude/aslsk_3-exp1/index.html',{timeout:180000});await p.waitForTimeout(4000);
await p.evaluate((sc)=>{S.scen=S.scen||{};S.scen.sel=sc;NAVTAB('scen');NAVTAB('los');try{LOS_PAGE();}catch(x){}},sc);await p.waitForTimeout(3000);
const r0=await p.evaluate(async()=>{window.BT_DBG=[];BTG=null;await btEnsureGraph();
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
 const hk=st.t+'.'+st.h;if(hk!==global.__hk){global.__hk=hk;const m=await p.evaluate(()=>{try{var att=btFirst();var tg=[];btBldgs().forEach(function(b){btBldgNodes(b).forEach(function(n){tg.push(n);});});var D={};var q=tg.slice();tg.forEach(function(n){D[n]=0;});while(q.length){var x=q.shift();BTG.nodes[x].nb.forEach(function(y){if(D[y]==null){D[y]=D[x]+1;q.push(y);}});}
 var ds=BT.stacks.filter(function(s){return s.side===att&&s.n!=null&&s.n>=0&&btInf(s).some(function(u){return u.s==='ok';});}).map(function(s){return D[s.n];}).sort(function(a,b){return a-b;});
 var off=BT.stacks.filter(function(s){return s.side===att&&(s.n==null||s.n<0);}).length;var ctl={};for(var k in BT.ctl)ctl[BT.ctl[k]]=(ctl[BT.ctl[k]]||0)+1;return {att:att,dist:ds.join(','),off:off,ctl:ctl};}catch(e){return String(e);}});console.log('M '+hk+' '+JSON.stringify(m));}
 if(st.fin)break;
 if(!BT_ALIVE_CHECK(st))0;
 await p.evaluate(()=>{if(!BT_TICK)btKick(50);});
}
function BT_ALIVE_CHECK(){return 1;}
const fin=await p.evaluate(()=>{var vc=btVicCount();return {fin:BT.finished,turn:BT.turn,vc:vc,win:BT.finished?btCfgWinner():null,ger:BT.stacks.filter(s=>s.side==='GER').reduce((a,s)=>a+s.u.length,0),sov:BT.stacks.filter(s=>s.side==='SOV').reduce((a,s)=>a+s.u.length,0),log:(BT.log||[]).slice(-12).map(x=>String(x.t||x).slice(0,150))};});
console.log(JSON.stringify(fin,null,1));require('fs').writeFileSync('/tmp/w/m_'+sc+'_'+(process.env.TAG||'x')+'.txt',(await p.evaluate(()=>(BT.log||[]).map(x=>String(x.t||x)).join('\n'))));
if(shot){await p.evaluate(()=>{BT.app=null;Draw();});await p.waitForTimeout(1500);await p.screenshot({path:shot});}
console.log('CCDBG '+JSON.stringify(await p.evaluate(()=>(window.BT_DBG||[]).filter(x=>/CC/.test(x.t)))));console.log('ERRORS',e.length,JSON.stringify(e.slice(0,15)));await b.close();})();
