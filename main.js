import Vue from 'vue'
import App from './App'
import MinRequest from './utils/MinRequest'
import minRequest from './utils/api'

Vue.use(MinRequest)
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	minRequest
})
app.$mount()
