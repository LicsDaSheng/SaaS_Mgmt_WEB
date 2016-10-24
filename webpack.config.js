var path = require('path');
var webpack = require('webpack');


var options = {
    style: true,
    libraryDirectory: 'lib',       // default: lib
    libraryName: 'antd'            // default: antd
};
console.log(__dirname);
module.exports = {
    entry: {
        index: path.join(__dirname, 'src/js/index.js'),
        vendors: ['react', 'antd', 'react-mixin', 'redux']
    },
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: '/',
        filename: '[name].js'
    },
    //fix problem http://stackoverflow.com/questions/28519287/what-does-only-a-reactowner-can-have-refs-mean#
    resolve: {
        alias: {
            'react': path.join(__dirname, 'node_modules', 'react')
        },
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /.less/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {test: /\.css$/, loader: "style!css"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
            ,
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: 'url',
                query: {limit: 10240}
            }
        ]
    },
    // babel: {
    //     plugins: [['antd', options]]
    // },

    plugins: [
        // kills the compilation upon an error.
        // this keeps the outputed bundle **always** valid
        new webpack.NoErrorsPlugin(),
        //这个使用uglifyJs压缩你的js代码
        //new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ]
};
