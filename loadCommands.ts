// utils/loadCommands.ts
import { Collection } from "https://esm.sh/discord.js@14.13.0";

// 必要に応じてコマンドをここで直接インポートする形式に変えます
import { eventPointCommand } from "../commands/eventpoint.ts";
import { skillRateCommand } from "../commands/skillrate.ts";

export async function loadCommands(client: any) {
  client.commands = new Collection();
  client.commands.set(eventPointCommand.data.name, eventPointCommand);
  client.commands.set(skillRateCommand.data.name, skillRateCommand);
}
