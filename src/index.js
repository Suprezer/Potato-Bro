// Setting up necessary discord.js classes and bot token
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('../config.json');
const fs = require('node:fs');
const path = require('node:path');

// Creating a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds]});

// Creating a new Collection to store commands
client.commands = new Collection();

// Creating a new Collection to store cooldowns
client.cooldowns = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// Reading all command files from the commands folder
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
            console.log(`[INFO] Loaded command ${command.data.name}`);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Reading all event files from the events folder
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
		console.log(`[INFO] Loaded once event ${event.name}`);
	} else {
		client.on(event.name, (...args) => event.execute(...args));
		console.log(`[INFO] Loaded event ${event.name}`);
	}
}

// Login to Discord with the bot token
client.login(token);