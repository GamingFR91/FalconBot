const Discord = require("discord.js");

module.exports.run = (bot, message) =>{

if(message.content.substring(1, 5) == "time")
    {
        let d = new Date();
        message.channel.send("Il est "+d.getHours()+" heures et "+d.getMinutes()+" minutes.", {
            tts: true
           })
    }
}

module.exports.help = {
    name: "time"
}