import { APISoilMoistureResponse, LatLong, Location, SoilMoistureResponse } from "../interfaces/Interfaces";
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

export async function fetchSoilMoisture(latLong: LatLong, date: Date): Promise<number> {
    const res = await fetch(`/apiv2/grid-history/era5_volumetric_soil_water_layer_1-hourly/${latLong.lat}_${latLong.long}?also_return_metadata=false&use_imperial_units=true&also_return_snapped_coordinates=true&convert_to_local_time=true`);
    const resJson: APISoilMoistureResponse = await res.json();
    const data: any = resJson.data;

    return new Promise<number>((res, rej) => {
        const dClimateDateStr = toDClimateFormat(date);

        console.log(latLong.lat + " " + latLong.long);
        console.log(Object.values(data)[Object.values(data).length - 1]);
        console.log(data[dClimateDateStr]);

        if (data)
            res(data[dClimateDateStr]);
        else
            rej("No data found.");
    });
}
