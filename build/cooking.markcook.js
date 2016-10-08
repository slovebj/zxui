var cooking = require('cooking');
var path = require('path');

cooking.set({
  entry: './plugins/markcook/src/main.js',
  dist: './plugins/markcook/build',
  template: false,
  devServer: {
    port: 8085,
    log: false,
    publicPath: '/'
  },
  minimize: false,
  extends: ['vue2']
});

cooking.add('externals', {
  vue: {
    root: 'vue',
    commonjs: 'vue',
    commonjs2: 'vue',
    amd: 'vue'
  },
  vuex: {
    root: 'Vuex',
    commonjs: 'vuex',
    commonjs2: 'vuex',
    amd: 'vuex'
  }
});

module.exports = cooking.resolve();
