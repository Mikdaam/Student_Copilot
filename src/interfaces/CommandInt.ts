import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export interface CommandInt {
    data: 
        | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
        | SlashCommandSubcommandsOnlyBuilder;
    run: (interaction: CommandInteraction) => Promise<void>;
}