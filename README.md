# console.mcloudhub.com

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### node express使用gzip压缩

* 安装compression模块

```
npm install compression
```

* 使用compression模块

```
const compression = require('compression');
app.use(compression()) 	// 调用compression方法，要在其他中间件之前调用
```

### vue-cli4 webpack-bundle-analyzer

### mavonEditor 支持vue的markerDown

[https://github.com/hinesboy/mavonEditor/blob/HEAD/README-EN.md](https://github.com/hinesboy/mavonEditor/blob/HEAD/README-EN.md 'https://github.com/hinesboy/mavonEditor/blob/HEAD/README-EN.md')

### 关于服务器启动

> 由于项目设置服务器视图文件views中的文件不上传github，所以在克隆完代码后，安装所有依赖，然后执行npm run build打包编译出views目录，然后执行node index.js，由于最后版node要监听小于1000的端口需要使用管理员权限，在window使用管理员启动cms，再执行node index.js；在linux系统中真是直接使用sudo node index.js；如果安装了pm2可以直接使用pm2启动，sudo pm2 start ecosystem.config.js。