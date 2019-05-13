const Discord = require("discord.js");
const download = require("download-file");
const fs = require("fs");

module.exports.run = (bot, message) => {
  if (message.content.substring(1, 7) == "emotes") {
    let args = message.content.split(" ");
    let cmd = args[1];
    let name = args[2];

    switch (cmd) {
      case "create":
        if (name) {

            // Récupéré l'image envoyé avec le message
            let arrayAttachments = message.attachments.array();
            let commandLength = name.length + 1;
            var fileUrl;
            arrayAttachments.forEach(e =>{
                fileUrl = e.url;
            });
            if(!fileUrl){ message.channel.send("Veuillez rajouter votre emote avec votre message !"); return;}

            let options = {
                directory: "../../emotes",
                filename: name+".png"
            }
             
            download(fileUrl, options, err =>{
                if (err) throw err;
                console.log("Image de l'emote "+name+" a été téléchargé !");
            });

            fs.writeFile(+name+'.js', "const Discord = require('discord.js'); module.exports.run = (bot, message) => { if (message.content.substring(1, "+commandLength+") == '"+name+"') {"+
                "message.delete().catch(); let emote = '../../emotes/"+name+".png'; message.channel.send(message.member, { files: [emote] }); } }; module.exports.help = { name: '"+name+"'};", { mode: 777 }, err => {
                if (err) throw err;
                console.log('Saved '+name+' to the emotes list !');
                message.channel.send("L'emote **"+name+"** a bien été ajouté à la liste !");
            });

        } else {
          message.channel.send(
            "Spécifie un nom d'emote (exemple: !emotes create nomdelemote)"
          );
          return;
        }

        break;

      case "remove":
        break;

      case "list":
        const emojiList = message.guild.emojis.map(e => e.toString()).join(" ");
        const emojiPath = './commands/emotes/';
        var customEmoji = [];
        fs.readdir(emojiPath, (err, files) => {
          if (err) {
            console.log(err)
        }
        let jsfile = files.filter(f => f.split(".").pop() === "js")
          jsfile.forEach(file => {
            let f = file.split('.');
            let name = f[0];
            customEmoji.push('!'+name);
          });
        });
        var emoji = customEmoji.join(' ');
        
        message.channel.send(emojiList + "\n " + emoji);

        break;
    }
  }
};

module.exports.help = {
  name: "emotes",
  commande: "!emotes {create|remove|list}",
  level: "Public",
  description: "Permet de créer/supprimer ou lister les emotes disponibles sur le serveur"

};