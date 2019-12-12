/*
 * @Author: lipeng
 * @Date:   2019-10-24 09:22:59
 * @Last Modified by:   bluelife
 * @Last Modified time: 2019-12-13 03:42:59
 */
const path = require('path');
const express = require('express');
const router = express.Router();
const Article = require('../../models/articleModel');
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
  let sort = req.query.sort;
  let nums = parseInt(req.query.nums) || 10;
  let key = req.query.key ? decodeURI(req.query.key) : '';
  let where = {
    uid: {
      $regex: uid
    },
    title: {
      $regex: key,
      $options: '$i'
    }
  };
  Article.countDocuments(where, (err, count) => {
    Article.find(where).populate([{
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
  Article.findById(id, 'uid title html markDown content targets createTime modifyTime').populate([{
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
        markDown: markDown,
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

router.post('/update', (req, res, next) => {
  let id = req.body._id;
  Article.findByIdAndUpdate(id, {
    title: req.body.title,
    html: req.body.html,
    markDown: req.body.markDown,
    content: req.body.content,
    targets: req.body.targets,
    modifyTime: new Date()
  }, {
    new: true,
    runValidators: true
  }).then(article => {
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
});

router.get('/delete', (req, res, next) => {
  let id = req.query.id;
  Article.findByIdAndRemove(id).then(status => {
    if (status) {
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
});

module.exports = router;
