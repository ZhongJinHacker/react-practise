var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');


const ROOT_PATH = path.resolve(__dirname, '../')
const SRC_PATH = path.resolve(ROOT_PATH, 'src')
const DIST_PATH = path.resolve(ROOT_PATH, 'dist')


module.exports = {
    mode: 'development',
    entry: [
        SRC_PATH + '/main.js'
    ],
    output: {
        path: DIST_PATH,
        filename: 'bundle.js'
    },
    devtool: 'source-map',

    devServer: {
        contentBase: DIST_PATH,
        port: 8080,
        open: true
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss/,
                use: [{
                    loader: "style-loader" // 将 JS 字符串生成为 style 节点
                }, {
                    loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                },{
                    loader: "postcss-loader",
                }, {
                    loader: "sass-loader" // 将 Sass/Scss 编译成 CSS
                }]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'React code demo',
            template: 'index.template.html',
            filename: 'index.html'
        })
    ]
}
