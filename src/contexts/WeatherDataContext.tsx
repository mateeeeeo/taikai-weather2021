import { createContext, useState } from "react";
import { WeatherInfo } from './../interfaces/Interfaces';

const defaultVal = {
    weatherData: {},
    setWeatherData: (date: WeatherInfo) => { }
}

export const WeatherDataContext = createContext(defaultVal);

export function WeatherDataContextProvider(props: any) {
    const [weatherData, setWeatherData] = useState<WeatherInfo>({});

    return (
        <WeatherDataContext.Provider value={{ weatherData, setWeatherData }}>
            {props.children}
        </WeatherDataContext.Provider>
    )
}