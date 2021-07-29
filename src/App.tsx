import styled from 'styled-components';

import DateInputBar from './components/DateInputBar';
import WeatherForecast from './components/WeatherForecast';
import LocationInput from './components/LocationInput';
import ForecastPreviews from './components/ForecastPreviews';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { SelectedDateContextProvider } from './contexts/SelectedDateContext';
import { SelectedLocationContextProvider } from './contexts/SelectedLocationContext';
import { SelectedLanguageContextProvider } from './contexts/SelectedLanguageContext';
import { WeatherDataContextProvider } from './contexts/WeatherDataContext';
import WeatherData2 from './components/WeatherData2';
// import { fetchSoilMoistureValues } from './api/SoilMoisture';
import { useEffect } from 'react';

const AppContainer = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    width: 80%;
  }
`;

// const Header = styled.div`
//   width: 100%;
//   padding: 12px 16px;
//   margin-bottom: 16px;
//   box-shadow: 0 2px 2px 1px rgba(0, 0, 0, 0.2);
//   background-color: #414141;
// `;

const Separator = styled.hr`
  border-radius: 999px;
  border: none;
  border-top: 3px solid #393a45;
`;

export default function App() {
  // useEffect(() => {
  //   fetchSoilMoistureValues();
  // }, []);

  return (
    <>
      {/* <Header>
        <Title>Sunrise Dashboard</Title>
      </Header> */}
      <AppContainer>
        <ThemeContextProvider>
          <SelectedDateContextProvider>
            <SelectedLocationContextProvider>
              <WeatherDataContextProvider>
                <SelectedLanguageContextProvider>
                  <DateInputBar />
                  <WeatherForecast />
                  {/* <LocationInput /> */}
                  <Separator />
                  <ForecastPreviews />
                  {/* <WeatherData /> */}
                  <WeatherData2 />
                </SelectedLanguageContextProvider>
              </WeatherDataContextProvider>
            </SelectedLocationContextProvider>
          </SelectedDateContextProvider>
        </ThemeContextProvider>
      </AppContainer>
    </>
  );
}