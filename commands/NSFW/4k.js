const randomPuppy = require('random-puppy');
const request = require('snekfetch');
const fs = require("fs")

module.exports.run = (bot, message) => {
    if(message.content.substring(1, 3) == "4k"){
    if (!message.channel.nsfw) return message.channel.send(":underage: Commande NSFW. Va dans le channel NSFW pour utiliser cette commande.")
    message.delete().catch();

    var subreddits = [
        'NSFW_Wallpapers',
        'SexyWallpapers',
        'HighResNSFW',
        'nsfw_hd',
        'UHDnsfw'
    ]
    var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

    randomPuppy(sub)
        .then(url => {
            request.get(url).then(r => {
                fs.writeFile(`4k.jpg`, r.body)
                message.channel.sendFile(r.body)
                fs.unlink(`./4k.jpg`)
            })
        })
    }
}
module.exports.help = {
    name: "4k",
    commande: "!4k",
    level: "Public",
    description: "Commande NSFW 4k"
}