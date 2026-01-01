# 🌐 Praktikum Pemrograman Jaringan
### 23343041 - Isrezal Akbar

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)

---

## 📚 Deskripsi

Repository ini berisi kumpulan tugas dan praktikum mata kuliah **Pemrograman Jaringan** Semester 5. Setiap jobsheet mencakup implementasi konsep-konsep jaringan menggunakan Node.js, mulai dari dasar hingga aplikasi real-time.

---

## 📂 Struktur Repository

```
📦 prak-jaringan
├── 📁 jobsheet 1      → Pengenalan Node.js & Hello World
├── 📁 jobsheet 2      → File System & Command Line Interface
├── 📁 jobsheet 8      → MongoDB & Database Operations
├── 📁 jobsheet 9      → Real-time Chat Application (Socket.io)
├── 📁 aplikasicuaca   → Weather Application API (jobsheet 3,4,5,6,7) karena saya tidak buat file terpisah dan nyambung dari jobsheet 3 sampai 7 untuk uts
├── 📁 web-server      → Express.js Web Server & Templates
└── 📁 202513430093_23343041_Isrezal Akbar → Final Project
```

---

## 🚀 Jobsheet Overview

### 📌 Jobsheet 1: Pengenalan Node.js
- ✅ Hello World dengan Node.js
- ✅ Menjalankan JavaScript di server-side

**File:** `hello.js`, `hello_world.js`

---

### 📌 Jobsheet 2: File System & CLI
- ✅ Operasi file (Create, Read, Update, Delete)
- ✅ Command Line Interface dengan Yargs
- ✅ Validasi input dengan Validator
- ✅ Penyimpanan data dalam JSON

**Teknologi:** `fs`, `yargs`, `validator`, `chalk`

**Contoh Penggunaan:**
```bash
node app.js add --judul="Catatan Baru" --body="Isi catatan"
node app.js list
node app.js read --judul="Catatan Baru"
```

---

### 📌 Jobsheet 8: MongoDB Database
- ✅ Koneksi ke MongoDB
- ✅ CRUD Operations (Create, Read, Update, Delete)
- ✅ Task Manager Application

**Teknologi:** `mongodb`, `node.js`

**Setup:**
```bash
cd "jobsheet 8"
npm install
# Pastikan MongoDB sudah running
node task\ manager/insertdocument.js
```

---

### 📌 Jobsheet 9: Real-time Chat Application 🔥
- ✅ WebSocket dengan Socket.io
- ✅ Real-time messaging
- ✅ Multiple rooms/channels
- ✅ User management
- ✅ Responsive UI

**Teknologi:** `socket.io`, `express`, `moment`

**Fitur:**
- 💬 Chat real-time
- 👥 Multiple users
- 🏠 Room-based chat
- ⏰ Timestamp messages
- 🎨 Modern UI

**Cara Menjalankan:**
```bash
cd "jobsheet 9"
npm install
npm start
# Buka http://localhost:3000
```

---

### 📌 Aplikasi Cuaca
- ✅ Weather API Integration
- ✅ Geocoding
- ✅ Real-time weather data

**Teknologi:** `postman-request`, `Weather API`, `Mapbox API`

---

### 📌 Web Server
- ✅ Express.js Server
- ✅ Handlebars Templates
- ✅ Static File Serving
- ✅ API Routes
- ✅ Weather & News Integration

**Teknologi:** `express`, `hbs`, `postman-request`

**Struktur:**
```
web-server/
├── public/          → Static files (CSS, JS, Images)
├── templates/       → Handlebars views & partials
├── src/            → Server code & utilities
└── package.json    → Dependencies
```

---

## 🛠️ Instalasi & Setup

### Prerequisites
- Node.js (v14 atau lebih baru)
- MongoDB (untuk jobsheet 8)
- npm atau yarn

### Langkah Instalasi

1. **Clone repository**
```bash
git clone https://github.com/IsrezalAkbar/23343041_Praktikum_Pemograman-Jaringan.git
cd 23343041_Praktikum_Pemograman-Jaringan
```

2. **Install dependencies untuk setiap jobsheet**
```bash
cd "jobsheet 2"
npm install

cd "../jobsheet 8"
npm install

cd "../jobsheet 9"
npm install
```

3. **Jalankan aplikasi yang diinginkan**
```bash
# Contoh: Menjalankan chat app
cd "jobsheet 9"
npm start
```

---

## 💻 Teknologi yang Digunakan

| Teknologi | Deskripsi |
|-----------|-----------|
| **Node.js** | Runtime environment JavaScript |
| **Express.js** | Web framework untuk Node.js |
| **MongoDB** | NoSQL Database |
| **Socket.io** | Real-time bidirectional communication |
| **Handlebars** | Template engine |
| **Yargs** | Command-line argument parser |
| **Validator** | String validation library |
| **Chalk** | Terminal styling |
| **Postman-request** | HTTP request client |

---

## 📸 Screenshots

### Chat Application
Real-time chat dengan Socket.io yang memungkinkan multiple users berkomunikasi dalam room berbeda.

### Weather Application
Aplikasi cuaca yang menampilkan informasi cuaca real-time berdasarkan lokasi.

### Web Server
Server web dengan Express.js dan Handlebars untuk rendering dynamic content.

---

## 🎯 Fitur Unggulan

- ✨ **Real-time Communication** - Chat application dengan Socket.io
- 🗄️ **Database Integration** - CRUD operations dengan MongoDB
- 🌦️ **API Integration** - Weather & geocoding APIs
- 🎨 **Modern UI** - Responsive dan user-friendly interface
- 📝 **File Operations** - Command-line note-taking app
- 🚀 **RESTful API** - Express.js server dengan proper routing

---

## 📖 Cara Penggunaan

### Jobsheet 2 - Notes App
```bash
# Tambah catatan baru
node app.js add --judul="Meeting" --body="Meeting pukul 10 pagi"

# Lihat semua catatan
node app.js list

# Baca catatan tertentu
node app.js read --judul="Meeting"

# Hapus catatan
node app.js remove --judul="Meeting"
```

### Jobsheet 9 - Chat App
```bash
npm start
# Buka browser: http://localhost:3000
# Masukkan nama dan room
# Mulai chatting!
```

---

## 🤝 Kontribusi

Ini adalah repository tugas pribadi untuk keperluan akademik. Namun, saran dan feedback selalu diterima!

---

## 👨‍💻 Author

**Isrezal Akbar**
- NIM: 23343041
- 📧 Email: [isrezalakbar@example.com](mailto:isrezalakbar@example.com)
- 🔗 GitHub: [@IsrezalAkbar](https://github.com/IsrezalAkbar)

---

## 📝 Lisensi

Repository ini dibuat untuk keperluan akademik Praktikum Pemrograman Jaringan.

---

## 🙏 Acknowledgments

- Terima kasih kepada dosen pengampu mata kuliah Pemrograman Jaringan
- Node.js community
- Socket.io documentation
- MongoDB documentation

---

<div align="center">
  
### ⭐ Jangan lupa berikan star jika repository ini bermanfaat! ⭐

**Made with ❤️ by Isrezal Akbar**

</div>
