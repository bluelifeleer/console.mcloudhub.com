<template>
  <div class="file-recycle-page">
    <div class="file-recycle-page-header">文件回收站</div>
    <div class="file-recycle-page-body"></div>
  </div>
</template>

<script>
export default {
  name: 'FileRecycle',
  data () {
    return {

    }
  },
  created () {},
  methods: {},
  mounted () {

  }
}
</script>

<style>
  .file-recycle-page{
    width:100%;
    height:auto;
  }

  .file-recycle-page-header{
    width: 100%;
    height: 70px;
    line-height: 70px;
    font-size: 20px;
    font-weight: bold;
    border-bottom: 1px solid #c1c1c1;
    position: relative;
  }

  .file-recycle-page-body{
    width:100%;
    height:auto;
  }
</style>
