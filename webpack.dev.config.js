/**
 * Created by Scott on 2016/10/24.
 */
var webpack = require('webpack');
var path = require('path');

var nodemodulesPath = path.resolve(__dirname, "node_modules");
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
module.exports = {
    devtool: 'source-map',
    entry: {
        index: [hotMiddlewareScript, './src/js/index.js'],
        vendors: [hotMiddlewareScript, 'react', 'antd', 'react-mixin', 'redux']
    },
    resolve: {
        alias: {
            'react': path.join(__dirname, 'node_modules', 'react')
        },
        extentions: ['', 'js']
    },
    output: {
        path: '/build',
        publicPath: '/build',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: "style!css"},
            {
                test: /\.js?$/,
                loader: 'babel',
                exclude: [nodemodulesPath],
                query: {presets: ['react', 'es2015']}
            },
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        // 这个使用uglifyJs压缩你的js代码
        // new webpack.optimize.UglifyJsPlugin({minimize: true}),
        // new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
        
    ]
};