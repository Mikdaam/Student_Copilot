import { MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInt } from '../interfaces/CommandInt';

export const delet: CommandInt = {
    data: new SlashCommandBuilder()
        .setName('delete')
        .setDescription('Supprimer un rappel pour d\'examen.')
        .addStringOption(option => 
            option.setName('examen')
                .setRequired(true)
                .setDescription('L\'examen à ajouter.')
        ),

    run: async (interaction) => {
        const examen = interaction.options.getString('examen', true);

        console.log(examen);
        
        await interaction.reply(`Exam: ${examen}`);
        await interaction.followUp(examen);
    }
}