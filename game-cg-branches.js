// 分岐の中にある一枚絵の解放（docs/cg-staging.md）。固定キットは変えず、作品側で補う。
// キットは「本文の並び順で、表示中の行より手前にある一枚絵」をすべて解放するので、5-26 の田原・小宮の分岐では、
// 選ばなかった側の一枚絵まで解放してしまう。分岐の場面の中にある一枚絵だけは、その区間を実際に表示したとき
// （表示中の行が区間の中にあるか、区間の最初の行を既読にしたとき）に限って解放する。ほかの一枚絵はキットのまま。
(function () {
  'use strict';
  var kit = window.KIT, game = window.KIT_GAME, V = window.KitValidate;
  if (!kit || !game || !V || typeof kit.unlockCg !== 'function') return;
  var BRANCH_CGS = ['c26a-tahara-daydream-home', 'c26b-komiya-daydream-hand'];
  var lines = {};
  Object.keys(game.scenes).forEach(function (key) {
    game.scenes[key].lines.forEach(function (line) { lines[line.id] = line; });
  });
  var startLine = {};
  (game.cues || []).forEach(function (cue) {
    if (cue.cg && BRANCH_CGS.indexOf(cue.cg.id) >= 0) startLine[cue.cg.id] = lines[cue.at];
  });
  var original = kit.unlockCg;
  kit.unlockCg = function (id) {
    if (BRANCH_CGS.indexOf(id) >= 0) {
      var shown = !!kit.s.lineId && V.stateAt(game, kit.s.lineId).cg === id;
      var line = startLine[id];
      var seen = !!line && kit.s.seen.has(line.id + '#' + V.hashLine(line));
      if (!shown && !seen) return;
    }
    return original.apply(this, arguments);
  };
})();
