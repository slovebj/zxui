import Alert from '../packages/alert/index.js';
import Msg from '../packages/msg/index.js';
import Msgbox from '../packages/msgbox/index.js';
import Notification from '../packages/notification/index.js';
import Tooltip from '../packages/tooltip/index.js';
import Popover from '../packages/popover/index.js';
import Loading from '../packages/loading/index.js';
import Dialog from '../packages/dialog/index.js';
import Slider from '../packages/slider/index.js';
import DemoBlock from '../packages/demo-block/index.js';
import Input from '../packages/input/index.js';
import InputNumber from '../packages/input-number/index.js';
import Tabs from '../packages/tabs/index.js';
import TabPane from '../packages/tab-pane/index.js';

const install = function(Vue) {
  if (install.installed) return;

  Vue.component(Alert.name, Alert);
  Vue.component(Msg.name, Msg);
  Vue.component(Tooltip.name, Tooltip);
  Vue.component(Popover.name, Popover);
  Vue.component(Dialog.name, Dialog);
  Vue.component(Slider.name, Slider);
  Vue.component(DemoBlock.name, DemoBlock);
  Vue.component(Input.name, Input);
  Vue.component(InputNumber.name, InputNumber);
  Vue.component(Tabs.name, Tabs);
  Vue.component(TabPane.name, TabPane);

  Vue.use(Loading);

  Vue.prototype.$msgbox = Msgbox;
  Vue.prototype.$alert = Msgbox.alert;
  Vue.prototype.$confirm = Msgbox.confirm;
  Vue.prototype.$prompt = Msgbox.prompt;
  Vue.prototype.$notify = Notification;
  Vue.prototype.$msg = Msg;
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

module.exports = {
  version: '0.0.1',
  install,
  Alert,
  Msg,
  Msgbox,
  Notification,
  Tooltip,
  Popover,
  Loading,
  Dialog,
  Slider,
  DemoBlock,
  Input,
  InputNumber,
  Tabs,
  TabPane
};
