var pkg = require('./package.json');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    filename: `./dist/commonjs/LRUCache.js`
  },
  output: {
    filename: `LRUCache.js`,
    library: 'LRUCache',
    path: './dist/window'
  },
  target: 'node',
  plugins: [
    new webpack.BannerPlugin(`${pkg.name} v${pkg.version}`)
  ]
};
