import { createContext, useState } from "react";
import { Location } from "../interfaces/Interfaces";
// import { locations } from './../components/WeatherForecast';

const defaultVal = {
    selectedLocation: {} as Location | undefined,
    setSelectedLocation: (location: Location | undefined) => { }
}

export const SelectedLocationContext = createContext(defaultVal);

export function SelectedLocationContextProvider(props: any) {
    const [selectedLocation, setSelectedLocation] = useState<Location | undefined>(undefined);

    return (
        <SelectedLocationContext.Provider value={{ selectedLocation, setSelectedLocation }}>
            {props.children}
        </SelectedLocationContext.Provider>
    )
}