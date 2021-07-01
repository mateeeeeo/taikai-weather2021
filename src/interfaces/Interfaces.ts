
// coordinates of a location using latitude and longitude
export interface LatLong {
    lat: number,
    long: number
}

// response to be displayed in the dashboard with a date and value
export interface SoilMoistureResponse {
    date: string,
    moisture: number
}

// response from the dClimate API for soil moisture
export interface APISoilMoistureResponse {
    data: Object,
    snappedTo: Array<number>
}

export interface Theme {
    isDarkMode: boolean;
}