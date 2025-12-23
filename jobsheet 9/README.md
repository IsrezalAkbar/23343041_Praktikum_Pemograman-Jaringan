# Jobsheet 9 - Aplikasi Chat Real-time dengan Socket.io

Aplikasi chat real-time yang dibangun menggunakan Node.js, Express, dan Socket.io.

## Fitur

- 💬 Real-time messaging
- 📍 Share lokasi GPS
- 👥 List user per room
- 🚫 Filter kata-kata tidak pantas
- ⚡ WebSocket communication

## Teknologi

- **Backend:** Node.js, Express, Socket.io
- **Frontend:** HTML, CSS, JavaScript
- **Library:** Mustache.js, Moment.js, Qs

## Instalasi

```bash
npm install
```

## Cara Menjalankan

```bash
npm start
```

Aplikasi akan berjalan di `http://localhost:3000`

## Struktur Folder

```
jobsheet-9/
├── public/
│   ├── index.html      # Halaman login
│   ├── chat.html       # Halaman chat
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── chat.js     # Client-side Socket.io
├── src/
│   ├── index.js        # Server utama
│   └── utils/
│       ├── messages.js # Helper function pesan
│       └── users.js    # Helper function user management
├── package.json
└── tugas.md            # Dokumentasi tugas
```

## API Events

### Client → Server

- `join` - Bergabung ke room
- `kirimPesan` - Mengirim pesan
- `kirimLokasi` - Share lokasi

### Server → Client

- `pesan` - Broadcast pesan
- `locationMessage` - Broadcast lokasi
- `roomData` - Update list user
- `disconnect` - User keluar

## Lisensi

MIT
