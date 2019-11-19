<template>
  <div class="active-list-page">
    <div class="active-list-header">活动页面列表</div>
    <div class="active-list-body">
      <div class="active-list-item-group">
        <el-table :data="actives.list" style="width: 100%" v-loading="loading">
          <el-table-column label="日期" width="180" header-align="center">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="活动页面连接" header-align="center">
            <template slot-scope="scope">
              <a :href="scope.row.url" target="_blank" class="active-table-list-link">{{scope.row.url}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="活动名称" header-align="center">
          </el-table-column>
          <el-table-column prop="companyName" label="公司名称" header-align="center">
          </el-table-column>
          <el-table-column prop="projectName" label="项目名称" header-align="center">
          </el-table-column>
          <el-table-column prop="projectUrl" label="项目连接" header-align="center">
          </el-table-column>
          <el-table-column prop="projectDir" label="项目目录" header-align="center">
          </el-table-column>
          <el-table-column prop="desc" label="活动描述" header-align="center">
          </el-table-column>
          <el-table-column label="操作" width="180" header-align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="activeEditHandle(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="activeDeleteHandle(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="active-list-item-page-box">
        <el-pagination @size-change="activesHandleSizeChange" @current-change="activesHandleCurrentChange"
          :current-page="actives.offset" :page-sizes="[10, 20, 40, 60, 80, 100]" :page-size="actives.nums"
          layout="total, sizes, prev, pager, next, jumper" :total="actives.count">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ActiveList',
    data() {
      return {
        user: {},
        loading:false,
        actives: {
          count: 0,
          offset: 1,
          nums: 20,
          sort: '',
          list: []
        }
      }
    },
    created() {

    },
    methods: {
      getActiveList() {
        this.loading = true;
        this.$axios({
          method: 'GET',
          url: `/api/active/list?uid=${this.user._id}&nums=${this.actives.nums}&offset=${this.actives.offset}&sort=`
        }).then(res => {
          console.log(res)
          if (res.data.ok && res.data.code) {
            this.loading = false;
            let actives = res.data.data
            actives.list.forEach(active => {
              active.createTime = this.formateDate(active.createTime)
            })

            this.actives = {
              count: actives.count,
              offset: actives.offset,
              nums: actives.nums,
              sort: actives.sort,
              list: actives.list
            }

            console.log(this.actives)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      activesHandleSizeChange(nums) {
        this.actives.nums = nums;
        this.getActiveList();
      },
      activesHandleCurrentChange(offset) {
        this.actives.offset = offset;
        this.getActiveList();
      },
      activeEditHandle(index, item) {
        this.$router.push({path:`/active/add?id=${item._id}`})
      },
      activeDeleteHandle(index, item) {
        this.$axios({
          method:'get',
          url:`/api/active/delete?uid=${this.user._id}&id=${item._id}`
        }).then(res=>{
          if(res.data.code&&res.data.ok){
            this.$message({
              type:'success',
              message:'删除成功'
            });
            this.getActiveList();
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      formateDate(timer) {
        let nowDate = timer ? new Date(timer) : new Date();
        let fullYear = nowDate.getFullYear();
        let month = nowDate.getMonth() + 1;
        let date = nowDate.getDate();
        let hours = nowDate.getHours();
        let minutes = nowDate.getMinutes();
        let seconds = nowDate.getSeconds();
        return fullYear + '-' + this.addZone(month) + '-' + this.addZone(date) + ' ' + this.addZone(hours) + ':' +
          this.addZone(minutes) + ':' + this.addZone(seconds);
      },
      addZone(num) {
        return num <= 9 ? ('0' + num) : num;
      }
    },
    mounted() {
      this.user = JSON.parse(sessionStorage.getItem('userInfo'));
      this.getActiveList();
    }
  }

</script>

<style>
  .active-list-page {
    width: 100%;
    height: auto;
  }

  .active-list-header {
    width: 100%;
    height: 70px;
    line-height: 70px;
    font-size: 20px;
    font-weight: bold;
    border-bottom: 1px solid #c1c1c1;
  }

  .active-list-body {
    width: 100%;
    height: auto;
    margin: 30px 0 0 0;
  }

  .active-list-item-group {
    width: 100%;
    height: auto;
  }

  .active-list-item-page-box {
    width: 100%;
    height: 40px;
    margin: 30px 0 0 0;
  }

</style>
