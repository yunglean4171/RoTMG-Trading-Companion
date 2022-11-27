const { SlashCommandBuilder} = require('discord.js');
const axios = require('axios');
const {apiurl} = require('PATH_TO/config.json');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('listtos')
		.setDescription('Lists all your trade offers'),
	async execute(interaction) {
			const response = await axios.get(`${apiurl}/get/dcid/${interaction.user.id}`);
			const user = global.client.users.cache.get(interaction.member.user.id);
			if(JSON.stringify(response.data) == "[]")
			{
				interaction.reply("You have not posted any trade offers yet!")
			} else {
				user.send("```\n```")
				JSON.parse(JSON.stringify(response.data)).forEach(function(element) {
					user.send("```" + `ID: ${element.ID}\nYour item(s): ${element.ITEM1} x${element.Q1}\nfor\n${element.ITEM2} x${element.Q2}` + "```").catch(console.error);
				});
				interaction.reply("List of your trade offers has been sent in DM")
			}
	},
};

