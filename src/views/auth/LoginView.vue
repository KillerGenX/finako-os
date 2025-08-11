<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-base-300 px-4 py-8 relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute top-0 left-0 w-full h-32 bg-primary/10 -skew-y-2"></div>
    <div class="absolute bottom-0 right-0 w-full h-24 bg-accent/5 skew-y-2"></div>
    
    <!-- Animated Background Finance Elements -->
    <div class="absolute top-[5%] right-[10%] w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-pulse"></div>
    <div class="absolute bottom-[5%] left-[10%] w-80 h-80 rounded-full bg-accent/5 blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
    <div class="absolute top-[40%] left-[25%] w-60 h-60 rounded-full bg-success/5 blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
    
   
    
    <!-- Decorative Finance Elements -->
    <!-- Invoice/Receipt Element -->
    <div class="absolute top-10 right-10 opacity-15 hidden lg:block">
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Invoice Background -->
        <rect x="15" y="10" width="70" height="80" stroke="currentColor" stroke-width="2" />
        <!-- Invoice Header -->
        <rect x="15" y="10" width="70" height="15" stroke="currentColor" stroke-width="2" />
        <!-- Invoice Lines -->
        <path d="M25 40 L75 40" stroke="currentColor" stroke-width="1" />
        <path d="M25 50 L75 50" stroke="currentColor" stroke-width="1" />
        <path d="M25 60 L75 60" stroke="currentColor" stroke-width="1" />
        <path d="M25 70 L55 70" stroke="currentColor" stroke-width="1" />
        <!-- Total Line -->
        <path d="M25 80 L75 80" stroke="currentColor" stroke-width="2" />
        <!-- Logo Placeholder -->
        <circle cx="30" cy="18" r="5" stroke="currentColor" stroke-width="1" />
      </svg>
    </div>
    
    <!-- Chart/Analytics Element -->
    <div class="absolute bottom-10 left-10 opacity-15 hidden lg:block">
      <svg width="110" height="90" viewBox="0 0 110 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Base Grid -->
        <path d="M10 10 L10 70 L100 70" stroke="currentColor" stroke-width="1.5" />
        <!-- Y-axis ticks -->
        <path d="M8 20 L12 20" stroke="currentColor" stroke-width="1" />
        <path d="M8 30 L12 30" stroke="currentColor" stroke-width="1" />
        <path d="M8 40 L12 40" stroke="currentColor" stroke-width="1" />
        <path d="M8 50 L12 50" stroke="currentColor" stroke-width="1" />
        <path d="M8 60 L12 60" stroke="currentColor" stroke-width="1" />
        <!-- X-axis ticks -->
        <path d="M20 68 L20 72" stroke="currentColor" stroke-width="1" />
        <path d="M40 68 L40 72" stroke="currentColor" stroke-width="1" />
        <path d="M60 68 L60 72" stroke="currentColor" stroke-width="1" />
        <path d="M80 68 L80 72" stroke="currentColor" stroke-width="1" />
        <!-- Line Chart -->
        <path d="M10 60 L30 40 L50 50 L70 25 L90 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        <!-- Data Points -->
        <circle cx="30" cy="40" r="2" fill="currentColor" />
        <circle cx="50" cy="50" r="2" fill="currentColor" />
        <circle cx="70" cy="25" r="2" fill="currentColor" />
        <circle cx="90" cy="15" r="2" fill="currentColor" />
      </svg>
    </div>
    
    <!-- Financial Growth/Investment Element -->
    <div class="absolute top-30 left-20 opacity-15 hidden lg:block animate-pulse">
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Growth Chart Background -->
        <rect x="10" y="20" width="60" height="40" stroke="currentColor" stroke-width="1" />
        <!-- Growth Arrow -->
        <path d="M10 60 L70 20" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        <path d="M60 20 L70 20 L70 30" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <!-- Coin Stacks -->
        <circle cx="20" cy="50" r="6" stroke="currentColor" stroke-width="1.5" />
        <circle cx="20" cy="40" r="6" stroke="currentColor" stroke-width="1.5" />
        <circle cx="40" cy="45" r="6" stroke="currentColor" stroke-width="1.5" />
        <circle cx="40" cy="35" r="6" stroke="currentColor" stroke-width="1.5" />
        <circle cx="40" cy="25" r="6" stroke="currentColor" stroke-width="1.5" />
      </svg>
    </div>
    
    <!-- Cash Flow/Wallet Element -->
    <div class="absolute bottom-25 right-20 opacity-15 hidden lg:block animate-pulse" style="animation-delay: 1.5s;">
      <svg width="90" height="70" viewBox="0 0 90 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Wallet -->
        <path d="M10 15 L70 15 L70 60 L10 60 Z" stroke="currentColor" stroke-width="2" />
        <!-- Card Slot -->
        <rect x="50" y="30" width="30" height="20" stroke="currentColor" stroke-width="1.5" />
        <!-- Card Chip -->
        <rect x="55" y="35" width="8" height="6" stroke="currentColor" stroke-width="1" />
        <!-- Cash -->
        <rect x="15" y="25" width="30" height="8" stroke="currentColor" stroke-width="1" />
        <rect x="15" y="35" width="30" height="8" stroke="currentColor" stroke-width="1" />
        <rect x="15" y="45" width="30" height="8" stroke="currentColor" stroke-width="1" />
      </svg>
    </div>
    
    <!-- Pattern Overlay -->
    <div class="absolute inset-0 bg-grid-pattern opacity-[0.015] pointer-events-none"></div>
    
    <div class="container mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 z-10">
      <!-- Left Section: Branding -->
      <div class="w-full max-w-md text-center md:text-left">
        <img src="../../assets/finako.svg" alt="Finako Logo" class="h-20 mx-auto md:mx-0 mb-4 drop-shadow-md" />
        
        <p class="text-xl text-base-content/80 mb-4">Super App ERP untuk UMKM Indonesia</p>
        
        <div class="mockup-code hidden md:block bg-neutral/80 backdrop-blur-sm max-w-xs text-left mt-6 shadow-lg">
          <pre data-prefix="$" class="text-success"><code>finako-erp --status</code></pre>
          <pre data-prefix=">" class="text-warning"><code>Laporan keuangan: +25% bulan ini</code></pre>
          <pre data-prefix=">" class="text-info"><code>Stok produk: 158 item</code></pre>
          <pre data-prefix=">" class="text-success"><code>Penjualan: Rp 12,5jt hari ini</code></pre>
          <pre data-prefix=">" class="text-accent"><code>Bisnis Anda berkembang!</code></pre>
        </div>
        
        <div class="hidden md:flex flex-wrap gap-3 mt-6">
          <div class="badge badge-outline badge-sm">Laporan Keuangan</div>
          <div class="badge badge-outline badge-sm">Akuntansi</div>
          <div class="badge badge-outline badge-sm">Inventori</div>
          <div class="badge badge-outline badge-sm">Faktur</div>
          <div class="badge badge-outline badge-sm">Point of Sale</div>
        </div>
        
        <!-- Trial Badge (Mobile Only) -->
        <div class="md:hidden mt-6 mb-2">
          <div class="badge badge-accent gap-2 p-4 text-base">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-4 h-4 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12m-8-6h16"></path>
            </svg>
            Gratis 30 hari uji coba!
          </div>
        </div>
      </div>
      
      <!-- Right Section: Login Form -->
      <div class="w-full max-w-md">
        <!-- Trial Banner (Desktop Only) -->
        <div class="hidden md:flex items-center gap-2 mb-5 bg-accent/10 p-3 rounded-lg border-l-4 border-accent">
          <div class="badge badge-accent">BARU</div>
          <span class="text-accent-focus font-medium">Gratis 30 hari! Coba semua fitur tanpa biaya</span>
        </div>

        <!-- Login Card -->
        <div class="card backdrop-blur-sm bg-base-100/90 shadow-2xl hover:shadow-primary/20 transition-all duration-500 border border-base-300/50">
          <div class="card-body">
            <h2 class="card-title text-2xl mb-2">Selamat Datang!</h2>
            <p class="text-base-content/70 mb-6">Masukkan kredensial Anda untuk melanjutkan</p>
            
            <!-- Error Message -->
            <div v-if="error" class="alert alert-error shadow-lg mb-4 animate__animated animate__headShake">
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{{ error }}</span>
            </div>

            <form @submit.prevent="handleLogin">
              <!-- Email Field -->
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Email</span>
                </label>
                <label class="input input-bordered w-full flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                  <input 
                    id="email" 
                    v-model="email" 
                    type="email"
                    class="grow"
                    placeholder="nama@perusahaan.com"
                    required
                    :disabled="loading"
                    autocomplete="email"
                  />
                </label>
                <label v-if="emailError" class="label">
                  <span class="label-text-alt text-error">{{ emailError }}</span>
                </label>
              </div>

              <!-- Password Field -->
              <div class="form-control mt-2 w-full">
                <label class="label">
                  <span class="label-text">Password</span>
                </label>
                <label class="input input-bordered w-full flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.52 1.52a.75.75 0 0 1-.53.22H5.75a.75.75 0 0 1-.75-.75v-1.302c0-.203.081-.399.226-.545l1.52-1.52A4 4 0 1 1 14 6Zm-4-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" clip-rule="evenodd" /></svg>
                  <input 
                    id="password" 
                    v-model="password" 
                    :type="showPassword ? 'text' : 'password'"
                    class="grow"
                    placeholder="Masukkan password"
                    required
                    :disabled="loading"
                    autocomplete="current-password"
                  />
                  <button 
                    type="button" 
                    @click="showPassword = !showPassword" 
                    class="btn btn-ghost btn-xs"
                  >
                    <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                      <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                      <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                      <path fill-rule="evenodd" d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z" clip-rule="evenodd" />
                      <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z" />
                    </svg>
                  </button>
                </label>
                <label v-if="passwordError" class="label">
                  <span class="label-text-alt text-error">{{ passwordError }}</span>
                </label>
              </div>

              <!-- Remember Me & Forgot Password -->
              <div class="flex justify-between items-center mt-2 mb-6">
                <div class="form-control">
                  <label class="label cursor-pointer">
                    <input 
                      id="remember" 
                      v-model="rememberMe" 
                      type="checkbox" 
                      class="checkbox checkbox-primary checkbox-sm" 
                      :disabled="loading"
                    />
                    <span class="label-text ml-2">Ingat Saya</span>
                  </label>
                </div>
                <div>
                                <router-link to="/forgot-password" class="link link-hover text-sm" style="color: #20c997">
                Lupa Password?
              </router-link>
                </div>
              </div>

              <!-- Login Button -->
              <button 
                type="submit" 
                class="btn w-full shadow-md hover:shadow-lg transition-all duration-300"
                style="background-color: #20c997; color: white; border-color: #20c997;"
                :class="{'opacity-70': loading}"
                :disabled="loading"
              >
                <span v-if="loading" class="loading loading-spinner loading-sm mr-2"></span>
                {{ loading ? 'Memproses...' : 'Masuk' }}
              </button>
            </form>

            <div class="divider">atau</div>

            <!-- Social Login -->
            <div class="grid grid-cols-2 gap-2 mb-4">
              <button class="btn btn-outline w-full">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
                Google
              </button>
              <button class="btn btn-outline w-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-5.8-4.698-10.5-10.497-10.5s-10.497 4.7-10.497 10.5c0 5.23 3.799 9.566 8.773 10.35v-7.32H8.545v-3.03h3.234V9.49c0-3.197 1.9-4.962 4.813-4.962 1.393 0 2.851.25 2.851.25v3.138h-1.605c-1.583 0-2.077.982-2.077 1.99v2.387h3.535l-.565 3.03h-2.97V22.42A10.503 10.503 0 0024 12.073z"/></svg>
                Facebook
              </button>
            </div>

            <!-- Register Link -->
            <div class="text-center mt-4">
              <p class="text-base-content/80">Belum punya akun?</p>
              <router-link to="/register" class="btn btn-link no-underline mt-1" style="color: #20c997">
                Daftar Sekarang
              </router-link>
            </div>
            
            <!-- Business Benefits Section -->
            <div class="divider text-xs text-base-content/50">FITUR FINAKO OS</div>
            
            <div class="flex flex-wrap justify-center gap-2 mt-2">
              <div class="flex items-center gap-1 text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>Laporan Real-time</span>
              </div>
              <div class="flex items-center gap-1 text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Pembayaran Mudah</span>
              </div>
              <div class="flex items-center gap-1 text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Analisis Bisnis</span>
              </div>
              <div class="flex items-center gap-1 text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span>Integrasi Bank</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="mt-6 text-center text-base-content/60 text-sm">
          &copy; 2025 Finako OS. <span class="hidden md:inline">Semua hak dilindungi.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth.js'

// Router
const router = useRouter()

// Auth Store
const authStore = useAuthStore()

// Form state
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const loading = computed(() => authStore.loading)
const error = computed(() => authStore.error)

// Animation states
const isPageLoaded = ref(false)

// Validation errors
const emailError = ref('')
const passwordError = ref('')

// Mounted hook
onMounted(() => {
  // Autofocus email field
  setTimeout(() => {
    const emailInput = document.getElementById('email')
    if (emailInput) emailInput.focus()
    isPageLoaded.value = true
  }, 100)
  
  // Preload demo email for easy testing (in development)
  if (process.env.NODE_ENV === 'development') {
    email.value = 'teguh@finako.app'
  }
})

// Validate form
const validateForm = () => {
  let isValid = true
  
  // Reset errors
  emailError.value = ''
  passwordError.value = ''
  
  // Validate email
  if (!email.value) {
    emailError.value = 'Email harus diisi'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    emailError.value = 'Format email tidak valid'
    isValid = false
  }
  
  // Validate password
  if (!password.value) {
    passwordError.value = 'Password harus diisi'
    isValid = false
  } else if (password.value.length < 6) {
    passwordError.value = 'Password minimal 6 karakter'
    isValid = false
  }
  
  return isValid
}

// Handle login
const handleLogin = async () => {
  // Clear previous errors
  authStore.clearError()
  
  // Validate form
  if (!validateForm()) {
    return
  }
  
  // Attempt login
  const { success } = await authStore.login(email.value, password.value)
  
  // If login successful, redirect to home
  if (success) {
    // Show toast notification (if available)
    if (window.toast) {
      window.toast.success('Login berhasil! Selamat datang kembali.')
    }
    
    router.push('/')
  } else {
    // Shake effect already handled with animate.css
  }
}

// Keyboard shortcuts
const handleKeyDown = (e) => {
  // Handle Enter key
  if (e.key === 'Enter' && !loading.value) {
    handleLogin()
  }
}
</script>

<style scoped>
/* Additional styling for animation */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Background grid pattern */
.bg-grid-pattern {
  background-image: 
    linear-gradient(to right, currentColor 1px, transparent 1px),
    linear-gradient(to bottom, currentColor 1px, transparent 1px);
  background-size: 40px 40px;
}

/* Floating animation */
@keyframes float {
  0% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-15px) rotate(2deg); }
  50% { transform: translateY(-20px) rotate(0deg); }
  75% { transform: translateY(-10px) rotate(-2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
}

.animate-floating {
  animation: float 12s ease-in-out infinite;
  transform-origin: center center;
}

/* Define a simple animate.css-like class for shake effect */
.animate__animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}

.animate__headShake {
  animation-name: headShake;
  animation-timing-function: ease-in-out;
  animation-duration: 0.6s;
}

@keyframes headShake {
  0% { transform: translateX(0); }
  6.5% { transform: translateX(-6px) rotateY(-9deg); }
  18.5% { transform: translateX(5px) rotateY(7deg); }
  31.5% { transform: translateX(-3px) rotateY(-5deg); }
  43.5% { transform: translateX(2px) rotateY(3deg); }
  50% { transform: translateX(0); }
}

/* Pulse animation customization */
.animate-pulse {
  animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.05; }
  50% { opacity: 0.2; }
}
</style>
