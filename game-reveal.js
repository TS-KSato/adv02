// 一枚絵の導入で、最初に本文枠を隠して絵を見せる（docs/ui-frame.md、docs/cg-staging.md）。第5便の試作。
// 固定キットは変えず、作品側でキットの showLine・next・goLine などを包む。対象は次の3行だけ（ほかの一枚絵には適用しない）。
//   c20-004（美空の涙）、c29h-012（野原から見た美空の笑み）、c35-019（美空の満面の笑み）
// 通常送り：一枚絵の読み込みとデコードが済んで画面に出たら、本文枠（話者名・本文・「タップで進む」）と場面名の札を隠す。
//   次のタップ・送りキーで、同じ行の本文枠を戻して文字の表示を始める（その入力では次の行へ進まない）。強制の待ち時間はない。
//   本文枠を隠している間は、本文を表示せず、既読にもしない（キットの文字表示は、本文枠を戻したときに始める）。
// AUTO：絵が出てから約1秒後に本文枠を戻し、そのあとは既存の文字表示と AUTO の待ち時間。読み込みの時間はこの1秒に含めない。
// 既読SKIP：既読の対象行では、絵だけを見る一拍を省く。未読で止まったときは通常の送りと同じ。
// 保存からの再開（キットの jump・instant）では一拍を省き、本文枠が見える状態で始める。永続の状態は持たない。
// 本文枠は visibility で隠すだけなので、位置・大きさ・不透明度、操作ボタンの配置は変わらない。
(function () {
  'use strict';
  var kit = window.KIT, game = window.KIT_GAME, V = window.KitValidate, stage = window.KIT_STAGE;
  if (!kit || !game || !V || typeof kit.showLine !== 'function' || typeof kit.next !== 'function' || typeof kit.goLine !== 'function') return;

  var REVEAL = { 'c20-004': 'c20-misora-tears', 'c29h-012': 'c29h-misora-shadowed-smile', 'c35-019': 'c35-misora-full-smile' };
  var AUTO_DELAY = 1000; // 絵が出てから本文枠を戻すまで（AUTO のとき）
  var WAIT_LIMIT = 10000; // 絵の準備がこれより長くかかったら、一拍を省いて本文を出す（進行不能にしない）

  // phase：'none'｜'waiting'（一枚絵の準備待ち。前の画面のまま。入力は受けない）｜'hidden'（本文枠を隠して絵を見せている）
  var r = window.GAME_REVEAL = { phase: 'none', lineId: null, pending: null, timer: 0, raf: 0, since: 0, shown: 0, targets: Object.keys(REVEAL) };
  var play = kit.ui.play;

  var originalShowLine = kit.showLine;
  var originalNext = kit.next;
  var originalGoLine = kit.goLine;
  var originalShowTitle = kit.showTitle;
  var originalToggleAuto = kit.toggleAuto;
  var originalStopTimers = kit.stopTimers;

  function seenKey(line) { return line.id + '#' + V.hashLine(line); }
  function cgUrl(id) { return game.assets.cgs[id].src; }
  function setHidden(on) { play.classList.toggle('game-reveal-hidden', on); }

  function cancel() {
    clearTimeout(r.timer);
    cancelAnimationFrame(r.raf);
    r.timer = 0; r.raf = 0;
    r.phase = 'none'; r.lineId = null; r.pending = null;
    setHidden(false);
  }

  // 本文枠を戻し、同じ行の本文表示を始める（キットの showLine：文字表示・既読・AUTO の待ち時間）
  function finish() {
    if (r.phase === 'none') return;
    var p = r.pending;
    cancel();
    if (p) originalShowLine.call(kit, p.e, p.opts);
  }

  function armAuto() {
    clearTimeout(r.timer);
    r.timer = 0;
    if (r.phase === 'hidden' && kit.s.auto_on) r.timer = setTimeout(finish, AUTO_DELAY);
  }

  // 一枚絵が画面に出たら本文枠を隠す。読み込みに失敗したら、一拍を省いて本文を出す
  function watch() {
    var tick = function () {
      if (r.phase !== 'waiting') return;
      var cg = kit.ui.cg;
      var url = cgUrl(r.pending.cg);
      var busy = !!(stage && stage.pending);
      if (!busy && !cg.hidden && cg.getAttribute('src') === url && cg.complete && cg.naturalWidth > 0) {
        r.phase = 'hidden';
        r.shown = performance.now();
        setHidden(true);
        armAuto();
        return;
      }
      if ((!busy && (cg.hidden || cg.getAttribute('src') !== url)) || performance.now() - r.since > WAIT_LIMIT) { finish(); return; }
      r.raf = requestAnimationFrame(tick);
    };
    r.raf = requestAnimationFrame(tick);
  }

  kit.showLine = function (e, opts) {
    cancel();
    opts = opts || {};
    var id = e.line.id;
    var cgId = REVEAL[id];
    var skipping = this.s.skip_on && this.s.seen.has(seenKey(e.line));
    if (!cgId || opts.jump || opts.instant || skipping || V.stateAt(game, id).cg !== cgId) return originalShowLine.call(this, e, opts);
    if (this.s.skip_on) this.stopSkip(); // 未読で止まる：通常の送りと同じ扱い
    this.ui.page.textContent = (e.index + 1) + ' / ' + game.scenes[e.scene].lines.length;
    r.pending = { e: e, opts: opts, cg: cgId };
    r.lineId = id;
    r.phase = 'waiting';
    r.since = performance.now();
    watch();
  };

  // 本文枠を隠している間の送りは、同じ行の本文枠を戻すだけ（次の行へ進まない）。準備待ちの間は受けない
  kit.next = function () {
    if (r.phase === 'hidden') {
      if (this.s.screen === 'play' && !this.s.rotated && !this.isModalOpen()) finish();
      return;
    }
    if (r.phase === 'waiting') return;
    return originalNext.apply(this, arguments);
  };

  // 行の移動・タイトルへの移動では、隠した状態とタイマーを残さない
  kit.goLine = function () { cancel(); return originalGoLine.apply(this, arguments); };
  kit.showTitle = function () { cancel(); return originalShowTitle.apply(this, arguments); };
  // AUTO の切り替え：入れたら約1秒後に戻す、切ったらタイマーを取り消す（隠れたままでもタップで戻せる）
  kit.toggleAuto = function () { var out = originalToggleAuto.apply(this, arguments); armAuto(); return out; };
  // 画面の回転・選択肢などでキットがタイマーを止めるときは、こちらのタイマーも止める
  kit.stopTimers = function () { clearTimeout(r.timer); r.timer = 0; return originalStopTimers.apply(this, arguments); };

  // 本文枠を隠している間は、画面の絵のどこをタップしても本文枠を戻す（操作ボタン・選択肢・モーダルは除く）
  kit.host.addEventListener('click', function (ev) {
    if (r.phase !== 'hidden') return;
    var t = ev.target;
    if (t && t.closest && t.closest('.kit-bar, .kit-modal, .kit-choices, .kit-title')) return;
    kit.next();
  });
})();
