module.exports = async (bot, message, args) => {

await bot.ticket.findOne({ channelID: message.channel.id }, async (err, res) => {
 if (err) {
  console.log(err);
  message.reply('Please contact staff or customer service about this error!');
 }
 
 if (!res) {
  return message.reply('This channel do not ticket channel!');
 } else {
   let ch = message.guild.channels.cache.get(message.channel.id);
   
   
   bot.ticket.deleteOne({ channelID: ch.id }, (err) => {
    message.reply('Database has deleted for this channel!');
    ch.delete();
   })
 }
})
}
