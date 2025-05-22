// commands/skillrate.ts
import { SlashCommandBuilder } from "npm:discord.js";

export const data = new SlashCommandBuilder()
  .setName("skillrate")
  .setDescription("スキル発動率を計算します");

export async function execute(interaction) {
  // テスト応答（本来はここに計算処理）
  await interaction.reply("スキル発動率の計算結果: 88.2%");
}
