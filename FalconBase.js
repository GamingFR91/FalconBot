"use strict"
import twitch from './Twitch'
import fs from "fs"
import config from './botconfig.json'
import discord from 'discord.js'
import util from './Utility'
import musicAddon from 'discord.js-musicbot-addon'

//FalconBot Core functions

// Declaring global variables

// @var Array = {} of servers
var servers = [{}],

// @var Array = {} of discord channels
twitchChannels = [{}],

// @var String = path to channels informations
channelPath = __dirname + "/channels.json",

// @var Bool = true if admin
permissionAdmin,

// @var Bool = true if modo
permissionModerateurs,

// @var Bool = true if botmaster
permissionBotmaster,

// @var Array = {} of current server
server = [{}];

// @var Object = Discord Client
const bot = new discord.Client();

// Getters and Setters

// Servers
module.exports.getServers = () =>{
    return servers;
}

module.exports.setServers = (s) =>{
    servers.push(s);
}

// TwitchChannels
module.exports.getTChannels = () =>{
    return twitchChannels;
}

module.exports.setTChannels = (c) =>{
    twitchChannels.push(c);
}

// ChannelPath
module.exports.getChannelP = () =>{
    return channelPath;
}

// Current server

module.exports.getCurrentServer = () =>{
    return server;
}

module.exports.setCurrentServer = (s) =>{
    server.push(s);
}

// Permissions
// Admin
module.exports.getPermAdmin = () =>{
    return permissionAdmin;
}

module.exports.setPermAdmin = (a) =>{
    permissionAdmin = a;
}

// Modérateurs
module.exports.getPermModo = () =>{
    return permissionModerateurs;
}

module.exports.setPermModo = (m) =>{
    permissionModerateurs = m;
}

// BotMaster
module.exports.getPermMaster = () =>{
    return permissionBotmaster;
}

module.exports.setPermMaster = (m) =>{
    permissionBotmaster = m;
}

module.exports.checkPermissions = (message) =>{
    try {
        permissionAdmin = message.member.roles.exists("name", "ADMIN");
        permissionModerateurs = message.member.roles.exists("name", "MODERATEURS");
        permissionBotmaster = message.member.roles.exists("name", "BOT MASTER");
    }
    catch (err) {
        util.print(server.role + " n'est pas un rôle sur ce serveur", err);
    }
    if(permissionAdmin || permissionModerateurs || permissionBotmaster){
        return true;
    }
}
module.exports.registerGuilds = () => {
        bot.on("message", (message) => {
            if (!message.guild) {
                return;
        
            } else {
                let index = util.indexOfObjectByName(servers, message.guild.name);
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
        
                let messageArray = message.content.split(" ");
                let cmd = messageArray[0];
                let commandFile = bot.commands.get(cmd.slice(1));
        
                if (commandFile) commandFile.run(bot, message);
            }
        });
    }
    
module.exports.launchHandlers = () => {
        // Commands Handler
        bot.commands = new discord.Collection();
        fs.readdir("./commands/", (err, files) => {
            if (err) util.print(err);

            let jsfile = files.filter(f => f.split(".").pop() === "js")
            if (jsfile.length <= 0) {
                util.print("Aucune commande enregistrer.");
                return;
            }

            jsfile.forEach((f, i) => {
                let props = require(`./commands/` + f);
                util.print(f + ' loaded !');
                bot.commands.set(props.help.name, props);
            });
        });

        // Emotes Handler
        fs.readdir("./commands/emotes/", (err, files) => {
            if (err) util.print(err);

            let jsfile = files.filter(f => f.split(".").pop() === "js")
            if (jsfile.length <= 0) {
                util.print("Aucun emotes enregistrer.");
                return;
            }

            jsfile.forEach((f, i) => {
                let props = require(`./commands/emotes/` + f);
                util.print(f + ' loaded !');
                bot.commands.set(props.help.name, props);
            });
        });
}
module.exports.launchBot = () => {
        bot.login(config.token).then(() => {
                util.print("FalconBot is running");
                var file = fs.readFileSync(channelPath, { encoding: "utf-8" });
                servers = JSON.parse(file);
                for (let i = 0; i < servers.length; i++) {
                    for (let j = 0; j < servers[i].twitchChannels.length; j++) {
                        for (let k = -1; k < servers[i].discordChannels.length; k++) {
                            if (servers[i].twitchChannels[j]) {
                                twitch.callApi(servers[i], servers[i].twitchChannels[j], twitch.apiCallback, true, bot);
                            }
                        }
                    }
                }
        });
}
module.exports.launchMusic = () => {
        const Bot = bot;
        // Launch Music Module
        Bot.on('ready', function () {
            Bot.user.setActivity("Beta 0.7 Dashboard Inc");
            // Music Module
            const music = new musicAddon(Bot, {
                prefix: "?",
                maxQueueSize: "1000",
                youtubeKey: 'YOUR_YOUTUBE_KEY'
              });
        });
}

module.exports.tick = () => {
        for (let i = 0; i < servers.length; i++) {
            for (let j = 0; j < servers[i].twitchChannels.length; j++) {
                for (let k = -1; k < servers[i].discordChannels.length; k++) {
                    if (servers[i].twitchChannels[j]) {
                        twitch.callApi(servers[i], servers[i].twitchChannels[j], twitch.apiCallback, true, bot);
                    }
                }
            }
        }
}

// Preventing from fatal errors, saving channels information and exit
module.exports.exitHandler = (opt, err) => {
    if (err) {
        util.print(err);
    }
    if (opt.save) {
        util.print("Saving channels to " + channelPath + " before exiting");
        util.print(JSON.stringify(servers));
        fs.writeFileSync(channelPath, JSON.stringify(servers, null, 4));
        util.print("Done");
    }
    if (opt.exit) {
        process.exit();
    }
}