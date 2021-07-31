import { WindDirection } from './../enums/enums';
import { WeatherCondition } from './../enums/enums';

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
// response from the OpenAQ API for air quality
export interface APIAirQualityResponse {
    data: Object,
    snappedTo: Array<number>
}

export type Theme = {
    isDarkMode: boolean;
}

export type WeatherInfo = {
    pressure?: number,
    temp?: number,
    humidity?: number,
    condition?: WeatherCondition,
    wind_direction: WindDirection,
    wind_vel: number,
    rain_chance?: number,
};

export type Forecast = {
    date?: Date,
    weather_info: WeatherInfo,
};

export type Location = {
    name: string,
    lat_long: LatLong,
    // forecasts?: Array<Forecast>
};

export interface Language {
    name: string,
    noDataTitle: string,
    noDataDesc: string,
    airPressure: string,
    humidity: string,
    chanceOfRain: string,
    wind: string,
    weatherCondition: string,
    soilMoisture: string,
    highFloodRisk: string,
    lowFloodRisk: string,
    mediumFloodRisk: string,
    sunny: string,
    clear: string,
    partlyCloudy: string,
    cloudy: string,
    foggy: string,
    north: string,
    northEast: string,
    east: string,
    southEast: string,
    south: string,
    southWest: string,
    west: string,
    northWest: string,
    unknown: string
}