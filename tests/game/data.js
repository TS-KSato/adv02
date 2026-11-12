// 『きみのための甲子園』の作品データの試験（ブラウザ不要）。
// 確かめること：固定版の検証に通る、作品IDと版、冒頭一場面の23行が docs/opening-script.md と一致する、
// 話者・素材・演出がすべて定義済みで実在する、初練習の両経路が合流する、参照がすべて相対パスである。
'use strict';
const fs = require('fs');
const path = require('path');
const { check, section, summary } = require('../lib/check');

const ROOT = path.join(__dirname, '..', '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

// 作品データは、ブラウザと同じく window.KIT_GAME へ代入する形で読む（試験用の読み込み。エンジンは eval を使わない）
const w = {};
new Function('window', read('game.js'))(w);
const G = w.KIT_GAME;

// 検証は、キットの固定版（kit/releases/0.1.0）で行う。エンジン側の複製は使わない。
const V = require(path.join(ROOT, 'kit', 'releases', '0.1.0', 'validate.js'));

section('固定版による作品データの検証');
const v = V.validateGame(G);
check('固定版の検証に通る', v.ok, v.errors.join(' / '));

section('作品の識別子・版');
check('作品IDは novelgame02-koshien', G.id === 'novelgame02-koshien', G.id);
check('作品名は きみのための甲子園', G.title === 'きみのための甲子園', G.title);
check('作品データの版は 2026.10-1', G.dataVersion === '2026.10-1', G.dataVersion);
check('使うキットの版は 0.1.0', G.kit === '0.1.0', G.kit);
const kitJs = read('kit/releases/0.1.0/kit.js');
const kitVersion = (kitJs.match(/const KIT_VERSION = '([^']+)'/) || [])[1];
check('固定版 kit.js の版も 0.1.0', kitVersion === '0.1.0', kitVersion);
check('開始位置は opening-ground の c01-001', G.start.scene === 'opening-ground' && G.start.line === 'c01-001');
check('保存の移行は持たない（migrations が空）', JSON.stringify(G.migrations) === '{}');
check('最初の分岐は勝敗フラグを変えない', Object.keys(G.flags).length === 0);

section('場面と行');
const scenes = Object.keys(G.scenes);
const scene = G.scenes['opening-ground'];
check('場面名は 春のグラウンド', scene.title === '春のグラウンド', scene.title);
check('冒頭の次は初練習へ進む', !scene.choices && scene.next === 'practice-start');
check('冒頭は 23 行のまま', scene.lines.length === 23, String(scene.lines.length));
const lines = scene.lines;
const ids = lines.map((l) => l.id);
const allLines = scenes.flatMap((key) => G.scenes[key].lines);
const allIds = allLines.map(l => l.id);
check('行IDは c01-001 から c01-023 まで、順番どおり', ids.every((id, i) => id === 'c01-' + String(i + 1).padStart(3, '0')), ids.join(','));
check('行IDは作品全体で一意', new Set(allIds).size === allIds.length);
check('行IDは英小文字・数字・ハイフンで40字以内', allIds.every((id) => /^[a-z0-9][a-z0-9-]{0,39}$/.test(id)));

// docs/opening-script.md の表と、本文・話者・順番が一致する（作品データと確認用文書のずれを防ぐ）
const doc = read('docs/opening-script.md');
const rows = doc.split('\n')
  .filter((l) => /^\| c01-\d{3} \|/.test(l))
  .map((l) => l.split('|').slice(1, -1).map((c) => c.trim()));
const SPK_JA = { hirano: '平野', oyama: '大山' };
check('確認用文書の表も 23 行', rows.length === 23, String(rows.length));
const mismatch = [];
lines.forEach((l, i) => {
  const r = rows[i];
  const speakerJa = l.speaker ? SPK_JA[l.speaker] : '地の文';
  if (!r || r[0] !== l.id || r[1] !== speakerJa || r[2] !== l.text) mismatch.push(l.id);
});
check('本文・話者・行IDが docs/opening-script.md と一致する', mismatch.length === 0, mismatch.join(', '));
check('話者なしの行は地の文として、話者名を持たない', lines.filter((l) => !l.speaker).every((l) => l.speaker === undefined));

section('初練習の選択肢と合流');
const start = G.scenes['practice-start'];
const choices = start.choices || [];
check('練習参加時に内野か外野を選ぶ', choices.length === 2 && choices[0].text === '内野のノックに混じる' && choices[1].text === '外野の返球に混じる');
check('二つの選択肢はそれぞれ別の練習を読める', choices[0]?.to === 'practice-infield' && choices[1]?.to === 'practice-outfield');
check('両方の練習から翌日への共通部分に進む', choices.length === 2 && choices.every(c => G.scenes[c.to]?.next === 'practice-end'));
const end = G.scenes['practice-end'];
check('合流後は「記録する1年生」へ進む', end.next === 'scorer-first' && !end.choices);
const sections = read('docs/practice-script.md').split(/^## .+$/m).slice(1);
const practiceKeys = ['practice-start', 'practice-infield', 'practice-outfield', 'practice-end'];
const practiceMismatch = [];
for (const [i, key] of practiceKeys.entries()) {
  const fromDoc = (sections[i] || '').trim().split(/\n\n+/).filter(p => p && !p.startsWith('**選択肢'));
  const fromGame = G.scenes[key].lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
  if (JSON.stringify(fromDoc) !== JSON.stringify(fromGame)) practiceMismatch.push(key);
}
check('初練習の本文と話者が docs/practice-script.md と一致する', practiceMismatch.length === 0, practiceMismatch.join(', '));

section('記録する1年生');
const scorer = G.scenes['scorer-first'];
const scorerDoc = read('docs/scorer-script.md').split('## 本文\n')[1].trim().split(/\n\n+/);
const scorerLines = scorer.lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
check('本文と話者が docs/scorer-script.md と一致する', JSON.stringify(scorerDoc) === JSON.stringify(scorerLines));
check('記録する1年生の次は美空の登場へ進む', scorer.next === 'coach-arrival' && !scorer.choices);

section('美空の登場');
const arrival = G.scenes['coach-arrival'];
const arrivalDoc = read('docs/coach-arrival-script.md').split('## 本文\n')[1].trim().split(/\n\n+/);
const arrivalLines = arrival.lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
check('本文と話者が docs/coach-arrival-script.md と一致する', JSON.stringify(arrivalDoc) === JSON.stringify(arrivalLines));
check('美空の登場の次は「優勝と結婚」へ進む', arrival.next === 'marriage-start' && !arrival.choices);

section('優勝と結婚');
const marriage = G.scenes['marriage-start'];
const marriageChoices = marriage.choices || [];
check('大山本人と先輩のどちらに聞くか選べる',
  marriageChoices.length === 2 && marriageChoices[0].text === '大山に聞く' && marriageChoices[0].to === 'marriage-oyama' &&
  marriageChoices[1].text === '先輩に聞く' && marriageChoices[1].to === 'marriage-senpai');
check('どちらから聞いても明日の練習の話へ合流し、幕間へ進む',
  marriageChoices.length === 2 && marriageChoices.every(c => G.scenes[c.to]?.next === 'marriage-end') &&
  G.scenes['marriage-end'].next === 'after-ten-more' && !G.scenes['marriage-end'].choices);
const marriageDoc = read('docs/victory-and-marriage-script.md').split(/^## .+$/m).slice(1);
const marriageKeys = ['marriage-start', 'marriage-oyama', 'marriage-senpai', 'marriage-end'];
const marriageMismatch = marriageKeys.filter((key, i) => {
  const expected = (marriageDoc[i] || '').trim().split(/\n\n+/).filter(p => p && !p.startsWith('**選択肢'));
  const actual = G.scenes[key].lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
  return JSON.stringify(expected) !== JSON.stringify(actual);
});
check('本文と話者が docs/victory-and-marriage-script.md と一致する', marriageMismatch.length === 0, marriageMismatch.join(', '));

section('あと10本／指導の出所');
check('幕間のあとにバント守備へ進む', G.scenes['after-ten-more'].next === 'coaching-start');
const coachingChoices = G.scenes['coaching-start'].choices || [];
check('平野が先に誰に聞くか、資料を見るかを選べる',
  coachingChoices.length === 2 &&
  coachingChoices[0].text === '指示の意味を聞く' && coachingChoices[0].to === 'coaching-ask' &&
  coachingChoices[1].text === '去年の資料を見返す' && coachingChoices[1].to === 'coaching-notes');
check('どちらの調べ方でも美空に問いかけ、外周50周へ進む',
  coachingChoices.length === 2 && coachingChoices.every(c => G.scenes[c.to]?.next === 'coaching-end') &&
  G.scenes['coaching-end'].next === 'fifty-laps' && !G.scenes['coaching-end'].choices);
const coachingDoc = read('docs/source-of-coaching-script.md').split(/^## .+$/m).slice(1);
const coachingKeys = ['after-ten-more', 'coaching-start', 'coaching-ask', 'coaching-notes', 'coaching-end'];
const coachingMismatch = coachingKeys.filter((key, i) => {
  const expected = (coachingDoc[i] || '').trim().split(/\n\n+/).filter(p => p && !p.startsWith('**選択肢'));
  const actual = G.scenes[key].lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
  return JSON.stringify(expected) !== JSON.stringify(actual);
});
check('本文と話者が docs/source-of-coaching-script.md と一致する', coachingMismatch.length === 0, coachingMismatch.join(', '));

section('外周50周');
const laps = G.scenes['fifty-laps'];
const lapsDoc = read('docs/fifty-laps-script.md').split('## 本文\n')[1].trim().split(/\n\n+/);
const lapsLines = laps.lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
check('本文と話者が docs/fifty-laps-script.md と一致する', JSON.stringify(lapsDoc) === JSON.stringify(lapsLines));
check('外周50周から美空との会話へ進む', laps.next === 'convenient-scorer' && !laps.choices);

section('便利な部員、特別な相手');
const convenient = G.scenes['convenient-scorer'];
const convenientDoc = read('docs/convenient-scorer-script.md').split('## 本文\n')[1].trim().split(/\n\n+/);
const convenientLines = convenient.lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
check('本文と話者が docs/convenient-scorer-script.md と一致する', JSON.stringify(convenientDoc) === JSON.stringify(convenientLines));
check('便利な部員、特別な相手の次は幕間へ進む', convenient.next === 'desk-corner' && !convenient.choices);

section('机の端／日和との日常');
check('幕間のあとに日和と片づけをする', G.scenes['desk-corner'].next === 'hiyori-start');
const hiyoriChoices = G.scenes['hiyori-start'].choices || [];
check('飲み物か用具の片づけを選べる',
  hiyoriChoices.length === 2 &&
  hiyoriChoices[0].text === '飲み物を運ぶ' && hiyoriChoices[0].to === 'hiyori-drinks' &&
  hiyoriChoices[1].text === '用具の片づけを手伝う' && hiyoriChoices[1].to === 'hiyori-equipment');
check('片づけの選択肢は翌日の共通場面に合流する',
  hiyoriChoices.length === 2 && hiyoriChoices.every(c => G.scenes[c.to]?.next === 'hiyori-end') &&
  G.scenes['hiyori-end'].next === 'kawamoto-visit' && !G.scenes['hiyori-end'].choices);
const hiyoriDoc = read('docs/hiyori-everyday-script.md').split(/^## .+$/m).slice(1);
const hiyoriKeys = ['desk-corner', 'hiyori-start', 'hiyori-drinks', 'hiyori-equipment', 'hiyori-end'];
const hiyoriMismatch = hiyoriKeys.filter((key, i) => {
  const expected = (hiyoriDoc[i] || '').trim().split(/\n\n+/).filter(p => p && !p.startsWith('**選択肢'));
  const actual = G.scenes[key].lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
  return JSON.stringify(expected) !== JSON.stringify(actual);
});
check('本文と話者が docs/hiyori-everyday-script.md と一致する', hiyoriMismatch.length === 0, hiyoriMismatch.join(', '));

section('河本の来校');
const kawamoto = G.scenes['kawamoto-visit'];
const kawamotoDoc = read('docs/kawamoto-visit-script.md').split('## 本文\n')[1].trim().split(/\n\n+/);
const kawamotoLines = kawamoto.lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
check('本文と話者が docs/kawamoto-visit-script.md と一致する', JSON.stringify(kawamotoDoc) === JSON.stringify(kawamotoLines));
check('河本の来校から証言へ進む', kawamoto.next === 'testimony-start' && !kawamoto.choices);

section('河本の証言');
check('就任初日の回想を経て、現在の場面へ戻る',
  G.scenes['testimony-start'].next === 'testimony-memory' &&
  G.scenes['testimony-memory'].next === 'testimony-present');
const testimonyChoices = G.scenes['testimony-present'].choices || [];
check('回想のあと、平野が聞くか大山を待つか選べる',
  testimonyChoices.length === 2 &&
  testimonyChoices[0].text === '平野が聞き返す' && testimonyChoices[0].to === 'testimony-ask' &&
  testimonyChoices[1].text === '大山の反応を待つ' && testimonyChoices[1].to === 'testimony-wait');
check('どちらの反応からも、河本が美空のもとへ戻る場面へ合流する',
  testimonyChoices.length === 2 && testimonyChoices.every(c => G.scenes[c.to]?.next === 'testimony-end') &&
  G.scenes['testimony-end'].next === 'kawamoto-results' && !G.scenes['testimony-end'].choices);
const testimonyDoc = read('docs/kawamoto-testimony-script.md').split(/^## .+$/m).slice(1);
const testimonyKeys = ['testimony-start', 'testimony-memory', 'testimony-present', 'testimony-ask', 'testimony-wait', 'testimony-end'];
const testimonyMismatch = testimonyKeys.filter((key, i) => {
  const expected = (testimonyDoc[i] || '').trim().split(/\n\n+/).filter(p => p && !p.startsWith('**選択肢'));
  const actual = G.scenes[key].lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
  return JSON.stringify(expected) !== JSON.stringify(actual);
});
check('本文と話者が docs/kawamoto-testimony-script.md と一致する', testimonyMismatch.length === 0, testimonyMismatch.join(', '));

section('実績では伝わらない');
const results = G.scenes['kawamoto-results'];
const resultsDoc = read('docs/kawamoto-results-script.md').split('## 本文\n')[1].trim().split(/\n\n+/);
const resultsLines = results.lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
check('本文と話者が docs/kawamoto-results-script.md と一致する', JSON.stringify(resultsDoc) === JSON.stringify(resultsLines));
check('河本の再訪の約束から新庄との練習試合へ進む', results.next === 'shinjo-first-meeting' && !results.choices);

section('新庄との接触');
const shinjo = G.scenes['shinjo-first-meeting'];
const shinjoDoc = read('docs/shinjo-first-meeting-script.md').split('## 本文\n')[1].trim().split(/\n\n+/);
const shinjoLines = shinjo.lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
check('本文と話者が docs/shinjo-first-meeting-script.md と一致する', JSON.stringify(shinjoDoc) === JSON.stringify(shinjoLines));
check('新庄との練習試合から夏の名簿へ進む', shinjo.next === 'summer-roster' && !shinjo.choices);

section('夏の名簿');
const roster = G.scenes['summer-roster'];
const rosterDoc = read('docs/summer-roster-script.md').split('## 本文\n')[1].trim().split(/\n\n+/);
const rosterLines = roster.lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
check('本文と話者が docs/summer-roster-script.md と一致する', JSON.stringify(rosterDoc) === JSON.stringify(rosterLines));
check('夏の名簿から地方大会準々決勝へ進む', roster.next === 'regional-quarterfinal' && !roster.choices);

section('地方予選');
const quarterfinal = G.scenes['regional-quarterfinal'];
const quarterfinalDoc = read('docs/regional-quarterfinal-script.md').split('## 本文\n')[1].trim().split(/\n\n+/);
const quarterfinalLines = quarterfinal.lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
check('本文と話者が docs/regional-quarterfinal-script.md と一致する', JSON.stringify(quarterfinalDoc) === JSON.stringify(quarterfinalLines));
check('地方予選から佐々木の指名へ進む', quarterfinal.next === 'sasaki-called' && !quarterfinal.choices);

section('佐々木の指名');
const sasakiCalled = G.scenes['sasaki-called'];
const sasakiCalledDoc = read('docs/sasaki-called-script.md').split('## 本文\n')[1].trim().split(/\n\n+/);
const sasakiCalledLines = sasakiCalled.lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
check('本文と話者が docs/sasaki-called-script.md と一致する', JSON.stringify(sasakiCalledDoc) === JSON.stringify(sasakiCalledLines));
check('佐々木の指名が現時点の最後の場面である', !sasakiCalled.next && !sasakiCalled.choices);

section('話者');
const speakerKeys = [...new Set(lines.map((l) => l.speaker).filter(Boolean))].sort();
check('冒頭の話者は hirano と oyama', JSON.stringify(speakerKeys) === '["hirano","oyama"]', speakerKeys.join(','));
check('話者の表示名は 平野・大山', G.speakers.hirano === '平野' && G.speakers.oyama === '大山', JSON.stringify(G.speakers));
check('平野の一人称の文に、開発者向けの注記が混ざらない', allLines.every((l) => !/TODO|注:|※/.test(l.text)));

section('素材と演出（すべて定義済み・実在）');
const bgs = G.assets.backgrounds;
check('背景の登録は仮背景の一枚だけ', JSON.stringify(Object.keys(bgs)) === '["field-morning-temp"]', Object.keys(bgs).join(','));
for (const group of ['portraits', 'cgs', 'bgm', 'ambience', 'se']) {
  check('素材「' + group + '」は空（今回は未登録でよい）', Object.keys(G.assets[group] || {}).length === 0);
}
for (const [key, file] of Object.entries(bgs)) {
  check('背景 ' + key + ' のパスは作品基準の相対パス', file.startsWith('assets/') && !file.startsWith('/'), file);
  const full = path.join(ROOT, file);
  check('背景 ' + key + ' の実ファイルがある', fs.existsSync(full), file);
  if (fs.existsSync(full)) {
    const sig = fs.readFileSync(full).subarray(0, 8).toString('hex');
    check('背景 ' + key + ' は PNG', sig === '89504e470d0a1a0a', sig);
  }
}
check('演出は背景の一つだけ（c01-001）', G.cues.length === 1 && G.cues[0].at === 'c01-001' && G.cues[0].bg === 'field-morning-temp', JSON.stringify(G.cues));

section('相対パス（公開先 /adv02/ の下で動く）');
const indexHtml = read('index.html');
const refs = [...indexHtml.matchAll(/(?:src|href)="([^"]+)"/g)].map((m) => m[1]).filter((r) => !r.startsWith('data:'));
check('index.html の参照はすべて ./ で始まる相対パス', refs.length > 0 && refs.every((r) => r.startsWith('./')), refs.join(' '));
check('index.html は固定版 0.1.0 の四ファイルを読む', ['validate.js', 'save.js', 'kit.js', 'kit.css'].every((f) => refs.some((r) => r === './kit/releases/0.1.0/' + f)));
check('index.html は engine 側の複製を読まない', !refs.some((r) => r.includes('kit/engine/')));
check('index.html は game.js を読む', refs.includes('./game.js'));
check('index.html は新作専用の game.css を、キットの後に読む', refs.indexOf('./game.css') > refs.indexOf('./kit/releases/0.1.0/kit.css'));
check('game.css はキットの配置（engine・releases）を参照しない', !/kit\/engine|releases\/0\.1\.0/.test(read('game.css')));
check('index.html の作品名は 新作の名前（ゼルグ・サンプルの名前がない）', /<title>きみのための甲子園<\/title>/.test(indexHtml) && !/ゼルグ|サンプル|novelgame01/.test(indexHtml));
check('作品データの参照に / で始まるパス・novelgame01 がない', !/['"]\/[a-z]/.test(read('game.js')) && !/novelgame01/.test(read('game.js')));

section('試験用の前提（開発用の記述を持ち込まない）');
check('index.html は kit-root と起動だけを持つ', indexHtml.includes('<div id="kit-root"></div>') && indexHtml.includes('KitEngine.start(window.KIT_GAME)'));
check('作品のどの文章にもゼルグ・サンプルの名前がない', allLines.every((l) => !/ゼルグ|ミオ|サンプル/.test(l.text)));

process.exitCode = summary() ? 1 : 0;
