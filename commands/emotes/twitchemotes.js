const Discord = require("discord.js");

module.exports.run = (bot, message) =>{

let emotes = ['batchest', 'supervinlin', 'bcwarrior', 'thetarfu', 'osfrog', 'mcat', 'mikehogu', 'cheffrank',
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
    if(message.content.substring(1, e.length + 1) == e)
        {
            message.delete().catch();
            let emote = './emotes/'+e+'.png';
            message.channel.send('', {
                files: [
                    emote
                ]
            });
        }
}).catch(err =>{
    console.log(err);
});
}


module.exports.help = {
    name: "twitchemotes"
}
