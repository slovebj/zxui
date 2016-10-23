import MsgBox from '../packages/msg-box/index.js';
import Alert from '../packages/alert/index.js';
import Loading from '../packages/loading/index.js';
import Notification from '../packages/notification/index.js';
import Msg from '../packages/msg/index.js';
import DemoBlock from '../packages/demo-block/index.js';
import Input from '../packages/input/index.js';

const install = function(Vue) {
  if (install.installed) return;

  Vue.component(Alert.name, Alert);
  Vue.component(Msg.name, Msg);
  Vue.component(DemoBlock.name, DemoBlock);
  Vue.component(Input.name, Input);

  Vue.use(Loading);

  Vue.prototype.$msgbox = MsgBox;
  Vue.prototype.$alert = MsgBox.alert;
  Vue.prototype.$confirm = MsgBox.confirm;
  Vue.prototype.$prompt = MsgBox.prompt;
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
  MsgBox,
  Alert,
  Loading,
  Notification,
  Msg,
  DemoBlock,
  Input
};
