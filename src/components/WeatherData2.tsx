import styled from 'styled-components';
import { Text } from '../styled_components/styledComponents';
import PressureDisplay from './PressureDisplay';
import HumidityDisplay from './HumidityDisplay';
import WindDisplay from './WindDisplay';
import RainChanceDisplay from './RainChanceDisplay';
import WeatherConditionDisplay from './WeatherConditionDisplay';
import SoilMoistureDisplay from './SoilMoistureDisplay';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { SelectedLocationContext } from '../contexts/SelectedLocationContext';
import { WeatherDataContext } from '../contexts/WeatherDataContext';

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

const NoDataContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
`;

const NoDataText = styled(Text) <{ isDarkMode: boolean }>`
    color: ${({ isDarkMode }: { isDarkMode: boolean }) => isDarkMode ? 'white' : '#232323'};
    text-align: center;
    font-size: 20px;
`;

const NoDataHeader = styled(NoDataText)`
    font-weight: bold;
    font-size: 24px;
`;

export default function WeatherData2() {
    const { theme } = useContext(ThemeContext);
    const { selectedLocation } = useContext(SelectedLocationContext);
    const { weatherData } = useContext(WeatherDataContext);
    
    return (
        <>
            {!weatherData &&
                <NoDataContainer>
                    <NoDataHeader isDarkMode={theme.isDarkMode}>No data available</NoDataHeader>
                    <NoDataText isDarkMode={theme.isDarkMode}>Please try another date or location or try again later.</NoDataText>
                </NoDataContainer>}
                
            <LocationText as="h1" isDarkMode={theme.isDarkMode}>{selectedLocation?.name}</LocationText>

            <Grid>
                <PressureDisplay pressure={weatherData?.pressure} />
                <HumidityDisplay humidity={weatherData?.humidity} />
                <RainChanceDisplay chance={weatherData?.rain_chance} />
                <WindDisplay
                    speed={weatherData?.wind_vel}
                    direction={weatherData?.wind_direction} />
                <WeatherConditionDisplay condition={weatherData?.condition} />
                <SoilMoistureDisplay />
            </Grid>
        </>
    );
}