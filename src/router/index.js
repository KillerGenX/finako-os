import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ViewPos from '../views/pos/ViewPos.vue'
// import ViewProduk from '../views/produk/ViewProduk.vue' // siapkan jika sudah ada

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/pos', name: 'pos', component: ViewPos },
  // { path: '/produk', name: 'produk', component: ViewProduk },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
