const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    port: 8010,
    overlay: {
      warnings: false,
      errors: false
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080/api/', // 接口的域名
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: { '^/api': '' }
      }
    }
  },

  pages: {
    index: {
      entry: 'src/pages/oj/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title : 'hunnuoj',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    admin: 'src/pages/admin/main.js'
  },

  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/children'))
      .set('@oj', resolve('src/pages/oj'))
      .set('@admin', resolve('src/pages/admin'))
      .set("Assets", resolve('src/assets'))
      .set('Plugins', resolve('src/plugins'))
      .set('Style', resolve('src/style'))
      .set('Utils', resolve('src/utils'))
  },
  productionSourceMap: true,
  runtimeCompiler: true
}
