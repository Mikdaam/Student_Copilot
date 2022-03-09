import { Client } from 'discord.js';
import dotenv from 'dotenv';

import { validateEnv } from './utils/validateEnv';
import { onReady } from './events/onReady';
import { onInteraction } from './events/onInteraction';

dotenv.config();

// Don't be scre, it's an anonymous IIFE (see https://en.wikipedia.org/wiki/Immediately-invoked_function_expression)
(async () => {
    if (!validateEnv("TOKEN") && !validateEnv("CLIENT_ID") && validateEnv("GUILD_ID")) {return;}

    const BOT = new Client({ intents: ["GUILDS"] });

    BOT.on("ready", async () => await onReady(BOT));

    BOT.on('interaction', async (interaction) => await onInteraction(interaction));

    await BOT.login(process.env.TOKEN);
})();