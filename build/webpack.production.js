const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
// const getEntries = require('./getEntries')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Visualizer = require('webpack-visualizer-plugin')
// const WebpackStrip = require('strip-loader')
// const BannerPlugin = webpack.BannerPlugin

/**
 * banners
 */
const json = require('../package.json')

const version = json
  .version
  .split('.')
const v = (version.shift() + '.' + version.join('')).replace(/0+$/, '0')
const now = new Date()
const snow = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ':' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()

/**
 * 目录/路径
 */
const srcPath = path.join(__dirname, '../src')
const buildPath = path.resolve(__dirname, '../dist')
const faviconPath = path.resolve(__dirname, srcPath, 'assets/favicon.ico')

const productionConf = merge(baseConfig, {
  entry: {
    index: path.resolve(__dirname, '../src/index.js'),
    vendor: [
      // 'vue',
      // 'vue-router',
      // 'vuex',
      // 'vuex-router-sync',
      // 'babel-polyfill'
    ]
  },
  // output: {
  //   path: buildPath,
  //   publicPath: '/',
  //   filename: 'js/[name].[hash].js',
  //   chunkFilename: 'js/[name].[hash].js'
  // },
  module: {
    loaders: [
      {
        // 只有去掉babel的cjs模块，才能做tree shaking打包(https://github.com/xyc-cn/webpack2-demo/blob/master/webpack.config.js)
        test: /\.(js|jsx)$/,
        loader: ['babel-loader','strip-loader?strip[]=console.log'],
        exclude: /node_modules/
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=file/[name]__[hash:base64:16].[ext]',
          {
            loader: 'image-webpack-loader',
            query: {
              // name: 'file/[name].[ext]',
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              mozjpeg: {
                quality: 65
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            }
          }
        ]
      }
    ]
  },
  stats: {
    children: false
  },
  plugins: [
    // 定义环境变量
    new webpack.DefinePlugin({ // <-- 减少 React 大小的关键
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack
      .optimize
      .OccurrenceOrderPlugin(), // 比对id的使用频率和分布来得出最短的id分配给使用频率高的模块
    new webpack.NoErrorsPlugin(), // 允许错误不打断程序
    // new webpack.optimize.DedupePlugin(), //删除类似的重复代码(DedupePlugin在webpack2.x中被废弃了)
    new webpack
      .optimize
      .UglifyJsPlugin({ // 压缩js
      minimize: true,
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      },
      except: ['$super', '$', 'exports', 'require'] // 排除关键字
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true
    }),
    new webpack.optimize.AggressiveMergingPlugin(),//合并块
    new HtmlWebpackPlugin({ // 根据模板插入css/js等生成最终HTML
      title: 'vue-bulma',
      favicon: faviconPath, // favicon路径
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),
      inject: true,
      minify: {
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      // more options: https://github.com/kangax/html-minifier#options-quick-reference
      },
      cache: false,
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    new CommonsChunkPlugin({
      name: ['vendor'], // 将公共模块提取, 参照 entry
      minChunks: Infinity // 提取所有entry共同依赖的模块
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    new webpack.NamedModulesPlugin(),
    function () {
      return this.plugin('done', function (stats) {
        // var content = JSON.stringify(stats.toJson().assetsByChunkName, null, 2)
        console.log('版本是：' + JSON.stringify(stats.toJson().hash))
      })
    },
    new webpack.BannerPlugin('built in ' + snow + ' version ' + v + ' by luyun\n'),
    // new ExtractTextPlugin({
    //   filename: 'css/[name].[hash].css',
    //   allChunks: true
    // }),
    // 打包分析
    new Visualizer({filename: './statistics.html'}),
  ]
})

module.exports = productionConf
