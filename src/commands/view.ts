import { MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInt } from '../interfaces/CommandInt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getFormatedHour = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}

export const view: CommandInt = {
    data: new SlashCommandBuilder()
        .setName('view')
        .setDescription('Ajoute un rappel pour l\'examen donné en argument.')
        .addSubcommand(subcommand => 
            subcommand.setName('week')
                .setDescription('Affiche les evenements de la semaine.')
        )
        .addSubcommand(subcommand => 
            subcommand.setName('month')
                .setDescription('Affiche les rappels du mois.')
        ),
    // ressourece pour dessiner svg: 
    // https://dev.to/en3sis/advanced-discord-js-custom-embeds-using-attachments-2bpn
    // https://editor.method.ac/
    // https://www.sliderrevolution.com/resources/html-calendar/
    // https://www.google.fr/search?q=svg+calendar+month+generator
    // https://akx.github.io/svg-calendar-generator/
    run: async (interaction) => {
        if (interaction.options.getSubcommand() === 'week') {
            await interaction.deferReply({ephemeral: true});

            const today = new Date();
            let firstDate = today.getDate() - today.getDay() + (today.getDay() == 0 ? -6:1);
            let lastDate = firstDate + 6;
            const startOfWeek = new Date(today.setDate(firstDate));
            const endOfWeek = new Date(today.setDate(lastDate));

            const events = await prisma.event.findMany({
                where: {
                    AND: [
                        {
                            event_date: {
                                gte: startOfWeek,
                            }
                        },
                        {
                            event_date: {
                                lte: endOfWeek,
                            }
                        },
                    ]
                }
            });

            await prisma.$disconnect();
        
            const embed = new MessageEmbed()
            .setTitle(':calendar_spiral: Evenement(s) de la semaine')
            .setDescription('Liste des evenements de la semaine')
            .setColor('#5eb92d')

            if(events.length == 0) {
                embed.addField('Aucun evenement', 'Aucun evenement n\'est prevu pour cette semaine.');
            } else {
                for (const event of events) {
                    embed.addField(
                        `Event : ${event.name}`,
                        `${event.description}\n:date: ${event.event_date.toDateString()}   :clock2: ${getFormatedHour(event.event_date)}`,
                        true
                    )
                }
            }
            await interaction.editReply({embeds: [embed]});

            console.log(events);

            //await interaction.editReply({content: 'Rapels de la semaine'});
        } else if (interaction.options.getSubcommand() === 'month') {
            await interaction.reply({content: 'Rapels du mois', ephemeral: true});
        }
    }
}