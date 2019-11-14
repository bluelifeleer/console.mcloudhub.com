/*
 * @Author: bluelife
 * @Date:   2019-11-10 03:34:03
 * @Last Modified by:   bluelife
 * @Last Modified time: 2019-11-10 03:34:48
 */
const mongoose = require('mongoose');
const activeSchema = require('../schemas/activeSchema');
module.exports = mongoose.model('Active', activeSchema);
