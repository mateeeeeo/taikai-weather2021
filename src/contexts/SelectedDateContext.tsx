import { createContext, useState } from "react";

const defaultVal = {
    selectedDate: new Date(),
    setSelectedDate: (date: Date) => { }
}

export const SelectedDateContext = createContext(defaultVal);

export function SelectedDateContextProvider(props: any) {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    return (
        <SelectedDateContext.Provider value={{ selectedDate, setSelectedDate }}>
            {props.children}
        </SelectedDateContext.Provider>
    )
}