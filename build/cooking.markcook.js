var cooking = require('cooking');
var path = require('path');

cooking.set({
  entry: './plugins/markcook/src/main.js',
  dist: './plugins/markcook/build',
  template: false,
  minimize: false,
  extends: ['vue2']
});

cooking.add('externals', {
  vue: {
    root: 'Vue',
    commonjs: 'vue',
    commonjs2: 'vue',
    amd: 'vue'
  }
});

module.exports = cooking.resolve();
