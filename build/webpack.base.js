const path = require('path')
const webpack = require('webpack')
const cssnext = require('postcss-cssnext')
const customMedia = require('postcss-custom-media')
const customProperties = require('postcss-custom-properties')
const pxtorem = require('postcss-pxtorem')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const srcPath = path.join(__dirname, '../src')
const faviconPath = path.resolve(__dirname, srcPath, 'assets/favicon.ico')
const buildPath = path.resolve(__dirname, '../dist')
const nodeModulesPath = path.resolve(__dirname, '../node_modules')

module.exports = {
    context: path.resolve(__dirname, '../'),
    output: {
        // 无论 path 是什么, dev 环境的 `index.html` 所引用的 js 路径都是 文件名而已(即与 path 完全无关. 只与
        // filename 字段有关而已)
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: 'js/[name]__[hash:16].bundle.js',
        chunkFilename: 'js/[name]__[hash:16].bundle.js'
    },
    resolve: {
        modules: [path.resolve(__dirname, '../src'), 'node_modules', path.resolve(__dirname, '../node_modules')],
        enforceExtension: false,
        enforceModuleExtension: false,
        extensions: [
            '.js',
            '.vue',
            '.jsx',
            '.scss',
            '.css',
            '.jpg',
            '.png',
            '.gif',
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
        // loaders: [
        rules: [{
                test: /\.(vue|js|jsx)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                enforce: 'pre',
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            }, {
                test: /\.vue$/,
                // loader: 'vue-loader',
                use: [
                    'vue-loader'
                ],
            }, {
                test: /\.css$/,
                include: srcPath,
                // loader: ['css-loader', 'postcss-loader', 'sass-loader']
                // loader: ExtractTextPlugin.extract({
                //     loader: [
                //         'css-loader', 'postcss-loader'
                //     ],
                //     fallbackLoader: "style-loader"
                // })
                loader: ExtractTextPlugin.extract({
                    // fallbackLoader: 'style-loader',
                    fallback: 'style-loader',
                    loader: 'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!postcss-loader'
                })
            }, {
                test: /\.css$/,
                include: nodeModulesPath,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.(scss|sass)$/,
                include: srcPath,
                // loader: ['css-loader', 'postcss-loader', 'sass-loader']
                // loader: ExtractTextPlugin.extract({
                //     loader: [
                //         'css-loader', 'postcss-loader', 'sass-loader'
                //     ],
                //     fallbackLoader: "style-loader"
                // })
                loader: ExtractTextPlugin.extract({
                    // fallbackLoader: 'style-loader',
                    fallback: 'style-loader',
                    loader: [{
                            loader: 'css-loader',
                            query: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
                            }
                        },
                        'postcss-loader',
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.(scss|sass)$/,
                include: nodeModulesPath,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.less$/,
                // include: srcPath,
                // loader: ['css-loader', 'postcss-loader', 'sass-loader']
                // loader: ExtractTextPlugin.extract({
                //     loader: [
                //         'css-loader', 'postcss-loader', 'less-loader'
                //     ],
                //     fallbackLoader: "style-loader"
                // })
                loader: ExtractTextPlugin.extract({
                    // fallbackLoader: 'style-loader',
                    fallback: 'style-loader',
                    loader: 'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!postcss-loader!less-loader'
                })
            },
            {
                test: /\.less$/,
                include: nodeModulesPath,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.html$/,
                use: 'vue-html-loader',
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
                context: path.resolve(__dirname, '../'),
                postcss: function() {
                    return [
                        customMedia(),
                        cssnext({ flexbox: true, browsers: ['last 10 versions'] }),
                        customProperties(),
                        // pxtorem({rootValue: 100, propWhiteList: []})
                    ]
                }
            },
            eslint: {
                formatter: require('eslint-friendly-formatter')
            },
            vue: {
                loaders: {
                    // postcss: [require('autoprefixer')({flexbox: true, browsers: ['last 3
                    // versions']})],
                    postcss: function() {
                        return [
                            customMedia(),
                            cssnext({ flexbox: true, browsers: ['last 10 versions'] }),
                            customProperties(),
                            // pxtorem({rootValue: 100, propWhiteList: []})
                        ]
                    },
                    css: ExtractTextPlugin.extract({
                        loader: [
                            'css-loader', 'postcss-loader'
                        ],
                        // fallbackLoader: "vue-style-loader",
                        fallback: 'vue-style-loader',
                    }),
                    scss: ExtractTextPlugin.extract({
                        loader: [
                            'css-loader', 'postcss-loader', 'sass-loader'
                        ],
                        // fallbackLoader: "vue-style-loader",
                        fallback: 'vue-style-loader',
                    }),
                    sass: ExtractTextPlugin.extract({
                        loader: [
                            'css-loader', 'postcss-loader', 'sass-loader'
                        ],
                        // fallbackLoader: "vue-style-loader",
                        fallback: 'vue-style-loader',
                    })
                }

            }
        }),
        new ExtractTextPlugin({ filename: 'css/[name].[hash].css', allChunks: true })
    ]
}