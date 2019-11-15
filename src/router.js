import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Dashboard from './views/Dashboard.vue'
import ImgToBase from './views/tools/ImgToBase.vue'
import PregTootl from './views/tools/pregTool.vue'
import ApiTest from './views/tools/apiTest'
import urlMarkQuery from './views/tools/urlMarkQuery'
import QrCode from './views/tools/qrcode'
import ArticleLists from './views/article/ArticleLists.vue'
import ArticleAdd from './views/article/ArticleAdd.vue'
import ArticleEdit from './views/article/ArticleEdit.vue'
import ArticleDetails from './views/article/ArticleDetails.vue'
import ActiveList from './views/active/ActiveList.vue'
import ActiveAdd from './views/active/ActiveAdd.vue'
import FinanceList from './views/finance/FinanceList.vue'
import Login from './views/login.vue'
import Register from './views/register.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    }, {
      path: '/tootl',
      name: 'tootl',
      component: Home,
      children: [{
        path: 'img2base64',
        name: 'img2base64',
        component: ImgToBase,
      }, {
        path: 'preg',
        name: 'preg',
        component: PregTootl,
      }, {
        path: 'qrcode',
        name: 'qrcode',
        component: QrCode,
      }, {
        path: 'apitest',
        name: 'apitest',
        component: ApiTest
      }, {
        path: 'urlmq',
        name: 'urlmq',
        component: urlMarkQuery
      }]
    }, {
      path: '/article',
      name: 'article',
      component: Home,
      children: [{
        path: 'list',
        name: 'articleLists',
        component: ArticleLists
      }, {
        path: 'add',
        name: 'articleAdd',
        component: ArticleAdd
      }, {
        path: 'edit',
        name: 'ArticleEdit',
        component: ArticleEdit,
        props: (route) => ({
          id: route.query.id
        })
      }, {
        path: 'details',
        name: 'details',
        component: ArticleDetails,
        props: (route) => ({
          id: route.query.id
        })
      }]
    }, {
      path: '/active',
      name: 'article',
      component: Home,
      children: [{
        path: 'list',
        name: 'activeList',
        component: ActiveList
      }, {
        path: 'add',
        name: 'activeAdd',
        component: ActiveAdd
      }]
    }, {
      path: '/finance',
      name: 'finance',
      component: Home,
      children: [{
        path: 'list',
        name: 'activeList',
        component: FinanceList
      }],
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/register',
      name: 'register',
      component: Register
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})