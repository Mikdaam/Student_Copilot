import { MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInt } from '../interfaces/CommandInt';

export const view: CommandInt = {
    data: new SlashCommandBuilder()
        .setName('view')
        .setDescription('Ajoute un rappel pour l\'examen donné en argument.')
        .addSubcommand(subcommand => 
            subcommand.setName('week')
                .setDescription('Affiche les rappels de la semaine.')
        )
        .addSubcommand(subcommand => 
            subcommand.setName('month')
                .setDescription('Affiche les rappels du mois.')
        ),

    run: async (interaction) => {
        if (interaction.options.getSubcommand() === 'week') {
            await interaction.reply({content: 'Rapels de la semaine', ephemeral: true});
        } else if (interaction.options.getSubcommand() === 'month') {
            await interaction.reply({content: 'Rapels du mois', ephemeral: true});
        }
    }
}