const Discord = require("discord.js");

module.exports.run = (bot, message) =>{

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];

if(cmd == "!say")
    {
        message.content.delete().catch();
        let botmessage = message.content.substring(5);
        message.channel.send(botmessage);
    }
}

module.exports.help = {
    name: "say"
}