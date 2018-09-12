import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueSocketIO from 'vue-socket.io';
import socketio from 'socket.io-client';

Vue.config.productionTip = false;

Vue.use(VueSocketIO, socketio('http://localhost:3000'));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
