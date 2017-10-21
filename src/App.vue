<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import axios from 'axios';

export const HTTP = axios.create({
  baseURL: `http://localhost:49160/`,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
});

export default {
  name: 'app',
  data () {
    return {
      msg: ''
    }
  },
  created() {
    HTTP.get('/')
    .then(response => {
      // JSON responses are automatically parsed.
      this.msg = response.data
    })
  }
}
</script>

<style{{#sass}} lang="scss"{{/sass}}>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
