const Discord = require("discord.js");

module.exports.run = (bot, message) =>{

if(message.content.substring(1, 7) == "creedi")
    {
        message.delete().catch();
        let creedi = './emotes/creedi.png';
        message.channel.send(message.member, {
            files: [
                creedi
            ]
        });
    }
}

module.exports.help = {
    name: "creedi"
}