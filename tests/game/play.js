// 『きみのための甲子園』の冒頭から龍成戦の敗退または優勝エンドまでの試験（ブラウザ）。
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
    await readScene('parents-and-press');
    await readScene('second-scorebook');
    await readScene('tahara-and-komiya');
    const rookieChoice = G.scenes['tahara-and-komiya'].choices[choiceIndex];
    await clickText(page, rookieChoice.text);
    await readScene(rookieChoice.to);
    await readScene('rookies-teirei');
    await readScene('finish-it-this-year');
    await readScene('nohara-reanalysis');
    await readScene('ryusei-rematch');
    const prep = G.scenes['ryusei-rematch'].choices[choiceIndex];
    await clickText(page, prep.text);
    await readScene(prep.to);
    await readScene('ryusei-middle');
    if (choiceIndex === 1) {
      await readScene('ryusei-recovery-choice');
      const miss = G.scenes['ryusei-recovery-choice'].choices[1];
      await clickText(page, miss.text);
      await readScene(miss.to);
    }
    await readScene('ryusei-late');
    await readScene(choiceIndex === 0 ? 'ryusei-win' : 'ryusei-loss');
    await readScene(choiceIndex === 0 ? 'bus-to-koshien' : 'ryusei-summer');
    if (choiceIndex === 0) {
      await readScene('national-opponents');
      await readScene('konan-press');
      const pressChoice = G.scenes['konan-press'].choices[0];
      await clickText(page, pressChoice.text);
      await readScene(pressChoice.to);
      await readScene('konan-coach-brief');
      await readScene('konan-ninth');
      await readScene('konan-win');
      await readScene('aotake-round-three');
      await readScene('aotake-quarterfinal');
      const heightChoice = G.scenes['aotake-quarterfinal'].choices[0];
      await clickText(page, heightChoice.text);
      await readScene(heightChoice.to);
      await readScene('aotake-game');
      await readScene('aotake-battery-brief');
      await readScene('aotake-eighth');
      await readScene('aotake-win');
      await readScene('teirei-final');
      const shinjoChoice = G.scenes['teirei-final'].choices[0];
      await clickText(page, shinjoChoice.text);
      await readScene(shinjoChoice.to);
      await readScene('teirei-game');
      await readScene('teirei-ninth');
      await readScene('teirei-battery-brief');
      await readScene('teirei-win');
      await readScene('last-out');
      await readScene('first-koshien-title');
      await readScene('public-proposal');
      await readScene('real-promise');
    }
    await page.waitForFunction(() => KIT.s.screen === 'title', null, { timeout: 5000 });
    check('勝利側・敗退側それぞれの末尾を読み終えるとタイトルへ戻る', (await show(page)).screen === 'title');
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

// 立ち絵：登場の行で出て、退場の行で消える。途中でリロードしても、つづきからでその行の立ち絵が戻る。
// 横向きの小さな画面（667×375）では上半身寄り、PC（1280×720）では全身で、頭の上が切れない。
const portraitNow = (page) => page.evaluate(() => [...document.querySelectorAll('.kit-portrait img')].map((img) => {
  const r = img.getBoundingClientRect();
  return { file: img.getAttribute('src'), loaded: img.complete && img.naturalWidth === 859 && img.naturalHeight === 1280, top: r.top, height: r.height, bottom: r.bottom };
}));
const waitPortraitLoaded = (page) => page.waitForFunction(() => [...document.querySelectorAll('.kit-portrait img')].every((i) => i.complete), null, { timeout: 8000 });
// 選択肢があれば一つ目を選び、なければクリックで進めて、目的の行まで行く
async function advanceTo(page, lineId) {
  for (let i = 0; i < 400; i++) {
    const s = await show(page);
    if (s.lineId === lineId && !s.choices) return true;
    if (s.choices) await page.locator('.kit-choice').first().click();
    else await advance(page);
  }
  return false;
}
async function resumeHere(page) {
  await page.reload();
  await page.waitForFunction(() => window.KIT && window.KIT.s);
  await clickText(page, 'つづきから');
  await page.waitForFunction(() => KIT.s.screen === 'play', null, { timeout: 5000 });
  await page.evaluate(() => { KIT.s.speed = 0; });
  await waitPortraitLoaded(page);
}
async function portraitsInPlay(browser, viewport, label) {
  const ctx = await browser.newContext({ viewport });
  const page = await openGame(ctx, { speedZero: true });
  section('立ち絵（' + label + '）：登場・退場・つづきから');
  await clickText(page, 'はじめから');
  await advanceTo(page, 'c01-013');
  check('c01-013：大山の声だけの行では、まだ立ち絵がない', (await portraitNow(page)).length === 0);
  await advance(page);
  await waitPortraitLoaded(page);
  let p = await portraitNow(page);
  check('c01-014：振り向いた行で、大山（冬の学校制服）が出る', p.length === 1 && p[0].file === 'assets/portraits/oyama-school-winter-normal.webp' && p[0].loaded, JSON.stringify(p));
  check('立ち絵の頭の上が画面の上で切れない', p.length === 1 && p[0].top >= 0, JSON.stringify(p));
  if (viewport.height <= 500) check('小さな横向きでは上半身寄り（画像が画面の高さより大きい）', p[0].height > viewport.height, JSON.stringify(p));
  else check('PC では全身（画像の下端が画面の下端、高さは画面の78%）', Math.abs(p[0].bottom - viewport.height) < 2 && Math.abs(p[0].height - viewport.height * 0.78) < 2, JSON.stringify(p));
  await advanceTo(page, 'c01-016');
  await resumeHere(page);
  p = await portraitNow(page);
  check('c01-016 でリロードし、つづきからで大山の立ち絵が戻る', (await show(page)).lineId === 'c01-016' && p.length === 1 && p[0].file.endsWith('oyama-school-winter-normal.webp') && p[0].loaded, JSON.stringify(p));
  await advanceTo(page, 'c01-020');
  check('c01-020：去り際の台詞まで大山が出ている', (await portraitNow(page)).length === 1);
  await advance(page);
  check('c01-021：入口へ歩いていく行で、大山が消える', (await show(page)).lineId === 'c01-021' && (await portraitNow(page)).length === 0);
  check('練習へ進むまで、立ち絵は出ない', await advanceTo(page, 'c04-004') && (await portraitNow(page)).length === 0);
  await advance(page);
  await waitPortraitLoaded(page);
  p = await portraitNow(page);
  check('c04-005：入口から歩いてくる行で、美空（帽子のあるユニフォーム）が出る', (await show(page)).lineId === 'c04-005' && p.length === 1 && p[0].file === 'assets/portraits/misora-game-uniform-normal.webp' && p[0].loaded && p[0].top >= 0, JSON.stringify(p));
  await advanceTo(page, 'c04-025');
  await resumeHere(page);
  p = await portraitNow(page);
  check('c04-025 でリロードし、つづきからで美空の立ち絵が戻る', (await show(page)).lineId === 'c04-025' && p.length === 1 && p[0].file.endsWith('misora-game-uniform-normal.webp') && p[0].loaded, JSON.stringify(p));
  await advanceTo(page, 'c04-037');
  p = await portraitNow(page);
  check('c04-037：場面の最後の行まで美空が出ていて、平野を見ている大山が左に並ぶ', p.length === 2 && p.some((x) => x.file.endsWith('misora-game-uniform-normal.webp')) && p.some((x) => x.file.endsWith('oyama-practice-normal.webp')), JSON.stringify(p));
  await advance(page);
  check('c05-001：次の場面へ移ると、美空が消える', (await show(page)).lineId === 'c05-001' && (await portraitNow(page)).length === 0);
  await snap(page, 'portraits-' + viewport.width);
  await ctx.close();
}

// 背景：冒頭の朝のフェンス、5-2で放課後のグラウンドへ入る行、最初の二択の両側と合流、場面転換直後の保存・つづきから。
// 画面いっぱいに覆い（cover）、画像が読み込まれていることも確かめる。
const bgNow = (page) => page.evaluate(() => {
  const el = document.querySelector('.kit-bg');
  const m = (el.style.backgroundImage || '').match(/url\("(.+)"\)/);
  const r = el.getBoundingClientRect();
  return { file: m ? m[1] : '', size: getComputedStyle(el).backgroundSize, fills: r.left <= 0 && r.top <= 0 && r.right >= innerWidth && r.bottom >= innerHeight };
});
const waitBgLoaded = (page) => page.waitForFunction(() => {
  const m = (document.querySelector('.kit-bg').style.backgroundImage || '').match(/url\("(.+)"\)/);
  if (!m) return false;
  const img = new Image(); img.src = m[1];
  return img.complete && img.naturalWidth > 0;
}, null, { timeout: 8000 });
const bgIs = async (page, key) => {
  await waitBgLoaded(page);
  const b = await bgNow(page);
  const want = G.assets.backgrounds[key];
  return { ok: b.file === want && b.size === 'cover' && b.fills, got: b };
};
async function advanceToPicking(page, lineId, pick) {
  for (let i = 0; i < 400; i++) {
    const s = await show(page);
    if (s.lineId === lineId && !s.choices) return true;
    if (s.choices) await page.locator('.kit-choice').nth(pick).click();
    else await advance(page);
  }
  return false;
}
async function backgroundsInPlay(browser, viewport, label, pick) {
  const ctx = await browser.newContext({ viewport });
  const page = await openGame(ctx, { speedZero: true });
  const branch = pick === 0 ? 'practice-infield' : 'practice-outfield';
  section('背景（' + label + '・最初の二択は' + (pick === 0 ? '内野' : '外野') + '）：切り替えと、場面転換直後のつづきから');
  await clickText(page, 'はじめから');
  let r = await bgIs(page, 'hosho-field-fence-morning');
  check('c01-001：冒頭は朝のフェンスの外（hosho-field-fence-morning）が画面いっぱいに出る', r.ok, JSON.stringify(r.got));
  await advanceTo(page, 'c01-023');
  await advance(page);
  r = await bgIs(page, 'hosho-classroom');
  check('c02-001：5-2冒頭は教室（グラウンドの絵は残らない）', (await show(page)).lineId === 'c02-001' && r.ok, JSON.stringify(r.got));
  await advanceTo(page, 'c02-005');
  check('c02-005：放課後、グラブを出すところまでは教室のまま', (await bgIs(page, 'hosho-classroom')).ok);
  await advance(page);
  r = await bgIs(page, 'hosho-field-afternoon');
  check('c02-006：練習着でグラウンドへ入る行で、放課後のグラウンドに切り替わる', (await show(page)).lineId === 'c02-006' && r.ok, JSON.stringify(r.got));
  await advanceToPicking(page, G.scenes[branch].lines[0].id, pick);
  r = await bgIs(page, 'hosho-field-afternoon');
  check(branch + ' の最初の行：選んだ側でも放課後のグラウンド', r.ok, JSON.stringify(r.got));
  await advanceToPicking(page, 'c02e-001', pick);
  check('合流（c02e-001）：放課後のグラウンド', (await bgIs(page, 'hosho-field-afternoon')).ok);
  await resumeHere(page);
  r = await bgIs(page, 'hosho-field-afternoon');
  check('合流の直後にリロードし、つづきからで同じ背景に戻る', (await show(page)).lineId === 'c02e-001' && r.ok, JSON.stringify(r.got));
  await advanceToPicking(page, 'c03-001', pick);
  await resumeHere(page);
  check('場面が変わった直後（c03-001）に保存して、つづきからで放課後のグラウンド', (await show(page)).lineId === 'c03-001' && (await bgIs(page, 'hosho-field-afternoon')).ok);
  await advanceToPicking(page, 'c03-012', pick);
  check('c03-012：ベンチでスコアブックを任される行で、ベンチ付近に切り替わる', (await bgIs(page, 'hosho-field-bench')).ok);

  // 後半の場面。実際に保存された自動セーブの位置だけを書き換え、リロードして「つづきから」で戻す
  const resumeAt = async (lineId, flags) => {
    await page.evaluate(([key, at, fl]) => {
      const raw = JSON.parse(localStorage.getItem(key));
      raw.auto = { ...raw.auto, at, flags: { ...raw.auto.flags, ...fl } };
      localStorage.setItem(key, JSON.stringify(raw));
    }, [SAVE_KEY, lineId, flags]);
    await resumeHere(page);
    return (await show(page)).lineId === lineId;
  };
  const late = [
    ['c20-001', {}, 'regional-stadium-dugout-sunset', '5-20：敗戦直後のベンチは夕日'],
    ['c31a-001', { ryuseiPrep: true }, 'lodging-dining-hallway', '5-31：宿舎の食堂前の廊下（前の場面の甲子園のベンチが残らない）'],
    ['c31k-001', { ryuseiPrep: true }, 'bus-interior-sunset', 'E2：帰りのバスは西日'],
    ['c32a-001', { ryuseiPrep: true, konanPrep: true }, 'koshien-dugout', '5-32：並び順で直前にあるE2のバスが残らず、甲子園のベンチ'],
    ['c32m-002', { ryuseiPrep: true, konanPrep: true }, 'koshien-field', 'E3：観客席から決勝を見る'],
    ['clastout-001', { ryuseiPrep: true, konanPrep: true, aotakePrep: true, teireiPrep: true }, 'koshien-dugout', '最後のアウト：並び順で直前にあるE4の帰りのバスが残らず、甲子園のベンチ'],
  ];
  for (const [lineId, flags, key, name] of late) {
    const at = await resumeAt(lineId, flags);
    r = await bgIs(page, key);
    check(name + '（' + lineId + ' でつづきから）', at && r.ok, JSON.stringify(r.got));
  }
  await advance(page);
  check('最後のアウトの次の行でも甲子園のベンチのまま', (await bgIs(page, 'koshien-dugout')).ok);
  await snap(page, 'backgrounds-' + viewport.width + '-' + pick);
  await ctx.close();
}

// 第2便の背景：5-28の龍成の部室、5-31の宿舎（最初の二択の両側）と球場へ移ったあと、5-32の夜の食堂と準決勝。
// 追加した背景の区間で保存し、リロード後の「つづきから」で同じ背景が戻ることも確かめる。
async function lodgingInPlay(browser, viewport, label, pick) {
  const ctx = await browser.newContext({ viewport });
  const page = await openGame(ctx, { speedZero: true });
  const side = pick === 0 ? '取材を分担して映像を見直す' : '一人で取材を受ける';
  section('第2便の背景（' + label + '・5-31は「' + side + '」）');
  await clickText(page, 'はじめから');
  // 実際に保存された自動セーブの位置だけを書き換え、リロードして「つづきから」で戻す
  const resumeAt = async (lineId, flags) => {
    await page.evaluate(([key, at, fl]) => {
      const raw = JSON.parse(localStorage.getItem(key));
      raw.auto = { ...raw.auto, at, flags: { ...raw.auto.flags, ...fl } };
      localStorage.setItem(key, JSON.stringify(raw));
    }, [SAVE_KEY, lineId, flags]);
    await resumeHere(page);
    return (await show(page)).lineId === lineId;
  };
  let at = await resumeAt('c28-001', {});
  let r = await bgIs(page, 'ryusei-clubroom-night');
  check('5-28 の最初の行（c28-001）でつづきから：夜の龍成の部室', at && r.ok, JSON.stringify(r.got));
  await advanceToPicking(page, 'c28-017', pick);
  check('5-28 の最後の行（c28-017）まで龍成の部室のまま', (await bgIs(page, 'ryusei-clubroom-night')).ok);
  await advance(page);
  check('5-29 へ進むと（c29a-001）地方球場の通路に戻る', (await show(page)).lineId === 'c29a-001' && (await bgIs(page, 'regional-stadium-concourse')).ok);

  at = await resumeAt('c31a-001', { ryuseiPrep: true });
  r = await bgIs(page, 'lodging-dining-hallway');
  check('5-31 冒頭（c31a-001）でつづきから：食堂前の廊下', at && r.ok, JSON.stringify(r.got));
  await advanceToPicking(page, 'c31a-008', pick);
  check('最初の選択肢の直前（c31a-008）まで廊下のまま', (await bgIs(page, 'lodging-dining-hallway')).ok);
  const branchLine = pick === 0 ? 'c31b-001' : 'c31c-001';
  const branchBg = pick === 0 ? 'lodging-dining-hall' : 'lodging-dining-hallway';
  await advanceToPicking(page, branchLine, pick);
  r = await bgIs(page, branchBg);
  check(branchLine + '：「' + side + '」の側は ' + branchBg, r.ok, JSON.stringify(r.got));
  await resumeHere(page);
  r = await bgIs(page, branchBg);
  check(branchLine + ' でリロードし、つづきからで同じ背景（' + branchBg + '）に戻る', (await show(page)).lineId === branchLine && r.ok, JSON.stringify(r.got));
  if (pick === 0) {
    // 分担した側は、宿舎から試合前の3塁コーチへの伝達（c31g-001）へ進む
    await advanceToPicking(page, 'c31g-001', 0);
    r = await bgIs(page, 'koshien-dugout');
    check('宿舎のあと、試合前の伝達（c31g-001）で甲子園のベンチに移り、食堂の絵が残らない', r.ok, JSON.stringify(r.got));
  } else {
    // 一人で受けた側は、試合当日のスタンド下の通路（c31d-001）へ進む
    await advanceToPicking(page, 'c31d-001', 0);
    r = await bgIs(page, 'koshien-concourse');
    check('宿舎のあと、試合当日（c31d-001）で甲子園の通路に移り、廊下の絵が残らない', r.ok, JSON.stringify(r.got));
    await advanceToPicking(page, 'c31e-001', 0);
    check('グラウンドへ出る（c31e-001）と甲子園のベンチ', (await bgIs(page, 'koshien-dugout')).ok);
  }

  at = await resumeAt('c32b-007', { ryuseiPrep: true, konanPrep: true });
  r = await bgIs(page, 'lodging-dining-hall-night');
  check('5-32「その晩、宿の食堂で」（c32b-007）でつづきから：夜の食堂', at && r.ok, JSON.stringify(r.got));
  const nightLine = pick === 0 ? 'c32c-001' : 'c32d-001';
  await advanceToPicking(page, nightLine, pick);
  r = await bgIs(page, 'lodging-dining-hall-night');
  check(nightLine + '：選んだ側でも夜の食堂', r.ok, JSON.stringify(r.got));
  await resumeHere(page);
  check(nightLine + ' でリロードし、つづきからで夜の食堂に戻る', (await show(page)).lineId === nightLine && (await bgIs(page, 'lodging-dining-hall-night')).ok);
  await advanceToPicking(page, 'c32e-001', pick);
  r = await bgIs(page, 'koshien-dugout');
  check('準決勝（c32e-001）へ進むと甲子園のベンチに戻り、夜の食堂が残らない', r.ok, JSON.stringify(r.got));
  await snap(page, 'lodging-' + viewport.width + '-' + pick);
  await ctx.close();
}

// 5-5〜5-12 の立ち絵：代表的な会話、5-9の両分岐、河本の来校、5-11の回想と現在への復帰、5-13で残らないこと。
// 各区間の行で保存し、リロード後の「つづきから」でその行の人物が戻ることも確かめる。
const portraitSet = (page) => page.evaluate(() => ['left', 'right'].map((slot) => {
  const img = document.querySelector('.kit-portrait-' + slot + ' img');
  if (!img) return '-';
  const m = img.getAttribute('src').match(/([a-z]+)-(.+)\.webp$/);
  return (img.complete && img.naturalWidth === 859 ? '' : '(未読込)') + m[1] + '/' + m[2];
}).join(','));
async function portraitsLater(browser, viewport, label, pick) {
  const ctx = await browser.newContext({ viewport });
  const page = await openGame(ctx, { speedZero: true });
  section('立ち絵 5-5〜5-12（' + label + '・分岐は' + (pick === 0 ? '一つ目' : '二つ目') + '）');
  await clickText(page, 'はじめから');
  const resumeAt = async (lineId) => {
    await page.evaluate(([key, at]) => {
      const raw = JSON.parse(localStorage.getItem(key));
      raw.auto = { ...raw.auto, at };
      localStorage.setItem(key, JSON.stringify(raw));
    }, [SAVE_KEY, lineId]);
    await resumeHere(page);
    return (await show(page)).lineId === lineId;
  };
  const expectAt = async (lineId, want, name) => {
    await advanceToPicking(page, lineId, pick);
    await waitPortraitLoaded(page);
    const got = await portraitSet(page);
    check(name + '（' + lineId + '）', (await show(page)).lineId === lineId && got === want, got);
  };
  const O = 'oyama/practice-normal', M = 'misora/game-uniform-normal', H = 'hiyori/jersey-normal', S = 'sasaki/practice-normal';
  const K = 'kawamoto/casual-normal', F = 'misora/pantsuit-first-day';

  // 5-5：大山との会話。分岐（大山に聞く／先輩に聞く）と合流
  check('5-5 の大山の宣言（c05-014）でつづきから：大山', await resumeAt('c05-014') && await portraitSet(page) === '-,' + O, await portraitSet(page));
  if (pick === 0) await expectAt('c05o-001', '-,' + O, '分岐「大山に聞く」：大山');
  else await expectAt('c05s-001', '-,-', '分岐「先輩に聞く」：名前のない先輩なので立ち絵なし（大山も残らない）');
  await expectAt('c05e-001', '-,' + O, '合流：先輩に呼ばれる大山');
  await expectAt('c05e-012', '-,-', 'ベンチに平野が残る');

  // 5-9：日和の両分岐と合流
  check('5-9 の最初の行（c09-001）でつづきから：まだ誰もいない', await resumeAt('c09-001') && await portraitSet(page) === '-,-', await portraitSet(page));
  await expectAt('c09-002', '-,' + H, 'ベンチの前の日和（ジャージ）');
  const side = pick === 0 ? 'c09d-002' : 'c09t-004';
  await expectAt(side, S + ',' + H, pick === 0 ? '分岐「飲み物」：佐々木にいちご牛乳を差し出す' : '分岐「用具」：佐々木が戻ってくる');
  await resumeHere(page);
  check('分岐の途中でリロードし、つづきからで日和と佐々木が戻る', (await show(page)).lineId === side && await portraitSet(page) === S + ',' + H, await portraitSet(page));
  await expectAt('c09e-001', '-,' + S, '合流：翌日、自販機の前の佐々木（日和は残らない）');
  await expectAt('c09e-007', M + ',' + H, '部室で日和の隣に座る監督');
  await expectAt('c09e-014', '-,-', '平野が部室を出る');

  // 5-10：河本の来校
  check('5-10 の最初の行（c10-001）でつづきから：まだ誰もいない', await resumeAt('c10-001') && await portraitSet(page) === '-,-', await portraitSet(page));
  await expectAt('c10-002', '-,' + K, 'グラウンドの入口に立つ河本（私服）');
  await expectAt('c10-012', M + ',' + K, '監督に8勝を報告する河本');
  await resumeHere(page);
  check('c10-012 でリロードし、つづきからで監督と河本が戻る', await portraitSet(page) === M + ',' + K, await portraitSet(page));
  await expectAt('c10-020', M + ',kawamoto/casual-shock', '河本の口が開いたまま止まる行で驚き差分');
  await expectAt('c10-021', '-,kawamoto/casual-shock', '美空を外し、驚いた河本は残す');
  await expectAt('c10-031', '-,' + K, '大山に向き直る河本');

  // 5-11：回想の開始と終了、現在への復帰
  await expectAt('c11s-005', O + ',' + K, '5-11：大山と河本');
  await expectAt('c11m-001', '-,-', '回想の始まり：現在の大山・河本は残らない');
  await expectAt('c11m-001d', '-,' + F, '回想：長い黒髪の女が歩いてくる（就任初日のスーツ）');
  await resumeHere(page);
  check('回想の途中でリロードし、つづきからで就任初日の美空が戻る', (await show(page)).lineId === 'c11m-001d' && await portraitSet(page) === '-,' + F, await portraitSet(page));
  await expectAt('c11m-021', '-,-', '回想：外周を走る');
  await expectAt('c11m-029', '-,' + F, '回想：1周して美空の前に戻る');
  await expectAt('c11p-001', '-,' + K, '現在へ戻る：就任初日の美空は残らず、話し終えた河本');
  if (pick === 0) await expectAt('c11a-001', '-,' + K, '分岐「平野が聞く」：河本');
  else await expectAt('c11w-001', O + ',' + K, '分岐「大山を待つ」：大山と河本');
  await expectAt('c11e-001', '-,' + K, '合流：襟を直す河本（大山は残らない）');

  // 5-12 から 5-13 へ
  await expectAt('c12-002', M + ',' + K, '5-12：ベンチの奥の監督と河本');
  await expectAt('c12-016', M + ',-', '河本がベンチを出たあと');
  await expectAt('c13-001', '-,-', '5-13 へ進むと、監督も河本も残らない');
  await snap(page, 'portraits-later-' + viewport.width + '-' + pick);
  await ctx.close();
}

// 第3便の背景：7つの区間の入口でつづきから、区間の途中でリロードして同じ背景、区間の終わりで既存の背景へ戻る。
async function batch3InPlay(browser, viewport, label, pick) {
  const ctx = await browser.newContext({ viewport });
  const page = await openGame(ctx, { speedZero: true });
  section('第3便の背景（' + label + '・分岐は' + (pick === 0 ? '一つ目' : '二つ目') + '）');
  await clickText(page, 'はじめから');
  const resumeAt = async (lineId) => {
    await page.evaluate(([key, at]) => {
      const raw = JSON.parse(localStorage.getItem(key));
      raw.auto = { ...raw.auto, at };
      localStorage.setItem(key, JSON.stringify(raw));
    }, [SAVE_KEY, lineId]);
    await resumeHere(page);
    return (await show(page)).lineId === lineId;
  };
  const spans = [
    // [入口, 途中, 終わりの行, 終わりの背景, 新しい背景, 名前]
    ['c02-001', 'c02-003', 'c02-006', 'hosho-field-afternoon', 'hosho-classroom', '5-2 教室 → 練習着でグラウンドへ'],
    ['c09e-001', 'c09e-003', 'c09e-006', 'hosho-clubroom', 'hosho-vending-area', '5-9 自販機の前 → 部室'],
    ['c11m-021', 'c11m-025', 'c11m-029', 'hosho-field-afternoon', 'hosho-school-exterior', '5-11 回想：外周と校舎の角 → 1周してグラウンド'],
    ['c15-008', 'c15-010', 'c15-014', 'regional-stadium-dugout', 'hosho-school-corridor', '5-15 回想：廊下 → 試合中のベンチ'],
    ['c18-pre-f', 'c18-pre-h', 'c18-pre-k', 'oyama-home-entry', 'oyama-home-exterior-night', '5-18 大山家の前 → 玄関'],
    ['c18-017', 'c18-017', 'c18-018', 'hospital-exam-room', 'hospital-waiting-room', '5-18 病院の待合室 → 診察室'],
    ['cbus-001', 'cbus-001', 'cbus-002', 'bus-interior', 'hosho-gate-bus-morning', '幕間 校門前のバス → 車内'],
  ];
  for (const [entry, mid, back, backBg, bg, name] of spans) {
    let at = await resumeAt(entry);
    let r = await bgIs(page, bg);
    check(name + '：入口（' + entry + '）でつづきから ' + bg, at && r.ok, JSON.stringify(r.got));
    await advanceToPicking(page, mid, pick);
    await resumeHere(page);
    r = await bgIs(page, bg);
    check(name + '：途中（' + mid + '）でリロードし、つづきからで同じ背景', (await show(page)).lineId === mid && r.ok, JSON.stringify(r.got));
    await advanceToPicking(page, back, pick);
    r = await bgIs(page, backBg);
    check(name + '：' + back + ' で既存の ' + backBg + ' に戻り、第3便の絵が残らない', (await show(page)).lineId === back && r.ok, JSON.stringify(r.got));
  }
  // 回想から現在への復帰（5-11・5-15）
  await resumeAt('c11m-029');
  await advanceToPicking(page, 'c11p-001', pick);
  check('5-11 回想が終わって現在へ戻る（c11p-001）：ベンチ', (await bgIs(page, 'hosho-field-bench')).ok);
  await resumeAt('c15-013');
  await advanceToPicking(page, 'c15-014', pick);
  check('5-15 回想が終わって試合へ戻る（c15-014）：地方球場のベンチ', (await bgIs(page, 'regional-stadium-dugout')).ok);
  await snap(page, 'batch3-' + viewport.width + '-' + pick);
  await ctx.close();
}

// 第4便の背景：駅までの道、平野の部屋、病院の廊下。区間の前後の切り替えと、つづきからでの復元。
// 平野の部屋は、再開しても左右の立ち絵が出ず、机が隠れないことも確かめる。
async function batch4InPlay(browser, viewport, label) {
  const ctx = await browser.newContext({ viewport });
  const page = await openGame(ctx, { speedZero: true });
  section('第4便の背景（' + label + '）');
  await clickText(page, 'はじめから');
  const resumeAt = async (lineId) => {
    await page.evaluate(([key, at]) => {
      const raw = JSON.parse(localStorage.getItem(key));
      raw.auto = { ...raw.auto, at };
      localStorage.setItem(key, JSON.stringify(raw));
    }, [SAVE_KEY, lineId]);
    await resumeHere(page);
    return (await show(page)).lineId === lineId;
  };
  const noPortraits = async () => (await portraitNow(page)).length === 0;
  const spans = [
    // [前の行, 前の背景, 入口, 途中, 終わりの行, 終わりの背景, 新しい背景, 名前]
    ['c02e-017', 'hosho-field-afternoon', 'c02e-018', 'c02e-019', 'c03-001', 'hosho-field-afternoon', 'school-station-road-evening', '5-2 駅までの道'],
    ['cblank-010', 'hosho-clubroom', 'cblank-011', 'cblank-012', 'c21-001', 'hosho-field-afternoon', 'hirano-room', '幕間「空いた一行」平野の部屋'],
    ['c21-016', 'hospital-exam-room', 'c21-017', 'c21-017', 'c21-018', 'hosho-field-afternoon', 'hospital-corridor', '5-21 病院の廊下'],
  ];
  for (const [before, beforeBg, entry, mid, back, backBg, bg, name] of spans) {
    let at = await resumeAt(before);
    check(name + '：直前（' + before + '）は ' + beforeBg, at && (await bgIs(page, beforeBg)).ok);
    await advance(page);
    let r = await bgIs(page, bg);
    check(name + '：' + entry + ' で ' + bg + ' に切り替わる', (await show(page)).lineId === entry && r.ok, JSON.stringify(r.got));
    await advanceTo(page, mid);
    await resumeHere(page);
    r = await bgIs(page, bg);
    check(name + '：' + mid + ' でリロードし、つづきからで同じ背景', (await show(page)).lineId === mid && r.ok, JSON.stringify(r.got));
    if (bg === 'hirano-room') {
      check(name + '：つづきからのあとも左右の立ち絵が出ない（机が隠れない）', await noPortraits(), JSON.stringify(await portraitNow(page)));
      await snap(page, 'hirano-room-' + viewport.width);
    }
    await advanceTo(page, back);
    r = await bgIs(page, backBg);
    check(name + '：' + back + ' で既存の ' + backBg + ' に戻る', (await show(page)).lineId === back && r.ok, JSON.stringify(r.got));
  }
  for (const id of ['cblank-011', 'cblank-013']) {
    await resumeAt(id);
    check('平野の部屋（' + id + '）でつづきから：大山のメッセージの行も含め、左右とも立ち絵なし', await noPortraits() && (await bgIs(page, 'hirano-room')).ok, JSON.stringify(await portraitNow(page)));
  }
  await ctx.close();
}

// 5-26の帝嶺との練習試合（鳳翔のグラウンド）：両分岐の終わりから合流へ、つづきからでの復元、5-27へ。
async function rookiesHomeGround(browser, viewport, label, pick) {
  const ctx = await browser.newContext({ viewport });
  const page = await openGame(ctx, { speedZero: true });
  const branchEnd = pick === 0 ? 'c26a-010' : 'c26b-009';
  section('5-26 帝嶺との練習試合（' + label + '・分岐は' + (pick === 0 ? '田原の捕球' : '小宮の守備') + '）');
  await clickText(page, 'はじめから');
  await page.evaluate(([key, at]) => {
    const raw = JSON.parse(localStorage.getItem(key));
    raw.auto = { ...raw.auto, at };
    localStorage.setItem(key, JSON.stringify(raw));
  }, [SAVE_KEY, 'c26-009']);
  await resumeHere(page);
  await advanceToPicking(page, branchEnd, pick);
  check('分岐の終わり（' + branchEnd + '）は放課後のグラウンド', (await bgIs(page, 'hosho-field-afternoon')).ok);
  await advance(page);
  let r = await bgIs(page, 'hosho-field-bench');
  check('合流（c26e-001）で鳳翔のベンチに切り替わる', (await show(page)).lineId === 'c26e-001' && r.ok, JSON.stringify(r.got));
  check('合流の練習試合では立ち絵を出さない（既存の演出のまま）', (await portraitNow(page)).length === 0);
  await advanceToPicking(page, 'c26e-006', pick);
  await resumeHere(page);
  r = await bgIs(page, 'hosho-field-bench');
  check('c26e-006 でリロードし、つづきからで鳳翔のベンチに戻る', (await show(page)).lineId === 'c26e-006' && r.ok, JSON.stringify(r.got));
  await advanceToPicking(page, 'c27-001', pick);
  check('5-27（c27-001）も鳳翔のベンチ', (await bgIs(page, 'hosho-field-bench')).ok);
  await ctx.close();
}

// 中田の表情差分：通常画面→差分→通常画面を実際に送り、差分の途中で保存・リロードして専用レイアウトが戻ること、区間の後で解除されることを確かめる。
const layoutNow = (page) => page.evaluate(() => {
  const d = document.querySelector('.kit-dialogue').getBoundingClientRect();
  const sc = document.querySelector('.kit-scene').getBoundingClientRect();
  return ['left', 'right'].map((slot) => {
    const img = document.querySelector('.kit-portrait-' + slot + ' img');
    if (!img) return null;
    const r = img.getBoundingClientRect();
    const cs = getComputedStyle(img);
    return { slot, file: img.getAttribute('src').split('/').pop(), loaded: img.complete && img.naturalWidth === 859,
      top: r.top, bottom: r.bottom, left: r.left, right: r.right, width: r.width, height: r.height, fit: cs.objectFit,
      dialogueTop: d.top, scene: { left: sc.left, right: sc.right, top: sc.top, bottom: sc.bottom }, vw: innerWidth, vh: innerHeight };
  }).filter(Boolean);
});
const at = (l, nx, ny) => ({ x: l.left + nx / 859 * l.width, y: l.top + ny / 1280 * l.height }); // 元画像の座標 → 画面の座標（全身表示のとき）

async function expressionsBatch01(browser, viewport) {
  const ctx = await browser.newContext({ viewport });
  const page = await openGame(ctx, { speedZero: true });
  await clickText(page, 'はじめから');
  const resumeAt = async at => {
    await page.evaluate(([key, at]) => {
      const raw = JSON.parse(localStorage.getItem(key));
      raw.auto.at = at;
      localStorage.setItem(key, JSON.stringify(raw));
    }, [SAVE_KEY, at]);
    await resumeHere(page);
  };
  section('表情第1便・一枚絵 (' + viewport.width + ')');
  const spans = [
    ['c06e-004a','c06e-005','c06e-006','misora-game-uniform-pale.webp'],
    ['c06e-006','c06e-007','c06e-008','misora-game-uniform-angry.webp'],
    ['c07-005','c07-006','c07-006a','misora-game-uniform-flustered-chibi.webp'],
    ['c07-016','c07-016','c07-017','misora-game-uniform-flustered-chibi.webp'],
    ['c10-020','c10-022','c10-023','kawamoto-casual-shock.webp'],
    ['c10-022','c10-027','c10-028','oyama-practice-angry.webp'],
    ['c10-029','c10-030','c10-031','kawamoto-casual-angry.webp'],
    ['c11w-006','c11w-007','c11e-001','oyama-practice-frustrated.webp'],
  ];
  for (const [first,last,after,file] of spans) {
    await resumeAt(first);
    let l = (await layoutNow(page)).find(x => x.file === file);
    check(first + ': 再開で差分が読み込まれる', l && l.loaded && l.top >= -1, JSON.stringify(l));
    check(first + ': 本文と操作が画面内に収まる', fits(await layout(page)));
    await snap(page, 'batch01-' + first + '-' + viewport.width);
    await advanceTo(page,last);
    await resumeHere(page);
    check(last + ': 区間末尾でも差分と配置を復元', (await layoutNow(page)).some(x => x.file === file && x.loaded));
    await advance(page);
    check(after + ': 次の行で差分を解除', (await show(page)).lineId === after && !(await layoutNow(page)).some(x => x.file === file));
  }
  await resumeAt('cnews-009');
  check('新聞CG: 直前には出ない', await page.locator('.kit-cg').isHidden());
  await advance(page);
  await page.waitForFunction(() => {const i=document.querySelector('.kit-cg');return !i.hidden && i.complete && i.naturalWidth === 1920;});
  check('cnews-010: 一枚絵に切り替わり、立ち絵は出ない', (await show(page)).lineId === 'cnews-010' && (await portraitNow(page)).length === 0);
  check('CG到達で鑑賞用に解放される', await page.evaluate(() => !!KIT.s.gallery['cnews-oyama-tears-newspaper']));
  await snap(page, 'batch01-cg-' + viewport.width);
  await advanceTo(page,'cnews-011c');
  await resumeHere(page);
  check('cnews-011c: つづきからでCGを復元', await page.locator('.kit-cg').isVisible());
  await advance(page);
  check('cnews-012: 通常の部室に戻る', (await show(page)).lineId === 'cnews-012' && await page.locator('.kit-cg').isHidden() && (await bgIs(page,'hosho-clubroom')).ok);
  await ctx.close();
}

async function expressionsInPlay(browser, viewport, label) {
  const ctx = await browser.newContext({ viewport });
  const page = await openGame(ctx, { speedZero: true });
  section('中田の表情差分（' + label + '）');
  await clickText(page, 'はじめから');
  const resumeAt = async (lineId) => {
    await page.evaluate(([key, a]) => {
      const raw = JSON.parse(localStorage.getItem(key));
      raw.auto = { ...raw.auto, at: a };
      localStorage.setItem(key, JSON.stringify(raw));
    }, [SAVE_KEY, lineId]);
    await resumeHere(page);
    return (await show(page)).lineId === lineId;
  };
  const files = async () => (await layoutNow(page)).map((l) => l.slot + ':' + l.file).join(',');
  const one = async (file) => (await layoutNow(page)).find((l) => l.file === file);

  // 激怒：c08-020（美空との会話）→ c08-021〜c08-023（中田の寄り）→ c08-024（美空に戻る）
  check('5-8 c08-020 は美空との通常の会話画面', await resumeAt('c08-020') && await files() === 'right:misora-game-uniform-normal.webp', await files());
  await advance(page); await waitPortraitLoaded(page);
  let l = await one('nakata-practice-rage.webp');
  check('c08-021 で中田の激怒に切り替わり、美空は一時的に出ない', (await files()) === 'right:nakata-practice-rage.webp' && l.loaded, await files());
  const fist = l && at(l, 450, 750);
  check('激怒：湯気と顔が画面内にあり、硬球を握る拳（元画像の上から750px）までが本文欄の上に収まる', l && l.top >= -1 && fist.y <= l.dialogueTop + 2, JSON.stringify(l));
  check('激怒：通常の全身立ち絵より大きい寄りで、画面の中央に置く', l && l.height > l.vh * (l.vh <= 500 ? 0.9 : 1.0) && Math.abs((l.left + l.right) / 2 - l.vw / 2) < 2, JSON.stringify(l));
  await advance(page);
  await resumeHere(page);
  l = await one('nakata-practice-rage.webp');
  check('c08-022 でリロードし、つづきからで激怒の画像と寄りの配置が戻る', (await show(page)).lineId === 'c08-022' && l && l.loaded && Math.abs((l.left + l.right) / 2 - l.vw / 2) < 2 && at(l, 450, 750).y <= l.dialogueTop + 2, JSON.stringify(l));
  check('c08-022 の本文は硬球の確定文', (await show(page)).prose === 'だって、中田先輩の手の中で、硬球が平たくひしゃげていた。裂けた赤い縫い目から、中身がのぞいていた。');
  await advance(page); await advance(page); await waitPortraitLoaded(page);
  l = await one('misora-game-uniform-normal.webp');
  check('c08-024 で美空との通常の会話画面に戻り、寄りの配置は解除される', (await show(page)).lineId === 'c08-024' && (await files()) === 'right:misora-game-uniform-normal.webp' && l.right >= l.vw - 1, await files());

  // 驚き：c08-040（美空）→ c08-041〜c08-043（左に中田の驚き）→ c08b-001（部室と日和）
  await resumeAt('c08-040');
  check('5-8 c08-040 は美空だけ', await files() === 'right:misora-game-uniform-normal.webp', await files());
  await advance(page); await waitPortraitLoaded(page);
  l = await one('nakata-practice-shock.webp');
  check('c08-041 で左に中田の驚き、右の美空はそのまま', (await files()) === 'left:nakata-practice-shock.webp,right:misora-game-uniform-normal.webp' && l.loaded, await files());
  const ball = l && at(l, 745, 1120), feet = l && at(l, 400, 1256), jaw = l && at(l, 800, 560);
  const inScene = (p) => p.x >= l.scene.left && p.x <= l.scene.right && p.y >= l.scene.top && p.y <= l.scene.bottom;
  check('驚き：足元が本文欄の上にあり、頭は画面内（足元を基準に縮小）', l && feet.y <= l.dialogueTop + 2 && l.top >= -1, JSON.stringify(l));
  check('驚き：伸ばした手の下の球と、伸びた顎が、本文欄にも場面名の札にも隠れない', l && ball.y < l.dialogueTop && !inScene(ball) && jaw.y < l.dialogueTop && !inScene(jaw), JSON.stringify({ ball, jaw, scene: l && l.scene }));
  check('驚き：画面の左側に置く（左右反転しない）', l && l.left < l.vw / 2 && l.right < l.vw * 0.6, JSON.stringify(l));
  await advance(page);
  await resumeHere(page);
  l = await one('nakata-practice-shock.webp');
  check('c08-042 でリロードし、つづきからで驚きの画像と足元基準の配置が戻る', (await show(page)).lineId === 'c08-042' && l && l.loaded && at(l, 400, 1256).y <= l.dialogueTop + 2, JSON.stringify(l));
  await advance(page); await advance(page); await waitPortraitLoaded(page);
  check('c08b-001 で中田は消え、部室と日和の画面へ移る', (await show(page)).lineId === 'c08b-001' && (await files()) === 'right:hiyori-jersey-normal.webp' && (await bgIs(page, 'hosho-clubroom')).ok, await files());

  // 照れ笑い（5-4）：c04-021 → c04-022（着席の顔〜胸）→ c04-023（中田を消す）
  await resumeAt('c04-019');
  await advanceTo(page, 'c04-022'); await waitPortraitLoaded(page);
  l = await one('nakata-practice-bashful.webp');
  check('5-4 c04-022 で照れ笑いの中田が左に出る（右に美空）', (await files()) === 'left:nakata-practice-bashful.webp,right:misora-game-uniform-normal.webp' && l.loaded, await files());
  check('5-4 の照れ笑いは顔〜胸の切り抜き（立った脚とグラブを見せない）', l && l.fit === 'cover' && Math.abs(l.width / l.height - 859 / 520) < 0.02 && l.top >= -1, JSON.stringify(l));
  check('5-4 の照れ笑い：顔（元画像の上から顎の220pxまで）が本文欄の上にある', l && l.top + 220 / 520 * l.height <= l.dialogueTop + 2, JSON.stringify(l));
  await resumeHere(page);
  l = await one('nakata-practice-bashful.webp');
  check('c04-022 でリロードし、つづきからで顔〜胸の切り抜きが戻る', l && l.fit === 'cover' && Math.abs(l.width / l.height - 859 / 520) < 0.02, JSON.stringify(l));
  await advance(page);
  check('c04-023 で中田を消し、美空だけに戻る', (await show(page)).lineId === 'c04-023' && (await files()) === 'right:misora-game-uniform-normal.webp', await files());

  // 照れ笑い（5-7）：c07-016（美空が褒める・立ち絵なし）→ c07-017〜c07-018（立ち姿の全身）→ c07-019（消す）→ c07-020（通常顔）
  check('5-7 c07-016（美空が褒める行）ではまだ照れ顔を出さない', await resumeAt('c07-016') && await files() === 'right:misora-game-uniform-flustered-chibi.webp', await files());
  await advance(page); await waitPortraitLoaded(page);
  l = await one('nakata-practice-bashful.webp');
  check('c07-017 で照れ笑いの中田が全身の立ち姿で出る（切り抜かない）', (await files()) === 'left:nakata-practice-bashful.webp' && l.fit !== 'cover' && Math.abs(l.width / l.height - 859 / 1280) < 0.02, JSON.stringify(l));
  await advance(page);
  await resumeHere(page);
  l = await one('nakata-practice-bashful.webp');
  check('c07-018 でリロードし、つづきからで全身の照れ笑いが戻る', (await show(page)).lineId === 'c07-018' && l && l.fit !== 'cover', JSON.stringify(l));
  await advance(page);
  check('c07-019 で中田を消す', (await show(page)).lineId === 'c07-019' && (await files()) === '', await files());
  await advance(page); await waitPortraitLoaded(page);
  check('c07-020 で既存の通常顔に切り替わる', (await files()) === 'left:nakata-practice-normal.webp', await files());
  await snap(page, 'expressions-' + viewport.width);
  await ctx.close();
}

// 一枚絵第2便：表示開始・維持・解除と通常画面への復帰、区間中のつづきから、重要部分の位置、CG 鑑賞への解放、5-26 の両分岐。
const cgNow = (page) => page.evaluate(() => {
  const cg = document.querySelector('.kit-cg');
  const d = document.querySelector('.kit-dialogue').getBoundingClientRect();
  if (cg.hidden || !cg.getAttribute('src')) return null;
  const r = cg.getBoundingClientRect();
  const cs = getComputedStyle(cg);
  const pad = parseFloat(cs.paddingBottom) || 0;
  // object-fit の内容（画像が描かれる領域）を求める
  const boxW = r.width, boxH = r.height - pad;
  let w = boxW, h = boxW * 1080 / 1920;
  if (cs.objectFit === 'contain' && h > boxH) { h = boxH; w = boxH * 1920 / 1080; }
  if (cs.objectFit === 'cover') { h = Math.max(boxH, boxW * 1080 / 1920); w = h * 1920 / 1080; }
  const left = r.left + (boxW - w) / 2, top = r.top + (boxH - h) / 2;
  return { file: cg.getAttribute('src').split('/').pop(), loaded: cg.complete && cg.naturalWidth === 1920, fit: cs.objectFit, full: r.left <= 0 && r.top <= 0 && r.right >= innerWidth && r.bottom >= innerHeight,
    img: { left, top, w, h }, dialogueTop: d.top, vw: innerWidth, vh: innerHeight };
});
const cgPoint = (c, fx, fy) => ({ x: c.img.left + fx * c.img.w, y: c.img.top + fy * c.img.h });
async function cgBatch02InPlay(browser, viewport, label, pick) {
  const ctx = await browser.newContext({ viewport });
  const page = await openGame(ctx, { speedZero: true });
  section('一枚絵第2便（' + label + '・5-26は' + (pick === 0 ? '田原の捕球' : '小宮の守備') + '）');
  await clickText(page, 'はじめから');
  const resumeAt = async (lineId) => {
    await page.evaluate(([key, a]) => {
      const raw = JSON.parse(localStorage.getItem(key));
      raw.auto = { ...raw.auto, at: a };
      localStorage.setItem(key, JSON.stringify(raw));
    }, [SAVE_KEY, lineId]);
    await resumeHere(page);
    return (await show(page)).lineId === lineId;
  };
  const waitCg = () => page.waitForFunction(() => { const c = document.querySelector('.kit-cg'); return c.hidden || (c.complete && c.naturalWidth > 0); }, null, { timeout: 8000 });
  const gallery = () => page.evaluate(() => ({ ...KIT.s.gallery }));
  const ALL = ['hirano-field-visit-vision', 'c10-kawamoto-daydream-embrace', 'c13-shinjo-daydream-dinner', 'cbus-oyama-daydream-bride', 'c26a-tahara-daydream-home', 'c26b-komiya-daydream-hand'];
  check('はじめの時点で、第2便の一枚絵はどれも未解放', Object.keys(await gallery()).filter((k) => ALL.includes(k)).length === 0, JSON.stringify(await gallery()));
  // [直前の行, 開始, 途中, 末尾, 解除の行, 画像, 解除後の立ち絵, 重要部分（画像内の割合）, 名前]
  const spans = [
    ['c01-008', 'c01-009', 'c01-010', 'c01-011', 'c01-012', 'hirano-field-visit-vision.webp', '', [[0.93, 0.8, 'グラブと球']], '平野の朝練見学'],
    ['c10-014', 'c10-015', 'c10-016', 'c10-017', 'c10-018', 'c10-kawamoto-daydream-embrace.webp', 'left:misora-game-uniform-normal.webp,right:kawamoto-casual-normal.webp', [[0.31, 0.85, '美空の浮いた足'], [0.58, 0.4, '抱き止める姿']], '河本'],
    ['c13-020', 'c13-021', 'c13-022', 'c13-022', 'c13-023', 'c13-shinjo-daydream-dinner.webp', '', [[0.52, 0.43, '乾杯するグラス'], [0.28, 0.27, '美空の顔'], [0.63, 0.27, '新庄の顔']], '新庄'],
    ['cbus-003', 'cbus-003a', 'cbus-003a', 'cbus-003a', 'cbus-004', 'cbus-oyama-daydream-bride.webp', '', [[0.48, 0.33, '美空の顔'], [0.5, 0.83, '白無垢']], '大山'],
  ];
  if (pick === 0) spans.push(['c26a-007', 'c26a-008', 'c26a-008', 'c26a-008', 'c26a-009', 'c26a-tahara-daydream-home.webp', '', [[0.62, 0.84, '食卓の料理'], [0.67, 0.53, '皿を運ぶ美空']], '田原']);
  else spans.push(['c26b-007', 'c26b-008', 'c26b-008', 'c26b-008', 'c26b-008a', 'c26b-komiya-daydream-hand.webp', '', [[0.5, 0.8, 'つないだ手'], [0.48, 0.24, '振り返る美空']], '小宮']);
  for (const [before, start, mid, end, release, file, after, points, name] of spans) {
    await resumeAt(before);
    check(name + '：直前（' + before + '）は一枚絵なし', (await cgNow(page)) === null);
    await advance(page); await waitCg();
    let c = await cgNow(page);
    check(name + '：' + start + ' で一枚絵が表示され、画面全体を覆う（立ち絵が透けない）', (await show(page)).lineId === start && c && c.file === file && c.loaded && c.full, JSON.stringify(c));
    check(name + '：一枚絵の表示中は立ち絵を出さない', (await portraitNow(page)).length === 0);
    for (const [fx, fy, what] of points) {
      const pt = c && cgPoint(c, fx, fy);
      check(name + '：' + what + ' が画面内で、本文欄より上にある', pt && pt.y < c.dialogueTop && pt.x > 0 && pt.x < c.vw && pt.y > 0, JSON.stringify(pt) + ' 本文欄 ' + (c && c.dialogueTop));
    }
    check(name + '：' + start + ' に到達して CG 鑑賞へ解放される', !!(await gallery())[file.replace('.webp', '')]);
    await advanceToPicking(page, mid, pick);
    await resumeHere(page); await waitCg();
    const r = await cgNow(page);
    check(name + '：' + mid + ' でリロードし、つづきからで同じ画像と配置に戻る', (await show(page)).lineId === mid && r && r.file === file && r.full && c && Math.abs(r.img.w - c.img.w) < 2 && Math.abs(r.img.top - c.img.top) < 2, JSON.stringify(r));
    await advanceToPicking(page, end, pick);
    check(name + '：末尾（' + end + '）まで一枚絵を維持する', ((await cgNow(page)) || {}).file === file);
    await advanceToPicking(page, release, pick);
    await waitPortraitLoaded(page);
    const files = (await layoutNow(page)).map((l) => l.slot + ':' + l.file).join(',');
    check(name + '：' + release + ' で一枚絵を解除し、その行の背景と立ち絵に戻る', (await show(page)).lineId === release && (await cgNow(page)) === null && files === after, files);
  }
  // 5-26 の分岐：選んだ側だけを解放し、合流後も残さない
  const other = pick === 0 ? 'c26b-komiya-daydream-hand' : 'c26a-tahara-daydream-home';
  const mine = pick === 0 ? 'c26a-tahara-daydream-home' : 'c26b-komiya-daydream-hand';
  await advanceToPicking(page, 'c26e-001', pick);
  const g = await gallery();
  check('5-26 合流（c26e-001）：一枚絵は残らない', (await cgNow(page)) === null);
  check('5-26：選んだ側の一枚絵（' + mine + '）だけが解放され、選ばなかった側（' + other + '）は未解放', !!g[mine] && !g[other], JSON.stringify(g));
  await advanceToPicking(page, 'c27-001', pick);
  check('5-27 へ進んでも、選ばなかった側の一枚絵は未解放のまま', !(await gallery())[other]);
  await clickText(page, 'タイトル');
  await page.waitForFunction(() => KIT.s.screen === 'title');
  await clickText(page, 'CG鑑賞');
  const cards = await page.evaluate(() => [...document.querySelectorAll('.kit-cg-card')].map((b) => !b.classList.contains('locked')));
  const ids = await page.evaluate(() => Object.keys(KIT_GAME.assets.cgs));
  check('CG 鑑賞：7枚のうち、選ばなかった分岐の一枚絵（' + other + '）だけが鍵のまま', cards.length === 7 && cards.filter(Boolean).length === 6 && cards[ids.indexOf(other)] === false, JSON.stringify(cards));
  await snap(page, 'cg-batch02-' + viewport.width + '-' + pick);
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
  check('背景も戻る（朝のフェンスの外）', back.bg.includes('hosho-field-fence-morning.webp'), back.bg);
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
  for (const p of ['index.html', 'game.js', 'kit/releases/0.1.0/kit.js', 'kit/releases/0.1.0/kit.css']) {
    const res = await fetch(BASE + p);
    await res.arrayBuffer();
    check('/adv02/ の下で ' + p + ' が 200', res.status === 200, String(res.status));
  }
  const missingBg = [];
  for (const file of Object.values(G.assets.backgrounds)) {
    const res = await fetch(BASE + file);
    await res.arrayBuffer();
    const type = res.headers.get('content-type') || '';
    if (res.status !== 200 || !type.startsWith(file.endsWith('.webp') ? 'image/webp' : 'image/png')) missingBg.push(file + ' ' + res.status + ' ' + type);
  }
  check('/adv02/ の下で、登録した背景31枚がすべて 200（image/webp）', missingBg.length === 0, missingBg.join(' | '));
}

// 人物の一貫性の調整：青岳戦・決勝の3経路（事前準備／当日の確認／どちらもしない）を実際に選んで進め、
// 足した行が選んだ経路でだけ出ること、本文が画面に収まること、得点と勝敗、足した行の途中から「つづきから」で戻ることを確かめる。
async function consistencyRoutes(browser, viewport) {
  const ctx = await browser.newContext({ viewport });
  const page = await openGame(ctx, { speedZero: true });
  await clickText(page, 'はじめから');
  section('人物の一貫性：青岳戦・決勝の3経路（' + viewport.width + '×' + viewport.height + '）');
  const games = [
    { name: '青岳戦', from: G.scenes['aotake-quarterfinal'].lines[0].id, end: 'aotake-no-tomorrow', win: 'teirei-final',
      lossOnly: ['c32h-002', 'c32h-003', 'c32h-004', 'c32h-005', 'c32h-006'], winOnly: ['c32i-002a', 'c32i-002b', 'c32i-004'],
      resume: { loss: 'c32h-004', win: 'c32i-002b' }, score: { loss: ['c32l-002', '2対3'], win: ['c32k-004', '3対2'] } },
    { name: '決勝', from: G.scenes['teirei-final'].lines[0].id, end: 'teirei-champion-shinjo', win: 'last-out',
      lossOnly: ['c33k-001m', 'c33k-001n', 'c33k-001o', 'c33k-001q'], winOnly: ['c33i-003a'],
      resume: { loss: 'c33k-001n', win: 'c33i-003a' }, score: { loss: ['c33k-004', '4対5'], win: ['c33h-001a', '4対3'] } },
  ];
  for (const g of games) {
    for (const [label, picks] of [['事前準備', [0]], ['当日の確認', [1, 0]], ['どちらもしない', [1, 1]]]) {
      await page.evaluate(([key, at]) => {
        const raw = JSON.parse(localStorage.getItem(key));
        raw.auto.at = at;
        for (const k of Object.keys(raw.auto.flags)) raw.auto.flags[k] = false;
        localStorage.setItem(key, JSON.stringify(raw));
      }, [SAVE_KEY, g.from]);
      await resumeHere(page);
      const seen = [];
      const issues = [];
      const queue = [...picks];
      let resumed = false;
      for (let i = 0; i < 300; i++) {
        const st = await show(page);
        if (st.scene === g.end || st.scene === g.win) break;
        if (st.choices) { await page.locator('.kit-choice').nth(queue.shift()).click(); continue; }
        seen.push(st.lineId);
        if (!fits(await layout(page))) issues.push(st.lineId);
        const loss = label === 'どちらもしない';
        if (!resumed && st.lineId === g.resume[loss ? 'loss' : 'win']) {
          await resumeHere(page);
          const back = await show(page);
          check(g.name + '・' + label + '：' + st.lineId + ' の途中でリロードし、つづきからで同じ行に戻る', back.lineId === st.lineId && back.prose === st.prose);
          resumed = true;
        }
        await advance(page);
      }
      const loss = label === 'どちらもしない';
      const final = (await show(page)).scene;
      const [scoreId, score] = g.score[loss ? 'loss' : 'win'];
      check(g.name + '・' + label + '：' + (loss ? '敗れて' : '勝って') + final + ' へ進み、得点は ' + score,
        final === (loss ? g.end : g.win) && seen.includes(scoreId) && G.scenes[[...Object.keys(G.scenes)].find(k => G.scenes[k].lines.some(l => l.id === scoreId))].lines.find(l => l.id === scoreId).text.includes(score), final);
      check(g.name + '・' + label + '：足した行は' + (loss ? '敗退側' : '勝利側') + 'だけに出る',
        (loss ? g.lossOnly : g.winOnly).every(id => seen.includes(id)) && (loss ? g.winOnly : g.lossOnly).every(id => !seen.includes(id)) && resumed);
      check(g.name + '・' + label + '：本文と操作が画面内に収まる', issues.length === 0, issues.slice(0, 4).join(' '));
    }
  }
  await ctx.close();
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
    await portraitsInPlay(browser, SMALL_LANDSCAPE, '667×375');
    await portraitsInPlay(browser, DESKTOP, '1280×720');
    for (const pick of [0, 1]) {
      await portraitsLater(browser, SMALL_LANDSCAPE, '667×375', pick);
      await portraitsLater(browser, DESKTOP, '1280×720', pick);
    }
    await backgroundsInPlay(browser, SMALL_LANDSCAPE, '667×375', 0);
    await backgroundsInPlay(browser, DESKTOP, '1280×720', 1);
    for (const pick of [0, 1]) {
      await lodgingInPlay(browser, SMALL_LANDSCAPE, '667×375', pick);
      await lodgingInPlay(browser, DESKTOP, '1280×720', pick);
      await batch3InPlay(browser, SMALL_LANDSCAPE, '667×375', pick);
      await batch3InPlay(browser, DESKTOP, '1280×720', pick);
    }
    await batch4InPlay(browser, SMALL_LANDSCAPE, '667×375');
    await batch4InPlay(browser, DESKTOP, '1280×720');
    await rookiesHomeGround(browser, SMALL_LANDSCAPE, '667×375', 0);
    await rookiesHomeGround(browser, DESKTOP, '1280×720', 1);
    await expressionsInPlay(browser, SMALL_LANDSCAPE, '667×375');
    await expressionsInPlay(browser, DESKTOP, '1280×720');
    await cgBatch02InPlay(browser, SMALL_LANDSCAPE, '667×375', 0);
    await cgBatch02InPlay(browser, DESKTOP, '1280×720', 1);
    await cgBatch02InPlay(browser, SMALL_LANDSCAPE, '667×375', 1);
    await cgBatch02InPlay(browser, DESKTOP, '1280×720', 0);
    await expressionsBatch01(browser, SMALL_LANDSCAPE);
    await expressionsBatch01(browser, DESKTOP);
    await consistencyRoutes(browser, SMALL_LANDSCAPE);
    await consistencyRoutes(browser, DESKTOP);
    await practicePlaythrough(browser, 0);
    await practicePlaythrough(browser, 1);

    section('実行中のエラー');
    check('ページの例外・console error・404 がない（公開先の外への参照もない）', ERRORS.length === 0, ERRORS.slice(0, 5).join(' | '));
    const needed = [BASE + 'index.html', BASE + 'game.js', BASE + 'kit/releases/0.1.0/kit.css',
      ...['hosho-field-fence-morning', 'hosho-field-afternoon', 'hosho-field-bench', 'regional-stadium-dugout-sunset',
        'bus-interior-sunset', 'koshien-dugout', 'koshien-field', 'lodging-dining-hallway', 'lodging-dining-hall',
        'lodging-dining-hall-night', 'ryusei-clubroom-night', 'hosho-classroom', 'hosho-vending-area', 'hosho-school-exterior', 'hosho-school-corridor', 'oyama-home-exterior-night', 'hospital-waiting-room', 'hosho-gate-bus-morning', 'school-station-road-evening', 'hirano-room', 'hospital-corridor'].map((k) => BASE + G.assets.backgrounds[k]),
      BASE + 'assets/portraits/oyama-school-winter-normal.webp', BASE + 'assets/portraits/misora-game-uniform-normal.webp'];
    check('必要な素材がすべて 200 で読み込まれた', needed.every((u) => OK_URLS.has(u)), needed.filter((u) => !OK_URLS.has(u)).join(' '));
  } finally {
    await browser.close();
    server.close();
  }
  process.exitCode = summary() ? 1 : 0;
}

main().catch((e) => { console.error(e); process.exitCode = 1; });
