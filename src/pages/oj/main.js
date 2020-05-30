import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import filters from 'Utils/filters'
import highlight from 'Plugins/highlight'
import VueMarkdown from 'vue-markdown'
import 'Plugins/element'
import 'Style/extends.scss'
import 'Style/markdown.scss'

Vue.use(highlight)
Vue.component('vue-markdown', VueMarkdown)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
