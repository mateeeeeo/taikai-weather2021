import styled from 'styled-components';
import { ThemeContext } from '../contexts/ThemeContext';
import { SelectedLocationContext } from '../contexts/SelectedLocationContext';
import { Text } from './../styled_components/styledComponents';
import { useContext, useState } from 'react';
import { SelectedLanguageContext } from '../contexts/SelectedLanguageContext';
import { SelectedDateContext } from '../contexts/SelectedDateContext';
import { useEffect } from 'react';
import { fetchAirQuality } from '../api/AdditionalData';
import { Sync } from 'react-ionicons';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ValueContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const AirQualityText = styled(Text)`
    font-size: 20px;
    margin-bottom: 0.5rem;
`;

const ValueText = styled(Text)`
    font-size: 32px;
    font-weight: bold;
    color: ${(props: { color: string }) => props.color};
`;

const AirQualityIcon = styled.i`
    font-size: 32px;
    color: ${(props: { isDarkMode: boolean }) => props.isDarkMode ? 'white' : '#232323'};
    margin-right: 0.5rem;
`;

const AirQualityBar = styled.div`
    height: 0.75rem;
    width: 200%;
    border-radius: 999px;
    background: linear-gradient(90deg, #5EFC03, #FCBA03, #fc7703, #db1f1f, #bb21de, #800000);
    position: relative;
    margin-bottom: 0.5rem;
`;

const Indicator = styled.div`
    width: 1.25rem;
    height: 1.25rem;
    background-color: white;
    border-radius: 50%;
    border: 3px solid #232323;
    position: absolute;
    top: calc(50% - 0.625rem);
    left: calc(${(props: { percentage: number }) => Math.max(props.percentage, 0)}% - 0.625rem);
`;

const SyncIcon = styled(Sync)`
    width: 32px;
    height: 32px;
`;

export default function AirQualityDisplay() {
    const { theme } = useContext(ThemeContext);
    const { selectedLocation } = useContext(SelectedLocationContext);
    const { selectedLanguage } = useContext(SelectedLanguageContext);
    const { selectedDate } = useContext(SelectedDateContext);

    const [fetching, setFetching] = useState(true);
    const [airQuality, setAirQuality] = useState<number>();
    const [percentage, setPercentage] = useState(0);
    const [concern, setConcern] = useState('N/A');
    const [color, setColor] = useState('white');

    useEffect(() => {
        async function fetchAQ() {
            if (selectedLocation && selectedDate) {
                const aq = await fetchAirQuality(selectedLocation.name, selectedLocation.country, selectedDate);
                if (aq)
                    setAirQuality(aq[1]);
                setFetching(false);
            }
        }
        setAirQuality(undefined);
        setFetching(true);
        fetchAQ();
    }, [selectedLocation, selectedDate]);

    useEffect(() => {
        if (airQuality) {
            setPercentage(airQuality / 300 * 100);

            if (selectedLanguage) {
                if (airQuality <= 50) {
                    setConcern(selectedLanguage.good);
                    setColor('#5EFC03');
                } else if (airQuality <= 100) {
                    setConcern(selectedLanguage.moderate);
                    setColor('#fc7703');
                } else if (airQuality <= 150) {
                    setConcern(selectedLanguage.unhealthySensitive);
                    setColor('#FCBA03');
                } else if (airQuality <= 200) {
                    setConcern(selectedLanguage.unhealthy);
                    setColor('#db1f1f');
                } else if (airQuality <= 250) {
                    setConcern(selectedLanguage.veryUnhealthy);
                    setColor('#bb21de');
                } else if (airQuality <= 300) {
                    setConcern(selectedLanguage.hazardous);
                    setColor('#800000');
                }
            }
        }

    }, [airQuality]);

    return (
        <Container>
            <AirQualityText isDarkMode={theme.isDarkMode}>{selectedLanguage?.airQuality}</AirQualityText>
            <AirQualityBar>
                <Indicator percentage={percentage} />
            </AirQualityBar>
            <ValueContainer>
                {fetching && <SyncIcon
                    color={theme.isDarkMode ? 'white' : '#232323'}
                    width='32px'
                    height='32px'
                    rotate />}
                <AirQualityIcon isDarkMode={theme.isDarkMode} className="ri-mist-fill" />
                <ValueText isDarkMode={theme.isDarkMode} color={color}>{concern}</ValueText>
            </ValueContainer>
        </Container>
    );
}