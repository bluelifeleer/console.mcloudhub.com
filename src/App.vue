<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
  html,
  body,
  div,
  table,
  thead,
  tr,
  th,
  tbody,
  ul,
  ol,
  dl,
  li {
    padding: 0;
    margin: 0;
  }

  ul,
  ol,
  dl {
    list-style-type: none;
  }

  a {
    text-decoration: none;
  }

  @font-face {
    font-family: 'iconfont';  /* project id 1204024 */
    src: url('//at.alicdn.com/t/font_1204024_j5qb8ad9f88.eot');
    src: url('//at.alicdn.com/t/font_1204024_j5qb8ad9f88.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1204024_j5qb8ad9f88.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1204024_j5qb8ad9f88.woff') format('woff'),
    url('//at.alicdn.com/t/font_1204024_j5qb8ad9f88.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1204024_j5qb8ad9f88.svg#iconfont') format('svg');
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #app {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

</style>
