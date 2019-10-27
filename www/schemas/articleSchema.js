/*
 * @Author: lipeng
 * @Date:   2019-10-23 09:41:27
 * @Last Modified by:   bluelife
 * @Last Modified time: 2019-10-26 01:41:07
 */
const mongoose = require('mongoose');
module.exports = new mongoose.Schema({
	uid: String,
	title: String,
	html: String,
	markDowm: String,
	createTime: Date,
	modifyTime: Date,
	delete: Boolean,
	own: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	targets:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Target'
	}],
	keyNumbers: Number
});
