const TestMd = require('./src/main');

TestMd.install = function(Vue) {
  Vue.component(TestMd.name, TestMd);
};

module.exports = TestMd;
