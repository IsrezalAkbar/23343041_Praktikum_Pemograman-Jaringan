//const fs = require("fs");

//fs.writeFileSync("Catatan.txt", "Nama Saya Isrezal Akbar");
//fs.appendFileSync("catatan.txt", "Saya tinggal di Padang");
//const catatan = require("./catatan.js");
const yargs = require("yargs");
const catatan = require("./catatan.js");

// Menentukan versi yargs
yargs.version("10.1.0");

// Command: tambah
yargs.command({
  command: "tambah",
  describe: "Tambah sebuah catatan baru",
  builder: {
    judul: {
      describe: "Judul catatan",
      demandOption: true,
      type: "string",
    },
    isi: {
      describe: "Isi catatan",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    catatan.tambahCatatan(argv.judul, argv.isi);
  },
});

// Command: hapus
yargs.command({
  command: "hapus",
  describe: "Hapus sebuah catatan berdasarkan judul",
  builder: {
    judul: {
      describe: "Judul catatan yang akan dihapus",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    catatan.hapusCatatan(argv.judul);
  },
});

// Command: list
yargs.command({
  command: "list",
  describe: "Tampilkan semua catatan",
  handler() {
    catatan.listCatatan();
  },
});

// Command: read
yargs.command({
  command: "read",
  describe: "Baca satu catatan berdasarkan judul",
  builder: {
    judul: {
      describe: "Judul catatan yang ingin dibaca",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    catatan.bacaCatatan(argv.judul);
  },
});

// Jalankan yargs
yargs.parse();

//const command = process.argv[2];
//console.log(process.argv[2]);

//if (command === "tambah") {
//  console.log("Tambah Catatan");
//} else if (command === "hapus") {
//  console.log("Hapus Catatan");
//}
//const pesan = catatan();
//console.log(pesan);
// Import package chalk
//const chalk = require("chalk");

// Cetak teks berwarna biru
//console.log(chalk.blue("print warna biru sukses"));
//console.log(chalk.green("print warna hijau sukses"));
//console.log(chalk.yellow("print warna kuning sukses"));
//console.log(chalk.red.bold("Teks merah tebal"));
//console.log(chalk.bgCyan.black("Teks hitam dengan background biru muda"));
