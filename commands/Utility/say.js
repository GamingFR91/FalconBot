const Discord = require("discord.js");

module.exports.run = (bot, message) =>{

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let botmessage = message.content.substring(5);
    message.channel.send(botmessage);
}

module.exports.help = {
    name: "say",
    commande: "!say {words}",
    level: "Public",
    description: "Le bot répète ce que vous avez dit (**A Corriger**)"
}