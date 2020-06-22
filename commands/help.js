const { MessageEmbed: o } = require('discord.js');

module.exports = async (bot, message, args) => {

 const embed = new o()
 .setColor('RANDOM')
 .setTitle('Help command for Chicken Store Bot!')
 .setDescription(`Hello **${message.author.tag}** welcome to chicken store!`)
 .setThumbnail(message.guild.iconURL())
 .addField('📪 Customer', `\`order\`,\`ticket\``)
 .addField('📊 General', `\`say\`,\`help\`,\`mcserver\``)
 .setTimestamp();
 
 message.channel.send(embed);
}
