
export function toDClimateFormat(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours() < 9 ? date.getHours() : `0${date.getHours()}`}:00:00+00:00`;
}

export function format(date: Date): string {
    const month: number = date.getMonth();
    const day: number = date.getDate();
    const year: number = date.getFullYear();

    return `${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}/${year}`;
}

export function inputFormat(date: Date): string {
    const month: number = date.getMonth();
    const day: number = date.getDate();
    const year: number = date.getFullYear();

    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
}