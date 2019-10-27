/*
 * @Author: lipeng
 * @Date:   2019-10-24 09:22:59
 * @Last Modified by:   bluelife
 * @Last Modified time: 2019-10-26 02:11:34
 */
const path = require('path');
const express = require('express');
const router = express.Router();
const svgCaptcha = require('svg-captcha');

router.get('/verifyCode', (res, req, next) => {
  var captcha = svgCaptcha.create({
    width: 150, // width of captcha
    height: 50, // height of captcha
    fontSize: 50, // captcha text size
    // charPreset: string, // random character preset
    size: 4, // 验证码长度
    ignoreChars: '0o1i', // 验证码字符中排除 0o1i
    noise: 1, // 干扰线条的数量
    color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
    background: '#cc9966' // 验证码图片背景颜色
  });
  req.session.verify_code = captcha.text;
  res.type('svg');
  res.status(200).send(captcha.data);
})

module.exports = router;