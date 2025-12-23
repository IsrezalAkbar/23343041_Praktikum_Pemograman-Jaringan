const request = require("postman-request");
const urlCuaca =
  "http://api.weatherstack.com/current?access_key=108c882cb8316b3cc7ebb14e4ff95e4d&query=-0.8970225762022125,100.35108694711673&units=f";
request({ url: urlCuaca, json: true }, (error, response) => {
  console.log(
    "Saat ini suhu diluar mencapai " +
      response.body.current.temperature +
      " derajat celcius. Kemungkinan terjadinya hujan adalah" +
      response.body.current.precip +
      "%"
  );
});
