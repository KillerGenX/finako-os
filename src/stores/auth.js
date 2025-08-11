// Auth Store dengan Pinia untuk Finako OS
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuth } from '../composables/useAuth.js'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const isInitialized = ref(false)

  // Get auth methods from composable
  const {
    signIn: authSignIn,
    signUp: authSignUp,
    signOut: authSignOut,
    getCurrentUser,
    resetPassword: authResetPassword,
    onAuthStateChange
  } = useAuth()

  // Getters (computed properties)
  const isAuthenticated = computed(() => !!user.value)
  const currentUser = computed(() => user.value)
  const isLoggedIn = computed(() => !!user.value && !loading.value)

  // Actions
  const login = async (email, password) => {
    try {
      loading.value = true
      error.value = null

      const { data, error: loginError } = await authSignIn(email, password)

      if (loginError) {
        error.value = loginError
        return { success: false, error: loginError }
      }

      user.value = data.user
      return { success: true, data }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const register = async (email, password, metadata = {}) => {
    try {
      loading.value = true
      error.value = null

      const { data, error: registerError } = await authSignUp(email, password, metadata)

      if (registerError) {
        error.value = registerError
        return { success: false, error: registerError }
      }

      // Note: User akan di-set melalui onAuthStateChange setelah email confirmation
      return { success: true, data }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      loading.value = true
      error.value = null

      const { error: logoutError } = await authSignOut()

      if (logoutError) {
        error.value = logoutError
        return { success: false, error: logoutError }
      }

      user.value = null
      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const checkAuth = async () => {
    try {
      loading.value = true
      const currentUser = await getCurrentUser()
      user.value = currentUser
      return currentUser
    } catch (err) {
      error.value = err.message
      user.value = null
      return null
    } finally {
      loading.value = false
    }
  }

  const resetPassword = async (email) => {
    try {
      loading.value = true
      error.value = null

      const { data, error: resetError } = await authResetPassword(email)

      if (resetError) {
        error.value = resetError
        return { success: false, error: resetError }
      }

      return { success: true, data }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  // Initialize auth state dan setup listener
  const initializeAuth = async () => {
    if (isInitialized.value) return

    // Check current session
    await checkAuth()

    // Setup auth state listener
    onAuthStateChange((event, session) => {
      user.value = session?.user || null
      
      if (event === 'SIGNED_OUT') {
        user.value = null
      }
    })

    isInitialized.value = true
  }

  return {
    // State
    user: currentUser,
    loading,
    error,
    isInitialized,

    // Getters
    isAuthenticated,
    currentUser,
    isLoggedIn,

    // Actions
    login,
    register,
    logout,
    checkAuth,
    resetPassword,
    clearError,
    initializeAuth
  }
})
