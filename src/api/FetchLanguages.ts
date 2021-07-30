import { Language } from './../interfaces/Interfaces';

export async function fetchLanguages(): Promise<Language[]> {
    return new Promise(async (res, rej) => {
        const languages: Language[] = [];

        try {
            const response = await fetch('languages.json', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            for (let languageName in data) {
                const langObj = data[languageName];
                languages.push({
                    name: languageName,
                    ...langObj
                });
            }

            res(languages);
        } catch (error) {
            rej(error);
        }
    });

}