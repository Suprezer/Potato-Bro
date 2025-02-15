const { SlashCommandBuilder, MessageFlagsBitField } = require('discord.js');

module.exports = {
    category: 'valentine',
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('letter')
        .setDescription('Send a Valentine\'s Day letter to someone special')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user to send the letter to')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('message')
                .setDescription('The message to include in the letter')
                .setRequired(true)),

        async execute(interaction) {
            const user = interaction.options.getUser('user');
            const message = interaction.options.getString('message');
        
            // Function to wrap text at a specific width
            function wrapText(text, width) {
                const words = text.split(' ');
                let lines = [];
                let currentLine = '';
        
                words.forEach(word => {
                    if (currentLine.length + word.length + 1 <= width) {
                        currentLine += (currentLine.length === 0 ? '' : ' ') + word;
                    } else {
                        lines.push(currentLine);
                        currentLine = word;
                    }
                });
                lines.push(currentLine);
                return lines;
            }
        
            // Wrap the message text at 35 characters
            const wrappedMessage = wrapText(message, 35);
        
            const letter = `\`\`\`
                        🌹   🌹   🌹
            ┌─────────────────────────────────────┐
            │      💝 Happy Valentine's Day! 💝  │
            └─────────────────────────────────────┘

            Dear ${user.username},

${wrappedMessage.map(line => `            ${line}`).join('\n')}

            With love,
            ${interaction.user.username}

            🌹   🌹   🌹
\`\`\``;
        
            try {
                await user.send({ content: letter });
                await interaction.reply({ content: `Your letter has been sent to ${user.username}!`, ephemeral: true });
            } catch (error) {
                await interaction.reply({ content: `I couldn't send the letter to ${user.username}. They might have DMs disabled.`, ephemeral: true });
            }
        }
};