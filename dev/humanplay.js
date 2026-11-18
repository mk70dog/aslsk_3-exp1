// 人間 対 アプリ の対戦を、人間の操作(画面のボタンと同じ関数)で1戦通す。不具合探し用。
// node dev/humanplay.js <シナリオ> <人間の軍 GER|SOV> [分の上限] [スクショのフォルダ]
// 出力: エラー・止まり(同じフェイズのまま)・UIの異常を表示し、/tmp/w/hp_<sc>_<side>.json に保存
const {chromium}=require('playwright');const fs=require('fs');
const sc=process.argv[2]||'S6',HU=process.argv[3]||'GER',maxMin=+(process.argv[4]||10),SHOT=process.argv[5]||'';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const E=[];
let ctx='init';p.on('pageerror',x=>E.push(ctx+' PAGE '+String(x.stack||x).slice(0,500)));
p.on('console',m=>{if(m.type()==='error'&&!/favicon|ERR_FILE/.test(m.text()))E.push(ctx+' CON '+m.text().slice(0,300));});
p.on('dialog',d=>{E.push(ctx+' DIALOG '+d.message().slice(0,100));d.dismiss();});
await p.goto('file://'+(process.env.APP||require('path').resolve(__dirname,'../index.html')),{timeout:180000});await p.waitForTimeout(4000);
await p.evaluate((sc)=>{S.scen=S.scen||{};S.scen.sel=sc;NAVTAB('scen');NAVTAB('los');try{LOS_PAGE();}catch(x){}},sc);await p.waitForTimeout(3000);
await p.evaluate(()=>{var o=window.btToast;window.__lastToast='';window.btToast=function(m){window.__lastToast=String(m);return o.apply(this,arguments);};});
const r0=await p.evaluate(async(HU)=>{BTG=null;await btEnsureGraph();
  var d=btNewState();for(var k in d)BT[k]=d[k];BT.on=true;BT.sc=btScId();BT.fastApp=true;BT.cam=false;btInitCtl();
  var APP=HU==='GER'?'SOV':'GER';BtSetApp(APP);
  if(btScId()==='S26'){if(APP==='SOV')btAppSetupSOV();else btAppSetupSOV();BT.gerPlan={t1:'g2',t2:'g1'};}else btSetupSides().forEach(function(sd){btAppSetupGen(sd);});
  window.__fx=0;try{S.nmFxOff=1;}catch(e){}
  BtStart();Draw();
  BT.stacks.filter(function(s){return s.side===HU&&s.pool;}).forEach(function(s){try{BtRgAuto(s.id);}catch(e){}});BT.regroup=null;
  window.__pools=BT.stacks.filter(function(s){return s.pool;}).length;
  return {app:BT.app,hu:btHuman(),started:BT.started,stacks:BT.stacks.length,first:btFirst()};},HU);
console.log('start',JSON.stringify(r0));
if(!r0.started){console.log('ERR not started',E);await b.close();return;}
const seen={},issues=[],AC={};let lastKey='',same=0;const t0=Date.now();
while(Date.now()-t0<maxMin*60000){
  const st=await p.evaluate(()=>({key:btPhKey(),ph:btPhId(),fin:!!BT.finished,pend:BT.pend||null,mv:!!BT.mv,mvSide:BT.mv&&BT.mv.side,att:btSideNow(),hu:btHuman(),acts:btHumanActs(btPhId()),rph:!!(BT.rph&&BT.rph.on),rtp:!!BT.rtp,ccq:!!BT.ccq,bogp:!!BT.bogp,dice:!!BT.dicePend,fx:!!(typeof BT_FX_CUR!=='undefined'&&BT_FX_CUR),fire:!!BT.fire,winShown:!!BT.winShown}));
  ctx=st.key;
  if(st.fin){break;}
  if(st.key!==lastKey){lastKey=st.key;same=0;
    if(SHOT&&!seen[st.ph+(st.acts?'H':'A')]){seen[st.ph+(st.acts?'H':'A')]=1;await p.waitForTimeout(600);await p.screenshot({path:SHOT+'/'+sc+'_'+HU+'_'+st.key+'.png'});}
  }else same++;
  if(same>40){issues.push('STALL '+JSON.stringify(st));const dump=await p.evaluate(()=>JSON.stringify({pend:BT.pend,mv:BT.mv&&{sid:BT.mv.sid,side:BT.mv.side},aiDone:BT.aiDone,key:btPhKey(),rph:BT.rph,ccq:!!BT.ccq,rtp:!!BT.rtp,dicePend:BT.dicePend,fxQ:(typeof BT_FX_Q!=='undefined')?BT_FX_Q.length:-1,fxPend:(typeof BT_FX_PEND!=='undefined')?BT_FX_PEND:null,arr:typeof BT_ARR!=='undefined'?!!BT_ARR:null,arrq:typeof BT_ARRQ!=='undefined'?BT_ARRQ.length:null}).slice(0,800));issues.push('DUMP '+dump);if(SHOT)await p.screenshot({path:SHOT+'/'+sc+'_'+HU+'_STALL.png'});break;}
  // 人間の操作
  const act=await p.evaluate(async()=>{var out=[];function w(ms){return new Promise(r=>setTimeout(r,ms));}
    function NM(n){return (n!=null&&n>=0&&BTG.nodes[n])?BTG.nodes[n].nm:'off';}
    try{
    var hu=btHuman(),ph=btPhId(),att=btSideNow();
    if(typeof BT_FX_CUR!=='undefined'&&BT_FX_CUR){try{btFxClose&&btFxClose();}catch(e){}}
    if(BT.dicePend){try{BtDiceGo();out.push('dice');}catch(e){out.push('diceErr '+e);}return out;}
    if(BT.bogp){try{BtBogAll();BtBogEnd();out.push('bog');}catch(e){out.push('bogErr '+e);}return out;}
    if(BT.pend==='react'&&BT.mv&&BT.mv.side!==hu){ // 人間の臨機射撃
      var m=btStackById(BT.mv.sid);var fired=false;
      if(m&&Math.random()<0.7){var cand=BT.stacks.filter(function(s){return s.side===hu&&s.n!=null&&s.n>=0&&btInf(s).some(function(u){return u.s==='ok'&&!u.fire;})&&btDist(s.n,m.n)<=6&&btLOS(s.n,m.n,true).ok;});
        if(cand.length){var s=cand[0];BT.sel=null;BtSelect(s.id);BtFireStart();if(BT.fire){if(BT.fire.tgtN==null)btFireTap(m.n);BtFireRoll();fired=true;out.push('DFF '+NM(s.n));if(BT.fire)BtFireCancel();}}}
      BtReactContinue(false);out.push('react'+(fired?'+fire':''));return out;}
    if(!btHumanActs(ph)){return out;}
    if(ph==='RPh'&&BT.rph&&BT.rph.on){BtRphAuto();await w(100);BtRphEnd();out.push('rph');return out;}
    if(ph==='RtPh'&&BT.rtp){BtRtpAuto();await w(100);if(BT.rtp)BtRtpEnd();out.push('rtp');return out;}
    if(ph==='CCPh'&&BT.ccq){BtCcAuto();out.push('cc');return out;}
    var H=function(){return BT.stacks.filter(function(s){return s.side===hu&&s.n!=null&&s.n>=0;});};
    function enemyStacks(){return BT.stacks.filter(function(s){return s.side!==hu&&s.n!=null&&s.n>=0&&(btInf(s).length||btAFVs(s).length);});}
    function fireRound(lim){var k=0;H().forEach(function(s){if(k>=lim)return;if(!btInf(s).some(function(u){return btGO(u);}))return;
      var tg=enemyStacks().filter(function(e){return btInf(e).length&&btDist(e.n,s.n)<=8&&btLOS(s.n,e.n,true).ok;}).sort(function(a,b){return btDist(a.n,s.n)-btDist(b.n,s.n);})[0];if(!tg)return;
      BT.sel=null;BtSelect(s.id);BtFireStart();if(!BT.fire)return;btFireTap(tg.n);if(BT.fire&&BT.fire.tgtN!=null){BtFireRoll();k++;out.push('fire '+NM(s.n)+'→'+NM(tg.n)+(BT.fire&&BT.fire.err?' err:'+BT.fire.err:''));}if(BT.fire)BtFireCancel();});}
    if(ph==='PFPh'||ph==='DFPh'||ph==='AFPh'){if(!BT.__hfDone||BT.__hfDone!==btPhKey()){BT.__hfDone=btPhKey();fireRound(4);await w(200);return out;}}
    if(ph==='MPh'){if(BT.__hmDone!==btPhKey()){BT.__hmDone=btPhKey();BT.__hmMoved={};BT.__hmN=0;BT.__hmQ=[1];BT.__hvQ=H().filter(function(s){return btAFVs(s).length;}).map(function(s){return s.id;});}
      if(BT.mv){ // 移動中: 次の1歩
        if(BT.mv.veh){var vq=BT.__hvPath||[];if(vq.length){var to=vq.shift();var r=btVMoveStep(to);if(typeof r==='string'){out.push('vstepErr '+r);BtVStopEnd();BT.__hvPath=[];}else{btVAfterStep(r);out.push('vstep');}}else{BtVStopEnd();out.push('vend');}return out;}
        var q=BT.__hmPath||[];if(q.length){var to2=q.shift();btMoveTap(to2);out.push('step '+NM(to2));}else{BtMoveEnd();out.push('mend');}return out;}
      if(BT.__hmQ&&BT.__hmQ.length){var PL=btAIPlanMoves(hu).filter(function(x){return !BT.__hmMoved[x.sid];});if(!PL.length||BT.__hmN>=8){BT.__hmQ=[];return out;}var pl=PL[0];BT.__hmMoved[pl.sid]=1;BT.__hmN++;var s2=btStackById(pl.sid);if(s2&&!pl.exitNow){BT.sel=null;BtSelect(s2.id);BT.selU=null;BtMoveStart({dt:pl.dt,assault:pl.assault});if(BT.mv){BT.__hmPath=pl.path.slice();out.push('move '+NM(s2.n)+' dt'+(pl.dt?1:0));}else out.push('moveStartFail '+window.__lastToast+' units='+s2.u.map(function(u){return u.nm+':'+u.s+(u.fire?':'+u.fire:'');}).join('/'));}return out;}
      if(BT.__hvQ&&BT.__hvQ.length){var vsid=BT.__hvQ.shift(),vS=btStackById(vsid);if(vS&&vS.n!=null){var pl2=null;try{pl2=btAIVehPlan(vS);}catch(e){}var vu=btAFVs(vS)[0];if(vu&&pl2&&pl2.path&&pl2.path.length){BtVMove(vS.id,vu.id);if(BT.mv){BT.__hvPath=pl2.path.slice();out.push('vmove');}}}return out;}
    }
    if(ph==='APh'&&BT.__haDone!==btPhKey()){BT.__haDone=btPhKey();var k2=0;H().forEach(function(s){if(k2>=2)return;var go=btInf(s).filter(function(u){return u.s==='ok';});if(!go.length)return;
      var to=BTG.nodes[s.n].nb.filter(function(n){return BT.stacks.some(function(e){return e.side!==hu&&e.n===n&&btInf(e).length&&btInf(e).every(function(u){return u.s==='br';});});})[0];if(to==null)return;
      BT.sel=null;BtSelect(s.id);BtAdvStart();if(BT.advMode){btAdvTap(to);k2++;out.push('adv '+NM(to));BT.advMode=null;}});return out;}
    // 人間の番の終わり
    BtNext();out.push('next '+ph);
    }catch(e){out.push('EXC '+(e.stack||e).toString().slice(0,300));}
    return out;});
  act.forEach(a=>{const k=a.split(' ')[0];AC[k]=(AC[k]||0)+1;});if(act.length)same=0;if(process.env.HPDBG)console.log(st.key,st.acts?'H':'-',st.pend||'',act.join(','));if(process.env.HPDBG&&/MPh/.test(st.key)&&st.acts&&!act.length)console.log('   HS',await p.evaluate(()=>BT.stacks.filter(s=>s.side===btHuman()).map(s=>(s.n!=null&&s.n>=0?BTG.nodes[s.n].nm:'off'+(s.pool?'(pool)':''))+':'+s.u.map(u=>u.nm+(u.mvdone?'*':'')).join('/')).join(' | ')));
  if(act.length&&act.some(a=>/EXC|Err|Fail/.test(a)))issues.push(ctx+' '+act.join(','));
  await p.waitForTimeout(act.length?250:400);
}
// UIの確認(終了時)
const fin=await p.evaluate(()=>{var r={fin:!!BT.finished,turn:BT.turn,win:null,vc:null};try{r.vc=btVicCount();}catch(e){}try{r.winModal=!!document.getElementById('btWinM')&&getComputedStyle(document.getElementById('btWinM')).display!=='none';}catch(e){}
  try{var t=btRecExportText?btRecExportText():null;}catch(e){}
  return r;});
// メニュー・保存・記録などの操作を一通り
const ui=await p.evaluate(async()=>{var out=[];function w(ms){return new Promise(r=>setTimeout(r,ms));}
  var fns=[['BtMnTab0',()=>BtMnTab&&BtMnTab(0)],['BtMnTab1',()=>BtMnTab(1)],['BtMnTab2',()=>BtMnTab(2)],['BtMnTab3',()=>BtMnTab(3)],['BtTopLog',()=>BtTopLog()],['BtTopVic',()=>BtTopVic()],['BtSvOpen',()=>BtSvOpen()],['BtSvSave',()=>BtSvSave()],['BtSvClose',()=>BtSvClose()],['BtMapFull',()=>BtMapFull()],['BtMapFull2',()=>BtMapFull()],['BtFxOpen',()=>BtFxOpen&&BtFxOpen()],['BtNextFin',()=>BtNext()]];
  for(const [n,f] of fns){try{f();Draw();await w(150);out.push(n+':ok');}catch(e){out.push(n+':EXC '+String(e).slice(0,120));}}
  return out;});
const res={AC,sc,HU,dur:Math.round((Date.now()-t0)/1000),fin,issues,errors:E.slice(0,40),nErr:E.length,ui:ui.filter(x=>/EXC/.test(x))};
fs.writeFileSync('/tmp/w/hp_'+sc+'_'+HU+'.json',JSON.stringify(res,null,1));
console.log(JSON.stringify({AC,sc,HU,dur:res.dur,fin,nIssues:issues.length,nErr:E.length,ui:res.ui}));
issues.slice(0,8).forEach(x=>console.log('  ISSUE',x.slice(0,400)));E.slice(0,8).forEach(x=>console.log('  ERR',x.slice(0,400)));
if(SHOT)await p.screenshot({path:SHOT+'/'+sc+'_'+HU+'_END.png'});
await b.close();})();
