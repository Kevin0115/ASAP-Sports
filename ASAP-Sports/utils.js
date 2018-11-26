export function encodeQueryString(params) {
    const keys = Object.keys(params)
    return keys.length
        ? "?" + keys.map(
          key => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
          ).join("&")
        : ""
}

export function meters2kmString(m) {
    return parseFloat(Math.round(m/100)/10).toFixed(1) + ' km';
}

export function getUserTimeStr(date) {
    /**
     * This is trash and there has to be a better way to do this
     */
    if (date === null) throw Error("Cannot pass null date to getUserTimeStr");
    const now = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const hourStr = hours % 12 === 0 ? 12 : hours % 12;
    const amPmStr = Math.floor(hours / 12) === 0 ? "AM" : "PM";
    const minStr = minutes === 0 ? "" : ":" + (minutes < 10 ? "0" + minutes : minutes) + " ";
    const dayStr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()];
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getMonth()];
    const day = date.getDate(); // From 1 to 31
    const daysBetween = (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    console.log(date.toUTCString(), "has some days between now", daysBetween);
    if (daysBetween < -1/24) {
        // NOTIDEAL: Should display yesterday, 2 days ago, 3 days ago, ....
        return month + " " + day + " " + hourStr + minStr + amPmStr;
    }
    if (now.getDate() === date.getDate() && Math.abs(daysBetween) < 1){
        return hourStr + minStr + amPmStr + " Today";
    }
    const tomorrow = new Date(now.getTime() + (1000 * 60 * 60 * 24));
    if (tomorrow.getDate() === date.getDate() && daysBetween < 2) {
        return "Tomorrow " + hourStr + minStr + amPmStr;
    } else if (daysBetween < 6) {
        return dayStr + " " + hourStr + minStr + amPmStr;
    }
    return month + " " + day + " " + hourStr + minStr + amPmStr;
}

export function parseAPIDate(apiDate) {
    /**
     * returns: Date object in user's timezone
     */
    const utc_ms = Date.parse(apiDate);
    const user_timezone_offset_ms = new Date().getTimezoneOffset() * 60 * 1000;
    return new Date(utc_ms - user_timezone_offset_ms);
}
