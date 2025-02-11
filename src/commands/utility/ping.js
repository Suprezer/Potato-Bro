const { SlashCommandBuilder } = require('discord.js');

// Exporting the command module
module.exports = {
    category: 'utility',
    cooldown: 5, // Cooldown in seconds
    // Defining the command data using SlashCommandBuilder
    data: new SlashCommandBuilder()
        .setName('ping') // Setting the command name to 'ping'
        .setDescription('Replies with Pong!'), // Setting the command description
        
    // Defining the execute function that will run when the command is used
    async execute(interaction) {
        // Sending a reply to the interaction with the message 'Pong!'
        await interaction.reply('Pong!');
    },
};
