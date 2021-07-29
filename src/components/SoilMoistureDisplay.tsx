import { Text } from '../styled_components/styledComponents';
import styled from 'styled-components';
import { useContext, useEffect } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { SelectedDateContext } from '../contexts/SelectedDateContext';
import { useState } from 'react';
import { fetchSoilMoisture } from '../api/SoilMoisture';
import { SelectedLocationContext } from '../contexts/SelectedLocationContext';

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

export default function SoilMoistureDisplay(props: SoilMoistureDisplayProps) {
    const { theme } = useContext(ThemeContext);
    const { selectedDate } = useContext(SelectedDateContext);
    const { selectedLocation } = useContext(SelectedLocationContext);

    async function fetch() {
        if (selectedLocation) {
            try {
                const data = await fetchSoilMoisture(selectedLocation.lat_long, selectedDate);
                setMoisture(data);

            } catch (err) {
                console.log(err);
            }
        }
    }

    useEffect(() => {
        fetch();
    }, [selectedDate, selectedLocation]);

    const [moisture, setMoisture] = useState<number | undefined>();

    return (
        <SoilMoistureContainer>
            <SoilMoistureText isDarkMode={theme.isDarkMode}>Soil moisture</SoilMoistureText>
            <SoilMoistureValueContainer>
                <SoilMoistureIcon isDarkMode={theme.isDarkMode} className="ri-flood-fill" />
                <SoilMoistureValue isDarkMode={theme.isDarkMode}>{moisture ?? 'N/A '}m</SoilMoistureValue>
            </SoilMoistureValueContainer>
        </SoilMoistureContainer>
    );
}