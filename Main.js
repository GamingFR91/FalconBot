/*
########################################################################################################################################################################
################################################################################# FalconBot ############################################################################
#################################################################################### WIP ###############################################################################
########################################################################################################################################################################
*/
"use strict"
import core from './FalconBase'
import fs from "fs"

class Main{

    // Preventing from fatal errors, saving channels information and exit
    exitHandler(opt, err) {
        if (err) {
            core.print(err);
        }
        if (opt.save) {
            core.print("Saving channels to " + core.channelPath + " before exiting");
            core.print(JSON.stringify(core.servers));
            fs.writeFileSync(core.channelPath, JSON.stringify(core.servers, null, 4));
            core.print("Done");
        }
        if (opt.exit) {
            process.exit();
        }
    }

    launch(){

        core.registerGuilds();

        core.launchBot();

        core.launchMusic();

        core.launchHandlers();

        process.on("exit", this.exitHandler.bind(null, { save: true }));
        process.on("SIGINT", this.exitHandler.bind(null, { exit: true }));
        process.on("SIGTERM", this.exitHandler.bind(null, { exit: true }));
        process.on("uncaughtException", this.exitHandler.bind(null, { exit: true }));
    }
}
    // Launch the bot
    const main = new Main;
    main.launch();

module.exports = new Main


