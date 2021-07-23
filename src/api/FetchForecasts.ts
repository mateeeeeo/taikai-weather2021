import readline from 'readline';
import fs from 'fs';
import {LatLong} from '../interfaces/Interfaces';
import { revformat } from '../helpers/DateFormat';

type WeatherInfo = {
  pressure?: number,
  temp?: number,
  humidity?: number,
  condition?: string,
  wind?: [string, number], // direction, speed
  rain_chance?: number,
};

type Forecast = {
  date?: Date,
  weather_info: WeatherInfo,
};

type Location = {
  name: string,
  state: string,
  //lat_long: LatLong,
  forecasts?: Array<Forecast>
};

export let locations: Array<Location>;
const path = "../assets/forecasts.txt"

export function fetchWeeklyForecastsForLocation(lname: string): Array<Forecast> {
  let result: Array<Forecast> = new Array<Forecast>();
  let match: boolean;
  let actforecast: Forecast;
  let currentDate: Date = new Date();

  const reader = readline.createInterface(fs.createReadStream(path));
  reader.on("line", (l: string) => {
    const s = l.split(' ');
    if(s[0].endsWith(',')) {
      match=false;
      const d: number = parseInt(s[3].substring(0, s[3].length - 1))
      const yr: number = parseInt(s[4])
      const ndate: Date = revformat(s[2], d, yr)
      // checking if they're in the 7-day interval, also if it's the location we want
      if ((Math.abs(currentDate.getDay() - d) % 30) <= 3 && lname.toLowerCase() == s[0].toLowerCase()) match = true;
    }
    else
    {
      if (match) switch (s[0].toLowerCase()) {
        case "pressure:":
          actforecast.weather_info.pressure = parseFloat(s[1]);
          break;
        case "temperature:":
          actforecast.weather_info.temp = parseFloat(s[1]);
          break;
        case "humidity:":
          actforecast.weather_info.humidity = parseFloat(s[1]);
          break;
        case "condition:":
          let aux: string = "";
          for (let i = 1; i < s.length; ++i)
            aux += s[i]; aux += " ";
          actforecast.weather_info.condition = aux;
          break;
        case "wind:":
          if (s[1] == "Unknown") actforecast.weather_info.wind = ["N/A", -1];
          else actforecast.weather_info.wind = [s[1], parseInt(s[3])];
          break;
        case "chance":
          // this is also the end of the buffer which is why we'll be checking for duplicates
          actforecast.weather_info.rain_chance = parseInt(s[3]);
          result.push(actforecast);
          break;
      }
    }
  })
  return result;
}

export function fetchForecastsForDate(date:Date) : Array<Location> {
  let result: Array<Location> = new Array<Location>();
  let match: boolean;
  let actforecast: Forecast;
  let actlocation: Location;

  const reader = readline.createInterface(fs.createReadStream(path));
  reader.on("line", (l: string) => {
    const s = l.split(' ');
    if(s[0].endsWith(',')) {
      match=false;
      const d: number = parseInt(s[3].substring(0, s[3].length - 1))
      const yr: number = parseInt(s[4])
      const ndate: Date = revformat(s[2], d, yr)
      if (ndate == date) match = true; // if it's the same date we're looking for, we proceed with the reading
    }
    else
    {
      if (match) switch (s[0].toLowerCase()) {
        case "pressure:":
          actforecast.weather_info.pressure = parseFloat(s[1]);
          break;
        case "temperature:":
          actforecast.weather_info.temp = parseFloat(s[1]);
          break;
        case "humidity:":
          actforecast.weather_info.humidity = parseFloat(s[1]);
          break;
        case "condition:":
          let aux: string = "";
          for (let i = 1; i < s.length; ++i)
            aux += s[i]; aux += " ";
          actforecast.weather_info.condition = aux;
          break;
        case "wind:":
          if (s[1] == "Unknown") actforecast.weather_info.wind = ["N/A", -1];
          else actforecast.weather_info.wind = [s[1], parseInt(s[3])];
          break;
        case "chance":
          // this is also the end of the buffer which is why we'll be checking for duplicates
          actforecast.weather_info.rain_chance = parseInt(s[3]);

          actlocation.forecasts?.push(actforecast); // we create a new location if that is not the case
          result.push(actlocation);
          break;
      }
    }
  })
  return result;
}

export function fetchForecasts(range:number) { //The forecasts will be saved in global variable locations
  let actforecast: Forecast;
  let actlocation: Location;
  const actDay = new Date().getDay();
  let inrange: boolean;

  const reader = readline.createInterface(fs.createReadStream(path));
  reader.on("line", (l: string) => {
    const s = l.split(' ');
    if (s[0].endsWith(',')) {
      inrange = true;
      const d: number = parseInt(s[3].substring(0, s[3].length - 1));
      if (Math.abs(actDay - d) <= range) {
        const yr: number = parseInt(s[4])
        const ndate: Date = revformat(s[2], d, yr)
      
        actlocation = { name: s[0].substring(0, s[0].length - 1), state: s[1].substring(0, s[1].length - 1) }
        actforecast.date = ndate;
      }
    
    }
    else {
      if (inrange) switch (s[0].toLowerCase()) {
          case "pressure:":
            actforecast.weather_info.pressure = parseFloat(s[1]);
            break;
          case "temperature:":
            actforecast.weather_info.temp = parseFloat(s[1]);
            break;
          case "humidity:":
            actforecast.weather_info.humidity = parseFloat(s[1]);
            break;
          case "condition:":
            let aux: string = "";
            for (let i = 1; i < s.length; ++i)
              aux += s[i]; aux += " ";
            actforecast.weather_info.condition = aux;
            break;
          case "wind:":
            if (s[1] == "Unknown") actforecast.weather_info.wind = ["N/A", -1];
            else actforecast.weather_info.wind = [s[1], parseInt(s[3])];
            break;
          case "chance":
            // this is also the end of the buffer which is why we'll be checking for duplicates
            actforecast.weather_info.rain_chance = parseInt(s[3]);

            let match: boolean = false;
            locations.forEach(location => {
              if (location.name.toLowerCase() == actlocation.name.toLowerCase()) // identical match
              {
                match = true;
                location.forecasts?.push(actforecast); // we simply add another forecast to the existing batch
                return;
              }
            });
            if (match) break;
            actlocation.forecasts?.push(actforecast); // we create a new location if that is not the case
            locations.push(actlocation);
            break;
        }
    }
  })
}