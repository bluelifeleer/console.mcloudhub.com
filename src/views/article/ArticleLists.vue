<template>
  <div class="article-lists">
    <div class="article-lists-title">
      <span>文章列表</span>
      <a href="/article/add" class="add-article-but">添加文章</a>
      <div class="article-search-box">
        <input type="text" name="article-search" placeholder="输入搜索关键字" ref="articleSearchInut" @blur="articleSearchMouseLave()" v-model="articleSearch.value" />
        <i class="icon iconfont" @click="articleSearchMouseEnter($event)">&#xe62e;</i>
      </div>
    </div>
    <div class="article-list-box">
      <ul class="article-list-item-group">
        <li class="article-list-items" v-for="(article,$index) in articles.list" :key="$index" :data-id="article._id" @mouseenter="articleItemHover($event,$index)" @mouseleave="articleItemOut($event,$index)">
          <div class="article-list-items-header"><a :href="article.href">{{article.title}}</a></div>
          <div class="article-list-items-body"><a :href="article.href">{{article.miniText.length>=128?(article.miniText.substr(0,128)+'......'):article.miniText}}</a></div>
          <div class="article-list-items-footer">
            <a href="javascript:void(0);" class="article-list-items-targets" v-for="(target,$index) in article.targets" :key="$index" :data-target-id="target._id" :title="target.name">{{target.name}}</a>
            <span class="article-list-items-date">{{article.createTime}}</span>
          </div>
          <div class="list-items-operation-box" v-if="article.isHover">
            <a href="javascript:void(0);" class="list-items-article-delete-but" @click="articleDelete($event,article._id)">删除</a>
            <a href="javascript:void(0);" class="list-items-article-edit-but" @click="articleEdit($event,article._id)">编辑</a>
          </div>
        </li>
      </ul>
    </div>
    <div class="article-list-page-bar">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="articles.offset" :page-sizes="[10, 20, 40, 60, 80, 100]" :page-size="articles.nums" layout="total, sizes, prev, pager, next, jumper" :total="articles.count">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ArticleLists',
  data() {
    return {
      user: {},
      loadingFlag: null,
      articles: {
        count: 0,
        offset: 1,
        nums: 20,
        sort: '',
        list: []
      },
      articleSearch: {
        value: ''
      }
    }
  },
  methods: {
    getArticles() {
      this.loadingFlag = this.$loading({
        target: '.article-list-box',
        background: '#fff',
        text: '正在加载文章列表'
      })
      this.$axios({
        method: 'get',
        url: `/api/article/list?uid=${this.user._id}&nums=${this.articles.nums}&offset=${this.articles.offset}&sort=${this.articles.sort}`
      }).then(res => {
        if (res.data.ok && res.data.code) {
          this.loadingFlag.close()
          this.articles.offset = res.data.data.offset
          this.articles.nums = res.data.data.nums
          this.articles.sort = res.data.data.sort
          this.articles.count = res.data.data.count
          res.data.data.list.forEach(item => {
            item.miniText = item.html.replace(/<[^<>]+>/g, '')
            item.href = '/article/details?id=' + item._id
            item.createTime = this.formateDate(item.createTime)
            item.modifyTime = this.formateDate(item.modifyTime)
            item.isHover = false
          })
          this.articles.list = res.data.data.list
        }
      }).catch(err => {
        console.log(err)
      })
    },
    articleSearchMouseEnter(e) {
      this.$refs.articleSearchInut.style.display = 'block';
      this.$refs.articleSearchInut.focus()
      if (this.articleSearch.value) {
        console.log(this.articleSearch.value)
      }
    },
    articleSearchMouseLave() {
      this.$refs.articleSearchInut.style.display = 'none';
    },
    handleSizeChange(nums) {
      this.articles.nums = nums
      this.getArticles()
    },
    handleCurrentChange(offset) {
      this.articles.offset = offset
      this.getArticles()
    },
    articleItemHover(e, index) {
      this.articles.list.forEach(item => {
        item.isHover = false
      })
      this.articles.list[index].isHover = true
    },
    articleItemOut(e, index) {
      this.articles.list.forEach(item => {
        item.isHover = false
      })
    },
    articleDelete(e, id) {
      this.$axios({
        method: 'get',
        url: `/api/article/delete?id=${id}`
      }).then(res => {
        if (res.data.ok && res.data.code) {
          this.$message({
            type: 'success',
            message: '删除成功'
            // center: true
          })
          this.getArticles()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    articleEdit(e, id) {
      this.$router.push({ path: `/article/edit?id=${id}` })
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
    // this.getArticles()
  }
}

</script>
<style scoped>
.article-lists {
  width: 100%;
  height: auto;
}

.article-lists-title {
  width: 100%;
  height: 70px;
  border-bottom: 1px solid #c1c1c1;
  position: relative;
}

.article-lists-title span {
  display: block;
  float: left;
  width: 50%;
  height: 70px;
  line-height: 70px;
  font-size: 20px;
  font-weight: bold;
}

.article-lists-title .article-search-box {
  float: right;
  width: auto;
  height: 40px;
  margin: 15px 15px 15px auto;
  position: relative;
}

.article-search-box input {
  display: none;
  float: left;
  width: 180px;
  height: 38px;
  line-height: 38px;
  border: 1px solid #c1c1c1;
  border-radius: 4px;
  padding: 0 0 0 10px;
  font-size: 18px;
}

.article-search-box i {
  display: block;
  float: left;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  position: absolute;
  right: 0;
  top: 0;
}

.article-search-box i:hover {
  cursor: pointer;
}

.add-article-but {
  display: block;
  float: right;
  width: 120px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  font-size: 15px;
  border-radius: 4px;
  background: #5d9d3e;
  margin: 15px 0
}

.article-list-box {
  width: 96%;
  height: 650px;
  padding: 2%;
  overflow: auto;
}

.article-list-item-group {
  width: 100%;
  height: auto;
}

.article-list-items {
  width: 98%;
  height: auto;
  overflow: hidden;
  margin: 0 0 20px 0;
  padding: 1%;
  border-bottom: 1px solid #f9fafc;
  position: relative;
}

.article-list-items:hover {
  cursor: pointer;
  background: #f9fafc;
  border-radius: 4px;
}

.article-list-items-header {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-weight: bold;
}

.article-list-items-body {
  width: 100%;
  height: auto;
}

.article-list-items-header a,
.article-list-items-body a {
  color: #909399;
}

.article-list-items-footer {
  width: 100%;
  height: 40px;
  margin: 20px 0 0 0;
  position: relative;
}

.article-list-items-targets {
  display: block;
  float: left;
  width: auto;
  height: 30px;
  line-height: 30px;
  padding: 0 8px;
  font-size: 14px;
  color: #909399;
  margin: 5px 10px 5px 0;
  background: #f9fafc;
  border-radius: 3px;
}

.article-list-items-date {
  width: 180px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  position: absolute;
  right: 0;
  top: 5px;
}

.list-items-operation-box {
  width: auto;
  heihgt: auto;
  position: absolute;
  right: 0;
  top: 0
}

.list-items-article-delete-but {
  display: block;
  float: left;
  width: auto;
  height: 30px;
  line-height: 30px;
  padding: 0 8px;
  color: #fff;
  background: #f56c6c;
  border: 1px solid #f56c6c;
  border-radius: 3px;
  margin: 0 10px 0 0;
}

.list-items-article-edit-but {
  display: block;
  float: left;
  width: auto;
  height: 30px;
  line-height: 30px;
  padding: 0 8px;
  color: #fff;
  background: #5d9d3e;
  border: 1px solid #5d9d3e;
  border-radius: 3px;
}

.article-list-page-bar {
  width: 98%;
  height: 40px;
  padding: 0 0 0 2%;
}

</style>
