import CTabs from './src/tabs';
import CTabPane from './src/tab-pane';

/* istanbul ignore next */
export default function(Vue) {
  Vue.component(CTabs.name, CTabs);
  Vue.component(CTabPane.name, CTabPane);
};

export { CTabs, CTabPane };
