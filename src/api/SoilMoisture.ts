import { APISoilMoistureResponse, LatLong, SoilMoistureResponse } from "../interfaces/Interfaces";
import { toDClimateFormat } from "../helpers/DateFormat";

export async function get(latLong: LatLong, date: Date): Promise<any> {
    const res = await fetch(`/apiv2/grid-history/era5_volumetric_soil_water_layer_1-hourly/${latLong.lat}_${latLong.long}?also_return_metadata=false&use_imperial_units=false&also_return_snapped_coordinates=true&convert_to_local_time=true`);
    const resJson : APISoilMoistureResponse = await res.json();
    const data : any = resJson.data;

    if (date) { // date was specified -> corresponding value will be returned
        return new Promise<SoilMoistureResponse>((res, rej) => {
            const dClimateDateStr = toDClimateFormat(date);

            if(data)
                res({ date: dClimateDateStr, moisture: data[dClimateDateStr] });
            else
                rej("No data found.");
        });
    } else { // date wasn't specified -> last recorded value will be returned
        return new Promise<SoilMoistureResponse>((res, rej) => {
            if (data)
                res({ date: Object.keys(data)[Object.keys(data).length - 1], moisture: Object.values(data)[Object.values(data).length - 1] as number}); // returns latest value object);
            else
                rej("No data found.");
        });
    }
}