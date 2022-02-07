const path = require("path");
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');

const outputPath = path.join(process.cwd(), 'devserver');

module.exports = {
	entry: [
		path.join(process.cwd(), 'src/components/civildawn/cdIndex.js'),
		'webpack-plugin-serve/client'
	],
  mode: 'development',
	output: {
		path: outputPath,
		filename: "bundle.js"
	},
  plugins: [
    new Serve({
			historyFallback: {
				index: 'civildawn.html'
			},
			host: "localhost",
			port: 55555,
			static: [outputPath, path.resolve("./pages")]
		})
  ],
	target: "web",
  watch: true,
  module: {
    rules: [
      {
        //BABEL
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        //HTML
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false,
              sources: false
            }
          }
        ]
      },
      {
        //SVG
        test: /\.svg$/,
        use: 'svg-inline-loader'
      },
      {
        //ASSETS
        test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              outputPath: 'media'
            }
          }
        ]
      }
    ]
  }
};