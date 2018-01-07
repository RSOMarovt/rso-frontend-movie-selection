import Vue from 'vue'
import Router from 'vue-router'
import Map from './../components/Map.vue'
import Stream from './../components/Stream.vue'
import AddStream from './../components/AddStream.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',  
  routes: [
    {
        path: '/',
        name: 'Map',
        component: Map
    }, {
        path: '/addStream',
        name: 'AddStream',
        component: AddStream
    }, {
        path: '/:streamId',
        name: 'Stream',
        component: Stream
    }
  ]
});

export default router;
