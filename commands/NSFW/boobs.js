const Discord = require("discord.js");
const request = require('snekfetch');
const fs = require("fs")

module.exports.run = (bot, message) => {
    if(message.content.substring(1, 6) == "boobs"){
        message.delete().catch();
        var max = 12449;
        var min = 10000;
        var MathRan = Math.floor(Math.random() * (max - min + 0)) + min;
        var MathLoL = Math.round(MathRan);
        if (!message.channel.nsfw) return message.channel.send(":underage: Commande NSFW. Va dans le channel NSFW pour utiliser cette commande.")
            request.get("http://media.oboobs.ru/boobs_preview/" + MathLoL + ".jpg").then(r => {
                fs.writeFile(`boobs.jpg`, r.body)
                message.channel.sendFile(r.body)
                fs.unlink(`./boobs.jpg`)
            })
        }
}
module.exports.help = {
    name: "boobs",
    commande: "!boobs",
    level: "Public",
    description: "Commande NSFW Boobs"
}