<template>
  <div class="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-300 py-8 px-4">
    <!-- Progress Bar -->
    <div class="container mx-auto max-w-4xl mb-8">
      <div class="bg-base-100/80 backdrop-blur-xl rounded-xl p-6 shadow-xl border border-base-300/50">
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-2xl font-bold text-base-content">Setup Bisnis Anda</h1>
          <div class="text-sm text-base-content/60">
            Step {{ currentStep }} dari {{ totalSteps }}
          </div>
        </div>
        
        <!-- Progress Steps -->
        <div class="flex items-center justify-between relative">
          <div class="absolute top-1/2 left-0 right-0 h-0.5 bg-base-300 -translate-y-1/2"></div>
          <div 
            class="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 transition-all duration-500"
            :style="{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }"
          ></div>
          
          <div 
            v-for="(step, index) in steps" 
            :key="index"
            class="flex flex-col items-center relative z-10"
          >
            <div 
              class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300"
              :class="[
                index + 1 < currentStep ? 'bg-primary text-primary-content' : '',
                index + 1 === currentStep ? 'bg-primary text-primary-content ring-4 ring-primary/30' : '',
                index + 1 > currentStep ? 'bg-base-300 text-base-content/60' : ''
              ]"
            >
              <svg v-if="index + 1 < currentStep" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span v-else>{{ index + 1 }}</span>
            </div>
            <span class="text-xs mt-2 text-center text-base-content/80 max-w-20">{{ step.title }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="container mx-auto max-w-4xl">
      <div class="bg-base-100/95 backdrop-blur-xl rounded-xl shadow-2xl border border-base-300/50 min-h-[500px]">
        
        <!-- Step 1: Welcome -->
        <div v-if="currentStep === 1" class="p-8 text-center">
          <div class="w-24 h-24 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-6">
            <svg class="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0v-4a2 2 0 011-1h1m0 0V9a2 2 0 011-1h1m0 0V5a2 2 0 011-1h1"></path>
            </svg>
          </div>
          
          <h2 class="text-3xl font-bold text-base-content mb-4">
            Selamat Datang di Finako! 🎉
          </h2>
          
          <p class="text-lg text-base-content/80 mb-6 max-w-2xl mx-auto">
            Mari setup bisnis Anda dalam beberapa langkah sederhana. Proses ini hanya membutuhkan waktu 3-5 menit.
          </p>
          
          <!-- Trial Status -->
          <div class="bg-gradient-to-r from-success/20 to-primary/20 rounded-lg p-4 mb-8 max-w-md mx-auto border border-success/30">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div class="text-left">
                <h4 class="font-semibold text-success">Trial Aktif</h4>
                <p class="text-xs text-base-content/70">30 hari gratis untuk semua fitur dasar</p>
              </div>
            </div>
          </div>
          
          <!-- What we'll setup -->
          <div class="grid md:grid-cols-3 gap-4 mb-8">
            <div class="bg-base-200/50 rounded-lg p-4">
              <div class="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0v-4a2 2 0 011-1h1m0 0V9a2 2 0 011-1h1m0 0V5a2 2 0 011-1h1"></path>
                </svg>
              </div>
              <h5 class="font-semibold text-base-content mb-1">Profil Bisnis</h5>
              <p class="text-xs text-base-content/60">Nama, alamat, dan info dasar</p>
            </div>
            
            <div class="bg-base-200/50 rounded-lg p-4">
              <div class="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h5 class="font-semibold text-base-content mb-1">Jenis Industri</h5>
              <p class="text-xs text-base-content/60">Sektor bisnis Anda</p>
            </div>
            
            <div class="bg-base-200/50 rounded-lg p-4">
              <div class="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h5 class="font-semibold text-base-content mb-1">Fitur Utama</h5>
              <p class="text-xs text-base-content/60">Pilih modul yang dibutuhkan</p>
            </div>
          </div>
        </div>

        <!-- Step 2: Business Info -->
        <div v-if="currentStep === 2" class="p-8">
          <div class="max-w-2xl mx-auto">
            <div class="text-center mb-8">
              <div class="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0v-4a2 2 0 011-1h1m0 0V9a2 2 0 011-1h1m0 0V5a2 2 0 011-1h1"></path>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-base-content mb-2">Informasi Bisnis</h2>
              <p class="text-base-content/70">Ceritakan tentang bisnis Anda</p>
            </div>
            
            <form @submit.prevent="nextStep" class="space-y-6">
              <div>
                <label class="label">
                  <span class="label-text font-medium">Nama Bisnis *</span>
                </label>
                <input 
                  v-model="businessData.name"
                  type="text" 
                  placeholder="Contoh: Toko Sembako Pak Budi"
                  class="input input-bordered w-full" 
                  required
                />
              </div>
              
              <div>
                <label class="label">
                  <span class="label-text font-medium">Tipe Bisnis</span>
                </label>
                <select v-model="businessData.business_type" class="select select-bordered w-full">
                  <option value="">Pilih tipe bisnis</option>
                  <option value="retail">Retail/Toko</option>
                  <option value="restaurant">Restoran/Cafe</option>
                  <option value="service">Jasa/Service</option>
                  <option value="wholesale">Grosir</option>
                  <option value="manufacturing">Manufaktur</option>
                  <option value="other">Lainnya</option>
                </select>
              </div>
              
              <div>
                <label class="label">
                  <span class="label-text font-medium">Deskripsi Singkat</span>
                </label>
                <textarea 
                  v-model="businessData.description"
                  class="textarea textarea-bordered w-full h-24" 
                  placeholder="Jelaskan singkat tentang bisnis Anda..."
                ></textarea>
              </div>
              
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="label">
                    <span class="label-text font-medium">Kota</span>
                  </label>
                  <input 
                    v-model="businessData.city"
                    type="text" 
                    placeholder="Contoh: Jakarta"
                    class="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label class="label">
                    <span class="label-text font-medium">Provinsi</span>
                  </label>
                  <input 
                    v-model="businessData.province"
                    type="text" 
                    placeholder="Contoh: DKI Jakarta"
                    class="input input-bordered w-full"
                  />
                </div>
              </div>
              
              <div>
                <label class="label">
                  <span class="label-text font-medium">Alamat Lengkap</span>
                </label>
                <textarea 
                  v-model="businessData.address"
                  class="textarea textarea-bordered w-full h-20" 
                  placeholder="Alamat lengkap bisnis Anda..."
                ></textarea>
              </div>
            </form>
          </div>
        </div>

        <!-- Step 3: Industry Selection -->
        <div v-if="currentStep === 3" class="p-8">
          <div class="max-w-3xl mx-auto">
            <div class="text-center mb-8">
              <div class="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <svg class="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-base-content mb-2">Pilih Industri</h2>
              <p class="text-base-content/70">Pilih sektor yang paling cocok dengan bisnis Anda</p>
            </div>
            
            <div class="grid md:grid-cols-2 gap-4">
              <div 
                v-for="industry in industries" 
                :key="industry.value"
                @click="businessData.industry = industry.value"
                class="card bg-base-200/50 hover:bg-base-200 border-2 transition-all duration-200 cursor-pointer"
                :class="[
                  businessData.industry === industry.value 
                    ? 'border-primary bg-primary/10' 
                    : 'border-transparent hover:border-base-300'
                ]"
              >
                <div class="card-body p-4">
                  <div class="flex items-start gap-3">
                    <div 
                      class="w-12 h-12 rounded-lg flex items-center justify-center"
                      :class="businessData.industry === industry.value ? 'bg-primary/20' : 'bg-base-300/50'"
                    >
                      <div class="text-2xl">{{ industry.icon }}</div>
                    </div>
                    <div class="flex-1">
                      <h3 class="font-semibold text-base-content mb-1">{{ industry.name }}</h3>
                      <p class="text-sm text-base-content/70">{{ industry.description }}</p>
                    </div>
                    <div v-if="businessData.industry === industry.value" class="text-primary">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 4: Features Selection -->
        <div v-if="currentStep === 4" class="p-8">
          <div class="max-w-3xl mx-auto">
            <div class="text-center mb-8">
              <div class="w-16 h-16 mx-auto bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                <svg class="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-base-content mb-2">Pilih Fitur Utama</h2>
              <p class="text-base-content/70">Pilih modul yang akan Anda gunakan (bisa diubah nanti)</p>
            </div>
            
            <div class="grid md:grid-cols-2 gap-4">
              <div 
                v-for="feature in features" 
                :key="feature.key"
                @click="toggleFeature(feature.key)"
                class="card bg-base-200/50 hover:bg-base-200 border-2 transition-all duration-200 cursor-pointer"
                :class="[
                  selectedFeatures.includes(feature.key)
                    ? 'border-primary bg-primary/10' 
                    : 'border-transparent hover:border-base-300'
                ]"
              >
                <div class="card-body p-4">
                  <div class="flex items-start gap-3">
                    <div 
                      class="w-12 h-12 rounded-lg flex items-center justify-center"
                      :class="selectedFeatures.includes(feature.key) ? 'bg-primary/20' : 'bg-base-300/50'"
                    >
                      <svg class="w-6 h-6" :class="selectedFeatures.includes(feature.key) ? 'text-primary' : 'text-base-content/60'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="feature.icon"></path>
                      </svg>
                    </div>
                    <div class="flex-1">
                      <h3 class="font-semibold text-base-content mb-1">{{ feature.name }}</h3>
                      <p class="text-sm text-base-content/70">{{ feature.description }}</p>
                      <div class="flex flex-wrap gap-1 mt-2">
                        <span v-for="tag in feature.tags" :key="tag" class="badge badge-xs badge-outline">{{ tag }}</span>
                      </div>
                    </div>
                    <div v-if="selectedFeatures.includes(feature.key)" class="text-primary">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="text-center mt-6">
              <p class="text-sm text-base-content/60">
                💡 Tip: Pilih minimal 1 fitur. Anda bisa menambah atau mengubah fitur kapan saja nanti.
              </p>
            </div>
          </div>
        </div>

        <!-- Step 5: Complete -->
        <div v-if="currentStep === 5" class="p-8 text-center">
          <div class="max-w-2xl mx-auto">
            <div v-if="!isCompleting">
              <div class="w-24 h-24 mx-auto bg-success/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <svg class="w-12 h-12 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              
              <h2 class="text-3xl font-bold text-base-content mb-4">
                Setup Selesai! 🎉
              </h2>
              
              <p class="text-lg text-base-content/80 mb-8">
                Bisnis Anda telah berhasil dikonfigurasi. Anda siap untuk mulai mengelola keuangan dan operasional.
              </p>
              
              <!-- Summary -->
              <div class="bg-base-200/50 rounded-lg p-6 mb-8 text-left">
                <h3 class="font-semibold text-base-content mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  Ringkasan Setup:
                </h3>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-base-content/70">Nama Bisnis:</span>
                    <span class="font-medium">{{ businessData.name || 'Belum diisi' }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-base-content/70">Tipe Bisnis:</span>
                    <span class="font-medium">{{ getBusinessTypeLabel(businessData.business_type) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-base-content/70">Industri:</span>
                    <span class="font-medium">{{ getIndustryLabel(businessData.industry) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-base-content/70">Lokasi:</span>
                    <span class="font-medium">{{ businessData.city || 'Belum diisi' }}, {{ businessData.province || 'Belum diisi' }}</span>
                  </div>
                  <div>
                    <span class="text-base-content/70">Fitur Terpilih:</span>
                    <div class="flex flex-wrap gap-1 mt-1">
                      <span v-for="feature in getSelectedFeatureLabels()" :key="feature" class="badge badge-primary badge-sm">{{ feature }}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Next Steps -->
              <div class="bg-primary/10 rounded-lg p-6 mb-8 text-left border border-primary/20">
                <h3 class="font-semibold text-primary mb-4 flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  Langkah Selanjutnya:
                </h3>
                <ol class="list-decimal list-inside space-y-2 text-sm text-base-content/80">
                  <li>Masuk ke dashboard untuk melihat overview bisnis</li>
                  <li>Tambahkan produk/layanan pertama Anda</li>
                  <li>Setup metode pembayaran dan kategori</li>
                  <li>Mulai catat transaksi harian</li>
                  <li>Lihat laporan dan analisis performa</li>
                </ol>
              </div>
            </div>
            
            <!-- Loading State -->
            <div v-else class="py-12">
              <div class="w-20 h-20 mx-auto border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-6"></div>
              <h3 class="text-xl font-semibold text-base-content mb-2">Menyimpan Data...</h3>
              <p class="text-base-content/70">Sedang menyiapkan bisnis Anda</p>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="p-6 border-t border-base-300/50 bg-base-200/30">
          <div class="flex justify-between">
            <button 
              v-if="currentStep > 1"
              @click="previousStep"
              class="btn btn-outline"
              :disabled="isCompleting"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Kembali
            </button>
            <div v-else></div>
            
            <button 
              v-if="currentStep < totalSteps"
              @click="nextStep"
              class="btn btn-primary"
              :disabled="!canProceed || isCompleting"
            >
              {{ currentStep === totalSteps - 1 ? 'Selesaikan Setup' : 'Lanjutkan' }}
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
            
            <button 
              v-else
              @click="completeBusiness"
              class="btn btn-success"
              :disabled="isCompleting"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Masuk ke Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useBusiness } from '@/composables/useBusiness'

const router = useRouter()
const authStore = useAuthStore()
const { createBusiness, getUserActiveSubscription } = useBusiness()

// State
const currentStep = ref(1)
const totalSteps = ref(5)
const isCompleting = ref(false)

// Business data
const businessData = ref({
  name: '',
  business_type: '',
  description: '',
  address: '',
  city: '',
  province: '',
  industry: '',
  postal_code: '',
  phone: '',
  website: ''
})

const selectedFeatures = ref([])

// Steps configuration
const steps = ref([
  { title: 'Welcome' },
  { title: 'Bisnis' },
  { title: 'Industri' },
  { title: 'Fitur' },
  { title: 'Selesai' }
])

// Industry options
const industries = ref([
  { value: 'retail', name: 'Retail & Perdagangan', description: 'Toko, supermarket, minimarket', icon: '🏪' },
  { value: 'food_beverage', name: 'Makanan & Minuman', description: 'Restoran, cafe, katering', icon: '🍽️' },
  { value: 'service', name: 'Jasa & Layanan', description: 'Konsultan, salon, bengkel', icon: '🛠️' },
  { value: 'manufacturing', name: 'Manufaktur', description: 'Produksi, pabrik, craft', icon: '🏭' },
  { value: 'wholesale', name: 'Grosir & Distribusi', description: 'Supplier, distributor', icon: '📦' },
  { value: 'technology', name: 'Teknologi', description: 'Software, IT services', icon: '💻' },
  { value: 'healthcare', name: 'Kesehatan', description: 'Klinik, apotek, laboratorium', icon: '🏥' },
  { value: 'education', name: 'Pendidikan', description: 'Sekolah, kursus, pelatihan', icon: '📚' },
  { value: 'transportation', name: 'Transportasi', description: 'Logistik, ojek, travel', icon: '🚛' },
  { value: 'other', name: 'Lainnya', description: 'Industri lain tidak terdaftar', icon: '🏢' }
])

// Feature options
const features = ref([
  {
    key: 'pos',
    name: 'Point of Sale (POS)',
    description: 'Sistem kasir digital untuk transaksi harian',
    tags: ['Kasir', 'Transaksi', 'Penjualan'],
    icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6'
  },
  {
    key: 'inventory',
    name: 'Manajemen Stok',
    description: 'Kelola inventory, produk, dan gudang',
    tags: ['Stok', 'Produk', 'Gudang'],
    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
  },
  {
    key: 'accounting',
    name: 'Akuntansi & Keuangan',
    description: 'Pembukuan, laporan keuangan, pajak',
    tags: ['Pembukuan', 'Laporan', 'Pajak'],
    icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'
  },
  {
    key: 'crm',
    name: 'Customer Relationship',
    description: 'Kelola pelanggan, member, dan loyalitas',
    tags: ['Pelanggan', 'Member', 'CRM'],
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
  },
  {
    key: 'ecommerce',
    name: 'E-commerce',
    description: 'Toko online, marketplace integration',
    tags: ['Online Shop', 'Marketplace'],
    icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
  },
  {
    key: 'analytics',
    name: 'Analytics & Reports',
    description: 'Dashboard analitik dan laporan bisnis',
    tags: ['Dashboard', 'Analytics', 'KPI'],
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
  }
])

// Computed
const canProceed = computed(() => {
  switch (currentStep.value) {
    case 1: return true
    case 2: return businessData.value.name.length > 0
    case 3: return businessData.value.industry !== ''
    case 4: return selectedFeatures.value.length > 0
    case 5: return true
    default: return false
  }
})

// Methods
const nextStep = () => {
  if (currentStep.value < totalSteps.value && canProceed.value) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const toggleFeature = (featureKey) => {
  const index = selectedFeatures.value.indexOf(featureKey)
  if (index > -1) {
    selectedFeatures.value.splice(index, 1)
  } else {
    selectedFeatures.value.push(featureKey)
  }
}

const getBusinessTypeLabel = (type) => {
  const types = {
    retail: 'Retail/Toko',
    restaurant: 'Restoran/Cafe',
    service: 'Jasa/Service',
    wholesale: 'Grosir',
    manufacturing: 'Manufaktur',
    other: 'Lainnya'
  }
  return types[type] || 'Belum dipilih'
}

const getIndustryLabel = (industry) => {
  const found = industries.value.find(i => i.value === industry)
  return found ? found.name : 'Belum dipilih'
}

const getSelectedFeatureLabels = () => {
  return selectedFeatures.value.map(key => {
    const found = features.value.find(f => f.key === key)
    return found ? found.name : key
  })
}

const completeBusiness = async () => {
  isCompleting.value = true
  
  try {
    console.log('Starting business creation...')
    console.log('User ID:', authStore.user?.id)
    console.log('Business data:', businessData.value)
    
    // Get user's active subscription
    const { success: subSuccess, data: subscription, error: subError } = await getUserActiveSubscription(authStore.user.id)
    
    if (!subSuccess) {
      console.error('Subscription error:', subError)
      throw new Error(`Failed to get subscription data: ${subError}`)
    }
    
    console.log('Subscription data:', subscription)
    
    // Create business in database
    const { success: bizSuccess, data: business, error: bizError } = await createBusiness(
      businessData.value,
      authStore.user.id,
      subscription.id
    )
    
    if (!bizSuccess) {
      console.error('Business creation error:', bizError)
      throw new Error(bizError || 'Failed to create business')
    }
    
    console.log('Business created successfully:', business)
    console.log('Selected features:', selectedFeatures.value)
    
    // TODO: Save selected features to business_features table or business settings
    
    // Small delay to ensure business is saved before redirect
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Redirect to dashboard
    router.push('/dashboard')
  } catch (error) {
    console.error('Error completing business setup:', error)
    // Show error message to user
    alert(`Terjadi kesalahan saat menyimpan data bisnis: ${error.message}\n\nSilakan coba lagi atau hubungi support jika masalah berlanjut.`)
  } finally {
    isCompleting.value = false
  }
}

// Check auth on mount
onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push('/login')
  }
})
</script>

<style scoped>
/* Custom animations */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.card {
  animation: slideIn 0.3s ease-out;
}

/* Improved responsive design */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .card-body {
    padding: 1rem;
  }
}
</style>
