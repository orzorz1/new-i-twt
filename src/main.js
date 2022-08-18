import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

import Message from '@/components/message/index.js'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'

import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'  //关键代码
Vue.config.productionTip = false

Vue.prototype.$message = Message
Vue.config.productionTip = false

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
