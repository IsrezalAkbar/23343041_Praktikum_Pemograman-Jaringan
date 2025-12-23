# Jawaban Tugas Jobsheet 9 - Aplikasi Chat Real-Time

## 1. Perbedaan Fungsi socket.on pada index.js dan chat.js

### Pada file src/index.js (Server-side)

```javascript
io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  socket.on("join", (options, callback) => {
    const { error, user } = tambahPengguna({ id: socket.id, ...options });
    // ... kode lainnya
  });

  socket.on("kirimPesan", (pesan, callback) => {
    const user = ambilPengguna(socket.id);
    // ... kode lainnya
  });

  socket.on("kirimLokasi", (coords, callback) => {
    const user = ambilPengguna(socket.id);
    // ... kode lainnya
  });

  socket.on("disconnect", () => {
    const user = hapusPengguna(socket.id);
    // ... kode lainnya
  });
});
```

**Penjelasan:**

- `socket.on` di server **menerima event dari client**
- Fungsinya untuk **mendengarkan (listen)** event yang dikirim oleh client
- Setelah menerima event, server melakukan pemrosesan data dan mengirim response
- Contoh: ketika client mengirim event "kirimPesan", server menerima pesan, memfilter kata kasar, lalu broadcast ke semua user di room yang sama

### Pada file public/js/chat.js (Client-side)

```javascript
socket.on("pesan", (message) => {
  console.log(message);
  const html = Mustache.render(messageTemplate, {
    username: message.username,
    message: message.text,
    createdAt: moment(message.createdAt).format("H:mm"),
  });
  $messages.insertAdjacentHTML("beforeend", html);
  autoScroll();
});

socket.on("locationMessage", (message) => {
  console.log(message);
  const html = Mustache.render(locationMessageTemplate, {
    username: message.username,
    url: message.url,
    createdAt: moment(message.createdAt).format("H:mm"),
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

socket.on("roomData", ({ room, users }) => {
  const html = Mustache.render(sidebarTemplate, {
    room,
    users,
  });
  document.querySelector("#sidebar").innerHTML = html;
});
```

**Penjelasan:**

- `socket.on` di client **menerima event dari server**
- Fungsinya untuk **mendengarkan (listen)** event yang dikirim oleh server
- Setelah menerima event, client melakukan update tampilan UI
- Contoh: ketika server mengirim event "pesan", client menerima data pesan dan menampilkannya di UI menggunakan Mustache template

**Kesimpulan Perbedaan:**

- **Server (index.js)**: `socket.on` menerima event dari client → proses data → kirim ke client lain
- **Client (chat.js)**: `socket.on` menerima event dari server → update tampilan UI

---

## 2. Investigasi Console Browser Saat Proses Chat

Ketika melakukan chat dan membuka console browser, akan muncul log sebagai berikut:

### Log yang muncul:

1. **Saat mengirim pesan:**

```
{username: "teman", text: "halo", createdAt: 1703337600000}
Pesan berhasil dikirim
```

2. **Saat menerima pesan:**

```
{username: "teman", text: "halo", createdAt: 1703337600000}
```

### Penjelasan dengan baris kode terkait:

#### Baris kode di chat.js yang menghasilkan log:

**Log pesan yang diterima (baris 38-46):**

```javascript
socket.on("pesan", (message) => {
  console.log(message); // <-- Log ini menampilkan object message di console
  const html = Mustache.render(messageTemplate, {
    username: message.username,
    message: message.text,
    createdAt: moment(message.createdAt).format("H:mm"),
  });
  $messages.insertAdjacentHTML("beforeend", html);
  autoScroll();
});
```

**Log konfirmasi pengiriman (baris 65-79):**

```javascript
$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  $messageFormButton.setAttribute("disabled", "disabled");
  const pesan = e.target.elements.pesan.value;
  socket.emit("kirimPesan", pesan, (error) => {
    $messageFormButton.removeAttribute("disabled");
    $messageFormInput.value = "";
    $messageFormInput.focus();
    if (error) {
      return console.log(error);
    }
    console.log("Pesan berhasil dikirim"); // <-- Log konfirmasi pengiriman
  });
});
```

**Alur yang terjadi:**

1. User mengetik pesan dan submit form
2. Event listener menangkap submit, emit event "kirimPesan" ke server
3. Server menerima (index.js baris 45-53), filter kata kasar, lalu broadcast ke semua client di room
4. Semua client menerima event "pesan" dan log `console.log(message)` dijalankan
5. Client pengirim juga menerima callback dan log "Pesan berhasil dikirim"

---

## 3. Fungsi Library Mustache, Moment, dan Qs

### Library Mustache.js

**Fungsi:** Template engine untuk merender HTML dengan data dinamis

**Baris kode di chat.html (baris 59):**

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/3.0.1/mustache.min.js"></script>
```

**Penggunaan di chat.js:**

```javascript
// Template untuk pesan biasa (baris 40-45)
const html = Mustache.render(messageTemplate, {
  username: message.username,
  message: message.text,
  createdAt: moment(message.createdAt).format("H:mm"),
});
$messages.insertAdjacentHTML("beforeend", html);
```

```javascript
// Template untuk lokasi (baris 49-54)
const html = Mustache.render(locationMessageTemplate, {
  username: message.username,
  url: message.url,
  createdAt: moment(message.createdAt).format("H:mm"),
});
```

```javascript
// Template untuk sidebar (baris 58-62)
const html = Mustache.render(sidebarTemplate, {
  room,
  users,
});
```

**Penjelasan:** Mustache mengambil template HTML dari chat.html (yang berisi placeholder seperti `{{username}}`, `{{message}}`) dan mengganti placeholder tersebut dengan data sebenarnya. Ini membuat kode lebih bersih dan terstruktur.

### Library Moment.js

**Fungsi:** Manipulasi dan formatting tanggal/waktu

**Baris kode di chat.html (baris 60):**

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js"></script>
```

**Penggunaan di chat.js:**

```javascript
// Format timestamp menjadi jam:menit (baris 43 dan 52)
createdAt: moment(message.createdAt).format("H:mm");
```

**Penjelasan:** Moment.js mengkonversi timestamp (dalam milliseconds) yang dikirim dari server menjadi format waktu yang mudah dibaca seperti "14:30". Fungsi `format("H:mm")` mengubah timestamp menjadi format jam:menit (24 jam).

### Library Qs (Query String)

**Fungsi:** Parsing query string dari URL

**Baris kode di chat.html (baris 61):**

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/qs/6.6.0/qs.min.js"></script>
```

**Penggunaan di chat.js (baris 15-17):**

```javascript
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});
```

**Penjelasan:**

- Ketika user bergabung dari index.html dengan form, URL menjadi seperti: `chat.html?username=teman&room=unp`
- `location.search` menghasilkan string `?username=teman&room=unp`
- `Qs.parse()` mengubah string tersebut menjadi object: `{username: "teman", room: "unp"}`
- `ignoreQueryPrefix: true` membuat Qs mengabaikan tanda `?` di awal
- Data ini kemudian digunakan untuk emit event "join" ke server (baris 99)

---

## 4. Penjelasan Elements, Templates, dan Options di chat.js

### Elements (Baris 2-7)

```javascript
// Elements
const $messageForm = document.querySelector("#form-pesan");
const $messageFormInput = document.querySelector("input");
const $messageFormButton = document.querySelector("button");
const $sendLocationButton = document.querySelector("#kirim-lokasi");
const $messages = document.querySelector("#messages");
```

**Penjelasan:**

- **Fungsi:** Mengambil referensi elemen DOM dari chat.html untuk dimanipulasi
- **Hubungan dengan chat.html:**
  - `$messageForm` → form dengan id `form-pesan` (chat.html baris 15)
  - `$messageFormInput` → input field untuk mengetik pesan (chat.html baris 16-21)
  - `$messageFormButton` → tombol "Kirim" (chat.html baris 22)
  - `$sendLocationButton` → tombol "Share Lokasi" (chat.html baris 24)
  - `$messages` → div untuk menampilkan semua pesan (chat.html baris 12)

### Templates (Baris 8-13)

```javascript
// Templates
const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationMessageTemplate = document.querySelector(
  "#locationMessage-template"
).innerHTML;
const sidebarTemplate = document.querySelector("#sidebar-template").innerHTML;
```

**Penjelasan:**

- **Fungsi:** Mengambil HTML template dari script tag di chat.html
- **Hubungan dengan chat.html:**

  - `messageTemplate` → script tag dengan id `message-template` (chat.html baris 27-35)
    ```html
    <script id="message-template" type="text/html">
      <div class="message">
        <p>
          <span class="message__name">{{username}}</span>
          <span class="message__meta">{{createdAt}}</span>
        </p>
        <p>{{message}}</p>
      </div>
    </script>
    ```
  - `locationMessageTemplate` → script tag dengan id `locationMessage-template` (chat.html baris 36-44)
  - `sidebarTemplate` → script tag dengan id `sidebar-template` (chat.html baris 45-53)

- Template ini digunakan oleh Mustache untuk render HTML dinamis

### Options (Baris 14-17)

```javascript
// Options
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});
```

**Penjelasan:**

- **Fungsi:** Mengambil parameter username dan room dari URL
- **Hubungan dengan index.html:**
  - index.html memiliki form (baris 11-20):
    ```html
    <form action="/chat.html">
      <label>Display name</label>
      <input type="text" name="username" placeholder="Display Name" required />
      <label>Room</label>
      <input type="text" name="room" placeholder="Room" required />
      <button>Bergabung ke Chat</button>
    </form>
    ```
  - Ketika form di-submit, browser akan redirect ke `chat.html?username=XXX&room=YYY`
  - Options ini kemudian digunakan untuk emit event "join" ke server (baris 99 chat.js)

---

## 5. Fungsi messages.js dan users.js

### File messages.js

**Fungsi:** Helper functions untuk membuat object pesan dengan format standar

```javascript
const generateMessage = (username, text) => {
  return {
    username,
    text,
    createdAt: new Date().getTime(),
  };
};

const generateLocationMessage = (username, url) => {
  return {
    username,
    url,
    createdAt: new Date().getTime(),
  };
};

module.exports = {
  generateMessage,
  generateLocationMessage,
};
```

**Penjelasan:**

- `generateMessage()`: Membuat object pesan dengan username, text, dan timestamp
- `generateLocationMessage()`: Membuat object pesan lokasi dengan username, url, dan timestamp
- `createdAt: new Date().getTime()`: Menghasilkan timestamp dalam milliseconds

**Hubungan dengan index.js:**

```javascript
// Import di baris 6-8
const {
  generateMessage,
  generateLocationMessage,
} = require("./utils/messages");

// Penggunaan di baris 32
socket.emit("pesan", generateMessage("Admin", "Selamat datang!"));

// Penggunaan di baris 33-37
socket.broadcast
  .to(user.room)
  .emit("pesan", generateMessage("Admin", `${user.username} telah bergabung`));

// Penggunaan di baris 51
io.to(user.room).emit("pesan", generateMessage(user.username, pesan));

// Penggunaan di baris 57-62
io.to(user.room).emit(
  "locationMessage",
  generateLocationMessage(
    user.username,
    `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`
  )
);
```

**Hubungan dengan chat.js:**

```javascript
// Menerima pesan yang di-generate oleh generateMessage (baris 38-46)
socket.on("pesan", (message) => {
  console.log(message);
  const html = Mustache.render(messageTemplate, {
    username: message.username, // dari generateMessage
    message: message.text, // dari generateMessage
    createdAt: moment(message.createdAt).format("H:mm"), // dari generateMessage
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

// Menerima lokasi yang di-generate oleh generateLocationMessage (baris 48-56)
socket.on("locationMessage", (message) => {
  const html = Mustache.render(locationMessageTemplate, {
    username: message.username, // dari generateLocationMessage
    url: message.url, // dari generateLocationMessage
    createdAt: moment(message.createdAt).format("H:mm"), // dari generateLocationMessage
  });
  $messages.insertAdjacentHTML("beforeend", html);
});
```

**Hubungan dengan HTML:**

- Data dari messages.js → dikirim ke client → dirender menggunakan template di chat.html
- Template Mustache di chat.html menggunakan data ini untuk menampilkan pesan

### File users.js

**Fungsi:** Mengelola data pengguna (CRUD operations untuk array users)

```javascript
const users = [];

// Menambah pengguna baru
const tambahPengguna = ({ id, username, room }) => {
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  if (!username || !room) {
    return { error: "Username dan room dibutuhkan!" };
  }

  const existingUser = users.find((user) => {
    return user.room === room && user.username === username;
  });

  if (existingUser) {
    return { error: "Username sudah digunakan!" };
  }

  const user = { id, username, room };
  users.push(user);
  return { user };
};

// Menghapus pengguna
const hapusPengguna = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

// Mengambil data pengguna berdasarkan id
const ambilPengguna = (id) => {
  return users.find((user) => user.id === id);
};

// Mengambil semua pengguna di room tertentu
const ambilPenggunaDariRoom = (room) => {
  room = room.trim().toLowerCase();
  return users.filter((user) => user.room === room);
};
```

**Hubungan dengan index.js:**

```javascript
// Import di baris 10-14
const {
  tambahPengguna,
  hapusPengguna,
  ambilPengguna,
  ambilPenggunaDariRoom,
} = require("./utils/users");

// Penggunaan tambahPengguna (baris 26)
const { error, user } = tambahPengguna({ id: socket.id, ...options });

// Penggunaan ambilPenggunaDariRoom (baris 39-40)
io.to(user.room).emit("roomData", {
  room: user.room,
  users: ambilPenggunaDariRoom(user.room),
});

// Penggunaan ambilPengguna (baris 46, 56)
const user = ambilPengguna(socket.id);

// Penggunaan hapusPengguna (baris 66)
const user = hapusPengguna(socket.id);
```

**Hubungan dengan chat.js:**

```javascript
// Menerima data users dari ambilPenggunaDariRoom (baris 58-62)
socket.on("roomData", ({ room, users }) => {
  const html = Mustache.render(sidebarTemplate, {
    room,
    users, // array users dari ambilPenggunaDariRoom
  });
  document.querySelector("#sidebar").innerHTML = html;
});
```

**Hubungan dengan chat.html:**

Template sidebar menggunakan data users (baris 45-53):

```html
<script id="sidebar-template" type="text/html">
  <h2 class="room-title">Ruang: {{room}}</h2>
  <h3 class="list-title">Anggota Ruang</h3>
  <ul class="users">
    {{#users}}
    <li>- {{username}}</li>
    {{/users}}
  </ul>
</script>
```

**Alur lengkap:**

1. User submit form di index.html → redirect ke chat.html dengan query params
2. chat.js emit "join" dengan username dan room
3. index.js menerima "join" → panggil tambahPengguna() dari users.js
4. users.js validasi dan tambah user ke array
5. index.js emit "roomData" dengan hasil ambilPenggunaDariRoom()
6. chat.js menerima "roomData" → render sidebar dengan Mustache
7. chat.html menampilkan list user di sidebar

---

## 6. Cara Aplikasi Mengirimkan Lokasi

### Alur Pengiriman Lokasi:

#### 1. User klik tombol "Share Lokasi" di chat.html (baris 24)

```html
<button id="kirim-lokasi">Share Lokasi</button>
```

#### 2. Event listener di chat.js menangkap click (baris 83-98)

```javascript
$sendLocationButton.addEventListener("click", (e) => {
  // Cek apakah browser mendukung geolocation
  if (!navigator.geolocation) {
    return alert("Browser anda tidak mendukung Geolocation");
  }

  // Disable tombol agar tidak diklik berulang kali
  $sendLocationButton.setAttribute("disabled", "disabled");

  // Minta permission dan ambil koordinat lokasi dari browser
  navigator.geolocation.getCurrentPosition((position) => {
    // Emit event ke server dengan data latitude dan longitude
    socket.emit(
      "kirimLokasi",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      () => {
        // Callback setelah server confirm
        $sendLocationButton.removeAttribute("disabled");
        console.log("Lokasi berhasil dikirim");
      }
    );
  });
});
```

**Penjelasan detail:**

- `navigator.geolocation`: API browser untuk mengakses GPS/lokasi device
- `getCurrentPosition()`: Method untuk mendapatkan posisi saat ini (async)
- Browser akan meminta permission user untuk akses lokasi
- `position.coords.latitude` dan `position.coords.longitude`: Koordinat GPS dalam format desimal
- `socket.emit("kirimLokasi", ...)`: Mengirim koordinat ke server

#### 3. Server menerima event di index.js (baris 55-63)

```javascript
socket.on("kirimLokasi", (coords, callback) => {
  const user = ambilPengguna(socket.id);

  // Emit ke semua user di room dengan Google Maps URL
  io.to(user.room).emit(
    "locationMessage",
    generateLocationMessage(
      user.username,
      `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`
    )
  );

  callback(); // Konfirmasi ke client pengirim
});
```

**Penjelasan:**

- Server menerima object `coords` berisi latitude dan longitude
- `ambilPengguna(socket.id)`: Ambil data user pengirim
- `generateLocationMessage()`: Buat object pesan lokasi dengan Google Maps URL
- Format URL: `https://www.google.com/maps?q=LATITUDE,LONGITUDE`
- `io.to(user.room).emit()`: Broadcast ke semua user di room yang sama
- `callback()`: Memberitahu client bahwa pengiriman sukses

#### 4. Client menerima event di chat.js (baris 48-56)

```javascript
socket.on("locationMessage", (message) => {
  console.log(message);

  // Render template lokasi dengan data dari server
  const html = Mustache.render(locationMessageTemplate, {
    username: message.username,
    url: message.url,
    createdAt: moment(message.createdAt).format("H:mm"),
  });

  // Tambahkan HTML ke container pesan
  $messages.insertAdjacentHTML("beforeend", html);
});
```

#### 5. Template di chat.html merender link lokasi (baris 36-44)

```html
<script id="locationMessage-template" type="text/html">
  <div class="message">
    <p>
      <span class="message__name">{{username}}</span>
      <span class="message__meta">{{createdAt}}</span>
    </p>
    <p><a href="{{url}}" target="_blank">Lokasi saya sekarang</a></p>
  </div>
</script>
```

**Hasil akhir:** Link "Lokasi saya sekarang" yang ketika diklik akan membuka Google Maps dengan pin di koordinat yang dikirim.

---

## 7. Perbedaan npm run dev vs npm run start vs node namafile.js

### Pada jobsheet ini, package.json memiliki:

```json
"scripts": {
  "start": "node src/index.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

### Penjelasan:

#### 1. `npm run start` atau `npm start`

- **Perintah:** Menjalankan script "start" dari package.json
- **Equivalent dengan:** `node src/index.js`
- **Fungsi:** Menjalankan aplikasi dalam mode production
- **Keuntungan:**
  - Tidak perlu mengingat path file yang harus dijalankan
  - Standar untuk semua project Node.js
  - Bisa menambahkan environment variables atau flag lain di script

#### 2. `npm run dev` (jika menggunakan nodemon)

- **Script ideal:** `"dev": "nodemon src/index.js"`
- **Fungsi:** Menjalankan aplikasi dengan auto-restart saat ada perubahan file
- **Keuntungan:**
  - Development lebih cepat (tidak perlu restart manual)
  - nodemon akan watch file changes dan auto-restart server
- **Perbedaan dengan npm start:**
  - **npm start**: Server berjalan terus, perlu restart manual jika ada perubahan kode
  - **npm run dev**: Server auto-restart setiap kali ada perubahan file (menggunakan nodemon)

#### 3. `node src/index.js`

- **Perintah:** Langsung menjalankan file JavaScript dengan Node.js
- **Fungsi:** Menjalankan aplikasi tanpa melalui npm scripts
- **Keuntungan:** Lebih direct, tidak tergantung package.json

### Kenapa menggunakan npm run?

**Pada jobsheet sebelumnya:** File sederhana, langsung `node namafile.js` sudah cukup

**Pada aplikasi yang kompleks:**

1. **Path yang rumit:** `src/index.js` bukan di root folder
2. **Dependencies banyak:** Butuh npm install dulu
3. **Environment variables:** Bisa set di script npm
4. **Development workflow:** Butuh tools seperti nodemon
5. **Standarisasi:** Semua developer pakai command yang sama
6. **Build process:** Bisa tambah transpiling, minifying, dll

### Contoh tambahan script yang bisa ditambahkan:

```json
"scripts": {
  "start": "node src/index.js",
  "dev": "nodemon src/index.js",
  "test": "jest",
  "build": "babel src -d dist"
}
```

---

## 8. Fungsi Socket Selain socket.on

### 1. socket.emit() - Mengirim event

#### Di client (chat.js):

```javascript
// Mengirim pesan (baris 71)
socket.emit("kirimPesan", pesan, (error) => {
  $messageFormButton.removeAttribute("disabled");
  $messageFormInput.value = "";
  $messageFormInput.focus();
  if (error) {
    return console.log(error);
  }
  console.log("Pesan berhasil dikirim");
});

// Mengirim lokasi (baris 87-96)
socket.emit(
  "kirimLokasi",
  {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  },
  () => {
    $sendLocationButton.removeAttribute("disabled");
    console.log("Lokasi berhasil dikirim");
  }
);

// Join room (baris 99-103)
socket.emit("join", { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = "/";
  }
});
```

**Penjelasan:**

- `socket.emit(eventName, data, callback)`: Mengirim event dari client ke server
- Parameter ketiga (callback) adalah acknowledgment function yang dipanggil server setelah menerima data

#### Di server (index.js):

```javascript
// Mengirim pesan ke satu client (baris 32)
socket.emit("pesan", generateMessage("Admin", "Selamat datang!"));
```

**Penjelasan:**

- `socket.emit()` di server mengirim event ke **satu client** yang spesifik (client yang terhubung dengan socket tersebut)

### 2. socket.broadcast.emit() - Broadcast kecuali pengirim

```javascript
// Broadcast ke semua kecuali pengirim (baris 33-37)
socket.broadcast
  .to(user.room)
  .emit("pesan", generateMessage("Admin", `${user.username} telah bergabung`));
```

**Penjelasan:**

- Mengirim event ke **semua client kecuali pengirim**
- `.to(user.room)`: Hanya ke client yang ada di room tertentu
- Digunakan untuk notifikasi "user telah bergabung" (tidak perlu dikirim ke user yang baru join)

### 3. io.emit() - Broadcast ke semua client

```javascript
// (Tidak digunakan di aplikasi ini, tapi bisa digunakan seperti ini:)
io.emit("pesan", generateMessage("Admin", "Server maintenance"));
```

**Penjelasan:**

- Mengirim event ke **semua client yang terhubung**
- Tidak peduli room atau koneksi spesifik
- Cocok untuk announcement global

### 4. io.to().emit() - Broadcast ke room tertentu

```javascript
// Emit ke semua client di room tertentu (baris 38-41)
io.to(user.room).emit("roomData", {
  room: user.room,
  users: ambilPenggunaDariRoom(user.room),
});

// Emit pesan ke room (baris 51)
io.to(user.room).emit("pesan", generateMessage(user.username, pesan));

// Emit lokasi ke room (baris 57-62)
io.to(user.room).emit(
  "locationMessage",
  generateLocationMessage(
    user.username,
    `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`
  )
);

// Emit notifikasi keluar ke room (baris 68-70)
io.to(user.room).emit(
  "pesan",
  generateMessage("Admin", `${user.username} telah keluar`)
);
```

**Penjelasan:**

- `io.to(roomName)`: Mengirim ke semua client di room tertentu (termasuk pengirim)
- Digunakan untuk chat group/room-based
- Semua user di room yang sama akan menerima event

### 5. socket.join() - Bergabung ke room

```javascript
// Join room (baris 31)
socket.join(user.room);
```

**Penjelasan:**

- Memasukkan socket/client ke dalam room tertentu
- Setelah join, semua event yang di-emit ke room akan diterima client ini
- Satu client bisa join multiple rooms

### 6. socket.on("disconnect") - Event built-in

```javascript
// Menangani disconnect (baris 65-77)
socket.on("disconnect", () => {
  const user = hapusPengguna(socket.id);
  if (user) {
    io.to(user.room).emit(
      "pesan",
      generateMessage("Admin", `${user.username} telah keluar`)
    );
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: ambilPenggunaDariRoom(user.room),
    });
  }
});
```

**Penjelasan:**

- Event special yang otomatis dipanggil ketika client disconnect (tutup browser, loss connection, dll)
- Tidak perlu client emit event ini, otomatis dari Socket.io
- Digunakan untuk cleanup (hapus user dari list, notifikasi ke user lain)

### Ringkasan Perbedaan:

| Fungsi                    | Tujuan                          | Digunakan Di                          |
| ------------------------- | ------------------------------- | ------------------------------------- |
| `socket.emit()`           | Kirim ke satu client            | Client → Server, Server → Satu Client |
| `socket.broadcast.emit()` | Kirim ke semua kecuali pengirim | Server → Semua kecuali satu           |
| `io.emit()`               | Kirim ke semua client           | Server → Semua Client                 |
| `io.to(room).emit()`      | Kirim ke semua di room          | Server → Room tertentu                |
| `socket.join()`           | Masuk ke room                   | Server (saat client join)             |
| `socket.on()`             | Dengarkan event                 | Client & Server                       |

---

## 9. Real-time Bidirectional Event-based Communication

### Definisi

**Real-time Bidirectional Event-based Communication** adalah komunikasi dua arah yang terjadi secara real-time (instant) antara client dan server menggunakan event sebagai mekanisme komunikasi.

### Komponen Utama:

#### 1. **Real-time** (Instant/Langsung)

Tidak ada delay atau polling, data langsung dikirim saat terjadi perubahan.

#### 2. **Bidirectional** (Dua Arah)

- Client bisa kirim ke Server
- Server bisa kirim ke Client
- Kedua pihak bisa mengirim kapan saja tanpa harus menunggu request

#### 3. **Event-based** (Berbasis Event)

Komunikasi menggunakan custom events, bukan hanya HTTP request/response

### Penjelasan dengan Baris Kode:

#### A. Bidirectional Communication (Komunikasi Dua Arah)

**Client → Server:**

```javascript
// chat.js baris 71 - Client mengirim event ke server
socket.emit("kirimPesan", pesan, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log("Pesan berhasil dikirim");
});
```

**Server → Client:**

```javascript
// index.js baris 51 - Server mengirim event ke client
io.to(user.room).emit("pesan", generateMessage(user.username, pesan));
```

**Penjelasan:**

- Client bisa mengirim kapan saja (tidak perlu polling)
- Server bisa mengirim kapan saja (tidak perlu ada request dari client)
- Ini berbeda dengan HTTP biasa yang harus request → response

#### B. Real-time Communication

**Contoh alur real-time saat user mengirim pesan:**

1. **User A mengetik dan submit pesan (0ms):**

```javascript
// chat.js baris 67-79
$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const pesan = e.target.elements.pesan.value;
  socket.emit("kirimPesan", pesan, (error) => {
    // Callback dipanggil setelah server terima
  });
});
```

2. **Server menerima pesan (< 50ms):**

```javascript
// index.js baris 45-53
socket.on("kirimPesan", (pesan, callback) => {
  const user = ambilPengguna(socket.id);
  const filter = new Filter();
  if (filter.isProfane(pesan)) {
    return callback("Pesan tidak boleh mengandung kata kasar");
  }
  // Langsung broadcast ke semua user di room
  io.to(user.room).emit("pesan", generateMessage(user.username, pesan));
  callback(); // Konfirmasi ke pengirim
});
```

3. **Semua user di room menerima pesan (< 100ms):**

```javascript
// chat.js baris 38-46
socket.on("pesan", (message) => {
  console.log(message);
  const html = Mustache.render(messageTemplate, {
    username: message.username,
    message: message.text,
    createdAt: moment(message.createdAt).format("H:mm"),
  });
  $messages.insertAdjacentHTML("beforeend", html);
  autoScroll();
});
```

**Penjelasan:**

- Dari user mengirim sampai semua user menerima < 100ms
- Tidak ada polling interval (cek setiap X detik)
- Tidak ada refresh page
- Instant update di semua client

#### C. Event-based Communication

**Custom Events yang digunakan:**

1. **Event "join"** - User bergabung ke room

```javascript
// Client emit (chat.js baris 99)
socket.emit("join", { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = "/";
  }
});

// Server listen (index.js baris 25-43)
socket.on("join", (options, callback) => {
  const { error, user } = tambahPengguna({ id: socket.id, ...options });
  if (error) {
    return callback(error);
  }
  socket.join(user.room);
  socket.emit("pesan", generateMessage("Admin", "Selamat datang!"));
  // ...
});
```

2. **Event "kirimPesan"** - User mengirim pesan

```javascript
// Client emit (chat.js baris 71)
socket.emit("kirimPesan", pesan, (error) => {
  /* ... */
});

// Server listen (index.js baris 45)
socket.on("kirimPesan", (pesan, callback) => {
  /* ... */
});
```

3. **Event "pesan"** - Server broadcast pesan

```javascript
// Server emit (index.js baris 51)
io.to(user.room).emit("pesan", generateMessage(user.username, pesan));

// Client listen (chat.js baris 38)
socket.on("pesan", (message) => {
  /* ... */
});
```

4. **Event "kirimLokasi"** - User share lokasi

```javascript
// Client emit (chat.js baris 87)
socket.emit("kirimLokasi", { latitude, longitude }, () => {
  /* ... */
});

// Server listen (index.js baris 55)
socket.on("kirimLokasi", (coords, callback) => {
  /* ... */
});
```

5. **Event "locationMessage"** - Server broadcast lokasi

```javascript
// Server emit (index.js baris 57)
io.to(user.room).emit("locationMessage", generateLocationMessage(...));

// Client listen (chat.js baris 48)
socket.on("locationMessage", (message) => { /* ... */ });
```

6. **Event "roomData"** - Update data room

```javascript
// Server emit (index.js baris 38)
io.to(user.room).emit("roomData", {
  room: user.room,
  users: ambilPenggunaDariRoom(user.room),
});

// Client listen (chat.js baris 58)
socket.on("roomData", ({ room, users }) => {
  /* ... */
});
```

7. **Event "disconnect"** - User keluar (built-in event)

```javascript
// Server listen (index.js baris 65)
socket.on("disconnect", () => {
  const user = hapusPengguna(socket.id);
  // ...
});
```

**Penjelasan:**

- Setiap aksi menggunakan event yang spesifik
- Event bisa membawa data (payload)
- Event bisa memiliki callback untuk acknowledgment
- Lebih fleksibel dari HTTP request/response biasa

### Perbedaan dengan HTTP Traditional:

| Aspek        | HTTP Traditional                   | Socket.io (Real-time)             |
| ------------ | ---------------------------------- | --------------------------------- |
| **Koneksi**  | Request → Response, lalu tutup     | Koneksi persisten (terus terbuka) |
| **Arah**     | Client → Server saja               | Client ↔ Server (dua arah)        |
| **Inisiasi** | Harus ada request dari client      | Server bisa push kapan saja       |
| **Update**   | Polling (cek berkala) atau refresh | Instant push saat ada update      |
| **Latency**  | Tinggi (polling interval)          | Rendah (< 100ms)                  |
| **Protokol** | HTTP/HTTPS                         | WebSocket (upgrade dari HTTP)     |

### Kesimpulan:

Aplikasi chat ini menggunakan **Socket.io** untuk implementasi real-time bidirectional event-based communication dimana:

1. **Real-time**: Pesan langsung terkirim tanpa delay atau polling
2. **Bidirectional**: Client dan server bisa mengirim data kapan saja
3. **Event-based**: Menggunakan custom events untuk komunikasi terstruktur

Ini memungkinkan pengalaman chat yang smooth dan instant seperti WhatsApp Web atau Telegram Web, berbeda dengan aplikasi berbasis HTTP traditional yang membutuhkan refresh atau polling.

---

**Nama:** [Isi nama Anda]
**NIM:** [Isi NIM Anda]
**Kelas:** [Isi kelas Anda]
