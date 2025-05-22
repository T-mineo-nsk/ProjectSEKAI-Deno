// types.ts
import { Client, Collection, GatewayIntents } from "npm:discord.js";
import type { Command } from "./commands.ts"; // Command型があれば

export class ExtendedClient extends Client {
  commands: Collection<string, Command>;

  constructor(options: ConstructorParameters<typeof Client>[0]) {
    super(options);
    this.commands = new Collection();
  }
}
