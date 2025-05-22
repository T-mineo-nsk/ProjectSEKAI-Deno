import {
  createSlashCommand,
  Interaction,
} from "discordeno/interactions";

export const skillrate = createSlashCommand({
  name: "skillrate",
  description: "スキル実効倍率を計算します",
  options: [
    {
      name: "manual",
      description: "5人分の倍率を個別に入力",
      type: 1, // SUB_COMMAND
      options: [
        {
          name: "leader",
          description: "リーダー倍率",
          type: 4, // INTEGER
          required: true,
        },
        {
          name: "sub1",
          description: "メンバー1",
          type: 4,
          required: true,
        },
        {
          name: "sub2",
          description: "メンバー2",
          type: 4,
          required: true,
        },
        {
          name: "sub3",
          description: "メンバー3",
          type: 4,
          required: true,
        },
        {
          name: "sub4",
          description: "メンバー4",
          type: 4,
          required: true,
        },
      ],
    },
    {
      name: "total",
      description: "合計倍率とリーダー倍率から計算",
      type: 1, // SUB_COMMAND
      options: [
        {
          name: "leader",
          description: "リーダー倍率",
          type: 4,
          required: true,
        },
        {
          name: "total",
          description: "合計倍率",
          type: 4,
          required: true,
        },
      ],
    },
  ],
  execute: async (interaction: Interaction) => {
    const subcommand = interaction.data?.options?.[0];

    if (!subcommand || subcommand.type !== 1) {
      return interaction.respond({ content: "サブコマンドの取得に失敗しました。", ephemeral: true });
    }

    let effectiveValue = 0;

    if (subcommand.name === "manual") {
      const get = (name: string) =>
        subcommand.options?.find((o) => o.name === name)?.value as number ?? 0;

      const a = get("leader");
      const b = get("sub1");
      const c = get("sub2");
      const d = get("sub3");
      const e = get("sub4");

      effectiveValue = a + (b + c + d + e) * 0.2;

    } else if (subcommand.name === "total") {
      const leader = subcommand.options?.find(o => o.name === "leader")?.value as number ?? 0;
      const total = subcommand.options?.find(o => o.name === "total")?.value as number ?? 0;

      effectiveValue = leader + (total - leader) * 0.2;
    }

    await interaction.respond({
      content: `実効値: ${effectiveValue}`,
    });
  },
});
