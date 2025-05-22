// commands.ts
import type { ChatInputCommandInteraction } from "npm:discord.js";

export interface Command {
  data: {
    name: string;
    // 他に必要なコマンド情報
  };
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}
