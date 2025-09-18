import { createRouter, createWebHistory } from 'vue-router'
import defaultLayout from '../layout/AppLayout.vue'
import HomeView from '../views/HomeView.vue'
import UserListView from '../views/UserListView.vue'

const routes = [
  { path: '/',
    component: HomeView,
    meta: {layout: defaultLayout}
  },
  { path: '/other',
    component: UserListView,
    meta: {layout: defaultLayout}}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router