<template>
  <div class="md5-tool-page">
    <div class="md5-tool-page-header">MD5加密工具</div>
    <div class="md5-tool-page-body">
      <div class="md5-tool-switch-box">
        <div class="md5-tool-switch-box-header">
          <a href="javascript:void(0);" class="switch-tabs" :class="{'switch-tabs-active':!toggle}" @click="switchTabs($event,'text')">文本加密</a>
          <a href="javascript:void(0);" class="switch-tabs" :class="{'switch-tabs-active':toggle}" @click="switchTabs($event,'file')">文件加密</a>
        </div>
        <div class="md5-tool-switch-box-body">
          <div class="switch-boxs" v-show="!toggle">
            <textarea name="text-input" id="text-input" cols="30" rows="10" v-model="form.text"></textarea>
          </div>
          <div class="switch-boxs" v-show="toggle" style="height:40px;">
            <input type="file" name="upload-file" id="upload-file-input" @mouseenter="uploadFileHover=true"  @mouseleave="uploadFileHover=false" @change="uploadFileChanged($event)"/>
            <div class="upload-file-marker" :class="{'upload-file-marker-hover':uploadFileHover}">
              <span v-if="form.uploadFile.name">{{form.uploadFile.name}}</span>
              <span v-else><i class="icon iconfont">&#xe6a7;</i>上传文件</span>
            </div>
          </div>
        </div>
      </div>
      <div class="md5-tool-buts-box">
        <a href="javascript:void(0);" class="md5-tool-exec-but" @click="md5Exec($event)">MD5加密</a>
      </div>
      <div class="md5-tool-output-box">
        <textarea name="md5-tool-output" id="md5-tool-output" cols="30" rows="10" v-model="form.output"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Md5Tool',
  data () {
    return {
      user: {},
      toggle: false,
      uploadFileHover: false,
      form: {
        uploadFile: {
          name: '',
          size: '',
          type: ''
        },
        text: '',
        output: ''
      }
    }
  },
  created () {},
  methods: {
    switchTabs (e, type) {
      this.toggle = !this.toggle
      this.form.output = ''
    },
    uploadFileChanged (e) {
      console.log(e)
      let file = e.target.files[0]
      this.form.uploadFile = {
        name: file.name,
        size: (file.size / 1024),
        type: file.type
      }
    },
    md5Exec (e) {
      console.log(this.form)
      if (!this.toggle) {
        this.form.output = this.$md5(this.form.text)
      }
    }
  },
  mounted () {
    this.user = JSON.parse(sessionStorage.getItem('userInfo'))
  }
}
</script>

<style>
  .md5-tool-page{
    width:100%;
    height:auto;
  }

  .md5-tool-page-header{
    width: 100%;
    height: 70px;
    line-height: 70px;
    font-size: 20px;
    font-weight: bold;
    border-bottom: 1px solid #c1c1c1;
  }

  .md5-tool-page-body{
    width:96%;
    height:auto;
    padding:3% 2%;
  }

  .md5-tool-switch-box{
    width:100%;
    height:auto;
  }

  .md5-tool-switch-box-header{
    width:100%;
    height:40px;
  }

  .switch-tabs{
    display:block;
    float:left;
    width:120px;
    height:38px;
    line-height: 38px;
    text-align: center;
    color:#555;
    border:1px solid #fff;
    border-radius:5px;
    background:#fff;
    position:relative;
  }

  .switch-tabs-active:before{
    display:block;
    width:120px;
    height:2px;
    content:'';
    background:#c1c1c1;
    position: absolute;
    left:0;
    top:40px;
  }

  .md5-tool-switch-box-body{
    width:100%;
    height:auto;
  }

  .switch-boxs{
    width:100%;
    height:auto;
    margin:30px 0 0 0;
    position: relative;
    overflow: hidden;
  }

  .switch-boxs textarea{
    display:block;
    width:97.8%;
    height:80px;
    padding:1%;
    border:1px solid #c1c1c1;
    border-radius:5px;
    resize:none;
    font-size:16px;
  }

  .switch-boxs #upload-file-input{
    display:block;
    width:100%;
    height:38px;
    line-height:38px;
    position: absolute;
    left:0;
    top:0;
    z-index:1000;
    opacity: 0;
    filter: alpha(opacity:0);
  }

  .switch-boxs .upload-file-marker{
    width:97.8%;
    height:38px;
    line-height:38px;
    padding:0 0 0 2%;
    border:1px solid #c1c1c1;
    border-radius:5px;
    position: absolute;
    left:0;
    top:0;
    z-index:999;
  }

  .switch-boxs .upload-file-marker-hover{
    cursor: pointer;
    border:1px dashed #c1c1c1;
  }

  .md5-tool-buts-box{
    width:100%;
    height:auto;
    margin:30px 0;
    overflow: hidden;
  }

  .md5-tool-exec-but{
    display:block;
    float:right;
    width:120px;
    height:38px;
    line-height: 38px;
    text-align: center;
    color:#fff;
    border:1px solid #5D9D3E;
    border-radius:5px;
    background:#5D9D3E;
  }

  .md5-tool-output-box{
    width:100%;
    height:auto;
  }

  .md5-tool-output-box textarea{
    display:block;
    width:97.8%;
    height:80px;
    padding:1%;
    border:1px solid #c1c1c1;
    border-radius:5px;
    background:#f5f5f5;
    resize:none;
    font-size:16px;
  }
</style>
