import discord from "discord.js"
import core from '../../FalconBase'

module.exports.run = (bot, message) =>{

let index,
    twitchChannels = core.getTChannels();
var streamer;
if (message.content.substring(1, 6) == "liste") {
    let msg = "\n";
    for (let i = 0; i < twitchChannels.length; i++) {
        if (twitchChannels[i].online) {
            msg += "**" + twitchChannels[i].name + " en ligne**\n";
        } else {
            msg += twitchChannels[i].name + " hors-ligne\n";
        }
    }
    if (!msg) {
        message.reply("La liste est vide, pd.");
    } else {
        message.channel.send(msg.replace(/_/g, "\\_"));
    }

}
}
module.exports.help = {
    name: "liste",
    commande: "!liste",
    level: "Public",
    description: "Liste tout les streamers à notifier sur le serveur"
}