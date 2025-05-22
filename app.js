// app.ts (Deno対応)
import { Client, GatewayIntentBits, Collection } from "https://esm.sh/discord.js@14.13.0";
import { loadCommands } from "./utils/loadCommands.ts";

// 環境変数は Deno.env.get で取得
const TOKEN = Deno.env.get("DISCORD_TOKEN");
if (!TOKEN) throw new Error("DISCORD_TOKEN が設定されていません");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

// コマンド読み込み
await loadCommands(client);

client.once("ready", () => {
  console.log(`ログイン成功: ${client.user.tag}`);
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: "エラーが発生しました", ephemeral: true });
  }
});

client.login(TOKEN);
