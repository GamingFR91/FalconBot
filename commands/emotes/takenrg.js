const Discord = require('discord.js'); module.exports.run = (bot, message) => { if (message.content.substring(1, 8) == 'takenrg') {message.delete().catch(); let emote = './emotes/takenrg.png'; message.channel.send(message.member, { files: [emote] }); } }; module.exports.help = { name: 'takenrg'};