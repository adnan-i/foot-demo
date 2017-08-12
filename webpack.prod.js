/**
 * Created by Adnan Ibrišimbegović on 04/08/2017.
 */
const Merge = require('webpack-merge');
const webpack = require('webpack');
const CommonConfig = require('./webpack.common.js');

module.exports = Merge(CommonConfig, {
    watch: false,
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': `'production'`
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.AggressiveMergingPlugin()
    ]
});
