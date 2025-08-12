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
        
        <div class="space-y-3">
          <h1 class="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-primary-focus to-accent bg-clip-text text-transparent leading-tight">
            Selamat Datang di Finako!
          </h1>
          
          <p class="text-base-content/80 text-sm md:text-base leading-relaxed">
            Solusi manajemen keuangan & bisnis yang akan membantu mengembangkan usaha Anda dengan lebih efektif dan terorganisir.
          </p>
          
          <!-- Success Features Highlight -->
          <div class="space-y-2 pt-2">
            <div class="flex items-center gap-2 text-sm text-success">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Akun berhasil dibuat</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-success">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Trial 30 hari sudah aktif</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-primary">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Siap untuk setup bisnis</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Right Section: Success Card -->
      <div class="w-full max-w-md">
        <div class="card bg-base-100/95 backdrop-blur-xl shadow-2xl border border-base-300/50">
          <div class="card-body p-6 md:p-8">
            <!-- Success Icon -->
            <div class="text-center mb-6">
              <div class="w-20 h-20 mx-auto bg-success/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
                <svg class="w-10 h-10 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-base-content">Registrasi Berhasil!</h2>
              <p class="text-base-content/70 text-sm mt-2">Akun Anda telah berhasil dibuat</p>
            </div>
            
            <!-- Trial Info Card -->
            <div class="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 mb-6 border border-primary/20">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-primary">Finako Trial Aktif</h3>
                  <p class="text-xs text-base-content/70 mt-1">
                    Trial 30 hari sudah otomatis aktif untuk akun Anda. Nikmati semua fitur dasar untuk mengelola bisnis.
                  </p>
                  <div class="flex flex-wrap gap-2 mt-2">
                    <span class="badge badge-primary badge-xs">1 Bisnis</span>
                    <span class="badge badge-primary badge-xs">3 Pengguna</span>
                    <span class="badge badge-primary badge-xs">100 Produk</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Next Steps -->
            <div class="bg-base-200/50 rounded-lg p-4 mb-6">
              <h3 class="font-semibold text-base-content mb-3 flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
                Langkah Selanjutnya:
              </h3>
              <ol class="list-decimal list-inside space-y-2 text-sm text-base-content/80">
                <li>Login dengan akun yang baru dibuat</li>
                <li>Setup profil bisnis Anda</li>
                <li>Mulai kelola keuangan & inventory</li>
              </ol>
            </div>
            
            <!-- Action Buttons -->
            <div class="space-y-3">
              <button 
                @click="goToLogin"
                class="btn btn-primary w-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                </svg>
                Lanjut ke Login
              </button>
              
              <div class="text-center">
                <router-link 
                  to="/register" 
                  class="text-xs text-base-content/60 hover:text-base-content transition-colors duration-200"
                >
                  Buat akun lain
                </router-link>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Additional Info -->
        <div class="text-center mt-4 space-y-2">
          <p class="text-xs text-base-content/60">
            Butuh bantuan? 
            <a href="mailto:support@finako.id" class="text-primary hover:text-primary-focus transition-colors duration-200">
              Hubungi Support
            </a>
          </p>
          <div class="flex justify-center gap-4 text-xs text-base-content/50">
            <router-link to="/terms-conditions" class="hover:text-base-content transition-colors duration-200">Syarat & Ketentuan</router-link>
            <router-link to="/privacy-policy" class="hover:text-base-content transition-colors duration-200">Kebijakan Privasi</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = () => {
  router.push('/login')
}

// Auto redirect to login after 30 seconds if no action taken
setTimeout(() => {
  // Optional: Auto redirect (uncomment if desired)
  // router.push('/login')
}, 30000)
</script>

<style scoped>
/* Custom background grid pattern */
.bg-grid-pattern {
  background-image: 
    linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}

/* Enhanced animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: fadeInUp 0.6s ease-out;
}

/* Success pulse animation */
@keyframes successPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* Hover effects */
.btn:hover {
  transform: translateY(-1px);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  
  .card-body {
    padding: 1.5rem;
  }
}
</style>
