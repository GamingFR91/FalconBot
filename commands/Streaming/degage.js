import discord from "discord.js"
import core from '../../FalconBase'
import util from '../../Utility'

module.exports.run = (bot, message) =>{

let index,
    twitchChannels = core.getTChannels();
var streamer;
if (message.content.substring(1, 7) == "degage") {
    if (core.checkPermissions(message)) {
        streamer = message.content.slice(7).trim().split(' ').join('_');
        index = util.indexOfObjectByName(twitchChannels, streamer);
        if (index != -1) {
            twitchChannels.splice(index, 1);
            index = util.indexOfObjectByName(twitchChannels, streamer);
            if (index == -1) {
                message.reply(streamer + " a été supprimer de la liste.");
            } else {
                message.reply(streamer + " n'est pas dans la liste.");
            }
        } else {
            message.reply(streamer + " n'est pas dans la liste.");
        }
        } else {
            message.reply("Ne me parle pas, créature inférieure");
        }
}
}
module.exports.help = {
    name: "degage",
    commande: "!degage {name}",
    level: "Admin",
    description: "Supprime un streamer de la liste des streamers à notifier"
}