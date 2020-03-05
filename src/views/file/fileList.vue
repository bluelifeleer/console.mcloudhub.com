<template>
  <div class="file-list-page">
    <div class="file-list-page-header">文件列表</div>
    <div class="file-list-page-body">
      <div class="file-list-page-functions-bar">
        <a href="javascript:void(0);" class="upload-file-but" @click="uploadFileDialogHandle($event)"><i class="icon iconfont">&#xe613;</i>上传文件</a>
        <a href="javascript:void(0);" class="mkdir-new-dir" @click="mkdirNewDir($event,null)"><i class="icon iconfont">&#xe629;</i>新建文件夹</a>
        <a href="javascript:void(0);" class="file-view-preview" @click="filePreviewType($event, 'preview')"><i class="icon iconfont">&#xe69f;</i></a>
        <a href="javascript:void(0);" class="file-view-list" @click="filePreviewType($event, 'list')"><i class="icon iconfont">&#xe6fe;</i></a>
      </div>
      <div class="file-list-data-table">
        <div class="file-list-data-table-header">
          <div class="file-list-data-table-th">
            <div class="file-list-data-table-td"><input type="checkbox" name="selected-all" id="selected-all" @change="selectedAll($event)" v-model="selectedAllEnable"><span>文件名</span><span class="operation-buts-box" v-show="operationButAllBox"><a href="javascript:void(0)" class="delete-but" title="删除文件"><i class="icon iconfont">&#xe659;</i></a><a href="javascript:void(0)" class="move-but" title="移动到"><i class="icon iconfont">&#xe60a;</i></a><a href="javascript:void(0)" class="share-but" title="分享"><i class="icon iconfont">&#xe65a;</i></a><a href="javascript:void(0)" class="link-but" title="复制连接"><i class="icon iconfont">&#xe635;</i></a><a href="javascript:void(0)" class="download-but" title="下载文件"><i class="icon iconfont">&#xe607;</i></a></span></div>
            <div class="file-list-data-table-td">大小</div>
            <div class="file-list-data-table-td">类型</div>
            <div class="file-list-data-table-td">上传时间</div>
          </div>
        </div>
        <div class="file-list-data-table-body">
          <div class="file-list-data-table-tr" v-for="(file,$index) in files.list" :key="$index" :data-id="file._id" @mouseenter="fileListItemMouseEnter($event,file)" @mouseleave="fileListItemMouseLeave($event,file)">
            <div class="file-list-data-table-td"><input type="checkbox" name="select-item" id="select-item" @change="selectItem($event,file)" v-model="file.selected"><a href="javascript:void(0);" class="dir-name" @click="getOne($event,file)" v-if="file.type=='directory'">{{file.name}}</a><span v-else>{{file.name}}</span><span class="operation-buts-box" v-show="file.operation"><a href="javascript:void(0)" class="delete-but" title="删除文件"><i class="icon iconfont">&#xe659;</i></a><a href="javascript:void(0)" class="move-but" title="移动到"><i class="icon iconfont">&#xe60a;</i></a><a href="javascript:void(0)" class="share-but" title="分享"><i class="icon iconfont">&#xe65a;</i></a><a href="javascript:void(0)" class="link-but" title="复制连接"><i class="icon iconfont">&#xe635;</i></a><a href="javascript:void(0)" class="download-but" title="下载文件"><i class="icon iconfont">&#xe607;</i></a><a href="javascript:void(0)" class="new-childer-dir-but" v-if="file.type=='directory'" title="创建目录" @click="mkdirNewDir($event,file)"><i class="icon iconfont">&#xe768;</i></a></span></div>
            <div class="file-list-data-table-td">{{file.size}}</div>
            <div class="file-list-data-table-td">{{file.type}}</div>
            <div class="file-list-data-table-td">{{file.createTime}}</div>
          </div>
        </div>
      </div>
      <div class="file-listpage-footer">
        <el-pagination @size-change="handleFileSizeChange" @current-change="handleFileCurrentChange" :current-page="files.offset" :page-sizes="[10, 20, 30, 40, 60, 80, 100]" :page-size="files.nums" layout="total, sizes, prev, pager, next, jumper" :total="files.count">
        </el-pagination>
      </div>
      <!-- upload file dialog -->
      <div class="upload-file-dialog modal" v-show="uploadFileDialog">
        <div class="upload-file-dialog-marker" @click="uploadFileDialog=false"></div>
        <div class="upload-file-dialog-body">
          <div class="upload-file-dialog-body-header">
            <span class="upload-file-dialog-body-header-title">上传文件</span>
            <a href="javascript:void(0);" class="upload-file-dialog-close" @click="uploadFileDialogClose($event)"><i class="icon iconfont">&#xe60b;</i></a>
          </div>
          <div class="upload-file-dialog-body-content">
            <input type="file" name="upload-file-widget" id="upload-file-widget" @mouseenter="uploadFileWidgetMouseOver()" @mouseleave="uploadFileWidgetMouseOut()" @change="uploadFileWidgetChangeHandle($event)">
            <span class="upload-file-widget-marker" :class="{'upload-file-widget-marker-active':uploadFileWidgetover}">{{uploadFileWidgetInfo.name?uploadFileWidgetInfo.name:'点击上传文件，或将文件拖到此处'}}</span>
          </div>
        </div>
      </div>
      <!-- mkdir new dir -->
      <div class="mkdir-new-dir-dialog modal" v-show="showMkdirmodal">
        <div class="mkdir-new-dir-dialog-marker"></div>
        <div class="mkdir-new-dir-dialog-body">
          <div class="mkdir-new-dir-dialog-body-header">
            <span>创建目录</span>
            <a href="javascript:void(0);" class="close-modal-but" @click="closeModalBut($event)"><i class="icon iconfont">&#xe60b;</i></a>
          </div>
          <div class="mkdir-new-dir-dialog-body-content">
            <div class="create-new-dir-form">
              <div class="create-new-dir-form-items" style="display:none;">
                <label for="">父级ID：</label>
                <input type="hidden" name="" id="" class="" v-model="dirForm.parentId" placeholder="目录名称" />
              </div>
              <div class="create-new-dir-form-items" style="display:none;">
                <label for="">用户ID：</label>
                <input type="hidden" name="" id="" class="" v-model="dirForm.uid" placeholder="目录名称" />
              </div>
              <div class="create-new-dir-form-items">
                <label for="">目录名称：</label>
                <input type="text" name="" id="" class="" v-model="dirForm.name" placeholder="目录名称" />
              </div>
              <div class="create-new-dir-form-items">
                <a href="javascript:void(0);" class="create-new-dir-form-canale">取消</a>
                <a href="javascript:void(0);" class="create-new-dir-form-submit" @click="dirAdd($event)">创建</a>
              </div>
            </div>
          </div>
          <div class="mkdir-new-dir-dialog-body-footer"></div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  name: 'FileList',
  data() {
    return {
      user: {},
      files: {
        id: '',
        count: 0,
        offset: 1,
        nums: 20,
        list: []
      },
      selectedAllEnable: false,
      selectedFils: [],
      uploadFileDialog: false,
      uploadFileWidgetover: false,
      operationButBox: false,
      operationButAllBox: false,
      showMkdirmodal: false,
      fileReader: null,
      uploadFileWidgetInfo: {
        name: '',
        size: 0,
        type: '',
        lastModifyDate: 0,
        baseUrl: ''
      },
      dirForm: {
        parentId: '',
        uid: '',
        name: ''
      }
    }
  },
  created() {},
  methods: {
    handleFileSizeChange(nums) {
      this.files.nums = nums
      this.getFiles()
    },
    handleFileCurrentChange(offset) {
      this.files.offset = offset
      this.getFiles()
    },
    getFiles() {
      this.loadingFlag = this.$loading({
        target: '.file-list-data-table-body',
        background: '#fff',
        text: '正在加载文件列表'
      })
      this.$axios({
        methos: 'get',
        url: `/api/file/list?uid=${this.user._id}&offset=${this.files.offset}&nums=${this.files.nums}&count=${this.files.count}&id=${this.files.id}`
      }).then(res => {
        if (res.data.ok && res.data.code) {
          this.loadingFlag.close()
          let files = res.data.data
          this.files.count = files.count
          this.files.offset = files.offset
          this.files.nums = files.nums
          files.list.forEach(file => {
            file.size = file.size >= 1024 ? (parseFloat(file.size / 1024) <= 1024 ? (parseFloat(file.size / 1024).toFixed(2) + 'KB') : (parseFloat(file.size / (1024 * 1024)).toFixed(2) + 'M')) : (file.size + 'B')
            file.selected = false
            file.operation = false
            file.createTime = this.formateDate(file.createTime)
          })
          this.files.list = files.list
        }
      }).catch(err => {
        console.log(err)
      })
    },
    selectedAll(e) {
      let lists = []
      this.files.list.forEach(file => {
        file.selected = this.selectedAllEnable
        file.operation = false
        this.operationButAllBox = this.selectedAllEnable
        if (this.selectedAllEnable) {
          lists.push(file._id)
        }
      })
      this.selectedFils = lists
    },
    selectItem(e, item) {
      let lists = []
      this.files.list.forEach(file => {
        if (file.selected) {
          lists.push(file._id)
        }
      })
      item.operation = item.selected
      this.selectedFils = lists
    },
    fileListItemMouseEnter(e, item) {
      this.files.list.forEach(file => {
        if (!file.selected) {
          file.operation = false;
        }
      })
      item.operation = true
    },
    fileListItemMouseLeave(e, item) {
      this.files.list.forEach(file => {
        if (!file.selected || this.selectedAllEnable) {
          file.operation = false;
        }
      })
    },
    uploadFileDialogHandle(e) {
      this.uploadFileDialog = !this.uploadFileDialog
    },
    uploadFileDialogClose(e) {
      this.uploadFileDialog = false
    },
    uploadFileWidgetMouseOver() {
      this.uploadFileWidgetover = !this.uploadFileWidgetover
    },
    uploadFileWidgetMouseOut() {
      this.uploadFileWidgetover = !this.uploadFileWidgetover
    },
    uploadFileWidgetChangeHandle(e) {
      let _this = this
      let files = e.target.files[0]
      this.fileReader = new FileReader()
      this.fileReader.readAsDataURL(files)
      this.fileReader.addEventListener('load', function() {
        _this.uploadFileWidgetInfo.name = files.name
        _this.uploadFileWidgetInfo.size = files.size
        _this.uploadFileWidgetInfo.type = files.type
        _this.uploadFileWidgetInfo.lastModifyDate = files.lastModified
        _this.uploadFileWidgetInfo.baseUrl = _this.fileReader.result
        _this.$axios({
          method: 'post',
          url: '/api/file/upload',
          data: {
            uid: _this.user._id,
            name: _this.uploadFileWidgetInfo.name,
            size: _this.uploadFileWidgetInfo.size,
            type: _this.uploadFileWidgetInfo.type,
            base64: _this.uploadFileWidgetInfo.baseUrl,
            lastModifyDate: _this.uploadFileWidgetInfo.lastModifyDate
          }
        }).then(res => {
          if (res.data.ok && res.data.code) {
            _this.$message({
              type: 'success',
              message: '文件上传成功'
            })
            _this.uploadFileDialog = false
            _this.getFiles()
          }
        }).catch(err => {
          console.log(err)
        })
      }, false)
    },
    filePreviewType(e, type) {
      alert(type)
    },
    mkdirNewDir(e, file) {
      this.dirForm.parentId = file ? file._id : ''
      this.showMkdirmodal = true
    },
    closeModalBut(e) {
      this.showMkdirmodal = false
      this.dirForm.name = '';
      this.dirForm.parentId = '';
    },
    dirAdd(e) {
      this.$axios({
        method: 'POST',
        url: '/api/directory/add',
        data: this.dirForm
      }).then(res => {
        if (res.data.code && res.data.ok) {
          this.$message({
            type: 'success',
            message: '文件上传成功'
          })
          this.showMkdirmodal = false
          this.getFiles()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getOne(e, file) {
      this.files.id = file._id;
      this.files.count = 0;
      this.files.offset = 1;
      this.files.nums = 20;
      this.getFiles()
    },
    formateDate(timer) {
      let nowDate = timer ? new Date(timer) : new Date()
      let fullYear = nowDate.getFullYear()
      let month = nowDate.getMonth() + 1
      let date = nowDate.getDate()
      let hours = nowDate.getHours()
      let minutes = nowDate.getMinutes()
      let seconds = nowDate.getSeconds()
      return fullYear + '-' + this.addZone(month) + '-' + this.addZone(date) + ' ' + this.addZone(hours) + ':' + this.addZone(minutes) + ':' + this.addZone(seconds)
    },
    addZone(num) {
      return num <= 9 ? ('0' + num) : num
    }
  },
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem('userInfo'))
    this.dirForm.uid = this.user._id
    this.getFiles()
  }
}

</script>
<style>
.file-list-page {
  width: 100%;
  height: auto;
}

.file-list-page-header {
  width: 100%;
  height: 70px;
  line-height: 70px;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #c1c1c1;
  position: relative;
}

.file-list-page-body {
  width: 100%;
  height: auto;
}

.file-listpage-footer {
  width: 100%;
  height: 40px;
  margin: 20px 0;
}

.file-list-page-functions-bar {
  width: 100%;
  height: 30px;
  margin: 20px 0;
  overflow: hidden;
}

.upload-file-but {
  display: block;
  float: left;
  width: 120px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  color: #fff;
  border: 1px solid #409EFF;
  border-radius: 4px;
  background: #409EFF;
}

.mkdir-new-dir {
  display: block;
  float: left;
  width: 120px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  color: #909399;
  border: 1px solid #909399;
  border-radius: 4px;
  background: #fff;
  margin: 0 0 0 30px;
}

.file-list-data-table {
  width: 100%;
  height: auto;
}

.file-list-data-table input {
  display: inline-block;
  margin: 0 8px 0 0;
}

.file-list-data-table-header {
  width: 100%;
  height: auto;
}

.file-list-data-table-body {
  width: 100%;
  height: 480px;
  max-height: 480px;
  overflow: auto;
}

.file-list-data-table-th {
  width: 100%;
  height: auto;
  background: #F2F6FC;
  overflow: hidden;
}

.file-list-data-table-tr {
  width: 100%;
  height: auto;
  overflow: hidden;
}

.file-list-data-table-tr:nth-child(2n) {
  background: #F2F6FC;
}

.file-list-data-table-tr:hover {
  cursor: pointer;
  background: #F2F6FC;
}

.file-list-data-table-td {
  float: left;
  height: 40px;
  line-height: 40px;
}

.file-list-data-table-td:nth-child(1) {
  width: 54%;
  padding: 0 0 0 1%;
}

.file-list-data-table-td:nth-child(2) {
  width: 10%;
  text-align: center;
}

.file-list-data-table-td:nth-child(3) {
  width: 20%;
  text-align: center;
}

.file-list-data-table-td:nth-child(4) {
  width: 15%;
  text-align: center;
}

.upload-file-dialog-marker {
  width: 100%;
  height: 100%;
  background: #000;
  opacity: .4;
  filter: alpha(opacity:40);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
}

.upload-file-dialog-body {
  width: 580px;
  height: 450px;
  background: #fff;
  border-radius: 5px;
  opacity: 1;
  filter: alpha(opacity:100);
  overflow: hidden;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
}

.upload-file-dialog-body-header {
  width: 100%;
  height: auto;
  overflow: hidden;
  position: relative;
}

.upload-file-dialog-body-header-title {
  display: block;
  width: 98%;
  height: 40px;
  line-height: 40px;
  padding: 0 0 0 2%;
}

.upload-file-dialog-close {
  display: block;
  width: 30px;
  height: 40px;
  line-height: 40px;
  color: #909399;
  font-size: 15px;
  text-align: center;
  position: absolute;
  right: 0;
  top: 0;
}

.upload-file-dialog-body-content {
  width: 96%;
  height: 380px;
  overflow: hidden;
  padding: 2%;
}

#upload-file-widget {
  display: block;
  width: 557px;
  height: 380px;
  opacity: 0;
  border-radius: 5px;
  position: absolute;
  left: 12px;
  top: 52px;
  z-index: 10001
}

.upload-file-widget-marker {
  display: block;
  width: 100%;
  height: 380px;
  line-height: 380px;
  text-align: center;
  border: 1px solid #c1c1c1;
  border-radius: 5px;
}

.upload-file-widget-marker-active {
  cursor: pointer;
  border: 1px dashed #c1c1c1;
}

.file-view-list,
.file-view-preview {
  display: block;
  float: right;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #909399;
  font-size: 20px;
}

.operation-buts-box {
  display: block;
  float: right;
  width: auto;
  height: 40px;
}

.operation-buts-box a {
  display: block;
  float: right;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #909399;
}

.mkdir-new-dir-dialog-marker {
  width: 100%;
  height: 100%;
  background: #000;
  opacity: .4;
  filter: alpha(opacity:40);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
}

.mkdir-new-dir-dialog-body {
  width: 30%;
  height: auto;
  background: #fff;
  border-radius: 5px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
}

.mkdir-new-dir-dialog-body-header {
  width: 100%;
  height: auto;
  position: relative;
}

.mkdir-new-dir-dialog-body-header span {
  display: block;
  width: 98%;
  height: 50px;
  line-height: 50px;
  padding: 0 0 0 2%;
}

.mkdir-new-dir-dialog-body-header .close-modal-but {
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  position: absolute;
  right: 0;
  top: 0;
}

.mkdir-new-dir-dialog-body-content {
  width: 100%;
  height: auto;
}

.create-new-dir-form-items {
  width: 100%;
  height: auto;
  overflow: hidden;
  margin: 0 0 30px 0;
}

.create-new-dir-form {
  width: 92%;
  height: auto;
  padding: 4%;
}

.create-new-dir-form-item {
  width: 100%;
  height: auto;
  margin: 0 0 30px 0;
}

.create-new-dir-form label {
  display: block;
  float: left;
  width: 80px;
  height: 40px;
  line-height: 40px;
}

.create-new-dir-form input {
  display: block;
  float: left;
  width: 58%;
  height: 38px;
  line-height: 38px;
  padding: 0 0 0 2%;
  border: 1px solid #c1c1c1;
  border-radius: 5px;
}

.create-new-dir-form-submit {
  display: block;
  float: left;
  width: 118px;
  height: 38px;
  line-height: 38px;
  text-align: center;
  color: #fff;
  background: #409eff;
  border: 1px solid #409eff;
  border-radius: 5px;
}

.create-new-dir-form-canale {
  display: block;
  float: left;
  width: 118px;
  height: 38px;
  line-height: 38px;
  text-align: center;
  color: #909399;
  background: none;
  border: 1px solid #909399;
  border-radius: 5px;
  margin: 0 50px 0 80px;
}

.mkdir-new-dir-dialog-body-footer {
  width: 100%;
  height: auto;
}

</style>
