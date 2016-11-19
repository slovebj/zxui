import CTabs from './src/tabs';

/* istanbul ignore next */
CTabs.install = function(Vue) {
  Vue.component(CTabs.name, CTabs);
};

export default CTabs;
