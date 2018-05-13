const Discord = require("discord.js"),
    config = require("../botconfig.json"),
    apikey = config.fortniteApiKey,
    Fortnite = require("fortnite"),
    ft = new Fortnite(apikey);

module.exports.run = (bot, message) => {

    if (message.content.substring(1, 9) == "fortnite") {
        let args = message.content.split(" ");
        let cmd = args[1];
        let username = args[2];
        let platform = args[3] || "pc";

        let data = ft.getInfo(username, platform).then(data => {

            switch (args[1]) {

                case "global":

                    // Stats Lifetime
                    let stats = data.lifetimeStats;
                    let kills = stats.find(s => s.stat == "kills");
                    let wins = stats.find(s => s.stat == "wins");
                    let winRate = stats.find(s => s.stat == "win");
                    let score = stats.find(s => s.stat == "score");
                    let mPlayed = stats.find(s => s.stat == "matchesPlayed");
                    let kda = stats.find(s => s.stat == "kd");
                    let kpm = stats.find(s => s.stat == "killsPerMin");
                    let tPlayed = stats.find(s => s.stat == "timePlayed");
                    let survival = stats.find(s => s.stat == "avgSurvivalTime");

                    var fEmbed = new Discord.RichEmbed()
                        .setTitle("Fortnite Tracker (Stats Global) (beta)")
                        .setAuthor(data.username)
                        .setColor("#00AE86")
                        .setURL(data.url)
                        .addField("Score: ", score.value, true)
                        .addField("Temps de jeu:", tPlayed.value, true)
                        .addField("Wins: ", wins.value, true)
                        .addField("WinRate: ", winRate.value, true)
                        .addField("Total de kills: ", kills.value, true)
                        .addField("KDA: ", kda.value, true)
                        .addField("Kills par minutes: ", kpm.value, true)
                        .addField("Matchs joués: ", mPlayed.value, true)
                        .addField("Temps de survie (en moyenne): ", survival.value, true);

                    message.channel.send(fEmbed);

                    break;

                case "recent":

                    // Stats recent
                    let statsR = data.recentMatches;
                    let mPlayedR = statsR[0].minutesPlayed;
                    let file = statsR[0].playlist;
                    let killsR = statsR[0].kills;
                    let scoreR = statsR[0].score;
                    let nbMatches = statsR[0].matches;
                    let tops = [];

                    // Récupere les valeurs des tops
                    statsR.forEach(val => {
                        if (val.top1 != 0) {
                            tops.push(val.top1);

                        } else if (val.top3) {
                            tops.push(val.tops3);

                        } else if (val.top5) {
                            tops.push(val.top5);

                        } else if (val.top10) {
                            tops.push(val.top10);
                        } else if (val.top20) {
                            tops.push(val.top20);
                        }
                    });

                    let i = tops.length;

                    var fEmbed = new Discord.RichEmbed()
                        .setTitle("Fortnite Tracker (Dernier match joué) (beta)")
                        .setAuthor(data.username)
                        .setColor("#00AE86")
                        .setURL(data.url)
                        .addField("Queue: ", file)
                        .addField("Minutes jouée: ", mPlayedR, true)
                        .addField("Total de kills: ", killsR, true)
                        .addField("Score: ", scoreR, true);

                    for(let l = 0; l < i.length; l++)
                    {
                        fEmbed.addField("Tops", tops[l]);
                    }
                    message.channel.send(fEmbed);

                    break;

                case "solo":

                    break;

                case "duo":

                    break;

                case "section":

                    break;
            }

        }).catch(err => {
            console.log(err);
            message.channel.send("Aucun joueur trouvé.");
        });

    }
}

module.exports.help = {
    name: "fortnite"
}