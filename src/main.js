import Vue from 'vue'
import './plugins/axios';
import vuetify from './plugins/vuetify';
import router from './plugins/vuerouter';
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
