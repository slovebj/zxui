<script>
var demoLoading = new Vue({
    el: '#demo-loading',
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        loading: true,
        loading2: true,
        loading3: false
      }
    },
    methods: {
      navTabLoading() {
        this.loading3 = 'demo-loading';
        setTimeout(() => {
          this.loading3 = false;
        }, 3000);
      }
    }
  });
</script>
<style>
  .demo-loading .el-table {
    border: none;
  }
</style>
## Loading 加载

加载数据时显示动效。

### 区域加载

在表格等容器中加载数据时显示。

:::demo 在 Loading 组件中，使用自定义命令`v-loading`，只需要绑定`Boolean`即可。默认状况下，Loading 遮罩会插入到绑定元素的子节点，绑定元素需设置position为relative或absolute使遮罩在绑定元素内显示。
```html
  <el-table
    v-loading="loading"
    :data="tableData"
    style="width: 100%;position:relative">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        loading: true
      };
    }
  };
</script>
```
:::

### 加载文案

可自定义加载文案。

:::demo 在绑定了`v-loading`指令的元素上添加`data-loading-text`属性，其值会被渲染为加载文案，并显示在加载图标的下方。
```html
  <el-table
    v-loading="loading2"
    data-loading-text="拼命加载中"
    :data="tableData"
    style="width: 100%;position:relative">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        loading2: true
      };
    }
  };
</script>
```
:::

### 整页加载

页面数据加载时显示。

:::demo 当需要指定在哪个页面范围内显示loading层时，可将loading的value值由true设置为id的名称。此时若需要锁定屏幕的滚动，可以使用`lock`修饰符。

```html
  <button
    type="button"
    @click="navTabLoading"
    v-loading.lock="loading3">
    显示整页加载，3 秒后消失
  </button>

<script>
  export default {
    data() {
      return {
        loading3: false
      }
    },
    methods: {
      navTabLoading() {
        this.loading3 = 'demo-loading';
        setTimeout(() => {
          this.loading3 = false;
        }, 3000);
      }
    }
  }
</script>
```
:::