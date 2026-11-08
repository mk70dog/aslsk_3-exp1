module.exports=function(){
var P='radial-gradient(circle,#000000aa 1px,transparent 1.35px) 0 0/4px 4px,radial-gradient(circle at 50% 70%,#ffffff14 1px,transparent 1.4px) 0 0/4px 4px,#1c1f27',
B='radial-gradient(circle,#000000aa .9px,transparent 1.25px) 0 0/4px 4px,radial-gradient(circle at 50% 70%,#ffffff10 .9px,transparent 1.3px) 0 0/4px 4px,linear-gradient(#131313 0%,#0d0d0d 50%,#080808 100%)',
SH='0 4px 0 #0e0e0c,0 5px 2px #0000008c,inset 0 1px 0 #ffffff1f,inset 1px 0 0 #ffffff0f,inset -1px 0 0 #0000002e,inset 0 -2px 0 #00000038',
RV='radial-gradient(circle 1.6px at 5px 5px,#3e4335 99%,transparent 100%),radial-gradient(circle 1.6px at calc(100% - 5px) 5px,#3a3f1f 99%,transparent 100%),radial-gradient(circle 1.6px at 5px calc(100% - 5px),#423c10 99%,transparent 100%),radial-gradient(circle 1.6px at calc(100% - 5px) calc(100% - 5px),#43474b 99%,transparent 100%)',
R='html:root #nmIj ',BTN=R+'.ijB,'+R+'.ijX,'+R+'.ijGo,'+R+'.ijMini,'+R+'.ijC,'+R+'.ijF';
var css=R+'.ijBox{background:'+P+'!important;border:1px solid #4a5566!important;border-radius:10px!important;box-shadow:0 8px 24px #000c!important;color:#ccddee!important}'
+R+'.ijCp,'+R+'.ijLos,'+R+'.ijR,'+R+'.ijFt{background:#12151b!important;border-radius:8px!important;border:1px solid #2a3140!important}'
+BTN+'{background:'+B+'!important;border:0!important;border-radius:3px!important;box-shadow:'+SH+'!important;color:#ccddee!important;position:relative}'
+BTN.split(',').map(function(x){return x+'::before';}).join(',')+'{content:""!important;position:absolute;inset:0;pointer-events:none;background-image:'+RV+'!important;background-repeat:no-repeat!important}'
+BTN.split(',').map(function(x){return x+'[data-dice]::before';}).join(',')+'{content:none!important;background-image:none!important}'
+R+'.ijB.on{color:#ffd070!important;font-weight:700;box-shadow:'+SH+',0 0 0 2px #c8a032!important}'
+R+'.ijB:active{transform:translateY(2px)}';
return css;};
