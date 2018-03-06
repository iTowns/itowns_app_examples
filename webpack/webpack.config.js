var path = require('path');

module.exports = {
  entry: {
      'itowns-client': [path.resolve(__dirname, 'main.js') ]
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devServer: {
    publicPath: '/dist/'
  },
};
