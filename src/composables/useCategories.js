import { ref, computed, readonly } from 'vue'
import { supabase } from './useSupabase'
import { useBusiness } from './useBusiness'

export const useCategories = () => {
  const { getCurrentBusiness } = useBusiness()
  
  // State management
  const categories = ref([])
  const currentCategory = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
  // Helper function to clear error
  const clearError = () => {
    error.value = null
  }
  
  // Helper function to validate category data
  const validateCategoryData = (categoryData) => {
    const errors = []
    
    if (!categoryData.name || categoryData.name.trim().length === 0) {
      errors.push('Nama kategori wajib diisi')
    }
    
    if (categoryData.name && categoryData.name.trim().length > 255) {
      errors.push('Nama kategori tidak boleh lebih dari 255 karakter')
    }
    
    return errors
  }
  
  // Helper function to build category tree
  const buildCategoryTree = (categoriesArray, parentId = null) => {
    return categoriesArray
      .filter(category => category.parent_id === parentId)
      .map(category => ({
        ...category,
        children: buildCategoryTree(categoriesArray, category.id),
        level: parentId ? getParentLevel(categoriesArray, parentId) + 1 : 0
      }))
      .sort((a, b) => {
        // Sort by sort_order first, then by name
        if (a.sort_order !== b.sort_order) {
          return (a.sort_order || 0) - (b.sort_order || 0)
        }
        return a.name.localeCompare(b.name)
      })
  }
  
  // Helper function to get parent level
  const getParentLevel = (categoriesArray, parentId, level = 0) => {
    const parent = categoriesArray.find(cat => cat.id === parentId)
    if (!parent || !parent.parent_id) {
      return level
    }
    return getParentLevel(categoriesArray, parent.parent_id, level + 1)
  }
  
  // Helper function to flatten category tree for dropdown
  const flattenCategoryTree = (tree, result = [], prefix = '') => {
    tree.forEach(category => {
      result.push({
        ...category,
        display_name: prefix + category.name
      })
      
      if (category.children && category.children.length > 0) {
        flattenCategoryTree(category.children, result, prefix + '-- ')
      }
    })
    return result
  }
  
  /**
   * Get all categories with hierarchical structure
   * @param {string} businessId - Business ID
   * @returns {Promise<Array>} - Array of categories
   */
  const getCategories = async (businessId = null) => {
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
      
      const { data, error: queryError } = await supabase
        .from('categories')
        .select(`
          id,
          business_id,
          parent_id,
          name,
          description,
          image_url,
          sort_order,
          is_active,
          created_at,
          updated_at
        `)
        .eq('business_id', businessId)
        .order('sort_order', { ascending: true })
        .order('name', { ascending: true })
      
      if (queryError) {
        throw new Error(`Gagal mengambil data kategori: ${queryError.message}`)
      }
      
      categories.value = data || []
      console.log(`✅ Berhasil mengambil ${data?.length || 0} kategori`)
      return data || []
      
    } catch (err) {
      console.error('❌ Error getting categories:', err)
      error.value = err.message
      return []
    } finally {
      loading.value = false
    }
  }
  
  /**
   * Create new category
   * @param {Object} categoryData - Category data
   * @returns {Promise<Object|null>} - Created category
   */
  const createCategory = async (categoryData) => {
    try {
      loading.value = true
      clearError()
      
      // Get current business
      const currentBusiness = await getCurrentBusiness()
      if (!currentBusiness) {
        throw new Error('Tidak ada bisnis aktif ditemukan')
      }
      
      // Validate category data
      const validationErrors = validateCategoryData(categoryData)
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(', '))
      }
      
      // Check if parent exists (if provided)
      if (categoryData.parent_id) {
        const { data: parentData, error: parentError } = await supabase
          .from('categories')
          .select('id')
          .eq('id', categoryData.parent_id)
          .eq('business_id', currentBusiness.id)
          .single()
        
        if (parentError || !parentData) {
          throw new Error('Kategori parent tidak ditemukan')
        }
      }
      
      // Prepare category data
      const newCategoryData = {
        business_id: currentBusiness.id,
        parent_id: categoryData.parent_id || null,
        name: categoryData.name.trim(),
        description: categoryData.description?.trim() || null,
        image_url: categoryData.image_url?.trim() || null,
        sort_order: categoryData.sort_order || 0,
        is_active: categoryData.is_active !== undefined ? categoryData.is_active : true
      }
      
      const { data, error: createError } = await supabase
        .from('categories')
        .insert([newCategoryData])
        .select(`
          id,
          business_id,
          parent_id,
          name,
          description,
          image_url,
          sort_order,
          is_active,
          created_at,
          updated_at
        `)
        .single()
      
      if (createError) {
        throw new Error(`Gagal membuat kategori: ${createError.message}`)
      }
      
      console.log(`✅ Berhasil membuat kategori: ${data.name}`)
      
      // Refresh categories list if needed
      if (categories.value.length > 0) {
        await getCategories()
      }
      
      return data
      
    } catch (err) {
      console.error('❌ Error creating category:', err)
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }
  
  /**
   * Update category
   * @param {string} id - Category ID
   * @param {Object} categoryData - Updated category data
   * @returns {Promise<Object|null>} - Updated category
   */
  const updateCategory = async (id, categoryData) => {
    try {
      loading.value = true
      clearError()
      
      // Validate category data
      const validationErrors = validateCategoryData(categoryData)
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(', '))
      }
      
      // Check if parent exists and prevent circular reference
      if (categoryData.parent_id) {
        // Cannot set self as parent
        if (categoryData.parent_id === id) {
          throw new Error('Kategori tidak dapat menjadi parent dari dirinya sendiri')
        }
        
        // Check if parent exists
        const currentBusiness = await getCurrentBusiness()
        const { data: parentData, error: parentError } = await supabase
          .from('categories')
          .select('id')
          .eq('id', categoryData.parent_id)
          .eq('business_id', currentBusiness.id)
          .single()
        
        if (parentError || !parentData) {
          throw new Error('Kategori parent tidak ditemukan')
        }
        
        // TODO: Add more sophisticated circular reference check
        // For now, we'll allow it and let the database handle constraints
      }
      
      // Prepare update data
      const updateData = {}
      
      if (categoryData.parent_id !== undefined) updateData.parent_id = categoryData.parent_id
      if (categoryData.name !== undefined) updateData.name = categoryData.name.trim()
      if (categoryData.description !== undefined) updateData.description = categoryData.description?.trim() || null
      if (categoryData.image_url !== undefined) updateData.image_url = categoryData.image_url?.trim() || null
      if (categoryData.sort_order !== undefined) updateData.sort_order = categoryData.sort_order
      if (categoryData.is_active !== undefined) updateData.is_active = categoryData.is_active
      
      updateData.updated_at = new Date().toISOString()
      
      const { data, error: updateError } = await supabase
        .from('categories')
        .update(updateData)
        .eq('id', id)
        .select(`
          id,
          business_id,
          parent_id,
          name,
          description,
          image_url,
          sort_order,
          is_active,
          created_at,
          updated_at
        `)
        .single()
      
      if (updateError) {
        throw new Error(`Gagal mengupdate kategori: ${updateError.message}`)
      }
      
      console.log(`✅ Berhasil mengupdate kategori: ${data.name}`)
      
      // Update current category if it's the same
      if (currentCategory.value && currentCategory.value.id === id) {
        currentCategory.value = { ...currentCategory.value, ...data }
      }
      
      // Refresh categories list if needed
      if (categories.value.length > 0) {
        await getCategories()
      }
      
      return data
      
    } catch (err) {
      console.error('❌ Error updating category:', err)
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }
  
  /**
   * Delete category with validation (check if used by products)
   * @param {string} id - Category ID
   * @returns {Promise<boolean>} - Success status
   */
  const deleteCategory = async (id) => {
    try {
      loading.value = true
      clearError()
      
      // Check if category is used by any products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('id')
        .eq('category_id', id)
        .limit(1)
      
      if (productsError) {
        throw new Error(`Gagal memeriksa penggunaan kategori: ${productsError.message}`)
      }
      
      if (productsData && productsData.length > 0) {
        throw new Error('Kategori tidak dapat dihapus karena masih digunakan oleh produk')
      }
      
      // Check if category has children
      const { data: childrenData, error: childrenError } = await supabase
        .from('categories')
        .select('id')
        .eq('parent_id', id)
        .limit(1)
      
      if (childrenError) {
        throw new Error(`Gagal memeriksa sub-kategori: ${childrenError.message}`)
      }
      
      if (childrenData && childrenData.length > 0) {
        throw new Error('Kategori tidak dapat dihapus karena memiliki sub-kategori')
      }
      
      // Safe to delete
      const { error: deleteError } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)
      
      if (deleteError) {
        throw new Error(`Gagal menghapus kategori: ${deleteError.message}`)
      }
      
      console.log(`✅ Berhasil menghapus kategori dengan ID: ${id}`)
      
      // Remove from local state
      categories.value = categories.value.filter(category => category.id !== id)
      
      // Clear current category if it's the deleted one
      if (currentCategory.value && currentCategory.value.id === id) {
        currentCategory.value = null
      }
      
      return true
      
    } catch (err) {
      console.error('❌ Error deleting category:', err)
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }
  
  /**
   * Get categories in tree format for UI
   * @param {string} businessId - Business ID
   * @returns {Promise<Array>} - Tree structured categories
   */
  const getCategoryTree = async (businessId = null) => {
    try {
      const categoriesArray = await getCategories(businessId)
      return buildCategoryTree(categoriesArray)
    } catch (err) {
      console.error('❌ Error getting category tree:', err)
      return []
    }
  }
  
  /**
   * Move category to different parent
   * @param {string} id - Category ID
   * @param {string|null} newParentId - New parent ID
   * @returns {Promise<boolean>} - Success status
   */
  const moveCategory = async (id, newParentId) => {
    try {
      loading.value = true
      clearError()
      
      // Prevent setting self as parent
      if (newParentId === id) {
        throw new Error('Kategori tidak dapat menjadi parent dari dirinya sendiri')
      }
      
      // Check if new parent exists
      if (newParentId) {
        const currentBusiness = await getCurrentBusiness()
        const { data: parentData, error: parentError } = await supabase
          .from('categories')
          .select('id')
          .eq('id', newParentId)
          .eq('business_id', currentBusiness.id)
          .single()
        
        if (parentError || !parentData) {
          throw new Error('Kategori parent baru tidak ditemukan')
        }
      }
      
      const { error: updateError } = await supabase
        .from('categories')
        .update({ 
          parent_id: newParentId,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
      
      if (updateError) {
        throw new Error(`Gagal memindahkan kategori: ${updateError.message}`)
      }
      
      console.log(`✅ Berhasil memindahkan kategori dengan ID: ${id}`)
      
      // Refresh categories list
      await getCategories()
      
      return true
      
    } catch (err) {
      console.error('❌ Error moving category:', err)
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }
  
  // Computed properties
  const hasCategories = computed(() => categories.value && categories.value.length > 0)
  const isLoading = computed(() => loading.value)
  const hasError = computed(() => error.value !== null)
  const errorMessage = computed(() => error.value)
  
  const activeCategories = computed(() => 
    categories.value.filter(category => category.is_active)
  )
  
  const rootCategories = computed(() => 
    categories.value.filter(category => !category.parent_id)
  )
  
  const categoryTree = computed(() => 
    buildCategoryTree(categories.value)
  )
  
  const flatCategories = computed(() => 
    flattenCategoryTree(categoryTree.value)
  )
  
  return {
    // State
    categories: readonly(categories),
    currentCategory: readonly(currentCategory),
    loading: readonly(loading),
    error: readonly(error),
    
    // Computed
    hasCategories,
    isLoading,
    hasError,
    errorMessage,
    activeCategories,
    rootCategories,
    categoryTree,
    flatCategories,
    
    // Methods
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryTree,
    moveCategory,
    clearError
  }
}
