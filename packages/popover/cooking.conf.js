var cooking = require('cooking');
var path = require('path');
var config = require('../../build/config');

cooking.set({
  entry: {
    index: path.join(__dirname, 'index.js')
  },
  dist: path.join(__dirname, 'lib'),
  template: false,
  format: 'umd',
  moduleName: 'CPopover',
  extends: ['vue2'],
  externals: { vue: config.vue }
});
cooking.add('resolve.alias', {
  'main': path.join(__dirname, '../../src')
});

module.exports = cooking.resolve();
