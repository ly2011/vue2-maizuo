# vue2-maizuo

> vue2-maizuo

> 这是一套基于 `vue2` 的电影频道

##技术栈

- webpack2

- vue2

- vuex2

##升级

### 2016/12/18

- `eslint-plugin-html`: required to lint `*.vue` files

```js
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
```

- `webpack2`

[webpack@2.1.0-beta.23 has breaking changes](https://github.com/webpack/webpack/releases). `preLoaders` is removed from the webpack^2.1.0-beta.23. so move it to loaders and using `[enforce: "pre"]` instead.

```js
module.exports = {
  // ...
  module: {
    loaders: [
      {enforce: "pre", test: /\.js$/,  loader: "eslint-loader", exclude: /node_modules/}
      // ... other loader
    ]
  }
  // ...
}
```

### 2016/12/18

```json
  "dependencies": {
    "@types/node": "^6.0.46",
    "@types/react": "^0.14.44",
    "@types/vue": "^1.0.31",
    "@types/vue-router": "^0.7.27",
    "babel-polyfill": "^6.16.0",
    "classnames": "^2.2.5",
    "es6-promise": "^4.0.5",
    "fastclick": "^1.0.6",
    "isomorphic-fetch": "^2.2.1",
    "react": "^15.3.2",
    "react-dom": "^15.3.2",
    "react-redux": "^4.4.5",
    "react-router": "^2.8.1",
    "react-router-redux": "^4.0.6",
    "react-tap-event-plugin": "^2.0.1",
    "redux": "^3.6.0",
    "redux-thunk": "^2.1.0",
    "vue": "^2.1.6",
    "vue-router": "^2.1.1",
    "vuex": "^2.1.1",
    "vuex-router-sync": "^3.0.0"
  },

  "devDependencies": {
    "babel-core": "^6.20.0",
    "babel-eslint": "^7.1.1",
    "babel-loader": "^6.0.0",
    "babel-plugin-import": "^1.1.0",
    "babel-plugin-transform-class-properties": "^6.19.0",
    "babel-plugin-transform-decorators": "^6.13.0",
    "babel-plugin-transform-decorators-legacy": "^1.3.4",
    "babel-plugin-transform-runtime": "^6.15.0",
    "babel-preset-es2015": "^6.18.0",
    "babel-preset-react": "^6.16.0",
    "babel-preset-stage-2": "^6.18.0",
    "buble-loader": "^0.4.0",
    "cross-env": "^1.0.6",
    "css-loader": "^0.23.1",
    "eslint": "^3.11.1",
    "eslint-plugin-react": "^6.8.0",
    "extract-text-webpack-plugin": "^2.0.0-beta.4",
    "file-loader": "^0.8.4",
    "html-webpack-plugin": "^2.24.1",
    "image-webpack-loader": "^3.0.0",
    "less": "^2.7.1",
    "less-loader": "^2.2.3",
    "node-sass": "^3.13.0",
    "optimize-css-assets-webpack-plugin": "^1.3.0",
    "ora": "^0.3.0",
    "postcss-cssnext": "^2.8.0",
    "postcss-custom-media": "^5.0.1",
    "postcss-custom-properties": "^5.0.1",
    "postcss-loader": "^1.1.0",
    "postcss-pxtorem": "^3.3.1",
    "precss": "^1.4.0",
    "pure-render-decorator": "^1.2.1",
    "react-css-modules": "^4.1.0",
    "rimraf": "^2.5.4",
    "sass-loader": "^4.0.2",
    "shelljs": "^0.7.4",
    "strip-loader": "^0.1.2",
    "style-loader": "^0.13.1",
    "vue-loader": "^9.2.2",
    "vue-style-loader": "^1.0.0",
    "webpack": "^2.1.0-beta.27",
    "webpack-dev-middleware": "^1.7.0",
    "webpack-dev-server": "^2.1.0-beta.0",
    "webpack-hot-middleware": "^2.12.2",
    "webpack-merge": "^0.14.1",
    "webpack-visualizer-plugin": "^0.1.5"
  },
```

### 2016/12/14

- 解决 webpack2.x 打包缓慢的问题

`OccurrenceOrderPlugin` 真是一个耗时的插件

- 解决 `antd` 在 webpack2.x 下的样式问题

**第三方的包:**

1. 不能设置为 `css modules`

2. loader 第一个一定要设置为 `style-loader`

如 `antd` 需要设置为

```js
{
  test: /\.less$/,
  include: path.resolve(__dirname, '../node_modules'),
  loader: ['style-loader', 'css-loader', 'less-loader']
},
```

### 2016/12/13

- webpack2.x 中不支持一些特殊的样式(只有 .less 或 .scss会出现这种情况(当然也包括 antd 里面的 .less) ,也不清楚是 哪个 webpack插件[less-loader, sass-loader], 入坑...),
// 解决办法: 就是对于这种特殊需求的文件, 改为 .css 文件啦(webpack2.x 还是没法识别, 好尴尬...(antd-mobile也是一样的道理))。

原来是 `postcss-loader` 搞得鬼, 去掉它即可(仅是对于 `node_modules` 项目, 自己写的项目本来就可以识别, 呵呵...)

挨, webpack2.x 还是没法真正使用 `antd` 呀, 样式压根就没加载进来

```css
filter: progid: dximagetransform.microsoft.gradient(startColorstr=#6eb6de, endColorstr=#4a77d4, GradientType=0);
```

```json
[
  "import",
  {
    "libraryName": "antd",
    "libraryDirectory": "lib",
    "style": "css"
  }
]
```

### 2016/12/11

- 优化 webpack2 压缩

主要是 `AggressiveMergingPlugin`

- 优化 图片压缩

`add image-webpack and remove pxtorem`

- 修复 webpack2 `ERROR in ./src/containers/Home/style.scss
Module build failed: ReferenceError: window is not defined
    at eval (webpack:///./~/.0.13.1@style-loader/addStyles.js?:14:30)
`

去掉 `loader: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']` 中的 `style-loader` 即可

- 解决 webpack2 `css modules`, `ExtractTextPlugin`

```js
loader: ExtractTextPlugin.extract({
  fallbackLoader: 'style-loader',
  loader: 'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!postcss-loader!sass-loader'
})
```

- `css-loader` 的 `getLocalIdent` 方法 不生效

- 添加 `react-css-modules`

### 2016/12/06

- `mouse` 事件

```css

mouseover与mouseenter

不论鼠标指针穿过被选元素或其子元素，都会触发 mouseover 事件。

只有在鼠标指针穿过被选元素时，才会触发 mouseenter 事件。


mouseout与mouseleave

不论鼠标指针离开被选元素还是任何子元素，都会触发 mouseout 事件。

只有在鼠标指针离开被选元素时，才会触发 mouseleave 事件。
```

##BUG

### 2016/12/06

- css modules `composes` 只能用在局部环境下

- webpack2 `extract-text-webpack-plugin` 插件BUG(没法和 `sass-loader`, `less-loader` 使用)

### 2016/11/17

- 1.
在 `webpack2` 升级后, `It's no longer allowed to omit the '-loader' prefix when using loaders`

当使用加载器时，不再允许省略'-loader'前缀

- 在 `webpack2` 升级后, `react-tap-event-plugin` 报错了, 暂时处理方法: 将其禁用

- 2.
~~原因：`Webpack 2.1.0-beta23` 之后的config里不能直接包含自定义配置项
解决：将`postcss`和`devServer`替换成以下写法即可~~

```js
plugins: {
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: function () {
        return [precss, autoprefixer];
      },
      devServer: {
        contentBase: "src", //本地服务器所加载的页面所在的目录
        colors: true, //终端中输出结果为彩色
        historyApiFallback: true, //不跳转
        inline: true //实时刷新
      }
    }
  })
}
```
