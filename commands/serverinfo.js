const Discord = require("discord.js");

module.exports.run = (bot, message) =>{
    if(message.content.substring(1, 11) == "serverinfo"){
        let serverembed = new Discord.RichEmbed()
        .setDescription("Information du serveur:")
        .setColor("#15f153")
        .setThumbnail(message.guild.iconURL)
        .addField("Nom du serveur:", message.guild.name)
        .addField("Créer", message.guild.createdAt)
        .addField("Tu as rejoint", message.member.joinedAt)
        .addField("Total de membres:", message.guild.memberCount);

        message.channel.send(serverembed);
    }
}

module.exports.help = {
    name: "serverinfo"
}