import { createContext, useState, useEffect } from 'react';

type ThemeProps = {
    isDarkMode: boolean;
}

export const ThemeContext = createContext({});

export function ThemeContextProvider(props: any) {
    const [themeProps, setThemeProps] = useState<ThemeProps>({ isDarkMode: false });

    useEffect(() => {
        if(!themeProps.isDarkMode)
            document.documentElement.style.backgroundColor = '#EDF0FF';
    }, []);

    return (
        <ThemeContext.Provider value={[themeProps, setThemeProps]}>
            {props.children}
        </ThemeContext.Provider>
    );
}