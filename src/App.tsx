import styled from 'styled-components';

import DateInputBar from './components/DateInputBar';
import WeatherForecast from './components/WeatherForecast';
import ForecastPreviews from './components/ForecastPreviews';
import WeatherData from './components/WeatherData';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { SelectedDateContextProvider } from './contexts/SelectedDateContext';

const AppContainer = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
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
  //   soilMoisture.get(accra).then(res => setMoisture(res.moisture));
  // }, []);

  return (
    <>
      {/* <Header>
        <Title>Sunrise Dashboard</Title>
      </Header> */}
      <AppContainer>
        <ThemeContextProvider>
          <SelectedDateContextProvider>
            <DateInputBar />
            <WeatherForecast />
            {/* <LocationInput /> */}
            <Separator />
            <ForecastPreviews />
            <WeatherData />
          </SelectedDateContextProvider>
        </ThemeContextProvider>
      </AppContainer>
    </>
  );
}