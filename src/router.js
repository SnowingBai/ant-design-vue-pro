import Vue from 'vue'
import Router from 'vue-router'
import findLast from 'lodash/findLast'
import {notification} from 'ant-design-vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import NotFound from './views/404'
import Forbidden from './views/403'
import {check, isLogin} from './utils/auth'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/uesr',
      name: 'uesr',
      hideInMenu: true,
      component: () => import(/* webpackChunkName: "user" */ './layouts/UserLayout'),
      children: [
        {
          path: '/user',
          redirect: '/user/login'
        },
        {
          path: '/user/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "user" */ './views/User/Login')
        },
        {
          path: '/user/register',
          name: 'register',
          component: () => import(/* webpackChunkName: "user" */ './views/User/Register')
        }
      ]
    },
    {
      path: '/',
      meta: {authority: ['user', 'admin'] },
      component: () => import(/* webpackChunkName: "user" */ './layouts/BasicLayout'),
      children: [
        // dashboard
        {
          path: '/',
          redirect: '/dashboard/analysis'
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          meta: {icon: 'dashboard', title: '仪表盘'},
          component: { render: h => h('router-view') },
          children: [
            {
              path: '/dashboard/analysis',
              name: 'analysis',
              meta: {title: '分析页'},
              component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard/Analysis')
            }
          ]
        },
        // form
        {
          path: '/form',
          name: 'form',
          meta: {icon: 'form', title: '表单', authority: ['admin'] },
          component: { render: h => h('router-view') },
          children: [
            {
              path: '/form/basic-form',
              name: 'basicform',
              meta: {title: '基础表单'},
              component: () => import(/* webpackChunkName: "form" */ './views/Form/BasicForm'),
            },
            {
              path: '/form/step-form',
              name: 'stepform',
              meta: {title: '分布表单'},
              hideChildrenInMenu: true,
              component: () => import(/* webpackChunkName: "form" */ './views/Form/StepForm'),
              children: [
                {
                  path: '/form/stepform',
                  redirect: '/form/stepform/info'
                },
                {
                  path: '/form/stepform/info',
                  name: 'info',
                  component: () => import(/* webpackChunkName: "form" */ './views/Form/StepForm/Step1')
                },
                {
                  path: '/form/stepform/confirm',
                  name: 'confirm',
                  component: () => import(/* webpackChunkName: "confirm" */ './views/Form/StepForm/Step2')
                },
                {
                  path: '/form/stepform/result',
                  name: 'result',
                  component: () => import(/* webpackChunkName: "result" */ './views/Form/StepForm/Step3')
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/403',
      name: '403',
      hideInMenu: true,
      component: Forbidden
    },
    {
      path: '*',
      name: '404',
      hideInMenu: true,
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start()
  }

  const record = findLast(to.matched, record => record.meta.authority)
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== '/user/login') {
      next({
        path: 'user/login'
      })
    } else if (to.path !== '/403') {
      notification.error({
        message: '403',
        description: '你没有权限访问，请联系管理员咨询'
      })
      next({
        path: '/403'
      })
    }
    NProgress.done()
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
