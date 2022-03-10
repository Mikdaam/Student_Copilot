import { PrismaClient } from "@prisma/client";
import { Channel, Client, MessageEmbed, TextChannel } from "discord.js";
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

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
                .setColor('#0099ff')
                .setTitle(remainder.event.name)
                .setDescription(remainder.event.description)
                .setFooter('Remainder');

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