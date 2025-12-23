const fs = require("fs");

// Fungsi untuk memuat catatan dari file JSON
const muatCatatan = function () {
  try {
    const dataBuffer = fs.readFileSync("catatan.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const simpanCatatan = function (catatan) {
  const dataJSON = JSON.stringify(catatan);
  fs.writeFileSync("catatan.json", dataJSON);
};

const tambahCatatan = function (judul, isi) {
  const catatan = muatCatatan();

  const catatanGanda = catatan.filter(function (note) {
    return note.judul === judul;
  });

  if (catatanGanda.length === 0) {
    catatan.push({
      judul: judul,
      isi: isi,
    });
    simpanCatatan(catatan);
    console.log("Catatan baru ditambahkan!");
  } else {
    console.log("Judul catatan telah dipakai");
  }
};

const hapusCatatan = function (judul) {
  const catatan = muatCatatan();
  const catatanTersisa = catatan.filter(function (note) {
    return note.judul !== judul;
  });

  if (catatan.length > catatanTersisa.length) {
    simpanCatatan(catatanTersisa);
    console.log("Catatan berhasil dihapus!");
  } else {
    console.log("Catatan tidak ditemukan!");
  }
};

const listCatatan = function () {
  const catatan = muatCatatan();
  console.log("=== Daftar Catatan ===");
  if (catatan.length === 0) {
    console.log("Tidak ada catatan yang tersimpan.");
  } else {
    catatan.forEach((note, index) => {
      console.log(`${index + 1}. ${note.judul}`);
    });
  }
};

const bacaCatatan = function (judul) {
  const catatan = muatCatatan();
  const catatanDitemukan = catatan.find((note) => note.judul === judul);

  if (catatanDitemukan) {
    console.log("=== Catatan Ditemukan ===");
    console.log(`Judul: ${catatanDitemukan.judul}`);
    console.log(`Isi: ${catatanDitemukan.isi}`);
  } else {
    console.log("Catatan tidak ditemukan!");
  }
};

module.exports = {
  tambahCatatan,
  hapusCatatan,
  listCatatan,
  bacaCatatan,
};
