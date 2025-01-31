// Setting up necessary discord.js classes and bot token
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('../config.json');

// Creating a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds]});

// Once the client is ready, run this code
client.once(Events.ClientReady, readyClient => {
    console.log(`Logged in as ${readyClient.user.tag}`);
});

// Login to Discord with the bot token
client.login(token);