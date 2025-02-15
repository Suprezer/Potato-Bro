const { SlashCommandBuilder} = require('discord.js');
const { request } = require('undici');
const { DeepLTranslationAPIKey } = require('../../../config.json');

module.exports = {
    category: 'translation',
    cooldown: 1,
    data: new SlashCommandBuilder()
        .setName('t')
        .setDescription('Translate a text using DeepL')
        .addStringOption(option =>
            option
                .setName('text')
                .setDescription('The text to translate')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('target')
                .setDescription('The target language to translate to')
                .setRequired(true)),
        async execute(interaction) {
            await interaction.deferReply();

            const text = interaction.options.getString('text');
            const targetLanguage = interaction.options.getString('target');

            try {
                const response = await request('https://api-free.deepl.com/v2/translate', {
                    method: 'POST',
                    headers: {
                        'Authorization': `DeepL-Auth-Key ${DeepLTranslationAPIKey}`,
                        'User-Agent': 'Potato-Bro/1.0.0',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        text: [text],
                        target_lang: targetLanguage
                    })
                });
    
                const data = await response.body.json();
                const translatedText = data.translations[0].text;
                await interaction.editReply('Translated text: ' + translatedText);
            } catch (error) {
                console.error(error);
                await interaction.editReply('There was an error while translating the text.');
            }
        },
};