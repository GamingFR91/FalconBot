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
        permissionAdmin = message.member.roles.exists("name", "Le Roi Faucon");
        permissionModerateurs = message.member.roles.exists("name", "Faucons de sécurité");
        permissionBotmaster = message.member.roles.exists("name", "BOT_FAUCON");
    }
    catch (err) {
        util.print(server.role + " n'est pas un rôle sur ce serveur", err);
    }
    if(permissionAdmin || permissionModerateurs || permissionBotmaster){
        return true;
    }
}
module.exports.giveHelp = (message) =>{
    var commands, commandes, levels, descriptions;
    commands = bot.commands.array();
    commands.forEach((value, index) =>{
        if(value.help.commande != undefined || value.help.commande != ''){
            commandes = value.help.commande;
        }
        if(value.help.level != undefined || value.help.level != ''){
            levels = value.help.level;
        }
        if(value.help.description != undefined || value.help.description != ''){
            descriptions = value.help.description;
            console.log(descriptions);
        }
        
    });
    
    
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
                
                twitchEmotes(message);

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
        var walkSync = function(dir, filelist) {
            var files = fs.readdirSync(dir);
            filelist = filelist || [];
            files.forEach(function(file) {
                if (fs.statSync(dir + file).isDirectory()) {
                    filelist = walkSync(dir + file + '/', filelist);
                }
                else {
                    filelist.push(dir + file);
                }
            });
            return filelist;
          };
    var files = walkSync('./commands/');
    let jsfiles = files.filter(f => f.split(".").pop() === "js")
    if (jsfiles.length <= 0) {
        util.print("Aucune commandes enregistrer.");
        return;
    }

    jsfiles.forEach((f, i) => {
        let props = require(f);
        let moduleName = f.split('/');
        util.print(moduleName[3] + ' loaded !');
        bot.commands.set(props.help.name, props);
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
                                console.log(servers);
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
                youtubeKey: 'AIzaSyCPdarptD2gazE4oA9ym-jzkJRPoY8pZis'
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

let twitchEmotes = (message) => {

    var emotes = ['batchest', 'supervinlin', 'bcwarrior', 'thetarfu', 'osfrog', 'mcat', 'mikehogu', 'cheffrank',
    'ssssss', 'hotpokket', 'kapow', 'kreygasm', 'uwot', 'theringer', 'pogchamp', 'primeme', 'brokeback',
    'seemsgood', 'dududu', 'pipehype', 'brainslug', 'kappapride', 'twitchvotes', 'mau5', 'kevinturtle',
    'babyrage', 'poooound', 'entropywins', 'voteyea', 'gingerpower', 'keepo', 'datsheffy', 'elegiggle',
    'heyguys', 'tehepelo', 'arsonnosexy', 'frankerz', 'ninjagrumpy', 'theilluminati', 'tbtacoprops',
    'strawbeary', 'wholewheat', 'jebaited', 'tinyface', 'partytime', 'punoko', 'squid1', 'bigphish',
    'argieb8', 'kappaclaus', 'coolcat', 'opieop', 'wtruck', 'joncarnage', 'inuyoface', 'grammarking',
    'jkanstyle', 'tbtacobag', 'pjsugar', 'itsboshytime', 'carlsmile', 'permasmug', 'copythis', 'kappa',
    'blargnaut', 'twitchraid', 'amptroppunch', 'youdontsay', 'squid3', 'kippa', 'kappu', 'squid2', 'squid4',
    'punchtrees', 'dxcat', 'youwhy', 'futureman', 'mvgame', 'ralpherz', 'praiseit', 'twitchlit', 'peopleschamp',
    'ritzmitz', 'daesuppy', 'hscheers', 'anele', 'thething', 'rlytho', 'notatk', 'ohmydog', 'vohiyo', 'hassanchop',
    'coolstorybob', 'smorc', 'optimizeprime', 'koncha', 'thunbeast', 'kappaross', 'unsane', 'dbstyle', 'stinkycheese',
    'onehand', 'toospicy', 'hsvoid', 'freakinstinkin', 'mrdestructoid', 'picomause', 'notlikethis', 'failfish',
    'giveplz', 'funrun', 'rulefive', 'begwan', 'tbangel', 'sobayed', 'blessrng', 'residentsleeper', 'darkmode',
    'panicbasket', 'dogface', 'tf2john', 'sabaping', '4head', 'shadylulu', 'prchase', 'pjsalt', 'biblethump',
    'dendiface', 'twitchrpg', 'unclenox', 'imglitch', 'takenrg', 'asianglow', 'wutface', 'corgiderp', 'tearglove',
    'shazbotstix', 'smoocherz', 'hassaanchop', 'bleedpurple', 'lul', 'tpcrunchyroll', 'humblelife', 'nomnom',
    'twitchunity', 'budstar', 'vaultboy', 'powerupl', 'trihard', 'thankegg', 'arigatonas', 'stonelightning',
    'tbcrunchy', 'quaddamage', 'pmstwin', 'ripepperonis', 'votenay', 'bloodtrail', 'bjblazkowicz', 'ossloth',
    'morphintime', 'powerupr', 'pastathat', 'curselit', 'fungineer', 'minglee', 'oskomodo', 'cmonbruh',
    'doritoschip', 'crreamawk'];

    emotes.forEach(e =>{
        if(message.content.substring(1, e.length + 1) === e)
            {
                message.delete().catch();
                console.log(e);
                let emote = './emotes/'+e+'.png';
                message.channel.send('', {
                    files: [
                        emote
                    ]
                });
            }
    });
}
