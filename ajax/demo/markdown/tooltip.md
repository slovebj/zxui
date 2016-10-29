<script>
var demoTooltip = new Vue({
    el: "#demo-tooltip",
    data() {
      return {
        disabled: false
      };
    }
  });
</script>
## Tooltips 文字提示

常用于展示鼠标 hover 时的提示信息。

### 基础用法

在这里我们提供 9 种不同方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。

:::demo 使用`content`属性来决定`hover`时的提示信息。由`placement`属性决定展示效果：`placement`属性值为：`方向-对齐位置`；四个方向：`top`、`left`、`right`、`bottom`；三种对齐位置：`start`, `end`，默认为空。如`placement="left-end"`，则提示信息出现在目标元素的左侧，且提示信息的底部与目标元素的底部对齐。

```html
<style>
  .box {
    width: 400px;

    .top {
      text-align: center;
    }

    .at-left {
      float: left;
      width: 60px;
    }

    .at-right {
      float: right;
      width: 60px;
    }

    .at-bottom {
      clear: both;
      text-align: center;
    }

    .item {
      margin: 4px;
    }
    
    .at-left .c-tooltip-popper,
    .at-right .c-tooltip-popper {
      padding: 8px 10px;
    }
  }
</style>

<div class="box">
  <div class="at-top">
    <c-tooltip class="item" content="Top Left 提示文字" placement="top-start">
      <button type="button">上左</button>
    </c-tooltip>
    <c-tooltip class="item" content="Top Center 提示文字" placement="top">
      <button type="button">上边</button>
    </c-tooltip>
    <c-tooltip class="item" content="Top Right 提示文字" placement="top-end">
      <button type="button">上右</button>
    </c-tooltip>
  </div>
  <div class="at-left">
    <c-tooltip class="item" content="Left Top 提示文字" placement="left-start">
      <button type="button">左上</button>
    </c-tooltip>
    <c-tooltip class="item" content="Left Center 提示文字" placement="left">
      <button type="button">左边</button>
    </c-tooltip>
    <c-tooltip class="item" content="Left Bottom 提示文字" placement="left-end">
      <button type="button">左下</button>
    </c-tooltip>
  </div>

  <div class="at-right">
    <c-tooltip class="item" content="Right Top 提示文字" placement="right-start">
      <button type="button">右上</button>
    </c-tooltip>
    <c-tooltip class="item" content="Right Center 提示文字" placement="right">
      <button type="button">右边</button>
    </c-tooltip>
    <c-tooltip class="item" content="Right Bottom 提示文字" placement="right-end">
      <button type="button">右下</button>
    </c-tooltip>
  </div>
  <div class="at-bottom">
    <c-tooltip class="item" content="Bottom Left 提示文字" placement="bottom-start">
      <button type="button">下左</button>
    </c-tooltip>
    <c-tooltip class="item" content="Bottom Center 提示文字" placement="bottom">
      <button type="button">下边</button>
    </c-tooltip>
    <c-tooltip class="item" content="Bottom Right 提示文字" placement="bottom-end">
      <button type="button">下右</button>
    </c-tooltip>
  </div>
</div>
```
:::

### 主题

Tooltip 通过添加`color`属性自定义背景色或前景色。


:::demo 通过设置`color`属性来改变主题，默认背景颜色为`#1f2d3d`，前景色为白色。
```html
<c-tooltip content="Top center" placement="top">
  <button type="button">默认</button>
</c-tooltip>
<c-tooltip content="Bottom center" placement="bottom" color="bg-red6 fg-black">
  <button type="button">红色背景，黑色文字</button>
</c-tooltip>
```
:::

### 更多Content

展示多行文本或者是设置文本内容的格式

:::demo 用具名 slot 分发`content`，替代`tooltip`中的`content`属性。
```html
<c-tooltip placement="top">
  <div slot="content">多行信息<br/>第二行信息</div>
  <button type="button">Top center</button>
</c-tooltip>
```
:::

### 高级扩展

除了这些基本设置外，还有一些属性可以让使用者更好的定制自己的效果：

`transition`属性可以定制显隐的动画效果，默认为`fade-in-linear`。

如果需要关闭`tooltip`功能，`disabled`属性可以满足这个需求，它接受一个`Boolean`，设置为`true`即可。

事实上，这是基于 [Vue-popper](https://github.com/element-component/vue-popper) 的扩展，你可以自定义任意 Vue-popper 中允许定义的字段。

当然，Tooltip 组件实际上十分强大，文末的API文档会做一一说明。

:::demo
```html
  <c-tooltip :disabled="disabled" content="点击关闭 tooltip 功能" placement="bottom">
    <button type="button" @click="disabled=true">点击关闭 tooltip 功能</button>
  </c-tooltip>

<style>
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .expand-fade-leave-active {
    margin-left: 20px;
    opacity: 0;
  }
</style>
```
:::

### Attributes
| 参数               | 说明                                                     | 类型              | 可选值      | 默认值 |
|--------------------|----------------------------------------------------------|-------------------|-------------|--------|
|  color        |  默认提供的主题  | String            | `bg-*`, `bg-* fg-*`  | 黑底白字  |
|  content        |  显示的内容，也可以通过 `slot#content` 传入 DOM  | String            | — | — |
|  placement        |  Tooltip 的出现位置  | String           |  `top`, `top-start`, `top-end`, `bottom`, `bottom-start`, `bottom-end`, `left`, `left-start`, `left-end`, `right`, `right-start`, `right-end` |  bottom |
|  value(v-model)        |  状态是否可见  | Boolean           | — |  false |
|  disabled       |  Tooltip 是否可用  | Boolean           | — |  false |
|  offset        |  出现位置的偏移量  | Number           | — |  0 |
|  transition     |  定义渐变动画      | String             | — | `fade-in-linear` |
|  visible-arrow   |  是否显示 Tooltip 箭头，更多参数可见[Vue-popper](https://github.com/element-component/vue-popper) | Boolean | — | true |
|  options        | [popper.js](https://popper.js.org/documentation.html) 的参数 | Object            | 参考 [popper.js](https://popper.js.org/documentation.html) 文档 | `{ boundariesElement: 'body', gpuAcceleration: false }` |
| openDelay | 延迟出现，单位毫秒 | Number | — | 0 |
| manual | 手动控制模式，设置为 true 后，mouseenter 和 mouseleave 事件将不会生效 | Boolean | true,false| false |