const { MessageEmbed } = require("discord.js");

module.exports = async (bot, message, args) => {

 const serve = args[0];
 if (!serve) return message.channel.send('Please enter the Minecraft sever IP!');
 
 const { body: res } = await bot.req.get(`http://status.mclive.eu/Server/${serve}/25565/banner.png`)
 
 const embed = new MessageEmbed()
 .setColor('BLUE')
 .setAuthor(message.author.tag, message.author.displayAvatarURL())
 .attachFiles({ attachment: res, name: 'banner.png' })
 .setImage('attachment://banner.png')
 .setFooter(`© Copyright ${new Date().getFullYear()} ChickenJS`)
 .setTimestamp();
 message.channel.send(embed);
}
