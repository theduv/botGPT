import { Client, Events, GatewayIntentBits } from "discord.js";
import {
  addDoc,
  setDoc,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import dotenv from "dotenv";
import { db } from "./firebase.js";

dotenv.config();

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

client.on(Events.MessageCreate, async (interaction) => {
  if (interaction.author.bot) return;
  const res = await interaction.fetch();

  const fbObject = {
    content: res.content,
    author: interaction.author.id,
    channel: interaction.channel.id,
    date: interaction.createdTimestamp,
  };
  const document = doc(db, "messages", fbObject.channel);
  const owo = await getDoc(document);
  try {
    if (owo.exists()) {
      updateDoc(document, {
        messages: arrayUnion(fbObject),
      });
    } else {
      setDoc(doc(db, "messages", fbObject.channel), {
        id: interaction.channel.id,
        name: interaction.channel.name,
        messages: fbObject,
      });
    }
  } catch (e) {
    console.log(e);
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "tldr") {
    await interaction.reply("miaou");
  }
});

client.login(discordToken);
