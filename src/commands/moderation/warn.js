const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    category: 'moderation',
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warn a user')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user to warn')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('The reason for warning the user')
                .setRequired(false)),
    async execute(interaction) {
        const user = await interaction.options.getUser('user');
        const reason = await interaction.options.getString('reason') ?? 'No reason provided';

        await interaction.reply(`Warned ${user.tag} with the reason: ${reason}`);
        await interaction.guild.member.warn(user, { reason });
        
    }
};