import { Text } from '../styled_components/styledComponents';
import styled from 'styled-components';

export enum WeatherCondition {
    Sunny, Clear, PartlyCloudy, Cloudy, Foggy,
}

interface WeatherConditionDisplayProps {
    condition: WeatherCondition
}

export default function WeatherConditionDisplay(props: WeatherConditionDisplayProps) {
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

    let conditionIconClass: string;
    const ConditionIcon = styled.i`
        font-size: 32px;
        color: white;
        margin-right: 8px;
    `;

    const ConditionValueContainer = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
    `;

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

    return (
        <WeatherConditionContainer>
            <WeatherConditionText>Weather Condition</WeatherConditionText>
            <ConditionValueContainer>
                <ConditionIcon className={conditionIconClass} />
                <WeatherConditionValue>{WeatherCondition[props.condition]}</WeatherConditionValue>
            </ConditionValueContainer>
        </WeatherConditionContainer>
    );
}
