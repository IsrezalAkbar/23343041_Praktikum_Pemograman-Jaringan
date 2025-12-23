const { MongoClient, ObjectId } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const namaDatabase = "testsaja";
async function main() {
  try {
    await client.connect();
    console.log("Berhasil terhubung ke MongoDB database server");
    const db = client.db(namaDatabase);
    // Mencari satu dokumen dalam koleksi 'pengguna' berdasarkan nama 'Randi'.
    const byNama = await db.collection("pengguna").findOne({ nama: "Randi" });
    // Mencari satu dokumen dalam koleksi 'pengguna' berdasarkan ID objek tertentu.
    const byObjectID = await db
      .collection("pengguna")
      .findOne({ _id: new ObjectId("693550af27b7b796b4109345") });
    // Mencari beberapa dokumen dalam koleksi 'pengguna' dengan kriteria usia 28 dan mengubahnya menjadi array.
    const toArray = await db
      .collection("pengguna")
      .find({ usia: 25 })
      .toArray();
    // Menggunakan if statement dengan kondisi yang salah. (Ini tidak akanber fungsi sebagaimana yang diharapkan)
    if (byNama && byObjectID && toArray) {
      // Menampilkan hasil pencarian berdasarkan nama, ID objek, dan kriteria usia.
      console.log("Data Pengguna ditemukan (berdasarkan nama):", byNama);
      console.log(
        "Data Pengguna ditemukan (berdasarkan ID Objek):",
        byObjectID
      );
      console.log("Data Pengguna ditemukan (dalam format Array):", toArray);
    } else {
      // Menampilkan pesan bahwa data pengguna tidak ditemukan.
      console.log("Data Pengguna tidak ditemukan");
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}
// Memanggil fungsi 'main' dan menangani kesalahan (jika ada) dengan mencetak pesan kesalahan ke konsol.
main().catch(console.error);
