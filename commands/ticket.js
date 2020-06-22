module.exports = async (bot, message, args) => {
 await bot.ticket.findOne({ userID: message.author.id }, async (err, res) => {
   if (err) {
    message.reply('Error telah terjadi silahkan hubungi staff untuk mengeceknya!');
    console.log(err);
   }
   if (res) {
    return message.channel.send('Ticket kamu sudah ada sebelumnya mohon gunakan yang lama dulu!');
   } else {
    
    message.guild.channels.create(`ticket-${message.author.id}`, {
    type: 'text',
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
    }).then(ch => {
     bot.ticket.userID = message.author.id;
     bot.ticket.channelID = ch.id;
     
     bot.ticket.save().then(err => {
      if (err) 
      {
       console.log(err);
      }
     ch.send({ embed: { color: 5921535, title: 'Ticket Support', description: 'Silahkan ketik keluhan atau apa saja disini yang anda butuhkan!', footer: { text: '© Copyright 2020 ChickenJS' }});
     message.reply('Your Ticket Support Channel: <#${ch.id}>`);
     })
    })
   }
 })
}
