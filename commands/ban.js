const Discord = require("discord.js");

module.exports.run = (bot, message) =>{

if(message.content.substring(1, 4) == "ban")
    {
        message.channel.send('Bon je te ban quand gros fils de pute ?');
    }
}

module.exports.help = {
    name: "ban"
}