import { Interaction } from 'discord.js';
import { CommandList } from '../commands/_CommandList';

export const onInteraction = async (interaction: Interaction) => {
    if (!interaction.isCommand()) {return;}

    for (const command of CommandList) {
        if (command.data.name === interaction.commandName) {
            await command.run(interaction);
            break;
        }
    }
}