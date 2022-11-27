const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token, apiurl } = require('./config.json');
const { Collection } = require('discord.js');
const axios = require('axios');

// Create a new client instance
global.client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});


client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

async function clearChannels() {
	let deleted_tos = 0;
	const response = await axios.get(`${apiurl}/get/all`);

	JSON.parse(JSON.stringify(response.data)).forEach(async function(element) {
		const timestamp = new Date(element.CTS) // milliseconds
		const now = new Date() // milliseconds
		const isPast24hrs = now - timestamp > (60 * 60 * 24 * 1000) // millisecond value
		
		if(isPast24hrs) {
			//deleting message
            client.channels.fetch(element.CHANNELID).then(channel => {
                channel.messages.delete(element.MESSAGEID);
            });
			// //deleting row
			await axios.delete(`${apiurl}/del/${element.ID}`)
			deleted_tos ++;
		}
	});
	console.log(`\n Trade offers deleted: ${deleted_tos}`)
}

const runEveryFullHours = (callbackFn) => {
	const Hour = 60 * 60 * 1000;
	const currentDate = new Date();
	const firstCall =  Hour - (currentDate.getMinutes() * 60 + currentDate.getSeconds()) * 1000 - currentDate.getMilliseconds();
	setTimeout(() => {
	  callbackFn();
	  setInterval(callbackFn, Hour);
	}, firstCall);
  };

// Log in to Discord with your client's token
client.login(token);
runEveryFullHours(() => clearChannels());