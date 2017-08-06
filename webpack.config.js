/**
 * Created by Adnan Ibrišimbegović on 04/08/2017.
 */
const Path = require('path');

module.exports = {
    watch: true,
    context: Path.join(__dirname, 'client'),
    entry: './src/app.module.js',
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
            { test: /\.html$/, loader: 'html' },
            { test: /\.css$/, loader: 'style!css' }
        ]
    },
    devtool: '#inline-source-map'
};
