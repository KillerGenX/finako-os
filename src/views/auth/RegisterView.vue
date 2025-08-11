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
      <!-- Left Column (Hidden on Mobile) -->
      <div class="hidden md:block w-full max-w-md">
        <div class="p-6 rounded-xl backdrop-blur-sm bg-base-100/30 border border-base-300/50 shadow-lg">
          <img src="../../assets/finako.svg" alt="Finako Logo" class="h-16 mb-6" />
          <h2 class="text-2xl font-bold finako-primary mb-4">Mulai Perjalanan Bisnis Anda</h2>
          <p class="mb-4 text-base-content/80">Finako OS membantu UMKM Indonesia untuk:</p>
          <ul class="space-y-3">
            <li class="flex items-center gap-2">
              <span class="text-success">✓</span>
              <span>Mengelola inventaris dengan efisien</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="text-success">✓</span>
              <span>Memonitor penjualan secara real-time</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="text-success">✓</span>
              <span>Memantau keuangan dengan mudah</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="text-success">✓</span>
              <span>Mendapatkan insight bisnis dengan AI</span>
            </li>
          </ul>
          <div class="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <p class="text-primary-content/90 text-sm">
              "Saat mendaftar, Anda langsung mendapatkan 30 hari masa uji coba penuh tanpa biaya apapun!"
            </p>
          </div>
        </div>
      </div>

      <!-- Right Column (Register Form) -->
      <div class="w-full max-w-md">
        <div class="card backdrop-blur-sm bg-base-100/90 shadow-2xl hover:shadow-primary/20 transition-all duration-500 border border-base-300/50">
          <div class="card-body">
            <!-- Mobile Logo -->
            <div class="md:hidden flex flex-col items-center mb-6">
              <img src="../../assets/finako.svg" alt="Finako Logo" class="h-14 mb-2" />
              <h1 class="text-2xl font-bold text-primary">Buat Akun Finako</h1>
            </div>

            <!-- Desktop Title -->
            <h2 class="hidden md:block card-title text-2xl mb-2">Daftar ke Finako OS</h2>
            <p class="text-base-content/70 mb-6">Buat akun baru dan mulai masa uji coba 30 hari</p>

            <!-- Error Message -->
            <div v-if="error" class="alert alert-error mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{{ error }}</span>
            </div>

            <form @submit.prevent="handleRegister">
              <!-- Nama Lengkap Field -->
              <div class="form-control mb-3">
                <label class="label">
                  <span class="label-text">Nama Lengkap</span>
                </label>
                <input 
                  id="fullName" 
                  v-model="fullName" 
                  type="text" 
                  class="input input-bordered w-full" 
                  placeholder="Nama lengkap Anda"
                  required
                  :disabled="loading"
                />
                <label v-if="fullNameError" class="label">
                  <span class="label-text-alt text-error">{{ fullNameError }}</span>
                </label>
              </div>

              <!-- Email Field -->
              <div class="form-control mb-3">
                <label class="label">
                  <span class="label-text">Email</span>
                </label>
                <input 
                  id="email" 
                  v-model="email" 
                  type="email" 
                  class="input input-bordered w-full" 
                  placeholder="nama@perusahaan.com"
                  required
                  :disabled="loading"
                  autocomplete="email"
                />
                <label v-if="emailError" class="label">
                  <span class="label-text-alt text-error">{{ emailError }}</span>
                </label>
              </div>

              <!-- Password Field -->
              <div class="form-control mb-3">
                <label class="label">
                  <span class="label-text">Password</span>
                </label>
                <div class="relative">
                  <input 
                    id="password" 
                    v-model="password" 
                    :type="showPassword ? 'text' : 'password'" 
                    class="input input-bordered w-full pr-20" 
                    placeholder="Minimal 8 karakter"
                    required
                    :disabled="loading"
                  />
                  <button 
                    type="button" 
                    @click="showPassword = !showPassword" 
                    class="btn btn-xs btn-ghost absolute right-1 top-1/2 transform -translate-y-1/2"
                    aria-label="Toggle password visibility"
                  >
                    <span class="text-xs">{{ showPassword ? 'Sembunyikan' : 'Tampilkan' }}</span>
                  </button>
                </div>
                <label v-if="passwordError" class="label">
                  <span class="label-text-alt text-error">{{ passwordError }}</span>
                </label>
                <div v-if="password" class="mt-2">
                  <div class="password-strength flex gap-1">
                    <div 
                      v-for="n in 4" 
                      :key="n" 
                      class="h-1 flex-1 rounded-full"
                      :class="passwordStrength >= n ? strengthClass : 'bg-base-300'"
                    ></div>
                  </div>
                  <p class="text-xs mt-1" :class="strengthColorClass">
                    {{ passwordStrengthText }}
                  </p>
                </div>
              </div>

              <!-- Konfirmasi Password Field -->
              <div class="form-control mb-4">
                <label class="label">
                  <span class="label-text">Konfirmasi Password</span>
                </label>
                <div class="relative">
                  <input 
                    id="confirmPassword" 
                    v-model="confirmPassword" 
                    :type="showConfirmPassword ? 'text' : 'password'" 
                    class="input input-bordered w-full pr-20" 
                    placeholder="Masukkan ulang password"
                    required
                    :disabled="loading"
                  />
                  <button 
                    type="button" 
                    @click="showConfirmPassword = !showConfirmPassword" 
                    class="btn btn-xs btn-ghost absolute right-1 top-1/2 transform -translate-y-1/2"
                    aria-label="Toggle password visibility"
                  >
                    <span class="text-xs">{{ showConfirmPassword ? 'Sembunyikan' : 'Tampilkan' }}</span>
                  </button>
                </div>
                <label v-if="confirmPasswordError" class="label">
                  <span class="label-text-alt text-error">{{ confirmPasswordError }}</span>
                </label>
              </div>

              <!-- Terms & Conditions -->
              <div class="form-control mb-6">
                <label class="label cursor-pointer justify-start gap-3">
                  <input 
                    id="agreeTerms" 
                    v-model="agreeTerms" 
                    type="checkbox" 
                    class="checkbox checkbox-primary checkbox-sm" 
                    required
                    :disabled="loading"
                  />
                  <span class="label-text">
                    Saya setuju dengan 
                    <router-link to="/terms-conditions" class="link" style="color: #20c997;">Syarat & Ketentuan</router-link> 
                    dan 
                    <router-link to="/privacy-policy" class="link" style="color: #20c997;">Kebijakan Privasi</router-link>
                  </span>
                </label>
                <label v-if="termsError" class="label">
                  <span class="label-text-alt text-error">{{ termsError }}</span>
                </label>
              </div>

              <!-- Register Button -->
              <button 
                type="submit" 
                class="btn w-full"
                style="background-color: #20c997; color: white; border-color: #20c997;"
                :disabled="loading"
                :class="{'opacity-70': loading}"
              >
                {{ loading ? 'Memproses...' : 'Buat Akun' }}
              </button>

              <div class="divider text-xs text-base-content/60">Atau daftar dengan</div>

              <!-- Social Login -->
              <div class="grid grid-cols-2 gap-2 mb-4">
                <button class="btn btn-outline btn-sm w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
                  Google
                </button>
                <button class="btn btn-outline btn-sm w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-5.8-4.698-10.5-10.497-10.5s-10.497 4.7-10.497 10.5c0 5.23 3.799 9.566 8.773 10.35v-7.32H8.545v-3.03h3.234V9.49c0-3.197 1.9-4.962 4.813-4.962 1.393 0 2.851.25 2.851.25v3.138h-1.605c-1.583 0-2.077.982-2.077 1.99v2.387h3.535l-.565 3.03h-2.97V22.42A10.503 10.503 0 0024 12.073z"/></svg>
                  Facebook
                </button>
              </div>

              <!-- Trial Info -->
              <div class="alert alert-info mt-4 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <div class="flex flex-col">
                  <span class="font-medium">Gratis 30 hari!</span>
                  <span class="text-xs">Nikmati akses penuh ke semua fitur tanpa biaya</span>
                </div>
              </div>
            </form>

            <!-- Login Link -->
            <div class="text-center mt-5">
              Sudah punya akun? 
              <router-link to="/login" class="link" style="color: #20c997;">
                Masuk Sekarang
              </router-link>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="mt-6 text-center text-base-content/60 text-sm">
          &copy; 2025 Finako OS. Semua hak dilindungi.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth.js'

// Router
const router = useRouter()

// Auth Store
const authStore = useAuthStore()

// Form state
const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeTerms = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = computed(() => authStore.loading)
const error = computed(() => authStore.error)

// Validation errors
const fullNameError = ref('')
const emailError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')
const termsError = ref('')

// Password strength
const passwordStrength = computed(() => {
  if (!password.value) return 0
  
  let strength = 0
  
  // Length check
  if (password.value.length >= 8) strength++
  
  // Contains number
  if (/\d/.test(password.value)) strength++
  
  // Contains lowercase and uppercase
  if (/[a-z]/.test(password.value) && /[A-Z]/.test(password.value)) strength++
  
  // Contains special character
  if (/[^a-zA-Z0-9]/.test(password.value)) strength++
  
  return strength
})

const strengthClass = computed(() => {
  switch (passwordStrength.value) {
    case 1: return 'bg-error'
    case 2: return 'bg-warning'
    case 3: return 'bg-info'
    case 4: return 'bg-success'
    default: return 'bg-base-300'
  }
})

const strengthColorClass = computed(() => {
  switch (passwordStrength.value) {
    case 1: return 'text-error'
    case 2: return 'text-warning'
    case 3: return 'text-info'
    case 4: return 'text-success'
    default: return 'text-base-content/50'
  }
})

const passwordStrengthText = computed(() => {
  switch (passwordStrength.value) {
    case 1: return 'Lemah - tambahkan angka dan huruf kapital'
    case 2: return 'Sedang - tambahkan karakter khusus'
    case 3: return 'Baik - hampir kuat'
    case 4: return 'Kuat - password aman'
    default: return 'Masukkan password'
  }
})

// Reset password confirmation error when password changes
watch(password, () => {
  if (confirmPassword.value && confirmPassword.value !== password.value) {
    confirmPasswordError.value = 'Password tidak sama'
  } else {
    confirmPasswordError.value = ''
  }
})

// Check password match
watch(confirmPassword, (newValue) => {
  if (newValue && newValue !== password.value) {
    confirmPasswordError.value = 'Password tidak sama'
  } else {
    confirmPasswordError.value = ''
  }
})

// Validate form
const validateForm = () => {
  let isValid = true
  
  // Reset errors
  fullNameError.value = ''
  emailError.value = ''
  passwordError.value = ''
  confirmPasswordError.value = ''
  termsError.value = ''
  
  // Validate full name
  if (!fullName.value) {
    fullNameError.value = 'Nama lengkap harus diisi'
    isValid = false
  } else if (fullName.value.length < 3) {
    fullNameError.value = 'Nama lengkap minimal 3 karakter'
    isValid = false
  }
  
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
  } else if (password.value.length < 8) {
    passwordError.value = 'Password minimal 8 karakter'
    isValid = false
  } else if (passwordStrength.value < 3) {
    passwordError.value = 'Password terlalu lemah'
    isValid = false
  }
  
  // Validate confirm password
  if (!confirmPassword.value) {
    confirmPasswordError.value = 'Konfirmasi password harus diisi'
    isValid = false
  } else if (confirmPassword.value !== password.value) {
    confirmPasswordError.value = 'Password tidak sama'
    isValid = false
  }
  
  // Validate terms
  if (!agreeTerms.value) {
    termsError.value = 'Anda harus menyetujui syarat & ketentuan'
    isValid = false
  }
  
  return isValid
}

// Handle register
const handleRegister = async () => {
  // Clear previous errors
  authStore.clearError()
  
  // Validate form
  if (!validateForm()) {
    return
  }
  
  // Attempt registration with metadata
  const metadata = {
    full_name: fullName.value
  }
  
  const { success } = await authStore.register(email.value, password.value, metadata)
  
  // If registration successful, show message and redirect to login
  if (success) {
    // Normally we would create the trial subscription here
    // For now, we'll just redirect to login
    router.push('/login')
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

/* Untuk mengatasi masalah z-index */
.card {
  z-index: 10;
  position: relative;
}
</style>
