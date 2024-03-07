const path = require('path')
const { DefinePlugin } = require('webpack')

// 处理vue文件
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[chunkhash:8].js',
    clean: true // 在生成文件之前清空 output 目录
  },
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@/components': path.resolve(__dirname, '../src/components'),
    },
    // 项目中导包如下扩展名的文件不需要编写后缀名
    extensions: ['.js', '.json', '.wasm', '.jsx', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|svg|gif|webp)$/,
        // 合理的规范:
        // 1.对于小一点的图片, 可以进行base64编码
        // 2.对于大一点的图片, 单独的图片打包, 形成url地址, 单独的请求这个url图片
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 60 * 1024 // 限制60kb
          }
        },
        generator: {
          // 占位符
          // name: 指向原来的图片名称
          // ext: 扩展名
          // hash: webpack生成的hash
          filename: "img/[name].[hash:8][ext]"
        },
      },
      {
        test: /\.(eot|ttf|woff2?)$/,
        type: "asset/resource",
        generator: {
          filename: "font/[name].[hash:8][ext]"
        }
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [path.resolve(__dirname, '../src')]
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new DefinePlugin({
      // 这里 "" 中的内容会被当成 js 代码来运行，用''包裹才是字符串
      BASE_URL: "'./'",
      // 设置 vue 环境变量利于 tree-shaking
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false
    }),
  ]
}