
# Dokumentasi Pengembangan: Alur Auth, Trial, dan Payment Finako OS

## 1. Alur Auth (Authentication)
1. User membuka aplikasi Finako OS (bukan landing page).
2. Jika belum login, user diarahkan ke halaman `/login` atau `/register`.
3. User dapat mendaftar dengan email & password (menggunakan Supabase Auth).
4. Setelah registrasi, user otomatis mendapatkan masa trial (misal 14/30 hari).
5. Setelah login, session/token disimpan (localStorage/cookie).
6. Jika user sudah login, diarahkan ke dashboard atau onboarding.

## 2. Alur Trial (Free Trial)
1. Saat user baru daftar, sistem membuat record subscription trial di tabel `user_subscriptions` (plan trial, status active, ends_at = hari ini + masa trial).
2. Selama trial aktif, user bisa akses semua/fitur tertentu.
3. Di dashboard, tampilkan info sisa hari trial dan CTA "Pilih Paket".
4. Jika trial habis (`ends_at` < hari ini), user otomatis diarahkan ke halaman `/plans` atau `/payment`.
5. Selama trial habis dan belum berlangganan, **akses ke fitur utama diblokir**.

## 3. Alur Payment & Berlangganan
1. Setelah trial habis, user wajib memilih paket dan melakukan pembayaran.
2. User memilih paket di halaman `/plans`.
3. User melakukan pembayaran (payment gateway/manual transfer/QRIS).
4. Setelah pembayaran sukses, subscription user diupdate ke paket berbayar (status active, ends_at sesuai masa langganan).
5. User kembali bisa akses semua fitur utama.
6. Jika masa langganan habis, user kembali diarahkan ke halaman `/plans` untuk perpanjangan.

## 4. Middleware/Guard (Router)
- Setiap akses fitur utama, sistem cek status login dan subscription.
- Jika trial/berlangganan aktif: akses diperbolehkan.
- Jika trial/berlangganan habis: redirect ke `/plans` atau `/payment`.

## 5. Best Practice
- Trial dulu, baru bayar (mengurangi friction, meningkatkan konversi).
- Payment hanya diminta saat trial habis atau ingin upgrade.
- Semua logika status trial/berlangganan cukup di-handle di middleware/router dan dashboard.
