const { MongoClient, ObjectId } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const namaDatabase = "testsaja"; // sesuaikan dengan database kamu

async function main() {
  try {
    await client.connect();
    console.log("Berhasil terhubung ke MongoDB database server");

    const db = client.db(namaDatabase);

    // 🔥 Hapus pengguna berdasarkan ID
    const result = await db.collection("pengguna").deleteOne({
      _id: new ObjectId("69355934d42ff0f283eb3664"),
    });

    console.log("Hasil deleteOne:", result);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

main();
