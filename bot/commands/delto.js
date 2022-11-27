const { SlashCommandBuilder} = require('discord.js');
const axios = require('axios');
const {apiurl} = require('PATH_TO/config.json');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('delto')
		.setDescription('Deletes your trade offer with given ID')
		.addIntegerOption(option =>
			option
				.setName('id')
				.setDescription('Provide ID of your trade offer you want to delete')),
	async execute(interaction) {
		const id = interaction.options.getInteger('id') ?? 'No ID provided';
		if(!(id == 'No ID provided')){
			const response = await axios.get(`${apiurl}/get/id/${id}`);
			if(response.data[0].DCID = interaction.user.id) {
				const channelId = response.data[0].CHANNELID;
				const messageId = response.data[0].MESSAGEID;

				global.client.channels.fetch(channelId).then(channel => {
					channel.messages.delete(messageId);
				});
				await axios.delete(`${apiurl}/del/${id}`)
				interaction.reply("Trade offer has been successfuly deleted!")
			} else {interaction.reply("It's not your trade offer you're trying to delete!")}
		}

	},
};

