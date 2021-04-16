import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'projectlist',
    component: () => import('@/components/ProjectList.vue'),
  },
  {
    path: '/:id',
    name: 'detailproject',
    component: () => import('@/components/DetailProject.vue'),
  },
  {
    path: '/upload',
    name: 'uploadproject',
    component: () => import('@/components/UploadProject.vue'),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
