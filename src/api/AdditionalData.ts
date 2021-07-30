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


export async function fetchAirQuality(city: string, country: string, d: Date): Promise<[number, number]> {
  let date1 = d, date2 = d;
  date1.setDate(date1.getDate() - 4); date2.setDate(date1.getDate() + 4);
  const datestr1 = date1.toISOString().replaceAll(':', "%3A").replaceAll('+', "%2B");
  const datestr2 = date2.toISOString().replaceAll(':', "%3A").replaceAll('+', "%2B");

  return new Promise(async (res, rej) => {
    // Note: The result will be returned in the form of "Tuple<day_value,weekly_avg>"
    let result: [number,number] | undefined = undefined; 
    const response = await fetch(`https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/measurements?date_from=${datestr1}&date_to=${datestr2}&limit=10&page=1&offset=0&sort=desc&radius=1000&country_id=${country}&city=${city}&order_by=datetime`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(async function (response) {
        if (!response.ok) throw new Error("There isn't any data available for this interval.")
        else {
          let sum: number = 0; let values: number = 0;
          result = [0,0];
          const obj = await response.json();
          for (let i = 0; i < obj.results.length; ++i) {
            const c = obj.results[i]; // aq info for given date
            if (c.date.utc == d.toISOString()) result[0] = c.value;
            sum += c.value; values++;
          }
          result[1] = sum / values;
          res(result);
        }
      }).catch(function (err) {
        rej(err);
      }); 
  });
}

export async function fetchSoilMoisture(latLong: LatLong, date: Date): Promise<number> {
    const res = await fetch(`/apiv2/grid-history/era5_volumetric_soil_water_layer_1-hourly/${latLong.lat}_${latLong.long}?also_return_metadata=false&use_imperial_units=true&also_return_snapped_coordinates=true&convert_to_local_time=true`);
    const resJson: APISoilMoistureResponse = await res.json();
    const data: any = resJson.data;

    return new Promise<number>((res, rej) => {
        const dClimateDateStr = toDClimateFormat(date);

        if (data)
            res(data[dClimateDateStr]);
        else
            rej("No data found.");
    });
}