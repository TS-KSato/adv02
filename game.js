// 『きみのための甲子園』の作品データ。冒頭から優勝エンド「本当の約束」までの初稿。
// 本文は docs/ の各場面の本文 と一致させる（tests/game/data.js で確かめる）。
// 背景31枚、立ち絵45枚、一枚絵1枚。音素材は未登録。
window.KIT_GAME = {
  id: 'novelgame02-koshien',
  title: 'きみのための甲子園',
  dataVersion: '2026.11-4',   // 帝嶺学院戦の準備・回収フラグを追加
  kit: '0.1.0',               // 使うキットの版（kit/releases/0.1.0）

  start: { scene: 'opening-ground', line: 'c01-001' },

  // 話者の表示名。キーは line.speaker に書く。話者のない行は地の文になる
  speakers: { hirano: '平野', oyama: '大山', senpai: '先輩', other_senpai: '別の先輩', firstyear: '1年生', misora: '美空', nakata: '中田', hiyori: '日和', sasaki: '佐々木', kawamoto: '河本', member: '部員', other_member: '別の部員', shinjo: '新庄', hokuryo_coach: '北陵監督', hokuryo_player: '北陵選手', hokuryo_first_baseman: '北陵1塁手', reporter: '記者', gen: '厳', doctor: '医者', oyama_mother: '大山母', nohara: '野原', announcer: '場内アナウンス', spectator: '観客', hosho_mother: '鳳翔の母親', other_hosho_mother: '別の母親', tsuyoshi: '剛', visitor: '男', hosho_father: '鳳翔の父親', tahara: '田原', komiya: '小宮', ryusei_player: '龍成選手', muto: '武藤', hoshihama_player: '星浜選手', other_hoshihama_player: '別の星浜選手', hoshihama_coach: '星浜監督', teirei_coach: '帝嶺監督', teirei_player: '帝嶺選手', interviewer: 'インタビュアー', miura: '三浦', okada: '岡田' },

  // 2年目の大会で、試合を左右する情報を確認したか
  flags: { ryuseiPrep: { type: 'boolean', default: false }, ryuseiRecovery: { type: 'boolean', default: false },
    konanPrep: { type: 'boolean', default: false }, konanRecovery: { type: 'boolean', default: false },
    aotakePrep: { type: 'boolean', default: false }, aotakeRecovery: { type: 'boolean', default: false },
    teireiPrep: { type: 'boolean', default: false }, teireiRecovery: { type: 'boolean', default: false } },

  // 素材。背景は assets/backgrounds/ の31枚。立ち絵は assets/portraits/ の45枚（一覧は portraits-list.csv）。キーは人物（話者と同じ）→衣装と差分
  assets: {
    backgrounds: {
      'hosho-field-fence-morning': 'assets/backgrounds/hosho-field-fence-morning.webp',
      'hosho-field-afternoon': 'assets/backgrounds/hosho-field-afternoon.webp',
      'hosho-field-sunset': 'assets/backgrounds/hosho-field-sunset.webp', // 5-2 初日の練習の終わり（夕方の差分）
      'insert-pitch-grip': 'assets/inserts/insert-pitch-grip.webp', // 挿絵：投げる前の手元（5-3。CG鑑賞に登録しない）
      'insert-cleats-dirt': 'assets/inserts/insert-cleats-dirt.webp', // 挿絵：走り出すスパイクと土（5-27。CG鑑賞に登録しない）
      'hosho-field-bench': 'assets/backgrounds/hosho-field-bench.webp',
      'hosho-clubroom': 'assets/backgrounds/hosho-clubroom.webp',
      'regional-stadium-field': 'assets/backgrounds/regional-stadium-field.webp',
      'regional-stadium-dugout': 'assets/backgrounds/regional-stadium-dugout.webp',
      'regional-stadium-dugout-sunset': 'assets/backgrounds/regional-stadium-dugout-sunset.webp',
      'regional-stadium-concourse': 'assets/backgrounds/regional-stadium-concourse.webp',
      'koshien-field': 'assets/backgrounds/koshien-field.webp',
      'koshien-dugout': 'assets/backgrounds/koshien-dugout.webp',
      'koshien-concourse': 'assets/backgrounds/koshien-concourse.webp',
      'kamijo-living-room-night': 'assets/backgrounds/kamijo-living-room-night.webp',
      'oyama-home-entry': 'assets/backgrounds/oyama-home-entry.webp',
      'hospital-exam-room': 'assets/backgrounds/hospital-exam-room.webp',
      'station-plaza-autumn': 'assets/backgrounds/station-plaza-autumn.webp',
      'bus-interior': 'assets/backgrounds/bus-interior.webp',
      'bus-interior-sunset': 'assets/backgrounds/bus-interior-sunset.webp',
      'lodging-dining-hallway': 'assets/backgrounds/lodging-dining-hallway.webp',
      'lodging-dining-hall': 'assets/backgrounds/lodging-dining-hall.webp',
      'lodging-dining-hall-night': 'assets/backgrounds/lodging-dining-hall-night.webp',
      'ryusei-clubroom-night': 'assets/backgrounds/ryusei-clubroom-night.webp',
      // 第3便
      'hosho-classroom': 'assets/backgrounds/hosho-classroom.webp',
      'hosho-vending-area': 'assets/backgrounds/hosho-vending-area.webp',
      'hosho-school-exterior': 'assets/backgrounds/hosho-school-exterior.webp',
      'hosho-school-corridor': 'assets/backgrounds/hosho-school-corridor.webp',
      'oyama-home-exterior-night': 'assets/backgrounds/oyama-home-exterior-night.webp',
      'hospital-waiting-room': 'assets/backgrounds/hospital-waiting-room.webp',
      'hosho-gate-bus-morning': 'assets/backgrounds/hosho-gate-bus-morning.webp',
      // 第4便
      'school-station-road-evening': 'assets/backgrounds/school-station-road-evening.webp',
      'hirano-room': 'assets/backgrounds/hirano-room.webp',
      'hospital-corridor': 'assets/backgrounds/hospital-corridor.webp',
    },
    portraits: {
      hirano: {
        'school-winter-normal': 'assets/portraits/hirano-school-winter-normal.webp',
        'practice-normal': 'assets/portraits/hirano-practice-normal.webp',
        'game-uniform-normal': 'assets/portraits/hirano-game-uniform-normal.webp',
      },
      oyama: {
        'practice-angry': 'assets/portraits/oyama-practice-angry.webp',
        'practice-frustrated': 'assets/portraits/oyama-practice-frustrated.webp',
        'school-winter-normal': 'assets/portraits/oyama-school-winter-normal.webp',
        'practice-normal': 'assets/portraits/oyama-practice-normal.webp',
        'game-uniform-normal': 'assets/portraits/oyama-game-uniform-normal.webp',
        'school-summer-injured': 'assets/portraits/oyama-school-summer-injured.webp',
      },
      hiyori: {
        'school-winter-normal': 'assets/portraits/hiyori-school-winter-normal.webp',
        'jersey-normal': 'assets/portraits/hiyori-jersey-normal.webp',
        'gym-normal': 'assets/portraits/hiyori-gym-normal.webp',
        'school-summer-normal': 'assets/portraits/hiyori-school-summer-normal.webp',
        'school-summer-bench': 'assets/portraits/hiyori-school-summer-bench.webp',
      },
      nakata: {
        'practice-normal': 'assets/portraits/nakata-practice-normal.webp',
        'game-uniform-normal': 'assets/portraits/nakata-game-uniform-normal.webp',
        // 表情差分（第1便）。表示の大きさ・位置は game.css で素材ごとに調整する
        'practice-rage': 'assets/portraits/nakata-practice-rage.webp',
        'practice-bashful': 'assets/portraits/nakata-practice-bashful.webp',
        'practice-shock': 'assets/portraits/nakata-practice-shock.webp',
        'practice-confronting': 'assets/portraits/nakata-practice-confronting.webp',
      },
      sasaki: {
        'practice-normal': 'assets/portraits/sasaki-practice-normal.webp',
        'game-uniform-normal': 'assets/portraits/sasaki-game-uniform-normal.webp',
      },
      tahara: {
        'practice-normal': 'assets/portraits/tahara-practice-normal.webp',
        'game-uniform-normal': 'assets/portraits/tahara-game-uniform-normal.webp',
      },
      komiya: {
        'practice-normal': 'assets/portraits/komiya-practice-normal.webp',
        'game-uniform-normal': 'assets/portraits/komiya-game-uniform-normal.webp',
      },
      shinjo: {
        'game-uniform-normal': 'assets/portraits/shinjo-game-uniform-normal.webp',
        'school-winter-normal': 'assets/portraits/shinjo-school-winter-normal.webp',
      },
      muto: {
        'game-uniform-normal': 'assets/portraits/muto-game-uniform-normal.webp',
      },
      nohara: {
        'game-uniform-normal': 'assets/portraits/nohara-game-uniform-normal.webp',
      },
      tsuyoshi: {
        'formal-suit-normal': 'assets/portraits/tsuyoshi-formal-suit-normal.webp',
      },
      kawamoto: {
        'casual-shock': 'assets/portraits/kawamoto-casual-shock.webp',
        'casual-angry': 'assets/portraits/kawamoto-casual-angry.webp',
        'casual-normal': 'assets/portraits/kawamoto-casual-normal.webp',
      },
      gen: {
        'casual-normal': 'assets/portraits/gen-casual-normal.webp',
      },
      misora: {
        'game-uniform-pale': 'assets/portraits/misora-game-uniform-pale.webp',
        'game-uniform-angry': 'assets/portraits/misora-game-uniform-angry.webp',
        'game-uniform-flustered-chibi': 'assets/portraits/misora-game-uniform-flustered-chibi.webp',
        'game-uniform-hush': 'assets/portraits/misora-game-uniform-hush.webp',
        'windbreaker-normal': 'assets/portraits/misora-windbreaker-normal.webp',
        'game-uniform-normal': 'assets/portraits/misora-game-uniform-normal.webp',
        'bench-coat-normal': 'assets/portraits/misora-bench-coat-normal.webp',
        'pantsuit-normal': 'assets/portraits/misora-pantsuit-normal.webp',
        'pantsuit-first-day': 'assets/portraits/misora-pantsuit-first-day.webp',
        'outing-normal': 'assets/portraits/misora-outing-normal.webp',
        'loungewear-winter-chibi': 'assets/portraits/misora-loungewear-winter-chibi.webp',
        'loungewear-summer-chibi': 'assets/portraits/misora-loungewear-summer-chibi.webp',
      },
    },
    // 一枚絵。ID はファイル名と同じにし、画像を差し替えても変えない。題名は CG 鑑賞に出る場面名
    cgs: {
      'cnews-oyama-tears-newspaper': { src: 'assets/cg/cnews-oyama-tears-newspaper.webp', title: '新聞と記録' },
      // 第2便
      'hirano-field-visit-vision': { src: 'assets/cg/hirano-field-visit-vision.webp', title: '春のグラウンド' },
      'c10-kawamoto-daydream-embrace': { src: 'assets/cg/c10-kawamoto-daydream-embrace.webp', title: '河本の来校' },
      'c13-shinjo-daydream-dinner': { src: 'assets/cg/c13-shinjo-daydream-dinner.webp', title: '新庄との接触' },
      'cbus-oyama-daydream-bride': { src: 'assets/cg/cbus-oyama-daydream-bride.webp', title: '行きのバス' },
      'c26a-tahara-daydream-home': { src: 'assets/cg/c26a-tahara-daydream-home.webp', title: '田原と小宮' },
      'c26b-komiya-daydream-hand': { src: 'assets/cg/c26b-komiya-daydream-hand.webp', title: '田原と小宮' },
    },
    bgm: {},
    ambience: {},
    se: {},
  },

  // 場面。冒頭から初練習へ進み、2つの分岐が合流し、記録する1年生へ進む
  scenes: {
    'opening-ground': {
      title: '春のグラウンド',
      lines: [
        { id: 'c01-001', text: '俺の名前は平野知樹。今年、鳳翔高校に入学した。' },
        { id: 'c01-002', text: 'この高校を選んだ理由は、もちろん野球だ。' },
        { id: 'c01-003', text: 'ここ数年、甲子園で名前を聞くようになった鳳翔高校。' },
        { id: 'c01-004', text: 'このチームで、俺も甲子園優勝を目指す。' },
        { id: 'c01-005', text: '校舎へ向かう途中、グラウンドから声が聞こえた。' },
        { id: 'c01-006', speaker: 'hirano', text: 'お、朝練してる。ちょっと見ていくか。' },
        { id: 'c01-007', text: 'フェンスの向こうで、白球が跳ねる。' },
        { id: 'c01-008', text: '腰を落とした選手が拾い上げ、間を置かずに投げ返した。' },
        { id: 'c01-009', text: '太い腕。厚い胸板。次の打球を待つ、鋭い目。' },
        { id: 'c01-010', speaker: 'hirano', text: 'ん？……野球部、だよな？' },
        { id: 'c01-011', text: '練習着を着ていなければ、格闘技の合宿に見える。' },
        { id: 'c01-012', text: '一歩フェンスへ近づいた時、隣で声がした。' },
        { id: 'c01-013', speaker: 'oyama', text: 'ふ……こいつらなら、俺の足を引っ張ることはなさそうだな。' },
        { id: 'c01-014', text: '振り向く。俺と同じ、新しい制服の男子が立っていた。' },
        { id: 'c01-015', speaker: 'hirano', text: 'き、君は……大山君？　大山翔？' },
        { id: 'c01-016', speaker: 'oyama', text: '俺を知ってんのか。' },
        { id: 'c01-017', text: '見覚えがあるはずだ。中学野球で、その名前を何度も聞いた。' },
        { id: 'c01-018', speaker: 'oyama', text: 'お前も野球部志望か。' },
        { id: 'c01-019', speaker: 'hirano', text: 'ああ。俺も、ここで甲子園を目指そうと思って。' },
        { id: 'c01-020', speaker: 'oyama', text: 'せいぜい俺の足を引っ張るなよ。' },
        { id: 'c01-021', text: 'そう言って、大山はグラウンドの入口へ歩いていった。' },
        { id: 'c01-022', text: 'フェンスの向こうから、また鋭い打球音が響く。' },
        { id: 'c01-023', text: '俺も鞄を持ち直し、その後を追った。' },
      ],
      next: 'practice-start',
    },
    'practice-start': {
      title: '練習へ交ざる',
      lines: [
        { id: 'c02-001', text: "朝のフェンスを離れてから、何度か窓の外を見た。" },
        { id: 'c02-002', text: "教室から見えるのはグラウンドの端だけだった。\n昼休みには、白いベースを抱えた先輩が、そこを横切った。" },
        { id: 'c02-003', text: "あの人も朝からいたんだろうか。" },
        { id: 'c02-004', text: "放課後、机の横に掛けていた袋からグラブを出した。\n荷造りのとき、これだけは段ボールに入れず、手で持ってきた。" },
        { id: 'c02-005', text: "紐を締め直す。握って開く。\n中学のときから使っているので、\n指を入れるだけで親指の腹がいつもの場所に落ち着いた。" },
        { id: 'c02-006', text: "制服から練習着に着替え、朝とは反対側の門から入った。\n振り返ると、朝立っていたフェンスの前を、\nまだ下校途中の生徒が通っていた。" },
        { id: 'c02-007', text: "そっち側から見ていたときは、球の音のほうが声よりよく聞こえた。\n中へ入ると、捕る前にも、捕ってからにも、声があった。" },
        { id: 'c02-008', text: "「1つ」「こっち」「もう1つ」。\nどの声にも、返事の代わりみたいに球が戻っていく。" },
        { id: 'c02-009', speaker: 'senpai', text: "そこの1年。グラブ持ってるなら、入っていいぞ。" },
        { id: 'c02-010', text: "振り向くと、帽子のつばから汗が落ちそうな先輩が、\n底が見えるほど球の少ないカゴを片手で提げていた。" },
        { id: 'c02-011', speaker: 'hirano', text: "いいんですか。まだ、見学だけかと思ってました。" },
        { id: 'c02-012', speaker: 'senpai', text: "見ててもいいけど、持ってきたんだろ。" },
        { id: 'c02-013', text: "先輩は俺のグラブを見て言った。\nそれから、カゴの底に残っていた1球を拾って、遠くの選手に放った。" },
        { id: 'c02-014', text: "投げた先のやつが片手で受ける。\nカゴを持ったまま投げた球なのに、相手は靴1足ぶんも動かなかった。" },
        { id: 'c02-015', text: "俺もあれくらいなら投げられる、と思ってから、\nカゴを提げたままやったことはないな、と思い直した。" },
        { id: 'c02-016', text: "内野ではノック。外野では、打球を捕って中継へ返す練習をしている。\nどちらも列の最後に、1人入れるくらいの間があった。" },
        { id: 'c02-017', text: "まだ来たばかりだ。いきなり自分に向いた場所を決めなくてもいい。\nまず1本、球に触りたかった。" },
      ],
      choices: [
        { text: '内野のノックに混じる', to: 'practice-infield' },
        { text: '外野の返球に混じる', to: 'practice-outfield' },
      ],
    },
    'practice-infield': {
      title: '練習へ交ざる',
      lines: [
        { id: 'c02i-001', text: "内野の列に並ぶと、前の先輩が足元を指さした。" },
        { id: 'c02i-002', speaker: 'senpai', text: "そこ、投げるやつが通るから、半歩だけこっち。" },
        { id: 'c02i-003', text: "半歩ずれると、ちょうど俺のいたところを、捕り終えた選手が走り抜けた。\nグラブを叩いていた手が、もう次の球を受ける形になっていた。" },
        { id: 'c02i-004', text: "最初の1本は、正面より少し右に来た。2歩寄って腰を落とす。\n2つ目のバウンドが手前で浮いたので、そこへグラブを合わせた。" },
        { id: 'c02i-005', text: "土が手首に当たった。球はちゃんと中にあった。" },
        { id: 'c02i-006', text: "1塁へ投げる。低くも高くもない。\n先輩は胸の前で捕って、球をカゴのほうへ返した。" },
        { id: 'c02i-007', text: "打った先輩が、次の球を取りながら言った。" },
        { id: 'c02i-008', speaker: 'senpai', text: "よし！　普通だ！" },
        { id: 'c02i-009', speaker: 'hirano', text: "それ、褒めてるんですか？" },
        { id: 'c02i-010', speaker: 'senpai', text: "ああ。今の球なら、それでいい。" },
        { id: 'c02i-011', text: "先輩はこっちを見もせず、次の打球を打った。" },
        { id: 'c02i-012', text: "嫌味なら、もう少しこっちの反応を待つと思う。\nたぶん本当に、今の球ならそれでよかったのだ。" },
        { id: 'c02i-013', text: "次の1年は、俺より外へ動かされた。\n追いついて逆手で捕り、立て直してから投げた。\n先輩は同じように受けた。" },
        { id: 'c02i-014', speaker: 'firstyear', text: "もう1本。今のより右、お願いします。" },
        { id: 'c02i-015', speaker: 'senpai', text: "届かなくなるぞ。" },
        { id: 'c02i-016', speaker: 'firstyear', text: "はい。届かなかったら、もう1本お願いします。" },
        { id: 'c02i-017', text: "先輩は少し考えて、さっきより右へ打った。\nそいつは今度は触れず、打球が外野のほうまで抜けた。" },
        { id: 'c02i-018', text: "拾いに走りながら、そいつはもう「もう1本」と言っていた。" },
        { id: 'c02i-019', text: "自分の番が飛ばされそうなので、俺もつられて声を出した。" },
        { id: 'c02i-020', speaker: 'hirano', text: "その次、お願いします。" },
        { id: 'c02i-021', speaker: 'senpai', text: "おう。お前は普通のな。" },
        { id: 'c02i-022', text: "それは別に頼んでいない。でも順番が回ってくるなら、まあいい。" },
      ],
      next: 'practice-end',
    },
    'practice-outfield': {
      title: '練習へ交ざる',
      lines: [
        { id: 'c02o-001', text: "外野の列に並ぶと、中継の先輩が背中を向けたまま、片手を上げた。" },
        { id: 'c02o-002', speaker: 'senpai', text: "捕る前に1回、俺がどこにいるか見とけよ。" },
        { id: 'c02o-003', text: "言い終わるころには、先輩はもう少し右へ移っていた。\n投げる前に探していたら間に合わない、ということらしい。" },
        { id: 'c02o-004', text: "俺の番には、浅いフライが上がった。前へ出れば間に合う。\n球が落ちてくるあいだに、一度だけ内野を見た。" },
        { id: 'c02o-005', text: "先輩の手がまだ上がっていた。\n走りながら捕り、2歩で体を起こして、そこへ返した。" },
        { id: 'c02o-006', text: "先輩はその場で捕った。足を入れ替えて、本塁へ投げた。" },
        { id: 'c02o-007', text: "本塁でミットが鳴るより先に、外野にいた別の先輩の声がした。" },
        { id: 'c02o-008', speaker: 'senpai', text: "よし！　普通だ！" },
        { id: 'c02o-009', speaker: 'hirano', text: "それ、褒めてるんですか？" },
        { id: 'c02o-010', speaker: 'senpai', text: "ああ。今の球なら、それでいい。" },
        { id: 'c02o-011', text: "普通、と言われたときより、\nボールが向こうへ渡った音を聞いたときのほうが嬉しかった。\nまあ、怒られていないならいい。" },
        { id: 'c02o-012', text: "次の1年には、俺のときより深い打球が上がった。\n背中を向けて追い、落ちるぎりぎりで捕った。" },
        { id: 'c02o-013', text: "返球がそれて、中継の先輩が2歩動いた。\nそいつはグラブを外しかけてから、思い直したみたいにまたはめた。" },
        { id: 'c02o-014', speaker: 'firstyear', text: "もう1本。今のより奥へ、お願いします。" },
        { id: 'c02o-015', speaker: 'senpai', text: "先に今のをまっすぐ返せ。" },
        { id: 'c02o-016', speaker: 'firstyear', text: "じゃあ奥から、まっすぐ返します。" },
        { id: 'c02o-017', text: "無茶を言っているような声ではなかった。先輩も打ち直した。\n今度は捕れず、球がフェンスの下まで転がった。" },
        { id: 'c02o-018', text: "球を拾いに行ったやつが戻るまで待つつもりでいたら、\n中継の先輩がまた俺に手を上げた。" },
        { id: 'c02o-019', speaker: 'senpai', text: "待たなくていい。お前、次いけ。" },
        { id: 'c02o-020', text: "さっき見たときと、手を上げている場所が違った。\n俺はもう一度、そっちを見てから構えた。" },
      ],
      next: 'practice-end',
    },
    'practice-end': {
      title: '練習へ交ざる',
      lines: [
        { id: 'c02e-001', text: "ひと通り終わったところで、先輩が「水」と言った。" },
        { id: 'c02e-002', text: "給水台で、俺はグラブを脇に挟んでボトルを開けた。\n土のついた手では、ふたがなかなか回らない。" },
        { id: 'c02e-003', text: "隣に、さっき自分から難しい球を頼んだ1年が来た。\nあいつもふたを開け損ねて、シャツの裾で手を拭いていた。" },
        { id: 'c02e-003-p1', speaker: 'firstyear', text: "どこ中？" },
        { id: 'c02e-003-p2', speaker: 'hirano', text: "水沢中。たぶん知らないと思う。\n春に、県外から引っ越してきたから。" },
        { id: 'c02e-003-p3', speaker: 'firstyear', text: "県外か。どうりで見ない顔だと思った。\n俺は城南シニア。三浦。" },
        { id: 'c02e-003-p4', text: "平野、と名乗ると、三浦は拭いた手でやっとふたを回した。\n給水台の反対側で、それを聞いていた1年が顔を上げた。" },
        { id: 'c02e-003-p5', speaker: 'okada', text: "城南？　あの城南？" },
        { id: 'c02e-003-p6', speaker: 'miura', text: "あの、ってどの城南だよ。" },
        { id: 'c02e-003-p7', speaker: 'okada', text: "シニアの城南っつったら、あそこしかないだろ。\n……あ、俺、岡田。南町中。サードで、4番。" },
        { id: 'c02e-003-p8', text: "4番、のところだけ、少し声が大きかった。\n誰も打順までは聞いていなかった。" },
        { id: 'c02e-003-p9', speaker: 'miura', text: "南町って、去年、市でベスト4まで行ったとこか。\n準決勝、近所のやつが見に行ってた。" },
        { id: 'c02e-003-p10', speaker: 'okada', text: "そう、そこ。……準決で負けたけどな。" },
        { id: 'c02e-003-p11', text: "負けた、と言うときだけ、岡田はボトルの口を見た。\nそれから俺のほうを向いた。" },
        { id: 'c02e-003-p12', speaker: 'okada', text: "平野も中学、軟式？" },
        { id: 'c02e-003-p13', speaker: 'hirano', text: "うん。セカンド。" },
        { id: 'c02e-003-p14', speaker: 'okada', text: "じゃあ分かるだろ。さっきの最初の1球、\n捕ったあと、手の中でずしってこなかった？" },
        { id: 'c02e-003-p15', speaker: 'hirano', text: "きた。捕る形は同じなのに、\n止まってからの重さが残る。" },
        { id: 'c02e-003-p16', speaker: 'okada', text: "それ。俺、まだ親指の付け根がじんじんしてる。" },
        { id: 'c02e-003-p17', text: "三浦は笑わなかった。\n自分の左手を一度開いて、グラブの土を払った。" },
        { id: 'c02e-004', speaker: 'miura', text: "平野、明日も来る？" },
        { id: 'c02e-005', speaker: 'hirano', text: "うん。来るよ。" },
        { id: 'c02e-006', speaker: 'miura', text: "じゃあ、今度、俺の返した球も見てて。ちょっと曲がるんだよな。" },
        { id: 'c02e-007', speaker: 'hirano', text: "いいけど。俺で分かるかな。" },
        { id: 'c02e-008', speaker: 'miura', text: "外から見て、曲がってたら曲がってたって言って。" },
        { id: 'c02e-009', text: "それならできる。\nそう言うと、三浦は水を飲み終わり、ふたを閉めた。" },
        { id: 'c02e-009-p1', speaker: 'miura', text: "次、キャッチボールだって。組もうぜ。\n硬いのは、数捕ったほうが早く慣れる。" },
        { id: 'c02e-009-p2', speaker: 'okada', text: "俺も入れて。3人で回そう。" },
        { id: 'c02e-010', text: "三浦と岡田が先に列へ戻った。俺はもう一口だけ飲んだ。\n給水台に残っていた1年も、誰かが呼んだわけでもないのに、\n1人ずつ、同じほうへ戻っていく。" },
        { id: 'c02e-011', text: "俺もボトルを置いた。グラブをはめた指が少し汗ばんでいた。\nさっき捕れた球ならもう一度捕れる。\n違う球が来たら、今度はそっちを捕ってみたい。" },
        { id: 'c02e-012', text: "日が傾いて、球拾いが始まった。\n朝はフェンスの外から見ていた場所を、今度は内側から歩いた。" },
        { id: 'c02e-013', text: "隅の草のところに1球残っていた。\n手で拾うと、縫い目に湿った土が詰まっていた。" },
        { id: 'c02e-014', speaker: 'senpai', text: "1年、帰る前にそれだけ入れといて。" },
        { id: 'c02e-015', text: "カゴまで球を持っていくと、\nさっき俺に「普通だ」と言った先輩が手を出した。" },
        { id: 'c02e-016', speaker: 'senpai', text: "明日もグラブ、持ってこいよ。" },
        { id: 'c02e-017', speaker: 'hirano', text: "はい。" },
        { id: 'c02e-018', text: "駅までの道で、袋の中のグラブが歩くたびに膝に当たった。" },
        { id: 'c02e-019', text: "明日は最初から並べる。今は、それがちょっと楽しみだった。" },
      ],
      next: 'scorer-first',
    },
    'scorer-first': {
      title: '記録する1年生',
      lines: [
        { id: 'c03-001', text: "翌日もグラブを持っていった。" },
        { id: 'c03-002', text: "練習が始まる前に、三浦が俺を見つけた。\n昨日、給水台で言ったことを、向こうはちゃんと覚えていた。" },
        { id: 'c03-003', speaker: 'miura', text: "なあ、そこにいて。投げるから。" },
        { id: 'c03-004', text: "三浦はノックを1本受けると、1塁へ投げた。\n球はほとんど真っすぐ来て、最後に少しだけ先輩の右へ流れた。" },
        { id: 'c03-005', speaker: 'miura', text: "どうだった？" },
        { id: 'c03-006', speaker: 'hirano', text: "最後だけ。捕る人が動くほどじゃなかったけど。" },
        { id: 'c03-007', text: "三浦は1塁の先輩を見た。\n先輩はもう、流れたほうへ片足をずらして立っていた。" },
        { id: 'c03-007-p1', text: "その先輩が、グラブから球を出しながら三浦に言った。" },
        { id: 'c03-007-p2', speaker: 'senpai', text: "今の、右に逃げてる。次は胸な。" },
        { id: 'c03-007-p3', speaker: 'miura', text: "はい！" },
        { id: 'c03-008', speaker: 'miura', text: "あの人、俺が投げる前にもう動いてるんだよな。もう1回、見ててくれ。" },
        { id: 'c03-009', text: "2球目は先輩の胸に入った。\n1塁の先輩が「ナイスボール」と短く言って、球を返した。\n三浦は喜ぶより先に自分の足元を見た。\nさっきと何が違ったのか、思い出そうとしているらしかった。" },
        { id: 'c03-010', text: "俺もグラブをはめ、列の後ろへ回った。昨日より前のほうに並べた。" },
        { id: 'c03-011', text: "それから何日かして、部員を2組に分けて試合形式の練習をした。" },
        { id: 'c03-012', text: "出番を待っていると、先輩がベンチの隅からスコアブックを引き寄せた。\n角がめくれて、表紙はきちんと閉まらなくなっていた。" },
        { id: 'c03-013', speaker: 'senpai', text: "平野、次の組だろ。呼ばれるまで、これ頼む。" },
        { id: 'c03-014', speaker: 'hirano', text: "どこからですか？" },
        { id: 'c03-015', speaker: 'senpai', text: "2回裏から。打順表は表紙の裏な。" },
        { id: 'c03-016', text: "グラブを膝に置いて鉛筆を持った。\n守備が始まると、つい白球のほうを見てしまって、\n走者がどこで止まったかを見落としかけた。" },
        { id: 'c03-017', text: "次は、打った音がしたところで先に走者を見た。\n走者が2塁を回りかけて、急に足をそろえた。\n打者が1塁に着いたのは、そのあとだった。" },
        { id: 'c03-018', text: "守備についていると、どうしても自分の守備範囲に目が行く。\nベンチからだと、打球に触らなかった選手の動きまで見えた。" },
        { id: 'c03-019', text: "そういうことは、結果の横の空いたところに、\n読める程度の字で書いておいた。" },
        { id: 'c03-020', text: "交代で守備に入った回、俺は正面のゴロを一度こぼした。\n拾い直したときには、走者はもう1塁に着いていた。" },
        { id: 'c03-021', text: "拾った球を投手へ返すと、三浦がこっちへ顔を向けていた。" },
        { id: 'c03-021-p1', speaker: 'miura', text: "平野！　切り替え！　次1つ！" },
        { id: 'c03-021-p2', speaker: 'hirano', text: "おう！　次1つ！" },
        { id: 'c03-021-p3', text: "グラブを一度叩いて、腰を落とし直した。\n次の打球は俺のところには来なかった。" },
        { id: 'c03-022', text: "ベンチに戻ってから、俺がこぼした打球をエラーと記録した。\nその次の安打で、1塁走者が3塁まで行ったことも書き足した。" },
        { id: 'c03-023', text: "練習のあと、先輩がスコアブックをのぞいた。" },
        { id: 'c03-024', speaker: 'senpai', text: "3回、ヒット2本で1点か？" },
        { id: 'c03-025', speaker: 'hirano', text: "1本です。先頭は四球で、その次は俺がこぼしました。" },
        { id: 'c03-026', speaker: 'senpai', text: "ああ、あれお前か。" },
        { id: 'c03-027', text: "そこまで思い出さなくていい。" },
        { id: 'c03-028', text: "先輩の指が、その次の打席で止まった。\n1塁の走者がいつ3塁まで行ったか聞かれ、俺が書き足した余白を見せた。" },
        { id: 'c03-029', text: "先輩は一度グラウンドを見た。\nそれから、ページの端を折らずに、間に打順表を挟んだ。" },
        { id: 'c03-030', speaker: 'senpai', text: "ここ、明日もう1回見たい。閉じといていいぞ。" },
        { id: 'c03-031', text: "次の日も、最初はグラブを持って列に並んだ。\n記録を頼まれたのは、出番のないあいだだけだった。" },
        { id: 'c03-032', text: "その次は、守備から戻ると、\n俺が座っていたところにスコアブックが置いてあった。\n開くと、先輩が記録を終えた行の下に短い線が引いてあった。\n俺はその次の行から書いた。" },
        { id: 'c03-033', text: "向こうでは、1年が2人、空いた守備位置に同時に入ろうとしていた。\n1人が譲ったかと思うと、\n次の交代で、どちらが先に行くかでもう揉めている。" },
        { id: 'c03-034', text: "入学した日なら、俺もあの辺で次の番を待っていたと思う。\n実際、最初の何日かはそうしていた。" },
        { id: 'c03-035', text: "その日は、2人が入れ替わるのを見て、\nさっきの送球はどっちだったか聞きに行った。\n見分けられないまま書くと、あとで聞かれたとき困る。" },
        { id: 'c03-036', text: "それから何日かして。\nベンチに座り、先輩が置いていった打順表を写していた。" },
        { id: 'c03-037', speaker: 'senpai', text: "平野、今日の記録――" },
        { id: 'c03-038', text: "顔を上げると、先輩は俺の膝を見た。\nスコアブックはもう開いていた。" },
        { id: 'c03-039', speaker: 'senpai', text: "……早いな。" },
        { id: 'c03-040', speaker: 'hirano', text: "まだ名前しか書いてませんよ。" },
        { id: 'c03-040-p1', text: "大山がマウンドに上がった。\n足元の土を2度ならして、捕手のほうを向いただけだった。\nそれなのに、ベンチから見るグラウンドが、\nひと回り狭くなった気がした。" },
        { id: 'c03-041', text: "最初の打者がバットを構えた。\n大山は1塁側を一度見てから、足を上げた。" },
        { id: 'c03-042', text: "俺は打者の名前の横に、鉛筆の先を置いた。" },
        { id: 'c03-042-p1', text: "ミットが鳴った。\n打者は見送った。見送ったというより、\nバットを出すところまで行かなかったように見えた。" },
        { id: 'c03-042-p2', text: "捕手の先輩は、捕ったまますぐには返さなかった。\nミットを外しかけて、左手を一度開き、また握った。" },
        { id: 'c03-042-p3', speaker: 'other_senpai', text: "いってえ……" },
        { id: 'c03-042-p4', speaker: 'oyama', text: "芯で捕れ。" },
        { id: 'c03-042-p5', speaker: 'other_senpai', text: "捕ったわ。……何だよ、今の球。" },
        { id: 'c03-042-p6', text: "ショートから「ナイスピッチ」と声が飛んだ。\n捕手の先輩は首を一度振ってから、やっと球を返した。\n大山はそれを受けると、もう次の打者を見ていた。" },
        { id: 'c03-042-p7', text: "俺は1球目の欄に、見逃しのストライクを書いた。" },
        { id: 'c03-043', text: "グラブは今日も持ってきていた。\n鞄の中で、朝入れたときのままになっていた。" },
      ],
      next: 'coach-arrival',
    },
    'coach-arrival': {
      title: '美空の登場',
      lines: [
        { id: 'c04-001', text: "試合形式の練習は3回で切り上げた。\n残りの時間で内野の守備をもう一度やることになり、\n俺はベンチに残って3回の記録を埋めていた。" },
        { id: 'c04-002', text: "3回の最後の欄を埋めたとき、グラウンドの声がふっと途切れた。" },
        { id: 'c04-002a', speaker: 'hirano', text: "ん？　なんだ？" },
        { id: 'c04-003', text: "顔を上げると、さっきまで散らばっていた先輩たちが、\nベンチの前に一列に並んでいた。\n靴の先まで揃っている。\n軍隊みたいだった。" },
        { id: 'c04-003a', text: "列の端で「監督」と声がして、先輩たちが一斉に帽子を取った。" },
        { id: 'c04-004', text: "俺も鉛筆を置いて立った。" },
        { id: 'c04-005', text: "神条監督は、入口で立ち止まらずに、こっちへ歩いてきた。\n思っていたより背が高い。\n帽子の下から出た黒髪が、歩くたびに肩の後ろで揺れた。" },
        { id: 'c04-006', text: "近くまで来て、監督が一度、俺のほうを見た。" },
        { id: 'c04-007', text: "きれいな人だった。\n俺が挨拶をしそびれたことに気づいたのは、その人が通り過ぎてからだった。" },
        { id: 'c04-008', speaker: 'hirano', text: "お、お疲れさまです。" },
        { id: 'c04-009', text: "俺が頭を下げたときには、もう隣の先輩が帽子をかぶり直していた。" },
        { id: 'c04-010', text: "監督はベンチの端に立ち、内野を見た。\nノックを打つ先輩が球を持ち直すと、内野が4人とも腰を落とした。" },
        { id: 'c04-011', text: "まだ球が飛んでもいないのに、誰かが「1つ」と声を出した。\n反対側から「はい」と返った。\nさっきまでばらばらだった声で、今は球を渡す先が分かった。" },
        { id: 'c04-012', text: "三遊間に打球が飛んだ。\n追いついた選手が捕ったところで一度止まったので、1塁への送球が遅れた。" },
        { id: 'c04-013', speaker: 'misora', text: "田中。捕って終わりじゃない。送球まで。" },
        { id: 'c04-014', speaker: 'nakata', text: "はい！" },
        { id: 'c04-015', text: "返事をした選手が、さっきと同じ位置へ戻った。\nもう1本、と手を上げる。先輩がまた同じあたりへ打った。" },
        { id: 'c04-016', text: "今度は捕ったあとに足が止まらなかった。\n1塁の先輩は胸の前で送球を受け、すぐ球を返した。" },
        { id: 'c04-017', text: "あれなら走者がいても間に合いそうだった。\nそう思って見ていると、その選手が交代でベンチに戻ってきた。" },
        { id: 'c04-018', speaker: 'miura', text: "え？　先輩って中田じゃ……" },
        { id: 'c04-019', speaker: 'nakata', text: "わかってるよ。" },
        { id: 'c04-019-p1', text: "中田先輩は3年で、内野のレギュラーだ。\n俺たち1年が並んでいても、ノックのときにはこの人の声だけはすぐ分かる。" },
        { id: 'c04-022', text: "中田先輩はグラブを膝の上で裏返した。\n返事をしたときは真顔だったのに、口元が緩んでいた。" },
        { id: 'c04-023', text: "俺はスコアブックに目を戻した。\n3回の最後に残った消しゴムのかすを払った。" },
        { id: 'c04-024', text: "次の練習の記録は、どこから書こう。\nさっきの2本は結果だけならどちらも捕って投げただけだ。\n1本目と2本目の違いは、余白にでも書かないと残らない。" },
        { id: 'c04-025', speaker: 'misora', text: "記録、見せて。" },
        { id: 'c04-026', text: "すぐ近くで声がした。顔を上げると、監督が俺の膝の上を見ていた。" },
        { id: 'c04-027', speaker: 'hirano', text: "はい。3回ですか？" },
        { id: 'c04-028', speaker: 'misora', text: "うん。" },
        { id: 'c04-029', text: "開いたまま持っていった。風でページの端が浮いたので、\n監督が読んでいるところにかからないよう、指で押さえた。" },
        { id: 'c04-030', text: "監督は俺の手元を見たまま、しばらく何も言わなかった。" },
        { id: 'c04-031', text: "外野側から、打ち返した球がネットに当たる音がした。\nそれきり、次の打球の音がしなかった。" },
        { id: 'c04-032', speaker: 'misora', text: "そこ、開いておいて。" },
        { id: 'c04-033', speaker: 'hirano', text: "はい。" },
        { id: 'c04-034', text: "それだけだった。\n俺は元の場所へ戻り、開いたページの端に鉛筆を置いた。" },
        { id: 'c04-035', text: "中田先輩が、グラブを膝に乗せたまま俺を見ていた。\nその向こうで、別の先輩が、一度目をそらしてからもう一度こっちを見た。" },
        { id: 'c04-036', text: "練習のほうを見ると、大山がバットを肩に乗せて立っていた。\n次の打者を呼ぶ声がした。" },
        { id: 'c04-037', text: "大山も、こっちを見ていた。" },
      ],
      next: 'marriage-start',
    },
    'marriage-start': {
      title: '優勝と結婚',
      lines: [
        { id: 'c05-001', text: "練習の終わりまで、スコアブックは3回のところを開いておいた。" },
        { id: 'c05-002', text: "もう一度見せろと言われるかと思ったけれど、監督は先に帰った。\nページを閉じて、挟んでいた鉛筆を鞄の横のポケットに戻した。" },
        { id: 'c05-003', text: "スパイクを脱いでいた先輩たちが、なんとなく、まだベンチに残っていた。" },
        { id: 'c05-004', text: "大山がバットを片づけに来た。\n棚に立てかけると、帰らずに俺の前で足を止めた。" },
        { id: 'c05-005', speaker: 'oyama', text: "何を話した。" },
        { id: 'c05-006', speaker: 'hirano', text: "誰と？" },
        { id: 'c05-007', speaker: 'oyama', text: "美空とだよ。" },
        { id: 'c05-008', text: "俺はさっき閉じたばかりのスコアブックを見た。" },
        { id: 'c05-009', speaker: 'hirano', text: "3回の記録。見せてって言われて、見せた。" },
        { id: 'c05-010', speaker: 'oyama', text: "それで？" },
        { id: 'c05-011', speaker: 'hirano', text: "そこ開いといてって。それだけだけど。" },
        { id: 'c05-012', text: "大山は、俺がまだ何か言うと思っているようだった。\n俺も、あとは何を聞きたいのかと思って待った。" },
        { id: 'c05-013', speaker: 'hirano', text: "なんで？" },
        { id: 'c05-014', speaker: 'oyama', text: "甲子園で優勝したら、俺は美空に結婚を申し込む。" },
        { id: 'c05-015', text: "鞄の口を広げたまま、大山の顔を見た。" },
        { id: 'c05-016', speaker: 'hirano', text: "……結婚？　何の話？　なんでそうなるの？" },
        { id: 'c05-017', speaker: 'oyama', text: "ああ。" },
        { id: 'c05-018', text: "聞き間違いではなかった。\n3回の記録の話から、どこでそっちへ曲がったのかは分からなかった。" },
        { id: 'c05-019', speaker: 'senpai', text: "待てよ。もうお前がエースになるつもりか。" },
        { id: 'c05-020', text: "ベンチの端で、先輩がスパイクの紐をほどく手を止めていた。" },
        { id: 'c05-021', speaker: 'other_senpai', text: "エースとは限らねえだろ。俺は、決勝で一番活躍したやつだって聞いたぞ。" },
        { id: 'c05-022', text: "俺より先に聞き返したのは、大山だった。" },
        { id: 'c05-023', speaker: 'oyama', text: "何の話だ。" },
        { id: 'c05-024', speaker: 'senpai', text: "甲子園で優勝したら、\nそのときのエースが監督の結婚相手の候補になるって話だよ。" },
        { id: 'c05-025', speaker: 'oyama', text: "知らねえ。俺は、俺が申し込むって言ってんだ。" },
        { id: 'c05-026', text: "別の先輩が片足だけ靴を履き替えたまま、誰かのほうを見た。\n見られた先輩は、何を今さら、という顔をしていた。" },
        { id: 'c05-027', text: "ここでその話を初めて聞いたのは、どうも俺と大山だけだった。" },
      ],
      choices: [
        { text: '大山に聞く', to: 'marriage-oyama' },
        { text: '先輩に聞く', to: 'marriage-senpai' },
      ],
    },
    'marriage-oyama': {
      title: '優勝と結婚',
      lines: [
        { id: 'c05o-001', text: "大山は、バットの向きを揃えようとしていた。\n自分のを手前に置き直すまで待って、声をかけた。" },
        { id: 'c05o-002', speaker: 'hirano', text: "噂じゃないなら、いつからそう思ってたの。" },
        { id: 'c05o-003', speaker: 'oyama', text: "中学のとき。高校野球を見に行った。" },
        { id: 'c05o-004', text: "試合の話になるかと思った。大山は、どこが勝ったかは言わなかった。" },
        { id: 'c05o-005', speaker: 'oyama', text: "鳳翔の選手が引き上げてきて、そのあとに美空がいた。\nスタンドからでも分かった。" },
        { id: 'c05o-006', speaker: 'hirano', text: "誰かに、あの人が監督だって聞いたの？" },
        { id: 'c05o-007', speaker: 'oyama', text: "それはあとで聞いた。" },
        { id: 'c05o-008', speaker: 'hirano', text: "監督だって知らないうちから？" },
        { id: 'c05o-009', speaker: 'oyama', text: "ああ。" },
        { id: 'c05o-010', text: "それ以上の理由があるのかと待ったが、\n大山の中では、そこまでで十分らしかった。" },
        { id: 'c05o-011', speaker: 'hirano', text: "じゃあ、さっきまで結婚の噂は知らなかったんだ。" },
        { id: 'c05o-012', speaker: 'oyama', text: "噂なんか関係ねえ。俺と美空は結婚する運命なんだ。" },
        { id: 'c05o-013', text: "さっき「エースになるつもりか」と言われたときより、\nこっちの返事のほうが早かった。" },
      ],
      next: 'marriage-end',
    },
    'marriage-senpai': {
      title: '優勝と結婚',
      lines: [
        { id: 'c05s-001', text: "先輩は、途中になっていた紐をほどき直していた。俺は声を落とした。" },
        { id: 'c05s-002', speaker: 'hirano', text: "あの話、先輩たちはいつ知ったんですか。" },
        { id: 'c05s-003', speaker: 'senpai', text: "入ってから。俺も最初は知らなかったよ。" },
        { id: 'c05s-004', speaker: 'hirano', text: "誰に聞いたんですか。" },
        { id: 'c05s-005', speaker: 'senpai', text: "上の代。\n俺も1年のとき、何でそんなにみんな張り合うんですかって聞いたんだよ。" },
        { id: 'c05s-006', speaker: 'hirano', text: "野球のことで？" },
        { id: 'c05s-007', speaker: 'senpai', text: "最初はな。" },
        { id: 'c05s-008', text: "片方のスパイクを脱いで、泥が落ちないよう袋の中へ入れた。" },
        { id: 'c05s-009', speaker: 'hirano', text: "その先輩からは、エースだって聞いたんですか。" },
        { id: 'c05s-010', speaker: 'senpai', text: "そう。" },
        { id: 'c05s-011', speaker: 'other_senpai', text: "だから、俺が聞いたのは決勝で一番働いたやつ。打って決めてもいいんだよ。" },
        { id: 'c05s-012', speaker: 'hirano', text: "どっちが本当なんですか。" },
        { id: 'c05s-013', speaker: 'senpai', text: "エースだよ。\nこの前も監督が「最後まで任せられる人がいい」って言ってた。\n最後まで投げるやつのことだろ。" },
        { id: 'c05s-014', text: "そう言って、先輩は残りの紐をほどいた。\n今度は途中で手が止まらなかった。" },
      ],
      next: 'marriage-end',
    },
    'marriage-end': {
      title: '優勝と結婚',
      lines: [
        { id: 'c05e-001', text: "鞄に手をかけたところで、スパイクを袋に入れた先輩が大山を呼んだ。" },
        { id: 'c05e-002', speaker: 'senpai', text: "大山。明日、投げ足りなかったら呼べ。打席に立ってやる。" },
        { id: 'c05e-003', speaker: 'oyama', text: "なら左に立て。試したい球がある。" },
        { id: 'c05e-004', speaker: 'senpai', text: "いいぞ。打っても文句言うなよ。" },
        { id: 'c05e-005', speaker: 'oyama', text: "打てたらな。" },
        { id: 'c05e-006', text: "さっき結婚相手の候補を争っていた2人が、\n左の打者にどんな球を試すか話しながら先に出ていった。" },
        { id: 'c05e-007', text: "もう1人の先輩が、ベンチの下に転がっていた球を拾った。\n「大山」と呼んで、球を放った。" },
        { id: 'c05e-008', text: "大山が振り返って捕った。" },
        { id: 'c05e-009', speaker: 'other_senpai', text: "右も要るだろ。俺も行く。" },
        { id: 'c05e-010', speaker: 'oyama', text: "なら最初に左。あとで右。" },
        { id: 'c05e-011', text: "2人ともそれでいいらしかった。返事が揃った。" },
        { id: 'c05e-012', text: "ベンチに残った俺は、開けたままだった鞄にスコアブックをしまった。" },
        { id: 'c05e-013', text: "来たばかりのころは、\n次の1本を誰が打つかであれだけ張り合うのが不思議だった。\n今日も、明日の練習相手がもう決まった。" },
        { id: 'c05e-014', text: "ただ、今の会話のどこからが野球の話だったのか、\n途中で区切ろうとすると、うまくいかなかった。" },
      ],
      next: 'after-ten-more',
    },
    'after-ten-more': {
      title: 'あと10本',
      lines: [
        { id: 'c05b-001', text: "翌日の練習が終わった。\n先輩たちに何球も投げたはずの大山が、まだバットを片づけていなかった。" },
        { id: 'c05b-002', text: "ネットの前の台に球を載せて、一度振る。\n跳ね返った球が足元まで戻ってくるあいだに、次の球を台に載せた。" },
        { id: 'c05b-003', speaker: 'hirano', text: "監督なら、もう帰ったぞ。" },
        { id: 'c05b-004', speaker: 'oyama', text: "知ってる。あと10本。" },
        { id: 'c05b-005', text: "俺は帰りかけていた足を止めた。\nネットの下を転がってきた球を拾い、ボールカゴを足元に引き寄せた。" },
      ],
      next: 'coaching-start',
    },
    'coaching-start': {
      title: '指導の出所',
      lines: [
        { id: 'c06-001', text: "何日かして、1塁に走者を置いてバントの守備を練習した。" },
        { id: 'c06-002', text: "俺はベンチから、打球を拾った選手と送球先を書いていた。\n見慣れない練習は、部室の古い資料を見ておくと、\n誰がどこへ動くのか追いやすい。" },
        { id: 'c06-003', text: "投手の前にバントが転がった。\n投手は拾って2塁へ投げたが、\n1塁から走った選手の足が先にベースへ着いた。" },
        { id: 'c06-004', text: "2塁で球を受けた先輩が1塁を見た。\n打った選手も、もう1塁を駆け抜けていた。" },
        { id: 'c06-005', text: "2人とも残った。\n俺が記録に鉛筆を置くと、走者は練習のために1塁へ戻った。" },
        { id: 'c06-007', text: "投手は返ってきた球を打つ先輩に渡し、また構えた。\n監督は何も言わなかった。" },
        { id: 'c06-008', text: "次の打球も、投手の前だった。さっきより足元に近い。\n投手は拾うなり1塁へ投げ、今度は走者の足より先にミットが鳴った。" },
        { id: 'c06-009', text: "「1塁でアウト」と書いた。\n投手が球を返し、次の組と入れ替わり始めたところで、監督の声がした。" },
        { id: 'c06-006', speaker: 'misora', text: "まず1つ。2つ欲しがって、ゼロにするな。" },
        { id: 'c06-009a', text: "グラウンドから揃って「はい」と返った。\n俺は書いたばかりの「アウト」に目を戻した。" },
        { id: 'c06-009b', text: "2塁で間に合わなかった直後なら分かる。\nでも今の投手は、もう1つ取って、列の後ろへ戻るところだった。" },
        { id: 'c06-010', text: "1つずつ取れ、なら中学のときにもよく聞いた。\nでも、監督がそのあとに続けた言葉まで、どこかで聞いた気がした。" },
      ],
      choices: [
        { text: '指示の意味を聞く', to: 'coaching-ask' },
        { text: '去年の資料を見返す', to: 'coaching-notes' },
      ],
    },
    'coaching-ask': {
      title: '指導の出所',
      lines: [
        { id: 'c06a-001', text: "次の組が守備に就くまで、監督はベンチの端にいた。\n俺はスコアブックを開いたまま、横から声をかけた。" },
        { id: 'c06a-002', speaker: 'hirano', text: "監督。2塁で間に合いそうな球でも、1塁ですか？" },
        { id: 'c06a-003', text: "監督は一度、俺のほうを向いた。\n返事が来るかと思って待ったが、目はすぐグラウンドに戻った。" },
        { id: 'c06a-004', text: "次の打者はまだ落としたバットを拾っているところだった。\n誰かのプレーを見ていて答えられない、というわけでもなさそうだった。" },
        { id: 'c06a-005', speaker: 'misora', text: "まず1つ。そう言ったでしょ。" },
        { id: 'c06a-006', text: "怒られたのかと思って、いったん座り直した。" },
        { id: 'c06a-007', text: "「まず1つ」。二度目も、句切るところが同じだった。\n紙に太い字で書かれていたその一行を思い出した。\n去年の練習資料を見返していたとき、\n前の監督の名前が入った古い紙が混じっていた。" },
        { id: 'c06a-008', text: "俺が知りたいのはどっちの塁に投げるかだった。\n返ってきたのは、紙に書かれていたところまでだった。" },
      ],
      next: 'coaching-end',
    },
    'coaching-notes': {
      title: '指導の出所',
      lines: [
        { id: 'c06b-001', text: "ベンチの脇の棚から、去年の練習資料を抜いた。\n守備のページは何枚かまとまっていて、\nバントだけでも走者の位置ごとに分かれていた。" },
        { id: 'c06b-002', text: "その間に、色の違う紙が1枚混じっていた。前の監督の名前が入っている。\n去年の人が、古い資料からこのページだけ一緒に綴じたらしい。" },
        { id: 'c06b-003', text: "1塁と2塁を結んだ図の下に、太い字で書き込みがあった。" },
        { id: 'c06b-004', text: "『まず1つ。2つ欲しがって、ゼロにするな』" },
        { id: 'c06b-005', text: "さっきの声のまま読めた。\n俺は、そんな言い方だったなと思ってから、逆だったと気づいた。\n紙を見た覚えがあるから、さっきの言葉が引っかかったのだ。" },
        { id: 'c06b-006', text: "資料を閉じかけて、指を挟んでおいた。\n今の監督なら、この図を見ずにどこまで説明するだろう。" },
      ],
      next: 'coaching-end',
    },
    'coaching-end': {
      title: '指導の出所',
      lines: [
        { id: 'c06e-001', text: "給水に入ると、さっきまでベンチの前にいた選手たちが、\nボトルの置いてあるほうへ行った。\n監督だけが、同じところに立っていた。" },
        { id: 'c06e-002', speaker: 'hirano', text: "あの、監督。さっきのバント守備ですけど。" },
        { id: 'c06e-003', speaker: 'misora', text: "うん。" },
        { id: 'c06e-004', speaker: 'hirano', text: "あの言い方、誰かに教わったんですか？" },
        { id: 'c06e-004a', text: "返事を待つあいだ、俺は監督の顔を見ていた。\n口が少し開いて、頬からすっと色が引いた。" },
        { id: 'c06e-004b', text: "給水台のほうでは、さっきと同じように先輩たちの笑い声がしていた。" },
        { id: 'c06e-005', text: "監督の目が、俺の顔からスコアブックへ落ちた。\n鉛筆を挟んだままだったので、開いて見せようとした。" },
        { id: 'c06e-006', speaker: 'misora', text: "……馬鹿野郎。余計なことを考えるな。" },
        { id: 'c06e-007', text: "声だけ聞けば、グラウンドの誰かが叱られたみたいだった。\n辺りを見ても、監督の前に立っているのは俺だけだった。" },
        { id: 'c06e-008', speaker: 'hirano', text: "でも、前の監督の資料にも同じことが――" },
        { id: 'c06e-009', text: "監督が一歩詰めた。" },
        { id: 'c06e-010', text: "「書いてあります」と続ける前に、口を塞がれた。" },
      ],
      next: 'fifty-laps',
    },
    'fifty-laps': {
      title: '外周50周',
      lines: [
        { id: 'c07-001', speaker: 'misora', text: "その話、ここでするな。" },
        { id: 'c07-002', text: "さっきまでグラウンドに届いていた声が、\n急に俺にしか聞こえない大きさになった。" },
        { id: 'c07-003', text: "返事をしようとして、口を塞がれていることを思い出した。\nうなずくと、監督も手を離しかけた。" },
        { id: 'c07-004', text: "そのとき、給水台のほうで、地面にボトルを置く音がした。" },
        { id: 'c07-005', speaker: 'nakata', text: "1年！" },
        { id: 'c07-006', text: "監督がぱっと手を引いた。\n給水台から、中田先輩が土を蹴って、闘牛みたいに突っ込んできた。" },
        { id: 'c07-006a', text: "俺はとっさに半歩下がった。" },
        { id: 'c07-007', text: "俺の前まで来ても、先輩はすぐには俺を見なかった。\nまず監督の顔を見て、それから、2人のあいだに立った。" },
        { id: 'c07-008', speaker: 'nakata', text: "監督に何をした！" },
        { id: 'c07-009', speaker: 'hirano', text: "俺は何も。ちょっと、さっきの練習のことで――" },
        { id: 'c07-010', text: "さっきの話はここでするなと言われたばかりだった。\n監督を見ると、今度は手を出さず、目だけでこっちを見ていた。" },
        { id: 'c07-011', speaker: 'nakata', text: "なんで監督の顔を見るんだ。" },
        { id: 'c07-012', speaker: 'hirano', text: "いや、話していいかと思って。" },
        { id: 'c07-013', speaker: 'nakata', text: "外周50周！" },
        { id: 'c07-014', speaker: 'hirano', text: "ごじゅ……。" },
        { id: 'c07-015', text: "どこから出てきた数なのか聞こうとした。\nでも中田先輩はもう、俺ではなく監督のほうを向いていた。" },
        { id: 'c07-016', speaker: 'misora', text: "そ、そうだ。よく言った。ええと……2年！" },
        { id: 'c07-017', speaker: 'nakata', text: "3年の中田であります！　ありがとうございます！" },
        { id: 'c07-018', text: "中田先輩は背筋を伸ばした。\nさっき「監督に何をした」と言ったときより、よほどいい声だった。" },
        { id: 'c07-019', text: "給水台にいた先輩が、地面に置いたボトルを拾い上げた。\n別の先輩が俺のほうを見たが、こっちへ来る気配はなかった。" },
        { id: 'c07-020', text: "中田先輩が振り返った。\n背筋は伸びたままで、眉間にだけ、またしわが寄った。" },
        { id: 'c07-021', speaker: 'nakata', text: "何してる。行け。" },
        { id: 'c07-022', text: "スコアブックをベンチに置いて、帽子をかぶり直した。" },
        { id: 'c07-023', text: "外周に出る門は、練習の最初にいつも走るときと同じ場所にあった。\nあそこを出て、校舎の裏を回って戻ってきて、やっと1周だ。" },
        { id: 'c07-024', text: "とりあえず門まで行ってから、どうするか考えることにした。" },
        { id: 'c07-025', speaker: 'misora', text: "1年。戻って。" },
        { id: 'c07-026', text: "あと数歩で門に着くところだった。\n振り向くと、監督がベンチの前で手招きしていた。" },
        { id: 'c07-027', text: "俺の近くには、もう1人1年がいた。あいつも足を止めた。" },
        { id: 'c07-028', speaker: 'misora', text: "そっちじゃない。記録つけてたほう。" },
        { id: 'c07-029', text: "俺が自分を指すと、監督はうなずいた。" },
        { id: 'c07-030', speaker: 'misora', text: "さっきの話。続きがある。" },
        { id: 'c07-031', text: "引き返した。中田先輩の横を通るときに少し歩幅を狭めたが、\nもう「行け」とも「走れ」とも言われなかった。" },
        { id: 'c07-032', text: "ベンチでスコアブックを拾い、念のため振り返った。" },
        { id: 'c07-033', text: "中田先輩は、まだ同じところに立っていた。\n帽子を直している途中の手まで止まっていて、目だけがこっちを向いていた。" },
      ],
      next: 'convenient-scorer',
    },
    'convenient-scorer': {
      title: '便利な部員、特別な相手',
      lines: [
        { id: 'c08-001', text: "監督は、俺が戻ってきたのを確かめると、\nベンチの端に置いてあった紙を引き寄せた。" },
        { id: 'c08-002', text: "白い紙だった。\n何を見せられるのかと思っていたら、そのまま俺の前へ押してきた。" },
        { id: 'c08-003', speaker: 'misora', text: "さっきの質問、ここに書いて。" },
        { id: 'c08-004', speaker: 'hirano', text: "2塁を狙える当たりでも、1塁を優先するのか、ってことですか？" },
        { id: 'c08-005', speaker: 'misora', text: "そう。それ、父さんに渡すから。" },
        { id: 'c08-006', text: "鉛筆を持って「2塁」と書いた。その先で手が止まった。" },
        { id: 'c08-007', text: "「2つ欲しがって、ゼロにするな」。\n去年のファイルに挟まっていた、前の監督の資料と同じ言い方だった。\nだから、今の監督もそれを読んだんだと思っていた。" },
        { id: 'c08-008', text: "でも、どういうときなら2塁でいいのか聞いたとき、監督は答えなかった。\n今、その答えを父親に聞こうとしている。" },
        { id: 'c08-009', text: "給水台のほうから、空のボトルをカゴに入れる音がした。\n監督は紙の端を押さえたまま、俺の字が増えるのを待っていた。" },
        { id: 'c08-010', text: "……まさか。" },
        { id: 'c08-011', speaker: 'hirano', text: "今日の指示も、お父さんに聞いたんですか？" },
        { id: 'c08-012', speaker: 'misora', text: "うん。昨日。" },
        { id: 'c08-013', text: "あまりあっさり返ってきたので、\n今のが答えだったのかと思って、監督の顔を見た。" },
        { id: 'c08-014', text: "監督はもう、俺の後ろを見ていた。\n声が届くか確かめるように、給水台のほうへ顔を向けてから、\n少し身をかがめた。" },
        { id: 'c08-015', speaker: 'misora', text: "あ……あと。父さんに聞いてること、内緒にして。" },
        { id: 'c08-016', speaker: 'hirano', text: "先輩たちも知らないんですか？" },
        { id: 'c08-017', speaker: 'misora', text: "ちょ、声。……誰にも言わないで。" },
        { id: 'c08-018', speaker: 'hirano', text: "……はい。" },
        { id: 'c08-019', text: "監督は「2塁」とだけ書いた紙を指で押さえた。" },
        { id: 'c08-020', speaker: 'misora', text: "こっちの続きは書いて。" },
        { id: 'c08-021', text: "いつからお父さんに聞いてるんですか、と言いかけた。\n給水台で鬼の形相をした中田先輩と目が合って、やめた。" },
        { id: 'c08-022', text: "だって、中田先輩の手の中で、硬球が平たくひしゃげていた。\n裂けた赤い縫い目から、中身がのぞいていた。" },
        { id: 'c08-023', text: "次は50周じゃ済まない気がした。" },
        { id: 'c08-024', text: "質問の続きを急いで書いて、紙を渡した。\n書いたところを監督に見せるつもりで持ち上げたら、\nもう端をつまんで取られていた。" },
        { id: 'c08-025', speaker: 'hirano', text: "じゃ、失礼します。" },
        { id: 'c08-026', text: "監督が紙を折り終える前に、ベンチを離れた。" },
        { id: 'c08-027', text: "翌日、同じ紙が返ってきた。\n「2塁」の字は俺のままで、その下だけ、別の人の角ばった字が並んでいた。" },
        { id: 'c08-028', text: "塁の位置を描いた図まであった。\n打球を拾った場所と、そのときの走者の位置に、それぞれ小さな印がついていた。" },
        { id: 'c08-029', text: "昨日は、捕ってからどっちに投げるかを聞いたつもりだった。\n図を見ると、捕る前にどこまで見えているかで、答えが変わるらしかった。" },
        { id: 'c08-030', speaker: 'hirano', text: "監督、これ読みました？" },
        { id: 'c08-031', speaker: 'misora', text: "聞いたの、そっちでしょ。読んでおいて。" },
        { id: 'c08-032', text: "監督は俺の指が止まっていた図に目をやった。\nそれから、紙がもう俺の手にあるのを見て、手ぶらでベンチを出ていった。" },
        { id: 'c08-033', text: "それから、必要なときに、記録の写しや質問を書いた紙を渡すようになった。\n返ってくる紙には、ときどき、あの角ばった字が増えていた。" },
        { id: 'c08-034', text: "何度目かに、スコアブックの写しを渡すと、\n監督の目が、紙の端に書いておいた俺の名前で止まった。" },
        { id: 'c08-035', speaker: 'misora', text: "平野って、これ、君？" },
        { id: 'c08-036', speaker: 'hirano', text: "はい。俺のです。" },
        { id: 'c08-037', text: "監督は名前のところをもう一度見て、紙を折った。" },
        { id: 'c08-038', text: "何日かして、用具を片づけていると、ベンチの前で監督が手を上げた。" },
        { id: 'c08-039', speaker: 'misora', text: "平野。この前の記録、ある？" },
        { id: 'c08-040', speaker: 'hirano', text: "はい。今、持っていきます。" },
        { id: 'c08-041', text: "隣で中田先輩が、転がってきた球に手を伸ばした。\n伸ばしたところで止まった。" },
        { id: 'c08-042', speaker: 'nakata', text: "……今、平野って言ったよな。" },
        { id: 'c08-043', text: "球はその手の下を抜けて、先輩の靴の向こうへ転がっていった。" },
      ],
      next: 'desk-corner',
    },
    'desk-corner': {
      title: '机の端',
      lines: [
        { id: 'c08b-001', text: "監督に頼まれた紙を抱えて部室に戻ると、\n日和が机の端にあったテープと空き箱をどけてくれた。" },
        { id: 'c08b-001-p1', text: "日和は、俺と同じ1年のマネージャーだ。" },
        { id: 'c08b-002', speaker: 'hiyori', text: "平野くんのは、こっちでいい？" },
        { id: 'c08b-003', text: "いつも俺がスコアブックを開くところだった。\n今日は、そこにだけ乾いたタオルが敷いてある。" },
        { id: 'c08b-004', text: "紙を置いてから、袖で机を拭かずに済んだことに気づいた。" },
        { id: 'c08b-005', speaker: 'hirano', text: "これ、いつから敷いてくれてたの？" },
        { id: 'c08b-006', speaker: 'hiyori', text: "平野くんが、机を拭いてから書いてた日から。" },
        { id: 'c08b-007', text: "いつのことだろう。自分でも覚えていない。" },
      ],
      next: 'hiyori-start',
    },
    'hiyori-start': {
      title: '日和との日常',
      lines: [
        { id: 'c09-001', text: "別の日の練習帰り。フェンスの影がベンチの中まで伸びていた。\nボールの音がしなくなると、道路を走る自転車の音まで聞こえた。" },
        { id: 'c09-002', text: "日和はベンチの前で、クーラーボックスの取っ手に用具カゴを引っかけようとしていた。\n片方を持ち上げるたびに、もう片方が傾く。" },
        { id: 'c09-003', speaker: 'hirano', text: "どっちか持とうか。" },
        { id: 'c09-004', speaker: 'hiyori', text: "助かる。両方いけると思ったんだけど。" },
        { id: 'c09-005', text: "カゴの底でテープの芯が転がった。\n日和はそっちを押さえながら、クーラーボックスのふたも、きちんと閉まっているか確かめた。" },
      ],
      choices: [
        { text: '飲み物を運ぶ', to: 'hiyori-drinks' },
        { text: '用具の片づけを手伝う', to: 'hiyori-equipment' },
      ],
    },
    'hiyori-drinks': {
      title: '日和との日常',
      lines: [
        { id: 'c09d-001', text: "クーラーボックスを持つと、思ったより軽かった。\n日和が「あ、まだ閉めないで」と言ったので、いったんベンチに置いた。" },
        { id: 'c09d-002', text: "日和は冷えた小さな紙パックを取り出した。いちご牛乳だった。\nパックの角についた水をタオルで拭いてから、\nシューズの紐を結んでいた佐々木先輩に差し出した。" },
        { id: 'c09d-002-p1', text: "佐々木先輩は3年で、練習が終わっても打撃ケージの近くに残っていることが多い。" },
        { id: 'c09d-003', speaker: 'hiyori', text: "佐々木先輩。これ、好きでしたよね。" },
        { id: 'c09d-004', text: "佐々木先輩は紐を片方だけ引いたまま、紙パックと日和の顔を順に見た。" },
        { id: 'c09d-005', speaker: 'sasaki', text: "……覚えてたの？" },
        { id: 'c09d-006', speaker: 'hiyori', text: "練習が終わると、いつもそれ買ってるから。" },
        { id: 'c09d-007', text: "先輩は両手で受け取った。\n濡れてもいない紙パックを一度だけ袖で拭いて、嬉しそうに笑った。" },
        { id: 'c09d-008', speaker: 'sasaki', text: "ありがと。今日ちょうど買ってなかったんだ。" },
        { id: 'c09d-009', speaker: 'hiyori', text: "よかった。" },
        { id: 'c09d-010', text: "俺が取っ手を持ったままだと、2人ともちょっとこっちを気にする気がした。\nクーラーボックスのふたを音がしないように閉めて、先に部室へ運んだ。" },
      ],
      next: 'hiyori-end',
    },
    'hiyori-equipment': {
      title: '日和との日常',
      lines: [
        { id: 'c09t-001', text: "用具カゴを持ち上げると、取っ手を通してバットの重みが手にかかった。\n棚まで運ぼうとしたところで、日和が中から1本抜いた。" },
        { id: 'c09t-002', speaker: 'hiyori', text: "それだけ手前に置いといて。\n佐々木先輩、グリップ巻き直すって言ってたから。" },
        { id: 'c09t-003', text: "見ると、グリップの端が少し浮いていた。\n上から押すといったん収まるが、指を離すとまためくれた。" },
        { id: 'c09t-004', text: "佐々木先輩が戻ってきて、俺の持っているカゴをのぞいた。" },
        { id: 'c09t-004-p1', text: "佐々木先輩は3年で、練習が終わっても打撃ケージの近くに残っていることが多い。" },
        { id: 'c09t-005', speaker: 'sasaki', text: "あれ、俺のバットもうしまった？" },
        { id: 'c09t-006', speaker: 'hiyori', text: "手前に出してあります。テープも、いつもの幅のが棚にありますよ。" },
        { id: 'c09t-007', speaker: 'sasaki', text: "助かる。明日の朝、一番に使いたかったんだ。" },
        { id: 'c09t-008', text: "佐々木先輩は棚へ向かった。\n途中で立ち止まり、日和のほうを振り返ってもう一度「ありがとな」と言った。" },
        { id: 'c09t-009', text: "日和はうなずいて、クーラーボックスからいちご牛乳を取り出した。\n先輩が棚に向かう前に、それも手渡した。" },
      ],
      next: 'hiyori-end',
    },
    'hiyori-end': {
      title: '日和との日常',
      lines: [
        { id: 'c09e-001', text: "翌日、練習帰りに自販機の前を通ると、\n佐々木先輩が昨日と同じいちご牛乳を買っていた。" },
        { id: 'c09e-002', speaker: 'hirano', text: "先輩、ほんとにそれ好きなんですね。" },
        { id: 'c09e-003', speaker: 'sasaki', text: "前に監督が飲んでたんだよ。\nそんなにうまいのかと思って買ったら、うまかった。" },
        { id: 'c09e-004', text: "先輩はストローを差して一口飲んだ。" },
        { id: 'c09e-005', speaker: 'sasaki', text: "あ、日和に会ったら、今日はもう買ったって言っといてくれ。\n昨日もらったばっかりだから。" },
        { id: 'c09e-006', text: "部室に戻って伝えると、日和は空になったクーラーボックスの中を拭きながら、「うん。分かった」と答えた。\nふたを開けたまま棚の下へ置き、乾かすために少し手前へ引き出した。" },
        { id: 'c09e-007', text: "俺が机のタオルを畳んでいると、部室の戸から監督が顔を出した。\n誰かに用があるのかと思ったら、俺のほうには特に何も言わず、\n日和の隣に座った。" },
        { id: 'c09e-008', speaker: 'misora', text: "日和ちゃん、これ半分あげる。" },
        { id: 'c09e-009', text: "菓子の袋の口を広げ、日和のほうへ向ける。" },
        { id: 'c09e-010', speaker: 'hiyori', text: "ありがとうございます。じゃあ、食べたら帰りますね。" },
        { id: 'c09e-011', text: "日和がひとつ取ると、監督もひとつ取った。\n食べる前に、もう一度日和を見た。" },
        { id: 'c09e-012', speaker: 'misora', text: "……もうちょっといてくれない？" },
        { id: 'c09e-013', text: "日和は肩にかけかけていた鞄を、椅子の下に置いた。" },
        { id: 'c09e-014', text: "俺は畳んだタオルを机の端に置いて部室を出た。\n戸が閉まるまで、後ろから話し声はしなかった。" },
      ],
      next: 'kawamoto-visit',
    },
    'kawamoto-visit': {
      title: '河本の来校',
      lines: [
        { id: 'c10-001', text: "練習が終わって、俺はベンチの下に転がった球を拾っていた。\nあと1球、腰掛けの脚に引っかかっている。" },
        { id: 'c10-002', text: "グラウンドの入口に男が立っていた。\n茶色のチェックの上着で、シャツの襟にサングラスを掛けている。\nすぐそばを部員が通ったのに、声をかけず、ベンチの奥まで見回していた。" },
        { id: 'c10-003', speaker: 'senpai', text: "……河本さんじゃねえか。" },
        { id: 'c10-004', text: "俺も部室の写真で顔を知っていた。\n鳳翔の元エースで、今はプロで投げている河本由伸だ。" },
        { id: 'c10-005', text: "河本さんの目が、練習メニューを片づけていた監督のところで止まった。" },
        { id: 'c10-006', speaker: 'other_senpai', text: "プロの実績を自慢しに来たなあ。監督は高校野球一筋なんだよ。" },
        { id: 'c10-007', text: "カゴを持った先輩がベンチの前で足を止めた。\n河本さんはその横を通って、監督のところへ行った。" },
        { id: 'c10-008', text: "監督は机の端で紙の角を揃えていた。\n河本さんが隣に立っても顔を上げなかった。" },
        { id: 'c10-009', speaker: 'kawamoto', text: "美空……監督。" },
        { id: 'c10-010', text: "そこでようやく、監督が紙を持ったまま振り向いた。" },
        { id: 'c10-011', text: "河本さんは上着の内側から新聞の切り抜きを出し、\n写真が監督のほうを向くように広げた。" },
        { id: 'c10-012', speaker: 'kawamoto', text: "去年、一軍で8つ勝ちました。" },
        { id: 'c10-013', text: "マウンドに立つ河本さんの写真が載っていた。\n折り目は、写真の外を通っていた。" },
        { id: 'c10-014', text: "監督は持っていた紙を机に置き、切り抜きを受け取った。" },
        { id: 'c10-015', speaker: 'misora', text: "そう。おめでとう。" },
        { id: 'c10-015-p1', text: "河本の耳には、その一言が、試合のあとの球場で、\n自分だけに向けられた声に聞こえていた。" },
        { id: 'c10-016', text: "切り抜きは練習メニューのいちばん下に入った。紙の束の角をまた揃える。" },
        { id: 'c10-017', text: "河本さんは口元を緩めた。\nまだ帰らず、監督がもう一度こっちを向くのを待っていた。" },
        { id: 'c10-018', speaker: 'kawamoto', text: "俺がここにいたときは――" },
        { id: 'c10-019', speaker: 'misora', text: "……誰だっけ。" },
        { id: 'c10-020', text: "河本さんの口が開いたまま止まった。" },
        { id: 'c10-021', text: "ベンチの下の球がやっと取れた。\n立ち上がると、俺の後ろに大山が来ていた。\n河本さんと監督のあいだに、横から顔を出した。" },
        { id: 'c10-022', speaker: 'oyama', text: "み、美空。そいつ、誰だよ！" },
        { id: 'c10-023', speaker: 'kawamoto', text: "……お前、今「美空」って呼んだか？" },
        { id: 'c10-024', speaker: 'oyama', text: "誰だって聞いてんだ。" },
        { id: 'c10-025', text: "河本さんは大山を見た。次の言葉だけは、美空にも届くような声だった。" },
        { id: 'c10-026', speaker: 'kawamoto', text: "鳳翔の元エース、河本だ。" },
        { id: 'c10-027', speaker: 'oyama', text: "元か。じゃあもう部員じゃねえだろ。帰れ！" },
        { id: 'c10-028', text: "監督は紙の束を持ち上げた。\n河本さんの名前を聞いても、写真を見直すことはなかった。" },
        { id: 'c10-029', speaker: 'kawamoto', text: "お前な……！" },
        { id: 'c10-030', text: "河本さんが大山の正面に回った。\nカゴを持ったままの先輩が、場所を空けるように足をずらした。\n止めに入るつもりはなさそうだった。" },
        { id: 'c10-031', text: "河本さんは言いかけたことをやめ、監督を一度見た。\nそれから、大山に向き直った。" },
        { id: 'c10-032', speaker: 'kawamoto', text: "この人が監督になった日、最初に目標を聞いたのは俺だぞ。" },
        { id: 'c10-033', text: "8勝を報告したときより、声が大きかった。" },
      ],
      next: 'testimony-start',
    },
    'testimony-start': {
      title: '河本の証言',
      lines: [
        { id: 'c11s-001', speaker: 'oyama', text: "いつから知ってようが、もう卒業しただろ。" },
        { id: 'c11s-002', text: "大山はベンチの向こうを見た。\n監督は紙の束を持って、鞄を置いてある奥の腰掛けへ移っていた。" },
        { id: 'c11s-003', speaker: 'kawamoto', text: "就任初日だ。あの日、誰も声をかけられなかったんだぞ。" },
        { id: 'c11s-004', text: "河本さんはそこでいったん言葉を切った。\n大山がこっちを向くまで待ってから、続きを言った。" },
        { id: 'c11s-005', speaker: 'kawamoto', text: "俺が聞くまでな。" },
      ],
      next: 'testimony-memory',
    },
    'testimony-memory': {
      title: '美空の就任初日',
      lines: [
        { id: 'c11m-001', text: "新しい監督が来るというので、部員はグラウンドに並んでいた。\n前の列から後ろまで、まだ好き勝手な話をしていた。" },
        { id: 'c11m-001a', speaker: 'member', text: "神条監督、解雇だってよ。" },
        { id: 'c11m-001b', speaker: 'other_member', text: "マジかよ。別に大したことなんてしてねえのにな。" },
        { id: 'c11m-001c', speaker: 'member', text: "次の監督が来ても、やることは同じだろ。" },
        { id: 'c11m-001d', text: "風が白線の上の土をさらった。その向こうから、長い黒髪の女が歩いてきた。" },
        { id: 'c11m-001e', text: "光が、肩からこぼれた髪の縁を細くなぞった。\n列の前で足が止まり、伏せていた顔が上がった。" },
        { id: 'c11m-001f', text: "空も白線も、いつもの色のままだった。\nその人の顔だけが、初めて見る景色のように鮮やかだった。" },
        { id: 'c11m-001g', speaker: 'member', text: "おいおい、女かよ。" },
        { id: 'c11m-001h', speaker: 'other_member', text: "てか、めちゃくちゃ美人じゃね？" },
        { id: 'c11m-001i', speaker: 'member', text: "最高じゃん。" },
        { id: 'c11m-001j', speaker: 'other_member', text: "……野球できんのか？" },
        { id: 'c11m-001k', speaker: 'kawamoto', text: "……う、美しい……。" },
        { id: 'c11m-002', text: "河本の声も、隣に聞こえるかどうかだった。\n風がやんだあとも、彼女の手にある紙の端は少し揺れていた。" },
        { id: 'c11m-003', speaker: 'kawamoto', text: "監督。今年の目標、聞いてもいいですか。" },
        { id: 'c11m-004', speaker: 'misora', text: "も、目標？" },
        { id: 'c11m-005', text: "美空は紙から顔を上げた。\n河本と目が合うと、その横にも同じようにこちらを見ている顔が並んでいた。" },
        { id: 'c11m-006', speaker: 'kawamoto', text: "はい。前の監督は、甲子園出場だって。" },
        { id: 'c11m-007', speaker: 'misora', text: "あ……。ええと……1番。" },
        { id: 'c11m-008', text: "河本は聞き返す前に、隣の選手を見た。\n隣の選手も、同じことを聞いたという顔をしていた。" },
        { id: 'c11m-009', speaker: 'kawamoto', text: "1番って、甲子園で優勝するってことですか？" },
        { id: 'c11m-010', speaker: 'misora', text: "……はい。" },
        { id: 'c11m-011', text: "さっきまで声も出なかった列が、そこでざわついた。" },
        { id: 'c11m-012', speaker: 'member', text: "でも監督、うちは県でベスト4ですよ。" },
        { id: 'c11m-013', speaker: 'misora', text: "父さんが……。あ、いえ。\n1番になれたら……私も、やっと落ち着けるから。" },
        { id: 'c11m-014', speaker: 'kawamoto', text: "落ち着くって？" },
        { id: 'c11m-015', speaker: 'misora', text: "家で……一緒に暮らせたら……。" },
        { id: 'c11m-016', text: "誰かが帽子を持ち直した。その音が聞こえるほど、周りが静かだった。" },
        { id: 'c11m-017', text: "美空は顔を上げた。\n話を終えたつもりだったのか、まだ全員が自分を見ているのに気づくと、\n慌てて手元の紙に目を落とした。" },
        { id: 'c11m-018', text: "いちばん上の行を見つけると、紙の端を押さえていた手に力を入れた。" },
        { id: 'c11m-019', speaker: 'misora', text: "……まず外周。走って。" },
        { id: 'c11m-020', text: "河本が走り出すと、少し遅れて、列が動いた。\nさっき野球ができるのかと呟いた選手が、河本の横に並んだ。" },
        { id: 'c11m-021', speaker: 'member', text: "で、結局、誰と暮らすって？" },
        { id: 'c11m-022', text: "河本は、言葉の途中で美空が紙に目を落としたところを思い返した。" },
        { id: 'c11m-023', speaker: 'kawamoto', text: "……結婚の話だろ、あれ。" },
        { id: 'c11m-024', text: "隣の選手が吹き出した。\n河本が笑わずに走っているのを見て、今度は首だけを後ろへ向けた。" },
        { id: 'c11m-025', speaker: 'member', text: "おい、河本が結婚の話だって言ってるぞ。" },
        { id: 'c11m-026', speaker: 'other_member', text: "待てよ。父さんが、って言ってなかったか？" },
        { id: 'c11m-027', speaker: 'kawamoto', text: "だから、父親にも話が通ってるってことだろ。" },
        { id: 'c11m-028', text: "校舎の角を曲がるころには、「結婚」は後ろの列から前へ移っていた。\n「誰と」と聞く声に、今度は河本の届かないところで誰かが\n「優勝したときのエースだろ」と答えた。" },
        { id: 'c11m-029', text: "1周して美空の前に戻ってきたとき、まだ何人かは笑っていた。\n2周目に入るところで、県ベスト4だと言った部員が、河本の横を抜いていった。\nそれを見た後ろの列も、少しずつ間を詰めてきた。" },
      ],
      next: 'testimony-present',
    },
    'testimony-present': {
      title: '河本の証言',
      lines: [
        { id: 'c11p-001', text: "河本さんが話し終えた。監督はもうベンチの奥で、鞄の中を探っていた。" },
        { id: 'c11p-002', speaker: 'oyama', text: "ちっ……俺の知らない美空を……。" },
        { id: 'c11p-003', text: "河本さんは大山の顔を見て、さっきまでよりずっと機嫌がよくなった。" },
        { id: 'c11p-004', text: "俺には、話を聞く前より分からなくなったことがあった。" },
      ],
      choices: [
        { text: '平野が聞き返す', to: 'testimony-ask' },
        { text: '大山の反応を待つ', to: 'testimony-wait' },
      ],
    },
    'testimony-ask': {
      title: '河本の証言',
      lines: [
        { id: 'c11a-001', speaker: 'hirano', text: "でも、誰と暮らすかは言ってないですよね。" },
        { id: 'c11a-002', speaker: 'kawamoto', text: "そうだよ。" },
        { id: 'c11a-003', text: "河本さんがあっさり認めたので、\n俺はてっきり、その先は自分でも分からないと言うのかと思った。" },
        { id: 'c11a-004', speaker: 'hirano', text: "じゃあ、結婚って言ったのは――" },
        { id: 'c11a-005', speaker: 'kawamoto', text: "お前、あそこで本人にその先まで言わせるのか？" },
        { id: 'c11a-006', text: "むしろ俺のほうが気の利かないことを言ったみたいな顔をされた。" },
        { id: 'c11a-007', text: "近くにいた先輩まで、カゴを持ったまま小さくうなずいた。" },
      ],
      next: 'testimony-end',
    },
    'testimony-wait': {
      title: '河本の証言',
      lines: [
        { id: 'c11w-001', text: "大山はベンチの奥にいる監督を見た。それから河本さんのほうへ向き直った。" },
        { id: 'c11w-002', speaker: 'oyama', text: "待てよ。結婚って言われたわけじゃねえだろ。" },
        { id: 'c11w-003', speaker: 'kawamoto', text: "あそこでその先まで言わせるなよ。" },
        { id: 'c11w-004', speaker: 'oyama', text: "言われてねえんだな。" },
        { id: 'c11w-005', speaker: 'kawamoto', text: "お前、その場にいなかったもんな。" },
        { id: 'c11w-006', text: "大山は口を開きかけた。そのまま何も言わず、視線をそらした。" },
        { id: 'c11w-007', text: "河本さんは、今度は笑うのを隠さなかった。" },
      ],
      next: 'testimony-end',
    },
    'testimony-end': {
      title: '河本の証言',
      lines: [
        { id: 'c11e-001', text: "河本さんは上着の襟を直した。\n大山に向かって張っていた声を落とし、ベンチの奥へ戻っていった。" },
        { id: 'c11e-002', text: "監督の膝にあった練習メニューの下から、\nさっきの新聞の角が、まだ少しだけのぞいていた。" },
      ],
      next: 'kawamoto-results',
    },
    'kawamoto-results': {
      title: '実績では伝わらない',
      lines: [
        { id: 'c12-001', text: "ベンチの奥で、鞄の口が少し開いていた。\n監督は練習メニューを膝に置いたまま、\n内ポケットのファスナーを開けたり閉めたりしていた。" },
        { id: 'c12-002', text: "河本さんが腰掛けの端まで来て立ち止まる。監督は顔を上げなかった。\n先輩がボールカゴを置いても、グラウンドから金属バットの音がしても、\n河本さんはそこで待っていた。" },
        { id: 'c12-003', speaker: 'senpai', text: "卒業してからも来るの、あの人くらいだよ。\nこの前なんか、監督が帰ったって言ったら、グラウンドも見ないで帰ったぞ。" },
        { id: 'c12-004', text: "河本さんは振り返らなかった。\n監督がようやく鞄から手を出したところで、半歩だけ近づいた。" },
        { id: 'c12-005', speaker: 'kawamoto', text: "今年は二桁勝ちます。" },
        { id: 'c12-006', text: "監督が顔を上げた。\nさっきまで大山と話していたときより、河本さんの背筋が伸びた。" },
        { id: 'c12-007', speaker: 'kawamoto', text: "そのときは、また話を聞いてもらえますか。" },
        { id: 'c12-008', text: "監督の手が、鞄のファスナーをつまんだ。" },
        { id: 'c12-009', speaker: 'misora', text: "……それだけか？" },
        { id: 'c12-010', text: "グラウンドでもう1本、バットが鳴った。誰かが「ショート！」と叫んだ。" },
        { id: 'c12-011', text: "河本さんは黙っていた。膝の上の新聞へ目を落として、また監督の顔を見た。" },
        { id: 'c12-012', speaker: 'kawamoto', text: "15勝します。" },
        { id: 'c12-013', text: "ファスナーが端まで滑った。" },
        { id: 'c12-014', speaker: 'kawamoto', text: "次は、その報告をしに来ます。" },
        { id: 'c12-015', text: "河本さんは返事を待たずにベンチを出た。\n出口でいったん歩みを緩めたが、振り返らなかった。" },
        { id: 'c12-016', text: "新聞に載っていた数字は8勝だった。\nあの記事が出るだけでもすごいのに、そこからあと7つ。\nあんな小さな声で言ったのに、\n河本さんがいなくなっても、俺の耳には15という数字が残っていた。" },
        { id: 'c12-017', text: "監督は閉めた鞄を持ち上げた。\n膝の紙がずれ、新聞の切り抜きだけが滑り落ちかけた。\n監督はその角をつまんで立ち上がった。" },
        { id: 'c12-018', speaker: 'misora', text: "で、あいつ何しに来たんだ？" },
        { id: 'c12-019', speaker: 'hirano', text: "えっ!?" },
        { id: 'c12-020', text: "思わず監督の顔を見た。冗談を言った顔じゃなかった。\nその手には、河本さんの新聞の切り抜きがまだ挟まっていた。" },
      ],
      next: 'shinjo-first-meeting',
    },
    'shinjo-first-meeting': {
      title: '新庄との接触',
      lines: [
        { id: 'c13-001', text: "5月。帝嶺学院との練習試合で、俺は相手の打順表をスコアブックの下に敷いた。\n風が吹くたび、スコアブックからはみ出した紙の端がばたついた。" },
        { id: 'c13-002', text: "1番、センター、新庄柔斗。2年。\n相手ベンチから最初に名前を呼ばれた選手は、打席の土をならしながら、\n鳳翔のマウンドを見ていた。" },
        { id: 'c13-003', text: "大山の初球は外寄りの真っすぐだった。" },
        { id: 'c13-004', text: "ミットが鳴ってから、バットが風を切った。\n順番がはっきり分かるほど遅れていた。" },
        { id: 'c13-005', text: "新庄はバットを下ろした。\nベンチの方から何か声が飛んだが、そちらを見ずに、もう一度同じ場所へ足を置いた。" },
        { id: 'c13-006', text: "その打席は、最後も真っすぐで空振り三振だった。" },
        { id: 'c13-007', text: "帰り際、新庄は次の打者の耳元で何か言った。\n次の打者がうなずくと、そのままベンチの奥まで下がっていった。" },
        { id: 'c13-008', text: "俺は「外の直球で空振り三振」と書いた。\nあれだけ振り遅れても、新庄は初球から最後まで、打席の前へも後ろへも動かなかった。" },
        { id: 'c13-009', text: "2度目の打席。新庄はまた同じ場所に立った。\n俺は、初打席で振り遅れた外寄りの球を思い出した。" },
        { id: 'c13-010', text: "今度は、大山の左足が着くころには、もう新庄の前足が下りていた。\nバットが出たのは、そのあとだった。" },
        { id: 'c13-011', text: "外寄りの真っすぐ。短い音がして、白球が1塁手の頭を越えた。" },
        { id: 'c13-012', text: "ライトが前に出て、打球を拾った。\n新庄は1塁を回りかけたところで止まって、塁へ戻った。" },
        { id: 'c13-013', text: "俺が安打の線を引いているあいだ、大山はマウンドから新庄を見ていた。\n捕手が返した球が手に収まるまで、目を切らなかった。" },
        { id: 'c13-014', text: "試合後、大山がベンチで靴ひもを解いていると、新庄がネットの脇まで来た。" },
        { id: 'c13-015', speaker: 'shinjo', text: "大山くん。対戦、面白かった。ありがとう。" },
        { id: 'c13-016', speaker: 'oyama', text: "お前、2打席目、真っすぐだけ待ってただろ。" },
        { id: 'c13-017', speaker: 'shinjo', text: "うん。最後まで曲げなかったね。" },
        { id: 'c13-018', speaker: 'oyama', text: "次も曲げねえよ。" },
        { id: 'c13-019', speaker: 'shinjo', text: "じゃあ、楽しみにしてる。" },
        { id: 'c13-020', text: "新庄が帽子をかぶり直しかけたとき、奥から監督が出てきた。\n鞄を肩に掛け、片手には飲みかけの水を持っていた。" },
        { id: 'c13-021', text: "新庄は帽子をかぶらなかった。\nさっきまで大山と話していた調子で何か言いかけて、そこで口を閉じた。" },
        { id: 'c13-022', text: "監督が、通ってもいいかというように、目だけでネットの脇を見た。\n新庄は一歩横へよけた。" },
        { id: 'c13-023', speaker: 'shinjo', text: "……神条監督。帝嶺の新庄です。" },
        { id: 'c13-024', speaker: 'misora', text: "はい。" },
        { id: 'c13-025', speaker: 'shinjo', text: "今日は、ありがとうございました。" },
        { id: 'c13-026', speaker: 'misora', text: "お疲れさま。" },
        { id: 'c13-027', text: "それだけ言うと、監督は俺たちの前を通り過ぎた。\n新庄は下げた帽子を持ち直したが、今度も頭には戻さなかった。" },
        { id: 'c13-028', text: "少し離れたところで、監督が日和に声をかけた。" },
        { id: 'c13-029', speaker: 'misora', text: "日和ちゃん。今日はもう帰っていいんだよね？" },
        { id: 'c13-030', speaker: 'hiyori', text: "はい。鍵は私が返しておきます。" },
        { id: 'c13-031', speaker: 'misora', text: "ありがとう。" },
        { id: 'c13-032', text: "日和がそう言うのを待っていたらしく、監督はそこでようやく水のふたを開けた。\nひと口飲んで、今度こそ校門へ向かった。" },
        { id: 'c13-033', text: "帝嶺のベンチから「柔斗、バス出るぞ」と声がした。" },
        { id: 'c13-034', speaker: 'shinjo', text: "はい。……ねえ、大山くん。" },
        { id: 'c13-035', speaker: 'oyama', text: "なんだよ。" },
        { id: 'c13-036', speaker: 'shinjo', text: "神条監督は、次も来る？" },
        { id: 'c13-037', text: "大山の手の中で、ほどけかけた靴ひもがまた締まった。" },
      ],
      next: 'summer-roster',
    },
    'summer-roster': {
      title: '夏の名簿',
      lines: [
        { id: 'csummer-001', text: "夏の組み合わせが決まった日、日和は部室の壁から練習予定表を外した。\n四隅の画びょうを抜くと、紙の下だけ壁の色が白かった。" },
        { id: 'csummer-002', text: "代わりに貼った紙には、県内の高校の名前が小さな字で並んでいた。\n日和が最後の画びょうを押し込む前に、背後から大山の腕が伸びてきた。" },
        { id: 'csummer-003', speaker: 'oyama', text: "何回勝てば甲子園だ。" },
        { id: 'csummer-004', speaker: 'hiyori', text: "待って。まだ貼れてない。" },
        { id: 'csummer-005', text: "大山は指を引っ込めた。\n日和が手を離した途端、今度は紙の真ん中を指で押さえた。" },
        { id: 'csummer-006', speaker: 'hirano', text: "そこは決勝。うちはこっちから。" },
        { id: 'csummer-007', text: "俺が端にある鳳翔の名前を示すと、大山はそこから試合ごとの線をなぞった。\n途中で相手の校名に指がかかっても、止まらなかった。" },
        { id: 'csummer-008', speaker: 'oyama', text: "分かった。全部だ。" },
        { id: 'csummer-009', text: "そこまで数えたんじゃなかったのか。\n聞こうとしたときには、もう大山はグラブを取って戸口にいた。" },
        { id: 'csummer-010', text: "練習が始まると、佐々木先輩が打撃ケージの後ろに入った。\n中田先輩が打つたび、ネットの下からこぼれてくる球を拾っては、カゴに戻していた。" },
        { id: 'csummer-011', text: "片づけのあとも、先輩はネットの裾を持ち上げていた。\n最後の1球が隅に残っていたらしい。" },
        { id: 'csummer-012', speaker: 'sasaki', text: "平野、カゴはまだあるか？" },
        { id: 'csummer-013', text: "俺が差し出すと、先輩はそこへ球を落とした。\n空のカゴの底で、思ったより大きな音がした。" },
        { id: 'csummer-014', text: "帰り支度をしていると、監督が部室の戸を少しだけ開けた。\n隙間から、折り目のついた紙を差し入れた。" },
        { id: 'csummer-015', speaker: 'misora', text: "平野くん。大会の名簿。スコアに使うなら、控え取っといて。" },
        { id: 'csummer-016', text: "受け取った紙を机に広げた。\n俺のスコアブックには、春から試合に出た選手の名前が、相手校ごとに何度も出てくる。\n名簿の上から順に見ていくと、どれも書き慣れた名前だった。" },
        { id: 'csummer-017', text: "控えの欄まで来て、指が止まった。\n練習のノートには書く。\n試合のページでは、代打の欄にもまだ書いた覚えがない。" },
        { id: 'csummer-018', text: "「佐々木」。" },
        { id: 'csummer-019', text: "廊下で監督の足音が遠ざかっていく。俺は紙を持って、戸口まで出た。" },
      ],
      next: 'regional-quarterfinal',
    },
    'regional-quarterfinal': {
      title: '地方予選',
      lines: [
        { id: 'c14-001', text: "準々決勝の朝、日和がベンチに冷えたボトルを並べた。\n試合が始まるころには、\nボトルの下にできた水の輪が、ひとつずつつながっていた。" },
        { id: 'c14-002', text: "相手は北陵高校。\n組み合わせが決まった日に中田先輩が、\n「毎年、この辺まで来るとあいつらがいる」と言った学校だ。" },
        { id: 'c14-002-p1', text: "試合前、日和が、新聞から写した北陵の試合結果をベンチの端に広げた。\n中田先輩がのぞき込んで、「何点取られてる」と聞いた。" },
        { id: 'c14-002-p2', speaker: 'hiyori', text: "北陵はここまで3試合で、失点が2。四球は全部で1つだけ。\n前の試合の1点も、内野安打から送りバントで進められて、\n次の単打で返された点。" },
        { id: 'c14-002-p3', speaker: 'nakata', text: "長打では1本も取られてない、ってことだな。" },
        { id: 'c14-002-p4', text: "中田先輩が「投げてるの、あいつか」と柵の向こうへ顔を向けた。\n応援席に上がる前の三浦が、そこで足を止めて北陵のエースを見ていた。" },
        { id: 'c14-002-p5', speaker: 'miura', text: "あの人、城南シニアで2つ上だったんです。\nあの頃は速かったけど、四球を出し始めると自分から崩れる人で。" },
        { id: 'c14-002-p6', speaker: 'miura', text: "でも今、捕手のミットがほとんど動いてないですよね。\n速さより、外に投げきるほうを取ったんだと思います。" },
        { id: 'c14-002-p7', text: "俺はその投手を、今日初めて見る。\n地元のやつには、こういう「前から知っている相手」がいるらしかった。" },
        { id: 'c14-002-p8', speaker: 'senpai', text: "去年の秋に当たったときも、外の真っすぐばっかりだった。\n分かってたのに、最後はショートの正面に打たされた。" },
        { id: 'c14-002-p9', speaker: 'nakata', text: "じゃあ、外は捨てない。待って、引っ張る。\n当てにいくから正面に行くんだ。振りきれば三遊間は抜ける。" },
        { id: 'c14-002-p10', speaker: 'nakata', text: "最初に抜くのは俺だ。お前らは、それを見てから合わせろ。" },
        { id: 'c14-002-p11', text: "そう言うと、中田先輩はバットを2本つかんで、\nベンチ脇の素振りの場所へ歩いていった。" },
        { id: 'c14-002-p12', text: "三浦は柵から離れながら、中田先輩の背中を見ていた。\n自分の話のどこが使われたのか、確かめるみたいだった。" },
        { id: 'c14-003', text: "北陵のエースは、打者が代わっても外寄りに真っすぐを投げた。\n捕手が構えたミットは、球を受けるまでほとんど動かなかった。\n遠くから見ていても、\nボールが先にミットのある場所を知っているみたいだった。" },
        { id: 'c14-004', text: "3回裏。中田先輩がその球を引っ張った。\n三遊間へ抜けたと思った打球を、深く守っていたショートが横へ出て捕った。\n1塁への送球を見届けてから、中田先輩は走るのをやめた。" },
        { id: 'c14-005', text: "ベンチへ戻ってくるなり、先輩は俺のスコアブックをのぞいた。" },
        { id: 'c14-006', speaker: 'nakata', text: "今の、どこにつけた？" },
        { id: 'c14-007', text: "俺がスコアブックを見て外寄りだったと答えると、\n中田先輩はもう一度ショートのいた辺りを見た。" },
        { id: 'c14-008', speaker: 'nakata', text: "あそこまで下がってたか。抜けたと思ったんだけどな。" },
        { id: 'c14-009', text: "それからヘルメットを外した。\n監督のほうを横目で見て、日和から受け取った水をひと口だけ飲んだ。" },
        { id: 'c14-010', speaker: 'nakata', text: "……監督、今の打球、見てたか？" },
        { id: 'c14-011', text: "日和が答える前に、守備へ出ろと声がかかった。\n先輩はグラブをつかみ、さっき打球を捕られた場所へ走っていった。" },
        { id: 'c14-011-p1', text: "守備位置に着くと、中田先輩はグラブでマウンドの先輩を指した。" },
        { id: 'c14-011-p2', speaker: 'nakata', text: "打たせていいぞ！　こっちに来たら俺が取る！" },
        { id: 'c14-011-p3', text: "5回裏、2アウト2塁。\n打順は、去年の秋に北陵のエースと当たった先輩に回ってきた。" },
        { id: 'c14-011-p4', text: "次の打者が待つ場所へ向かう前に、先輩はバットを握り直した。\n一度ほどいた指を、また同じ順に巻きつけている。\n肩が、守備から戻ってきたときより上がっていた。" },
        { id: 'c14-011-p5', text: "監督が打順表を持ったまま、俺のほうへ体を寄せてきた。" },
        { id: 'c14-011-p6', speaker: 'misora', text: "平野くん。今、打順どこ？" },
        { id: 'c14-011-p7', speaker: 'hirano', text: "先輩です。\n去年の秋、あの投手に外の真っすぐで打ち取られてから、少し――" },
        { id: 'c14-011-p8', speaker: 'misora', text: "まあ、大丈夫でしょ。" },
        { id: 'c14-011-p9', text: "監督はそれだけ言うと、打順表に目を戻した。\n指は、大山の名前のところで止まっていた。" },
        { id: 'c14-011-p10', text: "ベンチの段の上で、先輩の足が止まっていた。\n俺たちのすぐ後ろだった。" },
        { id: 'c14-011-p11', speaker: 'senpai', text: "……大丈夫だってよ。監督が。" },
        { id: 'c14-011-p12', text: "先輩はもう一度だけバットを握り直して、段を降りた。\n肩はまだ、少し上がっていた。" },
        { id: 'c14-011-p13', text: "初球の外の真っすぐを、先輩は見送った。\n2球目も同じ高さに来た。今度はバットが出た。\n引っ張りにいかず、踏み込んで、外の球をそのまま右へ押し返した。" },
        { id: 'c14-012', text: "打球はライト前に落ちた。2塁の走者が帰って、鳳翔は1点を返した。\n1塁に着いた先輩がベンチを向いて拳を上げたとき、\n俺も次の得点を書くつもりでページを開いたままにした。" },
        { id: 'c14-012-p1', text: "拳を下ろした先輩は、自分の手のひらを一度見た。\nそれから、1塁コーチに何か言われて、リードを取り直した。" },
        { id: 'c14-013', text: "次の打者が打った球は、またショートの正面に行った。" },
        { id: 'c14-014', text: "7回が終わっても、鳳翔の得点欄にはその1点しかなかった。北陵は2点。\n差は1点なのに、外寄りの速球で打ち取られるのを見続けているうちに、\n何回も同じ攻撃を見せられている気がしてきた。" },
        { id: 'c14-015', text: "8回裏も、打者が2人続けて凡退した。\n応援席から聞こえていた手拍子がばらつき始めたところで、\n大山の名前が呼ばれた。" },
        { id: 'c14-016', text: "大山は初球の真っすぐを打った。" },
        { id: 'c14-017', text: "打球は投手の足元を抜け、2塁ベースのすぐ脇を通った。\n北陵のセンターが前に出て拾い、\n大山が1塁を回るより先に、返球が内野へ戻った。" },
        { id: 'c14-018', text: "大山はベースへ戻って、ベンチを見た。\nヘルメットのつばを指で上げたが、監督は手元の打順表を見ていた。" },
        { id: 'c14-019', text: "俺はスコアブックに安打を書いた。8回裏、2アウト、1塁。\n次の枠が埋まる前に、監督が紙を膝に置いた。" },
        { id: 'c14-020', text: "打席へ向かいかけた選手が、その動きに気づいて足を止めた。" },
        { id: 'c14-021', text: "監督が立ち上がった。ベンチの奥で、誰かがヘルメットを置き直す音がした。" },
      ],
      next: 'sasaki-called',
    },
    'sasaki-called': {
      title: '佐々木の指名',
      lines: [
        { id: 'c15-001', text: "打席へ出かけた先輩が、バットを持ったまま通路の手前で待っていた。\n監督はその横を通り、球審のほうに顔を向けた。" },
        { id: 'c15-002', speaker: 'misora', text: "次、バッター交代。佐々木。" },
        { id: 'c15-003', text: "立ちかけた部員が、膝に手をついた姿勢のまま止まった。\nバットを持っていた先輩は振り返って、ベンチのいちばん奥を見た。" },
        { id: 'c15-004', text: "ヘルメットを置き直したのは、佐々木先輩だった。\n今も両手をその上に置いていた。" },
        { id: 'c15-005', speaker: 'sasaki', text: "……俺ですか。" },
        { id: 'c15-006', text: "監督がうなずくと、先輩はヘルメットを持ち上げた。\n手から滑りそうになり、あごのあたりで抱え直した。" },
        { id: 'c15-007', text: "背番号と名前を確かめながら、\n俺は名簿を持って廊下に出た日のことを思い出した。" },
        { id: 'c15-008', text: "追いついたとき、監督は鞄の肩ひもを直していた。\n俺が候補の表と名簿を並べ、名前の違う行を指すと、監督は紙に顔を寄せた。" },
        { id: 'c15-009', speaker: 'hirano', text: "こっち、佐々木先輩になってます。" },
        { id: 'c15-010', speaker: 'misora', text: "……あ。写すとこ、ずれた。" },
        { id: 'c15-011', text: "監督は俺の手から紙を受け取った。\n次の瞬間、さっきと同じ折り目で畳んでいた。" },
        { id: 'c15-012', speaker: 'hirano', text: "提出は明日ですよ。まだ直せますけど。" },
        { id: 'c15-013', speaker: 'misora', text: "めんどくさいからいいや。" },
        { id: 'c15-014', text: "今、俺の目の前で、佐々木先輩がヘルメットをかぶった。\nスコアブックの代打の欄に、その名前を書いた。\n練習のノートで何度も書いた字なのに、ここに書くと妙に見慣れなかった。" },
        { id: 'c15-015', speaker: 'senpai', text: "監督、佐々木が普段どれだけやってるか、ちゃんと見てたんだな……。" },
        { id: 'c15-016', text: "隣の先輩は何も言わず、自分の膝をぎゅっとつかんだ。" },
        { id: 'c15-016a', text: "佐々木先輩の肩が、小さく震えていた。\nうつむいていたが、口元は笑っていた。\nバットを握り直すと、肩の震えがすっと止まった。" },
        { id: 'c15-017', text: "北陵ベンチ。\n場内アナウンスで代打の名前が流れると、監督が控えの選手を呼んだ。" },
        { id: 'c15-018', speaker: 'hokuryo_coach', text: "佐々木？　打ったところ、見たことあるか。" },
        { id: 'c15-019', speaker: 'hokuryo_player', text: "ありません。記録にも出てきません。" },
        { id: 'c15-020', text: "選手がめくった紙には、\nさっきまで打席にいた鳳翔の選手の名前と、打球の方向が並んでいた。" },
        { id: 'c15-021', text: "北陵監督は紙を受け取った。\nここまでの継投も走者の進め方も、\n前の神条監督がやりそうなことばかりだった。\nだから試合前の資料も、現に役に立っていた。" },
        { id: 'c15-022', text: "その娘が、1点を追う8回に、そこにいない打者を出してきた。" },
        { id: 'c15-023', speaker: 'hokuryo_coach', text: "分かった。いったん、外野はそのままで。" },
        { id: 'c15-024', text: "鳳翔ベンチ。監督が俺の隣に戻ってきて、開いたスコアブックに顔を寄せた。" },
        { id: 'c15-025', speaker: 'misora', text: "……あいつ、佐々木で合ってた？" },
        { id: 'c15-026', text: "声は、隣の俺が聞き返さずに済むぎりぎりだった。" },
        { id: 'c15-027', speaker: 'hirano', text: "……はい。" },
        { id: 'c15-027a', text: "（やっぱり、顔までは分かってなかったのか……。）" },
        { id: 'c15-028', text: "佐々木先輩はもうベンチの外にいた。\n先に打席へ出るはずだった先輩の横を通り過ぎ、\n白線の手前で、一度だけこちらを振り返った。" },
        { id: 'c15-029', text: "監督は腰掛けに戻っていた。\n佐々木先輩はヘルメットのつばに手を添えると、顔を上げて打席へ向かった。" },
      ],
      next: 'sasaki-home-run',
    },
    'sasaki-home-run': {
      title: '一度だけの本塁打',
      lines: [
        { id: 'c16-001', text: "監督はベンチに座り直し、膝に置いた打順表を畳んだ。\nグラウンドでは、佐々木先輩が打席の手前で素振りをした。" },
        { id: 'c16-001a', text: "バットはいつもの高さを通った。練習で見慣れた振りだった。\n佐々木先輩はそこで白線をまたいだ。" },
        { id: 'c16-002', speaker: 'sasaki', text: "（監督……いや、美空。\n今まで俺を出さなかったのは、この打席のためだったんだね。）" },
        { id: 'c16-004', text: "佐々木の目には、打席の白線の先で白いヴェールが揺れていた。\n花嫁姿の美空が、さっきベンチで見せたのと同じ小さなうなずきで、\n佐々木を迎えていた。" },
        { id: 'c16-004a', speaker: 'sasaki', text: "（俺がどんな男か、ここで見せる。\n他のやつにはできないことをやってみせる。\nそうしたら……俺の嫁に……。）" },
        { id: 'c16-005', text: "佐々木は右足で打席の土をならした。\n顔を上げると、正面には投手がいた。もうベンチには目を戻さなかった。" },
        { id: 'c16-005a', text: "北陵ベンチ。監督は、構えに入った佐々木を見ていた。" },
        { id: 'c16-005b', speaker: 'hokuryo_coach', text: "（素振りはごく普通だった。なのに、あの構えは迷いがない。\n……次の球が分かってるのか？）" },
        { id: 'c16-005d', text: "1塁では、大山が打席を見たまま、\n隣の1塁手に聞こえるくらいの声でつぶやいた。" },
        { id: 'c16-005e', speaker: 'oyama', text: "あんなやつ、うちにいたか？　……打つぞ、あいつ。" },
        { id: 'c16-005f', speaker: 'hokuryo_first_baseman', text: "えっ。自分とこの選手だろ？　知らないのか？" },
        { id: 'c16-006', text: "大山がリードを取った。\n北陵の投手は一度だけそちらを見て、捕手に向き直った。" },
        { id: 'c16-005c', text: "鳳翔ベンチで、俺は鉛筆を持ち直した。\n佐々木先輩はもうバットを揺らさず、投手だけを見ていた。" },
        { id: 'c16-007', text: "投手がうなずき、捕手がミットを外へ出した。\n7回まで俺が何度も「外」と書いたコースだ。\nあそこに来る真っすぐで、今日いくつアウトを取られただろう。" },
        { id: 'c16-008', text: "真っすぐが来た。ミットは構えた位置から動いていなかった。" },
        { id: 'c16-009', text: "その手前で、バットが鳴った。" },
        { id: 'c16-010', text: "打球はライトへ上がった。\nライトが背を向けて走り出したので、俺はまだ捕れると思った。" },
        { id: 'c16-011', text: "フェンスの手前で、その足が止まった。" },
        { id: 'c16-012', text: "白球がフェンスの向こうへ消えた。\nライトはグラブを上げないまま、落ちた先を見ていた。" },
        { id: 'c16-013', text: "フェンスを越えたのが分かっても、俺の鉛筆はまだ1塁のマスにあった。\n大山はとっくに2塁を回っていた。" },
        { id: 'c16-014', text: "大山がホームを踏んだ。同点。\n少し遅れて佐々木先輩が3塁を回った。\nさっきまで震えていた手を、小さく握ったままだった。" },
        { id: 'c16-015', text: "ホームを踏むと、ベンチの部員が一斉に先輩の名前を叫んだ。\n佐々木先輩は何人もの腕の間から、監督の顔を探していた。" },
        { id: 'c16-016', text: "2人の生還を書き込み、得点欄に3と記した。\n3対2。鳳翔が初めて前に出た。" },
        { id: 'c16-017', text: "北陵ベンチ。監督はフェンスから目を離し、鳳翔のベンチを見た。" },
        { id: 'c16-018', speaker: 'hokuryo_coach', text: "あそこで出すために、取っておいたのか。" },
        { id: 'c16-019', text: "監督の隣には、佐々木の名前が載っていない資料が開いたままだった。" },
        { id: 'c16-020', text: "9回表。\n俺は鳳翔のベンチから、最後の打球が中田先輩の正面へ転がるのを見た。\n先輩が送球したあと、1塁手のミットが鳴るまで、誰もベンチを出なかった。" },
        { id: 'c16-021', text: "1塁塁審の拳が上がった。鳳翔が3対2で勝った。" },
        { id: 'c16-022', text: "整列が終わると、\nスタンド下の通路にいた記者が、ノートを開いて監督のところへ来た。" },
        { id: 'c16-023', speaker: 'reporter', text: "あの場面で、ここまで出番のなかった選手を信じて送り出した。\nその理由を聞かせていただけますか。" },
        { id: 'c16-024', text: "監督が足を止めた。記者のペン先はもう紙に触れていた。" },
        { id: 'c16-025', text: "俺は少し後ろでスコアブックを閉じかけて、手を止めた。\n佐々木先輩の名前の横には、まだあの一打しか書いていなかった。" },
      ],
      next: 'newspaper-and-scorebook',
    },
    'newspaper-and-scorebook': {
      title: '新聞と記録',
      lines: [
        { id: 'cnews-001', text: "翌朝、部室の机に新聞が広げてあった。\n県大会の記事の真ん中に、「名将の一手」と太い字が踊っていた。" },
        { id: 'cnews-002', text: "写真には、ホームを踏んだ佐々木先輩と、\nベンチからせり出した部員たちが写っていた。\n先輩は歓声のほうを見ていない。伸びてくる腕の向こうに目をやっていた。" },
        { id: 'cnews-003', text: "あのとき、監督を探していた顔だ。\n写真だけ見ると、次の試合を見据えているようにも見えた。" },
        { id: 'cnews-004', text: "記事には、控え選手の日々の努力を見てきた神条監督が、\n勝負どころでその力を信じた、とあった。\n佐々木先輩の名前を名簿のどこで見つけたか、俺はまだ覚えていた。" },
        { id: 'cnews-005', speaker: 'oyama', text: "おい、俺の打席は何行だ。" },
        { id: 'cnews-006', text: "大山が向かいから紙をのぞき込んだ。俺は記事の終わり近くを指で押さえた。" },
        { id: 'cnews-007', speaker: 'hirano', text: "2行。2アウトからセンター前。" },
        { id: 'cnews-008', speaker: 'oyama', text: "佐々木は？" },
        { id: 'cnews-009', speaker: 'hirano', text: "佐々木先輩ね。写真付きだね。" },
        { id: 'cnews-010', speaker: 'oyama', text: "ちくしょうがー！" },
        { id: 'cnews-011', text: "大山は新聞をひったくり、写真ごと真っ二つに破った。\n俺が手を伸ばす間に、もう一度破って机に放った。" },
        { id: 'cnews-011a', speaker: 'hirano', text: "うわっ、何してんだよ！" },
        { id: 'cnews-011b', speaker: 'oyama', text: "俺様が主役じゃない新聞に、価値なんかねえ！" },
        { id: 'cnews-011c', speaker: 'hirano', text: "何言ってんだよ……あー、もう無理だ、これ。" },
        { id: 'cnews-012', speaker: 'oyama', text: "次の相手の映像、もうあるんだろ。" },
        { id: 'cnews-013', speaker: 'hirano', text: "あるよ。向こうの部屋で先輩たちが見てる。" },
        { id: 'cnews-014', text: "大山は新聞の切れ端に目もくれず、部室を出た。\n廊下の向こうで、再生を少し戻してくれという声が聞こえた。" },
        { id: 'cnews-015', text: "俺は昨日のスコアブックを開いた。\n1塁に大山がいなければ、佐々木先輩が柵越えを打っても同点だった。\n大山のマスから佐々木先輩のマスまで、鉛筆の線を目でたどった。" },
        { id: 'cnews-016', text: "新聞の切れ端を重ねて机の端に寄せ、次の試合のページを開いた。" },
      ],
      next: 'what-her-face-means',
    },
    'what-her-face-means': {
      title: '表情が意味を持つ',
      lines: [
        { id: 'c17-001', text: "北陵戦のスコアを清書していて、\n試合の途中で美空監督が笑ったのを思い出した。" },
        { id: 'c17-002', text: "まだ負けていた。味方が1人、凡退して戻ってきたところだった。\n監督は膝の上で何か指を折っていて、\n最後の指を折ると、口元がほんの少し緩んだ。" },
        { id: 'c17-003', text: "ちょうど北陵の捕手が、ベンチの前を通った。\n監督と目が合ったあと、マスクをかぶり直す手が止まった。\nマウンドへ戻りかけた投手を呼び止め、\nグラブで口元を隠して何か話していた。" },
        { id: 'c17-004', text: "その次に鳳翔が点を取られたときは、監督の眉間に深いしわが寄った。" },
        { id: 'c17-005', speaker: 'nakata', text: "見たか、監督の顔。1点で済ませるぞ。" },
        { id: 'c17-006', text: "誰かが「はい！」と返して、内野の声が急に大きくなった。" },
        { id: 'c17-007', text: "準決勝の前夜。神条家の居間で、美空は自分のメモを持って、父の厳のそばに来た。" },
        { id: 'c17-008', speaker: 'misora', text: "北陵に勝った分、足した？" },
        { id: 'c17-009', text: "メモには金額がいくつか並んでいて、\nその下に「新作ゲーム発売」と日付が書いてあった。" },
        { id: 'c17-010', speaker: 'gen', text: "あ、……ああ。それはそうと、甲子園が見えてきたな。" },
        { id: 'c17-011', speaker: 'misora', text: "うん。" },
        { id: 'c17-011a', speaker: 'misora', text: "（新作、楽しみだな～。）" },
        { id: 'c17-012', text: "美空は発売日を見て、口元を緩めた。\n北陵の捕手が試合中に見たのと、同じ笑みだった。" },
        { id: 'c17-013', speaker: 'gen', text: "前に話した店、募集が出てたぞ。" },
        { id: 'c17-014', text: "美空は差し出された求人の紙を開きかけて、\n「レジ・品出し」のところで手を止めた。\nさっきまで笑っていた口元がこわばった。" },
        { id: 'c17-015', speaker: 'misora', text: "げっ……レジもやるの？" },
        { id: 'c17-016', speaker: 'gen', text: "品出しだけの募集じゃない。" },
        { id: 'c17-017', speaker: 'misora', text: "でも、知らない人に、こっちから声かけるんでしょ。" },
        { id: 'c17-018', speaker: 'gen', text: "ぐだぐだ言うな。店なんだから客は来る。" },
        { id: 'c17-019', text: "美空は口を開いたまま、厳を見ていた。\nやがて目を落とすと、折り目を合わせようとした。紙の角が何度もずれた。" },
        { id: 'c17-020', speaker: 'misora', text: "……それ、無理。" },
        { id: 'c17-022', speaker: 'gen', text: "いい加減にしろ。このまま何もする気がないなら、家からも追い出すぞ。" },
        { id: 'c17-022a', speaker: 'misora', text: "うっ……わかりました。" },
        { id: 'c17-023', text: "美空は求人を畳んで、椅子の背に掛けていた鞄にしまった。" },
        { id: 'c17-024', text: "厳が居間を出ていってから、\n美空はテーブルに残したゲームのメモを裏返した。" },
      ],
      next: 'oyama-injury',
    },
    'oyama-injury': {
      title: '大山の負傷',
      lines: [
        { id: 'c18-pre-a', text: "準決勝までの数日、大山は全体練習が終わってからも走っていた。\n外野のポールから反対側のポールまで。\n俺が用具を倉庫へ運ぶあいだに、何度も目の前を横切った。" },
        { id: 'c18-pre-b', text: "試合の前日、俺が倉庫の鍵を閉めたときも、まだ走っていた。\n帰り支度を済ませた中田先輩が、グラウンドの出口で声を張った。" },
        { id: 'c18-pre-c', speaker: 'nakata', text: "大山、明日も試合だぞ。もう切り上げろ。" },
        { id: 'c18-pre-d', speaker: 'oyama', text: "俺が先輩と同じとこでバテると思ってんのか。" },
        { id: 'c18-pre-e', text: "中田先輩は振り返った。\n何か言いかけたが、大山がまた走り出したので、そのまま帰った。" },
        { id: 'c18-pre-f', text: "その晩。大山は家の前でも、目印にした電柱まで何本もダッシュしていた。\n最後の1本を終えて家の前まで戻ると、両手を膝について笑った。" },
        { id: 'c18-pre-g', speaker: 'oyama', text: "（ふふ……美空との結婚も見えてきたな。）" },
        { id: 'c18-pre-h', speaker: 'oyama_mother', text: "翔！　さっきから呼んでるでしょ。いい加減、夕飯食べなさい！" },
        { id: 'c18-pre-i', speaker: 'oyama', text: "うるせえババア！　人の恋路を邪魔すんな！" },
        { id: 'c18-pre-j', speaker: 'oyama_mother', text: "誰がババアだ！　もう下げるよ！" },
        { id: 'c18-pre-k', text: "夕飯を下げられると聞くなり、大山は玄関で靴を脱ぎ捨てた。\n裸足で台所に駆け込もうとして、\n戸枠の角に右足の小指をぶつけた。" },
        { id: 'c18-pre-l', speaker: 'oyama', text: "痛っ……。食う！　下げんな！" },
        { id: 'c18-pre-m', text: "小指が床に触れると痛んだ。\n大山は右足の外側を少し浮かせ、足の内側で床を踏んで食卓へ向かった。\n椅子に座るころには、もう夕飯のことしか考えていなかった。" },
        { id: 'c18-001', text: "翌日。清峰との準決勝。7回裏が終わって、4対2。\n2点を追う回でも、清峰の打者は誰もバットを短く持たなかった。\nどの打席も、最後まで振り切ってきた。" },
        { id: 'c18-001-p1', text: "守備に出る支度をしながら、3年の先輩がスコアボードを見上げた。" },
        { id: 'c18-001-p2', speaker: 'senpai', text: "去年もこうだったんだよ。8回に入って2点勝ってて、\nそこから清峰に追いつかれた。俺、ベンチから見てた。" },
        { id: 'c18-001-p3', text: "ベンチの何人かが、つられて同じところを見た。\n4と2の数字は、さっきまでより近く見えた。" },
        { id: 'c18-001-p4', speaker: 'nakata', text: "点差なんか数えるな。アウトを数えろ。\nあと6つ。1つずつ取れば、それで終わる。" },
        { id: 'c18-001-p5', text: "中田先輩はそう言って、真っ先にベンチを出た。\nほかの先輩たちもグラブをはめ直し、順に続いた。" },
        { id: 'c18-001-p6', text: "ライトへ向かいかけた大山が、センターの先輩を呼び止めた。" },
        { id: 'c18-001-p7', speaker: 'oyama', text: "右中間は俺が行く。抜けたら、お前はすぐ中継に入れ。\n打ったやつは2塁で止める。セカンド、カットは2塁ベースの手前だ。" },
        { id: 'c18-001-p8', text: "センターの先輩は何か言い返しかけた。\nそのころには、大山はもうライトの芝へ走っていた。" },
        { id: 'c18-001-p9', text: "8回表。最初の2人は、言われたとおり1つずつアウトにした。\nそのあと、俺は清峰の攻撃の欄に、続けて入った2人の走者を書いた。\n2アウトでも、右中間を抜かれれば同点になる。" },
        { id: 'c18-001-p10', text: "キャッチャーの先輩がマスクを上げ、内野へ人差し指を立てた。" },
        { id: 'c18-001-p11', speaker: 'other_senpai', text: "次1つ！　2アウトな、ランナー走るぞ！" },
        { id: 'c18-002', text: "マウンドの先輩が、2塁の走者を振り返ってから投げた。" },
        { id: 'c18-003', text: "打った瞬間、センターが右へ走った。\nライトの大山はもう背中を向けて、フェンスへ向かっていた。" },
        { id: 'c18-004', text: "センターのほうが打球に近く見えた。\nなのに、落ちてくる球の下に先に入ったのは大山だった。" },
        { id: 'c18-005', text: "フェンスの手前で、大山が跳んだ。" },
        { id: 'c18-006', text: "白球がグラブに消えた。俺はアウトを書こうとして、鉛筆を止めた。" },
        { id: 'c18-007', text: "降りてくる途中で、大山の右足のつま先がわずかに内を向いた。\n足が地面に触れた途端、足首がさらに内側へ折れたように見えた。\n大山はそのまま肩からフェンスにぶつかり、金網を鳴らした。" },
        { id: 'c18-008', text: "先に着いたセンターが腰をかがめた。\nその横から、大山のグラブだけが上がった。ボールは入ったままだった。" },
        { id: 'c18-009', text: "塁審がアウトを告げた。応援席から歓声が降ってきた。\nライトの大山は起き上がらなかった。" },
        { id: 'c18-010', text: "日和がベンチの外へ出かけて、足を止めた。球審が係員を呼ぶ声がした。" },
        { id: 'c18-011', text: "俺はようやく「右飛」と書いた。\n普段なら、その字を書き終えるころには、\n大山はもうベンチに戻ってきている。" },
        { id: 'c18-012', text: "大山を乗せた担架が引き揚げてくると、みんなが通路を空けた。\n大山はグラブを外して、迎えに出た中田先輩に渡した。" },
        { id: 'c18-013', speaker: 'oyama', text: "球、入ってるからな。" },
        { id: 'c18-014', speaker: 'nakata', text: "見てた。アウトだ。" },
        { id: 'c18-015', text: "大山はそれを聞いてから、担架の上で顔を伏せた。" },
        { id: 'c18-016', text: "9回表、ライトには大山の代わりの選手が立った。\n最後の打球は内野のゴロだった。\n試合が終わって、4対2のまま決勝に進んだことを記録した。" },
        { id: 'c18-017', text: "日和と病院に着いたときには、外はもう暗くなりかけていた。\n日和はベンチから持ってきた大山の帽子を、待合室でも膝の上に置いていた。" },
        { id: 'c18-018', text: "診察室で大山の右足を見ると、靴がなく、足首は固定されていた。\n大山は医者のほうを向いていた。\nいつも誰かに何か言われると途中で口を挟むのに、\n今度は最後まで待っていた。" },
        { id: 'c18-019', speaker: 'doctor', text: "右足首の骨が折れています。全治の目安は半年です。" },
        { id: 'c18-020', text: "大山は自分の右足を見た。\nまるで、ほかにも悪いところがないか探すみたいに、\n膝から下をゆっくり見直した。" },
        { id: 'c18-021', speaker: 'oyama', text: "この俺が怪我だと？　\n今まで怪我どころか、病気だってしたことのない俺様が……。" },
        { id: 'c18-022', speaker: 'hirano', text: "うん、君ってそんな感じだよね。" },
        { id: 'c18-023', text: "大山は俺を見なかった。しばらくして、医者に聞いた。" },
        { id: 'c18-024', speaker: 'oyama', text: "……次の試合、出られないのか。" },
        { id: 'c18-025', speaker: 'doctor', text: "出られません。" },
        { id: 'c18-026', text: "大山は口を開きかけた。\nいつもなら、できないと言われたことほどやると言うやつが、\nそのときは何も言わなかった。" },
        { id: 'c18-027', text: "日和が大山の帽子を差し出した。\n大山は受け取ると、つばを自分のほうに向けて膝に置いた。" },
        { id: 'c18-028', text: "俺の鞄には、最後のアウトまで書いたスコアブックが入っていた。\nその次のページは、まだ誰の名前も書いてなかった。" },
      ],
      next: 'ryusei-defeat',
    },
    'ryusei-defeat': {
      title: '龍成との決戦、敗退',
      lines: [
        { id: 'c19-001', text: "決勝の朝。日和が貼った打順表に、大山の名前はなかった。\nライトの欄には昨日、代わりに入った先輩の名前があった。" },
        { id: 'c19-002', text: "試合前のノックで、その先輩は右中間の打球に回り込んだ。\n大山なら直接捕れたはずの球が、先輩の手前で跳ねた。\n先輩は無理に手を出さず、跳ねた球を拾って、振り返りざまに中継へ返した。\n走者がいたら、少なくとも余計な塁は与えない返球だった。" },
        { id: 'c19-003', text: "監督がそのライトを見て、俺に聞いた。" },
        { id: 'c19-004', speaker: 'misora', text: "昨日、途中から出た子？" },
        { id: 'c19-005', speaker: 'hirano', text: "はい。大山の代わりです。" },
        { id: 'c19-006', speaker: 'misora', text: "そう。" },
        { id: 'c19-007', text: "監督は打順表の守備位置を確かめると、紙を日和に返した。\n大山が出る日の確認と、かかった時間は変わらなかった。" },
        { id: 'c19-008', text: "そのすぐあと、ベンチの奥から声がした。" },
        { id: 'c19-009', speaker: 'senpai', text: "大山がいないんだ。今日の決勝点、俺が取る。" },
        { id: 'c19-010', speaker: 'nakata', text: "お前はまず塁に出ろ。俺が返してやる。" },
        { id: 'c19-011', speaker: 'senpai', text: "俺が返す側ですよ。" },
        { id: 'c19-012', text: "どっちも監督のほうを見ていた。打順表では、2人の名前は縦に並んでいた。" },
        { id: 'c19-013', text: "龍成ベンチ。監督の野原は、鳳翔の打順表と、準決勝までの記録を見比べていた。" },
        { id: 'c19-014', speaker: 'nohara', text: "大山は出ない。先発は昨日と同じだ。\n追い込まれると低い球を振らされる。\n打てる高さなら、カウントが浅くてもいけ。" },
        { id: 'c19-015', text: "顔を上げると、鳳翔の選手がベンチの前へ出てきた。\n声は準決勝のときより大きかった。\n美空はその後ろで、いつも通りの顔をしていた。" },
        { id: 'c19-016', speaker: 'nohara', text: "（あれだけの選手が抜けて、声が落ちるどころか大きくなるのか。\n……何か切り札でもあるのか。）" },
        { id: 'c19-017', text: "試合が始まると、龍成は早いカウントから振ってきた。\n鳳翔も四球で出た走者を進塁打で進め、点を取った。\n俺が鳳翔の得点欄に2点目を書いたときは、\nホームを踏んだ先輩と走者を返した先輩が、同時に監督のほうを向いた。" },
        { id: 'c19-018', text: "7回表、2対2。\n龍成は先頭が出塁し、そのまま1塁に走者を置いて、打順が4番に回った。" },
        { id: 'c19-019', speaker: 'announcer', text: "4番、ファースト、武藤大吾。" },
        { id: 'c19-020', text: "名前を呼ばれて立った選手の背中は、大きかった。\n打席に入ると、投手をじっと見た。1塁走者のほうは、一度も見なかった。" },
        { id: 'c19-021', text: "初球、内寄りの速球。捕手が構えたところに来た。" },
        { id: 'c19-022', text: "武藤は腕をたたんで振り抜いた。\n白球は左翼線の内側を高く飛んで、そのままスタンドに入った。" },
        { id: 'c19-023', text: "1塁走者がホームを踏んだ。\n武藤はそのあとをゆっくり回り、ベンチへ帰るまで何度も左翼席を見た。\n俺は、龍成の得点欄に続けて2点を書いた。" },
        { id: 'c19-024', text: "監督は電光掲示板を見上げた。\n龍成の数字が「4」に変わると、眉間にしわが寄った。" },
        { id: 'c19-025', speaker: 'nakata', text: "監督、まだ終わってません！　俺が取り返します。見ててください！" },
        { id: 'c19-026', text: "グラウンドから返事が重なった。\n監督はまだ掲示板を見ていた。中田先輩の声にも、振り向かなかった。" },
        { id: 'c19-027', text: "9回裏。鳳翔は安打と四球で、走者を2人出した。2アウト、1・2塁。\nベンチでは、誰も腰掛けに座っていなかった。" },
        { id: 'c19-028', text: "打球がライトへ上がった瞬間、2人の走者は走り出した。\n2塁走者が3塁を回る。その先には、右手を大きく回しているコーチがいた。" },
        { id: 'c19-029', text: "龍成のライトは、打球の下からほとんど動かなかった。" },
        { id: 'c19-030', text: "グラブが閉じた。" },
        { id: 'c19-031', text: "龍成のライトが、捕った球を握ったままマウンドへ駆けた。\n内野からもベンチからも選手が駆け寄り、\nマウンドの土がユニフォームの輪に隠れた。" },
        { id: 'c19-031a', text: "歓声が大きくなった。\n掲示板には、鳳翔の「2」と龍成の「4」が、\nさっきと同じ明るさで光っていた。" },
        { id: 'c19-032', text: "俺はまだ鉛筆を握っていた。\n鳳翔のベンチからは、誰も次の打者の名前を呼ばなかった。" },
      ],
      next: 'tears-after-the-final',
    },
    'tears-after-the-final': {
      title: '一人の涙、別々の意味',
      lines: [
        { id: 'c20-001', text: "整列の声で、ようやく鉛筆を置いた。\n白線に並んだ鳳翔の選手は、帽子を取って頭を下げた。\n中田先輩だけが少し遅れて頭を上げた。\n帽子をかぶり直そうとして、結局、手に持ったまま列を離れた。" },
        { id: 'c20-002', text: "ベンチに戻ってきた先輩たちは、誰も荷物に手をつけなかった。\n中田先輩は腰掛けの前で膝に手を置いた。\n隣には、試合中ずっとヘルメットを用意していた控えの先輩が立っていた。" },
        { id: 'c20-003', text: "その2人の間から、監督の横顔が見えた。" },
        { id: 'c20-004', text: "監督は掲示板を見ていた。\n頬を伝った涙が、あごの先から落ちた。\n拭おうともしなかったので、次の涙も同じところを通った。" },
        { id: 'c20-005', text: "ネットの向こうで、誰かの声が裏返った。" },
        { id: 'c20-005a', speaker: 'spectator', text: "えっ……監督、泣いてる？" },
        { id: 'c20-005b', text: "帰りかけていた人が通路で足を止めた。\n後ろの列の人が立ち上がり、前の人の肩越しにベンチをのぞいた。\nざわめきは、まだ歓声の残る龍成側のスタンドにまで広がった。" },
        { id: 'c20-005c', text: "鳳翔の保護者席では、\n母親たちがタオルやうちわを持ったまま、ベンチを見下ろしていた。" },
        { id: 'c20-005d', speaker: 'hosho_mother', text: "監督が、あんなに泣いてくれるなんてね……。" },
        { id: 'c20-005e', text: "隣の母親が、小さくうなずいた。" },
        { id: 'c20-005f', speaker: 'other_hosho_mother', text: "うちの子たち、幸せだね。" },
        { id: 'c20-005g', text: "龍成ベンチ。野原も帰り支度の手を止めていた。\n9回、2アウトから、同点の走者を1塁に置かれた。\n打球がグラブに収まるまで、腰掛けに戻れなかった。" },
        { id: 'c20-005h', speaker: 'nohara', text: "（大山がいなくても、最後まで気が抜けなかった。\n……神条さんの娘だからって、それだけで見てたのかもしれんな。）" },
        { id: 'c20-006', text: "鳳翔側のスタンドから、拍手がひとつ起きた。少しずつ数が増えた。\n夕日がベンチの奥まで差し込んで、\n監督の頬と、先輩たちが膝につけてきた土を照らしていた。" },
        { id: 'c20-007', text: "鳳翔のベンチ脇で、松葉杖がコンクリートを打つ音がした。\n俺が振り向くと、スタンドから降りてきた大山が柵をつかみ、\n美空から目を離さずにいた。" },
        { id: 'c20-008', speaker: 'oyama', text: "美空……俺と行きたかったんだよな。\n俺が出てりゃ、あんな顔させずに済んだのに。" },
        { id: 'c20-009', text: "声のした方を向きかけて、中田先輩の肩が揺れているのに気づいた。" },
        { id: 'c20-010', speaker: 'nakata', text: "美空監督は……今年こそ、俺と結婚したかったはずなのに……。" },
        { id: 'c20-011', text: "控えの先輩が腰掛けの端に座り、ヘルメットを膝に置いた。\nつばをぬぐっているうちに、そこへ涙が落ちた。" },
        { id: 'c20-012', speaker: 'senpai', text: "俺、一度でいいから呼ばれたかったな。監督に、打ったとこ見せたかった。" },
        { id: 'c20-013', text: "俺のすぐ横で、監督が鞄を開けてタオルを取り出した。\n畳まれた求人の紙が一緒に出てきて、腰掛けに落ちた。\n「レジ・品出し」の文字が見えた。" },
        { id: 'c20-014', speaker: 'misora', text: "……レジ、やらなきゃ……。" },
        { id: 'c20-015', text: "声は、俺が隣にいてようやく聞き取れるくらいだった。\n目の前では中田先輩が、まだ監督のほうを向いたまま泣いていた。\n柵の向こうでは、大山が口を真一文字に結んでいた。" },
        { id: 'c20-016', text: "拍手は、まだ続いていた。" },
        { id: 'c20-017', text: "誰かが、「来年こそ」と言った。\n中田先輩はうつむいたまま、手に持っていた帽子のつばを直した。" },
        { id: 'c20-018', text: "俺はベンチに置いたスコアブックを閉じた。\n最後の打者の欄だけ、まだ白かった。" },
      ],
      next: 'blank-line',
    },
    'blank-line': {
      title: '空いた一行',
      lines: [
        { id: 'cblank-001', text: "学校へ戻ると、先輩たちは使った道具を棚に戻して帰っていった。\n最後の1人が戸を引くまで、誰も次の試合の話をしなかった。" },
        { id: 'cblank-002', text: "日和が空のボトルを片づける横で、俺は机にスコアブックを開いた。\n9回裏の終わりまで、走者がどこまで進んだかも、\n誰が打ったかも書いてある。\n最後の打球を捕ったのがライトだということも、覚えていた。" },
        { id: 'cblank-003', text: "「右飛」と書けば済む。\n清峰戦で大山が倒れたときに書いたのと同じ、たった2文字だ。" },
        { id: 'cblank-004', text: "鉛筆を持ったまま、もう一度、9回裏の頭から読み直した。\n書き直すところはどこにもなかった。" },
        { id: 'cblank-004a', text: "あの打球が落ちていれば、とまた思った。\n俺も打席に立ちたかった。\n自分の一打で勝って、鳳翔のユニフォームで甲子園に行きたかった。" },
        { id: 'cblank-005', text: "日和が、机の向かいでボトルのふたを閉めた。" },
        { id: 'cblank-006', speaker: 'hiyori', text: "それ、持って帰る？" },
        { id: 'cblank-007', speaker: 'hirano', text: "うん。あとで書く。" },
        { id: 'cblank-008', text: "日和はそれ以上聞かなかった。\n俺がスコアブックを閉じるあいだに、\n残っていたボトルを全部、カゴにしまった。" },
        { id: 'cblank-009', text: "帰り際、戸を閉める前に壁を見た。\n夏の組み合わせ表が、まだ4隅を画びょうで留めてあった。\n鳳翔から決勝までの線は、大山が指でたどったときと変わらなかった。" },
        { id: 'cblank-010', text: "スコアブックは、空いた一行ごと鞄に入れた。" },
        { id: 'cblank-011', text: "夏休みが終わる少し前、机に置いたスマホが鳴った。\n画面には大山の名前と、短いメッセージが出ていた。" },
        { id: 'cblank-012', speaker: 'oyama', text: "グラブ持ってこい。" },
        { id: 'cblank-013', text: "何をするつもりか聞きかけて、やめた。\nグラブをしまった場所なら、まだ覚えていた。" },
      ],
      next: 'oyama-return',
    },
    'oyama-return': {
      title: '大山の復帰',
      lines: [
        { id: 'c21-001', text: "グラブを持ってグラウンドへ行くと、大山が外野のフェンス際にいた。\n片手で球を放り上げ、落ちてきたところを素手で取っていた。" },
        { id: 'c21-002', text: "こっちに気づくと、大山は右足から踏み出した。\nかばう様子もなく、土の上をまっすぐ歩いてくる。\n松葉杖は見当たらなかった。" },
        { id: 'c21-003', speaker: 'hirano', text: "半年って言ってたよね。" },
        { id: 'c21-004', text: "病院で日和から帽子を受け取ったのが、まだ1か月ほど前だった。" },
        { id: 'c21-005', speaker: 'oyama', text: "平野。俺はお前らみたいな凡人とは違う。それに、俺には美空の愛がある。" },
        { id: 'c21-006', speaker: 'hirano', text: "いや、半年っていう数字はどこいったんだよ。" },
        { id: 'c21-007', text: "大山は球を握り直した。\nそのまま投げるのかと思ったら、グラブもつけずに校門のほうへ歩き出した。" },
        { id: 'c21-008', speaker: 'oyama', text: "今日、再診だ。来いよ。どうせ俺が言っても信じねえだろ。" },
        { id: 'c21-009', text: "病院で、医者は新しい画像を出してから、前の画像を出し直した。\n2枚を並べ、今度は日付を見比べた。" },
        { id: 'c21-010', speaker: 'doctor', text: "……これ、まだ1か月か。" },
        { id: 'c21-011', speaker: 'oyama', text: "ふん、俺様を凡人と一緒にするな。" },
        { id: 'c21-012', text: "医者はすぐには返事をしなかった。\n右足を診て、立たせてから、もう一度画像に目を戻した。" },
        { id: 'c21-013', speaker: 'hirano', text: "先生、本当に大丈夫なんでしょうか。" },
        { id: 'c21-014', speaker: 'doctor', text: "骨はついてる。ついてるんだけどね。\n医者としてはちょっとした悪夢だよ。なんでこんなに早く治るの。" },
        { id: 'c21-015', speaker: 'oyama', text: "ふふ……美空、待っていろ。" },
        { id: 'c21-016', speaker: 'doctor', text: "聞いてるか。今日は軽いキャッチボールまでだぞ。" },
        { id: 'c21-017', text: "診察室を出ると、大山は廊下を走りかけた。\n俺が何も言わずに立ち止まると、数歩先から振り返って、歩幅を戻した。" },
        { id: 'c21-018', text: "グラウンドには、もう誰もいなかった。\n大山は俺から少し離れ、投げる手を上げた。" },
        { id: 'c21-019', speaker: 'hirano', text: "本当に軽くね。" },
        { id: 'c21-020', speaker: 'oyama', text: "軽くならな。雑魚相手には、それで十分だ。" },
        { id: 'c21-021', text: "大山は宣言どおり、ゆるい球を投げた。\nそれでも胸の前に来た球がグラブに収まったとき、乾いた音がした。" },
        { id: 'c21-022', text: "返球を受けた大山が、誰もいないベンチを見た。\n俺は、大山の名前がなかった決勝の打順表を思い出した。" },
        { id: 'c21-022a', speaker: 'oyama', text: "もう美空に、あんな顔させねえよ。" },
        { id: 'c21-022b', text: "大山はそれきり黙って、もう1球を投げた。体感では140キロ前後。\n大山の全力なら、見てからグラブを出したんじゃ遅い。\n今度は球がよく見えた。\nそれでも胸元まで鋭く伸びてきて、グラブの芯を叩いた。" },
        { id: 'c21-023', text: "顔を上げると、大山は笑いもせず、グラブを構えて待っていた。\n俺は球を返し、少し後ろへ下がって、またグラブを胸の前に出した。" },
      ],
      next: 'nakata-handover',
    },
    'nakata-handover': {
      title: '世代交代',
      lines: [
        { id: 'c22-001', text: "3年の先輩たちが、部室の棚から私物を引き上げに来た。\nいつもは奥まで詰まっている棚から、予備のスパイクや着替えが出ていく。\n中田先輩の場所には、名前を書いたテープと、分厚いファイルが1冊残った。" },
        { id: 'c22-002', text: "俺がファイルに手を伸ばすより先に、中田先輩が取った。\n持って帰るのかと思ったら、机に置いて開いた。" },
        { id: 'c22-003', speaker: 'nakata', text: "龍成のページ、見てみろ。" },
        { id: 'c22-004', text: "試合の日付が古い順に並んでいた。\n俺が初めて龍成を見た日より、ずっと前の試合もあった。\n武藤の欄には、打った球だけでなく、どんな球を見送ったかまで書いてある。" },
        { id: 'c22-005', text: "中田先輩は、いちばん新しいページを開いた。\n「7回、走者1塁。初球、内寄りの直球。本塁打」。\n俺のスコアブックにあるのと同じ一打だった。" },
        { id: 'c22-006', text: "その下には、同じコースで打ち取った別の試合の日付も書いてあった。" },
        { id: 'c22-007', speaker: 'nakata', text: "内は全部だめだって覚えるなよ。打たれた日だけ見てると、そう思うからな。" },
        { id: 'c22-008', text: "中田先輩はページを閉じた。\n表紙には、題名より大きな字で「中田」と書いてあった。" },
        { id: 'c22-009', speaker: 'nakata', text: "監督に読んでもらってくれ。あと、これは中田が残したものだ。\n優勝した場合は、中田の功績だと監督に伝えるように。\nこれは厳命だ。" },
        { id: 'c22-010', speaker: 'hirano', text: "……はい。" },
        { id: 'c22-011', text: "（うわあ、嫌な厳命。）" },
        { id: 'c22-012', text: "先輩は返事を聞くと、もう一度ファイルの表紙をこちらに向け直した。\n名前を見落とされる心配でもあるらしかった。" },
        { id: 'c22-013', text: "棚の下には、同じようなファイルが何冊も並んでいた。\n背表紙には「守備練習」や「対戦校」の文字より大きく、\n書いた人の名前が入っていた。\nどれも、表紙をめくると最初に「監督へ」とある。" },
        { id: 'c22-013a', text: "守備練習のファイルを1冊開いた。\nうまくいった日の手順だけでなく、\nうまくいかなかった日に、どこで足が止まったかまで書いてあった。" },
        { id: 'c22-013b', text: "（中田先輩、あの顔であんな細かい記録を残すのかと思ったけど……\nほかの先輩もか。\n強豪校だって、ここまで残してるところはそうそうないだろ。）" },
        { id: 'c22-014', text: "（……というか、どのファイルも名前の主張がすごい。）" },
        { id: 'c22-015', text: "中田先輩が最後の荷物を持って出ていくと、\n日和が棚からファイルをもう1冊出した。" },
        { id: 'c22-016', speaker: 'hiyori', text: "去年の龍成戦も出てきた。こっちは去年の棚に戻す？" },
        { id: 'c22-017', speaker: 'hirano', text: "龍成の分は一緒に置こう。年だけ分かるようにしとけば、すぐ見比べられる。" },
        { id: 'c22-018', text: "日和は背表紙の空いたところに、年度を書いたテープを貼った。\n俺は対戦校ごとに机へ並べ、今年のスコアブックをその隣に置いた。" },
        { id: 'c22-019', text: "監督に渡す分は、日和が机の端に重ねた。\nいちばん上の表紙から、中田先輩の名前がこちらを向いていた。" },
      ],
      next: 'gen-reads-the-records',
    },
    'gen-reads-the-records': {
      title: '厳が語る娘の決意',
      lines: [
        { id: 'c23-001', text: "秋になって、部室の窓を開けていると、練習が終わるころには寒くなった。\n俺が窓を閉めて振り返ると、机の端に重ねてあったファイルを、\n監督が上から1冊ずつ持ち上げていた。" },
        { id: 'c23-002', speaker: 'hirano', text: "引退した先輩たちからです。監督に読んでほしいって。" },
        { id: 'c23-003', text: "監督は「中田」と大きく書かれた表紙を開いた。\n投球コースの図と細かい字で埋まったページを、2枚ほどめくった。" },
        { id: 'c23-004', text: "監督はしばらく図を眺めたあと、\nファイルを閉じ、机の端の分もまとめて抱えた。\n俺は棚に残っていた記録の整理を続けた。" },
        { id: 'c23-005', text: "その晩、神条家。\n美空が居間のテーブルにファイルを置くと、\n厳は書きかけの練習メニューから顔を上げた。" },
        { id: 'c23-006', speaker: 'gen', text: "美空。明日から守備はこのメニューでやってみろ。場所は下に書いてある。" },
        { id: 'c23-007', speaker: 'misora', text: "あ、これ。なんかお父さんに読んでほしいって。" },
        { id: 'c23-008', speaker: 'gen', text: "俺に？" },
        { id: 'c23-009', text: "厳はファイルを机に置いて開いた。\n美空が学校で読み飛ばした図のところで手が止まった。" },
        { id: 'c23-010', speaker: 'gen', text: "……こいつ、去年の龍成戦まで見返したのか。" },
        { id: 'c23-011', text: "中田の記録には、今年打たれた球の下に、\n同じコースで打ち取った去年の試合の日付が書いてあった。\n厳は立ったままその日付を読み返し、それから椅子を引いた。" },
        { id: 'c23-012', speaker: 'gen', text: "よく見てるな。……俺がいなくなってからも、こんなに残してたのか。" },
        { id: 'c23-013', text: "厳はファイルの表紙を見直した。題名より大きな字で「中田」と書いてある。" },
        { id: 'c23-014', speaker: 'gen', text: "中田か。俺に見せるつもりで、ここまでやったのか。" },
        { id: 'c23-015', text: "美空が残りのファイルも押しやると、\n厳は練習メニューを美空に渡し、空いたところに全部並べた。" },
        { id: 'c23-016', speaker: 'gen', text: "美空、よく持ってきてくれたな。" },
        { id: 'c23-017', speaker: 'misora', text: "ん？　うん。" },
        { id: 'c23-018', text: "美空は練習メニューを受け取ると、畳んで鞄に入れ、自分の部屋へ戻った。" },
        { id: 'c23-019', text: "厳は次のファイルを手に取った。\n表紙をめくったところに「監督へ」と書いてあった。" },
        { id: 'c23-020', text: "就任した日の晩、美空は家で、\nみんなの前で甲子園で一番になると言ったことを話した。\n厳は十何年かけても届くかどうかと思ったが、\nそこまでやる気ならと、出せるものは出すと言った。" },
        { id: 'c23-021', text: "あの晩と違って、今日は選手たちの手で書かれた記録が目の前にあった。" },
        { id: 'c23-022', speaker: 'gen', text: "……明日の守備、さっきの紙だけじゃ足りんな。" },
        { id: 'c23-023', text: "厳はノートを開き、武藤の名前と試合の日付を書き写した。" },
        { id: 'c23-024', text: "中田のファイルは、机のいちばん手前に開いたままだった。" },
      ],
      next: 'tsuyoshi-sighting',
    },
    'tsuyoshi-sighting': {
      title: '剛の目撃',
      lines: [
        { id: 'c24-001', text: "休日、買い物を済ませて駅前の広場を歩いていると、\nベンチのそばに美空監督がいた。\n隣の男に声をかけながら、手に持っていた紙袋をベンチに置いた。" },
        { id: 'c24-002', text: "男は黒いスーツで、大きな箱を抱えていた。上着の肩が張っていた。\n俺が通りかかったとき、2人の話がすぐそばで聞こえた。" },
        { id: 'c24-003', speaker: 'misora', text: "剛、もう1軒だけ付き合って。" },
        { id: 'c24-005', speaker: 'tsuyoshi', text: "姉ちゃん、俺、結婚式の帰りだから荷物があるんだって。" },
        { id: 'c24-006', speaker: 'misora', text: "あの店だけ。あんたが帰ってるときくらいしかできないから。" },
        { id: 'c24-007', text: "俺が足を止めると、監督がこっちを向いた。" },
        { id: 'c24-007a', speaker: 'hirano', text: "あ、監督。こんにちは。" },
        { id: 'c24-007b', speaker: 'misora', text: "ああ、平野くん。これ、弟の剛。" },
        { id: 'c24-007c', speaker: 'hirano', text: "はじめまして。野球部の平野です。" },
        { id: 'c24-007d', speaker: 'tsuyoshi', text: "どうも。姉がお世話になってます。" },
        { id: 'c24-007e', text: "剛は箱を落とさないように抱えたまま、頭を下げた。\n手首には引き出物の袋も掛かっていた。" },
        { id: 'c24-008', text: "広場の反対側。\n美空たちのいるベンチから100m近く離れたバス停に、大山がいた。" },
        { id: 'c24-009', speaker: 'oyama', text: "（美空だ。……なんだ、あの男は？）" },
        { id: 'c24-010', text: "ベンチのそばで、美空が次に行く店の看板を指した。\n剛が看板を探して顔を上げると、ちょうどバス停のほうを向いた。" },
        { id: 'c24-011', speaker: 'oyama', text: "（なっ、俺に気づいたのか？　この距離で……ただ者じゃねえ。）" },
        { id: 'c24-012', text: "大山は反射的にバス停の案内板の陰に入った。\n剛は看板を見つけると、美空について駅の入口へ歩き出した。" },
        { id: 'c24-013', text: "俺は2人を見送った。\nふと横を見ると、美空が置いた紙袋がベンチに残っていた。" },
        { id: 'c24-013-2', text: "紙袋に手を伸ばしたとき、\nバス停の案内板の陰から大山が飛び出した。\n部の先輩も追いかけてきた。" },
        { id: 'c24-013-3', text: "何か叫んで大山を止めようとしたが、\n駅へ向かう2人を見た途端、\n先輩まで走る速度を上げた。" },
      ],
      choices: [
        { text: '先に選手へ弟だと伝える', to: 'tsuyoshi-tell' },
        { text: '先に美空へ荷物を届ける', to: 'tsuyoshi-return-bag' },
      ],
    },
    'tsuyoshi-tell': {
      title: '剛の目撃',
      lines: [
        { id: 'c24a-001', text: "紙袋を手に取ったところで、大山が俺の目の前まで突っ込んできた。\n思わずベンチに膝の裏が当たるまで後ずさった。\n先輩もすぐ横に来たが、俺より先に駅の入口を見た。" },
        { id: 'c24a-001a', speaker: 'hirano', text: "うわっ。ちょ、ちょっと、どこから来たの？" },
        { id: 'c24a-002', speaker: 'oyama', text: "ぜえ、ぜえ……お、おい、平野！　あの男、美空とどういう関係だ！" },
        { id: 'c24a-003', speaker: 'hirano', text: "今、あのバス停から走ってきたよね？　\nえ、あそこから見えてたの？　嘘でしょ？　\n……「姉ちゃん」って聞こえたけど。監督も弟だって言ってたよ。" },
        { id: 'c24a-004', speaker: 'senpai', text: "弟なら、監督が何もらうと喜ぶか知ってるよな。" },
        { id: 'c24a-005', text: "大山は先輩を見た。それから駅の入口を見て、今度は俺を見た。" },
        { id: 'c24a-006', speaker: 'oyama', text: "平野。あいつと話すときは、先に俺を呼べ。" },
        { id: 'c24a-007', text: "俺が駅へ向かおうとすると、剛が引き返してきた。\n俺の手の紙袋を見て、「あ、それです」と足を止めた。" },
        { id: 'c24a-007a', speaker: 'tsuyoshi', text: "姉ちゃんに、取ってこいって言われて。すみません。" },
        { id: 'c24a-007b', text: "剛は箱を脇に抱え直し、空いた手で紙袋を受け取った。\n美空は駅の入口で待っていた。俺たちも剛について駅の入口まで歩いた。" },
      ],
      next: 'tsuyoshi-end',
    },
    'tsuyoshi-return-bag': {
      title: '剛の目撃',
      lines: [
        { id: 'c24b-001', text: "紙袋をつかんで駅の入口まで走った。\n美空と剛は中に入る手前で、案内板を見ていた。\n2人に追いついたところで、後ろから来ていた足音が止まった。" },
        { id: 'c24b-002', speaker: 'hirano', text: "監督。これ、ベンチにありました。" },
        { id: 'c24b-003', speaker: 'misora', text: "あ、忘れてた。ありがとう、平野くん。はい、剛。" },
        { id: 'c24b-003b', text: "美空は受け取った紙袋を、そのまま剛の胸元に差し出した。" },
        { id: 'c24b-003a', speaker: 'tsuyoshi', text: "ちょ、ちょっと、姉ちゃん。俺、手ぇ空いてないって。" },
        { id: 'c24b-004', text: "剛が箱を落としそうになりながら持ち手をつかむと、\n美空はもう袋から手を離していた。" },
        { id: 'c24b-005', text: "2人が駅の中へ入ると、すぐ後ろで荒い息がした。\n振り向いたら大山の顔が目の前にあって、声が出た。\n先輩もその隣で、息を整えるより先に通路の奥をのぞき込んだ。" },
        { id: 'c24b-005a', speaker: 'hirano', text: "うわっ！　ちょ、ちょっと、いつからそこにいたんですか？" },
        { id: 'c24b-006', speaker: 'senpai', text: "お前、あの人の前でも平野くんって呼ばれてたな。家族ぐるみか？" },
        { id: 'c24b-007', speaker: 'hirano', text: "さっき初めて挨拶したんです。監督の弟ですよ。" },
        { id: 'c24b-008', speaker: 'oyama', text: "挨拶まで済ませてんのかよ。" },
      ],
      next: 'tsuyoshi-end',
    },
    'tsuyoshi-end': {
      title: '剛の目撃',
      lines: [
        { id: 'c24e-001', text: "駅の入口から、向こうの出口へ歩いていく2人の背中が見えた。\n美空が立ち止まって看板を探すたび、剛も箱と紙袋を抱えたまま足を止めた。" },
        { id: 'c24e-002', text: "隣では、大山がまだその背中を見ていた。" },
      ],
      next: 'parents-and-press',
    },
    'parents-and-press': {
      title: '父親たちと取材',
      lines: [
        { id: 'c25-001', text: "秋の練習試合が終わると、日和に頼まれて、\n俺は球場の記録係にスコアの写しを届けに行った。\n戻ってくる途中、スタンド下の通路で、美空監督が記者につかまっていた。" },
        { id: 'c25-002', text: "記者は取材を始める前に、\nちょうど通りかかった鳳翔の保護者にも話を聞いていた。" },
        { id: 'c25-003', speaker: 'hosho_mother', text: "うちの子、あの決勝の日は帰ってきても何も言わなかったんです。\n次の朝には、もう練習に行きましたけど。" },
        { id: 'c25-004', speaker: 'other_hosho_mother', text: "監督があんなに泣いてくれたでしょう。\nあの子たちも、ちゃんと見てもらえてたんだなって思いますよね。" },
        { id: 'c25-005', text: "「あんなに泣いてくれた」と聞こえたところで、監督が顔を上げた。\nそれから、壁の時計を見た。" },
        { id: 'c25-006', text: "通路の向こうから、男が2人、こちらに歩いてきた。\n片方はスマホを持っていて、\n記者が次の質問をしかけたところで、監督の前に出た。" },
        { id: 'c25-007', speaker: 'visitor', text: "あの、写真いいですか。できれば一緒に。" },
        { id: 'c25-008', text: "監督が返事をする前に、男はもう隣に並ぼうとしていた。\n監督は半歩下がった。そのぶんだけ、男も前に出た。" },
        { id: 'c25-009', text: "母親たちのそばにいた父親が、紙コップを窓枠に置いた。\nもう1人も、それを見て腰を上げた。" },
        { id: 'c25-010', speaker: 'hosho_father', text: "すみません。いま取材中なので。お話なら、こちらで。" },
        { id: 'c25-011', text: "声は穏やかだった。\n父親が通路の角を手で示すと、男たちは顔を見合わせた。\nそれから4人とも角の向こうへ行った。\n監督は半歩下がった場所に立ったまま、記者のほうへ向き直った。" },
        { id: 'c25-012', speaker: 'reporter', text: "夏はあと1勝でした。来年に向けて、もう動き出しているんですね。" },
        { id: 'c25-013', text: "記者が見ていたのは、監督が手にしている練習試合の日程表だった。\n次の週末にも、朝から試合が入っている。" },
        { id: 'c25-014', speaker: 'misora', text: "……朝からなんですよね。" },
        { id: 'c25-015', text: "監督は日程表を畳んで、ため息をついた。\n記者のペンはそこで止まらず、ノートの次の行へ進んだ。" },
        { id: 'c25-016', text: "さっきの父親が戻ってきた。\n窓枠に置いた紙コップを取り、自分の奥さんに渡した。\nもう1人も、飲みかけのコーヒーを持ってその隣に座った。\nスマホの男たちは戻ってこなかった。" },
        { id: 'c25-017', text: "俺と目が合うと、父親は軽く会釈した。俺も頭を下げた。" },
        { id: 'c25-018', speaker: 'misora', text: "平野くん。もう帰っていい？" },
        { id: 'c25-019', text: "記者はまだ、ノートの最後の行を書いていた。" },
      ],
      next: 'winter-records',
    },
    'winter-records': {
      title: '12月の記録',
      lines: [
        { id: 'cwinter-001', text: "12月。全体練習が終わるころには、部室の窓が白く曇っていた。\n机では日和が、明日の組分けの紙を広げていた。" },
        { id: 'cwinter-002', text: "俺は今日のノックの記録を清書しながら、紙の空いた枠を見た。\n誰がどこに入るかは、もう聞かなくても半分は分かった。" },
        { id: 'cwinter-003', speaker: 'hiyori', text: "明日のノック、内野は2組。平野くんは2組目のセカンドね。" },
        { id: 'cwinter-004', speaker: 'hirano', text: "岡田は？" },
        { id: 'cwinter-005', speaker: 'hiyori', text: "サード。三浦くんは外野。先輩に、返球を見てほしいって言われたって。" },
        { id: 'cwinter-006', text: "日和が紙の端を押さえたまま、鉛筆の尻で棚を指した。\n言われる前に、俺は2段目からセロハンテープを取って渡した。" },
        { id: 'cwinter-007', text: "戸が開いて、冷えた空気と一緒に大山が入ってきた。\n挨拶もせずに棚の前へ行き、対戦校のファイルを1冊抜いた。\n龍成の分だった。" },
        { id: 'cwinter-008', text: "大山はそのまま、ファイルを脇に挟んで戸口へ戻りかけた。" },
        { id: 'cwinter-009', speaker: 'hirano', text: "それ、持って帰るなよ。先輩たちも見るんだから。" },
        { id: 'cwinter-010', speaker: 'oyama', text: "読むだけだ。" },
        { id: 'cwinter-011', speaker: 'hirano', text: "家でだろ。ここで読め。" },
        { id: 'cwinter-012', text: "大山は舌打ちして、立ったままページをめくった。\n指は決勝のページの、武藤の欄で止まった。" },
        { id: 'cwinter-013', speaker: 'oyama', text: "2打席目、何で打ち取った。" },
        { id: 'cwinter-014', speaker: 'hirano', text: "下の欄。球種もコースも書いてある。" },
        { id: 'cwinter-015', text: "大山は返事をせずに下の欄を読んだ。\nそれからファイルを閉じて、棚に押し込んだ。1段ずれていた。" },
        { id: 'cwinter-016', speaker: 'hiyori', text: "大山くん、そこ違う。1つ下。" },
        { id: 'cwinter-017', text: "大山は黙って入れ直した。戸口で一度だけ振り返った。" },
        { id: 'cwinter-018', speaker: 'oyama', text: "平野。明日、セカンドの日だろ。ベースカバー、遅れんなよ。" },
        { id: 'cwinter-019', text: "戸が閉まった。日和が組分けの紙に、最後の名前を書いた。\n俺はスコアブックを棚に戻し、机の脇に置いていたグラブを取った。" },
        { id: 'cwinter-020', text: "外では岡田がもう、ネットの前でバットを振っていた。\n俺はグラブをはめながら、白い息の中へ出ていった。" },
        { id: 'cwinter-021', text: "翌日の練習の終わりに、投内連係が始まった。\n1塁に走者役の1年を置いて、ノッカーがマウンドの前へ打球を転がす。\n投手が捕って2塁へ投げ、2塁から1塁へ回す。" },
        { id: 'cwinter-022', text: "2組目のセカンドは、日和の紙のとおり俺だった。\nマウンドには大山が立っていた。" },
        { id: 'cwinter-023', text: "1本目。打球が大山の正面から、少し3塁側へ転がった。\nショートが打球のほうへ寄ったので、2塁へは俺が入る。\n打球の音と同時に、俺はベースへ走り出した。" },
        { id: 'cwinter-024', text: "ベースの手前で歩幅を詰め、左足のつま先をベースの角に置いた。\n胸を大山へ向けたところに、球が来た。" },
        { id: 'cwinter-025', text: "捕った勢いのまま右足を出して、1塁へ投げた。\n走者役の1年が滑り込んできたときには、球はもう手から離れていた。" },
        { id: 'cwinter-026', text: "1塁の先輩のミットが鳴った。\n打者役の1年は、まだ1塁までの線の途中だった。" },
        { id: 'cwinter-027', speaker: 'okada', text: "平野、今の入り方、どこで覚えたんだよ。" },
        { id: 'cwinter-028', speaker: 'hirano', text: "中学で、ベースの手前で捕って、踏むのが遅れたことがある。\nそれから毎日、入る足だけやってた。" },
        { id: 'cwinter-029', text: "岡田は「地味だな」と言って笑った。\n言い返す前に、マウンドから大山の声がした。" },
        { id: 'cwinter-030', speaker: 'oyama', text: "日和。明日の組分けも、セカンドは平野にしとけ。" },
        { id: 'cwinter-031', speaker: 'hiyori', text: "明日は内野、3組目まであるけど。" },
        { id: 'cwinter-032', speaker: 'oyama', text: "こいつは入る場所がずれねえ。投げやすい。\n捕りにくいとこに入るやつと組むと、俺の練習が減る。" },
        { id: 'cwinter-033', text: "日和は紙を出して、何かを書き足した。\n大山はもう、次の打球を待ってグラブを構えていた。" },
        { id: 'cwinter-034', text: "返事をする代わりに、グラブの中で一度指を握った。\n2塁の後ろへ戻って、次の打球に備えて腰を落とす。\nさっきより少しだけ、低く。" },
      ],
      next: 'second-scorebook',
    },
    'second-scorebook': {
      title: '二冊目',
      lines: [
        { id: 'csecond-001', text: "4月。2年になって最初の朝練の日、\n着替えに部室へ入ると、棚の下の段が空いていた。\n去年まで3年の先輩たちがスパイクを置いていたところだ。" },
        { id: 'csecond-002', text: "俺が鞄から去年のスコアブックを出すと、\n向かいで練習用のボールを数えていた日和が顔を上げた。" },
        { id: 'csecond-003', speaker: 'hiyori', text: "あ、ちょうどよかった。机の上の、平野くんの分。" },
        { id: 'csecond-004', text: "机には同じ色のスコアブックが2冊あった。\n手前の1冊を取ると、表紙の隅に俺の名前が書いてあった。\n去年のは背が割れて、手を離すといつも同じところで開いた。\n新しいほうは、開いてもすぐ閉じた。" },
        { id: 'csecond-005', speaker: 'hirano', text: "去年の、まだページ残ってるけど。" },
        { id: 'csecond-006', speaker: 'hiyori', text: "龍成の記録、去年のも何度も見返すでしょ。\n今年の試合が混ざると探しにくいから。" },
        { id: 'csecond-007', text: "日和はもう1冊を手に取った。そっちの表紙には日和の名前があった。" },
        { id: 'csecond-008', text: "グラウンドからバットの音がして、日和はボールのカゴを持って出ていった。\n俺は古いスコアブックを鞄の奥にしまい、新しいほうを持って後を追った。" },
        { id: 'csecond-009', text: "グラウンドの入口に、見覚えのない背中が2つあった。\n大柄なほうが柵の前で足を止めて、内野へ飛んだ打球を追っていた。\nもう1人は、練習の邪魔にならないようか、\n通りかかる先輩がいるたびに入口の端へ寄った。" },
        { id: 'csecond-010', text: "去年の今ごろは、俺もあそこで練習を見ていた。\n中へ入っていいのかも分からず、しばらく立っていた。" },
        { id: 'csecond-011', text: "背後からスパイクの音がして、大山が俺の隣に並んだ。\n大柄なほうの足元に、使い込んだキャッチャーミットが置いてあった。" },
        { id: 'csecond-012', speaker: 'oyama', text: "あのデブ、使えそうだな。" },
        { id: 'csecond-013', text: "そう言いながら、大山は2人のほうへ歩き出した。" },
      ],
      next: 'tahara-and-komiya',
    },
    'tahara-and-komiya': {
      title: '田原と小宮',
      lines: [
        { id: 'c26-001', text: "大山は、大柄な新入生の前で足を止めた。\n見上げるほどではないが、横に並ぶと、大山より肩幅があった。\n顔つきは穏やかで、急に前に立たれても、\nミットを拾ってからゆっくり顔を上げた。" },
        { id: 'c26-002', speaker: 'oyama', text: "それ、お前のか。俺の球、受けてみろよ。" },
        { id: 'c26-003', speaker: 'tahara', text: "はい。田原大地です。よろしくお願いします。" },
        { id: 'c26-004', text: "大山はもうグラウンドへ入っていた。\n田原は頭を上げ、マスクを持ってそのあとを歩き出した。" },
        { id: 'c26-005', text: "入口の端にいたもう1人が、俺に気づいて帽子を取った。\n細身で、練習着にはまだ畳んだ折り目が残っていた。" },
        { id: 'c26-005-p1', speaker: 'hirano', text: "2年の平野。新入生だよな。" },
        { id: 'c26-006', speaker: 'komiya', text: "はい。小宮裕也です。よろしくお願いします。" },
        { id: 'c26-006-p1', speaker: 'hirano', text: "中学は部活？　それとも硬式のクラブ？" },
        { id: 'c26-006-p2', speaker: 'komiya', text: "硬式のクラブです。ほとんどショートで、\nセカンドとサードも少しやりました。" },
        { id: 'c26-006-p3', text: "話しながら、小宮の目はときどき俺の肩の向こうへ動いた。\nブルペンへ入っていく大山と、その後ろを歩く田原を追っていた。\nノックの順番を待つ先輩たちの並びも、一度ずつ見ていた。" },
        { id: 'c26-006-p4', speaker: 'hirano', text: "荷物、そこだと通る人に当たるから。\nベンチの裏に置いとけばいい。1年はいちばん端。" },
        { id: 'c26-006-p5', text: "小宮は自分の鞄を肩に掛けると、\n田原が柵の前に置いていった大きな鞄も持ち上げた。\nベンチの裏へ運んで、先輩たちの鞄から少し離して並べた。" },
        { id: 'c26-006-p6', text: "1年前は、俺のほうが鞄を持ったまま、\nどこに置けばいいのか聞く相手を探していた。\n結局、先輩たちの鞄の列から少し離して置いた。" },
        { id: 'c26-006-p7', speaker: 'komiya', text: "あの、さっきの方、大山先輩ですよね？" },
        { id: 'c26-007', speaker: 'hirano', text: "そうだけど。" },
        { id: 'c26-008', speaker: 'komiya', text: "僕もあっちに行っていいですか。\n強い打球を捕る練習がしたかったんです。" },
        { id: 'c26-009', text: "小宮はそう言って、俺が返事をする間に、\n大山に声が届くところまで小走りで追いついた。\n日和がボールのカゴを置くと、内野ではノックが始まった。\n横のブルペンでは、田原がマスクをかぶって腰を落とした。" },
      ],
      choices: [
        { text: '田原の捕球練習を見に行く', to: 'tahara-catching' },
        { text: '小宮の用事を手伝う', to: 'komiya-fielding' },
      ],
    },
    'tahara-catching': {
      title: '田原と小宮',
      lines: [
        { id: 'c26a-001', text: "俺がブルペンの横に着くと、大山の1球目が低く来た。\n先輩捕手でも受ければミットが下がるあたりだ。\n田原は手首を少し返しただけで捕り、その位置でミットを止めた。" },
        { id: 'c26a-002', speaker: 'oyama', text: "おっ。俺の球、いきなり捕れるとはな。" },
        { id: 'c26a-003', speaker: 'tahara', text: "そうですか。わりと普通の球だっぺ。" },
        { id: 'c26a-004', speaker: 'oyama', text: "今のは1割だ。もう1球いくぞ。" },
        { id: 'c26a-005', speaker: 'tahara', text: "はい。いつでもどうぞ。" },
        { id: 'c26a-006', text: "大山が投げた瞬間、ブルペンの脇を歩いていた3年の先輩が足を止めた。\nさっきよりずっと大きな音がした。\n田原は同じ高さでミットを止め、立って球を返した。" },
        { id: 'c26a-007', text: "ブルペン脇の通路を美空が通った。\n日和に部室の鍵を渡し、校門へ向かうところだった。\n田原はマスクを取り、通路に近いところまで出て頭を下げた。" },
        { id: 'c26a-008', speaker: 'tahara', text: "監督、はじめまして。大地といいます。\n監督はえらいべっぴんさんですね。\nおらの嫁に来てくれませんか。" },
        { id: 'c26a-009', speaker: 'senpai', text: "何ぃ!?　こらぁ、1年！" },
        { id: 'c26a-009a', text: "通路にいた先輩だけじゃなかった。\n隣のブルペンでも誰かが「待てや！」と怒鳴り、\n内野からも先輩たちがこっちを向いた。\n美空はもう柵の角を曲がっていた。" },
        { id: 'c26a-009b', speaker: 'oyama', text: "死ね。" },
        { id: 'c26a-009c', text: "頬のすぐ横を、白いものがかすめた。\n俺が肩をすくめたときには、田原は首をすっと傾けていた。\n球は田原の後ろのネットに突き刺さり、支柱が鳴った。" },
        { id: 'c26a-009d', text: "田原は揺れるネットをちらっと見た。\nさっき挨拶したときと同じ顔で、先輩たちに向き直った。" },
        { id: 'c26a-009e', speaker: 'tahara', text: "先輩方も、監督に惚れてるんですか。分かります。" },
        { id: 'c26a-010', text: "田原はうなずいてから通路を見た。もう誰もいなかった。" },
      ],
      next: 'rookies-teirei',
    },
    'komiya-fielding': {
      title: '田原と小宮',
      lines: [
        { id: 'c26b-001', text: "小宮がノック用の球を拾い集めていたので、\n俺は空いたカゴを持ってそばへ行った。\n内野では、大山がバットを手に取ったところだった。" },
        { id: 'c26b-002', speaker: 'komiya', text: "大山先輩、1本お願いしてもいいですか。思いきり打ってください。" },
        { id: 'c26b-003', text: "大山が三遊間へ打った。\n小宮は横へ飛びつく前に、打球が跳ねる場所へ1歩出た。\n低いバウンドをすくって立ち上がると、そのまま1塁へ投げた。" },
        { id: 'c26b-004', speaker: 'oyama', text: "お前、足は使えるな。" },
        { id: 'c26b-005', speaker: 'komiya', text: "大山先輩に打ってもらえるなら、毎日でも鍛えられますね。" },
        { id: 'c26b-006', text: "大山が次の球を取りに戻ったところで、\n別の組のボールが、通りかかった美空の足元まで転がった。\n美空が立ち止まる。\n小宮は俺の手からカゴを取ると、その球を拾いに走った。" },
        { id: 'c26b-007', speaker: 'komiya', text: "監督、お手を煩わせません。" },
        { id: 'c26b-008', speaker: 'misora', text: "助かる。" },
        { id: 'c26b-008a', speaker: 'hirano', text: "（小宮くん、出世が早そうだな。）" },
        { id: 'c26b-009', text: "美空は空いた両手をそのまま上着のポケットに入れて、歩いていった。\n小宮はカゴへ球を戻した。\n俺にカゴを返すときまで、口元が緩んでいた。" },
      ],
      next: 'rookies-teirei',
    },
    'rookies-teirei': {
      title: '田原と小宮',
      lines: [
        { id: 'c26e-001-p1', text: "5月。帝嶺学院との練習試合を翌日に控えた日の、練習のあと。\nベンチの端で、日和がタブレットの画面を送っては戻していた。" },
        { id: 'c26e-001-p2', speaker: 'hiyori', text: "帝嶺、去年の春にうちとやったときの映像しかないの。\n秋の試合がどこにも見つからなくて。" },
        { id: 'c26e-001-p3', speaker: 'hirano', text: "去年の春だと、メンバーもだいぶ替わってるよな。" },
        { id: 'c26e-001-p4', text: "隣でスパイクのひもを結び直していた3年の先輩が、手を止めた。" },
        { id: 'c26e-001-p5', speaker: 'senpai', text: "……あ。秋の帝嶺なら、撮ってもらってる。" },
        { id: 'c26e-001-p6', speaker: 'hiyori', text: "撮ってもらってる？" },
        { id: 'c26e-001-p7', speaker: 'senpai', text: "三浦。お前の母ちゃん、秋の練習試合でずっとカメラ回してたろ。\n帝嶺が近くの球場で試合するって聞いたから、\nついでに頼んだんだよ。" },
        { id: 'c26e-001-p8', text: "トンボを片づけていた三浦が、柄を持ったまま振り返った。" },
        { id: 'c26e-001-p9', speaker: 'miura', text: "うちの母さんにですか？　俺、何も聞いてないですよ。" },
        { id: 'c26e-001-p10', speaker: 'senpai', text: "いいからスマホ見ろ。" },
        { id: 'c26e-001-p11', text: "三浦はベンチに置いた鞄からスマホを出した。\n画面を下へ送っていた指が、途中で止まった。" },
        { id: 'c26e-001-p12', speaker: 'miura', text: "……来てました。10月に。\n「帝嶺の分、先輩に渡してね」って。動画が3本。" },
        { id: 'c26e-001-p13', text: "三浦が動画を日和のタブレットへ送った。\n最初の1本を開くと、画面いっぱいに空が映った。\n少し送ると、今度はフェンスの網目が大きく揺れていた。" },
        { id: 'c26e-001-p14', text: "さらに送ると、網の向こうに打席が見えた。\n打者の背中に、帝嶺の文字があった。" },
        { id: 'c26e-001-p15', speaker: 'hiyori', text: "ここからなら見られる。先輩、ありがとうございます。" },
        { id: 'c26e-001-p16', speaker: 'senpai', text: "俺じゃなくて母ちゃんに言え。三浦の。" },
        { id: 'c26e-001-p17', text: "三浦はもう、スマホに何か打ち込んでいた。\n送ったのは「ありがと。使う」だけだった。" },
        { id: 'c26e-001-p18', text: "日和が映像を止めた。\n打席に入ろうとしているのは、新庄だった。" },
        { id: 'c26e-001-p19', speaker: 'hirano', text: "先輩、それで帝嶺の秋を頼んでたんですか。" },
        { id: 'c26e-001-p20', speaker: 'senpai', text: "新庄とは、少年野球のころから当たってる。\n小学校でも中学でも、最後に負けたのはうちだった。" },
        { id: 'c26e-001-p21', speaker: 'senpai', text: "中学のときは俺が投げてた。\n1打席目は内の真っすぐで詰まらせて、ショートゴロ。\n次も同じとこに投げたら、きれいにレフトへ持っていかれた。" },
        { id: 'c26e-001-p22', speaker: 'senpai', text: "だから最後の打席は勝負しないで、歩かせた。\nそしたら牽制を2つ挟んだあとの初球で、2塁に走られた。\n内野ゴロで3塁、外野フライでホームだ。" },
        { id: 'c26e-001-p23', speaker: 'senpai', text: "打たせなくても点を取られた。\n何もしないで帰ってくれないんだよ、あいつは。" },
        { id: 'c26e-001-p24', text: "去年の春、俺のスコアブックでも、\n新庄の1打席目は空振り三振で、2打席目は安打だった。\n間に何があったのかは、記号だけでは分からなかった。" },
        { id: 'c26e-001-p25', speaker: 'other_senpai', text: "でも去年は大山が三振取ってたろ。\n今年はこっちに大山も田原もいるんだし。" },
        { id: 'c26e-001-p26', text: "グラウンドの外を、監督が校舎のほうへ歩いていった。\n先輩はひもを結び終えた足で、地面を1回強く踏んだ。" },
        { id: 'c26e-001-p27', speaker: 'senpai', text: "小学校のときも中学のときも、\nあそこで見てる人なんかいなかったからな。\n明日は監督の前だ。今度は、あいつに何もさせない。" },
        { id: 'c26e-001-p28', text: "隣の先輩が「お前、それ毎年言ってるだろ」と笑った。\n先輩は笑わなかった。" },
        { id: 'c26e-001-p29', speaker: 'other_senpai', text: "……まあ、今年は大山がいる。1打席くらいは黙らせてやれよ。" },
        { id: 'c26e-001-p30', text: "日和は返事をせずに、3本の動画を打席ごとに分け始めた。\n俺はスコアブックの新しいページに、帝嶺の打順を書く欄を空けた。" },
        { id: 'c26e-001', text: "翌日の練習試合は、大山の先発で始まった。\n最初の回、田原のミットが鳴るたび、\n帝嶺のベンチでは次の打者が素振りをやめてマウンドを見た。\n田原は1球受けるごとに、大山の胸へ球を返した。" },
        { id: 'c26e-001-p31', text: "3塁の岡田が、帝嶺の打者がバットを短く持つのを見て、\n内野へ「打たせていいぞ！」と声を張った。" },
        { id: 'c26e-002', text: "途中からショートに入った小宮は、左中間への打球で、\n外野からの返球を受けた。捕ると同時に3塁へ投げたので、\n1塁から走ってきた選手は2塁を回ったところで足を止め、\nベースへ引き返した。" },
        { id: 'c26e-003', text: "試合が終わって道具を片づけていると、\n小宮が帝嶺の新庄を見つけ、帽子を取って近づいた。" },
        { id: 'c26e-004', speaker: 'komiya', text: "新庄さん。鳳翔の小宮です。ご挨拶が遅くなりました。" },
        { id: 'c26e-005', speaker: 'shinjo', text: "小宮くん、だよね。さっきの中継、早かったね。" },
        { id: 'c26e-006', speaker: 'komiya', text: "ありがとうございます。母が、いつもお父様にお世話になっております。" },
        { id: 'c26e-007', text: "新庄が「父に？」と聞き返しかけたところで、\n帝嶺の選手が用具を運ぶのを手伝ってくれと声をかけた。" },
        { id: 'c26e-008', speaker: 'shinjo', text: "ごめん。また対戦したときに。" },
        { id: 'c26e-009', text: "新庄が道具を取りに行くと、小宮は帽子をかぶり直した。\n俺がそばを通ったときには、もう鳳翔の荷物を持ち上げていた。" },
        { id: 'c26e-010', text: "俺は新しいスコアブックに、途中から入った小宮の名前を書き足した。\n田原の名前は、先発の欄に最初から書いてあった。" },
      ],
      next: 'finish-it-this-year',
    },
    'finish-it-this-year': {
      title: '今年こそ終わらせる',
      lines: [
        { id: 'c27-001', text: "夏の大会が近づくと、練習の終わりに、\n走者を置いて1打席ずつ勝負するようになった。\n今日は大山が投げ、小宮がショートに入った。\n俺はベンチの前で、走者役を待ちながら見ていた。" },
        { id: 'c27-002', text: "1塁にいた先輩がスタートを切った。\n打者が振り遅れて、球が田原のミットに入った。\n田原は立ち上がる勢いのまま2塁へ投げた。" },
        { id: 'c27-003', text: "小宮が送球を受けてグラブを下ろすと、\nちょうどそこに先輩の手が滑り込んできた。" },
        { id: 'c27-003-p1', text: "ベンチの前で、日和が「ナイススロー！」と田原に声をかけた。\n田原はマスクを上げて、軽く頭を下げた。" },
        { id: 'c27-004', speaker: 'senpai', text: "……もうちょっとだったろ。" },
        { id: 'c27-005', speaker: 'komiya', text: "もうちょっと、でしたね。" },
        { id: 'c27-006', text: "先輩は小宮のグラブを見て、それから、もう1本やらせろと立ち上がった。" },
        { id: 'c27-007', text: "去年の今ごろは、大山が投げると、その球を打てるかどうかばかり見ていた。\n今年は捕ったあとまで目が離せなかった。" },
        { id: 'c27-008', text: "日和がベンチからボールのカゴを引き寄せた。\nその横で監督が、大会の組み合わせ表を広げていた。\n折り目を開くと、最後の試合の日付が出てきた。" },
        { id: 'c27-009', speaker: 'misora', text: "……今年こそ終わらせる。" },
        { id: 'c27-010', text: "2塁から戻ってきた先輩が足を止めた。" },
        { id: 'c27-011', speaker: 'senpai', text: "聞いたか。甲子園に行くだけじゃないぞ。" },
        { id: 'c27-012', text: "大山はマウンドで、田原のほうにグラブを上げた。" },
        { id: 'c27-013', speaker: 'oyama', text: "当たり前だ。誰が負けて帰るかよ。" },
        { id: 'c27-014', text: "監督は組み合わせ表を畳み、日和に渡した。\nグラウンドでは、さっきアウトになった先輩がもう1塁に立っていた。" },
        { id: 'c27-015', speaker: 'senpai', text: "小宮、さっき俺が走ったの、いつ見えた？" },
        { id: 'c27-016', speaker: 'komiya', text: "投げる前に、先輩が2塁のほうへ体を向けたときです。\nそれで早めにベースに入りました。" },
        { id: 'c27-016a', speaker: 'senpai', text: "そこでもうバレてたか。\n平野、次お前走ってみろ。リードは今と同じで、出るまで肩を開くな。" },
        { id: 'c27-016b', speaker: 'senpai', text: "小宮、今度も走るのが見えたら、あとでどこで分かったか教えてくれ。" },
        { id: 'c27-016c', speaker: 'komiya', text: "はい。田原にも、こっちがベースに入るのが遅れたら言ってもらいます。" },
        { id: 'c27-017', text: "先輩が1塁を空けた。\n俺はベースからさっきの先輩と同じくらい離れ、\n小宮が守備位置に戻るのを待った。" },
        { id: 'c27-018', text: "その晩、神条家の居間。\n厳はテーブルに、昨夏の龍成戦の記録と、\n春からの練習試合の記録を並べていた。\n古いほうの表紙には「中田」と大きく書いてある。" },
        { id: 'c27-019', text: "武藤が本塁打にした内寄りの直球。\nその記録の横に、\n厳は今年の練習試合で田原が受けた球のコースを書き出していた。" },
        { id: 'c27-020', text: "美空が飲み物を取りに来て、テーブルの端から紙をのぞいた。" },
        { id: 'c27-021', speaker: 'misora', text: "それ、明日の分？" },
        { id: 'c27-022', speaker: 'gen', text: "そうだ。明日は走者を置いたところから始めろ。\n去年は最後まで、そこを詰めきれなかった。" },
        { id: 'c27-023', speaker: 'misora', text: "じゃ、できたら置いといて。" },
        { id: 'c27-023a', speaker: 'gen', text: "おい、どうして走者を置くのか、分かってるのか？" },
        { id: 'c27-023b', speaker: 'misora', text: "……それも書いといて。" },
        { id: 'c27-024', text: "美空が冷蔵庫を閉めて出ていくと、厳はノートを開いた。\n春の試合の記録には、田原が走者を2塁で刺した回と、\n小宮の返球で走者を3塁に進ませなかった回があった。" },
        { id: 'c27-025', speaker: 'gen', text: "大山の球は、プロに混ぜても通用するだろうな。\nだが、あの球を受けてすぐ2塁に投げられる捕手が、\n1年で入ってくるとはな。" },
        { id: 'c27-025a', text: "厳は小宮の中継が記された行を読み返した。アウトにはなっていない。\nそれでも、次の打者に回ったとき、走者は3塁ではなく2塁にいた。" },
        { id: 'c27-025b', speaker: 'gen', text: "小宮も、返す先を捕る前に決めてる。あの2人、もう夏に使えるな。" },
        { id: 'c27-026', text: "厳は新しい紙を取り、先に田原と小宮の名前を書いた。" },
      ],
      next: 'nohara-reanalysis',
    },
    'nohara-reanalysis': {
      title: '野原の再分析',
      lines: [
        { id: 'c28-001', text: "龍成の部室では、窓の外が暗くなっても、テレビの明かりがついていた。\n野原はリモコンを手に、去年の決勝を見返していた。\n画面には、まだ2対2の掲示板が映っている。" },
        { id: 'c28-002', text: "鳳翔の内野が前へ出たところで映像を止めた。\n机の上にあった古いノートを開く。\n同じように内野が前へ出た場面に、日付が2つ書いてあった。\nどちらも厳がまだ鳳翔の監督だった年だ。" },
        { id: 'c28-003', speaker: 'nohara', text: "ここで1点をやらない。神条さんなら、そうするよな。" },
        { id: 'c28-004', text: "去年はそうやって、知っている相手と試合をするつもりで準備した。\n大山が出ないと分かってからは、打つ球も絞れた。\n終わってみれば4対2。その準備で取れた点は、確かにあった。" },
        { id: 'c28-005', text: "部室の戸が開いて、選手がタブレットを持ってきた。\n野原はリモコンを置き、机の端を空けた。" },
        { id: 'c28-006', speaker: 'ryusei_player', text: "監督、佐々木の映像、やっぱり北陵戦しか見つかりません。" },
        { id: 'c28-007', speaker: 'nohara', text: "その前の練習試合は？" },
        { id: 'c28-008', speaker: 'ryusei_player', text: "撮ってあった分は見ました。打席は映ってませんでした。" },
        { id: 'c28-009', speaker: 'nohara', text: "そうか。じゃあ北陵戦、代打が出るところから頼む。" },
        { id: 'c28-010', text: "選手がテレビの入力を切り替えた。\n画面に出たのは、前年の夏に野原が見たのと同じ映像だった。" },
        { id: 'c28-011', text: "8回裏、2アウト。佐々木が打席に入る。\n野原はバットが球に当たるところで止めた。" },
        { id: 'c28-012', speaker: 'nohara', text: "北陵の投手も、投げ損なっちゃいないんだよな。" },
        { id: 'c28-013', text: "選手はテレビの前に立ったまま、答えなかった。\n映像を少し戻すと、打席へ向かう佐々木の後ろに、\nベンチへ引き返す美空が小さく映っていた。" },
        { id: 'c28-014', text: "野原は巻き戻した。もう一度、佐々木が出てくるところから見た。" },
        { id: 'c28-015', speaker: 'nohara', text: "打った理由なら、あとから何とでも言える。\nあの場面で、なんでこいつを出したんだ？" },
        { id: 'c28-015a', text: "選手は野原の顔をうかがい、少し笑ってみせた。" },
        { id: 'c28-015b', speaker: 'ryusei_player', text: "案外、適当に選んだだけだったりして。" },
        { id: 'c28-015c', speaker: 'nohara', text: "馬鹿者。負けたら終わりのあの場面で、適当に代打を出す監督がいるか。" },
        { id: 'c28-015d', speaker: 'ryusei_player', text: "す、すみません！" },
        { id: 'c28-016', text: "選手が帰ったあと、野原は今年の鳳翔の試合映像に切り替えた。\n走者が1塁に出ると、打者はバントの構えをした。\n大山は初球からストライクを取った。ノートには去年の決勝の続きではなく、\n今年の大山の投球を1球目から書いた。" },
        { id: 'c28-017', text: "ノートを閉じる前に、北陵戦をもう一度開いた。\n映像を止めたのは、本塁打のところより少し前。\n美空が打順表を膝に置き、立ち上がったところだった。" },
      ],
      next: 'ryusei-rematch',
    },
    'ryusei-rematch': {
      title: '地方予選決勝・龍成との再戦',
      lines: [
        { id: 'c29a-001', text: "決勝の日。球場に着くと、日和がスタンド下の通路にある長机を指した。\n昨日のミーティングで使ったタブレットと、龍成の記録が置いてある。" },
        { id: 'c29a-001-p1', text: "長机の端には、分厚いファイルが1冊重ねてあった。\n表紙の「中田」の字は、題名より大きい。\n去年の秋、部室で中田先輩から渡されたものだ。" },
        { id: 'c29a-001-p2', text: "打順表の写しを取りに来た3年の先輩が、そのファイルを見て足を止めた。" },
        { id: 'c29a-001-p3', speaker: 'other_senpai', text: "それ、中田先輩のか。……お前も言われただろ。\n優勝したら中田の功績だって、監督に伝えろって。" },
        { id: 'c29a-001-p4', speaker: 'hirano', text: "厳命だって言われました。" },
        { id: 'c29a-001-p5', speaker: 'other_senpai', text: "俺もだよ。引退の日に、部室の前で2回言われた。" },
        { id: 'c29a-001-p6', text: "先輩はファイルをめくった。\n龍成のページは打者ごとに分けてあって、\n打った球の横に、見送った球まで印がついていた。\n大会が始まってから、俺が何度も開いたページだ。" },
        { id: 'c29a-001-p7', speaker: 'other_senpai', text: "……悔しいけど、使えるんだよな、これ。" },
        { id: 'c29a-001-p8', text: "先輩の指が武藤の欄で止まった。\n後ろからのぞき込んだもう1人の先輩が、小さく息を吐いた。" },
        { id: 'c29a-001-p9', speaker: 'senpai', text: "武藤か。俺、中学のときあいつとやってるんだよ。" },
        { id: 'c29a-001-p10', speaker: 'senpai', text: "うちのピッチャーが内の真っすぐで詰まらせて、\n上がった瞬間、ショートの俺が手を挙げて「オーライ」って言った。" },
        { id: 'c29a-001-p11', speaker: 'senpai', text: "そしたら、挙げた手のずっと上を越えてった。\n振り返ったら、レフトのフェンスに当たって跳ねてた。" },
        { id: 'c29a-001-p12', text: "先輩は自分の左手を見た。\nそこに球が落ちてくるはずだった、という顔をしていた。" },
        { id: 'c29a-001-p13', text: "ファイルを閉じかけた先輩の手が、武藤の欄でもう一度止まった。" },
        { id: 'c29a-001-p14', text: "先輩は、グラブをはめる左手を一度握って、開いた。" },
        { id: 'c29a-001-p15', speaker: 'senpai', text: "今日は、詰まらせたら詰まらせたまま終わらせる。\n「オーライ」って言ったら、今度はちゃんと捕る。" },
        { id: 'c29a-001-p16', speaker: 'other_senpai', text: "武藤に打たれたら、その分俺が打って返す。\n中田先輩の功績にされる前に、\n俺の名前、監督に覚えてもらわねえと。" },
        { id: 'c29a-001-p17', text: "2人は打順表の写しを持たないまま、\nベンチへ降りる階段のほうへ歩いていった。\n机には、中田先輩のファイルとタブレットが残った。" },
        { id: 'c29a-002', text: "映像では、龍成の投手が長打のある打者を迎えるたび、\n捕手が初球だけ外に構えていた。\n昨日はそこまで見て、帰りのバスの時間になった。" },
        { id: 'c29a-003', speaker: 'hiyori', text: "映像、まだ見られるよ。\n先輩たちが打順表の写しを待ってるけど、どっち先にする？" },
      ],
      choices: [
        { text: '去年の記録と今大会の映像を比べる', to: 'ryusei-prepared', set: { ryuseiPrep: true } },
        { text: '先に部員の用事を片づける', to: 'ryusei-unprepared' },
      ],
    },
    'ryusei-prepared': {
      title: '地方予選決勝・龍成との再戦',
      lines: [
        { id: 'c29b-001', text: "中田先輩のファイルを開いた。\n去年の龍成戦にも、長打のある先輩に対して\n「初球、外のスライダーでストライク」とあった。\n今年の映像を続けて見ると、同じ入り方が何度も出てきた。" },
        { id: 'c29b-002', text: "長打を警戒する相手にだけ、まず外の変化球でストライクを取る。\n去年の決勝の9回、走者を2人置いた場面でも、初球はそれだった。\n俺は打順表の裏に「強打者の初球、外のスライダー。終盤も変えない」と書いた。" },
      ],
      next: 'ryusei-middle',
    },
    'ryusei-unprepared': {
      title: '地方予選決勝・龍成との再戦',
      lines: [
        { id: 'c29c-001', text: "タブレットの画面を閉じて、打順表の写しを持っていった。\nベンチの奥では、先輩たちが相手の打順に合わせて\n守備の確認を始めるところだった。" },
      ],
      next: 'ryusei-middle',
    },
    'ryusei-middle': {
      title: '地方予選決勝・龍成との再戦',
      lines: [
        { id: 'c29d-000-p1', text: "3回表。龍成の2番打者が、真ん中の真っすぐを見送って三振した。\n俺はスコアブックに、見逃しの記号を書いた。" },
        { id: 'c29d-000-p2', text: "龍成のベンチでは、戻ってきたその打者が、\nヘルメットも脱がずに座り込んでいた。" },
        { id: 'c29d-000-p3', speaker: 'ryusei_player', text: "見送ったんじゃねえ。振ろうとしたんだよ。\n……振るって決めたときには、もうミットに入ってた。" },
        { id: 'c29d-000-p4', text: "隣の選手は何も言わずに、バットを指1本ぶん短く握り直した。\n大山は次の打者にも、同じ高さへ真っすぐを投げた。" },
        { id: 'c29d-001', text: "6回表。鳳翔が3対1でリードしていた。\n1塁に走者を置いて、武藤が打席に入った。" },
        { id: 'c29d-002', text: "田原はミットを内側に寄せた。そこへ大山の真っすぐが来た。\n詰まると思った。\n武藤は肘をたたんで振り抜き、\n左翼線に沿って伸びていく打球を目で追いながら、1塁へ走り出した。" },
        { id: 'c29d-003', text: "打球が客席へ飛び込んだ。3対3。\n大山は田原から新しい球を受け取っても、しばらく武藤の背中を見ていた。" },
        { id: 'c29d-004', text: "攻守が替わるとき、龍成のベンチでは武藤がバットを立てかけていた。" },
        { id: 'c29d-005', speaker: 'muto', text: "新庄にも見せたかったな。あの球を打つとこ。" },
        { id: 'c29d-006', speaker: 'nohara', text: "見せるなら、ここを勝ってからだ。\n武藤、先頭はバントもある。1塁線を空けるな。" },
        { id: 'c29d-007', text: "武藤はまだバットの握りを確かめていた。\n隣の選手が「1塁線な」と繰り返して、ようやくグラブを取った。" },
        { id: 'c29d-008', text: "7回が終わっても、同点だった。\n鳳翔のベンチへ戻ると、スコアの初球の欄に、\n外のスライダーで取ったストライクがまた増えていた。" },
        { id: 'c29d-008-p1', text: "ベンチに戻ってきた大山が、俺のスコアブックの初球の欄を指でたたいた。" },
        { id: 'c29d-008-p2', speaker: 'oyama', text: "外のスライダー。打てそうなやつには、全部これで入ってるな。\nここまで見せたんだ。勝負どころでは変えてくる。俺が捕手ならそうする。" },
        { id: 'c29d-008-p3', text: "大山はそれだけ言って、ヘルメットを取りに行った。\n俺は初球の欄を、もう一度上から数えた。" },
      ],
      next: (f) => f.ryuseiPrep ? 'ryusei-late' : 'ryusei-recovery-choice',
    },
    'ryusei-recovery-choice': {
      title: '地方予選決勝・龍成との再戦',
      lines: [
        { id: 'c29e-001', text: "田原は次の攻撃を待ちながら、ベンチの端で水を飲んでいた。\n俺がスコアブックを開くと、田原はボトルのふたを閉めた。" },
      ],
      choices: [
        { text: '田原と龍成の初球を確認する', to: 'ryusei-recovered', set: { ryuseiRecovery: true } },
        { text: '残りの打順を確認する', to: 'ryusei-unrecovered' },
      ],
    },
    'ryusei-recovered': {
      title: '地方予選決勝・龍成との再戦',
      lines: [
        { id: 'c29f-001', text: "俺が初球の記録を見せると、田原は長打のある打者のところを順に見た。" },
        { id: 'c29f-002', speaker: 'tahara', text: "そこ、捕手が最初から外に構えてました。\nスライダーでストライクを取りに来てるんだと思います。" },
        { id: 'c29f-002-p1', speaker: 'tahara', text: "7回、走者がいたときも、そこは変えてません。\n点が動きそうな場面でも、入り方は同じでした。" },
        { id: 'c29f-003', text: "俺は「強打者の初球、外のスライダー。走者がいても変えない」と、\nあとで大山に見せられるよう書き足した。" },
      ],
      next: 'ryusei-late',
    },
    'ryusei-unrecovered': {
      title: '地方予選決勝・龍成との再戦',
      lines: [
        { id: 'c29g-001', text: "俺は残りの打順を確かめ、次に準備する打者をベンチに伝えた。\n田原は水を置き、自分の打順を確かめた。" },
      ],
      next: 'ryusei-late',
    },
    'ryusei-late': {
      title: '地方予選決勝・龍成との再戦',
      lines: [
        { id: 'c29h-001', text: "8回表。武藤が今度は左前に落とした。\n次の打者がバントで2塁へ送り、その次の安打で武藤がホームを踏んだ。\n3対4。" },
        { id: 'c29h-002', text: "その裏、鳳翔も1アウトから2塁に走者を置いた。\n俺がベンチの端に寄ると、美空が鞄から細長い紙を取り出した。\n店の名前と、新作ゲームの発売日。\nその下に「予約控え」と書いてある。" },
        { id: 'c29h-003', text: "美空は帽子のつばを上げ、風でめくれた紙をベルトに押しつけた。\n3塁側のコーチがその手を見て、走者にサインを送った。" },
        { id: 'c29h-004', text: "2塁走者がこっちを見た。美空と目が合うと、口元が引き締まった。\n投手が足を上げた瞬間、3塁へ走った。" },
        { id: 'c29h-005', text: "捕手の送球が先に届いた。\n走者が立ち上がってベンチを見ても、美空は紙から目を上げなかった。" },
        { id: 'c29h-006', text: "龍成ベンチ。野原は3塁でアウトになった走者と、\nまだ同じ姿勢で座っている美空を見比べた。" },
        { id: 'c29h-007', speaker: 'nohara', text: "（1点差で、あそこで3塁を狙わせるか。\n失敗しても顔色ひとつ変えん。……何を見ている。）" },
        { id: 'c29h-008', text: "次の打者は内野ゴロに倒れ、8回は無得点だった。\n9回裏、先頭が凡退し、その次の打者が安打で1塁に出た。\n次は大山。\n大山がヘルメットをかぶると、龍成の捕手がマウンドへ向かった。" },
        { id: 'c29h-009', text: "龍成ベンチで、野原は歩きかけた伝令を手で止めた。" },
        { id: 'c29h-010', speaker: 'nohara', text: "歩かせたら、同点の走者が2塁に行く。\n次も長打のある打者だ。ここで勝負だ。" },
        { id: 'c29h-011', text: "鳳翔ベンチ。美空は予約控えを鞄へしまった。\nまだ勝てば小遣いが入る。\n発売日に店へ行くところを思い浮かべると、口元が少し緩んだ。" },
        { id: 'c29h-012', text: "野原から見えたのは、その笑みだけだった。" },
        { id: 'c29h-013', speaker: 'nohara', text: "（あそこで走者が消えて、打順はここで大山か。\nこっちは歩かせられない。\n……まさか、あの盗塁からここまで考えていたのか？）" },
      ],
      next: (f) => (f.ryuseiPrep || f.ryuseiRecovery) ? 'ryusei-win' : 'ryusei-loss',
    },
    'ryusei-win': {
      title: '地方予選決勝・龍成との再戦',
      lines: [
        { id: 'c29i-001', text: "鳳翔のベンチを出かけた大山に、俺は打順表を差し出した。" },
        { id: 'c29i-002', speaker: 'hirano', text: "大山。外のスライダー、ここでも変えてこないと思う。\n走者がいても、終盤でも、強いやつへの初球は外から変えてない。" },
        { id: 'c29i-003', speaker: 'oyama', text: "……最後は変えてくると思ってた。\n変えねえなら、届く。" },
        { id: 'c29i-004', text: "捕手が外に構えた。球は途中から外へ曲がった。\n大山は踏み込んで、腕が伸びたところで捉えた。" },
        { id: 'c29i-005', text: "右中間へ上がった打球に、センターとライトが走った。\nフェンスの前で、2人とも足が止まった。" },
        { id: 'c29i-006', text: "先に1塁走者がホームを踏んだ。\n大山が戻ってくるまでに、ベンチに座っていたやつは1人もいなくなった。" },
        { id: 'c29i-007', text: "5対4。\n去年の決勝では書けなかった最後の欄に、俺は「本塁打」と書いた。\n日和が隣から点数をのぞき込んで、「5点」と、もう一度声に出した。" },
        { id: 'c29i-008', text: "鳳翔が甲子園へ行く。" },
      ],
      next: 'bus-to-koshien',
    },
    'ryusei-loss': {
      title: '地方予選決勝・龍成との再戦',
      lines: [
        { id: 'c29j-001', text: "大山が打席に入った。\nベースから少し離れて立つ。内を待つときの立ち方だった。\n初球は外のスライダー。大山は振らなかった。球審の右手が上がった。" },
        { id: 'c29j-002', text: "追い込まれて、大山は外の変化球にも届く位置へ足を戻した。\nそこへ、内側いっぱいに真っすぐが来た。\n詰まった打球がショートの正面へ転がった。2塁へ送られ、すぐ1塁に返ってくる。" },
        { id: 'c29j-003', text: "大山はベースを駆け抜けた。\n振り向いたとき、1塁塁審の拳が上がっていた。" },
        { id: 'c29j-004', text: "3対4。去年と違って、大山の名前は打順表にあった。\nそれでも、甲子園へ行くのは龍成だった。" },
      ],
      next: 'ryusei-summer',
    },
    'ryusei-summer': {
      title: '龍成の夏',
      lines: [
        { id: 'c29k-001', text: "整列が終わっても、大山は打席の土を見ていた。\n美空はベンチで鞄を開け、\n求人の紙が見えると、その上から予約控えをかぶせた。" },
        { id: 'c29k-002', speaker: 'misora', text: "全然終わらないよ……早く終わらせたい……。" },
        { id: 'c29k-003', speaker: 'oyama', text: "美空……。俺が、ふがいないばっかりに。" },
        { id: 'c29k-004', text: "翌日、部室を開けると、もうグラウンドでミットの音がしていた。\n日和は新しい記録帳を机に置いた。\n俺が去年のと今年のを隣に並べている間に、ミットがまた鳴った。" },
      ],
    },
    'bus-to-koshien': {
      title: '行きのバス',
      lines: [
        { id: 'cbus-001', text: "甲子園へ向かう朝、校門の前にバスが停まっていた。\n大きな用具は先輩たちが車体の下へ積み込んでいた。\n日和は入口に立って、1人乗るたびに名簿に印をつけた。" },
        { id: 'cbus-002', text: "俺が乗り込むと、大山が窓側の席にいた。\n通路側に置いていた自分の鞄をどけたので、俺はその隣に座った。" },
        { id: 'cbus-003', text: "バスが走り出してしばらくすると、後ろの席から寝息が聞こえてきた。\n大山は窓の外を見ていた。\n景色が防音壁ばかりになっても、シートに頭を預けなかった。" },
        { id: 'cbus-003a', speaker: 'oyama', text: "式は神前か……いや、教会も捨てがてえな。ふふ……。" },
        { id: 'cbus-004', speaker: 'hirano', text: "寝ないの？" },
        { id: 'cbus-005', speaker: 'oyama', text: "うるせえ。話しかけんな。" },
        { id: 'cbus-006', text: "大山はこっちも見ずに言った。\n膝の上にはグラブがあった。棚に上げるつもりはなさそうだった。" },
        { id: 'cbus-007', text: "通路を挟んだ席では、監督が窓のカーテンを閉めていた。\n日和が通りかかると、監督は声を落として呼び止めた。" },
        { id: 'cbus-008', speaker: 'misora', text: "日和ちゃん、あと何分？" },
        { id: 'cbus-009', speaker: 'hiyori', text: "さっき聞いてから、まだ5分しか経ってないですよ。" },
        { id: 'cbus-010', speaker: 'misora', text: "……そっか。" },
        { id: 'cbus-011', text: "監督はカーテンを指2本ぶんだけ開けた。\n外はまだ防音壁だった。すぐに閉めた。" },
        { id: 'cbus-012', text: "前の席の先輩が、寝返りを打つように身じろぎした。\n足元のバッグから、帽子のつばがのぞいていた。\n俺の帽子も、鞄のいちばん上に入れてある。" },
        { id: 'cbus-013', text: "バスが高速を降りると、\n窓の外を歩く人の中に、応援用のメガホンを持った人が混じり始めた。\n大山が少し前に身を乗り出した。俺も、その肩越しに外を見た。" },
        { id: 'cbus-014', speaker: 'hirano', text: "……ほんとに来たんだな。" },
        { id: 'cbus-015', text: "大山は何も言わなかった。\n窓の外を見たまま、膝の上のグラブを一度だけ握り直した。" },
      ],
      next: 'national-opponents',
    },
    'national-opponents': {
      title: '全国の相手',
      lines: [
        { id: 'c30-001', text: "甲子園のベンチから見上げると、外野席のいちばん上まで人がいた。\n日和に「平野くん、打順表」と言われて、\n俺は手に持っていた紙をようやく渡した。" },
        { id: 'c30-001-p1', text: "試合前のノックが終わり、選手がベンチの前に戻ってきた。\n日和は星浜の打順表をベンチの壁に貼り、上から指でなぞった。" },
        { id: 'c30-001-p2', speaker: 'hiyori', text: "星浜の1番から3番、地方大会の映像だと、みんな初球から振ってた。\n真っすぐを待ってるよ。ファウルでも当てたら、次は合わせてくる。" },
        { id: 'c30-001-p3', speaker: 'senpai', text: "外野はどうだった。" },
        { id: 'c30-001-p4', speaker: 'miura', text: "前に出るのは速いです。さっきのノックでも、ライトが何度も前で捕ってました。\nただ、捕ったあと一度足をそろえてから投げてます。" },
        { id: 'c30-001-p5', speaker: 'okada', text: "前で捕られても、投げるまでに一拍あるってことか。" },
        { id: 'c30-001-p6', speaker: 'senpai', text: "なら決まりだ。打ったら走れ。\n2塁にいたら、ライト前で止まるなよ。" },
        { id: 'c30-001-p7', text: "返事がそろった。\n三浦はもう、外野へ走るつもりでスパイクのひもを締め直していた。" },
        { id: 'c30-002', text: "1回表の攻撃が終わり、俺はスコアブックを守備のページに返した。\nグラブを取りに戻った先輩が、隣の小宮に声をかけた。" },
        { id: 'c30-003', speaker: 'senpai', text: "さっき監督が「小宮」って呼んでたな。お前、何したんだよ。" },
        { id: 'c30-004', speaker: 'komiya', text: "タオルがたまたま僕の足元に落ちたんです。拾って渡しただけですよ。" },
        { id: 'c30-005', text: "小宮は先輩のグラブを棚から取って渡した。\n先輩はまだ何か聞きたそうだったが、グラブをはめて守備に出た。" },
        { id: 'c30-006', text: "星浜学園は、立ち上がりから大山の球を打ちにきた。\n最初の打者が外寄りの真っすぐをファウルにすると、\n次は大山が同じところに投げた。今度はバットが振り遅れなかった。\n白球が1塁手の頭を越えた。" },
        { id: 'c30-007', text: "俺は鉛筆を持ち直した。\n県大会では、あのコースの球が振り遅れたバットを抜けて、\nそのままミットに入るところを何度も見た。" },
        { id: 'c30-008', text: "続く打者が左中間を破った。\n先頭打者がホームまで帰り、打った走者は2塁で止まった。\n田原がマウンドに来ると、大山は口元をグラブで隠して何か言った。" },
        { id: 'c30-009', text: "田原がホームに戻り、さっきより低いところにミットを構えた。" },
        { id: 'c30-010', text: "大山はマウンドの土をならし、2塁を一度だけ見てから投げた。\n次の打者は低い真っすぐに差し込まれ、打球は1塁側の客席に飛んだ。" },
        { id: 'c30-010-p1', text: "1塁の先輩が、マウンドへグラブを向けた。\n「ナイスボール！　その低さ！」" },
        { id: 'c30-010a', text: "星浜のベンチでは、次の打者がファウルの行方を見て、バットを握り直した。" },
        { id: 'c30-010b', speaker: 'hoshihama_player', text: "低いとこでも、あんなに伸びてくんのか。地方大会の映像よりキレてません？" },
        { id: 'c30-010c', speaker: 'other_hoshihama_player', text: "先頭が打てたから、いけるかと思ったんだけどな。" },
        { id: 'c30-010d', text: "次の球も低かった。今度は土の上で跳ねた。\n田原は膝を落として胸で止め、前に転がった球を拾った。\n2塁走者は、出しかけた足を引っ込めた。" },
        { id: 'c30-010e', speaker: 'hoshihama_coach', text: "捕手も見とけ。\nあれを後ろにそらさないから、大山も走者がいてあそこに腕を振れるんだ。" },
        { id: 'c30-010f', text: "監督は、素振りを再開しようとした打者を呼び止めた。" },
        { id: 'c30-010g', speaker: 'hoshihama_coach', text: "低いのまで追うな。最初の打者が打った高さを待て。" },
        { id: 'c30-010g-p1', text: "打者が打席へ向かったあとも、星浜の監督は鳳翔の捕手から目を離さなかった。" },
        { id: 'c30-010g-p2', speaker: 'hoshihama_coach', text: "先頭に打たれたあと、ミットを1つ下げただけだ。\n大山はそこへ、次の1球目から投げてきた。\n話が1回で済むバッテリーは、崩すのに手間がかかる。" },
        { id: 'c30-010g-p3', speaker: 'other_hoshihama_player', text: "構えたとこから、ミットがほとんど動かないんですよ。\nあの球を、最初に構えた場所で捕ってる。" },
        { id: 'c30-010g-p4', text: "監督は答えず、スコアブックの鳳翔の捕手の欄に、何かを書き込んだ。" },
        { id: 'c30-010h', text: "俺のスコアブックでは、1回の星浜の得点はその1点で止まった。" },
        { id: 'c30-011', text: "星浜は3回にも1点を加えた。鳳翔は4回に安打をつないで追いついた。\n5回表、2対2。走者を1塁に置いて、大山に打順が回った。" },
        { id: 'c30-012', text: "星浜の捕手は、初球から外に構えた。\n大山は外に外れた球を2球続けて見送った。\n3球目も外だったが、今度はストライクゾーンの端に残った。\n大山が踏み込んだ。打球は右中間のスタンドに入った。4対2。" },
        { id: 'c30-013', text: "ベンチに戻ってきた大山は、差し出された手を順に叩いた。\n俺が立ったままでいると、最後に俺の手も叩いた。" },
        { id: 'c30-014', speaker: 'hirano', text: "2点目取られたとき、ちょっと焦った？" },
        { id: 'c30-015', speaker: 'oyama', text: "なんでだよ。俺が打ちゃいいだろ。" },
        { id: 'c30-016', text: "7回表、1アウト1・2塁。小宮が右前に落とした。\n2塁にいたのは、\n朝、小宮が監督に名前を呼ばれたことを気にしていた先輩だ。" },
        { id: 'c30-017', text: "先輩は打球が落ちるのを見てから、一気に3塁を回った。\nライトはホームへ投げた。\n滑り込んだ先輩の手が捕手のミットより先にホームに届き、\nその返球の間に、1塁にいた走者も3塁へ進んだ。" },
        { id: 'c30-018', text: "球審が両腕を広げた。\n俺も「セーフ！」と叫んでから、まだ得点を書いていないことに気づいた。" },
        { id: 'c30-019', text: "ベンチに戻った先輩は泥を払う暇もなく、\n1塁にいる小宮に向かって拍手した。" },
        { id: 'c30-020', speaker: 'senpai', text: "小宮、いいとこ打ったな！" },
        { id: 'c30-021', text: "そう叫んだあとで、先輩は監督のほうを振り返った。" },
        { id: 'c30-022', speaker: 'senpai', text: "監督、今の俺のスライディング、見てました？" },
        { id: 'c30-023', text: "監督が顔を上げたところで、次の打者の名前が流れた。\n打者はセンターまでフライを運び、\n3塁走者は捕球を見てからホームへ走った。\n6点目が入った。" },
        { id: 'c30-024', text: "9回裏、最後の打球はショートの前で跳ねた。\n小宮が前へ出て捕り、1塁へ投げた。\n走者の足がベースに届く前に、ミットが鳴った。" },
        { id: 'c30-025', text: "6対2。スコアブックを閉じると、俺の手には鉛筆の跡がついていた。\n整列に向かう先輩のユニフォームには、\nさっきのスライディングの泥がまだついていた。" },
        { id: 'c30-025-p1', text: "その夜、宿の食堂で夕飯の皿が下げられると、日和が紙を1枚出した。\n次に当たる港南工業の、地方大会からの結果だった。" },
        { id: 'c30-025-p2', speaker: 'hiyori', text: "港南、地方大会の準々決勝から甲子園の1回戦まで、4試合ぜんぶ1点差。\n勝った試合も、1対0と2対1。" },
        { id: 'c30-025-p3', speaker: 'hirano', text: "相手の安打は、毎試合7本か8本は出てるのに。" },
        { id: 'c30-025-p4', speaker: 'hiyori', text: "うん。走者は出させてくれる。帰してくれないの。" },
        { id: 'c30-025-p5', speaker: 'okada', text: "ノーアウトで出たら、バントでも何でもいいから3塁まで進めたいな。\n3塁なら、内野ゴロでも外野フライでも帰れる。" },
        { id: 'c30-025-p6', speaker: 'miura', text: "外野フライで1点、っていうのも数に入れとかないとな。\n1本でつなぐのを待ってたら、9回が来る。" },
        { id: 'c30-025-p7', speaker: 'senpai', text: "長打は当てにすんなってことだろ。\nじゃあ、大山の前に誰か1人置いとけ。" },
        { id: 'c30-025-p8', speaker: 'oyama', text: "置いとけ。帰してやる。" },
        { id: 'c30-025-p9', text: "大山は湯のみを置いて、先に部屋へ戻っていった。\n俺はスコアブックを開き直した。\n今日の残塁の欄には、丸が4つ並んでいた。" },
        { id: 'c30-025-p10', text: "塁に出た誰かが、そこで止まったまま回が終わった印だ。\n書いているのは俺でも、あの塁に立っていたのは俺じゃない。\nそれでも、丸を1つ書くたびに腹の底が重くなった。" },
        { id: 'c30-025-p11', speaker: 'hirano', text: "次は、塁に残す人を1人でも減らしたいな。" },
        { id: 'c30-025-p12', speaker: 'hiyori', text: "港南の映像、明日の朝までにまとめておくね。" },
      ],
      next: 'konan-press',
    },
    'konan-press': {
      title: '取材と準備',
      lines: [
        { id: 'c31a-001', text: "1回戦の翌日、宿の食堂を出ると、廊下の長椅子に記者が2人座っていた。\n俺が通ると、先に立った記者が「平野くんだね」と手帳を開いた。" },
        { id: 'c31a-002', speaker: 'reporter', text: "昨日は最後まで、みんな監督のほうを見てたね。\n普段からよく声を掛けてもらうの？" },
        { id: 'c31a-002a', speaker: 'hirano', text: "え？　うーん……それは……。" },
        { id: 'c31a-003', text: "ちょうど通りかかった監督が、記者の手帳を見て足を止めた。" },
        { id: 'c31a-004', speaker: 'misora', text: "平野くん、これお願い。先に部屋戻ってるね。" },
        { id: 'c31a-005', text: "記者は俺と監督を交互に見て、「任せてもらってるんだね」と言った。\n監督はもう部屋の鍵を出していた。" },
        { id: 'c31a-005a', speaker: 'hirano', text: "はは……まあ、はい……。" },
        { id: 'c31a-006', text: "食堂から日和が顔を出した。\n手にしていたのは、部で試合映像を見るのに使っているタブレットだ。\n港南工業の1回戦を一時停止して、俺に画面を見せた。\nライトが外野のずいぶん手前で打球を拾うところだった。" },
        { id: 'c31a-007', speaker: 'hiyori', text: "向こうのライト、拾ったら足を止めずに投げてくる。\n中継を越えてホームまで来るから、2塁からでも簡単には帰れないよ。\nもう1本、似た打球があったよ。" },
        { id: 'c31a-008', text: "もう1人の記者も立ち上がった。先に来た人とは別の質問があるらしかった。" },
      ],
      choices: [
        { text: '取材対応を日和と分ける', to: 'konan-prepared', set: { konanPrep: true } },
        { text: '一人で取材を引き受ける', to: 'konan-unprepared' },
      ],
    },
    'konan-prepared': {
      title: '取材と準備',
      lines: [
        { id: 'c31b-001', text: "俺は試合の記録について答え、\n普段の練習については日和に代わってもらった。\nそのあいだに、食堂の端で映像を見直した。" },
        { id: 'c31b-002', text: "1本目は、ライトの前で高く跳ねた打球だった。\nライトは跳ね上がりに合わせて前へ出て、\n足を止めずに捕り、その足で投げた。\n返球は途中の野手を越えて、捕手まで届いた。" },
        { id: 'c31b-003', speaker: 'hirano', text: "高く跳ねても、捕るまで待ってくれないのか。" },
        { id: 'c31b-004', text: "日和が戻ってくるまでに、\nライトがどの打球を、どの高さで捕ったか、ノートに書いておいた。" },
      ],
      next: 'konan-coach-brief',
    },
    'konan-unprepared': {
      title: '取材と準備',
      lines: [
        { id: 'c31c-001', text: "俺は日和に「映像はあとで見せて」と言って、\n廊下に残り、2人の質問に答えた。\n去年の決勝のことまで聞かれて、\n食堂に戻ったときには、次のミーティングが始まっていた。" },
      ],
      next: 'konan-recovery-choice',
    },
    'konan-recovery-choice': {
      title: '取材と準備',
      lines: [
        { id: 'c31d-001', text: "試合当日。スタンド下の通路で、面会を申し込んでいた卒業生が待っていた。\n控えの選手を呼びに行こうとしたところで、\n外からボールがミットに収まる音が続けて聞こえた。\n港南工業の外野手が、ホームへの返球を練習している。" },
        { id: 'c31d-002', speaker: 'hiyori', text: "面会なら私が案内できるよ。外、見てくる？" },
      ],
      choices: [
        { text: '面会の案内を日和に任せ、外野の送球を見る', to: 'konan-recovered', set: { konanRecovery: true } },
        { text: '面会を最後まで案内する', to: 'konan-unrecovered' },
      ],
    },
    'konan-recovered': {
      title: '取材と準備',
      lines: [
        { id: 'c31e-001', text: "日和に面会を頼み、グラウンドへ出た。\nノッカーは、ライトの前でわざと高く跳ねる打球を打っていた。\nライトは跳ね上がりに合わせて前へ出て、足を止めずに捕り、\nそのままホームへ投げた。" },
        { id: 'c31e-002', text: "捕手はほとんど動かなかった。\n送球が胸の高さに届くまで、俺はライトのいた場所から目を離せなかった。" },
      ],
      next: 'konan-coach-brief',
    },
    'konan-unrecovered': {
      title: '取材と準備',
      lines: [
        { id: 'c31f-001', text: "俺は卒業生を面会場所まで案内し、選手を連れて戻った。\nグラウンドへ出たときには、\n港南工業の外野手はもうベンチに引き揚げていた。" },
      ],
      next: 'konan-ninth',
    },
    'konan-coach-brief': {
      title: '取材と準備',
      lines: [
        { id: 'c31g-001', text: "試合が始まる前に、3塁コーチを務める先輩を呼び止めた。" },
        { id: 'c31g-002', speaker: 'hirano', text: "港南のライト、肩はミーティングで見たとおりです。\nそれに、高く跳ねた球でも足を止めません。\n跳ね上がりに合わせて捕って、その足で投げてきます。" },
        { id: 'c31g-003', text: "先輩は右翼の守備位置を見てから、\n「跳ねたら一拍あると思ってた。高く跳ねても止める」と答えた。" },
      ],
      next: 'konan-ninth',
    },
    'konan-ninth': {
      title: '取材と準備',
      lines: [
        { id: 'c31h-001', text: "港南工業は、鳳翔に走者を出しても長打を許さなかった。\n6回の犠牲フライで1点は取れたが、9回裏に入っても1対2だった。" },
        { id: 'c31h-001-p1', text: "試合前のミーティングで、日和は港南のライトの映像を全員に見せていた。\n3塁コーチの先輩も、鳳翔の打者が右へ打つたびに、\nまずライトの足を見ていた。" },
        { id: 'c31h-002', text: "1アウトから、先輩の打球が左翼線の内側に落ちた。\n先輩は1塁を蹴って2塁まで行った。\n次の打者が右へ打ち返すと、ベンチで誰かが「落ちるぞ！」と叫んだ。" },
        { id: 'c31h-003', text: "白球がライトの前で跳ねた。2塁走者はもう3塁へ向かっていた。\nライトが前へ出て、跳ね上がった球を拾った。" },
      ],
      next: (f) => (f.konanPrep || f.konanRecovery) ? 'konan-win' : 'konan-loss',
    },
    'konan-win': {
      title: '取材と準備',
      lines: [
        { id: 'c31i-001', text: "3塁コーチが両手を上げた。走者はベースを踏んだところで止まった。" },
        { id: 'c31i-002', text: "返球は途中の野手を越えて捕手に届いた。\n走者がホームへ向かっていたら、まだ線の途中だったと思う。" },
        { id: 'c31i-003', text: "1アウト1・3塁。次の打者がセンターへフライを打った。\n3塁走者はベースに足を置いたまま待ち、\nセンターのグラブに球が入ると走り出した。\n今度は返球より先にホームを踏んだ。2対2。" },
        { id: 'c31i-004', text: "1塁には、右前打を打った先輩が残っていた。\n大山が打席に入ると、俺は鉛筆を置いて立ち上がった。" },
        { id: 'c31i-005', text: "大山の打球が左中間を抜けた。走者は2塁を蹴っても速度を落とさなかった。\n3塁コーチは今度は腕を回した。" },
        { id: 'c31i-006', text: "走者がホームを踏んだ。\n大山は2塁で足を止め、ベンチから飛び出してくる仲間を見てから、\nゆっくりヘルメットを脱いだ。" },
        { id: 'c31i-007', text: "3対2。日和が俺の肩を叩いた。\n俺はまだ立ったままで、日和も座ろうとはしなかった。" },
      ],
      next: 'aotake-round-three',
    },
    'konan-loss': {
      title: '取材と準備',
      lines: [
        { id: 'c31j-001', text: "白球が跳ね上がったのを見て、3塁コーチの先輩は腕を回した。\n走者は3塁を蹴ってホームへ向かった。" },
        { id: 'c31j-002', text: "返球は途中の野手を越え、捕手の胸に届いた。\n捕手は球を受け、滑り込んでくる走者の腕にグラブを当てた。" },
        { id: 'c31j-003', text: "球審が拳を上げた。\n走者は土の上に座ったまま、返球が来たほうを振り返った。" },
        { id: 'c31j-004', text: "2アウト1塁。次の打者のゴロを、港南のショートが2塁へ送った。\n大山は次の打者が待つ場所で、バットを握ったままだった。" },
        { id: 'c31j-005', text: "1対2。俺はスコアブックに、ホームでアウトになった走者の線を引いた。\n右前に落ちた瞬間は、同点になると思っていた。" },
        { id: 'c31j-005-p1', text: "整列から戻ってきた3塁コーチの先輩が、帽子のつばを握ったまま言った。" },
        { id: 'c31j-005-p2', speaker: 'senpai', text: "高く跳ねたから、捕るまで一拍あると思った。\n……あいつ、跳ねた球でも足を止めねえのか。" },
      ],
      next: 'konan-return-bus',
    },
    'konan-return-bus': {
      title: '帰りのバス',
      lines: [
        { id: 'c31k-001', text: "帰りのバスでは、大山は行きと同じ窓側に座っていた。\n今度はカーテンが閉まっていた。膝にグラブはなかった。" },
        { id: 'c31k-002', text: "通路を挟んだ窓側の席。美空は外を見ていたが、\nふと思い出したようにスマホを出し、父とのメッセージを開いた。" },
        { id: 'c31k-003', speaker: 'misora', text: "（甲子園には行ったんだし、レジの話はもういいよね。）" },
        { id: 'c31k-004', text: "美空は「甲子園には行ったからね」と父に送り、スマホを伏せた。\n窓の外に顔を向けると、ほっとしたように口元が緩んだ。" },
        { id: 'c31k-005', text: "バスが高架の下を抜けた。\n西日が窓から差し込み、美空の髪の縁が金色に光った。\n後ろの席から身を乗り出していた先輩が、\n座席の背に手をかけたまま動かなくなった。" },
        { id: 'c31k-006', speaker: 'senpai', text: "……笑ってくれた。俺らの前じゃ、最後まであんな顔してくれるんだな。" },
        { id: 'c31k-006a', text: "俺が目を開けると、先輩は手を合わせていた。\n監督は窓に顔を向けたままで、こっちを見てもいなかった。" },
        { id: 'c31k-007', speaker: 'other_senpai', text: "明日、グラウンド使えますかね。" },
        { id: 'c31k-008', text: "俺は足元の鞄を引き寄せた。\n中には、今日の試合を書いたスコアブックが入っていた。" },
      ],
    },
    'aotake-round-three': {
      title: '連戦と準決勝',
      lines: [
        { id: 'c32a-001', text: "3回戦の5回裏。\n南陵学園に1点を先に取られたまま、鳳翔は満塁で大山を迎えた。\n相手の捕手はベンチを見てから、外寄りに腰を落とした。\n前の打席では、大山に振らせる球をほとんど投げなかった。" },
        { id: 'c32a-002', text: "今度は歩かせれば同点になる。\n投手は外の端でストライクを取ろうとした。球が少し内に入った。\n大山の打球が左中間の芝を転がるあいだに、\n1塁にいた先輩までホームに帰ってきた。" },
        { id: 'c32a-003', text: "大山は2塁で手袋を締め直し、それから監督のほうへ顔を向けた。\n俺は、今ので3人帰ったと日和に言われるまで、\n最後の走者の線を書き忘れていた。" },
        { id: 'c32a-004', text: "5対1。南陵戦が終わると、日和は使い終わった打順表を外し、\nその下に挟んであった西都商業の資料を出した。" },
      ],
      next: 'aotake-quarterfinal',
    },
    'aotake-quarterfinal': {
      title: '連戦と準決勝',
      lines: [
        { id: 'c32b-001', text: "準々決勝では、先輩投手が先発し、3年の先輩がマスクをかぶった。\n田原がベンチで見ている前で、\n先輩捕手は低い変化球を何度も土の上で止めた。\n7回まで、西都の得点は2点だった。" },
        { id: 'c32b-002', text: "8回裏、2対2。2アウトから先輩捕手に打順が回った。\n初球をセンター前に打ち返すと、\n3塁走者に続いて、2塁走者もホームへ走った。" },
        { id: 'c32b-003', text: "4対2。そのまま9回を終えた。\n先輩は最後の球を受けたミットを外しながら、日和に声をかけた。" },
        { id: 'c32b-004', speaker: 'senpai', text: "さっき監督、俺が打ったとこ見てた？" },
        { id: 'c32b-005', speaker: 'hiyori', text: "その前の回、低い球を止めたのは見てましたよ。" },
        { id: 'c32b-006', text: "先輩は一度ミットを見た。\nそれから手を入れ直し、ベンチまでの最後の数歩をスキップで戻ってきた。" },
        { id: 'c32b-007', text: "その晩、宿の食堂で、日和が南陵戦の映像を出してくれた。\n最後のほうでは、田原がミットを低く出したあと、\n胸の近くまで上げて捕る球が何度かあった。" },
        { id: 'c32b-008', text: "机には、次に当たる青岳学園の打順表も置いてあった。\n先輩たちが確認する前に、書き込みを整理しておきたい。" },
      ],
      choices: [
        { text: '前の試合から大山の球の高さを記録する', to: 'aotake-prepared', set: { aotakePrep: true } },
        { text: '相手の打順を整理する', to: 'aotake-unprepared' },
      ],
    },
    'aotake-prepared': {
      title: '連戦と準決勝',
      lines: [
        { id: 'c32c-001', text: "南陵戦の映像を終盤から見直した。\n直球が高かったところを控え、同じ打者の序盤の打席と並べた。\n打たれていない球にも、構えより上へ来た直球があった。" },
        { id: 'c32c-002', speaker: 'hirano', text: "次もこうなったら、打たれる前に分かるかも。" },
        { id: 'c32c-003', text: "日和が映像を止めてくれた。\n俺は田原が構えた高さと、実際に捕った高さを、\n見比べられるように書き残した。" },
      ],
      next: 'aotake-game',
    },
    'aotake-unprepared': {
      title: '連戦と準決勝',
      lines: [
        { id: 'c32d-001', text: "青岳の打順表を取った。\n打席の左右と、走者がいるときにバントをした打者を整理し、\n守備の確認に来た先輩たちに渡した。\n南陵戦の映像は、日和が閉じてくれた。" },
      ],
      next: 'aotake-game',
    },
    'aotake-game': {
      title: '連戦と準決勝',
      lines: [
        { id: 'c32e-001', text: "準決勝。大山は初回、青岳の先頭打者を真っすぐで三振に取った。\n打者のバットは球がミットに入ってから回った。" },
        { id: 'c32e-001-p1', text: "その最後の真っすぐのとき、青岳の応援席で続いていた太鼓が、\n大山が足を上げたところで一瞬だけ途切れた。\nミットが鳴ってから、内野席のほうで遅れてどよめきが起きた。" },
        { id: 'c32e-001-p2', text: "向かいのベンチでは、手すりに肘をかけていた選手が何人か、\nその肘を下ろした。\n次の打者が打席へ向かうころには、太鼓はまた鳴っていた。" },
        { id: 'c32e-001-p3', text: "1回表が終わり、田原がマスクを外してベンチに戻ってきた。" },
        { id: 'c32e-001-p4', speaker: 'tahara', text: "1番の人、初球は見るだけでした。\n2球目からは、ミットに入る前にバットが動き出してます。\n三振でも、同じ振り方のままでは帰っていきませんでした。" },
        { id: 'c32e-001-p5', text: "俺は1番の欄の横に、何球目から振り始めたかを小さく書き足した。" },
        { id: 'c32e-001-p6', text: "2回表の守備へ出るとき、ベンチを出た先輩が、\n前を行く大山の背中に声をかけた。" },
        { id: 'c32e-001-p7', speaker: 'senpai', text: "打たせていいぞ。こっちに来たら俺が取る。" },
        { id: 'c32e-001-p8', speaker: 'oyama', text: "取れる所に立て。" },
        { id: 'c32e-001-p9', text: "先輩は言い返さず、グラブで胸を1度叩いて2塁の後ろへ走っていった。\n大山は振り返らなかった。" },
        { id: 'c32e-001-p10', text: "2回裏が終わった。3回表は、青岳の7番から。\n回の途中で、打順が1番に戻る。\n俺はスコアブックから顔を上げ、ミットをはめ直す田原を呼んだ。" },
        { id: 'c32e-001-p11', speaker: 'hirano', text: "田原、この回の途中から2巡目。\n青岳、ここまでの3試合で初回に点を取った試合はない。\n全部、打順が一回りしてからだ。" },
        { id: 'c32e-001-p12', speaker: 'tahara', text: "はい。1番の人の2球目、もう一度見ておきます。" },
        { id: 'c32e-002', text: "同じ打者が2巡目に来たときは違った。\n最初の真っすぐを1塁側へファウルにし、次はセンター前へ打ち返した。\n後ろの打者も、直球に振り遅れなくなった。" },
        { id: 'c32e-002a', text: "6回裏。次の打者が待つ場所にいた大山が、ベンチの前まで戻ってきた。\n青岳の投手がボールを2球続けて外したところだった。" },
        { id: 'c32e-002b', speaker: 'senpai', text: "次は真っすぐだな。これ以上ボールにしたくないだろ。" },
        { id: 'c32e-002c', speaker: 'oyama', text: "違う。次はスライダーだ。" },
        { id: 'c32e-002d', speaker: 'senpai', text: "え、ここで曲げるか？" },
        { id: 'c32e-002e', speaker: 'oyama', text: "グラブのほうの肘、見ろ。握り直すときだけ内に入る。\n袖の内側にしわが寄っただろ。さっき曲げたときもそうだった。" },
        { id: 'c32e-002f', text: "俺が袖に目をやったときには、もう投手が足を上げていた。\n球は打者の手前で外へ曲がった。打者は見送り、球審の手が上がった。" },
        { id: 'c32e-002g', text: "その打者が四球で出ると、大山の番になった。\n打席に入ってからは、俺も投手の袖を見た。\nグラブを胸に寄せたとき、肘の内側に布が寄った。" },
        { id: 'c32e-002h', text: "大山は初球から踏み込んだ。外へ曲がる球を捉え、1・2塁間を抜いた。\n次の打者が打ち取られ、その回は点にならなかった。" },
        { id: 'c32e-003', text: "7回表。田原がミットを膝の前に出した。\n大山の直球が来ると、田原はミットを胸まで上げた。\n打球はライト線の外に切れた。\n次の真っすぐも、ミットが最初にあったところより上へ来た。" },
        { id: 'c32e-004', text: "7回が終わって2対2。ベンチに戻った大山は水を飲み、ボトルを置いた。\nまだ投げるつもりで、グラブを膝から下ろさなかった。" },
      ],
      next: (f) => f.aotakePrep ? 'aotake-battery-brief' : 'aotake-recovery-choice',
    },
    'aotake-recovery-choice': {
      title: '連戦と準決勝',
      lines: [
        { id: 'c32f-001', text: "田原がマスクを外して、俺のそばに座った。\nグラウンドでは青岳の選手が守備についていた。" },
        { id: 'c32f-002', text: "俺は7回のページを開いた。ミットが何度か上へ動いた気がする。\n田原に聞くなら、次の攻撃が始まるまでだ。\n隣では先輩が、残りの打順を知りたがっていた。" },
      ],
      choices: [
        { text: '田原に捕球位置の変化を聞く', to: 'aotake-recovered', set: { aotakeRecovery: true } },
        { text: '残りの打順を先に確認する', to: 'aotake-unrecovered' },
      ],
    },
    'aotake-recovered': {
      title: '連戦と準決勝',
      lines: [
        { id: 'c32g-001', speaker: 'hirano', text: "最後の打者のとき、ミットが上がってたよね。構えを変えた？" },
        { id: 'c32g-002', speaker: 'tahara', text: "構えたとこは同じです。真っすぐだけ、手が上へ持っていかれる感じでした。" },
        { id: 'c32g-003', text: "俺は最後の打席だけじゃなかったと伝え、7回の記録を一緒に見た。\n田原は、低く来た変化球の行も指した。" },
      ],
      next: 'aotake-battery-brief',
    },
    'aotake-unrecovered': {
      title: '連戦と準決勝',
      lines: [
        { id: 'c32h-001', text: "俺は残りの打順を開いて、先輩に見せた。\n次の打者が呼ばれ、田原は水を飲み終えてベンチの奥へ移った。\nミットの位置を聞かないまま、鳳翔の7回裏が始まった。" },
        { id: 'c32h-002', text: "7回裏の攻撃が始まると、ベンチの奥から大山と田原の声が聞こえた。" },
        { id: 'c32h-003', speaker: 'oyama', text: "真っすぐ、浮いてたな。" },
        { id: 'c32h-004', speaker: 'tahara', text: "はい。構えたとこより上でした。でも、球の勢いは初回と変わってません。" },
        { id: 'c32h-005', speaker: 'oyama', text: "なら、次は低く投げる。真っすぐで押す。" },
        { id: 'c32h-006', speaker: 'tahara', text: "はい。あの勢いで低めに来れば、そう簡単には打てません。\n膝の前に構えます。" },
      ],
      next: 'aotake-eighth',
    },
    'aotake-battery-brief': {
      title: '連戦と準決勝',
      lines: [
        { id: 'c32i-001', text: "7回裏が終わって守備へ出る前に、俺は大山と田原を呼び止めた。" },
        { id: 'c32i-002', speaker: 'hirano', text: "7回、真っすぐだけ高くなってる。低く構えても、胸の辺りまで来てた。" },
        { id: 'c32i-002a', speaker: 'oyama', text: "分かってる。次は低く投げる。" },
        { id: 'c32i-002b', speaker: 'hirano', text: "7回は、真っすぐが1球も低く戻ってない。回の初めから終わりまでだ。" },
        { id: 'c32i-003', text: "大山はボトルのふたを閉めて、田原を見た。" },
        { id: 'c32i-004', speaker: 'tahara', text: "低い変化球は来てます。\n真っすぐが戻るのを待つより、次はそれでゴロを打たせましょう。" },
        { id: 'c32i-005', speaker: 'oyama', text: "低めだな。外すなよ。" },
        { id: 'c32i-006', text: "大山はそう言って、田原が立つより先にグラウンドへ出た。" },
      ],
      next: 'aotake-eighth',
    },
    'aotake-eighth': {
      title: '連戦と準決勝',
      lines: [
        { id: 'c32j-001', text: "8回表。青岳は2本の安打で1・3塁とした。アウトは2つ。\n3塁の走者が帰れば、青岳が勝ち越す。" },
        { id: 'c32j-002', text: "打者が右打席に入った。\n俺は膝の上のスコアブックを開いたまま、田原がどこに構えるかを見た。" },
      ],
      next: (f) => (f.aotakePrep || f.aotakeRecovery) ? 'aotake-win' : 'aotake-loss',
    },
    'aotake-win': {
      title: '連戦と準決勝',
      lines: [
        { id: 'c32k-001', text: "田原が外寄りの低いところへミットを出した。大山が投げた。\n真っすぐより遅い球が、打者の手元で沈んだ。" },
        { id: 'c32k-002', text: "打球が地面をたたいた。小宮が前に出て捕り、1塁へ投げた。\n3塁走者はホームまで走ってきたが、先に1塁でアウトが取れた。" },
        { id: 'c32k-003', text: "8回裏。小宮が左翼線へ打ち、2塁まで走った。\n次の打者がセンター前へ落とすと、小宮は3塁を回り、\n返球が捕手に届くより先にホームを踏んだ。" },
        { id: 'c32k-004', text: "3対2。9回は別の先輩がマウンドに立った。\n最後のフライをセンターが捕ると、大山はベンチから真っ先に出た。" },
        { id: 'c32k-005', text: "日和がスコアブックの隣に、決勝の予定が載った紙を置いた。\n俺はすぐにはそちらを見られなかった。最後のアウトを書いて、\n日和に「勝ったね」と言われてから、ようやく紙を受け取った。" },
      ],
      next: 'teirei-final',
    },
    'aotake-loss': {
      title: '連戦と準決勝',
      lines: [
        { id: 'c32l-001', text: "田原が低く構えた。\n大山の真っすぐは、ミットの上を通って打者の腰の高さへ来た。" },
        { id: 'c32l-002', text: "打球は1塁手と2塁手の間を抜けた。3塁走者がホームを踏んで、2対3。" },
        { id: 'c32l-003', text: "9回裏、鳳翔は1塁に走者を出した。\n最後の打球が外野手のグラブに収まるまで、俺は走者を目で追っていた。\n走者は2塁の手前で足を止めた。" },
        { id: 'c32l-004', text: "2対3。俺は今度は最後のアウトまで書いた。\n書き終えても、もう一度開く場所が見つからなかった。" },
      ],
      next: 'aotake-no-tomorrow',
    },
    'aotake-no-tomorrow': {
      title: '明日のない球場',
      lines: [
        { id: 'c32m-001', text: "決勝の日、俺たちはスタンドの階段を上がった。\nいつもは通り過ぎるだけの売店の前で止まり、\n日和が取っておいてくれた席を探した。" },
        { id: 'c32m-002', text: "選手の名前が放送で流れた。俺は反射的に膝の上を見た。\n今日は、スコアブックを持ってきていなかった。" },
        { id: 'c32m-003', speaker: 'misora', text: "……あと一つだった。" },
        { id: 'c32m-004', text: "隣の列で、先輩が帽子を目深にかぶり直した。" },
        { id: 'c32m-005', speaker: 'senpai', text: "監督、俺らのこと、まだ悔しがってくれてるんだな。" },
        { id: 'c32m-006', text: "俺は監督の横顔を見た。\n何があと一つだったのか、聞けば答えてくれたかもしれない。\nグラウンドで最初の打者が構えたので、俺も前を向いた。" },
      ],
    },
    'teirei-final': {
      title: '帝嶺学院との決勝',
      lines: [
        { id: 'c33a-001', text: "決勝の朝、スタンド下の通路にある長机で、日和がタブレットを開いていた。\n帝嶺学院の準決勝。新庄が打席に入るところで、映像が止まっていた。" },
        { id: 'c33a-001-p1', text: "通路の奥から、ウォーミングアップへ向かう先輩たちが来た。\n何人かが足を止めて、日和の画面をのぞき込んだ。\n画面の打者を、誰も確かめずに「新庄」と呼んだ。" },
        { id: 'c33a-001-p2', speaker: 'other_senpai', text: "準決勝、途中で投手替えてたよな。誰だった？" },
        { id: 'c33a-001-p3', speaker: 'hiyori', text: "2番手の左。6回から。同じ回にレフトも替えて、\nそのあと1本も打たれてないし、1つも落としてない。" },
        { id: 'c33a-001-p4', speaker: 'other_senpai', text: "替えたやつまで穴がねえのかよ。" },
        { id: 'c33a-001-p5', speaker: 'hirano', text: "小宮、春の2番、覚えてる？" },
        { id: 'c33a-001-p6', speaker: 'komiya', text: "はい。僕の前に2度来て、2度とも1塁まで速度が落ちませんでした。\n今日は、捕ったらすぐ投げます。" },
        { id: 'c33a-001-p7', text: "画面の前に最後まで残っていた先輩が、止まったままの新庄を見ていた。" },
        { id: 'c33a-001-p8', speaker: 'senpai', text: "今度こそ、あいつの前で終わりたくない。" },
        { id: 'c33a-001-p9', text: "先輩はそれだけ言うと、画面から目を離して通路を歩き出した。" },
        { id: 'c33a-001-p10', text: "最後に通りかかった大山は、足を止めずに画面を横目で見た。\n別の先輩が「新庄だけ見てりゃいい相手じゃねえぞ」と言うと、鼻で笑った。" },
        { id: 'c33a-001-p11', speaker: 'oyama', text: "当たり前だ。新庄は一度抑えても、次は合わせてくる。\nなら、その次で抑える。ほかの8人もだ。" },
        { id: 'c33a-001-p12', text: "大山はグラブを肩に担いで、通路を出ていった。\n田原が日和に頭を下げて、そのあとを追った。" },
        { id: 'c33a-002', speaker: 'hiyori', text: "春にうちとやったときの映像もあるよ。" },
        { id: 'c33a-003', text: "春の練習試合で、大山の外寄りの直球に振り遅れた新庄は、\n次の打席では足を早く踏み出し、同じコースをライトへ打った。\n昨日の映像でも、新庄の前足が、投手の腕が出るより先に土を踏んでいる。" },
        { id: 'c33a-004', text: "机の端には帝嶺の投手の資料もあった。\n先輩たちが打撃の確認に来るまでに、まだ整理できていない分がある。" },
      ],
      choices: [
        { text: '春と今大会の新庄の打席を比べる', to: 'teirei-prepared', set: { teireiPrep: true } },
        { text: '投手陣全体の資料を整理する', to: 'teirei-unprepared' },
      ],
    },
    'teirei-prepared': {
      title: '帝嶺学院との決勝',
      lines: [
        { id: 'c33b-001', text: "春と昨日の映像を、投手が踏み出すところから見比べた。\n外の直球を打ち返した場面では、どちらも前足が早めに着いていた。\nそれでも肩は開かず、体も前へ流れない。\nだから外の球を、手元まで待てる。" },
        { id: 'c33b-002', text: "俺は新庄の打順の横に、\n「前足は早いが、肩は開かない。外の直球を待てる形」と書いた。" },
      ],
      next: 'teirei-game',
    },
    'teirei-unprepared': {
      title: '帝嶺学院との決勝',
      lines: [
        { id: 'c33c-001', text: "帝嶺の投手ごとに、先発した試合と途中から投げた試合を分けた。\n確認に来た先輩に渡すと、そのまま打撃のミーティングが始まった。" },
      ],
      next: 'teirei-game',
    },
    'teirei-game': {
      title: '帝嶺学院との決勝',
      lines: [
        { id: 'c33d-001', text: "鳳翔は先攻だった。\n1回裏、先頭の新庄が大山の速球をセンター前へ打った。\n大山は次の打者に投げるまで、新庄が1塁で取ったリードを何度も見ていた。" },
        { id: 'c33d-001-p1', speaker: 'tahara', text: "ノーアウト1塁！　内野、ゴロは2つ！　無理なら1つ確実に！" },
        { id: 'c33d-001-p2', speaker: 'komiya', text: "2塁、僕が入ります！　新庄さん、走ってきます！" },
        { id: 'c33d-001a', text: "帝嶺はその回、先に1点を取った。\n鳳翔も追いつき、3回表には1アウト1塁から、打球が右中間へ抜けかけた。" },
        { id: 'c33d-001b', text: "センターの新庄が回り込んで止めた。返球は中継に入った野手の胸へ。\n1塁走者は2塁を回りかけていたが、\n新庄の手から球が離れたところで引き返した。" },
        { id: 'c33d-001c', text: "その回を無得点でしのいだ帝嶺のベンチで、\n中継に入った選手がグラブを外した。" },
        { id: 'c33d-001d', speaker: 'teirei_player', text: "新庄、助かった。抜けてたら1点だったな。" },
        { id: 'c33d-001e', speaker: 'teirei_coach', text: "止めたあともだ。返球がちょっと逸れたら、あいつらは次の塁まで来る。\n今の中継、次も頼むぞ。" },
        { id: 'c33d-001f', text: "スタンドでは、新庄の返球を見て立ち上がった客が、\n攻守が替わるまで座らなかった。" },
        { id: 'c33d-001g', speaker: 'spectator', text: "帝嶺の新庄に、鳳翔の大山か。\n決勝でこの2人が当たるなんて、そうそう見られねえぞ。" },
        { id: 'c33d-001h', text: "少し離れた席で、厳は鳳翔の走者が引き返したあたりを見ていた。" },
        { id: 'c33d-001i', speaker: 'gen', text: "新庄が止めて、中継も迷わず返す。\nあれだけ揃ってると、もうひとつ先が取れんな。" },
        { id: 'c33d-001j', text: "別の列では、河本がグラウンドに身を乗り出していた。\nプロで投げるときも、\nああいう打者に一度タイミングを合わせられると厄介だ。" },
        { id: 'c33d-001k', speaker: 'kawamoto', text: "（新庄なら、一軍の投手とやってもそう簡単には崩れない。\n……大山だって、一軍で投げてるところが想像つく。\n気に食わねえけど。）" },
        { id: 'c33d-001l', text: "6回表、俺は鳳翔の得点欄に3点目を書いた。\n2対2から、2塁の先輩がセンター前の安打で帰った。\n帝嶺は返球をきっちりつないだが、今度は先輩の足がわずかに早かった。" },
        { id: 'c33d-001m', speaker: 'hiyori', text: "帝嶺、あの打球でもホームで勝負できるんだね。" },
        { id: 'c33d-001n', speaker: 'hirano', text: "うん。でも、うちも強いよ。" },
        { id: 'c33d-001o', text: "日和はホームを見たまま、うなずいた。\nそれから、泥のついた先輩にタオルを渡しに行った。" },
        { id: 'c33d-001p', text: "8回裏。新庄が外の直球をファウルにした。\nベンチのすぐ上を通った球が、客席へ跳ねた。" },
        { id: 'c33d-001q', text: "打席を外した新庄は、バットを握り直した。\n踏み出しは早くしたつもりだった。それでも、今の球は芯を外れた。" },
        { id: 'c33d-001r', speaker: 'shinjo', text: "（足はもう着いてた。それでも芯に来ない。\n……もう半拍早く着く。手は、球が来るまで出さない。）" },
        { id: 'c33d-002', text: "新庄は次の球を左前へ打った。\n続く安打で3塁まで進み、外野フライでホームを踏んだ。3対3。\nその回を終えて田原が鳳翔のベンチに戻ってきたときには、\nもう9回の先頭打者がヘルメットをかぶっていた。" },
      ],
      next: (f) => f.teireiPrep ? 'teirei-ninth' : 'teirei-recovery-choice',
    },
    'teirei-recovery-choice': {
      title: '帝嶺学院との決勝',
      lines: [
        { id: 'c33e-001', text: "俺は8回の記録を開き、新庄の打席を思い返した。\n打球はファウルだったが、外の直球に振り遅れていなかった。\n投手が投げる直前、前足がずいぶん早く着いた気がする。" },
        { id: 'c33e-002', text: "田原は俺の隣で水を飲んでいた。\n反対側では、日和が9回に回りそうな帝嶺の走者を確認していた。" },
      ],
      choices: [
        { text: '新庄の踏み出しを田原と照合する', to: 'teirei-recovered', set: { teireiRecovery: true } },
        { text: '残りの走者の傾向をまとめる', to: 'teirei-unrecovered' },
      ],
    },
    'teirei-recovered': {
      title: '帝嶺学院との決勝',
      lines: [
        { id: 'c33f-001', speaker: 'hirano', text: "さっきの新庄、前足が着くの早くなかった？" },
        { id: 'c33f-002', speaker: 'tahara', text: "ええ。外に構えたとき、早かったです。球は引きつけてるんですけど。" },
        { id: 'c33f-003', text: "田原の「引きつけてる」で、春の打席を思い出した。\n外を打ったあの打席も、前足は早く着いたのに、肩は最後まで開かなかった。\n俺はそれを、スコアブックの新庄の欄に書き足した。" },
      ],
      next: 'teirei-ninth',
    },
    'teirei-unrecovered': {
      title: '帝嶺学院との決勝',
      lines: [
        { id: 'c33g-001', text: "俺は日和と、代走に出そうな選手を確認した。\n9回表が始まる前に、レガースを外す田原へ声をかけた。" },
        { id: 'c33g-001-p1', speaker: 'hirano', text: "新庄、前足がずっと早い。春に外を打ったときもそうだった。" },
        { id: 'c33g-001-p2', speaker: 'tahara', text: "はい、見てます。早く着くぶん、体も早く開くはずです。\n外の低い端なら、届いてもバットの先です。" },
        { id: 'c33g-001-p3', text: "田原はそう言って、9回表の打順を確かめに行った。\n俺は走者の表に戻った。" },
      ],
      next: 'teirei-ninth',
    },
    'teirei-ninth': {
      title: '帝嶺学院との決勝',
      lines: [
        { id: 'c33h-001', text: "9回表、3対3。大山は内寄りの直球をファウルにした。\n打球が3塁側のスタンドに落ちるまで、帝嶺の捕手は打球を追っていた。" },
        { id: 'c33h-001c', text: "帝嶺の内野から「詰まってるぞ、もう1球！」と声が飛んだ。\n捕手はミットを内に戻した。大山はバットを構え直した。" },
        { id: 'c33h-001a', text: "次も同じ高さに来た。\n大山はさっきより早く腰を回し、腕をたたんだまま振り抜いた。\n白球が左翼席に飛び込んだ。4対3。" },
        { id: 'c33h-001b', text: "ホームを踏んで戻ってきた大山に、先輩が手を差し出した。\n大山はその手を叩き、もう片方の手でグラブを取った。" },
        { id: 'c33h-002', text: "その裏、帝嶺は2アウトから8番と9番が続けて安打を打った。走者は1・2塁。\n打順が先頭に戻り、場内アナウンスが新庄の名前を呼んだ。" },
        { id: 'c33h-002a', text: "打席へ向かう新庄は2塁走者と目を合わせた。\n走者がうなずくのを見てから、白線をまたいだ。" },
        { id: 'c33h-002b', speaker: 'teirei_player', text: "2塁、打ったらすぐだ！　1塁も前の走者を見ろ！" },
        { id: 'c33h-002c', speaker: 'komiya', text: "内野、取ったら1塁！　外野、抜けたら俺が入ります！" },
        { id: 'c33h-002d', text: "ライトがグラブを上げた。\n1塁の先輩はベースを踏み直し、こっちへ「任せろ」と返した。" },
        { id: 'c33h-002e', speaker: 'hiyori', text: "2アウト。あと1つ。" },
        { id: 'c33h-002f', text: "日和はグラウンドへ声を出したまま、俺が開いている記録を片手で押さえた。\nページが止まって、ようやく自分の手が震えていたのが分かった。" },
      ],
      next: (f) => (f.teireiPrep || f.teireiRecovery) ? 'teirei-battery-brief' : 'teirei-loss',
    },
    'teirei-battery-brief': {
      title: '帝嶺学院との決勝',
      lines: [
        { id: 'c33i-001', text: "帝嶺が1塁に代走を送った。\n球審が交代を確認しているあいだに、ベンチの前まで来た田原を呼び止めた。" },
        { id: 'c33i-002', speaker: 'hirano', text: "新庄、前足は早いけど、肩は開いてない。\n春に外の真っすぐを打ったときも、同じ形だった。\n早く着いて、外を手元まで待ってる。" },
        { id: 'c33i-003', text: "田原は新庄の素振りを一度見た。" },
        { id: 'c33i-003a', speaker: 'tahara', text: "早く着くぶん、開くのも早いと思ってました。\n肩が残るなら、外の端でも届きます。" },
        { id: 'c33i-004', speaker: 'tahara', text: "分かりました。外からは入りません。" },
        { id: 'c33i-005', text: "田原はマウンドまで行き、大山に短く何か言った。\n大山は新庄を一度見て、グラブの中で球を握り直した。" },
      ],
      next: 'teirei-win',
    },
    'teirei-win': {
      title: '帝嶺学院との決勝',
      lines: [
        { id: 'c33j-001', text: "1球目。田原が内寄りに構え、大山が膝の高さに直球を投げた。\n新庄は引っ張って、3塁側へ鋭いファウルを打った。" },
        { id: 'c33j-001a', speaker: 'teirei_player', text: "合ってるぞ、新庄！　今のタイミングだ！" },
        { id: 'c33j-001b', text: "次の球は膝より下。新庄はバットを止めた。\n2塁走者がリードを取り直す間に、田原はもう一度、内側にミットを置いた。" },
        { id: 'c33j-001c', text: "1ボール1ストライク。\n大山の3球目は、さっきの直球と同じ高さから、新庄の手元で沈んだ。" },
        { id: 'c33j-002', text: "新庄のバットが先に出た。\nそれでも手首を返さず、沈む球をバットの先で拾った。\n打球は大山の横を抜けた。" },
        { id: 'c33j-002a', speaker: 'senpai', text: "小宮、1塁！" },
        { id: 'c33j-003', text: "小宮は新庄が振ったときには、もう2塁ベースのほうへ踏み出していた。\nそれでも、追いついたのはグラブの先だった。\n球をつかむと、立ち上がる間もなく、片膝をついたまま1塁へ投げた。" },
        { id: 'c33j-004', text: "1塁手がベースに片足を残し、腕を伸ばした。\n新庄の足がベースを踏むのと、球がミットに入るのが、\n俺にはほとんど同時に見えた。" },
      ],
      next: 'last-out',
    },
    'teirei-loss': {
      title: '帝嶺学院との決勝',
      lines: [
        { id: 'c33k-001', text: "1球目。田原が外へ構えると、新庄は前足を早く着けた。\n大山の球は膝の下へ外れた。新庄は動かなかった。" },
        { id: 'c33k-001a', text: "2球目は外寄りの直球。新庄は振って、1塁側の客席へファウルにした。" },
        { id: 'c33k-001b', speaker: 'teirei_player', text: "新庄、見えてるぞ！　もう1球！" },
        { id: 'c33k-001m', text: "田原がタイムを取って、マウンドへ走った。ベンチまで声は届かない。\nマウンドの上で、田原はミットで口元を隠した。" },
        { id: 'c33k-001n', speaker: 'tahara', text: "新庄さん、外に合わせてきてます。\nでも前足が早いぶん、体も早く開いてます。\n外の低いとこなら、届いてもバットの先です。" },
        { id: 'c33k-001o', speaker: 'oyama', text: "なら外だ。今のより低く、端に構えろ。" },
        { id: 'c33k-001c', text: "1ボール1ストライク。田原がまた外に構えた。\n大山の直球はミットの出たところへ向かう。\n新庄は前足を先に着け、さっきよりわずかに長く球を待った。" },
        { id: 'c33k-001q', speaker: 'shinjo', text: "（開かせたいんだろ。……なら、肩は最後まで残す。）" },
        { id: 'c33k-002', text: "新庄は外の球を右翼線へ運んだ。\nライトが横へ走ったが、打球はその先で跳ね、フェンスまで転がった。\n2塁走者が帰った。1塁の走者も、打った瞬間から走っていた。" },
        { id: 'c33k-002a', text: "帝嶺の3塁コーチが腕を回した。走者がベースを蹴った。\n鳳翔のベンチでも、俺と先輩の声が重なった。" },
        { id: 'c33k-002b', text: "「ホーム！」" },
        { id: 'c33k-003', text: "ライトからの返球を小宮が受け、すぐにホームへつないだ。\n田原は球を捕って走者の手へグラブを伸ばした。\n手がホームに触れたのが、一瞬早かった。" },
        { id: 'c33k-004', text: "4対5。帝嶺の選手が一斉に飛び出して、新庄のところへ走っていった。\n大山はマウンドに立ったまま、田原のミットを見ていた。" },
      ],
      next: 'teirei-champion-shinjo',
    },
    'teirei-champion-shinjo': {
      title: '優勝したのは、彼だった',
      lines: [
        { id: 'c33l-001', text: "表彰が終わったあと、スタンド下の通路で新庄が美空に声をかけた。\n優勝旗を運ぶ帝嶺の選手たちが、少し離れたところで待っていた。" },
        { id: 'c33l-002', speaker: 'shinjo', text: "神条監督。今日の最後の打席、見ていただけましたか。" },
        { id: 'c33l-003', text: "美空は足を止めた。\n新庄の顔を少し睨むように見て、何も言わずに振り向いた。\n通路の先で日和が鞄を持って待っていた。" },
        { id: 'c33l-004', text: "新庄は美空を追わなかった。\nしばらく背中を見送ってから、小さく息を吐いた。" },
        { id: 'c33l-005', speaker: 'shinjo', text: "……あの人にとって、俺は最後に倒す相手だったんだな。" },
        { id: 'c33l-006', text: "帝嶺の選手が「柔斗、写真」と呼んだ。\n新庄は「今行く」と返し、そちらへ歩きかけてから、俺に向き直った。" },
        { id: 'c33l-007', speaker: 'shinjo', text: "プロでも野球を続けるつもりです。\n大山くんにも、またやろうって伝えてください。" },
        { id: 'c33l-008', text: "大山に伝えるまでもなかった。\n少し先で待っていた大山は、俺が追いつくと\n「来年は俺が取る」とだけ言った。" },
        { id: 'c33l-009', text: "スコアブックは鞄に入れたはずだった。\nバスに乗ると、俺はまた出して、9回裏を開いた。" },
      ],
    },
    'last-out': {
      title: '最後のアウト',
      lines: [
        { id: 'clastout-001', text: "伸びきった1塁手のミットが閉じた。\n新庄はベースを駆け抜け、2歩目で肩越しに塁審を見た。" },
        { id: 'clastout-002', text: "俺も塁審を見ていた。\nボールがミットに入る音は、スタンドの声にかき消されていた。\n隣の日和が何か言った。口が動いたのは見えたが、聞き取れなかった。" },
        { id: 'clastout-003', text: "塁審の右の拳が上がった。" },
        { id: 'clastout-004', text: "小宮はまだ土の上に片膝をついていた。\n1塁手がミットを高く掲げると、小宮もようやく立ち上がった。" },
        { id: 'clastout-005', text: "日和が俺の袖をつかんだ。今度は俺も日和を見た。\n何か言おうとしたが、口を開けたまま、声が出なかった。" },
        { id: 'clastout-006', text: "膝の上に、スコアブックが開いたままになっていた。\n9回裏の新庄の欄だけが空いていた。" },
      ],
      next: 'first-koshien-title',
    },
    'first-koshien-title': {
      title: '甲子園初優勝',
      lines: [
        { id: 'c34-001', text: "大山はマウンドを降りかけて、足を止めた。まだ1塁を見ていた。\n田原がマスクを外して走ってきて、大山の肩を両手でつかんだ。" },
        { id: 'c34-002', speaker: 'tahara', text: "大山先輩、勝ちましたよ。" },
        { id: 'c34-003', text: "そこで大山が笑った。\n何か言い返す前に、外野から駆けてきた先輩たちが両側から飛びついた。\nいつもなら振り払うところを、今度は大山も、\n空いたほうの腕で先輩の背中を引き寄せた。" },
        { id: 'c34-004', text: "1塁手が小宮を見つけて、ミットを掲げたまま駆け寄った。\n小宮はユニフォームについた土を払おうとしていたが、\n肩を抱かれると、その手で先輩の背中を叩いた。" },
        { id: 'c34-005', text: "鳳翔の応援席では、中田が立ち上がっていた。\nフェンス越しにグラウンドへ何か叫んで、もう一度跳ねた。\n隣の先輩が差し出したタオルに気づいたのは、\n顔を手の甲でぬぐったあとだった。" },
        { id: 'c34-006', text: "日和が俺の袖を離した。" },
        { id: 'c34-007', speaker: 'hiyori', text: "平野くん、私たち……。" },
        { id: 'c34-008', text: "その先が出てこなかった。\n日和は口元を手で押さえたまま、もう一度グラウンドを見た。\n俺も隣で、すぐには返事ができなかった。" },
        { id: 'c34-009', text: "去年の夏、最後のアウトを書けずに、スコアブックを鞄にしまった。\n書くことは分かっているのに、今日も鉛筆の先がなかなか紙につかなかった。" },
        { id: 'c34-010', text: "膝の上のスコアブックを机に置いて、鉛筆を持ち直した。\n小宮が捕って、1塁へ投げた。俺は新庄の欄に「遊ゴロ」と書いた。\nその下に、鳳翔4、帝嶺3。" },
        { id: 'c34-011', text: "日和が机の端に手をつき、俺と一緒に数字を見た。" },
        { id: 'c34-012', speaker: 'hirano', text: "勝ったね。" },
        { id: 'c34-013', speaker: 'hiyori', text: "……うん。" },
        { id: 'c34-014', text: "日和はうなずいてから、もう一度、今度は声を出して笑った。" },
        { id: 'c34-015', text: "球場の放送で、優勝校として鳳翔高校の名前が呼ばれた。\nグラウンドでは、やっと大山の顔が仲間の肩の間から見えた。" },
        { id: 'c34-016', text: "鳳翔高校、甲子園初優勝。" },
      ],
      next: 'public-proposal',
    },
    'public-proposal': {
      title: '公開求婚',
      lines: [
        { id: 'c35-001', text: "歓声がようやく落ち着いてきたころ、係の人が大山をベンチ前へ呼んだ。\nマイクを持ったインタビュアーの後ろに、テレビカメラが1台ついてきた。" },
        { id: 'c35-002', text: "俺はスコアブックを抱えて、日和とベンチの出口に立った。\n監督はその少し先で、インタビューが終わるのを待っていた。" },
        { id: 'c35-003', speaker: 'interviewer', text: "9回のホームラン、お見事でした。内角の厳しい球でしたね。" },
        { id: 'c35-004', speaker: 'oyama', text: "俺様ほどならあれくらい楽勝だ。それよりマイク寄こせ。" },
        { id: 'c35-005', text: "鳳翔の応援席から拍手が起きた。\n大山はそっちを見ずに、インタビュアーの手元へ手を伸ばした。" },
        { id: 'c35-006', speaker: 'interviewer', text: "えっ、ちょっと――" },
        { id: 'c35-007', text: "インタビュアーが言い終える前に、大山はマイクを取った。" },
        { id: 'c35-008', text: "大山は体ごと監督のほうを向き、マイクを口元に上げた。" },
        { id: 'c35-009', speaker: 'oyama', text: "美空！　待たせたな！　甲子園で優勝したぞ。俺と結婚だ！" },
        { id: 'c35-010', text: "「俺と結婚だ！」が、スピーカーから外野席まで響いた。\nグラウンドでまだ笑っていた先輩たちの声が、そこで途切れた。" },
        { id: 'c35-011', text: "スタンドのどこかから「おおーっ！」と声が上がった。\n拍手がその声を追いかけるように広がり、\n今度は相手側のスタンドからも口笛が鳴った。" },
        { id: 'c35-012', speaker: 'senpai', text: "ああああっ！　大山、お前、先に言うなぁ！" },
        { id: 'c35-013', text: "大山の後ろにいた先輩が、飛び出しかけて隣の選手にぶつかった。\nぶつかられたほうも同じ方向へ飛び出しかけていた。" },
        { id: 'c35-014', text: "鳳翔の応援席。手すりから身を乗り出した中田が、\n首に掛けていたタオルを両手で引っ張った。" },
        { id: 'c35-015', speaker: 'nakata', text: "そいつの前に俺のファイルを読んでください、監督ーっ！" },
        { id: 'c35-016', text: "帝嶺のベンチ前で、新庄は脱いだ帽子を手に持ったまま、大山を見ていた。" },
        { id: 'c35-017', speaker: 'shinjo', text: "け、結婚？　……はは……すごいな、彼は。" },
        { id: 'c35-018', text: "インタビュアーが大山に手を差し出した。\n大山はマイクを返し、美空のほうへ顎をしゃくった。\nカメラが監督に向き直ると、\nベンチの出口で、日和が息を吸う音が俺のすぐ隣で聞こえた。" },
        { id: 'c35-019', text: "監督は大山のほうを向いた。\n口元が緩んだだけじゃなかった。目を細めて、歯が見えるほど笑った。\n俺は監督があんなふうに笑うところを、初めて見た。" },
        { id: 'c35-020', speaker: 'oyama', text: "（ほらな。）" },
        { id: 'c35-021', text: "監督は差し出されたマイクを両手で受け取った。" },
      ],
      next: 'real-promise',
    },
    'real-promise': {
      title: '本当の約束',
      lines: [
        { id: 'c36-001', text: "監督はマイクを口元まで持ち上げた。大山は、もう一歩そっちへ出た。" },
        { id: 'c36-002', speaker: 'misora', text: "やったー！　私、今日で監督辞めまーす！　引き籠れるー！" },
        { id: 'c36-003', text: "拍手が止まった。外野席のほうで、少し遅れて笛がひとつ鳴った。" },
        { id: 'c36-004', speaker: 'senpai', text: "え？" },
        { id: 'c36-005', text: "鳳翔の応援席で、母親のひとりが、隣の人の腕に触れた。\n膝の上にはまだ、広げたままの応援タオルがあった。" },
        { id: 'c36-006', speaker: 'hosho_mother', text: "今、なんて？" },
        { id: 'c36-007', speaker: 'oyama', text: "……ん？" },
        { id: 'c36-008', text: "監督はもう大山を見ていなかった。\nマイクを持ったまま、鳳翔の応援席を見上げた。" },
        { id: 'c36-009', speaker: 'misora', text: "お父さん！　約束どおりでいいよね？" },
        { id: 'c36-010', text: "厳は応援席のいちばん前まで下りてきていた。\n手すりにかけた手の下で、握ったままの帽子がつぶれた。" },
        { id: 'c36-011', speaker: 'misora', text: "甲子園で優勝したら監督辞めて、ずっと家にいていいって言ったよね。\nこれでもう、働きに出なくていいんだよね？" },
        { id: 'c36-012', text: "大山の口が開いた。何か言いかけて、監督の顔を見直した。" },
        { id: 'c36-013', text: "応援席で、厳は掲示板を見た。4対3。\n最後のアウトが決まった瞬間、席を立って隣の客と手を叩き合わせた。\nその手で、今は帽子を握りつぶしていた。" },
        { id: 'c36-014', text: "厳には、県大会でさえ勝ち切れない年が続いた記憶があった。\nあの条件なら、\n監督を続けるうちに外で人と関わることにも慣れるだろうと思った。\n掲示板の数字は、何度見ても変わらなかった。" },
        { id: 'c36-015', speaker: 'gen', text: "……い、いや、その、あれは……言葉の綾というか……。" },
        { id: 'c36-016', speaker: 'misora', text: "でも言ったよね！" },
        { id: 'c36-017', text: "厳の視線が掲示板から娘に戻った。\n手すりの下で、美空はさっきと同じ顔で笑っていた。" },
        { id: 'c36-018', speaker: 'gen', text: "う……うん……。" },
        { id: 'c36-019', text: "ベンチの出口で、日和が俺のほうを向いた。俺も日和を見た。\nインタビュアーが美空のマイクに手を伸ばし、途中で止めた。" },
        { id: 'c36-020', text: "監督はマイクを持ったまま、うれしそうに両腕を上げた。" },
        { id: 'c36-021', text: "ええええええーっ！？" },
      ],
    },
  },

  // 演出は行IDで指定する。背景（場所の切り替え）と、立ち絵の登場・退場
  cues: [
    // 背景。場所が変わる行で切り替える。キットは通ったルートではなく本文の並び順で背景を戻すので、
    // 分岐の入口・合流点を含め、すべての場面の最初の行で背景を明示する（別ルートの背景が残らないようにする）。
    { at: 'c01-001', bg: 'hosho-field-fence-morning' }, // 5-1：朝、フェンスの外からグラウンドを見る
    { at: 'c02-001', bg: 'hosho-classroom' }, // 5-2：教室。c02-006（練習着に着替えて門から入る）でグラウンドへ戻る
    { at: 'c02-006', bg: 'hosho-field-afternoon' }, // 放課後、練習着で門からグラウンドへ入る
    { at: 'c02i-001', bg: 'hosho-field-afternoon' }, // 分岐：内野
    { at: 'c02o-001', bg: 'hosho-field-afternoon' }, // 分岐：外野
    { at: 'c02e-001', bg: 'hosho-field-afternoon' }, // 合流：給水台・球拾い
    { at: 'c02e-012', bg: 'hosho-field-sunset' }, // 日が傾いて球拾い（〜c02e-017）。夕方の差分
    { at: 'c02e-018', bg: 'school-station-road-evening' }, // 駅までの道を歩く（〜c02e-019）。c03-001 で翌日のグラウンドへ
    { at: 'c03-001', bg: 'hosho-field-afternoon' }, // 5-3：翌日の練習
    { at: 'c03-012', bg: 'hosho-field-bench' }, // ベンチでスコアブックを任される
    { at: 'c03-040-p1', bg: 'insert-pitch-grip' }, // 挿絵：大山がマウンドに上がり、投げる前の手元
    { at: 'c03-041', bg: 'hosho-field-bench' }, // 挿絵の解除：この行に本来ある背景（c03-012 からのベンチ）へ戻す
    { at: 'c04-001', bg: 'hosho-field-bench' }, // 5-4：ベンチで記録を埋めている
    { at: 'c05-001', bg: 'hosho-field-bench' }, // 5-5：練習後のベンチ
    { at: 'c05o-001', bg: 'hosho-field-bench' }, // 分岐：大山に聞く
    { at: 'c05s-001', bg: 'hosho-field-bench' }, // 分岐：先輩に聞く
    { at: 'c05e-001', bg: 'hosho-field-bench' }, // 合流
    { at: 'c05b-001', bg: 'hosho-field-afternoon' }, // 幕間：ネット前でティー打撃
    { at: 'c06-001', bg: 'hosho-field-bench' }, // 5-6：ベンチからバント守備を記録
    { at: 'c06a-001', bg: 'hosho-field-bench' }, // 分岐：監督に聞く
    { at: 'c06b-001', bg: 'hosho-field-bench' }, // 分岐：ベンチ脇の棚の資料
    { at: 'c06e-001', bg: 'hosho-field-bench' }, // 合流：給水中のベンチ前
    { at: 'c07-001', bg: 'hosho-field-bench' }, // 5-7：ベンチ前
    { at: 'c07-023', bg: 'hosho-field-afternoon' }, // 外周に出る門へ向かってグラウンドを歩く
    { at: 'c07-032', bg: 'hosho-field-bench' }, // ベンチへ引き返す
    { at: 'c08-001', bg: 'hosho-field-bench' }, // 5-8：ベンチの端で紙を渡される
    { at: 'c08b-001', bg: 'hosho-clubroom' }, // 幕間：部室
    { at: 'c09-001', bg: 'hosho-field-bench' }, // 5-9：練習帰りのベンチ
    { at: 'c09d-001', bg: 'hosho-field-bench' }, // 分岐：飲み物
    { at: 'c09t-001', bg: 'hosho-field-bench' }, // 分岐：用具
    { at: 'c09e-001', bg: 'hosho-vending-area' }, // 合流：翌日、自販機の前で佐々木と話す。c09e-006（部室へ戻る）で部室へ
    { at: 'c09e-006', bg: 'hosho-clubroom' }, // 部室に戻る
    { at: 'c10-001', bg: 'hosho-field-bench' }, // 5-10：練習後のベンチ
    { at: 'c11s-001', bg: 'hosho-field-bench' }, // 5-11：ベンチ
    { at: 'c11m-001', bg: 'hosho-field-afternoon' }, // 回想：就任初日、グラウンドに整列
    { at: 'c11m-021', bg: 'hosho-school-exterior' }, // 回想：外周を走り、校舎の角を曲がる。c11m-029（1周して戻る）でグラウンドへ
    { at: 'c11m-029', bg: 'hosho-field-afternoon' }, // 回想：1周して監督の前に戻る
    { at: 'c11p-001', bg: 'hosho-field-bench' }, // 現在：ベンチ
    { at: 'c11a-001', bg: 'hosho-field-bench' }, // 分岐：平野が聞く
    { at: 'c11w-001', bg: 'hosho-field-bench' }, // 分岐：大山を待つ
    { at: 'c11e-001', bg: 'hosho-field-bench' }, // 合流
    { at: 'c12-001', bg: 'hosho-field-bench' }, // 5-12：ベンチの奥
    { at: 'c13-001', bg: 'hosho-field-bench' }, // 5-13：鳳翔での練習試合（ベンチ）
    { at: 'csummer-001', bg: 'hosho-clubroom' }, // 幕間：部室
    { at: 'csummer-010', bg: 'hosho-field-afternoon' }, // 練習：打撃ケージ
    { at: 'csummer-014', bg: 'hosho-clubroom' }, // 帰り支度の部室
    { at: 'c14-001', bg: 'regional-stadium-dugout' }, // 5-14：準々決勝のベンチ
    { at: 'c15-001', bg: 'regional-stadium-dugout' }, // 5-15：ベンチ
    { at: 'c15-008', bg: 'hosho-school-corridor' }, // 回想：名簿を持って監督を追い、廊下で佐々木の登録を確かめる。c15-014（回想の終わり）で試合中のベンチへ
    { at: 'c15-014', bg: 'regional-stadium-dugout' }, // ベンチに戻る
    { at: 'c16-001', bg: 'regional-stadium-dugout' }, // 5-16：ベンチ
    { at: 'c16-004', bg: 'regional-stadium-field' }, // 佐々木が打席から見る景色
    { at: 'c16-005a', bg: 'regional-stadium-dugout' }, // 北陵ベンチ
    { at: 'c16-005d', bg: 'regional-stadium-field' }, // 1塁の大山
    { at: 'c16-005c', bg: 'regional-stadium-dugout' }, // 鳳翔ベンチ
    { at: 'c16-007', bg: 'regional-stadium-field' }, // 投球から本塁打、生還まで
    { at: 'c16-015', bg: 'regional-stadium-dugout' }, // ベンチが沸く
    { at: 'c16-022', bg: 'regional-stadium-concourse' }, // 整列後、スタンド下の通路で取材
    { at: 'cnews-001', bg: 'hosho-clubroom' }, // 幕間：部室の机に新聞
    { at: 'c17-001', bg: 'hosho-clubroom' }, // 5-17：スコアの清書（部室）
    { at: 'c17-002', bg: 'regional-stadium-dugout' }, // 思い返す北陵戦のベンチ
    { at: 'c17-007', bg: 'kamijo-living-room-night' }, // 準決勝の前夜、神条家の居間
    { at: 'c18-pre-a', bg: 'hosho-field-afternoon' }, // 5-18：全体練習のあと、ポール間を走る
    { at: 'c18-pre-f', bg: 'oyama-home-exterior-night' }, // その晩、大山家の前でダッシュし、夕飯に呼ばれる。c18-pre-k（玄関）で家の中へ
    { at: 'c18-pre-k', bg: 'oyama-home-entry' }, // 玄関で靴を脱ぎ捨てる
    { at: 'c18-001', bg: 'regional-stadium-dugout' }, // 翌日、準決勝のベンチで記録
    { at: 'c18-003', bg: 'regional-stadium-field' }, // ライトの捕球と負傷
    { at: 'c18-010', bg: 'regional-stadium-dugout' }, // ベンチから見る
    { at: 'c18-017', bg: 'hospital-waiting-room' }, // 病院の待合室。c18-018（診察室）で診察室へ
    { at: 'c18-018', bg: 'hospital-exam-room' }, // 診察室
    { at: 'c19-001', bg: 'regional-stadium-dugout' }, // 5-19：決勝のベンチ
    { at: 'c19-021', bg: 'regional-stadium-field' }, // 武藤の本塁打
    { at: 'c19-024', bg: 'regional-stadium-dugout' }, // ベンチ
    { at: 'c19-028', bg: 'regional-stadium-field' }, // 最後の打球
    { at: 'c19-032', bg: 'regional-stadium-dugout' }, // ベンチ
    { at: 'c20-001', bg: 'regional-stadium-dugout-sunset' }, // 5-20：敗戦直後のベンチ（夕日）
    { at: 'cblank-001', bg: 'hosho-clubroom' }, // 幕間：学校へ戻った部室
    { at: 'cblank-011', bg: 'hirano-room' }, // 夏休み、平野の部屋で大山からのメッセージを受ける（〜cblank-013）。机が隠れないよう立ち絵は出さない。c21-001 でグラウンドへ
    { at: 'c21-001', bg: 'hosho-field-afternoon' }, // 5-21：グラウンドの外野フェンス際
    { at: 'c21-009', bg: 'hospital-exam-room' }, // 病院で再診
    { at: 'c21-017', bg: 'hospital-corridor' }, // 診察室を出た病院の廊下。c21-018 でグラウンドへ
    { at: 'c21-018', bg: 'hosho-field-afternoon' }, // 誰もいないグラウンドでキャッチボール
    { at: 'c22-001', bg: 'hosho-clubroom' }, // 5-22：部室
    { at: 'c23-001', bg: 'hosho-clubroom' }, // 5-23：部室
    { at: 'c23-005', bg: 'kamijo-living-room-night' }, // その晩、神条家の居間
    { at: 'c24-001', bg: 'station-plaza-autumn' }, // 5-24：駅前の広場
    { at: 'c24a-001', bg: 'station-plaza-autumn' }, // 分岐：弟だと伝える
    { at: 'c24b-001', bg: 'station-plaza-autumn' }, // 分岐：荷物を届ける（駅の入口）
    { at: 'c24e-001', bg: 'station-plaza-autumn' }, // 合流
    { at: 'c25-001', bg: 'regional-stadium-concourse' }, // 5-25：練習試合の球場、スタンド下の通路
    { at: 'cwinter-001', bg: 'hosho-clubroom' }, // 章間：12月の練習後
    { at: 'cwinter-021', bg: 'hosho-field-afternoon' }, // 章間：翌日の投内連係（グラウンド）
    { at: 'csecond-001', bg: 'hosho-clubroom' }, // 幕間：2年の最初の朝練、部室
    { at: 'csecond-009', bg: 'hosho-field-fence-morning' }, // グラウンドの入口に新入生
    { at: 'c26-001', bg: 'hosho-field-fence-morning' }, // 5-26：入口の新入生
    { at: 'c26a-001', bg: 'hosho-field-afternoon' }, // 分岐：ブルペン（朝。光は目立たないと判断）
    { at: 'c26b-001', bg: 'hosho-field-afternoon' }, // 分岐：内野のノック
    { at: 'c26e-001-p1', bg: 'hosho-field-bench' }, // 合流：5月の帝嶺との練習試合。鳳翔のグラウンドで開催（ベンチで記録し、試合後に片づける）
    { at: 'c27-001', bg: 'hosho-field-bench' }, // 5-27：練習の終わり、ベンチの前
    { at: 'c27-002', bg: 'insert-cleats-dirt' }, // 挿絵：1塁の先輩がスタートを切る瞬間
    { at: 'c27-003', bg: 'hosho-field-bench' }, // 挿絵の解除：ベンチの前へ戻す
    { at: 'c27-018', bg: 'kamijo-living-room-night' }, // その晩、神条家の居間
    { at: 'c28-001', bg: 'ryusei-clubroom-night' }, // 5-28：夜の龍成の部室で記録と映像を見直す（場面全体）
    { at: 'c29a-001', bg: 'regional-stadium-concourse' }, // 5-29：スタンド下の通路の長机
    { at: 'c29b-001', bg: 'regional-stadium-concourse' }, // 分岐：映像を見る
    { at: 'c29c-001', bg: 'regional-stadium-dugout' }, // 分岐：打順表をベンチへ
    { at: 'c29d-000-p1', bg: 'regional-stadium-dugout' }, // 合流：6回表
    { at: 'c29d-002', bg: 'regional-stadium-field' }, // 武藤の同点本塁打
    { at: 'c29d-004', bg: 'regional-stadium-dugout' }, // 龍成ベンチ
    { at: 'c29e-001', bg: 'regional-stadium-dugout' }, // 当日確認の選択
    { at: 'c29f-001', bg: 'regional-stadium-dugout' }, // 分岐：田原と確認
    { at: 'c29g-001', bg: 'regional-stadium-dugout' }, // 分岐：確認しない
    { at: 'c29h-001', bg: 'regional-stadium-dugout' }, // 合流：8回
    { at: 'c29i-001', bg: 'regional-stadium-dugout' }, // 勝利：ベンチを出る大山
    { at: 'c29i-004', bg: 'regional-stadium-field' }, // 大山の本塁打
    { at: 'c29i-006', bg: 'regional-stadium-dugout' }, // ベンチ
    { at: 'c29j-001', bg: 'regional-stadium-field' }, // 敗戦：大山の打席
    { at: 'c29j-004', bg: 'regional-stadium-dugout' }, // 敗戦の記録
    { at: 'c29k-001', bg: 'regional-stadium-dugout' }, // E1：整列後のベンチ
    { at: 'c29k-004', bg: 'hosho-clubroom' }, // E1：翌日の部室
    { at: 'cbus-001', bg: 'hosho-gate-bus-morning' }, // 幕間：校門前で用具を積み、乗車する前。cbus-002（車内）でバスの中へ
    { at: 'cbus-002', bg: 'bus-interior' }, // バスの車内
    { at: 'c30-001', bg: 'koshien-dugout' }, // 5-30：甲子園のベンチ
    { at: 'c30-025-p1', bg: 'lodging-dining-hall-night' }, // 港南戦の前夜、宿の食堂で結果を整理する
    { at: 'c31a-001', bg: 'lodging-dining-hallway' }, // 5-31：食堂を出た廊下で、長椅子の記者に呼び止められる
    { at: 'c31b-001', bg: 'lodging-dining-hall' }, // 分岐：取材を分担し、食堂の端で映像を見直す
    { at: 'c31c-001', bg: 'lodging-dining-hallway' }, // 分岐：廊下に残って取材を受ける（食堂に戻るのは行末の結果なので、主な出来事の廊下）
    { at: 'c31d-001', bg: 'koshien-concourse' }, // 試合当日、スタンド下の通路
    { at: 'c31e-001', bg: 'koshien-dugout' }, // 分岐：グラウンドへ出る
    { at: 'c31f-001', bg: 'koshien-dugout' }, // 分岐：面会を案内してからグラウンドへ
    { at: 'c31g-001', bg: 'koshien-dugout' }, // 3塁コーチへの伝達
    { at: 'c31h-001', bg: 'koshien-dugout' }, // 合流：9回
    { at: 'c31i-001', bg: 'koshien-dugout' }, // 勝利
    { at: 'c31j-001', bg: 'koshien-dugout' }, // 敗戦
    { at: 'c31k-001', bg: 'bus-interior-sunset' }, // E2：帰りのバス（西日）
    { at: 'c32a-001', bg: 'koshien-dugout' }, // 5-32：3回戦のベンチ
    { at: 'c32b-001', bg: 'koshien-dugout' }, // 準々決勝
    { at: 'c32b-007', bg: 'lodging-dining-hall-night' }, // その晩、宿の食堂で映像を見る
    { at: 'c32c-001', bg: 'lodging-dining-hall-night' }, // 分岐：映像を見直す（夜の食堂）
    { at: 'c32d-001', bg: 'lodging-dining-hall-night' }, // 分岐：青岳の打順表を整理（夜の食堂）
    { at: 'c32e-001', bg: 'koshien-dugout' }, // 合流：準決勝
    { at: 'c32f-001', bg: 'koshien-dugout' }, // 当日確認の選択
    { at: 'c32g-001', bg: 'koshien-dugout' }, // 分岐：田原に聞く
    { at: 'c32h-001', bg: 'koshien-dugout' }, // 分岐：聞かない
    { at: 'c32i-001', bg: 'koshien-dugout' }, // バッテリーへの伝達
    { at: 'c32j-001', bg: 'koshien-dugout' }, // 合流：8回表
    { at: 'c32k-001', bg: 'koshien-dugout' }, // 勝利
    { at: 'c32l-001', bg: 'koshien-dugout' }, // 敗戦
    { at: 'c32m-001', bg: 'koshien-concourse' }, // E3：スタンドの階段と売店
    { at: 'c32m-002', bg: 'koshien-field' }, // E3：観客席から決勝を見る
    { at: 'c33a-001', bg: 'koshien-concourse' }, // 5-33：決勝の朝、スタンド下の通路の長机
    { at: 'c33b-001', bg: 'koshien-concourse' }, // 分岐：映像を見比べる
    { at: 'c33c-001', bg: 'koshien-concourse' }, // 分岐：投手の資料
    { at: 'c33d-001', bg: 'koshien-dugout' }, // 合流：試合
    { at: 'c33d-001f', bg: 'koshien-field' }, // スタンドの観客・厳・河本
    { at: 'c33d-001l', bg: 'koshien-dugout' }, // ベンチ
    { at: 'c33e-001', bg: 'koshien-dugout' }, // 当日確認の選択
    { at: 'c33f-001', bg: 'koshien-dugout' }, // 分岐：田原と照合
    { at: 'c33g-001', bg: 'koshien-dugout' }, // 分岐：照合しない
    { at: 'c33h-001', bg: 'koshien-dugout' }, // 合流：9回
    { at: 'c33i-001', bg: 'koshien-dugout' }, // 田原への伝達
    { at: 'c33j-001', bg: 'koshien-dugout' }, // 勝利側：最後の打席
    { at: 'c33k-001', bg: 'koshien-dugout' }, // 敗戦側：最後の打席
    { at: 'c33l-001', bg: 'koshien-concourse' }, // E4：表彰後、スタンド下の通路
    { at: 'c33l-009', bg: 'bus-interior' }, // E4：帰りのバス
    { at: 'clastout-001', bg: 'koshien-dugout' }, // 幕間：ベンチで見る最後のアウト
    { at: 'c34-001', bg: 'koshien-dugout' }, // 5-34：優勝の瞬間
    { at: 'c34-005', bg: 'koshien-field' }, // 応援席の中田
    { at: 'c34-006', bg: 'koshien-dugout' }, // ベンチ
    { at: 'c35-001', bg: 'koshien-dugout' }, // 5-35：ベンチ前のインタビュー
    { at: 'c35-014', bg: 'koshien-field' }, // 応援席の中田
    { at: 'c35-016', bg: 'koshien-dugout' }, // 帝嶺のベンチ前・ベンチの出口
    { at: 'c36-001', bg: 'koshien-dugout' }, // 5-36：ベンチ前
    { at: 'c36-005', bg: 'koshien-field' }, // 応援席の母親
    { at: 'c36-008', bg: 'koshien-dugout' }, // 応援席を見上げる監督
    { at: 'c36-010', bg: 'koshien-field' }, // 応援席の厳
    { at: 'c36-012', bg: 'koshien-dugout' }, // 大山
    { at: 'c36-013', bg: 'koshien-field' }, // 応援席の厳と掲示板
    { at: 'c36-019', bg: 'koshien-dugout' }, // ベンチの出口
    // 立ち絵。平野は視点人物なので出さない。話者ではなく、平野が見ている人物とその居場所に合わせて出す。
    // キットは通ったルートではなく本文の並び順で立ち絵を戻すので、5-2〜5-13 の各場面の最初の行で左右の枠を明示する。
    // 名前のない先輩・1年生は出さない。通常顔と食い違う区間（激怒・大きな驚き・青ざめるなど）は出さない。
    { at: 'c01-014', portrait: { slot: 'right', char: 'oyama', expr: 'school-winter-normal' } }, // 冒頭：振り向いた平野が大山を見る（既存）
    { at: 'c01-021', portrait: { slot: 'right', clear: true } }, // 大山がグラウンドの入口へ歩いていく（既存）
    { at: 'c02-001', portrait: { slot: 'left', clear: true } }, // 場面の始まり（練習へ交ざる）：左を明示して消す
    { at: 'c02-001', portrait: { slot: 'right', clear: true } }, // 場面の始まり（練習へ交ざる）：右を明示して消す
    { at: 'c02i-001', portrait: { slot: 'left', clear: true } }, // 場面の始まり（練習へ交ざる）：左を明示して消す
    { at: 'c02i-001', portrait: { slot: 'right', clear: true } }, // 場面の始まり（練習へ交ざる）：右を明示して消す
    { at: 'c02o-001', portrait: { slot: 'left', clear: true } }, // 場面の始まり（練習へ交ざる）：左を明示して消す
    { at: 'c02o-001', portrait: { slot: 'right', clear: true } }, // 場面の始まり（練習へ交ざる）：右を明示して消す
    { at: 'c02e-001', portrait: { slot: 'left', clear: true } }, // 場面の始まり（練習へ交ざる）：左を明示して消す
    { at: 'c02e-001', portrait: { slot: 'right', clear: true } }, // 場面の始まり（練習へ交ざる）：右を明示して消す
    { at: 'c03-001', portrait: { slot: 'left', clear: true } }, // 場面の始まり（記録する1年生）：左を明示して消す
    { at: 'c03-001', portrait: { slot: 'right', clear: true } }, // 場面の始まり（記録する1年生）：右を明示して消す
    { at: 'c04-001', portrait: { slot: 'left', clear: true } }, // 場面の始まり（美空の登場）：左を明示して消す
    { at: 'c04-001', portrait: { slot: 'right', clear: true } }, // 場面の始まり（美空の登場）：右を明示して消す
    { at: 'c04-005', portrait: { slot: 'right', char: 'misora', expr: 'game-uniform-normal' } }, // 5-4：美空が入口から歩いてくる。帽子のある試合用ユニフォーム（既存）
    { at: 'c04-022', portrait: { slot: 'left', char: 'nakata', expr: 'practice-bashful' } }, // 5-4：着席した中田の口元が緩む。照れ笑いを顔〜胸だけで出す（game.css）
    { at: 'c04-023', portrait: { slot: 'left', clear: true } }, // 平野がスコアブックに目を戻す
    { at: 'c04-035', portrait: { slot: 'left', char: 'nakata', expr: 'practice-normal' } }, // 5-4：グラブを膝に乗せたまま平野を見ている中田
    { at: 'c04-036', portrait: { slot: 'left', char: 'oyama', expr: 'practice-normal' } }, // バットを肩に乗せて立つ大山へ視線が移る
    { at: 'c05-001', portrait: { slot: 'left', clear: true } }, // 場面の始まり（優勝と結婚）：左を明示して消す
    { at: 'c05-001', portrait: { slot: 'right', clear: true } }, // 5-5：監督は先に帰った（既存）
    { at: 'c05-004', portrait: { slot: 'right', char: 'oyama', expr: 'practice-normal' } }, // 5-5：バットを片づけに来た大山が平野の前で足を止める
    { at: 'c05o-001', portrait: { slot: 'left', clear: true } }, // 場面の始まり（優勝と結婚）：左を明示して消す
    { at: 'c05o-001', portrait: { slot: 'right', char: 'oyama', expr: 'practice-normal' } }, // 分岐：大山に聞く
    { at: 'c05s-001', portrait: { slot: 'left', clear: true } }, // 場面の始まり（優勝と結婚）：左を明示して消す
    { at: 'c05s-001', portrait: { slot: 'right', clear: true } }, // 分岐：名前のない先輩に聞く（立ち絵なし）
    { at: 'c05e-001', portrait: { slot: 'left', clear: true } }, // 場面の始まり（優勝と結婚）：左を明示して消す
    { at: 'c05e-001', portrait: { slot: 'right', char: 'oyama', expr: 'practice-normal' } }, // 合流：先輩に呼ばれる大山
    { at: 'c05e-012', portrait: { slot: 'right', clear: true } }, // 大山たちが出ていき、ベンチに平野が残る
    { at: 'c05b-001', portrait: { slot: 'left', clear: true } }, // 場面の始まり（あと10本）：左を明示して消す
    { at: 'c05b-001', portrait: { slot: 'right', char: 'oyama', expr: 'practice-normal' } }, // 幕間「あと10本」：ネットの前で打ち続ける大山
    { at: 'c06-001', portrait: { slot: 'left', clear: true } }, // 場面の始まり（指導の出所）：左を明示して消す
    { at: 'c06-001', portrait: { slot: 'right', clear: true } }, // 場面の始まり（指導の出所）：右を明示して消す
    { at: 'c06-009', portrait: { slot: 'right', char: 'misora', expr: 'game-uniform-normal' } }, // 5-6：監督の声がする
    { at: 'c06a-001', portrait: { slot: 'left', clear: true } }, // 場面の始まり（指導の出所）：左を明示して消す
    { at: 'c06a-001', portrait: { slot: 'right', char: 'misora', expr: 'game-uniform-normal' } }, // 分岐：ベンチの端の監督に聞く
    { at: 'c06b-001', portrait: { slot: 'left', clear: true } }, // 場面の始まり（指導の出所）：左を明示して消す
    { at: 'c06b-001', portrait: { slot: 'right', clear: true } }, // 分岐：棚の資料を見る（監督は画面に出さない）
    { at: 'c06e-001', portrait: { slot: 'left', clear: true } }, // 場面の始まり（指導の出所）：左を明示して消す
    { at: 'c06e-001', portrait: { slot: 'right', char: 'misora', expr: 'game-uniform-normal' } }, // 合流：給水中、同じ所に立つ監督
    { at: 'c06e-004a', portrait: { slot: 'right', char: 'misora', expr: 'game-uniform-pale' } },
    { at: 'c06e-006', portrait: { slot: 'right', char: 'misora', expr: 'game-uniform-angry' } },
    { at: 'c06e-008', portrait: { slot: 'right', clear: true } },
    { at: 'c06e-010', portrait: { slot: 'right', char: 'misora', expr: 'game-uniform-hush' } }, // 口止め（中央の寄り）。c07-004 まで、場面をまたいで続く
    { at: 'c07-001', portrait: { slot: 'left', clear: true } }, // 場面の始まり（外周50周）：左を明示して消す
    { at: 'c07-001', portrait: { slot: 'right', char: 'misora', expr: 'game-uniform-hush' } }, // 場面の始まり（外周50周）：c06e-010 からの口止めを明示して続ける
    { at: 'c07-005', portrait: { slot: 'right', char: 'misora', expr: 'game-uniform-flustered-chibi' } },
    { at: 'c07-006', portrait: { slot: 'left', char: 'nakata', expr: 'practice-confronting' } }, // 給水台から突っ込んでくる中田（〜c07-006a）
    { at: 'c07-006a', portrait: { slot: 'right', char: 'misora', expr: 'game-uniform-normal' } }, // 手を引いた監督は、取り繕った通常の顔に戻る（その場にいる）
    { at: 'c07-007', portrait: { slot: 'left', char: 'nakata', expr: 'practice-normal' } }, // 中田が平野の前まで来て、2人のあいだに立つ（しかめ面）
    { at: 'c07-016', portrait: { slot: 'right', char: 'misora', expr: 'game-uniform-flustered-chibi' } },
    { at: 'c07-017', portrait: { slot: 'left', char: 'nakata', expr: 'practice-bashful' } }, // 5-7：美空に褒められ、背筋を伸ばして名乗る中田（照れ笑い・立ち姿）
    { at: 'c07-017', portrait: { slot: 'right', clear: true } },
    { at: 'c07-019', portrait: { slot: 'left', clear: true } }, // 給水台の先輩たちへ視線が移る
    { at: 'c07-020', portrait: { slot: 'left', char: 'nakata', expr: 'practice-normal' } }, // 5-7：振り返った中田の眉間にしわ
    { at: 'c07-023', portrait: { slot: 'left', clear: true } }, // 外周の門へ向かう
    { at: 'c07-026', portrait: { slot: 'right', char: 'misora', expr: 'game-uniform-normal' } }, // 振り向くと監督がベンチの前で手招き
    { at: 'c07-031', portrait: { slot: 'left', char: 'nakata', expr: 'practice-normal' } }, // 引き返す途中で中田の横を通る
    { at: 'c08-001', portrait: { slot: 'left', clear: true } }, // 場面の始まり（便利な部員、特別な相手）：左を明示して消す
    { at: 'c08-001', portrait: { slot: 'right', char: 'misora', expr: 'game-uniform-normal' } }, // 5-8：ベンチの端で紙を引き寄せる監督
    { at: 'c08-021', portrait: { slot: 'right', char: 'nakata', expr: 'practice-rage' } }, // 給水台で鬼の形相の中田と目が合う。美空を一時的に隠し、中田の寄りを出す（game.css）
    { at: 'c08-024', portrait: { slot: 'right', char: 'misora', expr: 'game-uniform-normal' } }, // 質問の続きを書く：監督との通常の会話画面へ戻す
    { at: 'c08-027', portrait: { slot: 'right', clear: true } }, // 翌日、紙が戻る
    { at: 'c08-030', portrait: { slot: 'right', char: 'misora', expr: 'game-uniform-normal' } }, // 監督に読んだか聞く
    { at: 'c08-033', portrait: { slot: 'right', clear: true } }, // まとめの地の文
    { at: 'c08-034', portrait: { slot: 'right', char: 'misora', expr: 'game-uniform-normal' } }, // 写しを渡すと、監督の目が名前で止まる
    { at: 'c08-041', portrait: { slot: 'left', char: 'nakata', expr: 'practice-shock' } }, // 隣の中田が固まり、手の下を球が転がる（驚き）。右の美空の声へ向く。足元を基準に配置（game.css）
    { at: 'c08b-001', portrait: { slot: 'left', clear: true } }, // 場面の始まり（机の端）：左を明示して消す
    { at: 'c08b-001', portrait: { slot: 'right', char: 'hiyori', expr: 'jersey-normal' } }, // 幕間：部室の机の端を空けてくれる日和
    { at: 'c09-001', portrait: { slot: 'left', clear: true } }, // 場面の始まり（日和との日常）：左を明示して消す
    { at: 'c09-001', portrait: { slot: 'right', clear: true } }, // 場面の始まり（日和との日常）：右を明示して消す
    { at: 'c09-002', portrait: { slot: 'right', char: 'hiyori', expr: 'jersey-normal' } }, // 5-9：ベンチの前でクーラーボックスと用具カゴを持つ日和
    { at: 'c09d-001', portrait: { slot: 'left', clear: true } }, // 場面の始まり（日和との日常）：左を明示して消す
    { at: 'c09d-001', portrait: { slot: 'right', char: 'hiyori', expr: 'jersey-normal' } }, // 分岐：飲み物
    { at: 'c09d-002', portrait: { slot: 'left', char: 'sasaki', expr: 'practice-normal' } }, // 紐を結んでいた佐々木にいちご牛乳を差し出す
    { at: 'c09d-010', portrait: { slot: 'left', clear: true } }, // 平野が先に部室へ運ぶ
    { at: 'c09d-010', portrait: { slot: 'right', clear: true } }, // （同じ）
    { at: 'c09t-001', portrait: { slot: 'left', clear: true } }, // 場面の始まり（日和との日常）：左を明示して消す
    { at: 'c09t-001', portrait: { slot: 'right', char: 'hiyori', expr: 'jersey-normal' } }, // 分岐：用具
    { at: 'c09t-004', portrait: { slot: 'left', char: 'sasaki', expr: 'practice-normal' } }, // 佐々木が戻ってくる
    { at: 'c09e-001', portrait: { slot: 'left', clear: true } }, // 場面の始まり（日和との日常）：左を明示して消す
    { at: 'c09e-001', portrait: { slot: 'right', char: 'sasaki', expr: 'practice-normal' } }, // 合流：翌日、自販機の前の佐々木
    { at: 'c09e-006', portrait: { slot: 'right', char: 'hiyori', expr: 'jersey-normal' } }, // 部室でクーラーボックスを拭く日和
    { at: 'c09e-007', portrait: { slot: 'left', char: 'misora', expr: 'game-uniform-normal' } }, // 監督が部室に顔を出し、日和の隣に座る
    { at: 'c09e-014', portrait: { slot: 'left', clear: true } }, // 平野が部室を出る
    { at: 'c09e-014', portrait: { slot: 'right', clear: true } }, // （同じ）
    { at: 'c10-001', portrait: { slot: 'left', clear: true } }, // 場面の始まり（河本の来校）：左を明示して消す
    { at: 'c10-001', portrait: { slot: 'right', clear: true } }, // 場面の始まり（河本の来校）：右を明示して消す
    { at: 'c10-002', portrait: { slot: 'right', char: 'kawamoto', expr: 'casual-normal' } }, // 5-10：グラウンドの入口に立つ河本
    { at: 'c10-008', portrait: { slot: 'left', char: 'misora', expr: 'game-uniform-normal' } }, // 机の端で紙を揃える監督
    { at: 'c10-015-p1', portrait: { slot: 'left', clear: true } }, // 河本の一枚絵（c10-015-p1）の間は立ち絵を重ねない
    { at: 'c10-015-p1', portrait: { slot: 'right', clear: true } },
    { at: 'c10-016', portrait: { slot: 'left', char: 'misora', expr: 'game-uniform-normal' } }, // 現実へ戻る：切り抜きを練習メニューの下へ入れる監督と、河本
    { at: 'c10-016', portrait: { slot: 'right', char: 'kawamoto', expr: 'casual-normal' } },
    { at: 'c10-020', portrait: { slot: 'right', char: 'kawamoto', expr: 'casual-shock' } },
    { at: 'c10-021', portrait: { slot: 'left', clear: true } }, // 大山が割って入る。美空を外し、次の台詞から大山の怒りを出す
    { at: 'c10-022', portrait: { slot: 'left', char: 'oyama', expr: 'practice-angry' } },
    { at: 'c10-023', portrait: { slot: 'right', char: 'kawamoto', expr: 'casual-normal' } },
    { at: 'c10-028', portrait: { slot: 'left', clear: true } },
    { at: 'c10-029', portrait: { slot: 'right', char: 'kawamoto', expr: 'casual-angry' } },
    { at: 'c10-031', portrait: { slot: 'right', char: 'kawamoto', expr: 'casual-normal' } }, // 河本が大山に向き直り、就任初日のことを言う
    { at: 'c11s-001', portrait: { slot: 'left', char: 'oyama', expr: 'practice-normal' } }, // 5-11：大山と河本
    { at: 'c11s-001', portrait: { slot: 'right', char: 'kawamoto', expr: 'casual-normal' } }, // （同じ）
    { at: 'c11m-001', portrait: { slot: 'left', clear: true } }, // 場面の始まり（美空の就任初日）：左を明示して消す
    { at: 'c11m-001', portrait: { slot: 'right', clear: true } }, // 場面の始まり（美空の就任初日）：右を明示して消す
    { at: 'c11m-001d', portrait: { slot: 'right', char: 'misora', expr: 'pantsuit-first-day' } }, // 回想：長い黒髪の女が歩いてくる（就任初日のスーツ）
    { at: 'c11m-021', portrait: { slot: 'right', clear: true } }, // 回想：外周を走る
    { at: 'c11m-029', portrait: { slot: 'right', char: 'misora', expr: 'pantsuit-first-day' } }, // 回想：1周して美空の前に戻る
    { at: 'c11p-001', portrait: { slot: 'left', clear: true } }, // 場面の始まり（河本の証言）：左を明示して消す
    { at: 'c11p-001', portrait: { slot: 'right', char: 'kawamoto', expr: 'casual-normal' } }, // 現在へ戻る：話し終えた河本（大山の「ちっ」は通常顔と合わないので出さない）
    { at: 'c11a-001', portrait: { slot: 'left', clear: true } }, // 場面の始まり（河本の証言）：左を明示して消す
    { at: 'c11a-001', portrait: { slot: 'right', char: 'kawamoto', expr: 'casual-normal' } }, // 分岐：平野が河本に聞く
    { at: 'c11w-001', portrait: { slot: 'left', char: 'oyama', expr: 'practice-normal' } }, // 分岐：大山が河本に言い返す
    { at: 'c11w-001', portrait: { slot: 'right', char: 'kawamoto', expr: 'casual-normal' } }, // （同じ）
    { at: 'c11w-006', portrait: { slot: 'left', char: 'oyama', expr: 'practice-frustrated' } },
    { at: 'c11e-001', portrait: { slot: 'left', clear: true } }, // 場面の始まり（河本の証言）：左を明示して消す
    { at: 'c11e-001', portrait: { slot: 'right', char: 'kawamoto', expr: 'casual-normal' } }, // 合流：襟を直す河本
    { at: 'c11e-002', portrait: { slot: 'right', clear: true } }, // ベンチの奥へ戻る
    { at: 'c12-001', portrait: { slot: 'left', char: 'misora', expr: 'game-uniform-normal' } }, // 5-12：ベンチの奥の監督
    { at: 'c12-001', portrait: { slot: 'right', clear: true } }, // 場面の始まり（実績では伝わらない）：右を明示して消す
    { at: 'c12-002', portrait: { slot: 'right', char: 'kawamoto', expr: 'casual-normal' } }, // 腰掛けの端まで来て待つ河本
    { at: 'c12-016', portrait: { slot: 'right', clear: true } }, // 河本がベンチを出たあと
    { at: 'c13-001', portrait: { slot: 'left', clear: true } }, // 場面の始まり（新庄との接触）：左を明示して消す
    { at: 'c13-001', portrait: { slot: 'right', clear: true } }, // 場面の始まり（新庄との接触）：右を明示して消す
    // 章間「新聞と記録」：一枚絵は区間内だけ表示する。
    { at: 'cnews-010', cg: { id: 'cnews-oyama-tears-newspaper', until: 'cnews-011c' } },
    // 一枚絵第2便。人物の心理・主観の絵。区間の次の行で、その行の背景と立ち絵に戻る
    { at: 'c01-009', cg: { id: 'hirano-field-visit-vision', until: 'c01-011' } }, // 5-1：朝練を見る平野の主観（c01-012 で解除）
    { at: 'c10-015-p1', cg: { id: 'c10-kawamoto-daydream-embrace', until: 'c10-015-p1' } }, // 5-10：河本の受け取り方（c10-016 で現実へ戻る）
    { at: 'c13-021', cg: { id: 'c13-shinjo-daydream-dinner', until: 'c13-022' } }, // 5-13：新庄（c13-023 で解除）
    { at: 'cbus-003a', cg: { id: 'cbus-oyama-daydream-bride' } }, // 行きのバス：大山（この1行だけ。cbus-004 で解除）
    { at: 'c26a-008', cg: { id: 'c26a-tahara-daydream-home' } }, // 5-26 田原の分岐：田原（この1行だけ。c26a-009 で解除）
    { at: 'c26b-008', cg: { id: 'c26b-komiya-daydream-hand' } }, // 5-26 小宮の分岐：小宮（この1行だけ。c26b-008a で解除）
  ],

  // 既存の行IDは維持し、追加した試合の判定を初期値で補う。
  migrations: {
    '2026.10-1': { lines: 'identity', flags: () => ({ ryuseiPrep: false, ryuseiRecovery: false, konanPrep: false, konanRecovery: false, aotakePrep: false, aotakeRecovery: false, teireiPrep: false, teireiRecovery: false }) },
    '2026.11-1': { lines: 'identity', flags: (f) => ({ ryuseiPrep: f.ryuseiPrep, ryuseiRecovery: f.ryuseiRecovery, konanPrep: false, konanRecovery: false, aotakePrep: false, aotakeRecovery: false, teireiPrep: false, teireiRecovery: false }) },
    '2026.11-2': { lines: 'identity', flags: (f) => ({ ...f, aotakePrep: false, aotakeRecovery: false, teireiPrep: false, teireiRecovery: false }) },
    '2026.11-3': { lines: 'identity', flags: (f) => ({ ...f, teireiPrep: false, teireiRecovery: false }) },
  },
};
