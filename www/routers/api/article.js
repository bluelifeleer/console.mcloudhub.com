/*
 * @Author: lipeng
 * @Date:   2019-10-24 09:22:59
 * @Last Modified by:   bluelife
 * @Last Modified time: 2019-10-26 02:11:34
 */
const path = require('path');
const express = require('express');
const router = express.Router();
const Article = require('../../models/articleModel');

router.get('/list', (req, res, next) => {
	
});

router.get('/get', (req, res, next) => {

});

router.get('/add', (req, res, next) => {
	console.log(req.body)
});

router.get('/modify', (req, res, next) => {

});

router.get('/delete', (req, res, next) => {

});

module.exports = router;
