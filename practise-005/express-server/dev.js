
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from './config';
import webpackConfig from '../config/webpack.config.js';

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
