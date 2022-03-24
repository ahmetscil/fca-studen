import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import bootstrap from 'bootstrap'
import jQuery from 'jquery'
import Toasted from 'vue-toasted'
import VueApexCharts from 'vue-apexcharts'
import store from './store'
import Vuelidate from 'vuelidate'
import vSelect from 'vue-select'
import VModal from 'vue-js-modal'
import VueGoodTablePlugin from 'vue-good-table'
import PrettyCheckbox from 'pretty-checkbox-vue'
import { TimelineLite, TweenMax, Back, Expo } from 'gsap'
import vueVimeoPlayer from 'vue-vimeo-player'
import VuejsDialog from 'vuejs-dialog'
import SurveyView from './components/Survey'

import Navigation from './components/Navigation'
import Activities from './components/Activities'
import Breadcrumb from './components/Breadcrumb'
import Header from './components/Header'
import Footer from './components/Footer'
import Upload from './components/Upload'
import CourseList from './views/Courses/Index' // lectures in courses list
import CourseDetail from './views/Courses/Show' // course detail and lectures
import FileSelect from './components/SelectFile.vue'
import Chat from 'vue-beautiful-chat'

Vue.component('Upload', Upload)
Vue.component('Navigation', Navigation)
Vue.component('Activities', Activities)
Vue.component('Breadcrumb', Breadcrumb)
Vue.component('Header', Header)
Vue.component('Footer', Footer)
Vue.component('CourseList', CourseList) // öğrenci
Vue.component('CourseDetail', CourseDetail) // öğrenci
Vue.component('FileSelect', FileSelect) // öğrenci
Vue.component('SurveyView', SurveyView)
Vue.use(Toasted)
Vue.use(VueApexCharts)
Vue.use(Vuelidate)
Vue.use(VModal)
Vue.use(VueGoodTablePlugin)
Vue.component('v-select', vSelect)
Vue.use(PrettyCheckbox)
Vue.use(vueVimeoPlayer)
Vue.use(VuejsDialog)
Vue.use(Chat)

Vue.component('apexchart', VueApexCharts)
global.TimelineLite = TimelineLite
global.TweenMax = TweenMax
global.Back = Back
global.Expo = Expo
global.jQuery = jQuery
global.$ = jQuery
global.bootstrap = bootstrap

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
