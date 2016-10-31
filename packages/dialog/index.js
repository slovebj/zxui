const CDialog = require('./src/component');

/* istanbul ignore next */
CDialog.install = function(Vue) {
  Vue.component(CDialog.name, CDialog);
};

module.exports = CDialog;
