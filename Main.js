/*
########################################################################################################################################################################
################################################################################# FalconBot ############################################################################
#################################################################################### WIP ###############################################################################
########################################################################################################################################################################
*/
"use strict"
import core from './FalconBase'

// Main
let launch = () => {

        core.registerGuilds();

        core.launchBot();

        core.launchMusic();

        core.launchHandlers();

        // Streaming Handlers
        setInterval(core.tick, 2 * 60 * 1000);

        process.on("exit", core.exitHandler.bind(null, { save: true }));
        process.on("SIGINT", core.exitHandler.bind(null, { exit: true }));
        process.on("SIGTERM", core.exitHandler.bind(null, { exit: true }));
        process.on("uncaughtException", core.exitHandler.bind(null, { exit: true }));
}
// Launch the bot
launch();


