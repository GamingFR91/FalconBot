// Utility Things
// For more comprehensive logs 
let leadingZero = (d) => {
    if (d < 10) {
        return "0" + d;
    } else {
        return d;
    }
}
module.exports.print = (msg, err) => {
    var date = new Date();
    let h = leadingZero(date.getHours());
    let m = leadingZero(date.getMinutes());
    let s = leadingZero(date.getSeconds());

    console.log("[" + h + ":" + m + ":" + s + "]", msg);
    if (err) {
        console.log(err);
    }
}
module.exports.indexOfObjectByName = (array, value) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i].name.toLowerCase().trim() === value.toLowerCase().trim()) {
            return i;
        }
    }
    return -1;
}