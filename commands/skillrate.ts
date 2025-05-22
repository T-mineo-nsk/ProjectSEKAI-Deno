import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  Interaction,
} from "./deps.ts";
import { createCommand } from "../utils/createCommand.ts";

export const skillrate = createCommand({
  name: "skillrate",
  description: "スキル実効倍率を計算します",
  type: ApplicationCommandTypes.ChatInput,
  options: [
    {
      name: "manual",
      description: "5人分の倍率を入力",
      type: ApplicationCommandOptionTypes.SubCommand,
      options: [
        { name: "leader", description: "リーダー倍率", type: ApplicationCommandOptionTypes.Integer, required: true },
        { name: "sub1", description: "メンバー1", type: ApplicationCommandOptionTypes.Integer, required: true },
        { name: "sub2", description: "メンバー2", type: ApplicationCommandOptionTypes.Integer, required: true },
        { name: "sub3", description: "メンバー3", type: ApplicationCommandOptionTypes.Integer, required: true },
        { name: "sub4", description: "メンバー4", type: ApplicationCommandOptionTypes.Integer, required: true },
      ],
    },
    {
      name: "total",
      description: "合計倍率とリーダー倍率から計算",
      type: ApplicationCommandOptionTypes.SubCommand,
      options: [
        { name: "leader", description: "リーダー倍率", type: ApplicationCommandOptionTypes.Integer, required: true },
        { name: "total", description: "合計倍率", type: ApplicationCommandOptionTypes.Integer, required: true },
      ],
    },
  ],
  execute: async (bot, interaction: Interaction) => {
    const sub = interaction.data?.options?.[0];
    if (!sub) return;

    let result = 0;

    if (sub.name === "manual") {
      const get = (n: string) => sub.options?.find(o => o.name === n)?.value as number ?? 0;
      const a = get("leader");
      const b = get("sub1");
      const c = get("sub2");
      const d = get("sub3");
      const e = get("sub4");

      result = a + (b + c + d + e) * 0.2;
    } else if (sub.name === "total") {
      const leader = sub.options?.find(o => o.name === "leader")?.value as number ?? 0;
      const total = sub.options?.find(o => o.name === "total")?.value as number ?? 0;
      result = leader + (total - leader) * 0.2;
    }

    await bot.helpers.sendInteractionResponse(interaction.id, interaction.token, {
      type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
      data: {
        content: `実効値: ${result}`,
      },
    });
  },
});
