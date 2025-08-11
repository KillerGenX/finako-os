
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

## Langkah - Langkah Pembuatan AUTH

### Phase 1: Setup Auth Foundation
1. **Setup Supabase Configuration** ✅ **SELESAI - 11 Agustus 2025**
   - ✅ Configure Supabase client dengan environment variables (sudah ada di .env)
   - ✅ Update useSupabase.js dengan auth methods (dibuat file terpisah useAuth.js)
   - ✅ Test koneksi ke Supabase (semua test berhasil - client, env vars, database, auth methods)
   
   **Files Created/Updated:**
   - `src/composables/useAuth.js` (NEW) - Auth composable dengan methods lengkap
   - `package.json` - Added @supabase/supabase-js dependency
   
   **Test Results:**
   - ✅ Supabase client terinisialisasi
   - ✅ Environment variables tersedia  
   - ✅ Database connection berhasil
   - ✅ Auth methods dapat diakses

2. **Create Auth Store (Pinia)** ✅ **SELESAI - 11 Agustus 2025**
   - ✅ Install Pinia state management
   - ✅ Buat stores/auth.js untuk manage auth state
   - ✅ State: user, loading, isAuthenticated, error, isInitialized
   - ✅ Actions: login, register, logout, checkAuth, resetPassword, clearError, initializeAuth
   - ✅ Getters: currentUser, isLoggedIn, isAuthenticated
   - ✅ Integration dengan useAuth composable
   - ✅ Auto initialize auth state saat app dimuat
   
   **Files Created/Updated:**
   - `src/stores/auth.js` (NEW) - Pinia auth store dengan methods lengkap
   - `src/main.js` - Added Pinia setup dan auto initialize auth
   - `package.json` - Added pinia dependency

### Phase 2: Create Auth Pages
3. **Create Login Page** ✅ **SELESAI - 11 Agustus 2025**
   - ✅ Buat views/auth/LoginView.vue dengan responsive design
   - ✅ Form: email, password, remember me dengan validation
   - ✅ Validation & error handling client-side dan server-side
   - ✅ Link ke register & forgot password
   - ✅ Integration dengan Pinia auth store
   - ✅ Logo Finako dan brand identity
   - ✅ Trial info banner (30 hari gratis)
   - ✅ Tailwind CSS + DaisyUI + finako-green theme
   - ✅ Password show/hide toggle
   - ✅ Loading states dan error messages
   
   **Files Created/Updated:**
   - `src/views/auth/LoginView.vue` (NEW) - Login page lengkap dengan UI/UX advanced
   - `src/router/index.js` - Added /login route

4. **Create Register Page** 🔄 **NEXT STEP**
   - Buat views/auth/RegisterView.vue
   - Form: name, email, password, confirm password
   - Terms & conditions checkbox
   - Auto create trial subscription setelah register

5. **Create Forgot Password Page**
   - Buat views/auth/ForgotPasswordView.vue
   - Form reset password via email
   - Success & error messages

### Phase 3: Router & Guards Setup
6. **Update Router Configuration**
   - Add auth routes: /login, /register, /forgot-password
   - Buat router/guards.js untuk auth middleware
   - Implement beforeEach guard untuk proteksi rute

7. **Create Route Guards**
   - requiresAuth guard - cek login status
   - requiresGuest guard - redirect jika sudah login
   - requiresSubscription guard - cek trial/subscription status

### Phase 4: Subscription Management
8. **Create Subscription Store**
   - Buat stores/subscription.js
   - State: currentPlan, trialEndsAt, isTrialActive
   - Actions: checkSubscription, createTrial, updateSubscription
   - Getters: daysLeft, isExpired, canAccess

9. **Create Trial Management**
   - Auto create trial saat user register
   - Function untuk hitung sisa hari trial
   - Check trial status di setiap route

### Phase 5: UI Components & Pages
10. **Create Subscription Status Component**
    - Component untuk tampilkan status trial/subscription
    - Trial countdown timer
    - CTA button "Pilih Paket" atau "Perpanjang"

11. **Create Plans Page**
    - Buat views/subscription/PlansView.vue
    - Display paket berlangganan available
    - Pricing cards dengan features comparison
    - Integration dengan payment gateway

12. **Create Payment Pages**
    - Buat views/payment/PaymentView.vue
    - Payment methods: Transfer, QRIS, Gateway
    - Payment confirmation & success page

### Phase 6: Integration & Testing
13. **Database Integration**
    - Setup tabel user_subscriptions di Supabase
    - RLS policies untuk security
    - Functions untuk manage subscription status

14. **Middleware Integration**
    - Integrate semua guards dengan router
    - Test alur: register → trial → expired → payment
    - Handle edge cases & error scenarios

15. **UI/UX Polish**
    - Loading states pada semua auth actions
    - Toast notifications untuk feedback
    - Responsive design untuk mobile
    - Error boundaries & fallback UI

### Phase 7: Advanced Features
16. **Session Management**
    - Persistent login dengan remember me
    - Auto logout saat token expired
    - Refresh token handling

17. **Security Enhancements**
    - Email verification flow
    - Password strength requirements
    - Rate limiting untuk login attempts
    - CSRF protection

### Phase 8: Testing & Deployment
18. **Testing Auth Flow**
    - Unit tests untuk auth store
    - Integration tests untuk auth pages
    - E2E tests untuk complete auth flow

19. **Performance Optimization**
    - Lazy loading auth pages
    - Optimize bundle size
    - Cache user session appropriately

20. **Documentation & Deployment**
    - Update README dengan auth flow
    - Environment setup documentation
    - Deploy to staging untuk testing
