const express = require('express'),
      app = express();

const { Canvas } = require('canvas-constructor');

const Discord = require('discord.js'),
      { Client } = Discord,
      bot = new Client();

const mongoose = require('mongoose');
const req = require('node-superfetch');

bot.req = req;

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

/* Retrieved Data */

const TicketModel = mongoose.model('ticket', dbTicket);
bot.ticket = new TicketModel();


app.get('/', (req,res) => res.sendStatus(200));

app.listen(4000 || process.env.PORT);

bot.on('ready', () => {
 console.log('Bot Siap!');
 bot.user.setActivity('Chicken Store', { type: 'STREAMING', url: 'https://www.twitch.tv/hanspro64' });
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
      var imageUrlRegex = /\?size=2048$/g;
      const { body: avatar } = await req.get(member.user.displayAvatarURL({ dynamic: true, format: 'png' size: 512 }));
      const { body: background } = await req.get(`https://images.unsplash.com/photo-1488188840666-e2308741a62f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60`);
      async function createCanvas() {
        return new Canvas(1024, 450)
          .addImage(background, 0, -100)
          .setColor("#ffffff")
          .addCircle(512, 155, 120)
          .addCircularImage(avatar, 512, 155, 115)
          .setTextAlign("center")
          .setColor("#ffffff")
          .addText("WELCOME", 512, 355)
          .setTextAlign("center")
          .setColor("#ffffff")
          .addText(`${member.user.tag}`, 512, 395)
          .setTextAlign("center")
          .setColor("#ffffff")
          .addText(`Welcome to ${member.guild.name}`, 512, 430)
          .toBufferAsync();
      };
      member.guild.channels.cache.get('723802127922626571').send(`Welcome ${member.user.username} di store kami.`, { files: [{ attachment: await createCanvas(), name: 'welcome.png' }]});
});

bot.on('guildMemberRemove', async member => {
      var imageUrlRegex = /\?size=2048$/g;
      const { body: avatar } = await req.get(member.user.displayAvatarURL({ dynamic: true, format: 'png' size: 512 }));
      const { body: background } = await req.get(`https://images.unsplash.com/photo-1488188840666-e2308741a62f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60`);
      async function createCanvas() {
        return new Canvas(1024, 450)
          .addImage(background, 0, -100)
          .setColor("#ffffff")
          .addCircle(512, 155, 120)
          .addCircularImage(avatar, 512, 155, 115)
          .setTextAlign("center")
          .setColor("#ffffff")
          .addText("GOODBYE", 512, 355)
          .setTextAlign("center")
          .setColor("#ffffff")
          .addText(`${member.user.tag}`, 512, 395)
          .setTextAlign("center")
          .setColor("#ffffff")
          .addText(`GOODBYE ${member.guild.name}, STAY SAFE!`, 512, 430)
          .toBufferAsync();
      };
      member.guild.channels.cache.get('723802127922626571').send(`Goodbye ${member.user.username} semangat terus ya :).`, { files: [{ attachment: await createCanvas(), name: 'welcome.png' }]});
});

bot.login('NzIzODU5MDQxOTYwNDYwMzIw.Xu7rIQ.jyhJH_9zEaShJvDmcfXg05R8OXk');
