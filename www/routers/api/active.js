/*
 * @Author: bluelife
 * @Date:   2019-11-10 03:33:01
 * @Last Modified by:   bluelife
 * @Last Modified time: 2019-12-11 00:20:21
 */
const path = require('path');
const express = require('express');
const router = express.Router();
const Active = require('../../models/activeModel');
const User = require('../../models/userModel');
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
  let uid = req.query.uid;
  let offset = parseInt(req.query.offset) || 1;
  let nums = parseInt(req.query.nums) || 20;
  let sort = req.query.sort;
  Active.countDocuments({
    uid: uid
  }, (err, count) => {
    Active.find({
        uid: uid
      },
      'companyName projectName projectUrl projectDir name desc url own createTime modifyTime').populate([{
      path: 'own',
      select: 'name'
    }]).skip(parseInt(nums * (offset - 1))).limit(nums).then(actives => {
      if (actives) {
        output = {
          code: 1,
          msg: 'SUCCESS',
          ok: true,
          data: {
            offset: offset,
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
  let id = req.query.id;
  Active.findByIdAndRemove(id).then(status => {
    if (status) {
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

router.post('/update', (req, res, next) => {
  let id = req.body.id;
  Active.findByIdAndUpdate(id, {
    companyName: req.body.companyName,
    projectName: req.body.projectName,
    projectUrl: req.body.projectUrl,
    projectDir: req.body.projectDir,
    name: req.body.name,
    url: req.body.url,
    desc: req.body.desc,
    modifyTime: new Date()
  }).then(update => {
    if (update) {
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
