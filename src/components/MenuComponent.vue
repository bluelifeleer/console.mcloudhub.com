<template>
	<div class="menu-component" :style="{'width':width+'px'}">
		<ul class="menu-list-group">
			<li class="meni-list-items" v-for="(menu,$index) in menus" :key="$index" :index="menu.index">
				<div class="menu-list-items-tap"><a :href="menu.alink" class="menu-list-items-tap-alink"><span class="menu-list-items-tap-text">{{menu.text}}</span><i class="icon menu-list-items-tap-icon iconfont" v-if="menu.childs.length">&#xe63a;</i><i class="icon menu-list-items-tap-icon" v-else></i></a></div>
				<div class="menu-list-childs-box" v-if="menu.childs.length">
					<ul class="menu-list-items-child-list-group">
						<li class="menu-list-items-child-list-items" v-for="(child,$index) in menu.childs" :key="$index" :index="menu.index+'-'+child.index">
							<div class="menu-list-items-child-list-items-tap"><a :href="child.alink" class="menu-list-items-child-list-items-tap-alink"><span class="menu-list-items-child-list-items-tap-text">{{child.text}}</span><i class="icon menu-list-items-child-list-items-tap-icon"></i></a></div>
						</li>
					</ul>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		name:'MenuComponent',
		props:['width'],
		data(){
			return {
				menus:[{
					index:0,
					text:'开发工具',
					icon:'',
					alink:'',
					childs:[{
						index:0,
						text:'图片转Base64',
						icon:'',
						alink:'/tootl/img2base64',
						childs:[]
					},{
						index:1,
						text:'正则测试',
						icon:'',
						alink:'',
						childs:[]
					},{
						index:2,
						text:'URL编/解码',
						icon:'',
						alink:'/tootl/urlmq',
						childs:[]
					},{
						index:3,
						text:'二维码生成',
						icon:'',
						alink:'/tootl/qrcode',
						childs:[]
					},{
						index:4,
						text:'接口调试',
						icon:'',
						alink:'/tootl/apitest',
						childs:[]
					},{
						index:5,
						text:'活动页面生成',
						icon:'',
						alink:'/tootl/active',
						childs:[]
					}]
				},{
					index:1,
					text:'工作记录',
					icon:'',
					alink:'/article/list',
					childs:[]
				},{
					index:2,
					text:'代码片段',
					icon:'',
					alink:'',
					childs:[]
				},{
					index:3,
					text:'财务记录',
					icon:'',
					alink:'',
					childs:[]
				}]
			}
		},
		created(){

		},
		methods:{

		},
		mounted(){

		}
	}
</script>
<style scoped>
	.menu-component{}

	.menu-component a{
		display:block;
		width:100%;
		height:50px;
		color:#909399;
	}

	.menu-list-group{
		width:100%;
		height:auto;
		background:#
	}

	.meni-list-items{
		width:100%;
		height:auto;
		position:relative;
	}

	.menu-list-items-tap{
		width:100%;
		height:50px;
		padding:0 0 0 10%;
	}

	.menu-list-items-tap .menu-list-items-tap-text{
		height:50px;
		line-height:50px;
	}

	.menu-list-items-tap-icon{
		position:absolute;
		right:20px;
		top:15px;
	}

	.menu-list-childs-box{
		width:100%;
		height:auto;
	}

	.menu-list-items-child-list-group{
		width:100%;
		height:auto;
	}

	.menu-list-items-child-list-items{
		width:100%;
		height:auto;
	}

	.menu-list-items-child-list-items-tap{
		width:100%;
		height:50px;
		padding:0 0 0 20%;
	}

	.menu-list-items-child-list-items-tap .menu-list-items-child-list-items-tap-text{
		height:50px;
		line-height:50px;
	}
</style>
