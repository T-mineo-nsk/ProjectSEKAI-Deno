// commands/eventpoint.ts
import { SlashCommandBuilder } from "npm:discord.js";

export const data = new SlashCommandBuilder()
  .setName("eventpoint")
  .setDescription("イベントポイントを計算します")
  .addIntegerOption(option =>
    option.setName("score").setDescription("あなたのスコア").setRequired(true)
  )
  .addIntegerOption(option =>
    option.setName("formation_bonus").setDescription("編成ボーナス（+%）").setRequired(true)
  )
  .addIntegerOption(option =>
    option.setName("stage_multiplier").setDescription("ステージ倍率").setRequired(true)
  )
  .addIntegerOption(option =>
    option.setName("play_point").setDescription("プレイポイント消費量（0〜10）").setRequired(true)
  );

export async function execute(interaction: any) {
  const score = interaction.options.getInteger("score");
  const formation_bonus = interaction.options.getInteger("formation_bonus");
  const stage_multiplier = interaction.options.getInteger("stage_multiplier");
  const play_point = interaction.options.getInteger("play_point");

  const playBonusTable: Record<number, number> = {
    0: 1, 1: 5, 2: 10, 3: 15, 4: 20,
    5: 25, 6: 27, 7: 29, 8: 31, 9: 33, 10: 35
  };

  if (!(play_point in playBonusTable)) {
    await interaction.reply("プレイポイント消費量は0〜10の範囲で入力してください。");
    return;
  }

  const self_score_bonus = Math.floor(score / 17000);
  const other_score_bonus = 13;
  const formation_bonus_multiplier = (formation_bonus / 100) + 1;
  const play_bonus = playBonusTable[play_point];

  const event_point = (110 + self_score_bonus + other_score_bonus)
    * formation_bonus_multiplier * stage_multiplier / 100 * play_bonus;

  await interaction.reply(`イベントポイント: **${Math.floor(event_point)}pt**`);
}
