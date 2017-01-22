const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin
/**
 * 目录/路径
 */
const srcPath = path.join(__dirname, '../src')
// const buildPath = path.resolve(__dirname, '../dist')
const faviconPath = path.resolve(__dirname, srcPath, 'assets/favicon.ico')

const developmentConf = merge(baseConfig, {
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
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({ // 根据模板插入css/js等生成最终HTML
            title: 'react-mi',
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
            // name: ['mainifest'], // 将公共模块提取, 参照 entry
            name: [
                'vendor', 'mainifest'
            ], // 将公共模块提取, 参照 entry
            minChunks: Infinity // 提取所有entry共同依赖的模块
        }),
        // new ExtractTextPlugin('css/[name].[hash].css')
    ],
    devServer: {
        contentBase: path.resolve(__dirname, '../src'),
        inline: true, // 实时刷新
        hot: true,
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://m.maizuo.com/v4',
                changeOrigin: true,
                secure: false,
            }
        },
        historyApiFallback: true,
        compress: true,
        stats: {
            assets: true,
            children: false,
            chunks: false,
            hash: false,
            modules: false,
            publicPath: false,
            timings: true,
            version: true,
            warnings: true,
            colors: {
                green: '\u001b[32m'
            }
        }
    }
})

module.exports = developmentConf