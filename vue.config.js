const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const IS_PROD = ['production', 'prod'].includes(process.env.VUE_APP_BASE_API)
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i

module.exports = {
  publicPath: IS_PROD ? process.env.VUE_APP_SRC || '/' : './', // 默认'/'，部署应用包时的基本 URL
  outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  assetsDir: '', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: false, // 生产环境的 source map
  parallel: require('os').cpus().length > 1,
  pwa: {},
  devServer: {
    // overlay: {
    //   warnings: true,
    //   errors: true
    // },
    open: IS_PROD,
    host: '0.0.0.0',
    port: 8000,
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_API || 'http://localhost:8000',
        changeOrigin: true
      }
    }
  }
}
