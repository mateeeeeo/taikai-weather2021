import React from 'react';
import styled from 'styled-components';
import { LocationSharp, Sunny } from 'react-ionicons';
import { Text } from './../styled_components/styledComponents';
import { useContext, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { SelectedLocationContext } from '../contexts/SelectedLocationContext';
import { WeatherDataContext } from '../contexts/WeatherDataContext';
import Dropdown from 'react-dropdown';
import './../styles/dropdown-dark.css';
import './../styles/dropdown-light.css';
import './../styles/dropdown.css';
import { WeatherCondition } from '../enums/enums';

const LocationDropdown = styled.select<{ isDarkMode: boolean }>`
  font-size: 36px;
  margin-left: 8px;
  background: transparent;
  border: none;
  color: ${(props: { isDarkMode: boolean }) => props.isDarkMode ? 'white' : '#232323'};
  font-family: 'Lato';
  cursor: pointer;

  & > option {
    font-size: 18px;
    background-color: #23232b;
  }

  @media (min-width: 360px) {
    font-size: 44px;
  }
`;

const WeatherForecastContainer = styled.div`
  width: 100%;
  margin: 64px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const ForecastLocation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ForecastWeatherDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TemperatureText = styled(Text)`
  font-size: 40px;
  font-weight: normal;
  margin-left: 4px;

  @media (min-width: 360px) {
    font-size: 48px;
  }
`;

const LocationIcon = styled(LocationSharp)`
  height: 40px;
  width: 40px;
`;

const SunnyIcon = styled(Sunny)`
  height: 48px;
  width: 48px;
`;

const ConditionIcon = styled.i`
    font-size: 48px;
    color: ${({ isDarkMode }: { isDarkMode: boolean }) => isDarkMode ? 'white' : '#232323'};
    margin-right: 8px;
`;

export const locations: string[] = ['Accra', 'Uyo'];

function WeatherForecast() {
  const { theme } = useContext(ThemeContext);
  const { selectedLocation, setSelectedLocation } = useContext(SelectedLocationContext);
  const { weatherData } = useContext(WeatherDataContext);

  let conditionIconClass: string = '';

  if (weatherData?.condition)
    switch (+WeatherCondition[weatherData.condition]) {
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

      case 5:
        conditionIconClass = 'ri-sun-foggy-fill';
        break;

      default:
        console.log('No icon');
    }

  return (
    <WeatherForecastContainer>
      <ForecastLocation>
        <LocationIcon
          color={theme.isDarkMode ? 'white' : '#232323'}
          height='40px'
          width='40px'
        />
        {/* <LocationDropdown isDarkMode={theme.isDarkMode}>
          <option>Accra</option>
          <option>Uyo</option>
        </LocationDropdown> */}
        <Dropdown
          value={selectedLocation}
          onChange={location => setSelectedLocation(location.value)}
          options={locations}
          controlClassName={`dropdown-control ${theme.isDarkMode ? 'dark' : 'light'}`}
          arrowClassName='dropdown-arrow'
          menuClassName={`dropdown-menu ${theme.isDarkMode ? 'dark' : 'light'}`}
          className='dropdown-root' />
      </ForecastLocation>
      <ForecastWeatherDisplay>
        {/* <SunnyIcon
          color={theme.isDarkMode ? 'white' : '#232323'}
          height='48px'
          width='48px'
        /> */}
        <ConditionIcon isDarkMode={theme.isDarkMode} className={conditionIconClass} />

        <TemperatureText isDarkMode={theme.isDarkMode}>{weatherData?.temp}°</TemperatureText>
      </ForecastWeatherDisplay>
    </WeatherForecastContainer>
  );
}

export default WeatherForecast;