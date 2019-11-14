<template>
  <div class="article-add">
    <div class="article-add-body">
      <input type="hidden" name="id" v-model="article._id" />
      <input type="hidden" name="uid" v-model="article.uid" />
      <div class="article-title"><input type="text" name="article-title" value="" v-model="article.title" placeholder="输入文章标题"></div>
      <div class="article-content-box">
        <mavon-editor v-model="article.content" @change="change" ref="markerdown" />
      </div>
      <div class="article-targets-box">
        <div class="article-targets-title"><label for="targets">选择标签：</label><a href="javascript:void(0);" class="add-target-but" @click="targetAddDialog=true">添加标签</a></div>
        <div class="article-targets-selector-options"><a href="javascript:void(0);" class="targets-selector-options" v-for="(target,$index) in targets" :key="$index" :index="target.index" :title="target.desc" @click="selectItems(target)" :class="{'targets-selector-options-active':target.selected}" :data-target-id="target._id">{{target.name}}</a></div>
      </div>
      <div class="article-add-form-submit-box">
        <a href="javascript:void(0);" class="article-add-form-submit" @click="articleFormSubmit($event)">保存</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ArticleEdit',
  props: ['id'],
  data() {
    return {
      user: {},
      targetAddDialog: false,
      formLabelWidth: '120px',
      article: {
        _id: '',
        uid: '',
        title: '',
        content: '',
        html: '',
        markDown: '',
        targets: []
      },
      targets: []
    }
  },
  watch() {

  },
  methods: {
    getTargets() {
      this.$axios({
        url: '/api/target/list',
        method: 'get', // default
      }).then(res => {
        if (res.data.ok && res.data.code) {
          let targets = res.data.data;
          targets.forEach(target => {
            target.selected = false;
          });
          this.targets = targets;
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getArticle() {
      this.$axios({
        method: 'get',
        url: `/api/article/get?id=${this.id}`
      }).then(res => {
        if (res.data.ok && res.data.code) {
          let article = res.data.data;
          article.targets.forEach(target => {
            this.targets.forEach(item => {
              if (target._id == item._id) {
                item.selected = true;
              }
            })
          })
          this.article = article;
        }
      }).catch(err => {
        console.log(err)
      })
    },
    selectItems(item) {
      this.article.targets = [];
      item.selected = !item.selected;
      this.targets.forEach((item) => {
        if (item.selected) {
          this.article.targets.push(item._id);
        }
      });
    },
    change(value, render) {
      this.article.html = render;
      this.article.content = value;
      this.article.markDown = value;
    },
    articleFormSubmit(e) {
      // this.article.html.replace(/(\n|\r\n)/g,'<br/>')
      this.$axios({
        url: '/api/article/update',
        method: 'post',
        data: this.article
      }).then(res => {
        console.log(res)
        if (res.data.ok && res.data.code) {
          this.$message({
            type: 'success',
            message: '修改成功',
            // center: true
          });
        }
      }).catch(err => {
        console.log(err)
      });
    }
  },
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem('userInfo'));
    this.article.uid = this.user._id;
    this.getTargets();
    this.getArticle();
  }
}

</script>
<style scoped>
.article-add {
  width: 96%;
  height: auto;
  padding: 0 2%;
}

.article-add-body {
  width: 100%;
  height: auto;
}

.article-title {
  width: 100%;
  height: 50px;
}

.article-title input {
  display: block;
  width: 99%;
  height: 50px;
  line-height: 50px;
  padding: 0 0 0 1%;
  border: none;
}

.article-content-box {
  width: 100%;
  height: 580px;
}

.markdown-body {
  height: 100%;
}

.article-targets-box {
  width: 100%;
  height: auto;
  margin: 20px 0 0 0;
  overflow: hidden;
}

.article-targets-box .article-targets-title {
  width: 100%;
  height: auto;
  overflow: hidden;
  margin: 0 0 10px 0;
}

.article-targets-title label {
  display: block;
  float: left;
  width: auto;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
}

.article-targets-title a {
  display: block;
  float: left;
  width: auto;
  height: 30px;
  line-height: 30px;
  padding: 0 20px;
  border-radius: 15px;
  background: #5D9D3E;
  color: #fff;
  margin: 0 0 0 20px;
}

.article-targets-selector-options {
  width: 100%;
  height: auto;
}

.targets-selector-options {
  display: block;
  float: left;
  width: auto;
  height: 40px;
  line-height: 40px;
  padding: 0 8px;
  margin: 8px;
  color: #333;
  background: #F2F6FC;
  border-radius: 4px;
}

.targets-selector-options-active {
  background: #329103;
  color: #fff;
}

.article-add-form-submit-box {
  width: 100%;
  height: auto;
  margin: 20px 0 0 0;
}

.article-add-form-submit {
  display: block;
  float: right;
  width: 120px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  background: #5D9D3E;
  border-radius: 4px;
  margin: 0 30px 0 0;
}

.article-add-form-submit:hover {
  background: #329103;
}

</style>
