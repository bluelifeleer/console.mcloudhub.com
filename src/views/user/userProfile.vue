<template>
	<div class="user-profile-container">
		<div class="user-profile-container-header">个人中心</div>
		<div class="user-profile-container-body">
			<div class="user-profile-form-box">
				<div class="user-profile-form-items" style="display:none;">
					<label for="user-profile-id"></label>
					<input type="hidden" name="user-profile-id" id="user-profile-name" value="" v-model="user._id" />
				</div>
				<div class="user-profile-form-items">
					<label for="user-profile-avarat" style="height:80px;">头像：</label>
					<input type="file" name="user-profile-avarat" id="user-profile-avarat" value="" @mouseenter="uploadFileInputMouseEnterHandle()" @mouseleave="uploadFileInputMouseLeaveHandle($event)" @change="uploadFileInputChangeHandle($event)" />
					<span class="user-profile-avarat-marker" :class="{'user-profile-avarat-marker-active':userProfileAvaratMarkerActive}"><img :src="user.avatar" alt="" v-if="user.avatar"><i v-else class="icon iconfont">&#xe6a7;</i></span>
				</div>
				<div class="user-profile-form-items">
					<label for="user-profile-name">用户名：</label>
					<input type="text" name="user-profile-name" id="user-profile-name" value="" v-model="user.name" placeholder="用户名" />
				</div>
				<div class="user-profile-form-items">
					<label for="user-profile-phone">手机号：</label>
					<input type="text" name="user-profile-phone" id="user-profile-phone" value="" v-model="user.phone" placeholder="手机号码" />
				</div>
				<div class="user-profile-form-items">
					<label for="user-profile-email">邮箱：</label>
					<input type="text" name="user-profile-email" id="user-profile-email" value="" v-model="user.email" placeholder="邮箱" />
				</div>
				<div class="user-profile-form-items">
					<label for="user-profile-github">github：</label>
					<input type="text" name="user-profile-github" id="github" value="" v-model="user.github" placeholder="github" />
				</div>
				<div class="user-profile-form-items">
					<label for="user-profile-website">网站地址：</label>
					<input type="text" name="user-profile-website" id="user-profile-website" value="" v-model="user.website" placeholder="http://|https://" />
				</div>
				<div class="user-profile-form-items">
					<label for="user-profile-idiograph" style="height:100px;">个人签名：</label>
					<textarea name="user-profile-idiograph" id="user-profile-idiograph" cols="30" rows="10" v-model="user.idiograph" style="height:100px;" placeholder="输入个人签名"></textarea>
				</div>
				<div class="user-profile-form-items">
					<a href="javascript:void(0);" class="user-profile-form-submit" @click="userProfileFormsubmit($event)">保存</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'UserProfile',
		data(){
			return {
				userProfileAvaratMarkerActive:false,
				user:{
					_id:'',
					avatar:'',
					name:'',
					phone:'',
					email:'',
					github:'',
					website:''
				}
			}
		},
		created(){},
		methods:{
			uploadFileInputMouseEnterHandle(e){
				this.userProfileAvaratMarkerActive = !this.userProfileAvaratMarkerActive;
			},
			uploadFileInputMouseLeaveHandle(e){
				this.userProfileAvaratMarkerActive = !this.userProfileAvaratMarkerActive;
			},
			uploadFileInputChangeHandle(e){
				console.log(e)
				let _this = this;
				let file = e.target.files[0];
				if(file){
					let Reader = new FileReader();
					Reader.readAsDataURL(file);
					Reader.addEventListener('load', function(e) {
						_this.user.avatar=Reader.result;
					}, false);
				}
			},
			getUserProfile(){
				this.$axios({
					method:'GET',
					url:`/api/user/get?id=${this.user._id}`
				}).then(res=>{
					console.log(res)
					if(res.data.code&&res.data.ok){
						let userInfo = res.data.data;
						this.user = userInfo;
						sessionStorage.setItem('userInfo',JSON.stringify(userInfo));
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			userProfileFormsubmit(e){
				this.$axios({
					method:'POST',
					url:'/api/user/update',
					data:{
						user:this.user
					}
				}).then(res=>{
					if(res.data.code&&res.data.ok){
						this.$message({
							type:'success',
							message:'修改成功'
						});
						this.getUserProfile();
					}
				}).catch(err=>{
					console.log(err)
				})
			}
		},
		mounted(){
			this.user = JSON.parse(sessionStorage.getItem('userInfo'));
			this.getUserProfile();
		}
	}
</script>

<style>
	.user-profile-container{
		width:100%;
		height:auto;
	}

	.user-profile-container-header{
		width: 100%;
		height: 70px;
		line-height: 70px;
		font-size: 20px;
		font-weight: bold;
		border-bottom: 1px solid #c1c1c1;
	}

	.user-profile-container-body{
		width:100%;
		height:auto;
		padding:5%;
	}

	.user-profile-form-box{
		width:61%;
		height:auto;
	}

	.user-profile-form-items{
		width:100%;
		height:auto;
		margin:0 0 30px 0;
		overflow: hidden;
		position: relative;
	}

	.user-profile-form-items label{
		display:block;
		float:left;
		width:120px;
		height:40px;
		line-height: 40px;
	}

	.user-profile-form-items input{
		display:block;
		float:left;
		width:78%;
		height:38px;
		line-height: 38px;
		border:1px solid #c1c1c1;
		border-radius:5px;
		padding:0 0 0 2%;
		outline: none;
	}

	.user-profile-form-items textarea{
		display:block;
		float:left;
		width:76%;
		height:38px;
		line-height: 38px;
		border:1px solid #c1c1c1;
		border-radius:5px;
		padding:2%;
		outline: none;
	}

	#user-profile-avarat{
		width:78px;
		height: 78px;
		border:none;
		padding:0;
		opacity: 0;
		filter: alpha(opacity:0);
		position:absolute;
		left:120px;
		top:0;
		z-index:100;
	}

	.user-profile-avarat-marker{
		width:78px;
		height: 78px;
		line-height: 78px;
		text-align: center;
		border:1px solid #c1c1c1;
		border-radius:5px;
		overflow: hidden;
		position:absolute;
		left:120px;
		top:0;
		z-index:99;
	}

	.user-profile-avarat-marker iconfont{
		font-size:30px;
	}

	.user-profile-avarat-marker img{
		display:block;
		width:100%;
		border-radius:5px;
	}

	.user-profile-avarat-marker-active{
		border:1px dashed #c1c1c1;
	}

	.user-profile-form-submit{
		display:block;
		width:120px;
		height:38px;
		line-height: 38px;
		text-align: center;
		color:#fff;
		background:#5d9d3e;
		border:1px solid #5d9d3e;
		border-radius:5px;
		margin:0 auto;
	}
</style>
