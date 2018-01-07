import Vue from 'vue'
import App from './App.vue'
import router from './router'

import * as VueGoogleMaps from 'vue2-google-maps'
import VueYouTubeEmbed from 'vue-youtube-embed'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDLcnpD6oe8l2DQbwU9H3PUS1ZDs4lweu8',
    libraries: 'places'
  }
})

Vue.use(VueYouTubeEmbed)

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});