const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Shows informations about bot\'s\ commands'),
	async execute(interaction) {
        const Embed = new EmbedBuilder()
        .setColor("0xffffff")
        .setTitle("**ℹ️ Commands Info**")
        .setDescription("To post new trade offer run */newto* command\nTo delete one run */delto* command\nTo list all your trade offers run */listtos*")
        .setThumbnail('https://i.imgur.com/tWHbkV8.png')
        .setFooter({text: "made by yunglean_#4171"});
    interaction.reply({ embeds: [Embed] });
	},
};