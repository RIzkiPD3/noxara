# Noxara — Digital Comic & Manga Reader

Noxara adalah web aplikasi pembaca komik dan manga digital modern yang responsif, berkecepatan tinggi, dan imersif, dibangun menggunakan **React**, **TypeScript**, **Vite**, **Tailwind CSS**, dan **Axios** dengan **Feature-Based Architecture**.

---

## 🚀 Tech Stack & Fitur Utama

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Design System
- **API Source**: Komiku Scrap REST API (`https://komiku-scrap.vercel.app`)
- **Key Features**:
  - 🔒 **Entrance Gate**: Perlindungan kata sandi portal pembaca (Default: `admin123`).
  - 📚 **Comic Catalog & Library**: Eksplorasi seluruh koleksi komik dengan pencarian instan, filter tipe (Manga/Manhwa/Manhua), urutan rilis, dan pagination.
  - 📂 **Genre Directory**: Katalog 49+ genre komik terlengkap dengan penyaringan cepat.
  - 📖 **Immersive Vertical Comic Reader**: Pengalaman membaca komik vertikal seamless tanpa distraksi frame border.
  - 🔖 **Bookmark System**: Koleksi komik tersimpan secara persisten via `localStorage` (Single Source of Truth).

---

## 🛠️ Prasyarat & Lingkungan

- **Node.js**: `v18.x` atau lebih baru
- **Package Manager**: `npm` (v9+)

---

## ⚙️ Konfigurasi Environment Variables

Buat file `.env` di direktori utama proyek berdasarkan contoh pada `.env.example`:

```env
# Base URL untuk Komiku Scrap REST API
VITE_API_BASE_URL=https://komiku-scrap.vercel.app

# Password untuk Entrance Gate Portal Noxara (Default: admin123)
VITE_ENTRANCE_PASSWORD=admin123
```

---

## 💻 Pengembangan Lokal (Local Development)

1. **Install Dependensi**:
   ```bash
   npm install
   ```

2. **Jalankan Server Development**:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:5173`.

---

## 📦 Build Produksi & Preview

1. **Memeriksa Type & Build Produksi**:
   ```bash
   npm run build
   ```
   Output build akan dihasilkan di folder `dist/`.

2. **Pratinjau Hasil Build Produksi**:
   ```bash
   npm run preview
   ```

---

## 🌐 Panduan Deployment ke Vercel

1. **Push Repositori ke GitHub / GitLab / Bitbucket**:
   Pastikan seluruh perubahan terbaru pada branch utama sudah ter-push.

2. **Import Proyek di Dashboard Vercel**:
   - Buka [Vercel Dashboard](https://vercel.com/dashboard) lalu klik **"Add New"** &rarr; **"Project"**.
   - Hubungkan dan pilih repositori `noxara`.

3. **Pengaturan Framework & Build**:
   - **Framework Preset**: Vite (terdeteksi otomatis).
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Pengaturan Environment Variables**:
   Di bagian **Environment Variables**, tambahkan variabel berikut:
   - `VITE_API_BASE_URL` = `https://komiku-scrap.vercel.app`
   - `VITE_ENTRANCE_PASSWORD` = `admin123`

5. **Deploy**:
   - Klik **"Deploy"**. Vercel akan secara otomatis menginstal dependensi, memverifikasi build, dan menerbitkan URL produksi.

---

## 📄 Lisensi

Noxara &copy; {new Date().getFullYear()} — Platform Baca Komik & Manga Digital.
