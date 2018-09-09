const randomPuppy = require('random-puppy');
const request = require('snekfetch');
const fs = require("fs")

module.exports.run = (bot, message) => {
    if(message.content.substring(1, 7) == "hentai"){
        if (!message.channel.nsfw) return message.channel.send(":underage: Commande NSFW. Va dans le channel NSFW pour utiliser cette commande.")

        var subreddits = [
            'HENTAI_GIF',
            'hentai_irl'
        ]
        var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

        randomPuppy(sub)
            .then(url => {
                request.get(url).then(r => {
                    fs.writeFile(`hentai.jpg`, r.body)
                    message.channel.sendFile(r.body)
                    fs.unlink(`./hentai.jpg`)
                })
            })
    }
    
}
module.exports.help = {
    name: "hentai",
    commande: "!hentai",
    level: "Public",
    description: "Commande NSFW Hentai"
}