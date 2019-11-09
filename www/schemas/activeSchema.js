/*
 * @Author: bluelife
 * @Date:   2019-11-10 03:27:58
 * @Last Modified by:   bluelife
 * @Last Modified time: 2019-11-10 03:38:40
 */
const mongoose = require('mongoose');
module.exports = new mongoose.Schema({
  uid: String,
  companyName: String,
  projectName: String,
  projectUrl: String,
  projectDir: String,
  name: String,
  desc: String,
  url: String,
  own: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  enable: Boolean,
  createTime: Date,
  modifyTime: Date
});
