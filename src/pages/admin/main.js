import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import Panel from '@admin/components/Panel'
import IconBtn from '@admin/components/IconBtn'
import MarkdownEditor from '@admin/components/MarkdownEditor'
import 'Plugins/element'


Vue.component(IconBtn.name, IconBtn)
Vue.component(Panel.name, Panel)
Vue.component(MarkdownEditor.name, MarkdownEditor)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
