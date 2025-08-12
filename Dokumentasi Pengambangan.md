
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
   - ✅ Background dengan elemen visual keuangan dan bisnis
   - ✅ Desain modern dengan efek glassmorphism
   
   **Files Created/Updated:**
   - `src/views/auth/LoginView.vue` (NEW) - Login page lengkap dengan UI/UX advanced
   - `src/router/index.js` - Added /login route
   - `postcss.config.cjs` - Fixed Tailwind CSS configuration
   
   **Additional Improvements:**
   - Perbaikan konfigurasi Tailwind CSS dan DaisyUI
   - Implementasi efek visual seperti animasi gradien
   - Background dengan elemen-elemen bisnis dan keuangan
   - Antarmuka dengan desain modern dan menarik
   - Integrasi dengan sosial login (Google, Facebook)

4. **Create Register Page** ✅ **SELESAI - 11 Agustus 2025**
   - ✅ Buat views/auth/RegisterView.vue dengan responsive design
   - ✅ Form: name, email, password, confirm password dengan validasi
   - ✅ Password strength indicator dan validasi kecocokan password
   - ✅ Terms & conditions checkbox
   - ✅ Integration dengan Pinia auth store
   - ✅ Background dengan elemen visual keuangan dan bisnis
   - ✅ Trial info banner (30 hari gratis)
   - ✅ Link ke halaman login
   - ✅ Loading states dan error messages
   
   **Files Created/Updated:**
   - `src/views/auth/RegisterView.vue` (NEW) - Register page lengkap dengan UI/UX advanced
   - `src/router/index.js` - Added /register route

5. **Create Forgot Password Page** ✅ **SELESAI - 11 Agustus 2025**
   - ✅ Buat views/auth/ForgotPasswordView.vue
   - ✅ Form reset password via email
   - ✅ Success & error messages
   - ✅ UI dengan konsistensi desain seperti login/register
   - ✅ Validasi form dan handling status
   
   **Files Created/Updated:**
   - `src/views/auth/ForgotPasswordView.vue` (NEW) - Forgot password page dengan UI konsisten
   - `src/router/index.js` - Added /forgot-password route

### Phase 2B: Legal Pages
6. **Create Legal Pages** ✅ **SELESAI - 11 Agustus 2025**
   - ✅ Buat views/legal/TermsConditionsView.vue untuk halaman Syarat & Ketentuan
   - ✅ Buat views/legal/PrivacyPolicyView.vue untuk halaman Kebijakan Privasi
   - ✅ UI dengan desain konsisten dengan halaman auth
   - ✅ Konten komprehensif tentang syarat penggunaan dan privasi
   - ✅ Link navigasi di halaman Register
   
   **Files Created/Updated:**
   - `src/views/legal/TermsConditionsView.vue` (NEW) - Halaman Syarat & Ketentuan
   - `src/views/legal/PrivacyPolicyView.vue` (NEW) - Halaman Kebijakan Privasi
   - `src/router/index.js` - Added /terms-conditions dan /privacy-policy routes
   - `src/views/auth/RegisterView.vue` - Updated links ke halaman legal

### Phase 2C: Dashboard Creation
7. **Create Dashboard Layout & UI** ✅ **SELESAI - 12 Agustus 2025**
   - ✅ Buat views/dashboard/DashboardView.vue dengan layout responsive
   - ✅ Sidebar navigation dengan menu modul (Desktop)
   - ✅ Mobile header dengan dropdown navigation
   - ✅ Trial status indicator dengan countdown days
   - ✅ User profile section dengan avatar dan logout options
   - ✅ Welcome card dengan brand identity
   - ✅ Quick stats grid (Produk, Transaksi, Pelanggan, Penjualan)
   - ✅ Module cards dengan "Coming Soon" badges
   - ✅ Quick actions section dengan disabled buttons
   - ✅ Glassmorphism theme konsisten dengan auth pages
   - ✅ Visible logout buttons (mobile & desktop)
   
   **Files Created/Updated:**
   - `src/views/dashboard/DashboardView.vue` (UPDATED) - Dashboard utama lengkap
   - `src/router/index.js` - Added /dashboard route dengan redirect dari root
   
   **Dashboard Features:**
   - Responsive design untuk mobile dan desktop
   - Trial status: menampilkan sisa hari trial (mock: 28 hari)
   - Navigation structure untuk modul future (Produk, POS, Pembelian, dll)
   - User management dengan logout functionality
   - Modern UI dengan Tailwind CSS + DaisyUI theme
   - Placeholder untuk statistik dan quick actions

8. **Router Integration & Basic Guards** ✅ **SELESAI - 12 Agustus 2025**
   - ✅ Update router dengan dashboard route
   - ✅ Home redirect: `/` → `/dashboard`
   - ✅ Basic authentication guards (requiresAuth, requiresGuest)
   - ✅ Auto auth initialization dalam router guards
   - ✅ Login success redirect ke dashboard
   - ✅ Protected routes untuk dashboard dan POS
   - ✅ Guest routes untuk auth pages dengan redirect logic
   
   **Files Updated:**
   - `src/router/index.js` - Added dashboard route, redirect logic, dan basic guards
   
   **Auth Flow Integration:**
   - User belum login → redirect ke `/login`
   - Login berhasil → redirect ke `/dashboard`
   - User sudah login di auth pages → redirect ke `/dashboard`
   - Dashboard dan POS dilindungi dengan `requiresAuth`

### Phase 3: Router & Guards Setup ✅ **SELESAI - 12 Agustus 2025**
9. **Update Router Configuration** ✅ **SELESAI**
   - ✅ Add auth routes: /login, /register, /register-success, /forgot-password
   - ✅ Add onboarding route: /onboarding dengan auth protection
   - ✅ Add legal routes: /terms-conditions, /privacy-policy
   - ✅ Update route meta properties untuk guard control
   - ✅ Implement beforeEach guard untuk proteksi rute
   
   **Files Updated:**
   - `src/router/index.js` - Complete router configuration dengan guards

10. **Create Route Guards** ✅ **SELESAI**
    - ✅ requiresAuth guard - cek login status dan redirect ke /login
    - ✅ requiresGuest guard - redirect authenticated users ke dashboard
    - ✅ requiresOnboarding guard - redirect ke onboarding jika user belum setup business
    - ✅ checkUserHasCompletedOnboarding helper - cek business_users table untuk onboarding status
    - ✅ Integration dengan auth store initialization
    
    **Router Guards Implementation:**
    - Authentication protection untuk dashboard, POS, dan protected routes
    - Guest protection untuk auth pages (login, register) dengan smart redirect
    - Onboarding flow protection dengan business_users table checking
    - Auto auth initialization dalam router beforeEach

### Phase 3B: Registration & Onboarding Flow ✅ **SELESAI - 12 Agustus 2025**
11. **Database Triggers & Auto-Assignment** ✅ **SELESAI**
    - ✅ Create handle_new_user() trigger function untuk user registration
    - ✅ Auto profile creation di public.users table saat user register
    - ✅ Auto "Finako Trial" subscription assignment (30 hari)
    - ✅ Trigger ON DELETE untuk cascade deletion
    - ✅ FK CASCADE constraints untuk automatic cleanup
    
    **Database Integration:**
    - User registration trigger: auth.users → public.users + trial subscription
    - Business creation dengan owner assignment ke business_users table
    - Role templates integration (Owner, Manager, Cashier, Admin)

12. **Register Success Page** ✅ **SELESAI**
    - ✅ Create views/auth/RegisterSuccessView.vue dengan design konsisten
    - ✅ Success message dengan trial activation info
    - ✅ Trial benefits display (30 hari, 1 bisnis, 3 users, 100 produk)
    - ✅ Next steps instructions yang clear
    - ✅ "Lanjut ke Login" button untuk continue flow
    - ✅ Link ke support dan legal pages
    
    **User Flow Integration:**
    - Register → Auto logout → Success page → Manual login → Onboarding

13. **Onboarding Wizard** ✅ **SELESAI**
    - ✅ Create views/onboarding/OnboardingView.vue dengan 5-step wizard
    - ✅ Step 1: Welcome dengan trial info dan feature preview
    - ✅ Step 2: Business Info form (nama, tipe, alamat, deskripsi)
    - ✅ Step 3: Industry Selection (10+ industri dengan icons)
    - ✅ Step 4: Features Selection (6 modul: POS, Inventory, Accounting, etc)
    - ✅ Step 5: Complete dengan summary dan save ke database
    - ✅ Progress bar dengan step indicators dan animations
    - ✅ Form validation dan navigation controls
    - ✅ Responsive design untuk mobile dan desktop
    
    **Business Setup Integration:**
    - Business data save ke public.businesses table
    - Auto owner role assignment ke business_users table
    - Selected features tracking untuk future implementation
    - Integration dengan user's active subscription

14. **Business Management Composable** ✅ **SELESAI**
    - ✅ Create src/composables/useBusiness.js untuk business operations
    - ✅ createBusiness() - Create business dengan owner assignment
    - ✅ getUserBusinesses() - Get user's businesses dengan roles
    - ✅ getUserBusinessRoles() - Get user roles di semua businesses
    - ✅ getUserActiveSubscription() - Get current trial/subscription
    - ✅ Error handling dan logging yang comprehensive
    
    **Database Integration:**
    - Integration dengan businesses, business_users, role_templates tables
    - Supabase client integration dengan proper error handling
    - Auto owner role assignment menggunakan "Owner" role template

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
