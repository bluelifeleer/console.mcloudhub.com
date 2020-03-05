/*
 * @Author: lipeng
 * @Date:   2019-10-23 09:41:15
 * @Last Modified by:   bluelife
 * @Last Modified time: 2019-12-17 00:42:17
 */
const mongoose = require('mongoose');
module.exports = new mongoose.Schema({
  uid: String,
  name: String,
  size: String,
  type: String,
  base64: String,
  own: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  parent_id: String,
  directory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Directory',
  }],
  lastModifyDate: Number,
  createTime: Date,
  modifyTime: Date,
  enable: Boolean
});
