/**
 * Created by Adnan Ibrišimbegović on 04/08/2017.
 */
const Merge = require('webpack-merge');
const webpack = require('webpack');
const CommonConfig = require('./webpack.common.js');

module.exports = Merge(CommonConfig, {
    watch: true,
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': `'development'`
        })
    ]
});
