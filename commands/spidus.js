const Discord = require("discord.js");

module.exports.run = (bot, message) =>{

if(message.content.substring(1, 7) == "spidus")
    {
        message.channel.send(bot.users.find('username', "Spidey").toString()+" t'es beau comme un camion");
    }
}

module.exports.help = {
    name: "spidus",
    commande: "!spidus",
    level: "Public",
    description: "C'est de la merde (mais on me l'a demander alors)"
}