const baseConfig = require('./webpack.config.base')

var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');


const ROOT_PATH = path.resolve(__dirname, '../')
const SRC_PATH = path.resolve(ROOT_PATH, 'src')
const DIST_PATH = path.resolve(ROOT_PATH, 'dist')


module.exports = {

    ...baseConfig,

    mode: 'production',
    entry: [
        SRC_PATH + '/main.js'
    ],
    output: {
        path: DIST_PATH,
        filename: 'bundle.js'
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'React code demo',
            template: 'index.template.html',
            filename: 'index.html'
        }),
        new StyleLintPlugin({
            context: "src",
            configFile: path.resolve( './.stylelintrc'),
            files: ['**/*.css', '**/*.scss'],
            failOnError: false,
            quiet: true,
            syntax: 'scss'
        })
    ]
}
