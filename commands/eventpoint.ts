const eventpoint = {
  data: {
    name: "eventpoint",
    description: "イベントポイントを計算します",
    options: [
      {
        name: "score",
        type: 4, // INTEGER
        description: "あなたのスコア",
        required: true,
      },
      {
        name: "unit_bonus",
        type: 3, // STRING（例: "+650%"）
        description: "編成ボーナス（例: +650%）",
        required: true,
      },
      {
        name: "stage_rate",
        type: 4, // INTEGER
        description: "ステージ倍率（例: 100）",
        required: true,
      },
      {
        name: "play_point",
        type: 4, // INTEGER
        description: "消費プレイポイント（例: 10, 20, 30）",
        required: true,
      },
    ],
  },
  async execute(interaction) {
    const score = interaction.options.getInteger("score");
    const unitBonus = interaction.options.getString("unit_bonus");
    const stageRate = interaction.options.getInteger("stage_rate");
    const playPoint = interaction.options.getInteger("play_point");

    // 自スコアボーナス計算
    const myScoreBonus = Math.floor(score / 17000);
    const otherScoreBonus = 13;

    // 編成ボーナス（"+650%" → 7.5 に変換）
    const bonusMatch = unitBonus.match(/\+(\d+)%/);
    if (!bonusMatch) {
      await interaction.reply("編成ボーナスの形式が不正です（例: +650%）");
      return;
    }
    const unitBonusRate = 1 + parseInt(bonusMatch[1], 10) / 100;

    // プレイポイントに対応したプレイボーナス
    const playBonusMap = {
      10: 1.0,
      20: 2.2,
      30: 3.6,
    };
    const playBonus = playBonusMap[playPoint] ?? 1.0;

    const basePoint = 110 + myScoreBonus + otherScoreBonus;
    const eventPoint = Math.floor(basePoint * unitBonusRate * stageRate / 100 * playBonus);

    await interaction.reply(`イベントポイント: ${eventPoint}`);
  },
};

export default eventpoint;
