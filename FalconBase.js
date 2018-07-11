"use strict"
import Utility from './Utility'
import Twitch from './Twitch'
const util = new Utility;

class FalconBase{
    constructor(){
        this.Discord = require('discord.js');
        this.Music = require('discord.js-musicbot-addon');
        this.bot = new Discord.Client();
        this.channelPath = __dirname + "/channels.json";
        this.config = require('./botconfig.json');
        this.fs = require("fs");
        this.servers = [];
        this.bot.commands = new Discord.Collection();
    }
    getDiscord(){
        return this.Discord;
    }
    getBot(){
        return this.bot;
    }
    getBotConfig(){
        return this.config;
    }
    getMusic(){
        return this.Music;
    }
    getChannelPath(){
        return this.channelPath;
    }
    getFileSystem(){
        return this.fs;
    }
    getServers(){
        return this.servers;
    }
    getCommands(){
        return this.bot.commands;
    }
    
    launchHandlers(){
        // Commands Handler
        this.fs.readdir("./commands/", (err, files) => {
            if (err) util.print(err);

            let jsfile = files.filter(f => f.split(".").pop() === "js")
            if (jsfile.length <= 0) {
                util.print("Aucune commande enregistrer.");
                return;
            }

            jsfile.forEach((f, i) => {
                let props = require(`./commands/` + f);
                util.print(f + ' loaded !');
                this.getCommands().set(props.help.name, props);
            });
        });

        // Emotes Handler
        this.fs.readdir("./commands/emotes/", (err, files) => {
            if (err) util.print(err);

            let jsfile = files.filter(f => f.split(".").pop() === "js")
            if (jsfile.length <= 0) {
                util.print("Aucun emotes enregistrer.");
                return;
            }

            jsfile.forEach((f, i) => {
                let props = require(`./commands/emotes/` + f);
                util.print(f + ' loaded !');
                this.getCommands().set(props.help.name, props);
            });
        });
    }
}

process.on("exit", util.exitHandler.bind(null, { save: true }));
process.on("SIGINT", util.exitHandler.bind(null, { exit: true }));
process.on("SIGTERM", util.exitHandler.bind(null, { exit: true }));
process.on("uncaughtException", util.exitHandler.bind(null, { exit: true }));



module.exports = new FalconBase