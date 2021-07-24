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
            document.documentElement.style.backgroundColor = '#dddfed';
        else
            document.documentElement.style.backgroundColor = '#2C2D35';
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
}