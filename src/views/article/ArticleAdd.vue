<template>
	<div class="article-add">
		<div class="article-add-body">
			<div class="article-title"><input type="text" name="article-title" value="" v-model="article.title" placeholder="输入文章标题"></div>
			<div class="article-content-box"><mavon-editor v-model="article.content" @change="getEditorValue" ref="markerdown" /></div>
			<div class="article-targets-box">
				<div class="article-targets-title"><label for="targets">选择标签：</label><a href="javascript:void(0);" class="add-target-but" @click="targetAddDialog=true">添加标签</a></div>
				<div class="article-targets-selector-options"><a href="javascript:void(0);" class="targets-selector-options" v-for="(target,$index) in targets" :key="$index" :index="target.index" :title="target.text" @click="selectItems(target)" :class="{'targets-selector-options-active':target.selected}">{{target.text}}</a></div>
			</div>
			<div class="article-add-form-submit-box">
				<a href="javascript:void(0);" class="article-add-form-submit" @click="articleFormSubmit($event)">保存</a>
			</div>
		</div>
		<el-dialog title="添加标签:" :visible.sync="targetAddDialog" width="40%">
		  <el-form :model="addTargtForm">
		  	<el-form-item label="标签排序：" :label-width="formLabelWidth">
		      <el-input v-model="addTargtForm.index" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="标签名称：" :label-width="formLabelWidth">
		      <el-input v-model="addTargtForm.name" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="标签icon：" :label-width="formLabelWidth">
		      <el-input v-model="addTargtForm.icon" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="标签连接：" :label-width="formLabelWidth">
		      <el-input v-model="addTargtForm.link" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="标签描述：" :label-width="formLabelWidth">
		    	<el-input type="textarea" v-model="addTargtForm.desc"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="targetAddDialog = false">取 消</el-button>
		    <el-button type="success" @click="targetAddFormSubmit($event)">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
	export default{
		name:'ArticleAdd',
		data(){
			return {
				targetAddDialog:false,
				formLabelWidth: '120px',
				addTargtForm:{
					index:'',
					name:'',
					icon:'',
					desc:'',
					link:''
				},
				article:{
					title:'',
					content:'',
					html:'',
					markDown:'',
					targets:[]
				},
				targets:[{
					index:0,
					text:'vueJS',
					value:'vueJS',
					icon:'',
					selected: false
				},{
					index:1,
					text:'Javascript',
					value:'Javascript',
					icon:'',
					selected: false
				},{
					index:2,
					text:'PHP',
					value:'PHP',
					icon:'',
					selected: false
				},{
					index:3,
					text:'Python',
					value:'Python',
					icon:'',
					selected: false
				},{
					index:4,
					text:'JQuery',
					value:'JQuery',
					icon:'',
					selected: false
				},{
					index:5,
					text:'Nginx',
					value:'Nginx',
					icon:'',
					selected: false
				},{
					index:6,
					text:'nodeJS',
					value:'nodeJS',
					icon:'',
					selected: false
				},{
					index:7,
					text:'Dart',
					value:'Dart',
					icon:'',
					selected: false
				},{
					index:8,
					text:'Flutter',
					value:'Flutter',
					icon:'',
					selected: false
				},{
					index:9,
					text:'其他',
					value:'other',
					icon:'',
					selected: false
				},{
					index:10,
					text:'JSON',
					value:'JSON',
					icon:'',
					selected: false
				},{
					index:11,
					text:'Angular',
					value:'Angular',
					icon:'',
					selected: false
				},{
					index:12,
					text:'React',
					value:'React',
					icon:'',
					selected: false
				},{
					index:13,
					text:'Laravel',
					value:'Laravel',
					icon:'',
					selected: false
				},{
					index:14,
					text:'Linux',
					value:'Linux',
					icon:'',
					selected: false
				},{
					index:15,
					text:'HTML',
					value:'HTML',
					icon:'',
					selected: false
				}]
			}
		},
		methods:{
			selectItems(item){
				this.article.targets = [];
				item.selected = !item.selected;
				this.targets.forEach((item)=>{
					if(item.selected){
						this.article.targets.push(item.value);
					}
				});
			},
			targetAddFormSubmit(e){
				this.targetAddDialog = false;
				this.$axios({
					url:'/api/target/add',
					method:'POST',
					data:this.addTargtForm
				}).then(res=>{
					console.log(res)
				}).catch(err=>{
					console.log(err)
				});
			},
			getEditorValue(value, render){
				this.article.html = value;
				this.article.content = render;
				this.article.markDown = value;
			},
			articleFormSubmit(e){
				this.$axios({
					url:'/api/article/add',
					method:'POST',
					data:this.article
				}).then(res=>{
					console.log(res)
				}).catch(err=>{
					console.log(err)
				});
			}
		}
	}
</script>

<style scoped>
	.article-add{
		width:96%;
		height:auto;
		padding:0 2%;
	}

	.article-add-body{
		width:100%;
		height:auto;
	}

	.article-title{
		width:100%;
		height:50px;
	}

	.article-title input{
		display:block;
		width:99%;
		height:50px;
		line-height:50px;
		padding:0 0 0 1%;
		border:none;
	}

	.article-content-box{
		width:100%;
		height:580px;
	}

	.markdown-body{
		height:100%;
	}

	.article-targets-box{
		width:100%;
		height:auto;
		margin:20px 0 0 0;
		overflow:hidden;
	}

	.article-targets-box .article-targets-title{
		width:100%;
		height:auto;
		overflow:hidden;
		margin:0 0 10px 0;
	}

	.article-targets-title label{
		display:block;
		float:left;
		width:auto;
		height:30px;
		line-height:30px;
		padding:0 10px;
	}

	.article-targets-title a{
		display:block;
		float:left;
		width:auto;
		height:30px;
		line-height:30px;
		padding:0 20px;
		border-radius:15px;
		background:#5D9D3E;
		color:#fff;
		margin:0 0 0 20px;
	}

	.article-targets-selector-options{
		width:100%;
		height:auto;
	}

	.targets-selector-options{
		display:block;
		float:left;
		width:80px;
		height:40px;
		line-height:40px;
		text-align:center;
		margin:8px;
		color:#333;
		background:#F2F6FC;
		border-radius:4px;
	}

	.targets-selector-options-active{
		background:#329103;
		color:#fff;
	}

	.article-add-form-submit-box{
		width:100%;
		height:auto;
		margin:20px 0 0 0;
	}

	.article-add-form-submit{
		display:block;
		float:right;
		width:120px;
		height:40px;
		line-height:40px;
		text-align:center;
		color:#fff;
		background:#5D9D3E;
		border-radius:4px;
		margin:0 30px 0 0;
	}

	.article-add-form-submit:hover{
		background:#329103;
	}
</style>
