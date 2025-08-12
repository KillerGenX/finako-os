import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import ViewPos from '../views/pos/ViewPos.vue'
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'
import ForgotPasswordView from '../views/auth/ForgotPasswordView.vue'
import TermsConditionsView from '../views/legal/TermsConditionsView.vue'
import PrivacyPolicyView from '../views/legal/PrivacyPolicyView.vue'
import DashboardView from '../views/dashboard/DashboardView.vue'
// import ViewProduk from '../views/produk/ViewProduk.vue' // siapkan jika sudah ada

const routes = [
  { path: '/', redirect: '/dashboard' }, // Redirect ke dashboard setelah login
  { 
    path: '/dashboard', 
    name: 'dashboard', 
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  { 
    path: '/pos', 
    name: 'pos', 
    component: ViewPos,
    meta: { requiresAuth: true }
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
    path: '/forgot-password', 
    name: 'forgot-password', 
    component: ForgotPasswordView,
    meta: { requiresGuest: true }
  },
  { path: '/terms-conditions', name: 'terms-conditions', component: TermsConditionsView },
  { path: '/privacy-policy', name: 'privacy-policy', component: PrivacyPolicyView },
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
  
  // Handle routes that require authentication
  if (requiresAuth && !isAuthenticated) {
    next('/login')
    return
  }
  
  // Handle routes that require guest (redirect authenticated users)
  if (requiresGuest && isAuthenticated) {
    next('/dashboard')
    return
  }
  
  // Continue to route
  next()
})

export default router
