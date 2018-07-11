/*
############################
######## FalconBot #########
########### WIP ############
############################
*/
"use strict"
import core from './FalconBase'
import util from './Utility'
import twitch from './Twitch'

class Main extends core{

    constructor(){
        this.twitchChannels;
        this.permissionAdmin;
        this.permissionModerateurs;
        this.permissionBotmaster;
    }
    launch(){

        this.bot.login(util.config.token).then(() => {
            if (true) {
                util.print("FalconBot is running");
                var file = fs.readFileSync(this.channelPath, { encoding: "utf-8" });
                this.servers = JSON.parse(file);
                twitch.tick();
                setInterval(tick, interval);
            }
        });

        // Launch Music Module
        this.bot.on('ready', function () {
            this.bot.user.setActivity("Refonte Technique");
            // Music Module
            const music = new Music(bot, {
                prefix: "?",
                maxQueueSize: "1000",
                youtubeKey: 'AIzaSyCPdarptD2gazE4oA9ym-jzkJRPoY8pZis'
              });
        });

        this.bot.on("message", (message) => {
            var server;
            if (!message.guild) {
                return;
        
            } else {
                let index = util.indexOfObjectByName(this.servers, message.guild.name);
                if (index == -1) {
                    this.servers.push({
                        name: message.guild.name,
                        lastPrefix: "!", prefix: "!",
                        role: "MODERATEURS", discordChannels: [],
                        twitchChannels: []
                    });
                    index = this.servers.length - 1;
                }
        
                server = this.servers[index];
                this.twitchChannels = this.servers[index].twitchChannels;
            }
            if (message.content[0] == server.prefix) {
                try {
                    this.permissionAdmin = message.member.roles.exists("name", "ADMIN");
                    this.permissionModerateurs = message.member.roles.exists("name", "MODERATEURS");
                    this.permissionBotmaster = message.member.roles.exists("name", "BOT MASTER");
                }
                catch (err) {
                    util.print(server.role + " n'est pas un rôle sur ce serveur", err);
                }
            }
            if (message.content[0] == server.prefix) {
        
                let messageArray = message.content.split(" ");
                let cmd = messageArray[0];
                let commandFile = this.getCommands().get(cmd.slice(1));
        
                if (commandFile) commandFile.run(this.bot, message);
            }
        });
    }
}
    // Launch the bot
    const main = new Main;
    main.launch();

module.exports = new Main


