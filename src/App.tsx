import styled from 'styled-components';
import DateInputBar from './components/DateInputBar';
import WeatherForecast from './components/WeatherForecast';
import ForecastPreviews from './components/ForecastPreviews';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { SelectedDateContextProvider } from './contexts/SelectedDateContext';
import { SelectedLocationContextProvider } from './contexts/SelectedLocationContext';
import { SelectedLanguageContextProvider } from './contexts/SelectedLanguageContext';
import { WeatherDataContextProvider } from './contexts/WeatherDataContext';
import WeatherData2 from './components/WeatherData2';

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

const Separator = styled.hr`
  border-radius: 999px;
  border: none;
  border-top: 3px solid #393a45;
`;

export default function App() {
  return (
    <>
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