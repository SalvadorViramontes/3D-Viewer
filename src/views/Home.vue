<template>
  <div class="home">
    <SidePanel/>
    <h1> Proyecto 01 </h1>
  </div>
</template>

<style lang="scss">
  
</style>

<script lang="ts">
  import { Vue, Prop } from "vue-property-decorator";

  import Component from 'vue-class-component'
  import SidePanel from '../components/SidePanel.vue'

  @Component({
    components: {
      SidePanel
    }
  })
  export default class Home extends Vue {
    @Prop() private msg!: string;

    
  }
</script>