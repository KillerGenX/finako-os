import { ref, computed, readonly } from 'vue'
import { supabase } from './useSupabase'
import { useBusiness } from './useBusiness'

export const useProducts = () => {
  const { getCurrentBusiness } = useBusiness()
  
  // State management
  const products = ref([])
  const currentProduct = ref(null)
  const categories = ref([])
  const loading = ref(false)
  const error = ref(null)
  
  // Pagination state
  const pagination = ref({
    page: 1,
    perPage: 20,
    total: 0,
    totalPages: 0
  })
  
  // Helper function to clear error
  const clearError = () => {
    error.value = null
  }
  
  // Helper function to generate SKU
  const generateSKU = (productName, businessId) => {
    const prefix = 'PRD'
    const timestamp = Date.now().toString().slice(-6)
    const namePrefix = productName
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .slice(0, 3)
    return `${prefix}-${namePrefix}-${timestamp}`
  }
  
  // Helper function to validate product data
  const validateProductData = (productData) => {
    const errors = []
    
    if (!productData.name || productData.name.trim().length === 0) {
      errors.push('Nama produk wajib diisi')
    }
    
    if (!productData.selling_price || productData.selling_price <= 0) {
      errors.push('Harga jual wajib diisi dan harus lebih dari 0')
    }
    
    if (!productData.unit || productData.unit.trim().length === 0) {
      errors.push('Satuan produk wajib diisi')
    }
    
    if (productData.cost_price && productData.cost_price < 0) {
      errors.push('Harga beli tidak boleh negatif')
    }
    
    if (productData.min_stock && productData.min_stock < 0) {
      errors.push('Stok minimum tidak boleh negatif')
    }
    
    if (productData.max_stock && productData.max_stock < 0) {
      errors.push('Stok maksimum tidak boleh negatif')
    }
    
    if (productData.min_stock && productData.max_stock && 
        productData.min_stock > productData.max_stock) {
      errors.push('Stok minimum tidak boleh lebih besar dari stok maksimum')
    }
    
    return errors
  }
  
  /**
   * Get products with filters, pagination, and search
   * @param {string} businessId - Business ID
   * @param {Object} filters - Filter options
   * @returns {Promise<Array>} - Array of products
   */
  const getProducts = async (businessId = null, filters = {}) => {
    try {
      loading.value = true
      clearError()
      
      // Get current business if not provided
      if (!businessId) {
        const currentBusiness = await getCurrentBusiness()
        if (!currentBusiness) {
          throw new Error('Tidak ada bisnis aktif ditemukan')
        }
        businessId = currentBusiness.id
      }
      
      // Build query
      let query = supabase
        .from('products')
        .select(`
          id,
          business_id,
          category_id,
          sku,
          barcode,
          name,
          description,
          unit,
          cost_price,
          selling_price,
          min_stock,
          max_stock,
          current_stock,
          track_stock,
          images,
          tax_rate,
          is_active,
          created_at,
          updated_at,
          categories (
            id,
            name,
            description
          )
        `, { count: 'exact' })
        .eq('business_id', businessId)
      
      // Apply filters
      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,sku.ilike.%${filters.search}%,barcode.ilike.%${filters.search}%`)
      }
      
      if (filters.category_id) {
        query = query.eq('category_id', filters.category_id)
      }
      
      if (filters.is_active !== undefined) {
        query = query.eq('is_active', filters.is_active)
      }
      
      if (filters.stock_status) {
        switch (filters.stock_status) {
          case 'in_stock':
            query = query.gt('current_stock', 0)
            break
          case 'low_stock':
            query = query.lte('current_stock', 'min_stock').gt('current_stock', 0)
            break
          case 'out_of_stock':
            query = query.eq('current_stock', 0)
            break
        }
      }
      
      // Apply sorting
      if (filters.sort_by) {
        const [field, direction] = filters.sort_by.split(':')
        query = query.order(field, { ascending: direction === 'asc' })
      } else {
        query = query.order('created_at', { ascending: false })
      }
      
      // Apply pagination
      const page = filters.page || pagination.value.page
      const perPage = filters.per_page || pagination.value.perPage
      const from = (page - 1) * perPage
      const to = from + perPage - 1
      
      query = query.range(from, to)
      
      const { data, error: queryError, count } = await query
      
      if (queryError) {
        throw new Error(`Gagal mengambil data produk: ${queryError.message}`)
      }
      
      // Update state
      products.value = data || []
      pagination.value = {
        page,
        perPage,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / perPage)
      }
      
      console.log(`✅ Berhasil mengambil ${data?.length || 0} produk`)
      return data || []
      
    } catch (err) {
      console.error('❌ Error getting products:', err)
      error.value = err.message
      return []
    } finally {
      loading.value = false
    }
  }
  
  /**
   * Get single product with details
   * @param {string} id - Product ID
   * @returns {Promise<Object|null>} - Product object
   */
  const getProduct = async (id) => {
    try {
      loading.value = true
      clearError()
      
      const { data, error: queryError } = await supabase
        .from('products')
        .select(`
          id,
          business_id,
          category_id,
          sku,
          barcode,
          name,
          description,
          unit,
          cost_price,
          selling_price,
          min_stock,
          max_stock,
          current_stock,
          track_stock,
          images,
          tax_rate,
          is_active,
          created_at,
          updated_at,
          categories (
            id,
            name,
            description,
            image_url
          ),
          product_variants (
            id,
            variant_name,
            variant_value,
            sku_suffix,
            price_adjustment,
            cost_adjustment,
            is_active
          )
        `)
        .eq('id', id)
        .single()
      
      if (queryError) {
        throw new Error(`Gagal mengambil detail produk: ${queryError.message}`)
      }
      
      currentProduct.value = data
      console.log(`✅ Berhasil mengambil detail produk: ${data.name}`)
      return data
      
    } catch (err) {
      console.error('❌ Error getting product:', err)
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }
  
  /**
   * Create new product
   * @param {Object} productData - Product data
   * @returns {Promise<Object|null>} - Created product
   */
  const createProduct = async (productData) => {
    try {
      loading.value = true
      clearError()
      
      // Get current business
      const currentBusiness = await getCurrentBusiness()
      if (!currentBusiness) {
        throw new Error('Tidak ada bisnis aktif ditemukan')
      }
      
      // Validate product data
      const validationErrors = validateProductData(productData)
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(', '))
      }
      
      // Prepare product data
      const newProductData = {
        business_id: currentBusiness.id,
        name: productData.name.trim(),
        description: productData.description?.trim() || null,
        unit: productData.unit.trim(),
        cost_price: productData.cost_price || 0,
        selling_price: productData.selling_price,
        category_id: productData.category_id || null,
        sku: productData.sku?.trim() || generateSKU(productData.name, currentBusiness.id),
        barcode: productData.barcode?.trim() || null,
        min_stock: productData.min_stock || 0,
        max_stock: productData.max_stock || null,
        current_stock: productData.current_stock || 0,
        track_stock: productData.track_stock !== undefined ? productData.track_stock : true,
        tax_rate: productData.tax_rate || 0,
        images: productData.images || [],
        is_active: productData.is_active !== undefined ? productData.is_active : true
      }
      
      const { data, error: createError } = await supabase
        .from('products')
        .insert([newProductData])
        .select(`
          id,
          business_id,
          category_id,
          sku,
          barcode,
          name,
          description,
          unit,
          cost_price,
          selling_price,
          min_stock,
          max_stock,
          current_stock,
          track_stock,
          images,
          tax_rate,
          is_active,
          created_at,
          updated_at
        `)
        .single()
      
      if (createError) {
        if (createError.code === '23505') {
          throw new Error('SKU sudah digunakan. Silakan gunakan SKU yang berbeda.')
        }
        throw new Error(`Gagal membuat produk: ${createError.message}`)
      }
      
      console.log(`✅ Berhasil membuat produk: ${data.name}`)
      
      // Refresh products list if needed
      if (products.value.length > 0) {
        await getProducts()
      }
      
      return data
      
    } catch (err) {
      console.error('❌ Error creating product:', err)
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }
  
  /**
   * Update existing product
   * @param {string} id - Product ID
   * @param {Object} productData - Updated product data
   * @returns {Promise<Object|null>} - Updated product
   */
  const updateProduct = async (id, productData) => {
    try {
      loading.value = true
      clearError()
      
      // Validate product data
      const validationErrors = validateProductData(productData)
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(', '))
      }
      
      // Prepare update data (only include fields that are provided)
      const updateData = {}
      
      if (productData.name !== undefined) updateData.name = productData.name.trim()
      if (productData.description !== undefined) updateData.description = productData.description?.trim() || null
      if (productData.unit !== undefined) updateData.unit = productData.unit.trim()
      if (productData.cost_price !== undefined) updateData.cost_price = productData.cost_price
      if (productData.selling_price !== undefined) updateData.selling_price = productData.selling_price
      if (productData.category_id !== undefined) updateData.category_id = productData.category_id
      if (productData.sku !== undefined) updateData.sku = productData.sku?.trim()
      if (productData.barcode !== undefined) updateData.barcode = productData.barcode?.trim() || null
      if (productData.min_stock !== undefined) updateData.min_stock = productData.min_stock
      if (productData.max_stock !== undefined) updateData.max_stock = productData.max_stock
      if (productData.current_stock !== undefined) updateData.current_stock = productData.current_stock
      if (productData.track_stock !== undefined) updateData.track_stock = productData.track_stock
      if (productData.tax_rate !== undefined) updateData.tax_rate = productData.tax_rate
      if (productData.images !== undefined) updateData.images = productData.images
      if (productData.is_active !== undefined) updateData.is_active = productData.is_active
      
      updateData.updated_at = new Date().toISOString()
      
      const { data, error: updateError } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', id)
        .select(`
          id,
          business_id,
          category_id,
          sku,
          barcode,
          name,
          description,
          unit,
          cost_price,
          selling_price,
          min_stock,
          max_stock,
          current_stock,
          track_stock,
          images,
          tax_rate,
          is_active,
          created_at,
          updated_at
        `)
        .single()
      
      if (updateError) {
        if (updateError.code === '23505') {
          throw new Error('SKU sudah digunakan. Silakan gunakan SKU yang berbeda.')
        }
        throw new Error(`Gagal mengupdate produk: ${updateError.message}`)
      }
      
      console.log(`✅ Berhasil mengupdate produk: ${data.name}`)
      
      // Update current product if it's the same
      if (currentProduct.value && currentProduct.value.id === id) {
        currentProduct.value = { ...currentProduct.value, ...data }
      }
      
      // Refresh products list if needed
      if (products.value.length > 0) {
        await getProducts()
      }
      
      return data
      
    } catch (err) {
      console.error('❌ Error updating product:', err)
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }
  
  /**
   * Soft delete product (set is_active = false)
   * @param {string} id - Product ID
   * @returns {Promise<boolean>} - Success status
   */
  const deleteProduct = async (id) => {
    try {
      loading.value = true
      clearError()
      
      const { error: deleteError } = await supabase
        .from('products')
        .update({ 
          is_active: false,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
      
      if (deleteError) {
        throw new Error(`Gagal menghapus produk: ${deleteError.message}`)
      }
      
      console.log(`✅ Berhasil menghapus produk dengan ID: ${id}`)
      
      // Remove from local state
      products.value = products.value.filter(product => product.id !== id)
      
      // Clear current product if it's the deleted one
      if (currentProduct.value && currentProduct.value.id === id) {
        currentProduct.value = null
      }
      
      return true
      
    } catch (err) {
      console.error('❌ Error deleting product:', err)
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }
  
  /**
   * Get product categories for dropdown
   * @param {string} businessId - Business ID
   * @returns {Promise<Array>} - Array of categories
   */
  const getProductCategories = async (businessId = null) => {
    try {
      clearError()
      
      // Get current business if not provided
      if (!businessId) {
        const currentBusiness = await getCurrentBusiness()
        if (!currentBusiness) {
          throw new Error('Tidak ada bisnis aktif ditemukan')
        }
        businessId = currentBusiness.id
      }
      
      const { data, error: queryError } = await supabase
        .from('categories')
        .select(`
          id,
          parent_id,
          name,
          description,
          image_url,
          sort_order,
          is_active
        `)
        .eq('business_id', businessId)
        .eq('is_active', true)
        .order('sort_order', { ascending: true })
        .order('name', { ascending: true })
      
      if (queryError) {
        throw new Error(`Gagal mengambil kategori: ${queryError.message}`)
      }
      
      categories.value = data || []
      console.log(`✅ Berhasil mengambil ${data?.length || 0} kategori`)
      return data || []
      
    } catch (err) {
      console.error('❌ Error getting categories:', err)
      error.value = err.message
      return []
    }
  }
  
  /**
   * Search products by name, SKU, or barcode
   * @param {string} query - Search query
   * @param {string} businessId - Business ID
   * @returns {Promise<Array>} - Array of matching products
   */
  const searchProducts = async (query, businessId = null) => {
    try {
      clearError()
      
      if (!query || query.trim().length === 0) {
        return []
      }
      
      // Get current business if not provided
      if (!businessId) {
        const currentBusiness = await getCurrentBusiness()
        if (!currentBusiness) {
          throw new Error('Tidak ada bisnis aktif ditemukan')
        }
        businessId = currentBusiness.id
      }
      
      const { data, error: queryError } = await supabase
        .from('products')
        .select(`
          id,
          sku,
          barcode,
          name,
          selling_price,
          current_stock,
          images
        `)
        .eq('business_id', businessId)
        .eq('is_active', true)
        .or(`name.ilike.%${query.trim()}%,sku.ilike.%${query.trim()}%,barcode.ilike.%${query.trim()}%`)
        .order('name', { ascending: true })
        .limit(10)
      
      if (queryError) {
        throw new Error(`Gagal mencari produk: ${queryError.message}`)
      }
      
      console.log(`✅ Ditemukan ${data?.length || 0} produk untuk query: "${query}"`)
      return data || []
      
    } catch (err) {
      console.error('❌ Error searching products:', err)
      error.value = err.message
      return []
    }
  }
  
  // Computed properties
  const hasProducts = computed(() => products.value && products.value.length > 0)
  const isLoading = computed(() => loading.value)
  const hasError = computed(() => error.value !== null)
  const errorMessage = computed(() => error.value)
  
  const activeProducts = computed(() => 
    products.value.filter(product => product.is_active)
  )
  
  const inactiveProducts = computed(() => 
    products.value.filter(product => !product.is_active)
  )
  
  return {
    // State
    products: readonly(products),
    currentProduct: readonly(currentProduct),
    categories: readonly(categories),
    pagination: readonly(pagination),
    loading: readonly(loading),
    error: readonly(error),
    
    // Computed
    hasProducts,
    isLoading,
    hasError,
    errorMessage,
    activeProducts,
    inactiveProducts,
    
    // Methods
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductCategories,
    searchProducts,
    clearError
  }
}
