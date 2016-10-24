var express = require("express");
var app = express();
var port = process.env.PORT || 3000;

/**
 * 引入webpack 及其 配置config
 */
var webpack = require("webpack");
var webpackConfig = require("./webpack.dev.config");
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
//调用配置,生成 compiler instance
var compiler = webpack(webpackConfig);

//这里是重点，使用 webpack-dev-middleware 插件
var devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: true,
    stats: {
        colors: true
    }
});
// 注册中间件
app.use(devMiddleware);

app.use(webpackHotMiddleware(compiler));

// 使用静态资源
app.use(express.static(__dirname+'/'));

app.listen(port, function (err){
    if (err) {
        throw err;
    }
    console.log('Listening at http://localhost:' + port + '\n')
})