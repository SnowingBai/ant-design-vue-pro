import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/uesr',
      name: 'uesr',
      component: () => import(/* webpackChunkName: "user" */ './components/layouts/UserLayout'),
      children: [
        {
          path: '/',
          redirect: '/login'
        },
        {
          path: 'login',
          component: () => import(/* webpackChunkName: "user" */ './components/user/Login')
        },
        {
          path: 'register',
          component: () => import(/* webpackChunkName: "user" */ './components/user/Register')
        }
      ]
    }
  ]
});
