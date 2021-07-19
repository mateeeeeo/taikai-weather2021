import readline from 'readline';
import fs from 'fs';
import {LatLong} from './interfaces/Interfaces';
import { revformat } from './helpers/DateFormat';

type WeatherInfo = {
  pressure: number,
  temp: number,
  humidity: number,
  condition: string,
  wind: [string, number], // direction, speed
  rain_chance: number,
};

type Forecast = {
  date: Date,
  weather_info: WeatherInfo,
};

type Location = {
  name: string,
  state: string,
  //lat_long: LatLong,
  forecasts?: Forecast[]
};

let locations: Array<Location>;
const path = "C:\\Users\\Administrator\\Documents\\taikai-weather2021\\src\\assets\\forecasts.txt"

var reader = readline.createInterface(fs.createReadStream(path));
reader.on("line", (l: string) => {
  var s = l.split(' ');
  if (s[0].endsWith(','))
  {
    const loc: Location = { name: s[0].substring(0, s[0].length - 1), state: s[1].substring(0, s[1].length - 1) }
  }
})