<template>
  <div class="login-page"
       :style="{'height':height+'px'}">
    <div class="login-box">
      <div class="login-title">登录</div>
      <div class="login-form-box">
        <div class="login-form-items">
          <label for="name"
                 :class="{'request':form.name.request}">登录帐号：</label>
          <input type="text"
                 name="name"
                 :placeholder="form.name.placeholder"
                 v-model="form.name.value" />
          <span class="input-tip"
                v-if="form.name.showTips">{{form.name.tips}}</span>
        </div>
        <div class="login-form-items">
          <label for="password"
                 :class="{'request':form.password.request}">密码：</label>
          <input type="password"
                 name="password"
                 :placeholder="form.password.placeholder"
                 v-model="form.password.value" />
          <span class="input-tip"
                v-if="form.password.showTips">{{form.password.tips}}</span>
        </div>
        <div class="login-form-items">
          <label for="verify-code"
                 :class="{'request':form.verifyCode.request}">验证码：</label>
          <input type="text"
                 name="verify-code"
                 :placeholder="form.verifyCode.placeholder"
                 v-model="form.verifyCode.value"
                 style="width:120px;" />
          <a href="javascript:void(0);"
             class="verify-code-box"><img src=""
                 alt=""></a>
          <span class="input-tip"
                v-if="form.verifyCode.showTips">{{form.verifyCode.tips}}</span>
        </div>
        <div class="login-form-items">
          <a href="javascript:void(0);"
             class="login-form-submit"
             @click="loginFormSubmit()">登录</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      height: 0,
      form: {
        name: {
          tips: "请输入登录帐号",
          showTips: false,
          placeholder: "用户名/手机号",
          value: "",
          request: true
        },
        password: {
          tips: "请输入登录密码",
          showTips: false,
          placeholder: "请输入登录密码",
          value: "",
          request: true
        },
        verifyCode: {
          tips: "请输入验证码",
          showTips: false,
          placeholder: "请输入验证码",
          value: "",
          request: true
        }
      }
    };
  },
  created() {},
  methods: {
    loginFormSubmit() {
      this.$router.push({ path: "/" });
    }
  },
  mounted() {
    this.height =
      document.body.clientHeight || document.documentElement.clientHeight;
  }
};
</script>

<style scoped>
.login-page {
  width: 100%;
  background: url("../assets/7b09657eab27226f9a83e871695e9da9.jpg") no-repeat 0
    0;
  background-size: 100% 100%;
}

.login-box {
  width: 20%;
  height: auto;
  background: #fff;
  border-radius: 5px;
  padding: 1%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.login-title {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
}

.login-form-box {
  width: 100%;
  height: auto;
}

.login-form-items {
  width: 100%;
  height: auto;
  margin: 0 0 20px 0;
  position: relative;
  overflow: hidden;
}

.login-form-items label {
  display: block;
  float: left;
  width: 80px;
  height: 40px;
  line-height: 40px;
  text-align: right;
  padding: 0 0 0 20px;
}

.login-form-items input {
  display: block;
  float: left;
  width: 70%;
  height: 38px;
  line-height: 38px;
  border: 1px solid #c1c1c1;
  border-radius: 5px;
  padding: 0 0 0 2%;
}

.login-form-items .input-tip {
  display: block;
  width: 70%;
  height: 20px;
  font-size: 12px;
  color: #f00;
  position: absolute;
  left: 100px;
  top: 40px;
}

.login-form-submit {
  display: block;
  width: 100%;
  height: 38px;
  line-height: 38px;
  text-align: center;
  border: 1px solid #409eff;
  background: #409eff;
  border-radius: 5px;
  color: #fff;
}

.request::before {
  display: block;
  width: 20px;
  height: 20px;
  line-height: 30px;
  text-align: center;
  content: "*";
  color: #f00;
  position: absolute;
  left: 0;
  top: 10px;
}

.verify-code-box {
  display: block;
  float: left;
  width: 100px;
  height: 40px;
  margin: 0 0 0 30px;
}

.verify-code-box img {
  display: block;
  width: 100px;
  height: 40px;
}
</style>
