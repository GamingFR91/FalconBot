const randomPuppy = require('random-puppy');
const request = require('snekfetch');
const fs = require("fs")
const Discord = require('discord.js');

module.exports.run = (bot, message) => {
    if(message.content.substring(1, 4) == "gif"){
        if (!message.channel.nsfw) return message.channel.send(":underage: Commande NSFW. Va dans le channel NSFW pour utiliser cette commande.")
        message.delete().catch();

        const subreddits = [
            "NSFW_GIF",
            "nsfw_gifs",
            "porninfifteenseconds",
            "60FPSPorn",
            "porn_gifs",
            "nsfw_Best_Porn_Gif",
            "LipsThatGrip",
            "adultgifs"
        ]

        var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

        randomPuppy(sub)
                .then(url => {
                    const embed = new Discord.RichEmbed()
                        .setColor(0xffa500)
                        .setImage(url)
                    message.channel.send({ embed });
            })
    }
}
module.exports.help = {
    name: "gif",
    commande: "!gif",
    level: "Public",
    description: "Commande NSFW Gif"
}