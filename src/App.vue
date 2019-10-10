<template>
  <div id="app">
    <Header />
    <router-view/>
    <Footer />
  </div>
</template>

<script>
  // @ is an alias to /src
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'
console.log(Header)
  export default{
    name: 'App',
    components: {
      Header,
      Footer
    }
  }
</script>

<style>
html,body,div,table,thead,tr,th,tbody,ul,ol,dl,li{
  padding:0;
  margin:0;
}

ul,ol,dl{
  list-style-type:none;
}

a{
  text-decoration: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
