var path = require('path')
var webpack = require('webpack');


const ROOT_PATH = path.resolve(__dirname, '../')
const SRC_PATH = path.resolve(ROOT_PATH, 'src')
const DIST_PATH = path.resolve(ROOT_PATH, 'dist')


module.exports = {
    entry: [
        'webpack-hot-middleware/client?noInfo=true&reload=true',
        SRC_PATH + '/main.js'
    ],
    output: {
        path: __dirname + '/../dist',
        filename: 'bundle.js'
    },
    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: ['babel-loader'],
                exclude: /node_modules/,
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()

    ]
}
