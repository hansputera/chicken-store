module.exports = async (bot, message, args) => {



await bot.ticket.findOne({ userID: message.author.id }, (err, res) => {

if (err) {
 console.log(err);
 message.channel.send('_susuatu ada yang terjadi_ silahkan melapor pada admin yang tampan dan berlaku!');
} // error end

if (res) {
 message.reply('Ticket kamu sudah tersedia sebelumnya, gunakan saja channel tersebut!');
} // res end

message.guild.channels.create(`ticket-${message.author.id}`, {
 type: 'text',
 topic: 'Ketik `>end` untuk mengakhiri',
 permissionOverwrites: [{ id: message.guild.id, deny:["VIEW_CHANNEL", "SEND_MESSAGES"]}, { id: message.author.id, allow:["VIEW_CHANNEL", "SEND_MESSAGES"]}]
}).then(ch => {
 bot.ticket.userID = message.author.id;
 bot.ticket.channelID = ch.id;

 bot.ticket.save().then(error => {
  message.reply(`➡ Ticket channel anda : <#${ch.id}`);
  ch.send({embed:{ color: 0xfca, title: 'Ticket Support', description: `Silahkan ketik keluhan atau apa saja tentang ~~pelayanan~~ kami disini!`, footer: { text: '© Chicken NodeJS' }}});
 }) // end save
}) // end ch
}); // findOne end
} // exports end
