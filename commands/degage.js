import discord from "discord.js"
import core from '../FalconBase'

module.exports.run = (bot, message) =>{

let index;
var streamer;
if (message.content.substring(1, 7) == "degage") {
    if (core.permissionAdmin || core.permissionModerateurs || core.permissionBotmaster) {
        streamer = message.content.slice(7).trim().split(' ').join('_');
        index = core.indexOfObjectByName(core.twitchChannels, streamer);
        if (index != -1) {
            core.twitchChannels.splice(index, 1);
            index = core.indexOfObjectByName(core.twitchChannels, streamer);
            if (index == -1) {
                message.reply(streamer + " a été supprimer de la liste.");
            } else {
                message.reply(streamer + " n'est pas dans la liste.");
            }
        } else {
            message.reply(streamer + " n'est pas dans la liste.");
        }
        } else {
            message.reply("Il vous manque le role _" + core.server.role + "_.");
        }
}
}
module.exports.help = {
    name: "degage"
}