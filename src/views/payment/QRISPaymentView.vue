<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <div class="container mx-auto px-4 py-8">
      <!-- Header Navigation -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold text-gray-800">Pembayaran QRIS</h1>
        <div class="flex gap-4">
          <button
            @click="$router.back()"
            class="btn btn-ghost btn-sm"
          >
            ← Kembali
          </button>
          <button
            @click="logout"
            class="btn btn-ghost btn-sm text-red-500 hover:text-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      <div class="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- QR Code Section -->
        <div class="card bg-white shadow-xl">
          <div class="card-body items-center text-center">
            <h3 class="card-title text-xl mb-4">Scan QR Code untuk Bayar</h3>
            
            <!-- QR Code Display -->
            <div class="bg-gray-100 p-8 rounded-xl mb-4">
              <div class="w-64 h-64 mx-auto bg-white p-4 rounded-lg shadow-inner flex items-center justify-center">
                <!-- Placeholder QR Code - Replace with actual QR code generator -->
                <div class="w-full h-full bg-black" style="
                  background-image: 
                    repeating-linear-gradient(0deg, transparent, transparent 4px, black 4px, black 8px),
                    repeating-linear-gradient(90deg, transparent, transparent 4px, black 4px, black 8px);
                  background-size: 8px 8px;
                "></div>
              </div>
            </div>

            <div class="text-center space-y-2 mb-4">
              <p class="text-lg font-bold text-primary">Total: Rp {{ formatCurrency(totalAmount) }}</p>
              <p class="text-sm text-gray-600">Berlaku dalam {{ formatTime(timeLeft) }}</p>
            </div>

            <!-- Payment Status -->
            <div v-if="paymentStatus === 'waiting'" class="alert alert-info">
              <i class="fas fa-clock"></i>
              <span>Menunggu pembayaran...</span>
            </div>
            
            <div v-else-if="paymentStatus === 'success'" class="alert alert-success">
              <i class="fas fa-check-circle"></i>
              <span>Pembayaran berhasil!</span>
            </div>
            
            <div v-else-if="paymentStatus === 'expired'" class="alert alert-error">
              <i class="fas fa-times-circle"></i>
              <span>QR Code telah kedaluwarsa</span>
            </div>

            <!-- Action Buttons -->
            <div class="card-actions flex-col w-full mt-6">
              <button
                v-if="paymentStatus === 'expired'"
                @click="generateNewQR"
                class="btn btn-primary w-full"
              >
                <i class="fas fa-refresh mr-2"></i>
                Generate QR Code Baru
              </button>
              
              <button
                v-else-if="paymentStatus === 'waiting'"
                @click="checkPaymentStatus"
                :disabled="isChecking"
                class="btn btn-outline w-full"
              >
                <span v-if="isChecking" class="loading loading-spinner"></span>
                {{ isChecking ? 'Mengecek...' : 'Cek Status Pembayaran' }}
              </button>
              
              <button
                v-else-if="paymentStatus === 'success'"
                @click="goToDashboard"
                class="btn btn-success w-full"
              >
                <i class="fas fa-arrow-right mr-2"></i>
                Lanjut ke Dashboard
              </button>
            </div>
          </div>
        </div>

        <!-- Payment Information -->
        <div class="space-y-6">
          <!-- Order Summary -->
          <div class="card bg-white shadow-xl">
            <div class="card-body">
              <h3 class="card-title text-xl mb-4">Ringkasan Pesanan</h3>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">Paket {{ selectedPlan?.name || 'Basic' }}</span>
                  <span class="font-semibold">Rp {{ formatCurrency(selectedPlan?.price || 99000) }}</span>
                </div>
                <div class="flex justify-between text-sm text-gray-500">
                  <span>PPN (11%)</span>
                  <span>Rp {{ formatCurrency(Math.round((selectedPlan?.price || 99000) * 0.11)) }}</span>
                </div>
                <hr>
                <div class="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span class="text-primary">Rp {{ formatCurrency(totalAmount) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Instructions -->
          <div class="card bg-white shadow-xl">
            <div class="card-body">
              <h3 class="card-title text-xl mb-4">Cara Pembayaran</h3>
              <div class="space-y-4">
                <div class="flex gap-3">
                  <div class="badge badge-primary badge-lg">1</div>
                  <div>
                    <h4 class="font-semibold">Buka Aplikasi E-Wallet</h4>
                    <p class="text-sm text-gray-600">Bisa menggunakan DANA, GoPay, OVO, ShopeePay, atau aplikasi perbankan yang mendukung QRIS</p>
                  </div>
                </div>
                
                <div class="flex gap-3">
                  <div class="badge badge-primary badge-lg">2</div>
                  <div>
                    <h4 class="font-semibold">Scan QR Code</h4>
                    <p class="text-sm text-gray-600">Gunakan fitur scan QR/QRIS di aplikasi Anda</p>
                  </div>
                </div>
                
                <div class="flex gap-3">
                  <div class="badge badge-primary badge-lg">3</div>
                  <div>
                    <h4 class="font-semibold">Konfirmasi Pembayaran</h4>
                    <p class="text-sm text-gray-600">Pastikan nominal sudah benar, lalu lanjutkan pembayaran</p>
                  </div>
                </div>
                
                <div class="flex gap-3">
                  <div class="badge badge-primary badge-lg">4</div>
                  <div>
                    <h4 class="font-semibold">Pembayaran Selesai</h4>
                    <p class="text-sm text-gray-600">Sistem akan otomatis mengaktifkan subscription Anda</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Support Info -->
          <div class="card bg-gray-50 shadow-lg">
            <div class="card-body">
              <h3 class="card-title text-lg">Butuh Bantuan?</h3>
              <p class="text-sm text-gray-600 mb-3">
                Jika mengalami kendala dalam pembayaran, hubungi customer service kami:
              </p>
              <div class="flex flex-col gap-2 text-sm">
                <div class="flex items-center gap-2">
                  <i class="fas fa-phone text-primary"></i>
                  <span>+62 812-3456-7890</span>
                </div>
                <div class="flex items-center gap-2">
                  <i class="fas fa-envelope text-primary"></i>
                  <span>support@finako.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { supabase } from '../../composables/useSupabase'

export default {
  name: 'QRISPaymentView',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const authStore = useAuthStore()
    
    const selectedPlan = ref(null)
    const paymentStatus = ref('waiting') // waiting, success, expired
    const timeLeft = ref(15 * 60) // 15 minutes in seconds
    const isChecking = ref(false)
    const paymentTimer = ref(null)
    const statusCheckInterval = ref(null)

    const totalAmount = computed(() => {
      if (!selectedPlan.value) return 0
      const basePrice = selectedPlan.value.price
      const tax = Math.round(basePrice * 0.11)
      return basePrice + tax
    })

    onMounted(() => {
      // Get plan data from route query
      const planData = route.query
      if (planData.name) {
        selectedPlan.value = {
          name: planData.name,
          price: parseInt(planData.price) || 99000
        }
      } else {
        // Default to Basic plan if no plan selected
        selectedPlan.value = {
          name: 'Basic',
          price: 99000
        }
      }

      // Start countdown timer
      startTimer()
      
      // Start periodic status checking (every 5 seconds)
      startStatusChecking()
    })

    onUnmounted(() => {
      // Clear intervals when component is destroyed
      if (paymentTimer.value) {
        clearInterval(paymentTimer.value)
      }
      if (statusCheckInterval.value) {
        clearInterval(statusCheckInterval.value)
      }
    })

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('id-ID').format(amount)
    }

    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    const startTimer = () => {
      paymentTimer.value = setInterval(() => {
        if (timeLeft.value > 0) {
          timeLeft.value--
        } else {
          paymentStatus.value = 'expired'
          clearInterval(paymentTimer.value)
          clearInterval(statusCheckInterval.value)
        }
      }, 1000)
    }

    const startStatusChecking = () => {
      // Check payment status every 5 seconds
      statusCheckInterval.value = setInterval(() => {
        if (paymentStatus.value === 'waiting') {
          checkPaymentStatusSilently()
        }
      }, 5000)
    }

    const checkPaymentStatus = async () => {
      isChecking.value = true
      await checkPaymentStatusSilently()
      isChecking.value = false
    }

    const checkPaymentStatusSilently = async () => {
      try {
        // In a real implementation, you would check payment status via API
        // For now, simulate random success for demo purposes
        const randomSuccess = Math.random() > 0.8 // 20% chance of success for demo
        
        if (randomSuccess) {
          paymentStatus.value = 'success'
          clearInterval(paymentTimer.value)
          clearInterval(statusCheckInterval.value)
          
          // Create payment record and update subscription
          await processSuccessfulPayment()
        }
      } catch (error) {
        console.error('Error checking payment status:', error)
      }
    }

    const processSuccessfulPayment = async () => {
      try {
        // Create payment record
        const { data: paymentData, error: paymentError } = await supabase
          .from('payment_transactions')
          .insert([
            {
              user_id: authStore.user.id,
              amount: totalAmount.value,
              currency: 'IDR',
              payment_method: 'qris',
              status: 'success',
              payment_data: {
                plan_name: selectedPlan.value.name
              },
              created_at: new Date().toISOString()
            }
          ])

        if (paymentError) {
          throw paymentError
        }

        // Update user subscription - this would trigger the database trigger
        // For now, just log success
        console.log('Payment successful, subscription should be updated via trigger')
        
      } catch (error) {
        console.error('Error processing successful payment:', error)
      }
    }

    const generateNewQR = () => {
      // Reset payment status and timer
      paymentStatus.value = 'waiting'
      timeLeft.value = 15 * 60
      
      // Clear existing intervals
      if (paymentTimer.value) clearInterval(paymentTimer.value)
      if (statusCheckInterval.value) clearInterval(statusCheckInterval.value)
      
      // Start new timers
      startTimer()
      startStatusChecking()
    }

    const goToDashboard = () => {
      router.push('/dashboard')
    }

    const logout = async () => {
      await authStore.logout()
      router.push('/login')
    }

    return {
      selectedPlan,
      paymentStatus,
      timeLeft,
      isChecking,
      totalAmount,
      formatCurrency,
      formatTime,
      checkPaymentStatus,
      generateNewQR,
      goToDashboard,
      logout
    }
  }
}
</script>

<style scoped>
/* Custom QR code pattern - replace with actual QR code when integrating with payment provider */
</style>
