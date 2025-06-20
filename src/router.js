// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

// Lazy-loaded components for better performance
const Login = () => import('@/views/Login.vue');
const Register = () => import('@/views/Register.vue');
const CrashGame = () => import('@/views/CrashGame.vue');
const Home = () => import('@/views/CrashGame.vue');
const NotFound = () => import('@/views/NotFoundView.vue') // Make sure this component exists


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Home | JetBet'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: 'Login | JetBet',
      requiresGuest: true // Only accessible when not logged in
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      title: 'Register | JetBet',
      requiresGuest: true
    }
  },
  {
    path: '/crash',
    name: 'crash',
    component: CrashGame,
    meta: {
      title: 'Crash Game | JetBet',
      requiresAuth: true // Requires authentication
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound,
    meta: {
      title: '404 Not Found'
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Return to saved position or top of page
    return savedPosition || { top: 0 };
  }
});

// Authentication guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  
  // Set page title
  document.title = to.meta.title || 'JetBet';

  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } });
    return;
  }

  // Check if route requires guest (non-authenticated)
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next({ name: 'home' });
    return;
  }

  next();
});

export default router;