# ASL_SK3_EX 引き継ぎ HANDOFF.md (2026-11-07 / v858)

## 0. いまの作業(作業の区切りごとに更新して push する)
- 最終更新: 2026-11-07 15:55 (main=v861)
- 状態: **返事待ち** sample-amb(白兵戦パネルの①不意打ちを作り直し。nmCcpDraw をラップして元の不意打ち行を nmAbHTML に差し替え。両軍カードに修正 CX+1・釘付け+1・未熟兵+1(新兵で指揮官なし/徴集兵)・指揮官(単独無効)・車両がいる 攻撃側+2/防御側+1・BU/麻痺+1・SSR、drの手入力1〜6/オートダイス、修正後dr・差・結果の説明、手で結果を選ぶ。結果は従来の C.amb/C.ambDr に入る)。
- 最後の指示: 「(不意打ち) 実施 もう少しわかりやすくする」
- 次にやること: 返事を待つ。「実施」なら main にマージして v862。

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
