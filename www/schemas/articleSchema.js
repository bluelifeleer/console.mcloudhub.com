/*
 * @Author: lipeng
 * @Date:   2019-10-23 09:41:27
 * @Last Modified by:   bluelife
 * @Last Modified time: 2019-11-12 01:06:17
 */
const mongoose = require('mongoose');
module.exports = new mongoose.Schema({
  uid: String,
  title: String,
  html: String,
  markDown: String,
  content: String,
  createTime: Date,
  modifyTime: Date,
  delete: Boolean,
  own: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  targets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Target'
  }],
  keyNumbers: Number
});
