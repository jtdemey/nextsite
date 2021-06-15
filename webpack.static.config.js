const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInjector = require('html-webpack-injector');
const HtmlWebpackSkipAssetsPlugin = require('html-webpack-skip-assets-plugin').HtmlWebpackSkipAssetsPlugin;
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  target: 'web',
  mode: 'production',
  entry: {
    home: path.join(process.cwd(), 'public/scripts/homeScript.js'),
    about: path.join(process.cwd(), 'public/scripts/aboutScript.js'),
    //doodles: path.join(process.cwd(), 'src/doodles/doodleScript.js'),
    //imposter: path.join(process.cwd(), 'src/imposter/imposterIndex.js'),
    //webdevtut: path.join(process.cwd(), 'src/webdevtut/tutScript.js')
  },
  output: {
    path: path.join(process.cwd(), 'dist', 'public'),
    publicPath: '/',
    filename: '[name]Bundle.[chunkhash:8].js'
  },
  plugins: [
    //new webpack.DefinePlugin(envKeys),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      chunks: ['home'],
      filename: 'home.html',
	  minify: false,
      template: './src/pages/home.html'
    }), 
    new HtmlWebpackPlugin({
      chunks: ['about'],
      filename: 'about.html',
	  minify: false,
      template: './src/pages/about.html'
    }),
	new HtmlWebpackSkipAssetsPlugin({
	  skipAssets: [/<\s*script[^>]*>(.*?)<\s*\/\s*script>/, (asset) => (asset.attributes && asset.attributes['x-skip'])]
	}),
	new HtmlWebpackInjector()
    // new Terser({
    //   parallel: true,
    //   terserOptions: {
    //     ecma: 6
    //   },
    // })
  ],
  module: {
    rules: [
      { //BABEL
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      { //HTML
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
      { //SVG
        test: /\.svg$/,
        use: 'svg-inline-loader'
      },
      { //ASSETS
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