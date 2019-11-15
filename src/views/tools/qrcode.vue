<template>
  <div class="qrcode-container">
		<div class="qrcode-container-header">二维码生成器</div>
		<div class="qrcode-container-body"></div>
  </div>
</template>
<script>
export default {
  name: 'qrCode',
  data() {
    return {

    }
  },
  created() {},
  methods: {},
  mounted() {}
}

</script>
<style>
.qrcode-container {
  width: 100%;
  height: auto;
}

.qrcode-container-header{
	width: 100%;
	height: 70px;
	line-height: 70px;
	font-size: 20px;
	font-weight: bold;
	border-bottom: 1px solid #c1c1c1;
}

</style>
