const path = require("path");

module.exports = {
  entry: "./src/index.ts", // tu único punto de entrada
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true
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
    extensions: [".ts", ".js"]
  },

  devServer: {
    directory: path.join(__dirname, "src/ui/web"),
    open: true,
    port: 8000
  },
};
