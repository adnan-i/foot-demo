/**
 * Created by Adnan Ibrišimbegović on 04/08/2017.
 */
const Path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    watch: false,
    context: Path.join(__dirname, 'frontend'),
    entry: './src/app.js',
    output: {
        path: Path.join(__dirname, 'frontend/dist'),
        filename: 'app.bundle.js',
    },
    plugins: [
        // Enables angular to detect jQuery on load
        new webpack.ProvidePlugin({
            'window.jQuery': 'jquery'
        }),
    ],
    module: {
        loaders: [
            {
                test: /src\/.*\.js$/,
                include: Path.resolve(__dirname, 'src'),
                use: [
                    { loader: 'ng-annotate-loader' },
                    { loader: 'babel-loader' },
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules|src/,
                use: [
                    { loader: 'babel-loader' },
                ],
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            },
        ]
    }
};
