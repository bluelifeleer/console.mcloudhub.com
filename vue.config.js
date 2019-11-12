const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
  lintOnSave: false,
  outputDir: 'www/views/', // 设置编译后的输出目录
  indexPath: 'index.html', // 设置编译后输出的html文件名
  publicPath: '/', // 设置编译后的html文件中静态资源引用目录
  assetsDir: 'assets/', // 设置编译后的静态资源目录
  css: {
    sourceMap: true
  },
  devServer: {
    // host:'localhost',
    // port:8080
  },
  // 插件选项
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  },
  // webpack配置
  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin()]
  },
  //警告 webpack 的性能提示
  performance: {
    hints: 'warning',
    //入口起点的最大体积
    maxEntrypointSize: 50000000,
    //生成文件的最大体积
    maxAssetSize: 30000000,
    //只给出 js 文件的性能提示
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.js');
    }
  }
}
