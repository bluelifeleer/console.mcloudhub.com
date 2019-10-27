/*
* @Author: bluelife
* @Date:   2019-10-26 02:10:56
* @Last Modified by:   bluelife
* @Last Modified time: 2019-10-26 02:35:25
*/
const path = require('path');
const express = require('express');
const router = express.Router();
const Target = require('../../models/targetModel');

router.get('/list', (req, res, next) => {
	
});

router.get('/get', (req, res, next) => {

});

router.post('/add', (req, res, next) => {
	console.log(req.body)
});

router.post('/modify', (req, res, next) => {

});

router.post('/delete', (req, res, next) => {

});

module.exports = router;