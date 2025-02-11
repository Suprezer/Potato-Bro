const { SlashCommandBuilder} = require('discord.js');
const { request } = require('undici');
const { DeepLTranslationAPIKey } = require('../../../config.json');

module.exports = {
    category: 'translation',
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('quota')
        .setDescription('Get the current DeepL quota'),
    async execute(interaction) {
        await interaction.deferReply();

        try {
            const response = await request('https://api-free.deepl.com/v2/usage', {
                method: 'GET',
                headers: {
                    'Authorization': `DeepL-Auth-Key ${DeepLTranslationAPIKey}`,
                    'User-Agent': 'Potato-Bro/1.0.0',
                    'Content-Type': 'application/json',
                }
            });

            const returnedQuota = await response.body.json();
            const characterCount = returnedQuota.character_count;
            const characterLimit = returnedQuota.character_limit;

            await interaction.editReply(`You have used ${characterCount} out of ${characterLimit} characters.`);
        } catch (error) {
            console.error(error);
            await interaction.editReply('There was an error while retrieving the quota.');
        }
    },
}