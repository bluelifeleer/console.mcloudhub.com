<template>
  <div class="finance-page">
    <div class="finance-page-hrader">
      <span>财务详情</span>
      <a href="javascript:void(0);" class="add-item-but" @click="addItemBut($event)">添加记录</a>
    </div>
    <div class="finance-page-body"></div>
    <div class="add-item-dialog" v-if="addItemDialog">
      <div class="add-item-dialog-marker" @click="addItemDialog=false"></div>
      <div class="add-item-dialog-box">
        <div class="add-item-dialog-header">
          <span>添加详情</span>
          <a href="javascript:void(0);" class="add-item-dialog-close-but" @click="addItemDialogCloseBut($event)"><i class="icon iconfont add-item-dialog-close-icon">&#xe60b;</i></a>
        </div>
        <div class="add-item-dialog-body">
          <div class="add-item-form">
            <div class="add-item-form-items">
              <label for="name">消费名称：</label>
              <input type="text" name="name" id="name" placeholder="" value="" v-model="addItemForm.name" />
            </div>
            <div class="add-item-form-items">
              <label for="type">消费类型：</label>
              <select name="type" id="type" v-model="addItemForm.type">
                <option v-for="(option,$index) in options" :key="$index" :value="option.value">{{option.text}}
                </option>
              </select>
            </div>
            <div class="add-item-form-items">
              <label for="">消费日期：</label>
              <div class="dateitem-selector-box">
                <el-date-picker v-model="addItemForm.dateTime" type="datetime" placeholder="选择日期时间" align="right" :picker-options="pickerOptions" size="large">
                </el-date-picker>
              </div>
            </div>
            <div class="add-item-form-items">
              <label for="amount">消费金额：</label>
              <input type="text" name="amount" id="amount" placeholder="" value="" v-model="addItemForm.amount" />
            </div>
            <div class="add-item-form-items">
              <label for="remark">备注：</label>
              <textarea name="remark" id="remark" cols="30" rows="10" v-model="addItemForm.remark"></textarea>
            </div>
          </div>
        </div>
        <div class="add-item-dialog-footer">
          <a href="javascript:void(0);" class="add-item-form-cancle-but">取消</a>
          <a href="javascript:void(0);" class="add-item-form-submit-but">保存</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FinanceList',
  data() {
    return {
      addItemDialog: false,
      options: [{
        value: '1',
        text: '吃饭',
        selected: false
      }, {
        value: '2',
        text: '坐车',
        selected: false
      }, {
        value: '3',
        text: '交际',
        selected: false
      }, {
        value: '4',
        text: '购物',
        selected: false
      }, {
        value: '5',
        text: '房租',
        selected: false
      }, {
        value: '6',
        text: '水费',
        selected: false
      }, {
        value: '7',
        text: '电费',
        selected: false
      }, {
        value: '8',
        text: '宽带费用',
        selected: false
      }, {
        value: '9',
        text: '手机缴费',
        selected: false
      }],
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      addItemForm: {
        dataTime: '',
        name: '',
        amount: 0,
        remark: '',
        type: 1
      }
    }
  },
  created() {},
  methods: {
    addItemBut(e) {
      this.addItemDialog = !this.addItemDialog;
    },
    addItemDialogCloseBut(e) {
      this.addItemDialog = !this.addItemDialog;
    }
  },
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem('userInfo'));
  }
}

</script>
<style>
.finance-page {
  width: 100%;
  height: auto;
}

.finance-page-hrader {
  width: 100%;
  height: 70px;
  border-bottom: 1px solid #c1c1c1;
  position: relative;
}

.finance-page-hrader span {
  display: block;
  float: left;
  width: 50%;
  height: 70px;
  line-height: 70px;
  font-size: 20px;
  font-weight: bold;
}

.add-item-but {
  display: block;
  width: 120px;
  height: 38px;
  line-height: 38px;
  text-align: center;
  border: 1px solid #5d9d3e;
  border-radius: 5px;
  background: #5d9d3e;
  color: #fff;
  position: absolute;
  right: 0;
  top: 15px;
}

.finance-page-body {
  width: 100%;
  height: auto;
}

.add-item-dialog-marker {
  width: 100%;
  height: 100%;
  background: #000;
  opacity: .4;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
}

.add-item-dialog-box {
  width: 40%;
  height: auto;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

.add-item-dialog-header {
  width: 100%;
  height: auto;
  border-bottom: 1px solid #ccc;
}

.add-item-dialog-header {
  position: relative;
}

.add-item-dialog-header span {
  display: block;
  width: 50%;
  height: 60px;
  line-height: 60px;
  padding: 0 0 0 2%;
  ;
}

.add-item-dialog-close-but {
  width: 30px;
  height: 30px;
  position: absolute;
  right: 15px;
  top: 15px;
}

.add-item-dialog-close-but .add-item-dialog-close-icon {
  display: block;
  width: 100%;
  height: 100%;
  line-height: 100%;
  text-align: center;
  font-size: 30px;
  color: #555;
}

.add-item-dialog-body {
  width: 96%;
  padding: 5% 2% 0 2%;
}

.add-item-form {
  width: 100%;
  height: auto;
}

.add-item-form-items {
  width: 100%;
  height: auto;
  margin: 0 0 30px 0;
  position: relative;
  overflow: hidden;
}

.add-item-form-items label {
  display: block;
  float: left;
  width: 120px;
  height: 40px;
  line-height: 40px;
  text-align: right;
}

.add-item-form-items input {
  display: block;
  float: left;
  width: 49%;
  height: 38px;
  line-height: 38px;
  border: 1px solid #ccc;
  color: #555;
  border-radius: 5px;
  padding: 0 0 0 1%;
  outline: none;
}

.add-item-form-items .dateitem-selector-box {
  display: block;
  float: left;
  width: 50%;
  height: 38px;
}

.el-date-editor .el-input {
  width: 100% !important;
}

.el-date-editor .el-input__inner {
  width: 100% !important;
}

.add-item-form-items select {
  display: block;
  float: left;
  width: 50%;
  height: 38px;
  line-height: 38px;
  border: 1px solid #ccc;
  color: #555;
  border-radius: 5px;
  padding: 0 0 0 1%;
  outline: none;
}

.add-item-form-items textarea {
  display: block;
  float: left;
  width: 46%;
  height: 68px;
  padding: 2%;
  border: 1px solid #ccc;
  color: #555;
  border-radius: 5px;
  outline: none;
}

.add-item-dialog-footer {
  width: 100%;
  height: auto;
  text-align: center;
}

.add-item-form-submit-but {
  display: inline-block;
  width: 80px;
  height: 38px;
  line-height: 38px;
  text-align: center;
  color: #fff;
  background: #5d9d3e;
  border: 1px solid #5d9d3e;
  border-radius: 5px;
  margin: 0 30px 30px 0;
}

.add-item-form-cancle-but {
  display: inline-block;
  width: 80px;
  height: 38px;
  line-height: 38px;
  text-align: center;
  color: #ddd;
  background: #fff;
  border-radius: 5px;
  border: 1px solid #fff;
  margin: 0 30px 30px 0;
}

</style>
