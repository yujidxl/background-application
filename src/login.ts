import router from './router';
import store from './store';
// import vue from 'vue'
// import NProgress from 'nprogress'; // Progress 进度条
// import 'nprogress/nprogress.css'; // Progress 进度条样式

// permissiom judge
// function hasPermission(roles, permissionRoles) {
//   if (roles.indexOf('admin') >= 0) return true // admin权限 直接通过
//   if (!permissionRoles) return true
//   return roles.some(role => permissionRoles.indexOf(role) >= 0)
// }

// register global progress.
const whiteList = ['/login']; // 不重定向白名单
router.beforeEach((to, from, next) => {
  const name = to.name;
  if (typeof name === 'string') {
    document.title = name;
  } else {
    document.title = '';
  }
  // NProgress.start() // 开启Progress
  if (store.getters.token) {
    // 判断是否有token
    if (to.path === '/login') {
      next({ path: '/' });
    }
    next();
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next('/login'); // 否则全部重定向到登录页
      // NProgress.done() // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }
  }
});

// router.afterEach(() => {
//   // NProgress.done() // 结束Progress
// })
