const Discord = require("discord.js");

module.exports.run = (bot, message) =>{

if(message.content.substring(1, 4) == "say")
    {
        let botmessage = message.content.substring(5);
        message.channel.send(botmessage, {
            tts: true
           });
    }
}

module.exports.help = {
    name: "say"
}