import { APISoilMoistureResponse, LatLong } from "../interfaces/Interfaces";
import { toDClimateFormat } from "../helpers/DateFormat";

export let soilMoistureValues: Record<string, Record<string, number>> = {};

// fetches soil moisture values from dClimate's api, and stores values no older than a month before today's date, to conserve memory
// export async function fetchSoilMoistureValues() {
//     const locations: Location[] = await fetchLocations();
//     const values: Record<string, number>[] = [];

//     for (let location of locations) {
//         const res = await fetch(`/apiv2/grid-history/era5_volumetric_soil_water_layer_1-hourly/${location.lat_long.lat}_${location.lat_long.long}?also_return_metadata=false&use_imperial_units=true&also_return_snapped_coordinates=true&convert_to_local_time=true`);
//         const data: Record<string, number> = (await res.json()).data;

//         const earliestDate = new Date();
//         earliestDate.setMonth(earliestDate.getMonth() - 1);

//         console.log(Object.entries(data).length);

//         const earliestIndex = Object.keys(data).findIndex(date => date === toDClimateFormat(earliestDate));
//         const constrainedDates = Object.entries(data).slice(earliestIndex);

//         values.push(Object.fromEntries(constrainedDates));
//         console.log(Object.fromEntries(constrainedDates));
//     }
//     console.log(values);
// }

// async function fetchLocations(): Promise<Location[]> {
//     return new Promise(async res => {
//         const response = await fetch('locations.json');
//         const data = await response.json();

//         const locations: Location[] = [];

//         for (const [key, value] of Object.entries(data)) {
//             locations.push({ name: key, lat_long: { lat: (value as any).lat, long: (value as any).long } });
//         }

//         console.log(locations);
//         res(locations);
//     });
// }


export async function fetchAirQuality(city: string, country: string, d: Date): Promise<[number, number] | undefined> {
  const date = new Date(d.getTime());
  city = city.charAt(0).toUpperCase() + city.substring(1);
  // console.log(city);
  // let date1 = new Date(d.getTime());
  // let date2 = new Date(d.getTime());
  // date1.setDate(date1.getDate() - 4); date2.setDate(date2.getDate() + 4);
  // let datestr1 = date1.toISOString()
  // .replaceAll(':', "%3A")
  // .replaceAll('+', "%2B")
  // .replace("Z", "")
  // datestr1 = datestr1.substring(0, datestr1.indexOf("."));
  // datestr1 += "%2B00%3A00";

  // let datestr2 = date2.toISOString()
  // .replaceAll(':', "%3A")
  // .replaceAll('+', "%2B")
  // .replace("Z", "")
  // datestr2 = datestr2.substring(0, datestr2.indexOf("."));
  // datestr2 += "%2B00%3A00";

  // console.log(datestr1);
  // console.log(datestr2);

  const dateStr1 = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}T${date.getHours()}%3A${date.getMinutes()}%3A${date.getMilliseconds()}%2B00%3A00`;
  date.setDate(date.getDate()+ 1);
  const dateStr2 = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}T${date.getHours()}%3A${date.getMinutes()}%3A${date.getMilliseconds()}%2B00%3A00`;
  console.log(dateStr1);
  console.log(dateStr2);

  return new Promise(async (res, rej) => {
    // Note: The result will be returned in the form of "Tuple<day_value,weekly_avg>"
    let result: [number, number] | undefined = undefined;
    const response = await fetch(`/v2/measurements?date_from=${dateStr1}&date_to=${dateStr2}&limit=10&page=1&offset=0&sort=desc&radius=1000&city=${city}&order_by=datetime`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(async function (response) {
        if (response.ok) {
          let sum: number = 0; let values: number = 0;
          result = [0, 0];
          const obj = await response.json();
          console.log(obj);
          for (let i = 0; i < obj.results.length; ++i) {
            const c = obj.results[i]; // aq info for given date
            if (c.date.utc == d.toISOString()) result[0] = c.value;
            sum += c.value; values++;
          }
          result[1] = sum / values;
        } else {
          rej("Response failed");
        }
        res(result);
      }).catch(function (err) {
        rej(err);
      });
  });
}

export async function fetchSoilMoisture(latLong: LatLong, date: Date): Promise<number> {
  console.log('soil moisture');

  return new Promise<number>(async (res, rej) => {
    try {
      console.log('fetching')
      const response = await fetch(`/apiv2/grid-history/era5_volumetric_soil_water_layer_1-hourly/${latLong.lat}_${latLong.long}?also_return_metadata=false&use_imperial_units=true&also_return_snapped_coordinates=true&convert_to_local_time=true`);
      console.log('fetched');
      const resJson: APISoilMoistureResponse = await response.json();
      const data: any = resJson.data;
      const dClimateDateStr = toDClimateFormat(date);
      console.log(data[dClimateDateStr]);
      res(parseFloat(data[dClimateDateStr]));
    } catch (err) {
      console.log(err);
      rej(err);
    }
  });
}