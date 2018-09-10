import Vue from 'vue';
import Router from 'vue-router';
import Speak from './views/Speak.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'speak',
      component: Speak,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (speak.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "speak" */ './views/Speak.vue'),
    },
  ],
});
