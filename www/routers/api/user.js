/*
 * @Author: lipeng
 * @Date:   2019-10-24 08:56:58
 * @Last Modified by:   bluelife
 * @Last Modified time: 2019-11-10 09:41:34
 */
const path = require('path');
const express = require('express');
const router = express.Router();
const sillyDateTime = require('silly-datetime');
const md5 = require('md5');
const utils = require('../../utils');
const Target = require('../../models/targetModel');
const User = require('../../models/userModel');
let output = {
  code: 0,
  msg: '',
  ok: false,
  data: null
}

router.post('/signin', (req, res, next) => {
  let account = req.body.name;
  let password = req.body.password;
  let verifyCode = req.body.verifyCode;
  User.findOne({
    name: account
  }).then(user => {
    if (user) {
      if (user.password == md5(password + user.sale)) {
        let userInfo = {},
          key = '';
        res.cookie('uid', user._id, {
          maxAge: 1200000
        });
        res.cookie('name', user.name, {
          maxAge: 1200000
        });
        req.session.uid = user._id;
        req.session.name = user.name;
        output = {
          code: 1,
          msg: 'SUCCESS',
          ok: true,
          data: {
            _id: user._id,
            name: user.name,
            phone: user.phone,
            email: user.email,
            avatar: user.avatar
          }
        };
        res.json(output);
      } else {
        output = {
          code: 0,
          msg: 'ERROR',
          ok: false,
          data: null
        };
        res.json(output);
      }
    }
  }).catch(err => {
    console.log(err)
  })
});

router.post('/register', (req, res, next) => {
  let account = req.body.name;
  let password = req.body.password;
  let verifyCode = req.body.verifyCode;
  let sale = utils.sale();
  User.findOne({
    name: account
  }).then(user => {
    if (!user) {
      new User({
        name: account,
        password: md5(password + sale),
        sale: sale,
        avatar: '',
        email: '',
        phone: '',
        createTime: new Date(),
        enable: true
      }).save().then(userInsert => {
        if (userInsert) {
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
    } else {
      output = {
        code: 3,
        msg: '此用户已存在',
        ok: true,
        data: null
      };
      res.json(output);
    }
  }).catch(err => {
    console.log(err)
  });
});

router.post('/signout', (req, res, next) => {

});

router.get('/islogin', (req, res, next) => {
  output = {
    code: 1,
    msg: 'SUCCESS',
    ok: true,
    data: {
      islogin: (req.session.uid && req.session.name ? true : false)
    }
  };
  res.json(output);
})


module.exports = router;
