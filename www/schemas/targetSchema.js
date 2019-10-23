/*
 * @Author: lipeng
 * @Date:   2019-10-23 09:55:21
 * @Last Modified by:   lipeng
 * @Last Modified time: 2019-10-23 09:58:38
 */
const mongoose = require('mongoose');
module.exports = new mongoose.Schema({
	index: Number,
	text: String,
	icon: String,
	enable: Boolean,
	value: String,
	link: String,
	createTime: Date,
	modifyTime: Date,
	own: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	}
})
