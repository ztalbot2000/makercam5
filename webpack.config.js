const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    entry: './app/src/main.js',
    output: {
        filename: 'makercam5.js',
        path: path.resolve(__dirname, './dist')
    },
    target: 'node',
    externals: {
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    resolve: {
        alias: {
            $: "jquery/src/jquery",
        }
    },
module: {
        rules: [{
            test: /\.js$/,
            include: [path.resolve(__dirname, "./app/")],
            exclude: [
                       /node_modules/
                     ],
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    },
    plugins: [
     ]
};
