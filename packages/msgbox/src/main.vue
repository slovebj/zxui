<template>
  <div class="c-msgbox-wrapper">
    <transition name="msgbox-bounce">
      <div class="c-msgbox" v-show="value">
        <div class="c-msgbox-title" :class="titleClass" v-if="title !== ''">
          {{ title }}
          <i class="c-msgbox-close iconfont icon-close" @click="handleAction('cancel')" v-if="showClose"></i>
        </div>
        <div class="c-msgbox-content" v-if="msg !== ''">
          <i class="c-msgbox-icon iconfont" :class="icon"></i>
          <div :style="{ 'margin-left': icon ? '50px' : '0' }">{{ msg }}</div>
          <div class="c-msgbox-input" v-show="showInput">
            <c-input v-model="inputValue" :placeholder="inputPlaceholder" ref="input"></c-input>
            <div class="c-msgbox-errormsg" :style="{ visibility: !!editorErrorMsg ? 'visible' : 'hidden' }">{{ editorErrorMsg }}</div>
          </div>
        </div>
        <div class="c-msgbox-btns">
          <button class="btn" :class="cancelBtnClass" v-show="showCancelBtn" @click="handleAction('cancel')">{{ cancelBtnText }}</button>
          <button class="btn" :class="confirmBtnClass" v-show="showConfirmBtn" @click="handleAction('confirm')">{{ confirmBtnText }}</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/babel">
  let CONFIRM_TEXT = '确定';
  let CANCEL_TEXT = '取消';

  import Popup from 'vue-popup';
  import CInput from 'packages/input/index.js';

  export default {
    name: 'c-msgbox',
    mixins: [ Popup ],
    props: {
      modal: {
        default: true
      },
      showClose: {
        type: Boolean,
        default: true
      },
      closeOnClickModal: {
        default: true
      },
      closeOnPressEscape: {
        default: true
      }
    },

    components: {
      CInput
    },

    methods: {
      doClose() {
        this.value = false;
        this._closing = true;

        this.onClose && this.onClose();

        setTimeout(() => {
          if (this.modal && this.bodyOverflow !== 'hidden') {
            document.body.style.overflow = this.bodyOverflow;
            document.body.style.paddingRight = this.bodyPaddingRight;
          }
          this.bodyOverflow = null;
          this.bodyPaddingRight = null;
        }, 200);
        this.opened = false;

        if (!this.transition) {
          this.doAfterClose();
        }
      },

      handleAction(action) {
        if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
          return;
        }
        var callback = this.callback;
        this.value = false;
        callback(action);
      },

      validate() {
        if (this.$type === 'prompt') {
          var inputPattern = this.inputPattern;
          if (inputPattern && !inputPattern.test(this.inputValue || '')) {
            this.editorErrorMsg = this.inputErrorMsg || '输入的数据不合法!';
            this.$refs.input.$el.querySelector('input').classList.add('invalid');
            return false;
          }
          var inputValidator = this.inputValidator;
          if (typeof inputValidator === 'function') {
            var validateResult = inputValidator(this.inputValue);
            if (validateResult === false) {
              this.editorErrorMsg = this.inputErrorMsg || '输入的数据不合法!';
              this.$refs.input.$el.querySelector('input').classList.add('invalid');
              return false;
            }
            if (typeof validateResult === 'string') {
              this.editorErrorMsg = validateResult;
              return false;
            }
          }
        }
        this.editorErrorMsg = '';
        this.$refs.input.$el.querySelector('input').classList.remove('invalid');
        return true;
      }
    },

    watch: {
      inputValue() {
        if (this.$type === 'prompt') {
          this.validate();
        }
      },

      value(val) {
        if (val && this.$type === 'prompt') {
          setTimeout(() => {
            if (this.$refs.input && this.$refs.input.$el) {
              this.$refs.input.$el.querySelector('input').focus();
            }
          }, 500);
        }
      }
    },

    data() {
      return {
        title: '',
        titleClass: '',
        msg: '',
        icon: '',
        showInput: false,
        inputValue: null,
        inputPlaceholder: '',
        inputPattern: null,
        inputValidator: null,
        inputErrorMsg: '',
        showConfirmBtn: true,
        showCancelBtn: false,
        confirmBtnText: CONFIRM_TEXT,
        cancelBtnText: CANCEL_TEXT,
        confirmBtnClass: '',
        confirmBtnDisabled: false,
        cancelBtnClass: '',

        editorErrorMsg: null,
        callback: null
      };
    }
  };
</script>
