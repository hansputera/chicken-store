module.exports = async (bot, message, args) => {


if (!message.channel.name.startsWith("order")) {
  let ch = message.guild.channels.cache.get(message.channel.id);
  ch.delete();
} else {
 return;
}
}
