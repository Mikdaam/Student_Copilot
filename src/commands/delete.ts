import { MessageActionRow, MessageSelectMenu, MessageSelectOptionData } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInt } from '../interfaces/CommandInt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const delet: CommandInt = {
    data: new SlashCommandBuilder()
        .setName('delete')
        .setDescription('Supprimer un evenement.'),

    run: async (interaction) => {
        //const event = interaction.options.getString('event', true);
        await interaction.deferReply({ephemeral: true});

        /*const options: MessageSelectOptionData[] = [];

        const availableEvent = await prisma.event.findMany();
        await prisma.$disconnect();

        for (const event of availableEvent) {
            options.push({
                label: `${event.name}`,
                description: `${event.description}`,
                value: `${event.id}`
            });
        }

        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('event')
                    .setPlaceholder('Choisissez un evenement')
                    .addOptions([
                        {
							label: 'Select me',
							description: 'This is a description',
							value: 'first_option',
						},
						{
							label: 'You can select me too',
							description: 'This is also a description',
							value: 'second_option',
						}
                    ])
            );
        
        //console.log(event);
        await interaction.editReply({content: 'Veuillez choisir l\'evenement à supprimer', components: [row]});
        */
       await interaction.editReply({content: 'Veuillez choisir l\'evenement à supprimer'});
    }
}