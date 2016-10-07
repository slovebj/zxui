var cooking = require('cooking');
var path = require('path');

cooking.set({
  entry: 'plugins/markcook/index.js',
  dist: path.join(__dirname, 'plugins/markcook'),
  filename: 'markcook.js',
  template: false,
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
