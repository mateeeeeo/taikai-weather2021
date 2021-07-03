import React from 'react';
import styled from 'styled-components';
import { WeatherType } from './enums/enums';
import { Text } from './../styled_components/styledComponents';
import { Sunny } from 'react-ionicons';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { SelectedDateContext } from '../contexts/SelectedDateContext';

interface ForecastPreviewProps {
    date: Date,
    temperature: number,
    isHighFloodRisk: boolean,
    weatherType: WeatherType
}

const DateText = styled(Text)`
    font-size: 20px;
    font-weight: normal;
    margin-bottom: 4px;
    color: ${props => props.theme.isDarkMode ? 'white' : '#232323'};
`;

const TemperatureText = styled(DateText)`
    font-size: 20px;
    margin: 0;
    color: ${props => props.theme.isDarkMode ? 'white' : '#232323'};
`;

const PreviewContainer = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    padding: 8px;
`;

const SunnyIcon = styled(Sunny)`
    width: 24px;
    height: 24px;
`;

export default function ForecastPreview(props: ForecastPreviewProps) {
    const { theme } = useContext(ThemeContext);
    const { setSelectedDate } = useContext(SelectedDateContext);

    return (
        <PreviewContainer onClick={() => setSelectedDate(props.date)}>
            <DateText theme={theme} as="p">
                {props.date.getMonth() < 10 ? '0' + props.date.getMonth() : props.date.getMonth()}
                /
                {props.date.getDate() < 10 ? '0' + props.date.getDate() : props.date.getDate()}
            </DateText>
            <SunnyIcon
                width='24px'
                height='24px'
                color={theme.isDarkMode ? 'white' : '#232323'}
            />
            <TemperatureText theme={theme}>{props.temperature}°</TemperatureText>
        </PreviewContainer>
    );
}