import React from 'react';
import styled from 'styled-components';
import { WeatherType } from './enums/enums';
import { Text } from './../styled_components/styledComponents';
import { Sunny } from 'react-ionicons';

interface ForecastPreviewProps {
    time: number,
    temperature: number,
    isHighFloodRisk: boolean,
    weatherType: WeatherType
}

const TimeText = styled(Text)`
    font-size: 20px;
    font-weight: normal;
    margin-bottom: 4px;
`;

const TemperatureText = styled(TimeText)`
    font-size: 20px;
    margin: 0;
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
    return (
        <PreviewContainer>
            <TimeText as="p">{props.time < 10 ? '0' : ''}{props.time}:00</TimeText>
            <SunnyIcon
                width='24px'
                height='24px'
                color='white'
            />
            <TemperatureText>{props.temperature}°</TemperatureText>
        </PreviewContainer>
    );
}