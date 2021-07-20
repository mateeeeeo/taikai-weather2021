import { Text } from '../styled_components/styledComponents';
import styled from 'styled-components';

interface SoilMoistureDisplayProps {
    moisture: number
}

export default function SoilMoistureDisplay(props: SoilMoistureDisplayProps) {
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
        color: white;
        margin-right: 8px;
    `;

    return (
        <SoilMoistureContainer>
            <SoilMoistureText>Soil moisture</SoilMoistureText>
            <SoilMoistureValueContainer>
                <SoilMoistureIcon className="ri-flood-fill" />
                <SoilMoistureValue>{props.moisture}m</SoilMoistureValue>
            </SoilMoistureValueContainer>
        </SoilMoistureContainer>
    );
}