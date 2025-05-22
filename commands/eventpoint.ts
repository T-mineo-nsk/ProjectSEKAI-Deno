import {
  createSlashCommand,
  Interaction,
} from "discordeno/interactions";

export const eventpoint = createSlashCommand({
  name: "eventpoint",
  description: "イベントポイントを計算します",
  options: [
    {
      name: "score",
      description: "あなたのスコア",
      type: 4, // INTEGER
      required: true,
    },
    {
      name: "formation_bonus",
      description: "編成ボーナス（+%）",
      type: 4,
      required: true,
    },
    {
      name: "stage_multiplier",
      description: "ステージ倍率",
      type: 4,
      required: true,
    },
    {
      name: "play_point",
      description: "プレイポイント消費量（0〜10）",
      type: 4,
      required: true,
    },
  ],
  execute: async (interaction: Interaction) => {
    const score = interaction.data?.options?.find(o => o.name === "score")?.value as number;
    const formation_bonus = interaction.data?.options?.find(o => o.name === "formation_bonus")?.value as number;
    const stage_multiplier = interaction.data?.options?.find(o => o.name === "stage_multiplier")?.value as number;
    const play_point = interaction.data?.options?.find(o => o.name === "play_point")?.value as number;

    const playBonusTable: Record<number, number> = {
      0: 1, 1: 5, 2: 10, 3: 15, 4: 20,
      5: 25, 6: 27, 7: 29, 8: 31, 9: 33, 10: 35,
    };

    if (!(play_point in playBonusTable)) {
      return interaction.respond({ content: "プレイポイント消費量は0〜10の範囲で入力してください。", ephemeral: true });
    }

    const self_score_bonus = Math.floor(score / 17000);
    const other_score_bonus = 13;
    const formation_bonus_multiplier = (formation_bonus / 100) + 1;
    const play_bonus = playBonusTable[play_point];

    const event_point = (110 + self_score_bonus + other_score_bonus)
      * formation_bonus_multiplier * stage_multiplier / 100 * play_bonus;

    await interaction.respond({
      content: `イベントポイント: ${Math.floor(event_point)}`,
    });
  }
});
