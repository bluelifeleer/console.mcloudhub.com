<template>
	<div class="home">
	  <div class="header-box"><Header /></div>
	  <div class="article-box">
	  	<Menu width="300"></Menu>

	  </div>
	  <div class="footer-box"><Footer /></div>
  </div>
</template>
<script>
	import Header from '@/components/Header.vue'
	import Footer from '@/components/Footer.vue'
	import Menu from '@/components/Menu.vue'
	export default {
		name:'TootlIndex',
		components: {
      Header,
      Footer,
      Menu
    }
	}
</script>
<style scoped>
	.tootl-index{

	}
</style>
