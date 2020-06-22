const { MessageEmbed } = require("discord.js");

module.exports = async (bot, message, args) => {

 let findCh = message.guild.channels.cache.find(x => x.name === `order-${message.author.id}`);
 
 if (findCh) return message.reply('Please use your old channel!');
 else {
  message.guild.channels.create(`order-${message.author.id}`, {
   type: 'text',
   topic: 'Please enter your order!',
   permissionOverwrites: [
    {
     id: message.guild.id,
     deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
    },
    {
     id: message.author.id,
     allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
    }
   ]
  }).then(channel => {
   const e = new MessageEmbed()
   .setColor('RANDOM')
   .setDescription(`Halo <@!${message.author.id}> silahkan ketik orderan kamu atau hubungi <@!723541917400563771> atau staff yang aktif lainnya.`)
   .setTimestamp()
   .setThumbnail(message.author.displayAvatarURL());
   channel.send(e);
   message.reply(`Channel Order Kamu <#${channel.id}>`);
  })
 }
}
