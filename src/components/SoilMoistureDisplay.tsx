import { Text } from '../styled_components/styledComponents';
import styled from 'styled-components';
import { useContext, useEffect } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { SelectedDateContext } from '../contexts/SelectedDateContext';
import { useState } from 'react';
import { fetchSoilMoisture } from '../api/AdditionalData';
import { SelectedLocationContext } from '../contexts/SelectedLocationContext';
import { SelectedLanguageContext } from './../contexts/SelectedLanguageContext';
import { Alert } from 'react-ionicons';

interface SoilMoistureDisplayProps {
    // moisture: number | undefined
}

const SoilMoistureContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const SoilMoistureText = styled(Text)`
    font-size: 20px;
    margin-bottom: 0.25rem;
`;

const SoilMoistureValueContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SoilMoistureValue = styled(Text)`
    font-size: 32px;
    font-weight: bold;
`;

const SoilMoistureIcon = styled.i`
    font-size: 32px;
    color: ${({ isDarkMode }: { isDarkMode: boolean }) => isDarkMode ? 'white' : '#232323'};
    margin-right: 8px;
`;

const AlertIcon = styled(Alert)`
    width: 48px;
    height: 48px;
`;

const FloodRiskWarning = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FloodRiskText = styled(Text)`
    color: #F16060;
`;

export default function SoilMoistureDisplay(props: SoilMoistureDisplayProps) {
    const { theme } = useContext(ThemeContext);
    const { selectedDate } = useContext(SelectedDateContext);
    const { selectedLocation } = useContext(SelectedLocationContext);
    const { selectedLanguage } = useContext(SelectedLanguageContext);

    useEffect(() => {
        async function fetchMoisture() {
            if (selectedLocation) {
                try {
                    const moisture = await fetchSoilMoisture(selectedLocation.lat_long, selectedDate);
                    // const response = await fetch(`/soil_moisture?lat=${selectedLocation.lat_long.lat}&long=${selectedLocation.lat_long.long}&d=${selectedDate.getDate()}&m=${selectedDate.getMonth()}&y=${selectedDate.getFullYear()}`);
                    // const response = await fetch(`/soil_moisture/grid-history/era5_volumetric_soil_water_layer_1-hourly/${selectedLocation.lat_long.lat}_${selectedLocation.lat_long.long}?also_return_metadata=false&use_imperial_units=true&also_return_snapped_coordinates=true&convert_to_local_time=true`);
                    // const data = await response.json();
                    setMoisture(moisture);
    
                } catch (err) {
                    console.log(err);
                }
            }
        }

        fetchMoisture();
    }, [selectedDate, selectedLocation]);

    const [moisture, setMoisture] = useState<number | undefined>();

    return (
        <SoilMoistureContainer>
            <SoilMoistureText isDarkMode={theme.isDarkMode}>{selectedLanguage?.soilMoisture}</SoilMoistureText>
            <SoilMoistureValueContainer>
                {/* {(moisture && moisture >= 0.01) && */}
                {/* // } */}
                <SoilMoistureIcon isDarkMode={theme.isDarkMode} className="ri-flood-fill" />
                <SoilMoistureValue isDarkMode={theme.isDarkMode}>{moisture?.toFixed(3) ?? 'N/A '}m</SoilMoistureValue>
            </SoilMoistureValueContainer>
            <FloodRiskWarning>
                <AlertIcon
                    width='48px'
                    height='48px'
                    color='#F16060' />
                <FloodRiskText as='h1' isDarkMode>{selectedLanguage?.highFloodRisk}</FloodRiskText>
            </FloodRiskWarning>
        </SoilMoistureContainer>
    );
}