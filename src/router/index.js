import { createRouter, createWebHistory } from 'vue-router'

import ViewPos from '../views/pos/ViewPos.vue'
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'
import ForgotPasswordView from '../views/auth/ForgotPasswordView.vue'
import TermsConditionsView from '../views/legal/TermsConditionsView.vue'
import PrivacyPolicyView from '../views/legal/PrivacyPolicyView.vue'
// import ViewProduk from '../views/produk/ViewProduk.vue' // siapkan jika sudah ada

const routes = [
  { path: '/', redirect: '/login' }, // Redirect langsung ke login
  { path: '/pos', name: 'pos', component: ViewPos },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/forgot-password', name: 'forgot-password', component: ForgotPasswordView },
  { path: '/terms-conditions', name: 'terms-conditions', component: TermsConditionsView },
  { path: '/privacy-policy', name: 'privacy-policy', component: PrivacyPolicyView },
  // { path: '/produk', name: 'produk', component: ViewProduk },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
