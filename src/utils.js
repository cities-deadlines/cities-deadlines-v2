
// get current PST date 
export function getPSTDate() {
    var now = new Date();
    var utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    return new Date(utc - 8 * 3600000);
}

// get ms until midnight
export function getMSToMidnight() {
    var now = getPSTDate();
    var ms = 0;
    ms += (23 - now.getHours()) * 3600000;
    ms += (59 - now.getMinutes()) * 60000;
    ms += (59 - now.getSeconds()) * 1000;
    ms += 1000 - now.getMilliseconds();
    return ms;
}

// get ms until next game start
export function getMSToStart() {
    var now = getPSTDate();
    const ms = getMSToMidnight();
    if (now.getHours() >= 18) return ms + 18 * 3600000;
    else return ms - 6 * 3600000;
}   

// get h/m/s time until next game start
export function getTimeToStart() {
    var now = getPSTDate();
    var hours = 23 - now.getHours();
    var minutes = 59 - now.getMinutes();
    var seconds = 60 - now.getSeconds();
    if (now.getHours() >= 18) return [hours + 18, minutes, seconds];
    else return [hours - 6, minutes, seconds];
}
