import React from 'react';
import styled from 'styled-components';
import { LocationSharp, Sunny } from 'react-ionicons';
import { Text } from './../styled_components/styledComponents';

const LocationText = styled(Text)`
  font-size: 36px;
  margin-left: 8px;
  font-weight: normal;

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
  height: 40px;
  width: 40px;
`;

function WeatherForecast() {
  return (
    <WeatherForecastContainer>
      <ForecastLocation>
        <LocationIcon
          color='white'
          height='40px'
          width='40px'
        />
        <LocationText>Accra</LocationText>
      </ForecastLocation>
      <ForecastWeatherDisplay>
        <SunnyIcon
          color='white'
          height='40px'
          width='40px'
        />
        <TemperatureText>35°</TemperatureText>
      </ForecastWeatherDisplay>
    </WeatherForecastContainer>
  );
}

export default WeatherForecast;