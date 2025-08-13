import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useSubscriptionStore } from '@/stores/subscription'
import { supabase } from '@/composables/useSupabase'

// Helper function to check if user has completed onboarding
const checkUserHasCompletedOnboarding = async (userId) => {
  if (!userId) return false
  
  try {
    // Check if user has any active business role (Owner, Manager, Employee, etc)
    // This covers all scenarios: business owner, invited employee, etc.
    const { data, error } = await supabase
      .from('business_users')
      .select('id')
      .eq('user_id', userId)
      .eq('status', 'active')
      .limit(1)
    
    if (error) {
      console.error('Error checking onboarding status:', error)
      return false
    }
    
    return data && data.length > 0
  } catch (error) {
    console.error('Error checking onboarding status:', error)
    return false
  }
}

import ViewPos from '../views/pos/ViewPos.vue'
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'
import RegisterSuccessView from '../views/auth/RegisterSuccessView.vue'
import ForgotPasswordView from '../views/auth/ForgotPasswordView.vue'
import TermsConditionsView from '../views/legal/TermsConditionsView.vue'
import PrivacyPolicyView from '../views/legal/PrivacyPolicyView.vue'
import DashboardView from '../views/dashboard/DashboardView.vue'
import OnboardingView from '../views/onboarding/OnboardingView.vue'
import PlansView from '../views/subscription/PlansView.vue'
import PaymentView from '../views/payment/PaymentView.vue'
import TransferInstructionsView from '../views/payment/TransferInstructionsView.vue'
import QRISPaymentView from '../views/payment/QRISPaymentView.vue'
// import ViewProduk from '../views/produk/ViewProduk.vue' // siapkan jika sudah ada

const routes = [
  { path: '/', redirect: '/dashboard' }, // Redirect ke dashboard setelah login
  { 
    path: '/dashboard', 
    name: 'dashboard', 
    component: DashboardView,
    meta: { requiresAuth: true, requiresOnboarding: true, requiresSubscription: true }
  },
  { 
    path: '/onboarding', 
    name: 'onboarding', 
    component: OnboardingView,
    meta: { requiresAuth: true, requiresOnboarding: false }
  },
  { 
    path: '/pos', 
    name: 'pos', 
    component: ViewPos,
    meta: { requiresAuth: true, requiresOnboarding: true, requiresSubscription: true }
  },
  { 
    path: '/login', 
    name: 'login', 
    component: LoginView,
    meta: { requiresGuest: true }
  },
  { 
    path: '/register', 
    name: 'register', 
    component: RegisterView,
    meta: { requiresGuest: true }
  },
  { 
    path: '/register-success', 
    name: 'register-success', 
    component: RegisterSuccessView,
    meta: { requiresGuest: true }
  },
  { 
    path: '/forgot-password', 
    name: 'forgot-password', 
    component: ForgotPasswordView,
    meta: { requiresGuest: true }
  },
  { path: '/terms-conditions', name: 'terms-conditions', component: TermsConditionsView },
  { path: '/privacy-policy', name: 'privacy-policy', component: PrivacyPolicyView },
  {
      path: '/plans',
      name: 'Plans',
      component: PlansView,
      meta: { requiresAuth: true }
    },
    {
      path: '/payment',
      name: 'Payment',
      component: PaymentView,
      meta: { requiresAuth: true }
    },
    {
      path: '/payment/transfer',
      name: 'TransferInstructions',
      component: TransferInstructionsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/payment/qris',
      name: 'QRISPayment',
      component: QRISPaymentView,
      meta: { requiresAuth: true }
    },
  // { path: '/produk', name: 'produk', component: ViewProduk },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Initialize auth if not already done
  if (!authStore.isInitialized) {
    await authStore.initializeAuth()
  }
  
  const isAuthenticated = authStore.isAuthenticated
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest)
  const requiresOnboarding = to.matched.some(record => record.meta.requiresOnboarding)
  const requiresSubscription = to.matched.some(record => record.meta.requiresSubscription)
  
  // Handle routes that require authentication
  if (requiresAuth && !isAuthenticated) {
    next('/login')
    return
  }
  
  // Handle routes that require guest (redirect authenticated users)
  if (requiresGuest && isAuthenticated) {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = await checkUserHasCompletedOnboarding(authStore.currentUser?.id)
    if (hasCompletedOnboarding) {
      next('/dashboard')
    } else {
      next('/onboarding')
    }
    return
  }
  
  // Handle routes that require onboarding (redirect to onboarding if not completed)
  if (requiresOnboarding && isAuthenticated) {
    const hasCompletedOnboarding = await checkUserHasCompletedOnboarding(authStore.currentUser?.id)
    if (!hasCompletedOnboarding && to.path !== '/onboarding') {
      next('/onboarding')
      return
    }
  }
  
  // Handle routes that require active subscription
  if (requiresSubscription && isAuthenticated) {
    const subscriptionStore = useSubscriptionStore()
    
    // Initialize subscription if not done
    if (!subscriptionStore.initialized) {
      await subscriptionStore.initializeSubscription(authStore.currentUser?.id)
    }
    
    // Check if subscription is expired and not already on plans page
    if (subscriptionStore.isExpired && to.path !== '/plans') {
      console.log('Subscription expired, redirecting to plans')
      next('/plans')
      return
    }
  }
  
  // Continue to route
  next()
})

export default router
