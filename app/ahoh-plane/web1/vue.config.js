const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    externals: {
      // 确保排除所有Node.js模块
      'express': 'commonjs express',
      'body-parser': 'commonjs body-parser',
      'cors': 'commonjs cors'
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser'
      })
    ],
    resolve: {
      fallback: {
        "fs": false,
        "path": require.resolve("path-browserify"),
        "stream": require.resolve("stream-browserify"),
        "util": require.resolve("util/"),
        "url": require.resolve("url/"),
        "http": require.resolve("stream-http"),
        "net": false,
        "querystring": require.resolve("querystring-es3"),
        "crypto": require.resolve("crypto-browserify"),
        "zlib": require.resolve("browserify-zlib"),
        // 新增 assert 配置
        "assert": require.resolve("assert/"),
        "process": require.resolve("process/browser")
      }
    }
  }
})
