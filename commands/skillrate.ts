// commands/skillrate.ts
import { SlashCommandBuilder } from "https://esm.sh/discord.js@14.13.0";

export const skillRateCommand = {
  data: new SlashCommandBuilder()
    .setName("skillrate")
    .setDescription("スキル実効倍率を計算します")
    .addSubcommand(sub => 
      sub.setName("manual")
        .setDescription("5人分の倍率を個別に入力")
        .addIntegerOption(opt => opt.setName("leader").setDescription("リーダー倍率").setRequired(true))
        .addIntegerOption(opt => opt.setName("sub1").setDescription("メンバー1").setRequired(true))
        .addIntegerOption(opt => opt.setName("sub2").setDescription("メンバー2").setRequired(true))
        .addIntegerOption(opt => opt.setName("sub3").setDescription("メンバー3").setRequired(true))
        .addIntegerOption(opt => opt.setName("sub4").setDescription("メンバー4").setRequired(true))
    )
    .addSubcommand(sub => 
      sub.setName("total")
        .setDescription("合計倍率とリーダー倍率から計算")
        .addIntegerOption(opt => opt.setName("leader").setDescription("リーダー倍率").setRequired(true))
        .addIntegerOption(opt => opt.setName("total").setDescription("合計倍率").setRequired(true))
    ),
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    let effectiveValue = 0;

    if (subcommand === "manual") {
      const a = interaction.options.getInteger("leader");
      const b = interaction.options.getInteger("sub1");
      const c = interaction.options.getInteger("sub2");
      const d = interaction.options.getInteger("sub3");
      const e = interaction.options.getInteger("sub4");
      effectiveValue = a + (b + c + d + e) * 0.2;
    } else if (subcommand === "total") {
      const a = interaction.options.getInteger("leader");
      const sum = interaction.options.getInteger("total");
      effectiveValue = a + (sum - a) * 0.2;
    }

    await interaction.reply(`実効値: ${effectiveValue}`);
  }
};
