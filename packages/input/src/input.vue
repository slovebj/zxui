<template>
  <div :class="[
    size ? 'input-group-' + size : '',
    inline ? 'inline-block' : '',
    $slots.addon1 || $slots.addon2 || $slots.btn1 || $slots.btn2 ? 'input-group': 'c-input'
     ]" >
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div class="input-btn" v-if="$slots.btn1">
        <slot name="btn1"></slot>
      </div>
      <div class="input-addon" v-if="$slots.addon1">
        <slot name="addon1"></slot>
      </div>
      <input
        v-if="type !== 'textarea'"
        class="form-ctrl"
        :class="[iconL ? 'icon-l' : (iconR ? 'icon-r' : '')]"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :minlength="minlength"
        :autocomplete="autoComplete"
        :autofocus="autofocus"
        :form="form"
        :value="value"
        ref="input"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <!-- input 图标 -->
      <i class="iconfont l0" :class="[iconL ? 'icon-' + iconL : '']" v-if="iconL" @click="handleIconClick"></i>
      <i class="iconfont r0" :class="[iconR ? 'icon-' + iconR : '']" v-if="iconR" @click="handleIconClick"></i>
      <i class="iconfont icon-loading" v-if="validating"></i>
      <!-- 后置元素 -->
      <div class="input-addon" v-if="$slots.addon2">
        <slot name="addon2"></slot>
      </div>
      <div class="input-btn" v-if="$slots.btn2">
        <slot name="btn2"></slot>
      </div>
    </template>
    <textarea v-else
      class="form-ctrl"
      v-model="currentValue"
      ref="textarea"
      :name="name"
      :placeholder="placeholder"
      :disabled="disabled"
      :style="textareaStyle"
      :readonly="readonly"
      :rows="rows"
      :form="form"
      :autofocus="autofocus"
      :maxlength="maxlength"
      :minlength="minlength"
      @focus="handleFocus"
      @blur="handleBlur">
    </textarea>
  </div>
</template>
<script>
  import emitter from '../../../src/mixins/emitter';
  import calcTextareaHeight from './calcTextareaHeight';
  export default {
    name: 'CInput',
    mixins: [emitter],
    props: {
      value: [String, Number],
      placeholder: String,
      inline: Boolean,
      size: String,
      readonly: Boolean,
      autofocus: Boolean,
      iconL: String,
      iconR: String,
      disabled: Boolean,
      type: {
        type: String,
        default: 'text'
      },
      name: String,
      autosize: {
        type: [Boolean, Object],
        default: false
      },
      rows: {
        type: Number,
        default: 2
      },
      autoComplete: {
        type: String,
        default: 'off'
      },
      form: String,
      maxlength: Number,
      minlength: Number
    },
    methods: {
      handleBlur(event) {
        this.$emit('blur', this.currentValue);
        this.dispatch('form-item', 'el.form.blur', [this.currentValue]);
      },
      inputSelect() {
        this.$refs.input.select();
      },
      resizeTextarea() {
        var { autosize, type } = this;
        if (!autosize || type !== 'textarea') {
          return;
        }
        const minRows = autosize.minRows;
        const maxRows = autosize.maxRows;
        this.textareaStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
      },
      handleFocus(ev) {
        this.$emit('focus', ev);
      },
      handleInput(ev) {
        this.currentValue = ev.target.value;
      },
      handleIconClick(ev) {
        this.$emit('click', ev);
      }
    },
    data() {
      return {
        currentValue: this.value,
        textareaStyle: {}
      };
    },
    created() {
      this.$on('inputSelect', this.inputSelect);
    },
    mounted() {
      this.resizeTextarea();
    },
    computed: {
      validating() {
        return this.$parent.validating;
      }
    },
    watch: {
      'value'(val, oldValue) {
        this.currentValue = val;
      },
      'currentValue'(val) {
        this.$nextTick(_ => {
          this.resizeTextarea();
        });
        this.$emit('input', val);
        this.$emit('change', val);
        this.dispatch('form-item', 'el.form.change', [val]);
      }
    }
  };
</script>