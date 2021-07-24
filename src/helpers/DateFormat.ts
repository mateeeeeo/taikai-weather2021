
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function toDClimateFormat(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()} ${date.getHours() < 9 ? date.getHours() : `0${date.getHours()}`}:00:00+00:00`;
}

export function format(date: Date): string {
    const month: number = date.getMonth();
    const day: number = date.getDate();
    const year: number = date.getFullYear();

    return `${MONTHS[month]} ${day}, ${year}`;
}

export function inputFormat(date: Date): string {
    const month: number = date.getMonth() + 1;
    const day: number = date.getDate();
    const year: number = date.getFullYear();

    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
}

export function revformat(m: string, d: number, y: number): Date {
    var m_no: number;
    switch (m) {
        case ("January"): m_no = 1; break;
        case ("February"): m_no = 2; break;
        case ("March"): m_no = 3; break;
        case ("April"): m_no = 4; break;
        case ("May"): m_no = 5; break;
        case ("June"): m_no = 6; break;
        case ("July"): m_no = 7; break;
        case ("August"): m_no = 8; break;
        case ("September"): m_no = 9; break;
        case ("October"): m_no = 10; break;
        case ("November"): m_no = 11; break;
        case ("December"): m_no = 12; break;
        default: m_no = 0; break;
    };
    return new Date(m_no, d, y);
}