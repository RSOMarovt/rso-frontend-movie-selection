<template>
  <div>
    <gmap-map
        :style="style"
        :center="currentLocation"
        :zoom="12"
        map-type-id="terrain"
        @dragend="loadLocationStreams">

        <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        @click="() => markerClick(m.data.id)"
        @mouseover="() => mouseOver(index)"
        @mouseout="infoWinOpen = false"
        ></gmap-marker>

    </gmap-map>

    <div class="container-preview" v-if="infoWinOpen">
      <h2>{{infoWindowData.title}}</h2>
      <h3>User: {{infoWindowData.user}}</h3>
      <youtube :video-id="infoWindowData.videoId" player-width="256" player-height="150" :player-vars="{ autoplay: 1 }"></youtube>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import config from './../config';

export default {
  name: 'Map',
  data () {
    return {
      currentLocation: {
        lat: 0,
        lng: 0
      },
      infoWinOpen: false,
      infoWindowData: {
        videoId: null,
        title: null,
      },
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      style: {
        height: '100px',
        width: '100px'
      },
      markers: [
        {
          position: {lat: 46.0569, lng: 14.5058},
          data: {
            title: 'Roadster',
            url: 'https://www.youtube.com/watch?v=tw4jkyfY4HE',
            user: 'banomaster'
          }
        }
      ]
    }
  },
  mounted: function() {
    const that = this;

    const timeout = setTimeout(() => {
      that.currentLocation.lat = 46.0569;
      that.currentLocation.lng = 14.5058;

      that.loadLocationStreams();
    },5000);

    navigator.geolocation.getCurrentPosition(function(position) {

      clearTimeout(timeout);
      
      that.currentLocation.lat = position.coords.latitude;
      that.currentLocation.lng = position.coords.longitude;

      that.loadLocationStreams();
    });
    


    this.style.height = `${window.innerHeight - 60}px`;
    this.style.width = `${window.innerWidth}px`;
    
  },
  methods: {
      markerClick: function(id) {
        this.$router.push({path: `/${id}`});
      },
      mouseOver: function(index) {
        this.infoWindowData = {
          videoId: this.$youtube.getIdFromURL(this.markers[index].data.url),
          title: this.markers[index].data.title,
          user: this.markers[index].data.user,
        }
        this.infoWindowPos = this.markers[index].position;
        this.infoWinOpen = true;
      },
      loadLocationStreams: function() {
        if (this.currentLocation.lat != 0 && this.currentLocation.lng != 0) {
          console.log(config);
          axios.get(`${config.locationServiceUrl}/streamsNoBreaker?lat=${this.currentLocation.lat}&lng=${this.currentLocation.lng}`).then(res => {
            this.markers = res.data.map(el => {
              return {
                position: {
                  lat: el.location.coordinates[0],
                  lng: el.location.coordinates[1],
                },
                data: el
              }
            })
          });
        }
      }
  }
}
</script>

<style>
  .container-preview {
    position: absolute;
    top: 120px;
    left: 0;
    background-color: rgba(200, 200, 200, 0.8);
    padding: 20px;
  }
</style>
