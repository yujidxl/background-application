import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '目录',
    component: () => import('../views/Home.vue'),
    redirect: '/settings',
    children: [
      {
        path: '/settings',
        name: '配置面板',
        component: () => import('../views/pages/settings/UserSettings.vue'),
        children: [
          {
            path: '/settings/user-settings',
            name: '用户设置',
            component: () => import('../views/pages/settings/UserSettings.vue')
          },
          {
            path: '/settings/book-settings',
            name: '书籍设置',
            component: () => import('../views/pages/settings/BookSettings.vue')
          }
        ]
      },
      {
        path: 'User',
        name: '用户模块',
        component: () => import('../views/pages/user/UserList.vue'),
        children: [
          {
            path: '/user/user-list',
            name: '用户列表',
            component: () => import('../views/pages/user/UserList.vue')
          }
        ]
      },
      {
        path: '/about',
        name: '关于我们',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/pages/About.vue')
      }
    ]
  },
  {
    path: '/login',
    name: '登录',
    component: () => import('../views/Login.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
});

export default router;
