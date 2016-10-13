import MessageBox from '../packages/message-box/index.js';
import Alert from '../packages/alert/index.js';
import Loading from '../packages/loading/index.js';
import Notification from '../packages/notification/index.js';
import Message from '../packages/message/index.js';
import DemoBlock from '../packages/demo-block/index.js';

const install = function(Vue) {
  if (install.installed) return;

  Vue.component(Alert.name, Alert);
  Vue.component(Message.name, Message);
  Vue.component(DemoBlock.name, DemoBlock);

  Vue.use(Loading);

  Vue.prototype.$msgbox = MessageBox;
  Vue.prototype.$alert = MessageBox.alert;
  Vue.prototype.$confirm = MessageBox.confirm;
  Vue.prototype.$prompt = MessageBox.prompt;
  Vue.prototype.$notify = Notification;
  Vue.prototype.$message = Message;
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

module.exports = {
  version: '0.0.1',
  install,
  MessageBox,
  Alert,
  Loading,
  Notification,
  Message,
  DemoBlock
};
