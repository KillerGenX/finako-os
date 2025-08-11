
# Finako OS

ERP & Super App untuk UMKM Indonesia

## Stack
- Vue 3 + Vite + Pinia + Tailwind CSS + DaisyUI (frontend)
- Supabase (PostgreSQL, API, Auth)
- Integrasi Midtrans/Xendit (opsional, payment)

## Struktur Folder
- `src/views/` : Halaman utama (POS, produk, dsb)
- `src/composables/` : Logic reusable (Supabase, POS, produk, dsb)
- `src/stores/` : Pinia store (state management)
- `src/components/` : Komponen UI

## Setup
1. Copy `.env.example` ke `.env` dan isi dengan kredensial Supabase Anda
2. Jalankan:
	```bash
	npm install
	npm run dev
	```

## Dokumentasi
Lihat `BLUEPRINT_FINAKO_OS.md` untuk roadmap dan arsitektur
