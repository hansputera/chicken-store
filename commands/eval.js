module.exports = async (bot, message, args) => {

 if (message.author.id !== '426712723108134923') return;
 try {
 let codein = args.join(' ');
 let code = eval(codein);

 code = require('util').inspect(code, { depth: 0 });

 message.channel.send(`\`\`\`js\n${code}\`\`\``);
 } catch(e) {
   message.channel.send(`\`\`\`js\n${e}\`\`\``);
 }
}
