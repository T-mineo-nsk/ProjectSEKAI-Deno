import {
  startBot,
  Intents,
  createBot,
} from "https://deno.land/x/discordeno@18.0.1/mod.ts";
import { eventpoint } from "./commands/eventpoint.ts";
import { skillrate } from "./commands/skillrate.ts";

const token = Deno.env.get("DISCORD_TOKEN");
const botId = BigInt(Deno.env.get("DISCORD_APP_ID"));

if (!token || !botId) {
  console.error("DISCORD_TOKEN と DISCORD_APP_ID が必要です");
  Deno.exit(1);
}

const bot = createBot({
  token,
  botId,
  intents: Intents.Guilds,
  events: {
    ready() {
      console.log("✅ Bot が起動しました");
    },
  },
});

bot.utils.applicationCommands.create(eventpoint);
bot.utils.applicationCommands.create(skillrate);

await startBot(bot);
