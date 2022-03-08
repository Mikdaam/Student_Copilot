import { MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInt } from '../interfaces/CommandInt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/*async function main() {
    await prisma.event.create({
        data: {
            name: 'cybersecurite',
            description: 'Examen de cybersecurité',
            event_date: new Date('2020-09-01'),
            event_group: 'Toto',
            week_remainder_date: new Date('2020-09-01'),
            two_days_remainder_date: new Date('2020-09-01'),
            day_prior_remainder_date: new Date('2020-09-01'),
        }
    })
}*/

export const add: CommandInt = {
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription('Ajoute un évenement au rappel')
        .addStringOption(option => 
            option.setName('examen')
                .setRequired(true)
                .setDescription('L\'évenement à ajouter.')
        )
        .addStringOption(option => 
            option.setName('date')
                .setRequired(true)
                .setDescription('La date de l\'évenement.')
        )
        .addStringOption(option => 
            option.setName('heure')
                .setRequired(true)
                .setDescription('L\'heure de l\'évenement.')
        )
        .addRoleOption(option => 
            option.setName('groupe')
                .setDescription('Le groupe dont l\'évenement concerne.')
        ),

    run: async (interaction) => {
        const examen = interaction.options.getString('examen', true);
        const stringDate = interaction.options.getString('date', true);
        const hour = interaction.options.getString('heure', true);
        const groupe = interaction.options.getRole('groupe');
        
        const successEmbed = new MessageEmbed();

        const dateReg = /^\d{2}([./-])\d{2}([./-])\d{4}$/;
        const hourReg = /^\d{2}:\d{2}$/;
        
        if (!dateReg.test(stringDate) || !hourReg.test(hour)) {
            const errorEmbed = new MessageEmbed();
            errorEmbed.setTitle('Erreur');
            errorEmbed.setColor(0xFF0000);

            if (!dateReg.test(stringDate)) {
                errorEmbed.addField('Date', ':crossmark: La date doit être au format jj/mm/aaaa \
                ou jj.mm.aaaa ou jj-mm-aaaa.');
            }
    
            if (!hourReg.test(hour)) {
                errorEmbed.addField('Heure', ':crossmark: L\'heure doit être au format hh:mm.');
            }

            await interaction.reply({embeds: [errorEmbed], ephemeral: true});
        }
        const formatDate = stringDate.replace(/(\d+[./-])(\d+[./-])/, '$2$1');
        
        let eventDate = new Date(`${formatDate} ${hour}`);

        if (eventDate.getTime() < Date.now()) {
            const errorEmbed = new MessageEmbed();
            errorEmbed.setTitle('Erreur');
            errorEmbed.setColor(0xFF0000);
            errorEmbed.addField('Date', 'Impossible de créer un evenement à une date passée.');

            await interaction.reply({embeds: [errorEmbed], ephemeral: true});
        }
        
        if(!groupe) {
            
        }
        /*if (groupe) {
            successEmbed.setTitle('Ajout d\'un évenement');
            successEmbed.setColor(0x00FF00);
            successEmbed.addField('Évenement', examen);
            successEmbed.addField('Date', eventDate.toLocaleDateString());
            successEmbed.addField('Heure', eventDate.toLocaleTimeString());
            successEmbed.addField('Groupe', groupe.name);

            await interaction.reply({embeds: [successEmbed]});
        }*/

        const oneWeekBefore = new Date(eventDate.setDate(eventDate.getDate() - 7));

        eventDate = new Date(`${formatDate} ${hour}`);
        const twoDayBefore = new Date(eventDate.setDate(eventDate.getDate() - 2));

        eventDate = new Date(`${formatDate} ${hour}`);
        const oneDayBefore = new Date(eventDate.setDate(eventDate.getDate() - 1));

        await prisma.event.create({
            data: {
                name: examen,
                description: 'Examen de cybersecurité',
                event_date: eventDate,
                event_group: groupe ? groupe.name : 'everyone',
                week_remainder_date: oneWeekBefore,
                two_days_remainder_date: twoDayBefore,
                day_prior_remainder_date: oneDayBefore,
            }
        });

        if (Date.now() > oneWeekBefore) {
            let callInTwoDays = Date.now() - twoDayBefore;
            let callTomorrow = Date.now() - oneWeekBefore;
        } 
        
        if (Date.now() > twoDayBefore) {
            let callTomorrow = Date.now() - oneWeekBefore;
        }

        let callInWeek = Date.now() - oneWeekBefore;
        let callInTwoDays = Date.now() - twoDayBefore;
        let callTomorrow = Date.now() - oneWeekBefore;
        


        setTimeout(() => {
            // recuperer les donnes à afficher, 

            // Afficher les !

            // supprimer l'evenement de la bD
            
        }, callInWeek);

        const allEvents = await prisma.event.findMany();

        await prisma.$disconnect();

        console.log(examen, stringDate, hour, groupe);
        console.log(allEvents);

        //await interaction.followUp(examen);
    }
}