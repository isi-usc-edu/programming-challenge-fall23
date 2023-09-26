const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.js",
    resolve: {
        alias: {
          'browser': path.resolve(__dirname, "./src/component/App")
        },
        extensions: ['.js'],
    },      
    output: {
        path: path.resolve(__dirname, "./static/frontend"),
        filename: "main.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    optimization: {
        minimize: true,
    },
};