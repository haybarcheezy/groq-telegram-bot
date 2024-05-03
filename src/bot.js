import { Bot } from "grammy";
import Groq from "groq-sdk";
import 'dotenv/config';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const bot = new Bot(
  process.env.TELEGRAM_BOT_TOKEN,
);

const chatModels = {};

const modelAliases = {
  "mixtral": "mixtral-8x7b-32768",
  "llama3-70b": "llama3-70b-8192",
  "llama3-8b": "llama3-8b-8192",
  "gemma": "gemma-7b-it"
};

function getCurrentModel(chatId) {
  return chatModels[chatId] || "mixtral-8x7b-32768";
}

function setCurrentModel(chatId, model) {
  chatModels[chatId] = model;
}

async function getGroqResponse(query, model) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: query,
        },
      ],
      model: model,
      temperature: 0.9,
      max_tokens: 4096,
      top_p: 1,
      stop: null,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error(error);
  }
}

function getMaxTokens(model) {
  switch (model) {
    case "mixtral-8x7b-32768":
      return 4096;
    case "llama3-70b-8192":
    case "llama3-8b-8192":
      return 2048;
    case "gemma-7b-it":
      return 1024;
    default:
      return 4096;
  }
}
bot.command("info", (ctx) => {
  const currentModel = getCurrentModel(ctx.chat.id);
  const maxTokens = getMaxTokens(currentModel);
  ctx.reply(`Current model: ${currentModel}\nMax tokens: ${maxTokens}`);
});

bot.command("help", (ctx) => {
  ctx.reply("Here are the commands you can use:\n" +
    "/model [model_name] - Switch the AI model (available: mixtral, llama3-70b, llama3-8b, gemma)\n" +
    "Example: /model mixtral\n" +
    "/help - Shows all available commands and their descriptions.");
});

bot.command("model", (ctx) => {
  const alias = ctx.message.text.split(" ")[1];
  const model = modelAliases[alias];

  if (model) {
    setCurrentModel(ctx.chat.id, model);
    ctx.reply(`Model set to ${model}`);
  } else {
    ctx.reply("Invalid model command. Use /model followed by one of these: mixtral, llama3-70b, llama3-8b, gemma");
  }
});

bot.on("message:text", async (ctx) => {
  const currentModel = getCurrentModel(ctx.chat.id);
  const response = await getGroqResponse(ctx.message.text, currentModel);


  ctx.reply(response, { parse_mode: "Markdown" });
});
bot.start();
