const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(baseConfig, {
  mode: 'development',
  // 仅在报错时提示
  stats: "errors-only",
  devServer: {
    port: '8080',
    hot: true, // 热更新
    historyApiFallback: true,
    compress: true  // 为静态文件开启gzip
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Vue App',
      template: './public/index.html',
      inject: 'body'
    })
  ]
})
