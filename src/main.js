import Vue from 'vue' // importa la libreria
import App from './App.vue' // componente app
import '@/assets/css/tailwind.css'
import Chartkick from 'vue-chartkick'
import { VueSpinners } from '@saeris/vue-spinners'
import Chart from 'chart.js'

import router from '@/router'
import { dollarFilter, percentFilter } from '@/filters'

Vue.use(VueSpinners)
Vue.use(Chartkick.use(Chart))

Vue.filter('dollar', dollarFilter)
Vue.filter('percent', percentFilter)
Vue.config.productionTip = false //conf tips de producción

//instancia de vue
new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
