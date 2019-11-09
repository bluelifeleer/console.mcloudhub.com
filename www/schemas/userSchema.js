/*
 * @Author: lipeng
 * @Date:   2019-10-23 09:41:15
 * @Last Modified by:   lipeng
 * @Last Modified time: 2019-10-23 09:59:53
 */
const mongoose = require('mongoose');
module.exports = new mongoose.Schema({
  name: String,
  password: String,
  sale: String,
  avatar: String,
  email: String,
  phone: String,
  createTime: Date,
  enable: Boolean
});
