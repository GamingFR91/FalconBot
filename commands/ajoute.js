import discord from "discord.js"
import core from '../FalconBase'
import twitch from '../Twitch'

module.exports.run = (bot, message) =>{

let index;
var streamer;
if (message.content.substring(1, 7) == "ajoute") {
    if (core.permissionAdmin || core.permissionModerateurs || core.permissionBotmaster) {
        streamer = message.content.slice(7).trim().split(' ').join('_');
        var channelObject = { name: streamer };
        index = core.indexOfObjectByName(core.twitchChannels, streamer);
        twitch.callApi(core.server, channelObject, (serv, chan, res) => {
            if (index != -1) {
                message.reply(streamer + " est déjà dans la liste.");
            } else if (res) {
                core.twitchChannels.push({
                    name: streamer, timestamp: 0,
                    online: false
                });
                message.reply(streamer + " a bien été ajouté à la liste.");
                core.tick();
            } else {
                message.reply(streamer + " n'existe pas dans le twitch game.");
            }
        }, false);
    } else {
        message.reply("Il vous manque le rôle _" + core.server.role + "_.");
    }

    }
}
module.exports.help = {
    name: "ajoute"
}