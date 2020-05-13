const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // This is the entry point or start of our react application
  entry: {
    app: "./app/app.js",
  },
  // Create sourcemaps
  devtool: "inline-source-map",
  // This tells webpack-dev-server to serve the files from the 'public' directory on localhost:8080.
  devServer: {
    contentBase: "./app/public",
  },
  plugins: [
    // CleanWebpackPlugin: A webpack plugin to remove your build folder(s) before building
    //   cleanStaleWebpackAssets option: it tells CleanWebpackPlugin to keep index.html file
    //   after incremental
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      template: "./app/src/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  output: {
    // The plain compiled Javascript will be output into this file
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "public"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        // Only working with files that in in a .js or .jsx extension
        test: /\.jsx?$/,
        // Webpack will only process files in our app folder. This avoids processing
        // node modules and server files unnecessarily
        include: /app/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                // These are the specific transformations we'll be using.
                "@babel/preset-env",
                {
                  corejs: 3,
                  targets: "> 0.25%, not dead",
                  useBuiltIns: "entry",
                },
              ],
              ["@babel/preset-react"],
            ],
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
      {
        // For all .css files in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              url: false,
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader", // compiles Sass to CSS
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  stats: {
    colors: true,
  },
};
