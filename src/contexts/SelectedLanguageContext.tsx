import { createContext, useState } from "react";

const defaultVal = {
    selectedLanguage: {},
    setSelectedLanguage: (date: string) => { }
}

export const SelectedLanguageContext = createContext(defaultVal);

export function SelectedLanguageContextProvider(props: any) {
    const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

    return (
        <SelectedLanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
            {props.children}
        </SelectedLanguageContext.Provider>
    )
}