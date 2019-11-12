<template>
  <div class="active-container">
    <div class="active-container-title">创建活动</div>
    <div class="active-container-form-box">
      <div class="active-container-form-title"></div>
      <div class="active-container-form-items-box">
        <div class="active-container-form-items">
          <label>公司名称：</label><input type="text" name="" value="" :placeholder="activeForm.companys.name.placeholder" v-model="activeForm.companys.name.value" />
        </div>
        <div class="active-container-form-items">
          <label>项目名称：</label><input type="text" name="" value="" :placeholder="activeForm.projects.name.placeholder" v-model="activeForm.projects.name.value" />
        </div>
        <div class="active-container-form-items">
          <label>项目连接</label><input type="text" name="" value="" :placeholder="activeForm.projects.url.placeholder" v-model="activeForm.projects.url.value" />
        </div>
        <div class="active-container-form-items">
          <label>项目目录：</label><input type="text" name="" value="" :placeholder="activeForm.projects.dir.placeholder" v-model="activeForm.projects.dir.value" />
        </div>
        <div class="active-container-form-items">
          <label>活动页名称：</label><input type="text" name="" value="" :placeholder="activeForm.pages.name.placeholder" v-model="activeForm.pages.name.value" />
        </div>
        <div class="active-container-form-items">
          <label>活动页描述：</label><textarea name="" :placeholder="activeForm.pages.desc.placeholder" v-model="activeForm.pages.desc.value"></textarea>
        </div>
        <div class="active-container-form-items">
          <label>自动生成连接：</label><a href="javascript:void(0);" class="auto-but" @click="autoBut($event)"><i class="icon iconfont radios-selected" v-if="activeForm.radio">&#xe653;</i><i class="icon iconfont" v-else>&#xe6b9;</i>&nbsp;&nbsp;是</a>
        </div>
        <div class="active-container-form-items">
          <label>活动页连接：</label><input type="text" name="" value="" :placeholder="activeForm.pages.url.placeholder" v-model="activeForm.pages.url.value" />
        </div>
        <div class="active-container-form-items">
          <a hef="javascript:void(0);" class="active-container-form-submit-but" @click="activeFormSubmit($event)">保存</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'activeContainer',
  data() {
    return {
      user: {},
      activeForm: {
        companys: {
          name: {
            value: '',
            placeholder: '输入公司名称',
            required: false
          },
        },
        projects: {
          name: {
            value: '',
            placeholder: '输入项目名称',
            required: false
          },
          url: {
            value: '',
            placeholder: '输入项目URL连接',
            required: false
          },
          dir: {
            value: '',
            placeholder: '输入项目目录地址',
            required: false
          }
        },
        pages: {
          name: {
            value: '',
            placeholder: '输入页面名称',
            required: false
          },
          desc: {
            value: '输入页面描述',
            placeholder: '',
            required: false
          },
          url: {
            value: '',
            placeholder: '输入页面连接（自动生成，规则：输入项目URL连接+自动生成字符；）',
            required: false
          }
        },
        radio: true,
      }
    }
  },
  created() {},
  methods: {
    autoBut(e) {
      this.activeForm.radio = !this.activeForm.radio;
      if (this.activeForm.radio) {
        this.activeForm.pages.url.value = this.randomStr(8);
      }
    },
    randomStr(num) {
      let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
        tmp = '';
      for (let i = 0; i < num; i++) {
        tmp += str.substr((Math.random() * (str.length - 1)), 1);
      }
      return tmp;
    },
    activeFormSubmit(e) {
      this.$axios({
        method: 'post',
        url: '/api/active/add',
        data: {
          uid: this.user._id,
          companyName: this.activeForm.companys.name.value,
          projectName: this.activeForm.projects.name.value,
          projectUrl: this.activeForm.projects.url.value,
          projectDir: this.activeForm.projects.dir.value,
          name: this.activeForm.pages.name.value,
          url: this.activeForm.pages.url.value,
          desc: this.activeForm.pages.desc.value
        }
      }).then(res => {

      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem('userInfo'));
  }
}

</script>
<style>
.active-container {
  width: 100%;
  height: auto;
}

.active-container-title {
  width: 100%;
  height: 70px;
  line-height: 70px;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #c1c1c1;
}

.active-container-form-box {
  width: 96%;
  height: auto;
  padding: 2%;
}

.active-container-form-title,
.active-container-form-items-box {
  width: 50%;
  height: auto;
}

.active-container-form-items {
  width: 100%;
  height: auto;
  margin: 0 0 30px 0;
  overflow: hidden;
}

.active-container-form-items label {
  display: block;
  float: left;
  width: 120px;
  height: 40px;
  line-height: 40px;
}

.active-container-form-items input {
  display: block;
  float: left;
  width: 80%;
  height: 38px;
  line-height: 38px;
  border: 1px solid #c1c1c1;
  border-radius: 5px;
  padding: 0 2%;
}

.active-container-form-items textarea {
  display: block;
  float: left;
  width: 80%;
  height: 80px;
  line-height: 38px;
  border: 1px solid #c1c1c1;
  border-radius: 5px;
  padding: 0 2%;
}

.active-container-form-items .auto-but {
  display: block;
  float: left;
  width: 30%;
  height: 38px;
  line-height: 38px;
  color: #909399;
}

.radios-selected {
  color: #5D9D3E;
}

.active-container-form-submit-but {
  display: block;
  /*float: right;*/
  width: 180px;
  height: 38px;
  line-height: 38px;
  text-align: center;
  border: 1px solid #5D9D3E;
  background: #5D9D3E;
  color: #fff;
  border-radius: 4px;
  margin: 0 auto;
}

</style>
