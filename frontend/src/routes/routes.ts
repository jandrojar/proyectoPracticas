import { createRouter, createWebHistory } from 'vue-router'
import defaultLayout from '../layout/AppLayout.vue'
import HomeView from '../views/HomeView.vue'
import UserListView from '../views/UserListView.vue'
import CreateUserView from '../views/CreateUserView.vue'
import EditUserView from '../views/EditUserView.vue'

const routes = [
  { path: '/',
    component: HomeView,
    meta: {layout: defaultLayout}
  },
  { path: '/users',
    component: UserListView,
    meta: {layout: defaultLayout}
  },
  { path: '/users/create',
    component: CreateUserView,
    meta: {layout: defaultLayout}
  },
  {
    path: '/users/:id/edit',
    component: EditUserView,
    meta: {layout: defaultLayout},
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router