<template>
  <div class="header-container">
    header
  </div>
</template>
<script>
  export default {
    name: 'HeaderComponent',
    data() {
      return {

      }
    },
    created() {},
    methods: {},
    mounted() {}
  }

</script>

<style scoped>
  .header-container {
    width: 100%;
    height: 50px;
    background: #fff;
    -opacity: .4;
    -filter: alpha(opacity:40);
    box-shadow:0 0 8px #ccc;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
  }

</style>
