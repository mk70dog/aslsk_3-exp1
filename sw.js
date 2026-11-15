// ASL SK Judge Service Worker (オフライン起動用)
// 更新のたびに APP_VERSION を index.html の APP_VERSION と同じ値に更新すること(古い版が出続けるのを防ぐ)。
var APP_VERSION='ASLSK3M-v12.506';
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
