import { Text } from '../styled_components/styledComponents';
import styled from 'styled-components';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export enum WeatherCondition {
    Sunny, Clear, PartlyCloudy, Cloudy, Foggy,
}

interface WeatherConditionDisplayProps {
    condition: WeatherCondition
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
    let conditionIconClass: string;

    switch (props.condition) {
        case WeatherCondition.Sunny:
            conditionIconClass = 'ri-sun-fill';
            break;

        case WeatherCondition.PartlyCloudy:
            conditionIconClass = 'ri-sun-cloudy-fill';
            break;

        case WeatherCondition.Cloudy:
            conditionIconClass = 'ri-cloudy-fill';
            break;

        case WeatherCondition.Foggy:
            conditionIconClass = 'ri-foggy-fill';
            break;

        case WeatherCondition.Clear:
            conditionIconClass = 'ri-sun-foggy-fill';
            break;
    }

    const { theme } = useContext(ThemeContext);

    return (
        <WeatherConditionContainer>
            <WeatherConditionText isDarkMode={theme.isDarkMode}>Weather Condition</WeatherConditionText>
            <ConditionValueContainer>
                <ConditionIcon isDarkMode={theme.isDarkMode} className={conditionIconClass} />
                <WeatherConditionValue isDarkMode={theme.isDarkMode}>{WeatherCondition[props.condition]}</WeatherConditionValue>
            </ConditionValueContainer>
        </WeatherConditionContainer>
    );
}
