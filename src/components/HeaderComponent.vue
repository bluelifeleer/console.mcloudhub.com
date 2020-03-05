<template>
  <div class="header-container">
    <div class="log-box"><img src="../assets/logo.png" alt=""></div>
    <div class="header-user-info-box">
      <a href="javascript:void(0);" class="user-info-bar" :user-id="user._id" @click="showUserSettingPopupToggle($event,true)"><img v-if="user.avatar" :src="user.avatar" alt=""><img v-else src="../assets/25da6df20473dab1a0eb8b5fea3e5d79_t.gif" alt=""><span class="user-name">{{user.name}}</span><i class="icon iconfont">&#xe63a;</i></a>
      <transition name="user-setting-box">
        <div class="user-setting-box" v-if="showUserSettingPopup">
          <ul class="user-setting-item-group">
            <li class="user-setting-items"><a href="/user/profile" class="user-profile"><i class="icon iconfont">&#xe677;</i><span>个人中心</span></a></li>
            <li class="user-setting-items"><a href="javascript:void(0);" class="user-profile" @click="siginOut($event)"><i class="icon iconfont">&#xe60d;</i><span>退出</span></a></li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      user: {},
      showUserSettingPopup: false
    }
  },
  created() {},
  methods: {
    showUserSettingPopupToggle(e, flag) {
      window.event ? window.event.cancelBubble = true : e.stopPropagation() // 阻止冒泡
      this.showUserSettingPopup = flag
    },
    siginOut(e) {
      this.$axios({
        method: 'get',
        url: '/api/user/signout'
      }).then(res => {
        if (res.data.ok && res.data.code) {
          sessionStorage.clear()
          this.$cookies.remove('name')
          this.$cookies.remove('uid')
          this.$router.push({
            path: '/login'
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted() {
    let _this = this
    this.user = JSON.parse(sessionStorage.getItem('userInfo'))
    document.addEventListener('click', function(e) {
      _this.showUserSettingPopupToggle(e, false)
    }, false)
  }
}

</script>
<style scoped>
.header-container {
  width: 100%;
  height: 50px;
  background: #002140;
  -opacity: .4;
  -filter: alpha(opacity:40);
  box-shadow: 0 0 8px #ccc;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1550;
}

.log-box {
  display: block;
  float: left;
  width: auto;
  height: 50px;
}

.log-box img {
  display: block;
  width: 30px;
  height: 30px;
  margin: 10px;
}

.header-user-info-box {
  float: right;
  width: auto;
  height: 50px;
  margin: 0;
  position: relative;
}

.user-info-bar {
  display: block;
  float: left;
  width: auto;
  height: 40px;
  margin: 5px 50px 5px 0;
}

.user-info-bar img {
  display: block;
  float: left;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 0 5px #ccc;
}

.user-info-bar .iconfont {
  position: absolute;
  top: 15px;
  right: 20px;
  color: #909399;
}

.user-name {
  display: block;
  float: left;
  width: auto;
  height: 40px;
  line-height: 40px;
  padding: 0 5px;
  color: #909399;
}

.user-setting-box {
  width: 220px;
  height: auto;
  box-shadow: 0 0 6px #DDDDDD;
  background: #fff;
  position: absolute;
  right: 10px;
  top: 52px;
  z-index: 1551;
}

.user-setting-item-group {
  width: 100%;
  height: auto;
}

.user-setting-items {
  width: 95%;
  height: 50px;
  padding: 0 0 0 5%;
}

.user-setting-items:hover {
  cursor: pointer;
  background: #E4E7Ed;
}

.user-setting-box-enter-active,
.user-setting-box-leave-active {
  transition: opacity .5s;
}

.user-setting-box-enter,
.user-setting-box-leave-to

/* .fade-leave-active below version 2.1.8 */
  {
  opacity: 0;
}

.user-profile {
  display: block;
  width: 100%;
  height: 50px;
  color: #909399;
}

.user-profile .iconfont {
  display: block;
  float: left;
  width: 10%;
  height: 50px;
  line-height: 50px;
}

.user-profile span {
  display: block;
  float: left;
  width: 90%;
  height: 50px;
  line-height: 50px;
}

</style>
