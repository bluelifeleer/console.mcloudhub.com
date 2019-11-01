<template>
  <div class="url-mark-query-container">
    <div class="url-mark-query-title">URL编码/解码</div>
    <div class="url-mark-query-form-box">
      <div class="url-mark-query-form-input">
        <textarea name="input-url" id="input-url" cols="30" rows="10" v-model="urlMarkQueryForm.input"></textarea>
      </div>
      <div class="url-mark-query-form-buts">
        <a href="javascript:void(0);" class="" @click="urlConvert($event,'decode')">解码</a>
        <a href="javascript:void(0);" class="" @click="urlConvert($event,'encode')">编码</a>
      </div>
      <div class="url-mark-query-form-output">
        <textarea name="output-url" id="output-url" cols="30" rows="10" v-model="urlMarkQueryForm.output"></textarea>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'urlMarkQuery',
  data() {
    return {
      urlMarkQueryForm: {
        input: '',
        output: ''
      }
    }
  },
  created() {},
  methods: {
    urlConvert(e, type) {
      this.urlMarkQueryForm[(type == 'encode' ? 'output' : 'input')] = (type == 'encode' ? encodeURI(this.urlMarkQueryForm[(type == 'encode' ? 'input' : 'output')]) : decodeURI(this.urlMarkQueryForm[(type == 'encode' ? 'input' : 'output')]));
    }
  },
  mounted() {}
}

</script>
<style>
.url-mark-query-container {
  width: 100%;
  height: auto;
}

.url-mark-query-title {
  width: 100%;
  height: 70px;
  line-height: 70px;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #c1c1c1;
}

.url-mark-query-form-box {
  width: 96%;
  height: auto;
  padding: 2%;
}

.url-mark-query-form-input {
  width: 80%;
  height: 150px;
}

.url-mark-query-form-input textarea {
  display: block;
  width: 98%;
  height: 118px;
  border: 1px solid #c1c1c1;
  border-radius: 5px;
  padding: 1%;
  resize: none;
}

.url-mark-query-form-buts {
  width: 80%;
  height: 60px;
  padding: 5px 0;
}

.url-mark-query-form-buts a {
  display: block;
  float: right;
  width: 120px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: #5D9D3E;
  color: #fff;
  margin: 0 0 0 10px;
  border-radius: 5px;
}

.url-mark-query-form-output {
  width: 80%;
  height: 150px;
}

.url-mark-query-form-output textarea {
  display: block;
  width: 98%;
  height: 118px;
  border: 1px solid #c1c1c1;
  border-radius: 5px;
  padding: 1%;
  resize: none;
}

</style>
