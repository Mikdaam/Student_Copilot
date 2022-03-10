import dotenv from 'dotenv';
import { Client } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

import { CommandList } from '../commands/_CommandList';
import remainder from '../utils/remainder';

dotenv.config();

export const onReady = async (BOT: Client) => {
    const rest = new REST({version: '9'}).setToken(process.env.TOKEN as string);

    const commandData = CommandList.map(command => command.data.toJSON());

    await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID as string, process.env.GUILD_ID as string),
        {body: commandData}
    );
    
    console.log('Commands successfully registered.');
    console.log('Bot is ready');

    remainder(BOT);
}