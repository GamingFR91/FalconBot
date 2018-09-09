const randomPuppy = require('random-puppy');
const request = require('snekfetch');
const fs = require("fs")

module.exports.run = (bot, message) => {
    if(message.content.substring(1, 6) == "memes"){

        message.delete().catch();

        var subreddits = [
            'MemeEconomy',
            'wholesomememes',
            'dankmemes',
            'meirl',
            'memes'
        ]
        var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

        randomPuppy(sub)
            .then(url => {
                request.get(url).then(r => {
                    fs.writeFile(`memes.jpg`, r.body)
                    message.channel.sendFile(r.body)
                    fs.unlink(`./memes.jpg`)
                })
            })
    }
    
}
module.exports.help = {
    name: "memes",
    commande: "!memes",
    level: "Public",
    description: "Commande de dank memes"
}