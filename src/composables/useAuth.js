// Composable untuk Authentication dengan Supabase
import { ref, computed } from 'vue'
import { supabase } from './useSupabase.js'

// Global state untuk auth
const user = ref(null)
const loading = ref(false)
const error = ref(null)

export function useAuth() {
  // Computed properties
  const isAuthenticated = computed(() => !!user.value)
  const currentUser = computed(() => user.value)

  // Sign Up (Register)
  const signUp = async (email, password, metadata = {}) => {
    try {
      loading.value = true
      error.value = null

      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata // untuk menyimpan name, dll
        }
      })

      if (authError) throw authError

      return { data, error: null }
    } catch (err) {
      error.value = err.message
      return { data: null, error: err.message }
    } finally {
      loading.value = false
    }
  }

  // Sign In (Login)
  const signIn = async (email, password) => {
    try {
      loading.value = true
      error.value = null

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (authError) throw authError

      user.value = data.user
      return { data, error: null }
    } catch (err) {
      error.value = err.message
      return { data: null, error: err.message }
    } finally {
      loading.value = false
    }
  }

  // Sign Out (Logout)
  const signOut = async () => {
    try {
      loading.value = true
      error.value = null

      const { error: authError } = await supabase.auth.signOut()
      if (authError) throw authError

      user.value = null
      return { error: null }
    } catch (err) {
      error.value = err.message
      return { error: err.message }
    } finally {
      loading.value = false
    }
  }

  // Get Current User Session
  const getCurrentUser = async () => {
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      user.value = currentUser
      return currentUser
    } catch (err) {
      error.value = err.message
      return null
    }
  }

  // Reset Password
  const resetPassword = async (email) => {
    try {
      loading.value = true
      error.value = null

      const { data, error: authError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/reset-password`
        }
      )

      if (authError) throw authError

      return { data, error: null }
    } catch (err) {
      error.value = err.message
      return { data: null, error: err.message }
    } finally {
      loading.value = false
    }
  }

  // Listen to auth state changes
  const onAuthStateChange = (callback) => {
    return supabase.auth.onAuthStateChange((event, session) => {
      user.value = session?.user || null
      if (callback) callback(event, session)
    })
  }

  // Initialize auth state
  const initializeAuth = async () => {
    await getCurrentUser()
  }

  return {
    // State
    user: currentUser,
    loading,
    error,
    isAuthenticated,
    
    // Methods
    signUp,
    signIn,
    signOut,
    getCurrentUser,
    resetPassword,
    onAuthStateChange,
    initializeAuth
  }
}
