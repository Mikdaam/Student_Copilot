import { MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInt } from '../interfaces/CommandInt';

export const add: CommandInt = {
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription('Ajoute un rappel pour l\'examen donné en argument.')
        .addStringOption(option => 
            option.setName('examen')
                .setRequired(true)
                .setDescription('L\'examen à ajouter.')
        )
        .addStringOption(option => 
            option.setName('date')
                .setRequired(true)
                .setDescription('La date de l\'examen.')
        )
        .addStringOption(option => 
            option.setName('heure')
                .setRequired(true)
                .setDescription('L\'heure de l\'examen.')
        )
        .addRoleOption(option => 
            option.setName('groupe')
                .setDescription('Le groupe qui passe l\'examen.')
        ),

    run: async (interaction) => {
        const examen = interaction.options.getString('examen', true);
        const date = interaction.options.getString('date', true);
        const heure = interaction.options.getString('heure', true);
        const groupe = interaction.options.getRole('groupe');
        
        const successEmbed = new MessageEmbed();

        const dataReg = /^\d{2}([./-])\d{2}([./-])\d{4}$/;
        const heureReg = /^\d{2}:\d{2}$/;
        
        if (!dataReg.test(date) || !dataReg.test(heure)) {
            const errorEmbed = new MessageEmbed();
            errorEmbed.setTitle('Erreur');
            errorEmbed.setColor(0xFF0000);

            if (!dataReg.test(date)) {
                errorEmbed.addField('Date', ':crossmark: La date doit être au format jj/mm/aaaa \
                ou jj.mm.aaaa ou jj-mm-aaaa.');
            }
    
            if (!heureReg.test(heure)) {
                errorEmbed.addField('Heure', ':crossmark: L\'heure doit être au format hh:mm.');
            }

            await interaction.reply({embeds: [errorEmbed], ephemeral: true});
        }
         
        

        console.log(examen, date, heure, groupe);

        await interaction.followUp(examen);
    }
}