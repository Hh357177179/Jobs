<template>
  <div class="root">
    <router-view/>
    <tabBar></tabBar>
  </div>
</template>

<script>
  import tabBar from '../components/tabBar.vue'

  export default {
    data () {
      return {

      }
    },
    components: { tabBar }
  }
</script>