<script>
var demoAlert = new Vue({
      el: '#demo-alert'
  });
</script>

## Alert 警告

用于页面中展示重要的提示信息。

### 基本用法

页面中的非浮层元素，不会自动消失。

::: demo Alert 组件提供四种主题，由`type`属性指定，默认值为空。
```html
  <c-alert title="默认提示的文案"></c-alert>
  <c-alert title="成功提示的文案" type="success"></c-alert>
  <c-alert title="消息提示的文案" type="info"></c-alert>
  <c-alert title="警告提示的文案" type="warning"></c-alert>
  <c-alert title="错误提示的文案" type="error"></c-alert>

```
:::

### 自定义关闭按钮

自定义关闭按钮为文字。

::: demo 在 Alert 组件中，你可以设置是否可关闭，关闭按钮的文本以及关闭时的回调函数。你可以设置`close-text`属性来改变关闭文本，默认为'×',注意：`close-text`必须为文本。设置`close`事件来设置关闭时的回调。
```html
  <c-alert title="不可关闭的 alert" close-text=""></c-alert>
  <c-alert title="不可关闭的 alert" type="success" close-text=""></c-alert>
  <c-alert title="自定义 close-text" type="info" close-text="知道了"></c-alert>
  <c-alert title="设置了回调的 alert" type="warning" @close="close"></c-alert>
```
:::

### 带有 icon

表示某种状态时提升可读性。

::: demo 通过设置`show-icon`属性来显示 Alert 的 icon，这能更有效地向用户展示你的显示意图。
```html
  <c-alert title="默认提示的文案" show-icon></c-alert>
  <c-alert
    title="成功提示的文案"
    type="success"
    show-icon>
  </c-alert>
  <c-alert
    title="消息提示的文案"
    type="info"
    show-icon>
  </c-alert>
  <c-alert
    title="警告提示的文案"
    type="warning"
    show-icon>
  </c-alert>
  <c-alert
    title="错误提示的文案"
    type="error"
    show-icon>
  </c-alert>
```
:::

### 带有辅助性文字介绍

包含标题和内容，解释更详细的警告。

::: demo 除了必填的`title`属性外，你可以设置`description`属性来帮助你更好地介绍，我们称之为辅助性文字。辅助性文字只能存放单行文本，会自动换行显示。
```html

  <c-alert
    title="带辅助性文字介绍"
    type="success"
    description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰挥发化为灰……">
  </c-alert>

```
:::

### 带有 icon 和辅助性文字介绍

::: demo 最后，这是一个同时具有 icon 和辅助性文字的样例。
```html
  <c-alert title="成功提示的文案" description="文字说明文字说明文字说明文字说明文字说明文字说明" show-icon>
  </c-alert>
  <c-alert
    title="成功提示的文案"
    type="success"
    description="文字说明文字说明文字说明文字说明文字说明文字说明"
    show-icon>
  </c-alert>
  <c-alert
    title="消息提示的文案"
    type="info"
    description="文字说明文字说明文字说明文字说明文字说明文字说明"
    show-icon>
  </c-alert>
  <c-alert
    title="警告提示的文案"
    type="warning"
    description="文字说明文字说明文字说明文字说明文字说明文字说明"
    show-icon>
  </c-alert>
  <c-alert
    title="错误提示的文案"
    type="error"
    description="文字说明文字说明文字说明文字说明文字说明文字说明"
    show-icon>
  </c-alert>

```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| **title** | 标题，**必选参数** | string | — | — |
| type | 主题 | string | success/warning/info/error | info |
| description | 辅助性文字 | string | — | — |
| close-text | 关闭按钮自定义文本 | string | — | × |
| show-icon | 是否显示图标 | boolean | — | false |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| close | 关闭alert时触发的事件 | — |
