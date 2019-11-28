/*
 * @Author: lipeng
 * @Date:   2019-10-23 09:41:47
 * @Last Modified by:   lipeng
 * @Last Modified time: 2019-10-23 09:47:17
 */
const mongoose = require('mongoose');
const fileSchema = require('../schemas/fileSchema');
module.exports = mongoose.model('File', fileSchema);
