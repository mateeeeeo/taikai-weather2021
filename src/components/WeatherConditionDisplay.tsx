import { Text } from '../styled_components/styledComponents';
import styled from 'styled-components';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { WeatherCondition } from './../enums/enums';
import { SelectedLanguageContext } from './../contexts/SelectedLanguageContext';

interface WeatherConditionDisplayProps {
    condition: WeatherCondition | undefined
}

const ConditionIcon = styled.i`
    font-size: 32px;
    color: ${({ isDarkMode }: { isDarkMode: boolean }) => isDarkMode ? 'white' : '#232323'};
    margin-right: 8px;
`;

const ConditionValueContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const WeatherConditionContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const WeatherConditionText = styled(Text)`
    font-size: 20px;    
    margin-bottom: 0.25rem;
`;

const WeatherConditionValue = styled(Text)`
    font-size: 32px;
    font-weight: bold;
`;

export default function WeatherConditionDisplay(props: WeatherConditionDisplayProps) {
    let conditionIconClass: string = '';
    let conditionName: string = '';

    const { theme } = useContext(ThemeContext);
    const { selectedLanguage } = useContext(SelectedLanguageContext);

    if (props.condition) {
        switch (+WeatherCondition[props.condition]) {
            case 0:
                conditionIconClass = 'ri-sun-fill';
                if (selectedLanguage)
                    conditionName = selectedLanguage.sunny;
                break;
            case 1:
                conditionIconClass = 'ri-sun-fill';
                if (selectedLanguage)
                    conditionName = selectedLanguage?.clear;
                break;
            case 2:
                conditionIconClass = 'ri-sun-cloudy-fill';
                if (selectedLanguage)
                    conditionName = selectedLanguage?.partlyCloudy;
                break;

            case 3:
                conditionIconClass = 'ri-cloudy-fill';
                if (selectedLanguage)
                    conditionName = selectedLanguage?.cloudy;
                break;

            case 4:
                conditionIconClass = 'ri-foggy-fill';
                if (selectedLanguage)
                    conditionName = selectedLanguage?.foggy;
                break;

            default:
                console.log('No icon');
        }
    }

    return (
        <WeatherConditionContainer>
            <WeatherConditionText isDarkMode={theme.isDarkMode}>{selectedLanguage?.weatherCondition}</WeatherConditionText>
            <ConditionValueContainer>
                <ConditionIcon isDarkMode={theme.isDarkMode} className={conditionIconClass} />
                <WeatherConditionValue isDarkMode={theme.isDarkMode}>{conditionName != '' ? conditionName : 'N/A'}</WeatherConditionValue>
            </ConditionValueContainer>
        </WeatherConditionContainer>
    );
}
