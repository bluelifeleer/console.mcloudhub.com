/*
 * @Author: bluelife
 * @Date:   2019-11-10 03:33:01
 * @Last Modified by:   bluelife
 * @Last Modified time: 2019-11-10 03:57:25
 */
const path = require('path');
const express = require('express');
const router = express.Router();
const Active = require('../../models/activeModel');
const User = require('../../models/userModel');
let output = {
  code: 0,
  msg: '',
  ok: false,
  data: null
}

router.get('/list', (req, res, next) => {
  let uid = req.query.uid;
  let offset = parseInt(req.query.offset);
  let nums = parseInt(req.query.nums);
  let sort = req.query.sort;
  Active.countDocuments({
    uid: uid
  }, (err, count) => {
    Active.find({
      uid: uid
    }).populate([{
      path: 'own',
      select: 'name'
    }]).skip(parseInt(nums * (offset - 1))).limit(nums).then(actives => {
      if (actives) {
        output = {
          code: 1,
          msg: 'SUCCESS',
          ok: true,
          data: {
            offset: offSet,
            nums: nums,
            sort: sort,
            count: count,
            list: actives
          }
        };
        res.json(output);
      }
    }).catch(err => {
      console.log(err)
    })
  });
});

router.get('/get', (req, res, next) => {
  let id = req.query.id;
  Active.findById(id).populate([{
    path: 'own',
    select: 'name'
  }]).then(active => {
    if (active) {
      output = {
        code: 1,
        msg: 'SUCCESS',
        ok: true,
        data: active
      };
      res.json(output);
    }
  }).catch(err => {
    console.log(err)
  })
});

router.get('/delete', (req, res, next) => {

});

router.post('/update', (req, res, next) => {

});

router.post('/add', (req, res, next) => {
  let uid = req.body.uid;
  User.findById(uid).then(user => {
    if (user) {
      new Active({
        uid: user._id,
        companyName: req.body.companyName,
        projectName: req.body.projectName,
        projectUrl: req.body.projectUrl,
        projectDir: req.body.projectDir,
        name: req.body.name,
        url: req.body.url,
        desc: req.body.desc,
        own: user,
        createTime: new Date(),
        modifyTime: new Date()
      }).save().then(active => {
        if (active) {
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

module.exports = router;
