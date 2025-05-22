// loadCommands.ts
import { Collection } from "npm:discord.js";
import * as eventpoint from "./commands/eventpoint.ts";
import * as skillrate from "./commands/skillrate.ts";

export function loadCommands() {
  const commands = new Collection<string, any>();
  commands.set(eventpoint.data.name, eventpoint);
  commands.set(skillrate.data.name, skillrate);
  return commands;
}
