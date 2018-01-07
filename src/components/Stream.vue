<template>
  <div class="container">
    <div class="container-video">
      <h3>{{data.title}}</h3>
      <h4>Streamer: {{data.user_id}}</h4>
      <youtube :video-id="videoId" :player-vars="{ autoplay: 0 }"></youtube>
    </div>
    <div class="container-message-stream">
      <div v-for="message in messages">
        <div class="other-message" v-if="message.user != 'Me'">
          <span class="message-user">{{message.user}}: </span>
          <span class="message-text">{{message.text}}</span>
        </div>
        <div class="my-message" v-if="message.user == 'Me'">
          <span class="message-user">{{message.user}}: </span>
          <span class="message-text">{{message.text}}</span>
        </div>
        <div style="clear:both;"></div>
      </div>
      <div class="container-message-input">
        <div class="container-input">
          <input class="message-input" v-model="message" placeholder="Your message"></input>
        </div>
        <div class="button" @click="submitForm">
            Submit
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import config from './../config';

export default {
  name: 'app',
  data () {
    return {
      videoId: '',
      message: '',
      data: {},
      messages: [],
      websocket: null
    }
  },
  mounted: function() {
    const that = this;
    axios.get(`${config.streamServiceUrl}/v1/streams/${this.$route.params.streamId}`).then((res) => {
      this.videoId = this.$youtube.getIdFromURL(res.data.url);
      this.data = res.data;

      this.websocket = new WebSocket(`${config.streamServiceWs}/v1/streamMessaging/${this.$route.params.streamId}`);

      this.websocket.onopen = function() {
        console.log('CONNECTION OPENED', `${config.streamServiceWs}/v1/streamMessaging/${that.$route.params.streamId}`);
      }

      this.websocket.onmessage = function (event) {
        console.log('ONMESSAGE', event);
        that.messages.push(JSON.parse(event.data));
      }
    }).catch(err => {
      this.$router.push({path: `/`});
    })
  },
  methods: {
    submitForm: function() {
      this.websocket.send(JSON.stringify({user: 'Me', text: this.message}));
      this.message = '';
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

.container-message-stream {
  flex: 1;
  margin: 0 20px;
  padding: 20px;
  border-radius: 6px;
  max-width: 300px;
  background-color: #DDD;
  position: relative;
}

.other-message {
  background-color: #F94D53;
  border-radius: 10px;
  padding: 2px 10px;
  text-align: left;
  color: white;
  display: inline-block;
  float: left;
  margin-bottom: 10px;
}

.my-message {
  background-color: #4397FF;
  border-radius: 10px;
  padding: 2px 10px;
  text-align: left;
  color: white;
  display: inline-block;
  float: right;
}

.message-user {
  font-size: 12px;
}

.message-text {
  font-size: 14px;
}


.container-message-input {
  align-self: flex-end;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.container-input {
  padding: 10px;
  margin: 10px;
  border-radius: 4px;
  background: white; 
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
