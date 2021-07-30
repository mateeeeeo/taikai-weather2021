import { createContext, useState } from "react";
import { Language } from './../interfaces/Interfaces';

const defaultVal = {
    selectedLanguage: {} as Language | undefined,
    setSelectedLanguage: (date: Language | undefined) => { }
}

export const SelectedLanguageContext = createContext(defaultVal);

export function SelectedLanguageContextProvider(props: any) {
    const [selectedLanguage, setSelectedLanguage] = useState<Language | undefined>(undefined);

    return (
        <SelectedLanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
            {props.children}
        </SelectedLanguageContext.Provider>
    )
}