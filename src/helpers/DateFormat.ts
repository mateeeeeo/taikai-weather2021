
export function toDClimateFormat(date: Date) : string {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours() < 9 ? date.getHours() : `0${date.getHours()}`}:00:00+00:00`;
}