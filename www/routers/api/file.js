/*
 * @Author: lipeng
 * @Date:   2019-10-24 08:56:58
 * @Last Modified by:   bluelife
 * @Last Modified time: 2019-12-11 00:20:34
 */
const path = require('path');
const express = require('express');
const router = express.Router();
const sillyDateTime = require('silly-datetime');
const md5 = require('md5');
const utils = require('../../utils');
const User = require('../../models/userModel');
const Directory = require('../../models/directoryModel');
const File = require('../../models/fileModel');

let output = {}

router.use(function(req, res, next) {
  output = {
    code: 0,
    msg: '',
    ok: false,
    data: null
  };
  next();
});

router.get('/list', (req, res, next) => {
  let uid = req.query.uid
  let offset = parseInt(req.query.offset) || 1
  let nums = parseInt(req.query.nums) || 20
  File.countDocuments({
    uid: uid
  }, (err, count) => {
    File.find({
      uid: uid
    }).populate([{
      path: 'own',
      select: 'name'
    }, {
      path: 'directory',
      select: 'name'
    }]).skip(parseInt(nums * (offset - 1))).limit(nums).then(files => {
      if (files) {
        output = {
          code: 1,
          msg: 'SUCCESS',
          ok: true,
          data: {
            count: count,
            offset: offset,
            nums: nums,
            list: files
          }
        };
        res.json(output);
      }
    }).catch(err => {
      console.log(err)
    })
  })
})

router.get('/get', (req, res, next) => {
  let id = req.query.id
})

router.post('/upload', (req, res, next) => {
  let uid = req.body.uid
  let name = req.body.name
  let size = req.body.size
  let type = req.body.type
  let base64 = req.body.base64
  let lastModifyDate = req.body.lastModifyDate
  User.findById(uid).then(user => {
    if (user) {
      new File({
        uid: user._id,
        name: name,
        size: size,
        type: type,
        base64: base64,
        directory_id: '',
        own: user,
        directory: null,
        lastModifyDate: lastModifyDate,
        createTime: new Date(),
        modifyTime: new Date(),
        enable: false
      }).save().then(insert => {
        if (insert) {
          output = {
            code: 1,
            msg: 'SUCCESS',
            ok: true,
            data: null
          };
          res.json(output);
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }).catch(err => {
    console.log(err)
  })
})

router.get('/delete', (req, res, next) => {

})

module.exports = router;
