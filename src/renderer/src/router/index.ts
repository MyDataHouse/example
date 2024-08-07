import { createRouter, createWebHistory } from 'vue-router';
import processData from './modules/processData';
const mouelesRouters = [processData];

const routes = [
  // { path: '/login', component: () => import('@/views/login/index.vue') },
  {
    path: '/:catchAll(.*)', // 不识别的path自动匹配404
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...mouelesRouters, ...routes]
});

export default router;
