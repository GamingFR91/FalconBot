import discord from "discord.js"
import core from '../../FalconBase'

module.exports.run = (bot, message) =>{

if (message.content.substring(1, 5) == "help") {
    core.giveHelp(message);
}
}
module.exports.help = {
    name: "help",
    commande: "!help",
    level: "Public",
    description: "Affiche toutes les commandes disponible"
}