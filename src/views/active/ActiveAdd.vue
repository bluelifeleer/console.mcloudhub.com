<template>
  <div class="active-container">
    <div class="active-container-title">创建活动</div>
    <div class="active-container-form-box">
      <div class="active-container-form-title"></div>
      <div class="active-container-form-items-box">
        <div class="active-container-form-items">
          <label>公司名称：</label><input type="text" name="" value="" :placeholder="activeForm.companys.name.placeholder" v-model="activeForm.companys.name.value" @blur="activeFormInputBlurHandle($event,'companys.name')" @focus="activeFormInputFocusHandle($event,'companys.name')" />
        </div>
        <div class="active-container-form-items">
          <label>项目名称：</label><input type="text" name="" value="" :placeholder="activeForm.projects.name.placeholder" v-model="activeForm.projects.name.value" @blur="activeFormInputBlurHandle($event,'projects.name')" @focus="activeFormInputFocusHandle($event,'projects.name')" />
        </div>
        <div class="active-container-form-items">
          <label>项目连接</label><input type="text" name="" value="" :placeholder="activeForm.projects.url.placeholder" v-model="activeForm.projects.url.value" @blur="activeFormInputBlurHandle($event,'projects.url')" @focus="activeFormInputFocusHandle($event,'projects.url')" />
        </div>
        <div class="active-container-form-items">
          <label>项目目录：</label><input type="text" name="" value="" :placeholder="activeForm.projects.dir.placeholder" v-model="activeForm.projects.dir.value" @blur="activeFormInputBlurHandle($event,'projects.dir')" @focus="activeFormInputFocusHandle($event,'projects.dir')" />
        </div>
        <div class="active-container-form-items">
          <label>活动页名称：</label><input type="text" name="" value="" :placeholder="activeForm.pages.name.placeholder" v-model="activeForm.pages.name.value" @blur="activeFormInputBlurHandle($event,'pages.name')" @focus="activeFormInputFocusHandle($event,'pages.name')" />
        </div>
        <div class="active-container-form-items">
          <label>活动页描述：</label><textarea name="" :placeholder="activeForm.pages.desc.placeholder" v-model="activeForm.pages.desc.value" @blur="activeFormInputBlurHandle($event,'pages.desc')" @focus="activeFormInputFocusHandle($event,'pages.desc')"></textarea>
        </div>
        <div class="active-container-form-items">
          <label>自动生成连接：</label><a href="javascript:void(0);" class="auto-but-radio" @click="autoBut($event)"><i class="icon iconfont radios-selected" v-if="activeForm.radio">&#xe653;</i><i class="icon iconfont" v-else>&#xe6b9;</i>&nbsp;&nbsp;是</a>
        </div>
        <div class="active-container-form-items">
          <label>添加后缀：</label><a href="javascript:void(0);" class="add-ext-radio" @click="addExtRadioBut($event)"><i class="icon iconfont radios-selected" v-if="activeForm.radioExt">&#xe653;</i><i class="icon iconfont" v-else>&#xe6b9;</i>&nbsp;&nbsp;是</a>
        </div>
        <div class="active-container-form-items">
          <label>活动页连接：</label><input type="text" name="" value="" :placeholder="activeForm.pages.url.placeholder" v-model="activeForm.pages.url.value" @blur="activeFormInputBlurHandle($event,'pages.url')" @focus="activeFormInputFocusHandle($event,'pages.url')" />
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
  props: ['id'],
  data () {
    return {
      user: {},
      autoName: '',
      activeForm: {
        companys: {
          name: {
            value: '',
            placeholder: '输入公司名称',
            required: false
          }
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
        radioExt: false
      }
    }
  },
  created () {},
  methods: {
    getActive () {
      this.$axios({
        method: 'get',
        url: `/api/active/get?id=${this.id}`
      }).then(res => {
        if (res.data.code && res.data.ok) {
          this.activeForm.companys.name.value = res.data.data.companyName
          this.activeForm.projects.name.value = res.data.data.projectName
          this.activeForm.projects.url.value = res.data.data.projectUrl
          this.activeForm.projects.dir.value = res.data.data.projectDir
          this.activeForm.pages.name.value = res.data.data.name
          this.activeForm.pages.desc.value = res.data.data.desc
          this.activeForm.pages.url.value = res.data.data.url
          this.autoName = res.data.data.url.substr(-8)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    activeFormInputBlurHandle (e, type) {
      let params = type.split('.')
      if (type == 'projects.url') {
        this.activeForm.pages.url.value = this.activeForm.radio ? (this.activeForm[params[0]][params[1]].value + '/' + this.autoName) : ''
      }
    },
    activeFormInputFocusHandle (e, type) {

    },
    autoBut (e) {
      this.activeForm.radio = !this.activeForm.radio
      if (this.activeForm.radio) {
        this.activeForm.pages.url.value = this.autoName ? this.activeForm.pages.url.value : this.activeForm.projects.url.value + '/' + this.autoName
      }
    },
    addExtRadioBut (e) {
      this.activeForm.radioExt = !this.activeForm.radioExt
      if (this.activeForm.projects.url.value && this.autoName) {
        this.activeForm.pages.url.value = this.activeForm.projects.url.value + '/' + this.autoName + (this.activeForm.radioExt ? '.html' : '')
      }
    },
    randomStr (num) {
      let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      let tmp = ''
      for (let i = 0; i < num; i++) {
        tmp += str.substr((Math.random() * (str.length - 1)), 1)
      }
      return tmp
    },
    activeFormSubmit (e) {
      this.$axios({
        method: 'post',
        url: `/api/active/${(this.id ? 'update' : 'add')}`,
        data: this.id ? ({
          id: this.id,
          uid: this.user._id,
          companyName: this.activeForm.companys.name.value,
          projectName: this.activeForm.projects.name.value,
          projectUrl: this.activeForm.projects.url.value,
          projectDir: this.activeForm.projects.dir.value,
          name: this.activeForm.pages.name.value,
          url: this.activeForm.pages.url.value,
          desc: this.activeForm.pages.desc.value
        }) : ({
          uid: this.user._id,
          companyName: this.activeForm.companys.name.value,
          projectName: this.activeForm.projects.name.value,
          projectUrl: this.activeForm.projects.url.value,
          projectDir: this.activeForm.projects.dir.value,
          name: this.activeForm.pages.name.value,
          url: this.activeForm.pages.url.value,
          desc: this.activeForm.pages.desc.value
        })
      }).then(res => {
        if (res.data.ok && res.data.code) {
          this.$message({
            type: 'success',
            message: this.id ? '修改成功' : '添加成功'
          })
          this.$router.push({
            path: '/active/list'
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.user = JSON.parse(sessionStorage.getItem('userInfo'))
    this.autoName = this.randomStr(8)
    if (this.id) {
      this.getActive()
    }
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
  width: 64%;
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

.active-container-form-items .auto-but-radio {
  display: block;
  float: left;
  width: 30%;
  height: 38px;
  line-height: 38px;
  color: #909399;
}

.active-container-form-items .add-ext-radio{
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
