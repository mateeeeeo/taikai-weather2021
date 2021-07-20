import styled from "styled-components";
import { Text } from "./../styled_components/styledComponents";
import { CompassSharp } from "react-ionicons";

export enum WindDirection {
    'N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'
}

interface WindDisplayProps {
    speed: number,
    direction: WindDirection,
}

export default function WindDisplay(props: WindDisplayProps) {
    const WindDisplayContainer = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    `;

    const WindText = styled(Text)`
        font-size: 20px;
        margin-bottom: 0.25rem;
    `;

    const WindIcon = styled.i`
        font-size: 32px;
        color: white;
    `;

    const ArrowIcon = styled(WindIcon)`
        font-size: 24px;
        padding: 0 8px;
    `;

    const CompassIcon = styled(CompassSharp)`
        width: 32px;
        height: 32px;
        margin-right: 4px;
    `;

    const WindValueContainer = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    const WindValue = styled(Text)`
        font-size: 32px;
    `;

    return (
        <WindDisplayContainer>
            <WindText>Wind</WindText>
            <WindValueContainer>
                <WindIcon className="ri-windy-line" />
                <WindValue>
                    <b>{props.speed}m/s</b>
                    <ArrowIcon className="ri-arrow-right-line" />
                </WindValue>
                <CompassIcon width="32px" height="32px" color="white" />
                <WindValue><b>{WindDirection[props.direction]}</b></WindValue>
            </WindValueContainer>
        </WindDisplayContainer>
    );
}