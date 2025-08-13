<template>
  <div class="min-h-screen bg-gradient-to-br from-teal-50 to-green-50">
    <!-- Header -->
    <div class="bg-white/80 backdrop-blur-md shadow-lg border-b border-teal-100">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <router-link to="/dashboard" class="btn btn-ghost btn-sm">
              <i class="fas fa-arrow-left mr-2"></i>
              Kembali
            </router-link>
            <div>
              <h1 class="text-2xl font-bold text-gray-800">Paket Subscription</h1>
              <p class="text-gray-600">Pilih paket yang sesuai dengan kebutuhan bisnis Anda</p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <!-- Logout Button -->
            <button @click="handleLogout" class="btn btn-outline btn-error btn-sm">
              <i class="fas fa-sign-out-alt mr-2"></i>
              Logout
            </button>
            <div class="flex items-center space-x-2">
              <img src="/finako.svg" alt="Finako" class="w-8 h-8" />
              <span class="font-bold text-teal-600">Finako OS</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Current Subscription Status -->
    <div class="container mx-auto px-4 py-6">
      <div v-if="currentPlan" class="alert mb-6" :class="{
        'alert-info': !isExpired,
        'alert-error': isExpired
      }">
        <i class="fas" :class="{
          'fa-info-circle': !isExpired,
          'fa-exclamation-triangle': isExpired
        }"></i>
        <div>
          <h3 class="font-semibold">Status Subscription Saat Ini</h3>
          <p>
            {{ currentPlan.name }} - 
            <span v-if="isExpired" class="font-semibold text-red-600">Expired</span>
            <span v-else>Sisa {{ daysLeft }} hari</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Plans Grid -->
    <div class="container mx-auto px-4 pb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <!-- Trial Plan -->
        <div class="card bg-white/80 backdrop-blur-md shadow-xl border" :class="{
          'border-teal-300 ring-2 ring-teal-200': currentPlanName === 'Finako Trial'
        }">
          <div class="card-body">
            <div class="flex items-center justify-between mb-4">
              <h2 class="card-title text-teal-600">Finako Trial</h2>
              <div v-if="currentPlanName === 'Finako Trial'" class="badge badge-success">Current</div>
            </div>
            
            <div class="text-3xl font-bold text-gray-800 mb-2">
              Gratis
              <span class="text-lg font-normal text-gray-600">/ 30 hari</span>
            </div>
            
            <div class="divider"></div>
            
            <ul class="space-y-2 mb-6">
              <li class="flex items-center">
                <i class="fas fa-check text-green-500 mr-2"></i>
                1 Bisnis
              </li>
              <li class="flex items-center">
                <i class="fas fa-check text-green-500 mr-2"></i>
                3 Pengguna
              </li>
              <li class="flex items-center">
                <i class="fas fa-check text-green-500 mr-2"></i>
                100 Produk
              </li>
              <li class="flex items-center">
                <i class="fas fa-check text-green-500 mr-2"></i>
                POS Basic
              </li>
              <li class="flex items-center">
                <i class="fas fa-check text-green-500 mr-2"></i>
                Laporan Basic
              </li>
            </ul>

            <div class="card-actions justify-center">
              <button 
                class="btn btn-outline btn-teal w-full" 
                :disabled="currentPlanName === 'Finako Trial'"
              >
                {{ currentPlanName === 'Finako Trial' ? 'Plan Aktif' : 'Pilih Trial' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Basic Plan -->
        <div class="card bg-white/80 backdrop-blur-md shadow-xl border hover:border-blue-300 transition-colors">
          <div class="card-body">
            <div class="flex items-center justify-between mb-4">
              <h2 class="card-title text-blue-600">Finako Basic</h2>
              <div class="badge badge-primary">Popular</div>
            </div>
            
            <div class="text-3xl font-bold text-gray-800 mb-2">
              Rp 99K
              <span class="text-lg font-normal text-gray-600">/ bulan</span>
            </div>
            
            <div class="divider"></div>
            
            <ul class="space-y-2 mb-6">
              <li class="flex items-center">
                <i class="fas fa-check text-green-500 mr-2"></i>
                3 Bisnis
              </li>
              <li class="flex items-center">
                <i class="fas fa-check text-green-500 mr-2"></i>
                10 Pengguna
              </li>
              <li class="flex items-center">
                <i class="fas fa-check text-green-500 mr-2"></i>
                1.000 Produk
              </li>
              <li class="flex items-center">
                <i class="fas fa-check text-green-500 mr-2"></i>
                POS Advanced
              </li>
              <li class="flex items-center">
                <i class="fas fa-check text-green-500 mr-2"></i>
                Inventory Management
              </li>
              <li class="flex items-center">
                <i class="fas fa-check text-green-500 mr-2"></i>
                Laporan Lengkap
              </li>
              <li class="flex items-center">
                <i class="fas fa-check text-green-500 mr-2"></i>
                Email Support
              </li>
            </ul>

            <div class="card-actions justify-center">
              <button class="btn btn-primary w-full" @click="selectPlan('basic')">
                Pilih Basic
              </button>
            </div>
          </div>
        </div>

        <!-- Pro Plan -->
        <div class="card bg-white/80 backdrop-blur-md shadow-xl border border-purple-300 relative overflow-hidden">
          <!-- Recommended Badge -->
          <div class="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 text-sm font-semibold transform rotate-45 translate-x-6 translate-y-2">
            Recommended
          </div>
          
          <div class="card-body">
            <div class="flex items-center justify-between mb-4">
              <h2 class="card-title text-purple-600">Finako Pro</h2>
              <div class="badge badge-secondary">Best Value</div>
            </div>
            
            <div class="text-3xl font-bold text-gray-800 mb-2">
              Rp 299K
              <span class="text-lg font-normal text-gray-600">/ bulan</span>
            </div>
            
            <div class="divider"></div>
            
            <ul class="space-y-2 mb-6">
              <li class="flex items-center">
                <i class="fas fa-check text-green-500 mr-2"></i>
                10 Bisnis
              </li>
              <li class="flex items-center">
                <i class="fas fa-check text-green-500 mr-2"></i>
                50 Pengguna
              </li>
              <li class="flex items-center">
                <i class="fas fa-check text-green-500 mr-2"></i>
                Unlimited Produk
              </li>
              <li class="flex items-center">
                <i class="fas fa-check text-green-500 mr-2"></i>
                Multi-outlet POS
              </li>
              <li class="flex items-center">
                <i class="fas fa-check text-green-500 mr-2"></i>
                Advanced Analytics
              </li>
              <li class="flex items-center">
                <i class="fas fa-check text-green-500 mr-2"></i>
                API Integration
              </li>
              <li class="flex items-center">
                <i class="fas fa-check text-green-500 mr-2"></i>
                Priority Support
              </li>
              <li class="flex items-center">
                <i class="fas fa-check text-green-500 mr-2"></i>
                WhatsApp Integration
              </li>
            </ul>

            <div class="card-actions justify-center">
              <button class="btn btn-secondary w-full" @click="selectPlan('pro')">
                Pilih Pro
              </button>
            </div>
          </div>
        </div>

      </div>

      <!-- FAQ Section -->
      <div class="mt-16">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h2>
        
        <div class="max-w-4xl mx-auto">
          <div class="collapse collapse-arrow bg-white/80 backdrop-blur-md shadow-lg mb-4">
            <input type="radio" name="faq-accordion" checked="checked"> 
            <div class="collapse-title text-xl font-medium">
              Apakah saya bisa upgrade atau downgrade kapan saja?
            </div>
            <div class="collapse-content"> 
              <p>Ya, Anda dapat mengubah paket subscription kapan saja. Perubahan akan berlaku pada periode billing berikutnya.</p>
            </div>
          </div>
          
          <div class="collapse collapse-arrow bg-white/80 backdrop-blur-md shadow-lg mb-4">
            <input type="radio" name="faq-accordion"> 
            <div class="collapse-title text-xl font-medium">
              Bagaimana cara pembayaran?
            </div>
            <div class="collapse-content"> 
              <p>Kami menerima pembayaran melalui transfer bank, QRIS, dan berbagai payment gateway lainnya. Semua transaksi dilindungi dengan enkripsi SSL.</p>
            </div>
          </div>
          
          <div class="collapse collapse-arrow bg-white/80 backdrop-blur-md shadow-lg mb-4">
            <input type="radio" name="faq-accordion"> 
            <div class="collapse-title text-xl font-medium">
              Apakah data saya aman?
            </div>
            <div class="collapse-content"> 
              <p>Ya, semua data Anda disimpan dengan aman menggunakan teknologi enkripsi terdepan dan server yang berlokasi di Indonesia.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useSubscriptionStore } from '@/stores/subscription'

const router = useRouter()
const authStore = useAuthStore()
const subscriptionStore = useSubscriptionStore()

// Computed properties
const currentPlan = computed(() => subscriptionStore.currentPlan)
const currentPlanName = computed(() => subscriptionStore.planName)
const daysLeft = computed(() => subscriptionStore.daysLeft)
const isExpired = computed(() => subscriptionStore.isExpired)

// Methods
const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Logout error:', error)
  }
}

const selectPlan = async (planType) => {
  try {
    console.log('Selected plan:', planType)
    
    // Navigate to payment page with selected plan
    router.push({
      name: 'Payment',
      query: { plan: planType }
    })
  } catch (error) {
    console.error('Error selecting plan:', error)
  }
}

// Initialize subscription data
onMounted(async () => {
  if (authStore.user && !subscriptionStore.initialized) {
    await subscriptionStore.initializeSubscription(authStore.user.id)
  }
})
</script>

<style scoped>
.btn-teal {
  background-color: #14b8a6;
  border-color: #14b8a6;
  color: white;
}

.btn-teal:hover {
  background-color: #0d9488;
  border-color: #0d9488;
}

.border-teal-300 {
  border-color: #5eead4;
}

.ring-teal-200 {
  --tw-ring-color: rgb(153 246 228);
}
</style>
