import { Severity } from '../enums/enums';
import styled from 'styled-components';
import { Text } from '../styled_components/styledComponents';

import PressureDisplay from './PressureDisplay';
import HumidityDisplay from './HumidityDisplay';
import WindDisplay, { WindDirection } from './WindDisplay';
import RainChanceDisplay from './RainChanceDisplay';
import WeatherConditionDisplay, { WeatherCondition } from './WeatherConditionDisplay';
import SoilMoistureDisplay from './SoilMoistureDisplay';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

function getSeverityColor(severity: Severity): string {
    switch (severity) {
        case Severity.great:
            return '#33cd18';
        case Severity.good:
            return '#72CD18';
        case Severity.ok:
            return '#d6cc11';
        case Severity.severe:
            return '#e3815b';
        case Severity.verySevere:
            return '#F16060';
    }
}

const Grid = styled.div`
    margin: 1rem 0 5rem;
    display: grid;
    column-gap: 2.5rem;
    row-gap: 4rem;
    grid-template-columns: 1fr;
    align-items: center;
    justify-items: center;

    @media(min-width: 640px) {
        grid-template-columns: 1fr 1fr;
    }

    @media(min-width: 1024px) {
        grid-template-columns: 1fr 1fr 1fr;
    }

    @media(min-width: 1200px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`;

const LocationText = styled(Text) <{ isDarkMode: boolean }>`
    text-decoration: underline;
    margin: 0.5rem 1rem;
    color: ${(props: { isDarkMode: boolean }) => props.isDarkMode ? 'white' : '#232323'}
`;


export default function WeatherData2() {
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <LocationText as="h1" isDarkMode={theme.isDarkMode}>Accra, GH</LocationText>
            <Grid>
                <PressureDisplay pressure={1000} />
                <HumidityDisplay humidity={77} />
                <RainChanceDisplay chance={20} />
                <WindDisplay
                    speed={15}
                    direction={WindDirection.SW} />
                <WeatherConditionDisplay condition={WeatherCondition.Foggy} />
                <SoilMoistureDisplay moisture={0.033} />
            </Grid>
        </>
    );
}