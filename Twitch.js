"use strict"
import core from './FalconBase'
import util from './Utility'

// Twitch
class Twitch extends core{
    constructor(){
        this.interval = 60 * 1000;
        this.https = require("https");
        this.apiUrl = "https://api.twitch.tv/kraken";
        this.timeout = 2 * 60 * 1000;
    }
    callApi(server, twitchChannel, callback, getStreamInfo) {
        var opt;
        try {
            var apiPath;
            if (getStreamInfo) {
                apiPath = "/kraken/streams/" + twitchChannel.name.trim();
            } else {
                apiPath = "/kraken/channels/" + twitchChannel.name.trim();
            }
            opt = {
                host: "api.twitch.tv",
                path: apiPath,
                headers: {
                    "Client-ID": this.config.twitchClientID,
                    Accept: "application/vnd.twitchtv.v3+json"
                }
            };
        }
        catch (err) {
            util.print(err);
            return;
        }
    
        https.get(opt, (res) => {
            var body = "";
    
            res.on("data", (chunk) => {
                body += chunk;
            });
    
            res.on("end", () => {
                var json;
                try {
                    json = JSON.parse(body);
                }
                catch (err) {
                    util.print(err);
                    return;
                }
                if (json.status == 404) {
                    callback(server, undefined, undefined);
                } else {
                    callback(server, twitchChannel, json);
                }
            });
    
        }).on("error", (err) => {
            util.print(err);
        });
    }
    apiCallback(server, twitchChannel, res) {
        if (res && !twitchChannel.online && res.stream &&
            twitchChannel.timestamp + timeout <= Date.now()) {
            try {
                var channels = [], defaultChannel;
                var guild = this.bot.guilds.find("name", server.name);
    
    
                if (server.discordChannels.length === 0) {
                    defaultChannel = guild.channels.find("type", "text");
                } else {
                    for (let i = 0; i < server.discordChannels.length; i++) {
                        channels.push(guild.channels.find("name", server.discordChannels[i]));
                    }
                }
                var embed = new Discord.RichEmbed()
                    .setColor("#9689b9")
                    .setTitle(res.stream.channel.display_name.replace(/_/g, "\\_"))
                    .setURL(res.stream.channel.url)
                    .setDescription("**" + res.stream.channel.status +
                    "**\n" + res.stream.game)
                    .setImage(res.stream.channel.logo)
                    .addField("Viewers", res.stream.viewers, true)
                    .addField("Followers", res.stream.channel.followers, true);
                
                // Making a personnalized message for every streamer that is register
                if (channels.length !== 0) {
                    for (let i = 0; i < channels.length; i++) {
                        channels[i].send('@everyone Olala le fameux ' + res.stream.channel.display_name.replace(/_/g, "\\_") + ' est actuellement en ligne sur le jeu ' + res.stream.game + ' \n Rejoignez le !').then(
                            channels[i].send(embed)).then(
                            util.print("Sent embed to channel '" + channels[i].name +
                                "'.")
                            );
                    }
                    twitchChannel.online = true;
                    twitchChannel.timestamp = Date.now();
                }
            }
            catch (err) {
                util.print(err);
            }
        } else if (res.stream === null) {
            twitchChannel.online = false;
        }
    }
    
    tick() {
        for (let i = 0; i < this.servers.length; i++) {
            for (let j = 0; j < this.servers[i].twitchChannels.length; j++) {
                for (let k = -1; k < this.servers[i].discordChannels.length; k++) {
                    if (this.servers[i].twitchChannels[j]) {
                        this.callApi(servers[i], servers[i].twitchChannels[j], apiCallback, true);
                    }
                }
            }
        }
    }

}
module.exports = new Twitch;