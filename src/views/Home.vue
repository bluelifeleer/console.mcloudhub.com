<template>
	<div class="home">
	  <div class="header-box"><HeaderComponent /></div>
	  <div class="article-box">
	  	<div class="menu-layout-box">
	  		<MenuComponent width="280"></MenuComponent>
	  	</div>
			<div class="right-layout-box">
				<router-view />
			</div>
	  </div>
	  <div class="footer-box"><FooterComponent /></div>
  </div>
</template>

<script>
	// @ is an alias to /src
	import HeaderComponent from '@/components/HeaderComponent.vue'
	import FooterComponent from '@/components/FooterComponent.vue'
	import MenuComponent from '@/components/MenuComponent.vue'
	export default {
	  name: 'home',
	  components: {
      HeaderComponent,
      FooterComponent,
      MenuComponent
    }
	}
</script>
<style scoped>
	.home{
		width:100%;
		height:auto;
	}

	.header-box{
		width:100%;
		height:50px;
	}

	.article-box{
		width:100%;
		height:auto;
		padding:20px 0;
		overflow:hidden;
	}

	.menu-layout-box{
		float:left;
		width:15%;
		height:auto;
	}

	.right-layout-box{
		float:left;
		width:85%;
		height:auto;
	}

	.footer-box{
		width:100%;
		height:auto;
	}
</style>
