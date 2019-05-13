const Discord = require("discord.js");

module.exports.run = (bot, message) =>{

if(message.content.substring(1, 8) == "psykada")
    {
        message.delete().catch();
        let psykada = './emotes/psykada.png';
        message.channel.send(message.member, {
            files: [
                psykada
            ]
        });
    }
}

module.exports.help = {
    name: "psykada"
}