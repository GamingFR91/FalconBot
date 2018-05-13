# FalconBot
FalconBot is a Discord bot that allow you to make stream notifications (twitch API) on discord channels,
There is also a **Music Module**, **Fortnite Tracker (WIP)** & **Custom Emotes (WIP)**

# Get Started

[Node JS](https://nodejs.org/en) & npm is required

Clone this repository

```
cd FalconBot/
npm install
```

open **botconfig.json** and you should see this:

```
{
    "token": "YOUR_TOKEN_HERE",
    "twitchClientID": "YOUR_TWITCH_CLIENT_ID",
    "fortniteApiKey": "YOUR_FORTNITE_TRACKER_KEY"
}
```
**"token"** line need a **Discord Token ID** [see this tutorial "How to get a discord bot token"](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token)

**"twitchClientID** is needed to make stream notifications works [check the twitch dev documentation](https://dev.twitch.tv/docs/v5)

**fortniteApiKey** is needed to make the Fortnite Tracker module works [get a API Key here](https://fortnitetracker.com/site-api)

now open **index.js** and go **to line 237**

```
// Music Module
    const music = new Music(bot, {
        prefix: "?",
        maxQueueSize: "1000",
        youtubeKey: 'YOUR_YOUTUBE_API_KEY'
      });
```

**youtubeKey** is needed to make the Music Module works [get a Youtube API Key here](https://developers.google.com/youtube/registering_an_application)

when everything is done, you can run this command on your bot folder

```
node index.js
```
This will run your bot, but now you'll need to invite him on your discord server

in order to invite your bot, insert your **Discord bot client ID** (and not token) in this url:

```
https://discordapp.com/api/oauth2/authorize?client_id=INSERT_CLIENT_ID_HERE&scope=bot&permissions=1
```
