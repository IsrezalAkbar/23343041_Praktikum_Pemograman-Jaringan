const fs = require("fs");

/*const buku = {
  judul: "Pemograman Jaringan",
  penulis: "Isrezal Akbar",
};

const bukuJSON = JSON.stringify(buku);
fs.writeFileSync("1-jsontest.json", bukuJSON);*/
const dataBuffer = fs.readFileSync("1-jsontests.json");
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);
console.log(data.judul);
