"use strict"
import twitch from './Twitch'
import discord from 'discord.js'
import musicAddon from 'discord.js-musicbot-addon'

class FalconBase{
    constructor(){
        this.bot = new discord.Client();
        this.channelPath = __dirname + "/channels.json";
        this.config = require('./botconfig.json');
        this.fs = require("fs");
        this.bot.commands = new discord.Collection();

        this.twitchChannels;
        this.permissionAdmin;
        this.permissionModerateurs;
        this.permissionBotmaster;
        this.server;
    }

    registerGuilds(){
        var servers = [];
        this.bot.on("message", (message) => {
            if (!message.guild) {
                return;
        
            } else {
                let index = this.indexOfObjectByName(servers, message.guild.name);
                if (index == -1) {
                    servers.push({
                        name: message.guild.name,
                        lastPrefix: "!", prefix: "!",
                        role: "MODERATEURS", discordChannels: [],
                        twitchChannels: []
                    });
                    index = servers.length - 1;
                }
        
                this.server = servers[index];
                var twitchChannels = servers[index].twitchChannels;
            }
            if (message.content[0] == this.server.prefix) {
                try {
                    this.permissionAdmin = message.member.roles.exists("name", "ADMIN");
                    this.permissionModerateurs = message.member.roles.exists("name", "MODERATEURS");
                    this.permissionBotmaster = message.member.roles.exists("name", "BOT MASTER");
                }
                catch (err) {
                    this.print(this.server.role + " n'est pas un rôle sur ce serveur", err);
                }
            }
            if (message.content[0] == this.server.prefix) {
        
                let messageArray = message.content.split(" ");
                let cmd = messageArray[0];
                let commandFile = this.bot.commands.get(cmd.slice(1));
        
                if (commandFile) commandFile.run(this.bot, message);
            }
        });
    }
    
    launchHandlers(){
        // Commands Handler
        this.fs.readdir("./commands/", (err, files) => {
            if (err) this.print(err);

            let jsfile = files.filter(f => f.split(".").pop() === "js")
            if (jsfile.length <= 0) {
                this.print("Aucune commande enregistrer.");
                return;
            }

            jsfile.forEach((f, i) => {
                let props = require(`./commands/` + f);
                this.print(f + ' loaded !');
                this.bot.commands.set(props.help.name, props);
            });
        });

        // Emotes Handler
        this.fs.readdir("./commands/emotes/", (err, files) => {
            if (err) this.print(err);

            let jsfile = files.filter(f => f.split(".").pop() === "js")
            if (jsfile.length <= 0) {
                this.print("Aucun emotes enregistrer.");
                return;
            }

            jsfile.forEach((f, i) => {
                let props = require(`./commands/emotes/` + f);
                this.print(f + ' loaded !');
                this.bot.commands.set(props.help.name, props);
            });
        });
    }
    launchBot(){
        this.bot.login(this.config.token).then(() => {
                this.print("FalconBot is running");
                var file = this.fs.readFileSync(this.channelPath, { encoding: "utf-8" });
                this.servers = JSON.parse(file);
                twitch.tick();
                setInterval(twitch.tick, twitch.interval);
        });
    }
    launchMusic(){
        const Bot = this.bot;
        // Launch Music Module
        Bot.on('ready', function () {
            Bot.user.setActivity("Refonte Technique");
            // Music Module
            const music = new musicAddon(Bot, {
                prefix: "?",
                maxQueueSize: "1000",
                youtubeKey: 'AIzaSyCPdarptD2gazE4oA9ym-jzkJRPoY8pZis'
              });
        });
    }

    // Utility Things
    // For more comprehensive logs
    leadingZero(d) {
        if (d < 10) {
            return "0" + d;
        } else {
            return d;
        }
    }
    print(msg, err) {
        var date = new Date();
        let h = this.leadingZero(date.getHours());
        let m = this.leadingZero(date.getMinutes());
        let s = this.leadingZero(date.getSeconds());
    
        console.log("[" + h + ":" + m + ":" + s + "]", msg);
        if (err) {
            console.log(err);
        }
    }
    indexOfObjectByName(array, value) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].name.toLowerCase().trim() === value.toLowerCase().trim()) {
                return i;
            }
        }
        return -1;
    }
    // Preventing from fatal errors, saving channels information and exit
    exitHandler(opt, err) {
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
        process.on("exit", this.exitHandler.bind(null, { save: true }));
        process.on("SIGINT", this.exitHandler.bind(null, { exit: true }));
        process.on("SIGTERM", this.exitHandler.bind(null, { exit: true }));
        process.on("uncaughtException", this.exitHandler.bind(null, { exit: true }));
    }
        
}



module.exports = new FalconBase