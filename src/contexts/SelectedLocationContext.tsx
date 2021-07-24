import { createContext, useState } from "react";
import { locations } from './../components/WeatherForecast';

const defaultVal = {
    selectedLocation: '',
    setSelectedLocation: (location: string) => { }
}

export const SelectedLocationContext = createContext(defaultVal);

export function SelectedLocationContextProvider(props: any) {
    const [selectedLocation, setSelectedLocation] = useState<string>(locations[0]);

    return (
        <SelectedLocationContext.Provider value={{ selectedLocation, setSelectedLocation }}>
            {props.children}
        </SelectedLocationContext.Provider>
    )
}