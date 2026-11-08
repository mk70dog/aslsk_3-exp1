# ASL_SK3_EX 引き継ぎ HANDOFF.md (2026-11-07 / v858)

## 0. いまの作業(作業の区切りごとに更新して push する)
- 最終更新: 2026-11-08 14:35 (main=v906)
- 状態: 返事待ちなし。別件: 44秒応答なしはバックアップ復元後の起動中に発生(A→Bとは別件の可能性、PCでは再現せず)。
- v906 済: 白兵戦で不意打ち成功時は SK1 3.8 どおり 先攻(成功側)の攻撃→結果適用→後攻は生き残りで攻撃(NM_CC.a1done/log1/parts1。nmCCApply が2段階。不意打ちなし/失敗は従来の同時解決)。dev/cca2.js 追加。
- v905 済: 白兵戦(CC)パネルの見出し・不意打ち・結果文を「自軍(ソ連)」「敵(独軍)」表記に(nmCcpSideNm)。国籍不明時は「自軍」「敵」。
- v904 済: 白兵戦(歩兵どうし/nmCcScGo)で、空き編成枠に前回の国籍が残っていると防御側の国籍が攻撃側と同じになる不具合を修正(nmGeAddCore の保存枠で、空なら pickerNat を上書き)。S24 ソ連対独で「ソ連/ソ連」表示になっていた。dev/cca.js に再現テスト追加。
- v903 済: APh の行動を指す『前進』→『突撃』に統一(PAATC『突撃で入った』・地図ボタン『突撃』『突撃先をタップ』・ヘクスメニュー『突撃(隣接1ヘクス)』・札『突撃済』・『突撃できません』・ログ『MAP 突撃』・『困難地形への突撃』・フェイズ短縮名)。AFPh の短縮名は『前進射』(旧『前進』)、APh は『突撃』。英語辞書は 突撃=Advance・前進射=Adv.Fire(重複キー整理)。変えない: シナリオ背景文の『前進した』・『前進射撃』・Bounding First Fire の『前進しながらの射撃』。ログの種類判定 k='adv' は ' 突撃 ' に合わせた(旧ログ ' 前進 ' は判定されない)。smoke・sweep・ccr・cca エラー0。サンプル samples/sample-advance-word.png(main にマージ済み)。
- v902 済: 白兵戦パネル(nmCcpDraw)で攻撃を1つずつ指定(ルール3.8)。NM_CC.atk={f:[{a,t,dr,cas}],e:[…]}(添字は nmCCIts の順)、nmCcAtkInit/nmCcaCalc/nmCcaTog/nmCcaAdd/nmCcaDel/nmCcaSimple/nmCcaDrSet/nmCcaCas/nmCcaHTML。既定=各側『全員で1攻撃』(従来どおり)。1ユニットは1回だけ攻撃・攻撃される(使用済みは暗く)、混乱は攻撃不可。nmCCCalc は nmCCCalcL(ユニット配列)へ分離。nmCCApply は攻撃ごとの結果を同時に反映(除去=その攻撃の目標全員、損耗=目標1ユニット選択/ランダム、指揮官誕生は攻撃ごと C.promo['f0'])。旧ヘクスメニュー nmRmCCItems は『1攻撃のとき C.f/C.e を DR に使う』互換のまま。テスト dev/cca.js、smoke・sweep・ccr エラー0。サンプル samples/sample-cc-designate.png(ブランチ sample-cc-designate、main にマージ済み)。
- v901 済: フェイズ表記を全て「略称(日本語フェイズ)」に統一(RPh(回復フェイズ)/PFPh(準備射撃フェイズ)/MPh(移動フェイズ)/DFPh(防御射撃フェイズ)/AFPh(前進射撃フェイズ)/RtPh(潰走フェイズ)/APh(突撃フェイズ)/CCPh(白兵戦フェイズ))。公式訳(SK1日本語ルール)は APh=突撃フェイズ(旧『前進フェイズ』は突撃に直した)。対象=画面の日本語文・シナリオSSR・ルール文(コメント・英語表示・英語訳は変更なし)。人力移動の注記は「AFPh(前進射撃フェイズ)の射撃・APh(突撃フェイズ)の突撃はできない」。ログ見出し判定の正規表現(/^(?:RPh\()?回復フェイズ/ など)は新旧両方に一致。テスト smoke・sweep・mh2 エラー0。サンプル samples/sample-phase-notation.png(ブランチ sample-phase-notation、main にマージ済み)。
- v900 済: 人力移動の運ぶユニットに指揮官(smc)も出す(修正なし・一緒に移動、nmMh2Calc は C.ldr に分けて計算に入れない)。
- v899 済: 人力移動の一覧から SWの迫撃砲(mtrNoManhandle)・qsu:false の砲を外す(nmMhCan、マップの nmMhList も)。成功・停止の見込み%と「この条件では動かせません」。テスト dev/mh2.js。
- v898 済: 潰走の阻止に一緒に潰走する指揮官(D.ldr、修正・失敗で指揮官除去)、阻止の出目2〜12を選んで判定。テスト dev/rtl.js。
- 徹底確認: dev/sweep.js で S25・S24・S12・S36・S47・S3 エラー0。ルール照合済み: 射撃・爆薬・白兵戦・MC/PTC・回復/修理・潰走。残し: DMは回復画面で編成ごとの切替、回復の1ターン1回の管理なし。
- v897 済: MC・PTC(nmMcSet/nmMcLl)の出目行も nmDsTag で選んで判定(allow)。SWの修理は dr≦R#(nmSrRn、SWT.r)。
- v896 済: MC/LLMC ちょうど合格はPIN(nmMcSet/nmMcLl)・PINの指揮官は修正なし(nmMcLdrDrm)・阻止NMC 原DR12は除去/ちょうどはPIN表示(nmRtMc)・車両への白兵戦 未熟兵([C]/指揮官なし[G])CCV−1。テスト dev/mcx.js。
- 残り候補: 潰走に指揮官が同行(DRM・失敗で指揮官除去)はUI追加なのでサンプル予定。
- v895 済: 射撃 6.3/6.7/6.9/7.11: 砲が目標の据え付けTEM+2(nmVfEmp、V.noEmp切替)・目標の砲のサイズ、迫撃砲→車両はATT(B.attVeh、IFT半分・AF帯・OT・K/#でショック/走行不能・CE乗員付随)、迫撃砲は建物から撃てない。テスト dev/frl.js。未確認: 軽迫撃砲をSMC1人で撃つとROFなし など細部。
- v894 済: 車両との白兵戦(nmCv*) 3.7/3.3.4/3.8/7.13 対応: PAATCの要否(C.noPa 前進で入った/車両が入ってきた)・PAATC +1(nmCvPa1)・不意打ち∓1(C.amb)・オープントップ−2・原DR2の3つ目のdr(C.res.d3)・スタン中は反撃なし・反撃にRMG/15mm以下IFE。PAATC・攻撃は出目を選んで判定(cvpa)。テスト dev/ccr.js, dev/cvp.js。
- ※ 2026-11-08 08:35〜08:39 に別の作業(同じセッションID)が main に v893 を先に入れ sample-cvpa を作っていた。並行作業に注意。
- v893 済: 爆薬を4.3に合わせる。①未熟兵X#−1・準備射撃で撃った(置けない)・何に置く？(歩兵など/車両 先に宣言)・車両/置く面(地図から自動・選べる・置いた時で固定)/Motion・CE・走行不能・PAATC(nmDcPa)。②車両は位置DR(nmDcvPos)→TK/乗員(nmDcvAtk)を出目を選んで判定。③判定の流れ。歩兵に置いたDCは車両に効かない。テスト dev/dcr.js。
- v892 済: nmDsTag の対象を数字5個以上の行にも。
- v891 済: 爆薬パネル ②爆発に 置いた場所・爆発の決まり・不発(X#)と起爆の目安・DRMの内訳・出目ごとの結果の表(.dcCell、タップで出目→nmDsHPick 'dcp')。③結果の上に「判定の流れ」。
- v890 済: 爆薬のエリート/普通を自動(nmDcAutoElite: DCの own の兵士、なければ編成の最初の分隊。[E]=エリート。手で切替も可)。テスト dev/dce.js。※ダルマの「ダイスで即判定」報告は画面が v887(v888 前)だった。
- v889 済: 主砲・砲の射撃(nmRmVFireItems)に「地図で撃てるヘクスを選ぶ」(nmVfPick、NM_PICK kind 'vfh'、LOSが通る24ヘクス以内を緑)・「シナリオの相手から選ぶ」(車両+👤歩兵、仮のマーカー vfTmp/ccTmp、NM_CCS.open で閉じたら消える)・「@ヘクス に何がいますか？」(V.pend, nmVfPendSet)。テスト dev/vft.js。
- v888 済: 出目は選ぶだけ・「🎲 判定する」で判定。メニュー行は nmDsTag(dr 1〜6 で即実行していた行を選ぶ形に、NM_DST/NM_DSV、nmDsGo)、窓は nmDsHPick/nmDsTake(data-dsk)。個別: ボグ(nmVsBogGo)・ボグ解消・煙幕DR・乗員MC(C.go)・不意打ち(A.done)・人力移動(M.a/M.b)。テスト dev/dsf.js。dev/bog.js は以前から人力移動の所で落ちる(テスト側が古い)。
- v887 済: マルチ判定で地図に該当カウンターがない時(nmHqPickA)、トーストの代わりに nmNuOpen。シナリオの砲・車両・歩兵を選ぶ→📍地図に置く/🎲置かずに判定(ijTmp+ccTmp、NM_CCS.open で閉じたら消える)→ヘックスをタップ(nmNuTap)→nmHqSetA で判定へ。📋配置画面を開く=nmSuOpen。置いた後の向きの画面はまだ出さない(必要なら追加)。
- v886 済: 📌 チップを結果の画像(#nmResImg)の下にも出す(nmBdImg、画像は6秒残る .bdHold、チップ以外のタップで閉じる)。パネルでは結果の行(…= N 命中)の下(NM_BD_POS='line'、nmBdLine。見つからなければ上)。
- v885 済: 射撃結果の上に 📌 チップ(nmBdTodo / nmBdHTML、NM_BD_STY='c'。獲得−1・−2裏返し・外す・残留FP。押すと緑、R.bdDone)。
- v884 済: ミニマルの四隅の点を消す(NM_MINI_DOT='a')。ネオンの色違いをスキンに追加(UI_THEMES '4a'くすんだ/'4b'シアン/'4d'レーダー緑/'4e'アンバー。uiThemeApply が data-uith="4"+data-neon を付ける。nmNeonBuild が [data-neon] 規則を作る)。
- 調査中: A→B後のフリーズ(v882 のログ待ち)。

## 0.1 再開のしかた(どのアカウントでも同じ)
- プロジェクトの指示に「プロジェクト再開」の手順が入っている。「プロジェクト再開」と言われたら:
  1. mk70dog/aslsk_3-exp1 の main を取得(clone 先 /home/claude/aslsk_3-exp1)
  2. この HANDOFF.md を読み、作業ルール(3章)に従う
  3. 「0. いまの作業」を確認し「vNNN から再開」と報告(返事待ちのサンプルがあれば一緒に伝える)
- 運用: 版を出すたび・作業の区切りごとに、この「0. いまの作業」と変更履歴を更新して commit・push。サンプル/修正ブランチは作ったらすぐ push。
- 使用状況が100%で止まっても、GitHub の main・ブランチ・HANDOFF.md だけで再開できるようにしておく(チャットでの受け渡しに頼らない)。

## 1. 概要
- ダルマ開発のASL SKファンメイド単一ファイルPWA「ASL_SK3_EX」。GitHub Pages配信。Claudeが main に直接 push。
- リポジトリ: mk70dog/aslsk_3-exp1 → 作業場所 /home/claude/aslsk_3-exp1 (以前は /home/claude/mk70dog/aslsk_3-exp1) (index.html 約73MB, sw.js, manifest.webmanifest, icon-*.png)
- 現在の版: APP_VERSION "ASLSK3M-v12.058" / シリーズv858 (最新コミットは git log で確認)
- ※ 10-28の引き継ぎ(v328)とは別系統。こちらはメインマップ/判定ボード/インスタント判定系(v7xx)。

## 2. アプリの考え方(ダルマ説明 2026-11-05)
- 判定支援には「フル版」と「ライト版」がある(nmModeNow(): 'online'=フル / 'judge'=ライト)。**今作っているのはライト版。**
- ライト版は**リアルの地図とカウンターがメイン**。カウンターの状態など、変化したり積み重なったりするもの(射撃済・CX・移動・混乱/PIN・残骸・故障など)は**リアル側だけで管理する**。
- 支援アプリ(ライト版)の役割は**攻防の判定・MCのチェックなど**の判定が中心。アプリで盤面の状態を管理・反映する機能はライト版では基本的に要らない(必要なら判定画面で聞く)。
- **フル版のコンセプト: アプリとリアルの盤面をシンクロさせて使う。**状態(射撃済・CX・移動・混乱/PIN・残骸・故障など)はアプリでも管理する。将来のASLフル版(SKより複雑なルール)への対応や、ネット対戦の基盤になる。ライト版では対応しきれない可能性があるため、フル版は捨てずに育てる。
- 作り方(案・ダルマ確認中): 判定の計算は共通(両方に効く)。違いは「盤面の状態をアプリが持つか」だけなので、状態の読み取り・反映が関わる所だけ nmModeNow() で分ける(フル=地図の印から自動・結果を反映、ライト=判定画面で聞く・結果は「盤面でこうする」の文だけ)。分け方は作る前にダルマに確認する。

## 3. 作業ルール(ダルマ指示)
- **【最重要・2026-11-07追加】実施前に必ずサンプル画像を提示すること。明確でない指示は必ず確認してから実施すること(推測で実行しない)。**
- **ユーザーの説明が分かりにくい場合は必ず確認する。推測で実行しない。**(解釈を書いて確認してから作業する)
- **引き継ぎは都度更新する: リポジトリの HANDOFF.md を版ごと・作業の区切りごとに更新して push(必要ならダルマにもファイルを送る)。**
- サンプルは sample-vNNN ブランチに push → 「実施」で main に `--no-ff "Merge sample-vNNN"` → 版上げ → push。
- セッション開始時は GitHub の最新 main を取得し「vNNN から再開」と報告。プレイ中は push しない。
- 見た目/UI変更: 先にサンプル画像を見せ、「実施」の返事を待つ。バグ修正・明示的な「〜する」指示は実装→Playwrightで確認(iPad風 viewport 1000x657。v838〜v856 は 1180x820 で確認)→push。
- リリースごとに: APP_VERSION(v800から ASLSK3M-v12.NNN。v801=v12.001)、`<title>`・og:title・manifestの「シリーズvNNN」、`var APP_VERSION_HIST_vNNN="..."` を前の HIST 行の前に追加、sw.js(APP_VERSION と vNNN)、manifest更新。
- 返信は簡潔な日本語。コミット末尾:
  Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_01XQw96hGodsPr81krPb45hk
  (セッション・アカウントが変わったらその時のシステム指定に従う)
- デザイン: M PLUS 1 Code、メインメニュー風(紺パネル・黒リベットボタン・金の選択)。
- 呼称: ツールバー(右の縦バー)、ステータスバー(下)、メインメニュー(≡)、ヘクスメニュー(ヘクス長押し)、メインマップ、判定ボード(「ボード」)、旧タブ。**スポット判定**=旧「インスタント判定」(nmIj*、ライト版のメイン画面)。ツールバーの「A→B」ボタン(旧「LOS」、置いている間は「A→B✕」)。
- 読み込み確認: `cd /tmp && node /home/claude/aslsk_3-exp1/dev/smoke.js` が「TOTAL errors: 0」なら可。
- 版上げ: リポジトリのルートで `python3 dev/rel.py "(ダルマ指示「…」): 内容"`(番号は自動で+1。履歴文に " は使えない)。
- 注意: 単一引用符の onclick 文字列に `'` を入れると全体が壊れる(過去に発生)。`node --check` で確認。

## 4. 今回(v770〜v806)の主な変更
- v770 車両との白兵戦(nmCv*)を1攻撃=MMC1(+SMC1)に修正。
- v768〜v773 ツールバー(サイド時 メインメニュー・判定・LOS)、戻る/進む/全画面解除はメインメニューへ。全パネルで右上の閉じるを廃止、左上は「← 戻る」(nmBackAll/nmHqBackIns)。
- v774〜v779 インスタント判定(nmIj*): Bの置き方、編成を作る/編集(nmSu、NM_SUFROM/nmSuBack)、②攻撃側・③目標の選択カード+変更、Bに＋カウンター、選択時のスクロール保持。
- v780〜v781 マップ士気チェックにLLMC/LLTC(nmMcLl)。士気チェックでは結果判定画像を出さない(resFromガード)。
- v782 動作ログ(NM_DBG)。メインメニュー「動作ログ(n)」から表示・コピー・消去。
- v783 インスタント判定中は全画面divがあっても結果パネルを閉じない(「判定しても結果が出ない」対策。原因の全画面divは未特定)。
- v784 メインメニューをセクション分け(判定/編成・シナリオ/マップ/操作/ルール早見/設定/システム、閉じるは最下部)。ヘクスメニューに見出し付き区切り({sep:1,lbl}。ユニット/LOS・移動/ヘクス/情報)、文言短縮。
- v785 ヘクスメニューの配置3項目を「ヘクスにカウンターを配置」に統合。次のパネル(nmRmVehItems)の先頭に自軍/敵軍切替(nmPlSet('sd'))、種類に 煙幕・残骸・マーク を追加(nmPlSmoke/nmPlWreck/nmRmMark)。見える範囲(双眼鏡)をツールバーのLOS直下へ。双眼鏡モード: ヘクスタップ=範囲表示、別ヘクス=起点変更、同じヘクス=終了(nmToolRunN の view 分岐)。
- v786 配置パネルが開元メニューの高さで切れていたのを修正(btRmReopen に .plWrap 分岐)。
- v787 「判定できない」修正(動作ログで特定): 前進射撃(AFPh)は「準備射撃をしたか(afphPfphFired)」「MMG/HMG移動(afphMgMoved)」の選択がないと FJUDGE が showMissingModal で止まる。インスタント判定にはこの欄がなく、警告も判定パネルの裏に隠れて何も起きないように見えていた。nmMfIjFix で未実施・未移動(false)として判定、nmMfMissing で止まった理由を最前面(z-index 99990)に表示し動作ログにも記録。止まった時は射撃済みにしない。
- v788 インスタント判定の④方向のA・Bに「地図で設定」(設定済みは「地図で変更」)。nmIjFaceMap(w)で判定を隠し(nmIjPeek)、NM_IJFM=w・NM_FACE で地図の向きパネル(nmRmFaceItems)を開く。「判定に戻る」/パネルの「← 戻る」は nmIjFaceBack(nmIjFaceDef→nmIjDraw で再計算)。
- v789 ④方向のボタンを1つ(nmIjFmBtn:「地図で方向を設定」/「地図で方向を変更」)。nmIjFaceMap() は未設定の方(なければA)から開き、向きのパネル(nmRmFaceItems)に「設定する車両」A/B切替(nmIjFmSwItem→nmIjFmSw)。NM_IJFM中は仮のA・B(ijTmp)を地図に描き(nmNoTmp を描画系だけ外す。nmsPayloadMap/nmsHash は外さない)、nmIjFmBarsSVG で方向バー(車体A青/B赤・砲塔黄「砲」、未設定は相手側の頂点方向に薄く)。マーカーの方向バー(nmMkBarsSVG)はNM_IJFM中は出さない。不具合修正: NM_IJ.emb のとき btRMenu が判定画面の中(#ijRes)に埋め込んでいた→NM_IJFM中は埋め込まない。判定画面内の #btRm は地図にいる間 id を btRmIjHold に変えて取り違えを防ぐ。
- v790 地図で方向設定中の向きのパネル: nmIjFmPlace でA・B(nmIjFmPts、半径84px)を避けた画面の隅/中央の9候補から置く(上:nmFullTabs、下:nmFtBot、右:ツールバー nmFtAct を避ける)。window.btRMenu をラップし NM_IJFM中は nmIjFmDrag(上部つまみ .rmGrip、ボタン以外をドラッグ。ドラッグ後のclickは捨てる)。位置は btRmReopen が style.left/top を保つ。
- v791 ③目標: Bに目標が無く未選択(J.bt 無し)の時は「未選択」+「目標を選ぶ」を開く(bUn)。「地形のみ(目標なし)」は選択肢(nmIjBTerr で J.bt=1)。bUn の間は ok=false で判定する・⑤⑥を出さない。
- v792 バグ修正: ③目標を選ぶの国籍(bns)を、Aの国籍(地図のAなら nmIjEhNat、置く時は J.nat)の敵(nmFoeNat=枢軸/連合)から選ぶ。以前は nmIjSd(マーカーの自軍/敵軍)の反対側で決めていたので、連合軍の編成が敵軍マーカーにあると味方(ソ連)しか出なかった。
- v793 「カウンターを選択」で置いたセットの変更: Aは nmIjAutoPlace で eh.ijCs/ijNat、Bは nmIjBPutCs で ijB の eh に ijCs/ijNat を保存。一覧に「✎ カウンターを変更」(nmIjCsEdit / nmIjBCsEdit)で J.cs / J.bcs に今の数を入れて選択画面を開く。決定時は既存の仕組み(nmIjTmpClear(aOnly) / nmIjBPut の ijB 削除)で前のセットと仮編成を消して置き換える。
- v794 ツールバー(nmBarLite)のLOSボタン(nmAbArm)は S_LOS.pxA がある間 NM_LOSOFF_IC・onclick=nmLosOff に差し替え、別の LOS× ボタンを削除(nmFtActFill の v768 ブロック)。ステータスバーの LOS× はそのまま。
- v795 バグ修正: 判定結果を出した後(NM_RM_CUR が残る)に地図で方向を設定すると、btRmFullApply(v699 画面いっぱい・2列)が向きのパネルに掛かり矢印が崩れた。NM_IJFM中は rmFull にしない。テストは iPad 実寸 1180x820 でも行うこと(1000x657 では幅の違いが出にくい)。
- v796 歩兵の射撃(nmMf)の「ROFで機関銃だけもう一度撃つ」を nmMcSection/nmCrewSection の後ろへ移動。
- v797 砲が目標の時の乗員の士気チェック(nmMcCrewSection/nmMcCrewDie、UNITS の「(乗員)」の士気。失敗はMC=混乱・PTC=PINを自動で印、C.auto で入れ直し時に外す)。歩兵の射撃でSWごとのROF・故障B#・除去X#(nmMfSwInfo)。※リモートに不要なブランチ wip/samples-crewmc-swinfo が残っている(削除は403で不可)。
- v798 撃破時の確認(nmWreckAsk、z-index 100050 のダイアログ): nmAutoWreck(主砲 nmVfEff・LATW nmLwEff)と白兵戦 nmCvAtk の kill で「残骸を残す(nmStWreck)/残さない(nmStRemoveVeh=車両を消すだけ)」。結果は V/W/C.wrAns、表示は nmWreckTxt。未回答時は「選ぶ」で再表示。NM_LAST で↶可。爆薬(nmAfvEffApply)・UK撃破・ヘクスメニューの撃破は対象外(従来どおり残骸)。
- v799 動作ログに「ファイル保存」(nmDbgSave: navigator.share で共有シート、無ければ nmDbgDl で .txt ダウンロード。名前 ASLSK_log_<版>_<日時>.txt)。
- v800 メインメニュー(nmFtMenuHTML)から「操作」(直前の操作を中止・やり直す)と「全画面表示を解除」を非表示(ダルマ: 使ったことがない)。nmLastUndo/nmLastRedo 自体は残っているが、今はどこからも押せない(撃破などの「↶で元に戻す」の案内は残っている)。APP_VERSION は v12.000 に。
- v801 旧タブとの見比べの修正: 防御射撃の最終射撃(exFire)・前進射撃の資格(afphPfphFired/afphMgMoved)を地図の印(st.fired/st.mv)から自動(nmMfIjFix, nmMfFirerEh)、砲が目標の時の KIA/K/至近弾+砲楯(nmMcCrewSection, nmMcGunCtx)、撃つ側CXを自動(nmMfTgt)。**※ライト版の考え方(状態はリアル側で管理)と合わない部分があるので見直し相談中。**
- v802 「インスタント判定」→「スポット判定」(パネル見出し)。ツールバーのLOSボタンの文字を「A→B」「A→B✕」に。ステータスバー・パネル内の「LOS✕/LOS解除」は未変更(相談中)。
- v803 ステータスバーの LOS✕(NM_LOSOFF_IC)を A→B✕、スポット判定右上を「A→B解除✕」。
- v804 プレイ前確認: (0)nmGrpData が射撃タブ選択中の編成で latw を返さず、スポット判定で対戦車兵器が出なかった。(1)迫撃砲(thType 'area')が「射程外」→btOrdEval で attBands・最小射程、nmVfIsAtt/nmVfAttTem(林への空中炸裂TEM−1)、HE命中FPは attFp。(2)ライト版(nmModeNow()!=='online')は nmMfIjFix で射撃済・移動の印を使わない(全部 false)。
- v806 判定ボードで地図にカウンターがなくてもシナリオのユニット・車両で判定: 近接戦闘(nmCcScOpen/nmCcScGo、攻撃側+防御側ユニット or 車両→CC/CCV)、回復・修理/移動・ボグ/爆薬/潰走/士気(nmScOpen/nmScGo、NM_SC_FN)。仮のマーカー(ijTmp+ccTmp)を地点A(なければノード0)に置き、パネルを閉じたら nmCcScClear で消す。仮のカウンターの撃破は地図を変えない(nmWreckAsk の ijTmp 分岐)。
- v805 FPFの撃った側のNMC(nmMfFpfSection/nmMfFpfRes/nmMfFpfApply)。反映ボタンはライト版でも出ている(ライト版は結果だけにするかは未確認)。

- v849 ライト版のマルチ判定ボードから スポット判定の帯・いまのフェイズ・よく使う・すべての判定(折りたたみ) を外し、全部の判定を最初から並べる。「〜を振る」(アプリがダイスを振る)ボタン・項目に「オートダイス」の札(.nmAdTag、MutationObserverで自動付与)。※この版はサンプル提示なしで実施してしまった(上の最重要ルール追加のきっかけ)。
- (v807〜v837 は別セッションで実施。詳細は git log / APP_VERSION_HIST を参照)

### v838〜v848(セッション 01XQw96…)
- v838 スポット判定の↶を .ijFt フッターに(nmIjUndoSync)。
- v839 残留火力パネル NM_RAQ(nmRaqOpen/Draw/Roll/Undo/Set)。スポット判定とボードのタイル '&raq' から。
- v840 大きいボタンを黄色→ライトブルー var(--ljc,#7ec8e3)/文字#08101a に統一。
- v841 早見表の見直し(IFT十字ハイライト、TEM統合、MF/PP CX+指揮官 8/7/6/5/4/3 等)。爆薬パネル nmDcp(平頂ヘクス図、地形だけ置く to=-1、軽量スナップショットで↶)。白兵戦パネル nmCcp(CXは nmCCCalc で加算)。
- v842 カウンターの読み方(REF_CTR_SETS afv/gun/inf、裏面 REF_CTR_BK は VASL の画像。車両の裏は再現図)。
- v843 IPC: 指揮官もCXならIPCを足さない(losUnitMFPerUnit・btPortageExcess・mfcEffIPC)。
- v844 残留火力・爆薬・白兵戦に「← 戻る」(NM_PBACK、nmPanelFrom/nmPanelBack/nmPanelBackBtn)。
- v845 簡易射撃の戻るを見出しへ。v846 簡易射撃タイル削除、ボグ判定・人力移動タイル追加。v847 判定ボード→「マルチ判定ボード」。
- v848 爆薬で地図なしの車両攻撃(nmDcVv*)、臨機の白兵戦 3.3.4(nmCvOpen(n,isd,react)、NM_CVREACT)、旧タブの修正値をマルチ判定へ(射撃 CE乗員、砲撃/戦車のその他修正 NM_VF_XO、LATW の前進射撃+2/+3・CX・HIP)。

### v850〜v856
- v850 オートダイスの札を他パネルにも。戻る/閉じるを箱なし文字に統一。「判定する」をコンパクトな水色ボタンに(nmGoIs/nmGoFix、.nmGoC、MutationObserver。下段の説明 .nmGoS)。
- v851・v852 旧タブをマップから開いた時の見出し・タブ帯などを非表示、戻るボタンを小さく。
- v853 早見表ボタンの並び替え(上段 IFT/TEM/CCT＋捕捉、下段 兵士/砲/車両)。ボグ判定は車両だけ、人力移動は砲だけ。フェイズの金枠ハイライトをやめた。
- v854 士気チェックでユニットごとに統制/混乱、損耗ユニットの登録、ライト版ボードから「移動」を外す、人力移動の新画面 nmMh2Open。
- v855 「近接戦闘」→「白兵戦」(歩兵どうし)、車両への白兵戦を別タイル ccv '&ccv' → nmCcScOpen('veh')。
- v856 タイル名を 白兵戦（歩兵どうし）／白兵戦（車両を攻撃）／臨機の白兵戦（動く車両）(TL の5番目の要素=表示名、<br>で2行)。白兵戦の判定ボタンを「白兵戦を判定する」+下段「次の画面でダイスを振る」。
- v857 ①旧タブの「戻る」(#nmHqBack)は地図に戻るだけ。NAVTAB をラップして、地図→タブへ移る時にボード(#nmHq)が開いていたら NM_OT_HQ=true、その時だけ戻りでボードを開き直す ②ボグ判定パネル(nmRmBogItems をラップ)に「ボグ判定(入った時)/ボグ解消(回復)」の切り替え NM_BG.un。nmBgMode/nmBgUnDie/nmBgUnRoll。赤dr(Mired+1) 1-4=解消(始動MP=赤×白、全装軌でない×2)・5=Mired・6以上=走行不能。ライト版は結果と「盤面: 〜」だけ、フル版は状態(bog/mired/imm)も反映。
- v883 アプリアイコンを 8-1-10 G の絵に(作り方は v880 と同じ、?v=883)。
- v906 不意打ち成功時の先攻→反映→後攻の2段階解決(3.8)。
- v905 白兵戦カードの見出しを自軍(国籍)/敵(国籍)に変更。
- v904 白兵戦(歩兵どうし)の防御側国籍バグ修正(nmGeAddCore: 空き枠の pickerNat を更新)。
- v903 APh の行動『前進』→『突撃』に統一(AFPh の短縮名は『前進射』)。
- v902 白兵戦の攻撃を1つずつ指定(攻撃ごとに攻撃ユニット・目標・DR)。
- v901 フェイズ表記を「略称(日本語フェイズ)」に統一(APh=突撃フェイズ)。
- v900 人力移動に指揮官も選べる(修正なし)。
- v899 人力移動: 50mm迫撃砲など運べない砲を一覧から外し、見込み%を表示。
- v898 潰走の阻止に一緒に潰走する指揮官。
- v897 MC・PTCも出目を選んで判定。SWの修理は dr≦修理ナンバー。
- v896 MCちょうど合格はPIN・PINの指揮官は修正なし・阻止NMC原DR12は除去・未熟兵CCV−1。
- v895 射撃のルール対応(据え付け・砲のサイズ・迫撃砲→車両・迫撃砲は建物から撃てない)。
- v894 車両との白兵戦をルールに完全対応(PAATCの要否・+1・不意打ち・OT・原DR2・スタン・RMG)。
- v893 爆薬をルール4.3に合わせる(車両は先に宣言・面固定・PAATC・未熟兵・準備射撃)。
- v891 爆薬の判定を詳しく(決まり・不発・DRM内訳・出目ごとの結果の表・判定の流れ)。
- v890 爆薬のエリート/普通を兵士のクラスで自動。
- v889 主砲・砲の射撃も軽対戦車兵器と同じ目標選び(地図で撃てるヘクス・シナリオの相手から)。
- v888 出目を選んでも判定しない。「判定する」で判定(残留火力・爆薬・白兵戦・クイックIFT・dr行など全体)。
- v887 地図に砲・車両・編成がない時、その場で置く/置かずに判定/配置画面を選べる。
- v886 📌 チップを結果の画像の下と結果の行の下に出す。
- v885 射撃結果の上に 📌 チップ(リアルの盤面に置く: 目標獲得・残留火力。押すと緑)。
- v884 ミニマル: 四隅の点(リベット)を消す。ネオンの色違い4つ(くすんだ・シアン・レーダー緑・アンバー)をスキンに追加。
- v882 動作ログを localStorage(aslsk_dbglog)に保存、nmDbgText に「前回(開き直す前)の記録」。1.5秒以上の停止「応答なし」、pointerdown の一番上の要素「tap x,y 要素」も記録。テスト dev/dbgp.js。
- v881 別の操作を始めたらA→Bを消す(nmAbReset、nmHqOpen/nmTvOpen/nmScenView/nmSuOpen/nmRmTabGo/nmToolArm をラップ、#nmIj 中は除く)。テスト dev/abr.js、dev/frz.js(フリーズ調査用)。
- v880 アプリアイコンを 10-1-8 G の絵に(icon-180/192/512=90%、icon-512m=78%、地の水色 (108,206,253))。index.html・manifest のアイコンは ?v=880。
- v879 編成の準備を国ごとに(nmSuTab で NM_SU.slot=null、nmSuSlots の条件、NM_SU中の nmGeAddCore ラップ、nmSuSplitNat、混ざった編成の注意)。テスト dev/sun.js。
- v878 編成名の変更(S.nmGrpName[シナリオ][編成]、nmGrpLbl・nmGrpRename・nmGrpRenameDo、編成の準備の✎)。テスト dev/grn.js。
- v877 ツールバーにシナリオカード(nmScenView、NM_TB_ITEMS id:'card')。
- v876 地図の射撃パネルの移動射撃設定を畳まずに表示(行名「MPの使い方」「撃つ時の車両」、v654の畳みに入らない)・修正値つきボタン・Case16の内訳表示。テスト dev/bff.js。
- v875 人力移動を地図で(nmMhList/nmMhPick/nmMhPickEnd、NM_PICK.kind='mh')。色は NM_MH_PALK='b'(青の濃淡。a/c/d/e の案も残す)。テスト dev/mhm.js。
- v874 砲を置いて方向を選んだら、すぐに砲を操作するユニットの画面(nmRmSetFace をラップ、NM_GM_AFTER)。テスト dev/gm2.js(出力名)。
- v873 砲を操作するユニットの画面を ①このヘクスのユニット ②乗員を新しく置く ③選ばずに進む に整理(nmRmGunManItems の文言)。
- v872 軽対戦車兵器の目標選び(nmLwPick・NM_PICK.kind='lw'・nmLwPickEnd・nmLwPendSet)。テスト dev/lwt.js。
- v871 地図のパネルはどれもドラッグ(nmIjFmDrag を全パネルに、.rmFull は .rmMoved・NM_RM_MOVED)。テスト dev/drg.js。
- v870 早見表・ユニットの戻るは NM_TVHQ(マルチ判定から開いた時)だけマルチ判定を開く。テスト dev/tvb.js。
- v869 シナリオのユニットで判定: 下の登録の＋/−で上の選択も増減(nmScRegQ)。判定するで開いた画面の戻るで選択画面へ(NM_SC_LAST・nmScBack)。テスト dev/scb.js。
- v868 早見表のカウンターの読み方を幅に合わせて zoom(.refCtrFit/.refCtrIn・nmRefCtrFit)。テスト dev/ctrm.js。
- v867 「マルチ判定ボード」→「マルチ判定」(英語 Multi Judge)。
- v866 歩兵の移動(マーカーなし)の今いるヘクスを地図のピンに(通常=青、CX=オレンジ)。nmRtEndSVG/nmRtPerson、S_LOS.nmRtEndSty(未設定=ピン、'img'=従来の写真、ほかに pict/nato/hex/foot の案あり)。テスト dev/rte.js(引数=出力フォルダ)。
- v865 スポット判定の「残留火力の攻撃」を見出しの小さい「🔥 残留火力」ボタンに(nmIjDraw の見出し)。
- v864 アプリ更新で先に sw.js の APP_VERSION を確認(appForceUpdate を包み、従来の処理は appForceUpdateRun)。同じなら「最新版です vNNN」。テスト dev/upd.js。
- v863 不意打ちの車両の修正を「車両がいる+2」「その車両がBU・麻痺+1」に(旧: 攻撃側+2/防御側+1)。
- v862 白兵戦パネルの①不意打ちを作り直し(nmCcpDraw ラップで nmAbHTML に差し替え。nmAbAuto/nmAbCalc/nmAbSet/nmAbDie/nmAbRoll/nmAbMan/nmAbClear。結果は C.amb/C.ambDr)。
- v860 ライト版の修理・回復を状態に関係なく(nmRmRvItems ラップ・nmLtRep・nmLtUnbog、回復は brk=true、選択画面の状態ボタンを隠す)。
- v861 「士気・損耗」→「MC・PTC」。nmRmMcpItems をラップして ①②③ の番号・種類の意味とルール・ユニットごとの必要原DR。
- v859 人力移動の「運ぶ砲」に相手の国籍の砲を「鹵獲した砲」として追加(修正は同じ、鹵獲の不利は射撃だけと注記)。nmMh2Draw。
- v858 HANDOFF.md(この文書)と dev/(テスト: smoke.js ほか、版上げ: rel.py)をリポジトリに追加。アプリの動作は変更なし。

## 5. 構成メモ
- ヘクスメニュー: btRMenu → nmRMenuItems(n)(約33682行)。項目 `{ic,t,sub,f,row,btns,sep,lbl,img,html}`。nmRmCompose で U/A/X/V を結合、strip() で重複sep除去(lbl付きsepは残す)。配置パネルは NM_RM_VEH='f'|'e' → nmRmVehItems。
- メインメニュー: nmFtMenuHTML(約37509行)。ツールバー: nmFtActFill(約36105行)、NM_TOOL('fire'|'view'|'move'|'atk')、nmToolArm/nmToolRunN。
- 見える範囲の状態: BT_RMS{k:'view',n}、表示は nmRmPanelHTML(下部固定)、終了は BtRmShowOff()。
- btRmReopen: 開き直し時に位置・高さを復元(v602)。内容が増えるパネルはここで高さが切られるので注意(.plWrap は例外)。
- テストスクリプト: /tmp/claude-0/-home-claude/e8756f83-.../scratchpad/w/ (mn.js, mn2.js, pl.js, pl5.js, vw.js 等。NM_RM_HEX=nmHexOfN(400) を先に設定する)。新アカウントでは失われる可能性あり。今回のセッションでは scratchpad/w/ij.js(A=131,B=134 に独IV号H・ソ連T-34を置いてインスタント判定を開く。第4引数で追加JS)、dbg2.js(仮カウンターで地図の向き設定を撮る)。

- マルチ判定ボード: nmHqOpen、タイル定義 TL(接頭辞 @関数 / &独自 / ! / %、[4]=表示名)。ライト版の並びは grid(...) 内。
- テスト: リポジトリの dev/ にある(index.html は ../index.html を開く)。smoke.js(TOTAL errors: 0 で可)、dcv.js rc.js xo.js aud.js bog.js back.js ctr.js ipc.js、v856.js(ボード・白兵戦の撮影。引数=出力名)、otb.js(旧タブの戻る2通り)、bg3.js(ボグ解消。引数=出力名)、shot2.js(HTML→PNG)。png を cwd に出すので **リポジトリの外(/tmp など)で実行** する。Playwright・Chromium は環境に入っている前提。
- 版上げ: dev/rel.py を使う(手でやる時は python で置換(シリーズvNNN・APP_VERSION・HIST・sw.js・manifest)。注意: `var APP_VERSION_HIST_v85x=` は旧 v8.5x の行と同名が2つあるので、`"v85x(` で始まる方の前に入れる(rel.py はこれに対応済み)。)
- リリース用スクリプト(別セッション): scratchpad/rel12.py OLD NEW "履歴文"(例: 849 850)。APP_VERSION・HIST・シリーズvNNN・sw.js・manifest を更新。
- 自動テスト qa5.js の「menu open」は v848 時点から失敗(テスト側が古い。nmFtMenu をボタン無しで呼んでいる)。

## 6. 未実施・保留
- iPad実機確認が未了: v784(メニュー整理), v785(配置パネル/見える範囲), v786(全表示), v787(前進射撃の判定)。v788は実機で向きのパネルが開くことを確認済み。v789(ボタン1つ・A/B切替・地図の車両と方向バー)は実機で表示確認済み、v790(パネル位置・ドラッグ)、v791(目標の未選択)、v792(目標の国籍)、v793(セットの変更)、v794(LOS×)、v795(パネル崩れ修正)、v796〜v806は未確認(2026-11-06 に初プレイ予定)。
- 「↶で元に戻す」の案内文(撃破・配置など)は、↶ボタンが無くなったので文言の見直しが必要かもしれない(未確認)。
- インスタント判定に「準備射撃実施(射撃不可)」の選択欄は無い(常に未実施扱い)。必要なら追加。
- 「判定しても結果が出ない」(v783対策)の再発確認。再発したら動作ログの「全画面divあり」行を送ってもらう。
- ヘクスメニューの「このヘクスに敵軍を配置」(ユニット無しヘクスの項目)の文言短縮は未了(別箇所で生成)。
- 「LOSの下」はツールバーのLOSボタンの下と解釈して実装。ステータスバーの意味なら修正が必要。
- 未実装の提案: 銃 vs 歩兵のCC、ヘクスに歩兵対歩兵と車両が両方ある時の車両CC選択、残留火力のパネル化、LLチェックで他の指揮官の修正を使う任意設定、配置パネルで煙幕を置いても閉じない連続配置。

- 判定ボードの名前は v847 で「マルチ判定ボード」に決定。
- 未確認: 旧タブとマルチ判定の直接比較テスト(v848で抜けを追加したが、同じ入力で結果が同じかは未テスト)。
- 残っているサンプルブランチ: sample-v855, sample-v856, fix-v857, sample-v857b(すべて main にマージ済み)。
- ボグ解消の画面は、ダイスの行が右の列に回る(ボグ判定と同じ並び)。必要なら並びを調整。
- リモートに不要な作業ブランチ wip/samples-crewmc-swinfo, wip/sample-fpf-nmc, wip/sample-cc-scen が残っている(削除は403で不可。GitHubで消してよい)。
