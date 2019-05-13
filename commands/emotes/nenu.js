const Discord = require("discord.js");

module.exports.run = (bot, message) =>{

if(message.content.substring(1, 5) == "nenu")
    {
        message.delete().catch();
        let nenu = './emotes/nenu.png';
        message.channel.send(message.member, {
            files: [
                nenu
            ]
        });
    }
}

module.exports.help = {
    name: "nenu"
}