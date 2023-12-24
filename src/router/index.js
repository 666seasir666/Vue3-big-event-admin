// 引入 Vue Router 的相关函数
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'
// 创建路由实例
const router = createRouter({
  // 使用 Web History 模式，需要服务器配置支持
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 登录页
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },

    // 主布局
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),

      // 重定向到文章管理
      redirect: '/article/manage',

      // 子路由
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue') // 文章管理
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue') // 频道管理
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue') // 个人详情
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue') // 更换头像
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue') // 重置密码
        }
      ]
    }
  ]
})

// 路由守卫
router.beforeEach((to) => {
  // 判断useStore.token是否存在，如果不存在且to.path不等于'/login'，则返回'/login'
  const useStore = useUserStore()
  if (!useStore.token && to.path !== '/login') return '/login'
})

// 导出路由实例
export default router
