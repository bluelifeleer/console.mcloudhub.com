/*
 * @Author: lipeng
 * @Date:   2019-10-23 09:41:27
 * @Last Modified by:   lipeng
 * @Last Modified time: 2019-10-23 09:54:53
 */
const mongoose = require('mongoose');
module.exports = new mongoose.Schema({
	uid: String,
	title: String,
	html: String,
	markerDowm: String,
	createTime: Date,
	modifyTime: Date,
	delete: Boolean,
	own: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	keyNumbers: Number
});
