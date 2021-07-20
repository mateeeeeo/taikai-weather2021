import { useContext } from 'react';
import styled from "styled-components";
import { Text } from "./../styled_components/styledComponents";
import { Water } from "react-ionicons";
import { ThemeContext } from "../contexts/ThemeContext";

interface HumidityDisplayProps {
    humidity: number
}

const HumidityDisplayContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-self: center;
`;

const HumidityContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const HumidityText = styled(Text)`
    font-size: 20px;
    margin-bottom: 0.25rem;
`;

const HumidityIcon = styled(Water)`
    width: 32px;
    height: 32px;
    margin-right: 4px;
`;

const HumidityValue = styled(Text)`
    font-size: 32px;
    font-weight: bold;
`;

export default function HumidityDisplay(props: HumidityDisplayProps) {
    const { theme } = useContext(ThemeContext);

    return (
        <HumidityDisplayContainer>
            <HumidityText isDarkMode={theme.isDarkMode}>Humidity</HumidityText>
            <HumidityContainer>
                <HumidityIcon
                    width='32px'
                    height='32px'
                    color={theme.isDarkMode ? 'white' : '#232323'} />
                <HumidityValue isDarkMode={theme.isDarkMode}>{props.humidity}%</HumidityValue>
            </HumidityContainer>
        </HumidityDisplayContainer>
    );
}

