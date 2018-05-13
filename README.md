# FalconBot

![FalconBot logo](https://github.com/Kalivins/FalconBot/blob/master/img/falconbot_logo.jpg)

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

# Commands

Here the full list of the commands available in FalconBot:

## Streaming notifications module

```!liste``` : List all the streamers that FalconBot need to watch for notifications.

```!ajoute streamername``` : Add a streamer to the list.

```!degage streamername``` : delete a streamer from the list.

```!configure``` : Command that handle all the configuration for this module
-```!configure channel add ```: Add a text channel to the list of channel that FalconBot need to do streaming notifications,
-```!configure channel remove ```: Remove a text channel from the list of channel,
-```!configure prefix ? ```: Changing prefix to ! from ?
-```!configure role roleName ```: Role that can use the streaming module,
-```!configure list ```: List the actual configuration,
 
 ## Music Module
 
 ```?play <link to Youtube Video or Keywords>```: Join your voice channel and play the actual youtube video (adding it to the queue).
 
 ```?search <Keywords>```: search for videos.
 
 ```?skip number```: Skip some number of songs. Will skip 1 song if a number is not specified.
 
 ```?loop ```: loop the current video.
 
```?queue```: Display the current queue.
 
 ```?pause```: Pause music playback.
 
 ```?resume```: Resume music playback
 
 ```?volume```: Adjust the playback volume between 1 and 200
 
 ```?leave```: Clears the song queue and leaves the channel.
 
 ```?clearqueue ```: Clears the song queue
 
 ## Fortnite Tracker Module (WIP)
 
 ```!fortnite global username ```: show global stats about a player
 
 More to come (for solo/duo/squad queue, more fancy stats display ...)
 
 ## Custom Emotes (Very WIP)
 
 ```!emotes create nameofanemote ```: (need to attach an image with this message) create a new emote (need to restart FalconBot for now)
 
 ```!nameofanemote ```: display the actual emote
 
 Still need works and testing
 ## Misc
 
 ```!say blabla ```: FalconBot will say "blabla"
 
 ```!clear [number]``` : will clear the last [number] messages
 
 ```!serverinfo ```: display informations about your server
 
 ```!time ```: display the actual time
