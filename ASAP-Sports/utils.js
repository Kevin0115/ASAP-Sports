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
    console.log("getUserTimeStr");
    console.log(date);
    if (date === null) throw Error("Cannot pass null date to getUserTimeStr");
    const now = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const hourStr = hours % 12 === 0 ? 12 : hours % 12;
    const amPmStr = Math.floor(hours / 12) === 0 ? "AM" : "PM";
    const minStr = minutes === 0 ? "" : ":" + (minutes < 10 ? "0" + minutes : minutes) + " ";
    const dayStr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()];
    const monthDay = date.toLocaleString('en-US').split(' ').slice(1, 3).join(' ');
    const daysBetween = (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    if (daysBetween < -1/24) {
        return "Invalid Time"; // NOTIDEAL: How to be clear they selected a time in the past? Raise Exception maybe?
    }
    if (now.getDate() === date.getDate() && Math.abs(daysBetween) < 1){
        return hourStr + minStr + amPmStr + " Today";
    }
    if (daysBetween < 1) {
        return "Tomorrow " + hourStr + minStr + amPmStr; // TODO: doesn't do it properly if time is tomorrow but more than 24 hrs in future
    } else if (daysBetween < 7) {
        return dayStr + " " + hourStr + minStr + amPmStr;
    }
    return monthDay + " " + hourStr + minStr + amPmStr; // TODO: This is broken and works differently on iOS and Android
}

export function parseAPIDate(apiDate) {
    /**
     * returns: Date object in user's timezone
     */
    const utc_ms = Date.parse(apiDate);
    const user_timezone_offset_ms = new Date().getTimezoneOffset() * 60 * 1000;
    return new Date(utc_ms - user_timezone_offset_ms);
}
