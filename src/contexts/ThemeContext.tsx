import { Dispatch, SetStateAction } from 'react';
import { useContext } from 'react';
import { createContext, useState, useEffect } from 'react';
import { Theme } from '../interfaces/Interfaces';

const defaultTheme = {
    theme: { isDarkMode: true },
    setTheme: (theme: Theme) => { }
}

export const ThemeContext = createContext(defaultTheme);

export function ThemeContextProvider(props: any) {

    const [theme, setTheme] = useState<Theme>(defaultTheme.theme);

    useEffect(() => {
        if (!theme.isDarkMode)
            document.documentElement.style.backgroundColor = '#EDF0FF';
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
}