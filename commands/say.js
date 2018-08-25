const Discord = require("discord.js");

module.exports.run = (bot, message) =>{

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let botmessage = message.content.substring(5);
    message.channel.send(botmessage);
}

module.exports.help = {
    name: "say"
}