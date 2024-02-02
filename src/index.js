import { Client, Events, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  organization: process.env.ORGANIZATION,
  apiKey: process.env.OPEN_API_API_KEY,
});

const discordToken = process.env.DISCORD_BOT_TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

async function generateMessage(parsedMessages) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Je vais te donner une liste de messages stringifiée envoyés sur discord. Ils seront sous le format suivant: {author: authorName, content: messageContent}. Je veux que tu m'en fasses un résumé. Voici la liste des messages: ${JSON.stringify(
          parsedMessages
        )}.`,
      },
    ],
    model: "gpt-4",
  });

  return completion.choices[0];
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "tldr") {
    const lastMessages = await interaction.channel.messages.fetch({
      limit: 30,
    });
    const parsedMessages = lastMessages.map((message) => ({
      author: message.author.displayName,
      content: message.content,
    }));
    await interaction.deferReply("Génération de la réponse...");
    const res = await generateMessage(parsedMessages);
    interaction.editReply(res.message);
  }
});

client.login(discordToken);
