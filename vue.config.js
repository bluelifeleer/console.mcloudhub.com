module.exports = {
  lintOnSave: false,
  outputDir: 'dist/', // 设置编译后的输出目录
  indexPath: 'index.html', // 设置编译后输出的html文件名
  publicPath: '/', // 设置编译后的html文件中静态资源引用目录
  assetsDir: 'assets/', // 设置编译后的静态资源目录
  css: {
    sourceMap: true
  },
  devServer: {
    // host:'localhost',
    // port:8080
  }
}
