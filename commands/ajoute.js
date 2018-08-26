import discord from "discord.js"
import core from '../FalconBase'
import util from '../Utility'
import twitch from '../Twitch'

module.exports.run = (bot, message) =>{

let index,
    twitchChannels = core.getTChannels();
var streamer;
if (message.content.substring(1, 7) == "ajoute") {
    if (core.checkPermissions(message)) {
        streamer = message.content.slice(7).trim().split(' ').join('_');
        var channelObject = { name: streamer };
        index = util.indexOfObjectByName(twitchChannels, streamer);
        twitch.callApi(core.server, channelObject, (serv, chan, res) => {
            if (index != -1) {
                message.reply(streamer + " est déjà dans la liste.");
            } else if (res) {
                core.setTChannels({
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
        message.reply("Ne me parle pas, créature inférieure");
    }

    }
}
module.exports.help = {
    name: "ajoute"
}