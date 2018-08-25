"use strict"
import twitch from './Twitch'
import fs from "fs"
import config from './botconfig.json'
import discord from 'discord.js'
import musicAddon from 'discord.js-musicbot-addon'

class FalconBase{
    constructor(){
        this.servers = [{}];
        this.twitchChannels = [{}];
        this.bot = new discord.Client();
        this.channelPath = __dirname + "/channels.json";
        this.bot.commands = new discord.Collection();

        this.permissionAdmin;
        this.permissionModerateurs;
        this.permissionBotmaster;
        this.server;
    }

    registerGuilds(){
        this.bot.on("message", (message) => {
            if (!message.guild) {
                return;
        
            } else {
                let index = this.indexOfObjectByName(this.servers, message.guild.name);
                if (index == -1) {
                    this.servers.push({
                        name: message.guild.name,
                        lastPrefix: "!", prefix: "!",
                        role: "MODERATEURS", discordChannels: [],
                        twitchChannels: []
                    });
                    index = this.servers.length - 1;
                }
        
                this.server = this.servers[index];
                this.twitchChannels = this.servers[index].twitchChannels;
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
        fs.readdir("./commands/", (err, files) => {
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
        fs.readdir("./commands/emotes/", (err, files) => {
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
        // Streaming Handlers
        setInterval(this.tick, twitch.interval);
    }
    launchBot(){
        this.bot.login(config.token).then(() => {
                this.print("FalconBot is running");
                var file = fs.readFileSync(this.channelPath, { encoding: "utf-8" });
                this.servers = JSON.parse(file);
                this.tick();
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

    tick() {
        for (let i = 0; i < this.servers.length; i++) {
            for (let j = 0; j < this.servers[i].twitchChannels.length; j++) {
                for (let k = -1; k < this.servers[i].discordChannels.length; k++) {
                    if (this.servers[i].twitchChannels[j]) {
                        twitch.callApi(this.servers[i], this.servers[i].twitchChannels[j], twitch.apiCallback, true, this.bot);
                    }
                }
            }
        }
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
        
}



module.exports = new FalconBase