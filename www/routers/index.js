'use strict';

const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('../views/index.html', {
    title: 'index'
  });
});

module.exports = router;
