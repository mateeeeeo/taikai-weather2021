import { createContext, useState } from "react";
import { WeatherInfo } from './../interfaces/Interfaces';

const defaultVal = {
    weatherData: {} as WeatherInfo | undefined,
    // {
    // d: undefined,
    // m: undefined,
    // yr: undefined,
    // city: undefined,
    // country: undefined,
    // pressure: undefined,
    // temp: undefined,
    // humidity: undefined,
    // cond: undefined,
    // wind_direction: undefined,
    // wind_vel: undefined,
    // rain_chance: undefined
    // },
    setWeatherData: (date: WeatherInfo | undefined) => { }
}

export const WeatherDataContext = createContext(defaultVal);

export function WeatherDataContextProvider(props: any) {
    const [weatherData, setWeatherData] = useState<WeatherInfo | undefined>({} as WeatherInfo | undefined);

    return (
        <WeatherDataContext.Provider value={{ weatherData, setWeatherData }}>
            {props.children}
        </WeatherDataContext.Provider>
    )
}