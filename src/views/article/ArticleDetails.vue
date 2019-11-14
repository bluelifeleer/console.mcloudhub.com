<template>
  <div class="article-details">
    <div class="article-details-header">
      <div class="article-details-title">{{article.title.length>=60?(article.title.substr(0,60)+'......'):article.title}}</div>
      <div class="article-details-status-bar">{{article.createTime}} <i v-if="article.createTime!=article.modifyTime" class="icon iconfont" :title="article.modifyTime">&#xe637;</i></div>
    </div>
    <div class="article-details-body">
      <div class="article-details-content markdown-body" v-html="article.html"></div>
    </div>
    <div class="article-details-flooter"></div>
  </div>
</template>
<script>
export default {
  name: 'ArticleDetails',
  props: ['id'],
  data() {
    return {
      user: {},
      article: {
        title: '',
        html: '',
        content: '',
        createTime: '',
        modifyTime: '',
        targets: [],
        uid: '',
        _id: ''
      }
    }
  },
  created() {},
  methods: {
    getArticle() {
      this.$axios({
        method: 'get',
        url: '/api/article/get?id=' + this.id
      }).then(res => {
        if (res.data.code && res.data.ok) {
          let article = res.data.data;
          article.createTime = this.formateDate(article.createTime);
          article.modifyTime = this.formateDate(article.modifyTime);
          this.article = article;
        }
      }).catch(err => {
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
      return fullYear + '-' + this.addZone(month) + '-' + this.addZone(date) + ' ' + this.addZone(hours) + ':' + this.addZone(minutes) + ':' + this.addZone(seconds);
    },
    addZone(num) {
      return num <= 9 ? ('0' + num) : num;
    }
  },
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem('userInfo'));
    this.getArticle()
  }
}

</script>
<style scoped>
.article-details {
  width: 96%;
  height: auto;
  padding: 2%;
}

.article-details-header {
  width: 100%;
  height: auto;
}

.article-details-title {
  width: 100%;
  height: 60px;
  line-height: 60px;
  font-size: 23px;
  font-weight: bold;
}

.article-details-status-bar {
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 13px;
}

.article-details-status-bar i:hover {
  cursor: pointer;
}

.article-details-body {
  width: 100%;
  height: auto;
}

.article-details-content {
  width: 100%;
  height: auto;
  overflow: hidden;
}

.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}

</style>
