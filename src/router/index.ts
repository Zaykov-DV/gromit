import {createRouter, createWebHistory} from 'vue-router'
import MainPage from '@/views/MainPage.vue';

const router =  createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/main',
      name: 'cabinet',
      component: MainPage,
    }
  ]
})

export default router
