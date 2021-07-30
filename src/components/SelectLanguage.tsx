import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import Dropdown from 'react-dropdown';
import { fetchLanguages } from '../api/FetchLanguages';
import { ThemeContext } from '../contexts/ThemeContext';
import { Language } from '../interfaces/Interfaces';
import { SelectedLanguageContext } from './../contexts/SelectedLanguageContext';
import './../styles/dropdown-dark.css';
import './../styles/dropdown-light.css';
import './../styles/dropdown.css';
import './../styles/dropdown-sm-text.css';

export default function SelectLanguage() {
    const { selectedLanguage, setSelectedLanguage } = useContext(SelectedLanguageContext);
    const { theme } = useContext(ThemeContext);

    const [languages, setLanguages] = useState<Language[]>([]);

    useEffect(() => {
        async function fetch() {
            try {
                const languages = await fetchLanguages();
                setLanguages(languages);
                setSelectedLanguage(languages[0]);
            } catch (err) {
                console.log(err)
            }
        }

        fetch();
    }, []);

    return (
        <Dropdown
            value={selectedLanguage?.name.toUpperCase()}
            onChange={option => {
                const lang = languages.find(lang => option.label?.toString().toLowerCase() === lang.name.toLowerCase());
                setSelectedLanguage(lang);
            }}
            options={languages.map(language => language.name.toUpperCase())}
            controlClassName={`dropdown-control sm ${theme.isDarkMode ? 'dark' : 'light'}`}
            arrowClassName='dropdown-arrow'
            menuClassName={`dropdown-menu sm ${theme.isDarkMode ? 'dark' : 'light'}`}
            className='dropdown-root' />
    );
}