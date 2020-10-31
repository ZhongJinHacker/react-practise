# react-practise
react electron practise

#### practise 1
 [practise-001](/practise-001)   webpack 实践一

练习使用webpack 进行多js文件打包（生成bundle.js）

不使用配置文件方式
```
命令行执行命令
 node_modules/.bin/webpack src/main.js -o  dist/bundle.js
```
使用配置文件方式
```shell script
node_modules/.bin/webpack --config ./config/webpack.config.dev.js
```
##### 注意：
__dirname 对应的是脚本文件的所在目录的位置
比如： webpack.config.dev.js 内使用__dirname,__dirname = 'react-practise/practise-1/config'
---
#### practise 2
 [practise-002](/practise-002)   devtool 实践

练习使用webpack devtool 的使用

| devtool选项                  | 配置结果                                                     |
| ---------------------------- | ------------------------------------------------------------ |
| source-map                   | 产生一个单独的source-map文件，功能最完全，但会减慢打包速度   |
| eval-source-map              | 使用eval打包源文件模块，直接在源文件中写入干净完整的source-map，不影响构建速度，但影响执行速度和安全，建议开发环境中使用，生产阶段不要使用 |
| cheap-module-source-map      | 会产生一个不带映射到列的单独的map文件，开发者工具就只能看到行，但无法对应到具体的列（符号），对调试不便 |
| cheap-module-eval-source-map | 不会产生单独的map文件，（与eval-source-map类似）但开发者工具就只能看到行，但无法对应到具体的列（符号），对调试不便 |

---
#### practise 3
[practise-003](/practise-003)  实践webpack-dev-server
webpack.config.dev.js 增加配置
```js
    devServer: {
        contentBase: './dist', //这里是执行命令的相对路径
        port: 8080, //监听端口
        open: true  //是否自动打开浏览器
    }
```

package.json 新增执行脚本
```json
"start-server": "node_modules/.bin/webpack-dev-server --config ./config/webpack.config.dev.js"
```
webpack-dev-server 会去执行webpack打包命令，并将结果保存在内存文件系统中，
供浏览器读取

---
### practise 4

[practise-004](/practise-004)  
dev.js 由node启动的express服务器，通过指定静态文件index.html实现开发代理，
但还是需要点击浏览器刷新按钮才能看到修改的内容
---
### practise 5
[practise-005](/practise-005) 
由于dev.js 使用的es6 的语法，所以必须配置babelrc 且在webpack.config.js中
配置babel-loader，让其可以去转换es6的语法
同时需要在 webpack.config.js中加一些配置
```js
module.exports = {
    entry: [
       + 'webpack-hot-middleware/client?noInfo=true&reload=true',
        SRC_PATH + '/main.js'
    ],

...

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
```
这样就可以实现热更新了
---
### practise 6
[practise-006](/practise-006) 

#### 实践 express + 中间件（webpack-dev-middleware + webpack-hot-middleware）
#### 相较于practise-5 去掉了对es6的支持，后期再来实践babel时再加入，便于理解
---
### practise 7
#### [practise-007](/practise-007) 
babel 实践es6 转 es5
webpack.config 配置修改
```js
module.exports = {
...
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                exclude: /node_modules/,
            }
        ]
    }

}
```
这样babel-loader 就会去转化我们的js代码

2. 配置babel-loader的转化规则 卸载.babelrc文件中(空的话默认是不处理)
```json
{
  "presets": ["es2015"],
  "plugins": []
}
```
这样就可以写es6的代码了

# practise 8
HtmlWebpackPlugin 实践
#### [practise-008](/practise-008)

webpack.config.dev.js  添加
```js
var HtmlWebpackPlugin = require('html-webpack-plugin');
...
    plugins: [
        new HtmlWebpackPlugin({
            // 注入模版的标题
            title: 'HtmlWebpackPlugin demo',
            // 使用的模板
            template: 'index.template.html',
            // 生成的文件的名称
            filename: 'index.html'
        })
    ]
```
主工程目录添加一个index.template.html文件
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title><%= htmlWebpackPlugin.options.title %></title>
</head>
<body>
    <div id='root'></div>
</body>
</html>
```
ok

### practise 9
babel 实践react 转 es5
[practise-009](/practise-009)

1. 修改.babelrc，增加 react和 stage-0 解析器
```json
{
  "presets": ["es2015", "react", "stage-0"],
  "plugins": [
    "babel-polyfill",
    "transform-decorators-legacy"
  ]
}
```
2. 在package.json中安装插件
```json
  "dependencies": {
  +  "@babel/runtime": "^7.12.1",
    "react": "^17.0.0",
    "react-dom": "^17.0.0"
  },
  "devDependencies": {
    "babel-core": "^6.25.0",
    "babel-loader": "^7.1.1",
    "babel-preset-es2015": "^6.24.1",
  +  "babel-preset-react": "^6.24.1",
  +  "babel-preset-stage-0": "^6.24.1",
  +  "babel-plugin-transform-decorators-legacy": "^1.3.4",
  +  "babel-polyfill": "^6.23.0",
    "html-webpack-plugin": "^4.5.0",
    "webpack": "^4.16.1",
    "webpack-cli": "^3.1.0",
    "webpack-dev-server": "^3.11.0"
  }
```
3. 修改 webpack.config.dev.js
```js
    module: {
        rules: [
            {
        +        test: /\.jsx?$/,
                loader: ['babel-loader'],
                exclude: /node_modules/,
            }
        ]
    },
```
编译执行，运行ok

### practise 10
#### 实践 css loader

[practise-010](/practise-010)

不加css loader，默认支持内联style

要支持引入外部css文件需要
1 安装外部依赖
```json
"devDependencies": {
...
    "css-loader": "^1.0.0",
    "style-loader": "^0.21.0"
}
```
2 修改 webpack.config.dev.js
```js
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
```
ok

### practise 11
[practise-011](/practise-011)
实践 scss loader

修改package.json
```js
  "devDependencies": {
    ...
    "node-sass": "^4.14.1",
    "sass-loader": "^10.0.4",
    "style-loader": "^0.21.0",
}
```

修改webpack.config.js
```js
    module: {
        rules: [
           ... 
            {
                test: /\.scss/,
                use: [{
                    loader: "style-loader" // 将 JS 字符串生成为 style 节点
                }, {
                    loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                }, {
                    loader: "sass-loader" // 将 Sass/Scss 编译成 CSS
                }]
            }
        ]
    }
```

### practise 12
postcss-loader 实践 css module 实践
[practise-012-postcss-loader](/practise-012-postcss-loader)
#### 1 配置postcss loader 及其插件 autoprefixer
##### 修改package.json
```json
  "devDependencies": {
    "autoprefixer": "^9.7.0",
    "postcss-loader": "^4.0.4",
  }
```
注意： autoprefixer 大于10 时会报错，参考如下
bugfix:
https://stackoverflow.com/questions/63944242/migrating-postcss-loader-from-3-0-0-to-4-0-2-results-in-error-object-object-i

##### 修改webpack.config.js
```js
            {
                test: /\.scss/,
                use: [{
                    loader: "style-loader" // 将 JS 字符串生成为 style 节点
                }, {
                    loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
           +    },{
           +        loader: "postcss-loader",
           +    }, {
                    loader: "sass-loader" // 将 Sass/Scss 编译成 CSS
                }]
            }
```

##### 主工程目录下添加 postcss.config.js
```js
module.exports = {
    plugins: [
        require('autoprefixer')({
            "browsers": [
                "defaults",
                "not ie < 11",
                "last 2 versions",
                "> 1%",
                "iOS 7",
                "last 3 iOS versions"
            ]
        })
    ]
};

```
#### 2 配置css module 实现 css hash化，避免同名冲突
##### 修改webpack.config.js
```js
            {
                test: /\.scss/,
                exclude: /node_modules/,
                use: [{
                    loader: "style-loader" // 将 JS 字符串生成为 style 节点
                }, {
                    loader: "css-loader", // 将 CSS 转化成 CommonJS 模块
               +    options: {
                        // 开启css modules
               +        modules: true,
               +        importLoaders: 1,
                        // 自定义生成的类名
               +        localIdentName: '[path][name]__[local]--[hash:base64:5]'
               +    }
                },{
                    loader: "postcss-loader"
                }, {
                    loader: "sass-loader" // 将 Sass/Scss 编译成 CSS
                }]
            }
```
##### 修改js文件中对scss的使用方式
```js
import app2Styles from './app2.scss'

class App extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div>
...
                <div className={app2Styles.scssChinese}>五六七八</div>
            </div>
            )
    }
}
```
即修改为对象引用方式即可

### practise 13
eslint 实践
[practise-013-eslint](/practise-013-eslint)
修改 webpack.config,js
```js
        rules: [
            {
                test: /\.jsx?$/,
        +        loader: ['babel-loader', 'eslint-loader'],
                exclude: /node_modules/,
            },
        ]
```
修改package.json
```json
    "babel-eslint": "^8.0.1",
    "eslint": "^5.1.0",
    "eslint-config-standard": "^11.0.0",
    "eslint-config-standard-react": "^6.0.0",
    "eslint-formatter-pretty": "^1.1.0",
    "eslint-loader": "^2.0.0",
    "eslint-plugin-import": "^2.8.0",
    "eslint-plugin-node": "^7.0.1",
    "eslint-plugin-promise": "^3.6.0",
    "eslint-plugin-react": "^7.4.0",
    "eslint-plugin-standard": "^3.0.1"
```

修改.eslintec.json
```json
{
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "parser": "babel-eslint",

    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],

    "plugins": [
        "react"
    ],

    "rules": {
        // 要求行尾使用分号
        //"semi": [2, "always"],
        // 要求构造函数首字母大写 0 - 不要求
        "new-cap": [0],
        // 4个空格缩进 switchcase 2个
        "indent": [2, 4, { "SwitchCase": 1 }],
        // 仅多行时运行末尾逗号
        "comma-dangle": [2, "only-multiline"],
        // 强制在 function的左括号之前不使用一致的空格
        "space-before-function-paren": [2, "never"],
        // 强制使用一致的换行符风格
        "operator-linebreak": [2, "before"],
        // 不强制禁止数字字面量中使用前导和末尾小数点
        "no-floating-decimal": [0],
        // jsx 缩进4个空格
        "react/jsx-indent": [2, 4],
        // 验证属性缩进
        "react/jsx-indent-props": [2, 4],
        // 强制布尔属性的记号
        "react/jsx-boolean-value": [2, "always"],
        // 属性类型校验，这里是不校验
        "react/prop-types": [0],
        // jsx 内部使用双引号
        "jsx-quotes": [2, "prefer-double"]
    }
}

```
ok

参考
https://eslint.bootcss.com/docs/rules/
https://github.com/yannickcr/eslint-plugin-react

### practise 14
TODO: stylelint 实践

### practise 15
TODO: webpack 分环境打包


### practise 16
TODO: react 生命周期实践

### practise 17
TODO: react router 实践

### practise 18
TODO: Mbox 实践

### practise 19
TODO: axios 实践


      

