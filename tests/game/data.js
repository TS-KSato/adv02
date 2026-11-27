// 『きみのための甲子園』の作品データの試験（ブラウザ不要）。
// 確かめること：固定版の検証に通る、作品IDと版、冒頭一場面の23行が docs/opening-script.md と一致する、
// 話者・素材・演出がすべて定義済みで実在する、初練習の両経路が合流する、参照がすべて相対パスである。
// 立ち絵：素材一覧と実ファイルが1対1、35枚が透過WebP・859×1,280px、5-2〜5-12 の配置が決めたとおりで、場面をまたいで残らない。
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
check('作品データの版は 2026.11-5（c10-015-p1 の削除）', G.dataVersion === '2026.11-5', G.dataVersion);
check('使うキットの版は 0.1.0', G.kit === '0.1.0', G.kit);
const kitJs = read('kit/releases/0.1.0/kit.js');
const kitVersion = (kitJs.match(/const KIT_VERSION = '([^']+)'/) || [])[1];
check('固定版 kit.js の版も 0.1.0', kitVersion === '0.1.0', kitVersion);
check('開始位置は opening-ground の c01-001', G.start.scene === 'opening-ground' && G.start.line === 'c01-001');
const oldGame = { ...G, dataVersion: '2026.10-1', flags: {} };
const saves = require('../../kit/releases/0.1.0/save.js');
const oldRecord = { v: 1, game: G.id, dataVersion: oldGame.dataVersion,
  flagSchema: saves.flagSchema(oldGame), auto: { at: 'c01-001', flags: {}, dataVersion: oldGame.dataVersion },
  slots: [{ at: 'c28-017', flags: {}, dataVersion: oldGame.dataVersion }], seen: [] };
const migrated = saves.assess(G, oldRecord, JSON.stringify(oldRecord));
check('旧版の自動・手動保存の位置を維持し、新しい判定はすべて未成立になる',
  migrated.mode === 'migrated' && migrated.record.auto?.at === 'c01-001' && migrated.record.slots[0]?.at === 'c28-017' &&
  [migrated.record.auto, migrated.record.slots[0]].every(p => Object.values(p.flags).every(v => v === false)));
const ryuseiVersion = { ...G, dataVersion: '2026.11-1', flags: { ryuseiPrep: G.flags.ryuseiPrep, ryuseiRecovery: G.flags.ryuseiRecovery } };
const ryuseiRecord = { ...oldRecord, dataVersion: ryuseiVersion.dataVersion, flagSchema: saves.flagSchema(ryuseiVersion),
  auto: { at: 'c30-025', flags: { ryuseiPrep: false, ryuseiRecovery: true }, dataVersion: ryuseiVersion.dataVersion }, slots: [] };
const ryuseiMigrated = saves.assess(G, ryuseiRecord, JSON.stringify(ryuseiRecord));
check('甲子園1回戦の旧版保存から龍成戦の選択と保存位置を引き継ぐ',
  ryuseiMigrated.mode === 'migrated' && ryuseiMigrated.record.auto?.at === 'c30-025' &&
  ryuseiMigrated.record.auto.flags.ryuseiRecovery === true &&
  !ryuseiMigrated.record.auto.flags.konanPrep && !ryuseiMigrated.record.auto.flags.konanRecovery);
const konanFlags = { ryuseiPrep: false, ryuseiRecovery: true, konanPrep: true, konanRecovery: false };
const konanVersion = { ...G, dataVersion: '2026.11-2', flags: Object.fromEntries(Object.keys(konanFlags).map(k => [k, G.flags[k]])) };
const konanRecord = { ...oldRecord, dataVersion: konanVersion.dataVersion, flagSchema: saves.flagSchema(konanVersion),
  auto: { at: 'c31i-007', flags: konanFlags, dataVersion: konanVersion.dataVersion }, slots: [] };
const konanMigrated = saves.assess(G, konanRecord, JSON.stringify(konanRecord));
check('港南工業戦の旧版保存から両試合の選択と保存位置を引き継ぐ',
  konanMigrated.mode === 'migrated' && konanMigrated.record.auto?.at === 'c31i-007' &&
  Object.entries(konanFlags).every(([k, v]) => konanMigrated.record.auto.flags[k] === v) &&
  konanMigrated.record.auto.flags.aotakePrep === false && konanMigrated.record.auto.flags.aotakeRecovery === false);
const aotakeFlags = { ...konanFlags, aotakePrep: false, aotakeRecovery: true };
const aotakeVersion = { ...G, dataVersion: '2026.11-3', flags: Object.fromEntries(Object.keys(aotakeFlags).map(k => [k, G.flags[k]])) };
const aotakeRecord = { ...oldRecord, dataVersion: aotakeVersion.dataVersion, flagSchema: saves.flagSchema(aotakeVersion),
  auto: { at: G.scenes['aotake-win'].lines.at(-1).id, flags: aotakeFlags, dataVersion: aotakeVersion.dataVersion }, slots: [] };
const aotakeMigrated = saves.assess(G, aotakeRecord, JSON.stringify(aotakeRecord));
check('準決勝の旧版保存から選択と保存位置を引き継ぐ',
  aotakeMigrated.mode === 'migrated' && aotakeMigrated.record.auto?.at === aotakeRecord.auto.at &&
  Object.entries(aotakeFlags).every(([k, v]) => aotakeMigrated.record.auto.flags[k] === v) &&
  aotakeMigrated.record.auto.flags.teireiPrep === false && aotakeMigrated.record.auto.flags.teireiRecovery === false);
check('最初の分岐は勝敗フラグを変えない', G.scenes['practice-start'].choices.every(c => !c.set));

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
check('佐々木の指名から打席へ進む', sasakiCalled.next === 'sasaki-home-run' && !sasakiCalled.choices);

section('一度だけの本塁打');
const homeRun = G.scenes['sasaki-home-run'];
const homeRunDoc = read('docs/sasaki-home-run-script.md').split('## 本文\n')[1].trim().split(/\n\n+/);
const homeRunLines = homeRun.lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
check('本文と話者が docs/sasaki-home-run-script.md と一致する', JSON.stringify(homeRunDoc) === JSON.stringify(homeRunLines));
check('北陵戦の決着から新聞と記録へ進む', homeRun.next === 'newspaper-and-scorebook' && !homeRun.choices);

section('新聞と記録');
const newspaper = G.scenes['newspaper-and-scorebook'];
const newspaperDoc = read('docs/newspaper-and-scorebook-script.md').split('## 本文\n')[1].trim().split(/\n\n+/);
const newspaperLines = newspaper.lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
check('本文と話者が docs/newspaper-and-scorebook-script.md と一致する', JSON.stringify(newspaperDoc) === JSON.stringify(newspaperLines));
check('新聞と記録から準決勝前日の場面へ進む', newspaper.next === 'what-her-face-means' && !newspaper.choices);

section('表情が意味を持つ');
const faces = G.scenes['what-her-face-means'];
const facesDoc = read('docs/what-her-face-means-script.md').split('## 本文\n')[1].trim().split(/\n\n+/);
const facesLines = faces.lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
check('本文と話者が docs/what-her-face-means-script.md と一致する', JSON.stringify(facesDoc) === JSON.stringify(facesLines));
check('準決勝の前日から清峰戦へ進む', faces.next === 'oyama-injury' && !faces.choices);

section('大山の負傷');
const injury = G.scenes['oyama-injury'];
const injuryDoc = read('docs/oyama-injury-script.md').split('## 本文\n')[1].trim().split(/\n\n+/);
const injuryLines = injury.lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
check('本文と話者が docs/oyama-injury-script.md と一致する', JSON.stringify(injuryDoc) === JSON.stringify(injuryLines));
check('大山の負傷から龍成との決勝へ進む', injury.next === 'ryusei-defeat' && !injury.choices);

section('龍成との決戦、敗退');
const defeat = G.scenes['ryusei-defeat'];
const defeatDoc = read('docs/ryusei-defeat-script.md').split('## 本文\n')[1].trim().split(/\n\n+/);
const defeatLines = defeat.lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
check('本文と話者が docs/ryusei-defeat-script.md と一致する', JSON.stringify(defeatDoc) === JSON.stringify(defeatLines));
check('龍成戦の敗退から試合直後のベンチへ進む', defeat.next === 'tears-after-the-final' && !defeat.choices);

section('一人の涙、別々の意味');
const tears = G.scenes['tears-after-the-final'];
const tearsDoc = read('docs/tears-after-the-final-script.md').split('## 本文\n')[1].trim().split(/\n\n+/);
const tearsLines = tears.lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
check('本文と話者が docs/tears-after-the-final-script.md と一致する', JSON.stringify(tearsDoc) === JSON.stringify(tearsLines));
check('試合直後のベンチから空いた一行へ進む', tears.next === 'blank-line' && !tears.choices);

section('空いた一行');
const blank = G.scenes['blank-line'];
const blankDoc = read('docs/blank-line-script.md').split('## 本文\n')[1].trim().split(/\n\n+/);
const blankLines = blank.lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
check('本文と話者が docs/blank-line-script.md と一致する', JSON.stringify(blankDoc) === JSON.stringify(blankLines));
check('空いた一行から大山の再診と復帰へ進む', blank.next === 'oyama-return' && !blank.choices);

section('大山の復帰');
const returnScene = G.scenes['oyama-return'];
const returnDoc = read('docs/oyama-return-script.md').split('## 本文\n')[1].trim().split(/\n\n+/);
const returnLines = returnScene.lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
check('本文と話者が docs/oyama-return-script.md と一致する', JSON.stringify(returnDoc) === JSON.stringify(returnLines));
check('大山の復帰から先輩たちの引き継ぎへ進む', returnScene.next === 'nakata-handover' && !returnScene.choices);

section('世代交代');
const handover = G.scenes['nakata-handover'];
const handoverDoc = read('docs/nakata-handover-script.md').split('## 本文\n')[1].trim().split(/\n\n+/);
const handoverLines = handover.lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
check('本文と話者が docs/nakata-handover-script.md と一致する', JSON.stringify(handoverDoc) === JSON.stringify(handoverLines));
check('世代交代から厳が資料を受け取る場面へ進む', handover.next === 'gen-reads-the-records' && !handover.choices);

section('厳が語る娘の決意');
const genRecords = G.scenes['gen-reads-the-records'];
const genRecordsDoc = read('docs/gen-reads-the-records-script.md').split('## 本文\n')[1].trim().split(/\n\n+/);
const genRecordsLines = genRecords.lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
check('本文と話者が docs/gen-reads-the-records-script.md と一致する', JSON.stringify(genRecordsDoc) === JSON.stringify(genRecordsLines));
check('厳が資料を読む場面から剛の目撃へ進む', genRecords.next === 'tsuyoshi-sighting' && !genRecords.choices);

section('剛の目撃');
const sightingKeys = ['tsuyoshi-sighting', 'tsuyoshi-tell', 'tsuyoshi-return-bag', 'tsuyoshi-end'];
const sightingDoc = read('docs/tsuyoshi-sighting-script.md').split(/^## .+$/m).slice(1);
const sightingMismatch = sightingKeys.filter((key, i) => {
  const expected = (sightingDoc[i] || '').trim().split(/\n\n+/).filter(p => !p.startsWith('**選択肢'));
  const actual = G.scenes[key].lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
  return JSON.stringify(expected) !== JSON.stringify(actual);
});
check('本文と話者が docs/tsuyoshi-sighting-script.md と一致する', sightingMismatch.length === 0, sightingMismatch.join(', '));
check('弟だと先に伝えるか荷物を先に届けるかを選べ、どちらも同じ場面に合流する',
  JSON.stringify(G.scenes['tsuyoshi-sighting'].choices.map(c => c.to)) === JSON.stringify(sightingKeys.slice(1, 3)) &&
  sightingKeys.slice(1, 3).every(key => G.scenes[key].next === 'tsuyoshi-end'));
check('剛の目撃から父親たちと取材へ進む', G.scenes['tsuyoshi-end'].next === 'parents-and-press' && !G.scenes['tsuyoshi-end'].choices);

section('父親たちと取材');
const press = G.scenes['parents-and-press'];
const pressDoc = read('docs/parents-and-press-script.md').split('## 本文\n')[1].trim().split(/\n\n+/);
const pressLines = press.lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
check('本文と話者が docs/parents-and-press-script.md と一致する', JSON.stringify(pressDoc) === JSON.stringify(pressLines));
check('父親たちと取材から冬の章間（12月の記録）を経て、新年度の幕間へ進む', press.next === 'winter-records' && !press.choices && G.scenes['winter-records'].next === 'second-scorebook' && !G.scenes['winter-records'].choices);

section('二冊目');
const secondScorebook = G.scenes['second-scorebook'];
const secondScorebookDoc = read('docs/second-scorebook-script.md').split('## 本文\n')[1].trim().split(/\n\n+/);
const secondScorebookLines = secondScorebook.lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
check('本文と話者が docs/second-scorebook-script.md と一致する', JSON.stringify(secondScorebookDoc) === JSON.stringify(secondScorebookLines));
check('二冊目から田原と小宮の登場へ進む', secondScorebook.next === 'tahara-and-komiya' && !secondScorebook.choices);

section('田原と小宮');
const rookieKeys = ['tahara-and-komiya', 'tahara-catching', 'komiya-fielding', 'rookies-teirei'];
const rookieDoc = read('docs/tahara-and-komiya-script.md').split(/^## .+$/m).slice(1);
const rookieMismatch = rookieKeys.filter((key, i) => {
  const expected = (rookieDoc[i] || '').trim().split(/\n\n+/).filter(p => !p.startsWith('**選択肢'));
  const actual = G.scenes[key].lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
  return JSON.stringify(expected) !== JSON.stringify(actual);
});
check('田原と小宮の本文と話者が原稿と一致する', rookieMismatch.length === 0, rookieMismatch.join(', '));
check('田原か小宮を選ぶ両分岐が帝嶺学院戦で合流する',
  JSON.stringify(G.scenes[rookieKeys[0]].choices.map(c => c.to)) === JSON.stringify(rookieKeys.slice(1, 3)) &&
  rookieKeys.slice(1, 3).every(key => G.scenes[key].next === rookieKeys[3]));
check('帝嶺学院戦から夏の大会前へ進む', G.scenes[rookieKeys[3]].next === 'finish-it-this-year' && !G.scenes[rookieKeys[3]].choices);

section('今年こそ終わらせる');
const finishThisYear = G.scenes['finish-it-this-year'];
const finishDoc = read('docs/finish-it-this-year-script.md').split('## 本文\n')[1].trim().split(/\n\n+/);
const finishLines = finishThisYear.lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
check('今年こそ終わらせるの本文と話者が原稿と一致する', JSON.stringify(finishDoc) === JSON.stringify(finishLines));
check('鳳翔の大会準備から野原の再分析へ進む', finishThisYear.next === 'nohara-reanalysis' && !finishThisYear.choices);

section('野原の再分析');
const reanalysis = G.scenes['nohara-reanalysis'];
const reanalysisDoc = read('docs/nohara-reanalysis-script.md').split('## 本文\n')[1].trim().split(/\n\n+/);
const reanalysisLines = reanalysis.lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
check('野原の再分析の本文と話者が原稿と一致する', JSON.stringify(reanalysisDoc) === JSON.stringify(reanalysisLines));
check('野原の再分析から龍成との再戦へ進む', reanalysis.next === 'ryusei-rematch' && !reanalysis.choices);

section('地方予選決勝・龍成との再戦');
const rematchKeys = ["ryusei-rematch", "ryusei-prepared", "ryusei-unprepared", "ryusei-middle", "ryusei-recovery-choice", "ryusei-recovered", "ryusei-unrecovered", "ryusei-late", "ryusei-win", "ryusei-loss", "ryusei-summer"];
const rematchDoc = read('docs/ryusei-rematch-script.md').split(/^## .+$/m).slice(1);
check('龍成戦とE1の本文・話者が原稿と一致する', rematchDoc.length === rematchKeys.length && rematchKeys.every((key, i) => {
  const expected = rematchDoc[i].trim().split(/\n\n+/).filter(p => !p.startsWith('**選択肢'));
  const actual = G.scenes[key].lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
  return JSON.stringify(expected) === JSON.stringify(actual);
}));
function tournamentPath(start, picks) {
  const flags = Object.fromEntries(Object.entries(G.flags).map(([key, def]) => [key, def.default]));
  let key = start;
  const visited = [];
  while (key && !visited.includes(key)) {
    visited.push(key);
    const scene = G.scenes[key];
    if (scene.choices) {
      const choice = scene.choices[picks.shift()];
      if (!choice) break;
      Object.assign(flags, choice.set);
      key = choice.to;
    } else {
      key = typeof scene.next === 'function' ? scene.next(flags) : scene.next;
    }
  }
  return visited.join(' → ');
}
check('事前準備で当日の確認を飛ばし、龍成戦に勝つ',
  tournamentPath('ryusei-rematch', [0]) === 'ryusei-rematch → ryusei-prepared → ryusei-middle → ryusei-late → ryusei-win → bus-to-koshien → national-opponents → konan-press');
check('事前準備なしでも田原と初球を確認すれば勝つ',
  tournamentPath('ryusei-rematch', [1, 0]) === 'ryusei-rematch → ryusei-unprepared → ryusei-middle → ryusei-recovery-choice → ryusei-recovered → ryusei-late → ryusei-win → bus-to-koshien → national-opponents → konan-press');
check('どちらでも初球を確認しなければ敗退し、E1へ進む',
  tournamentPath('ryusei-rematch', [1, 1]) === 'ryusei-rematch → ryusei-unprepared → ryusei-middle → ryusei-recovery-choice → ryusei-unrecovered → ryusei-late → ryusei-loss → ryusei-summer');

section('行きのバス');
const bus = G.scenes['bus-to-koshien'];
const busDoc = read('docs/bus-to-koshien-script.md').split('## 本文\n')[1].trim().split(/\n\n+/);
const busLines = bus.lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
check('行きのバスの本文と話者が原稿と一致する', JSON.stringify(busDoc) === JSON.stringify(busLines));
check('行きのバスから甲子園1回戦へ進む', bus.next === 'national-opponents' && !bus.choices);

section('全国の相手');
const national = G.scenes['national-opponents'];
const nationalDoc = read('docs/national-opponents-script.md').split('## 本文\n')[1].trim().split(/\n\n+/);
const nationalLines = national.lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
check('全国の相手の本文と話者が原稿と一致する', JSON.stringify(nationalDoc) === JSON.stringify(nationalLines));
check('甲子園1回戦から港南工業戦の準備へ進む', national.next === 'konan-press' && !national.choices);

section('取材と準備');
const konanKeys = ["konan-press", "konan-prepared", "konan-unprepared", "konan-recovery-choice", "konan-recovered", "konan-unrecovered", "konan-coach-brief", "konan-ninth", "konan-win", "konan-loss", "konan-return-bus"];
const konanDoc = read('docs/konan-second-round-script.md').split(/^## .+$/m).slice(1);
check('港南戦とE2の本文・話者が原稿と一致する', konanDoc.length === konanKeys.length && konanKeys.every((key, i) => {
  const expected = konanDoc[i].trim().split(/\n\n+/).filter(p => !p.startsWith('**選択肢'));
  const actual = G.scenes[key].lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
  return JSON.stringify(expected) === JSON.stringify(actual);
}));
check('取材を分担して右翼手を見れば、コーチへの伝達を経て勝つ',
  tournamentPath('konan-press', [0]) === 'konan-press → konan-prepared → konan-coach-brief → konan-ninth → konan-win → aotake-round-three → aotake-quarterfinal');
check('当日でも右翼手を見れば、コーチへの伝達を経て勝つ',
  tournamentPath('konan-press', [1, 0]) === 'konan-press → konan-unprepared → konan-recovery-choice → konan-recovered → konan-coach-brief → konan-ninth → konan-win → aotake-round-three → aotake-quarterfinal');
check('どちらでも右翼手を確認しなければ、伝達せず敗退してE2へ進む',
  tournamentPath('konan-press', [1, 1]) === 'konan-press → konan-unprepared → konan-recovery-choice → konan-unrecovered → konan-ninth → konan-loss → konan-return-bus');

section('連戦と準決勝');
const aotakeKeys = ["aotake-round-three", "aotake-quarterfinal", "aotake-prepared", "aotake-unprepared", "aotake-game", "aotake-recovery-choice", "aotake-recovered", "aotake-unrecovered", "aotake-battery-brief", "aotake-eighth", "aotake-win", "aotake-loss", "aotake-no-tomorrow"];
const aotakeDoc = read('docs/aotake-semifinal-script.md').split(/^## .+$/m).slice(1);
check('連戦・青岳戦・E3の本文と話者が原稿と一致する', aotakeDoc.length === aotakeKeys.length && aotakeKeys.every((key, i) => {
  const expected = aotakeDoc[i].trim().split(/\n\n+/).filter(p => !p.startsWith('**選択肢'));
  const actual = G.scenes[key].lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
  return JSON.stringify(expected) === JSON.stringify(actual);
}));
check('事前に球の高さを記録すれば、田原と大山への伝達を経て勝つ',
  tournamentPath('aotake-round-three', [0]) === 'aotake-round-three → aotake-quarterfinal → aotake-prepared → aotake-game → aotake-battery-brief → aotake-eighth → aotake-win → teirei-final');
check('7回終了後に田原と確認しても、田原と大山への伝達を経て勝つ',
  tournamentPath('aotake-round-three', [1, 0]) === 'aotake-round-three → aotake-quarterfinal → aotake-unprepared → aotake-game → aotake-recovery-choice → aotake-recovered → aotake-battery-brief → aotake-eighth → aotake-win → teirei-final');
check('球の高さを確認しなければ、青岳戦で敗れE3へ進む',
  tournamentPath('aotake-round-three', [1, 1]) === 'aotake-round-three → aotake-quarterfinal → aotake-unprepared → aotake-game → aotake-recovery-choice → aotake-unrecovered → aotake-eighth → aotake-loss → aotake-no-tomorrow');

section('帝嶺学院との決勝');
const finalKeys = ["teirei-final", "teirei-prepared", "teirei-unprepared", "teirei-game", "teirei-recovery-choice", "teirei-recovered", "teirei-unrecovered", "teirei-ninth", "teirei-battery-brief", "teirei-win", "teirei-loss", "teirei-champion-shinjo"];
const finalDoc = read('docs/teirei-final-script.md').split(/^## .+$/m).slice(1);
check('決勝・E4の本文と話者が原稿と一致する', finalDoc.length === finalKeys.length && finalKeys.every((key, i) => {
  const expected = finalDoc[i].trim().split(/\n\n+/).filter(p => !p.startsWith('**選択肢'));
  const actual = G.scenes[key].lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
  return JSON.stringify(expected) === JSON.stringify(actual);
}));
check('事前に新庄の打席を比べれば、田原への伝達を経て優勝する',
  tournamentPath('teirei-final', [0]) === 'teirei-final → teirei-prepared → teirei-game → teirei-ninth → teirei-battery-brief → teirei-win → last-out → first-koshien-title → public-proposal → real-promise');
check('8回終了後に田原と照合しても、伝達を経て優勝する',
  tournamentPath('teirei-final', [1, 0]) === 'teirei-final → teirei-unprepared → teirei-game → teirei-recovery-choice → teirei-recovered → teirei-ninth → teirei-battery-brief → teirei-win → last-out → first-koshien-title → public-proposal → real-promise');
check('新庄の踏み出しを確認しなければ、敗れてE4へ進む',
  tournamentPath('teirei-final', [1, 1]) === 'teirei-final → teirei-unprepared → teirei-game → teirei-recovery-choice → teirei-unrecovered → teirei-ninth → teirei-loss → teirei-champion-shinjo');

section('人物の一貫性の調整');
const lineById = new Map(Object.values(G.scenes).flatMap(sc => sc.lines.map(l => [l.id, l])));
const sceneOfId = new Map(Object.entries(G.scenes).flatMap(([k, sc]) => sc.lines.map(l => [l.id, k])));
check('c05e-003：大山は先輩に命令口調で左打席を頼む（前後の「打てたらな」は残す）',
  lineById.get('c05e-003')?.speaker === 'oyama' && lineById.get('c05e-003').text === 'なら左に立て。試したい球がある。' &&
  lineById.get('c05e-005')?.text === '打てたらな。');
check('c19-025：中田は監督に指示せず、自分を見ていてほしいと言う',
  lineById.get('c19-025')?.speaker === 'nakata' && lineById.get('c19-025').text === '監督、まだ終わってません！　俺が取り返します。見ててください！');
check('c24-002：剛の外見に厳との類似を書かない', lineById.get('c24-002')?.text.includes('上着の肩が張っていた。') && !lineById.get('c24-002').text.includes('厳'));
const inScene = (ids, key) => ids.every(id => sceneOfId.get(id) === key);
check('青岳戦：敗退側の直球を直す判断は、7回裏のベンチ（確認しない分岐だけ）で聞こえる',
  inScene(['c32h-002', 'c32h-003', 'c32h-004', 'c32h-005', 'c32h-006'], 'aotake-unrecovered') &&
  G.scenes['aotake-unrecovered'].lines[0].id === 'c32h-001' && G.scenes['aotake-unrecovered'].next === 'aotake-eighth');
check('青岳戦：勝利側の伝達で、大山も気づいており、記録を受けて配球を変える',
  inScene(['c32i-002a', 'c32i-002b', 'c32i-004'], 'aotake-battery-brief') &&
  lineById.get('c32i-002a').speaker === 'oyama' && lineById.get('c32i-004').text.includes('待つより'));
check('帝嶺戦：敗退側のマウンドでの判断は、ベンチに届かない場面として書き、新庄がさらに合わせる',
  inScene(['c33k-001m', 'c33k-001n', 'c33k-001o', 'c33k-001q'], 'teirei-loss') &&
  lineById.get('c33k-001m').text.includes('ベンチまで声は届かない') && lineById.get('c33k-001q').speaker === 'shinjo' &&
  G.scenes['teirei-loss'].lines[0].id === 'c33k-001');
check('帝嶺戦：勝利側の伝達で、田原は自分の読みと春の打席をつないで入りを変える',
  inScene(['c33i-003a'], 'teirei-battery-brief') && lineById.get('c33i-003a').speaker === 'tahara');
check('得点と勝敗の行は変えない', ['c32k-005', 'c32l-002', 'c32l-004', 'c33h-001', 'c33k-004'].every(id => lineById.has(id)) &&
  lineById.get('c32l-002').text.includes('2対3') && lineById.get('c33k-004').text.startsWith('4対5') && lineById.get('c33h-001').text.includes('3対3'));
// 手動セーブは3枠なので、変えた行・足した行の手前を2つの記録に分けて確かめる
const ccFalse = Object.fromEntries(Object.keys(G.flags).map(k => [k, false]));
const ccResume = (auto, slots) => {
  const rec = { v: 1, game: G.id, dataVersion: G.dataVersion, flagSchema: saves.flagSchema(G),
    auto: { at: auto[0], flags: { ...ccFalse, ...auto[1] }, dataVersion: G.dataVersion },
    slots: slots.map(at => ({ at, flags: ccFalse, dataVersion: G.dataVersion })), seen: [] };
  const r = saves.assess(G, rec, JSON.stringify(rec));
  return r.mode === 'current' && r.record.auto.at === auto[0] && Object.entries(auto[1]).every(([k, v]) => r.record.auto.flags[k] === v) &&
    r.record.slots.map(x => x?.at).join() === slots.join();
};
check('現在の版の保存の位置と選択を、そのまま再開できる',
  ccResume(['c32i-004', { aotakeRecovery: true }], ['c05e-003', 'c19-025', 'c24-002']) &&
  ccResume(['c33k-001c', {}], ['c32h-001', 'c33i-004', 'c33k-002']));

section('校正・校閲（言葉選び・改行と表示単位・表記）');
{
  const ln = new Map(Object.values(G.scenes).flatMap((sc) => sc.lines.map((l) => [l.id, l])));
  const flat = (id) => (ln.get(id)?.text || '').replace(/\n/g, '');
  const fixes = {
    'c03-018': '守備についていると、どうしても自分の守備範囲に目が行く。ベンチからだと、打球に触らなかった選手の動きまで見えた。',
    'c08-004': '2塁を狙える当たりでも、1塁を優先するのか、ってことですか？',
    'c29f-002': 'そこ、捕手が最初から外に構えてました。スライダーでストライクを取りに来てるんだと思います。',
    'c32i-004': '低い変化球は来てます。真っすぐが戻るのを待つより、次はそれでゴロを打たせましょう。',
    'c16-016': '2人の生還を書き込み、得点欄に3と記した。3対2。鳳翔が初めて前に出た。',
  };
  check('指定の行を承認された文に直した（c03-018・c08-004・c29f-002・c32i-004・c16-016）', Object.entries(fixes).every(([id, t]) => flat(id) === t),
    Object.entries(fixes).filter(([id, t]) => flat(id) !== t).map(([id]) => id).join(' '));
  check('c31a-007：日和は返球が走塁に与える影響まで話し、「もう1本、似た打球」を残す', flat('c31a-007').includes('中継を越えて') && flat('c31a-007').includes('帰れない') && flat('c31a-007').includes('もう1本、似た打球があった'));
  check('c25-001：スコアの写しを球場の記録係に届ける', flat('c25-001').includes('球場の記録係にスコアの写しを届けに行った') && !flat('c25-001').includes('本部席'));
  check('c19-002：打球と選手の動きが分かり、無理をしない捕球と返球の描写は残す', flat('c19-002').includes('大山なら直接捕れたはずの球が、先輩の手前で跳ねた。') && flat('c19-002').includes('余計な塁は与えない返球'));
  check('c28-016：操作対象が試合映像と分かる', flat('c28-016').includes('今年の鳳翔の試合映像に切り替えた'));
  check('c33k-001・c33k-001c：前足を「着けた」「着け」', flat('c33k-001').includes('前足を早く着けた') && flat('c33k-001c').includes('前足を先に着け、'));
  const texts = [...Object.values(G.scenes).flatMap((sc) => [...sc.lines.map((l) => l.text), ...(sc.choices || []).map((c) => c.text)])].join('\n');
  check('表記：「平野君」「かご」「一塁・二塁・三塁」「二人」「二組」がない（「平野くん」「カゴ」、算用数字）', !/平野君|かご|[一二三]塁|二人|二組|一球も/.test(texts));
  check('表記：「一軍」「一緒」「一瞬」「一度」「四球」など、数字にしない語はそのまま', /一軍/.test(texts) && /一緒/.test(texts) && /一瞬/.test(texts) && /四球/.test(texts));
  // 改行
  const all = Object.values(G.scenes).flatMap((sc) => sc.lines);
  check('本文の改行は1つずつで、先頭・末尾・空行（連続した改行）がない', all.every((l) => !/^\n|\n$|\n\n/.test(l.text)));
  check('改行を入れた行が600行以上ある（全文の改行を整えた）', all.filter((l) => l.text.includes('\n')).length >= 600, String(all.filter((l) => l.text.includes('\n')).length));
  check('既読の指紋は改行を無視する（改行だけの行は既読のまま）', V.hashLine({ speaker: 'hirano', text: 'あ。\nい。' }) === V.hashLine({ speaker: 'hirano', text: 'あ。い。' }));
  // c24-013 の分割
  const sight = G.scenes['tsuyoshi-sighting'];
  const ids = sight.lines.slice(-3).map((l) => l.id);
  check('c24-013 は3つの表示単位（c24-013・c24-013-2・c24-013-3）に分け、元の行IDを先頭に残す', ids.join() === 'c24-013,c24-013-2,c24-013-3');
  check('c24-013 の分割前の本文を削らず、順に読ませる', ids.map(flat).join('') === '俺は2人を見送った。ふと横を見ると、美空が置いた紙袋がベンチに残っていた。紙袋に手を伸ばしたとき、バス停の案内板の陰から大山が飛び出した。部の先輩も追いかけてきた。何か叫んで大山を止めようとしたが、駅へ向かう2人を見た途端、先輩まで走る速度を上げた。');
  check('c24-013 の選択肢は、最後の単位（c24-013-3）を読んだ後に出る', sight.lines.at(-1).id === 'c24-013-3' && sight.choices.length === 2);
  check('分割で足した行は背景・立ち絵・一枚絵を変えない（直前の行と同じ）', ['c24-013-2', 'c24-013-3'].every((id) => { const a = V.stateAt(G, id), b = V.stateAt(G, 'c24-013'); return a.bg === b.bg && a.cg === b.cg && JSON.stringify(a.portraits) === JSON.stringify(b.portraits); }) && !G.cues.some((c) => /^c24-013-/.test(c.at)));
  const ccFalse2 = Object.fromEntries(Object.keys(G.flags).map((k) => [k, false]));
  const rec = { v: 1, game: G.id, dataVersion: G.dataVersion, flagSchema: saves.flagSchema(G),
    auto: { at: 'c24-013', flags: ccFalse2, dataVersion: G.dataVersion }, slots: [{ at: 'c24-013-2', flags: ccFalse2, dataVersion: G.dataVersion }, { at: 'c16-016', flags: ccFalse2, dataVersion: G.dataVersion }], seen: [] };
  const r = saves.assess(G, rec, JSON.stringify(rec));
  check('旧版の保存（c24-013）と、足した行（c24-013-2）の保存から再開できる', r.mode === 'current' && r.record.auto.at === 'c24-013' && r.record.slots[0]?.at === 'c24-013-2' && r.record.slots[1]?.at === 'c16-016', r.mode);
}

section('時間経過・関係性・対戦相手の補強');
{
  const order = Object.values(G.scenes).flatMap((sc) => sc.lines);
  const byId = new Map(order.map((l) => [l.id, l]));
  const sceneOf = new Map(Object.entries(G.scenes).flatMap(([k, sc]) => sc.lines.map((l) => [l.id, k])));
  const flat = (l) => l.text.replace(/\n/g, '');
  check('話者に三浦（miura）と岡田（okada）がいる', G.speakers.miura === '三浦' && G.speakers.okada === '岡田');
  const intro = order.findIndex((l) => l.id === 'c02e-003-p3');
  const lateFirstyear = order.slice(intro + 1).filter((l) => l.speaker === 'firstyear').map((l) => l.id);
  check('三浦が名乗った後（c02e-003-p3 以降）は、同じ同級生を「1年生」と呼ばない', intro > 0 && lateFirstyear.length === 0, lateFirstyear.join(' '));
  const all = order.map(flat).join('\n');
  check('出身の割り当てが一貫している（平野＝水沢中、三浦＝城南シニア、岡田＝南町中）',
    order.filter((l) => /水沢中/.test(l.text)).every((l) => ['hirano', undefined].includes(l.speaker) || /平野/.test(l.text)) &&
    !/(岡田|平野)[^。]{0,8}城南シニア/.test(all) && !/(三浦|平野)[^。]{0,8}南町中/.test(all) && /城南シニア/.test(all) && /南町中/.test(all));
  check('岡田は南町中のサードで4番、市のベスト4', /南町中。サードで、4番/.test(all) && /市でベスト4/.test(all));
  // 冬の章間
  const win = G.scenes['winter-records'];
  check('冬の章間（12月の記録）が 5-25 と翌春の「二冊目」のあいだにある', win && G.scenes['parents-and-press'].next === 'winter-records' && win.next === 'second-scorebook' && /^12月/.test(win.lines[0].text));
  check('冬の章間は部室（翌日の投内連係はグラウンド）。部室では日和（ジャージ）と、入ってきた大山（cwinter-007〜018）だけを出し、投内連係は背景で進める（一枚絵なし）', win.lines.every((l) => { const st = V.stateAt(G, l.id); const n = Number(l.id.slice(-3)); const p = st.portraits;
    return st.bg === (n >= 21 ? 'hosho-field-afternoon' : 'hosho-clubroom') && !st.cg && (n >= 21 ? !p.left && !p.right : p.left?.char === 'hiyori' && p.left.expr === 'jersey-normal' && (n >= 7 && n <= 18 ? p.right?.char === 'oyama' : !p.right)); }));
  check('冬の章間：大山は礼を言わず、平野の守る日を把握し、平野はグラブを持って練習へ戻る',
    !win.lines.some((l) => l.speaker === 'oyama' && /ありがと|悪いな|助かる/.test(l.text)) && win.lines.some((l) => l.speaker === 'oyama' && /セカンド/.test(l.text)) && /グラブ/.test(win.lines.find((l) => l.id === 'cwinter-019').text + win.lines.find((l) => l.id === 'cwinter-020').text));
  // 追加行は一枚絵の区間に入れない
  const added = order.filter((l) => /-p\d+$/.test(l.id) || /^cwinter-/.test(l.id));
  check('追加した行（' + added.length + '行）は、一枚絵の区間に入っていない', added.every((l) => !V.stateAt(G, l.id).cg), added.filter((l) => V.stateAt(G, l.id).cg).map((l) => l.id).join(' '));
  // 選択前の共通区間で、選択によって得る情報を先取りしない（今回追加した行）
  const addedIn = (keys) => added.filter((l) => keys.includes(sceneOf.get(l.id)));
  const leak = (lines, re) => lines.filter((l) => re.test(flat(l))).map((l) => l.id);
  const ry = leak(addedIn(['ryusei-rematch']), /スライダー|初球だけ外/);
  check('龍成戦：選択前に追加した行は、強打者の初球の外のスライダーに触れない', ry.length === 0, ry.join(' '));
  const ko = leak(addedIn(['national-opponents', 'konan-press']).filter((l) => /^c30-025-p/.test(l.id)), /ライト|右翼|送球/);
  check('港南戦：選択前に追加した行は、右翼手の位置や送球に触れない', ko.length === 0, ko.join(' '));
  const ao = leak(addedIn(['aotake-game']), /高め|浮い|浮く|高く/);
  check('青岳戦：試合当日の共通区間に追加した行は、直球が浮くことに触れない', ao.length === 0, ao.join(' '));
  const te = leak(addedIn(['teirei-final', 'rookies-teirei']), /前足|踏み出|外の直球|外の真っすぐ|外寄りの直球/);
  check('帝嶺戦：決勝の朝と春の練習試合前に追加した行は、新庄の前足や外の直球に触れない', te.length === 0, te.join(' '));
  check('決勝の朝の映像（c33a-003）は全経路の共通区間のまま', sceneOf.get('c33a-003') === 'teirei-final');
  // 新庄・大山
  check('ある先輩は小学校でも中学でも新庄に敗れ、四球で歩かせても走塁で崩された', /小学校でも中学でも/.test(all) && /歩かせた/.test(all) && /2塁に走られた/.test(all));
  check('決勝前は昔話を再説明せず「今度こそ、あいつの前で終わりたくない」', /今度こそ、あいつの前で終わりたくない/.test(all));
  check('大山の段階：練習で捕手が左手を開く／実戦で打者が振り遅れに気づく／甲子園で太鼓が途切れる',
    /左手を一度開き/.test(flat(byId.get('c03-042-p2'))) && /もうミットに入ってた/.test(flat(byId.get('c29d-000-p3'))) && /太鼓が/.test(flat(byId.get('c32e-001-p1'))));
  check('三浦の母の映像：先輩は「俺じゃなくて母ちゃんに言え」、三浦が短く礼を返す', /俺じゃなくて母ちゃんに言え/.test(all) && /ありがと。使う/.test(all));
  check('平野は2年として小宮に名乗り、中学の部活か硬式クラブかを尋ねる', /2年の平野/.test(flat(byId.get('c26-005-p1'))) && /部活？　それとも硬式のクラブ？/.test(flat(byId.get('c26-006-p1'))));
  // 保存互換
  const f0 = Object.fromEntries(Object.keys(G.flags).map((k) => [k, false]));
  const rec = { v: 1, game: G.id, dataVersion: G.dataVersion, flagSchema: saves.flagSchema(G),
    auto: { at: 'cwinter-010', flags: f0, dataVersion: G.dataVersion },
    slots: [{ at: 'c26e-001', flags: f0, dataVersion: G.dataVersion }, { at: 'c02e-003-p8', flags: f0, dataVersion: G.dataVersion }, { at: 'c33a-002', flags: f0, dataVersion: G.dataVersion }], seen: [] };
  const r = saves.assess(G, rec, JSON.stringify(rec));
  check('既存の行・追加した行・冬の章間の保存から再開できる（現在の版）', r.mode === 'current' && r.record.auto.at === 'cwinter-010' && r.record.slots.map((x) => x && x.at).join() === 'c26e-001,c02e-003-p8,c33a-002', r.mode);
}

section('人物の判断と情報共有（選ばなかった経路でも、知っていることを使う）');
{
  const ln = new Map(Object.values(G.scenes).flatMap((sc) => sc.lines.map((l) => [l.id, l])));
  const sceneOf = new Map(Object.entries(G.scenes).flatMap(([k, sc]) => sc.lines.map((l) => [l.id, k])));
  const t = (id) => (ln.get(id)?.text || '').replace(/\n/g, '');
  // 港南
  check('港南：右翼手の前進と返球は、全経路が通る 9回の場面でミーティングの共有として示す', sceneOf.get('c31h-001-p1') === 'konan-ninth' && /ミーティング/.test(t('c31h-001-p1')) && /3塁コーチ/.test(t('c31h-001-p1')));
  check('港南：追加確認で得るのは「高く跳ねた打球でも足を止めない」処理（準備・当日の確認・伝達）',
    ['c31b-002', 'c31e-001', 'c31g-002'].every((id) => /高く跳ね/.test(t(id)) && /足を止め/.test(t(id))));
  check('港南：敗北側の3塁コーチは右翼を警戒したうえで「一拍ある」と判断して回し、上回られる',
    /跳ね上がった/.test(t('c31j-001')) && /腕を回した/.test(t('c31j-001')) && /一拍ある/.test(t('c31j-005-p2')) && /足を止めねえ/.test(t('c31j-005-p2')));
  check('港南：日和の映像（c31a-007）は選択前の共通区間にあり、内容を消していない', sceneOf.get('c31a-007') === 'konan-press' && /中継を越えて/.test(t('c31a-007')));
  // 龍成
  check('龍成：大山も共通区間で初球の外のスライダーに気づき、勝負どころで変えてくると読む',
    sceneOf.get('c29d-008-p2') === 'ryusei-middle' && ln.get('c29d-008-p2').speaker === 'oyama' && /外のスライダー/.test(t('c29d-008-p2')) && /変えてくる/.test(t('c29d-008-p2')));
  check('龍成：追加確認で得るのは「終盤・走者がいても変えない」根拠', /9回/.test(t('c29b-002')) && /終盤も変えない/.test(t('c29b-002')) && /走者がいたときも/.test(t('c29f-002-p1')) && /走者がいても/.test(t('c29f-003')));
  check('龍成：勝利側の大山は、根拠を聞いて読みを修正して初球を打つ', /変えてこない/.test(t('c29i-002')) && /変えてくると思ってた/.test(t('c29i-003')) && /踏み込んで/.test(t('c29i-004')));
  check('龍成：敗北側の大山は内を待って初球を見送り、追い込まれて内いっぱいの真っすぐに詰まる', /内を待つ/.test(t('c29j-001')) && /振らなかった/.test(t('c29j-001')) && /内側いっぱい/.test(t('c29j-002')));
  // 決勝
  check('決勝：確認しなかった経路でも、平野は前足の懸念を田原へ伝え、田原は自分の読みで答える',
    sceneOf.get('c33g-001-p1') === 'teirei-unrecovered' && ln.get('c33g-001-p1').speaker === 'hirano' && /前足/.test(t('c33g-001-p1')) &&
    ln.get('c33g-001-p2').speaker === 'tahara' && /開く/.test(t('c33g-001-p2')) && /外の低い端/.test(t('c33g-001-p2')) && !/聞けなかった/.test(t('c33g-001')));
  check('決勝：準備・当日の確認で得るのは「前足が早くても肩は開かない」根拠', ['c33b-001', 'c33f-003', 'c33i-002'].every((id) => /肩/.test(t(id)) && /開/.test(t(id))));
  check('決勝：田原は根拠を聞いて読みを修正する（勝利側）', /開くのも早いと思ってました/.test(t('c33i-003a')) && /外の端でも届きます/.test(t('c33i-003a')));
  check('決勝：大山は内角を「逃げ」と言わず、最善と考えた外の低い端を選ぶ', !/逃げ/.test(t('c33k-001o')) && /外/.test(t('c33k-001o')) && /端/.test(t('c33k-001o')));
  check('決勝：新庄がさらに対応して打つ描写は残す', /肩は最後まで残す/.test(t('c33k-001q')) && /右翼線/.test(t('c33k-002')));
  // 小宮の挨拶
  check('小宮の挨拶は家族同士の関係を伝える言い方（「御社」を使わない）', /お父様にお世話になっております/.test(t('c26e-006')) && !/御社/.test(t('c26e-006') + t('c26e-007')) && /父に？/.test(t('c26e-007')));
  // 動機の反復
  const repeated = ['c14-002-p11', 'c18-001-p5', 'c26e-001-p28', 'c26e-001-p29', 'c29a-001-p13', 'c29a-001-p14', 'c29a-001-p17', 'c30-001-p7', 'c33a-001-p9'];
  check('野球の情報交換の締めを、毎回美空へ戻さない（整理した行に監督・前髪の描写がない）', repeated.every((id) => !/監督|前髪/.test(t(id))), repeated.filter((id) => /監督|前髪/.test(t(id))).join(' '));
  check('プレーへの反応と自己都合が続く場面（c30-019〜c30-022）は残す', ['c30-019', 'c30-020', 'c30-021', 'c30-022'].every((id) => ln.has(id)));
  check('決勝前の会話は、質問への返答として情報が出る（全員が順番に述べない）', /\？$/.test(t('c33a-001-p2')) && ln.get('c33a-001-p3').speaker === 'hiyori' && /？$/.test(t('c33a-001-p5')) && !['c33a-001-p2','c33a-001-p3','c33a-001-p4','c33a-001-p5','c33a-001-p6','c33a-001-p7','c33a-001-p8','c33a-001-p9','c33a-001-p10','c33a-001-p11'].some((id) => ln.get(id).speaker === 'tahara'));
}

section('選手としての平野と、先輩の一歩');
{
  const ln = new Map(Object.values(G.scenes).flatMap((sc) => sc.lines.map((l) => [l.id, l])));
  const sceneOf = new Map(Object.entries(G.scenes).flatMap(([k, sc]) => sc.lines.map((l) => [l.id, k])));
  const t = (id) => (ln.get(id)?.text || '').replace(/\n/g, '');
  const ids = (a, b, pre) => Array.from({ length: b - a + 1 }, (_, i) => pre + String(a + i).padStart(3, '0'));
  check('追加A：冬の章間の翌日、投内連係で平野が2塁に入り、大山の送球を受けて1塁へ回す（cwinter-021〜034）',
    ids(21, 34, 'cwinter-').every((id) => sceneOf.get(id) === 'winter-records') && /投内連係/.test(t('cwinter-021')) && /2塁へは俺が入る/.test(t('cwinter-023')) && /球が来た/.test(t('cwinter-024')) && /1塁へ投げた/.test(t('cwinter-025')));
  check('追加A：平野の短い言葉で、中学の失敗と反復が今の動きにつながる', ln.get('cwinter-028').speaker === 'hirano' && /中学/.test(t('cwinter-028')) && /毎日/.test(t('cwinter-028')));
  check('追加A：大山は自分の都合で平野を指名し、その中に技術の評価がある（礼や励ましではない）',
    ln.get('cwinter-030').speaker === 'oyama' && /平野にしとけ/.test(t('cwinter-030')) && /入る場所がずれねえ。投げやすい/.test(t('cwinter-032')) && /俺の練習/.test(t('cwinter-032')) && !/頑張|すごい|ありがと/.test(t('cwinter-030') + t('cwinter-032')));
  check('追加A：翌日の投内連係はグラウンド、その後は翌春の部室（二冊目）へ進む', V.stateAt(G, 'cwinter-021').bg === 'hosho-field-afternoon' && V.stateAt(G, 'csecond-001').bg === 'hosho-clubroom' && G.scenes['winter-records'].next === 'second-scorebook');
  check('追加B：北陵戦5回裏、前年の秋に北陵のエースに打ち取られた先輩の打席（c14-011-p3〜c14-012-p1）',
    sceneOf.get('c14-011-p3') === 'regional-quarterfinal' && /5回裏、2アウト2塁/.test(t('c14-011-p3')) && /去年の秋/.test(t('c14-011-p3')) && /握り直した/.test(t('c14-011-p4')) && /肩/.test(t('c14-011-p4')));
  check('追加B：美空は打順を確かめるだけで、「まあ、大丈夫でしょ」で話を終える（意図して励まさない）',
    ln.get('c14-011-p6').speaker === 'misora' && /打順/.test(t('c14-011-p6')) && t('c14-011-p8') === 'まあ、大丈夫でしょ。' && /打順表に目を戻した/.test(t('c14-011-p9')));
  check('追加B：先輩は「大丈夫」を自分への信頼と受け取るが、緊張は残る', ln.get('c14-011-p11').speaker === 'senpai' && /大丈夫だってよ。監督が/.test(t('c14-011-p11')) && /肩はまだ/.test(t('c14-011-p12')));
  check('追加B：打席結果は既存のまま（外の球をライト前、1点を返す）。以前より踏み込んで右へ押し返す', /踏み込んで/.test(t('c14-011-p13')) && /ライト前に落ちた/.test(t('c14-012')) && /1点を返した/.test(t('c14-012')) && /ショートの正面/.test(t('c14-013')));
}

section('主要人物の紹介');
{
  const ln = new Map(Object.values(G.scenes).flatMap((sc) => sc.lines.map((l) => [l.id, l])));
  const t = (id) => (ln.get(id)?.text || '').replace(/\n/g, '');
  const order = Object.values(G.scenes).flatMap((sc) => sc.lines.map((l) => l.id));
  const before = (a, b) => order.indexOf(a) < order.indexOf(b);
  check('中田：名前が分かった直後に、3年で内野のレギュラーと紹介する', /3年で、内野のレギュラー/.test(t('c04-019-p1')) && before('c04-018', 'c04-019-p1') && before('c04-019-p1', 'c04-022'));
  check('日和：初登場の直後に、平野と同じ1年のマネージャーと紹介する', /同じ1年のマネージャー/.test(t('c08b-001-p1')) && !/紅一点/.test(t('c08b-001-p1')));
  check('佐々木：5-9 の両分岐それぞれで、初めて出る行の直後に3年と紹介する（「最後の夏」「努力家」「控え」は重ねない）',
    G.scenes['hiyori-drinks'].lines.some((l) => l.id === 'c09d-002-p1') && G.scenes['hiyori-equipment'].lines.some((l) => l.id === 'c09t-004-p1') && t('c09d-002-p1') === '佐々木先輩は3年で、練習が終わっても打撃ケージの近くに残っていることが多い。' && t('c09d-002-p1') === t('c09t-004-p1') && !/最後の夏|努力家|控え/.test(t('c09d-002-p1')) && /佐々木は、平野が1年のときの3年/.test(read('docs/characters-and-timeline.md')));
  check('厳は美空の父、野原は龍成の監督と分かる', /父の厳/.test(t('c17-007')) && /監督の野原/.test(t('c19-013')));
}

section('5-10 河本の来校（一枚絵を外した流れ）と、行の削除に伴う保存の移行');
{
  const order = Object.values(G.scenes).flatMap((sc) => sc.lines);
  const ln = new Map(Object.values(G.scenes).flatMap((sc) => sc.lines.map((l) => [l.id, l])));
  const t = (id) => (ln.get(id)?.text || '').replace(/\n/g, '');
  const seq = G.scenes['kawamoto-visit'] ? G.scenes['kawamoto-visit'].lines.map((l) => l.id) : order.filter((l) => /^c10-/.test(l.id)).map((l) => l.id);
  const i15 = seq.indexOf('c10-015');
  check('c10-015-p1（河本の受け取り方の一文）は削除し、c10-015 → c10-016 → c10-017 と続く', !ln.has('c10-015-p1') && seq[i15 + 1] === 'c10-016' && seq[i15 + 2] === 'c10-017' && !/河本の耳には/.test(order.map((l) => l.text).join('')), seq.slice(i15, i15 + 3).join());
  check('c10-015〜c10-020 は一枚絵なしの通常画面で、美空（左）と河本（右）が消えずに並ぶ', ['c10-015', 'c10-016', 'c10-017', 'c10-018', 'c10-019', 'c10-020'].every((id) => { const st = V.stateAt(G, id); return !st.cg && st.portraits.left?.char === 'misora' && st.portraits.right?.char === 'kawamoto'; }));
  check('c10-016 は切り抜きを練習メニューの下へ入れ、c10-017 で河本が口元を緩める（代わりの説明は足さない）', /いちばん下に入った/.test(t('c10-016')) && /口元を緩めた/.test(t('c10-017')));
  check('5-10 の驚き差分（c10-020〜）と大山の割り込み（c10-022〜）は維持', V.stateAt(G, 'c10-020').portraits.right?.expr === 'casual-shock' && V.stateAt(G, 'c10-022').portraits.left?.expr === 'practice-angry');
  // 旧版の保存：c10-015-p1 は c10-016 へ、ほかの行と選択は同じ位置へ。削除した一枚絵の解放は外し、残す一枚絵の解放は保つ
  const f0 = Object.fromEntries(Object.entries(G.flags).map(([k, d]) => [k, d.default]));
  const old = { v: 1, game: G.id, dataVersion: '2026.11-4', flagSchema: saves.flagSchema(G),
    auto: { at: 'c10-015-p1', flags: { ...f0, aotakeRecovery: true }, dataVersion: '2026.11-4' },
    slots: [{ at: 'c13-021', flags: f0, dataVersion: '2026.11-4' }, { at: 'c26a-008', flags: f0, dataVersion: '2026.11-4' }, { at: 'c26b-008', flags: f0, dataVersion: '2026.11-4' }],
    seen: ['c10-015-p1#0000', 'c10-016#' + V.hashLine(ln.get('c10-016'))],
    gallery: { 'c10-kawamoto-daydream-embrace': true, 'c13-shinjo-daydream-dinner': true, 'c26a-tahara-daydream-home': true, 'c26b-komiya-daydream-hand': true, 'hirano-field-visit-vision': true, 'cnews-oyama-tears-newspaper': true } };
  const r = saves.assess(G, old, JSON.stringify(old));
  check('版 2026.11-4 の保存：c10-015-p1 の自動セーブは c10-016 へ移り、選択（フラグ）も保つ', r.mode === 'migrated' && r.record.auto.at === 'c10-016' && r.record.auto.flags.aotakeRecovery === true, r.mode + ' ' + r.reason);
  check('版 2026.11-4 の保存：削除した一枚絵の区間（c13-021・c26a-008・c26b-008）の手動セーブは同じ行のまま', r.record && r.record.slots.map((x) => x && x.at).join() === 'c13-021,c26a-008,c26b-008');
  check('版 2026.11-4 の保存：既読は残る行だけを保ち、削除した行の既読は捨てる', r.record && r.record.seen.join() === 'c10-016#' + V.hashLine(ln.get('c10-016')));
  check('削除した一枚絵の解放情報は読み捨て、残す一枚絵の解放はそのまま', r.record && JSON.stringify(r.record.gallery) === JSON.stringify({ 'hirano-field-visit-vision': true, 'cnews-oyama-tears-newspaper': true }), JSON.stringify(r.record && r.record.gallery));
  // 従来の各版からの移行も維持する（行の対応表は全版で共通。フラグの移し方は各版のまま）
  const allOk = Object.keys(G.migrations).every((ver) => {
    const m = G.migrations[ver];
    return m.lines['c10-015-p1'] === 'c10-016' && order.every((l) => m.lines[l.id] === l.id);
  });
  check('従来の各版（' + Object.keys(G.migrations).join('、') + '）からの移行で、現在のすべての行は同じ行へ、c10-015-p1 は c10-016 へ写る', allOk && ['2026.10-1', '2026.11-1', '2026.11-2', '2026.11-3', '2026.11-4'].every((v) => v in G.migrations));
  const old3 = { v: 1, game: G.id, dataVersion: '2026.11-3', flagSchema: { ...saves.flagSchema(G) }, auto: { at: 'c08-020', flags: { ...f0 }, dataVersion: '2026.11-3' }, slots: [], seen: [] };
  delete old3.flagSchema.teireiPrep; delete old3.flagSchema.teireiRecovery; delete old3.auto.flags.teireiPrep; delete old3.auto.flags.teireiRecovery;
  const r3 = saves.assess(G, old3, JSON.stringify(old3));
  check('版 2026.11-3 の保存も、従来どおりフラグを補って移せる', r3.mode === 'migrated' && r3.record.auto.at === 'c08-020' && r3.record.auto.flags.teireiPrep === false, r3.mode + ' ' + r3.reason);
}

section('最後のアウト');
const lastOut = G.scenes['last-out'];
const lastOutDoc = read('docs/last-out-script.md').split('## 本文\n')[1].trim().split(/\n\n+/);
const lastOutLines = lastOut.lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
check('最後のアウトの本文と話者が原稿と一致する', JSON.stringify(lastOutDoc) === JSON.stringify(lastOutLines));
check('最後のアウトから優勝直後の場面へ進む', lastOut.next === 'first-koshien-title' && !lastOut.choices);

section('甲子園初優勝');
const championship = G.scenes['first-koshien-title'];
const championshipDoc = read('docs/first-koshien-title-script.md').split('## 本文\n')[1].trim().split(/\n\n+/);
const championshipLines = championship.lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
check('甲子園初優勝の本文と話者が原稿と一致する', JSON.stringify(championshipDoc) === JSON.stringify(championshipLines));
check('甲子園初優勝から優勝インタビューへ進む', championship.next === 'public-proposal' && !championship.choices);

section('公開求婚');
const proposal = G.scenes['public-proposal'];
const proposalDoc = read('docs/public-proposal-script.md').split('## 本文\n')[1].trim().split(/\n\n+/);
const proposalLines = proposal.lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
check('公開求婚の本文と話者が原稿と一致する', JSON.stringify(proposalDoc) === JSON.stringify(proposalLines));
check('公開求婚から父娘の約束が明かされる優勝エンドへ進む', proposal.next === 'real-promise' && !proposal.choices);

section('本当の約束');
const promise = G.scenes['real-promise'];
const promiseDoc = read('docs/real-promise-script.md').split('## 本文\n')[1].trim().split(/\n\n+/);
const promiseLines = promise.lines.map(l => (l.speaker ? G.speakers[l.speaker] + '｜' : '') + l.text);
check('本当の約束の本文と話者が原稿と一致する', JSON.stringify(promiseDoc) === JSON.stringify(promiseLines));
check('優勝側は本当の約束で幕を閉じる', !promise.next && !promise.choices);

section('冒頭から5つの結末まで');
const endingCounts = {};
const routeProblems = new Set();
const reachedScenes = new Set();
function visitRoute(key, flags, ancestors = []) {
  const scene = G.scenes[key];
  if (!scene || ancestors.includes(key)) {
    routeProblems.add(ancestors.concat(key).join(' → '));
    return;
  }
  reachedScenes.add(key);
  const path = ancestors.concat(key);
  const available = (scene.choices || []).filter(choice => !choice.when || choice.when({ ...flags }));
  if (available.length) {
    for (const choice of available) visitRoute(choice.to, { ...flags, ...choice.set }, path);
    return;
  }
  const next = typeof scene.next === 'function' ? scene.next({ ...flags }) : scene.next;
  if (next) visitRoute(next, flags, path);
  else endingCounts[key] = (endingCounts[key] || 0) + 1;
}
visitRoute(G.start.scene, Object.fromEntries(Object.entries(G.flags).map(([key, def]) => [key, def.default])));
check('全経路で行き先が存在し、循環せず、孤立した場面がない',
  routeProblems.size === 0 && reachedScenes.size === scenes.length,
  [...routeProblems, ...scenes.filter(key => !reachedScenes.has(key))].join(' / '));
const expectedEndings = {
  'ryusei-summer': 128, 'konan-return-bus': 256, 'aotake-no-tomorrow': 512,
  'teirei-champion-shinjo': 1024, 'real-promise': 2048,
};
check('全3968経路が5つの結末に着き、途中で止まらない',
  Object.keys(endingCounts).length === Object.keys(expectedEndings).length &&
  Object.entries(expectedEndings).every(([key, count]) => endingCounts[key] === count),
  JSON.stringify(endingCounts));
check('優勝エンドは球場の驚きで幕を閉じる',
  G.scenes['real-promise'].lines.at(-1).text === 'ええええええーっ！？');

section('話者');
const speakerKeys = [...new Set(lines.map((l) => l.speaker).filter(Boolean))].sort();
check('冒頭の話者は hirano と oyama', JSON.stringify(speakerKeys) === '["hirano","oyama"]', speakerKeys.join(','));
check('話者の表示名は 平野・大山', G.speakers.hirano === '平野' && G.speakers.oyama === '大山', JSON.stringify(G.speakers));
check('平野の一人称の文に、開発者向けの注記が混ざらない', allLines.every((l) => !/TODO|注:|※/.test(l.text)));

section('素材と演出（すべて定義済み・実在）');
for (const group of ['bgm', 'ambience', 'se']) {
  check('素材「' + group + '」は空（今回は未登録でよい）', Object.keys(G.assets[group] || {}).length === 0);
}

section('立ち絵（assets/portraits）');
const portraitCsv = read('assets/portraits/portraits-list.csv').replace(/^﻿/, '').trim().split(/\r?\n/);
check('素材一覧の見出しは ファイル名・人物・衣装・差分・使用予定場面', portraitCsv[0] === 'ファイル名,人物,衣装,差分,使用予定場面', portraitCsv[0]);
const listedPortraits = portraitCsv.slice(1).map((row) => row.split(',')[0]);
const portraitFiles = fs.readdirSync(path.join(ROOT, 'assets', 'portraits')).filter((f) => f !== 'portraits-list.csv').sort();
check('素材一覧は48件（通常35＋表情差分13）で、重複がない', listedPortraits.length === 48 && new Set(listedPortraits).size === 48, String(listedPortraits.length));
check('素材一覧に Magnific の管理IDを書かない', !/magnific/i.test(read('assets/portraits/portraits-list.csv')));
check('素材一覧と assets/portraits の実ファイルが1対1で一致する（一覧以外のファイルがない）',
  JSON.stringify([...listedPortraits].sort()) === JSON.stringify(portraitFiles),
  portraitFiles.filter((f) => !listedPortraits.includes(f)).concat(listedPortraits.filter((f) => !portraitFiles.includes(f))).join(','));
const registered = Object.entries(G.assets.portraits).flatMap(([char, exprs]) => Object.entries(exprs).map(([expr, file]) => ({ char, expr, file })));
check('48枚すべてが assets.portraits に一度ずつ登録されている',
  registered.length === 48 && JSON.stringify(registered.map((r) => r.file).sort()) === JSON.stringify(listedPortraits.map((f) => 'assets/portraits/' + f).sort()));
check('登録のキーは「人物-衣装と差分.webp」のファイル名から作り、人物のキーは話者と同じ',
  registered.every((r) => r.file === 'assets/portraits/' + r.char + '-' + r.expr + '.webp' && Object.prototype.hasOwnProperty.call(G.speakers, r.char)),
  registered.filter((r) => r.file !== 'assets/portraits/' + r.char + '-' + r.expr + '.webp' || !G.speakers[r.char]).map((r) => r.file).join(','));
// 表情第2便の2枚は、納品の幅のまま（口止め 674px、突進 1008px）。ほかは 859px
const PORTRAIT_WIDTH = { 'misora-game-uniform-hush.webp': 674, 'nakata-practice-confronting.webp': 1008 };
const badWebp = [];
for (const f of portraitFiles) {
  const b = fs.readFileSync(path.join(ROOT, 'assets', 'portraits', f));
  const ok = b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 16) === 'WEBPVP8X' && (b[20] & 0x10) !== 0 &&
    1 + b.readUIntLE(24, 3) === (PORTRAIT_WIDTH[f] || 859) && 1 + b.readUIntLE(27, 3) === 1280;
  if (!ok) badWebp.push(f);
}
check('立ち絵はすべて透過付きの WebP で、高さ1,280px（幅は859px、表情第2便の口止め674px・突進1008px）', badWebp.length === 0, badWebp.join(','));
check('PNG の原本や元画像の ZIP をリポジトリに入れていない', !portraitFiles.some((f) => /\.(png|zip)$/i.test(f)) && !fs.existsSync(path.join(ROOT, 'adv02-portraits-source-png.zip')));
section('背景（assets/backgrounds）');
const bgs = G.assets.backgrounds;
// 挿絵（assets/inserts）は、CG 鑑賞に登録しないため背景として登録して表示する（docs/title-and-inserts.md）
const INSERTS = ['insert-pitch-grip', 'insert-cleats-dirt'];
check('背景のパスはすべて作品基準の相対パスで、実ファイルがある（挿絵は assets/inserts）',
  Object.entries(bgs).every(([k, f]) => f.startsWith(INSERTS.includes(k) ? 'assets/inserts/' : 'assets/backgrounds/') && fs.existsSync(path.join(ROOT, f))),
  Object.values(bgs).filter((f) => !fs.existsSync(path.join(ROOT, f))).join(','));
const DELIVERED_BACKGROUNDS = ['hosho-field-fence-morning', 'hosho-field-afternoon', 'hosho-field-bench', 'hosho-clubroom',
  'regional-stadium-field', 'regional-stadium-dugout', 'regional-stadium-dugout-sunset', 'regional-stadium-concourse',
  'koshien-field', 'koshien-dugout', 'koshien-concourse', 'kamijo-living-room-night', 'oyama-home-entry', 'hospital-exam-room',
  'station-plaza-autumn', 'bus-interior', 'bus-interior-sunset',
  // 第2便（宿舎と龍成の部室）
  'lodging-dining-hallway', 'lodging-dining-hall', 'lodging-dining-hall-night', 'ryusei-clubroom-night',
  // 第3便（教室・自販機・校舎外周・廊下・大山家の前・病院の待合室・校門前のバス）
  'hosho-classroom', 'hosho-vending-area', 'hosho-school-exterior', 'hosho-school-corridor', 'oyama-home-exterior-night', 'hospital-waiting-room', 'hosho-gate-bus-morning',
  // 第4便（駅までの道・平野の部屋・病院の廊下）
  'school-station-road-evening', 'hirano-room', 'hospital-corridor',
  // 第5便（5-2 の夕方の差分）
  'hosho-field-sunset'];
check('納品の背景は32枚（第1便17枚＋第2便4枚＋第3便7枚＋第4便3枚＋第5便1枚）', DELIVERED_BACKGROUNDS.length === 32 && new Set(DELIVERED_BACKGROUNDS).size === 32);
check('背景の登録は、納品の32枚と挿絵2枚だけ（無地の仮背景 unassigned は使い終えて削除。白球の挿絵は保留で登録しない）',
  JSON.stringify(Object.keys(bgs).sort()) === JSON.stringify([...DELIVERED_BACKGROUNDS, ...INSERTS].sort()) && !/insert-ball-sky/.test(read('game.js')), Object.keys(bgs).join(','));
check('挿絵は「assets/inserts/キー.webp」で、保留の白球の挿絵はリポジトリに置かない', INSERTS.every((k) => bgs[k] === 'assets/inserts/' + k + '.webp') && !fs.existsSync(path.join(ROOT, 'assets', 'inserts', 'insert-ball-sky.webp')) && JSON.stringify(fs.readdirSync(path.join(ROOT, 'assets', 'inserts')).sort()) === JSON.stringify(INSERTS.map((k) => k + '.webp').sort()));
check('納品の背景は「キー.webp」', DELIVERED_BACKGROUNDS.every((k) => bgs[k] === 'assets/backgrounds/' + k + '.webp'));
const bgFiles = fs.readdirSync(path.join(ROOT, 'assets', 'backgrounds')).sort();
check('assets/backgrounds には登録した32ファイルだけがある（無地の unassigned.png・CSV・PNG原本を置かない）',
  JSON.stringify(bgFiles) === JSON.stringify(DELIVERED_BACKGROUNDS.map((k) => path.basename(bgs[k])).sort()), bgFiles.join(','));
const badBg = [];
for (const k of [...DELIVERED_BACKGROUNDS, ...INSERTS]) {
  const b = fs.readFileSync(path.join(ROOT, bgs[k]));
  // 不透明な WebP（VP8）。フレームの開始コードの後ろに幅と高さがある
  const ok = b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 16) === 'WEBPVP8 ' &&
    b[23] === 0x9d && b[24] === 0x01 && b[25] === 0x2a && (b.readUInt16LE(26) & 0x3fff) === 1920 && (b.readUInt16LE(28) & 0x3fff) === 1080;
  if (!ok) badBg.push(k);
}
check('納品の背景はすべて不透明な WebP で、1920×1080px', badBg.length === 0, badBg.join(','));
check('作品データに Magnific の管理IDを書かない', !/magnific/i.test(read('game.js')));

const bgCues = G.cues.filter((c) => c.bg !== undefined);
check('冒頭 c01-001 は、朝のフェンスの外（hosho-field-fence-morning）', bgCues[0].at === 'c01-001' && bgCues[0].bg === 'hosho-field-fence-morning', JSON.stringify(bgCues[0]));
const lineOrder = new Map(allIds.map((id, i) => [id, i]));
check('背景の演出は本文の並び順に並ぶ（キットは配列の後ろの指定を優先する）', bgCues.every((c, i) => i === 0 || lineOrder.get(c.at) > lineOrder.get(bgCues[i - 1].at)));
const sceneOfLine = new Map(scenes.flatMap((key) => G.scenes[key].lines.map((l) => [l.id, key])));
const noEntryBg = scenes.filter((key) => !bgCues.some((c) => c.at === G.scenes[key].lines[0].id));
check('分岐の入口・合流点を含め、すべての場面の最初の行で背景を明示している', noEntryBg.length === 0, noEntryBg.join(','));
// 場面の中の背景は、その場面の演出だけで決まる。stateAt が並び順で戻す背景が、どの行でも一致すれば、別ルートの背景は残らない
const leaked = [];
for (const key of scenes) {
  let expected = null;
  for (const l of G.scenes[key].lines) {
    const own = bgCues.find((c) => c.at === l.id);
    if (own) expected = own.bg;
    if (V.stateAt(G, l.id).bg !== expected) leaked.push(l.id);
  }
}
check('全' + allIds.length + '行で、復元される背景がその場面の中の指定と一致する（別ルートの背景が残らない）', leaked.length === 0, leaked.slice(0, 5).join(','));
check('登録した背景は、すべてどこかの行で使っている', Object.keys(bgs).every((k) => bgCues.some((c) => c.bg === k)), Object.keys(bgs).filter((k) => !bgCues.some((c) => c.bg === k)).join(','));
const bgAt = (id) => V.stateAt(G, id).bg;
const bgSpans = [
  ['c01-001', 'hosho-field-fence-morning'], ['c01-023', 'hosho-field-fence-morning'],
  ['c01-023', 'hosho-field-fence-morning'], ['c02-001', 'hosho-classroom'], ['c02-005', 'hosho-classroom'], ['c02-006', 'hosho-field-afternoon'],
  ['c09t-009', 'hosho-field-bench'], ['c09e-001', 'hosho-vending-area'], ['c09e-005', 'hosho-vending-area'], ['c09e-006', 'hosho-clubroom'],
  ['c11m-020', 'hosho-field-afternoon'], ['c11m-021', 'hosho-school-exterior'], ['c11m-028', 'hosho-school-exterior'], ['c11m-029', 'hosho-field-afternoon'], ['c11p-001', 'hosho-field-bench'],
  ['c15-007', 'regional-stadium-dugout'], ['c15-008', 'hosho-school-corridor'], ['c15-013', 'hosho-school-corridor'], ['c15-014', 'regional-stadium-dugout'],
  ['c18-pre-e', 'hosho-field-afternoon'], ['c18-pre-f', 'oyama-home-exterior-night'], ['c18-pre-j', 'oyama-home-exterior-night'], ['c18-pre-k', 'oyama-home-entry'],
  ['c18-016', 'regional-stadium-dugout'], ['c18-017', 'hospital-waiting-room'],
  ['c29k-004', 'hosho-clubroom'], ['cbus-001', 'hosho-gate-bus-morning'], ['cbus-002', 'bus-interior'],
  ['c02e-018', 'school-station-road-evening'], ['c02e-019', 'school-station-road-evening'], ['c03-001', 'hosho-field-afternoon'],
  ['cblank-010', 'hosho-clubroom'], ['cblank-011', 'hirano-room'], ['cblank-013', 'hirano-room'], ['c21-001', 'hosho-field-afternoon'],
  ['c21-016', 'hospital-exam-room'], ['c21-017', 'hospital-corridor'], ['c21-018', 'hosho-field-afternoon'],
  ['c26a-010', 'hosho-field-afternoon'], ['c26b-009', 'hosho-field-afternoon'], ['c26e-001', 'hosho-field-bench'], ['c26e-010', 'hosho-field-bench'], ['c27-001', 'hosho-field-bench'],
  ['c02i-001', 'hosho-field-afternoon'], ['c02o-001', 'hosho-field-afternoon'], ['c02e-001', 'hosho-field-afternoon'], ['c02e-011', 'hosho-field-afternoon'], ['c02e-012', 'hosho-field-sunset'], ['c02e-017', 'hosho-field-sunset'], ['c02e-018', 'school-station-road-evening'],
  ['c03-040', 'hosho-field-bench'], ['c03-040-p1', 'insert-pitch-grip'], ['c03-041', 'hosho-field-bench'], ['c27-001', 'hosho-field-bench'], ['c27-002', 'insert-cleats-dirt'], ['c27-003', 'hosho-field-bench'],
  ['c04-005', 'hosho-field-bench'], ['c08b-001', 'hosho-clubroom'],
  ['c18-pre-a', 'hosho-field-afternoon'], ['c18-pre-k', 'oyama-home-entry'], ['c18-003', 'regional-stadium-field'], ['c18-018', 'hospital-exam-room'],
  ['c19-032', 'regional-stadium-dugout'], ['c20-001', 'regional-stadium-dugout-sunset'], ['c20-018', 'regional-stadium-dugout-sunset'],
  ['c28-001', 'ryusei-clubroom-night'], ['c28-017', 'ryusei-clubroom-night'], ['c29a-001', 'regional-stadium-concourse'],
  ['c31a-001', 'lodging-dining-hallway'], ['c31a-008', 'lodging-dining-hallway'], ['c31b-001', 'lodging-dining-hall'], ['c31b-004', 'lodging-dining-hall'],
  ['c31c-001', 'lodging-dining-hallway'], ['c32b-006', 'koshien-dugout'], ['c32b-007', 'lodging-dining-hall-night'], ['c32b-008', 'lodging-dining-hall-night'],
  ['c32c-001', 'lodging-dining-hall-night'], ['c32c-003', 'lodging-dining-hall-night'], ['c32d-001', 'lodging-dining-hall-night'], ['c32e-001', 'koshien-dugout'], ['c31d-001', 'koshien-concourse'], ['c31k-001', 'bus-interior-sunset'], ['c31k-008', 'bus-interior-sunset'],
  ['c32a-001', 'koshien-dugout'], ['c32m-001', 'koshien-concourse'], ['c32m-002', 'koshien-field'], ['c32m-006', 'koshien-field'],
  ['c33l-001', 'koshien-concourse'], ['clastout-001', 'koshien-dugout'], ['c36-021', 'koshien-dugout'],
];
check('主な切り替え：冒頭・5-2・5-18・5-20の夕日・5-28の龍成の部室・5-31の宿舎と球場・5-32の夜の食堂と準決勝・E2の西日のバス・E3の観客席・E4から最後のアウト',
  bgSpans.every(([id, want]) => bgAt(id) === want), bgSpans.filter(([id, want]) => bgAt(id) !== want).map(([id]) => id + '=' + bgAt(id)).join(' '));
check('5-2：放課後にグラウンドへ入る行（c02-006）で切り替わる', bgAt('c02-005') !== 'hosho-field-afternoon' && bgAt('c02-006') === 'hosho-field-afternoon');
const roomLines = allIds.filter((id) => bgAt(id) === 'hirano-room');
check('平野の部屋（cblank-011〜cblank-013）では、机が隠れないよう左右とも立ち絵を出さない（メッセージの大山も出さない）',
  JSON.stringify(roomLines) === JSON.stringify(['cblank-011', 'cblank-012', 'cblank-013']) &&
  roomLines.every((id) => { const p = V.stateAt(G, id).portraits; return !p.left && !p.right; }), roomLines.join(','));
check('背景の未割り当ては0：全1,410行に納品の背景があり、無地の仮背景を使う行がない',
  allIds.every((id) => DELIVERED_BACKGROUNDS.includes(bgAt(id)) || ['c03-040-p1', 'c27-002'].includes(id)) && !/unassigned/.test(read('game.js')), allIds.filter((id) => !DELIVERED_BACKGROUNDS.includes(bgAt(id))).join(','));
check('挿絵は指定の2行だけに出る（c03-040-p1：投手の手元、c27-002：走り出すスパイク）', JSON.stringify(allIds.filter((id) => INSERTS.includes(bgAt(id)))) === JSON.stringify(['c03-040-p1', 'c27-002']));
check('5-26の帝嶺との練習試合（c26e-001〜c26e-010）は鳳翔のグラウンドで開催：ベンチ（hosho-field-bench）',
  G.scenes['rookies-teirei'].lines.every((l) => bgAt(l.id) === 'hosho-field-bench'));
check('E3（明日のない球場）は無人の球場にせず、観客席から決勝を見る行で koshien-field', bgAt('c32m-002') === 'koshien-field' && sceneOfLine.get('c32m-002') === 'aotake-no-tomorrow');
section('立ち絵の演出（全編）');
const portraitCues = G.cues.filter((c) => c.portrait !== undefined);
const has = (cue) => portraitCues.some((c) => JSON.stringify(c) === JSON.stringify(cue));
check('冒頭の大山と5-4の美空の既存演出（4つ）を維持している', [
  { at: 'c01-014', portrait: { slot: 'right', char: 'oyama', expr: 'school-winter-normal' } },
  { at: 'c01-021', portrait: { slot: 'right', clear: true } },
  { at: 'c04-005', portrait: { slot: 'right', char: 'misora', expr: 'game-uniform-normal' } },
  { at: 'c05-001', portrait: { slot: 'right', clear: true } },
].every(has));
check('視点人物の平野は立ち絵で出さない', portraitCues.every((c) => c.portrait.char !== 'hirano'));
check('立ち絵の演出は本文の並び順に並ぶ（キットは配列の後ろの指定を優先する）',
  portraitCues.every((c, i) => i === 0 || lineOrder.get(c.at) >= lineOrder.get(portraitCues[i - 1].at)));
const charOf = (p) => p && p.char + '/' + p.expr;
// 場面の中の立ち絵は、その場面の演出だけで決まる。stateAt が並び順で戻す立ち絵が、どの行でも一致すれば、別ルート・回想・前の場面の人物は残らない
const leakedPortraits = [];
for (const key of scenes) {
  const st = { left: null, right: null };
  for (const l of G.scenes[key].lines) {
    for (const c of portraitCues.filter((c) => c.at === l.id)) st[c.portrait.slot] = c.portrait.clear ? null : charOf(c.portrait);
    const got = V.stateAt(G, l.id).portraits;
    if (charOf(got.left) !== (st.left || null) || charOf(got.right) !== (st.right || null)) leakedPortraits.push(l.id);
  }
}
check('全' + allIds.length + '行で、復元される立ち絵がその場面の中の指定と一致する（分岐・合流・回想・場面転換で人物が残らない）',
  leakedPortraits.length === 0, leakedPortraits.slice(0, 5).join(','));
const shownAt = (id) => { const p = V.stateAt(G, id).portraits; return [p.left, p.right].filter(Boolean).map((x) => x.char + '/' + x.expr).join(',') || '-'; };
const usedPortraits = new Set(allIds.flatMap((id) => { const p = V.stateAt(G, id).portraits; return [p.left, p.right].filter(Boolean).map(charOf); }));
check('使う立ち絵（衣装・差分）は次のとおり。部屋着のデフォルメ、ベンチコート、パンツスーツ、日和の体操服・冬服、新庄の制服は、合う場面がないので使わない',
  [...usedPortraits].sort().join(',') === ['gen/casual-normal', 'hiyori/jersey-normal', 'hiyori/school-summer-bench', 'hiyori/school-summer-normal', 'kawamoto/casual-angry', 'kawamoto/casual-normal', 'kawamoto/casual-shock',
    'komiya/game-uniform-normal', 'komiya/practice-normal', 'misora/game-uniform-angry', 'misora/game-uniform-flustered-chibi', 'misora/game-uniform-hush', 'misora/game-uniform-normal', 'misora/game-uniform-pale',
    'misora/outing-normal', 'misora/pantsuit-first-day', 'misora/windbreaker-normal', 'muto/game-uniform-normal', 'nakata/game-uniform-normal', 'nakata/practice-bashful', 'nakata/practice-confronting', 'nakata/practice-normal',
    'nakata/practice-rage', 'nakata/practice-shock', 'nohara/game-uniform-normal', 'oyama/game-uniform-normal', 'oyama/practice-angry', 'oyama/practice-frustrated', 'oyama/practice-normal', 'oyama/school-summer-injured',
    'oyama/school-winter-normal', 'sasaki/game-uniform-daydream', 'sasaki/game-uniform-normal', 'sasaki/practice-normal', 'shinjo/game-uniform-normal', 'tahara/game-uniform-normal', 'tahara/practice-normal', 'tsuyoshi/formal-suit-normal'].sort().join(','), [...usedPortraits].sort().join(','));
check('美空の部屋着（デフォルメ）は使わない（家の場面は厳だけを出す）', ![...usedPortraits].some((x) => /loungewear/.test(x)) &&
  ['c17-007', 'c17-020', 'c23-005', 'c23-016', 'c27-018', 'c27-021'].every((id) => shownAt(id) === 'gen/casual-normal'));
const sceneLines = (...keys) => keys.flatMap((k) => G.scenes[k].lines.map((l) => l.id));
const firstDayLines = allIds.filter((id) => shownAt(id).includes('misora/pantsuit-first-day'));
check('就任初日のスーツは5-11の回想（testimony-memory）の中だけ', firstDayLines.length > 0 && firstDayLines.every((id) => sceneOfLine.get(id) === 'testimony-memory'));
const kawamotoPortraitLines = allIds.filter((id) => shownAt(id).includes('kawamoto/'));
check('河本（私服）は現在の場面（5-10〜5-12、決勝のスタンド c33d-001j〜k）だけで、回想には出さない', kawamotoPortraitLines.length > 0 &&
  kawamotoPortraitLines.every((id) => ['kawamoto-visit', 'testimony-start', 'testimony-present', 'testimony-ask', 'testimony-wait', 'testimony-end', 'kawamoto-results'].includes(sceneOfLine.get(id)) || ['c33d-001j', 'c33d-001k'].includes(id)));
check('名前のない先輩・1年生だけの場面（5-2・5-3、5-5の先輩に聞く分岐）では立ち絵を出さない',
  sceneLines('practice-start', 'practice-infield', 'practice-outfield', 'practice-end', 'scorer-first', 'marriage-senpai').every((id) => shownAt(id) === '-'));
// 5-13以降（全編の配置。docs/portrait-staging.md）
const at = (id) => V.stateAt(G, id).portraits;
check('卒業後の中田（応援席 c34-005、c35-014〜c35-015）と、引退後の家の場面には試合姿を出さない', ['c34-005', 'c35-014', 'c35-015'].every((id) => !shownAt(id).includes('nakata')));
check('試合中の中田は試合用ユニフォーム（北陵戦・龍成戦・清峰戦）', allIds.filter((id) => /^c1[4-9]-(?!pre-)/.test(id) && shownAt(id).includes('nakata/')).every((id) => shownAt(id).includes('nakata/game-uniform-normal')) && shownAt('c14-002-p1').includes('nakata/game-uniform-normal'));
check('名簿に佐々木の名前を見つける行（csummer-016〜019）では、佐々木本人を出さない', ['csummer-016', 'csummer-017', 'csummer-018', 'csummer-019'].every((id) => shownAt(id) === '-'));
check('回想の廊下（c15-008〜c15-013）は美空だけで、現在の佐々木を残さない', ['c15-008', 'c15-013'].every((id) => shownAt(id) === 'misora/game-uniform-normal'));
check('北陵ベンチ・龍成ベンチへの転換で、鳳翔の人物を残さない（北陵監督は立ち絵なし）', ['c15-017', 'c15-023', 'c16-017', 'c16-018'].every((id) => shownAt(id) === '-') && ['c19-013', 'c20-005g', 'c29h-006'].every((id) => shownAt(id) === 'nohara/game-uniform-normal'));
check('佐々木の陶酔の差分は c16-004a の1行だけで右に出し、c16-002（心の声）・c16-004（一枚絵）・c16-005 以降には出さない。ほかの人物は出さない',
  JSON.stringify(allIds.filter((id) => shownAt(id).includes('sasaki/game-uniform-daydream'))) === JSON.stringify(['c16-004a']) && shownAt('c16-004a') === 'sasaki/game-uniform-daydream' &&
  V.stateAt(G, 'c16-004a').portraits.right?.expr === 'game-uniform-daydream' && ['c16-002', 'c16-004', 'c16-005', 'c16-006'].every((id) => shownAt(id) === '-'));
check('陶酔の差分は通常の佐々木と同じ寸法・同じ描画範囲で、game.css に専用の大きさ・位置の指定がない（急に拡大しない）', !/sasaki-game-uniform-daydream/.test(read('game.css')));
check('新聞の一枚絵の区間は立ち絵を重ねず、大山は cnews-014 で部室を出たあと残らない', ['cnews-010', 'cnews-011c'].every((id) => shownAt(id) === '-') && shownAt('cnews-014') === 'oyama/practice-normal' && shownAt('cnews-015') === '-');
check('負傷姿（松葉杖）は病院の診察のあと（c18-020〜）と敗戦後の柵（c20-007〜008）だけで、復帰後のグラウンドには出さない',
  allIds.filter((id) => shownAt(id).includes('school-summer-injured')).every((id) => /^c18-0(2[0-8])$|^c20-00[78]$/.test(id)) && shownAt('c21-002').includes('oyama/practice-normal') && ['c18-018', 'c18-019'].every((id) => !shownAt(id).includes('oyama')));
check('100m離れたバス停の大山を、美空・剛と同じ並びで見せない（c24-008〜c24-013-3 は立ち絵なし）', ['c24-008', 'c24-011', 'c24-013-3'].every((id) => shownAt(id) === '-'));
check('田原・小宮の分岐：美空は通り過ぎるまで（c26a-007〜009、c26b-006〜008a）で、そのあと残さない', !shownAt('c26a-009a').includes('misora') && !shownAt('c26b-009').includes('misora') && shownAt('c26a-008').includes('misora/windbreaker-normal') && shownAt('c26b-008').includes('misora/windbreaker-normal'));
check('前日の映像確認（c26e-001-p1〜p30）では、映像の中の新庄を出さない', sceneLines('rookies-teirei').filter((id) => /^c26e-001-p/.test(id)).every((id) => !shownAt(id).includes('shinjo')) && shownAt('c26e-004') === 'komiya/game-uniform-normal,shinjo/game-uniform-normal');
check('美空の大きな笑顔・喜び（c35-019〜c36-020）は合う差分がないので出さない', allIds.filter((id) => /^c3(5-(019|02[01])|6-)/.test(id)).every((id) => !shownAt(id).includes('misora')));
check('名前のない人物・龍成選手・北陵監督・記者・保護者・インタビュアーは別人の素材で代用しない（使う人物は登録した12人だけ）', [...usedPortraits].every((x) => ['oyama', 'hiyori', 'nakata', 'sasaki', 'tahara', 'komiya', 'shinjo', 'muto', 'nohara', 'tsuyoshi', 'kawamoto', 'gen', 'misora'].includes(x.split('/')[0])));
const portraitSpans = [
  ['c01-013', '-'], ['c01-014', 'oyama/school-winter-normal'], ['c01-020', 'oyama/school-winter-normal'], ['c01-021', '-'], ['c01-023', '-'],
  ['c04-004', '-'], ['c04-005', 'misora/game-uniform-normal'], ['c04-034', 'misora/game-uniform-normal'],
  ['c04-035', 'nakata/practice-normal,misora/game-uniform-normal'], ['c04-037', 'oyama/practice-normal,misora/game-uniform-normal'], ['c05-001', '-'],
  ['c05-003', '-'], ['c05-004', 'oyama/practice-normal'], ['c05-027', 'oyama/practice-normal'], ['c05o-001', 'oyama/practice-normal'], ['c05s-001', '-'],
  ['c05e-011', 'oyama/practice-normal'], ['c05e-012', '-'], ['c05b-001', 'oyama/practice-normal'],
  ['c06-008', '-'], ['c06-009', 'misora/game-uniform-normal'], ['c06b-001', '-'], ['c06e-004', 'misora/game-uniform-normal'], ['c06e-004a', 'misora/game-uniform-pale'], ['c06e-009', '-'], ['c06e-010', 'misora/game-uniform-hush'],
  ['c07-001', 'misora/game-uniform-hush'], ['c07-004', 'misora/game-uniform-hush'], ['c07-005', 'misora/game-uniform-flustered-chibi'], ['c07-006', 'nakata/practice-confronting,misora/game-uniform-normal'], ['c07-006a', 'nakata/practice-confronting,misora/game-uniform-normal'], ['c07-007', 'nakata/practice-normal,misora/game-uniform-normal'], ['c07-008', 'nakata/practice-normal,misora/game-uniform-normal'], ['c07-020', 'nakata/practice-normal'], ['c07-023', '-'], ['c07-026', 'misora/game-uniform-normal'],
  ['c07-033', 'nakata/practice-normal,misora/game-uniform-normal'], ['c08-001', 'misora/game-uniform-normal'], ['c08-020', 'misora/game-uniform-normal'], ['c08-021', 'nakata/practice-rage'], ['c08-023', 'nakata/practice-rage'], ['c08-024', 'misora/game-uniform-normal'],
  ['c08-040', 'misora/game-uniform-normal'], ['c08-041', 'nakata/practice-shock,misora/game-uniform-normal'], ['c08-043', 'nakata/practice-shock,misora/game-uniform-normal'],
  ['c04-019', 'misora/game-uniform-normal'], ['c04-022', 'nakata/practice-bashful,misora/game-uniform-normal'], ['c04-023', 'misora/game-uniform-normal'],
  ['c07-016', 'nakata/practice-normal,misora/game-uniform-flustered-chibi'], ['c07-017', 'nakata/practice-bashful'], ['c07-018', 'nakata/practice-bashful'], ['c07-019', '-'],
  ['c08b-001', 'hiyori/jersey-normal'], ['c09-001', '-'], ['c09-002', 'hiyori/jersey-normal'],
  ['c09d-002', 'sasaki/practice-normal,hiyori/jersey-normal'], ['c09d-010', '-'], ['c09t-001', 'hiyori/jersey-normal'], ['c09t-004', 'sasaki/practice-normal,hiyori/jersey-normal'],
  ['c09e-001', 'sasaki/practice-normal'], ['c09e-006', 'hiyori/jersey-normal'], ['c09e-007', 'misora/game-uniform-normal,hiyori/jersey-normal'], ['c09e-014', '-'],
  ['c10-001', '-'], ['c10-002', 'kawamoto/casual-normal'], ['c10-008', 'misora/game-uniform-normal,kawamoto/casual-normal'], ['c10-020', 'misora/game-uniform-normal,kawamoto/casual-shock'],
  ['c10-021', 'kawamoto/casual-shock'], ['c10-030', 'kawamoto/casual-angry'], ['c10-031', 'kawamoto/casual-normal'],
  ['c11s-001', 'oyama/practice-normal,kawamoto/casual-normal'], ['c11m-001', '-'], ['c11m-001c', '-'], ['c11m-001d', 'misora/pantsuit-first-day'],
  ['c11m-021', '-'], ['c11m-029', 'misora/pantsuit-first-day'], ['c11p-001', 'kawamoto/casual-normal'], ['c11a-001', 'kawamoto/casual-normal'],
  ['c11w-001', 'oyama/practice-normal,kawamoto/casual-normal'], ['c11w-006', 'oyama/practice-frustrated,kawamoto/casual-normal'], ['c11e-001', 'kawamoto/casual-normal'], ['c11e-002', '-'],
  ['c12-001', 'misora/game-uniform-normal'], ['c12-002', 'misora/game-uniform-normal,kawamoto/casual-normal'], ['c12-016', 'misora/game-uniform-normal'],
  ['c12-020', 'misora/game-uniform-normal'], ['c13-001', '-'], ['c13-013', '-'],
  ['c13-014', 'oyama/game-uniform-normal,shinjo/game-uniform-normal'], ['c13-020', 'misora/game-uniform-normal,shinjo/game-uniform-normal'], ['c13-027', 'misora/game-uniform-normal,shinjo/game-uniform-normal'],
  ['c13-028', 'misora/game-uniform-normal,hiyori/jersey-normal'], ['c13-033', 'oyama/game-uniform-normal,shinjo/game-uniform-normal'], ['c13-037', 'oyama/game-uniform-normal,shinjo/game-uniform-normal'],
  ['csummer-001', 'hiyori/school-summer-normal'], ['csummer-009', 'hiyori/school-summer-normal,oyama/practice-normal'], ['csummer-010', 'sasaki/practice-normal'], ['csummer-014', 'misora/game-uniform-normal'],
  ['c14-001', '-'], ['c14-002-p1', 'hiyori/school-summer-bench,nakata/game-uniform-normal'], ['c14-002-p11', '-'], ['c14-005', 'nakata/game-uniform-normal'], ['c14-010', 'hiyori/school-summer-bench,nakata/game-uniform-normal'],
  ['c14-011-p1', '-'], ['c14-011-p6', 'misora/game-uniform-normal'], ['c14-011-p10', '-'],
  ['c15-002', 'misora/game-uniform-normal'], ['c15-005', 'misora/game-uniform-normal,sasaki/game-uniform-normal'], ['c15-007', '-'], ['c15-014', 'sasaki/game-uniform-normal'], ['c15-016a', 'sasaki/game-uniform-normal'],
  ['c15-025', 'misora/game-uniform-normal'], ['c15-029', 'misora/game-uniform-normal,sasaki/game-uniform-normal'], ['c16-001', '-'], ['c16-015', 'sasaki/game-uniform-normal'], ['c16-016', 'sasaki/game-uniform-normal'],
  ['c16-023', 'misora/game-uniform-normal'], ['cnews-001', '-'], ['cnews-005', 'oyama/practice-normal'], ['cnews-012', 'oyama/practice-normal'],
  ['c17-002', 'misora/game-uniform-normal'], ['c17-005', '-'], ['c17-024', '-'], ['c18-pre-c', 'nakata/practice-normal,oyama/practice-normal'], ['c18-pre-f', '-'], ['c18-001-p4', 'nakata/game-uniform-normal'],
  ['c18-001-p7', 'oyama/game-uniform-normal'], ['c18-012', '-'], ['c18-017', 'hiyori/school-summer-bench'], ['c18-027', 'hiyori/school-summer-bench,oyama/school-summer-injured'],
  ['c19-001', '-'], ['c19-004', 'misora/game-uniform-normal'], ['c19-010', 'nakata/game-uniform-normal,misora/game-uniform-normal'], ['c19-014', 'nohara/game-uniform-normal'], ['c19-019', 'muto/game-uniform-normal'], ['c19-022', '-'],
  ['c19-025', 'nakata/game-uniform-normal,misora/game-uniform-normal'], ['c20-004', '-'], ['c20-005h', 'nohara/game-uniform-normal'], ['c20-008', 'oyama/school-summer-injured'], ['c20-010', '-'], ['c20-014', '-'],
  ['cblank-006', 'hiyori/school-summer-normal'], ['cblank-012', '-'], ['c21-005', 'oyama/practice-normal'], ['c21-022a', 'oyama/practice-normal'],
  ['c22-009', 'nakata/practice-normal'], ['c22-016', 'hiyori/school-summer-normal'], ['c23-001', 'misora/windbreaker-normal'], ['c23-012', 'gen/casual-normal'],
  ['c24-003', 'misora/outing-normal,tsuyoshi/formal-suit-normal'], ['c24a-002', '-'], ['c24a-007a', 'tsuyoshi/formal-suit-normal'], ['c24b-003', 'misora/outing-normal,tsuyoshi/formal-suit-normal'], ['c24b-006', '-'], ['c24e-001', '-'],
  ['c25-014', 'misora/windbreaker-normal'], ['cwinter-010', 'hiyori/jersey-normal,oyama/practice-normal'], ['cwinter-030', '-'], ['csecond-003', 'hiyori/jersey-normal'], ['csecond-012', 'oyama/practice-normal'],
  ['c26-003', 'oyama/practice-normal,tahara/practice-normal'], ['c26-006', 'komiya/practice-normal'], ['c26-009', '-'],
  ['c26a-002', 'oyama/practice-normal,tahara/practice-normal'], ['c26a-008', 'misora/windbreaker-normal,tahara/practice-normal'], ['c26a-009b', 'oyama/practice-angry,tahara/practice-normal'], ['c26a-010', 'tahara/practice-normal'],
  ['c26b-002', 'oyama/practice-normal,komiya/practice-normal'], ['c26b-008', 'misora/windbreaker-normal,komiya/practice-normal'], ['c26b-009', 'komiya/practice-normal'],
  ['c26e-001-p2', 'hiyori/jersey-normal'], ['c26e-001', '-'], ['c26e-005', 'komiya/game-uniform-normal,shinjo/game-uniform-normal'], ['c26e-009', 'komiya/game-uniform-normal'], ['c26e-010', '-'],
  ['c27-005', 'komiya/practice-normal'], ['c27-009', 'hiyori/school-summer-bench,misora/game-uniform-normal'], ['c27-016', 'komiya/practice-normal'], ['c27-025', 'gen/casual-normal'], ['c28-015', 'nohara/game-uniform-normal'],
  ['c29a-003', 'hiyori/school-summer-bench'], ['c29b-001', '-'], ['c29c-001', '-'], ['c29d-005', 'muto/game-uniform-normal,nohara/game-uniform-normal'], ['c29d-008-p2', 'oyama/game-uniform-normal'],
  ['c29f-002', 'tahara/game-uniform-normal'], ['c29g-001', 'tahara/game-uniform-normal'], ['c29h-003', 'misora/game-uniform-normal'], ['c29h-007', 'nohara/game-uniform-normal'], ['c29h-012', '-'], ['c29h-013', '-'],
  ['c29i-003', 'oyama/game-uniform-normal'], ['c29j-001', '-'], ['c29k-003', 'oyama/game-uniform-normal,misora/game-uniform-normal'], ['c29k-004', '-'],
  ['cbus-001', 'hiyori/school-summer-normal'], ['cbus-003a', '-'], ['cbus-008', '-'], ['c30-001-p2', 'hiyori/school-summer-bench'], ['c30-004', 'komiya/game-uniform-normal'], ['c30-015', 'oyama/game-uniform-normal'],
  ['c30-025-p4', 'hiyori/jersey-normal'], ['c31a-004', '-'], ['c31a-007', 'hiyori/jersey-normal'], ['c31d-002', 'hiyori/school-summer-bench'], ['c31h-001', '-'], ['c31k-003', '-'],
  ['c32b-005', 'hiyori/school-summer-bench'], ['c32c-002', 'hiyori/jersey-normal'], ['c32d-001', 'hiyori/jersey-normal'], ['c32e-001-p4', 'tahara/game-uniform-normal'], ['c32e-002c', 'oyama/game-uniform-normal'],
  ['c32g-002', 'tahara/game-uniform-normal'], ['c32h-003', '-'], ['c32i-004', 'oyama/game-uniform-normal,tahara/game-uniform-normal'], ['c32l-001', '-'], ['c32m-003', '-'],
  ['c33a-001-p6', 'hiyori/school-summer-bench,komiya/game-uniform-normal'], ['c33a-001-p11', 'hiyori/school-summer-bench,oyama/game-uniform-normal'], ['c33c-001', 'hiyori/school-summer-bench'],
  ['c33d-001i', 'gen/casual-normal'], ['c33d-001k', 'kawamoto/casual-normal'], ['c33d-001n', 'hiyori/school-summer-bench'], ['c33d-001r', '-'], ['c33f-002', 'hiyori/school-summer-bench,tahara/game-uniform-normal'],
  ['c33i-004', 'tahara/game-uniform-normal'], ['c33k-001n', '-'], ['c33l-002', 'misora/game-uniform-normal,shinjo/game-uniform-normal'], ['c33l-005', 'shinjo/game-uniform-normal'], ['c33l-008', 'oyama/game-uniform-normal'],
  ['clastout-002', '-'], ['clastout-005', 'hiyori/school-summer-bench'], ['c34-003', '-'], ['c34-014', 'hiyori/school-summer-bench'], ['c35-009', 'misora/game-uniform-normal,oyama/game-uniform-normal'],
  ['c35-017', 'shinjo/game-uniform-normal'], ['c35-020', '-'], ['c36-001', '-'], ['c36-002', '-'], ['c36-015', 'gen/casual-normal'], ['c36-021', '-'], ['c36-019', 'hiyori/school-summer-bench'],
];
check('行ごとの立ち絵（左,右）：登場・退場・分岐・回想の主な行',
  portraitSpans.every(([id, want]) => shownAt(id) === want), portraitSpans.filter(([id, want]) => shownAt(id) !== want).map(([id]) => id + '=' + shownAt(id)).join(' '));

section('中田の表情差分と本文');
const expressionLines = (expr) => allIds.filter((id) => shownAt(id).split(',').includes('nakata/' + expr));
check('激怒は c08-021〜c08-023 だけ', JSON.stringify(expressionLines('practice-rage')) === JSON.stringify(['c08-021', 'c08-022', 'c08-023']), expressionLines('practice-rage').join(','));
check('照れ笑いは c04-022 と c07-017〜c07-018 だけ（美空が褒める c07-016 より前には出さない）', JSON.stringify(expressionLines('practice-bashful')) === JSON.stringify(['c04-022', 'c07-017', 'c07-018']), expressionLines('practice-bashful').join(','));
check('驚きは c08-041〜c08-043 だけで、左の枠に出る', JSON.stringify(expressionLines('practice-shock')) === JSON.stringify(['c08-041', 'c08-042', 'c08-043']) &&
  ['c08-041', 'c08-042', 'c08-043'].every((id) => V.stateAt(G, id).portraits.left.expr === 'practice-shock'));
check('激怒の区間は美空を出さず、c08-024 で美空に戻る', ['c08-021', 'c08-022', 'c08-023'].every((id) => !shownAt(id).includes('misora')) && shownAt('c08-024') === 'misora/game-uniform-normal');
const lineText = (id) => allLines.find((l) => l.id === id).text;
check('c08-021〜c08-023 は作者決定の確定文（形状の説明はせず、質問を引っ込める）', lineText('c08-021') === 'いつからお父さんに聞いてるんですか、と言いかけた。\n給水台の中田先輩と、目が合った。' && lineText('c08-022') === '……聞くのは、今度にしよう。' && lineText('c08-023') === '次は50周じゃ済まない気がした。');
check('激怒の区間の本文に、硬球の形状や表情を説明し直す文がない', ['c08-021', 'c08-022', 'c08-023'].every((id) => !/ひしゃげ|縫い目|鬼の形相/.test(lineText(id))));
check('c08-009 の給水のボトルの音は変えない', lineText('c08-009').startsWith('給水台のほうから、空のボトルをカゴに入れる音がした。'));
check('game.css の表情差分の専用表示は、表情差分の画像名だけを対象にする（ほかの立ち絵の大きさを一括で変えない）',
  (read('game.css').match(/\[src\$="([^"]+)"\]/g) || []).every((s) => /(?:nakata-practice-(?:rage|bashful|shock|confronting)|misora-game-uniform-(?:flustered-chibi|hush)|oyama-practice-angry|kawamoto-casual-shock|hirano-field-visit-vision)\.webp/.test(s)));
check('game.css の一枚絵の調整は、平野の朝練見学だけを対象にする（新聞・白無垢の一枚絵には適用しない）', !/cnews-oyama-tears-newspaper|cbus-oyama-daydream-bride/.test(read('game.css')));

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



section('表情第1便と新聞の一枚絵');
const addedSpans = {
 'misora/game-uniform-pale': ['c06e-004a','c06e-004b','c06e-005'],
 'misora/game-uniform-angry': ['c06e-006','c06e-007'],
 'misora/game-uniform-flustered-chibi': ['c07-005','c07-016'],
 'kawamoto/casual-shock': ['c10-020','c10-021','c10-022'],
 'kawamoto/casual-angry': ['c10-029','c10-030'],
 'oyama/practice-angry': ['c10-022','c10-023','c10-024','c10-025','c10-026','c10-027','c26a-009a','c26a-009b','c26a-009c','c26a-009d','c26a-009e'],
 'oyama/practice-frustrated': ['c11w-006','c11w-007'],
};
for (const [expr, expected] of Object.entries(addedSpans)) {
 check(expr + ' は指定区間だけに出る', JSON.stringify(allIds.filter(id => shownAt(id).split(',').includes(expr))) === JSON.stringify(expected));
}
const cgKey = 'cnews-oyama-tears-newspaper';
const CG_BATCH02 = {
  'c20-misora-tears': { lines: ['c20-004', 'c20-005', 'c20-005a'], release: 'c20-005b', bg: 'regional-stadium-dugout-sunset' },
  'c24-tsuyoshi-looming': { lines: ['c24-011'], release: 'c24-012', bg: 'station-plaza-autumn' },
  'c29h-misora-shadowed-smile': { lines: ['c29h-012', 'c29h-013'], release: 'c29i-001', bg: 'regional-stadium-dugout' },
  'c35-misora-full-smile': { lines: ['c35-019', 'c35-020', 'c35-021', 'c36-001', 'c36-002'], release: 'c36-003', bg: 'koshien-dugout' },
  'c16-sasaki-daydream-bride': { lines: ['c16-004'], release: 'c16-004a', bg: 'regional-stadium-field' },
  'hirano-field-visit-vision': { lines: ['c01-009', 'c01-010', 'c01-011'], release: 'c01-012', bg: 'hosho-field-fence-morning' },
  'cbus-oyama-daydream-bride': { lines: ['cbus-003a'], release: 'cbus-004', bg: 'bus-interior' },
};
const cgIds = Object.keys(G.assets.cgs);
check('一枚絵は9枚（新聞・平野の朝練見学・佐々木の花嫁・大山の白無垢、第5便の涙・影の笑み・剛・満面の笑み・幕切れ）', JSON.stringify([...cgIds].sort()) === JSON.stringify([cgKey, 'c36-ending-leap', ...Object.keys(CG_BATCH02)].sort()), cgIds.join(','));
check('一枚絵の ID はファイル名と同じで、assets/cg/ に実ファイルがある', cgIds.every((id) => G.assets.cgs[id].src === 'assets/cg/' + id + '.webp' && fs.existsSync(path.join(ROOT, G.assets.cgs[id].src))));
check('assets/cg には登録した9枚だけがある（削除した4枚・CSV・ZIP・PNG原本を置かない）', JSON.stringify(fs.readdirSync(path.join(ROOT, 'assets', 'cg')).sort()) === JSON.stringify(cgIds.map((id) => id + '.webp').sort()));
const badCg = cgIds.filter((id) => { const b = fs.readFileSync(path.join(ROOT, G.assets.cgs[id].src));
  return !(b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 16) === 'WEBPVP8 ' && (b.readUInt16LE(26) & 0x3fff) === 1920 && (b.readUInt16LE(28) & 0x3fff) === 1080); });
check('一枚絵はすべて不透明な WebP で、1920×1080px', badCg.length === 0, badCg.join(','));
check('CG 鑑賞の題名は場面名で、「妄想」「イメージ」などの説明を出さない', cgIds.every((id) => G.assets.cgs[id].title && !/妄想|イメージ|空想|想像/.test(G.assets.cgs[id].title)));
check('武藤の一枚絵は登録しない', !cgIds.some((id) => /muto/.test(id)));
const cgLines = (id) => allIds.filter((l) => V.stateAt(G, l).cg === id);
check('新聞CGは cnews-010〜cnews-011c だけに出て、cnews-012で消える', JSON.stringify(cgLines(cgKey)) === JSON.stringify(['cnews-010','cnews-011','cnews-011a','cnews-011b','cnews-011c']) && !V.stateAt(G, 'cnews-012').cg);
for (const [id, s] of Object.entries(CG_BATCH02)) {
  check(id + '：' + s.lines[0] + (s.lines.length > 1 ? '〜' + s.lines[s.lines.length - 1] : 'のみ') + 'に出て、' + s.release + 'で解除し、背景は ' + s.bg,
    JSON.stringify(cgLines(id)) === JSON.stringify(s.lines) && !V.stateAt(G, s.release).cg && V.stateAt(G, s.release).bg === s.bg && s.lines.every((l) => V.stateAt(G, l).bg === s.bg),
    cgLines(id).join(','));
}
check('幕切れ（c36-ending-leap）は最後の2行（c36-020〜c36-021）だけで、本文の結末まで出す', JSON.stringify(cgLines('c36-ending-leap')) === JSON.stringify(['c36-020', 'c36-021']) && G.scenes['real-promise'].lines.at(-1).id === 'c36-021' && !G.scenes['real-promise'].next);
check('影の笑みは勝敗どちらの経路でも解除される（勝利 c29i-001・敗北 c29j-001）', !V.stateAt(G, 'c29i-001').cg && !V.stateAt(G, 'c29j-001').cg && V.stateAt(G, 'c29i-001').bg === 'regional-stadium-dugout');
check('満面の笑みは場面をまたいで同じ画像を続ける（キットの制約で c35-019〜c35-021 と c36-001〜c36-002 の2区間。同じ ID）', G.cues.filter((c) => c.cg && c.cg.id === 'c35-misora-full-smile').map((c) => c.at + '〜' + c.cg.until).join(',') === 'c35-019〜c35-021,c36-001〜c36-002');
check('本文枠を最初に隠す演出は c20-004・c29h-012・c35-019 の3行だけ（game-reveal.js）、index.html は画像切り替えの後に読む',
  /REVEAL = \{ 'c20-004': 'c20-misora-tears', 'c29h-012': 'c29h-misora-shadowed-smile', 'c35-019': 'c35-misora-full-smile' \}/.test(read('game-reveal.js')) && read('index.html').indexOf('./game-reveal.js') > read('index.html').indexOf('./game-stage.js'));
check('半デフォルメ版は c07-005 と c07-016 だけ。c07-006 は美空を通常の顔に戻し、左に中田の突進を出す', shownAt('c07-005') === 'misora/game-uniform-flustered-chibi' && shownAt('c07-006') === 'nakata/practice-confronting,misora/game-uniform-normal');
const REMOVED_CGS = ['c10-kawamoto-daydream-embrace', 'c13-shinjo-daydream-dinner', 'c26a-tahara-daydream-home', 'c26b-komiya-daydream-hand'];
check('削除した4枚は、登録・表示指定・ファイル・作品のコードと CSS のどこにも残らない', REMOVED_CGS.every((id) => !(id in G.assets.cgs) && !(G.cues || []).some((c) => c.cg && c.cg.id === id) && !fs.existsSync(path.join(ROOT, 'assets', 'cg', id + '.webp')) && !['game.js', 'game.css', 'index.html', 'game-stage.js', 'game-title.js'].some((f) => read(f).includes(id))));
check('5-10・5-13・5-26 の両分岐は一枚絵を出さない', allIds.filter((id) => /^c(10|13|26[ab]?)-/.test(id)).every((id) => !V.stateAt(G, id).cg));
check('5-13 c13-020〜c13-024 は通常の背景（ベンチ）のまま', ['c13-020', 'c13-021', 'c13-022', 'c13-023', 'c13-024'].every((id) => V.stateAt(G, id).bg === 'hosho-field-bench'));
check('5-26 田原・小宮の分岐は通常の背景（放課後のグラウンド）のまま', allIds.filter((id) => /^c26[ab]-/.test(id)).every((id) => V.stateAt(G, id).bg === 'hosho-field-afternoon'));
check('分岐の一枚絵の解放を補う game-cg-branches.js は削除し、index.html から読まない', !fs.existsSync(path.join(ROOT, 'game-cg-branches.js')) && !read('index.html').includes('game-cg-branches'));
// キットは並び順で手前の一枚絵を解放する。残す3枚は、すべての経路が必ず通る場面にあり、通らずに先の場面へ進む経路がない（誤解放しない）
{
  const keys = Object.keys(G.scenes);
  const refsOf = (o, out) => { if (typeof o === 'function') { for (const m of String(o).matchAll(/'([^']+)'/g)) if (G.scenes[m[1]]) out.add(m[1]); } else if (typeof o === 'string') { if (G.scenes[o]) out.add(o); } else if (o && typeof o === 'object') for (const v of Object.values(o)) refsOf(v, out); return out; };
  const succ = Object.fromEntries(keys.map((k) => { const sc = G.scenes[k]; const out = refsOf(sc.next, new Set()); refsOf(sc.choices, out); sc.lines.forEach((l) => refsOf(l.choices, out)); return [k, out]; }));
  const startScene = G.start.scene;
  const all = new Set([startScene]); const st = [startScene];
  while (st.length) { const x = st.pop(); for (const y of succ[x]) if (!all.has(y)) { all.add(y); st.push(y); } }
  const bypass = cgIds.map((id) => {
    const at = G.cues.find((c) => c.cg && c.cg.id === id).at; const sc = sceneOfLine.get(at); const ci = keys.indexOf(sc);
    if (sc === startScene) return [];
    const seen = new Set([startScene]); const q = [startScene];
    while (q.length) { const x = q.pop(); for (const y of succ[x]) if (y !== sc && !seen.has(y)) { seen.add(y); q.push(y); } }
    return [...seen].filter((k) => keys.indexOf(k) > ci).map((k) => id + '→' + k);
  }).flat();
  check('残す3枚の場面を通らずに、並び順で後の場面へ進む経路がない（全 ' + all.size + ' 場面を探索）', all.size === keys.length && bypass.length === 0, bypass.slice(0, 5).join(' '));
}
function refsAll() { return [...read('index.html').matchAll(/(?:src|href)="([^"]+)"/g)].map((m) => m[1]); }
check('一枚絵の区間は通常の立ち絵を重ねない', allIds.filter(id => V.stateAt(G,id).cg).every(id => shownAt(id) === '-'));



process.exitCode = summary() ? 1 : 0;
