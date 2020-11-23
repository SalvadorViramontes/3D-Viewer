<template>
  <div id="app">
    <Header/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import Header from './components/Header.vue'

  @Component({
    components: {
      Header
    }
  })
  export default class App extends Vue{

    constructor(){
      super();
    }
    
  }
</script>