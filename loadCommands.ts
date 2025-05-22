// utils/loadCommands.ts
import { Collection } from "https://esm.sh/discord.js@14.13.0";

import eventpoint from "./commands/eventpoint.ts";
import skillrate from "./commands/skillrate.ts";

export function loadCommands() {
  return [eventpoint, skillrate];
}
