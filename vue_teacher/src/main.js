import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 加载全局样式文件
import './styles/index.less'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')