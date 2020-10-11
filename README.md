# react-practise
react electron practise

#### practise 1
 [practise-1 webpack 练习](/practise-1)

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
