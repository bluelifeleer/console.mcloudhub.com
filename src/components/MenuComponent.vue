<template>
  <div class="menu-component" :style="{'width':width+'px'}">
    <ul class="menu-list-group">
      <li class="meni-list-items" :class="{'meni-list-items-active':menu.selected}" v-for="(menu,$index) in menus" :key="$index" :data-index="menu.index">
        <div class="menu-list-items-tap"><a href="javascript:void(0);" @click="menusItemClickHandle($event,$index,999)" class="menu-list-items-tap-alink"><span class="menu-list-items-tap-text">{{menu.text}}</span><i class="icon menu-list-items-tap-icon iconfont" v-if="menu.childs.length">{{(menu.selected?'&#xe71b;':'&#xe63a;')}}</i><i class="icon menu-list-items-tap-icon" v-else></i></a></div>
        <div class="menu-list-childs-box" v-if="menu.childs.length">
          <ul class="menu-list-items-child-list-group" v-if="menu.selected">
            <li class="menu-list-items-child-list-items" v-for="(child,$index) in menu.childs" :key="$index" :data-index="menu.index+'-'+child.index">
              <div class="menu-list-items-child-list-items-tap" :class="{'menu-list-items-child-list-items-tap-hover':child.selected}"><a href="javascript:void(0);" @click="menusItemClickHandle($event,$index,menu.index)" class="menu-list-items-child-list-items-tap-alink"><span class="menu-list-items-child-list-items-tap-text">{{child.text}}</span><i class="icon menu-list-items-child-list-items-tap-icon"></i></a></div>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'MenuComponent',
  props: ['width', 'parent', 'child'],
  data () {
    return {
      menus: [{
        index: 0,
        text: '开发工具',
        icon: '',
        alink: '',
        selected: true,
        childs: [{
          index: 0,
          text: '图片转Base64',
          icon: '',
          alink: '/tootl/img2base64',
          selected: true,
          childs: []
        }, {
          index: 1,
          text: '正则测试',
          icon: '',
          alink: '/tootl/preg',
          selected: false,
          childs: []
        }, {
          index: 2,
          text: 'URL编/解码',
          icon: '',
          alink: '/tootl/urlmq',
          selected: false,
          childs: []
        }, {
          index: 3,
          text: '二维码生成',
          icon: '',
          alink: '/tootl/qrcode',
          selected: false,
          childs: []
        }, {
          index: 4,
          text: '接口调试',
          icon: '',
          alink: '/tootl/apitest',
          selected: false,
          childs: []
        }, {
          index: 5,
          text: 'MD5加密',
          icon: '',
          alink: '/tootl/md5',
          selected: false,
          childs: []
        }]
      }, {
        index: 1,
        text: '文章管理',
        icon: '',
        alink: '',
        selected: false,
        childs: [{
          index: 0,
          text: '文章列表',
          icon: '',
          alink: '/article/list',
          selected: false,
          childs: []
        }, {
          index: 1,
          text: '新增文章',
          icon: '',
          alink: '/article/add',
          selected: false,
          childs: []
        }]
      }, {
        index: 2,
        text: '活动页面管理',
        icon: '',
        alink: '',
        selected: false,
        childs: [{
          index: 0,
          text: '活动列表',
          icon: '',
          alink: '/active/list',
          selected: false,
          childs: []
        }, {
          index: 0,
          text: '新增活动',
          icon: '',
          alink: '/active/add',
          selected: false,
          childs: []
        }]
      }, {
        index: 3,
        text: '文件管理',
        icon: '',
        alink: '',
        selected: false,
        childs: [{
          index: 0,
          text: '文件列表',
          icon: '',
          alink: '/file/list',
          selected: false,
          childs: []
        }, {
          index: 0,
          text: '回收站',
          icon: '',
          alink: '/file/recycle',
          selected: false,
          childs: []
        }]
      }, {
        index: 4,
        text: '标签管理',
        icon: '',
        alink: '',
        selected: false,
        childs: [{
          index: 0,
          text: '标签列表',
          icon: '',
          alink: '/target/list',
          selected: false,
          childs: []
        }]
      }, {
        index: 5,
        text: '财务管理',
        icon: '',
        alink: '',
        selected: false,
        childs: [{
          index: 0,
          text: '财务列表',
          icon: '',
          alink: '/finance/list',
          selected: false,
          childs: []
        }]
      }, {
        index: 6,
        text: '任务管理',
        icon: '',
        alink: '',
        selected: false,
        childs: [{
          index: 0,
          text: '任务列表',
          icon: '',
          alink: '/task/list',
          selected: false,
          childs: []
        }, {
          index: 1,
          text: '添加任务',
          icon: '',
          alink: '/task/add',
          selected: false,
          childs: []
        }]
      }],
      menusParent: 0,
      menusChild: 1
    }
  },
  watch: {
    'parent': function (num) {
      this.menusParent = num
      this.menus.forEach(menu => {
        menu.selected = false
      })
      this.menus[num].selected = true
    },
    'child': function (num) {
      this.menus[this.menusParent].childs.forEach(child => {
        child.selected = false
      })
      this.menus[this.menusParent].childs[num].selected = true
    }
  },
  created () {

  },
  methods: {
    menusItemClickHandle (e, index, parent) {
      e.stopPropagation()
      if (parent == 999) {
        this.$store.commit('setMenus', { parent: index })
        if (this.menus[index].childs.length && !this.menus[index].alink) {
          this.menus[index].selected = !this.menus[index].selected
        } else {
          this.$router.push({
            path: this.menus[index].alink
          })
        }
      } else {
        this.$store.commit('setMenus', { parent: parent, child: index })
        if (this.menus[parent].childs[index].childs.length && !this.menus[parent].childs[index].alink) {
          this.menus[parent].childs[index].selected = !this.menus[parent].childs[index].selected
        } else {
          this.$router.push({
            path: this.menus[parent].childs[index].alink
          })
        }
      }
    }
  },
  mounted () {

  }
}

</script>
<style scoped>
.menu-component {}

.menu-component a {
  display: block;
  width: 100%;
  height: 50px;
  color: #909399;
}

.menu-list-group {
  width: 100%;
  height: auto;
  background: #
}

.meni-list-items {
  width: 100%;
  height: auto;
  position: relative;
}

.meni-list-items:hover {
  cursor: pointer;
  background: #f9fafc;
}

.meni-list-items-active {
  background: #f9fafc;
}

.menu-list-items-tap {
  width: 90%;
  height: 50px;
  padding: 0 0 0 10%;
}

.menu-list-items-tap .menu-list-items-tap-text {
  height: 50px;
  line-height: 50px;
}

.menu-list-items-tap-icon {
  position: absolute;
  right: 20px;
  top: 15px;
}

.menu-list-childs-box {
  width: 100%;
  height: auto;
}

.menu-list-items-child-list-group {
  width: 100%;
  height: auto;
}

.menu-list-items-child-list-items {
  width: 100%;
  height: auto;
}

.menu-list-items-child-list-items-tap {
  width: 80%;
  height: 50px;
  padding: 0 0 0 20%;
}

.menu-list-items-child-list-items-tap-hover{
  cursor: pointer;
  background: #E4E7Ed;
}

.menu-list-items-child-list-items-tap:hover {
  cursor: pointer;
  background: #E4E7Ed;
}

.menu-list-items-child-list-items-tap .menu-list-items-child-list-items-tap-text {
  height: 50px;
  line-height: 50px;
}

</style>
