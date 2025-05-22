// app.ts
import { Client, GatewayIntentsBitField, Collection } from "npm:discord.js";
import { loadCommands } from "./loadCommands.ts";

const client = new Client({
  intents: [GatewayIntentsBitField.Flags.Guilds],
});

const commands = loadCommands(); // Collection<string, Command>

client.once("ready", () => {
  console.log(`ログイン成功: ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);
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

const token = Deno.env.get("DISCORD_TOKEN");
if (!token) {
  console.error("DISCORD_TOKEN が設定されていません");
  Deno.exit(1);
}
await client.login(token);
