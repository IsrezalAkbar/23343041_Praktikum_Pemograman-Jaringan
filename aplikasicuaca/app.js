const request = require("postman-request");

// Lokasi yang ingin dicari
const lokasi = "Padang Barat";

// API Mapbox
const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
  lokasi
)}.json?access_token=pk.eyJ1IjoiaXNyZXphbCIsImEiOiJjbWg2ZGd1OW0waHc2Mm1wdG9vYnFrejJoIn0.946YcOuPZ_eb30-oO3RxsA&limit=1`;

request({ url: geocodeURL, json: true }, (error, response) => {
  if (error) {
    return console.log("Tidak dapat terhubung ke layanan lokasi!");
  }

  const data = response.body;

  if (data.features.length === 0) {
    return console.log("Lokasi tidak ditemukan!");
  }

  // Ambil koordinat
  const latitude = data.features[0].center[1];
  const longitude = data.features[0].center[0];
  const placeName = data.features[0].place_name;
  const placeType = data.features[0].place_type[0];

  console.log(`Koordinat lokasi anda adalah ${latitude}, ${longitude}`);
  console.log(`Data yang anda cari adalah: ${lokasi}`);
  console.log(`Data yang ditemukan adalah: ${placeName}`);
  console.log(`Tipe lokasi adalah: ${placeType}`);

  // API Weatherstack
  const urlCuaca = `http://api.weatherstack.com/current?access_key=108c882cb8316b3cc7ebb14e4ff95e4d&query=${latitude},${longitude}&units=m`;

  request({ url: urlCuaca, json: true }, (error, response) => {
    if (error) {
      return console.log("Tidak dapat terhubung ke layanan cuaca!");
    }

    const cuaca = response.body.current;

    console.log(
      `Saat ini suhu di ${lokasi} mencapai ${cuaca.temperature} derajat celcius.`
    );
    console.log(`Kemungkinan terjadinya hujan adalah ${cuaca.precip}%`);
    console.log(`Deskripsi cuaca saat ini: ${cuaca.weather_descriptions[0]}`);
  });
});
