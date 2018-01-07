<template>
  <div class="container">
    <form class="container-form">
        <h2>Add new stream</h2>
        <div class="container-message-input">
            <input class="message-input" v-model="formData.title" placeholder="Video title"></input>
        </div>
        <div class="container-message-input">
            <input class="message-input" v-model="formData.url" placeholder="Video url"></input>
        </div>
        <div class="container-message-input">
            <input class="message-input" v-model="formData.lat" placeholder="Location latitude"></input>
        </div>
        <div class="container-message-input">
            <input class="message-input" v-model="formData.lng" placeholder="Location longitude"></input>
        </div>
        <div class="button" @click="submitForm">
            Submit
        </div>
    </form>
    <div class="container-video">
        <youtube v-if="videoId" :video-id="videoId" :player-vars="{ autoplay: 0 }"></youtube>
    </div>
  </div>
</template>

<script>
import config from './../config.js';
import axios from 'axios';


export default {
  name: 'app',
  data () {
    return {
      videoId: null,
      message: '',
      formData: {
        title: '',
        url: '',
        lat: 46.0769 + Math.random() * 0.1,
        lng: 14.5258 + Math.random() * 0.1,
        user_id: '5a47807333d2cdfa08831df8'
      }
    }
  },
  watch: {
    'formData.url': function() {
      this.videoId = this.$youtube.getIdFromURL(this.formData.url);
    }
  },
  methods: {
    submitForm: function() {
      console.log('wat', config);
      axios.post(`${config.locationServiceUrl}/streams`, this.formData)
      .then((res) => {
        this.$router.push({path: `/${res.data.stream_id}`});
      }).catch(err => {
        alert('Something went wrong. Please try again in few seconds!');
      })
    }
  }
}
</script>

<style>
.container {
  margin: 20px;
  display: flex;
}

.container-video {
  flex: 2;
  justify-content: 'center';
}

.container-form {
  flex: 1;
  margin: 0 20px;
  padding: 20px;
  border-radius: 6px;
  max-width: 300px;
  background-color: #DDD;
  position: relative;
}

.container-message-input {
  background: white;
  align-self: flex-end;
  padding: 10px;
  margin: 10px;
  border-radius: 4px;
}

.message-input {
  width: 100%;
  border: none;
  margin: 0;
  padding: 0;
}

.message-input:focus {
  outline: none;
}

.button {
  margin: 10px;
  padding: 10px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  background-color: #26C73D;
}

.button:hover {
  background-color: #26C75D;
}

</style>
