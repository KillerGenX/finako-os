<template>
  <div class="min-h-screen bg-gradient-to-br from-teal-50 to-green-50">
    <!-- Mobile Header -->
    <div class="lg:hidden">
      <div class="navbar bg-white/80 backdrop-blur-md shadow-lg border-b border-teal-100">
        <div class="navbar-start">
          <div class="dropdown">
            <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white/90 backdrop-blur-md rounded-box w-52">
              <li><a href="#" class="flex items-center"><i class="fas fa-box mr-2"></i>Produk & Stok</a></li>
              <li><a href="#" class="flex items-center"><i class="fas fa-cash-register mr-2"></i>POS</a></li>
              <li><a href="#" class="flex items-center"><i class="fas fa-shopping-cart mr-2"></i>Pembelian</a></li>
              <li><a href="#" class="flex items-center"><i class="fas fa-users mr-2"></i>Pelanggan</a></li>
              <li><a href="#" class="flex items-center"><i class="fas fa-chart-line mr-2"></i>Laporan</a></li>
            </ul>
          </div>
        </div>
        <div class="navbar-center">
          <a class="btn btn-ghost normal-case text-xl font-bold text-teal-600">
            <img src="/finako.svg" alt="Finako" class="w-8 h-8 mr-2" />
            Finako OS
          </a>
        </div>
        <div class="navbar-end">
          <!-- Mobile Logout Button -->
          <button @click="handleLogout" class="btn btn-ghost btn-sm mr-2 text-error">
            <i class="fas fa-sign-out-alt"></i>
          </button>
          
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
              <div class="w-8 rounded-full bg-teal-100">
                <div class="w-full h-full flex items-center justify-center text-teal-600 font-semibold">
                  {{ userInitial }}
                </div>
              </div>
            </div>
            <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white/90 backdrop-blur-md rounded-box w-52">
              <li><a>Profile</a></li>
              <li><a>Settings</a></li>
              <li><a @click="handleLogout">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="flex">
      <!-- Desktop Sidebar -->
      <div class="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div class="flex flex-col flex-grow bg-white/80 backdrop-blur-md shadow-xl border-r border-teal-100">
          <!-- Logo -->
          <div class="flex items-center px-6 py-4 border-b border-teal-100">
            <img src="/finako.svg" alt="Finako" class="w-10 h-10 mr-3" />
            <div>
              <h1 class="text-xl font-bold text-teal-600">Finako OS</h1>
              <p class="text-xs text-gray-500">ERP untuk UMKM</p>
            </div>
          </div>

          <!-- Navigation -->
          <nav class="flex-1 px-4 py-6 space-y-2">
            <a href="#" class="flex items-center px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition-colors duration-200 group">
              <i class="fas fa-tachometer-alt mr-3 text-teal-500 group-hover:text-teal-600"></i>
              <span class="font-medium">Dashboard</span>
            </a>
            <a href="#" class="flex items-center px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition-colors duration-200 group">
              <i class="fas fa-box mr-3 text-gray-400 group-hover:text-teal-600"></i>
              <span class="font-medium">Produk & Stok</span>
              <span class="ml-auto text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">Soon</span>
            </a>
            <a href="#" class="flex items-center px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition-colors duration-200 group">
              <i class="fas fa-cash-register mr-3 text-gray-400 group-hover:text-teal-600"></i>
              <span class="font-medium">POS</span>
              <span class="ml-auto text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">Soon</span>
            </a>
            <a href="#" class="flex items-center px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition-colors duration-200 group">
              <i class="fas fa-shopping-cart mr-3 text-gray-400 group-hover:text-teal-600"></i>
              <span class="font-medium">Pembelian</span>
              <span class="ml-auto text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">Soon</span>
            </a>
            <a href="#" class="flex items-center px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition-colors duration-200 group">
              <i class="fas fa-users mr-3 text-gray-400 group-hover:text-teal-600"></i>
              <span class="font-medium">Pelanggan</span>
              <span class="ml-auto text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">Soon</span>
            </a>
            <a href="#" class="flex items-center px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition-colors duration-200 group">
              <i class="fas fa-chart-line mr-3 text-gray-400 group-hover:text-teal-600"></i>
              <span class="font-medium">Laporan</span>
              <span class="ml-auto text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">Soon</span>
            </a>
          </nav>

          <!-- User Profile & Trial Status -->
          <div class="px-4 py-4 border-t border-teal-100">
            <!-- Trial Status -->
            <div class="mb-4 p-3 rounded-lg border" :class="{
              'bg-gradient-to-r from-orange-100 to-red-100 border-orange-200': !isTrialExpired,
              'bg-gradient-to-r from-red-100 to-pink-100 border-red-300': isTrialExpired
            }">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-xs font-semibold" :class="{
                    'text-orange-800': !isTrialExpired,
                    'text-red-800': isTrialExpired
                  }">{{ currentPlanName }}</p>
                  <p class="text-lg font-bold" :class="{
                    'text-orange-600': !isTrialExpired && trialDaysLeft > 7,
                    'text-red-600': isTrialExpired || trialDaysLeft <= 7
                  }">
                    {{ isTrialExpired ? 'Expired' : `${trialDaysLeft} hari` }}
                  </p>
                </div>
                <i class="fas" :class="{
                  'fa-clock text-orange-500': !isTrialExpired,
                  'fa-exclamation-triangle text-red-500': isTrialExpired
                }"></i>
              </div>
              <router-link to="/plans" class="w-full mt-2 btn btn-sm text-white border-0" :class="{
                'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600': !isTrialExpired,
                'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600': isTrialExpired
              }">
                {{ isTrialExpired ? 'Perpanjang Sekarang' : 'Upgrade Sekarang' }}
              </router-link>
            </div>

            <!-- User Profile -->
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                <span class="text-teal-600 font-semibold">{{ userInitial }}</span>
              </div>
              <div class="ml-3 flex-1">
                <p class="text-sm font-medium text-gray-700">{{ user?.name || 'User' }}</p>
                <p class="text-xs text-gray-500">{{ user?.email }}</p>
              </div>
              <div class="dropdown dropdown-top dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-xs">
                  <i class="fas fa-ellipsis-v"></i>
                </div>
                <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-32">
                  <li><a>Profile</a></li>
                  <li><a>Settings</a></li>
                  <li><a @click="handleLogout">Logout</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex-1 lg:ml-64">
        <div class="p-4 lg:p-8">
          <!-- Desktop Header -->
          <div class="hidden lg:block mb-8">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-3xl font-bold text-gray-800">Dashboard</h1>
                <p class="text-gray-600 mt-1">Selamat datang di Finako OS</p>
              </div>
              <div class="flex items-center space-x-4">
                <div class="stats bg-white/80 backdrop-blur-md shadow-lg">
                  <div class="stat">
                    <div class="stat-figure" :class="{
                      'text-teal-500': !isTrialExpired,
                      'text-red-500': isTrialExpired
                    }">
                      <i class="fas text-2xl" :class="{
                        'fa-calendar-alt': !isTrialExpired,
                        'fa-exclamation-triangle': isTrialExpired
                      }"></i>
                    </div>
                    <div class="stat-title">{{ currentPlanName }}</div>
                    <div class="stat-value" :class="{
                      'text-teal-600': !isTrialExpired && trialDaysLeft > 7,
                      'text-orange-600': !isTrialExpired && trialDaysLeft <= 7 && trialDaysLeft > 0,
                      'text-red-600': isTrialExpired
                    }">
                      {{ isTrialExpired ? 'Expired' : trialDaysLeft }}
                    </div>
                    <div class="stat-desc">{{ isTrialExpired ? 'Perlu perpanjangan' : 'hari tersisa' }}</div>
                  </div>
                </div>
                <!-- Logout Button -->
                <button @click="handleLogout" class="btn btn-outline btn-error btn-sm">
                  <i class="fas fa-sign-out-alt mr-2"></i>
                  Logout
                </button>
              </div>
            </div>
          </div>

          <!-- Welcome Card -->
          <div class="card bg-gradient-to-r from-teal-500 to-green-500 text-white shadow-xl mb-6">
            <div class="card-body">
              <h2 class="card-title text-2xl">
                <i class="fas fa-rocket mr-2"></i>
                Selamat Datang di Finako OS!
              </h2>
              <p class="text-teal-100">
                ERP super app untuk UMKM Indonesia. Mulai digitalisasi bisnis Anda dengan mudah dan terjangkau.
              </p>
              <div class="card-actions justify-end mt-4">
                <button class="btn btn-outline btn-white bg-white/20 border-white/30 text-white hover:bg-white hover:text-teal-600">
                  <i class="fas fa-play mr-2"></i>
                  Mulai Tutorial
                </button>
              </div>
            </div>
          </div>

          <!-- Trial Alert Notifications -->
          <div v-if="isTrialExpired" class="alert alert-error mb-6">
            <i class="fas fa-exclamation-triangle"></i>
            <span>
              <strong>Subscription Expired!</strong> 
              {{ currentPlanName }} Anda telah berakhir. Silakan perpanjang subscription untuk melanjutkan menggunakan Finako OS.
            </span>
            <div>
              <router-link to="/plans" class="btn btn-sm btn-outline">Perpanjang Sekarang</router-link>
            </div>
          </div>

          <div v-else-if="trialDaysLeft <= 7 && trialDaysLeft > 0" class="alert alert-warning mb-6">
            <i class="fas fa-clock"></i>
            <span>
              <strong>{{ currentPlanName }} akan berakhir!</strong>
              Sisa {{ trialDaysLeft }} hari lagi. Upgrade sekarang untuk tidak kehilangan akses.
            </span>
            <div>
              <router-link to="/plans" class="btn btn-sm btn-primary">Upgrade Sekarang</router-link>
            </div>
          </div>

          <!-- Quick Stats -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <!-- Produk -->
            <div class="stat bg-white/80 backdrop-blur-md shadow-lg rounded-2xl border border-gray-100">
              <div class="stat-figure text-blue-500">
                <i class="fas fa-box text-3xl"></i>
              </div>
              <div class="stat-title">Total Produk</div>
              <div class="stat-value text-blue-600">0</div>
              <div class="stat-desc text-gray-500">Belum ada produk</div>
            </div>

            <!-- Transaksi -->
            <div class="stat bg-white/80 backdrop-blur-md shadow-lg rounded-2xl border border-gray-100">
              <div class="stat-figure text-green-500">
                <i class="fas fa-cash-register text-3xl"></i>
              </div>
              <div class="stat-title">Transaksi</div>
              <div class="stat-value text-green-600">0</div>
              <div class="stat-desc text-gray-500">Hari ini</div>
            </div>

            <!-- Pelanggan -->
            <div class="stat bg-white/80 backdrop-blur-md shadow-lg rounded-2xl border border-gray-100">
              <div class="stat-figure text-purple-500">
                <i class="fas fa-users text-3xl"></i>
              </div>
              <div class="stat-title">Pelanggan</div>
              <div class="stat-value text-purple-600">0</div>
              <div class="stat-desc text-gray-500">Total pelanggan</div>
            </div>

            <!-- Penjualan -->
            <div class="stat bg-white/80 backdrop-blur-md shadow-lg rounded-2xl border border-gray-100">
              <div class="stat-figure text-orange-500">
                <i class="fas fa-chart-line text-3xl"></i>
              </div>
              <div class="stat-title">Penjualan</div>
              <div class="stat-value text-orange-600">Rp 0</div>
              <div class="stat-desc text-gray-500">Bulan ini</div>
            </div>
          </div>

          <!-- Module Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Produk & Stok Module -->
            <div class="card bg-white/80 backdrop-blur-md shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div class="card-body">
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <i class="fas fa-box text-blue-500 text-xl"></i>
                  </div>
                  <div class="ml-4 flex-1">
                    <h3 class="card-title text-lg">Produk & Stok</h3>
                    <p class="text-sm text-gray-500">Kelola produk dan inventori</p>
                  </div>
                  <div class="badge badge-warning">Coming Soon</div>
                </div>
                <div class="card-actions justify-end mt-4">
                  <button class="btn btn-primary btn-sm" disabled>
                    <i class="fas fa-arrow-right mr-1"></i>
                    Buka
                  </button>
                </div>
              </div>
            </div>

            <!-- POS Module -->
            <div class="card bg-white/80 backdrop-blur-md shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div class="card-body">
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <i class="fas fa-cash-register text-green-500 text-xl"></i>
                  </div>
                  <div class="ml-4 flex-1">
                    <h3 class="card-title text-lg">Point of Sale</h3>
                    <p class="text-sm text-gray-500">Kasir dan transaksi</p>
                  </div>
                  <div class="badge badge-warning">Coming Soon</div>
                </div>
                <div class="card-actions justify-end mt-4">
                  <button class="btn btn-primary btn-sm" disabled>
                    <i class="fas fa-arrow-right mr-1"></i>
                    Buka
                  </button>
                </div>
              </div>
            </div>

            <!-- Pembelian Module -->
            <div class="card bg-white/80 backdrop-blur-md shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div class="card-body">
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <i class="fas fa-shopping-cart text-purple-500 text-xl"></i>
                  </div>
                  <div class="ml-4 flex-1">
                    <h3 class="card-title text-lg">Pembelian</h3>
                    <p class="text-sm text-gray-500">Purchase order & supplier</p>
                  </div>
                  <div class="badge badge-warning">Coming Soon</div>
                </div>
                <div class="card-actions justify-end mt-4">
                  <button class="btn btn-primary btn-sm" disabled>
                    <i class="fas fa-arrow-right mr-1"></i>
                    Buka
                  </button>
                </div>
              </div>
            </div>

            <!-- Pelanggan Module -->
            <div class="card bg-white/80 backdrop-blur-md shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div class="card-body">
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                    <i class="fas fa-users text-pink-500 text-xl"></i>
                  </div>
                  <div class="ml-4 flex-1">
                    <h3 class="card-title text-lg">Pelanggan</h3>
                    <p class="text-sm text-gray-500">Kelola data pelanggan</p>
                  </div>
                  <div class="badge badge-warning">Coming Soon</div>
                </div>
                <div class="card-actions justify-end mt-4">
                  <button class="btn btn-primary btn-sm" disabled>
                    <i class="fas fa-arrow-right mr-1"></i>
                    Buka
                  </button>
                </div>
              </div>
            </div>

            <!-- Laporan Module -->
            <div class="card bg-white/80 backdrop-blur-md shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div class="card-body">
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <i class="fas fa-chart-line text-orange-500 text-xl"></i>
                  </div>
                  <div class="ml-4 flex-1">
                    <h3 class="card-title text-lg">Laporan</h3>
                    <p class="text-sm text-gray-500">Analytics & insights</p>
                  </div>
                  <div class="badge badge-warning">Coming Soon</div>
                </div>
                <div class="card-actions justify-end mt-4">
                  <button class="btn btn-primary btn-sm" disabled>
                    <i class="fas fa-arrow-right mr-1"></i>
                    Buka
                  </button>
                </div>
              </div>
            </div>

            <!-- Settings Module -->
            <div class="card bg-white/80 backdrop-blur-md shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div class="card-body">
                <div class="flex items-center">
                  <div class="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <i class="fas fa-cog text-gray-500 text-xl"></i>
                  </div>
                  <div class="ml-4 flex-1">
                    <h3 class="card-title text-lg">Pengaturan</h3>
                    <p class="text-sm text-gray-500">Konfigurasi sistem</p>
                  </div>
                  <div class="badge badge-warning">Coming Soon</div>
                </div>
                <div class="card-actions justify-end mt-4">
                  <button class="btn btn-primary btn-sm" disabled>
                    <i class="fas fa-arrow-right mr-1"></i>
                    Buka
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="mt-8">
            <div class="card bg-white/80 backdrop-blur-md shadow-xl border border-gray-100">
              <div class="card-body">
                <h3 class="card-title text-lg mb-4">
                  <i class="fas fa-bolt text-yellow-500 mr-2"></i>
                  Quick Actions
                </h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button class="btn btn-outline btn-primary" disabled>
                    <i class="fas fa-plus mr-2"></i>
                    Tambah Produk
                  </button>
                  <button class="btn btn-outline btn-success" disabled>
                    <i class="fas fa-shopping-bag mr-2"></i>
                    Transaksi Baru
                  </button>
                  <button class="btn btn-outline btn-warning" disabled>
                    <i class="fas fa-user-plus mr-2"></i>
                    Tambah Pelanggan
                  </button>
                  <button class="btn btn-outline btn-info" disabled>
                    <i class="fas fa-file-alt mr-2"></i>
                    Lihat Laporan
                  </button>
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
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useSubscriptionStore } from '@/stores/subscription'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const subscriptionStore = useSubscriptionStore()
const router = useRouter()

// Computed properties
const user = computed(() => authStore.user)
const userInitial = computed(() => {
  if (user.value?.name) {
    return user.value.name.charAt(0).toUpperCase()
  }
  return user.value?.email?.charAt(0).toUpperCase() || 'U'
})

// Real trial days left dari subscription store
const trialDaysLeft = computed(() => {
  return subscriptionStore.daysLeft || 0
})

// Additional subscription info
const currentPlanName = computed(() => {
  return subscriptionStore.planName || 'No Plan'
})

const isTrialExpired = computed(() => {
  return subscriptionStore.isExpired
})

// Handlers
const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Logout error:', error)
  }
}
</script>

<style scoped>
/* Custom scrollbar untuk sidebar */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(20, 184, 166, 0.3);
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(20, 184, 166, 0.5);
}

/* Animation untuk module cards */
.card:hover {
  transform: translateY(-2px);
}

/* Custom badge styles */
.badge-warning {
  background-color: #fef3c7;
  color: #92400e;
  border-color: #fde68a;
}
</style>
