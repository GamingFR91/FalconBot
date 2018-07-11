// Utility
class Utility{

    // For more comprehensive logs
    leadingZero(d) {
        if (d < 10) {
            return "0" + d;
        } else {
            return d;
        }
    }
    print(msg, err) {
        var date = new Date();
        let h = this.leadingZero(date.getHours());
        let m = this.leadingZero(date.getMinutes());
        let s = this.leadingZero(date.getSeconds());
    
        console.log("[" + h + ":" + m + ":" + s + "]", msg);
        if (err) {
            console.log(err);
        }
    }
    indexOfObjectByName(array, value) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].name.toLowerCase().trim() === value.toLowerCase().trim()) {
                return i;
            }
        }
        return -1;
    }
    // Preventing from fatal errors, saving channels information and exit
    exitHandler(opt, err) {
        if (err) {
            print(err);
        }
        if (opt.save) {
            print("Saving channels to " + channelPath + " before exiting");
            print(JSON.stringify(servers));
            fs.writeFileSync(channelPath, JSON.stringify(servers, null, 4));
            print("Done");
        }
        if (opt.exit) {
            process.exit();
        }
    }
}

module.exports = new Utility