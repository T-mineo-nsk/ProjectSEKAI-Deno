// commands/eventpoint.ts
import { SlashCommandBuilder } from "https://esm.sh/discord.js@14.13.0";

export const eventPointCommand = {
  data: new SlashCommandBuilder()
    .setName("eventpoint")
    .setDescription("イベントポイントを計算します")
    .addIntegerOption(opt =>
      opt.setName("score")
        .setDescription("自分のスコア（例: 85000）")
        .setRequired(true)
    )
    .addIntegerOption(opt =>
      opt.setName("unitbonus")
        .setDescription("編成ボーナス（%表記の数値、例: 650）")
        .setRequired(true)
    )
    .addNumberOption(opt =>
      opt.setName("stage")
        .setDescription("ステージ倍率（例: 1.5）")
        .setRequired(true)
    )
    .addIntegerOption(opt =>
      opt.setName("playpoint")
        .setDescription("消費プレイポイント（例: 10, 20, 30, 40）")
        .setRequired(true)
    ),

  async execute(interaction) {
    const score = interaction.options.getInteger("score")!;
    const unitBonus = interaction.options.getInteger("unitbonus")!;
    const stageRate = interaction.options.getNumber("stage")!;
    const playPoint = interaction.options.getInteger("playpoint")!;

    // 固定: 他スコアボーナス
    const otherScoreBonus = 13;
    const selfScoreBonus = Math.floor(score / 17000);

    // 編成ボーナスの倍率（例：650% → 7.5倍）
    const unitBonusRate = (unitBonus + 100) / 100;

    // プレイボーナスの倍率テーブル
    const playBonusTable: Record<number, number> = {
      10: 1.0,
      20: 1.5,
      30: 2.0,
      40: 2.5,
    };

    const playBonus = playBonusTable[playPoint];
    if (!playBonus) {
      await interaction.reply("プレイポイントは 10, 20, 30, 40 のいずれかにしてください。");
      return;
    }

    const base = 110 + selfScoreBonus + otherScoreBonus;
    const result = base * unitBonusRate * (stageRate / 100) * playBonus;

    await interaction.reply(`イベントポイントは **${Math.floor(result)}pt** です。`);
  }
};
