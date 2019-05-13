const Discord = require('discord.js');

module.exports.run = (bot, message) => {
        if(message.content.contains(':thinking:') ||
         message.content.contains(':GWqlabsThinkLol:') ||
         message.content.contains(':tkinkingmeme:') ||
         message.content.contains(':tronklmao:')){
             message.reply("VA T'FAIRE FOUTRE");
         }
}


module.exports.help = {
    name: 'thinking',
    commande: undefined,
    level: 'Public',
    description: "Envoie un message drôle lorsqu'on envoie l'emote de MERDE PUTAIIIN"
}