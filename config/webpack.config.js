const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/client/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        compress: true,
        port: 9000,
        historyApiFallback: true,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/client/index.html',
            filename: 'index.html',
        }),
    ],
};