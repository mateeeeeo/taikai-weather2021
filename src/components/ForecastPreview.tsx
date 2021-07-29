import styled, { css } from 'styled-components';
import { WeatherCondition } from './../enums/enums';
import { Text } from './../styled_components/styledComponents';
import { Sunny, CloudOffline } from 'react-ionicons';
import { useContext, useState, useEffect, useRef } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { SelectedDateContext } from '../contexts/SelectedDateContext';
import { SelectedLocationContext } from '../contexts/SelectedLocationContext';
import { WeatherDataContext } from '../contexts/WeatherDataContext';
import { Forecast, Theme, WeatherInfo } from '../interfaces/Interfaces';
import { fetchForecastsForLocationJSON } from '../api/FetchForecasts';

interface ForecastPreviewProps {
    date: Date,
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

const ConditionIcon = styled.i<TextProps>`
    font-size: 24px;
    color: ${(props: TextProps) => getTextColor(props.isSelected, props.isDarkMode)};
    margin-right: 8px;
`;

const iconCss = css`
    width: 24px;
    height: 24px;
`;

const NoDataIcon = styled(CloudOffline) <TextProps>`
    ${iconCss}
`;

// const SunnyIcon = styled(Sunny) <TextProps>`
//     ${iconCss}
// `;

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
    const { selectedLocation } = useContext(SelectedLocationContext);
    const { weatherData, setWeatherData } = useContext(WeatherDataContext);

    const [data, setData] = useState<WeatherInfo>();

    const month = props.date.getMonth() + 1;

    useEffect(() => {
        if (selectedLocation) {
            fetchForecastsForLocationJSON(selectedLocation.name, props.date)
                .then(forecast => {
                    setData(forecast?.weather_info);
                }).catch(reason => console.log(reason));
        }
    }, [selectedLocation]);

    useEffect(() => {
        /* if this forecast preview is the one selected, then its data will be 
        forwarded to the weather data context after being fetched */
        if (props.date.toDateString() === selectedDate.toDateString()) {
            setWeatherData(data);
        }
    }, [data, selectedDate]);

    let conditionIconClass: string = '';

    if (data?.condition)
        switch (+WeatherCondition[data.condition]) {
            case 0:
                conditionIconClass = 'ri-sun-fill';
                break;
            case 1:
                conditionIconClass = 'ri-sun-fill';
                break;
            case 2:
                conditionIconClass = 'ri-sun-cloudy-fill';
                break;

            case 3:
                conditionIconClass = 'ri-cloudy-fill';
                break;

            case 4:
                conditionIconClass = 'ri-foggy-fill';
                break;
        }

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
            {data?.condition ?
                <ConditionIcon
                    isDarkMode={theme.isDarkMode}
                    isSelected={props.date.toDateString() === selectedDate.toDateString()}
                    className={conditionIconClass} /> :
                <NoDataIcon
                    width='24px'
                    height='24px'
                    color={getTextColor(props.date.toDateString() === selectedDate.toDateString(), theme.isDarkMode)} />}
            <TemperatureText
                isDarkMode={theme.isDarkMode}
                isSelected={props.date.toDateString() === selectedDate.toDateString()}>
                {(data?.temp ?? 'N/A') + '°'}
            </TemperatureText>
        </PreviewContainer>
    );
}