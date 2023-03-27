const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const TerserWebpackPlugin = require('terser-webpack-plugin')

const glob = require('glob')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')

const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 打包分析
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = merge(baseConfig, {
  mode: 'production',
  // 优化
  optimization: {
    // 导入模块时，分析模块中哪些函数有被使用，哪些函数没有被使用
    // usedExports: true, // 默认开启

    // runtime的代码是否抽取到单独的包中
    runtimeChunk: {
      name: 'runtime'
    },
    
    // 分包插件：SplitChunksPlugin
    splitChunks: {
      // 默认值是async
      chunks: 'all',
      // 当一个包大于指定包的大小时，继续进行拆包
      // maxSize: 20000,
      // // 将包拆分成不小于minSize的包
      // minSize: 10000

      // 自己对需要进行拆包的内容进行分包
      cacheGroups: {
        // 提取公用代码
        vendors: {
          // 匹配路径，window /\ mac /
          test: /[\\/]node_modules[\\/]/,
          filename: 'js/[id]-vendors.[chunkhash:8].js'
        },
      }
    },

    // 用于告知webpack使用TerserWebpackPlugin
    minimize: true,
    minimizer: [
      // js压缩
      new TerserWebpackPlugin({
        // 不抽取第三方库中的注释
        extractComments: false,
        // 压缩丑化配置
        terserOptions: {
          compress: {
            // 生产环境去除console
            drop_console: true,
            drop_debugger: true
          }
        }
      }),
      // css 压缩
      new CSSMinimizerPlugin()
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Vue App',
      template: './public/index.html',
      cache: true,  // 只有当文件改变时，才会生成新的文件（默认值也是true）
      inject: 'body', // 打包出来的那个js文件，放置在生成的body标签内
      // 移除注释
      removeComments: true,
      // 折叠空格
      collapseWhitespace: true
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          // 从哪个文件
          from: "public",
          // 到哪个文件，当前打包的文件夹下
          to: "./",
          globOptions: {
            // 忽略的文件
            ignore: [
              "**/index.html"
            ]
          }
        }
      ]
    }),
    // 抽离css
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      // 动态导入配置名称
      chunkFilename: 'css/[name].[contenthash:8].css'
    }),
    // 对CSS进行TreeShaking
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.resolve(__dirname, '../src')}/**/*`, { nodir: true }),
      // 设置安全组，以下匹配的不会被擦除
      safelist: function() {
        return {
          standard: ["html", /-(leave|enter|appear)(|-(to|from|active))$/,
          /^(?!(|.*?:)cursor-move).+-move$/,
          /^router-link(|-exact)-active$/,
          /data-v-.*/,
          /class/,]
        }
      },
    }),
    // HTTP压缩
    new CompressionWebpackPlugin({
      test: /\.js$|\.html$|\.css/, // 匹配文件名
      algorithm: 'gzip',
      threshold: 10240, // 对超过10kb的数据进行压缩
      deleteOriginalAssets: false, // 是否删除原文件
    }),
    new BundleAnalyzerPlugin({
      // cross-env 定义的变量
      analyzerMode: process.env.analyzeMode === 'true' ? 'server' : 'disabled', //这个配置后默认是不会启用这个插件
    })
  ]
})
