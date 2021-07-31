const express = require('express');
const path = require('path');
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");
const port = 4000;

import { fetchForecastsForLocationJSON2 } from './FetchForecasts';
import { LatLong } from './src/interfaces/Interfaces';

app.use(express.static(path.join(__dirname, 'build')));
app.use("/apiv2", createProxyMiddleware({
  target: "https://api.dclimate.net/",
  changeOrigin: true
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/forecast', async (req, res) => {
  console.log('request');
  try {
    const forecast = await fetchForecastsForLocationJSON2(req.query.l, new Date(parseInt(req.query.y), parseInt(req.query.m) - 1, parseInt(req.query.d)));

    res.send(forecast);
  } catch (err) {
    console.log(err);
    res.send({});
  }
});

// app.get('/soil_moisture', async (req, res) => {
//   try {
//     const latLong: LatLong = { lat: req.query.lat, long: req.query.long };
//     const moisture = await fetchSoilMoisture(latLong, new Date(parseInt(req.query.y), parseInt(req.query.m) - 1, parseInt(req.query.d)));
//     res.send({ moisture });
//   } catch (err) {
//     console.log(err);
//   }
// });

app.listen(port);
console.log(`Server started at port ${port}`);