const request = require("postman-request");

const urlCuaca =
  "http://api.weatherstack.com/current?access_key=108c882cb8316b3cc7ebb14e4ff95e4d&query=-0.8970225762022125,100.35108694711673&units=f";

request({ url: urlCuaca, json: true }, (error, response) => {
  if (error) {
    console.log("Tidak dapat terhubung ke layanan cuaca!");
  } else if (response.body.error) {
    console.log("Lokasi tidak ditemukan!");
  } else {
    console.log(
      "Saat ini suhu di luar mencapai " +
        response.body.current.temperature +
        " derajat celcius. Kemungkinan terjadinya hujan adalah " +
        response.body.current.precip +
        "%."
    );

    // ✅ Tambahan: menampilkan deskripsi cuaca
    console.log(
      `Saat ini ${response.body.current.weather_descriptions[0].toLowerCase()}, 
  dengan suhu ${response.body.current.temperature}°C 
  dan kemungkinan hujan ${response.body.current.precip}%.`
    );
  }
});
