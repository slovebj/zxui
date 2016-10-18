<script>
  var demoMsg = new Vue({
    el: '#demo-msg',
    methods: {
      open() {
        this.$msg('这是一条普通提示');
      },

      open2() {
        this.$msg({
          msg: '恭喜你，这是一条成功消息',
          type: 'success'
        });
      },

      open3() {
        this.$msg({
          msg: '警告哦，这是一条警告消息',
          type: 'warning'
        });
      },

      open4() {
        this.$msg({
          msg: '错了哦，这是一条错误消息',
          type: 'error'
        });
      },

      open5() {
        this.$msg({
          showClose: true,
          msg: '这是一条消息提示',
          type: 'info',
          duration: 0,
          closeText: '×'
        });
      },

      open6() {
        this.$msg({
          msg: '警告哦，这是一条警告消息',
          type: 'warning',
          duration: 0,
          closeText: '关闭'
        });
      },

      open7() {
        this.$msg({
          msg: '注意哦，这是一条顶部显示的警告消息',
          type: 'warning',
          duration: 0,
          closeText: '知道了',
          top: true
        });
      },

      open8() {
        this.$msg({
          msg: '错了哦，这是一条错误消息',
          type: 'error',
          closeText: '退出'
        });
      }
    }
  });
</script>

## Msg 消息提示

常用于主动操作后的反馈提示。与 Notification 的区别是后者更多用于系统级通知的被动提醒。

### 基础用法

默认显示在底部，3 秒后自动消失。设置top为true时显示在顶部。

:::demo Msg 在配置上与 Notification 非常类似，所以部分 options 在此不做详尽解释，文末有 options 列表，可以结合 Notification 的文档理解它们。Zxui 注册了一个`$msg`方法用于调用，Msg 可以接收一个字符串作为参数，它会被显示为正文内容。

```html
<button type="button" @click="open">打开普通提示</button>
<script>
  export default {
    methods: {
      open() {
        this.$msg('这是一条普通提示');
      }
    }
  }
</script>
```
:::

### 不同状态

用来显示「成功、警告、消息、错误」类的操作反馈。

:::demo 当需要自定义更多属性时，Msg 也可以接收一个对象为参数。比如，设置`type`字段可以定义不同的状态，默认为``。
```html
  <button type="button" @click="open2">成功</button>
  <button type="button" @click="open3">警告</button>
  <button type="button" @click="open5">消息</button>
  <button type="button" @click="open4">错误</button>

<script>
  export default {
    methods: {
      open2() {
        this.$msg({
          msg: '恭喜你，这是一条成功消息',
          type: 'success'
        });
      },

      open3() {
        this.$msg({
          msg: '警告哦，这是一条警告消息',
          type: 'warning'
        });
      },

      open4() {
        this.$msg({
          msg: '错了哦，这是一条错误消息',
          type: 'error'
        });
      },

      open5() {
        this.$msg({
          msg: '这是一条消息提示',
          type: 'info',
          duration: 0,
          closeText: '×'
        });
      }
    }
  }
</script>
```
:::

### 可关闭

可以添加关闭按钮。

:::demo 默认的 Msg 是不可以被人工关闭的，如果需要可手动关闭的 Msg，可以使用`closeText`字段设置关闭按钮文本。此外，和 Notification 一样，Msg 拥有可控的`duration`，设置`0`为不会被自动关闭，默认为 3000 毫秒。
```html

  <button type="button" @click="open5">消息</button>
  <button type="button" @click="open6">成功</button>
  <button type="button" @click="open7">警告</button>
  <button type="button" @click="open8">错误</button>


<script>
  export default {
    methods: {
      open5() {
        this.$msg({
          msg: '这是一条消息提示',
          type: 'info',
          duration: 0,
          closeText: '×'
        });
      },

      open6() {
        this.$msg({
          msg: '警告哦，这是一条警告消息',
          type: 'warning',
          duration: 0,
          closeText: '关闭'
        });
      },

      open7() {
        this.$msg({
          msg: '注意哦，这是一条顶部显示的警告消息',
          type: 'warning',
          duration: 0,
          closeText: '知道了',
          top: true
        });
      },

      open8() {
        this.$msg({
          msg: '错了哦，这是一条错误消息',
          type: 'error',
          closeText: '退出'
        });
      }
    }
  }
</script>
```
:::

### 全局方法

zxui 为 Vue.prototype 添加了全局方法 $msg。因此在 vue instance 中可以采用本页面中的方式调用 `Msg`。

### 单独引用

单独引入 `Msg`：

```javascript
import { Msg } from '……';
```

此时调用方法为 `Msg(options)`。

### Options
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| msg | 消息文字 | string | — | — |
| type | 主题 | string | success/warning/info/error | '' |
| duration | 显示时间, 毫秒。设为 0 则不会自动关闭 | number | — | 3000 |
| closeText | 显示关闭按钮的文本，可以用"×"和文字 | string | '' |  |
| top | 设置是否显示在窗口顶部 | boolean | true | '' |
| onClose | 关闭时的回调函数, 参数为被关闭的 msg 实例 | function | — | — |
