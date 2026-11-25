// 画像の切り替え（docs/ui-frame.md）。固定キットは変えず、作品側で表示の更新だけを差し替える。
// キットは行が変わるたびに、背景の URL・一枚絵の src を新しい画像へ即座に書き換え、立ち絵はいったん消して作り直す。
// 新しい画像の読み込みが終わるまでその部分が空になり、下地の黒（背景・一枚絵）や人物のいない画面が一瞬見える。
// ここでは、次の状態で使う画像（背景・左右の立ち絵・一枚絵）をすべて裏で読み込んでデコードし、揃ってから一度に切り替える。
// それまでは現在の画像を残す。黒へ落とすフェードは入れない。
// ・後から始まった切り替えがあれば、前の切り替えは捨てる（高速送り・既読SKIP で古い画像が後から出ない）。
// ・読み込みに失敗した画像は、その部分だけ現在の画像を残し、window.KIT_STAGE.errors と console.warn に記録する。本文の進行は止めない。
// ・タイトルへ戻るとき（状態なし）は、キットのまま消す。
(function () {
  'use strict';
  var kit = window.KIT, game = window.KIT_GAME;
  if (!kit || !game || typeof kit.updateFromState !== 'function' || typeof kit.renderPortrait !== 'function') return;

  var stage = window.KIT_STAGE = { errors: [], pending: 0, applied: null, seq: 0 };
  var ready = Object.create(null); // url → true（デコード済み）
  var loading = Object.create(null); // url → Promise
  var keep = []; // デコード済みの画像をメモリに留める

  function preload(url) {
    if (ready[url]) return Promise.resolve(true);
    if (loading[url]) return loading[url];
    var img = new Image();
    var p = new Promise(function (resolve) {
      var done = function (ok) {
        delete loading[url];
        if (ok) { ready[url] = true; keep.push(img); }
        resolve(ok);
      };
      img.onload = function () {
        if (typeof img.decode === 'function') img.decode().then(function () { done(true); }, function () { done(img.naturalWidth > 0); });
        else done(true);
      };
      img.onerror = function () { done(false); };
    });
    loading[url] = p;
    img.src = url;
    return p;
  }

  function bgUrl(st) { return st && st.bg ? game.assets.backgrounds[st.bg] : null; }
  function cgUrl(st) { return st && st.cg ? game.assets.cgs[st.cg].src : null; }
  function portraitUrl(p) { return p ? game.assets.portraits[p.char][p.expr] : null; }

  // 失敗した画像の部分だけ、現在表示している状態に戻した状態を作る
  function withFallback(st, failed, prev) {
    if (!failed.length) return st;
    var out = Object.assign({}, st, { portraits: Object.assign({}, st.portraits) });
    var bad = function (u) { return u && failed.indexOf(u) >= 0; };
    if (bad(bgUrl(st))) out.bg = prev ? prev.bg : null;
    if (bad(cgUrl(st))) out.cg = prev ? prev.cg : null;
    ['left', 'right'].forEach(function (slot) {
      if (bad(portraitUrl(st.portraits[slot]))) out.portraits[slot] = prev ? prev.portraits[slot] : null;
    });
    return out;
  }

  var originalUpdate = kit.updateFromState;
  kit.updateFromState = function (st) {
    var my = ++stage.seq;
    if (!st) {
      stage.pending = 0;
      stage.applied = null;
      return originalUpdate.call(kit, st);
    }
    var urls = [bgUrl(st), cgUrl(st), portraitUrl(st.portraits.left), portraitUrl(st.portraits.right)].filter(Boolean);
    var apply = function (failed) {
      if (my !== stage.seq) return; // 後から始まった切り替えがある
      stage.pending = 0;
      var next = withFallback(st, failed, stage.applied);
      stage.applied = next;
      originalUpdate.call(kit, next);
      kit.s.cg = st.cg; // 進行上の状態は、表示の成否にかかわらず行のとおり
    };
    if (urls.every(function (u) { return ready[u]; })) return apply([]);
    stage.pending = my;
    kit.s.cg = st.cg;
    Promise.all(urls.map(function (u) { return preload(u).then(function (ok) { return ok ? null : u; }); })).then(function (res) {
      var failed = res.filter(Boolean);
      failed.forEach(function (u) {
        if (my !== stage.seq) return;
        stage.errors.push(u);
        console.warn('[画像の読み込みに失敗] ' + u + '（現在の画像を残します）');
      });
      apply(failed);
    });
  };

  // 立ち絵：同じ画像のままなら作り直さない（消してから付け直すと、一瞬人物が消える）
  var originalPortrait = kit.renderPortrait;
  kit.renderPortrait = function (node, p) {
    var cur = node.querySelector('img');
    var url = portraitUrl(p);
    if (cur && url && cur.getAttribute('src') === url && node.children.length === 1) return;
    return originalPortrait.call(kit, node, p);
  };

  // 表示中の画像は、読み込み済みとして扱う（最初の表示やつづきからの直後）
  stage.isReady = function (url) { return !!ready[url]; };
})();
