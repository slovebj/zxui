var Components = require('../components.json');
var path = require('path');
var dependencies = require('../package.json').dependencies;
var fs = require('fs');

var utilsList = fs.readdirSync(path.resolve(__dirname, '../src/utils'));
var mixinsList = fs.readdirSync(path.resolve(__dirname, '../src/mixins'));
var externals = {};

Object.keys(Components).forEach(function(key) {
  externals[`zxui/packages/${key}`] = `zxui/lib/${key}`;
});
Object.keys(dependencies).forEach(function(key) {
  externals[key] = key;
});
externals['zxui/src/locale'] = 'zxui/lib/locale';

utilsList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`zxui/src/utils/${file}`] = `zxui/lib/utils/${file}`;
});
mixinsList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`zxui/src/mixins/${file}`] = `zxui/lib/mixins/${file}`;
});

exports.externals = Object.assign({
  vue: 'vue'
}, externals);

exports.alias = {
  main: path.resolve(__dirname, '../src'),
  packages: path.resolve(__dirname, '../packages'),
  examples: path.resolve(__dirname, '../examples'),
  zxui: path.resolve(__dirname, '../')
};

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
};

exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date.\js/;