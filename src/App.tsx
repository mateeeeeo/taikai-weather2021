import { useEffect, useState } from 'react';
import { LatLong } from './interfaces/interfaces';
import * as soilMoisture from './api/SoilMoisture';

const accra: LatLong = {
  lat: 5.614818,
  long: -0.205874
};

function App() {
  const [moisture, setMoisture] = useState(0);

  useEffect(() => {
    soilMoisture.get(accra).then(res => setMoisture(res.moisture));
  }, []);

  return (
    <div>
      <h1>Taikai-Weather2021 Dashboard</h1>
      <p>Soil moisture: {moisture}</p>
    </div>
  );
}

export default App;
