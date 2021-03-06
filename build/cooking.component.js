var cooking = require('cooking');
var Components = require('../components.json');
var config = require('./config');

cooking.set({
  entry: Components,
  dist: './lib',
  devServer: {
    port: 8085,
    log: false,
    publicPath: '/'
  },
  minimize: true,
  clean: false,
  format: 'umd',
  extends: ['vue2'],
  minimize: false,
  externals: config.externals,
  alias: config.alias
});

cooking.add('output.filename', '[name]/index.js');
cooking.add('loader.js.exclude', config.jsexclude);
module.exports = cooking.resolve();
