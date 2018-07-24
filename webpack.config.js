const webpack = require('webpack'); 
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    // 監聽
    watch: true,
 
    // development (開發模式未壓縮) | production (產品模式可壓縮)
    mode: 'production',
    
    // 進入點，每個頁面使用一個 JS 檔
    entry: {
        'jquery.file-preview': './src/jquery.file-preview.js'
    },
    
    output: {
        path: path.resolve(__dirname, 'dist'), 
        filename: '[name].min.js'
    },

    // 需要時再啟動，並搭配 UglifyJSPlugin sourceMap
    devtool: 'source-map', 

    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        })
    ],
    
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    }
};