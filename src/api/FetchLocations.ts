import { response } from 'express';
import { Location } from './../interfaces/Interfaces';

const path = 'locations.json';

export async function fetchLocations(): Promise<Location[]> {
    return new Promise(async (res, rej) => {
        try {
            const locations: Location[] = [];
            const response = await fetch(path, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            const responseData = await response.json();
            console.log(responseData);

            // iterating through all locations inside the json file
            for (let location in responseData) {
                locations.push({ name: location, lat_long: { lat: parseInt(responseData[location].lat), long: parseInt(responseData[location].long) } });
            }

            console.log(locations);
            res(locations);
        } catch (err) {
            rej(err);
        }
    });
}