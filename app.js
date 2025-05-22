import { load } from "https://deno.land/std@0.223.0/dotenv/mod.ts";
import { Client, GatewayIntentsBitField, Collection } from "npm:discord.js";
import { loadCommands } from "./loadCommands.ts";

const env = await load();
const client = new Client({
  intents: [GatewayIntentsBitField.Flags.Guilds],
});

client.commands = new Collection();
const commands = loadCommands();

for (const command of commands) {
  client.commands.set(command.data.name, command);
}

client.once("ready", () => {
  console.log(`ログイン成功: ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "エラーが発生しました",
      ephemeral: true,
    });
  }
});

await client.login(env["DISCORD_TOKEN"]);
