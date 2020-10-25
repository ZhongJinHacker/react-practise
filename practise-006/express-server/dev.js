
const { config } = require('./config.js')
const webpackConfig = require('../config/webpack.config.js')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const path = require("path")
const app = new express();
const compiler = webpack(webpackConfig);
const DIST_DIR = path.join(__dirname, "../dist")
console.log(` ---> DIST_DIR : ${DIST_DIR}`)

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true
        },
    })
);
app.use(webpackHotMiddleware(compiler));

app.use(express.static(DIST_DIR))
app.listen(config.server.port, config.server.host, err => {
    if (err) {
        console.error(err);
        return;
    }

    console.log(`Server is running with port ${config.server.port} `);
});
