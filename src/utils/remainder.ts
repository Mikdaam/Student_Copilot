import { PrismaClient } from "@prisma/client";
import { Client, MessageEmbed, TextChannel } from "discord.js";
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const getDaysFromNow = (date: Date) => {
    const now = new Date();
    const diff = date.getDate() - now.getDate();
    return diff;
}

const remainder = async (client: Client) => {
    const remainders = await prisma.remainder.findMany({
        where: {
            remainder_date: {
                lte: new Date()
            }
        },
        include: {
            event: true
        }
    });

    if (remainders.length != 0) {
        for (const remainder of remainders) {
            const remainderMessage = new MessageEmbed()
                .setTitle(':alarm_clock: Rappel')
                .setColor('#0099ff')
                .setDescription(`Dans ${getDaysFromNow(remainder.event.event_date)} jours, il y a :`)
                .addField(remainder.event.name, remainder.event.description)
                .addField('', `<@&${remainder.event.event_group}>, Il est temps de se préparer !`)
                .setFooter('Rappel automatique');

            const remainderChannel = client.channels.cache.get(process.env.CHANNEL_ID || '') as TextChannel;

            remainderChannel.send({embeds: [remainderMessage]});
        }
    }

    await prisma.remainder.deleteMany({
        where: {
            remainder_date: {
                lte: new Date()
            }
        }
    });

    setTimeout(async () => {
        await remainder(client);
    }, 1000 * 60 * 60);
}

export default remainder;