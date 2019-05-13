const Discord = require("discord.js");

module.exports.run = (bot, message) =>{

if(message.content.substring(1, 5) == "suly")
    {
        message.delete().catch();
        let suly = './emotes/suly.png';
        message.channel.send(message.member, {
            files: [
                suly
            ]
        });
    }
}

module.exports.help = {
    name: "suly"
}