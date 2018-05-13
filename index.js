/*
############################
######## FalconBot #########
########### WIP ############
############################
*/
const Discord = require('discord.js'),
    Music = require('discord.js-musicbot-addon'),
    bot = new Discord.Client(),
    channelPath = __dirname + "/channels.json",
    interval = 60 * 1000,
    config = require('./botconfig.json'),
    https = require("https"),
    apiUrl = "https://api.twitch.tv/kraken",
    timeout = 2 * 60 * 1000,
    fs = require("fs");
var servers = [];

bot.commands = new Discord.Collection();

// lovely functions <3
function leadingZero(d) {
    if (d < 10) {
        return "0" + d;
    } else {
        return d;
    }
}

// timestamps
function print(msg, err) {
    var date = new Date();
    var h = leadingZero(date.getHours());
    var m = leadingZero(date.getMinutes());
    var s = leadingZero(date.getSeconds());

    console.log("[" + h + ":" + m + ":" + s + "]", msg);
    if (err) {
        console.log(err);
    }
}

function indexOfObjectByName(array, value) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].name.toLowerCase().trim() === value.toLowerCase().trim()) {
            return i;
        }
    }
    return -1;
}

function exitHandler(opt, err) {
    if (err) {
        print(err);
    }
    if (opt.save) {
        print("Saving channels to " + channelPath + " before exiting");
        print(JSON.stringify(servers));
        fs.writeFileSync(channelPath, JSON.stringify(servers, null, 4));
        print("Done");
    }
    if (opt.exit) {
        process.exit();
    }
}

    process.on("exit", exitHandler.bind(null, { save: true }));
    process.on("SIGINT", exitHandler.bind(null, { exit: true }));
    process.on("SIGTERM", exitHandler.bind(null, { exit: true }));
    process.on("uncaughtException", exitHandler.bind(null, { exit: true }));

// Calling Twitch API
function callApi(server, twitchChannel, callback, getStreamInfo) {
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
                "Client-ID": config.twitchClientID,
                Accept: "application/vnd.twitchtv.v3+json"
            }
        };
    }
    catch (err) {
        print(err);
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
                print(err);
                return;
            }
            if (json.status == 404) {
                callback(server, undefined, undefined);
            } else {
                callback(server, twitchChannel, json);
            }
        });

    }).on("error", (err) => {
        print(err);
    });
}

// CallBack for notification on discord channels
function apiCallback(server, twitchChannel, res) {
    if (res && !twitchChannel.online && res.stream &&
        twitchChannel.timestamp + timeout <= Date.now()) {
        try {
            var channels = [], defaultChannel;
            var guild = bot.guilds.find("name", server.name);


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

            if (channels.length !== 0) {
                for (let i = 0; i < channels.length; i++) {
                    channels[i].send('@everyone Olala le fameux ' + res.stream.channel.display_name.replace(/_/g, "\\_") + ' est actuellement en ligne sur le jeu ' + res.stream.game + ' \n Rejoignez le !').then(
                        channels[i].send(embed)).then(
                        print("Sent embed to channel '" + channels[i].name +
                            "'.")
                        );
                }
                twitchChannel.online = true;
                twitchChannel.timestamp = Date.now();
            }
        }
        catch (err) {
            print(err);
        }
    } else if (res.stream === null) {
        twitchChannel.online = false;
    }
}

function tick() {
    for (let i = 0; i < servers.length; i++) {
        for (let j = 0; j < servers[i].twitchChannels.length; j++) {
            for (let k = -1; k < servers[i].discordChannels.length; k++) {
                if (servers[i].twitchChannels[j]) {
                    callApi(servers[i], servers[i].twitchChannels[j], apiCallback, true);
                }
            }
        }
    }
}

// Commands Handler
fs.readdir("./commands/", (err, files) => {
    if (err) print(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        print("Aucune commande enregistrer.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/` + f);
        print(f + ' loaded !');
        bot.commands.set(props.help.name, props);
    });
});

// Emotes Handler
fs.readdir("./commands/emotes/", (err, files) => {
    if (err) print(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        print("Aucun emotes enregistrer.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/emotes/` + f);
        print(f + ' loaded !');
        bot.commands.set(props.help.name, props);
    });
});

// Trying to watch for new emotes (TODO: Preventing from restarting falcon)
fs.watch("./commands/emotes/", (event, filename) => {

    let jsfile = filename.split(".").pop();
    if (jsfile.length <= 0) {
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/emotes/` + f);
        print(f + ' loaded !');
        bot.commands.set(props.help.name, props);
    });
});

bot.on('ready', function () {
    bot.user.setActivity("Open Beta");
    // Music Module
    const music = new Music(bot, {
        prefix: "?",
        maxQueueSize: "1000",
        youtubeKey: 'YOUR_YOUTUBE_API_KEY'
      });
});

// Checking for permissions
bot.on("message", (message) => {
    var server, twitchChannels;
    if (!message.guild) {
        return;

    } else {
        let index = indexOfObjectByName(servers, message.guild.name);
        if (index == -1) {
            servers.push({
                name: message.guild.name,
                lastPrefix: "!", prefix: "!",
                role: "MODERATEURS", discordChannels: [],
                twitchChannels: []
            });
            index = servers.length - 1;
        }

        server = servers[index];
        twitchChannels = servers[index].twitchChannels;
    }
    if (message.content[0] == server.prefix) {
        var permissionAdmin, permissionModerateurs, permissionBotmaster;
        try {
            permissionAdmin = message.member.roles.exists("name", "ADMIN");
            permissionModerateurs = message.member.roles.exists("name", "MODERATEURS");
            permissionBotmaster = message.member.roles.exists("name", "BOT MASTER");
        }
        catch (err) {
            print(server.role + " n'est pas un rôle sur ce serveur", err);
        }
    }
    if (message.content[0] == server.prefix) {

        let messageArray = message.content.split(" ");
        let cmd = messageArray[0];
        let commandFile = bot.commands.get(cmd.slice(1));

        if (commandFile) commandFile.run(bot, message);


        // Streaming module
        let index;
        var streamer;
        if (message.content.substring(1, 7) == "degage") {
            if (permissionAdmin || permissionModerateurs || permissionBotmaster) {
                streamer = message.content.slice(7).trim().split(' ').join('_');
                index = indexOfObjectByName(twitchChannels, streamer);
                if (index != -1) {
                    twitchChannels.splice(index, 1);
                    index = indexOfObjectByName(twitchChannels, streamer);
                    if (index == -1) {
                        message.reply(streamer + " a été supprimer de la liste.");
                    } else {
                        message.reply(streamer + " n'est pas dans la liste.");
                    }
                } else {
                    message.reply(streamer + " n'est pas dans la liste.");
                }
            } else {
                message.reply("Il vous manque le role _" + server.role + "_.");
            }

        } else if (message.content.substring(1, 7) == "ajoute") {
            if (permissionAdmin || permissionModerateurs || permissionBotmaster) {
                streamer = message.content.slice(7).trim().split(' ').join('_');
                var channelObject = { name: streamer };
                index = indexOfObjectByName(twitchChannels, streamer);
                callApi(server, channelObject, (serv, chan, res) => {
                    if (index != -1) {
                        message.reply(streamer + " est déjà dans la liste.");
                    } else if (res) {
                        twitchChannels.push({
                            name: streamer, timestamp: 0,
                            online: false
                        });
                        message.reply(streamer + " a bien été ajouté à la liste.");
                        tick();
                    } else {
                        message.reply(streamer + " n'existe pas dans le twitch game.");
                    }
                }, false);
            } else {
                message.reply("Il vous manque le rôle _" + server.role + "_.");
            }

        } else if (message.content.substring(1, 6) == "liste") {
            let msg = "\n";
            for (let i = 0; i < twitchChannels.length; i++) {
                var streamStatus;
                if (twitchChannels[i].online) {
                    msg += "**" + twitchChannels[i].name + " en ligne**\n";
                } else {
                    streamStatus = "offline";
                    msg += twitchChannels[i].name + " hors-ligne\n";
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
                        msg += "Mon role est maintenant le suivant: " + server.role;
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
});

bot.login(config.token).then(() => {
    if (true) {
        print("FalconBot is running");
        var file = fs.readFileSync(channelPath, { encoding: "utf-8" });
        servers = JSON.parse(file);
        tick();
        setInterval(tick, interval);
    }
});
