const CInputNumber = require('./src/input-number');

CInputNumber.install = function(Vue) {
  Vue.component(CInputNumber.name, CInputNumber);
};

module.exports = CInputNumber;
