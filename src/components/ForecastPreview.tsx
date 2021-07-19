import styled from 'styled-components';
import { WeatherType } from './enums/enums';
import { Text } from './../styled_components/styledComponents';
import { Sunny } from 'react-ionicons';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { SelectedDateContext } from '../contexts/SelectedDateContext';
import { Theme } from '../interfaces/Interfaces';

interface ForecastPreviewProps {
    date: Date,
    temperature: number,
    isHighFloodRisk: boolean,
    weatherType: WeatherType
}

interface PreviewContainerProps {
    theme: Theme
    isSelected: boolean
}

interface TextProps {
    theme: Theme,
    isSelected: boolean
}

const DateText = styled(Text) <TextProps>`
    font-size: 20px;
    font-weight: normal;
    margin-bottom: 4px;
    color: ${props => getTextColor(props.isSelected, props.theme.isDarkMode)};
`;

const TemperatureText = styled(DateText) <TextProps>`
    font-size: 20px;
    margin: 0;
    color: ${props => getTextColor(props.isSelected, props.theme.isDarkMode)};
`;

const PreviewContainer = styled.div<PreviewContainerProps>`
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    padding: ${(props: PreviewContainerProps) => props.isSelected ? '8px 16px' : '8px'};
    transition: all 250ms ease;
    background-color: ${(props: PreviewContainerProps) => getBackgroundColor(props.isSelected, props.theme.isDarkMode)};
    border-radius: 8px;
    margin: 8px;
    cursor: pointer;
`;

const SunnyIcon = styled(Sunny) <TextProps>`
    width: 24px;
    height: 24px;
`;

function getBackgroundColor(isSelected: boolean, isDarkMode: boolean): string {
    if (isDarkMode)
        return isSelected ? '#EDF0FF' : 'transparent';

    return isSelected ? '#2C2D35' : 'transparent';
}

function getTextColor(isSelected: boolean, isDarkMode: boolean): string {
    if (isDarkMode)
        return isSelected ? '#232323' : 'white';

    return isSelected ? 'white' : '#232323';
}

export default function   ForecastPreview(props: ForecastPreviewProps) {
    const { theme } = useContext(ThemeContext);
    const { selectedDate, setSelectedDate } = useContext(SelectedDateContext);

    const month = props.date.getMonth() + 1;

    return (
        <PreviewContainer
            theme={theme}
            onClick={() => setSelectedDate(props.date)}
            isSelected={props.date.toDateString() === selectedDate.toDateString()}>
            <DateText
                theme={theme}
                as="p"
                isSelected={props.date.toDateString() === selectedDate.toDateString()}>
                {month < 10 ? '0' + month : month}
                /
                {props.date.getDate() < 10 ? '0' + props.date.getDate() : props.date.getDate()}
            </DateText>
            <SunnyIcon
                width='24px'
                height='24px'
                color={getTextColor(props.date.toDateString() === selectedDate.toDateString(), theme.isDarkMode)}
            />
            <TemperatureText
                theme={theme}
                isSelected={props.date.toDateString() === selectedDate.toDateString()}>
                {props.temperature}°
            </TemperatureText>
        </PreviewContainer>
    );
}