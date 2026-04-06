import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'listing-search',
      component: () => import('@/features/listings/listing-search/pages/ListingSearchPage.vue')
    }
  ]
})

export default router
