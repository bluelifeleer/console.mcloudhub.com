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
  console.log(req.query)
  let uid = req.query.uid;
  let offset = parseInt(req.query.offset)||1;
  let nums = parseInt(req.query.nums)||20;
  let sort = req.query.sort;
  Target.countDocuments({
    uid:uid
  },(err,count)=>{
    if(count){
      Target.find({uid:uid},'index name icon link desc createTime modifyTime').populate([{
        path: 'own',
        select: 'name'
      }]).skip(parseInt(nums * (offset - 1))).limit(nums).then(targets => {
        if(targets){
          output = {
            code: 1,
            msg: 'SUCCESS',
            ok: true,
            data: {
              count:count,
              offset:offset,
              nums:nums,
              sort:sort,
              list:targets
            }
          };
          res.json(output);
        }
      }).catch(err => {
        console.log(err)
      })
    }else{
      console.log(err);
    }
  })
});

router.get('/get', (req, res, next) => {
  console.log(req.query)
  let id = req.query.id;
  Target.findById(id,'index name icon link desc createTime modifyTime').populate([{
        path: 'own',
        select: 'name'
      }]).then(target=>{
    if(target){
      output = {
        code: 1,
        msg: 'SUCCESS',
        ok: true,
        data: {
          count:count,
          offset:offset,
          nums:nums,
          sort:sort,
          list:targets
        }
      };
      res.json(output);
    }
  }).catch(err=>{
    console.log(err);
  })
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
        uid:user._id,
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

router.post('/update', (req, res, next) => {
  let id = req.body._id
  Target.findByIdAndUpdate(id,{
    index: parseInt(req.body.index),
    name: req.body.name,
    icon: req.body.icon,
    desc: req.body.desc,
    link: req.body.link,
    modifyTime: new Date(),
  },{
    new: true,
    runValidators: true
  }).then(target => {
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
});

router.get('/delete', (req, res, next) => {
  let id = req.query.id;
  Target.findByIdAndRemove(id).then(status=>{
    if(status){
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
