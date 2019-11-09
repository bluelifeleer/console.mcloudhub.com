/*
 * @Author: lipeng
 * @Date:   2019-10-24 09:22:59
 * @Last Modified by:   bluelife
 * @Last Modified time: 2019-11-09 13:54:45
 */
const path = require('path');
const express = require('express');
const router = express.Router();
const Article = require('../../models/articleModel');
const User = require('../../models/userModel');
let output = {
  code: 0,
  msg: '',
  ok: false,
  data: null
}

router.get('/list', (req, res, next) => {
  let uid = req.query.uid;
  let offset = parseInt(req.query.offset) || 1;
  let sort = req.query.sort;
  let nums = parseInt(req.query.nums) || 10;
  Article.countDocuments({
    uid: uid
  }, (err, count) => {
    Article.find({
      uid: uid
    }).populate([{
      path: 'own',
      select: 'name'
    }, {
      path: 'targets',
      select: 'name'
    }]).skip(parseInt(nums * (offset - 1))).limit(nums).then(articles => {
      if (articles) {
        output = {
          code: 1,
          msg: 'SUCCESS',
          ok: true,
          data: {
            count: count,
            offset: offset,
            nums: nums,
            list: articles
          }
        };
        res.json(output);
      }
    }).catch(err => {
      console.log(err)
    })
  })

});

router.get('/get', (req, res, next) => {
  let id = req.query.id;
  Article.findById(id).populate([{
    path: 'own',
    select: 'name'
  }, {
    path: 'targets',
    select: 'name'
  }]).then(article => {
    if (article) {
      output = {
        code: 1,
        msg: 'SUCCESS',
        ok: true,
        data: article
      };
      res.json(output);
    }
  }).catch(err => {
    console.log(err)
  })
});

router.post('/add', (req, res, next) => {
  let uid = req.body.uid;
  let title = req.body.title;
  let content = req.body.content;
  let html = req.body.html;
  let markDown = req.body.markDown;
  let targets = req.body.targets;
  User.findById(uid).then(user => {
    if (user) {
      new Article({
        uid: user._id,
        title: title,
        html: html,
        markDowm: markDown,
        content: content,
        createTime: new Date(),
        modifyTime: new Date(),
        delete: false,
        own: user,
        targets: targets,
        keyNumbers: 0
      }).save().then(article => {
        if (article) {
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

router.get('/modify', (req, res, next) => {

});

router.get('/delete', (req, res, next) => {

});

module.exports = router;
