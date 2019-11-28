/*
 * @Author: lipeng
 * @Date:   2019-10-23 09:41:15
 * @Last Modified by:   lipeng
 * @Last Modified time: 2019-10-23 09:59:53
 */
const mongoose = require('mongoose');
module.exports = new mongoose.Schema({
  uid: String,
  name: String,
  size: String,
  type: String,
  base64: String,
  parentId:String,
  own:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  parent:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Directory',
  },
  createTime: Date,
	modifyTime: Date,
  enable: Boolean
});
