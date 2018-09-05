import discord from "discord.js"
import core from '../FalconBase'

module.exports.run = (bot, message) =>{

let server = core.getCurrentServer();
if (message.content.substring(1, 10) == "configure") {
    let msg = "";
    if (message.member.displayName == "DF4" || message.member.displayName == "Nenu" || message.member.displayName == "Az0Te" || message.member.displayName == "CrazyPass" || message.member.displayName == "Spidey") {
        if (message.content.substring(11, 15) == "list") {
            msg += "```\n" +
                "prefix    " + server.prefix + "\n" +
                "role      " + server.role + "\n";

            msg += "channels  " + server.discordChannels[0];
            if (server.discordChannels.length > 1) {
                msg += ",";
            }
            msg += "\n";

            for (let i = 1; i < server.discordChannels.length; i++) {
                msg += "          " + server.discordChannels[i];
                if (i != server.discordChannels.length - 1) {
                    msg += ",";
                }
                msg += "\n";
            }
            msg += "```";

        } else if (message.content.substring(11, 17) == "prefix") {
            let newPrefix = message.content.substring(18, 19);
            if (newPrefix.replace(/\s/g, '').length === 0) {
                msg += "Spécifier un argument";
            } else if (newPrefix == server.prefix) {
                msg += "Le nouveau prefix est " + server.prefix;
            } else {
                server.lastPrefix = server.prefix;
                server.prefix = newPrefix;
                msg += "Le nouveau prefix est " + server.prefix;
            }

        } else if (message.content.substring(11, 15) == "role") {
            if (message.content.substring(16).replace(/\s/g, '').length === 0) {
                msg += "Spécifier un argument";
            } else {
                server.role = message.content.substring(16);
                msg += "Mon role est coretenant le suivant: " + server.role;
            }

        } else if (message.content.substring(11, 18) == "channel") {
            if (message.content.substring(19, 22) == "add") {
                let channel = message.content.substring(23);
                if (channel.replace(/\s/g, '').length === 0) {
                    msg += "Spécifier un argument";
                } else if (message.guild.channels.exists("name", channel)) {
                    server.discordChannels.push(channel);
                    msg += "Je ferais les notifications de stream sur " + channel;
                } else {
                    msg += channel + " n'existe pas dans ce serveur.";
                }

            } else if (message.content.substring(19, 25) == "remove") {
                for (let i = server.discordChannels.length; i >= 0; i--) {
                    let channel = message.content.substring(26);
                    if (channel.replace(/\s/g, '').length === 0) {
                        msg = "Spécifier un argument";
                        break;
                    } else if (server.discordChannels[i] == channel) {
                        server.discordChannels.splice(i, 1);
                        msg = "le channel " + channel + " a été supprimer de la liste des channels de notification de stream.";
                        break;
                    } else {
                        msg = channel + " n'existe pas dans ce serveur.";
                    }
                }
            } else {
                msg = "Spécifier un argument (exemple " + server.prefix + "configure channel add/remove)";
            }

        } else {
            msg += "```\n" +
                "Usage: " + server.prefix + "configure OPTION [SUBOPTION] VALUE\n" +
                "Exemple: " + server.prefix + "configure channel add\n" +
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
    name: "configure",
    commande: "!configure {option} {suboption} {value}",
    level: "Admin",
    description: "Permet de configurer principalement le module streaming (plus d'infos en tapant !configure)"
}