import * as fs from 'fs';
import { Forecast, Location, WeatherInfo } from '../interfaces/Interfaces';
import { MONTHS, revformat, toDClimateFormat } from '../helpers/DateFormat';

export let locations: Array<Location>;
const path = "forecasts.json";

// export async function fetchForecastsForLocationJSON(interval: number, lname: string, indate: Date): Promise<Forecast | undefined> {
//   return new Promise(async (res, rej) => {
//     try {
//       let result: Forecast | undefined = undefined;
//       // we format our date so it fits our json requirements
//       const response = await fetch(path,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//           }
//         });
//       const obj = await response.json();

//       for (let i = 0; i < obj.forecasts.length; ++i) {
//         let f = obj.forecasts[i];
//         if ((Math.abs(indate.getDate() - f.d) % 30) <= interval && lname.toLowerCase() == f.city.toLowerCase()) { // checking if name and date fit
//           let info: WeatherInfo = {
//             temp: f.temp, pressure: f.pressure, rain_chance: f.rain_chance,
//             humidity: f.humidity, condition: f.cond, wind: [f.wind_direction, f.wind_velocity]
//           }
//           result = { date: indate, weather_info: info };
//         }
//       }

//       res(result);

//     } catch (err) {
//       rej(err);
//     }
//   });
// }

export async function fetchForecastsForLocationJSON(lname: string, date: Date): Promise<Forecast | undefined> {
  // console.log(date);
  let fpath: string = "forecasts/";

  if(date.getDate() <= 10) fpath += "0"
  fpath += date.getDate().toString();
  if (date.getMonth() <= 10) fpath += "0"
  fpath += ((date.getMonth() +1).toString() + date.getFullYear().toString() + ".json");
  console.log(fpath);
  return new Promise(async (res, rej) => {
    let result: Forecast | undefined = undefined;
    // we format our date so it fits our json requirements
    const response = await fetch(fpath,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(async function (response) {
        if (!response.ok) throw new Error("There isn't a forecast available for this date.")
        else {
          const obj = await response.json();
          for (let i = 0; i < obj.cities.length; ++i) {
            const c = obj.cities[i]; // forecast

            if (lname.toLowerCase() === c.name.toLowerCase()) { // checking if name and date fit

              //console.log(fD.toDateString());

              let info: WeatherInfo = {
                temp: c.temp,
                pressure: c.pressure,
                rain_chance: c.rain_chance,
                humidity: c.humidity,
                condition: c.cond,
                wind_direction: c.wind_direction,
                wind_vel: c.wind_vel
              }
              result = { date: date, weather_info: info };
            }
          }
          res(result);
        }
      }).catch(function (err) {
        rej(err);
      }); 
  });
}


// export function fetchForecastsForLocation(interval: number, lname: string, date: Date): Array<Forecast> {
//   let result: Array<Forecast> = new Array<Forecast>();
//   let match: boolean;
//   let actforecast: Forecast;

//   const reader = readline.createInterface(fs.createReadStream(path));
//   reader.on("line", (l: string) => {
//     const s = l.split(' ');
//     if (s[0].endsWith(',')) {
//       match = false;
//       const d: number = parseInt(s[3].substring(0, s[3].length - 1))
//       const yr: number = parseInt(s[4])
//       const ndate: Date = revformat(s[2], d, yr)
//       // checking if they're in the 7-day interval, also if it's the location we want
//       if ((Math.abs(date.getDay() - d) % 30) <= interval && lname.toLowerCase() == s[0].toLowerCase()) match = true;
//     }
//     else {
//       if (match) switch (s[0].toLowerCase()) {
//         case "pressure:":
//           actforecast.weather_info.pressure = parseFloat(s[1]);
//           break;
//         case "temperature:":
//           actforecast.weather_info.temp = parseFloat(s[1]);
//           break;
//         case "humidity:":
//           actforecast.weather_info.humidity = parseFloat(s[1]);
//           break;
//         case "condition:":
//           let aux: string = "";
//           for (let i = 1; i < s.length; ++i)
//             aux += s[i]; aux += " ";
//           actforecast.weather_info.condition = aux;
//           break;
//         case "wind:":
//           if (s[1] == "Unknown") actforecast.weather_info.wind = ["N/A", -1];
//           else actforecast.weather_info.wind = [s[1], parseInt(s[3])];
//           break;
//         case "chance":
//           // this is also the end of the buffer which is why we'll be checking for duplicates
//           actforecast.weather_info.rain_chance = parseInt(s[3]);
//           result.push(actforecast);
//           break;
//       }
//     }
//   })
//   return result;
// }

// export function fetchForecastsForDate(date: Date): Array<Location> {
//   let result: Array<Location> = new Array<Location>();
//   let match: boolean;
//   let actforecast: Forecast;
//   let actlocation: Location;

//   const reader = readline.createInterface(fs.createReadStream(path));
//   reader.on("line", (l: string) => {
//     const s = l.split(' ');
//     if (s[0].endsWith(',')) {
//       match = false;
//       const d: number = parseInt(s[3].substring(0, s[3].length - 1))
//       const yr: number = parseInt(s[4])
//       const ndate: Date = revformat(s[2], d, yr)
//       if (ndate == date) match = true; // if it's the same date we're looking for, we proceed with the reading
//     }
//     else {
//       if (match) switch (s[0].toLowerCase()) {
//         case "pressure:":
//           actforecast.weather_info.pressure = parseFloat(s[1]);
//           break;
//         case "temperature:":
//           actforecast.weather_info.temp = parseFloat(s[1]);
//           break;
//         case "humidity:":
//           actforecast.weather_info.humidity = parseFloat(s[1]);
//           break;
//         case "condition:":
//           let aux: string = "";
//           for (let i = 1; i < s.length; ++i)
//             aux += s[i]; aux += " ";
//           actforecast.weather_info.condition = aux;
//           break;
//         case "wind:":
//           if (s[1] == "Unknown") actforecast.weather_info.wind = ["N/A", -1];
//           else actforecast.weather_info.wind = [s[1], parseInt(s[3])];
//           break;
//         case "chance":
//           // this is also the end of the buffer which is why we'll be checking for duplicates
//           actforecast.weather_info.rain_chance = parseInt(s[3]);

//           actlocation.forecasts?.push(actforecast); // we create a new location if that is not the case
//           result.push(actlocation);
//           break;
//       }
//     }
//   })
//   return result;
// }

// export function fetchForecasts(range: number) { //The forecasts will be saved in global variable locations
//   let actforecast: Forecast;
//   let actlocation: Location;
//   const actDay = new Date().getDay();
//   let inrange: boolean;

//   const reader = readline.createInterface(fs.createReadStream(path));
//   reader.on("line", (l: string) => {
//     const s = l.split(' ');
//     if (s[0].endsWith(',')) {
//       inrange = true;
//       const d: number = parseInt(s[3].substring(0, s[3].length - 1));
//       if (Math.abs(actDay - d) <= range) {
//         const yr: number = parseInt(s[4])
//         const ndate: Date = revformat(s[2], d, yr)

//         actlocation = { name: s[0].substring(0, s[0].length - 1), state: s[1].substring(0, s[1].length - 1) }
//         actforecast.date = ndate;
//       }

//     }
//     else {
//       if (inrange) switch (s[0].toLowerCase()) {
//         case "pressure:":
//           actforecast.weather_info.pressure = parseFloat(s[1]);
//           break;
//         case "temperature:":
//           actforecast.weather_info.temp = parseFloat(s[1]);
//           break;
//         case "humidity:":
//           actforecast.weather_info.humidity = parseFloat(s[1]);
//           break;
//         case "condition:":
//           let aux: string = "";
//           for (let i = 1; i < s.length; ++i)
//             aux += s[i]; aux += " ";
//           actforecast.weather_info.condition = aux;
//           break;
//         case "wind:":
//           if (s[1] == "Unknown") actforecast.weather_info.wind = ["N/A", -1];
//           else actforecast.weather_info.wind = [s[1], parseInt(s[3])];
//           break;
//         case "chance":
//           // this is also the end of the buffer which is why we'll be checking for duplicates
//           actforecast.weather_info.rain_chance = parseInt(s[3]);

//           let match: boolean = false;
//           locations.forEach(location => {
//             if (location.name.toLowerCase() == actlocation.name.toLowerCase()) // identical match
//             {
//               match = true;
//               location.forecasts?.push(actforecast); // we simply add another forecast to the existing batch
//               return;
//             }
//           });
//           if (match) break;
//           actlocation.forecasts?.push(actforecast); // we create a new location if that is not the case
//           locations.push(actlocation);
//           break;
//       }
//     }
//   })
// }