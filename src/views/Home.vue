<template>
  <div class="home">
    <SidePanel/>
    <Canvas/>
  </div>
</template>

<style lang="scss">
  
</style>

<script lang="ts">
  import { Vue, Prop } from "vue-property-decorator";

  import Component from 'vue-class-component'
  import SidePanel from '../components/SidePanel.vue'
  import Canvas from '../components/Canvas.vue'

  @Component({
    components: {
      SidePanel,
      Canvas
    }
  })
  export default class Home extends Vue {
    @Prop() private msg!: string;

    
  }
</script>