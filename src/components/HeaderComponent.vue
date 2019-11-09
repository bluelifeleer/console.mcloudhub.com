<template>
  <div class="header-container">
    <div class="header-user-info-box">
      <a href="javascript:void(0);" class="user-info-bar" :user-id="user._id"><img v-if="user.avatar" :src="user.avatar" alt=""><img v-else src="../assets/25da6df20473dab1a0eb8b5fea3e5d79_t.gif" alt=""><span class="user-name">{{user.name}}</span><i class="icon iconfont">&#xe63a;</i></a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      user: {}
    }
  },
  created() {},
  methods: {},
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem('userInfo'));
  }
}

</script>
<style scoped>
.header-container {
  width: 100%;
  height: 50px;
  background: #fff;
  -opacity: .4;
  -filter: alpha(opacity:40);
  box-shadow: 0 0 8px #ccc;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1600;
}

.header-user-info-box {
  float: right;
  width: auto;
  height: 50px;
  margin: 0;
}

.user-info-bar {
  display: block;
  width: auto;
  height: 40px;
  margin: 5px 50px 5px 0;
}

.header-user-info-box img {
  display: block;
  float: left;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 0 5px #ccc;
}

.header-user-info-box .iconfont {
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

</style>
