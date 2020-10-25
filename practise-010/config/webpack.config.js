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
