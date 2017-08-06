/**
 * Created by Adnan Ibrišimbegović on 04/08/2017.
 */
const Path = require('path');

module.exports = {
    devtool: 'source-map',
    watch: true,
    context: Path.join(__dirname, 'client'),
    entry: './src/app.js',
    output: {
        path: Path.join(__dirname, 'client/dist'),
        filename: 'app.bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'ng-annotate-loader' },
                    { loader: 'babel-loader' },
                ],
            },
            { test: /\.html$/, loader: 'html-loader' },
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
