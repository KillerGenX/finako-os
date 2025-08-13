<template>
  <div class="min-h-screen bg-gradient-to-br from-teal-50 to-green-50">
    <!-- Header -->
    <div class="bg-white/80 backdrop-blur-md shadow-lg border-b border-teal-100">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <router-link to="/plans" class="btn btn-ghost btn-sm">
              <i class="fas fa-arrow-left mr-2"></i>
              Kembali ke Plans
            </router-link>
            <div>
              <h1 class="text-2xl font-bold text-gray-800">Pembayaran Subscription</h1>
              <p class="text-gray-600">Pilih metode pembayaran yang Anda inginkan</p>
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

    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Payment Methods -->
        <div class="lg:col-span-2">
          <div class="card bg-white/80 backdrop-blur-md shadow-xl">
            <div class="card-body">
              <h2 class="card-title text-xl mb-6">
                <i class="fas fa-credit-card mr-2 text-blue-500"></i>
                Pilih Metode Pembayaran
              </h2>

              <div class="space-y-4">
                
                <!-- Manual Transfer -->
                <div class="border rounded-lg p-4 cursor-pointer transition-all hover:border-blue-300" 
                     :class="{ 'border-blue-500 bg-blue-50': selectedMethod === 'transfer' }"
                     @click="selectedMethod = 'transfer'">
                  <div class="flex items-center">
                    <input type="radio" name="payment-method" value="transfer" 
                           v-model="selectedMethod" class="radio radio-primary mr-4">
                    <div class="flex-1">
                      <div class="flex items-center space-x-3 mb-2">
                        <i class="fas fa-university text-green-500 text-xl"></i>
                        <h3 class="font-semibold text-lg">Transfer Bank</h3>
                        <div class="badge badge-success badge-outline">Popular</div>
                      </div>
                      <p class="text-gray-600 text-sm">Transfer langsung ke rekening bank kami. Konfirmasi otomatis dalam 1-24 jam.</p>
                      <div class="flex items-center space-x-2 mt-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg" alt="BCA" class="w-8 h-6 object-contain">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg" alt="Mandiri" class="w-8 h-6 object-contain">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/BRI_2020.svg" alt="BRI" class="w-8 h-6 object-contain">
                      </div>
                    </div>
                  </div>
                </div>

                <!-- QRIS -->
                <div class="border rounded-lg p-4 cursor-pointer transition-all hover:border-blue-300" 
                     :class="{ 'border-blue-500 bg-blue-50': selectedMethod === 'qris' }"
                     @click="selectedMethod = 'qris'">
                  <div class="flex items-center">
                    <input type="radio" name="payment-method" value="qris" 
                           v-model="selectedMethod" class="radio radio-primary mr-4">
                    <div class="flex-1">
                      <div class="flex items-center space-x-3 mb-2">
                        <i class="fas fa-qrcode text-purple-500 text-xl"></i>
                        <h3 class="font-semibold text-lg">QRIS</h3>
                        <div class="badge badge-secondary badge-outline">Instant</div>
                      </div>
                      <p class="text-gray-600 text-sm">Scan QR code dengan aplikasi mobile banking atau e-wallet favorit Anda.</p>
                      <div class="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                        <span>💳 GoPay</span>
                        <span>💳 OVO</span>
                        <span>💳 DANA</span>
                        <span>💳 ShopeePay</span>
                        <span>💳 Mobile Banking</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Payment Gateway (Disabled) -->
                <div class="border rounded-lg p-4 opacity-50 cursor-not-allowed bg-gray-50">
                  <div class="flex items-center">
                    <input type="radio" name="payment-method" value="gateway" 
                           disabled class="radio mr-4">
                    <div class="flex-1">
                      <div class="flex items-center space-x-3 mb-2">
                        <i class="fas fa-credit-card text-gray-400 text-xl"></i>
                        <h3 class="font-semibold text-lg text-gray-500">Kartu Kredit/Debit</h3>
                        <div class="badge badge-outline">Coming Soon</div>
                      </div>
                      <p class="text-gray-500 text-sm">Bayar langsung dengan kartu kredit atau debit. (Segera tersedia)</p>
                    </div>
                  </div>
                </div>

              </div>

              <!-- Continue Button -->
              <div class="card-actions justify-end mt-8">
                <button 
                  class="btn btn-primary btn-lg"
                  :disabled="!selectedMethod"
                  @click="proceedToPayment"
                >
                  <i class="fas fa-arrow-right mr-2"></i>
                  Lanjutkan Pembayaran
                </button>
              </div>

            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="card bg-white/80 backdrop-blur-md shadow-xl sticky top-4">
            <div class="card-body">
              <h2 class="card-title text-lg mb-4">
                <i class="fas fa-receipt mr-2 text-green-500"></i>
                Ringkasan Pesanan
              </h2>

              <div class="space-y-4">
                <!-- Selected Plan -->
                <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                  <h3 class="font-semibold text-gray-800">{{ selectedPlan?.name || 'Finako Basic' }}</h3>
                  <p class="text-sm text-gray-600">{{ selectedPlan?.description || 'Paket berlangganan bulanan' }}</p>
                  <div class="text-2xl font-bold text-blue-600 mt-2">
                    {{ formatPrice(selectedPlan?.price || 99000) }}
                    <span class="text-sm font-normal text-gray-600">/ bulan</span>
                  </div>
                </div>

                <!-- Billing Details -->
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Subtotal</span>
                    <span class="font-semibold">{{ formatPrice(selectedPlan?.price || 99000) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">PPN (11%)</span>
                    <span class="font-semibold">{{ formatPrice(calculateTax(selectedPlan?.price || 99000)) }}</span>
                  </div>
                  <div class="divider my-2"></div>
                  <div class="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span class="text-primary">{{ formatPrice(calculateTotal(selectedPlan?.price || 99000)) }}</span>
                  </div>
                </div>

                <!-- Benefits -->
                <div class="mt-6">
                  <h4 class="font-semibold text-gray-800 mb-2">Yang Anda Dapatkan:</h4>
                  <ul class="space-y-1 text-sm text-gray-600">
                    <li class="flex items-center">
                      <i class="fas fa-check text-green-500 mr-2"></i>
                      {{ selectedPlan?.businesses || '3' }} Bisnis
                    </li>
                    <li class="flex items-center">
                      <i class="fas fa-check text-green-500 mr-2"></i>
                      {{ selectedPlan?.users || '10' }} Pengguna
                    </li>
                    <li class="flex items-center">
                      <i class="fas fa-check text-green-500 mr-2"></i>
                      {{ selectedPlan?.products || '1.000' }} Produk
                    </li>
                    <li class="flex items-center">
                      <i class="fas fa-check text-green-500 mr-2"></i>
                      Support 24/7
                    </li>
                  </ul>
                </div>

                <!-- Promo Code (Optional) -->
                <div class="mt-4">
                  <label class="label">
                    <span class="label-text">Kode Promo (Opsional)</span>
                  </label>
                  <div class="flex space-x-2">
                    <input type="text" placeholder="Masukkan kode" 
                           v-model="promoCode"
                           class="input input-bordered input-sm flex-1">
                    <button class="btn btn-outline btn-sm">Apply</button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// Reactive data
const selectedMethod = ref('')
const promoCode = ref('')

// Get selected plan from route params
const selectedPlan = computed(() => {
  const planType = route.query.plan || 'basic'
  const plans = {
    trial: {
      name: 'Finako Trial',
      description: 'Paket trial 30 hari',
      price: 0,
      businesses: '1',
      users: '3', 
      products: '100'
    },
    basic: {
      name: 'Finako Basic',
      description: 'Paket berlangganan bulanan',
      price: 99000,
      businesses: '3',
      users: '10',
      products: '1.000'
    },
    pro: {
      name: 'Finako Pro',
      description: 'Paket berlangganan premium',
      price: 299000,
      businesses: '10',
      users: '50',
      products: 'Unlimited'
    }
  }
  return plans[planType] || plans.basic
})

// Methods
const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Logout error:', error)
  }
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price)
}

const calculateTax = (price) => {
  return Math.round(price * 0.11)
}

const calculateTotal = (price) => {
  return price + calculateTax(price)
}

const proceedToPayment = () => {
  if (!selectedMethod.value) {
    alert('Silakan pilih metode pembayaran terlebih dahulu')
    return
  }

  // Navigate to specific payment instruction page
  if (selectedMethod.value === 'transfer') {
    router.push({
      name: 'TransferInstructions',
      query: {
        name: selectedPlan.value.name,
        price: selectedPlan.value.price
      }
    })
  } else if (selectedMethod.value === 'qris') {
    router.push({
      name: 'QRISPayment', 
      query: {
        name: selectedPlan.value.name,
        price: selectedPlan.value.price
      }
    })
  }
}

// Initialize
onMounted(() => {
  // Redirect if no plan selected and not from plans page
  if (!route.query.plan && !document.referrer.includes('/plans')) {
    router.push('/plans')
  }
})
</script>

<style scoped>
.radio:checked {
  border-color: #3b82f6;
  background-color: #3b82f6;
}

.input:focus {
  border-color: #60a5fa;
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>
