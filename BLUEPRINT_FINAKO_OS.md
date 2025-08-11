# Finako OS Blueprint & Roadmap

## 1. Visi & Misi
Finako OS bertujuan menjadi super app ERP untuk UMKM Indonesia yang selama ini tidak terjangkau pemain besar karena harga mahal. Finako menawarkan solusi digitalisasi bisnis dengan harga terjangkau dan kekuatan AI untuk memangkas pekerjaan finance, akuntansi, AR/AP, dan HRD.

## 2. Prioritas Pengembangan Modul (Roadmap)
1. **Produk & Stok** (MVP)
   - Manajemen produk tunggal, varian, komposit/assembly
   - Multi-gudang, outlet, transfer stok, mutasi stok
   - Minimum stok, notifikasi, barcode/QR, import/export
2. **POS & Transaksi**
   - Penjualan, pembayaran multi-metode, kasir mobile/desktop
3. **Pembelian & Supplier**
   - Purchase order, penerimaan barang, hutang supplier
4. **Pelanggan & Piutang**
   - Data pelanggan, penjualan kredit, pelunasan piutang
5. **Laporan & Analitik**
   - Penjualan, stok, piutang, performa produk, laporan otomatis
6. **Akuntansi Dasar**
   - Jurnal otomatis, COA, buku besar (tahap berikutnya)
7. **HR/Payroll**
   - Karyawan, absensi, cuti, payroll (tahap berikutnya)
8. **AI & Otomasi**
   - Insight stok, prediksi, rekomendasi, pengingat otomatis

## 3. Stack Technology
- **Frontend:** Vue 3, Pinia, Tailwind CSS, DaisyUI, PWA, mobile-first, custom UI/UX, brand color Green Teal
- **Backend:** Supabase (PostgreSQL, API, Auth)
- **Infrastruktur:** GCP (Google Cloud Platform)
- **Payment:** Integrasi Midtrans/Xendit API, manual (cash, transfer, QR statis)

## 4. Arsitektur Frontend
- Folder `views/` per modul, penjaga device (MobileView/ DesktopView)
- Logika bisnis di `composables/` (misal: usePos.js, useProduk.js)
- Store global dengan Pinia
- Styling dengan Tailwind, DaisyUI theme custom (finako-green)

## 5. Standar Kualitas
- Pengujian manual oleh owner
- Dokumentasi API & user manual
- Audit log & RLS untuk keamanan data multi-tenant

## 6. Pengembangan Lanjutan
- Modul akuntansi penuh (jurnal, COA, buku besar)
- Modul HR/payroll (karyawan, absensi, cuti, payroll)
- Integrasi marketplace & API eksternal (opsional)
- Otomasi workflow & AI insight lebih lanjut

## 7. Catatan Database
- Skema sudah sangat siap untuk retail, F&B, distribusi
- Perlu penambahan tabel untuk akuntansi penuh & HR
- RLS & audit log sudah diterapkan
- Index & trigger sudah optimal

---

Dokumentasi ini menjadi acuan pengembangan Finako OS tahap awal hingga lanjut. Silakan update sesuai kebutuhan bisnis dan feedback user.
