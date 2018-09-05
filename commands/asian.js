const randomPuppy = require('random-puppy');
const request = require('snekfetch');
const fs = require("fs")

module.exports.run = (bot, message) => {
    if(message.content.substring(1, 6) == "asian"){
        if (!message.channel.nsfw) return message.channel.send(":underage: Commande NSFW. Va dans le channel NSFW pour utiliser cette commande.")
        message.delete().catch();

        var subreddits = [
            'AsianHotties',
            'juicyasians',
            'asianbabes'
        ]
        var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

        randomPuppy(sub)
            .then(url => {
                request.get(url).then(r => {
                    fs.writeFile(`asian.jpg`, r.body)
                    message.channel.sendFile(r.body)
                    fs.unlink(`./asian.jpg`)
                })
            })
        }
}
module.exports.help = {
    name: "asian",
    commande: "!asian",
    level: "Public",
    description: "Commande NSFW Asian"
}