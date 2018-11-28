const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	// This is the entry point or start of our react applicaton
	entry: ['./app/app.js'],

	// The plain compiled Javascript will be output into this file
	output: {
		path: path.resolve(__dirname, './public'),
		filename: 'bundle.js',
	},

	// This section desribes the transformations we will perform
	module: {
		rules: [
			{
				// Only working with files that in in a .js or .jsx extension
				test: /\.jsx?$/,
				// Webpack will only process files in our app folder. This avoids processing
				// node modules and server files unnecessarily
        include: /app/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                // These are the specific transformations we'll be using.
                '@babel/preset-env',
                {
                  'targets'    : '> 0.25%, not dead',
                  'useBuiltIns': 'entry'
                }
              ],
              [
                '@babel/preset-react'
              ]
            ]
          }
        }			  
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
				// For all .css files in node_modules
				test: /\.css$/,
				include: /node_modules/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(sa|sc)ss$/,
				use: [
				  MiniCssExtractPlugin.loader,
				  {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              url: false,
              sourceMap: true
            }
				  },
				  {
            loader: 'sass-loader', // compiles Sass to CSS
            options: {
              sourceMap: true
            }
				  }
				]
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
		  template: './app/src/index.html',
		  filename: 'index.html'
		}),
		new MiniCssExtractPlugin({
		  filename: '[name].css',
		  chunkFilename: '[id].css'
		})
	],
	stats: {
		colors: true
	},
	// This lets us debug our react code in chrome dev tools. Errors will have lines and file names
	// Without this the console says all errors are coming from just coming from bundle.js
	devtool: "eval-source-map"
};
