# CODEX.md

Panduan ringkas untuk Codex atau maintainer berikutnya saat bekerja di project `todolistapp`.

## Ringkasan Project

`todolistapp` adalah aplikasi todo list berbasis React, TypeScript, Vite, dan IndexedDB. Aplikasi berjalan sepenuhnya di browser, menyimpan data secara lokal, dan tidak memiliki backend.

Fitur utama:

- Tambah, edit, hapus, dan tandai todo sebagai selesai.
- Filter todo: `all`, `active`, `completed`, dan kategori.
- Metadata todo: deskripsi, kategori, tanggal jatuh tempo, prioritas `low | medium | high`.
- Statistik todo aktif, selesai, dan total.
- Penyimpanan offline menggunakan IndexedDB.

## Stack

- React `19.2.6`
- React DOM `19.2.6`
- TypeScript `~6.0.2`
- Vite `8.0.12`
- ESLint `10.3.0`
- IndexedDB native browser API

## Command Penting

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

Catatan:

- `npm run dev` menjalankan Vite dev server.
- `npm run build` menjalankan TypeScript build lebih dulu, lalu Vite production build.
- `npm run lint` memakai konfigurasi ESLint flat config di `eslint.config.js`.

## Struktur File

```text
src/
  App.tsx
  App.css
  index.css
  main.tsx
  components/
    AddTodo.tsx
    TodoItem.tsx
    TodoList.tsx
  services/
    indexedDB.ts
public/
  favicon.svg
  icons.svg
```

File dokumentasi yang sudah ada:

- `README.md`: dokumentasi umum pengguna.
- `PROJECT_DOCUMENTATION.md`: dokumentasi teknis panjang.
- `GITHUB_SETUP.md`: panduan setup/deploy GitHub.
- `FSD.docx`: dokumen Word yang sudah ada di repo.

## Arsitektur Aplikasi

`App.tsx` adalah state owner utama:

- Menyimpan `todos`, `filter`, dan `isLoading`.
- Memuat todo dari IndexedDB.
- Menangani operasi tambah, update, hapus, dan clear completed.
- Mengoper callback ke komponen anak.

Komponen:

- `AddTodo.tsx`: form tambah todo dengan opsi detail yang bisa diexpand.
- `TodoList.tsx`: filtering, grouping kategori, empty state, statistik, dan rendering list.
- `TodoItem.tsx`: tampilan satu todo, edit inline, toggle complete, delete.
- `indexedDB.ts`: service IndexedDB dan tipe `Todo`.

Alur data:

```text
User action
  -> component handler
  -> callback ke App
  -> todoDatabase method
  -> IndexedDB
  -> update React state
  -> UI render ulang
```

## Data Model

```ts
export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category?: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: number;
  updatedAt: number;
}
```

IndexedDB:

- Database: `todolistDB`
- Version: `1`
- Object store: `todos`
- Key path: `id`
- Indexes: `completed`, `priority`, `createdAt`

## Konvensi Implementasi

- Ikuti pola komponen fungsional React dengan hooks.
- Pertahankan tipe `Todo` sebagai sumber kebenaran untuk shape data.
- Untuk operasi data, gunakan `todoDatabase` dari `src/services/indexedDB.ts`.
- Jangan menambah state global baru kecuali fitur benar-benar membutuhkannya.
- Styling saat ini berbasis CSS biasa di `App.css` dan `index.css`; jangan menambah framework styling tanpa alasan kuat.
- Pertahankan app tetap offline-first dan tanpa backend.
- Bila menambah fitur yang memengaruhi data, pertimbangkan migrasi IndexedDB karena versi database saat ini masih `1`.

## Catatan Kode Saat Ini

- Beberapa teks UI dan dokumentasi tampak mengalami masalah encoding karakter. Jika memperbaiki UI copy, pastikan file tersimpan sebagai UTF-8 dan cek tampilan browser.
- `App.tsx` memanggil `loadTodos()` lalu `todoDatabase.init()` di `useEffect`. Karena setiap method service akan memanggil `init()` jika database belum siap, ini tetap berjalan, tetapi pemanggilan `init()` eksplisit setelah `loadTodos()` bersifat redundant.
- `TodoItem.tsx` belum mengedit prioritas saat mode edit; saat ini prioritas hanya bisa dipilih ketika membuat todo.
- `clearAllTodos()` ada di service, tetapi tombol "Clear Completed Tasks" menghapus satu per satu agar hanya completed todo yang hilang.
- ID todo dibuat dengan `Date.now().toString()`. Ini cukup untuk penggunaan ringan, tetapi bisa collision jika beberapa todo dibuat sangat cepat.

## Ide Pengembangan Lanjutan

- Perbaiki encoding teks dan icon di seluruh UI/dokumentasi.
- Tambahkan search todo.
- Tambahkan edit priority di `TodoItem`.
- Tambahkan confirm sebelum delete atau clear completed.
- Tambahkan export/import JSON untuk backup data lokal.
- Tambahkan test untuk service IndexedDB dan interaksi komponen utama.

## Checklist Sebelum Selesai Mengubah Kode

```bash
npm run lint
npm run build
```

Jika mengubah UI, jalankan dev server dan cek minimal:

- Desktop viewport.
- Mobile viewport sekitar 375px sampai 430px.
- Flow tambah todo, edit todo, delete todo, filter, dan clear completed.
