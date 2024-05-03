# Telegram Bot for Groq's LPU AI Interaction

This repository contains the source code for a Telegram bot that facilitates interaction with Groq's Language Processing Unit (LPU) AI models. The bot allows users to select between various pre-trained models provided by Groq, including:

- **mixtral**: A powerful 8.7 billion parameter model trained on a diverse corpus of data.
- **llama3-70b**: A large 70 billion parameter model focused on general language understanding and generation.
- **llama3-8b**: A more compact 8 billion parameter model, also trained for general language tasks.
- **gemma**: A specialized 7 billion parameter model trained for Italian language understanding and generation.

## Getting Started

To get started with this Telegram bot, you'll need to obtain a Telegram bot token and a Groq API key. Follow the steps below to set up your bot:

1. **Create a Bot on Telegram:**
   - Open Telegram and search for the "BotFather" user.
   - Start a chat with BotFather and use the `/newbot` command to create a new bot.
   - Follow the instructions to choose a name and username for your bot.

2. **Get the Bot Token:**
   - After creating the bot, BotFather will provide you with a token. Copy this token.

3. **Obtain a Groq API Key:**
   - Go to [Groq's developer panel](https://console.groq.com/keys).
   - Sign in or create a new account if you haven't already.
   - Follow the instructions to create a new API key. Make sure to copy the generated API key.

4. **Set Up Environment Variables:**
   - Create a `.env` file in the root directory of this project.
   - Inside the `.env` file, add the following lines:
     ```
     TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
     GROQ_API_KEY=your_groq_api_key_here
     ```
   - Replace `your_telegram_bot_token_here` with the token you obtained from BotFather, and `your_groq_api_key_here` with the API key you obtained from Groq.

## Running the Bot

Once you have obtained the Telegram bot token and set it up as an environment variable, you can run the bot locally or deploy it to a server. Follow the instructions in the project's documentation to run the bot and start interacting with Groq's LPU AI models through Telegram.

During the interaction, users can select the desired model by typing the model name (e.g., `mixtral`, `llama3-70b`, `llama3-8b`, or `gemma`). The bot will then use the selected model to generate responses to user queries.

## Contributing

Contributions are welcome! If you have any ideas for improvements or new features, feel free to open an issue or submit a pull request. Let's make this Telegram bot even better together!

