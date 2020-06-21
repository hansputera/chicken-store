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



bot.on('ready', () => {
 console.log('Bot Siap!');
 bot.user.setActivity('Chicken Store', { type: 'STREAMING', url: 'https://www.twitch.tv/hanspro64' });
});

bot.on('message', async message => {
  const msg = message
});
