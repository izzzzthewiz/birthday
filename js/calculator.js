export function getTimeUntilBday(date){
    const bday = new Date(`${date} 00:00:00`)
    const now = new Date()
    const diff = bday - now
    const diffDays = toDays(diff)
    const diffHours = toHours(diff - toUnixDays(diffDays))
    const diffMinutes = toMinutes(diff - toUnixDays(diffDays) - toUnixHours(diffHours))
    const diffSeconds = toSeconds(diff - toUnixDays(diffDays) - toUnixHours(diffHours) - toUnixMinutes(diffMinutes))
    return {
        days: diffDays,
        hours: diffHours,
        minutes: diffMinutes,
        seconds: diffSeconds
    }
}
export function formatNum(i){
    if (i > 9) return i
    if (i < 0) return i
    return `0${i}`
}
function toSeconds(i){
    return Math.floor(i / 1000)
}
function toMinutes(i) {
    return Math.floor(i / (60 * 1000))
}
function toHours(i) {
    return Math.floor(i / (60 * 60 * 1000))
}
function toDays(i) {
    return Math.floor(i / (24 * 60 * 60 * 1000))
}
function toUnixSeconds(i){
    return Math.floor(i * 1000)
}
function toUnixMinutes(i) {
    return Math.floor(i * (60 * 1000))
}
function toUnixHours(i) {
    return Math.floor(i * (60 * 60 * 1000))
}
function toUnixDays(i) {
    return Math.floor(i * (24 * 60 * 60 * 1000))
}