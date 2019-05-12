import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import NotFound from './views/404'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/uesr',
      name: 'uesr',
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
          component: { render: h => h('router-view') },
          children: [
            {
              path: '/dashboard/analysis',
              name: 'analysis',
              component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard/Analysis')
            }
          ]
        },
        // form
        {
          path: '/form',
          name: 'form',
          component: { render: h => h('router-view') },
          children: [
            {
              path: '/form/step-form',
              name: 'stepform',
              component: () => import(/* webpackChunkName: "form" */ './views/Form/StepForm/index'),
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
      path: '*',
      name: '404',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start()
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
