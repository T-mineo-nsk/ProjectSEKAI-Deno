// commands/eventpoint.ts
import { SlashCommandBuilder } from "npm:discord.js";

export const data = new SlashCommandBuilder()
  .setName("eventpoint")
  .setDescription("イベントポイントを計算します");

export async function execute(interaction) {
  // テスト応答（本来はここに計算処理）
  await interaction.reply("イベントポイントの計算結果: 12345pt");
}
