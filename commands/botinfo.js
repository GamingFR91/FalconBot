const Discord = require("discord.js");

module.exports.run = (bot, message, args) => {
    if(message.content.substring(1, 8) == "botinfo") { 
        let bicon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
        .setDescription("Open Source Discord Bot")
        .setColor("#15f153")
        .setThumbnail(bicon)
        .addField("Nom du bot", bot.user.username)
        .addField("Créer le", bot.user.createdAt);

        message.channel.send(botembed);
    }
}

module.exports.help = {
  name:"botinfo"
}