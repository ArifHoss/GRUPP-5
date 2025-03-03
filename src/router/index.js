import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/createAccount',
      name: 'createAccount',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CreateAccountView.vue'),
    },
    {
      path: '/forgotPassword',
      name: 'forgotPassword',
      component: () => import('../views/ForgotPasswordView.vue'),
    },
    {
      path: '/onboarding',
      name: 'onboarding',
      component: () => import('../views/OnboardingView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
    },
    {
      path: '/challenge',
      name: 'challenge',
      component: () => import('../views/ChallengeView.vue'),
    },
    {
      path: '/archive',
      name: 'archive',
      component: () => import('../views/ArchiveView.vue'),
    },
    {
      path: '/points',
      name: 'points',
      component: () => import('../views/PointsView.vue'),
    },
    {
      path: '/successPassword',
      name: 'successPassword',
      component: () => import('../views/SuccessPassword.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/Settings.vue'),
    },
    {
      path: '/accountsetting',
      name: 'accountsetting',
      component: () => import('../views/AccountSettings.vue'),
    },
    {
      path: '/editName',
      name: 'editName',
      component: () => import('../views/EditName.vue'),
    },
    {
      path: '/editEmail',
      name: 'editEmail',
      component: () => import('../views/EditEmail.vue'),
    },
    {
      path: '/updatePassword',
      name: 'updatePassword',
      component: () => import('../views/UpdatePassword.vue'),
    },
  ],
})

export default router
