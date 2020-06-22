const express = require('express'),
      app = express();

const PORT = process.env.PORT || 3000;

const { Canvas } = require('canvas-constructor');

const Discord = require('discord.js'),
      { Client } = Discord,
      bot = new Client();

const canvacord = require('canvacord');
const canva = new canvacord();

const mongoose = require('mongoose');
const req = require('node-superfetch');

bot.req = req;

const url = database => 'mongodb+srv://anaksapi:kucing@cluster0-ecsqj.mongodb.net/' + database + '?retryWrites=true&w=majority';

const ticketSchema = new mongoose.Schema({
 userID: String,
 channelID: String
});

mongoose.connect(url('ticket'), { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
 if (err) {
  console.log(err);
 }

 console.log('Success connect to ticket db!');
});

/* Retrieved Data */

const TicketModel = mongoose.model('ticket', ticketSchema);
bot.ticket = TicketModel;


app.get('/', (req,res) => res.sendStatus(200));

let listener = app.listen(PORT, function() {
 console.log('Web is ready!');
})

bot.on('ready', () => {
 console.log('Bot Siap!');
   function status() {
      let stat = ['ChickenNodes', 'Data Center ChickenNodes'];
       let rand = Math.floor(Math.random() * stat.length);
         bot.user.setActivity(stat[rand], { type: 'STREAMING'});
      }
      setInterval(status, 5000);
 //bot.user.setActivity('Chicken Store', { type: 'STREAMING', url: 'https://www.twitch.tv/hanspro64' });
});

bot.on('message', async message => {
  const msg = message.content.toLowerCase();
  const args = message.content.slice('>'.length).trim().split(' ');
  const cmd = args.shift().toLowerCase();


 message.guildOnly = message.channel.type === 'text';

 if (message.author.bot) return;
  
 if (!msg.startsWith('>')) return;

 try {
 let cmds = require(`./commands/${cmd}.js`);
 cmds(bot, message, args);
 } catch (e) {
  console.log(e.message);
 } finally {
  console.log(`${message.author.tag} AYAM ${cmd}`);
 }
});


bot.on('guildMemberAdd', async member => {
      let image = await canva.welcome({ username: member.user.username, discrim: member.user.discriminator, avatarURL: member.user.displayAvatarURL({ format: 'png', size:512, dynamic: false })});
      member.guild.channels.cache.get('723802127922626571').send(`Welcome ${member.user.username} di store kami.`, { files: [{ attachment: image, name: 'welcome.png' }]});
});

bot.on('guildMemberRemove', async member => {
      let image = await canva.leave({ username: member.user.username, discrim: member.user.discriminator, avatarURL: member.user.displayAvatarURL({ format: 'png', size:512, dynamic: false })});
  
      member.guild.channels.cache.get('723802127922626571').send(`Goodbye ${member.user.username} semangat terus ya :).`, { files: [{ attachment: image, name: 'welcome.png' }]});
});

bot.login('NzIzODU5MDQxOTYwNDYwMzIw.Xu7rIQ.jyhJH_9zEaShJvDmcfXg05R8OXk');
