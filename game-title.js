// タイトル画面（docs/title-and-inserts.md）。固定キットは変えず、作品側で題名とメニューの並びだけを整える。
// ・題名は「きみのための」「甲子園」の2行で表示する（題名の文字列そのものは変えない）。
// ・メニューのボタンと保存のお知らせは、右下の縦並びの箱へ移す（ボタン自体と機能はキットのまま）。
(function () {
  'use strict';
  var kit = window.KIT;
  if (!kit || !kit.ui || !kit.ui.title) return;
  var title = kit.ui.title;
  var h1 = title.querySelector('h1');
  if (h1 && h1.textContent === 'きみのための甲子園') {
    h1.textContent = '';
    h1.className = 'game-title';
    var sub = document.createElement('span'); sub.className = 'game-title-sub'; sub.textContent = 'きみのための';
    var main = document.createElement('span'); main.className = 'game-title-main'; main.textContent = '甲子園';
    h1.append(sub, main);
    h1.setAttribute('aria-label', 'きみのための甲子園');
  }
  var menu = document.createElement('div');
  menu.className = 'game-title-menu';
  [].slice.call(title.children).forEach(function (el) { if (el !== h1) menu.appendChild(el); });
  title.appendChild(menu);
})();
