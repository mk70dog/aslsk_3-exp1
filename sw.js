// ASL SK Judge Service Worker (オフライン起動用)
// 更新のたびに APP_VERSION を index.html の APP_VERSION と同じ値に更新すること(古い版が出続けるのを防ぐ)。
var APP_VERSION='ASLSK3M-v12.931';
var CACHE='aslsk-'+APP_VERSION;
var CORE=['./index.html','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png','./icon-512m.png'];
self.addEventListener('install',function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){
    // index.htmlは巨大(70MB級)のため1回だけ取得する。HTTPキャッシュを避けて常に最新を保存。
    return Promise.all(CORE.map(function(u){return c.add(new Request(u,{cache:'reload'})).catch(function(){});}));
  }).then(function(){return self.skipWaiting();}));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.filter(function(k){return k.indexOf('aslsk-')===0&&k!==CACHE;}).map(function(k){return caches.delete(k);}));
  }).then(function(){return self.clients.claim();}));
});
self.addEventListener('fetch',function(e){
  var req=e.request;
  if(req.method!=='GET')return;
  var url=new URL(req.url);
  // ページ本体(ナビゲーション)は常にキャッシュ済みindex.htmlを返す(?クエリ付きでも同一)
  if(req.mode==='navigate'){
    e.respondWith(caches.match('./index.html').then(function(r){return r||fetch(req);}));
    return;
  }
  // 同一オリジンの静的ファイル: キャッシュ優先
  if(url.origin===self.location.origin){
    e.respondWith(caches.match(req).then(function(r){return r||fetch(req);}));
    return;
  }
  // Google Fonts(CSS/フォント): 取得できたら保存し、オフライン時は保存分を使う
  if(/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)){
    e.respondWith(caches.open(CACHE).then(function(c){
      return c.match(req).then(function(hit){
        var net=fetch(req).then(function(res){c.put(req,res.clone());return res;}).catch(function(){return hit;});
        return hit||net;
      });
    }));
  }
});

var APP_VERSION_HIST_v1303="v1303(ダルマ指示「修正実施」): 記録の書き出し(BtRecExport)の result を btCfgNeed/btCfgWinner に(S6は need=2・勝者はシナリオの勝利条件)。ゲーム終了後の btRecPh は END(スナップショット・nowの表記)。";
var APP_VERSION_HIST_v1304="v1304(ダルマ指示「実施」): 回復フェイズ画面を案Aに(回復できる部隊をカード一覧・駒画像・成功率・自己/指揮官の選択肢、SWは下段)。連携射撃パネルをヘクスごとの行(駒画像・FP・指揮官の有無)+合計・指揮官なし警告に変更(btFireCardsHTML)。";
var APP_VERSION_HIST_v1305="v1305(ダルマ指示「B実施」): 射撃パネルをサンプルB(攻撃のヘクスごとの駒・FP・指揮官★/! ▶ 合計FP→列・DRM ▶ 目標の駒 ▶ 結果の見込みバー の1行)に。通常射撃・連携射撃とも同じ(btFireCardsHTML)。";
var APP_VERSION_HIST_v1306="v1306(ダルマ指示「連携時も同じようなパネルのサンプル」の確認中に発見): 射撃パネルの指揮官マーク(★/!)が駒の右端からずれる表示を修正。";
var APP_VERSION_HIST_v1307="v1307(ダルマ指示「3種類画面設定で変更可能にする」): 対戦モードの上バー(フェイズ・手番・次へ・勝利)を下バーに。A=ドック/B=シェブロン/C=2段の3種類+従来の上バーを、メニュー「下バーの形」で切り替え(既定A)。最後の記録の帯は廃止し「履歴」ボタンで戦闘記録を開く。攻撃・移動などの操作ボタンは下バーの上に浮かぶ。";
var APP_VERSION_HIST_v1308="v1308(ダルマ指示「アプリ対戦モードからシナリオ選択可能に」→実施): 対戦モードの≡メニューに「シナリオ選択」を追加。対戦の途中で別シナリオのAPPを押すと「やめる/先にセーブ/切り替える」の確認を出してから切り替え。";
var APP_VERSION_HIST_v1309="v1309(ダルマ報告「S25 新しく始めるができない」): 「新しい対戦」と「配置完了・ゲーム開始」(未配置の部隊が残る時)が「もう一度押す」案内のトーストだけで気づけなかった→確認の窓(やめる/最初からやり直す、配置に戻る/このまま開始)に。";
var APP_VERSION_HIST_v1310="v1310(ダルマ報告「新しく始めても前のカウンターがマップに残っている」): 「新しい対戦」で、対戦の駒だけでなく地図に置いた自軍・敵・残骸・煙幕・マーク(マップクリアと同じ範囲)も一緒に消す。";
var APP_VERSION_HIST_v1311="v1311(ダルマ報告「上の一部が見えない」): 下バーにしたため地図・左上の札がiPadのステータスバーの下に潜って上が切れていた→上にステータスバー分(安全領域)の空きを残す。";
var APP_VERSION_HIST_v1312="v1312(ダルマ報告「右が欠けている」): 回復フェイズの画面が右のツールバーの下に潜って右端が欠けていた→ツールバーと上下の帯を除いた範囲の中央に置き、幅もその範囲に収める。";
var APP_VERSION_HIST_v1313="v1313(ダルマ報告「赤枠スペースが空いている」): 下バー時の上の空き(ステータスバー分の余分)と、下バー下側の余白を詰めた。";
var APP_VERSION_HIST_v1314="v1314(ダルマ報告「臨機射撃の確認パネルがわかりにくい」→A案): アプリ移動中の確認パネルを、移動中の駒画像+撃てるスタックごとのカード(FP・DRM・効果バー)+FG合算(緑)に。続ける/撃たないは大きなボタン。";
var APP_VERSION_HIST_v1315="v1315(ダルマ指示「回復 B 実施」): 回復フェイズの画面をコンパクトB(小カード2〜3列・右ツールバーを避けて中央)に。";
var APP_VERSION_HIST_v1316='ASLSK3M-v12.516';
var APP_VERSION_HIST_v1317='ASLSK3M-v12.517';
var APP_VERSION_HIST_v1318='ASLSK3M-v12.518';
var APP_VERSION_HIST_v1319='ASLSK3M-v12.519';
var APP_VERSION_HIST_v1320='ASLSK3M-v12.520';
var APP_VERSION_HIST_v1321='ASLSK3M-v12.521';
var APP_VERSION_HIST_v1322='ASLSK3M-v12.522';
var APP_VERSION_HIST_v1323='ASLSK3M-v12.523';
var APP_VERSION_HIST_v1324='ASLSK3M-v12.524';
var APP_VERSION_HIST_v1325='ASLSK3M-v12.525';
var APP_VERSION_HIST_v1326='ASLSK3M-v12.526';
var APP_VERSION_HIST_v1327='ASLSK3M-v12.527';
var APP_VERSION_HIST_v1328='ASLSK3M-v12.528';
var APP_VERSION_HIST_v1329='ASLSK3M-v12.529';
var APP_VERSION_HIST_v1330='ASLSK3M-v12.530';
var APP_VERSION_HIST_v1331='ASLSK3M-v12.531';
var APP_VERSION_HIST_v1332='ASLSK3M-v12.532';

var APP_VERSION_HIST_v1333='v1333(回復結果の吹き出しと金の輪の位置ずれ修正)';

var APP_VERSION_HIST_v1334='v1334(グループ射撃でLOSなしの理由を表示)';

var APP_VERSION_HIST_v1335='v1335(S25 2-3-7[1]実カウンター・方位マーク位置)';

var APP_VERSION_HIST_v1336='v1336(ATRを実カウンター表示)';

var APP_VERSION_HIST_v1337='v1337(車両移動パネルの砲塔・CE/BU・形切替、操作バーのドラッグ・格納)';

var APP_VERSION_HIST_v1338='v1338(ツールバーの移動の確認)';

var APP_VERSION_HIST_v1339='v1339(回復フェイズのパネルを自動表示)';

var APP_VERSION_HIST_v1340='v1340(短辺の半ヘクスに入れる)';

var APP_VERSION_HIST_v1341='v1341(次へボタンを次のフェイズ名2行)';

var APP_VERSION_HIST_v1342='v1342(次へボタン ▶左+次フェイズ)';

var APP_VERSION_HIST_v1343='v1343(下バーの形 T1/T2/T3)';

var APP_VERSION_HIST_v1344='v1344(メニューのタブ・下バー並び替え)';

var APP_VERSION_HIST_v1345='v1345(ボグ解消・突撃/潰走の矢印)';

var APP_VERSION_HIST_v1346='v1346(S25 ソ連アプリ強化)';

var APP_VERSION_HIST_v1347='v1347(DC 対AFV)';

var APP_VERSION_HIST_v1348='v1348(ボグ解消パネルの表示条件)';
