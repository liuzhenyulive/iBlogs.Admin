import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/content',
    component: Layout,
    redirect: '/content/article',
    name: 'Content',
    meta: { title: 'Content', icon: 'el-icon-reading' },
    children: [
      {
        path: 'article',
        name: 'Article',
        component: () => import('@/views/content/index'),
        meta: { title: 'Article', icon: 'el-icon-notebook-1' }
      },
      {
        path: 'page',
        name: 'Page',
        component: () => import('@/views/content/index'),
        meta: { title: 'Page', icon: 'el-icon-notebook-2' }
      },
      {
        path: 'edit',
        hidden: true,
        component: () => import('@/views/content/edit'),
        name: 'Edit',
        meta: { title: 'Edit', icon: 'el-icon-edit', noCache: true }
      }
    ]
  },
  {
    path: '/meta',
    component: Layout,
    redirect: '/meta/category',
    name: 'Meta',
    meta: { title: 'Meta', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/meta/index'),
        meta: { title: 'Category', icon: 'el-icon-folder-opened' }
      },
      {
        path: 'tag',
        name: 'Tag',
        component: () => import('@/views/meta/index'),
        meta: { title: 'Tag', icon: 'el-icon-collection-tag' }
      }
    ]
  },
  {
    path: '/comment',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Comment',
        component: () => import('@/views/comment/index'),
        meta: { title: 'Comment', icon: 'el-icon-chat-dot-round' }
      }
    ]
  },
  {
    path: '/option',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Option',
        component: () => import('@/views/option/index'),
        meta: { title: 'Option', icon: 'el-icon-setting' }
      }
    ]
  },
  {
    path: 'nacos',
    component: Layout,
    children: [
      {
        path: 'http://192.168.101.1:8848/nacos',
        meta: { title: 'Nacos', icon: 'el-icon-link' }
      }
    ]
  },
  {
    path: 'github',
    component: Layout,
    children: [
      {
        path: 'https://github.com/liuzhenyulive/iblogs.admin',
        meta: { title: 'Github', icon: 'el-icon-link' }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
