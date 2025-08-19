<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
    <!-- Header Section -->
    <div class="bg-white/70 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <div class="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              </div>
              <div>
                <h1 class="text-2xl font-bold text-gray-900">Produk</h1>
                <p class="text-sm text-gray-600">
                  Kelola produk dan inventori bisnis Anda
                </p>
              </div>
            </div>
          </div>

          <!-- Header Actions -->
          <div class="flex items-center space-x-3">
            <button
              @click="showImportModal = true"
              class="hidden sm:flex items-center px-4 py-2 bg-white/80 hover:bg-white border border-gray-200 rounded-lg transition-colors duration-200"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/>
              </svg>
              Import
            </button>
            
            <button
              @click="exportProducts"
              class="hidden sm:flex items-center px-4 py-2 bg-white/80 hover:bg-white border border-gray-200 rounded-lg transition-colors duration-200"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
              Export
            </button>

            <router-link
              to="/products/create"
              class="flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              Tambah Produk
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Filters & Search Section -->
      <div class="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6 mb-6">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <!-- Search Bar -->
          <div class="lg:col-span-2">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <input
                v-model="searchQuery"
                @input="onSearchInput"
                type="text"
                placeholder="Cari produk, SKU, atau barcode..."
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-500"
              />
              <!-- Clear search button -->
              <button
                v-if="searchQuery"
                @click="clearSearch"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg class="h-4 w-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Category Filter -->
          <div>
            <select
              v-model="selectedCategory"
              @change="onFilterChange"
              class="block w-full px-3 py-2 border border-gray-300 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="">Semua Kategori</option>
              <option
                v-for="category in flatCategories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.display_name }}
              </option>
            </select>
          </div>

          <!-- Status Filter -->
          <div>
            <select
              v-model="selectedStatus"
              @change="onFilterChange"
              class="block w-full px-3 py-2 border border-gray-300 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="inactive">Tidak Aktif</option>
              <option value="in_stock">Stok Tersedia</option>
              <option value="low_stock">Stok Menipis</option>
              <option value="out_of_stock">Stok Habis</option>
            </select>
          </div>
        </div>

        <!-- Secondary Filters -->
        <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div class="flex items-center space-x-4">
            <!-- Sort Options -->
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-600">Urutkan:</span>
              <select
                v-model="sortBy"
                @change="onSortChange"
                class="text-sm border border-gray-300 rounded-lg px-3 py-1 bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="created_at:desc">Terbaru</option>
                <option value="name:asc">Nama A-Z</option>
                <option value="name:desc">Nama Z-A</option>
                <option value="selling_price:asc">Harga Terendah</option>
                <option value="selling_price:desc">Harga Tertinggi</option>
                <option value="current_stock:asc">Stok Terendah</option>
                <option value="current_stock:desc">Stok Tertinggi</option>
              </select>
            </div>

            <!-- View Toggle -->
            <div class="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                @click="viewMode = 'grid'"
                :class="[
                  'p-1 rounded transition-colors duration-200',
                  viewMode === 'grid' ? 'bg-white shadow text-emerald-600' : 'text-gray-600 hover:text-gray-800'
                ]"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                </svg>
              </button>
              <button
                @click="viewMode = 'list'"
                :class="[
                  'p-1 rounded transition-colors duration-200',
                  viewMode === 'list' ? 'bg-white shadow text-emerald-600' : 'text-gray-600 hover:text-gray-800'
                ]"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Results Count -->
          <div class="text-sm text-gray-600">
            <span v-if="!isLoading">
              Menampilkan {{ products.length }} dari {{ pagination.total }} produk
            </span>
          </div>
        </div>
      </div>

      <!-- Bulk Actions Bar (show when items selected) -->
      <div
        v-if="selectedProducts.length > 0"
        class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center justify-between"
      >
        <div class="flex items-center space-x-4">
          <span class="text-sm text-blue-800 font-medium">
            {{ selectedProducts.length }} produk dipilih
          </span>
          <div class="flex items-center space-x-2">
            <button
              @click="bulkActivate"
              class="text-xs px-3 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200 transition-colors duration-200"
            >
              Aktifkan
            </button>
            <button
              @click="bulkDeactivate"
              class="text-xs px-3 py-1 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 transition-colors duration-200"
            >
              Nonaktifkan
            </button>
            <button
              @click="bulkDelete"
              class="text-xs px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors duration-200"
            >
              Hapus
            </button>
          </div>
        </div>
        <button
          @click="clearSelection"
          class="text-sm text-blue-600 hover:text-blue-800"
        >
          Batal Pilih
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="space-y-4">
        <div
          v-for="n in 6"
          :key="n"
          class="bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 animate-pulse"
        >
          <div class="flex items-center space-x-4">
            <div class="bg-gray-300 rounded-lg w-16 h-16"></div>
            <div class="flex-1 space-y-2">
              <div class="bg-gray-300 h-4 rounded w-3/4"></div>
              <div class="bg-gray-300 h-3 rounded w-1/2"></div>
              <div class="bg-gray-300 h-3 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="!hasProducts && !isLoading"
        class="text-center py-16"
      >
        <div class="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-8 max-w-md mx-auto">
          <div class="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 mb-6">
            <svg class="h-12 w-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            {{ searchQuery ? 'Produk tidak ditemukan' : 'Belum ada produk' }}
          </h3>
          <p class="text-gray-600 mb-6">
            {{ searchQuery 
              ? `Tidak ada produk yang cocok dengan "${searchQuery}"` 
              : 'Mulai tambahkan produk pertama Anda untuk mengelola inventori'
            }}
          </p>
          <div class="space-y-3">
            <router-link
              v-if="!searchQuery"
              to="/products/create"
              class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              Tambah Produk Pertama
            </router-link>
            <button
              v-if="searchQuery"
              @click="clearSearch"
              class="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              Hapus Pencarian
            </button>
          </div>
        </div>
      </div>

      <!-- Products Grid/List -->
      <div v-else-if="hasProducts">
        <!-- Grid View -->
        <div
          v-if="viewMode === 'grid'"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <div
            v-for="product in products"
            :key="product.id"
            class="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <!-- Selection Checkbox -->
            <div class="absolute top-3 left-3 z-10">
              <input
                type="checkbox"
                :value="product.id"
                v-model="selectedProducts"
                class="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
            </div>

            <!-- Product Image -->
            <div class="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
              <img
                v-if="product.images && product.images.length > 0"
                :src="product.images[0]"
                :alt="product.name"
                class="w-full h-full object-cover"
                @error="handleImageError"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center"
              >
                <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              </div>

              <!-- Status Badge -->
              <div class="absolute top-3 right-3">
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-medium',
                    product.is_active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  ]"
                >
                  {{ product.is_active ? 'Aktif' : 'Nonaktif' }}
                </span>
              </div>

              <!-- Stock Status -->
              <div class="absolute bottom-3 left-3">
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-medium',
                    getStockStatusClass(product)
                  ]"
                >
                  {{ getStockStatusText(product) }}
                </span>
              </div>
            </div>

            <!-- Product Info -->
            <div class="p-4">
              <div class="mb-2">
                <h3 class="font-semibold text-gray-900 truncate mb-1">
                  {{ product.name }}
                </h3>
                <p class="text-sm text-gray-600">
                  SKU: {{ product.sku }}
                </p>
              </div>

              <div class="mb-3">
                <p class="text-lg font-bold text-emerald-600">
                  {{ formatCurrency(product.selling_price) }}
                </p>
                <p class="text-sm text-gray-600" v-if="product.categories">
                  {{ product.categories.name }}
                </p>
              </div>

              <div class="flex items-center justify-between mb-4">
                <div class="text-sm text-gray-600">
                  Stok: {{ product.current_stock }} {{ product.unit }}
                </div>
              </div>

              <!-- Quick Actions -->
              <div class="flex items-center justify-between pt-3 border-t border-gray-200">
                <div class="flex items-center space-x-2">
                  <button
                    @click="viewProduct(product.id)"
                    class="p-1 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    title="Lihat Detail"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </button>
                  <button
                    @click="editProduct(product.id)"
                    class="p-1 text-emerald-600 hover:text-emerald-800 transition-colors duration-200"
                    title="Edit Produk"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button
                    @click="duplicateProduct(product)"
                    class="p-1 text-purple-600 hover:text-purple-800 transition-colors duration-200"
                    title="Duplikat Produk"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                  </button>
                </div>
                <button
                  @click="confirmDeleteProduct(product)"
                  class="p-1 text-red-600 hover:text-red-800 transition-colors duration-200"
                  title="Hapus Produk"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- List View -->
        <div
          v-if="viewMode === 'list'"
          class="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 overflow-hidden"
        >
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50/70">
                <tr>
                  <th class="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      :checked="isAllSelected"
                      @change="toggleSelectAll"
                      class="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produk
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SKU
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Harga
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stok
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr
                  v-for="product in products"
                  :key="product.id"
                  class="hover:bg-gray-50/50"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      :value="product.id"
                      v-model="selectedProducts"
                      class="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="h-10 w-10 flex-shrink-0">
                        <img
                          v-if="product.images && product.images.length > 0"
                          :src="product.images[0]"
                          :alt="product.name"
                          class="h-10 w-10 rounded-lg object-cover"
                          @error="handleImageError"
                        />
                        <div
                          v-else
                          class="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center"
                        >
                          <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                          </svg>
                        </div>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ product.name }}
                        </div>
                        <div class="text-sm text-gray-500" v-if="product.description">
                          {{ truncateText(product.description, 50) }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ product.sku }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ product.categories?.name || '-' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ formatCurrency(product.selling_price) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <span class="text-sm text-gray-900">
                        {{ product.current_stock }} {{ product.unit }}
                      </span>
                      <span
                        :class="[
                          'ml-2 px-2 py-1 rounded-full text-xs font-medium',
                          getStockStatusClass(product)
                        ]"
                      >
                        {{ getStockStatusText(product) }}
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      :class="[
                        'px-2 py-1 rounded-full text-xs font-medium',
                        product.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      ]"
                    >
                      {{ product.is_active ? 'Aktif' : 'Nonaktif' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div class="flex items-center space-x-2">
                      <button
                        @click="viewProduct(product.id)"
                        class="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        title="Lihat Detail"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                      </button>
                      <button
                        @click="editProduct(product.id)"
                        class="text-emerald-600 hover:text-emerald-800 transition-colors duration-200"
                        title="Edit Produk"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                      </button>
                      <button
                        @click="duplicateProduct(product)"
                        class="text-purple-600 hover:text-purple-800 transition-colors duration-200"
                        title="Duplikat Produk"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                        </svg>
                      </button>
                      <button
                        @click="confirmDeleteProduct(product)"
                        class="text-red-600 hover:text-red-800 transition-colors duration-200"
                        title="Hapus Produk"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Pagination -->
        <div class="mt-6 flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Menampilkan {{ (pagination.page - 1) * pagination.perPage + 1 }} - 
            {{ Math.min(pagination.page * pagination.perPage, pagination.total) }} dari {{ pagination.total }} hasil
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="goToPage(pagination.page - 1)"
              :disabled="pagination.page === 1"
              class="px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sebelumnya
            </button>
            
            <template v-for="page in visiblePages" :key="page">
              <button
                v-if="page !== '...'"
                @click="goToPage(page)"
                :class="[
                  'px-3 py-2 text-sm rounded-lg',
                  page === pagination.page
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white border border-gray-300 hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </button>
              <span v-else class="px-2 text-gray-500">...</span>
            </template>

            <button
              @click="goToPage(pagination.page + 1)"
              :disabled="pagination.page === pagination.totalPages"
              class="px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Error Alert -->
    <div
      v-if="hasError"
      class="fixed bottom-4 right-4 max-w-md bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg z-50"
    >
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
        </div>
        <div class="ml-3 flex-1">
          <p class="text-sm text-red-800">{{ errorMessage }}</p>
        </div>
        <button
          @click="clearError"
          class="ml-3 text-red-400 hover:text-red-600"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Import Modal (placeholder) -->
    <div
      v-if="showImportModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="showImportModal = false"
    >
      <div
        class="bg-white rounded-lg p-6 max-w-md w-full mx-4"
        @click.stop
      >
        <h3 class="text-lg font-semibold mb-4">Import Produk</h3>
        <p class="text-gray-600 mb-4">Fitur import akan segera tersedia.</p>
        <div class="flex justify-end">
          <button
            @click="showImportModal = false"
            class="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useProducts } from '@/composables/useProducts'
import { useCategories } from '@/composables/useCategories'

export default {
  name: 'ProductListView',
  setup() {
    const router = useRouter()
    
    // Composables
    const {
      products,
      pagination,
      isLoading,
      hasError,
      errorMessage,
      hasProducts,
      getProducts,
      deleteProduct,
      updateProduct,
      clearError
    } = useProducts()
    
    const {
      flatCategories,
      getCategories
    } = useCategories()
    
    // Local state
    const searchQuery = ref('')
    const selectedCategory = ref('')
    const selectedStatus = ref('')
    const sortBy = ref('created_at:desc')
    const viewMode = ref('grid') // grid or list
    const selectedProducts = ref([])
    const showImportModal = ref(false)
    const searchTimeout = ref(null)
    
    // Computed
    const isAllSelected = computed(() => {
      return products.value.length > 0 && selectedProducts.value.length === products.value.length
    })
    
    const visiblePages = computed(() => {
      const total = pagination.value.totalPages
      const current = pagination.value.page
      const pages = []
      
      if (total <= 7) {
        for (let i = 1; i <= total; i++) {
          pages.push(i)
        }
      } else {
        if (current <= 4) {
          pages.push(1, 2, 3, 4, 5, '...', total)
        } else if (current >= total - 3) {
          pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total)
        } else {
          pages.push(1, '...', current - 1, current, current + 1, '...', total)
        }
      }
      
      return pages
    })
    
    // Methods
    const loadProducts = async () => {
      const filters = {
        search: searchQuery.value || undefined,
        category_id: selectedCategory.value || undefined,
        is_active: selectedStatus.value === 'active' ? true : 
                   selectedStatus.value === 'inactive' ? false : undefined,
        stock_status: ['in_stock', 'low_stock', 'out_of_stock'].includes(selectedStatus.value) 
          ? selectedStatus.value : undefined,
        sort_by: sortBy.value,
        page: pagination.value.page,
        per_page: pagination.value.perPage
      }
      
      await getProducts(null, filters)
    }
    
    const onSearchInput = () => {
      if (searchTimeout.value) {
        clearTimeout(searchTimeout.value)
      }
      
      searchTimeout.value = setTimeout(() => {
        pagination.value.page = 1
        loadProducts()
      }, 300) // Debounce search
    }
    
    const clearSearch = () => {
      searchQuery.value = ''
      pagination.value.page = 1
      loadProducts()
    }
    
    const onFilterChange = () => {
      pagination.value.page = 1
      loadProducts()
    }
    
    const onSortChange = () => {
      pagination.value.page = 1
      loadProducts()
    }
    
    const goToPage = (page) => {
      if (page >= 1 && page <= pagination.value.totalPages) {
        pagination.value.page = page
        loadProducts()
      }
    }
    
    const toggleSelectAll = () => {
      if (isAllSelected.value) {
        selectedProducts.value = []
      } else {
        selectedProducts.value = products.value.map(p => p.id)
      }
    }
    
    const clearSelection = () => {
      selectedProducts.value = []
    }
    
    const bulkActivate = async () => {
      for (const productId of selectedProducts.value) {
        await updateProduct(productId, { is_active: true })
      }
      clearSelection()
      loadProducts()
    }
    
    const bulkDeactivate = async () => {
      for (const productId of selectedProducts.value) {
        await updateProduct(productId, { is_active: false })
      }
      clearSelection()
      loadProducts()
    }
    
    const bulkDelete = async () => {
      if (confirm(`Apakah Anda yakin ingin menghapus ${selectedProducts.value.length} produk?`)) {
        for (const productId of selectedProducts.value) {
          await deleteProduct(productId)
        }
        clearSelection()
        loadProducts()
      }
    }
    
    const viewProduct = (id) => {
      router.push(`/products/${id}`)
    }
    
    const editProduct = (id) => {
      router.push(`/products/${id}/edit`)
    }
    
    const duplicateProduct = async (product) => {
      const duplicatedProduct = {
        ...product,
        name: `${product.name} (Copy)`,
        sku: undefined // Let auto-generation handle this
      }
      delete duplicatedProduct.id
      delete duplicatedProduct.created_at
      delete duplicatedProduct.updated_at
      
      // Navigate to create form with pre-filled data
      router.push({
        name: 'ProductCreate',
        query: { duplicate: JSON.stringify(duplicatedProduct) }
      })
    }
    
    const confirmDeleteProduct = async (product) => {
      if (confirm(`Apakah Anda yakin ingin menghapus produk "${product.name}"?`)) {
        const success = await deleteProduct(product.id)
        if (success) {
          loadProducts()
        }
      }
    }
    
    const exportProducts = () => {
      // TODO: Implement export functionality
      alert('Fitur export akan segera tersedia')
    }
    
    // Utility methods
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(amount)
    }
    
    const truncateText = (text, maxLength) => {
      if (!text) return ''
      return text.length <= maxLength ? text : text.substring(0, maxLength) + '...'
    }
    
    const getStockStatusClass = (product) => {
      if (product.current_stock === 0) {
        return 'bg-red-100 text-red-800'
      } else if (product.current_stock <= product.min_stock) {
        return 'bg-yellow-100 text-yellow-800'
      } else {
        return 'bg-green-100 text-green-800'
      }
    }
    
    const getStockStatusText = (product) => {
      if (product.current_stock === 0) {
        return 'Habis'
      } else if (product.current_stock <= product.min_stock) {
        return 'Menipis'
      } else {
        return 'Tersedia'
      }
    }
    
    const handleImageError = (event) => {
      event.target.style.display = 'none'
    }
    
    // Lifecycle
    onMounted(async () => {
      await getCategories()
      await loadProducts()
    })
    
    // Watch for route changes (if navigating back from detail/edit)
    watch(() => router.currentRoute.value, () => {
      if (router.currentRoute.value.name === 'ProductList') {
        loadProducts()
      }
    })
    
    return {
      // Data
      searchQuery,
      selectedCategory,
      selectedStatus,
      sortBy,
      viewMode,
      selectedProducts,
      showImportModal,
      
      // Computed
      products,
      pagination,
      isLoading,
      hasError,
      errorMessage,
      hasProducts,
      flatCategories,
      isAllSelected,
      visiblePages,
      
      // Methods
      onSearchInput,
      clearSearch,
      onFilterChange,
      onSortChange,
      goToPage,
      toggleSelectAll,
      clearSelection,
      bulkActivate,
      bulkDeactivate,
      bulkDelete,
      viewProduct,
      editProduct,
      duplicateProduct,
      confirmDeleteProduct,
      exportProducts,
      clearError,
      
      // Utility methods
      formatCurrency,
      truncateText,
      getStockStatusClass,
      getStockStatusText,
      handleImageError
    }
  }
}
</script>

<style scoped>
/* Additional custom styles if needed */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}
</style>
