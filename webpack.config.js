const path = require('path');

module.exports = {
  entry: "./src/main.ts",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
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

  resolve: {
    extensions: [".ts", ".js"],
    fallback: {
      fs: false,
      path: false,
    }
  },

  externals: {
        "prompt-sync": "commonjs prompt-sync"
    },

  devServer: {
    static: {
      directory: path.join(__dirname, "src/study/html/prueba")
    },
    open: true,
    port: 8080
  }
  
};