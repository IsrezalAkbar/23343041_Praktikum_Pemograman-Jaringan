const geocodeURL =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/Padang.json?access_token=pk.eyJ1IjoiaXNyZXphbCIsImEiOiJjbWg2ZGd1OW0waHc2Mm1wdG9vYnFrejJoIn0.946YcOuPZ_eb30-oO3RxsA&limit=1";
request({ url: geocodeURL, json: true }, (error, response) => {
  const latitude = response.body.features[0].center[1];
  const longitude = response.body.features[0].center[0];
  console.log(latitude, longitude);
});
