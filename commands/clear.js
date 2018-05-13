const Discord = require("discord.js");

module.exports.run = (bot, message) =>{

if(message.content.substring(1, 6) == "clear")
    {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Nope.");
        if(!message.content.substring(7)) return message.channel.send("Entre le nombre de messages que tu veux supprimer.");
        message.channel.bulkDelete(message.content.substring(7)).then(() =>{
            message.channel.send(message.content.substring(7) + ' messages supprimé !').then(message => message.delete(5000));
        });
    }
}

module.exports.help = {
    name: "clear"
}