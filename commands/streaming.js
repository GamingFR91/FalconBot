"use strict"
import core from '../FalconBase'
import twitch from '../Twitch'
const Discord = require("discord.js");

module.exports.run = (bot, message) =>{

    // Streaming module
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
    
            } else if (message.content.substring(1, 7) == "ajoute") {
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
    
            } else if (message.content.substring(1, 6) == "liste") {
                let msg = "\n";
                for (let i = 0; i < core.twitchChannels.length; i++) {
                    var streamStatus;
                    if (core.twitchChannels[i].online) {
                        msg += "**" + twitchChannels[i].name + " en ligne**\n";
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
    
            } else if (message.content.substring(1, 10) == "configure") {
                let msg = "";
                if (message.member.displayName == "DF4" || message.member.displayName == "Nenu" || message.member.displayName == "Az0Te" || message.member.displayName == "CrazyPass" || message.member.displayName == "Spidey") {
                    if (message.content.substring(11, 15) == "list") {
                        msg += "```\n" +
                            "prefix    " + core.server.prefix + "\n" +
                            "role      " + core.server.role + "\n";
    
                        msg += "channels  " + core.server.discordChannels[0];
                        if (core.server.discordChannels.length > 1) {
                            msg += ",";
                        }
                        msg += "\n";
    
                        for (let i = 1; i < core.server.discordChannels.length; i++) {
                            msg += "          " + core.server.discordChannels[i];
                            if (i != core.server.discordChannels.length - 1) {
                                msg += ",";
                            }
                            msg += "\n";
                        }
                        msg += "```";
    
                    } else if (message.content.substring(11, 17) == "prefix") {
                        let newPrefix = message.content.substring(18, 19);
                        if (newPrefix.replace(/\s/g, '').length === 0) {
                            msg += "Spécifier un argument";
                        } else if (newPrefix == core.server.prefix) {
                            msg += "Le nouveau prefix est " + core.server.prefix;
                        } else {
                            core.server.lastPrefix = core.server.prefix;
                            core.server.prefix = newPrefix;
                            msg += "Le nouveau prefix est " + core.server.prefix;
                        }
    
                    } else if (message.content.substring(11, 15) == "role") {
                        if (message.content.substring(16).replace(/\s/g, '').length === 0) {
                            msg += "Spécifier un argument";
                        } else {
                            core.server.role = message.content.substring(16);
                            msg += "Mon role est coretenant le suivant: " + core.server.role;
                        }
    
                    } else if (message.content.substring(11, 18) == "channel") {
                        if (message.content.substring(19, 22) == "add") {
                            let channel = message.content.substring(23);
                            if (channel.replace(/\s/g, '').length === 0) {
                                msg += "Spécifier un argument";
                            } else if (message.guild.channels.exists("name", channel)) {
                                core.server.discordChannels.push(channel);
                                msg += "Je ferais les notifications de stream sur " + channel;
                            } else {
                                msg += channel + " n'existe pas dans ce serveur.";
                            }
    
                        } else if (message.content.substring(19, 25) == "remove") {
                            for (let i = core.server.discordChannels.length; i >= 0; i--) {
                                let channel = message.content.substring(26);
                                if (channel.replace(/\s/g, '').length === 0) {
                                    msg = "Spécifier un argument";
                                    break;
                                } else if (core.server.discordChannels[i] == channel) {
                                    core.server.discordChannels.splice(i, 1);
                                    msg = "le channel " + channel + " a été supprimer de la liste des channels de notification de stream.";
                                    break;
                                } else {
                                    msg = channel + " n'existe pas dans ce serveur.";
                                }
                            }
                        } else {
                            msg = "Spécifier un argument (exemple " + core.server.prefix + "configure channel add/remove)";
                        }
    
                    } else {
                        msg += "```\n" +
                            "Usage: " + core.server.prefix + "configure OPTION [SUBOPTION] VALUE\n" +
                            "Exemple: " + core.server.prefix + "configure channel add\n" +
                            "\nOptions:\n" +
                            "  list        Liste la configuration actuelle\n" +
                            "  prefix      Changer le prefix du bot\n" +
                            "  role        Changer le role\n" +
                            "  channel     Les channels où je notifie des streams twitch\n" +
                            "      add         Rajouter un channel dans la liste\n" +
                            "      remove      Supprimer un channel dans la liste\n" +
                            "```";
                    }
    
                } else {
                    msg += "Ne me parle pas, créature inférieur.";
                }
                message.reply(msg);
    
            }
        }


module.exports.help = {
    name: "streaming"
}