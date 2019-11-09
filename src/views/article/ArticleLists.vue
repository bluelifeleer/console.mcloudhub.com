<template>
  <div class="article-lists">
    <div class="article-lists-title">文章列表 <a href="/article/add" class="add-article-but">添加文章</a></div>
    <div class="article-list-box">
      <ul class="article-list-item-group">
        <li class="article-list-items" v-for="(article,$index) in articles.list" :key="$index" :data-id="article._id">
          <div class="article-list-items-header"><a :href="article.href">{{article.title}}</a></div>
          <div class="article-list-items-body"><a :href="article.href">{{article.html}}</a></div>
          <div class="article-list-items-footer">
            <a href="javascript:void(0);" class="article-list-items-targets" v-for="(target,$index) in article.targets" :key="$index" :data-target-id="target._id">{{target.name}}</a>
            <span class="article-list-items-date">{{article.createTime}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="article-list-page-bar">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="articles.offset" :page-sizes="[20, 40, 60, 80, 100]" :page-size="articles.nums" layout="total, sizes, prev, pager, next, jumper" :total="articles.count">
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
      articles: {
        count: 0,
        offset: 1,
        nums: 20,
        sort: '',
        list: []
      }
    }
  },
  methods: {
    getArticles() {
      this.$axios({
        method: 'get',
        url: `/api/article/list?uid=${this.user._id}&nums=${this.articles.nums}&offset=${this.articles.offset}&sort=${this.articles.sort}`
      }).then(res => {
        if (res.data.ok && res.data.code) {
          this.articles.offset = res.data.data.offset;
          this.articles.nums = res.data.data.nums;
          this.articles.sort = res.data.data.sort;
          this.articles.count = res.data.data.count;
          res.data.data.list.forEach(item => {
            item.href = "/article/details?id=" + item._id;
            item.createTime = this.formateDate(item.createTime);
            item.modifyTime = this.formateDate(item.modifyTime);
          })
          this.articles.list = res.data.data.list;

        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleSizeChange(nums) {
      this.articles.nums = nums;
      this.getArticles();
    },
    handleCurrentChange(offset) {
      this.articles.offset = offset;
      this.getArticles();
    },
    formateDate(timer) {
      let nowDate = timer ? new Date(timer) : new Date();
      let fullYear = nowDate.getFullYear();
      let month = nowDate.getMonth() + 1;
      let date = nowDate.getDate();
      let hours = nowDate.getHours();
      let minutes = nowDate.getMinutes();
      let seconds = nowDate.getSeconds();
      return fullYear + '-' + this.addZone(month) + '-' + this.addZone(date) + ' ' + this.addZone(hours) + ':' + this.addZone(minutes) + ':' + this.addZone(seconds);
    },
    addZone(num) {
      return num <= 9 ? ('0' + num) : num;
    }
  },
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem('userInfo'));
    this.getArticles();
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
  line-height: 70px;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #c1c1c1;
  position: relative;
}

.add-article-but {
  display: block;
  width: 120px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  font-size: 15px;
  border-radius: 4px;
  background: #5d9d3e;
  position: absolute;
  right: 0;
  top: 15px;
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
  border-radius: 4px;
}

.article-list-items:hover {
  cursor: pointer;
  background: #f9fafc;
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
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
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

.article-list-page-bar {
  width: 98%;
  height: 40px;
  padding: 0 0 0 2%;
}

</style>
