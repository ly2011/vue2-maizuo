const path = require('path')
const webpack = require('webpack')
const cssnext = require('postcss-cssnext')
const customMedia = require('postcss-custom-media')
const customProperties = require('postcss-custom-properties')
const pxtorem = require('postcss-pxtorem')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const srcPath = path.join(__dirname, '../src')
const faviconPath = path.resolve(__dirname, srcPath, 'assets/favicon.ico')
const buildPath = path.resolve(__dirname, '../package')

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        'vue-bulma': path.resolve(__dirname, '../src/package.js')
    },
    output: {
        // 无论 path 是什么, dev 环境的 `index.html` 所引用的 js 路径都是 文件名而已(即与 path 完全无关. 只与
        // filename 字段有关而已)
        path: path.resolve(__dirname, '../package'),
        publicPath: '/',
        filename: '[name].min.js',
        // chunkFilename: '[name]__[hash:16].bundle.js',
        pathinfo: true,

        // library
        library: 'vue-bulma',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
    },
    resolve: {
        extensions: [
            '.js',
            '.vue',
            '.jsx',
            '.scss',
            '.css',
            '.jpg',
            '.png',
            'gif',
            '.svg'
        ],
        alias: {
            'SRC': path.resolve(__dirname, '../src'),
            'ASSETS': path.resolve(__dirname, '../src/assets'),
            'COMPONENTS': path.resolve(__dirname, '../src/components'),
            'ACTIONS': path.resolve(__dirname, '../src/actions'),
            'CONSTANTS': path.resolve(__dirname, '../src/constants'),
            'CONTAINERS': path.resolve(__dirname, '../src/containers'),
            'MIDDLEWARE': path.resolve(__dirname, '../src/middleware'),
            'REDUCERS': path.resolve(__dirname, '../src/reducers'),
            'STORE': path.resolve(__dirname, '../src/store'),
            'ROUTES': path.resolve(__dirname, '../src/routes')
        }
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                enforce: 'pre'
            }, {
                test: /\.(js|jsx)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                enforce: 'pre'
            }, {
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.css$/,
                loader: ['css-loader', 'postcss-loader']
                // loader: ExtractTextPlugin.extract({
                //     loader: [
                //         'css-loader', 'postcss-loader'
                //     ],
                //     fallbackLoader: "style-loader"
                // })
            }, {
                test: /\.(scss|sass)$/,
                loader: ['css-loader', 'postcss-loader', 'sass-loader']
                // loader: ExtractTextPlugin.extract({
                //     loader: [
                //         'css-loader', 'postcss-loader', 'sass-loader'
                //     ],
                //     fallbackLoader: "style-loader"
                // })
            }, {
                test: /\.less$/,
                loader: ['css-loader', 'postcss-loader', 'less-loader']
                // loader: ExtractTextPlugin.extract({
                //     loader: [
                //         'css-loader', 'postcss-loader', 'less-loader'
                //     ],
                //     fallbackLoader: "style-loader"
                // })
            }, {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.html$/,
                loader: 'vue-html-loader',
                exclude: /node_modules/
            },
            // {
            //     test: /\.(png|jpg|gif|svg|ttf|woff|eot)$/,
            //     include: [path.resolve(__dirname, '../src')],
            //     exclude: [path.resolve(__dirname, '../node_modules')],
            //     loader: 'file-loader',
            //     query: {
            //         name: 'file/[name].[ext]'
            //     }
            // },
            {
                test: /\.(png|jpg|gif)$/,
                include: path.resolve(__dirname, '../src'),
                exclude: path.resolve(__dirname, '../node_modules'),
                loader: 'file-loader',
                query: {
                    name: 'file/[name].[ext]'
                }
            },

            //font-awesome
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                include: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../node_modules')],
                loader: 'url-loader?limit=10000&minetype=application/font-woff',
                // query: {
                //     name: 'file/[name].[ext]'
                // }
            }, {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                include: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../node_modules')],
                loader: 'file-loader',
                query: {
                    name: 'file/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function () {
                    return [
                        customMedia(),
                        cssnext({flexbox: true, browsers: ['last 10 versions']}),
                        customProperties(),
                        // pxtorem({rootValue: 100, propWhiteList: []})
                    ]
                }
            },
            eslint: {
                formatter: require('eslint-friendly-formatter')
            },

            // vue: {
            //     loaders: {
            //         // postcss: [require('autoprefixer')({flexbox: true, browsers: ['last 3
            //         // versions']})],
            //         postcss: function () {
            //             return [
            //                 customMedia(),
            //                 cssnext({flexbox: true, browsers: ['last 10 versions']}),
            //                 customProperties(),
            //                 // pxtorem({rootValue: 100, propWhiteList: []})
            //             ]
            //         },
            //         css: ExtractTextPlugin.extract({
            //             loader: [
            //                 'css-loader', 'postcss-loader'
            //             ],
            //             fallbackLoader: "vue-style-loader"
            //         }),
            //         scss: ExtractTextPlugin.extract({
            //             loader: [
            //                 'css-loader', 'postcss-loader', 'sass-loader'
            //             ],
            //             fallbackLoader: "vue-style-loader"
            //         }),
            //         sass: ExtractTextPlugin.extract({
            //             loader: [
            //                 'css-loader', 'postcss-loader', 'sass-loader'
            //             ],
            //             fallbackLoader: "vue-style-loader"
            //         })
            //     }

            // }
        }),
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
        // new ExtractTextPlugin({filename: 'css/[name].[hash].css', allChunks: true})
    ]
}