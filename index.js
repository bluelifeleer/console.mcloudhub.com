/*
 * @Author: bluelife
 * @Date:   2019-10-10 23:41:42
 * @Last Modified by:   bluelife
 * @Last Modified time: 2020-05-07 14:20:50
 */
'use tsrict'
const os = require('os')
const path = require('path')
const fs = require('fs')
const express = require('express')
const ejs = require('ejs')
const assert = require('assert')
const favicon = require('serve-favicon')
const morgan = require('morgan')
const rfs = require('rotating-file-stream')
const http = require('http')
const https = require('https')
// 引入http2模块
const http2 = require('spdy')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const cors = require('cors')
const csurf = require('csurf')
const helmet = require('helmet')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const bodyParser = require('body-parser')
const sillyDateTime = require('silly-datetime')
const uuidv4 = require('uuid/v4')
const expressRequestId = require('express-request-id')()
const md5 = require('md5')
const app = express()
const history = require('connect-history-api-fallback')
const platform = os.platform()
const compression = require('compression')
const credentials = require('./credentials.js')
// 是否启动记录访问日志
const STARTLOG = true
const options = {
  key: fs.readFileSync(path.join(__dirname + '/ssl/console.mcloudhub.com.key')),
  cert: fs.readFileSync(path.join(__dirname + '/ssl/console.mcloudhub.com.pem'))
}
// 设置模板引擎
app.set('views', path.join(__dirname, '/www/views'))
app.set('view engine', 'ejs')
app.engine('html', ejs.renderFile)
// 启动gzip压缩
app.use(compression())
app.use(helmet())
// 设置跨域
app.use(cors())
// 设置request id
app.use(expressRequestId)
// extends设置true表示接收的数据是数组，false表示是字符串
app.use(bodyParser.urlencoded({
  extended: true
}))
// 将提交的数据转成json,并且设置请求实体大小
app.use(bodyParser.json({
  limit: '50mb'
}))
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}))
app.use(cookieParser(credentials.cookieSecret, {
  maxAge: 1800000,
  secure: false, // 设置cookie只通过安全连接(HTTPS)发送
  httpOnly: true // 设置cookie 只能由服务器修改。也就是说客户端JavaScript不能修改它。这有助于防范XSS 攻击。
}))

const store = new MongoDBStore({
  uri: 'mongodb://bluelife:91732810802745ab0ae1ebef2d4adcab@120.24.20.48:27017/workdata',
  databaseName: 'workdata',
  collection: 'sessions'
}, err => {
  if (err) throw err;
});

store.on('error', error => {
  assert.ifError(error);
  assert.ok(false);
});
app.use(session({
  genid: function(req) {
    return uuidv4() // use UUIDs for session IDs
  },
  secret: credentials.cookieSecret, // 与cookieParser中的一致
  resave: true, // 设置强制刷新session
  store: store, // 将session保存到mongodb中
  saveUninitialized: false, // 是否保存未初始化的会话，如果是true则会保存许多session会导致保存有效session失败,一般设置为false.
  cookie: {
    secure: false,
    maxAge: 1800000,
    httpOnly: true
  },
  rolling: true
}));

// 服务器启动时默认配置/动作
app.use(function(req, res, next) {
  // 将登录后的用户信息附加到request头信息中
  if (req.cookies.uid && req.cookies.uid != '') {
    try {
      req.session.uid = req.cookies.uid
    } catch (e) {
      console.log(e)
    }
  }
  // 将系统类型添加到cookies和请求头中;
  // os.platform return now node runing systems : darwin=>MAC win32=>windows
  res.cookie('platform', os.platform)
  req.platform = os.platform
  next()
})

app.use(csurf({
  cookie: true,
  ignoreMethods: ['GET', 'POST']
}))
app.use(function(err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)
  // handle CSRF token errors here
  res.status(403)
  res.send('form tampered with')
})

// 记录访问日志
if (STARTLOG) {
  const logDirectory = path.join(__dirname, 'logs')
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory) // 日志目录不存在创建目录
  const logerFile = 'access_' + sillyDateTime.format(new Date(), 'YYYY_MMM_DD') + '.log'
  const accessLogStream = rfs(logerFile, {
    interval: '1d', // 日志切割间隔为1天，以s,m,h,d为单位
    path: logDirectory, // 日志保存路径，
    size: '1M', // 单个日志文件的大小，以B,K,M,G为单位
    compress: true // 压缩日志
  })
  app.use(morgan('combined', {
    stream: accessLogStream
  }))
}

// 设置vue使用history模式
app.use(history({
  // verbose: true,
  index: path.join(__dirname, '/www/views', 'index.html'),
  htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
  rewrites: [{
    from: /\//,
    to: '/'
  }]
}))

// 设置网站ico
app.use(favicon(path.join(__dirname, '/www/views', 'favicon.ico')))
// 设置静态资源文件
app.use('/assets', express.static(path.join(__dirname, '/www/views/assets')))
// 定义路由
app.use('/', require(path.join(__dirname, '/www/routers/index')))
app.use('/api/user', require(path.join(__dirname, '/www/routers/api/user')))
app.use('/api/article', require(path.join(__dirname, '/www/routers/api/article')))
app.use('/api/active', require(path.join(__dirname, '/www/routers/api/active')))
app.use('/api/target', require(path.join(__dirname, '/www/routers/api/target')))
app.use('/api/active', require(path.join(__dirname, '/www/routers/api/active')))
app.use('/api/file', require(path.join(__dirname, '/www/routers/api/file')))
app.use('/api/directory', require(path.join(__dirname, '/www/routers/api/directory')))
app.use('/captcha', require(path.join(__dirname, '/www/routers/api/captcha')))



mongoose.connect('mongodb://bluelife:91732810802745ab0ae1ebef2d4adcab@120.24.20.48:27017/workdata', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}, (err, res) => {
  if (err) {
    debug(err);
  } else {
    // 数据库连接成功后监听80/443端口
    // app.listen(80);
    http.createServer(app).listen(1003)
    // https.createServer(options, app).listen(443);
    const server = http2.createServer(options, app);
    // server.listen(443);
  }
});

module.exports = app
