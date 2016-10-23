const CInput = require('./src/input');

CInput.install = function(Vue) {
  Vue.component(CInput.name, CInput);
};

module.exports = CInput;
