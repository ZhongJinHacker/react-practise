# react-practise
react electron practise

#### practise 1
 [practise-1](/practise-1)   webpack 实践一

练习使用webpack 进行多js文件打包（生成bundle.js）

不使用配置文件方式
```
命令行执行命令
 node_modules/.bin/webpack src/main.js -o  dist/bundle.js
```
使用配置文件方式
```shell script
node_modules/.bin/webpack --config ./config/webpack.config.js
```
##### 注意：
__dirname 对应的是脚本文件的所在目录的位置
比如： webpack.config.js 内使用__dirname,__dirname = 'react-practise/practise-1/config'
---
#### practise 2
 [practise-2](/practise-2)   devtool 实践

练习使用webpack devtool 的使用

| devtool选项                  | 配置结果                                                     |
| ---------------------------- | ------------------------------------------------------------ |
| source-map                   | 产生一个单独的source-map文件，功能最完全，但会减慢打包速度   |
| eval-source-map              | 使用eval打包源文件模块，直接在源文件中写入干净完整的source-map，不影响构建速度，但影响执行速度和安全，建议开发环境中使用，生产阶段不要使用 |
| cheap-module-source-map      | 会产生一个不带映射到列的单独的map文件，开发者工具就只能看到行，但无法对应到具体的列（符号），对调试不便 |
| cheap-module-eval-source-map | 不会产生单独的map文件，（与eval-source-map类似）但开发者工具就只能看到行，但无法对应到具体的列（符号），对调试不便 |

---
#### practise 3
[practise-3](/practise-3)  实践webpack-dev-server
webpack.config.js 增加配置
```js
    devServer: {
        contentBase: './dist', //这里是执行命令的相对路径
        port: 8080, //监听端口
        open: true  //是否自动打开浏览器
    }
```

package.json 新增执行脚本
```json
"start-server": "node_modules/.bin/webpack-dev-server --config ./config/webpack.config.js"
```
webpack-dev-server 会去执行webpack打包命令，并将结果保存在内存文件系统中，
供浏览器读取

---
### practise 4

[practise-4](/practise-4)  
dev.js 由node启动的express服务器，通过指定静态文件index.html实现开发代理，
但还是需要点击浏览器刷新按钮才能看到修改的内容
---
### practise 5
[practise-5](/practise-5) 
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
[practise-6](/practise-6) 

#### 实践 express + 中间件（webpack-dev-middleware + webpack-hot-middleware）
#### 相较于practise-5 去掉了对es6的支持，后期再来实践babel时再加入，便于理解
---
### practise 7
#### [practise-7](/practise-7) 
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


### practise 8
TODO: babel 实践react 转 es5

### practise 9
TODO: 实践 css loader

### practise 10
TODO: 实践 scss loader



      

