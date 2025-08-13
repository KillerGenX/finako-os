<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <div class="container mx-auto px-4 py-8">
      <!-- Header Navigation -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold text-gray-800">Instruksi Pembayaran Transfer</h1>
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
            
            <div class="mt-6 p-4 bg-info/10 rounded-lg">
              <p class="text-sm text-info-content">
                <i class="fas fa-info-circle mr-2"></i>
                Pembayaran akan diverifikasi dalam 1x24 jam setelah bukti transfer diterima.
              </p>
            </div>
          </div>
        </div>

        <!-- Transfer Instructions -->
        <div class="card bg-white shadow-xl">
          <div class="card-body">
            <h3 class="card-title text-xl mb-4">Instruksi Transfer</h3>
            
            <!-- Step 1: Bank Details -->
            <div class="mb-6">
              <h4 class="font-semibold text-lg mb-3">1. Transfer ke Rekening Berikut</h4>
              <div class="bg-gray-50 p-4 rounded-lg space-y-2">
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Bank</span>
                  <span class="font-semibold">BCA</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">No. Rekening</span>
                  <div class="flex items-center gap-2">
                    <span class="font-mono font-bold">1234567890</span>
                    <button 
                      @click="copyToClipboard('1234567890')"
                      class="btn btn-xs btn-ghost"
                    >
                      <i class="fas fa-copy"></i>
                    </button>
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Atas Nama</span>
                  <span class="font-semibold">PT Finako Indonesia</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Nominal</span>
                  <div class="flex items-center gap-2">
                    <span class="font-mono font-bold text-primary">Rp {{ formatCurrency(totalAmount) }}</span>
                    <button 
                      @click="copyToClipboard(totalAmount.toString())"
                      class="btn btn-xs btn-ghost"
                    >
                      <i class="fas fa-copy"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 2: Upload Proof -->
            <div class="mb-6">
              <h4 class="font-semibold text-lg mb-3">2. Upload Bukti Transfer</h4>
              
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Pilih file bukti transfer</span>
                </label>
                <input 
                  type="file" 
                  @change="handleFileUpload"
                  accept="image/*,.pdf"
                  class="file-input file-input-bordered w-full" 
                />
                <label class="label">
                  <span class="label-text-alt text-gray-500">Format: JPG, PNG, PDF (Max 5MB)</span>
                </label>
              </div>

              <!-- File Preview -->
              <div v-if="uploadedFile" class="mt-4 p-4 bg-success/10 border border-success/20 rounded-lg">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <i class="fas fa-file-alt text-success text-xl"></i>
                    <div>
                      <p class="font-semibold text-success">{{ uploadedFile.name }}</p>
                      <p class="text-sm text-gray-500">{{ formatFileSize(uploadedFile.size) }}</p>
                    </div>
                  </div>
                  <button 
                    @click="removeFile"
                    class="btn btn-xs btn-ghost text-red-500"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="card-actions justify-end">
              <button
                @click="submitPaymentProof"
                :disabled="!uploadedFile || isSubmitting"
                class="btn btn-primary w-full"
              >
                <span v-if="isSubmitting" class="loading loading-spinner"></span>
                {{ isSubmitting ? 'Mengirim...' : 'Kirim Bukti Transfer' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { supabase } from '../../composables/useSupabase'

export default {
  name: 'TransferInstructionsView',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const authStore = useAuthStore()
    
    const selectedPlan = ref(null)
    const uploadedFile = ref(null)
    const isSubmitting = ref(false)

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
    })

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('id-ID').format(amount)
    }

    const formatFileSize = (bytes) => {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const copyToClipboard = async (text) => {
      try {
        await navigator.clipboard.writeText(text)
        // Show toast or notification
        alert('Berhasil disalin ke clipboard!')
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }

    const handleFileUpload = (event) => {
      const file = event.target.files[0]
      if (file) {
        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
          alert('Ukuran file terlalu besar. Maksimal 5MB.')
          return
        }
        
        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
        if (!allowedTypes.includes(file.type)) {
          alert('Format file tidak didukung. Gunakan JPG, PNG, atau PDF.')
          return
        }
        
        uploadedFile.value = file
      }
    }

    const removeFile = () => {
      uploadedFile.value = null
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]')
      if (fileInput) fileInput.value = ''
    }

    const submitPaymentProof = async () => {
      if (!uploadedFile.value) {
        alert('Silakan pilih file bukti transfer terlebih dahulu')
        return
      }

      isSubmitting.value = true

      try {
        // Upload file to Supabase Storage
        const fileExt = uploadedFile.value.name.split('.').pop()
        const fileName = `payment-proof-${Date.now()}.${fileExt}`
        const filePath = `payment-proofs/${authStore.user.id}/${fileName}`

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('documents')
          .upload(filePath, uploadedFile.value)

        if (uploadError) {
          throw uploadError
        }

        // Create payment record in database
        const { data: paymentData, error: paymentError } = await supabase
          .from('payment_transactions')
          .insert([
            {
              user_id: authStore.user.id,
              amount: totalAmount.value,
              currency: 'IDR',
              payment_method: 'bank_transfer',
              status: 'pending',
              payment_data: {
                plan_name: selectedPlan.value.name,
                payment_proof_url: filePath
              },
              created_at: new Date().toISOString()
            }
          ])

        if (paymentError) {
          throw paymentError
        }

        // Show success message and redirect
        alert('Bukti transfer berhasil dikirim! Pembayaran akan diverifikasi dalam 1x24 jam.')
        router.push('/dashboard')

      } catch (error) {
        console.error('Error submitting payment proof:', error)
        alert('Gagal mengirim bukti transfer. Silakan coba lagi.')
      } finally {
        isSubmitting.value = false
      }
    }

    const logout = async () => {
      await authStore.logout()
      router.push('/login')
    }

    return {
      selectedPlan,
      uploadedFile,
      isSubmitting,
      totalAmount,
      formatCurrency,
      formatFileSize,
      copyToClipboard,
      handleFileUpload,
      removeFile,
      submitPaymentProof,
      logout
    }
  }
}
</script>
