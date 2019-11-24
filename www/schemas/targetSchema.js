/*
 * @Author: lipeng
 * @Date:   2019-10-23 09:55:21
 * @Last Modified by:   bluelife
 * @Last Modified time: 2019-10-26 02:36:04
 */
const mongoose = require('mongoose');
module.exports = new mongoose.Schema({
  uid: String,
  index: Number,
  name: String,
  icon: String,
  enable: Boolean,
  desc: String,
  link: String,
  createTime: Date,
  modifyTime: Date,
  own: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
})