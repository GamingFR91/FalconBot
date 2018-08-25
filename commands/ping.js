const Discord = require("discord.js");

module.exports.run = (bot, message) =>{

if(message.content.substring(1, 5) == "ping")
    {
        message.channel.send('Flip &').then(message =>{
        message.edit('Flip & Pinging...').then(message => {
			let delay = message.editedAt - message.createdAt;
            message.edit('Pong! ('+delay+' ms)');
        });
    });
    }
}

module.exports.help = {
    name: "ping"
}