<template>
  <div class="target-list-page">
  <div class="target-list-page-title">标签列表</div>
  <div class="target-list-page-body">
    <div class="target-list-group">
      <el-table :data="targets.list" style="width: 100%" v-loading="loading">
        <el-table-column label="排序" width="70" header-align="center" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.index }}</span>
          </template>
        </el-table-column>
          <el-table-column prop="name" label="标签名称" header-align="center" align="center">
          </el-table-column>
          <el-table-column prop="icon" label="icon" header-align="center">
          </el-table-column>
          <el-table-column label="标签连接" header-align="center">
            <template slot-scope="scope">
              <a :href="scope.row.link" class="target-link" :title="scope.row.link">{{scope.row.link}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="desc" label="标签描述" header-align="center">
          </el-table-column>
          <el-table-column label="日期" width="180" header-align="center">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" header-align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="targetEditHandle(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="targetDeleteHandle(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
    <div class="target-pagination-box">
      <el-pagination @size-change="targetsHandleSizeChange" @current-change="targetsHandleCurrentChange"
        :current-page="targets.offset" :page-sizes="[10, 20, 40, 60, 80, 100]" :page-size="targets.nums"
        layout="total, sizes, prev, pager, next, jumper" :total="targets.count">
      </el-pagination>
    </div>
  </div>
  <div class="target-edit-dialog" v-if="targetEditDialogToggle">
    <div class="target-edit-dialog-remarker" @click="targetEditDialogToggle=false"></div>
    <div class="target-edit-dialog-box">
      <div class="target-edit-dialog-box-header">
        <span class="target-edit-dialog-box-header-title">标签个性</span>
        <a href="javascript:void(0);" class="target-edit-dialog-close-but"><i class="icon iconfont"></i></a>
      </div>
      <div class="target-edit-dialog-box-body">
        <div class="target-edit-form-group">
          <div class="target-edit-form-items" style="display:none;">
            <label for="uid"></label>
            <input type="hidden" name="uid" id="uid" class="uid" v-model="targetForm.uid" placeholder="" value="" />
          </div>
          <div class="target-edit-form-items" style="display:none;">
            <label for="id"></label>
            <input type="hidden" name="id" v-model="targetForm._id" id="id" class="id" placeholder="" value="" />
          </div>
          <div class="target-edit-form-items">
            <label for="index">标签排序索引：</label>
            <input type="text" name="index" v-model="targetForm.index" id="index" class="index" placeholder="标签排序索引" value="" />
          </div>
          <div class="target-edit-form-items">
            <label for="name">标签名称：</label>
            <input type="text" name="name" v-model="targetForm.name" id="name" class="name" placeholder="标签名称" value="" />
          </div>
          <div class="target-edit-form-items">
            <label for="icon">标签icon：</label>
            <input type="text" name="icon" v-model="targetForm.icon" id="icon" class="icon" placeholder="标签icon" value="" />
          </div>
          <div class="target-edit-form-items">
            <label for="link">标签连接：</label>
            <input type="text" name="link" v-model="targetForm.link" id="link" class="link" placeholder="标签连接" value="" />
          </div>
          <div class="target-edit-form-items" style="height:100px;">
            <label for="desc" style="height:100px;">标签描述：</label>
            <textarea name="desc" v-model="targetForm.desc" id="desc" class="desc" placeholder="标签描述" value="" style="height:70px;"></textarea>
          </div>
          <div class="target-edit-form-items">
            <a href="javascript:void(0);" class="target-edit-form-submit-but" @click="targetEditFormSubmitBut($event)">提交</a>
            <a href="javascript:void(0);" class="target-edit-form-cancel-but" @click="targetEditFormCanaleBut($event)">取消</a>
          </div>
        </div>
      </div>
      <div class="target-edit-dialog-box-footer"></div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'TargetList',
  data () {
    return {
      user: {},
      targetEditDialogToggle: false,
      targets: {
        count: 0,
        offset: 1,
        nums: 20,
        sort: '',
        list: []
      },
      targetForm: {}
    }
  },
  created () {

  },
  methods: {
    getTargets () {
      this.$axios({
        method: 'get',
        url: `/api/target/list?uid=${this.user._id}&offset=${this.targets.offset}&nums=${this.targets.nums}&sort=${this.targets.sort}`
      }).then(res => {
        console.log(res)
        if (res.data.ok && res.data.code) {
          let lists = res.data.data.list
          lists.forEach(item => {
            item.createTime = this.formateDate(item.createTime)
          })
          this.targets.count = res.data.data.count
          this.targets.offset = res.data.data.offset
          this.targets.nums = res.data.data.nums
          this.targets.sort = res.data.data.sort
          this.targets.list = lists
        }
      }).catch(err => {
        console.log(err)
      })
    },
    targetsHandleSizeChange (nums) {
      this.targets.nums = nums
      this.getTargets()
    },
    targetsHandleCurrentChange (offset) {
      this.targets.offset = offset
      this.getTargets()
    },
    targetEditHandle (index, item) {
      this.targetForm = item
      this.targetEditDialogToggle = !this.targetEditDialogToggle
    },
    targetEditFormSubmitBut (e) {
      console.log(this.targetForm)
      this.$axios({
        method: 'post',
        url: '/api/target/update',
        data: this.targetForm
      }).then(res => {
        if (res.data.ok && res.data.code) {
          this.targetEditDialogToggle = !this.targetEditDialogToggle
          this.$message({
            type: 'success',
            message: '修改成功'
            // center: true
          })
          this.getTargets()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    targetEditFormCanaleBut (e) {
      this.targetEditDialogToggle = !this.targetEditDialogToggle
    },
    targetDeleteHandle (index, item) {
      this.$axios({
        method: 'get',
        url: `/api/target/delete?id=${item._id}`
      }).then(res => {
        if (res.data.ok && res.data.code) {
          this.$message({
            type: 'success',
            message: '删除成功'
            // center: true
          })
          this.getTargets()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    formateDate (timer) {
      let nowDate = timer ? new Date(timer) : new Date()
      let fullYear = nowDate.getFullYear()
      let month = nowDate.getMonth() + 1
      let date = nowDate.getDate()
      let hours = nowDate.getHours()
      let minutes = nowDate.getMinutes()
      let seconds = nowDate.getSeconds()
      return fullYear + '-' + this.addZone(month) + '-' + this.addZone(date) + ' ' + this.addZone(hours) + ':' + this.addZone(minutes) + ':' + this.addZone(seconds)
    },
    addZone (num) {
      return num <= 9 ? ('0' + num) : num
    }
  },
  mounted () {
    this.user = JSON.parse(sessionStorage.getItem('userInfo'))
    this.getTargets()
  }
}
</script>

<style scoped>
  .target-list-page{
    width:100%;
    height:auto;
  }

  .target-list-page-title{
    width: 100%;
    height: 70px;
    line-height: 70px;
    font-size: 20px;
    font-weight: bold;
    border-bottom: 1px solid #c1c1c1;
    position: relative;
  }

  .target-list-page-body{
    width:96%;
    height:auto;
    padding:2%;
  }

  .target-list-group{
    width:100%;
    height:auto;
  }

  .target-pagination-box{
    width:100%;
    height:40px;
    margin:30px 0;
  }

  .target-edit-dialog-remarker{
    width:100%;
    height:100%;
    position:fixed;
    left:0;
    top:0;
    background:#000;
    opacity:0.4;
    filter:alpha(opacity:40);
    z-index:1560;
  }

  .target-edit-dialog-box{
    width:40%;
    height:auto;
    background:#fff;
    border-radius:5px;
    position:fixed;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    z-index:1561;
  }

  .target-edit-dialog-box-header{
    width:100%;
    height:auto;
    position:relative;
    border-bottom:1px solid #ccc;
  }

  .target-edit-dialog-box-header-title{
    width:98%;
    height:50px;
    line-height: 50px;
    padding:0 0 0 2%;
  }

  .target-edit-dialog-close-but{
    display:block;
    width:30px;
    height:30px;
    position:absolute;
    right:10px;
    top:10px;
  }

  .target-edit-dialog-box-body{
    width:100%;
    height:auto;
  }

  .target-edit-form-group{
    width:96%;
    height:auto;
    padding:4% 2%;
  }

  .target-edit-form-items{
    width:100%;
    height:auto;
    margin:0 0 30px 0;
    overflow: hidden;
  }

  .target-edit-form-items label{
    display:block;
    float:left;
    width:150px;
    height:40px;
    line-height: 40px;
    text-align: right;
    padding:0 30px 0 0;
  }

  .target-edit-form-items input{
    display:block;
    float:left;
    width:66%;
    height:38px;
    line-height: 38px;
    padding:0 0 0 2%;
    border:1px solid #ccc;
    border-radius:5px;
  }

  .target-edit-form-items textarea{
    display:block;
    float:left;
    width:66%;
    height:70px;
    line-height: 38px;
    padding:2%;
    border:1px solid #ccc;
    border-radius:5px;
  }

  .target-edit-form-cancel-but{
    display:block;
    float:right;
    width:120px;
    height:38px;
    line-height: 38px;
    text-align: center;
    border:1px solid #fff;
    border-radius:5px;
    color:#555;
    background:#fff;
  }

  .target-edit-form-submit-but{
    display:block;
    float:right;
    width:120px;
    height:38px;
    line-height: 38px;
    text-align: center;
    border:1px solid #5d9d3e;
    border-radius:5px;
    color:#fff;
    background:#5d9d3e;
    margin:0 30px 0 0;
  }

  .target-edit-dialog-box-footer{
    width:100%;
    height:auto;
  }
</style>
