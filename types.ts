// types.ts
import { Client, Collection } from "npm:discord.js";
import type { Command } from "./commands.ts"; // Commandの型があれば

export interface ExtendedClient extends Client {
  commands: Collection<string, Command>;
}
