const DemoBlock = require('./src/demo-block');

DemoBlock.install = function(Vue) {
  Vue.component(DemoBlock.name, DemoBlock);
};

module.exports = DemoBlock;
