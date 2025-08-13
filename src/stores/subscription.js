// Subscription Store dengan Pinia untuk Finako OS
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useBusiness } from '@/composables/useBusiness'

export const useSubscriptionStore = defineStore('subscription', () => {
  // State
  const currentPlan = ref(null)
  const subscription = ref(null)
  const trialEndsAt = ref(null)
  const isTrialActive = ref(false)
  const loading = ref(false)
  const error = ref(null)
  const initialized = ref(false)

  // Get business methods from composable
  const { getUserActiveSubscription } = useBusiness()

  // Getters (computed properties)
  const daysLeft = computed(() => {
    if (!trialEndsAt.value) return 0
    const now = new Date()
    const endDate = new Date(trialEndsAt.value)
    const diffTime = endDate - now
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)))
  })

  const isExpired = computed(() => {
    if (!trialEndsAt.value) return true
    return new Date() > new Date(trialEndsAt.value)
  })

  const canAccess = computed(() => {
    return isTrialActive.value && !isExpired.value
  })

  const planName = computed(() => {
    return currentPlan.value?.name || 'No Plan'
  })

  const isTrialPlan = computed(() => {
    return currentPlan.value?.name === 'Finako Trial'
  })

  // Actions
  const checkSubscription = async (userId) => {
    if (!userId) {
      error.value = 'User ID is required'
      return { success: false, error: 'User ID is required' }
    }

    try {
      loading.value = true
      error.value = null

      const result = await getUserActiveSubscription(userId)

      if (!result.success) {
        throw new Error(result.error)
      }

      if (result.data) {
        subscription.value = result.data
        currentPlan.value = result.data.subscription_plans
        trialEndsAt.value = result.data.ends_at
        isTrialActive.value = result.data.status === 'active'

        console.log('Subscription loaded:', {
          plan: planName.value,
          daysLeft: daysLeft.value,
          isExpired: isExpired.value,
          canAccess: canAccess.value
        })
      } else {
        // No active subscription found
        subscription.value = null
        currentPlan.value = null
        trialEndsAt.value = null
        isTrialActive.value = false

        console.warn('No active subscription found for user:', userId)
      }

      return { success: true, data: result.data }
    } catch (err) {
      error.value = err.message
      console.error('Error checking subscription:', err)
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const initializeSubscription = async (userId) => {
    if (initialized.value || !userId) return

    try {
      await checkSubscription(userId)
      initialized.value = true
    } catch (err) {
      console.error('Failed to initialize subscription:', err)
      error.value = err.message
    }
  }

  const updateSubscription = async (userId) => {
    try {
      await checkSubscription(userId)
    } catch (err) {
      console.error('Failed to update subscription:', err)
      throw err
    }
  }

  const clearSubscription = () => {
    subscription.value = null
    currentPlan.value = null
    trialEndsAt.value = null
    isTrialActive.value = false
    initialized.value = false
    error.value = null
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    currentPlan,
    subscription,
    trialEndsAt,
    isTrialActive,
    loading,
    error,
    initialized,

    // Getters
    daysLeft,
    isExpired,
    canAccess,
    planName,
    isTrialPlan,

    // Actions
    checkSubscription,
    initializeSubscription,
    updateSubscription,
    clearSubscription,
    clearError
  }
})
