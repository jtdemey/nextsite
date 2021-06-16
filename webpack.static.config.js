const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInjector = require('html-webpack-injector');
const webpack = require('webpack');

const getHtmlPluginConfig = (chunkName) => ({
  chunks: [chunkName],
  filename: `${chunkName}.html`,
  minify: false,
  template: `./src/pages/${chunkName}.html`
});

module.exports = {
  target: 'web',
  mode: 'production',
  entry: {
    home: path.join(process.cwd(), 'public/scripts/homeScript.js'),
    about: path.join(process.cwd(), 'public/scripts/aboutScript.js'),
    doodles: path.join(process.cwd(), 'public/scripts/doodleScript.js')
  },
  output: {
    path: path.join(process.cwd(), 'public', 'static'),
    publicPath: '/static/',
    filename: '[name]Bundle.[chunkhash:8].js'
  },
  plugins: [
    //new webpack.DefinePlugin(envKeys),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(getHtmlPluginConfig('home')),
    new HtmlWebpackPlugin(getHtmlPluginConfig('about')),
    new HtmlWebpackPlugin(getHtmlPluginConfig('doodles')),
    new HtmlWebpackInjector()
  ],
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
