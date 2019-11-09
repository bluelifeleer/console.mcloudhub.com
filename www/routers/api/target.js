/*
 * @Author: bluelife
 * @Date:   2019-10-26 02:10:56
 * @Last Modified by:   bluelife
 * @Last Modified time: 2019-11-09 02:49:26
 */
const path = require('path');
const express = require('express');
const router = express.Router();
const Target = require('../../models/targetModel');
const User = require('../../models/userModel');
let output = {
  code: 0,
  msg: '',
  ok: false,
  data: null
}

router.get('/list', (req, res, next) => {
  Target.find({}).then(target => {
    output = {
      code: 1,
      msg: 'SUCCESS',
      ok: true,
      data: target
    };
    res.json(output);
  }).catch(err => {
    console.log(err)
  })
});

router.get('/get', (req, res, next) => {

});

router.post('/add', (req, res, next) => {
  let uid = req.body.uid;
  let name = req.body.name;
  let index = parseInt(req.body.index);
  let icon = req.body.icon;
  let link = req.body.link;
  let desc = req.body.desc;
  User.findById(uid).then(user => {
    if (user) {
      new Target({
        index: index,
        name: name,
        icon: icon,
        enable: true,
        desc: desc,
        link: link,
        createTime: new Date(),
        modifyTime: new Date(),
        own: user
      }).save().then(target => {
        if (target) {
          output = {
            code: 1,
            msg: 'SUCCESS',
            ok: true,
            data: {}
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
});

router.post('/modify', (req, res, next) => {

});

router.post('/delete', (req, res, next) => {

});

module.exports = router;
