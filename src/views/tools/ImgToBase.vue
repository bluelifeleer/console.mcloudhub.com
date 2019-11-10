<template>
  <div class="tootl-img-to-base64">
    <div class="header">图片转base64工具</div>
    <div class="tootl-image-body">
      <div class="upload-file-bar">
        <label for="upload-file">上传图片：</label>
        <input type="file" name="upload-file" id="upload-file" class="upload-file" @change="selectedFiles($event)" />
        <div class="upload-file-marker" v-if="fileInfo.name">{{fileInfo.name}}</div>
        <div class="upload-file-marker" v-else><span style="display:inline-block;width:20px;height:38px;line-height:38px;text-align:center;font-weight: bold;font-size: 22px;">+</span>点击上传图片</div>
      </div>
      <div class="upload-file-preview">
        <h3>预览：</h3>
        <div class="upload-file-preview-img-box"><img :src="previewSrc" alt=""></div>
      </div>
      <div class="upload-file-infos">
        <h3>上传图片信息：</h3>
        <div class="file-infos-items">
          <label for="file-infos-name">名称：</label>
          <span id="file-infos-name">{{fileInfo.name}}</span>
        </div>
        <div class="file-infos-items">
          <label for="file-infos-size">大小：</label>
          <span id="file-infos-size">{{fileInfo.size}}</span>
        </div>
        <div class="file-infos-items">
          <label for="file-infos-type">类型：</label>
          <span id="file-infos-type">{{fileInfo.type}}</span>
        </div>
        <div class="file-infos-items">
          <label for="file-infos-modify-date">最后修改时间：</label>
          <span id="file-infos-modify-date">{{fileInfo.lastModifyDate}}</span>
        </div>
        <div class="file-infos-items">
          <div class="file-info-items-title-box">
            <h3>BASE_64连接：</h3><a href="javascript:void(0);" @click="copyImgSrc($event)" class="copy-src" data-clipboard-target="#base64-container" data-clipboard-action="copy">复制连接</a>
          </div>
          <div class="file-info-items-texarea">
            <textarea name="base64-url" id="base64-container" contenteditable="true" v-model="baseUrl"></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ImgToBase',
  data() {
    return {
      files: null,
      fileReader: null,
      fileInfo: {
        name: '',
        size: '',
        type: '',
        lastModifyDate: ''
      },
      baseUrl: '',
      previewSrc: ''
    }
  },
  methods: {
    selectedFiles(e) {
      this.files = e.target.files;
      this.convertImg();
    },
    convertImg() {
      var _this = this;
      this.files[0];
      this.fileReader = new FileReader();
      this.fileReader.readAsDataURL(this.files[0]);
      this.fileReader.addEventListener('load', function() {
        _this.fileInfo.name = _this.files[0].name;
        _this.fileInfo.size = (_this.files[0].size / 1024).toFixed(2) + 'M'
        _this.fileInfo.type = _this.files[0].type
        _this.fileInfo.lastModifyDate = _this.formateDate(_this.files[0].lastModified)
        _this.baseUrl = _this.previewSrc = _this.fileReader.result;
      }, false);
    },
    copyImgSrc(e) {
      let copyBtn = new this.$clipboard('.copy-src');
      copyBtn.on("success", function(e) {
        // 复制成功
        alert('复制成功');
        e.clearSelection();
      });
      copyBtn.on("error", function(e) {
        //复制失败；
        console.log(e.action)
      });
    },
    formateDate(time) {
      var nowDate = new Date(time);
      var fullYears = nowDate.getFullYear();
      var months = nowDate.getMonth() + 1;
      var days = nowDate.getDay();
      var hours = nowDate.getHours();
      var minutes = nowDate.getMinutes();
      var seconds = nowDate.getSeconds();
      return fullYears + '-' + (months <= 9 ? ('0' + months) : months) + '-' + (days <= 9 ? ('0' + days) : days) + ' ' + (hours <= 9 ? ('0' + hours) : hours) + ':' + (minutes <= 9 ? ('0' + minutes) : minutes) + ':' + (seconds <= 9 ? ('0' + seconds) : seconds);
    }
  }
}

</script>
<style scoped>
.tootl-img-to-base64 {
  width: 100%;
  height: auto;
}

.header {
  width: 99%;
  height: 80px;
  line-height: 80px;
  padding: 0 0 0 1%;
  font-weight: bold;
  font-size: 30px;
  border-bottom: 1px solid #c1c1c1;
}

.tootl-image-body {
  width: 96%;
  height: auto;
  padding: 2%;
  overflow: hidden;
}

.upload-file-bar {
  width: 96%;
  height: 40px;
  position: relative;
}

.upload-file-bar label {
  display: block;
  float: left;
  width: 14%;
  height: 40px;
  line-height: 40px;
  text-align: left;
  font-size: 18px;
  font-weight: bold;
}

.upload-file-bar input {
  display: block;
  width: 20%;
  height: 38px;
  line-height: 38px;
  border: 1px solid #c1c1c1;
  position: absolute;
  left: 14%;
  top: 0;
  z-index: 10;
  opacity: 0;
}

.upload-file-bar .upload-file-marker {
  display: block;
  width: 19%;
  height: 38px;
  line-height: 38px;
  border: 1px solid #c1c1c1;
  padding: 0 0 0 1%;
  position: absolute;
  left: 14%;
  top: 0;
  z-index: 9;
}

.upload-file-infos {
  width: 100%;
  height: auto;
}

.file-infos-items {
  width: 100%;
  height: auto;
  margin: 10px 0;
  overflow: hidden;
}

.file-infos-items label {
  display: block;
  float: left;
  width: 10%;
  height: 30px;
  line-height: 30px;
  text-align: right;
}

.file-infos-items span {
  display: block;
  float: left;
  width: 80%;
  height: 30px;
  line-height: 30px;
  text-align: left;
}

#base64-container {
  width: 97.8%;
  height: 300px;
  padding: 1%;
  border: 1px solid #c1c1c1;
  overflow: auto;
}

.upload-file-preview-img-box {
  width: 100%;
  height: auto;
}

.upload-file-preview-img-box img {
  display: block;
  width: 100%;
}

.file-info-items-title-box {
  width: 100%;
  height: 50px;
  position: relative;
}

.file-info-items-title-box h3 {
  display: block;
  width: 100%;
  height: 50px;
  line-height: 50px;
}

.copy-src {
  display: block;
  width: 120px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  background: #5d9d3e;
  border-radius: 4px;
  position: absolute;
  right: 0;
  top: 5px;
}

.file-info-items-texarea {
  width: 100%;
  height: auto;
}

</style>
