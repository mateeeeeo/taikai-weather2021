import styled, { css } from 'styled-components';
import { WeatherType } from './../enums/enums';
import { Text } from './../styled_components/styledComponents';
import { Sunny, CloudOffline } from 'react-ionicons';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { SelectedDateContext } from '../contexts/SelectedDateContext';
import { Theme } from '../interfaces/Interfaces';


interface ForecastPreviewProps {
    date: Date,
    temperature: number | null,
    weatherCondition: WeatherType | null,
    setSelectedDate: (date: Date) => void
}

interface TextProps {
    isSelected: boolean
    isDarkMode: boolean
}

const DateText = styled(Text) <TextProps>`
    font-size: 20px;
    font-weight: normal;
    margin-bottom: 4px;
    color: ${(props: TextProps) => getTextColor(props.isSelected, props.isDarkMode)};
`;

const TemperatureText = styled(DateText) <TextProps>`
    font-size: 20px;
    margin: 0;
    color: ${(props: TextProps) => getTextColor(props.isSelected, props.isDarkMode)};
`;

const PreviewContainer = styled.div<TextProps>`
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    padding: ${(props: TextProps) => props.isSelected ? '8px 16px' : '8px'};
    transition: all 250ms ease;
    background-color: ${(props: TextProps) => getBackgroundColor(props.isSelected, props.isDarkMode)};
    border-radius: 8px;
    margin: 8px;
    cursor: pointer;
`;

const iconCss = css`
    width: 24px;
    height: 24px;
`;

const NoDataIcon = styled(CloudOffline) <TextProps>`
    ${iconCss}
`;

const SunnyIcon = styled(Sunny) <TextProps>`
    ${iconCss}
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

export default function ForecastPreview(props: ForecastPreviewProps) {
    const { theme } = useContext(ThemeContext);
    const { selectedDate } = useContext(SelectedDateContext);

    const month = props.date.getMonth() + 1;

    return (
        <PreviewContainer
            isDarkMode={theme.isDarkMode}
            isSelected={props.date.toDateString() === selectedDate.toDateString()}
            onClick={() => props.setSelectedDate(props.date)}>
            <DateText
                isDarkMode={theme.isDarkMode}
                isSelected={props.date.toDateString() === selectedDate.toDateString()}>
                {month < 10 ? '0' + month : month}
                /
                {props.date.getDate() < 10 ? '0' + props.date.getDate() : props.date.getDate()}
            </DateText>
            <NoDataIcon
                width='24px'
                height='24px'
                color={getTextColor(props.date.toDateString() === selectedDate.toDateString(), theme.isDarkMode)}
            />
            <TemperatureText
                isDarkMode={theme.isDarkMode}
                isSelected={props.date.toDateString() === selectedDate.toDateString()}>
                {props.temperature ?? 'N/A'}
            </TemperatureText>
        </PreviewContainer>
    );
}