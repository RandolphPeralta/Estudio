const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");

const env = dotenv.config({
    path: "./.env.local"
}).parsed;

module.exports = {
    entry: "./src/index.ts",

    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true
    },

    resolve: {
        extensions: [".ts", ".js"]
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            "process.env.PLATFORM": JSON.stringify(env.PLATFORM)
        })
    ]
};