<template>
  <div id="app">
    <div class="navigation">
      <h1>Location streams</h1>
      <div class="navigation-items">
        <router-link to="/" class="item">Map</router-link>
        <router-link to="/addStream" class="item">Add stream</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>

  html {
    font-size: 10px;
  }

  body {
    margin: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .navigation {
    height: 60px;
    background-color: #DDD;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0px 130px;
  }

  .navigation-items {
    justify-content: flex-end;
    flex-direction: row;
    display: flex;
  }

  .item {
    align-self: center;
    font-size: 14px;
    padding: 0 20px;
    color: #333;
    font-style: none;
    text-decoration: none;
  }
</style>

<style scoped>


</style>
