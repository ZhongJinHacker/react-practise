

module.exports = {

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: ['babel-loader', 'eslint-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss/,
                exclude: /node_modules/,
                use: [{
                    loader: "style-loader" // 将 JS 字符串生成为 style 节点
                }, {
                    loader: "css-loader", // 将 CSS 转化成 CommonJS 模块
                    options: {
                        // 开启css modules
                        modules: true,
                        importLoaders: 1,
                        // 自定义生成的类名
                        localIdentName: '[path][name]__[local]--[hash:base64:5]'
                    }
                },{
                    loader: "postcss-loader"
                }, {
                    loader: "sass-loader" // 将 Sass/Scss 编译成 CSS
                }]
            }
        ]
    }
}


