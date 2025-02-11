const { SlashCommandBuilder, PermissionFlagsBits, InteractionContextType } = require('discord.js');

module.exports = {
    category: 'moderation',
    cooldown: 10, // Cooldown in seconds
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Select a user to kick')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user to kick')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('The reason for kicking the user')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .setContexts(InteractionContextType.Guild), // Ensures it can only be done within the guild chat
        
    async execute(interaction) {
        const user = await interaction.options.getUser('user');
        const reason = await interaction.options.getString('reason') ?? 'No reason provided';

        await interaction.reply(`Kicked ${user.tag} with the reason: ${reason}`);
        await interaction.guild.members.kick(user, { reason });
    },
};