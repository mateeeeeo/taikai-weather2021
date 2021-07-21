import styled from "styled-components";
import { Text } from "./../styled_components/styledComponents";
import { CompassSharp } from "react-ionicons";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export enum WindDirection {
    'N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'
}

interface WindDisplayProps {
    speed: number,
    direction: WindDirection,
}

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

const WindIcon = styled.i<{ isDarkMode: boolean }>`
    font-size: 32px;
    color: ${({ isDarkMode }: { isDarkMode: boolean }) => isDarkMode ? 'white' : '#232323'};
`;

const ArrowIcon = styled(WindIcon)`
    font-size: 24px;
    padding: 0 8px;
    color: ${({ isDarkMode }: { isDarkMode: boolean }) => isDarkMode ? 'white' : '#232323'};
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


export default function WindDisplay(props: WindDisplayProps) {
    const { theme } = useContext(ThemeContext);

    return (
        <WindDisplayContainer>
            <WindText isDarkMode={theme.isDarkMode}>Wind</WindText>
            <WindValueContainer>
                <WindIcon isDarkMode={theme.isDarkMode} className="ri-windy-line" />
                <WindValue isDarkMode={theme.isDarkMode}>
                    <b>{props.speed}m/s</b>
                    <ArrowIcon isDarkMode={theme.isDarkMode} className="ri-arrow-right-line" />
                </WindValue>
                <CompassIcon
                    width="32px"
                    height="32px"
                    color={theme.isDarkMode ? 'white' : '#232323'} />
                <WindValue isDarkMode={theme.isDarkMode}><b>{WindDirection[props.direction]}</b></WindValue>
            </WindValueContainer>
        </WindDisplayContainer>
    );
}