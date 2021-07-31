import { Forecast, Location, WeatherInfo } from './src/interfaces/Interfaces';
import * as fs from 'fs';
export let locations: Array<Location>;

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

export async function fetchForecastsForLocationJSON1(lname: string, date: Date): Promise<Forecast | undefined> {
  // console.log(date);
  let fpath: string = "forecasts/";

  if (date.getDate() <= 10)
    fpath += "0"

  fpath += date.getDate().toString();

  if (date.getMonth() <= 10)
    fpath += "0"

  fpath += ((date.getMonth() + 1).toString() + date.getFullYear().toString() + ".json");

  return new Promise(async (res, rej) => {
    let result: Forecast | undefined = undefined;
    // we format our date so it fits our json requirements
    fetch(fpath,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(async function (response) {
        if (response.ok) {
          const obj = await response.json();
          for (let i = 0; i < obj.cities.length; ++i) {
            const c = obj.cities[i]; // forecast

            if (lname.toLowerCase() === c.name.toLowerCase()) { // checking if names match
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
      })
      .catch(function (err) {
        rej(err);
      });
  });
}

export async function fetchForecastsForLocationJSON2(lname: string, date: Date): Promise<Forecast | undefined> {
  let fpath: string = "forecasts/";

  if (date.getDate() <= 10)
    fpath += "0"

  fpath += date.getDate().toString();

  if (date.getMonth() <= 10)
    fpath += "0"

  fpath += ((date.getMonth() + 1).toString() + date.getFullYear().toString() + ".json");

  return new Promise(async (res, rej) => {
    let result: Forecast | undefined = undefined;

    try {
      const data = await fs.promises.readFile(fpath, { encoding: 'utf-8' });
      if (data) {
        const obj = JSON.parse(data);

        for (let i = 0; i < obj.cities.length; ++i) {
          const c = obj.cities[i]; // forecast

          if (lname.toLowerCase() === c.name.toLowerCase()) { // checking if names match
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
      }
      res(result);
    } catch (err) {
      rej(err);
    }
  });
}