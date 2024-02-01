import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const commands = [
  {
    name: "tldr",
    description: "Get a summary of the recent conversation",
  },
];

const rest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_BOT_TOKEN
);

try {
  console.log("Started refreshing application (/) commands.");
  await rest.put(
    Routes.applicationCommands(process.env.DISCORD_BOT_CLIENT_ID),
    { body: commands }
  );
  console.log("Successfully reloaded application (/) commands.");
} catch (error) {
  console.log(error);
}
