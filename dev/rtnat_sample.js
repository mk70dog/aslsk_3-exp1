// サンプル(モック)x3: 潰走地図の国籍選択
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820},deviceScaleFactor:2});const E=[];p.on('pageerror',x=>E.push(String(x)));
await p.goto('file://'+__dirname+'/../index.html',{timeout:180000});await p.waitForTimeout(4000);await p.evaluate(()=>NAVTAB('los'));await p.waitForTimeout(1000);
await p.evaluate(async()=>{try{localStorage.setItem('nmRtmPos',JSON.stringify({x:140,y:690}));localStorage.setItem('nmRtmPenPos',JSON.stringify({x:700,y:330}));}catch(e){}S.scen=S.scen||{};S.scen.sel='S24';for(var i=0;i<4;i++){try{Draw();}catch(e){}await new Promise(r=>setTimeout(r,1500));}await btEnsureGraph();nmRtmStart();});await p.waitForTimeout(800);
await p.evaluate(async()=>{var N=BTG.nodes,id=nm=>N.findIndex(n=>n.nm===nm);var tap=n=>{window.__H=nmHexOfNode(n);window.losHexAtClient=()=>window.__H;return nmRtmTap(1,1);};tap(id('vN7'));tap(id('vP9'));NM_RTM.sel=null;Draw();await new Promise(r=>setTimeout(r,500));});
for(const v of ['A','B','C']){
 await p.evaluate((v)=>{var old=document.getElementById('natMock');if(old)old.remove();var bn=document.getElementById('nmRtmBn');var chip=(t,on,col)=>'<span style="display:inline-block;padding:4px 12px;margin:0 3px;border-radius:7px;font-weight:800;font-size:13px;border:2px solid '+(on?'#fff':'transparent')+';background:'+(on?col:'#222c38')+';color:'+(on?'#000':col)+'">'+t+'</span>';
  var sov='#e05050',ger='#8fa6bd';
  if(v==='A'){var d=document.createElement('div');d.id='natMock';d.setAttribute('style','margin-bottom:4px;display:flex;align-items:center;gap:4px;font-size:12px;color:#9ab');d.innerHTML='<span>逃げる側</span>'+chip('独軍',0,ger)+chip('ソ連',1,sov)+'<span style="margin-left:10px">敵は自動(反対側)</span>';bn.insertBefore(d,bn.firstChild);}
  if(v==='B'){var d=document.createElement('span');d.id='natMock';d.innerHTML='<span style="display:inline-block;padding:3px 10px;margin-right:6px;border-radius:7px;font-weight:900;font-size:13px;background:'+sov+';color:#000;border:2px solid #fff">ソ連 ⇄</span>';var row=bn.firstElementChild;row.insertBefore(d,row.children[2]);}
  if(v==='C'){var d=document.createElement('div');d.id='natMock';d.setAttribute('style','position:fixed;left:520px;top:20px;z-index:9470;background:#0e1620ee;border:1px solid #4a5566;border-radius:10px;padding:6px 10px;color:#dfe8f0;font:13px/1.9 AppFont,AppJP,monospace');d.innerHTML='<div><span style="color:#678;cursor:move">⠿</span> <b style="color:#ffd040">国籍</b></div><div>逃げる側 '+chip('独軍',0,ger)+chip('ソ連',1,sov)+'</div><div>敵 '+chip('独軍',1,ger)+chip('ソ連',0,sov)+'</div>';document.body.appendChild(d);}
 },v);await p.waitForTimeout(300);
 await p.screenshot({path:'/tmp/sm/nat'+v+'.png'});}
console.log(E);await b.close();})();
