/*
 * @Author: lipeng
 * @Date:   2019-10-24 08:56:58
 * @Last Modified by:   lipeng
 * @Last Modified time: 2019-10-24 09:25:06
 */
const path = require('path');
const express = require('express');
const router = express.Router();
const Target = require('../../models/targetModel');

router.post('/signin', (req, res, next) => {
  console.log(res.body)
});

router.post('/register', (req, res, next) => {

});

router.post('/signout', (req, res, next) => {

});


module.exports = router;
