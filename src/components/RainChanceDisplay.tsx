import { RainySharp } from 'react-ionicons';
import { Text } from '../styled_components/styledComponents';
import styled from 'styled-components';

interface RainChanceDisplayProps {
    chance: number
}

export default function RainChanceDisplay(props: RainChanceDisplayProps) {
    const RainDisplayContainer = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    `;

    const RainText = styled(Text)`
        font-size: 20px;
        margin-bottom: 0.25rem;
    `;

    const RainIcon = styled(RainySharp)`
        width: 32px;
        height: 32px;
        margin-right: 8px;
    `;

    const RainValueContainer = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    const RainValue = styled(Text)`
        font-size: 32px;
        font-weight: bold;
    `;

    return (
        <RainDisplayContainer>
            <RainText>Chance of rain</RainText>
            <RainValueContainer>
                <RainIcon width="32px" height="32px" color="white" />
                <RainValue>{props.chance}%</RainValue>
            </RainValueContainer>
        </RainDisplayContainer>
    );
}