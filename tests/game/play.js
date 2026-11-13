// 『きみのための甲子園』の冒頭から「剛の目撃」までの試験（ブラウザ）。
// 公開先と同じ /adv02/ の下から配信し、クリックとキーだけで動かして確かめる。
// 本文は作品データ（game.js）から読み、画面の DOM と照らす。API で行位置を飛ばして合格にはしない。
// 文字の表示速度を 0 にするのは、一行ずつの確認を速くするための試験の設定だけ（行の進みはクリックで行う）。
// GAME_SHOTS に保存先のフォルダを指定すると、画面キャプチャを残す（任意）。
'use strict';
const fs = require('fs');
const path = require('path');
const { check, section, summary } = require('../lib/check');
const { serve } = require('../lib/serve');
const { launch } = require('../lib/launch');

const ROOT = path.join(__dirname, '..', '..');
const PREFIX = '/adv02';
const SAVE_KEY = 'kit:novelgame02-koshien:v1';
const SHOT_DIR = process.env.GAME_SHOTS || '';

const LANDSCAPE = { width: 844, height: 390 };
const DESKTOP = { width: 1280, height: 720 };
const SMALL_LANDSCAPE = { width: 667, height: 375 };
const PORTRAIT = { width: 390, height: 844 };

const G = (() => {
  const w = {};
  new Function('window', fs.readFileSync(path.join(ROOT, 'game.js'), 'utf8'))(w);
  return w.KIT_GAME;
})();
const LINES = G.scenes['opening-ground'].lines;
const LAST = LINES.length - 1;
const expectOf = (i) => {
  const l = LINES[i];
  return { id: l.id, speaker: l.speaker ? G.speakers[l.speaker] : '', text: l.text, page: (i + 1) + ' / ' + LINES.length };
};

const ERRORS = []; // ページの例外・console error・HTTP 4xx/5xx・公開先の外への参照
const OK_URLS = new Set(); // 200 で読み込めた URL
let BASE = ''; // http://127.0.0.1:<port>/adv02/

// ----- 画面の読み取り（DOM と KIT の状態。操作はしない） -----
const show = (page) => page.evaluate(() => {
  const sp = document.querySelector('.kit-speaker');
  return {
    screen: KIT.s.screen,
    lineId: KIT.s.lineId,
    scene: KIT.s.scene,
    speaker: sp.hidden ? '' : sp.textContent,
    prose: document.querySelector('.kit-prose').textContent,
    page: document.querySelector('.kit-page').textContent,
    bg: document.querySelector('.kit-bg').style.backgroundImage,
    choices: KIT.s.choicesVisible,
    skip: KIT.s.skip_on,
    auto: KIT.s.auto_on,
    rotated: KIT.s.rotated,
  };
});

// 見切れ：本文・話者・ボタンが画面の内側に収まり、横スクロールが出ていないか
const layout = (page) => page.evaluate(() => {
  const inside = (b) => b.left >= -0.5 && b.top >= -0.5 && b.right <= innerWidth + 0.5 && b.bottom <= innerHeight + 0.5;
  const d = document.querySelector('.kit-dialogue');
  const p = document.querySelector('.kit-prose');
  const sp = document.querySelector('.kit-speaker');
  const box = d.getBoundingClientRect();
  const pr = p.getBoundingClientRect();
  return {
    noHScroll: document.documentElement.scrollWidth <= innerWidth,
    dialogueInside: inside(box),
    proseInside: inside(pr) && pr.bottom <= box.bottom + 0.5,
    speakerInside: sp.hidden || inside(sp.getBoundingClientRect()),
    dialogueFits: d.scrollHeight <= d.clientHeight + 1 && d.scrollWidth <= d.clientWidth + 1,
  };
});
const fits = (f) => f.noHScroll && f.dialogueInside && f.proseInside && f.speakerInside && f.dialogueFits;

// ----- 操作（実際のクリック・キー） -----
const advance = (page) => page.click('.kit-dialogue');
const clickText = (page, name) => page.getByRole('button', { name, exact: true }).click();
const waitFull = (page, text) => page.waitForFunction((t) => document.querySelector('.kit-prose').textContent === t, text, { timeout: 8000 });
const snap = async (page, name) => {
  if (!SHOT_DIR) return;
  fs.mkdirSync(SHOT_DIR, { recursive: true });
  await page.screenshot({ path: path.join(SHOT_DIR, name + '.png') });
};

async function openGame(ctx, { speedZero = false } = {}) {
  const page = await ctx.newPage();
  page.on('dialog', (d) => d.accept());
  page.on('pageerror', (e) => ERRORS.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') ERRORS.push('console: ' + m.text()); });
  page.on('response', (r) => {
    if (r.status() >= 400) ERRORS.push('HTTP ' + r.status() + ' ' + r.url());
    else OK_URLS.add(r.url());
  });
  page.on('request', (r) => {
    const u = r.url();
    if (!u.startsWith(BASE) && !u.startsWith('data:')) ERRORS.push('公開先の外への参照: ' + u);
  });
  await page.goto(BASE + 'index.html');
  await page.waitForFunction(() => window.KIT && window.KIT.s);
  if (speedZero) await page.evaluate(() => { KIT.s.speed = 0; });
  return page;
}

// 最初から最後まで、一行ずつ本文・話者・行位置を確かめながら読む（文字は通常の速さで流れる）
async function playthrough(ctx, label, viewport, withShots) {
  const page = await openGame(ctx);
  section(label + '：タイトルから冒頭一場面を、クリックだけで最後まで読む');
  check(label + '：タイトルに作品名が出る', (await page.textContent('.kit-title h1')) === G.title);
  check(label + '：ブラウザのタイトルが作品名', (await page.title()) === G.title, await page.title());
  check(label + '：保存がない最初は「つづきから」が押せない', await page.getByRole('button', { name: 'つづきから', exact: true }).isDisabled());
  await clickText(page, 'はじめから');

  let linesOk = true;
  let fitsOk = true;
  const details = [];
  for (let i = 0; i <= LAST; i++) {
    const want = expectOf(i);
    await waitFull(page, want.text);
    const s = await show(page);
    const ok = s.lineId === want.id && s.scene === 'opening-ground' && s.speaker === want.speaker && s.prose === want.text && s.page === want.page;
    if (!ok) { linesOk = false; details.push(want.id + ' ' + JSON.stringify(s)); }
    const f = await layout(page);
    if (!fits(f)) { fitsOk = false; details.push(want.id + ' 見切れ ' + JSON.stringify(f)); }
    if (withShots && (i === 0 || i === 14 || i === LAST)) await snap(page, 'play-' + viewport.width + 'x' + viewport.height + '-' + want.id);
    if (i < LAST) await advance(page);
  }
  check(label + '：23 行すべてで、行ID・話者・本文・行位置が docs と一致', linesOk, details.slice(0, 3).join(' | '));
  check(label + '：23 行すべてで、見切れ・横スクロールがない', fitsOk, details.slice(0, 3).join(' | '));

  await advance(page);
  await waitFull(page, G.scenes['practice-start'].lines[0].text);
  check(label + '：二十三行のあとに放課後の練習へ進む', (await show(page)).lineId === 'c02-001');
  return page;
}

// 既読SKIPは冒頭から放課後へ進み、未読の行では止まる
async function skipIntoPractice(page) {
  section('既読SKIP：冒頭を越え、練習の未読行で止まる');
  await clickText(page, 'タイトル');
  await clickText(page, 'はじめから');
  await clickText(page, '既読SKIP');
  await page.waitForFunction(() => KIT.s.lineId === 'c02-002' && !KIT.s.skip_on, null, { timeout: 20000 });
  const s = await show(page);
  check('冒頭から既読の続きへ進み、最初の未読行で止まる', s.scene === 'practice-start' && s.lineId === 'c02-002' && !s.skip);
}

async function practicePlaythrough(browser, choiceIndex) {
  const ctx = await browser.newContext({ viewport: SMALL_LANDSCAPE });
  try {
    const page = await openGame(ctx, { speedZero: true });
    await clickText(page, 'はじめから');
    const start = G.scenes['practice-start'];
    for (let i = 0; i < LINES.length; i++) await advance(page);
    const choice = start.choices[choiceIndex];
    section('最初の選択肢：' + choice.text);
    async function readScene(sceneKey, { reloadAfterFirst = false } = {}) {
      const lines = G.scenes[sceneKey].lines;
      const issues = [];
      for (const [index, line] of lines.entries()) {
        const s = await show(page);
        const speaker = line.speaker ? G.speakers[line.speaker] : '';
        if (s.scene !== sceneKey || s.lineId !== line.id || s.prose !== line.text || s.speaker !== speaker) issues.push(line.id + ' 本文');
        if (!fits(await layout(page))) issues.push(line.id + ' 見切れ');
        if (reloadAfterFirst && index === 0) {
          await page.reload();
          await page.waitForFunction(() => window.KIT && window.KIT.s);
          await clickText(page, 'つづきから');
          const back = await show(page);
          check('選んだ練習の途中でリロードして同じ行に戻る', back.scene === sceneKey && back.lineId === line.id && back.prose === line.text);
        }
        await advance(page);
      }
      check(sceneKey + ' の本文・話者が正しく表示され、横向き 667×375 で収まる', issues.length === 0, issues.slice(0, 4).join(' | '));
    }
    await readScene('practice-start');
    check('内野と外野の二つの選択肢が表示される', await page.getByRole('button', { name: start.choices[0].text, exact: true }).isVisible() && await page.getByRole('button', { name: start.choices[1].text, exact: true }).isVisible());
    await clickText(page, choice.text);
    await readScene(choice.to, { reloadAfterFirst: choiceIndex === 0 });
    await readScene('practice-end');
    await readScene('scorer-first');
    await readScene('coach-arrival');
    await readScene('marriage-start');
    const marriageChoices = G.scenes['marriage-start'].choices;
    check('大山と先輩の二つの選択肢が表示される', await page.getByRole('button', { name: marriageChoices[0].text, exact: true }).isVisible() && await page.getByRole('button', { name: marriageChoices[1].text, exact: true }).isVisible());
    const marriageChoice = marriageChoices[choiceIndex];
    await clickText(page, marriageChoice.text);
    await readScene(marriageChoice.to);
    await readScene('marriage-end');
    await readScene('after-ten-more');
    await readScene('coaching-start');
    const coachingChoices = G.scenes['coaching-start'].choices;
    check('指示を聞くか資料を見返すか選べる', await page.getByRole('button', { name: coachingChoices[0].text, exact: true }).isVisible() && await page.getByRole('button', { name: coachingChoices[1].text, exact: true }).isVisible());
    const coachingChoice = coachingChoices[choiceIndex];
    await clickText(page, coachingChoice.text);
    await readScene(coachingChoice.to);
    await readScene('coaching-end');
    await readScene('fifty-laps');
    await readScene('convenient-scorer');
    await readScene('desk-corner');
    await readScene('hiyori-start');
    const hiyoriChoices = G.scenes['hiyori-start'].choices;
    check('飲み物か用具の片づけを選べる', await page.getByRole('button', { name: hiyoriChoices[0].text, exact: true }).isVisible() && await page.getByRole('button', { name: hiyoriChoices[1].text, exact: true }).isVisible());
    const hiyoriChoice = hiyoriChoices[choiceIndex];
    await clickText(page, hiyoriChoice.text);
    await readScene(hiyoriChoice.to);
    await readScene('hiyori-end');
    await readScene('kawamoto-visit');
    await readScene('testimony-start');
    await readScene('testimony-memory');
    await readScene('testimony-present');
    const testimonyChoices = G.scenes['testimony-present'].choices;
    check('回想のあと、平野と大山のどちらの反応を見るか選べる', await page.getByRole('button', { name: testimonyChoices[0].text, exact: true }).isVisible() && await page.getByRole('button', { name: testimonyChoices[1].text, exact: true }).isVisible());
    const testimonyChoice = testimonyChoices[choiceIndex];
    await clickText(page, testimonyChoice.text);
    await readScene(testimonyChoice.to);
    await readScene('testimony-end');
    await readScene('kawamoto-results');
    await readScene('shinjo-first-meeting');
    await readScene('summer-roster');
    await readScene('regional-quarterfinal');
    await readScene('sasaki-called');
    await readScene('sasaki-home-run');
    await readScene('newspaper-and-scorebook');
    await readScene('what-her-face-means');
    await readScene('oyama-injury');
    await readScene('ryusei-defeat');
    await readScene('tears-after-the-final');
    await readScene('blank-line');
    await readScene('oyama-return');
    await readScene('nakata-handover');
    await readScene('gen-reads-the-records');
    await readScene('tsuyoshi-sighting');
    const sightingChoice = G.scenes['tsuyoshi-sighting'].choices[choiceIndex];
    await clickText(page, sightingChoice.text);
    await readScene(sightingChoice.to);
    await readScene('tsuyoshi-end');
    await page.waitForFunction(() => KIT.s.screen === 'title', null, { timeout: 5000 });
    check('「剛の目撃」を読み終えるとタイトルへ戻る', (await show(page)).screen === 'title');
    check('試遊を読み終えると自動保存位置が消える', (await page.evaluate(k => JSON.parse(localStorage.getItem(k)), SAVE_KEY)).auto === null);
  } finally {
    await ctx.close();
  }
}

// 文字の流れ中の一回目のクリックは全文を出し、行は進まない。次のクリックで進む。キーでも進む。
async function clickAndKey(browser) {
  const ctx = await browser.newContext({ viewport: LANDSCAPE });
  section('入力：クリックは全文表示、キーは Space・Enter で進む');
  const page = await openGame(ctx);
  await clickText(page, 'はじめから');
  await page.click('.kit-dialogue');
  const first = await show(page);
  check('文字の流れ中の一回目のクリックで、全文が出る（行は進まない）', first.lineId === 'c01-001' && first.prose === LINES[0].text, JSON.stringify(first));
  await page.click('.kit-dialogue');
  check('次のクリックで二行目へ進む', (await show(page)).lineId === 'c01-002');
  await waitFull(page, LINES[1].text);
  await page.keyboard.press('Space');
  check('Space で三行目へ進む', (await show(page)).lineId === 'c01-003');
  await waitFull(page, LINES[2].text);
  await page.keyboard.press('Enter');
  check('Enter で四行目へ進む', (await show(page)).lineId === 'c01-004');
  await ctx.close();
}

// AUTO は次の行へ自分で進み、停止を押すと止まる（選択肢はない行なので、ここでは停止の確認のみ）
async function autoStartStop(browser) {
  const ctx = await browser.newContext({ viewport: LANDSCAPE });
  section('AUTO：開始で進み、停止で止まる');
  const page = await openGame(ctx);
  await clickText(page, 'はじめから');
  await clickText(page, 'AUTO');
  await page.waitForFunction(() => KIT.s.lineId === 'c01-002', null, { timeout: 12000 }).catch(() => {});
  check('AUTO を押すと、次の行へ自分で進む', (await show(page)).lineId === 'c01-002', JSON.stringify(await show(page)));
  check('AUTO の表示は「入」', (await show(page)).auto === true);
  await clickText(page, 'AUTO');
  const stopped = (await show(page)).lineId;
  await page.waitForTimeout(4000);
  const later = await show(page);
  check('AUTO を止めると、行は進まない', later.lineId === stopped && later.auto === false, stopped + ' → ' + later.lineId);
  await ctx.close();
}

// 既読SKIP：未読の行では止まる。読んだ行は飛ばし、最初の未読の行で止まる。
async function skipUnreadAndRead(browser) {
  section('既読SKIP：未読で止まる・既読を飛ばして未読で止まる');
  const ctx = await browser.newContext({ viewport: LANDSCAPE });
  const page = await openGame(ctx);
  await clickText(page, 'はじめから');
  await clickText(page, '既読SKIP');
  await page.waitForTimeout(1200);
  const s1 = await show(page);
  check('未読の一行目では既読SKIPが進まず止まる', s1.lineId === 'c01-001' && !s1.skip, JSON.stringify(s1));

  // 一行目から五行目までを読んで既読にする（文字の速さ 0 は、確認の速さのための試験の設定）
  await page.evaluate(() => { KIT.s.speed = 0; });
  await clickText(page, 'タイトル');
  await clickText(page, 'はじめから');
  for (let i = 0; i < 4; i++) await advance(page);
  check('一行目から五行目まで既読になった（c01-005 にいる）', (await show(page)).lineId === 'c01-005');
  await clickText(page, 'タイトル');
  await clickText(page, 'はじめから');
  await clickText(page, '既読SKIP');
  await page.waitForFunction(() => KIT.s.lineId === 'c01-006' && !KIT.s.skip_on, null, { timeout: 10000 }).catch(() => {});
  const s2 = await show(page);
  check('既読の五行を飛ばし、未読の六行目（c01-006）で止まる', s2.lineId === 'c01-006' && !s2.skip, JSON.stringify(s2));
  await ctx.close();
}

// 手動セーブと、途中の行でのリロード・つづきから。読込は、進めた後の別の行から戻す。
async function resumeAndManualSave(browser) {
  const ctx = await browser.newContext({ viewport: LANDSCAPE });
  const page = await openGame(ctx, { speedZero: true });
  section('途中の行でリロードし、つづきから（話者あり・背景あり）');
  await clickText(page, 'はじめから');
  for (let i = 0; i < 14; i++) await advance(page);
  const mid = await show(page);
  check('十五行目（c01-015）に来た（平野の話す行）', mid.lineId === 'c01-015' && mid.speaker === '平野', JSON.stringify(mid));
  await page.reload();
  await page.waitForFunction(() => window.KIT && window.KIT.s);
  check('リロード後、「つづきから」が押せる', !(await page.getByRole('button', { name: 'つづきから', exact: true }).isDisabled()));
  await clickText(page, 'つづきから');
  await page.waitForFunction(() => KIT.s.screen === 'play', null, { timeout: 5000 });
  const back = await show(page);
  check('つづきからで同じ行（c01-015）・話者（平野）・本文へ戻る', back.lineId === 'c01-015' && back.speaker === '平野' && back.prose === LINES[14].text && back.page === '15 / 23', JSON.stringify(back));
  check('背景も戻る（仮背景）', back.bg.includes('field-morning-temp.png'), back.bg);
  check('つづきから の通知が出る', (await page.textContent('.kit-toast')).includes('つづきから再開しました'));

  section('手動セーブ：別の行へ進んでから、読込で戻る');
  await clickText(page, 'セーブ');
  await page.getByRole('button', { name: '保存', exact: true }).first().click();
  await page.waitForFunction(() => KIT.s.slots[0] !== null);
  const slotText = await page.textContent('.kit-modal-body');
  check('一枠目に、春のグラウンドの十五行目として保存される', slotText.includes('春のグラウンド（15行目）'), slotText.slice(0, 80));
  await clickText(page, '閉じる');
  for (let i = 0; i < 3; i++) await advance(page);
  check('保存の後、十八行目（c01-018）まで進んだ', (await show(page)).lineId === 'c01-018');
  await clickText(page, 'タイトル');
  await page.waitForFunction(() => KIT.s.screen === 'title');
  await clickText(page, 'セーブ・読込');
  await page.getByRole('button', { name: '読込', exact: true }).first().click();
  await page.waitForFunction(() => KIT.s.screen === 'play', null, { timeout: 5000 });
  const loaded = await show(page);
  check('読込で十五行目（c01-015）へ戻り、話者・本文が一致する', loaded.lineId === 'c01-015' && loaded.speaker === '平野' && loaded.prose === LINES[14].text, JSON.stringify(loaded));
  await ctx.close();
}

// 同じオリジンにある、ほかの作品（想定）の保存を置いても、新作は読まず、書き換えない
async function separation(browser) {
  const ctx = await browser.newContext({ viewport: LANDSCAPE });
  section('保存の分離：同じ場所の別の保存を読まず、書き換えない');
  const blank = await ctx.newPage();
  await blank.goto(BASE + 'tests/kit/fixtures/blank.html');
  const OTHER_A = JSON.stringify({ v: 1, game: 'sample-a', dataVersion: '2026.10-1', synthetic: true, seen: ['zz-1#00000000'] });
  const OTHER_L = JSON.stringify({ synthetic: 'legacy-test', note: '合成データ（実際の保存ではない）' });
  await blank.evaluate(([a, l]) => { localStorage.setItem('kit:sample-a:v1', a); localStorage.setItem('legacy-test-v1', l); }, [OTHER_A, OTHER_L]);

  const page = await openGame(ctx, { speedZero: true });
  check('別の作品の保存があっても、新作の「つづきから」は押せない', await page.getByRole('button', { name: 'つづきから', exact: true }).isDisabled());
  await clickText(page, 'はじめから');
  await advance(page);
  await advance(page);
  check('三行目（c01-003）まで進んだ', (await show(page)).lineId === 'c01-003');
  await clickText(page, 'セーブ');
  await page.getByRole('button', { name: '保存', exact: true }).first().click();
  await page.waitForFunction(() => KIT.s.slots[0] !== null);
  await clickText(page, '閉じる');
  await clickText(page, 'タイトル');
  await page.reload();
  await page.waitForFunction(() => window.KIT && window.KIT.s);
  await clickText(page, 'つづきから');
  await page.waitForFunction(() => KIT.s.screen === 'play', null, { timeout: 5000 });
  check('新作は自分の保存（c01-003）だけを読む', (await show(page)).lineId === 'c01-003');

  const keys = await page.evaluate(() => Object.keys(localStorage).sort());
  const expectKeys = ['kit:novelgame02-koshien:v1', 'kit:sample-a:v1', 'legacy-test-v1'].sort();
  check('保存の鍵は、新作の鍵と、置いた二つの鍵だけ', JSON.stringify(keys) === JSON.stringify(expectKeys), keys.join(','));
  const valA = await page.evaluate(() => localStorage.getItem('kit:sample-a:v1'));
  const valL = await page.evaluate(() => localStorage.getItem('legacy-test-v1'));
  check('別の作品の保存（sample-a）は変わらない', valA === OTHER_A);
  check('旧作の想定の保存（legacy-test-v1）は変わらない', valL === OTHER_L);
  await ctx.close();
}

// 縦向き：案内が出て本文が止まり、横向きに戻すと同じ位置から続く
async function portraitGuide(browser) {
  const ctx = await browser.newContext({ viewport: LANDSCAPE });
  const page = await openGame(ctx, { speedZero: true });
  section('縦向き：案内を出して止まり、横向きに戻すと同じ位置から続く');
  await clickText(page, 'はじめから');
  await advance(page);
  await advance(page);
  const before = await show(page);
  await page.setViewportSize(PORTRAIT);
  await page.waitForFunction(() => KIT.s.rotated === true, null, { timeout: 5000 });
  check('縦向きで回転の案内が出る', await page.isVisible('.kit-rotate'));
  await snap(page, 'portrait-guide');
  await page.click('.kit-dialogue', { force: true }).catch(() => {});
  await page.keyboard.press('Space');
  await page.waitForTimeout(300);
  const held = await show(page);
  check('縦向きでは、クリックとキーのどちらでも本文が進まない', held.lineId === before.lineId && held.prose === before.prose, JSON.stringify(held));
  await page.setViewportSize(LANDSCAPE);
  await page.waitForFunction(() => KIT.s.rotated === false, null, { timeout: 5000 });
  check('横向きに戻ると案内が消える', await page.isHidden('.kit-rotate'));
  const back = await show(page);
  check('横向きに戻ると、同じ行（c01-003）・本文の位置が保たれる', back.lineId === 'c01-003' && back.prose === LINES[2].text && back.page === '3 / 23', JSON.stringify(back));
  await advance(page);
  check('横向きに戻ったら、また進める', (await show(page)).lineId === 'c01-004');
  await ctx.close();
}

// 小さめの横向き画面（667×375）でも、全行が見切れない
async function smallLandscape(browser) {
  const ctx = await browser.newContext({ viewport: SMALL_LANDSCAPE });
  const page = await openGame(ctx, { speedZero: true });
  section('小さめの横向き（667×375）：全行の見切れ');
  await clickText(page, 'はじめから');
  const details = [];
  for (let i = 0; i <= LAST; i++) {
    const f = await layout(page);
    if (!fits(f)) details.push(LINES[i].id + ' ' + JSON.stringify(f));
    if (i === 14) await snap(page, 'play-667x375-c01-015');
    if (i < LAST) await advance(page);
  }
  check('667×375 でも、二十三行すべてが見切れない', details.length === 0, details.slice(0, 3).join(' | '));
  await snap(page, 'play-667x375-last');
  await ctx.close();
}

// 場面名とページ数：明るい背景でも暗い背景でも読めること（札の中の文字色と、札の半透明の重なりで計算する）
const parseRgba = (s) => { const m = s.match(/rgba?\(([^)]+)\)/); const [r, g, b, a] = m[1].split(',').map((v) => Number(v)); return { r, g, b, a: a === undefined ? 1 : a }; };
const luminance = ({ r, g, b }) => {
  const [R, G, B] = [r, g, b].map((v) => { const x = v / 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};
const contrast = (a, b) => { const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
// 札の下の背景を、最も暗い黒と最も明るい白と仮定したとき、どちらでも 4.5 以上あるか
const worstContrast = (text, chip) => Math.min(...[{ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 }].map((under) => {
  const blended = {
    r: chip.a * chip.r + (1 - chip.a) * under.r,
    g: chip.a * chip.g + (1 - chip.a) * under.g,
    b: chip.a * chip.b + (1 - chip.a) * under.b,
  };
  return contrast(text, blended);
}));
async function legibility(browser) {
  section('場面名とページ数：明るい背景でも読める（844×390 と 1280×720）');
  for (const viewport of [LANDSCAPE, DESKTOP]) {
    const ctx = await browser.newContext({ viewport });
    const page = await openGame(ctx);
    await clickText(page, 'はじめから');
    const label = viewport.width + '×' + viewport.height;
    const styles = await page.evaluate(() => ['.kit-scene', '.kit-page'].map((sel) => {
      const el = document.querySelector(sel);
      const cs = getComputedStyle(el);
      return { sel, color: cs.color, bg: cs.backgroundColor, box: el.getBoundingClientRect().toJSON(), inside: el.getBoundingClientRect().bottom <= innerHeight && el.getBoundingClientRect().right <= innerWidth };
    }));
    for (const s of styles) {
      const ratio = worstContrast(parseRgba(s.color), parseRgba(s.bg));
      check(label + '：' + s.sel + ' の文字は、明暗どちらの背景でも 4.5:1 以上', ratio >= 4.5, ratio.toFixed(2));
      check(label + '：' + s.sel + ' は画面の内側にある', s.inside);
    }
    await snap(page, 'legibility-' + label);
    await ctx.close();
  }
}

// 公開先の形：/adv02/ の下だけで配信される（ルート直下は 404）
async function mountCheck(origin) {
  section('公開先の形：/adv02/ の下でだけ配信される');
  const rootIndex = await fetch(origin + '/index.html');
  check('ルート直下の index.html は配信されない（404）', rootIndex.status === 404, String(rootIndex.status));
  const rootGame = await fetch(origin + '/game.js');
  check('ルート直下の game.js は配信されない（404）', rootGame.status === 404, String(rootGame.status));
  for (const p of ['index.html', 'game.js', 'kit/releases/0.1.0/kit.js', 'kit/releases/0.1.0/kit.css', 'assets/backgrounds/field-morning-temp.png']) {
    const res = await fetch(BASE + p);
    await res.arrayBuffer();
    check('/adv02/ の下で ' + p + ' が 200', res.status === 200, String(res.status));
  }
  const png = await fetch(BASE + 'assets/backgrounds/field-morning-temp.png');
  check('背景の Content-Type は image/png', (png.headers.get('content-type') || '').startsWith('image/png'));
  await png.arrayBuffer();
}

async function main() {
  const server = await serve(ROOT, 0, PREFIX);
  const origin = 'http://127.0.0.1:' + server.address().port;
  BASE = origin + PREFIX + '/';
  const browser = await launch();
  try {
    await mountCheck(origin);

    const desk = await browser.newContext({ viewport: DESKTOP });
    const deskPage = await playthrough(desk, 'デスクトップ 1280×720', DESKTOP, true);
    await skipIntoPractice(deskPage);
    await desk.close();

    const land = await browser.newContext({ viewport: LANDSCAPE });
    await playthrough(land, '横向き 844×390', LANDSCAPE, true);
    await land.close();

    await clickAndKey(browser, BASE);
    await autoStartStop(browser);
    await skipUnreadAndRead(browser);
    await resumeAndManualSave(browser);
    await separation(browser);
    await portraitGuide(browser);
    await smallLandscape(browser);
    await legibility(browser);
    await practicePlaythrough(browser, 0);
    await practicePlaythrough(browser, 1);

    section('実行中のエラー');
    check('ページの例外・console error・404 がない（公開先の外への参照もない）', ERRORS.length === 0, ERRORS.slice(0, 5).join(' | '));
    const needed = [BASE + 'index.html', BASE + 'game.js', BASE + 'kit/releases/0.1.0/kit.css', BASE + 'assets/backgrounds/field-morning-temp.png'];
    check('必要な素材がすべて 200 で読み込まれた', needed.every((u) => OK_URLS.has(u)), needed.filter((u) => !OK_URLS.has(u)).join(' '));
  } finally {
    await browser.close();
    server.close();
  }
  process.exitCode = summary() ? 1 : 0;
}

main().catch((e) => { console.error(e); process.exitCode = 1; });
