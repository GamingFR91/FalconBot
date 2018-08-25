import discord from "discord.js"
import core from '../FalconBase'

module.exports.run = (bot, message) =>{

let index;
var streamer;
if (message.content.substring(1, 6) == "liste") {
    let msg = "\n";
    for (let i = 0; i < core.twitchChannels.length; i++) {
        var streamStatus;
        if (core.twitchChannels[i].online) {
            msg += "**" + core.twitchChannels[i].name + " en ligne**\n";
        } else {
            streamStatus = "offline";
            msg += core.twitchChannels[i].name + " hors-ligne\n";
        }
    }
    if (!msg) {
        message.reply("La liste est vide, pd.");
    } else {
        message.reply(msg.replace(/_/g, "\\_"));
    }

}
}
module.exports.help = {
    name: "liste"
}