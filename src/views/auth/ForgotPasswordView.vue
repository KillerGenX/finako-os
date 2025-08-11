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
    
    <!-- Pattern Overlay -->
    <div class="absolute inset-0 bg-grid-pattern opacity-[0.015] pointer-events-none"></div>
    
    <div class="container mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 z-10">
      <!-- Left Section: Branding -->
      <div class="w-full max-w-md text-center md:text-left">
        <img src="../../assets/finako.svg" alt="Finako Logo" class="h-20 mx-auto md:mx-0 mb-4 drop-shadow-md" />
        
        <p class="text-xl text-base-content/80 mb-4">Super App ERP untuk UMKM Indonesia</p>
        
        <div class="mockup-code hidden md:block bg-neutral/80 backdrop-blur-sm max-w-xs text-left mt-6 shadow-lg">
          <pre data-prefix="$" class="text-success"><code>finako-erp --support</code></pre>
          <pre data-prefix=">" class="text-warning"><code>Kami selalu siap membantu!</code></pre>
          <pre data-prefix=">" class="text-info"><code>Link reset password terkirim.</code></pre>
          <pre data-prefix=">" class="text-success"><code>Akses kembali akun Anda segera.</code></pre>
        </div>
        
        <div class="hidden md:flex flex-wrap gap-3 mt-6">
          <div class="badge badge-outline badge-sm">Keamanan Akun</div>
          <div class="badge badge-outline badge-sm">Pemulihan Akses</div>
          <div class="badge badge-outline badge-sm">Reset Password</div>
          <div class="badge badge-outline badge-sm">24/7 Support</div>
        </div>
      </div>
      
      <!-- Right Section: Forgot Password Form -->
      <div class="w-full max-w-md">
        <!-- Card -->
        <div class="card backdrop-blur-sm bg-base-100/90 shadow-2xl hover:shadow-primary/20 transition-all duration-500 border border-base-300/50">
          <div class="card-body">
            <h2 class="card-title text-2xl mb-2">Lupa Password?</h2>
            <p class="text-base-content/70 mb-6">
              Masukkan email Anda dan kami akan mengirimkan instruksi untuk mengatur ulang password Anda.
            </p>
            
            <!-- Success Message -->
            <div v-if="emailSent" class="alert alert-success shadow-lg mb-4 animate__animated animate__fadeIn">
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ successMessage }}</span>
            </div>
            
            <!-- Error Message -->
            <div v-if="error" class="alert alert-error shadow-lg mb-4 animate__animated animate__headShake">
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ error }}</span>
            </div>

            <!-- Form for reset password request -->
            <form v-if="!emailSent" @submit.prevent="handleResetPassword">
              <!-- Email Field -->
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Email</span>
                </label>
                <label class="input input-bordered w-full flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
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

              <!-- Reset Password Button -->
              <button 
                type="submit" 
                class="btn w-full mt-6"
                style="background-color: #20c997; color: white; border-color: #20c997;"
                :class="{'opacity-70': loading}"
                :disabled="loading"
              >
                <span v-if="loading" class="loading loading-spinner loading-sm mr-2"></span>
                {{ loading ? 'Memproses...' : 'Kirim Link Reset' }}
              </button>
            </form>
            
            <!-- Actions after email sent -->
            <div v-if="emailSent" class="mt-4">
              <button 
                @click="resendEmail" 
                class="btn btn-outline w-full mb-3"
                :disabled="loading"
              >
                <span v-if="loading" class="loading loading-spinner loading-sm mr-2"></span>
                {{ loading ? 'Memproses...' : 'Kirim Ulang' }}
              </button>
            </div>

            <!-- Login Link -->
            <div class="text-center mt-6">
              <p class="text-base-content/80">Ingat password Anda?</p>
              <router-link to="/login" class="btn btn-link mt-1" style="color: #20c997">
                Kembali ke Login
              </router-link>
            </div>
            
            <!-- Help info -->
            <div class="mt-6 p-3 bg-base-200 rounded-lg text-sm">
              <p class="font-medium mb-1">Tidak menerima email?</p>
              <ul class="list-disc list-inside space-y-1 text-base-content/70">
                <li>Periksa folder spam/junk</li>
                <li>Pastikan email yang dimasukkan benar</li>
                <li>Tunggu beberapa menit</li>
                <li v-if="emailSent">Coba kirim ulang</li>
              </ul>
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth.js'

// Router
const router = useRouter()

// Auth Store
const authStore = useAuthStore()

// Form state
const email = ref('')
const emailError = ref('')
const emailSent = ref(false)
const successMessage = ref('Link reset password telah dikirim ke email Anda. Silakan periksa kotak masuk Anda.')
const loading = computed(() => authStore.loading)
const error = computed(() => authStore.error)

// Validate form
const validateForm = () => {
  let isValid = true
  
  // Reset errors
  emailError.value = ''
  
  // Validate email
  if (!email.value) {
    emailError.value = 'Email harus diisi'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    emailError.value = 'Format email tidak valid'
    isValid = false
  }
  
  return isValid
}

// Handle reset password request
const handleResetPassword = async () => {
  // Clear previous errors
  authStore.clearError()
  
  // Validate form
  if (!validateForm()) {
    return
  }
  
  // Send reset password email
  try {
    // Normally you'd use:
    // await authStore.resetPassword(email.value)
    
    // For demo, we'll simulate a successful response
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Show success message
    emailSent.value = true
    
  } catch (error) {
    // Error handling done by store
  }
}

// Resend reset password email
const resendEmail = async () => {
  // Clear previous errors
  authStore.clearError()
  
  // Send reset password email again
  try {
    // Normally you'd use:
    // await authStore.resetPassword(email.value)
    
    // For demo, we'll simulate a successful response
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update success message
    successMessage.value = 'Link reset password baru telah dikirim ke email Anda.'
    
  } catch (error) {
    // Error handling done by store
    emailSent.value = false
  }
}
</script>

<style scoped>
/* Background grid pattern */
.bg-grid-pattern {
  background-image: 
    linear-gradient(to right, currentColor 1px, transparent 1px),
    linear-gradient(to bottom, currentColor 1px, transparent 1px);
  background-size: 40px 40px;
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

.animate__fadeIn {
  animation-name: fadeIn;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
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
