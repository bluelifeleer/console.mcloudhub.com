/*
 * @Author: lipeng
 * @Date:   2019-10-23 09:41:59
 * @Last Modified by:   lipeng
 * @Last Modified time: 2019-10-23 09:47:58
 */
const mongoose = require('mongoose');
const articleSchema = require('../schemas/articleSchema');
module.exports = mongoose.model('Article', articleSchema);
