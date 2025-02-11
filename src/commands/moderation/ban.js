const { SlashCommandBuilder, PermissionFlagsBits, InteractionContextType } = require('discord.js');

module.exports = {
    category: 'moderation',
    cooldown: 10, // Cooldown in seconds
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Select a user to ban')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user to ban')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('The reason for banning the user')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setContexts(InteractionContextType.Guild), // Ensures it can only be done within the guild chat
    
    async execute(interaction) {
        const user = await interaction.options.getUser('user');
        const reason = await interaction.options.getString('reason') ?? 'No reason provided';

        await interaction.reply(`Banned ${user.tag} with the reason: ${reason}`);
        await interaction.guild.members.ban(user, { reason });
    },
};