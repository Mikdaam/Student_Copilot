import { MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInt } from '../interfaces/CommandInt';
import { CommandList } from '../commands/_CommandList';

export const help: CommandInt = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays this message'),
    run: async (interaction) => {
        await interaction.deferReply();

        const embed = new MessageEmbed();
        embed.setTitle('Help');
        embed.setDescription('This is a list of commands available to you.');
        embed.setColor(0x00FF00);
        embed.setAuthor({
            name: interaction.user.tag,
            iconURL: interaction.user.displayAvatarURL(),
        });
    
        for (const command of CommandList) {
            embed.addField(command.data.name, command.data.description);
        }
        embed.setFooter({text : 'Type `help <command>` for more info on a command.'});

        await interaction.editReply({embeds: [embed]});
    }
}