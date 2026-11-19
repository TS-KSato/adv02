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
check('作品データの版は 2026.11-4', G.dataVersion === '2026.11-4', G.dataVersion);
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
check('父親たちと取材から新年度の幕間へ進む', press.next === 'second-scorebook' && !press.choices);

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
for (const group of ['cgs', 'bgm', 'ambience', 'se']) {
  check('素材「' + group + '」は空（今回は未登録でよい）', Object.keys(G.assets[group] || {}).length === 0);
}

section('立ち絵（assets/portraits）');
const portraitCsv = read('assets/portraits/portraits-list.csv').replace(/^﻿/, '').trim().split(/\r?\n/);
check('素材一覧の見出しは ファイル名・人物・衣装・差分・使用予定場面', portraitCsv[0] === 'ファイル名,人物,衣装,差分,使用予定場面', portraitCsv[0]);
const listedPortraits = portraitCsv.slice(1).map((row) => row.split(',')[0]);
const portraitFiles = fs.readdirSync(path.join(ROOT, 'assets', 'portraits')).filter((f) => f !== 'portraits-list.csv').sort();
check('素材一覧は35件で、重複がない', listedPortraits.length === 35 && new Set(listedPortraits).size === 35, String(listedPortraits.length));
check('素材一覧と assets/portraits の実ファイルが1対1で一致する（一覧以外のファイルがない）',
  JSON.stringify([...listedPortraits].sort()) === JSON.stringify(portraitFiles),
  portraitFiles.filter((f) => !listedPortraits.includes(f)).concat(listedPortraits.filter((f) => !portraitFiles.includes(f))).join(','));
const registered = Object.entries(G.assets.portraits).flatMap(([char, exprs]) => Object.entries(exprs).map(([expr, file]) => ({ char, expr, file })));
check('35枚すべてが assets.portraits に一度ずつ登録されている',
  registered.length === 35 && JSON.stringify(registered.map((r) => r.file).sort()) === JSON.stringify(listedPortraits.map((f) => 'assets/portraits/' + f).sort()));
check('登録のキーは「人物-衣装と差分.webp」のファイル名から作り、人物のキーは話者と同じ',
  registered.every((r) => r.file === 'assets/portraits/' + r.char + '-' + r.expr + '.webp' && Object.prototype.hasOwnProperty.call(G.speakers, r.char)),
  registered.filter((r) => r.file !== 'assets/portraits/' + r.char + '-' + r.expr + '.webp' || !G.speakers[r.char]).map((r) => r.file).join(','));
const badWebp = [];
for (const f of portraitFiles) {
  const b = fs.readFileSync(path.join(ROOT, 'assets', 'portraits', f));
  const ok = b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 16) === 'WEBPVP8X' && (b[20] & 0x10) !== 0 &&
    1 + b.readUIntLE(24, 3) === 859 && 1 + b.readUIntLE(27, 3) === 1280;
  if (!ok) badWebp.push(f);
}
check('立ち絵はすべて透過付きの WebP で、859×1,280px', badWebp.length === 0, badWebp.join(','));
check('PNG の原本や元画像の ZIP をリポジトリに入れていない', !portraitFiles.some((f) => /\.(png|zip)$/i.test(f)) && !fs.existsSync(path.join(ROOT, 'adv02-portraits-source-png.zip')));
section('背景（assets/backgrounds）');
const bgs = G.assets.backgrounds;
check('背景のパスはすべて作品基準の相対パスで、実ファイルがある',
  Object.values(bgs).every((f) => f.startsWith('assets/backgrounds/') && fs.existsSync(path.join(ROOT, f))),
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
  'school-station-road-evening', 'hirano-room', 'hospital-corridor'];
check('納品の背景は31枚（第1便17枚＋第2便4枚＋第3便7枚＋第4便3枚）', DELIVERED_BACKGROUNDS.length === 31 && new Set(DELIVERED_BACKGROUNDS).size === 31);
check('背景の登録は、納品の31枚だけ（無地の仮背景 unassigned は使い終えて削除）',
  JSON.stringify(Object.keys(bgs).sort()) === JSON.stringify([...DELIVERED_BACKGROUNDS].sort()), Object.keys(bgs).join(','));
check('納品の背景は「キー.webp」', DELIVERED_BACKGROUNDS.every((k) => bgs[k] === 'assets/backgrounds/' + k + '.webp'));
const bgFiles = fs.readdirSync(path.join(ROOT, 'assets', 'backgrounds')).sort();
check('assets/backgrounds には登録した31ファイルだけがある（無地の unassigned.png・CSV・PNG原本を置かない）',
  JSON.stringify(bgFiles) === JSON.stringify(Object.values(bgs).map((f) => path.basename(f)).sort()), bgFiles.join(','));
const badBg = [];
for (const k of DELIVERED_BACKGROUNDS) {
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
  ['c02e-017', 'hosho-field-afternoon'], ['c02e-018', 'school-station-road-evening'], ['c02e-019', 'school-station-road-evening'], ['c03-001', 'hosho-field-afternoon'],
  ['cblank-010', 'hosho-clubroom'], ['cblank-011', 'hirano-room'], ['cblank-013', 'hirano-room'], ['c21-001', 'hosho-field-afternoon'],
  ['c21-016', 'hospital-exam-room'], ['c21-017', 'hospital-corridor'], ['c21-018', 'hosho-field-afternoon'],
  ['c26a-010', 'hosho-field-afternoon'], ['c26b-009', 'hosho-field-afternoon'], ['c26e-001', 'hosho-field-bench'], ['c26e-010', 'hosho-field-bench'], ['c27-001', 'hosho-field-bench'],
  ['c02i-001', 'hosho-field-afternoon'], ['c02o-001', 'hosho-field-afternoon'], ['c02e-001', 'hosho-field-afternoon'],
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
  allIds.every((id) => DELIVERED_BACKGROUNDS.includes(bgAt(id))) && !/unassigned/.test(read('game.js')), allIds.filter((id) => !DELIVERED_BACKGROUNDS.includes(bgAt(id))).join(','));
check('5-26の帝嶺との練習試合（c26e-001〜c26e-010）は鳳翔のグラウンドで開催：ベンチ（hosho-field-bench）',
  G.scenes['rookies-teirei'].lines.every((l) => bgAt(l.id) === 'hosho-field-bench'));
check('E3（明日のない球場）は無人の球場にせず、観客席から決勝を見る行で koshien-field', bgAt('c32m-002') === 'koshien-field' && sceneOfLine.get('c32m-002') === 'aotake-no-tomorrow');
section('立ち絵の演出（5-2〜5-12）');
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
check('使う立ち絵は練習・片づけ・私服・就任初日の衣装だけ（家庭用デフォルメ・負傷・パンツスーツ通常などは使わない）',
  [...usedPortraits].sort().join(',') === ['hiyori/jersey-normal', 'kawamoto/casual-normal', 'misora/game-uniform-normal', 'misora/pantsuit-first-day',
    'nakata/practice-normal', 'oyama/practice-normal', 'oyama/school-winter-normal', 'sasaki/practice-normal'].sort().join(','), [...usedPortraits].join(','));
const sceneLines = (...keys) => keys.flatMap((k) => G.scenes[k].lines.map((l) => l.id));
const firstDayLines = allIds.filter((id) => shownAt(id).includes('misora/pantsuit-first-day'));
check('就任初日のスーツは5-11の回想（testimony-memory）の中だけ', firstDayLines.length > 0 && firstDayLines.every((id) => sceneOfLine.get(id) === 'testimony-memory'));
const kawamotoPortraitLines = allIds.filter((id) => shownAt(id).includes('kawamoto/'));
check('河本（私服）は現在の場面（5-10〜5-12）だけで、回想には出さない', kawamotoPortraitLines.length > 0 &&
  kawamotoPortraitLines.every((id) => ['kawamoto-visit', 'testimony-start', 'testimony-present', 'testimony-ask', 'testimony-wait', 'testimony-end', 'kawamoto-results'].includes(sceneOfLine.get(id))));
check('名前のない先輩・1年生だけの場面（5-2・5-3、5-5の先輩に聞く分岐）では立ち絵を出さない',
  sceneLines('practice-start', 'practice-infield', 'practice-outfield', 'practice-end', 'scorer-first', 'marriage-senpai').every((id) => shownAt(id) === '-'));
const lastPortraitScene = 'kawamoto-results';
check('立ち絵は冒頭と5-4〜5-12にだけ出て、5-13以降には残らない',
  allIds.filter((id) => shownAt(id) !== '-').every((id) => /^c01-/.test(id) || scenes.indexOf(sceneOfLine.get(id)) >= scenes.indexOf('coach-arrival') && scenes.indexOf(sceneOfLine.get(id)) <= scenes.indexOf(lastPortraitScene)));
const portraitSpans = [
  ['c01-013', '-'], ['c01-014', 'oyama/school-winter-normal'], ['c01-020', 'oyama/school-winter-normal'], ['c01-021', '-'], ['c01-023', '-'],
  ['c04-004', '-'], ['c04-005', 'misora/game-uniform-normal'], ['c04-034', 'misora/game-uniform-normal'],
  ['c04-035', 'nakata/practice-normal,misora/game-uniform-normal'], ['c04-037', 'oyama/practice-normal,misora/game-uniform-normal'], ['c05-001', '-'],
  ['c05-003', '-'], ['c05-004', 'oyama/practice-normal'], ['c05-027', 'oyama/practice-normal'], ['c05o-001', 'oyama/practice-normal'], ['c05s-001', '-'],
  ['c05e-011', 'oyama/practice-normal'], ['c05e-012', '-'], ['c05b-001', 'oyama/practice-normal'],
  ['c06-008', '-'], ['c06-009', 'misora/game-uniform-normal'], ['c06b-001', '-'], ['c06e-004', 'misora/game-uniform-normal'], ['c06e-004a', '-'], ['c06e-010', '-'],
  ['c07-001', '-'], ['c07-008', '-'], ['c07-020', 'nakata/practice-normal'], ['c07-023', '-'], ['c07-026', 'misora/game-uniform-normal'],
  ['c07-033', 'nakata/practice-normal,misora/game-uniform-normal'], ['c08-001', 'misora/game-uniform-normal'], ['c08-022', 'misora/game-uniform-normal'], ['c08-041', '-'],
  ['c08b-001', 'hiyori/jersey-normal'], ['c09-001', '-'], ['c09-002', 'hiyori/jersey-normal'],
  ['c09d-002', 'sasaki/practice-normal,hiyori/jersey-normal'], ['c09d-010', '-'], ['c09t-001', 'hiyori/jersey-normal'], ['c09t-004', 'sasaki/practice-normal,hiyori/jersey-normal'],
  ['c09e-001', 'sasaki/practice-normal'], ['c09e-006', 'hiyori/jersey-normal'], ['c09e-007', 'misora/game-uniform-normal,hiyori/jersey-normal'], ['c09e-014', '-'],
  ['c10-001', '-'], ['c10-002', 'kawamoto/casual-normal'], ['c10-008', 'misora/game-uniform-normal,kawamoto/casual-normal'], ['c10-020', 'misora/game-uniform-normal'],
  ['c10-021', '-'], ['c10-030', '-'], ['c10-031', 'kawamoto/casual-normal'],
  ['c11s-001', 'oyama/practice-normal,kawamoto/casual-normal'], ['c11m-001', '-'], ['c11m-001c', '-'], ['c11m-001d', 'misora/pantsuit-first-day'],
  ['c11m-021', '-'], ['c11m-029', 'misora/pantsuit-first-day'], ['c11p-001', 'kawamoto/casual-normal'], ['c11a-001', 'kawamoto/casual-normal'],
  ['c11w-001', 'oyama/practice-normal,kawamoto/casual-normal'], ['c11w-006', 'kawamoto/casual-normal'], ['c11e-001', 'kawamoto/casual-normal'], ['c11e-002', '-'],
  ['c12-001', 'misora/game-uniform-normal'], ['c12-002', 'misora/game-uniform-normal,kawamoto/casual-normal'], ['c12-016', 'misora/game-uniform-normal'],
  ['c12-020', 'misora/game-uniform-normal'], ['c13-001', '-'], ['c36-021', '-'],
];
check('行ごとの立ち絵（左,右）：登場・退場・分岐・回想の主な行',
  portraitSpans.every(([id, want]) => shownAt(id) === want), portraitSpans.filter(([id, want]) => shownAt(id) !== want).map(([id]) => id + '=' + shownAt(id)).join(' '));

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
