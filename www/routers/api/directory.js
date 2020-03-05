/*
 * @Author: bluelife
 * @Date:   2019-12-16 22:45:10
 * @Last Modified by:   bluelife
 * @Last Modified time: 2019-12-17 00:42:57
 */
const path = require('path');
const express = require('express');
const router = express.Router();
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

})

router.get('/get', (req, res, next) => {

})

router.get('/delete', (req, res, next) => {

})

router.post('/update', (req, res, next) => {

})

function getPromise(id) {
  if (id) {
    return File.findById(id)
  } else {
    return new Promise((resolve, reject) => {
      resolve(null);
      reject("failure reason");
    })
  }
}

router.post('/add', (req, res, next) => {
  let uid = req.body.uid;
  let name = req.body.name;
  let parentId = req.body.parentId;
  (parentId ? (File.findById(parentId)) : (new Promise((resolve, reject) => {
    resolve(null);
    reject("failure reason");
  }))).then(obj => {
    User.findById(uid).then(user => {
      if (user) {
        new Directory({
          uid: user._id,
          name: name,
          link: utils.getRandomString(32),
          parentId: obj ? obj._id : '',
          own: user,
          parent: obj ? obj : null,
          createTime: new Date(),
          modifyTime: new Date(),
          enable: false
        }).save().then(dir => {
          if (dir) {
            if (obj) {
              obj.directory.push(dir)
              obj.save().then(file => {
                if (file) {
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
            } else {
              new File({
                uid: user._id,
                name: name,
                size: 0,
                type: 'directory',
                base64: '',
                own: user,
                parent_id: '',
                directory: [],
                lastModifyDate: 0,
                createTime: new Date(),
                modifyTime: new Date(),
                enable: false
              }).save().then(file => {
                if (file) {
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
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }).catch(err => {
    console.log(err)
  })
})

module.exports = router;
