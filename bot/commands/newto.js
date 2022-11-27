const { SlashCommandBuilder, EmbedBuilder, escapeEscape } = require('discord.js');
const axios = require('axios');
const { sortbycategories, tradeoffers, weapons, armors, abillities, rings, misc, peteggs, feedpoweritems, forgeitems, skins, potions, consumables, apiurl } = require('PATH_TO/config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('newto')
		.setDescription('/newto <ITEM_YOU_HAVE_> <QUANTITY> <ITEM_YOU_WANT> <QUANTITY> <IN_GAME_NAME> <CATEGORY>')
		.addStringOption(option =>
			option
				.setName('item1')
				.setDescription('Provide Item that youre selling'))
       .addIntegerOption(option =>
            option
                .setName('quantity1')
                .setDescription('Provide quantity of item you want to sell'))
        .addStringOption(option =>
            option
                .setName('item2')
                .setDescription('Provide Item that you want to buy'))
        .addIntegerOption(option =>
            option
                .setName('quantity2')
                .setDescription('Provide quantity of item you want to buy'))
        .addStringOption(option =>
            option
                .setName('ingamename')
                .setDescription('Provide your in game name'))
        .addStringOption(option =>
            option.setName('category')
                .setDescription('The gif category')
                .setRequired(false)
                .addChoices(
                    { name: 'Weapons', value: 'Weapons' },
                    { name: 'Armors', value: 'Armors' },
                    { name: 'Abillities', value: 'Abillities' },
                    { name: 'Rings', value: 'Rings' },
                    { name: 'Misc', value: 'Misc' },
                    { name: 'Pet-Eggs', value: 'Pet-Eggs' },
                    { name: 'Feed-power-items', value: 'Feed-power-items' },
                    { name: 'Forge-items', value: 'Forge-items' },
                    { name: 'Skins', value: 'Skins' },
                    { name: 'Potions', value: 'Potions' },
                    { name: 'Consumables', value: 'Consumables' },
                )),

        async execute(interaction) {

            const iyh = interaction.options.getString('item1') ?? 'No item provided';
            const quantityiyh = interaction.options.getInteger('quantity1') ?? 'No quantity provided';
            const iyw = interaction.options.getString('item2') ?? 'No item provided';
            const quantityiyw = interaction.options.getInteger('quantity2') ?? 'No quantity provided';
            const ign = interaction.options.getString('ingamename') ?? 'No IGN provided';
            const category = interaction.options.getString('category') ?? 'No category provided';
            //posting trade offer to database
            if(!({iyh, iyw} == 'No item provided' || {quantityiyh, quantityiyw} == 'No quantity provided' || ign == 'No IGN provided' || category == 'No category provided') ){

                axios.post(`${apiurl}/post`, {
                    dcid: interaction.user.id,
                    dcname: interaction.user.username + '#' + interaction.user.discriminator,
                    category: category,
                    ign: ign,
                    item1: iyh,
                    q1: quantityiyh,
                    item2: iyw,
                    q2: quantityiyw
                  })
                  .then(async function (response) {
                        interaction.reply('Trade offer has been successfuly posted!');
                        
                        const ID = response.data.insertId;

                        const Embed = new EmbedBuilder()
                        .setColor("0xf3f3f3")
                        .setTitle(`**New Trade Offer | ID ${ID}**`)
                        .setDescription(`**>** ***${iyh} x${quantityiyh}***\n\n *FOR* ⬇️ \n\n**>** ***${iyw} x${quantityiyw}***\n\n*In Game Name: ${ign}\nPosted by: <@${interaction.user.id}>*`)
                        .setThumbnail('https://i.imgur.com/tWHbkV8.png')
                        .setFooter({text: "made by yunglean_#4171"});

                        //Sending trade offer to channel specified by item category and grabbing ids
                        async function execute(cid){
                            const channel = await global.client.channels.fetch(cid)
                            let message = await channel.send({embeds: [Embed]})
    
                            const mid = message.id; //get id of message sent by bot
                            //update messageid column
                            await axios.put(`${apiurl}/put`, { mid: mid, cid: cid, id: ID});  
                        }

                        //Sending trade offer to channel specified by item category and grabbing ids
                        if(sortbycategories){
                            if(category == "Weapons"){
                                execute(weapons);
                            } else if(category == "Armors") {                            
                                execute(armors);
                            } else if(category == "Abillities") {                            
                                execute(abillities);
                            } else if(category == "Rings") {                            
                                execute(rings);
                            } else if(category == "Misc") {                            
                                execute(misc);
                            } else if(category == "Pet-eggs") {                            
                                execute(peteggs);
                            } else if(category == "Feed-power-items") {                            
                                execute(feedpoweritems);
                            } else if(category == "Forge-items") {                            
                                execute(forgeitems);
                            } else if(category == "Skins") {                            
                                execute(skins);
                            } else if(category == "Potions") {                            
                                execute(potions);
                            } else if(category == "Consumables") {                            
                                execute(consumables);
                            }
                        } else {
                            execute(tradeoffers);
                        }                  
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
            } 
            else{
                const Embed = new EmbedBuilder()
                    .setColor("0xfc031c")
                    .setTitle("**Error(s) occured while execution /newto command:**")
                    .setDescription(`${iyh}\n${quantityiyh}\n${iyw}\n${quantityiyw}\n${ign}\n${category}`)
                    .setThumbnail('https://i.imgur.com/JhKH9Hd.png')
                    .setFooter({text: "made by yunglean_#4171"});
                await interaction.reply({ embeds: [Embed] });
            }
        },
};