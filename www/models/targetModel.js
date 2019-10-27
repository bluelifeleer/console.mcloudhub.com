/*
* @Author: bluelife
* @Date:   2019-10-26 01:39:42
* @Last Modified by:   bluelife
* @Last Modified time: 2019-10-26 01:40:22
*/
const mongoose = require('mongoose');
const targetSchema = require('../schemas/targetSchema');
module.exports = mongoose.model('Target', targetSchema);