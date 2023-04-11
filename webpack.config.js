const path = require('path');
//const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: './client/index.js',

    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js',
    },
    
    plugins: [new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './client/index.html')
    })],
    devServer: {
        proxy: {
            '/**': {
            target: 'http://localhost:3000/',
            changeOrigin: true,
            secure: false,
            hot: true,
            open: true
            }
        },
        historyApiFallback: true
    },

    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
              test: /\.jsx?/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/env', { targets: "defaults" }],
                        ['@babel/react', { targets: "defaults" }],
                    ]
                }
              }
            },

            {
              test: /\.css$/i,
              use: [
                "style-loader",
                "css-loader",
              ]
            },
        ]
    }
};