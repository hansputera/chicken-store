module.exports = async (bot, message, args) => {
message.delete();
if (!message.guildOnly) return;

let said = args.join(' ');
message.channel.send(said);
};
