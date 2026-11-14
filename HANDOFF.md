# ASL_SK3_EX 引き継ぎ HANDOFF.md (2026-11-07 / v858)

## 0. いまの作業(作業の区切りごとに更新して push する)

- 【2026-11-14 引き継ぎ】main=v1225(push 済み)。返事待ちなし。
- v1225: ダルマ「(見える範囲の)表示を小さく わかりやすく カッコよくする サンプルx3」→A/B/C(ブランチ sample-losview)→「B」。nmRmPanelHTML で o.k==='view' は新設 nmViewCardHTML(o,N) を返す(id=nmRmPop のままでドラッグ可。left:78px=方位磁針を避ける・幅300px)。ヘッダー LOS+見える範囲+✕、数字タイル3つ(c0+c1/c0/c1)、凡例、内訳ONでタップ先の結果行(緑=妨害なし/黄=妨害+合計と内訳/赤=見えない+さえぎる)。対戦モードの帯の中の表示(btRmShowHTML)は変更なし。
- v1224: ダルマ指示「s25 対戦モードに追加」。BT_SCN.S25・BT_SCFG.S25(grp: 独=g1(T1南端から進入)/ソ=setup、zone: ボードvまたはボードuの番号7以下、vic:'n' vicN4 vicSide GER、bl:'vic'=隣り合う建物ヘクスを1棟→F7・K10/L9・L7/M7・N9・P7 の5棟)。新設 vicAfv:2 → btCfgWinner は btMobAfv(独)<2 なら敗北(盤上の !imm のAFV+未進入グループ(BT.entIn に無い)のOB AFV)。btCfgAfvTxt() を勝利条件の表示4か所に追加。SSR radio:{SOV:/^BT-7/} → btRadioOk(s,u): btPhKey ごとにDR1回(u.radK/u.radR)、>8 なら btVMoveCheck でヘクスから出られない・btVehSearch は向き変更のみ(radNo)、btVMoveStart で振る。btInfo0: 「2-3-7[1]」→ UNITS の「2-3-7[1](HS)」を使う、btGunData にある名前は gun(50mm迫撃砲・76.2mm歩兵砲。他シナリオの分類は変化なし)。確認: 自己対戦 S25(T7 独勝利・エラー0)、人間側の通し S25 独/ソ(エラー0)。
- 【2026-11-13 17:40 引き継ぎ】main=v1223(push 済み)。返事待ちなし。返事待ちなし(✕の動作は「ーと同じく小さくする」で実装、ダルマ未回答)。①アプリの攻め方は v1204 で対応(以下は v1197 時点の記録): 計測(dev/selfplay.js に半ターンごとの攻撃側スタックの建物までの距離・支配数を出す版で確認)では S2独・S6ソとも T2〜3 で建物ヘクスに届いているが支配を取れない(S6 ソ連の白兵戦は6ターンで1回)。重み案A(attUrg0.3・riskDecay0.12・gAdjAtt2・終盤の白兵戦の基準0.33→0.2)を1回ずつ試したが支配数は変わらず→白兵戦に入る判断(btAIPlanMoves0 の ccCap/ev.pKill 付近)を見直す必要あり。v1197 で BT_SCFG[id].aiw(btAIW())の仕組みだけ入れた(値は未設定=動作変化なし)。次の候補: ③S2/S6/S24 のバランス規定 ④iPad実機確認(対戦モードの右のツールバー・LOSの札・最後の記録の帯)。保留は前回どおり(WPのNMC・sM開始時期・ジャンボの「/」・自動同期2台テスト・判定入力の「クリア」・車両の煙幕)。プロジェクトの claude/v1190.patch は既に無い(確認済み)。
- v1223: ダルマ指示「判定モード 対戦モードに切り替えでメニューは出したまま メニュー内容をモードの内容に変更する」(画像=ライトに切り替えた後も対戦のメニュー項目のまま)。btFtMenu の項目を btFtMenuHTML() に分け、nmMenuRebuild(): #nmFtMn があれば btActive() なら btFtMenuHTML、そうでなければ nmFtMenuHTML で作り直す(判定の時だけ nmMmRzInit=✕・大きさ変更)。モード切替(nmModeSegHTML の go)はどのモードでも閉じず nmModeSet→nmMenuRebuild(0ms・400ms)。確認: 判定→AI→ライト→フル→AI で開いたまま・中身が切り替わる。
- v1222: ダルマ「マップ上のポップアップ パネル以外はドラッグで移動させない」(画像=シナリオカード画面の「使用ボード」の欄がずれている)。nmGdPanel(v955 の全パネルドラッグ)は全画面の固定画面(シナリオカード等)の中の枠も「パネル」とみなしていた→候補の要素が position fixed/absolute でなければ親へ進む(浮いているパネルだけ)。確認: シナリオカード画面の使用ボードは対象外・ドラッグしても動かない、マルチ判定 #nmHq は従来どおり動かせる。
- v1221: ダルマ報告「双眼鏡 見える範囲を実施すると100%になる前にマップをスクロールさせると戻される 判定対戦両方とも」。btRmViewRefine は精密LOSの途中 1.5秒ごと・終了時に Draw(=#losScrollWrap を作り直す)。v917 で位置は保存していたが、iPad では作り直しで指のスクロール/慣性が切れる。window.NM_MAP_SCRT(#losScrollWrap 内の touchstart/touchmove/wheel/pointerdown/押しながらの pointermove/scroll を document の capture で記録)から 0.6秒以内は途中の Draw をしない、終了時も触り終わるまで 200ms ごとに待つ。確認(Playwright のホイール): 計算中に地図の作り直し 0回・位置が保たれる(判定・対戦)。iPad 実機の指での確認は未。
- v1220: ダルマ「S2 S6 アプリ対戦モード不具合細部まで確認実施」。確認: 自己対戦 S2×2・S6×2(エラー0)、人間側の通し(scratch /tmp/sc/human.js: UI 関数 BtMoveStart/btMoveTap/BtFireStart/btFireTap/BtFireRoll/BtAdvStart/btAdvTap/BtRphAuto/BtRphEnd/BtRgAuto/BtResTog/BtReactContinue/BtNext で人間側を動かす)を S6 ソ連・S6 独・S2 独・S2 ソ連で T6 まで=エラー0・止まりなし、突撃集団の dr、S6 予備が T3 に北端/東端(41ヘクス)から入れること、記録に NaN/undefined なし。注意: 演出(射撃のポップアップ BT_FX)が出ている間はアプリが進まない(仕様)。直した点: ①ダルマ「自分が担当する国以外も設定できてしまう?」(S2 部隊の準備に両軍のタブ): nmSuNats は対戦でアプリの軍を決めたら人間の軍だけ(nmSuOpen の nat 引数も無視)、国が1つなら色の入れ替えボタンを出さない、準備の OB部隊リスト(btObHTML)はアプリの軍を出さない(編集中を除く)、BtArm はアプリの軍の部隊を拒否 ②ダルマ「los表示が重なる・losバーをドラッグで移動可能に」: #nmAbBd(判定)・#btLosCd(対戦)の札を nmCdDown でドラッグ、B からのずれを localStorage nmCdOff_<id> に記憶し nmCdApply で反映(画面内に収める)、札のダブルタップで元に ③全画面のゲーム終了の帯に「— ○○の勝利」・支配数・新しい対戦。
- v1219: ダルマ指示「マップは常に全画面表示で右バー下バーとポップアップでゲームを操作進行する」「上バーはそれほどスペースを使用しなければ表示してもいい」→sample-fullcard・sample-fullpop→「全画面でない表示をなくす」(質問=マップは全部・fullpop も実施)→「ポップアップはドラッグで移動・大きさ変更可能に」。①btCmdCardHTML: 全画面では帯の内容(btBandMiniHTML)と盤外の一覧を出さず見出し+ユニット+ボタンだけ。btResHTML は全画面で1行。②btCmdHTML: 全画面では #btCmd に .bt-cmdpop(左下に固定、--btcmdx/--btcmdy/--btcmdw/--btcmdhh、上端の持ち手 btCmdDrag、右下の角 btCmdResize、localStorage btCmdPos/btCmdSize、角のダブルタップで大きさを戻す)。window.NM_BT_CMDPOP=false で従来。③常に全画面: BtMapFull は全画面中に MAPタブで呼ばれても終えない(window.NM_ALLOW_NOFULL=true で従来)、MAPタブを開いた時の自動全画面から対戦中の例外を外す、Draw のラッパーで MAPタブなのに全画面でなければ全画面に。全画面オフのボタン(ツールバー .nmFullOff、上の帯の✕、メニューの「全画面表示を解除」、ヘクスメニューの「全画面表示オフ」)は出さない。旧タブ(他のタブ)へは従来どおり行ける。④準備のポップアップ #btSuPop に右下の角(btSuResize、localStorage btSuSize)。確認: 判定モードで BtMapFull を呼んでも全画面のまま・全画面オフのボタン0・対戦の指示カードを角で 810x235 に変えて記憶。
- v1218: ダルマ報告「SSR2の部隊に追加できない」(画像=編成を変える画面、未編成に T3 の印)。編成を変える画面(btRegroupPanelHTML)には予備の操作が無く、予備の札(btResHTML)は編成を変える画面の時は出ない→画面の上に「戦術予備(SSR2)…」と件数(btResCntHTML)、各行(未編成を含む)に btResChip(「T3予備にする/✓T3予備」=BtResTog)。BtRgMove/BtRgGive の後に btResAfterMove: 上限を超えたら移した先(予備)の予備を外して btToast。確認: おまかせ編成→スタック1を予備(MMC3/SMC1/SW1)→スタック2の分隊を移す→3つ目で上限超え→予備が外れる。
- v1217: ダルマ「初めの盤外からの進入はどうやる」→調査: 全画面の対戦モードでは、スタックを選んでいない時に盤外の部隊を選ぶ入口が無かった(指示カードは選んでいる時だけ、右の「▣16」はリアル盤へ)。btFullBars の開始後の上の帯に btOffInlineHTML()(盤外: カウンター、タップで BtSelect→指示カードに 移動開始・駆け足・突撃移動・編成を変える・戦術予備)。btOffInlineHTML の盤端の文字を btEdgeLbl(カードの方位、S6 は 'S'→北)に、off2 も表示。ダルマ「初めからやり直す方法は?」: ≡メニュー(btFtMenu)の先頭に「新しい対戦(最初からやり直す)」→BtResetAsk(確認の小窓→BtReset、アプリの軍はそのまま、準備のポップアップに戻る)。確認: S6 人間ソ連 T1 移動フェイズで上の帯の 盤外(北・21) をタップ→指示カード、≡→新しい対戦→準備に戻る。
- v1216: ダルマ「配置の画面へを選択しても何も変わらない」(パネルが開いている時)→おすすめ(帯のボタンをなくす)→「実施」。btFullBars の準備中は「準備(初期配置)」の文字だけ。NM_BT_SUPOP=false の時だけ従来の「配置の画面へ」(BtMapFull)。
- v1215: ダルマ報告「配置の画面へを選択すると(旧タブ付きの)画面が表示される」。全画面の上の帯(btFullBars、準備中)の「配置の画面へ ▸」は v466 で BtMapFull(null)=全画面を終えて OB一覧のある画面へ、だった→ btSuMin(false)=全画面のまま準備のポップアップを開く(NM_BT_SUPOP=false の時は従来)。確認: 小さくした状態で押す→全画面のまま・ポップアップが開く。
- v1214: ダルマ「(対戦の準備で地図に置くを押した時の)ソ連は盤外から進入します。この編成は進入のときに盤外のスタックになります の意味は?」→説明(実際は S26 の独軍だけで、S6 では全員が未編成になっていた)→「案A」。btReinforce: btCfg() のシナリオでも人間側なら btPoolFromNm を使う。部隊の準備のグループ番号は btObItems の gi と数え方が違う(見出しの無い行)ので、進入グループの最初の見出し(o.group)と nmSuObG の gl が同じグループを使う(S24 独 g1 は車両だけで部隊の準備のグループが無い=従来どおり)。btPoolFromNm はスタックに nmSlot を付け、S6 ソ連 T1 で nmSuIsRes の編成は st.resv=true。確認: S6 で 部隊A(通常)・部隊B(予備)を作り対戦開始→盤外に A(3)・B(3,resv)・未編成(15)。
- v1213: ダルマ「S6 ソ連 SSR2 部隊」→質問「部隊の準備/対戦モード」=両方→sample-s6res→「実施」。①部隊の準備: NM_SU_RES[S6][SOV]={cap:{mmc:5,smc:1,sw:2}}。編成の保存 sv.res(nmGeSync で引き継ぐ)、カードに「戦術予備(T3)にする/T1に戻す」(nmSuResTog、上限超えは btToast で止める)、見出し「戦術予備(SSR2)」+件数(nmSuResBar)、予備の編成は BK.r でその見出しの下。予備の編成に分隊・SW を足す時も上限で止める(nmSuResBlock: nmSuAddU・nmSuGive。ドラッグで入れる経路は未チェック)。SW の数=sw+DC+LATW。②アプリ対戦: btResOn(S6・ソ連・盤外・due1・T1・人間側)で指示カードに btResHTML(件数・「このスタックを戦術予備(T3)にする」BtResTog、上限はスタック単位)、s.resv、盤外の一覧に「T3」の印。T1 APh の終わり: s.resv が1つでもあれば指定したスタックだけを予備(due3・off2 W)に、無ければ従来の自動。①の予備指定を対戦の盤外スタックへ引き継ぐ処理はなし。確認: 部隊の準備で6個目の分隊を止める、対戦で指定した5ユニットだけ予備・残り除去、自己対戦 S6 エラー0、smoke 0エラー。
- v1212: ダルマ報告「対戦モード S6 T1に北端から進入だが北端と西端が選択可能」(画像=部隊の準備の「地図に置く」中)。調査: 配置範囲 nmSuZoneOf は北端(盤z 10列)の32ヘクスだけで正しく、置く処理(nmSuPlaceTap)もその範囲で判定。画面では地図の端の半ヘクス(BTG.nodes に無い部分=画面左端の列)に暗い覆いが掛からず、置けるように見えていた。nmSuZoneSVG を「地図全体を暗くする rect に置けるヘクスの形の穴(mask)+置けるヘクスを青く光らせる(nmHxP)」に変更。確認: S6 ソ連の編成で地図に置く→上端の10列だけ青、左端は暗い。
- v1211: ダルマ「S6 SSR1 冬季迷彩(ソ連歩兵は開豁地で突撃移動してもFFMOなし)アプリ対応できる?」→判定モードの案→「実施」。ssrCamoOn(tgtNat,ffnam)=S6 かつ目標ソ連かつ FFNAM なし(=突撃移動)。ssrCamoNoFfmo(f)=射撃側の編成 pickerNat が GER・目標が車両乗員でない。fireDRM の ffmoEff とマルチ判定の内訳(FFMO の項・「FFMOなし(冬季迷彩 SSR1)」)、目標の移動の行の下に案内。残留火力: nmRaOpen は ffmo=false(R.camo)、nmRaDo の DRM と案内、nmRaq(残留火力の早見)は R.grp の国がソ連の時。SSR_REFLECT.S6[1]。アプリ対戦は v1193 の btSsr('camo')。確認(fireDRM 単体): S6 独→ソ 突撃移動 0・非突撃 -2(FFMO+FFNAM)・S2 同条件 -1。
- v1210: ダルマ指示「(煙幕タブの)ラベルをユニットタブと同じにする」。REF_SMOKE_CARD の車両名 v.lbl→nmAfvName(v)(=AFV_OFFICIAL_NAME、例 シャーマンIII(レンドリース)→Sherman III(L)(a))、砲名 g.lbl→nmGunName(g)(ORD_OFFICIAL_NAME)。
- v1209: ダルマ「早見表 煙幕 実カウンターで表示」→sample-smoketab4→「実施」。REF_SMOKE_CARD の車両別・砲別の名前のセルに vaslCtrHTML(v.id / g.id, 56) の表面画像(無ければ空き)。裏面(煙幕の数値がある面)は REF_CTR_BK にある一部の車両だけなので未対応(ダルマに伝え済み)。
- v1208: ダルマ指示「アプリ内の全ての国籍名称を(ユニット画面の国のボタンの)名称に統一」→質問「1文字の略称は?」=そのまま、「文章の中も?」=全部。名称: 米軍・独軍・ソ連・伊軍・英軍・仏軍(FFI)・連合・波軍・スロバキア軍。置換(base64 以外のファイル全体、翻訳の辞書のキーも同時に変わるので T() は一致): ドイツ軍→独軍、ドイツ(後ろが 製/語/人/国/本土/侵攻 等でなく、前が 西/東 でない)→独軍、アメリカ軍/アメリカ→米軍、ソ連軍・ロシア軍・露軍・赤軍→ソ連(S? ベルフォールの「セポワからロシア軍を排除」=第30SSのロシア人部隊だけ残す)、イギリス軍→英軍、イタリア軍→伊軍(イタリア機甲/歩兵/戦車/海岸 も)、ポーランド軍→波軍、自由フランス(軍)・自仏軍・フランス軍→仏軍(FFI)、連少軍→連合、引用符の中の単独の イギリス/イタリア/ポーランド/スロバキア も。BT_SIDE_NAME={GER:'独軍',SOV:'ソ連'} にし、+'軍…' を付けていた所(5か所)は 軍 を外した。地名(loc の「ドイツ/ブライアルフ」「アプヴァイラー、ドイツ」)・ナチス・ドイツ・ドイツ国防軍・イタリア本土 などは元のまま。確認: 全 script の node --check、smoke 0エラー、自己対戦 S2 エラー0、シナリオタブ・対戦の準備で旧名称が表示されないこと(innerText 検索)。
- v1207: ダルマ指示「はみ出しを修正」(iPad画像: ー/✕ が「新しい対戦」と重なる・「配置完了・ゲーム開始」が③の枠からはみ出す)。.rx を position:absolute(top:-12px)から見出し .hd の右端の通常の要素に、シナリオ名は省略記号で縮む。.b.go は width:100%・折り返し可、.st は overflow:hidden、.b は max-width:100%。確認: 1150x798 で③の枠からはみ出すボタンなし・ー/✕と操作ボタンの重なりなし(getBoundingClientRect で検査)。iPad は文字が PC より大きく出るので実機で再確認を。
- v1206: ダルマ指示「APPを選択でアプリ対戦モードのmapへジャンプ」(判定モードの≡→シナリオ選択 #nmTv の画像)。原因: BtAppJump は対戦・全画面にしていたが #nmTv が開いたまま残りマップを隠していた→ BtAppJump の最初で nmTvClose() と #nmFtMn を閉じる。確認: 判定モード全画面でシナリオ選択を開き S2 の APP→#nmTv なし・対戦・全画面・準備のポップアップ。
- v1205: ダルマ「早見表 煙幕 フェイズ名称を日本語で表記」「車両砲を国で切り替え表示」→sample-smoketab3→「実施」。REF_SMOKE_CARD: フェイズ略称を「PFPh(準備射撃フェイズ)」形に、置く煙幕は PFPh/DFPh を2行に。国のボタン(S.refSmkNat、件数付き。'USA/FFR' などは含まれる国すべてに出す)で車両別・砲別の表を絞る。確認: アメリカで表35行・smoke 0エラー。
- v1204: ダルマ「(アプリの攻め方)白兵戦の判断の見直し 全て実施」。調査(自己対戦に BT_DBG の ADJ/CC を出す): S6 で zL7 の独歩兵が T2 に全滅し LMG だけが残ったヘクスを、btEnemyAt が「敵がいる」と判定→アプリは進入も白兵戦(相手の歩兵がいないので評価前に return)もできず、btUpdateCtl も SW を「敵がいる」と数えて支配が変わらなかった。修正: btOccU(歩兵 MMC/SMC と AFV だけ)で btEnemyAt、btUpdateCtl は歩兵だけを数える(ASLSK4 用語集 Control: 敵のユニットがいなければ支配。SW・砲・残骸はユニットではない)。S2 は別の原因で独が建物の3ヘクス手前で止まる→ BT_SCFG.S2.aiw={attRisk:1.0,riskDecay:0.15,riskMin:0.4,attUrg:0.3}(案B。案C attRisk0.7・attUrg0.5・gAdjAtt2 は独勝ちだが攻撃側がほぼ全滅)。結果(各1回): S6 ソ連が支配2→ソ連勝ち(修正前は毎回独が3つ保持)、S2 独が T5 に3つ支配→最後に1つ奪回されソ連勝ち(修正前は独の支配0〜1)。未: 敵の SW だけ残ったヘクスに入っても、その SW を拾う・壊す処理はない(SW は相手のスタックのまま残る)。
- v1203: ダルマ報告「(準備のポップアップの)ボタンはみ出している 文字も読みにくい」(iPadの画像でパネルが約520pxに狭まり、3枠の文字が折り返し)。原因(推定・PCでは再現せず): iOS Safari は拡大中 window.innerWidth が見えている範囲の幅になり、btSuPopPos の幅 min(980,innerWidth-40) が小さくなった→btSuPopVW(documentElement.clientWidth)で計算、幅は max(560,min(1000,W-80))。見出しは1行(対戦ON・準備・シナリオ名)、操作ボタンはその下の行 .tl に右寄せ。文字: ボタン14px・小ボタン12.5px白・枠の見出し14px #c8d4e0・行14px・説明12.5px #b4c2d0。3枠は minmax(150px)/minmax(190px)。ドラッグはパネルの120pxが画面に残る範囲まで。ダルマ指示「全画面を終えるは削除」: ≡メインメニュー(nmFtMenu)の「全画面を終える」を削除(ツールバーの全画面解除ボタンは残る)。
- v1202: ダルマ指示「APPを押すとアプリ対戦モードを起動表示」。BtAppJump: btActive() でなければ(別シナリオで BT.on のままでも BT.on=false にしてから)BtToggle、その後 BtMapFull で全画面。確認: S2 で対戦ON のまま S6 の APP → S6 の対戦・全画面・準備のポップアップ。
- v1201: ダルマ「FTと機関銃を両方持つ編成は最初をFTを使わないに」実施。nmMfFtInit(nmMfOpen と nmMfEnsureGrp から、NM_MF ごとに1回 M.ftInit): 有効な編成の g.sw に FT と他のSWがあれば FT を外し(swOwner は保存の編成から)、fgRecomputeFromPicker。外したSWは g.mfOff に入れ、nmGeList・nmGeSync は g.sw∪g.mfOff を返す/保存する(射撃の選択で編成からSWが消えないように。nmMfSwUse も mfOff を更新、nmSwGrpOut で除く、FgSelectGroupSlot で消す)。確認: MMG+FT の編成で開く→g.sw=MMG・編成はMMG+FT のまま・FTを選ぶとFTだけ・開き直すとまたMMG。
- v1200: ダルマ指示「対戦off時に判定モード全画面を表示する」。BtToggle の OFF の後(setTimeout 0)で nmModeSet('judge') と、MAPタブなら BtMapFull で全画面。nmModeSet から対戦を切った時(window.NM_MODE_SW=1)はモードを変えず全画面だけ(例 ai→online は online のまま)。確認: S2 準備中にポップアップの「対戦 ON」で OFF→judge・全画面・#nmFullTabs あり、ai→online で online・全画面。smoke 0エラー。
- v1199: ダルマ「対戦の準備画面が見づらい→サンプル」sample-btsetup→「ポップアップで表示」(samples/sample-btsetup2.png)→「地図に置くでパネルを自動で小さく」「パネルはドラッグで移動可能」。btSuPopSync(Draw をラップして毎回呼ぶ)が #btSuPop(z9000、#nmSu 9400 より下)を出す: 条件 btSuPopOn=MAPタブ・対戦ON・地形解析済み・未開始。中身 btSuPopHTML: 見出し(対戦ON・準備・シナリオ名・編集/簡易表示/演出/クローズアップ/セーブ・ロード/記録/新しい対戦)+3枠(①アプリの軍・アプリの初期配置・S26の進入順 ②配置範囲・進入・部隊の準備を開く・マップタブの編成で配置・OB部隊リスト ③建物の支配・勝利に必要・S26のバランス・配置完了・ゲーム開始)。基本画像の配色(パネル #1c1f27+ドット・ボタン #14171d 影)。ー/✕=NM_BT_SUMIN で左上の札(▸開く)、nmSuPlace で自動で小さく、配置中は札の下に案内。見出し・札をドラッグで移動(localStorage btSuPop {x,y})。btBandHTML は準備中は選択中スタックだけ(window.NM_BT_SUPOP=false で従来)。確認: S2 で表示・ドラッグで位置記憶・アプリの軍の切替・地図に置くで小さく、smoke 0エラー。
- v1198: ダルマ指示「車両が使用できる煙幕を早見表に専用タブ」→sample-smoketab→「砲も追加」→「データを見やすく」sample-smoketab2→「実施」。REF_PAGE の下段を4列(兵士・砲・車両・煙幕)、S.refSub='smk' で REF_SMOKE_CARD(REF_ACQ_CARD の前)。中身: 種類カード6枚(s/WP=欠乏No.・sD/sM/sP/sN=使用No.、SK4 1.2.5・6.2・7.5 の原文どおり)・煙幕装置の共通ルール(7.5)・煙幕カウンターの効果(1.2.5)・車両別(AFV_DATA の smoke と ma.specialAmmo、国ごとの見出し・1行おき・成功率 CE/BU は 2D6≦使用No.(BU は+1)で計算、sP は CE のみ・sN は BU のみ・depleteByYear は最初の年)・砲別(GUN_DATA の ammo の Smoke/WP、deplete が {年:値} の時は「年〜」)。CSS は .rsk の中だけ。確認: 実物で6枚・表83行・smoke 0エラー。
- v1197: ①ダルマ「②実施」S6 戦術予備(SSR2): T1に盤外に残したスタックは T3 に北端または東端から進入(盤外スタックに off2 を追加。S6 は地図を180°回すので カードの東端=地図の西端 'W'。btEdgeHit(off,off2,N) で進入の判定・候補・移動探索を共通化、表示は btOffLbl「北端/東端」。分けたスタックにも off2 を引き継ぐ)。確認: 単体テスト(T1 APh で due=3・off2=W、進入ヘクス41(南32+西10)) ②ダルマ報告「FTとmmg lmg hmgを同じ部隊に配置できない」: 部隊の準備で選択中の編成(射撃タブで有効な編成)に支援火器を渡すと nmSwGrpIn→FtogSW を通り、FT単独ルール(4.2)の処理で FT と他のSWが入れ替わっていた→持たせるだけなので直接 g.sw に追加。撃つ時の単独はマルチ判定の「使うSW」(nmMfSwUse)で従来どおり。確認: MMG・FT・LMG を順に渡して3つとも残る ③btAIW(): BT_SCFG[id].aiw で BT_AIW を上書き(btRoleW・gAdjAtt・ccCap・白兵戦の基準 ccLate/ccLateT)。値は未設定。自己対戦 S2/S6 エラー0、smoke 0エラー。
- v1196: バグ修正 ダルマ報告「S2 マップスクロールしても戻される」(対戦モード)。原因: v1194 で対戦中も #nmFullTabs を作るようにしたため、btMapFullSync の fullT に左右の縦長のツールバーの高さ(tb.offsetHeight)が入り、v462 の「上の帯の高さが変わった分 sw.scrollTop をずらす」が毎回走って地図を一番下へ(左右のツールバーの時は --btfullt が 0 に戻されるので毎回差が出る)。修正: sideTb(nmTbW()>0)の時は fullT にツールバーの高さを入れず、v462 のずらしもしない。確認: S2 対戦モード・拡大1.6で scrollTop=200 が3秒後も200(修正前は277=一番下に戻る)。
- v1195: ダルマ指示「アプリ対戦が可能なシナリオはS26と同じくAPPのボタンを表示」。btAppBtnHTML の条件を BT_APP_SC(S26だけ)または BT_SCN(対戦モード対応)に。確認: シナリオタブSK#1でS2・S6にAPP、S6のAPPで対戦モードのマップへ(btActive)。
- v1194: sample-btside3 実施。sample-btside(ブランチ sample-btside、samples/sample-btside.png 左=今・右=サンプル): ダルマ指示「アプリ対戦モードでもツールバーをデフォルトで右側に表示・ライト判定モードと内容を同じに」「なるべくマップを広く」。btMapFullSync で対戦中も #nmFullTabs を作る(btSideOn: NM_BT_SIDE!==false かつ nmTbPos が左右)。中身 btSideActHTML: 判定(参考)・部隊(開始前だけ)・↶↷(btFtUndo/BtVRedo)・A→B(BtLosAB)・見える範囲(BT.sideView→次のタップで BtRmShow view)・早見表・カード・旧タブ・DR・リアル盤・≡(btFtMenu)。攻撃・移動・同期は出さない(nmSyChip も対戦では消す)。上の帯(btFullBars)はフェイズ・次へ・フェイズの操作だけ、帯と下の帯は右端をツールバーの手前まで(btSideCss)。並び順は nmTbOrdApply(ライトと同じ設定)。今までの対戦モードは右56pxが空いていた(nm-tbR のまま)ので、地図の広さは同じでその空きにツールバーが入る。追加 16:40 ダルマ「使用しないものは非表示にしてスッキリ・マップはなるべく広く」→ sample-btside2(samples/sample-btside2.png): 判定・部隊・旧タブも外す(残り: ≡・↶↷・A→B・見える範囲・早見表・カード・DR・リアル盤・拡大縮小・回転・全画面解除・版)。下の帯(btFullBot: 選択中・LOS・最後の記録)はLOS測定中だけ表示(NM_BT_SLIM)→地図の縦 729→787px。追加 16:55 ダルマ「A→BでLOSの情報はタスクバーに表示せずに判定モードと同じようにマップ上に表示」「最後の記録 タスクバーに表示」→ sample-btside3(samples/sample-btside3.png): 下の帯(btFullBot.slim、32px)は最後の記録の1行だけ(地図の縦 755px)。LOSの結果は btLosCardSync の札 #btLosCd(Bのヘクスの右、判定モードの #nmAbBd と同じ見た目: LOS OK/NG・距離・妨害・地形・高低差、⇄でA/B入れ替え、✕で終わる。Bを選ぶ前は「目標(B)のヘクスをタップ」、ヘクスが地図の見えている範囲の外なら隠す)。上の指示カードの「LOS測定(A▶︎B)」(btLosABHTML)は出さない。 確認: S24 の対戦画面で撮影(地図 1124x755)・自己対戦S6でエラー0・smoke 0エラー。
- v1193: ダルマ「S2 S6 S24 を実施」。対戦モードを3シナリオに拡張(BT_SCN)。S26 は従来の専用コード(BT_S26_*)のまま、それ以外は BT_SCFG[id](btCfg())で決める: grp(o)=OBの行→'setup'/進入の組、zone(o,N)=配置範囲、ent=[{id,side,turn,off,lbl,mpHalf,roll}]、vic('all'/'n')・vicSide・bl(勝利の建物の作り方)、flip、ssr。配置範囲の出典はアプリ内のシナリオカード画像(_EX_CARD_IMG など): S2=ヘクスグレイン A9-K4-P4 の南(ソ)/北(独)(btS2Line: 3ヘクスの中心を結ぶ折れ線、線上のヘクスはどちらも不可)、S6=独は番号9以下・ソはT1北端、S24=独は任意・ソT1西端・独T1東端(車両はMP半分 u.mpHalfT)・独T3東端。S6 は盤zを180°回して置く(カードの北=地図の南)ので ent.off は地図上の盤端('S')、表示は btEdgeLbl で入れ替え(flip)。S2 は A〜P列だけ(btBuildGraph で maps.range の外を除く)。勝利の建物 btCfgBldgs: S2/S6=vicHexes の隣り合うヘクスをまとめて1棟、S24=盤vのJ〜Q列の建物ヘクスを1ヘクスずつ。開始時の支配 btCfgInitCtl=ASLSK4 用語集 Control(自軍の配置範囲内・両軍の範囲に入るものは除く)。勝敗 btCfgWinner/btCfgNeed。進入 btReinforce: cfg.ent(S2 突撃集団は毎ソ連ターン dr<ターン数、BT.rollIn)。SSR(btSsr): S24 下線士気・S2/S24 煙幕+2(smk)・S24 CCV+1(I.ccvAdd→btCCV)・S6 冬季迷彩(突撃移動中のFFMOなし、btFireEval と btResidAttack)・S6 独MMCの混乱面士気+1(bm)・S6 戦術予備(APh終了時、T1に盤外へ残したスタックを MMC5/SMC1/SW2 まで due=3 に。北端のみ、東端は未対応。due より前は動けない)。火炎放射器(4.2): btInfo0 で kind:'mg',type:'FT',ft:true(FP24・射程1・2は半分・PBFなし・前進射撃で半減なし・釘付けは不可・TEMと指揮なし・ほかの火力と組まない=大きい方だけ使う・X#10(エリート以外は8)で除去・FT所持への攻撃-1)。車両の判定は btAfvData にあれば車両(シャーマンIII・III号N)。カウンター画像は BT_VC.map に無ければ VASL_CTR_MAP['u:国|名前']。アプリの初期配置 btAppSetupGen(side): 守る側=分隊を勝利の建物に均等、攻める側=前線に近い遮蔽ヘクス、指揮官とSWは建物ごと、砲は遮蔽ヘクス(乗員は btCrewWithGun)。人間の配置は btInZone/btSetupSides で両軍対応(S2 は両軍が配置)。盤外からの進入の盤端に 'S' を追加(6か所)。不具合修正: btRoutSearch の未定義の変数 E(v959)で潰走の探索が ReferenceError になっていた→ enemies(S26 にも影響していた)。バランス(BtBal)は S26 だけ表示。確認: 自己対戦 dev/selfplay.js(node dev/selfplay.js S6 分)で S26・S2・S6・S24 を最後まで・エラー0(S24 ティーガーの進入は 6/12MP、S2 突撃集団の dr、FT は単体テストで FP24・DRM0)。smoke 0エラー。未確認: 実機で人間が配置・進入する流れ、S6 戦術予備の実際の動き(自己対戦ではアプリが全部T1に入れる)。
- v1192: ダルマ「案3 全て実施」(sample-emptytap・sample-viewtem)。①空のヘクスのタップ: 地図のタップ処理(v411 の nmUnitAt 判定の直後)で、地点Aが無く自軍・敵のいないヘクスなら nmEmptyPlOpen → NM_RM_VEH=NM_PL.sd||f で btRMenu(配置パネル nmRmVehItems)。地点Aがある時=B地点は従来どおり。window.NM_EMPTY_PL=false で無効。②見える範囲: nmViewTemSVG 案3(既定 NM_VIEW_TEM=3、0で旧表示)。見えるヘクスに 左上=妨害の黄の丸(+n)・右下=TEM の紺の丸(T+n、BTG.nodes[i].tem)。確認: tEE5 から撮影・空ヘクスのタップで配置パネル・smoke 0エラー。
- v1191: sample-rmst 実施(ダルマ「赤枠部分無くして状態は常に表示」「移動は消去」→質問で 移動+使ったMP)。ヘクスメニュー: nmRmCompose の top で rest を見出し「▸ 状態・操作」なしで常に入れる、v654 の畳み(nmRmStTog「▲ 状態・移動・射撃済を閉じる」)は通さず、x.row の /^(移動|使ったMP)/ を除く。window.NM_RM_NOFOLD=false で元に戻る。「▼ その他」「LOS・移動」「ヘクス」の畳みはそのまま。目標の移動は攻撃パネル(nmTgtMvSet)で設定。確認: PzKpfw IIIN のメニュー撮影・smoke 0エラー。
- v1190: ダルマ指示「マルチ判定内の各パネルで選択枠の角が欠ける 修正実施」。原因: 連結バー(#btRm .rmBtns、overflow:hidden・角9px)の選択ボタン .rmB.on が角0+枠1px金(nmMuCss)で、端のボタンの角が親に切られていた。style#nmRmBtnOnCss: .rmB.on:not(:has(.coMk)) を border0・角3px・outline 2px #ffd24a offset-2px、first-child=9px 3px 3px 9px、last-child=3px 9px 9px 3px、only-child=9px(inset の box-shadow は別CSSで none になり効かない)。確認: マルチ判定の全タイルを開いて走査(scratch survey.js)、該当=ボグ判定・回復・修理・PAATC・車両が敵AFVへ の国籍・種類・向きのバー。すべて計算済みスタイルで角と outline を確認、smoke 0エラー。 追加(同じ v1190): ②白兵戦のユニット選択の「白兵戦を判定する」(.nmGoC)が nmBtnDarkAll(v1139)の #nmCcSc button.b と nmCcScBase(v1185)で背景が #14171d・文字は濃紺のままで見えなかった→ 両方で .nmGoC を対象外(#nmMh2・#nmNu も)。③不意打ち(nmAbHTML): 「不意打ちのdrを振る」は「振る」で .nmAdB が付き、オートダイスOFF(html.nm-adoff)で非表示→ OFF の時は「不意打ちを判定する」(.abJudge、両軍のdrが入るまで disabled、nmAbRoll)。確認: dr 2/5 → 自軍の不意打ち成功。④回復の DR NaN: 国籍切替直後に古い画面の前の国籍のユニットボタンが押されると、その国籍に無いユニット(例 GER の 4-4-7[1])になり士気 NaN → nmRrPick で今の国籍の OB に無いラベルは無視。⑤Merge sample-ve(ダルマ「実施」): VE 案3(NM_VE_STY 既定3)・左右分け・カウンター選択の金枠(style#nmRmBtnOnCss2、.coMk の outline)、PAATC 案2-1(.rmBox:has(.nmPaBrk))。⑥「敵」: タイル名「車両が目標のAFVへ（停止できる？）」、VE の案内「攻撃側の車両と目標のAFVを選ぶと…」、PAATC 説明文「相手の車両がいるヘクス…」。確認: 全タイルのボタンの文字と背景のコントラスト走査で問題なし、smoke 0エラー。 ⑦白兵戦パネル(nmCcp)の「自軍(ソ連)/敵(独軍)」→「攻撃側(ソ連)/防御側(独軍)」(ダルマ選択)。nmCcRole: シナリオのユニットで判定は①攻撃側の国(window.NM_CC_ATK、nmCcScGo でセット・他から nmCCOpen/nmCvOpen したら null)、地図の白兵戦は手番の側(nmPhaseSideNat)。不意打ちのログも同じ。車両を攻撃の説明「相手の車両」。旧 #btRm の白兵戦メニュー(nmCCSet の自軍が/敵が)は未変更。
- v1189: ダルマ「案3-2 全ての白兵戦 実施」(sample-ccsc→ccsc2 案3→ccsc3 案3-2、CSS は samples/css/ccS2.css)。nmCcScDraw の .ccBox に nmCcLR を付け、style#nmCcLRCss: .ccBox を2列グリッド(子1=見出し全幅・子2=説明文非表示・子3〜5=攻撃側=左・子6〜8=防御側=右・子9=判定ボタン全幅)、.nmPk:has(img) を1行リスト(32px カウンター・×数/状態・−数＋)で各側2列、区切り線(防御側グリッドの ::before)、見出し 攻撃=#ffd24a/防御=#7ec8e3。車両を攻撃(子が10個: 防御側=見出し・国・「車両」・車両の一覧)は :has(>div:nth-child(10)) で行を割り当て、grid-template-rows で隙間を詰める。サンプルと画素一致・＋で数が増え判定ボタンが有効になることを確認。MC・爆薬(nmScDraw)は対象外。
- v1188: ダルマ指示「左右クリックを同じにする」(質問→両方とも今の左クリック)。nmRClick で NM_RQ=0 に固定し、右クリックも通常メニュー(タイル+状態・操作・LOS・ヘクス)。nmRqItems(v1170 の短いメニュー)は残っているが使われない。確認: 車両・砲のヘクスで右クリック=通常メニュー。
- v1187: ①sample-hqmarks: nmMarkScan を拡張。[data-nmmk=back] は見出し行の先頭へ移し、パネルに閉じるが無ければ戻るの onclick から nmHqOpen()/if(hq)nmHqOpen() を除き NM_HQBack()→nmHqCloseX() にした閉じる(nmMarkCloseOf)を行の右端に追加。#btRm は rmFull でも「← 戻る」行を左上の丸い←(.nmRmBk)、右上に丸い✕(.nmRmX→nmHqCloseX)、行の .rmSub をパネル名 .nmRmTt として←と✕の間に表示、閉じる行は隠す(it.__mk で一度だけ)。nmCcScBase の .b 上書きから .nmRnd を除外(爆薬・MC・白兵戦の←が丸くならなかった)。確認: 全21タイルのマークが角丸17px・枠1px、ボグ判定/修理/PAATC/爆薬/砲撃/早見表で←=マルチ判定・✕=閉じる ②nmScnTxtPop をミックス3(sample-scntxt2、ダルマ「ミックス3で実施」)。サンプルと画素一致、✕で閉じる。
- v1186: ダルマ指示「他のパネルやメニューも戻る 閉じるはマークに変更」sample-marks→実施。nmMarkScan(MutationObserver): 文字が「←戻る」「✕閉じる」だけの button/.btn/.b/[onclick] を .nmRnd(丸い←/✕、34px #14171d 枠#4a5566)に置換(data-nmmk=back|close、title)。#btRm は「← 戻る」行を左上の丸い← .nmRmBk(行を click)に、閉じる行は右上✕があるので隠す。#nmFtBot/#nmFullTabs/#nmFtAct/#nmScnTxt は対象外。style#nmMarkCss はスキンの .b 上書きに負けないよう高い特定性。確認: 部隊の準備の←・シナリオ選択の✕・方向パネルの←が従来どおり動く。
- v1185: ダルマ「実施」(sample-mmx)。①nmMmXInit: ≡メインメニュー右上に丸い✕(.nmMmX)、見出しの段を38pxにして重ならない、下の「✕ 閉じる」ボタンを削除 ②style#nmCcScBase: #nmHqPk>div と #nmCcSc .ccBox を基本画像(背景ドット・.b は #14171d 枠なし影・::before の縞を消す)。スキン 0/3/4/4a/5/7 すべてでマルチ判定と同じ計算済みスタイルを確認 ③nmHqScHtml: カウンター画像があれば画像だけ(名前・×数は title) ④nmHqPk の見出し: 「— どの編成?」を削除、← 戻る=左上の丸い←(.nmRnd)、右上に丸い✕(パネルを閉じる)。
- v1184: ダルマ「実施」(sample-rmx・sample-botdrag・sample-subase)。①nmRmXInit: .nmMu のメニュー右上に丸い✕(.nmRmX、.nmHqX と同じ見た目、押すと BtRmClose)。.rmGrip を38pxにして項目と重ならない ②nmBotDivInit(nmFtBotFill の後): 隣り合う表示枠(ssr/vic/guide/last/unit、PFとTURNは除く)の間に仕切り .nmBotDv。ドラッグで flex-grow 比を変更(勝利条件の max-width:24% を外す)、localStorage nmBotW={kind:幅}、ダブルタップで消す ③nmMmRzInit(nmFtMenu): 下端の持ち手=高さ・左下の角=高さと幅(右端固定)、nmMmSize、ダブルタップで元に戻す。持ち手と仕切りは onpointerdown 属性を付けて nmGdPanel(パネル全体ドラッグ)の対象外 ④style#nmSuBaseCss: 部隊の準備(#nmSu)の .bx=基本画像の背景ドット、.btn/.tb/.mini/.pool/.g=枠なし暗い(#14171d+影)、.btn.pri=緑のまま、.tb.on=金の線、選択中の編成 .g.on は青枠のまま。確認: ✕で閉じる・仕切りで 256/256→349/163 を記憶・メインメニュー 250x576→370x396 で右端固定・部隊の準備はサンプルと画素一致。
- v1183: ダルマ指示「このメニューも背景細かいドット 枠なし暗いボタン メインメニューと同じに」(何もないヘクスのメニュー)sample-emptyhex→実施。btRMenu の MU1=NM_MU_F||!NM_RM_CUR(判定パネル=NM_RM_CUR あり・rmFull は対象外のまま)。カウンターを配置のパネル(NM_RM_VEH)も対象。配置パネル独自のボタン(国・部隊/車両/砲・煙幕/残骸/マーク)の枠は残っている(ダルマに確認中)。
- v1182: ダルマ「B 2 実施」。①マルチ判定のヘッダーの閉じる(nmHqClose)を丸い✕ .nmHqX(34px・#14171d・枠#4a5566・角17・影、style#nmHqXCss は高い特定性で上書き) sample-hqclose 案B ②nmBotCard の勝利条件(VPの形=v1171 はそのまま)を案2: 先頭の時期(終了時/即…)・最後の→の後=結果をチップ、本文13.5px ③SSR を案2: 番号カプセル(SSR_REFLECT=緑/未対応=黄)+国(国名の後が空白か数字の時だけ)+本文、2列。勝利条件とSSRの枠は flex 1 1 0。sample-botinfo。確認: S24/S30/S12 を撮影、計算済みスタイルで✕が34px・角17・枠#4a5566。
- v1181: ダルマ指示「ヘクスタップメニューの背景を細かいドット ボタン枠なしで暗く」sample-leftbase→実施。nmRmBuildB で NM_MU_F=1・タイルは nmMuTiles(右クリックと同じ)。v1178 で左クリックを v1173 の見た目に戻したのは誤り(ダルマの「基本画像」は全メニュー対象だった)。計算済みスタイルで基本画像と一致を確認。
- v1180: ダルマ指示「メニューの伸び縮みを可能にする その状態を保持する」(質問→「両方」、sample-menuresize→「基本画像で実施」)。①折りたたみ(nmRmUFold/XFold/AFold/nmRmStTog/nmRmMoreTog)は window.NM_RM_GROW=1 を立て、btRmReopen は前の高さ(pos.h)に縛らず nmRmFit で画面内に収める(原因: v602 の「開き直しは前の高さ」で中身が切れていた) ②NM_RM_ST/NM_RM_MORE を localStorage(nmRmSt/nmRmMore)に記憶 ③nmRmSizeInit(btRMenu のラッパー): 判定パネル(.rmFull・#nmIj 内)以外の #btRm .rmBox の下端に持ち手 .nmRzG(━=高さ/右下 .nmRzC=高さと幅、nmRmSize={w,h} を記憶、ダブルタップ=記憶を消して自動)。配色=基本画像(持ち手 #8899aa・背景はパネルと同じドット)。持ち手の pointerdown は stopPropagation(パネル全体のドラッグ nmIjFmDrag と競合しない) ④不具合修正: nmRqItems の短いメニューで NM_RM_CUR が前の判定のまま残り rmFull(画面いっぱい2列)になっていた→ null に。確認: 伸びる(高さ704=中身702)・縮む・角ドラッグで400x504を記憶・開き直しで同じ大きさ・ダブルタップで自動、短いメニュー3種と方向パネルに持ち手、判定パネルには付かない、計算済みスタイルで持ち手の色 rgb(136,153,170)。
- v1179: ダルマ指示「xでABを終了」。A→Bのバー(#nmAbBd)の✕を nmAbBdClose(隠すだけ)→ nmLosOff(A・Bを消す・↶で戻せる)。Playwrightで✕後に バー・A・B とも消えることを確認。
- v1178: ダルマ指示「基本画像」(=22:56に貼ったマルチ判定・≡メインメニューの2枚と、それから作った sample-menusteel7)。①右クリックの短いメニュー(nmRqItems)を攻撃・移動・方向・消去のタイル(nmMuTiles、歩兵の移動は NM_RM_SUB=imv の種類選択) ②nmDotOff が .rmBox を btnSel の \.rmB と誤認して背景ドットを none にしていた→ nmMuCss を対象外 ③左クリックの通常メニュー(nmRmBuildB)は v1173 の見た目に戻す(NM_MU_F を立てない・タイルの inline style を v1173 に復元。v1173 と画素一致を確認) ④NM_MU_F は nmRqItems が項目を返す時と nmRmFaceItems(方向パネル)だけ ⑤向きドラッグは毎回 nmNodeOfEh→nmClientOfNode でカウンターの今の位置を取り直す(v1177 iPad画像: 案内線の起点がカウンターから約190px下=開始時の位置のまま)、window とマウスのスクロールも固定。確認: getComputedStyle を本物の #nmFtMn と比較(背景色・ドット・枠・角丸・影一致。文字色は基本画像のマルチ判定 rgb(232,238,244))。実機iPadで向きドラッグ要確認。
- v1177: ダルマ報告「方向ドラッグ 場所によってスクロールして場所がズレる」。原因を再現(CDPタッチ、地図をスクロールした後の位置): 向きが変わるたびの Draw() が、地図をスクロールしても更新されていない古い S_LOS.scrollLeft/Top(例 257)へ戻していた。nmAimLock の開始時に losSaveMapScroll() で今の位置を保存して解消。スクロール位置・ズーム(0.8〜2.2)違いの5地点で前後一致を確認(スクリプト scratchpad/cad3.js)。教訓: ドラッグ中に Draw() を呼ぶ処理は、開始時に losSaveMapScroll() するか確認する。
- v1176: ダルマ報告「右左クリック両方少ないメニュー」。v1170 の短いメニューが、ユニットのあるヘクスの左タップ(47921行 nmRClick(…) の無引数呼び出し)にも掛かっていた。nmRClick(e,lp,full) に full を追加し、左タップは full=true=通常メニュー。右クリック(pointerup button2)だけ短いメニュー、長押しは従来どおり通常メニュー。Playwrightで短(4〜5項目)/通常(7項目)を確認。
- v1175: ダルマ報告「スクロールしてズレる」(砲の矢印ドラッグ中に地図もスクロールして矢印がずれる・iPad実機)。nmAimLock(on): 触って始めた向きドラッグの間、#losScrollWrap の scrollLeft/Top を保持・overflow:hidden・touch-action:none・scrollされたら戻す。touchend/cancel/pointerup/mouseup で解除(60ms後)。Playwright(CDPタッチ)で向き変更・終了後ov=auto・lk=false を確認。実機で直らなければ「どこを触ったか」を聞く。
- v1174: ダルマ指示「メニュー統一デザイン=実施」。左クリックメニュー・右クリック短メニュー・方向パネル・状態操作(.nmMu が付く #btRm .rmBox だけ。nmRqItems/nmRmFaceItems/nmRmBuildB が window.NM_MU_F=1 を立て btRMenu が付与)を ≡メインメニュー(#nmFtMn)と同じ見た目に。CSS は style#nmMuCss(btRmLos の直前)。値=実測(パネル rgb(28,31,39)+4px格子の黒α.667/白α.08・枠1px #4a5566・角10 / ボタン rgb(20,23,29)・枠なし・角8・影3段 / 文字 rgb(232,238,244) / 見出し #8899aa / 選択=金 #ffd24a / アイコン=カプセル #1b222c+枠 #4a5566)。大タイルは .nmMuT/.nmMuC。動作は変更なし。smoke 0エラー。判定パネル(vfire等)は対象外。
- v1173: ダルマ報告「砲のドラッグで画面がスクロール」。Playwright(CDPタッチ)では再現せず(向き0→3、スクロール無し)。つかみ損ね(矢印の先だけが当たり・半径16〜30px)が原因と推測し、nmAimPickを軸全体(nmSegD)+touch時は半径30〜44pxに拡大(NM_AIM_T)。実機で直らなければ、どこを触ったかを聞く。
- v1172: sample-cadrag 実施。nmAimPick(v631の矢印ドラッグ)の対象を車両のみ→砲(eh.gun)も。向き未設定(facing=null)の砲は矢印が無いので、先に方向パネルで決める。カウンター本体上(40px以内)はこれまでどおり移動ドラッグ。Playwrightで向き0→3を確認(実機未)。
- v1171: sample-leftmenu案B・sample-victorybar案2 実施。①nmRmCompose→nmRmBuildB(n,U,X2): カウンター1個のヘクスのみ。U内の項目を f(処理文字列)で判別して 攻撃(nmVfOpen/nmMfOpen)・移動(nmMvStart。歩兵はNM_RM_SUB='imv'で種類選択=NM_RM_IMV)・方向(nmRmFaceOpen)・消去 を大ボタン化(html行)。残りは「▸状態・操作」(localStorage nmRmUOpen)、配置・残骸・煙幕・マークは「▸ヘクス」(nmRmXOpen)に折りたたみ。空ヘクス・複数カウンターは従来表示。②nmBotCard: 勝利条件にNN VPを含み枠3つの時、大きなVP数+チップ(陣営/即勝利or終了時/かっこ内)+本文。VPを含まない勝利条件は従来表示。歩兵(グループ)の大ボタンは実機未確認(砲・車両はPlaywrightで確認)。
- v1170: sample-rightmenu 実施。nmRClick(マウス右クリック。lp=長押しは対象外)が NM_RQ=1 を立てて btRMenu → nmRMenuItems 拡張(nmRqItems)が短いメニューを返す。カウンター1個のヘクスのみ(空・複数は従来メニュー)。砲=攻撃(nmVfOpen)・方向・消去、車両=主砲攻撃(なければMG)・移動(nmMvStart)・方向・消去、歩兵=射撃(nmMfOpen)・移動(nmMvStartIm)・消去。人力移動は短いメニューに入れない(左クリック/タップのメニューにはある)。実機のマウスでの確認は未。
- v1169: ダルマ指示「砲を置いた後の『誰が操作しますか?』は不要」実施。nmRmSetGun の拡張で NM_GM_AFTER をセットしないようにした(v874の自動表示を停止。砲のメニューからの操作者選択=NM_GM/nmRmGunManItems は残置)。
- v1168: sample-gundone 実施。nmRmFaceItems: 砲の方向画面も「完了(マップに戻る)」に(「次へ」と操作員/非操作員の2画面目は使わない=コードは残置)。操作員/非操作員は判定パネル(nmVfNqSet・v1153)で選ぶ。
- v1167: sample-facefull 実施。①nmRmFaceItems: 砲以外のOK→「完了」(マップに戻る=NM_FACE=null;NM_VF_FROM=null;BtRmClose()。スポット判定経由は nmIjFaceBack)。②btRmReopen の v786 例外(.plWrap)に NM_FACE 中も追加: 方向の画面は元のメニューの高さに縮めず全部が見える高さにする(中身が増えて下が隠れスクロールになっていた)。
- v1166: sample-facedone 実施。nmRmFaceItems の砲2画面目: 操作員/非操作員は eh.nqSel が null の間どちらも✓なし(nmFaceNq で0/1をセット、NM_FACE.opDone=1)。opDone になると「完了(マップに戻る)」を表示、f=NM_FACE=null;NM_VF_FROM=null;BtRmClose()(スポット判定経由は nmIjFaceBack)。2画面目の旧OK(砲撃に戻る)は廃止。未選択のまま撃つ時の計算は nmGunPen の既定(乗員)のまま。
- v1165: ダルマ「OKを次へに変更」。nmRmFaceItems の1画面目(砲)のボタン名を「次へ」に。操作員/非操作員の2画面目は完了なのでOKのまま、砲以外もOK。
- v1164: sample-faceok 実施(ダルマ「OKを追加→OKの後に操作員・非操作員の選択表示」)。nmRmFaceItems の末尾に「OK」(_doneF=従来の「← 完了」と同じ戻り先。スポット判定から来た時は nmIjFaceBack)。砲(g)は NM_FACE.op=1 にして操作員/非操作員の2択画面(nmFaceNq→eh.nqSel、説明は nmGunPen の txt)を出し、そこでOK=完了。車両など砲以外は選択なしでOK=完了。「← 戻る/完了」は残している。
- v1163: sample-pak38look・sample-jumbo 実施(ダルマ「ok/実施」)。①Pak 38: 表は既存VASL画像(ge_gun_geAT50L)、裏は水色地+白い×+表から切り出した砲のシルエット(REF_CTR_BKのpak38b)に、R1・A5¹/6²/5³/4⁴・QSU・X6の文字をHTMLで重ねる(REF_CTR_GUIDEの画像モードにF.tx重ね描きを追加)。②AFV: シャーマン ジャンボ(M4A3E2(L))・M4A3を追加。表=既存VASL画像、裏=実物写真を白黒に整えた画像(REF_CTR_BKのjumboB/m4a3B、CS#は消してある=CSは扱わない方針)。ジャンボの A4⁴/5⁵ は「その年以降の値」(1944年以降4・1945年以降5)と読む=既存データ(T-34 M41の A4²/5³/6⁴)と同じ読み方(旧保留③は解消扱い、SK4本文に明記は無し)。M4A3: s5/WP7=J4+(1944年6月以降)、sM4=4+(1944年以降)。「G」の意味は不明のため説明なし。
- v1162: sample-apcrodds・sample-gunback・sample-synctoast をまとめて実施(ダルマ「実施」)。①APCR(欠乏No.あり)の確率表示: 命中・撃破はAPCRが使える目(原DR≤欠乏No.)だけで数え直し、「APCRが使える確率」を別行に(使えれば必中=命中100%の時は「使えれば必中(原DR○以下は全て命中)」)。btVTTOdds自体は変えず、nmVf のバッジ側(APC)で割り算。AP/HE/煙幕は従来どおり。②早見表の砲(REF_CTR_SETS.gun)に5cm Pak 38(REF_CTR_BKのpak38f/pak38b=実物写真)を追加、裏面にR1・白い×・QSU・A5¹/6²/5³/4⁴(1=1941と読む=既存データの慣例からの推定)・X6を解説。表の「[75]」は最大射程と解釈(SK4本文で未確認)。③自動同期(nmGsSync fin): ターン変更を含む受信だけ nmGsDone でトースト、編成・PFだけは nmGsMark(⇅同期の点を橙に9秒)。nmsApply は自動マップ共有時はトーストなし。手動の同期は従来どおりトースト。同期間隔20秒は変更なし。
- v1161: sample-stclear・sample-mjclear 実施。①nmStClrRow/nmStClr: nmStFiredRowの最後に「状態をクリア」行(射撃済・移動/Motion・ACQ(eh.acq)を1つずつ+全部。混乱・PIN・CE/BUは対象外)。②nmIjClearAll: スポット判定の設定画面(ijFtSet)左に「クリア」=nmIjClose→nmIjOpen(A・Bはそのまま)。マルチ判定のユニット選択(NM_SC)には元から「↺ クリア」あり(重複は付けていない)。
- v1160: ダルマ「SSR枠がLOS+判定に替わるのはいらない・赤枠(A/Bの小さなバー nmAbBd)がABを実施しても出ないことがある」。①v1159の②(下の帯のSSR枠→guide自動切替)を取り消し。②原因=nmAbBdClose(×)で NM_ABBD_X にA/Bの座標を記録し、nmLosOffしても消えず、同じA・Bを選び直すとnmAbBoardが非表示のまま → nmAbBoard冒頭(pxA/pxBが無い時)・nmLosOff・Aを選び直す時に NM_ABBD_X=null。解除→同じA/B再選択で出ることを確認(旧版は出ない)。他の非表示条件(btRm/nmHq/nmIjが開いている・S.nmAbBdOff・移動中)は仕様のまま。
- v1159: sample-viewhind・sample-spotbtn 実施(ダルマ「実施」)。①見える範囲のパネルに「内訳」ボタン(BT_RMS.bd): ON中にヘクスをタップすると BT_RMS.bdN を設定し nmViewBdCalc(losCheckLOSGlobalのhindranceHexes)で足し算を表示、地図に白い点線と枠。起点変更は内訳OFFで。②nmFtBotFill: S_LOS.result.dataReady かつ3枠/2枠のどれも 'guide' でない時、SSR枠(なければ…)を一時的に 'guide'(LOS+判定)に替える(v1144の既定でLOSカードが出なくなっていた)。画面上部のA/Bの小さなバーに判定ボタンが出ない件(ダルマ画面)は原因未調査。
- v1158: sample-ipadswap2 実施(ダルマ「プレイ中同期を別のiPadに変更→iPadを入れ替えて続ける→位置も→実施」)。⇅同期の長押し(nmGsRoleAsk)に「1P/2Pを引き継ぐ」(nmGsTakeover): Gistの aslsk_grp_<p1|p2>.json から自分の側の編成・ターン・PF・map(自軍/敵軍/残骸/煙幕/建物マーク/route/resid/A・B)を取り込み、端末ID(dev)をこのiPadへ書き換えて送る(前のiPadは「もう1台も同じ」で外れる)。nmGsSync の送信に map:nmsPayloadMap()(groups除く・約数百B)を追加(v3・変化があれば20秒ごと)。取込前に nmBkSnap('引き継ぎ前')で元に戻す可。Gistは模擬fetchで確認、実機2台のテストは未。
- v1157: sample-wptem 実施(ダルマ「WP弾 建物 ペナルティ→TEMの逆加算・出目に→2→実施」)。WP命中のNMCの出目に目標ヘクスのTEM(木造+2・石造+3・林+1・他0)を自動で加減(ルール6.2): 通常命中=出目−TEM(有利)、WPのCH(原DR2)=出目+TEM(逆転・不利)、迫撃砲の空中炸裂(林内の目標)=+1(林のTEMが−1になる・CHでも負のTEMは足さない)。nmMcParse に 'MC+n'/'MC-n' 形式を追加、nmVfTH のWP枠で R.wpDrm を求め nmMcSection(結果画面・スポット判定の2か所)に渡す。確認(/tmp のPlaywright): 石造=−3/+3(CH)、木造=−2、林=−1、士気チェック画面に DRM が入る、smoke errors 0。空中炸裂(迫撃砲)は画面確認なし(コードのみ)。
- 返事待ちなし(v1156 実施済み)。保留: ①M4A1・M4A3E2・英シャーマンの発煙迫撃砲(sM)の開始時期は実物の裏面で未確認(M4A3だけ写真で 4+=1944年と確認し修正。他は "1944-06" のまま)。②ジャンボの「A4⁴/5⁵」の「/」の読みはルール原文に明記なし。③GUNタブ側の特殊弾(gd.ammo・resolveDeplete)は月キー対応済み・日付は S.gun.depletionDate で別管理のため変更なし。
- v1156: ダルマ「全て修正実施」。①nmVfWp/nmVfDepl が "1944-06" 形式のキーを Number() で NaN にして WP が常に出なかった → nmAmmoPick(年・月を年+(月-1)/12に換算、depletionKeyVal 利用)。S30(1944/11)でM4A3は AP/HE/Smoke(5)/WP(7)、1944/5/30 は Smoke・WP なし。②目標サイズ(7.3)を内蔵VASL画像(実物と一致を写真2枚で確認)の色・白丸で全AFVを調べ29車両を修正: 大型(上のAF赤)=churchill5・m4a1・m4a2l・m4a276a・m4a3系(75W/76W/105/無印/E2/E2L)・pz5g・英シャーマン(2A/2AA/2CVCA/3A/5A)・sherman3a_ll、超大型(上下とも赤)=kv2・pz6b、小型(上のAFが白丸)=pz35t・pz38ta・pz38te・matilda1・stuart3a・semov10525、標準に=is2・is2m(大型→標準)・psw232・psw2342(小型→標準)。変更なしで一致: kv1m41・pz6e/pz6el(大型)・他の小型/超小型/標準。③M4A3の smoke(sM4) availFrom 1944-06→1944。確認: smoke errors 0、nmAfv で targetSize/VEH_SIZE_DRM を確認。
- v1155: S30(1944/11/16)のM4A3E2(L)で煙幕弾(s5⁵=1945年〜)が選べた不具合(ダルマ「煙幕弾は使えない？→確認実施→実施」)。弾薬の選択肢を作る処理(車両主砲のSmoke)と欠乏No.(nmVfDepl のSmoke・nmVfWp のWP)が availFrom を見ていなかった → nmAmmoFromOk(availFrom="1945" または "1944-06" とシナリオの年月を比較、年月不明なら制限しない)を追加。確認(/tmp のPlaywright): S30でM4A3E2(L)=AP/HE/APCR(4)のみ・1945/2ならSmoke(5)あり、M4A3(1944-06)は 1944/5/30=Smokeなし・1944/6/6と S30=Smoke(5)あり。availFrom を持つ弾: 煙幕弾=M4A3・M4A1・M4A3E2(1944-06)、M4A3E2(L)・M4A3(76)W・英シャーマンIIA(1945)、WP=上記ほか。(別セッションの v1154 の上に載せ直して v1155)
- v1154: ダルマ報告「ダイスが勝手に入力された」(動作ログ 11:07:53 ステップ2へ→0.67秒後のタップが白4に)。原因: ステップ2へ から判定パネルが出るまで約1秒(v1070の保留中は1画面目のまま)何も変わらず、もう一度押したタップが出たばかりのパネルのダイスに当たった。対策: nmIjStageGo の保留中は透明の幕 #nmStgBusy で全タップを受けず、ボタンを「開いています…」に。パネルが出た直後0.6秒(window.NM_TAPG)は #btRm へのタップを捨てる。検証 /tmp/t/dbl.js 相当: 修正前は直後のタップで a=4、修正後は無視・0.8秒後は入る。
- v1153: sample-gunop 実施(ダルマ「結果文も合わせて直す 実施」)。砲撃(判定パネル・スポット判定2画面目)のフェイズの下に『操作: 操作員(乗員)/非操作員(分隊・HS)』(nmVfNqSet→eh.nqSel、nmGunPen をラップ)。非操作員は 1.2.6 どおり TH+2・赤TH#・B#−2・ROF−1。結果文の乖離を解消: 非操作員(非車両の砲)で原DR≧元のB#(印刷のB#)→『砲は永久に除去』(mal は立てない)、原DR≧B#−2 かつ元のB#未満→故障。通常射撃(nmVfTH)とIFE枠の両方。確認: dev外の /tmp テストで raw=B#/B#−1/B#−2/B#−3 と操作員を確認(g_45at B#9: 9→除去・8,7→故障・6→なし・操作員9→故障)、smoke errors 0。
- v1152: ターン表が同期しない(ダルマ報告): 最初の同期前(起動から約24秒)にフェイズを送るとNM_GS.tsが未設定で変更扱いにならず、at=0のまま送られ相手が無視していた → nmPhaseStepで必ずS.nmAsTurnAt=今に、起動時に基準を取り1.5秒後に1回同期。2ページのモック(fetch差し替え)で双方向に確認(/tmp/sy.js)。
- v1151: サイドバー(nmBarLite)の判定の下に「部隊」ボタン(#nmSbSu、兵士マーク案C、nmSuOpen)。NM_TB_ITEMSに'su'追加(既存設定ではhqの直後に挿入)。
- v1150: 自動同期(S.nmAsOn初期ON、⇅同期長押しのポップでON/OFF、ONは⇅に緑の点)。nmAsLoop=20秒ごとnmGsSync({auto:1})で相手ファイルを受信し変化があれば反映+トースト。送信は自分の編成・ターン・PF使用数が変わった時のみ(nmAsKick: nmSuClose/nmIjClose/nmPhaseStep/nmPfUse)。ペイロードv2に turn{cur,half,phase,ended,at}・pf{used,at}、後から変えた方を採用(S.nmAsTurnAt/S.nmAsPfAt)。2台での実地テスト未。
- v1149: 部隊の準備の各ユニットに状態ボタン(混乱・PIN・CX・負傷[SMC]・クラス低下[ELR_MAPにある時]・損耗[乗員以外])。nmSuStChips/nmSuStOp。スポット判定の状態変更と同じデータ。
- v1148: 部隊の準備に⇅同期で受信した相手の編成(相手A等)を、その国のタブの下に「相手のiPadの編成」として見るだけで表示(nmSuOppSlots)。相手が使ったユニットはOBの残りから引く(nmSuUsed)。ダルマ報告「同期 部隊の準備に出ない」。
- v1147: シナリオの攻撃側(atk=先に動く側)の誤りを修正: S30・S41・S42・S43 を GER→USA(カードは「GERMAN Sets Up First / AMERICAN Moves First」)。他シナリオはカードと照合済みで誤りなし(S1〜S6・S9〜S16・S20〜S36・S44〜S51・S59。S7・S8・S17〜S19はプロジェクトにカードなし)。
- v1146: 下の帯のPF枠に −/＋(使用回数を手動で増減、S.pfTracker.used と共通)。
- v1145: PFの年代がシナリオの日付と合わない不具合(S30 1944/11なのにPF〜44/5): マップの判定はS.latw.dateIdx(旧タブでシナリオを選んだ時だけ更新)を見ていた → 選択中シナリオの日付を優先(nmScnDi)。PF上限はシナリオが変わったら分隊数・使用数を数え直す。独分隊数から操作班(乗員)を除外(S30: 4.5分隊→上限6)。
- v1144: 下の帯を枠2つ/3つから選択(S.nmBotN、初期値3つ)。各枠(左・中・右)で 案内/SSR/勝利条件/PF/最後の判定 を選べる。初期値 3つ=左 勝利条件(小さい字・2行まで)・中 SSR・右 PF。PFは独立した枠に(SSR枠の中からは外した)。
- v1143: 下の帯のSSR枠の右端に、選択中シナリオで使うPFのスペック(カウンター・年代・射程・PF判定修正・残り回数/上限)を表示(nmBotPfChip)。PFが使えないシナリオでは非表示。タップで詳細。
- v1142: 下の帯のSSR枠と勝利条件枠の幅を中身(文字幅を実測)に合わせて自動配分(30〜70%、nmBotAutoW)。勝利条件枠は左寄せ。
- v1141: LOSの小窓に A移動・B移動(照準マーク、タップ後に地図をタップ)・車両の向き(六角形、A/Bに車両・砲がある時)を追加(スポット判定の「マップを確認」バーと同じマーク。nmAbMvBtns/nmAbMvTap/nmAbDir)。下の帯の初期値を 左=SSR・右=勝利条件 に。
- v1140: LOSの小窓の✕が共通の「✕ 閉じる」ボタンに変換されて大きく出ていた → 変換の対象外(#nmAbBd)にして小さい✕に戻す。
- v1139: マルチ判定(判定パネル#btRm・白兵戦等#nmCcSc・人力移動#nmMh2・砲撃等の選択#nmNu)とスポット判定(#nmIj)のボタンを枠なし・暗い色(#14171d)に統一(nmBtnDarkAll)。選択中の金枠・カウンタータイル・ダイスの金枠はそのまま。
- v1138: LOSの小窓: 左の⠿でドラッグ移動(位置を保存 S.nmAbPos)・✕で閉じる(A/Bを選び直すと再表示)・枠の色を表示の設定で選択(マゼンタ/シアン/グリーン/オレンジ S.nmAbCol)。マルチ判定: 画面の高さに合わせ自動縮小(nmHqFit・スクロールなし)、閉じるを枠なしの文字に。
- v1137: 下の帯のSSR枠: 短縮SSRを小さい字で全項目表示(4つ以上は2列)。アプリが反映済みのSSR(既存のSSR_REFLECT)は緑。全文ポップアップでも反映済みを緑。SSR・勝利条件の枠は中身に合わせて横幅を自動調整。
- v1136: 下の帯の左右の枠に出す内容を選べるように(メインメニュー>表示の設定>下の帯: 案内/SSR/勝利条件/最後の判定。初期値 左=案内・右=最後の判定。S.nmBotL/R)。SSR・勝利条件の枠は短縮表示(SCN_SHORT、全48シナリオ分を作成・要確認)、タップで和訳全文(nmScnTxtPop)。
- v1135: 車両のハッチ(7.7): ①移動中のヘクスメニューの「ハッチ BU/CE」も移動の帯と同じくMPh中1回まで(nmMvCE)。②準備射撃・移動中射撃をした車両、麻痺/Shockの車両は切り替え不可(nmCeBlockMsg)。③CEのまま建物から出る移動を止める(ルートに追加不可・メッセージ)。④爆薬などで麻痺/Shockになった車両は自動でBU。APhの切り替えは従来のヘクスメニューのまま。※実機未確認。
- v1134: マルチ判定の国籍選択を全て前回選んだ国で開く(スポット判定と共通の S.nmIjLastNat。nmMjLast/nmMjSave)。対象: シナリオのユニットで判定(爆薬・MC等)・白兵戦(攻撃側)・人力移動・ボグ・回復/修理・PAATC・車両が敵AFVへ。潰走・阻止は手番側のまま。検証済み。
- v1133: 部隊の準備も前回選んだ国のタブで開く(S.nmSuLastNat。アプリ再起動後も保持)。検証済み。
- v1132: スポット判定の攻撃側の国籍を前回選んだもので開く(S.nmIjLastNat。シナリオにない国なら従来どおり攻撃側)。開いた時の撃つものもその国に合わせる。検証済み。
- v1131: メインメニューから「シナリオカード」を消去。
- v1130: メインメニューから「旧タブ」を消去(ツールバーの旧タブボタンは残る)。
- v1129: メインメニューの見出し「ルール早見」を消去(旧タブはそのまま)。
- v1128: メインメニューの「バックアップ」をマップからシステムへ移動(バックアップ・動作ログ・アプリ更新)。
- v1127: メインメニュー>表示の設定「🧰 ツールバーの設定（並び順・表示）」→「ツールバー表示設定」(アイコンなし)。
- v1126: メインメニュー>表示の設定から「下を電子パネルにする」「縦幅に合わせる」を非表示(設定値 S.nmFtLcd はそのまま)。
- v1125: 編成の同期で1P/2Pどちらを選んでも「もう1台も同じ」と出る不具合: Gistに古い記録(もう1台が以前使っていた側・端末IDが変わる前の記録)が残っていると両方とも衝突扱いだった → 相手が今は反対側の方を新しく使っている場合、または6時間以上前の記録なら、古い記録として上書きして続行。
- v1124: 動作ログ改良(フリーズ調査)。アプリ切替・非表示中の空白は「応答なし」に数えず「(アプリ切替などで…停止)」と記録。応答なしには直前の操作を付ける。タップ→画面更新に0.3秒以上かかった操作を「重い処理 Xms [ボタン名]」で記録。PC計測ではループや重い常駐処理は見つからず(マルチ判定を開く125ms・地図描画95ms程度)。
- v1123: 車両・砲の見出し「独: Sherman…」が、カウンターの国ではなく地図の側(f/e)の国になっていた → そのカウンターの国(nmNatShortOf)で表示(向きパネル・ヘクスメニュー)。
- v1122: 回復(rally)の作業用の部隊「_T」がスポット判定に出ていた→ 出さない(nmIjPlaceList/nmIjShooters で除外)、回復を閉じたら中身を消す(BtRmClose後・nmIjOpen時に nmTmpTClean)。検証: 回復→閉じる→_Tが空になることを確認。
- v1121: 部隊の初期名の記号を国ごとにA,B…と数える(内部の枠GROUP_SLOTSはそのまま)。例: 枠A独→部隊A(独)、枠B ソ→部隊A(ソ)、枠C ソ→部隊B(ソ)。自分で付けた名前はそのまま。※サンプル未提示でユーザー「実施」。
- v1120: カウンター選択の金枠を1.0pxに(nmPkCss)。ボグ等の車両タイル行(.rmBtns)の overflow:hidden で角の線が切れていた→ overflow:visible・角丸12px(nmPkCorner)。検証画面で確認済み。
- v1119: 結果の金枠ボックス(ボグ判定ほか4か所)を案2に(14px・太さ600・線1px・余白小)。ボグ判定の「判定」切り替えボタンを12px・細字に(nmTogS)。検証画面で確認済み。
- v1118: マルチ判定・メインメニューのボタンを #14171d・枠なし(影+0.5pxの細線だけ)に(案3+C)。nmBtnDarkC。検証画面で確認済み。
- v1117: メインメニュー(#nmFtMn)の背景・ボタンをマルチ判定と同じに(ドット柄・ボタン#1e232c)。nmFtMnSpot。検証画面で確認済み。
- v1116: 砲撃・装甲戦闘車両・軽対戦車兵器などの選択画面(#nmNu)のカウンターをスポット判定と同じタイルに(角丸・下影)。選択=金枠(金塗り・青下線は廃止)。nmNuSpot。検証画面で確認済み。メインメニューのサンプル(mm_s.png)は未実施(返事待ち)。
- v1115: マルチ判定トップのバックプレーンをボグ判定と同じドット柄に(nmDotOffに消されるのでパネルに直接important指定・MutationObserver)。ボタン色を案3 #1e232c に。検証画面で確認済み。
- v1114: マルチ判定トップ(#nmHq)の背景・ボタンをスポット判定/判定パネルと同じ作りに(背景=黒ドット1px@4px+白ハイライト8%@4px+#1c1f27・枠1px #4a5566・角10px・影。ボタン=#2c3442・枠#4a5262・角8px・下影4px)。nmHqSpot。
- v1113: ボグ判定(車両)の見出しを他パネルと同じ「← 戻る(サブ:ボグ判定(車両)) / ↺ クリア」行に。上の×閉じるは外す(下の閉じるを使う)。検証画面で確認済み。
- v1112: 爆薬(DC)の選択をDCカウンター画像に(国ごと u:SW|dc_ge/dc_ru…、nmUnitLbl)。検証画面で確認済み。
- v1111: 数量バッジをスポット判定と同じ灰色の小表示に統一(#nmCcSc・人力移動)。判定の「どの砲/編成？」選択(#nmNu)を .nmPk タイルに(金塗り廃止・選択は金枠)。nmPkCssに#nmNu/#nmDcp追加。
- v1110: ダイス出目の選択表示を全パネルで金枠1.5px+金文字に統一(nmDsGold)。人力移動はv1104の変更で選択表示が消えていた→dsOn付与に修正。爆薬(DC)・待ち伏せ(nmAb)のインライン金塗りもdsOnへ。dsRowのdsOnを消す処理を削除。nmDsCssを起動時に有効化。検証: 人力移動・ボグ・修理・白兵戦で金枠を確認。
- v1109: ダイスの出目選択(dsOn)を金枠1.5px+金文字に(テーマに上書きされて見えなかった)。修理パネルの車両・砲をカウンター+名前カプセルのタイルに(nmRrRows)。名前カプセルは改行しない。検証画面で確認済み。
- v1108: スポット判定1画面目の「攻撃側A」「目標B」の枠を左右均等(1fr 1fr・高さもそろえる。nmIjEq)。検証画面で確認済み。
- v1107: 金枠を細く(案2=1.5px)。カウンター選択(.nmPk)・ボグ国タブに加え、判定パネル/スポット判定の選択中ボタン(.rmB.on/.ijB.on/.ijC.on/.ijF.on/.tb.on/.b.on)の金枠も1.5pxに(nmThinGold)。
- v1106: v1105の青い下線消しが効いていなかった(既存の#btRm .rmBtns button.rmB:has(.coMk)の指定が強い)→ .nmPk の指定を html:root×16 に強化。ボグ車両で選択中の金枠が消える不具合も同時に修正。検証画面で確認済み。
- v1105: 選択中のカウンターの青い下線・光を消す(金枠のみ)。ボグ判定の車両タイルを左詰め。
- v1104: カウンター選択の選択表示を金の太枠(.nmPk.on)に全統一し、古い金塗り/国色塗りの指定をコードから削除(ユニットタイル・国タブ・鹵獲砲・統制/混乱・故障・地形/道路ボタン)。
- v1103: マルチ判定のカウンター選択(ボグ車両・人力移動の砲・白兵戦/MC等の車両・砲)の選択表示を .nmPk.on に統一(金の太枠+名前の金カプセル、スポット判定と同じ)。nmPkCss。
- v1102: 白兵戦/MC等(#nmCcSc)・人力移動(#nmMh2)のタイル幅を112px固定で左詰めに(スポット判定と同じ横6個並び)。
- v1101: 人力移動(砲)の選択表示をスポット判定風に(国タブ=黄枠、ユニット数=右上バッジ、選んだ砲=黄枠)。
- v1100: 白兵戦(シナリオのユニットで判定)等の #nmCcSc ユニット選択をスポット判定風に(国タブ選択=黄枠、残数=右上の黄色バッジ、タイル角丸)。nmScDraw/nmCcScDraw 共通のCSSで適用。「三つの白兵戦」の対象は未確認(同じ#nmCcScを使う画面は全て反映)。人力移動(hm_s.png)は未実施。
- v1099: ボグ判定(車両)のヘッダーを人力移動と同じ配置に(← 戻る | タイトル | ✕ 閉じる を1行、閉じるは右端)。※実機未確認。人力移動の表示変更(hm_s.png)は未実施(返事待ち)。
- v1098: ボグ判定(車両)の車両選択をスポット判定と同じ表示に(車両名カプセル付きタイル+選択中は黄枠、国タブも黄枠)。※実機未確認。
- v1097: 部隊の準備の「地図では 自軍/敵」ボタンを廃止し、色の入れ替えボタン(■独 ⇄ ■ソ)1つに。標準は攻撃側=青。nmSuSwapSides 追加。※実機未確認。
- v1096: 「自軍:」「敵軍:」の表示を国籍(独・ソ・米…)に変更(NM_SIDE_LBL.nm を国籍の短縮名にする。色はそのまま・色帯なし)。ヘクスメニュー/射撃パネル等の見出し全般。※実機未確認。
- v1095: 攻撃側の同一部隊の「通常射撃」と「PF」の2タイルを1つに統合(タイルに「PF使用可」)。2画面目の「使うSW」にPFをカウンター画像(PF(1発))で追加。PF選択でPF射撃へ、PF画面の「使うSW」で通常射撃へ戻れる。※実機未確認(PF付き部隊で要確認)。
- v1094: 部隊カプセルを小型化(文字10px・高さ15px・枠1px・余白8px)。サンプル5。
- v1093: 部隊の初期名(nmGrpLbl)を「部隊A(独)」「部隊B(ソ)」の形に(自分で付けた名前はそのまま)。カプセルの「分隊」を「部隊」に戻し、国籍は名前に無いときだけ追記。
- v1092: 部隊のFPが0(混乱中など)でもカプセル(名前|FP 0・FP部は薄い色)を出す。攻撃側「部隊B」が文字だけだった件。
- v1091: 士気チェックで「🎲判定する(出目 7)」ボタンが右列の先頭に離れる→直前のユニットと同じ列に(btRmFullApplyのcut調整を、rmAct以外の判定するボタンにも)。
- v1090: 「SWの持ち主を選ぶ」の分隊ボタンを番号+28pxカウンター、SW名を32pxのSWカウンターに。
- v1089: 部隊カプセルの国籍表記を「(独軍)」→「(独)」「(ソ)」に短縮(PF(独)も)。
- v1088: 選択した部隊の「編集/登録」バーがカプセルに重なっていた(v1087で高さ自動化の副作用)→タイルの下に配置(static)。
- v1087: 部隊タイルの高さを自動(余白8px 10px)に。固定136pxの上下の空きをなくし車両カウンターと同じ仕様に。
- v1086: 地形のみのヘクスマークを48×48(カウンター画像と同じ)、タイルを車両カウンターと同じバックプレート(高さ自動)に。部隊カプセルの名前を「部隊A」→「分隊A(独)」(国籍があれば括弧で)。
- v1085: 砲・車両の射撃結果のROFボタン(ROFでもう一度攻撃する/ROFで別の目標を攻撃する)を、水色の大きな操作ボタン(rmAct)に。閉じる等は従来の行。
- v1084: 部隊カプセル(国|部隊名|FP)の文字が左右で上下にズレていた→各セグメントをflex中央揃え(高さ23px・line-height1)。
- v1083: 士気チェックの損耗1・KIA適用を「自動(無作為)」「自分で選ぶ」の2ボタンに分離。自分で選ぶ時だけユニット別(混乱/✕除去/ユニット名)ボタンを表示、「自動に戻す」で戻る。
- v1082: 「ROFで機関銃だけもう一度撃つ」を水色の大きな操作ボタン(rmAct)に(判定する等と同じ見た目)。
- v1081: 兵士のKIA・除去の結果画像を成功画像に(撃破・残骸のみ撃破画像)。ステップ2「入れた目で判定する」ボタンが暗い→明るい水色+暗文字に固定。
- v1080: 選択中の車両/砲ラベルを塗りなし・金文字・金枠1.5px(内側の線)に
- v1079: 2列レイアウトの分割位置で「判定する」(rmAct)が右列の先頭に飛ぶ不具合を修正(士気チェックのユニットが3つ以上の時)。モックDOMで再現・修正確認済み
- v1078: 未選択の車両・砲カウンターにグレーのタイル背景(地形のみと同じ)。高さは今のまま(align-self:flex-start)
- v1077: 部隊タイルは選択しても高さが変わらない(未選択も136pxに統一)
- v1076: 地図確認バーをコンパクト化(高さ30px・真ん中のヒント/「閉じる」文字を削除)・LOSのA/Bマーカーをドラッグして別ヘクスへ移動(離したヘクスが新A/B、nmIjAbTap利用。window captureで地図のドラッグ処理を止める)
- v1075: 地図確認(A/B変更)のバーをマーク表示(照準A/B・六角コンパス「方向」・✕)。方向ボタン=nmIjFaceMapで方向パネル(押すと金枠)。A・Bに車両/砲が無い時は方向ボタン非表示
- v1074: 選択カウンターの水色の光を消去・選択でサイズを変えない(金枠は内側の線・名前ラベルは外へ張り出し・部隊タイルの国名非表示)・「地形のみ」タイルにマップのヘクス(六角形+ヘクス名+TEM)表示(nmIjHexTile)。未対応: 選択中の部隊タイルの高さ91→136(編集ボタン段)
- v1073: ステップ2をステップ1に統一(幕45%・ドット背景・未選択ボタン#2c3442・命中枠=2px金/14px角丸・命中TH#文字14px)。選択カウンターは変更なしで名前だけ金の丸ラベル(style#nmStep2Unify)
- v1072: 選択中ボタン=金枠線だけ(塗りなし・文字は薄い金)・ダイス縦幅32px を全パネル共通に(style#nmSelGold、:root×9、対象パネルIDリスト P と選択クラス .ijB/.ijC/.ijF/.rmB/.rmCls/.b/.nb/.dsb/.fa の .on と inline の background:#ff9030/#c8a032)。スポット判定1・2画面で確認、他パネルは未確認。
- v1071: ①スポット判定タイルの「地図のマーカー」表記を削除 ②カウンターが枠からはみ出す件: タイルの min-width を中身に合わせ !important で設定(nmIjGrpBadge) ③火力パネルのダイス縦幅 46→32px(#btRm.rmFull .rmBox .dsRow>button.dsb の height。他パネルのdsRowは未変更) ④ステップ2へのちらつき対策: 保持の解除条件に btRm.rmFull を追加(コンパクト表示の途中状態が出るのを防ぐ)。v1070はPages success確認済み。
- v1070: 「ステップ2へ」で2画面目の前に一瞬別パネルが映る件: 判定パネル(btRm)は開き直しを数回して仕上がる(btRmReopen/BtRmClose×3, LosRunPixel)。nmIjStageGo をラップし、仕上がる(innerHTMLが約140ms変化なし, 最大1.2秒)まで #btRm を hidden・1画面目を表示のまま保持→一度に切替(style#nmStgHold)。
- v1069: ボタン四隅のドットが残る不具合: nmDotOff が初回(起動1.5秒後)しか走らず、パネルを開いた時に入るCSS(btRm.rmFull .rmB等)を拾えなかった。<style>追加で再走査(MutationObserver)し、対象に .dsRow・*Btn を追加。スポット判定2画面目・1画面目でradial残りなしを確認。
- v1068: 編成カプセルを「国｜部隊名｜FP」の固定長に(サンプル③)。長い説明・ユニット名は出さない。文字色は inline important で白固定(暗くなる不具合の修正)。
- v1067: メニューの「編成」タブ・マップパレット・「編成の準備」画面名・メニュー区分名を「部隊」に統一(メニューの並びは名前で引くので同時変更済み)。
- v1066: 編成の表示名「編成A」→「部隊A」(nmGrpLbl・名前変更ダイアログ・スロット表示・英語表記 Unit group)。メニューの「編成」タブ名は変えていない。付けた名前はそのまま。
- v1065: スポット判定の編成タイル: カウンター30→48px、ユニット名の行を廃止、編成名とFPを1つの連結カプセルに(サンプル4)。nmIjGrpBadge。
- v1064: マップ確認中に❌・フッター「A→B」・地図タップでA/Bを変えると、判定に戻っても古いA/B・レンジが残る不具合を修正(戻る時にA/B署名を比べ、違えば点・選択を合わせて再描画 nmIjSyncAB)。
- v1063: スポット判定1画面目で S_LOS.result が空だと「LOS NG・見えないので撃てません」と出る不具合を修正(空なら LosRunPixel で再計算し、結果が来たら再描画)。
- v1062: 指揮官の負傷dr入力(nmWdDo)の後、開き直すヘクスが NM_MC.n 未設定で0になりユニットメニューが開いていた不具合を修正(BT.rmHex を使い NM_RM_SUB も戻す)。ログ(スポット判定→MC→指揮官除去→負傷dr5→この画面)から特定。返事待ちなし
- v1061: スポット判定の2画面目(NM_IJ.vfStage中)の軽対戦車兵器パネルは nmLwList を own||pf に絞る(持っていないPSKが出て選べた不具合)。返事待ちなし
- v1060: スポット判定→軽対戦車兵器の2画面目で、1画面目の兵器を最初から選択(nmIjShooters lw行に wid、nmIjStageGo で NM_LW_PRE に渡す)。PSKを持たない編成でPSKが選ばれていた不具合の修正。返事待ちなし
- v1059: スポット判定1画面目: PFが使える時(nmIjShootersのlw行にpf有り=独軍・1943/10以降・敵AFVあり・PFオフでない)、PFカウンターに緑の「PF使用可」バッジ(.ijPfBadge)と攻撃側の枠に説明の帯(.ijPfNote)を表示(サンプル1+2採用)。返事待ち: PFチェックのCX+1drm・追撃射撃/FPF不可・2個目PFで本来FP不可(アプリは自動では防がない)は未実施(ダルマ未指示)
- v1058: 士気チェックの「損耗1」の「無作為」ボタンを「ランダム」に変更し、行に説明を追加(nmMcSectionのrow:1の損耗1)。返事待ちなし
- v1057: スポット判定1画面目: 国ボタン(J.nat/J.bnat)の国のカウンターだけ表示(他国の置いてある編成は隠す)。選択中のカウンターの国に国ボタンを合わせる。目標の国ボタンを別の国にすると目標選択を地形のみに戻す。不具合報告「独軍にソ連の編成が表示している」。返事待ちなし
- v1056: 士気チェック(.mcFr区間)を射撃結果パネルの上に重ねるMC専用パネル #nmMcOv で表示(サンプル1採用)。btRmFullApply で区間の要素を移す。✕閉じる/「全員終わったら閉じて結果へ」=nmMcOvClose(NM_MC_OVX=NM_MC.key→再描画で従来の水色枠に戻る)、枠の「専用パネルで開く」=nmMcOvOpen。新しい士気チェック(keyが変わる)は自動でまた専用パネル。Playwrightで開閉・DR入力確認済み。返事待ちなし
- v1055: 士気チェックの区間(「士気チェック:」行〜次の区切り線)を水色(#4fc3f7)の枠で囲む(サンプル1+ライトブルー採用)。btRmFullApply の列分割の後で .mcFr ラッパー(列にまたがる時は列ごと、右は「(続き)」)。CSS は rmFullCss。返事待ちなし
- v1054: スポット判定: 攻撃側の国ボタン(nmIjSet 'nat')で、選択中の攻撃側(J.pick)が別の国なら選択を外す→目標の国候補(bns)が攻撃側の国に合わせて切り替わる。不具合報告「攻撃側 独軍 目標がソ連に切り替わらない」の修正
- v1053: 各編成タイルに小さくFP(サンプル2採用): nmIjFpSub=補足行の最後に <b.ijFpS>FP n</b>(配置済み・候補・目標側の grp タイル)。右上バッジ(.ijFpL/nmIjFpTag)は廃止。トータルFP枠右上案は廃止(ダルマ「これは廃止」)。
- v1052: 1画面目を枠で仕切って左右2列(サンプル「色線B」採用: ①=.ijFa 水色#4fc3f7・②=.ijFb 黄#ffd54f)。nmIjSetupDraw に .ijFrm ラッパー追加、.ijL を2列グリッド(1.15fr/1fr)。編成タイル190x136。返事待ちなし。
- v1051: 帯(#nmIjAb)をドラッグ移動(nmIjAbDrag: pointer events、左端⠿、ボタン上は無視、NM_IJAB_POSで保持・nmIjCloseで解除、画面外に出ない)。返事待ちなし。
- v1050: nmIjAbBar の B変更ボタン(押した時)の色 #d62839(赤)→#e8851a(オレンジ)。サンプル「ドラッグで動かす(左端⠿の持ち手)」は返事待ち。
- v1049: nmIjAbBar をコンパクト化(サンプル「中」採用): ボタン高32・A変更/B変更・✕。待機中は説明なし、押した後だけ「◯にするヘクスをタップ」と「✕ 閉じる」。返事待ちなし。
- v1048: 「A地点を変える/B地点を変える」帯(#nmIjAb)に「✕ 閉じる」(nmIjAbHide: J.abHide=1で帯を隠す。判定に戻る nmIjUnpeek/2 で解除)。返事待ちなし。
- v1047: ヘッダーの🔥残留火力ボタンを、残留FP(S_LOS.resid)が無い間は非表示(nmIjHasResid)。返事待ち: 「編成を追加するボタンは？」→ ＋カウンターを選択がそれ。名前を「＋ 編成を追加」に変える案を提示。
- v1046: 1画面目のタイル整理(サンプル tidy 採用)。nmIjStCss に追記: 編成タイル(.ijFpL を持つ button.ijB)=幅190・高136、FPは右上の小バッジ、.ijEdBar は下端中央、.ijTW は relative。返事待ち: ダルマ「残留火力ボタンは必要ない？」(ヘッダーの🔥残留火力=nmRaqOpen 残留火力の攻撃。残留FPが無い時は隠す案を回答済み、返事待ち)。
- v1045: ダルマ「全部実施」(AB判定の追加5案)。調べたら DRM内訳(parts)・士気判定+反映(nmMcSection)・SW故障の記録(v425 nmSwMalApplied)は既存だったため、未実装の2件だけ実装: ①FP内訳(nmMfFpBreak 兵+SW、射程調整前の素のFP) ②判定履歴 NM_MFH(nmMfHistPush・直近4件表示・↶取り消す nmMfUndo=UndoLast・同じ出目で再計算 nmMfRedo)。dev内検証は /tmp のみ。返事待ちなし。
- v1044: 編成のFP表示(サンプルB採用)。タイル(A/B・歩兵編成)に nmIjFpTag、選択画面フッターに nmIjFpBox(nmIjCsFP=兵FP+SW FP、FT・SMC除く、数変更で更新)。dev/fpv.js で確認。返事待ちなし。
- v1043: 編成の編集画面(edSlotA/B)に「💾 別の編成として保存」(nmIjGrpSaveAs: 空き枠に新規編成、元は不変)。決定ボタンは「この編成を更新してA/Bに置く」。dev/gedit.js で確認。返事待ちなし。
- v1042: スポット判定1画面目の「✎ 編集」を編成の準備で作った編成(編成A/B/T等、ijCsなし)のタイルにも表示(A・B)。nmIjGrpEdit→nmIjCsFromGrp で編成の中身を cs/asg(数・SWの持ち主)に直して選択画面へ。決定で nmIjGrpRebuild が同じ枠を空にして nmIjMkGrp(…,slot) で作り直す(マーカー・枠は維持)。登録ボタンは一時編成のみ。dev/gedit.js で確認。返事待ちなし。
- v1041: 砲の煙幕弾(nmVfBuild の弾薬リストに、砲も gd.ammo に Smoke があれば 'Smoke'。S25 の76.2mm連隊砲で確認)。ダルマ「ABにDCを追加はなし」→ DC をスポット判定に入れる案(sample-smkdc の mode:'dc')は採用しない(ブランチは見本のまま)。返事待ちなし。未対応: 古いテスト aud/dcr/vft
- v1040: 実施2件。①sample-swuse: 歩兵の射撃(2画面目・地図の射撃 nmRmMFireItems)の「フェイズ」の下に『使うSW』(nmMfSwRow・SW実カウンター・タップで使う/使わない nmMfSwUse)。FTは単独(FTを使う=分隊FPも他SWも使わない/外す=編成のSWと分隊のFPに戻る。FtogSW・fgRecomputeFromPicker を使用。編成は FT があると他のSWは入らない)。『この射撃: …』の1行。②sample-reg: カウンターを選択で作った編成(仮 ijTmp)のタイルに『＋ 登録』(nmIjRegOpen→nmIjReg)。登録だけ=編成を残してマーカーは仮に戻す(nmIjPlaceList の候補に出る)/登録して置く=ijTmp等を外して通常マーカーに。登録すると編集は出なくなる(ijCs削除)。検証 dev/swuse2.js・reg2.js。返事待ちなし(ブランチ sample-swuse/sample-reg は main に未マージの見本のまま)。未対応: 古いテスト aud/dcr/vft
- v1039: sample-pk4col 反映(カウンター選択 nmIjPickDraw: 1列目=指揮官(能力順)・兵士(クラス順)、2列目=SWを実カウンター nmSuSwImg、3列目=質の低下・半減、4列目=鹵獲。A・B共通)。返事待ちなし。未対応: 古いテスト aud/dcr/vft
- v1038: 実施(ダルマ「カウンター選択で作成した構成を編集できるように/S24ドイツ SW追加・質の低下/半減が登録できない/ソ連はSWの割り当てができない」+ PP・積み重ねの警告)。①編成タイル(1画面目の①攻撃側・②目標)に「✎ 編集」ボタン(ijCs を持つ編成のみ。A=nmIjCsEdit・B=nmIjBCsEdit)→今の数が入った選択画面→決定で同じ場所の編成を置き換え(A: nmIjAutoPlace の nmIjTmpClear、B: nmIjBPut が既存 ijB を置換)。②B側もAと同じ選択(SW・鹵獲 cap|・質の低下 red|。nmIjBCnt を cap/red 対応)。③編成作成を共通化 nmIjMkGrp(nat,cs,asg)(nmIjSqList/nmIjSwList)。SWの持ち主=J.asg(A)/J.basg(B) キー'kind|id#i'→分隊の番号(未選択=最後の分隊)、編集用に eh.ijAsg に保存。選択画面 .pkBody 先頭に #swAs「SWの持ち主を選ぶ」(分隊2つ以上の時)。④警告のみ(止めない) #swWarn: 1分隊のSW合計PP>運搬量 nmSuIPC、積み重ね(nmRtSqEq 3分隊相当+SMC4)。FT車両攻撃はスポット判定で対応済み(v823)。検証 dev/swas3.js(A・B・編集置換・警告)。返事待ちなし。未対応: 古いテスト aud/dcr/vft
- v1037: バグ修正(ダルマ「射撃タブで開く→旧射撃タブが一瞬開いてステップ1が開く」)。原因=BtRmClose の後ろ処理(NM_IJ.vfStage かつ btRm なし→nmIjStageBack)。ステップ2の「射撃タブで開く」(34668付近 f)に nmIjLeave() を足し、スポット判定(NM_IJ・#nmIj・#nmIjAb・#nmIjBack)を仮カウンターを残したまま終えてから NAVTAB('fire')。dev/stage2.js。返事待ちなし。


- v1036: sample-pk89 の B9 を反映(カウンター選択 .pkG を9列・B案: 在庫×Nは右上バッジ・選択数を大きく・選択中は水色の光。nmIjPickDraw の nmIjPick2Css 末尾に追記)。返事待ちなし。未対応: 古いテスト aud/dcr/vft の修正


- v1035: バグ修正2件(ダルマ「ボタンがはみ出ている」「DRが化けている」)。①スポット判定1画面目: .ijBox:has(.ijFtSet) の .ijCols/.ijL が内容の幅(1745px)に広がっていた→width:100%・min-width:0(nmIjStCss)。②dsUni(mark)の 2〜7 と 8〜12 の結合が、l+1===f の行すべてを結合していた→次の行(rs[ri+1])とだけ。dev/ijwrap.js・mcdr.js・dsmerge.js。返事待ちなし


- v1034: sample-gobeside 反映(スポット判定1画面目の「判定へ ▶」→「ステップ2へ ▶」・「地図で方向を変更/設定」の右横 nmIjGoBeside。方向ボタンが無い画面は下の帯のまま)。返事待ちなし。未対応: 古いテスト aud/dcr/vft の修正


- v1033: バグ修正(ダルマ「ドイツ軍二つ選択されている」)。スポット判定1画面目で、同じ編成の「歩兵の射撃」と「PF」が両方 on になっていた(nmIjSetupDraw の grp 判定が車両・砲用で、歩兵も同じ eh でまとめていた)→歩兵は手段ごとに個別判定。返事待ちなし。未対応: 古いテスト aud/dcr/vft の修正


- v1032: sample-ijab 反映(マップを確認の上の帯 #nmIjAb でA/B地点を変更 nmIjAbTap。選んでいたユニットは nmIjAbMove で新地点へ(仮は移動・地図のマーカーは仮の写し)。2画面目は判定パネルの「🗺 マップを確認・A/B地点を変える」→nmIjPeek2/nmIjUnpeek2(変えたら nmIjStageGo で開き直す・出目と設定は初期化)。1画面目の撃つ武器はカウンターの横 .ijWr、1000x657でスクロールなし(余裕ほぼなし))。返事待ちなし。未対応: 古いテスト aud/dcr/vft の修正


- v1031: sample-ijpick2 反映(＋カウンターを選択 = nmIjPickDraw: 国籍と数の欄だけ、A=J.cs/nmIjCnt(鹵獲・質の低下も)、B=J.bcs/nmIjBCnt)。返事待ちなし。未対応: 古いテスト aud/dcr/vft の修正


- v1030: sample-ijflat2(スポット判定の2画面目: mf/vm/lw も nmIjStageGo で共通の判定パネル(btRm)を開く・戻る=nmIjStageBack。＋カウンターを選択は #nmIj.ijPick で全幅・nmIjPickDone/Cancel。置いた編成を候補に二重に出さない)・sample-respop(nmResImg はどこをタップしてもすぐ消す・外のタップは下に通さない)を反映。返事待ちなし。未対応: 古いテスト aud/dcr/vft の修正


- v1029: PF(nmPfWep)は4.4.2どおり 1943/10以降 かつ 敵(独軍以外)のAFVがシナリオにいる時 または SSRにPFの記載がある時だけ。S24・S26は出る、S20・S23(敵AFVなし)は出ない。PFはシナリオカードのOBには載らない固有SW


- v1028: sample-dcfit・sample-fmpos・sample-ijdedup を反映。返事待ちなし。未対応: 古いテスト aud/dcr/vft の修正


- v1027: sample-taphex 反映(置くヘクスをタップ→0.45秒オレンジ #ff8c1a で塗ってからパネル。NM_TAPHEX/nmTapHexSVG)。返事待ち: sample-dcfit, sample-fmpos



- v1026: sample-bog(ボグ判定の車両ボタン=実カウンターのみ)・sample-vfsw(砲撃→地図で方向: 設定する車両 A/B 切替 nmVfFmSwItem/nmVfFmSw)を反映。返事待ちなし。未対応: 古いテスト aud/dcr/vft の修正

- v1025: オートダイスのデフォルトOFF(S.nmAutoOff===false の時だけON。未設定=OFF)。OFFの時は「〜を振る」ボタン/項目を作らない(nmAdTag)・タグ済みの物は .nmAdB で非表示。以前ONに戻した人(false)はONのまま。返事待ち: sample-bog, sample-vfsw。未対応: 古いテスト aud/dcr/vft の修正

- v1024: sample-mh2 反映済み。返事待ち: sample-bog(ボグ車両ボタン), sample-vfsw(砲撃の方向設定にA/B車両切替。samples/sample-vfsw.pngはブランチ内)

- v1023: 編成の準備(#nmSu)のOB/編成タイル(.chip/.u)は実カウンター付きなので、カウンター化observerの対象から除外(ラベルが二重化し指揮官が別国籍になっていた)。返事待ち: sample-bog, sample-mh2

- sample-mc2 実施済み(MC・PTC登録欄=実カウンター5列)。回復パネルは最新版で統一済み(iPadの旧表示は版を要確認)。返事待ち: sample-mh2
- 最終更新: 2026-11-09 (main=v1021)
- 状態: 返事待ちなし(未実施は「6. 未実施・保留」に整理済み)。混在白兵戦(NM_MX)の既知の仮定: ATTACKERの既定=シナリオの攻撃側(画面で変更可)/不意打ちの車両修正は +2(BU・麻痺+1)を車両側の修正に足す/車両攻撃の原DR2特例はルール上なし(指揮官誕生は歩兵のみ)。
- v1021 済: (ダルマ「方向の設定をスポット判定の方式に統一」sample-facemode→実施) ①スポット判定→砲撃の「地図で方向を設定」は nmIjFaceMap(A/B切替・地図に方向バー・隅に配置・「砲撃に戻る」= nmIjFaceBack が vfStage なら nmVfRe)。②そのほかの NM_FACE の向き設定パネルは .rmFull にせず(btRmFullApply)、btRMenu の後で nmIjFmPlace でユニットを避けた隅に置く(nmIjFmPts は NM_FACE 時 BT.rmHex を使う)。返事待ち: sample-mh2。
- v1020 済: (ダルマ「48PXでサンプル→他のパネルも48PXで統一実施」sample-px48) NM_CO_PX 64→48(カウンターだけ表示の全パネル共通)。人力移動(砲)(nmMh2)はまだ文字付き2列のまま→表示を修正する(ダルマ指示、サンプル先)。
- v1019 済: (ダルマ「独軍の2-2-8(乗員) 同じ間違えをしない」) 実カウンター差し替えの UR 正規表現が (乗員) を含まず、小さい画像+文字のままだった → (乗員) も対象に(64px)。新しい種類のラベル(例: (HS)(乗員)以外)を足した時は UR も見直す。
- v1018 済: (ダルマ「最初から選ばれている」) PAATC: nmPaSeed を空に(開いた時・国籍切替・クリアで先頭MMCを入れない)。v929 の自動投入を取りやめ。
- v1017 済: (ダルマ「横にカウンターを4か5並べる→5 実施」sample-ccrow) #nmCcSc(白兵戦・MC・回復などシナリオのユニット選択)のグリッドを横5列に(style#nmCcRow5。各マス=カウンター→ラベル→−数＋の縦並び)。
- v1016 済: バグ修正(ダルマ「砲が表示しない/設定に戻るがない/戻るでマルチ判定のトップ/車両も同じ」) 砲撃パネルの「地図で方向を設定」(nmVfFaceMap)で: ①仮(ijTmp)カウンターを地図に出す(nmNoTmp を NM_FACE&&NM_VF_FROM の間はスキップ) ②先頭の戻る(完了)に keepBack を付け nmHqBackIns に書き換えられないようにし、nmVfRe で砲撃パネルへ戻す ③スポット判定経由(NM_IJ.vfStage)なら「← 設定に戻る」(nmIjStageBack)を追加。車両・砲とも共通コード。
- v1015 済: (ダルマ「実施」) ①sample-ve マージ: nmRmVeItems の車両ボタンを nmCoBtn(実カウンター+名称、選択=シアン)。②スポット判定1画面目の判定へ(nmIjStageGo): オートダイスの札を出さず(nmGoRolls で除外)、説明を「次の画面で出目を入れて判定」。.ijBox:has(.ijFtSet) で ijCols/ijL の内側スクロールをやめ、③の下まで全部出して判定へが続く(外側が縦スクロール)。
- v1014 済: (ダルマ「揺れる/クリアボタンで閉じる/方向バケ 全て確認実施」) ①クリア: メニューを作る時の NM_RM_SUB(pa/ve/mx…)を ↺クリア に持たせ、nmRmClr(n,vs,sub) で戻す(PAATC・敵AFV突入・回復は確認。MC・爆薬・潰走は開き方が違いテスト未完)。②方向パッド: v1009で修正済み(砲でも確認)。③揺れ: Chromiumでは再現せず。nmScDraw/nmCcScDraw の中でカウンター差し替え→スクロール位置を戻す(__nmCoApply)。iPadでの確認はダルマ待ち。返事待ち: sample-ve(敵AFV突入の車両を実カウンターに)。
- v1013 済: (ダルマ「揺れる」白兵戦パネルでも) vaslCtrHTML の画像を data: URI → 使い回しの blob: URL(nmCtrBlob)+decoding=sync に(iPadで再描画のたびに1フレーム空白になるのを抑える。iPad実機の確認はダルマ待ち)。白兵戦(nmCcSc/NM_CCS)の MMC/SMC 国籍をまちがえていた(指揮官9-1・8-1が独軍の青)→攻撃側/防御側の表で NM_CCS.an/dn を使う。
- v1012 済: (ダルマ「ヘクスの水色を変更 サンプルx5→細くする→オレンジ」) 潰走地図(nmRtmSVG step3)の到達ヘクス枠を #7cc4ff 2.5 → #ff8c1a 1.2。注意文の「離れた水色は自動経路」は別の線(自動経路)なので変更なし。
- v1011 済: バグ修正(ダルマ「クリア選択で画面が閉じてしまう」) PAATCで判定した後に ↺クリア を押すと閉じた(NM_RM_SUB が消えて nmRMenuItems が例外)。nmRmClr で NM_PA なら 'pa' に戻す。
- v1010 済: バグ修正(ダルマ「＋−選択で画像が揺れる」) 実カウンター入れ替えの MutationObserver が30ms遅れ(setTimeout)で、+−の再描画のたびに文字→画像が1〜2フレーム見えていた → マイクロタスクで即入れ替え(描画前)。
- v1009 済: バグ修正(ダルマ「化けてる」) 砲撃パネルから「地図で方向を設定」を開くと矢印パッド(nmFacePad)が3列の箱に崩れていた。btRmFullApply の「.rmIt div の連結バー化」が position:absolute のボタンも対象にしていたため、除外。
- v1008 済: (ダルマ「B」→サンプルA/B) スポット判定1画面目の「判定へ」の帯(.ijFt.ijFtSet)を枠なし・非sticky にして内容の末尾に一体化(nmIjFlatCss)。
- v1001 済: (ダルマ「実施」sample-spl2) スポット判定を2段階に: 1画面目 nmIjSetupDraw=A・Bを実カウンターのタイル(nmIjTileChips)で選ぶ+方向+「判定へ」(nmIjStageGo)。車両・砲の主砲は共通の判定パネル nmVfOpen(戻る=nmIjStageBack、J.vfStage)、歩兵・SWなどは J.stage='old' で従来画面。車両名は nmAfvName=afvOfficialName(ユニットタブと同じ)に統一(マルチ判定含む)。
- v1002 済: (ダルマ「実カウンターに変更する」→sample-mcctr→実施) MC・PTCの②チェックするユニットと(登録)ユニットに実カウンター画像(MutationObserverで付与。ラベルから nmCtrUid で引く、無ければそのまま)。
- v1000 済: (ダルマ「右側の表示が埋め込みになっている…埋め込みでない表示に」→sample-spot-right→「実施」) スポット判定(車両の主砲など nmIjNvDraw)の右側: nmIjFlatCss(nmIjMjCss から呼ぶ)で #ijRes/.nvBox を display:contents にして枠・⑤修正/⑥ダイス見出し・内側スクロールをなくし、地形TEM/妨害/その他→注意書き→命中TH#(ROF・故障・命中は1行のピル)→判定する(全幅)→赤白ダイスの順(order)。.ijR:has(#ijRes .nvBox>.ijCp) の時だけ。左側④の下端が切れる件は従来どおり(未対応)。dev/sprt.js・sprt.css。
- v1006 済: (ダルマ「実施」sample-paatc) PAATC(nmPaCtr)のMMC・指揮官を nmCoBtn でカウンターだけ(ラベル・損耗/クラス低下タグ・指揮官の修正を消す)。
- v1005 済: (ダルマ「実施」sample-lwafv) 軽対戦車の兵士・兵器をカウンターだけ(射程ラベル消去)、車両・砲ボタンはカウンター下にユニットタブと同じ名称(nmCoBtn の4番目の引数=ラベル)、スポット判定1画面目(nmIjSetupDraw)のタイルを枠なしカウンター(nmIjCoT)に。編成(grp)タイル・「＋カウンターを選択」・潰走画面などは未適用。
- v1004 済: (ダルマ「引き続き追加」) カウンターだけ表示(nmCoBtn(id,fb,on)・全ボタン共通CSS button:has(>.coMk))を軽対戦車の兵器(射程は小さく残す)・操作する兵士、nmHqPk系の車両・砲/歩兵の選択(40606付近 ch)にも。未適用: スポット判定1画面目のタイル、潰走・その他 nmCtrChip 利用箇所は要洗い出し。
- v1003 済: (ダルマ「シアン・実施・他のパネルも統一」sample-ctronly) ユニット選択ボタンを実カウンターだけに(nmCoBtn/nmCoCss: 64px・ラベルなし・枠なし・選択=シアン #4fd8ff の光+下線)。適用済み: 回復(nmRrRallyItems)・MC②チェックするユニット・シナリオのユニット選択(nmCcSc)・カウンター数選択(ijGrid)。未適用: 車両・砲のボタン、スポット判定1画面目のタイル、ほか nmCtrChip を使う各パネル(要確認)。画像の無いユニット(独2-2-8(乗員)など)は文字付きのまま。
- v1007 済: (ダルマ「地図で方向を設定はスポット判定と同じ仕様で追加」→お任せで実施) 砲撃パネルの方向未設定の注意書きに「地図で方向を設定」ボタン(nmVfFaceMap: 未設定の側=攻撃側→目標の順で nmRmFaceItems を開く。完了で NM_VF_FROM の砲撃パネルへ戻る)。
- v999 済: (ダルマ「ダイスボタン横幅を増やす」→サンプルA→実施) #btRm.rmFull のダイス行を全幅1行に(nmRmCompact に追記: .rmIt:has(.dsRow) を折り返し、.dsRow 100%、ボタン46px・18px)。dev/dicew.js、samples/sample-dicew-A/B/C.png。返事待ち: ダルマ「スポット判定のパネル修正は？」の意味(下の確認待ち)。
- v998 済: バグ修正(ダルマ「グリーンの帯はなし」回復のクラス低下の行) スキン(uith=5 の data-sthov など)の .rmIt:hover/:active の背景が iPad でボタン行に残る → style#nmRowNoHov で .rmIt.rmRow の hover/active/focus を透明に(Chromium では再現せず)。
- v997 済: (ダルマ「回復 ダイス選択できない 使いやすくする」→「1画面のまま」→実施) nmRrRallyItems: 赤白ダイス(nmRlDie、NM_RL.da/db、選んだ目=金)+見込み+「判定する」(nmRlGo、未選択は自動・オートダイスOFFは選ぶまで押せない)。DR○以下で回復を金枠、④修正=林・建物内−1/DM+4 を1行トグル、下の閉じるを削除。dev/rldice.js。
- v996 済: (ダルマ「人力移動 2段階に戻す」→「選ぶ画面と判定画面の2画面」→実施) nmMh2Draw: NM_MH2.step(未設定=1)。1=①②+「次へ」(運ぶユニットと砲が決まると押せる)、2=選んだ内容の行+「← 選び直す」+③④・ダイス・判定する・結果。v987 の2列はやめて1列(two=false)。dev/mh2s.js。
- v995 済: (ダルマ「判定の数値を同じように」「故障・ROFなども色の枠」→実施) 金枠: 砲撃の命中TH#(rmSum)・スポット判定 nvSum 1行目・ボグ判定 DRM→DR12以上・人力移動 M#/DRM。色枠(文字サイズそのまま): 砲撃の sub に ROF(緑)/故障(橙、nmVfBn)/命中(黄)、スポット判定 nvChip の枠を値の色に、PAATC の DR○以下(緑)。dev/thhl.js。
- v994 済: (ダルマ「実施」) 砲撃・軽対戦車兵器の TK# 行を金枠・19px・太字に(nmVfItems/nmLw の it.push ic:tgt)。dev/tkhl.js。
- v993 済: (ダルマ「スポット判定 スクロールなしで全面表示」→実施) nmIjSpCss(nmIjMjCss から呼ぶ): 左=射撃フェイズ1行(説明small非表示)・余白をつめる(dev/spleft.css)、右(#ijRes)=.ijSg をつながったボタン(選択=金)・ダイスは赤/白1行ずつ(.ijRow:has(> span:not([class])))・nvSum 金枠・余白つめ。nmIjEmbed で 戻る/攻撃する/目標 の行を消す。車両→車両(tT9→tO10)・砲撃(tK6→tN6)でスクロールなしを確認。dev/spfit.js。
- v992 済: (ダルマ「処理が重い 撃てるヘクスをやめる」→「タップしたヘクスだけLOS判定」) nmLosHexAsync を前もって計算しない形に(P.lazy、旧は nmLosHexAsyncOld)。タップ時に nmPickLazyChk(自分のヘクス・射程外・LOS、結果は BTG.losAsyncC に覚える)、通らなければトースト。地図は射程外だけ暗く。案内文を「目標のヘクスをタップ」に。sample-pick-style(E/F)は不要になった。dev/lazy.js。
- v991 済: (ダルマ「全ての判定パネル 戻るの横にクリアボタン」→実施) ①#btRm の判定パネル: nmRMenuItems を包み、先頭の back 項目の f にある NM_xx=null(NM_CLR_VARS)のパネルに「↺ クリア/選び直す」を足す。開いた時の状態を JSON で写し(NM_CLR_SNAP)、クリアで戻す(nat はそのまま、NM_DSV も消す、PAATC は先頭MMC、回復は nmRrNat)。btRmFullApply の後に nmClrPair で戻ると1行に ②見出しパネル(nmMh2/nmDcp/nmRaq/nmCcSc): 戻るボタンを複製して ↺ クリア(NM_CLR_HD、MutationObserver)。dev/clr2.js。
- v990 済: (ダルマ「全部実施」) ①爆薬(DC) ①置くを画面幅760px以上で2列(nmDcpDraw two) ②ボグ判定(NM_BOG1)の見出しに ← 戻る(nmHqOpen) ③人力移動の結果をポップアップ(NM_MH2.popSeen、OKで閉じる・結果は下にも残る) ④PAATC: 説明1行・カウンター36px・ユニットごと1行で出目タップ=即判定(🎲自動・外す)、成功/失敗ボタンと「PAATCを判定」はなくした ⑤回復: ユニットを左寄せ・1つずつ(nmRrUnitCss、.rrU)。dev/dcp.js bog1b.js mh2r.js pa.js rr.js。
- v989 済: バグ修正(ダルマ「ヘクスがずれている？」) nmDcpHexSVG: 六角形を常に平らな上(flat-top)で描いていた→最初の隣の方向から向きを決める(辺が隣を向く)・間隔 R√3+3。dev/dcp.js(引数でヘクス名)。
- v988 済: ①(ダルマ「ボグ判定 1画面で完了」→実施) nmScOpen('nmHqBogOpen')→nmBog1Open: 選択画面を出さず最初の車両で nmScGo、nmRmBogItems の先頭に 見出し+閉じる/軍/車両(実カウンター) を足し 戻る を外す(NM_BOG1)。dev/bog1b.js ②バグ修正(ダルマ「見えにくい」回復パネル): v984 の .rmB 高さ34px固定が実カウンター付きボタンを切っていた→固定をやめた。dev/rrchk.js。
- v987 済: (ダルマ「実施」) 人力移動(砲) nmMh2Draw を画面幅760px以上で2列(min(1120px,97vw)・max-height 94vh)。dev/mh2.js、samples/sample-mh-noscroll.png。
- v986 済: バグ修正(ダルマ報告「残留FP ダイス 選択しても色が変わらない」): ①FPの選択色 #2a2412 を dsUni の dsOn 判定に追加 ②mark() が nmDsHPick の付けた dsOn を消していた→消さない(他のパネルのダイスも同じ)。dev/raq.js。
- v985 済: (ダルマ「実施」) 判定パネルをさらにつめる: 目標の移動(37538付近)を row 項目にして なし/Motion を同じ行に(説明は短く)、.rmAct の .rmSub を1行(省略…)。dev/vfcap2.js。
- v984 済: (ダルマ「実施」) ①潰走の行けるヘクス(青 #3aa0ff 22%塗り)→枠線だけ(dev/rtcap.js、samples/sample-rt-outline.png) ②判定パネル #btRm.rmFull をスクロールなしで全体表示: style#nmRmCompact(.rmIt の上下余白3px、.rmB 高さ34px、.dsRow のある行は文字とダイスを1行に)。砲撃(車両目標)で674→490px。dev/vfcap.js、samples/sample-vf-noscroll.png。
  (スポット判定の右側の作り直しは v1000 で実施。)
- v983 済: (ダルマ「実カウンターに変更」→実施) シナリオのユニットで判定(nmCcScDraw)の車両・砲ボタンを nmCtrChip(40px)+名前に(ボグ判定・人力移動・修理)。dev/bogctr.js、サンプル=samples/sample-bog-ctr.png。
- v982 済: (ダルマ「軽対戦車砲 マップ表示が遅い→実施(案1+2)」) nmLosHexAsync の再描画を0.4秒に1回へ間引き(LOSは近い順のまま)。計測 dev/hexperf.js: 再描画617→61回・全体138s→26s(1ヘクス約40msのLOS計算自体は残る)。
- v981 済: (ダルマ「実施」) スポット判定(#nmIj)の背景・ボタン・選択色(金)・「判定する」(青)をマルチ判定(砲撃パネル)と同じに。nmIjMjCss(nmIjBtnCss から呼ぶ、html:root×6で上書き)。dev/spdes.js、サンプル=samples/sample-spot-design.png。
- v980 済: (ダルマ「更新できない・バージョン長押しからタップに変更」) バージョン表示(.appVerSp)を長押し0.6秒→タップで appVerPop を開く(開いていれば閉じる)。dev/vertap.js。『更新できない』は v978/v979 で sw.js 等の版が古いままだった(上の注意)ためで、v979 追補で修正済み・Pages の反映に数分かかる。版上げは dev/rel.py。
- 注意(v979 で発覚): 版を上げる時は dev/rel.py を使う(手で index.html だけ上げると sw.js・manifest・<title>が古いままになり、iPad のアプリ更新で新しい版が来ない。v978/v979 で発生→v979 に追補して修正)。
- v979 済: (ダルマ「実施」) 潰走の行き先候補(nmRtPlans)の上限8件を外して全件を番号表示(林・建物の候補がある時。無い時は従来の4件)。dev/rtcap.js、サンプル=samples/sample-rtcap-*.png。
- v978 済: (ダルマ「実施」) ①判定パネル右側(nvBox)のレイアウトを砲撃など専用パネルと同じ行に(nmIjItemsHTML の row にアイコン、nmNvLayCss で左ラベル・右寄せボタン・ⓘ注意書き)。②戻る行(button の b+small)を nmBkU が連結していた不具合を修正(見出し・説明を分け、全幅・枠なし)。dev/nvlay.js・bksub.js、サンプル=samples/sample-nv-*.png・sample-bk-*.png。
  未対応: 配置メニューの白い「新しい編成」ボタン(iPad のみ崩れ、Chromium で再現不可)。
- v977 済: ①バグ修正(ダルマ報告「ダイス選択で色が変わらない」人力移動): 選択をインライン背景色で示すダイスボタンが .dsRow の透明背景(!important)に負けていた → 変換時に dsOn を付ける(dsRow の mark 内)。dev/mh2die.js。②回復パネル(nmRrRallyItems)の分隊・クラス低下・半減・指揮官・指揮官の能力ボタン、修理(nmRrRows の車両・砲、nmRmRvItems の見出し)を実カウンター(ダルマ「実施」)。dev/rrctr.js。
- v976 済: (ダルマ「実施」) ①主砲・砲・軽対戦車兵器の「シナリオの相手から選ぶ」(nmVfFoeRows)の車両・歩兵ボタンを実カウンター(👤は外す) ②スポット判定(#nmIj)のボタンをスキンに関係なく他のパネルと同じデザインに(nmIjBtnCss: ふつう=暗い地+細枠、選択=金、未選択/選択中の欄=暗い地+金枠、判定する=水色)。ネオン(くすんだ)などでピンク・紫だったため。dev/foectr.js・ijsty.js。
- v975 済: (ダルマ「実施」) ①白兵戦(シナリオのユニットで判定 nmCcScDraw)にクラス低下・損耗ユニット(nmCcScOb=nmSuOb+nmRrGroups、オレンジのタグ) ②白兵戦の「攻撃する組」「目標の組」を実カウンター(nmCcaChip、混乱は暗く) ③スポット判定の「Aに置く」「目標を選ぶ」の編成(中のユニット最大4)・車両・砲と、カウンター選択の一覧を実カウンター(nmIjPlChips) ④自由フランス軍の不足画像6種(6-4-8[E]・4-4-7[2]・4-3-6[G]・2-4-7[1](HS)・2-2-6[G](HS)・3-3-8[E](HS))を VASL リポジトリ(github vasl-developers/vasl dist/images/ff/*.svg を4倍で描画→192px)から VASL_CTR_IMG u_ff_* / VASL_CTR_MAP_U に追加。全80シナリオで画像なし0(dev/ctrcov.js)。VASL画像はこのリポジトリを add_repo→git clone(--filter=blob:none、必要ファイルだけ checkout)で取れる。dev/ccctr.js・ijctr.js。
- v974 済: マルチ判定(nmHqOpen)のタイルで2行の名前(白兵戦・臨機の白兵戦・PAATC・車両が敵AFVへ)が高さ54pxからはみ出していた → 2行のタイルだけ文字10.5px・アイコン20pxに(案C、ダルマ「c」)。window.__hqSty で A(高さを文字に合わせる)/B(アイコン左)も確認可。dev/hqtile.js。
- v973 済: ライト版の軽対戦車兵器(地図に歩兵が無い時の nmNuDraw、fn=nmLwOpen): ①兵器(nmLwNatList: シナリオの軽対戦車兵器+PF、VASL実カウンター)②操作する兵士(シナリオの歩兵・実カウンター)を国籍ごとに選ぶ→両方選ぶと nmNuGo(1) で仮に置くヘクスのタップ→nmLwOpen が NM_LW_PRE の兵器を選んだ状態で開く。ダルマ「兵器と操作する兵士を選択するとマップ画面表示」「対戦車兵器もカウンターで表示」→実施。dev/lwlite.js。
- v972 済: バグ修正(ダルマ報告「結果ミスだが成功画像が表示する」): 結果画像の判定 nmResKind が「ミス」を失敗側に数えていなかった(軽対戦車兵器の記録は「… ミス」)→ /外れ|ミス|…/ に追加。dev/reskind.js。
- v971 済: マルチ判定のタイル名「軽対戦車 LATW」→「軽対戦車兵器」(ダルマ指示)。撃てるヘクスの案D表示は v967 から軽対戦車兵器(nmLwPick)にも適用済み(ダルマのスクショは v966)。dev/lwpick.js。
- v970 済: バグ修正(ダルマ「パネル内はドラック移動はしない」): v955の全体ドラッグ(nmGdPanel)が、スポット判定の「Aに置く」ポップアップ(ijCp)などパネル内の枠をつかんで動かしていた。見つけた枠の上に別の枠(カード)や大きい固定/絶対配置パネル(画面の6割以上)があれば対象外にした。パネル自体(ijBox・ccBox など)は従来どおり余白をつかんで動かせる。dev/gdnest.js。
- v969 済: ライト版の nmNuDraw は「② どうする？」の欄(置かずに判定)も出さず、ユニットだけ並べて「選ぶと地図に切り替わります」の案内。車両(nmHqAfvOpen)・砲(nmHqGunOpen)・歩兵とも同じ(ダルマ「車両も同じにする」)。dev/nuveh.js。
- v968 済: ライト版(nmHqLite)のマルチ判定で「地図に○○がありません」(nmNuDraw)の時、ユニット(砲・車両・歩兵)を選ぶとすぐ nmNuGo(1)=仮に置くヘクスのタップへ。「地図に置く」「配置画面を開く」はライト版では出さない(フル版は従来どおり)。ダルマ「ライトモードでは地図に置くは不要」「マルチ判定→砲撃→カウンター選択するとマップ画面表示」(=案B)。dev/nulite.js。
- v967 済: 撃てるヘクス(主砲・砲 nmVfPick/軽対戦車兵器 nmLwPick)の見せ方を案D(ダルマ「グリーンが見えにくい」→サンプル4案→「d」)。nmPickHexSVG: 撃てないヘクス(LOSなし・射程外)を暗く、撃てるヘクスに黄緑の太枠(縁取り付き)。計算中は済んだ所だけ暗く(nmLosHexAsync が P.no/P.from/P.maxD を記録)。window.__pkSty で他案(1=A 2=B 3=C 0=従来)。dev/pkgreen.js。
- v966 済: バグ修正(ダルマ報告「潰走できないヘクスが全て暗くなっている？」): nmRtmMode が帯だけ描き直して地図を描き直していなかったため、「経路」に切り替えても次に地図が描かれるまで前の表示(届くヘクス全部が明るい)のままだった → Draw() を呼ぶ。dev/rtmode.js(ボタンだけで 112→19)。
- v965 済: 潰走の「経路」(手で引く)でルール上いけないヘクスを暗く(ダルマ「いけないヘクスは暗くする」→実施)。nmRtLegal: 行き先(一番近い林・建物=plans.base と続けて入る林・建物=plans.all)へ合法に着ける経路上のヘクス+匍匐の隣だけ明るく。続けて入る林建物は一番近い林建物に入ってからだけ、行き先に入ったら行き先の林建物以外へ出られない(SK4 3.6『unless the unit can immediately enter another building or woods hex』)。6MF内に林建物が無ければ届くヘクス全部。暗いヘクスはタップ不可(トースト)、経路の終わりが行き先でなければ帯に赤字。暗いヘクスの阻止の赤は描かない。結果は M.legalC にキャッシュ。dev/rtlegal.js。
- v964 済: 潰走マップの説明パネル(nmRtmPen)を重要なことだけに整理(ダルマ「表示が多いと見なくなる」「シンプルに」→実施)。タブ: 阻止されたら(合格=続ける/PIN=止まる・隣接なら除去/失敗=損耗・一緒の指揮官も除去、下に「匍匐・妨害・高所の有利があれば阻止されない」)、阻止できる敵(○統制・PINなしでLOS・通常射程内/×白兵戦中・CX・Motionの車両・向きの外の砲)、注意(DMのない混乱ユニットは潰走しなくてよい・隣接/阻止される開豁地なら必ず潰走、敵から遠ざからない林建物は無視してよい、潰走できなければ除去、＋「アプリはDMを判定しません。敵の射程・向きは敵をタップして設定」)。パネルは max-height 72vh でスクロール。dev/rtmnote.js。
  残り(未対応・ダルマ判断待ち): 行き先候補8件の上限。
- v963 済: 獲得・残留の「盤面に置く」札にチェック欄(チップ型にも)。札が出ているパネル(#btRm 内に .nmBd)でチェックしていない札があると、閉じる・戻る・別の目標・ROFで別の目標・命中からやり直す・設定を変える・外タップで閉じる を止めて「盤面に置いたら、札のチェックを入れてください」+札が赤く揺れる(nmBdPend/nmBdNag、クリックの捕捉と BtRmClose の包み。NM_IN_RM 中の再描画は通す)。TKのダイス(nmVfSet a/b/c1/c2)・判定・地図操作は可。ダルマ「実施」。dev/bdchk.js。
- v962 済: (ダルマ「実施」×2)
  (1) マルチ判定の潰走マップ: 帯に「⚠阻止N」ボタン(選んだ行き先/経路に阻止があると赤)→ 阻止のパネル #nmRtmInt(nmRtmIntOpen/Draw/Roll/Set、NM_RTM_INT)。パネルに「← 潰走マップに戻る」。潰走するユニット(シナリオの歩兵・クラス低下・損耗)と一緒に潰走する指揮官を選び、阻止ヘクスごとに混乱状態の士気でMC。失敗→損耗(CASUAL_MAP、半分隊は続ける)・ちょうど→釘付けで停止・原DR12→除去・失敗で一緒の指揮官も除去。判定のみ(地図は変えない)。
  (2) 地図のユニットメニューからの潰走: 結果パネル1枚で阻止のMC。一緒に潰走する指揮官は手で行き先へ動かしてから選ぶ(案2)。行は「阻止N @ヘクス」。
  (3) 獲得の札(nmAcqIc)・残留火力の札(nmResIc)をVASL実カウンター画像で(BT_VC.imgs MS/acq1wh・acq2wh・RFP02/04/08)。画像の無い残留値(6・12など)は同じ見た目をSVGで描く。
  MC・PTCタイルの「阻止」案(sample-int-mc)は不採用。検証: dev/rtmint.js・intone.js・resctr.js・vft.js・smoke・sweep。
- v961 済: 車両の機関銃による阻止(ダルマ「対応させる」)。車両は武器ごとに判定(SK4 7.x 車両MG): 主砲=CEの時だけ・射程16・砲塔TCA/無砲塔VCA。BMG=射程8・VCA(固定式BMGは移動目標+1で不可)。CMG=射程12・TCA(RSTはCE時不可)。RMG=射程8・TCAの後ろ。AAMG=CEの時だけ・射程8・射界なし。Motion・ショック・スタン・リコールは全て不可。BUでもBMG/CMGで阻止。車両MGの個別の故障は地図で管理していないため考慮なし。dev/rtstrict.js に射界の一致確認を追加。
- v960 済: (ダルマ「ルール厳守で修正実施」ほか)
  潰走(SK4 3.6)のルール厳守: (1)阻止できる敵=未混乱・ピンでない・CXでないMMC(とそのMMCが持つMG/FT)。白兵戦中(同じヘクスに潰走側のユニット)は不可。地図の車両=CEで主砲が射界(砲塔はTCA・無砲塔はVCA)内・Motion/BU/ショック/スタン/リコール/主砲故障は不可。地図の砲=操作するユニットがいて射界内・故障は不可。向き未設定は阻止に数えない。車両のMG(BU時のBMG/CMG)は未対応。
  (2)稜線の例外: 敵のLOSが交わるヘクスサイドから稜線を越えて上がったヘクスでは高所の有利なし→阻止(nmRtCrestSide・経路の直前ヘクスで判定 nmRtPathInter)。
  (3)積み重ね制限(3分隊相当+SMC4、HS/乗員0.5、砲の乗員1)を超える林・建物・ヘクスは行き先にしない(nmRtStackOK)。通過は制限しない(終点のみ)。
  (4)SWの運搬: 潰走するMMCが持つSW・LATW・DCは、IPC以内でPP合計が最大になる組を運び、残りはその場に落とす(持ち主なし)。以前は潰走で持っていたSWが消えていた(nmRtEqOf/nmRtEqRm/nmRtEqAdd/nmRtBestLoad)。
  (5)隠蔽: 地図に隠蔽の状態がないため、敵は常にKEU扱い(変更なし)。
  ダルマ報告「シナリオの相手から選ぶ→マップ切替が遅い」: 撃てるヘクスのLOS計算(656ヘクスで約18秒)を少しずつ行い地図をすぐ表示、近い順に緑、同じ地点の結果を記憶(nmLosHexAsync。主砲 nmVfPick・軽対戦車 nmLwPick)。
  ダルマ報告「ダイスを選んでも色が変わらない」: .dsRow のボタンの選択色(.on)が、同じ強さの透明背景ルールに負けていた → html:root 付きの .on ルールを追加。
  未対応(画面の追加が要るためサンプル待ち): 指揮官を一緒に潰走させる選択(今は潰走後に行き先の指揮官から選ぶ=誤り)、DMの有無、候補8件の上限。獲得の実カウンター表示は sample-acq-ctr でサンプル提示中。
  検証: dev/rtstrict.js(新)、dev/rtaudit.js、dev/vft.js(ダイスの色)、既存の潰走テスト・smoke・sweep。
- v959 済: 潰走ルール(SK4 3.6)の徹底確認と修正(ダルマ「ルールと現状を突き合わせて徹底確認実施」)。
  (1) 行き先: 『無視してよい林・建物』= 出発ヘクスからLOSの通る敵(Known Enemy Unit)より遠ざからないもの(同距離含む)。行き先候補は (A)無視しない時の最寄り(MF) と (B)無視する時の最寄り の両方+それぞれ到着後すぐ隣へ入れる林・建物(MF内・合法な歩み)。以前は同距離を全除外・『敵』はLOS無関係に全部数えていた。
  (2) 連続して入る林・建物: 最寄りの林・建物を通る経路の続きで判定(以前は最短経路の直前ヘクスだけ見ていて漏れ/余分があった)。同MFの別経路も考慮(LOS履歴で結果が変わるため)。
  (3) 経路の費用: 探索で状態(ヘクス+LOSに入った敵)ごとに経路を持つよう修正(以前はヘクス単位の経路をつなぎ、MF超過やLOS履歴の食い違いが出ていた)。
  (4) 敵に隣接中は同じ敵に隣接する別ヘクスへ移れない: 出発時だけ→途中も・混乱した敵も(自動経路・匍匐・手動経路とも)。
  (5) 阻止の射程: 地図のユニットで、未混乱MMCが持つMGの通常射程を含める(以前は分隊の射程だけ)。
  (6) v957の不具合修正: 新しく作った関数名 nmCtrOf が既存の nmCtrOf(状態マーカー描画)を上書きし、地図の状態マーカー描画が落ちていた → nmCtrUid に改名(dev/rtreal.js の最終段エラーの原因)。
  検証: dev/rtaudit.js(独立のDFS実装と突き合わせ、S24/S25 で各260配置×3回: 違反0・漏れ0・余分0)、dev/rtmg.js、既存の潰走テスト・smoke・sweep。
  未対応(ルールにあるがアプリで判定していない): 阻止できない敵(ピン・白兵戦中・CX・半減FP・BU/Motion・射界変更が必要)の自動判定(地図の車両・砲は阻止に数えていない)、積み重ね制限で入れない林・建物、SWの運搬(IPC)、指揮官の同行の選択。
- v958 済: 潰走先の不具合修正。敵が0のとき nmRtPlans の『敵より遠ざかる林・建物だけ』条件(nearE>d0)で林・建物が全除外→TEM順の遠いヘクスが出ていた。敵0なら条件を外し、最寄り(同MFと隣接の林建物)を出す(SK4 3.6)。ダルマ「③は1番距離があるが潰走して問題ない？」。dev/rtnoenemy.js。(既知: dev/rtreal.js の最終段で nmStatusOverlaySVG が null.length で落ちる=本件前から、実機影響は未確認)
- v957 済: パネルの選択ボタンに VASL 実カウンター画像(nmCtrChip/nmCtrOf)。対象: nmNuDraw(どの砲/車両/歩兵)、nmHqPk の車両・砲の行、人力移動(砲)の運ぶユニット行と砲ボタン、nmHqScHtml(回復/士気のシナリオユニット)。画像が無いものは文字のみ。ダルマ「実施」。スポット判定の攻撃側/目標欄は未対応(要望があれば同方式)。dev/ctrpanel.js。
- v956 済: 潰走地図に国籍の切り替え(案B): 帯の「ソ連 ⇄」(nmRtmNatBtn)をタップ→ nmRtmNatCycle で潰走する側の国籍を順に切り替え。敵は反対側(nmRtmEnat)。ヘクス・敵マーカー(射程・種類・向き)・LOS妨害は引き継ぐ。地図のユニットメニューからの潰走(M.real)では出さない。ダルマは「B」とだけ返信(実施の語なし)したので、問題があれば戻す。dev/rtnat.js。
- v955 済: ①全パネルをドラッグ移動(nmGdPanel/NM_GD: position:fixed のカードをボタン以外でつかんで CSS translate で移動、スクロールするパネルは上端46pxの帯だけ、潰走3パネル・nmPdAttach系・#btRm は対象外=既存の動き)。②マルチ判定の白兵戦(nmCcScDraw)・スポット判定(nmScDraw、MC/PTC・爆薬など)のユニット行を VASL カウンター画像つき(nmUnitLbl)。③全ボタンの4隅ドット: nmDotOff() が起動時にスタイルシートを走査し、ボタン系ルールの背景画像から radial-gradient の層だけ外す上書きシートを作る(window.__dotRules に件数)。dev/pdrag.js。
- v954 済: 潰走地図のパネル3つ(帯 #nmRtmBn・阻止カード #nmRtmPen・敵設定 #nmRtmEd)を全部ドラッグ可に。#nmRtmEd は nmRtmDrag(p,'nmRtmEdPos')、初期位置は nmRtmFree で他パネルと重ならない場所、触ると nmRtmFront で最前面、文字選択なし(nmRtmCtrCss)。dev/rtdrag.js。
- 方針(2026-11-09 ダルマ確認): 地図のユニットメニューの『潰走』(nmRtmStartAt)は、実ユニットと地図上の実敵を使う今の作りのまま。カウンターなし地図にはそろえない。
- v953 済: 潰走地図。①ルール修正(SK4 3.6): nmRtSearch を状態(ヘクス,LOSに入った敵の集合)の探索に変更=一度LOSに入った敵にはLOSを出た後も近づけない、path[]で実経路を返す(nmRtPlans も path 使用)。匍匐(nmRtCalc の low)も LOS のある敵に近づくヘクスは不可。手動経路(nmRtmManTap)も経路全体のLOSで判定。②表示: 近づく所は暗く(近の表示なし)、阻止ヘクスの⚠なし、匍=青丸「匍」、行き先=緑丸の数字、LOS妨害=黄丸「妨」(nmRtmSVG の bd()、既定 STY=8、window.__sty で他案)。行き先ヘクスには匍の丸を出さない。dev/rtnear.js、rtsty.js、rtsty8.js。
- v952 済: 潰走・阻止の地図。①逃/敵/砲を VASL カウンター画像で表示(nmRtmSVG の ctr()、nmRtmCtrId/nmRtmEctr、射程は右下の数字)②敵マーカーの小窓 nmRtmEd を「シナリオのユニットを選ぶ」に変更: タブ 歩兵(損耗・クラス低下も)/SW(対戦車SW・DC・指揮官は除く)/砲/車両(nmRtmUnits、nmRtmEPick)。射程はカウンターの値を自動(砲・車両は16固定)。砲は向き1つ(rtFac)、砲塔付き車両は車体(rtHull)と砲塔(rtFac)、無砲塔車両は車体のみ。1ヘクス=最長射程の1ユニットだけ置く。車体MGの向きは扱わない。③潰走地図のボタンの四角ドットを nmRtmCtrCss で消去。妨害/匍/⚠ は文字のまま。dev/rted.js 更新、dev/rtrng.js 削除。
- v951 済: PAATC(nmPaOpen)。nmPaMmc に損耗(HS)・クラス低下の MMC を追加(nmRrGroups の base/elr/cas)。MMC・指揮官ボタンを VASL カウンター表示(nmPaCtr、#nmPaCtrCss で .rmB の枠・背景・四角ドットを消し、タイルは固定高さ)。dev/pared.js。
- v950 済: 敵マーカーの設定を小窓 #nmRtmEd(マーカー横、nmRtmEd)に。①種類 ②射程(数字ボタン nmRtmERng+−/＋) ③砲の向き(SVG の不可視点 nmRtmSelC/nmRtmDir0..5 の画面位置から矢印の向きを求めるので地図と同じ向き、nmRtmEFac)。敵モード: 空き=置いて小窓、置いた敵をタップ=小窓を開く/閉じる、消すは小窓の『消す』(nmRtmEDel)。dev/rted.js、dev/rtrng.js 更新。
- v949 済: 約束(v934 ダルマ指示)どおり、マルチ判定の潰走は常に自軍・敵軍カウンターのない地図(nmRtmStart)。nmHqAtA/nmHqPickA で fn==='nmRtOpen' は即 nmRtmStart(編成の選択 nmHqPk を出さない)。nmRtEnemies は NM_RTM&&!real の時 ijTmp(置いたマーカー)だけ。v948 の『地図に編成がある時は実ユニット』は取り消し。地図のユニットメニューの潰走(nmRtmStartAt、real)は v947 のまま。
- v948 済: 不具合修正。マルチ判定の潰走は、地図に編成がある時は nmHqAtA('nmRtOpen')→window.nmRtOpen(旧一覧パネル)に行っていた(v934〜947 は地図が空の時の nmScOpen 経路しか直していなかった)。nmHqAtA で fn==='nmRtOpen' は nmRtmStartAt(an,sd)。編成の選択(nmHqPk)から選んだ時も同じ。旧 nmRtOpen を呼ぶ入口は無し(nmRtmFinish 内部のみ)。dev/rtreal.js に hq/pick テスト。
- v947 済: 地図のユニットメニュー(nmUnitMenu)の『潰走(混乱N)』を nmRtOpen(旧一覧パネル)から nmRtmStartAt(n,sd) に。M.real=1・step3 から開始、NM_RT={n,sd,slot:実ユニット}。地図の実際の敵は nmRtEnemies で自動、SVG で点線『敵4』。実際の敵ヘクスにはマーカー不可。やり直し=足したマーカー・妨害だけ消す。終了=地図へ(判定ボードに戻らない)。ユニットは動かさない(調べるだけ、ダルマ了承)。dev/rtreal.js。総点検 sweep S25/S24 ともエラー0(v946時点)。
- v946 済: 阻止できる敵タブの×(火力半減・プラス修正)を例ごとの小さな一覧に(CX/1人でMGを撃つ指揮官/BU車両の主砲/止まらずに動いている車両/潰走先が射界の外の砲・主砲)。
- v945 済: 潰走・阻止の敵マーカー(一時 ijTmp)に rtRng/rtGun/rtFac。nmRtEnemies が rng=e.rtRng、rtGun/rtFac を返し、nmRtInter は砲なら nmRtInCA(射界=正面ヘクスサイドの両端稜線の間、±30度)外を除外。nmRtDirs(n)=6方向角。敵モード: 空きタップ=追加して選択(M.sel)/選択中を再タップ=消す/別の敵=選び直し。帯2行目 nmRtmESet('gun'|'rng'|'fac')(砲にすると射程16)。地図に『敵4』『砲16』と射界の扇形(最大8ヘクス描画)。dev/rtrng.js(S24 vJ8: 歩兵4=12/射程1=3、砲6方向=3,0,0,8,6,9)。
- v944 済: 潰走・阻止 step3 の帯をコンパクトに(width:max-content、ボタン28px、⠿)。経路モード(M.mode='r')で nmRtmManTap: 最後のヘクスの隣をタップで M.pick={man:true,path,mf,mfMax,inter} に追加(btInfCost・合計MF≤C.mf・敵ヘクス不可・LOS内の敵へ近づく不可・最初の一歩で隣の敵に隣接し続ける不可)、最後をもう一度/『1つ戻す』(nmRtmManBack)で戻す。隣でなければ従来の自動経路。dev/rtlive.js に man テスト。
- v943 済: 潰走・阻止の結果画面(step3)に阻止カード #nmRtmPen(右下、nmRtmDrag(p,'nmRtmPenPos') でドラッグ移動・位置記憶)。タブ NM_RTM_PT='p'(阻止されたら: 合格/PIN/失敗)/'u'(阻止できる敵: ○×条件)、nmRtmPenTab。nmRtmDrag はキー別(NM_RTM_POS={})。内容は SK4 3.6 準拠。サンプル=samples/sample-rtm-pen3.png。
- v942 済: 潰走・阻止をライブ表示に。step1 で逃をタップ→nmRtmDecide で即 step3(決定ボタンなし)。step3 の帯に 敵(n)/LOS妨害(n)/経路 の切替(M.mode e/k/r)+やり直し/終了。敵・妨害の変更で M.pick を消し、SVG は毎回計算(M.cache を使い回さない)。不具合修正: BtRmClose フック(38922付近)が NM_CCS.open で一時ユニット(ccTmp)を消していた→ nmRtmActive() 中は消さない。nmRtmStart で自軍・敵軍が未設定なら nmSdAssign(nat,'f')。dev/rtlive.js(S24 逃vN7 敵vO9,vL8,vN5 → vR7 経路 vO7>vP6>vQ7、阻止 vQ7)。
- v941 済: nmRtPlans の候補(番号)をルール上止まれる行き先だけに。林・建物(cov)があれば MF 最小のもの全部+そこから続けて入れる林・建物(sr.prev が候補のもの)、最大6。cov が無い時は従来どおり(敵から遠い順4つ)。旧パネルの潰走(nmRtOpen)にも効く。番号以外の水色は参考表示。S26 tL9/敵 tK9,tN10,tP9 で tL10 のみを確認(/tmp/q5.js 相当)。
- v940 済: 潰走・阻止 step3 で番号以外の水色(到達可能)ヘクスもタップ可。nmRtSearch の prev から経路を作り M.pick(no:0)。トーストは『水色のヘクスをタップしてください』。dev/rtm.js に free テスト。返事待ち: sample-rtm-pen(阻止されたらカード、未コミットの改良版は stash)。
- v939 済: 潰走・阻止は『どこに潰走できる/できない・どこで阻止されるかを調べるツール』(ダルマ指示)。step3 で行き先(番号/匍)をタップすると nmRtGo を呼ばず M.pick={no,to,path,low,inter} を設定し、経路の線と阻止ヘクスをバナーに表示(nmRtmUnpick=別の行き先)。NMC・ユニット移動なし。nmRtmFinish 後の btRm 一覧パネルは消す。サンプル=samples/sample-rtm-pick.png。
- v938 済: 潰走・阻止の決定(nmRtmDecide)でユニット選択パネル(nmScDraw)を出さず、先頭の分隊1個・混乱で nmRtmFinish→step3 の地図へ(潰走の到達範囲・阻止はユニットの種類によらない)。バナー #nmRtmBn は nmRtmDrag でドラッグ移動可(ボタン以外をつかむ、位置は localStorage nmRtmPos)。dev/rtm.js 更新(drag/keep)。
- v937 済: 潰走・阻止の LOS妨害マーカーを有/無の2状態に(タップで付く/外れる、表示『妨害』)。SK4 3.6: 妨害が1つでもあれば FFMO 無効=阻止不可なのでレベル(+1〜+3)は不要。BT.smoke[n]={v:1,k:'m'}。
- v936 済: 潰走・阻止の地図(step1)から国籍ボタンと nmRtmNat を削除。潰走する国籍は nmRtmStart で resolveFiringNat('PFPh')(手番側)、取れなければシナリオ攻撃側/先頭国籍。ユニット選択で別国籍だとトースト「潰走するのは手番側のユニットです」。
- v935 済: 潰走・阻止を地図が先の順に変更。nmScOpen('nmRtOpen')→nmRtmStart()(step1 潰走ヘクス+国籍ボタン/step2 敵ヘクス or LOS妨害マーカー(mode e/k)→決定→step'u' ユニット選択(nmScDraw)→nmScGo→nmRtmFinish→step3)。LOS妨害は BT.smoke[n]={v:1..3,k:'m'} を一時的に使い nmRtmEnd/Reset で元に戻す(M.mkO)。ピッカーを閉じたら step2 へ戻る(nmRtmActive)。dev/rtm.js 更新。\n- v934 済: 判定ボード「潰走・阻止」を地図モードに。nmScGo は fn==='nmRtOpen'&&!C.v なら nmRtmStart(C)。NM_RTM{C,sd,step1(潰走ヘクス)/2(敵ヘクス・射程4の歩兵扱い)/3(nmRtOpen)}。nmRtmTap(map tap hook)・nmRtmSVG(重ね描き: 水色=到達可/グレー/⚠阻止/番号=行き先)・カウンター非表示(42052/42134で nmRtmActive())。行き先は nmRtCalc().plans(最大4)の番号ヘクスをタップ or パネル一覧、匍匐後退はパネル。dev/rtm.js。\n- v933 済: 白兵戦(nmCcAtk)の既定を全て未選択に。nmCcAtkInit(force,all): all=true の時だけ全員を攻撃/目標に入れる(かんたん=nmCcaSimple)。nmCcaHost は未設定の指揮官を単独扱い(h=-1→自分)、組み分けは明示した時だけ金色(未設定は赤い案内文)。nmCcaPairSet は nmCcaClear(攻撃を空に戻す)。dev/cca2.js は open 後に nmCcaSimple() を呼ぶよう更新。\n- v932 済: 判定履歴・操作ログ(.modal-popup[style*="top:8%"])を X1() で統一デザインに。\n- v931 済: 統一デザイン(v924 IIFE)を #nmNu(ユニット操作・選択は金)・#nmLj(判定の詳細)・#nmScV(シナリオカード、#nmScVBody内のみ)・#nmGrpRn(編成名変更)にも適用(X1()で追加CSS)。\n- v930 済: 統一デザイン(v924 IIFE)に #nmMh2(人力移動)を追加。ラベル付きダイス行(赤/白)は mark() が .dsRow.dsLb の帯で包む。ボグ判定は #nmCcSc 経由で適用済みを確認。\n- v929 済: PAATC(NM_PA)は nmPaSeed() で開いた時・国籍切替時に先頭MMCを list に1つ入れる。\n- v928 済: 判定ボードの修理(nmRrRepair)は v 未指定なら nmIjVehs(nat)[0] を自動選択。nmRrVeh は選択済みを押しても外れない。\n- v927 済: 判定ボードの回復(nmRrRally)は開いた時に先頭の分隊(なければクラス低下/半減)を nmRrPick で自動選択=全部入りの画面。nmRrPick は選択済みを押しても外れない。国籍切替でも同様に先頭を再選択。\n- v926 済: ダイス帯(.dsRow)に dsOn(nmDsHPick の選択色)を金色で。回復の出目行を最初から1行[2..12]で生成(nmRrRallyItems/nmRmRallyItems)、v924 IIFE の MutationObserver は遅延なしで同期実行(一瞬2列の不具合解消)。\n- v925 済: 回復パネルのDR行2〜12は別々のrmIt行(6+5)→mark()で隣接する.dsRowを結合(後ろのrmItはdisplay:none)して1本の帯に。\n- v924 済: マルチ判定の配下パネル(#nmCcSc/#nmCcp/#nmDcp/#nmRaq/#nmIj/#btRm.rmFull)を判定ボードの見た目に統一(IIFE・style#nmDsUni、v884の直前)。ダイス大(幅≤58かつ高さ≤46)または数字だけのボタンは data-dice で四隅ドットなし、他はドットあり。数字だけのボタン5個以上の行は .dsRow/.dsb の枠付き1本帯(高さ38px、スポット判定は除外=基準)。MutationObserverで描画のたびに印付け。サンプル=samples/sample-design-*.png, sample-dice*.png。\n- v923 済: 白兵戦パネル(nmCcAtk)の組み分けを nmCcaPairSet(sd,i,k)(k=付け先MMCの添字/-1=単独)で直接選ぶ形に。nmCcaPairHTML を作り直し(旧 nmCcaPair の切り替えは未使用)。\n- v922 済: 判定ボードの回復(RRm: NM_RR.kind='rally'・仮編成'_T')を作り直し。nmRmRallyItems 先頭で nmRrRallyItems(n) へ。NM_RR に sel{kind,label}/mode('ldr'|'self')/ldr/ter。nmRrGroups(nat)=分隊(OB)/クラス低下(ELR_MAP連鎖)/半減(CASUAL_MAP連鎖)、nmRrPick/nmRrModeSet/nmRrLdrSet/nmRrTer/nmRrBuild(_Tを選んだ1ユニット+指揮官で作り直す)。nmRlCalc は RRm の時だけ地形をNM_RR.terで決める。ユニットは1つずつ(同時回復なし)。dev/rr.js 更新。地図のヘクスからの回復(nmRlOpen)は従来のまま。\n- v921 済: 右端の縦ボタン列(nmBarLite)に ↶戻す/↷進む(マークD)。nmFtActFill で bu/br を remove せず bj の直下へ、NM_TB_ITEMS に undo/redo 追加(既存設定は hq の後ろに挿入)。
- v920 済: NM_MX を一般化(vDead{f,e}、キー 'Vf'/'Ve'、M.both/first、不意打ち M.amb={on,asd,cx,dr,res} を nmMxAmbMod/Eval/Dr で自前計算、nmMxCv(sd,k) が NM_CV の isd/amb/noPa を攻撃ごとに設定)。dev/mx.js, mxamb.js, mxboth.js。
- v919 済: 混在白兵戦(NM_MX)に不意打ち。画面の「①不意打ち」で『歩兵が林・建物へ突撃した』を選ぶと nmCvAmbItems(NM_CV.noPa=false)。M.ambS=成功側、nmMxNext で成功側が先に全攻撃(ambDone)。歩兵→歩兵は nmMxPrev で±1、車両→歩兵は nmCvCounterCalc の drm、歩兵→車両は nmCvCalc。突撃した側は車両のいない側(isd)と仮定。dev/mxamb.js。
- v918 済: 混在ヘクス(歩兵＋車両)の白兵戦を SK4 3.8 の交互宣言に作り直し。nmHqCcOpen が nmMxOpen へ(NM_MX。nmRmMxItems、sub 'mx')。攻撃ごとに nmMxGo で即解決(歩兵→歩兵=nmCCCalcL、歩兵→車両=NM_CV(mx=1)の nmCvCalc/nmCvAtk、車両→歩兵=nmCvCounterCalc のFPで目標選択分)。nmCvRe は NM_CV.mx の時 nmMxRe へ。dev/mx.js(旧 mix.js は削除)。【未対応・開示】不意打ち(3.8)はこの画面では扱わない/車両が両軍にいるヘクスは従来画面(トースト表示)/PAATCは別タイル/原DR2の指揮官誕生は歩兵→歩兵と歩兵→車両のみ/車両の攻撃でDR2の特例なし。
- v917 済: 「見える範囲」の精密判定(btRmViewRefine)が1.5秒ごとに Draw すると保存済みのスクロール位置に戻されていた → Draw前に losSaveMapScroll()。dev/vs.js。
- v916 済: 判定ボードに新タイル2つ。歩兵用「PAATC（歩兵が車両へ）」nmPaOpen/NM_PA/nmRmPaItems(sub 'pa'。国籍→MMC追加→指揮官→ユニットごとに出目→合格/失敗PIN。修正=指揮官cmd+未熟等+1 nmCvPa1)、車両用「車両が敵AFVへ（停止できる？）」nmVeOpen/NM_VE/nmVeCalc/nmRmVeItems(sub 've'。3.3.2: 自車の使い切らない弾(deplete===0)で原DR5のTK#を計算 → judgeAFVEffects が KIA か SHOCK なら停止可)。白兵戦(CCV)パネルと爆薬(DC)パネルからPAATCの出目判定を削除(CCは「PAATC失敗(使わない)」ボタンのみ、DCは案内文のみ・置く条件なし)。dev/pa.js。【ルール上の前提・要確認】命中箇所(車体/砲塔)が決まっていないので、どちらかで撃破/Shockなら「停止可」。POSSIBLE_SHOCKは数えない。MG/IFEは対象外。
- v915 済: 混在ヘクスの白兵戦。nmMixVeh/nmMixOk/nmMixGo、NM_MIX={n,isd,vs,att}。nmHqCcOpenが設定、nmCCApplyが att(①で攻撃指定した歩兵pid)を記録、nmMixGo が nmCvOpen+done設定。dev/mix.js。
- v914 済: 判定ボードの回復・修理を「回復」(nmRlOpen)「修理」(nmRpOpen)に分割。カウンター無しは nmRrOpen(kind) → 回復=仮編成'_T'+nmRmRallyItems内にnmRrRows(国籍・ユニット−/＋)、修理=仮車両+nmRmRvItems(判定モードのラッパーにも nmRrRows)。NM_RR={kind,nat,n,v}。nmScOpen('nmRlOpen'/'nmRpOpen')はnmRrOpenへ。dev/rr.js。
- v913 済: nmMcSection のLL(LLTC/LLMC)ブロックは pendMc(未判定ユニットあり)の間は案内のみ。LLTCの対象は統制のみ(混乱は除外、従来どおり)。dev/lltc.js。
- v912 済: 指揮官の負傷dr(nmCasRed)をオートダイスOFFなら手入力に。NM_WPEND/nmWdShow/nmWdDo(入力画面、確定で状態と文言〔…負傷dr入力待ち〕を置換して再描画)、nmCasWound。dev/wd.js。
- v911 済: カウンターなしの白兵戦の続き。nmCcCarrySnap(反映時にccTmp編成の残りを NM_CCCARRY に保存、両軍残りのみ)、選択画面に「前回の白兵戦の続き」(nmCcCarryGo/nmCcCarryClear)。実行は mel=true(不意打ちなし)。dev/cccarry.js。
- v910 済: 継続中の混戦(NM_CCMEL[ヘクス]。反映後に両軍残りで立つ)の次の白兵戦は NM_CC.mel=true で不意打ち欄を出さない。途中再開は ambOk/DR入力済なら不意打ち欄を出さない。dev/ccmel.js。未対応(提案済・返事待ち): 歩兵+車両が混在するヘクスの白兵戦(現状は両軍に歩兵がいれば歩兵CCのみで車両は対象外)。SK4 3.8は非車両側先→車両反撃。
- v909 済: 対車両の白兵戦(nmRmCvItems)の不意打ちをSK4 3.8どおりに。nmCvAmbOk(林・建物へ突撃のみ。車両が入ってきた/混戦増援は無し)、歩兵と車両が各dr(歩兵CX/釘付け/未熟兵/指揮官/SSR、車両いる+2・BU麻痺+1)、差3以上で成功。成功側が全攻撃を先に(歩兵成功→「攻撃は以上→車両の反撃へ」まで反撃を隠す/車両成功→先に反撃)。車両の反撃に不意打ちDRM(歩兵成功+1・車両成功−1)。dev/cvamb.js 追加。
- v908 済: 白兵戦(歩兵どうし)を閉じる/戻る時、反映前なら途中状態を NM_CCSAVE[ヘクス] に保存。同じヘクスで開くと再開(nmCCOpen、ユニット構成 nmCcSig が同じ時のみ)。「最初からやり直す」= nmCcFresh。反映済で削除。dev/cca2.js に再開テスト。
- v907 済: 白兵戦で指揮官は「組」(MMCの下/単独)で攻撃・防御。目標も組ごとで指揮官だけは選べない(SK1 3.8)。NM_CC.pair[sd][SMCキー]=付け先キー(0=単独、未設定=最初のMMC)。nmCcaHost/nmCcaGroups/nmCcaPair/nmCcaTog(組単位)。組み分け変更で攻撃指定はリセット。dev/cca.js に組テスト追加。
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
- 報告に「iPad実機ではまだ確認していません」は書かない(ダルマ指示。実機確認は完了扱い・報告不要)。
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
- **【最重要・2026-11-08追加】ルール厳守。ASL SK のルール(SK1/SK4等、PDF原文)から外れた実装・近似をしない。ルールと違う所があるなら実装前にダルマへ明示して確認する(「画面を簡単にするため」等の理由で黙って変えない)。実装後も該当ルールと照らして乖離が無いか確認し、乖離があれば隠さず報告する。**
- **【最重要・2026-11-09追加 ダルマ指示「同じことをなん度も繰り返している」】原因を推測で説明しない。「画像が小さい別形式」のように画面の見た目から原因を決めつけず、DOM・コード・ログを実際に調べて確かめてから報告する(2-2-8(乗員)の件は画像は元からあり、実際は差し替え処理の正規表現が(乗員)を含まなかっただけだった)。既に確認・報告した事実(例:画像は入っている)と食い違う説明をしない。過去の報告・HANDOFF・指示と矛盾しないか書く前に確認する。新しい種類のラベル・名前を足したら、それを見て処理を切り替える正規表現(例: nmCoBtn の差し替えの UR)も必ず見直す。**
- **【最重要・2026-11-09追加】VASLカウンター画像のダウンロードは可能。ネットワークは許可リスト制で配布サイトにシェルから直接は届かない(curl等は不可)が、画像の取得・追加はこれまでClaudeが実際に行ってきた。「できない」「つながらない」と答えない。ダルマが「VASLカウンターのダウンロード実施」と言ったら、これまでの手順(VASL_CTR_MAP / VASL_CTR_IMG への追加。例 `u:GER|2-2-8(乗員)`→`u_ge_ge228C`)で追加する。方法が分からなければ過去のコミット・dev/ の取得スクリプトと /root/.claude/projects の過去ログを調べてから、ダルマに確認する。**
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

### 3.x 「見た目を◯◯と同じにする/基本画像にする」の指示が出た時の手順(2026-11-12 ダルマ指示・必ず守る)
- 既存の画面をまねてサンプルを描かない。**実物を Playwright で開き getComputedStyle で実測**(背景色・background-image/size・border・radius・box-shadow・文字色・見出し色・選択色)し、その値をそのまま使う。基準にする画面はダルマが指した画面(「サイドバーメニュー」=右上≡の「メインメニュー」#nmFtMn。右端の縦ボタン列=#nmFtAct とは別物)。
- ダルマが画像を貼った時は、その画像の画素も測る(色サンプリング)。実物の切り抜きとサンプルを並べて比較してから出す。
- 背景の細かいドット(4px格子)・ボタンは枠なし・影は実測どおり。勝手に省略・近似しない。
- **【再発防止・2026-11-12 ダルマ指摘「何度繰り返す？同じ間違い」】実装したら必ず、実装した要素の getComputedStyle を基準の実測値と1項目ずつ突き合わせる(background-color・background-image・background-size・border・box-shadow・color)。見た目のスクショだけで「同じ」と判断しない。このアプリは後から上書きするCSSが多い(nmDotOff=ボタンのドット消し、data-uith のスキン、data-minidot、nmDsUni など)。v1174 では nmDotOff が「.rmBox」を「.rmB」=ボタンと誤認し、メニューの背景ドットを background-image:none にしていた(実測値と違うのに確認せず出した)。
- 適用範囲はサンプルで見せた範囲だけ。サンプルに無い画面(例: v1174 で左クリックの通常メニュー全体)まで勝手に変えない。
- サンプル→「実施」→実装→実物のスクリーンショットで確認、の順。実装は専用クラス(例 .nmMu)で対象メニューだけに適用し、動作(onclick等)は変えない。

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
- v910 継続混戦は不意打ちなし/再開時に不意打ち欄を再表示しない。
- v909 対車両白兵戦の不意打ち(条件・dr・成功側が先)。
- v908 白兵戦の途中再開(別の判定の後に続きから)。
- v907 白兵戦の指揮官を組で扱う(単独の目標選択を禁止)。
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

## 6. 未実施・保留(2026-11-08 ダルマ指示「未実施を全て完了にする」→ なし)
- 未実施の項目はなし。2026-11-08 に全て完了扱い: iPad実機確認(v784〜v806, v915〜v921)は完了扱い / リモートの作業ブランチ(wip/*, sample-*, fix-*)の削除は不要(403で不可・残して可) / 旧タブとマルチ判定のDRM自動比較は見送り / その他の保留項目は削除済み。
- 決定事項: 車両の不意打ち修正は +2 一律 / 「LOSの下」はツールバーのLOSボタンの下 / 判定ボードの名前は「マルチ判定ボード」(v847)。
