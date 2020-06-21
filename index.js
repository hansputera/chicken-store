const express = require('express'),
      app = express();

const Discord = require('discord.js'),
      { Client } = Discord,
      bot = new Client();

const mongoose = require('mongoose');

/* Retrieved Data */

const TicketModel = mongoose.model('ticket');
bot.ticket = new TicketModel();

const url = database => 'mongodb+srv://anaksapi:kucing@cluster0-ecsqj.mongodb.net/' + database + '?retryWrites=true&w=majority';

const dbTicket = new mongoose.Schema({
 userID: String,
 channelID: String
});

mongoose.connect(url('ticket'), { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
 if (err) {
  console.log(err);
 }

 console.log('Success connect to ticket db!');
});

const ticket = mongoose.model('ticket', dbTicket);


app.get('/', (req,res) => res.sendStatus(200));

app.listen(4000 || process.env.PORT);

bot.on('ready', () => {
 console.log('Bot Siap!');
 bot.user.setActivity('Chicken Store', { type: 'STREAMING', url: 'https://www.twitch.tv/hanspro64' });
});

bot.on('message', async message => {
  const msg = message.content.toLowerCase();
  const args = message.content.slice('c?'.length).trim().split(' ');
  const cmd = args.shift().toLowerCase();


 message.guildOnly = message.channel.type !== 'dm';

 if (message.author.bot) return:
  
 if (!msg.startsWith('c?')) return;

 try {
 let cmds = require(`./commands/${cmd}.js`);
 cmds(bot, message, args);
 } catch (e) {
  console.log(e.message);
 } finally {
  console.log(`${message.author.tag} AYAM ${cmd}`);
 }
});

bot.login('NzIzODU5MDQxOTYwNDYwMzIw.Xu7rIQ.jyhJH_9zEaShJvDmcfXg05R8OXk');
