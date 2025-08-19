<template>
  <div class="min-h-screen bg-gradient-to-br from-teal-50 to-green-50 p-4 md:p-6">
    <!-- Header -->
    <div class="mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">
            {{ isEditing ? 'Edit Produk' : 'Tambah Produk Baru' }}
          </h1>
          <p class="text-sm text-gray-600 mt-1">
            {{ isEditing ? 'Update informasi produk' : 'Lengkapi informasi produk untuk ditambahkan ke inventory' }}
          </p>
        </div>
        
        <!-- Back Button -->
        <router-link
          to="/products"
          class="btn btn-outline btn-sm gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Kembali
        </router-link>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="max-w-4xl mx-auto">
      <div class="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-8">
        <div class="animate-pulse space-y-6">
          <div class="h-4 bg-gray-200 rounded w-1/4"></div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-3">
              <div class="h-4 bg-gray-200 rounded w-1/3"></div>
              <div class="h-10 bg-gray-200 rounded"></div>
            </div>
            <div class="space-y-3">
              <div class="h-4 bg-gray-200 rounded w-1/3"></div>
              <div class="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Form -->
    <div v-else class="max-w-4xl mx-auto">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        
        <!-- Error Alert -->
        <div v-if="formError" class="alert alert-error">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <span>{{ formError }}</span>
          <button type="button" @click="formError = null" class="btn btn-ghost btn-sm">×</button>
        </div>

        <!-- Basic Information -->
        <div class="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Informasi Dasar
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Product Name -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Nama Produk <span class="text-red-500">*</span></span>
              </label>
              <input
                v-model="form.name"
                type="text"
                placeholder="Contoh: Laptop Gaming Asus ROG"
                class="input input-bordered"
                :class="{ 'input-error': errors.name }"
                @blur="validateField('name')"
              />
              <label v-if="errors.name" class="label">
                <span class="label-text-alt text-error">{{ errors.name }}</span>
              </label>
            </div>

            <!-- Category -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Kategori</span>
              </label>
              <select
                v-model="form.category_id"
                class="select select-bordered"
              >
                <option value="">Pilih Kategori</option>
                <option
                  v-for="category in flatCategories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.display_name }}
                </option>
              </select>
            </div>

            <!-- SKU -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">SKU</span>
                <span class="label-text-alt">Kosongkan untuk auto-generate</span>
              </label>
              <input
                v-model="form.sku"
                type="text"
                placeholder="Auto-generate jika kosong"
                class="input input-bordered"
                :class="{ 'input-error': errors.sku }"
                @blur="validateField('sku')"
              />
              <label v-if="errors.sku" class="label">
                <span class="label-text-alt text-error">{{ errors.sku }}</span>
              </label>
            </div>

            <!-- Barcode -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Barcode</span>
              </label>
              <input
                v-model="form.barcode"
                type="text"
                placeholder="Barcode produk (opsional)"
                class="input input-bordered"
              />
            </div>

            <!-- Unit -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Satuan <span class="text-red-500">*</span></span>
              </label>
              <select
                v-model="form.unit"
                class="select select-bordered"
                :class="{ 'select-error': errors.unit }"
                @change="validateField('unit')"
              >
                <option value="">Pilih Satuan</option>
                <option value="pcs">Pcs</option>
                <option value="kg">Kilogram</option>
                <option value="gram">Gram</option>
                <option value="liter">Liter</option>
                <option value="ml">Milliliter</option>
                <option value="meter">Meter</option>
                <option value="cm">Centimeter</option>
                <option value="box">Box</option>
                <option value="pack">Pack</option>
                <option value="lusin">Lusin</option>
              </select>
              <label v-if="errors.unit" class="label">
                <span class="label-text-alt text-error">{{ errors.unit }}</span>
              </label>
            </div>

            <!-- Tax Rate -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Pajak (%)</span>
              </label>
              <input
                v-model.number="form.tax_rate"
                type="number"
                min="0"
                max="100"
                step="0.01"
                placeholder="0"
                class="input input-bordered"
              />
            </div>
          </div>

          <!-- Description -->
          <div class="form-control mt-6">
            <label class="label">
              <span class="label-text font-medium">Deskripsi</span>
            </label>
            <textarea
              v-model="form.description"
              class="textarea textarea-bordered"
              rows="3"
              placeholder="Deskripsi produk (opsional)"
            ></textarea>
          </div>
        </div>

        <!-- Pricing -->
        <div class="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            Harga
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Cost Price -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Harga Beli</span>
                <span class="label-text-alt">Per {{ form.unit || 'unit' }}</span>
              </label>
              <input
                v-model.number="form.cost_price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0"
                class="input input-bordered"
                @blur="calculateProfit"
              />
            </div>

            <!-- Selling Price -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Harga Jual <span class="text-red-500">*</span></span>
                <span class="label-text-alt">Per {{ form.unit || 'unit' }}</span>
              </label>
              <input
                v-model.number="form.selling_price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0"
                class="input input-bordered"
                :class="{ 'input-error': errors.selling_price }"
                @blur="validateField('selling_price'); calculateProfit()"
              />
              <label v-if="errors.selling_price" class="label">
                <span class="label-text-alt text-error">{{ errors.selling_price }}</span>
              </label>
            </div>
          </div>

          <!-- Profit Display -->
          <div v-if="profitInfo.show" class="mt-4 p-4 bg-gray-50 rounded-lg">
            <div class="flex justify-between items-center text-sm">
              <span class="font-medium text-gray-600">Keuntungan:</span>
              <span :class="profitInfo.color">
                {{ formatCurrency(profitInfo.amount) }} ({{ profitInfo.percentage }}%)
              </span>
            </div>
          </div>
        </div>

        <!-- Stock Management -->
        <div class="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Manajemen Stok
            </h2>
            
            <!-- Track Stock Toggle -->
            <div class="form-control">
              <label class="cursor-pointer label">
                <span class="label-text mr-2">Lacak Stok</span>
                <input
                  v-model="form.track_stock"
                  type="checkbox"
                  class="toggle toggle-primary"
                />
              </label>
            </div>
          </div>
          
          <div v-if="form.track_stock" class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Current Stock -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Stok Saat Ini</span>
              </label>
              <input
                v-model.number="form.current_stock"
                type="number"
                min="0"
                placeholder="0"
                class="input input-bordered"
              />
            </div>

            <!-- Min Stock -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Stok Minimum</span>
              </label>
              <input
                v-model.number="form.min_stock"
                type="number"
                min="0"
                placeholder="0"
                class="input input-bordered"
                :class="{ 'input-error': errors.min_stock }"
                @blur="validateField('min_stock')"
              />
              <label v-if="errors.min_stock" class="label">
                <span class="label-text-alt text-error">{{ errors.min_stock }}</span>
              </label>
            </div>

            <!-- Max Stock -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Stok Maksimum</span>
              </label>
              <input
                v-model.number="form.max_stock"
                type="number"
                min="0"
                placeholder="0"
                class="input input-bordered"
                :class="{ 'input-error': errors.max_stock }"
                @blur="validateField('max_stock')"
              />
              <label v-if="errors.max_stock" class="label">
                <span class="label-text-alt text-error">{{ errors.max_stock }}</span>
              </label>
            </div>
          </div>

          <div v-else class="text-center py-8 text-gray-500">
            <svg class="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M9.878 9.878a3 3 0 00-4.243-4.243m4.243 4.243L8.464 8.464" />
            </svg>
            <p>Pelacakan stok dinonaktifkan</p>
            <p class="text-sm">Aktifkan toggle di atas untuk mengelola stok produk</p>
          </div>
        </div>

        <!-- Image Upload -->
        <div class="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Gambar Produk
          </h2>
          
          <!-- Coming Soon Message -->
          <div class="text-center py-8">
            <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 class="text-lg font-medium text-gray-800 mb-2">Upload Gambar</h3>
            <p class="text-gray-600 mb-4">Fitur upload gambar akan segera tersedia</p>
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 max-w-sm mx-auto">
              <p class="text-sm text-blue-700">
                Sementara ini, produk akan menggunakan placeholder image default
              </p>
            </div>
          </div>
        </div>

        <!-- Status -->
        <div class="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Status Produk
          </h2>
          
          <div class="form-control">
            <label class="cursor-pointer label justify-start gap-4">
              <input
                v-model="form.is_active"
                type="checkbox"
                class="toggle toggle-success"
              />
              <div>
                <span class="label-text font-medium">
                  {{ form.is_active ? 'Produk Aktif' : 'Produk Nonaktif' }}
                </span>
                <p class="text-sm text-gray-500 mt-1">
                  {{ form.is_active 
                    ? 'Produk dapat dilihat dan dijual' 
                    : 'Produk disembunyikan dari penjualan' 
                  }}
                </p>
              </div>
            </label>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6">
          <div class="flex flex-col sm:flex-row gap-4 justify-end">
            <!-- Cancel -->
            <router-link
              to="/products"
              class="btn btn-outline"
              :disabled="saving"
            >
              Batal
            </router-link>
            
            <!-- Save Draft (Future Feature) -->
            <button
              type="button"
              class="btn btn-ghost"
              disabled
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Simpan Draft
            </button>
            
            <!-- Submit -->
            <button
              type="submit"
              class="btn btn-primary min-w-32"
              :disabled="saving"
            >
              <span v-if="saving" class="loading loading-spinner loading-sm"></span>
              <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {{ isEditing ? 'Update Produk' : 'Simpan Produk' }}
            </button>
          </div>
        </div>

      </form>
    </div>

    <!-- Success Toast -->
    <div v-if="showSuccessToast" class="toast toast-top toast-end">
      <div class="alert alert-success">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <span>{{ successMessage }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProducts } from '../../composables/useProducts'
import { useCategories } from '../../composables/useCategories'

const route = useRoute()
const router = useRouter()
const { createProduct, updateProduct, getProduct } = useProducts()
const { getCategories, flatCategories } = useCategories()

// Component state
const loading = ref(false)
const saving = ref(false)
const formError = ref(null)
const showSuccessToast = ref(false)
const successMessage = ref('')
const errors = ref({})

// Form data
const form = ref({
  name: '',
  description: '',
  category_id: '',
  sku: '',
  barcode: '',
  unit: '',
  cost_price: 0,
  selling_price: 0,
  min_stock: 0,
  max_stock: null,
  current_stock: 0,
  track_stock: true,
  tax_rate: 0,
  is_active: true
})

// Computed
const isEditing = computed(() => route.name === 'ProductEdit')
const productId = computed(() => route.params.id)

// Profit calculation
const profitInfo = ref({
  show: false,
  amount: 0,
  percentage: 0,
  color: 'text-gray-600'
})

// Methods
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount)
}

const calculateProfit = () => {
  if (form.value.selling_price && form.value.cost_price) {
    const profit = form.value.selling_price - form.value.cost_price
    const percentage = ((profit / form.value.cost_price) * 100).toFixed(1)
    
    profitInfo.value = {
      show: true,
      amount: profit,
      percentage: percentage,
      color: profit >= 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'
    }
  } else {
    profitInfo.value.show = false
  }
}

const validateField = (fieldName) => {
  errors.value[fieldName] = null
  
  switch (fieldName) {
    case 'name':
      if (!form.value.name?.trim()) {
        errors.value.name = 'Nama produk wajib diisi'
      } else if (form.value.name.trim().length > 255) {
        errors.value.name = 'Nama produk tidak boleh lebih dari 255 karakter'
      }
      break
      
    case 'selling_price':
      if (!form.value.selling_price || form.value.selling_price <= 0) {
        errors.value.selling_price = 'Harga jual wajib diisi dan harus lebih dari 0'
      }
      break
      
    case 'unit':
      if (!form.value.unit?.trim()) {
        errors.value.unit = 'Satuan produk wajib dipilih'
      }
      break
      
    case 'min_stock':
      if (form.value.min_stock < 0) {
        errors.value.min_stock = 'Stok minimum tidak boleh negatif'
      }
      if (form.value.max_stock && form.value.min_stock > form.value.max_stock) {
        errors.value.min_stock = 'Stok minimum tidak boleh lebih besar dari stok maksimum'
      }
      break
      
    case 'max_stock':
      if (form.value.max_stock && form.value.max_stock < 0) {
        errors.value.max_stock = 'Stok maksimum tidak boleh negatif'
      }
      if (form.value.min_stock && form.value.max_stock && form.value.min_stock > form.value.max_stock) {
        errors.value.max_stock = 'Stok maksimum tidak boleh lebih kecil dari stok minimum'
      }
      break
      
    case 'sku':
      // SKU validation will be handled by backend for uniqueness
      break
  }
}

const validateForm = () => {
  errors.value = {}
  
  validateField('name')
  validateField('selling_price')
  validateField('unit')
  
  if (form.value.track_stock) {
    validateField('min_stock')
    validateField('max_stock')
  }
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  formError.value = null
  
  if (!validateForm()) {
    formError.value = 'Mohon periksa kembali form yang diisi'
    return
  }
  
  saving.value = true
  
  try {
    let result
    
    // Prepare form data
    const productData = {
      ...form.value,
      name: form.value.name.trim(),
      description: form.value.description?.trim() || null,
      sku: form.value.sku?.trim() || null,
      barcode: form.value.barcode?.trim() || null,
      category_id: form.value.category_id || null
    }
    
    if (isEditing.value) {
      result = await updateProduct(productId.value, productData)
      successMessage.value = 'Produk berhasil diupdate!'
    } else {
      result = await createProduct(productData)
      successMessage.value = 'Produk berhasil ditambahkan!'
    }
    
    if (result) {
      showSuccessToast.value = true
      
      // Hide toast after 3 seconds
      setTimeout(() => {
        showSuccessToast.value = false
      }, 3000)
      
      // Redirect to product list after short delay
      setTimeout(() => {
        router.push('/products')
      }, 1500)
    }
    
  } catch (error) {
    console.error('Error saving product:', error)
    formError.value = error.message || 'Terjadi kesalahan saat menyimpan produk'
  } finally {
    saving.value = false
  }
}

const loadProduct = async () => {
  if (!isEditing.value) return
  
  loading.value = true
  
  try {
    const product = await getProduct(productId.value)
    if (product) {
      // Map product data to form
      Object.keys(form.value).forEach(key => {
        if (product[key] !== undefined) {
          form.value[key] = product[key]
        }
      })
    } else {
      formError.value = 'Produk tidak ditemukan'
      setTimeout(() => {
        router.push('/products')
      }, 2000)
    }
  } catch (error) {
    console.error('Error loading product:', error)
    formError.value = 'Gagal memuat data produk'
  } finally {
    loading.value = false
  }
}

const loadCategories = async () => {
  try {
    await getCategories()
  } catch (error) {
    console.error('Error loading categories:', error)
  }
}

// Watch for profit calculation
watch([() => form.value.selling_price, () => form.value.cost_price], calculateProfit)

// Lifecycle
onMounted(async () => {
  await loadCategories()
  await loadProduct()
})
</script>
