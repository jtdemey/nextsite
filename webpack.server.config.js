const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  devtool: 'source-map',
  entry: {
    server: path.join(process.cwd(), 'src/server/server.js')
  },
  output: {
    path: path.join(process.cwd(), 'dist', 'jtserver'),
    filename: 'jtserver.js'
  },
  externals: [nodeExternals()]
};