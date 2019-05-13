const Discord = require("discord.js");

module.exports.run = (bot, message) =>{

if(message.content.substring(1, 7) == "invite")
    {
        message.channel.send("https://discord.gg/xgq9VJc");
    }
}

module.exports.help = {
    name: "invite"
}
