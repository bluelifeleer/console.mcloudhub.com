<template>
  <div class="preg-tootle-page">
    <div class="preg-tootle-page-header">正则在线测试工具</div>
    <div class="preg-tootle-page-body">
      <div class="preg-tootle-page-form-box">
        <div class="preg-tootle-page-form-items"><textarea name="input-text" id="" cols="30" rows="10"
            placeholder="输入匹配文本" v-model="pregForm.input"></textarea></div>
        <div class="preg-tootle-page-form-items">
          <label for="preg-str">正则表达式：</label>
          <input type="text" class="preg-str" v-model="pregForm.preg" placeholder="输入匹配正则表达式" />
          <span><input type="checkbox" v-model="pregForm.global">全局匹配</span>
          <span><input type="checkbox" v-model="pregForm.ignore">不区分大小写</span>
          <span><input type="checkbox" v-model="pregForm.multiline">多行匹配</span>
          <a href="javascript:void(0);" class="exec-but" @click="pregExecBut($event)">测试匹配</a>
        </div>
        <div class="preg-tootle-page-form-items"><textarea name="input-text" id="" cols="30" rows="10"
            style="background:#eee;" v-model="pregForm.result"></textarea></div>
        <div class="preg-tootle-page-form-items">
          <label for="">替换文本：</label>
          <input type="text" name="replace-str" class="replace-str" v-model="pregForm.replaceInput"
            placeholder="输入要替换的文本" />
          <a href="javascript:void(0);" class="replace-exec-but" @click="replaceExecBut($event)">替换</a>
        </div>
        <div class="preg-tootle-page-form-items"><textarea name="input-text" id="" cols="30" rows="10"
            style="background:#eee;" v-model="pregForm.replaceResult"></textarea></div>
      </div>
      <div class="preg-grammar-box">
        <div class="preg-grammar-header">正则表达语法：</div>
        <div class="preg-grammar-body">
          <p class="preg-grammar-items"><span>\d</span>匹配数字，等价[0-9]</p>
          <p class="preg-grammar-items"><span>\D</span>匹配非数字，等价[^0-9]</p>
          <p class="preg-grammar-items"><span>\s</span>匹配任何空白字符，等价[\n\f\r\t\v]</p>
          <p class="preg-grammar-items"><span>\S</span>匹配任何非空白字符[^\n\f\r\t\v]</p>
          <p class="preg-grammar-items"><span>\w</span>匹配任何单词字符(包括字母、数字、下划线)，等价于[a-zA-Z0-9_]</p>
          <p class="preg-grammar-items"><span>\W</span>匹配任何非单词字符，等价于[^a-zA-Z0-9_]</p>
          <p class="preg-grammar-items"><span>\b</span>匹配一个单词边界，也就是指单词和空格间的位置。 例如：er\b可以匹配”never”中的”er”，但不能匹配”verb”中的”er"</p>
          <p class="preg-grammar-items"><span>\B</span>匹配非单词边界。 例如：er\B可以匹配”verb”中的”er”，但不能匹配”never”中的”er”</p>
          <p class="preg-grammar-items"><span>+</span>匹配零次或一次，相当于{0,1}</p>
          <p class="preg-grammar-items"><span>?</span>匹配一次或多次，相当于{1,}</p>
          <p class="preg-grammar-items"><span>{n}</span>匹配n次</p>
          <p class="preg-grammar-items"><span>{n,}</span>匹配n次以上</p>
          <p class="preg-grammar-items"><span>{,n}</span>匹配最多n次</p>
          <p class="preg-grammar-items"><span>^</span>匹配开头</p>
          <p class="preg-grammar-items"><span>$</span>匹配结束</p>
          <p class="preg-grammar-items"><span>.</span>匹配除换行符之外的任意字符</p>
          <p class="preg-grammar-items"><span>*</span>匹配零次或多次，相当于{0,}</p>
          <p class="preg-grammar-items"><span>\n|\n\r</span>匹配linux/windows系统下的换行符</p>
          <p class="preg-grammar-items"><span>g</span>全局匹配</p>
          <p class="preg-grammar-items"><span>i</span>忽略大小写</p>
          <p class="preg-grammar-items"><span>m</span>匹配多行</p>
          <p class="preg-grammar-items"><span>[\u4e00-\u9fa5]</span>匹配中文字符的正则表达式</p>
          <p class="preg-grammar-items"><span>[^\x00-\xff]</span>匹配双字节字符(包括汉字在内)；中文也是双字节的字符</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PregTootl',
    data() {
      return {
        pregForm: {
          input: '',
          preg: '',
          result: '',
          global: true,
          ignore: false,
          multiline: false,
          replaceInput: '',
          replaceResult: ''
        }
      }
    },
    methods: {
      pregExecBut(e) {
        let modifiers = `${this.pregForm.global?'g':''}${this.pregForm.ignore?'i':''}${this.pregForm.multiline?'m':''}`;
        let regexp = new RegExp(this.pregForm.preg, modifiers)
        let result = regexp.exec(this.pregForm.input)
        // let result = this.pregForm.input.match(regexp)
        this.pregForm.result = result ? result[0] : '';
      },
      replaceExecBut(e) {
        let modifiers = `${this.pregForm.global?'g':''}${this.pregForm.ignore?'i':''}${this.pregForm.multiline?'m':''}`;
        let regexp = new RegExp(this.pregForm.preg, modifiers)
        this.pregForm.replaceResult = this.pregForm.input.replace(regexp, this.pregForm.replaceInput);
      }
    }
  }

</script>

<style>
  .preg-tootle-page {
    width: 100%;
    height: auto;
  }

  .preg-tootle-page-header {
    width: 100%;
    height: 70px;
    line-height: 70px;
    font-size: 20px;
    font-weight: bold;
    border-bottom: 1px solid #c1c1c1;
  }

  .preg-tootle-page-body {
    width: 100%;
    height: auto;
    margin: 30px 0 0 0;
  }

  .preg-tootle-page-form-box {
    width: 100%;
    height: auto;
  }

  .preg-tootle-page-form-items {
    width: 100%;
    height: auto;
    margin: 0 0 30px 0;
    overflow: hidden;
  }

  .preg-tootle-page-form-items textarea {
    display: block;
    width: 97.9%;
    height: 100px;
    padding: 1%;
    border: 1px solid #ccc;
    color: #555;
    border-radius: 4px;
    outline: none;
  }

  .preg-tootle-page-form-items label {
    display: block;
    float: left;
    width: 90px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-weight: bold;
    ;
  }

  .preg-tootle-page-form-items .preg-str,
  .preg-tootle-page-form-items .replace-str {
    display: block;
    float: left;
    width: 220px;
    height: 38px;
    line-height: 30px;
    padding: 0 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
    color: #555;
    outline: none;
  }

  .preg-tootle-page-form-items span {
    display: block;
    float: left;
    width: auto;
    height: 40px;
    line-height: 40px;
    padding: 0 5px;
    margin: 0 5px 0 0;
  }

  .preg-tootle-page-form-items .exec-but {
    display: block;
    float: left;
    width: 80px;
    height: 38px;
    line-height: 38px;
    text-align: center;
    background: #5cb85c;
    color: #fff;
    border: 1px solid #4cae4c;
    border-radius: 4px;
  }

  .replace-exec-but {
    display: block;
    float: left;
    width: 80px;
    height: 38px;
    line-height: 38px;
    text-align: center;
    background: #f0ad4e;
    color: #fff;
    border: 1px solid #eea236;
    border-radius: 4px;
    margin: 0 0 0 5px;
  }

  .preg-grammar-box {
    width: 100%;
    height: auto;
    border: 1px solid #ddd;
    border-radius: 4px 4px 0 0;
  }

  .preg-grammar-header {
    width: 99%;
    height: 40px;
    line-height: 40px;
    background: #f5f5f5;
    border-bottom: 1px solid #ddd;
    padding: 0 0 0 1%;
  }

  .preg-grammar-body {
    width: 100%;
    height: auto;
  }

  .preg-grammar-items {
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin: 0;
  }

  .preg-grammar-items span {
    margin: 0 20px;
  }

</style>
