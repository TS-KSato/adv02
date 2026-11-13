# きみのための甲子園

ブラウザで遊ぶ横向きのノベルゲームの作品データ（試作）。冒頭から「父親たちと取材」までの本編初稿です。

- 場面：「春のグラウンド」（冒頭23行）と「練習へ交ざる」（内野または外野を選ぶ）、「記録する1年生」（両方の選択肢から進む）、「美空の登場」、「優勝と結婚」（大山か先輩に話を聞く）、幕間「あと10本」、「指導の出所」（指示を聞くか、資料を見るか選ぶ）、「外周50周」、「便利な部員、特別な相手」、幕間「机の端」、「日和との日常」（飲み物か用具の片づけを選ぶ）、「河本の来校」、「河本の証言」（回想のあとに平野か大山の反応を選ぶ）、「実績では伝わらない」、「新庄との接触」、幕間「夏の名簿」、「地方予選」、「佐々木の指名」、「一度だけの本塁打」、幕間「新聞と記録」、「表情が意味を持つ」、「大山の負傷」、「龍成との決戦、敗退」、「一人の涙、別々の意味」、幕間「空いた一行」、「大山の復帰」、「世代交代」、「厳が語る娘の決意」、「剛の目撃」（弟だと伝えるか、荷物を先に届けるか選ぶ）、「父親たちと取材」
- 公開予定：https://ts-ksato.github.io/adv02/ （公開中の内容は反映済みの版です）
- キット：ノベルゲーム制作キット 0.1.0（固定版。取り込みの経緯は [docs/kit-integration.md](docs/kit-integration.md)）

## 注意

- **背景は仮素材**です。手続きで描いた朝のグラウンドの PNG（`assets/backgrounds/field-morning-temp.png`）で、本番用の画像ではありません。後で同じ素材の名前から差し替えられるようにしています。
- 人物の立ち絵・BGM・環境音・効果音は**未登録**です。話者名と本文だけで読めます。
- 横向き専用です。縦向きでは案内を出して進行を止めます。
- 試験はデスクトップ版 Chromium で行っています。スマホ実機（iPhone・Android の Safari・Chrome）では確かめていません。

## 中身

```text
index.html                 入口（/adv02/ の下で動く。相対パスのみ）
game.js                    作品データ（window.KIT_GAME）
game.css                   新作専用の見た目（場面名・ページ数の札）
assets/backgrounds/        仮背景
kit/releases/0.1.0/        作品が実行時に読む、固定版のキット（4 ファイル）
kit/engine/                上流の複製（回帰試験が参照）
kit/samples/               キットの回帰試験用の作品（新作の下敷きではない）
tests/                     試験（kit/ はキットの回帰、game/ は新作の作品データ・冒頭・初練習）
docs/                      確認用の本文・企画前提・取り込みの記録
```

## 動かす

Node.js 18 以上が必要です。リポジトリの直下で次を実行します。

```sh
npm ci
npm run serve
```

ブラウザで次を開きます（横向きで見てください）。

- http://127.0.0.1:8080/adv02/

`npm run serve` は、リポジトリを `/adv02/` の下に置いて配信します。ルート直下（`http://127.0.0.1:8080/`）は配信しません。

## 試験

```sh
npm test                 # すべて（kit の unit・browser・saves と、game）
npm run test:unit        # キット：作品データの検証・演出・保存の評価（ブラウザ不要）
npm run test:browser     # キット：サンプルA・Bの操作（ブラウザ）
npm run test:saves       # キット：変更前の保存を、変更した作品データで読む（ブラウザ）
npm run test:game        # 新作：作品データ・取り込みの記録・冒頭と初練習（ブラウザ）
```

- ブラウザ試験は、試験自身が静的サーバーを起動・終了します。外部でサーバーを立てる必要はありません。
- 試験で使うブラウザは Playwright（1.56.1）が取得した Chromium です。別の Chromium を使うときは環境変数 `KIT_CHROMIUM_PATH` に実行ファイルのパスを指定します。
- `npm test` は、上流 `kit/README.md` の手順と違い、ゼルグの試験を呼びません（新作には含めていません）。

## 収録した本文の確認

- 本文では、回・塁・周・本数・学年などの数字は算用数字で表記します。「四球」「三遊間」などの用語や、「一瞬」「一緒」などの熟語は漢字のままにします。
- 本文と行IDは [docs/opening-script.md](docs/opening-script.md)、続きの本文は [docs/practice-script.md](docs/practice-script.md) 、[docs/scorer-script.md](docs/scorer-script.md)、[docs/coach-arrival-script.md](docs/coach-arrival-script.md)、[docs/victory-and-marriage-script.md](docs/victory-and-marriage-script.md)、[docs/source-of-coaching-script.md](docs/source-of-coaching-script.md)、[docs/fifty-laps-script.md](docs/fifty-laps-script.md)、[docs/convenient-scorer-script.md](docs/convenient-scorer-script.md)、[docs/hiyori-everyday-script.md](docs/hiyori-everyday-script.md)、[docs/kawamoto-visit-script.md](docs/kawamoto-visit-script.md)、[docs/kawamoto-testimony-script.md](docs/kawamoto-testimony-script.md) にあります。`game.js` と一致することを `tests/game/data.js` が確かめます。
- [5-12「実績では伝わらない」](docs/kawamoto-results-script.md)
- [5-13「新庄との接触」](docs/shinjo-first-meeting-script.md)
- [幕間「夏の名簿」](docs/summer-roster-script.md)
- [5-14「地方予選」](docs/regional-quarterfinal-script.md)
- [5-15「佐々木の指名」](docs/sasaki-called-script.md)
- [5-16「一度だけの本塁打」](docs/sasaki-home-run-script.md)
- [幕間「新聞と記録」](docs/newspaper-and-scorebook-script.md)
- [5-17「表情が意味を持つ」](docs/what-her-face-means-script.md)
- [5-18「大山の負傷」](docs/oyama-injury-script.md)
- [5-19「龍成との決戦、敗退」](docs/ryusei-defeat-script.md)
- [5-20「一人の涙、別々の意味」](docs/tears-after-the-final-script.md)
- [幕間「空いた一行」](docs/blank-line-script.md)
- [5-21「大山の復帰」](docs/oyama-return-script.md)
- [5-22「世代交代」](docs/nakata-handover-script.md)
- [5-23「厳が語る娘の決意」](docs/gen-reads-the-records-script.md)
- [5-24「剛の目撃」](docs/tsuyoshi-sighting-script.md)
- [5-25「父親たちと取材」](docs/parents-and-press-script.md)
- 試験では、冒頭から最初の選択肢へ進み、内野・外野それぞれの本文と合流、その先の「優勝と結婚」「指導の出所」「日和との日常」「河本の証言」の選択肢を確かめます。途中でリロードして「つづきから」で戻り、手動セーブも確かめます。

## 素材とキットの出所

- キット（`kit/`）は上流 https://github.com/ts-ksato/adv01 の固定版です。
- 作品の本文（`game.js`）と仮背景は、この作品のためのものです。
- サンプルA・Bの図形と音は、キットの試験用の素材です。
